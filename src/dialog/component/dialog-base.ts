/**
 * DialogBase definiert die Basisfunktionalitaet fuer eine Dialog-Komponente.
 * Von dieser Klasse koennen weitere Varianten der Dialog-Komponente abgeleitet werden.
 *
 * Letzte Aenderung: 15.12.2018
 * Status: gelb
 *
 * @module dialog/component
 * @author SB
 */


// global

import {
    SPEECH_DIALOGPARSE_EVENT,
    SPEECH_DIALOGSET_EVENT,
    SPEECH_DIALOGSTART_EVENT,
    SPEECH_DIALOGSTOP_EVENT,
    SPEECH_DIALOGSTATESET_EVENT,
    SPEECH_DIALOGACTION_EVENT,
    SPEECH_DIALOGACTIONSTOP_EVENT,
    SPEECH_DIALOGSPEAK_EVENT,
    SPEECH_DIALOGSPEAKSTART_EVENT,
    SPEECH_DIALOGSPEAKSTOP_EVENT,
    SPEECH_ERROR_EVENT
} from '../../const/speech-event-const';
import { OnSpeechErrorFunc } from '../../interface/speech-function.type';


// event

import { EventFunctionList, EventFunc } from '../../core/event/event-function-list';


// base

import { BaseComponent } from '../../base/component/base-component';


// file

import { OnFileReaderReadFunc } from '../../file/reader/file-reader.interface';


// parser

import { ParserSpeechDefFileFunc, ParserSpeechDefDataFunc } from '../parser/parser.interface';


// dialog

import { DIALOG_API_VERSION } from '../dialog-version';
import {
    OnDialogParseFunc,
    OnDialogSetFunc,
    OnDialogStartFunc,
    OnDialogStopFunc,
    OnDialogStateSetFunc,
    OnDialogActionFunc,
    OnDialogActionStopFunc,
    OnDialogSpeakFunc,
    OnDialogSpeakStartFunc,
    OnDialogSpeakStopFunc,
    DialogWriteFileDataFunc
} from '../dialog-function.type';
import {
    DIALOG_TYPE_NAME,
    DIALOG_PATH_NAME,
    DIALOG_FILE_NAME,
    DIALOG_LOAD_FLAG,
    DIALOG_MAIN_NAME,
    DIALOG_ROOTSTATE_NAME
} from '../dialog-const';
import { DialogActionInterface } from '../dialog-action.interface';
import { DialogSpeakInterface } from '../dialog-speak.interface';
import { DialogStateContextInterface } from '../dialog-state-context.interface';
import { DialogOptionInterface } from '../dialog-option.interface';
import { DialogComponentInterface } from './dialog-component.interface';
import { DialogContext } from './dialog-context';


/** @export
 * DialogProxy Klasse
 */

export class DialogBase extends BaseComponent implements DialogComponentInterface {

    // innere Listen

    mDialogContext = new DialogContext();

    // Funktionen

    mParseSpeechDefFileFunc: ParserSpeechDefFileFunc = null;
    mParseSpeechDefDataFunc: ParserSpeechDefDataFunc = null;
    mReadFileFunc: OnFileReaderReadFunc = null;

    // Events

    mDialogParseEvent = new EventFunctionList( SPEECH_DIALOGPARSE_EVENT );
    mDialogSetEvent = new EventFunctionList( SPEECH_DIALOGSET_EVENT );
    mDialogStartEvent = new EventFunctionList( SPEECH_DIALOGSTART_EVENT );
    mDialogStopEvent = new EventFunctionList( SPEECH_DIALOGSTOP_EVENT );
    mDialogStateSetEvent = new EventFunctionList( SPEECH_DIALOGSTATESET_EVENT );
    mDialogActionEvent = new EventFunctionList( SPEECH_DIALOGACTION_EVENT );
    mDialogActionStopEvent = new EventFunctionList( SPEECH_DIALOGACTIONSTOP_EVENT );
    mDialogSpeakEvent = new EventFunctionList( SPEECH_DIALOGSPEAK_EVENT );
    mDialogSpeakStartEvent = new EventFunctionList( SPEECH_DIALOGSPEAKSTART_EVENT );
    mDialogSpeakStopEvent = new EventFunctionList( SPEECH_DIALOGSPEAKSTOP_EVENT );

