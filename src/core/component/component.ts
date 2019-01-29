/**
 * Komponente als semantische Einheit fuer Plugins und Klassen.
 *
 * Letzte Aenderung: 15.12.2018
 * Status: gruen
 *
 * @module core/component
 * @author SB
 */


// global

import { SPEECH_API_VERSION } from './../../const/speech-version';
import {
    SPEECH_INIT_EVENT,
    SPEECH_ERROR_EVENT
} from '../../const/speech-event-const';

import { OnSpeechErrorFunc } from '../../interface/speech-function.type';
import { SpeechMessageInterface, SpeechSendMessageFunc } from '../../interface/speech-message.interface';


// event

import { EventFunctionList, EventFunc } from '../event/event-function-list';


// plugin

import { PluginGroup } from '../plugin/plugin-group';


// component

import { ComponentInterface } from './component.interface';


/**
 * Definiert die Basisklasse aller Komponenten
 */

export class Component extends PluginGroup implements ComponentInterface {


    mSendMessageFunc: SpeechSendMessageFunc = null;

    // Events

    mInitEvent = new EventFunctionList( SPEECH_INIT_EVENT );
    mErrorEvent = new EventFunctionList( SPEECH_ERROR_EVENT );


    /**
     * Creates an instance of Component
     *
     * @param {string} aComponentName - Name der Komponente
     * @param {boolean} aRegisterFlag - wenn true, dann wird Komponente in PluginManager eingetragen
     */

    constructor( aComponentName: string, aRegisterFlag = true ) {
        super( aComponentName, aRegisterFlag );
        this.mInitEvent.setComponentName( aComponentName );
        this.mErrorEvent.setComponentName( aComponentName );
        this.mInitEvent._setErrorOutputFunc(this._getErrorOutputFunc());
        this.mErrorEvent._setErrorOutputFunc(this._getErrorOutputFunc());
    }


    // Komponenten-Funktionen


    getType(): string {
        return 'Component';
    }


    getClass(): string {
        return 'Component';
    }


    getVersion(): string {
        return SPEECH_API_VERSION;
    }


    /**
     * Initalisiert das Plugin
     *
     * @param {any} [aOption] - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        if ( super.init( aOption ) !== 0 ) {
            return -1;
        }
        return 0;
    }


    /**
     * Gibt das plugin frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    done(): number {
        this.mInitEvent.clear();
        this.mErrorEvent.clear();
        return super.done();
    }


    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */

    _setErrorOutput( aErrorOutputFlag: boolean ): void {
        super._setErrorOutput( aErrorOutputFlag );
        this.mInitEvent._setErrorOutput( aErrorOutputFlag );
        this.mErrorEvent._setErrorOutput( aErrorOutputFlag );
        this._setErrorOutputAllPlugin( aErrorOutputFlag );
    }


    // Netz-Funktionen


    /**
     * Komponente mit Server verbinden
     *
     * @returns {number} errorCode(0,-1)
     */

    connect(): number {
        return 0;
    }


    /**
     * Pruefen, ob Komponente erfolgreich mit dem Server verbunden ist
     *
     * @return {boolean} true, erfolgreich verbunden, false sonst.
     */

    isConnect(): boolean {
        return true;
    }


    /**
     * Rueckgabe des Typs des Speech-APIs
     *
     * @public
     *
     * @return {string} type des Speech-APIS (web, cordova)
     */

    getNetType(): string {
        return 'undefined';
    }


    /**
     * EventListener in alle registrierten Plugins eintragen
     *
     * @private
     * @param {string} aPluginName - Name des Plugins, welches eine Eventfunktion eintraegt
     * @param {string} aEventName - Name des Events
     * @param {EventFunc} aEventFunc - Funktion fuer den Event
     *
     * @return {number} errorCode (0,-1) - Fehlercode, ob Event eingetragen wurde oder nicht
     */

    _addEventListenerAllPlugin( aPluginName: string, aEventName: string, aEventFunc: EventFunc ): number {
        // console.log('Component.addEventListenerAllPlugin:', this.getName());
        try {
            let result = -1;
            let plugin = this.mPluginList.first();
            while ( plugin ) {
                // nur Komponenten haben EventListener
                if ( plugin instanceof Component ) {
                    const component = plugin as Component;
                    // console.log('Component.addEventListenerAllPlugin:', plugin.getName(), component);
                    if ( component ) {
                        // console.log('Component.addEventAllPlugin:', this.getName(), component.getName());
                        if ( component.addEventListener( aPluginName, aEventName, aEventFunc ) === 0 ) {
                            result = 0;
                        }
                    }
                }
                plugin = this.mPluginList.next();
            }
            return result;
        } catch ( aException ) {
            this._exception( 'addEventListenerAllPlugin', aException );
            return -1;
        }
    }


    /**
     * EventListener aus allen registrierten Plugins entfernen
     *
     * @private
     * @param {string} aPluginName - Name des Plugins, welches eine Eventfunktion eintraegt
     * @param {string} aEventName - Name des Events
     *
     * @return {number} errorCode (0,-1) - Fehlercode, ob ein Event entfernt wurde
     */

