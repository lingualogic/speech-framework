/**
 * Diese Komponente dient zum Aufbau und zur Verwaltung einer HTML5-WebSocket-Verbindung
 * mit dem SpeechServer.
 *
 * Letzte Aenderung: 20.03.2019
 * Status: gruen
 *
 * @module common/html5
 * @author SB
 */


// core

import { ErrorBase } from './../../core/error/error-base';
import { FactoryManager } from './../../core/factory/factory-manager';


// common

import { WebSocketFactory, WEBSOCKET_FACTORY_NAME } from './websocket-factory';


// Konstanten

/** Zeitintervall fuer Verbindung erneut aufbauen */
export const NET_CONNECTINTERVAL_TIMEOUT = 5000;


// Funktionstypen

export type OnNetHtml5OpenFunc = (aUrl: string) => number;
export type OnNetHtml5CloseFunc = () => number;
export type OnNetHtml5MessageFunc = (aMessage: any) => number;
export type OnNetHtml5ErrorFunc = (aError: any) => number;


/* Kommentar: NetOptions
 *
 * Beim Aufruf von init(options) koennen optionale Werte zur Konfiguration uebergeben werden.
 * Zur Zeit wird ein optionaler Wert fuer die Verbindungswiederholung uebergeben:
 *
 *      netOptions: { connectInfiniteFlag: true }
 *
 *      connectInfiniteFlag - true, wenn Verbindung alle NET_CONNECT_INTERVAL Millisekunden erneut
 *                            aufgebaut werden soll.
 *                            Defaultwert ist false.
 */


/**
 * Die Net Klasse kapselt eine HTML5-WebSocket
 */

export class NetHtml5WebSocket extends ErrorBase {

    /**
     * WebSocket-Klasse
     * @member {Object} mWebSocketClass
     * @private
     */

    mWebSocketClass: any = null;


    // WebSocket

    mWebSocketUrl = '';
    mWebSocket: WebSocket = null;
    mWebSocketOpenFlag = false;


    // Verbindungswiederholungen

    mConnectInfiniteFlag = false;
    mConnectIntervalId: any = 0;
    mConnectIntervalTimeout = NET_CONNECTINTERVAL_TIMEOUT;


    // Ereignisse

    mOnOpenFunc: OnNetHtml5OpenFunc = null;
    mOnCloseFunc: OnNetHtml5CloseFunc = null;
    mOnMessageFunc: OnNetHtml5MessageFunc = null;
    mOnErrorFunc: OnNetHtml5ErrorFunc = null;


    /**
     * Creates an instance of Net-WebSocket.
     *
     * @param {string} aClassName - Name der erbenden Klasse
     */

    constructor( aClassName?: string ) {
        super( aClassName || 'NetHtml5WebSocket' );
        // verbinden der Errorfunktion mit dem ErrorEvent
        this._setErrorOutputFunc((aErrorText: string) => this._onError( new Error( aErrorText )));
    }


    /**
     * Initialisierung der WebSocket-Verbindung
     *
     * @param {Object} aOption - Optionale Parameter (Beschribung siehe oben)
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        // console.log('NetHtml5WebSocket.init:', aOption);

        // pruefen auf vorhandenen WebSocket in HTML5

        if ( !this._detectWebSocket()) {
            return -1;
        }

        // pruefen auf staendigen Verbindungsaufbau

        if ( aOption && aOption.connectInfiniteFlag ) {
            this.mConnectInfiniteFlag = true;
            if ( this.isErrorOutput()) {
                console.log('NetHtml5WebSocket.init: ConnectInfinite eingeschaltet');
            }
        }

        return 0;
    }


    /**
     * WebSocket schliessen
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    done(): number {
        if ( this.mWebSocket ) {
            this.mWebSocket.onopen = null;
            this.mWebSocket.onclose = null;
            this.mWebSocket.onmessage = null;
            this.mWebSocket.onerror = null;
            this.close();
            this.mWebSocket = null;
        }
        this.mWebSocketOpenFlag = false;
        this.mWebSocketClass = null;
        this.mWebSocketUrl = '';
        this.mConnectInfiniteFlag = false;
        this.mConnectIntervalId = 0;
        this.mConnectIntervalTimeout = NET_CONNECTINTERVAL_TIMEOUT;

        // Ereignisse

        this.mOnOpenFunc = null;
        this.mOnCloseFunc = null;
        this.mOnMessageFunc = null;
        this.mOnErrorFunc = null;

        return 0;
    }


    isInit(): boolean {
        if ( this.mWebSocketClass ) {
            return true;
        }
        return false;
    }


    /**
     * Feststellen, ob HTML5 WebSocket API vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn WebSocket existiert, false sonst
     */

