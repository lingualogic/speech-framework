/**
 * Die NetHtmpl5Connect-Komponente dient zum testen einer Internet-Verbindung (online/offline)
 *
 * Letzte Aenderung: 18.03.2019
 * Status: gelb
 *
 * @module common/html5
 * @author SB
 */


// core

import { ErrorBase } from './../../core/error/error-base';


// Funktionstypen

export type OnNetHtml5OnlineFunc = () => number;
export type OnNetHtml5OfflineFunc = () => number;
export type OnNetHtml5ErrorFunc = (aError: any) => number;


/**
 * Die Net Klasse kapselt eine Internet
 */

export class NetHtml5Connect extends ErrorBase {


    mInitFlag = false;

    // Ereignisse

    mOnOnlineFunc: OnNetHtml5OnlineFunc = null;
    mOnOfflineFunc: OnNetHtml5OfflineFunc = null;
    mOnErrorFunc: OnNetHtml5ErrorFunc = null;


    /**
     * Creates an instance of Net-WebSocket.
     *
     * @param {string} aClassName - Name der erbenden Klasse
     */

    constructor( aClassName?: string ) {
        super( aClassName || 'NetHtml5Connect' );
        // verbinden der Errorfunktion mit dem ErrorEvent
        this._setErrorOutputFunc((aErrorText: string) => this._onError( new Error( aErrorText)));
    }


    /**
     * Initialisierung 
     *
     * @param {Object} aOption - Optionale Parameter (Beschribung siehe oben)
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        // console.log('NetHtml5Connect.init:', aOption);

        // Ereignisse online/offline mit Funktionen verbinden
        try {
            if ( window ) {
                window.ononline = () => this._onOnline();
                window.onoffline = () => this._onOffline();
            }
        } catch ( aException ) {
            this._exception( 'init', aException );
            return -1;
        }
    
        this.mInitFlag = true;
        return 0;
    }


    isInit(): boolean {
        return this.mInitFlag;
    }


    /**
     * Freigabe
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    done(): number {
        window.ononline = null;
        window.onoffline = null;
        this.mOnOnlineFunc = null;
        this.mOnOfflineFunc = null;
        this.mOnErrorFunc = null;
        this.mInitFlag = false;
        return 0;
    }


    isOnline(): boolean {
        if ( navigator ) {
            return navigator.onLine;
        }
        return false;
    }


    // Events eintragen


    /**
     * Event-Funktion fuer Online
     *
     * @param {function} aOnOnlineFunc - Ereignis fuer Online
     */

    set onOnline( aOnOnlineFunc: OnNetHtml5OnlineFunc ) {
        this.mOnOnlineFunc = aOnOnlineFunc;
    }


    /**
     * Event-Funktion fuer Offline
     *
     * @param {function} aOnOfflineFunc - Ereignis fuer Offline
     */

    set onOffline( aOnOfflineFunc: OnNetHtml5OfflineFunc ) {
        this.mOnOfflineFunc = aOnOfflineFunc;
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
     * Online-Ereignis 
     *
     * @private
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    _onOnline(): number {
        // console.log('NetHtml5Connect._onOnline');
        if ( typeof this.mOnOnlineFunc === 'function' ) {
            try {
                return this.mOnOnlineFunc();
            } catch ( aException ) {
                this._exception( '_onOnline', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Offline-Ereignis
     *
     * @private
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    _onOffline(): number {
        // console.log('NetHtml5Connect._onOffline');
        if ( typeof this.mOnOfflineFunc === 'function' ) {
            try {
                return this.mOnOfflineFunc();
            } catch ( aException ) {
                this._exception( '_onOffline', aException );
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
        // console.log('NetHtml5Connect._onError:', aError);
        if (typeof this.mOnErrorFunc === 'function') {
            try {
                return this.mOnErrorFunc( aError );
            } catch ( aException ) {
                if ( this.isErrorOutput()) {
                    // hier darf nicht this._exception() verwendet werden, da sonst eine Endlosschleife entstehen kann!
                    console.log( '===> EXCEPTION NetHtml5Connect._onError: ', aException.message );
                }
                return -1;
            }
        }
        return 0;
    }

}