    // interne Attribute

    mDialogLoadFlag = DIALOG_LOAD_FLAG;
    mDialogFilePath = DIALOG_PATH_NAME; // lokaler Pfad zur Dialog-Def-Datei
    mDialogFileName = DIALOG_FILE_NAME;
    mActivDialogFlag = false;


    /**
     * DialogBase Objekt erzeugen
     *
     * @param {string} aComponentName - Name der aktuellen Komponente
     * @param {boolean} aRegisterFlag - bestimmt, ob Komponente in PluginManager eingetragen wird
     */

    constructor( aComponentName: string, aRegisterFlag = true ) {
        super( aComponentName, aRegisterFlag );
        // eintragen der Fehlerfunktion
        this.mDialogContext._setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogParseEvent._setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogSetEvent._setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogStartEvent._setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogStopEvent._setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogStateSetEvent._setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogActionEvent._setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogActionStopEvent._setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogSpeakEvent._setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogSpeakStartEvent._setErrorOutputFunc( this._getErrorOutputFunc());
        this.mDialogSpeakStopEvent._setErrorOutputFunc( this._getErrorOutputFunc());
        // eintragen des Komponentennamens
        this.mDialogParseEvent.setComponentName( aComponentName );
        this.mDialogSetEvent.setComponentName( aComponentName );
        this.mDialogStartEvent.setComponentName( aComponentName );
        this.mDialogStopEvent.setComponentName( aComponentName );
        this.mDialogStateSetEvent.setComponentName( aComponentName );
        this.mDialogActionEvent.setComponentName( aComponentName );
        this.mDialogActionStopEvent.setComponentName( aComponentName );
        this.mDialogSpeakEvent.setComponentName( aComponentName );
        this.mDialogSpeakStartEvent.setComponentName( aComponentName );
        this.mDialogSpeakStopEvent.setComponentName( aComponentName );
    }


    getType(): string {
        return DIALOG_TYPE_NAME;
    }


    getClass(): string {
        return 'DialogBase';
    }


    getVersion(): string {
        return DIALOG_API_VERSION;
    }


    getServerVersion(): string {
        return '';
    }


    // Komponenten-Funktionen


    /**
     * Eintragen der optionalen Parameter fuer die Startkonfiguration des Service
     *
     * @protected
     * @param {DialogOptionInterface} aOption - optionale Parameter fuer Dialogkonfiguration
     */

    _setOption( aOption: DialogOptionInterface ): number {
        // pruefen auf vorhandene Options
        if ( !aOption ) {
            return -1;
        }
        // Dialog-Name eintragen
        if ( typeof aOption.dialogName === 'string' ) {
            // console.log('DialogBase._setOption: dialogName', aOptions.dialogName);
            this.setDialog( aOption.dialogName );
        }
        // Dialog-Startzustand eintragen
        if ( typeof aOption.dialogRootState === 'string' ) {
            // console.log('DialogBase._setOption: dialogRootState', aOptions.dialogRootState);
            this.setDialogState( aOption.dialogRootState );
        }
        // Dialogladeflag eintragen
        if ( typeof aOption.dialogLoadFlag === 'boolean' ) {
            // console.log('DialogBase._setOption: dialogLoadFlag =', aOption.dialogLoadFlag);
            if ( aOption.dialogLoadFlag === true ) {
                this.mDialogLoadFlag = true;
            } else {
                this.mDialogLoadFlag = false;
            }
        }
        // Dialog-Dateipfad eintragen
        if ( typeof aOption.dialogFilePath === 'string' ) {
            // console.log('DialogBase._setOption: dialogFilePath =', aOptions.dialogFilePath);
            this.setDialogFilePath( aOption.dialogFilePath );
        }
        // Dialog-Dateiname eintragen
        if ( typeof aOption.dialogFileName === 'string' ) {
            // console.log('DialogBase._setOption: dialogFileName =', aOptions.dialogFileName);
            this.setDialogFileName( aOption.dialogFileName );
        }
        return super._setOption( aOption );
    }