    _detectWebSocket(): boolean {
        // console.log('NetHtml5WebSocket._detectWebSocket:', window.WebSocket);

        // Initialisierung der WebSocketFactory, ist noch keine Fabrik vorhanden, wird sie eingetragen

        const webSocketFactory = FactoryManager.get( WEBSOCKET_FACTORY_NAME, WebSocketFactory ) as WebSocketFactory;
        if ( !webSocketFactory ) {
            this._error( '_detectWebSocket', 'keine WebSocket-Fabrik vorhanden' );
            return false;
        }

        try {
            this.mWebSocketClass = webSocketFactory.create();
        } catch (aException) {
            this._exception( '_detectWebSocket', aException );
            return false;
        }

        if ( this.mWebSocketClass === null ) {
            this._error( '_detectWebSocket', 'keine WebSocketClass vorhanden' );
            return false;
        }

        return true;
    }


    /**
     * WebSocket-Verbindung aufbauen
     *
     * @param {string} aUrl - WebSocket-Adresse
     * @return {number} errorCode (0,-1)
     */

    open( aUrl?: string ): number {
        if ( this.isOpen()) {
            this._error( 'open', 'bereits geoeffnet' );
            return -1;
        }

        // erste Verbindung aufbauen

        return this._connect( aUrl );
    }


    /**
     * WebSocket-Verbindung beenden
     *
     * @return {number} errorCode (0,-1)
     */

    close(): number {
        // console.log('NetHtml5WebSocket.close');
        this.mWebSocketOpenFlag = false;
        if ( this.mWebSocket ) {
            this._clearInfiniteConnect();
            try {
                // TODO: sonst wird der Close-Event nicht erzeugt
                // this.mWebSocket.onclose = () => {};
                this.mWebSocket.close( 1000, 'Closing normally');
            } catch (aException) {
                this._exception( 'close', aException );
                this.mWebSocket = null;
                return -1;
            }
        }
        return 0;
    }


    /**
     * pruefen auf geoeffnete WebSocket-Verbindung mit dem SpeechServer
     *
     * @return {boolean} true, wenn WebSocket verbunden
     */

    isOpen(): boolean {
        return this.mWebSocketOpenFlag;
    }


    isConnect(): boolean {
        if ( this.mWebSocket && this.mWebSocket.readyState === 1 ) {
            return true;
        }
        return false;
    }


    /**
     * Rueckgabe des WebSocket-Zustands als TEXT
     */

    getState(): string {
        if ( !this.mWebSocket ) {
            return 'NULL';
        }
        let stateStr = '';
        switch ( this.mWebSocket.readyState ) {
        case 0:
            stateStr = 'CONNECTING';
            break;
        case 1:
            stateStr = 'OPEN';
            break;
        case 2:
            stateStr = 'CLOSING';
            break;
        case 3:
            stateStr = 'CLOSED';
            break;
        default:
            stateStr = 'UNKNOW';
            break;
        }
        return stateStr;
    }


    /**
     * Nachricht als JSON-Objekt versenden
     *
     * @param {Object} aMessage
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    sendMessage( aMessage: any ): number {
        // console.log('NetHtml5WebSocket.sendMessage: start', aMessage);
        if ( !this.isOpen()) {
            this._error( 'sendMessage', 'WebSocket ist nicht geoeffnet' );
            return -1;
        }
        if ( !this.mWebSocket ) {
            // TODO: kann zu einer Endlosschleife fuehren, wenn der Fehler ueber sendMessage versendet werden soll !
            this._error( 'sendMessage', 'keine WebSocket vorhanden' );
            return -1;
        }
        try {
            this.mWebSocket.send( JSON.stringify( aMessage ));
            return 0;
        } catch (aException) {
            // TODO: kann zu einer Endlosschleife fuehren, wenn der Fehler ueber sendMessage versendet werden soll !
            this._exception( 'sendMessage', aException );
            return -1;
        }
    }


    get webSocket() {
        return this.mWebSocket;
    }


    set webSocketUrl( aUrl: string ) {
        this.mWebSocketUrl = aUrl;
    }


    get webSocketUrl() {
        return this.mWebSocketUrl;
    }


    // Events eintragen


    /**
     * Event-Funktion fuer erzeugten WebWorker
     *
     * @param {function} aOnOpenFunc - Ereignis fuer erzeugten WebWorker
     */