    _removeEventListenerAllPlugin( aPluginName: string, aEventName: string ): number {
        // console.log('Component.removeEventListenerAllPlugin:', this.getName());
        try {
            let result = -1;
            let plugin = this.mPluginList.first();
            while ( plugin ) {
                // nur Komponenten haben EventListener
                if ( plugin instanceof Component ) {
                    const component = plugin as Component;
                    // console.log('Component.removeEventListenerAllPlugin:', plugin.getName(), component);
                    if ( component ) {
                        // console.log('Component.removeEventAllPlugin:', this.getName(), component.getName());
                        if ( component.removeEventListener( aPluginName, aEventName ) === 0 ) {
                            result = 0;
                        }
                    }
                }
                plugin = this.mPluginList.next();
            }
            return result;
        } catch ( aException ) {
            this._exception( 'removeEventListenerAllPlugin', aException );
            return -1;
        }
    }


    // Bindungs-Funktionen


    /**
     * Eintragen der externen SendMessage-Funktion
     *
     * @param {SpeechSendMessageFunc} aSendMessageFunc
     * @memberof SpeechListen
     */

    setSendMessageFunc( aSendMessageFunc: SpeechSendMessageFunc ): number {
        this.mSendMessageFunc = aSendMessageFunc;
        return 0;
    }


    // Nachrichten-Funktionen


    /**
     * Senden einer Nachricht
     *
     * @param {SpeechMessageInterface} aMessage
     * @return {number}
     */

    sendMessage( aMessage: SpeechMessageInterface ): number {
        if ( typeof this.mSendMessageFunc !== 'function' ) {
            return -1;
        }
        return this.mSendMessageFunc( aMessage );
    }


    /**
     * Behandelt alle empfangenen Nachrichten
     *
     * @param {SpeechMessageInterface} aMessage - Nachrichtenpaket
     * @return {number} errorCode(0,-1)
     */

    handleMessage( aMessage: SpeechMessageInterface ): number {
        try {
            let result = 0;
            switch ( aMessage.event ) {

                case SPEECH_INIT_EVENT:
                    // console.log('Component.handleMessage: error event');
                    result = this.mInitEvent.dispatch( aMessage );
                    break;

                case SPEECH_ERROR_EVENT:
                    // console.log('Component.handleMessage: error event');
                    result = this.mErrorEvent.dispatch( aMessage );
                    break;

                default:
                    this._error( 'handleMessage', 'ungueltige Nachricht: ' + aMessage.event);
                    result = -1;
                    break;
            }
            return result;
        } catch ( aException ) {
            this._exception( 'handleMessage', aException );
            return -1;
        }
    }


    // Event-Funktionen


    /*
     * Kommentar:
     *
     * Generische Eventfunktions-API dient der Verbindung der Kompnenten
     * untereinander ueber Ereignisfunktionen.
     */


    /**
     * Ereignisfunktion fuer Sprachausgabe gestoppt
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onInit(): number {
        // console.log('Component._onInit:', this.getName());
        return this.mInitEvent.dispatch( this.getName());
    }


    get onInit(): OnSpeechErrorFunc {
        return () => this._onInit();
    }


    /**
     * Ereignisfunktion fuer Sprachausgabe gestoppt
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onError( aError: any ): number {
        // console.log('Component._onError:', this.getName(), aError.message);
        return this.mErrorEvent.dispatch( aError );
    }


    get onError(): OnSpeechErrorFunc {
        return (aError: any) => this._onError( aError );
    }


    /**
     * EventFunktion eintragen
     *
     * @param {string} aPluginName - Name des Listeners
     * @param {string} aEventName - Name des Events
     * @param {EventFunc} aEventFunc - Funktion fuer den Event
     *
     * @return {number} errorcode(0,-1)
     */

    addEventListener( aPluginName: string, aEventName: string, aEventFunc: EventFunc ): number {
        let result = 0;
        switch ( aEventName ) {

            case SPEECH_INIT_EVENT:
                // console.log('Component.addEventListener: init event');
                result = this.mInitEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_ERROR_EVENT:
                // console.log('Component.addEventListener: error event');
                this._addEventListenerAllPlugin( aPluginName, aEventName, aEventFunc );
                result = this.mErrorEvent.addListener( aPluginName, aEventFunc );
                break;

            default:
                // in alle Unterkomponenten den Event eintragen, wenn moeglich
                result = this._addEventListenerAllPlugin( aPluginName, aEventName, aEventFunc );
                break;
        }
        return result;
    }


    /**
     * EventFunktion entfernen
     *
     * @param {string} aPluginName - Name des Listeners (Pluginname)
     * @param {string} aEventName - Name des Events
     */

    removeEventListener( aPluginName: string, aEventName: string ): number {
        let result = 0;
        switch ( aEventName ) {

            case SPEECH_INIT_EVENT:
                result = this.mInitEvent.removeListener( aPluginName );
                break;

            case SPEECH_ERROR_EVENT:
                this._removeEventListenerAllPlugin( aPluginName, aEventName );
                result = this.mErrorEvent.removeListener( aPluginName );
                break;

            default:
                result = this._removeEventListenerAllPlugin( aPluginName, aEventName );
                break;
        }
        return result;
    }

}