    /**
     * Initialisierung des Speech-Systems
     *
     * @param {DialogOptionInterface} aOption - optionale Parameter {}
     *
     * @return {number} errorcode (0,-1)
     */

    init( aOption?: DialogOptionInterface ): number {
        // console.log('DialogProxy.init:', aOptions);

        // Initialisierung erfolgreich

        if ( super.init( aOption ) !== 0 ) {
            return -1;
        }

        // Verbindung mit Netz aufbauen

        if ( this.connect() !== 0 ) {
            this._clearInit();
            return -1;
        }

        // optional Dialogdatei laden

        // console.log('DialogComponent.init: Dialogdatei wird geladen');
        if ( this.mDialogLoadFlag && this.loadDialogFile() !== 0 ) {
            this._error( 'init', 'Dialogdatei nicht geladen' );
            this._clearInit();
            return -1;
        }

        return 0;
    }


    /**
     * Loeschen der inneren Events
     */

    _doneAllEvent(): void {
        // Events

        this.mDialogParseEvent.clear();
        this.mDialogSetEvent.clear();
        this.mDialogStartEvent.clear();
        this.mDialogStopEvent.clear();
        this.mDialogStateSetEvent.clear();
        this.mDialogActionEvent.clear();
        this.mDialogActionStopEvent.clear();
        this.mDialogSpeakEvent.clear();
        this.mDialogSpeakStartEvent.clear();
        this.mDialogSpeakStopEvent.clear();
    }


    /**
     * Loeschen der inneren Attribute
     *
     * @protected
     */

    _doneAllAttribute(): void {
        // interne Attribute

        this.mDialogContext.clear();
        this.mReadFileFunc = null;

        this.mDialogFilePath = DIALOG_PATH_NAME; // lokaler Pfad zur Dialog-Def-Datei
        this.mDialogFileName = DIALOG_FILE_NAME; // Dialog-Def-Datei
        this.mDialogLoadFlag = DIALOG_LOAD_FLAG;
        this.mActivDialogFlag = false;
    }


    /**
     * Auf Defaultwerte zuruecksetzen
     *
     * @param {any} aOption - optionale Parameter
     */

    reset( aOption?: any ): number {

        if ( !this.isInit()) {
            this._error( 'reset', 'Komponente nicht initialisiert' );
            return -1;
        }

        // Default-Einstellungen

        this.stop();
        this.setActiveOn();
        this.clearDialog();
        this.mDialogContext.clear();
        this.setDialog( DIALOG_MAIN_NAME );
        this.setDialogState( DIALOG_ROOTSTATE_NAME );

        // interne Attribute

        this.mDialogFilePath = DIALOG_PATH_NAME; // lokaler Pfad zur Dialog-Def-Datei
        this.mDialogFileName = DIALOG_FILE_NAME; // Dialog-Def-Datei
        this.mDialogLoadFlag = DIALOG_LOAD_FLAG;
        this.mActivDialogFlag = false;

        // optionale Parameter eintragen

        this._setOption( aOption );

        // console.log('DialogComponent.init: Dialogdatei wird geladen');
        if ( this.mDialogLoadFlag && this.loadDialogFile() !== 0 ) {
            this._error( 'reset', 'Dialogdatei nicht geladen' );
            return -1;
        }
        return 0;
    }


    // Fehler-Funktionen


    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */

    _setErrorOutput( aErrorOutputFlag: boolean ): void {
        super._setErrorOutput( aErrorOutputFlag );
        this.mDialogParseEvent._setErrorOutput( aErrorOutputFlag );
        this.mDialogSetEvent._setErrorOutput( aErrorOutputFlag );
        this.mDialogStartEvent._setErrorOutput( aErrorOutputFlag );
        this.mDialogStopEvent._setErrorOutput( aErrorOutputFlag );
        this.mDialogStateSetEvent._setErrorOutput( aErrorOutputFlag );
        this.mDialogActionEvent._setErrorOutput( aErrorOutputFlag );
        this.mDialogActionStopEvent._setErrorOutput( aErrorOutputFlag );
        this.mDialogSpeakEvent._setErrorOutput( aErrorOutputFlag );
        this.mDialogSpeakStartEvent._setErrorOutput( aErrorOutputFlag );
        this.mDialogSpeakStopEvent._setErrorOutput( aErrorOutputFlag );
        this.mDialogContext._setErrorOutput( aErrorOutputFlag );
    }


    // Netz-Funktionen


    /**
     * Bot mit Server verbinden
     *
     * @returns {number} errorCode(0,-1)
     */

    connect(): number {
        return 0;
    }


    /**
     * Pruefen, ob Bot erfolgreich mit dem Server verbunden ist
     *
     * @return {boolean} true, erfolgreich verbunden, false sonst.
     */

    isConnect(): boolean {
        return false;
    }


    /**
     * Rueckgabe des Typs des Speech-APIs
     *
     * @return {string} type des Speech-APIS (web, cordova)
     */

    getNetType(): string {
        return '';
    }


    // Event-Funktionen


    /**
     * Ereignisfunktion fuer Dialog geparst
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onDialogParse(): number {
        // console.log('DialogComponent._onDialogParse');
        return this.mDialogParseEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Dialog eingetragen
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onDialogSet( aDialogName: string ): number {
        // console.log('DialogComponent._onDialogSet:', aDialogName);
        return this.mDialogSetEvent.dispatch( aDialogName );
    }


    /**
     * Ereignisfunktion fuer Dialog gestartet
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onDialogStart(): number {
        // console.log('DialogComponent._onDialogStart');
        this.mActivDialogFlag = true;
        return this.mDialogStartEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Dialog gestoppt
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onDialogStop(): number {
        // console.log('DialogComponent._onDialogStop');
        this._stop();
        return this.mDialogStopEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Dialog Zustand gesetzt
     *
     * @private
     * @param {string} aStateName - Name des Dialogzustands
     * @return {number} errorCode(0,-1)
     */

    _onDialogStateSet( aStateName: string ): number {
        // console.log('DialogComponent._onDialogStop');
        return this.mDialogStateSetEvent.dispatch( aStateName );
    }


    /**
     * Ereignisfunktion fuer Dialog Aktion ausfuehren
     *
     * @private
     * @param {DialogActionInterface} aSAction - Datentransferobjekt fuer die Aktion
     *
     * @return {number} errorCode(0,-1)
     */

    _onDialogAction( aAction: DialogActionInterface ): number {
        // console.log('DialogComponent._onDialogAction:', aAction);
        return this.mDialogActionEvent.dispatch( aAction );
    }