    set onOpen( aOnOpenFunc: OnNetHtml5OpenFunc ) {
        this.mOnOpenFunc = aOnOpenFunc;
    }


    /**
     * Event-Funktion fuer geloeschten WebWorker
     *
     * @param {function} aOnCloseFunc - Ereignis fuer geloeschten WebWorker
     */

    set onClose( aOnCloseFunc: OnNetHtml5CloseFunc ) {
        this.mOnCloseFunc = aOnCloseFunc;
    }


    /**
     * Event-Funktion fuer empfangene Nachrichten
     *
     * @param {function} aOnMessageFunc - Ereignis fuer empfangene Nachricht
     */

    set onMessage( aOnMessageFunc: OnNetHtml5MessageFunc ) {
        this.mOnMessageFunc = aOnMessageFunc;
    }


    /**
     * Error-Event Funktion eintragen
     *
     * @param {OnSpeechErrorFunc} aOnErrorFunc
     */

    set onError( aOnErrorFunc: OnNetHtml5ErrorFunc ) {
        // console.log('NetHtml5WebSocket.onError:', aOnErrorFunc);
        this.mOnErrorFunc = aOnErrorFunc;
    }


    // Event-Funktionen


    /**
     * Oeffnen Ereignis
     *
     * @private
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    _onOpen(): number {
        // console.log('NetHtml5WebSocket._onOpen');
        // Open-Ereignisfunktion aufrufen
        if ( typeof this.mOnOpenFunc === 'function' ) {
            try {
                return this.mOnOpenFunc( this.mWebSocketUrl );
            } catch ( aException ) {
                this._exception( '_onOpen', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Schliessen Ereignis
     *
     * @private
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    _onClose(): number {
        // console.log('NetHtml5WebSocket._onClose');
        if ( typeof this.mOnCloseFunc === 'function' ) {
            try {
                // console.log('NetHtml5WebSocket._onClose:', this.mOnCloseFunc);
                return this.mOnCloseFunc();
            } catch ( aException ) {
                this._exception( '_onClose', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Nachricht empfangen Ereignis
     *
     * @private
     * @param {*} aMessage - Message
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    _onMessage( aMessage: any ): number {
        // console.log('NetHtml5WebSocket._onMesseage:', aMessage);
        if ( typeof this.mOnMessageFunc === 'function' ) {
            try {
                return this.mOnMessageFunc( aMessage );
            } catch ( aException ) {
                this._exception( '_onMessage', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Ereignisfunktion fuer Fehler aufrufen
     *
     * @private
     * @param {any} aError - Error Datentransferobjekt
     * @return {number} errorCode(0,-1)
     */

    _onError( aError: any ): number {
        // console.log('NetHtml5WebSocket._onError:', aError);
        if (typeof this.mOnErrorFunc === 'function') {
            try {
                // console.log('NetHtml5WebSocket._onError: call', this.mOnErrorFunc);
                let error = aError;
                if ( aError.type === 'error' ) {
                    if ( this.mWebSocket && this.mWebSocket.readyState === 3 ) {
                        error = new Error( 'Verbindung wurde nicht aufgebaut' );
                    }
                }
                return this.mOnErrorFunc( error );
            } catch ( aException ) {
                if ( this.isErrorOutput()) {
                    // hier darf nicht this._exception() verwendet werden, da sonst eine Endlosschleife entstehen kann!
                    console.log( '===> EXCEPTION Plugin._onError: ', aException.message );
                }
                return -1;
            }
        }
        return 0;
    }


    /**
     * WebSocket oeffnen Ereignis
     *
     * @private
     * @param {Object} aEvent - Oeffnen Ereignis
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    _webSocketOpen( aEvent: any ): number {
        // console.log('NetHtml5WebSocket._webSocketOpen: start', aEvent);
        this.mWebSocketOpenFlag = true;
        this._clearInfiniteConnect();
        // TODO: Dieser Event wird nicht mehr benoetigt (erst mal wird ein MessageEvent-Dummy versendet)
        if ( this._onMessage({ data: '{ "event": "start" }' }) !== 0 ) { return -1; }
        if ( this._onOpen() !== 0 ) { return -1; }
        // console.log('NetHtml5WebSocket._webSocketOpen: end');
        return 0;
    }


    /**
     * WebSocket schliessen Ereignis
     *
     * @private
     * @param {Object} aEvent - Schliessen Ereignis
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    _webSocketClose( aEvent: any ): number {
        // console.log('NetHtml5WebSocket._webSocketClose:', aEvent);
        this.mWebSocketOpenFlag = false;
        this.mWebSocket = null;
        this._setInfiniteConnect();
        return this._onClose();
    }


    /**
     * WebSocket Nachricht empfangen Ereignis
     *
     * @private
     * @param {Object} aEvent - Message Ereignis
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    _webSocketMessage( aMessage: any ): number {
        // console.log('NetHtml5WebSocket._webSocketMessage:', aMessage);
        // TODO: hier wird Nachricht noch aufbereitet
        try {
            // Nachricht wird roh weitergegeben
            return this._onMessage( aMessage );
        } catch (aException) {
            this._exception( '_webSocketMessage', aException );
            return -1;
        }
    }


    /**
     * WebSocket Error Ereignis
     *
     * @private
     * @param {Object} aEvent - Error Ereignis
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    _webSocketError( aEvent: any ): number {
        // console.log('NetHtml5WebSocket._webSocketError: ', aEvent, aEvent.message);
        // pruefen auf Fehlermeldung
        return this._onError( new Error( 'WebSocket wurde nicht verbunden' ));
    }


    /**
     * Aufbau der WebSocket-Verbindung mit dem Speech-Server
     *
     * @private
     * @return {number} errorCode (0,-1) Fehlercode
     */

    _connect( aUrl?: string ): number {
        // console.log('NetHtml5WebSocket._connect:', aUrl);
        if ( this.isOpen()) {
            // Verbindung ist vorhanden
            return 0;
        }

        if ( this.mWebSocket ) {
            // WebSocket existiert noch 
            this._error( '_connect', 'webSocket noch nicht geschlossen' );
            return -1;
        }

        // pruefen auf WebSocketClass

        if ( !this.mWebSocketClass ) {
            this._error( '_connect', 'keine WebSocketClass vorhanden' );
            return -1;
        }

        // pruefen auf Url

        if ( aUrl ) {
            this.mWebSocketUrl = aUrl;
        }

        if ( !this.mWebSocketUrl ) {
            this._error( '_connect', 'keine WebSocketUrl vorhanden' );
            return -1;
        }

        try {
            this.mWebSocket = new this.mWebSocketClass( this.mWebSocketUrl );
            if ( !this.mWebSocket ) {
                this._error( '_connect', 'keine WebSocket erzeugt' );
                return -1;
            }

            // Ereignisfunktionen eintragen

            this.mWebSocket.binaryType = 'arraybuffer';
            this.mWebSocket.onopen = (aEvent: any) => this._webSocketOpen( aEvent );
            this.mWebSocket.onclose = (aEvent: any) => this._webSocketClose( aEvent );
            this.mWebSocket.onmessage = (aEvent: any) => this._webSocketMessage( aEvent );
            this.mWebSocket.onerror = (aEvent: any) => this._webSocketError( aEvent );

            // console.log('NetHtml5WebSocket._connect:', this.mWebSocket);
            return 0;
        } catch (aException) {
            // console.log('NetHtml5WebSocket._connect: Exception', aException);
            this._exception( '_connect', aException );
            this.mWebSocket = null;
            return -1;
        }
    }


    /**
     * Erzeugen der Intervall-Aufrufe fuer Connect
     *
     * @private
     */

    _setInfiniteConnect(): void {
        // pruefen auf ConnectInfinite

        if ( !this.mConnectInfiniteFlag ) {
            return;
        }

        // console.log('NetHtml5WebSocket._setInfiniteConnect: start', this.mConnectIntervalId);
        if ( this.mConnectIntervalId === 0 ) {
            this.mConnectIntervalId = setInterval(() => {
                this._connect( this.mWebSocketUrl );
            }, this.mConnectIntervalTimeout );
            // console.log('NetHtml5WebSocket._setInfiniteConnect: set', this.mConnectIntervalId);
        }
    }


    /**
     * Loeschen der Intervall-Connect Aufrufe
     *
     * @private
     */

    _clearInfiniteConnect(): void {
        // console.log('NetHtml5WebSocket._clearInfiniteConnect: start', this.mConnectIntervalId);
        if ( this.mConnectIntervalId !== 0 ) {
            clearInterval( this.mConnectIntervalId );
            this.mConnectIntervalId = 0;
            // console.log('NetHtml5WebSocket._clearInfiniteConnect: clear', this.mConnectIntervalId);
        }
    }

}