    /**
     * Ereignisfunktion fuer Dialog Aktion beenden
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onDialogActionStop(): number {
        // console.log('DialogComponent._onDialogActionStop');
        return this.mDialogActionStopEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Sprachausgabe ausfuehren
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onDialogSpeak( aSpeak: DialogSpeakInterface ): number {
        // console.log('DialogComponent._onDialogSpeak:', aSpeak);
        return this.mDialogSpeakEvent.dispatch( aSpeak );
    }


    /**
     * Ereignisfunktion fuer Sprachausgabe gestartet
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onDialogSpeakStart(): number {
        // console.log('DialogComponent._onDialogSpeakStart');
        return this.mDialogSpeakStartEvent.dispatch();
    }


    /**
     * Ereignisfunktion fuer Sprachausgabe gestoppt
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onDialogSpeakStop(): number {
        // console.log('DialogComponent._onSpeakStop');
        this._onDialogActionStop();
        return this.mDialogSpeakStopEvent.dispatch();
    }


    /**
     * Rueckgabe der DialogParse-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogParse() {
        return () => this._onDialogParse();
    }


    /**
     * Rueckgabe der DialogSet-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogSet() {
        return (aDialogName: string) => this._onDialogSet( aDialogName );
    }


    /**
     * Rueckgabe der DialogStart-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogStart() {
        return () => this._onDialogStart();
    }


    /**
     * Rueckgabe der DialogStop-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogStop() {
        return () => this._onDialogStop();
    }


    /**
     * Rueckgabe der DialogStateSet-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogStateSet() {
        return (aStateName: string) => this._onDialogStateSet( aStateName );
    }


    /**
     * Rueckgabe der DialogAction-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogAction() {
        return (aAction: DialogActionInterface) => this._onDialogAction( aAction );
    }


    /**
     * Rueckgabe der DialogAction-Ereignisfunktion, um ein Ereignis extern zu stoppen
     *
     * @readonly
     */

    get onDialogActionStop() {
        return () => this._onDialogActionStop();
    }


    /**
     * Rueckgabe der DialogSpeak-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogSpeak() {
        return (aSpeak: DialogSpeakInterface) => this._onDialogSpeak( aSpeak );
    }


    /**
     * Rueckgabe der DialogSpeakStart-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogSpeakStart() {
        return () => this._onDialogSpeakStart();
    }


    /**
     * Rueckgabe der DialogSpeakStop-Ereignisfunktion, um ein Ereignis extern auszuloesen
     *
     * @readonly
     */

    get onDialogSpeakStop() {
        return () => this._onDialogSpeakStop();
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
        // console.log('DialogProxy.addEventListener:', aPluginName, aEventName, aEventFunc);
        let result = 0;
        switch ( aEventName ) {
            case SPEECH_DIALOGPARSE_EVENT:
                result = this.mDialogParseEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGSET_EVENT:
                result = this.mDialogSetEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGSTART_EVENT:
                result = this.mDialogStartEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGSTOP_EVENT:
                result = this.mDialogStopEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGSTATESET_EVENT:
                result = this.mDialogStateSetEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGACTION_EVENT:
                result = this.mDialogActionEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGACTIONSTOP_EVENT:
                result = this.mDialogActionStopEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGSPEAK_EVENT:
                result = this.mDialogSpeakEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGSPEAKSTART_EVENT:
                result = this.mDialogSpeakStartEvent.addListener( aPluginName, aEventFunc );
                break;

            case SPEECH_DIALOGSPEAKSTOP_EVENT:
                result = this.mDialogSpeakStopEvent.addListener( aPluginName, aEventFunc );
                break;

            default:
                // console.log('Dialog.addEventListener: Event ' + aEventName + ' ist nicht vorhanden');
                result = super.addEventListener( aPluginName, aEventName, aEventFunc );
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
        // console.log('DialogProxy.removeEventListener:', aPluginName, aEventName);
        let result = 0;
        switch ( aEventName ) {
            case SPEECH_DIALOGPARSE_EVENT:
                result = this.mDialogParseEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGSET_EVENT:
                result = this.mDialogSetEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGSTART_EVENT:
                result = this.mDialogStartEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGSTOP_EVENT:
                result = this.mDialogStopEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGSTATESET_EVENT:
                result = this.mDialogStateSetEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGACTION_EVENT:
                result = this.mDialogActionEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGACTIONSTOP_EVENT:
                result = this.mDialogActionStopEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGSPEAK_EVENT:
                result = this.mDialogSpeakEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGSPEAKSTART_EVENT:
                result = this.mDialogSpeakStartEvent.removeListener( aPluginName );
                break;

            case SPEECH_DIALOGSPEAKSTOP_EVENT:
                result = this.mDialogSpeakStopEvent.removeListener( aPluginName );
                break;

            default:
                // console.log('Dialog.removeEventListener: Event ' + aEventName + ' ist nicht vorhanden');
                result = super.removeEventListener( aPluginName, aEventName );
                break;
        }
        return result;
    }


    // add-Funktionen


    addDialogParseEvent( aPluginName: string, aEventFunc: OnDialogParseFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGPARSE_EVENT, aEventFunc );
    }

    addDialogSetEvent( aPluginName: string, aEventFunc: OnDialogSetFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGSET_EVENT, aEventFunc );
    }

    addDialogStartEvent( aPluginName: string, aEventFunc: OnDialogStartFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGSTART_EVENT, aEventFunc );
    }

    addDialogStopEvent( aPluginName: string, aEventFunc: OnDialogStopFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGSTOP_EVENT, aEventFunc );
    }

    addDialogStateSetEvent( aPluginName: string, aEventFunc: OnDialogStateSetFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGSTATESET_EVENT, aEventFunc );
    }

    addDialogActionEvent( aPluginName: string, aEventFunc: OnDialogActionFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGACTION_EVENT, aEventFunc );
    }

    addDialogActionStopEvent( aPluginName: string, aEventFunc: OnDialogActionStopFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGACTIONSTOP_EVENT, aEventFunc );
    }

    addDialogSpeakEvent( aPluginName: string, aEventFunc: OnDialogSpeakFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGSPEAK_EVENT, aEventFunc );
    }

    addDialogSpeakStartEvent( aPluginName: string, aEventFunc: OnDialogSpeakStartFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGSPEAKSTART_EVENT, aEventFunc );
    }

    addDialogSpeakStopEvent( aPluginName: string, aEventFunc: OnDialogSpeakStopFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGSPEAKSTOP_EVENT, aEventFunc );
    }

    addErrorEvent( aPluginName: string, aEventFunc: OnSpeechErrorFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_ERROR_EVENT, aEventFunc );
    }


    // remove-Funktionen


    removeDialogParseEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGPARSE_EVENT );
    }

    removeDialogSetEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGSET_EVENT );
    }

    removeDialogStartEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGSTART_EVENT );
    }

    removeDialogStopEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGSTOP_EVENT );
    }

    removeDialogStateSetEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGSTATESET_EVENT );
    }

    removeDialogActionEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGACTION_EVENT );
    }

    removeDialogActionStopEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGACTIONSTOP_EVENT );
    }

    removeDialogSpeakEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGSPEAK_EVENT );
    }

    removeDialogSpeakStartEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGSPEAKSTART_EVENT );
    }

    removeDialogSpeakStopEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGSPEAKSTOP_EVENT );
    }

    removeErrorEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_ERROR_EVENT );
    }

    removeAllEvent( aPluginName: string ): number {
        // console.log('DialogBase.removeAllEvent: start', aPluginName);
        let result = super.removeAllEvent( aPluginName );
        if ( this.removeDialogParseEvent( aPluginName ) !== 0 )      { result = -1; }
        if ( this.removeDialogSetEvent( aPluginName ) !== 0 )        { result = -1; }
        if ( this.removeDialogStartEvent( aPluginName ) !== 0 )      { result = -1; }
        if ( this.removeDialogStopEvent( aPluginName ) !== 0 )       { result = -1; }
        if ( this.removeDialogStateSetEvent( aPluginName ) !== 0 )   { result = -1; }
        if ( this.removeDialogActionEvent( aPluginName ) !== 0 )     { result = -1; }
        if ( this.removeDialogActionStopEvent( aPluginName ) !== 0 ) { result = -1; }
        if ( this.removeDialogSpeakEvent( aPluginName ) !== 0 )      { result = -1; }
        if ( this.removeDialogSpeakStartEvent( aPluginName ) !== 0 ) { result = -1; }
        if ( this.removeDialogSpeakStopEvent( aPluginName ) !== 0 )  { result = -1; }
        if ( this.removeErrorEvent( aPluginName ) !== 0 )            { result = -1; }
        // console.log('DialogBase.removeAllEvent: ende', aPluginName);
        return result;
    }


    // Binding-Funktionen


    setReadFileFunc( aReadFileFunc: OnFileReaderReadFunc ): number {
        this.mReadFileFunc = aReadFileFunc;
        return 0;
    }


    getWriteFileDataFunc(): DialogWriteFileDataFunc {
        return ( aFileData: string ) => this.writeDialogData( aFileData );
    }


    setParseSpeechDefFileFunc( aParseSpeechDefFileFunc: ParserSpeechDefFileFunc ): number {
        this.mParseSpeechDefFileFunc = aParseSpeechDefFileFunc;
        return 0;
    }


    setParseSpeechDefDataFunc( aParseSpeechDefDataFunc: ParserSpeechDefDataFunc ): number {
        this.mParseSpeechDefDataFunc = aParseSpeechDefDataFunc;
        return 0;
    }


    // Dialog-Funktionen


    _stop(): void {
        this.mActivDialogFlag = false;
        this._onDialogActionStop();
    }


    /**
     * Parsen der uebergebenen Def-Datei
     *
     * @param {string} aDefFileName - Name der Def-Datei, die eingelesen werden soll
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    parseSpeechDefFile( aDefFileName: string ): number {
        if ( typeof this.mParseSpeechDefFileFunc === 'function' ) {
            return this.mParseSpeechDefFileFunc( aDefFileName );
        }
        return -1;
    }


    /**
     * Parsen der uebergebenen Def-Daten
     *
     * @param {string} aDefData - Text der Def-Daten
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    parseSpeechDefData( aDefData: string ): number {
        try {
            if ( typeof this.mParseSpeechDefDataFunc !== 'function' ) {
                this._error( 'parseSpeechDefData', 'keine ParseDefData funktion' );
                return -1;
            }
            return this.mParseSpeechDefDataFunc( aDefData );
        } catch ( aException ) {
            this._exception( 'parseSpeechDefData', aException);
            return -1;
        }
    }


    /**
     * lokalen Dialogpfad eintragen
     *
     * @param {string} aDialogFilePath
     */

    setDialogFilePath( aDialogFilePath: string ): number {
        this.mDialogFilePath = aDialogFilePath;
        return 0;
    }


    /**
     * lokalen Dialogpfad zurueckgeben
     *
     * @return {string} dialogPath
     */

    getDialogFilePath(): string {
        return this.mDialogFilePath;
    }


    /**
     * Eintragen des Dialog-Dateinamens ohne Pfadangabe
     *
     * @param {string} aDialogFileName - einzulesende Dialogdatei
     *
     * @return {number} errorCode(0,-1)
     */

    setDialogFileName( aDialogFileName: string ): number {
        this.mDialogFileName = aDialogFileName;
        return 0;
    }


    /**
     * Rueckgabe des Dialog-Dateinamens
     *
     * @return {string} dialogFileName
     */

    getDialogFileName(): string {
        return this.mDialogFileName;
    }


    /**
     * Def-Datei laden und die Def-Daten an den SpeechServer uebertragen
     *
     * @param {string} [aDialogFileName] - Name der zu ladenden Speech-Datei (default Speech.def)
     *
     * @return {number} errorcode (0,-1)
     */

    loadDialogFile( aDialogFileName?: string ): number {
        // console.log('DialogBase.loadDialogFile:', aDialogFileName);
        let fileName = this.mDialogFilePath + this.mDialogFileName;
        if ( aDialogFileName ) {
            fileName = this.mDialogFilePath + aDialogFileName;
        }
        if ( typeof this.mReadFileFunc !== 'function' ) {
            this._error( 'loadDialogFile', 'keine ReadFileFunc vorhanden' );
            return -1;
        }
        // console.log('DialoBase.loadDialogFile:', fileName);
        return this.mReadFileFunc( fileName );
    }


    /**
     * Def-Daten uebertragen
     *
     * @param {string} aDialogData - Inhalt der Dialogdatei eintragen
     *
     * @return {number} errorcode (0,-1)
     */

    writeDialogData( aDialogData: string ): number {
        // console.log('DialogBase.writeDialogData');
        return this.parseSpeechDefData( aDialogData );
    }


    /**
     * Pruefen auf aktiven Dialog
     *
     * @return {boolean} True, wenn Dialog laeuft, sonst False
     */

    isRunning(): boolean {
        return this.mActivDialogFlag;
    }


    /**
     * Dialog umschalten zwischen start und stop
     */

    toggleDialog(): number {
        if ( this.isRunning()) {
            return this.stop();
        } else {
            return this.start();
        }
    }


    clearDialog(): number {
        return 0;
    }


    setDialog( aDialogName: string ): number {
        return 0;
    }


    getDialog(): string {
        return '';
    }


    /**
     * Dialog starten
     *
     * @return {number} errorcode (0,-1)
     */

    start(): number {
        this.mActivDialogFlag = true;
        return 0;
    }


    /**
     * Dialog stoppen
     *
     * @return {number} errorcode (0,-1)
     */

    stop(): number {
        this._stop();
        return 0;
    }


    /**
     * Zustand setzen
     *
     * @param {string} aState - aktueller Zustand der App
     * @param {Object} aContext - aktueller Kontext zum Zustand
     *
     * @return {number} errorcode (0,-1)
     */

    setDialogState( aState: string, aContext?: DialogStateContextInterface ): number {
        return 0;
    }


    getDialogState(): string {
        return '';
    }


    /**
     * Zustandskontext setzen
     *
     * @param {Object} aContext
     *
     * @return {number} errorcode (0,-1)
     */

    setDialogStateContext( aContext: DialogStateContextInterface ): number {
        return 0;
    }


    /**
     * Sofortiger Abbruch und ueberspringen des Speak-Kommandos. Es wird die
     * nach dem Speak folgende Aktion ausgefuehrt.
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    // TODO: ist bisher noch nicht freigeschaltet, da es zu Fehlverhalten kommen kann, wenn mehrere Actions oder mehrere Speaks aufeinanderfolgen!

    skipNextSpeak(): number {
        return 0;
    }


    // Kontext-Funktionen


    /**
     * Kontext loeschen
     */

    clearContext(): number {
        this.mDialogContext.clear();
        return 0;
    }


    /**
     * Rueckgabe des Kontexts
     *
     * @private
     * @return {DialogStateContextInterface}
     */

    _getContext(): DialogStateContextInterface {
        return this.mDialogContext.getContext();
    }


    /**
     * Eintragen eines Elementes in den Kontext
     *
     * @param {string} aElementName - Name des Elements
     * @param {string} aContextName - Name des Kontextes
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    addContextElement( aElementName: string, aContextName: string ): number {
        if ( this.mDialogContext.insert( aElementName, aContextName ) !== 0 ) {
            return -1;
        }
        return this.setDialogStateContext( this.mDialogContext.getContext());
    }


    /**
     * Entfernen eines Elementes aus den Kontext
     *
     * @param {string} aElementName - Name des Elements
     * @param {string} aContextName - Name des Kontextes
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    removeContextElement( aElementName: string, aContextName: string ): number {
        if ( this.mDialogContext.remove( aElementName, aContextName ) !== 0 ) {
            return -1;
        }
        return this.setDialogStateContext( this.mDialogContext.getContext());
    }

}
