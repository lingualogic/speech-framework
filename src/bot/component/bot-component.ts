/**
 * Bot Komponente zur Verwaltung von allen anderen Komponenten Dialog, Listen, Speak, Audio
 *
 * Letzte Aenderung: 15.12.2018
 * Status: gelb
 *
 * @module bot/component
 * @author SB
 */


// global

import {
    SPEECH_ERROR_EVENT,
    SPEECH_DIALOGSET_EVENT,
    SPEECH_DIALOGJSON_EVENT,
    SPEECH_DIALOGPARSE_EVENT,
    SPEECH_DIALOGSTART_EVENT,
    SPEECH_DIALOGSTOP_EVENT,
    SPEECH_DIALOGSTATESET_EVENT,
    SPEECH_DIALOGACTION_EVENT,
    SPEECH_DIALOGACTIONSTOP_EVENT,
    SPEECH_DIALOGSPEAK_EVENT,
    SPEECH_DIALOGSPEAKSTART_EVENT,
    SPEECH_DIALOGSPEAKSTOP_EVENT
} from '../../const/speech-event-const';
import { OnSpeechErrorFunc } from '../../interface/speech-function.type';


// base

import { BaseComponent } from '../../base/component/base-component';


// audio

import { AUDIOPLAYER_PLUGIN_NAME } from '../../audio/audio-const';
import { AudioPlayerInterface } from '../../audio/player/audio-player.interface';


// speak

import { SPEAK_COMPONENT_NAME } from '../../speak/speak-const';
import { SpeakInterface } from '../../speak/speak.interface';
import { SpeakComponentInterface } from '../../speak/component/speak-component.interface';


// listen

import { LISTEN_PLUGIN_NAME } from '../../listen/listen-const';
import { ListenInterface } from '../../listen/listen.interface';
import { ListenComponentInterface } from '../../listen/component/listen-component.interface';


// action

import { ACTION_PLUGIN_NAME } from '../../action/action-const';
import { ActionDataInterface } from '../../action/action-data.interface';
import { ActionInterface } from '../../action/action.interface';
import { ActionComponentInterface } from '../../action/component/action-component.interface';


// dialog

import { DIALOG_COMPONENT_NAME } from '../../dialog/dialog-const';
import {
    OnDialogSetFunc,
    OnDialogJsonFunc,
    OnDialogParseFunc,
    OnDialogStartFunc,
    OnDialogStopFunc,
    OnDialogStateSetFunc,
    OnDialogActionFunc,
    OnDialogActionStopFunc,
    OnDialogSpeakFunc,
    OnDialogSpeakStartFunc,
    OnDialogSpeakStopFunc
} from '../../dialog/dialog-function.type';
import { DialogActionInterface } from '../../dialog/dialog-action.interface';
import { DialogSpeakInterface } from '../../dialog/dialog-speak.interface';
import { DialogComponentInterface } from '../../dialog/component/dialog-component.interface';
import { DialogDataInterface } from '../../dialog/dialog-data.interface';


// bot

import { BOT_API_VERSION } from '../bot-version';
import { BOT_TYPE_NAME, BOT_COMPONENT_NAME } from '../bot-const';
import { BotOptionInterface } from '../bot-option.interface';
import { BotComponentInterface } from './bot-component.interface';


/** @export
 * BotComponent Klasse
 */

export class BotComponent extends BaseComponent implements BotComponentInterface {

    // innere Komponenten

    mAudioPlayer: AudioPlayerInterface = null;
    mSpeak: SpeakComponentInterface = null;
    mListen: ListenComponentInterface = null;
    mAction: ActionComponentInterface = null;
    mDialog: DialogComponentInterface = null;

    // Komponenten-Flags zum ein/ausschalten der Komponenten in Bot

    mSpeakEnableFlag = true;
    mListenEnableFlag = true;
    mActionEnableFlag = true;


    /**
     * Bot Objekt erzeugen
     *
     * @param {boolean} aRegisterFlag - wenn true, dann in PluginManager eintragen
     */

    constructor( aRegisterFlag = true ) {
        super( BOT_COMPONENT_NAME, aRegisterFlag );
    }


    getType(): string {
        return BOT_TYPE_NAME;
    }

    getClass(): string {
        return 'BotComponent';
    }

    getVersion(): string {
        return BOT_API_VERSION;
    }

    getServerVersion(): string {
        if ( !this.mDialog ) {
            return '';
        }
        return this.mDialog.getServerVersion();
    }


    // Komponenten-Funktionen


    /**
     * Hier werden alle inneren Plugins der Komponente initialisiert
     *
     * @protected
     * @returns {number} Fehlercode 0 oder -1
     */

    _initAllPlugin(): number {
        // AudioPlayer kann auch fehlen, deshalb keine Fehlerpruefung
        this.mAudioPlayer = this.findPlugin( AUDIOPLAYER_PLUGIN_NAME ) as AudioPlayerInterface;

        // Speak kann auch fehlen, deshalb keine Fehlerpruefung
        this.mSpeak = this.findPlugin( SPEAK_COMPONENT_NAME ) as SpeakComponentInterface;

        // Listen kann auch fehlen, deshalb keine Fehlerpruefung
        this.mListen = this.findPlugin( LISTEN_PLUGIN_NAME ) as ListenComponentInterface;

        // Action kann auch fehlen, deshalb keine Fehlerpruefung
        this.mAction = this.findPlugin( ACTION_PLUGIN_NAME ) as ActionComponentInterface;

        // Dialog muss vorhanden sein, ist die Kernfunktionalitaet von Bot
        this.mDialog = this.findPlugin( DIALOG_COMPONENT_NAME ) as DialogComponentInterface;
        if ( !this.mDialog ) {
            this._error( '_initAllPlugin', 'keine Dialog-Komponente vorhanden' );
            this._clearInit();
            return -1;
        }
        return 0;
    }


    /**
     * Initialisierung der Bot-Komponente
     *
     * @param {BotOptionInterface} aOption - optionale Parameter
     *
     * @return {number} errorcode (0,-1)
     */

    init( aOption?: BotOptionInterface ): number {
        return super.init( aOption );
    }


    /**
     * Loeschen der inneren Plugins
     *
     * @protected
     */

    _doneAllPlugin(): void {
        // interne Komponenten

        this.mAudioPlayer = null;
        this.mSpeak = null;
        this.mListen = null;
        this.mAction = null;
        this.mDialog = null;
    }


    /**
     * Loeschen der inneren Attribute
     *
     * @protected
     */

    _doneAllAttribute(): void {
        // interne Attribute

        this.mSpeakEnableFlag = true;
        this.mListenEnableFlag = true;
        this.mActionEnableFlag = true;
    }


    /**
     * Defaultwerte setzen
     *
     * @protected
     */

    _resetAllDefault(): void {
        // interne Attribute

        this.mSpeakEnableFlag = true;
        this.mListenEnableFlag = true;
        this.mActionEnableFlag = true;
    }


    /**
     * Auf Defaultwerte zuruecksetzen
     *
     * @param {BotOptionInterface} aOption - optionale Parameter
     */

    reset( aOption?: BotOptionInterface ): number {
        if ( super.reset( aOption ) !== 0 ) {
            return -1;
        }
        // Dialog auf Default setzen

        if ( this.mDialog ) {
            return this.mDialog.reset( aOption );
        }
        return 0;
    }


    /**
     * pruefen auf aktive Komponente
     *
     * @return {boolean} Rueckgabe True, wenn Komponente aktiv ist
     */

    isActive(): boolean {
        if ( !this.mDialog ) {
            return false;
        }
        return super.isActive();
    }


    /**
     * aktive Komponente setzen
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActiveOn(): number {
        if ( !this.mDialog ) {
            return -1;
        }
        return super.setActiveOn();
    }


    // Net-Funktionen


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
     * @public
     *
     * @return {string} type des Speech-APIS (web, cordova)
     */

    getNetType(): string {
        return 'undefined';
    }


    // Event-Funktionen


    addDialogSetEvent( aPluginName: string, aEventFunc: OnDialogSetFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGSET_EVENT, aEventFunc );
    }

    addDialogJsonEvent( aPluginName: string, aEventFunc: OnDialogJsonFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGJSON_EVENT, aEventFunc );
    }

    addDialogParseEvent( aPluginName: string, aEventFunc: OnDialogParseFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_DIALOGPARSE_EVENT, aEventFunc );
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


    removeDialogSetEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGSET_EVENT );
    }

    removeDialogJsonEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGJSON_EVENT );
    }

    removeDialogParseEvent( aPluginName: string ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGPARSE_EVENT );
    }

    removeDialogStartEvent( aPluginName ): number {
        return this.removeEventListener( aPluginName, SPEECH_DIALOGSTART_EVENT );
    }

    removeDialogStopEvent( aPluginName ): number {
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
        // console.log('BotComponent.removeAllEvent: start', aPluginName);
        let result = super.removeAllEvent( aPluginName );
        if ( this.mDialog ) {
            // console.log('BotComponent.removeAllEvent: alle Dialog Events loeschen:', aPluginName);
            if ( this.mDialog.removeAllEvent( aPluginName ) !== 0 ) {
                result = -1;
            }
        }
        this.removeErrorEvent( aPluginName );
        // console.log('BotComponent.removeAllEvent: ende', aPluginName);
        return result;
    }


    // Bind-Funktionen


    /**
     * Weiterleiten des DialogSpeak-Ereignisses auf die Speak-Komponente, um sie dort auszufuehren
     *
     * @param {DialogSpeakInterface} aDialogSpeak - DialogASpeak Daten
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _dialogSpeak( aDialogSpeak: DialogSpeakInterface ): number {
        if ( this.isActive() && this.isSpeak()) {
            // Mappen der DialogSpeak-Daten auf die Speak-Daten
            this.mSpeak.setSpeakText( aDialogSpeak.text );
            this.mSpeak.setAudioFileName( aDialogSpeak.id );
            // TODO: Frage ist, ob erst DialogSpeakStart startSpeak aufruft, oder DialogSpeak bereits,
            //       dann muesste es aber auch bei Action und Listen ebenfalls so gehandhabt werden
            return this.mSpeak.start();
        }
        return 0;
    }


    /**
     * Weiterleiten des DialogSpeak-Stop Ereignisses auf die Speak-Komponente, um sie dort auszufuehren
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _dialogSpeakStop(): number {
        if ( this.isActive() && this.isSpeak()) {
            return this.mSpeak.stop();
        }
        return 0;
    }


    getDialogSpeakFunc(): OnDialogSpeakFunc {
        return (aDialogSpeak: DialogSpeakInterface) => this._dialogSpeak( aDialogSpeak );
    }


    getDialogSpeakStopFunc(): OnDialogSpeakStopFunc {
        return () => this._dialogSpeakStop();
    }


    /**
     * Weiterleiten des Dialogaktion-Ereignisses auf die Aktion-Komponente, um sie dort auszufuehren
     *
     * @param {DialogActionInterface} aDialogAction - DialogAction Daten
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _dialogAction( aDialogAction: DialogActionInterface ): number {
        if ( this.isActive() && this.isAction()) {
            // TODO: Hier muss in Action noch die set-Funktionen fuer die
            //       verschiedenen Action-Daten eingebaut werden. Diese werden
            //       dann nicht mehr startAction uebergeben.
            // Mappen der DialogAction-Daten auf die Action-Daten
            const action: ActionDataInterface = {
                action: aDialogAction.action,
                type: aDialogAction.type,
                id: aDialogAction.id
            };
            // TODO: Wie bei Speak, sollte erst in ActionStart aufgerufen werden, oder hier?
            return this.mAction.action( action );
        }
        return 0;
    }


    /**
     * Weiterleiten des Dialogaktion-Stop Ereignisses auf die Aktion-Komponente, um sie dort auszufuehren
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _dialogActionStop(): number {
        // console.log('BotComponent._dialogActionStop:', this.isAction());
        if ( this.isActive() && this.isAction()) {
            return this.mAction.stop();
        }
        return 0;
    }


    /**
     * Rueckgabe der DialogAction-Funktion zum Eintragen in das DialogAction-Ereignis im Builder
     *
     * @returns {OnDialogActionFunc}
     * @memberof BotComponent
     */

    getDialogActionFunc(): OnDialogActionFunc {
        return (aAction: DialogActionInterface) => this._dialogAction( aAction );
    }


    /**
     * Rueckgabe der DialogAction-Stopfunktion zum Eintragen in das DialogActionStop-Ereignis im Builder
     *
     * @returns {OnDialogActionStopFunc}
     * @memberof BotComponent
     */

    getDialogActionStopFunc(): OnDialogActionStopFunc {
        return () => this._dialogActionStop();
    }


    // Speak-Funktionen


    /**
     * Abfrage auf eingeschaltete Sprachausgabe
     */

    isSpeak(): boolean {
        if ( this.mSpeakEnableFlag && this.mSpeak ) {
            return this.mSpeak.isActive();
        }
        return false;
    }


    /**
     * Sprachausgabe einschalten
     */

    setSpeakOn(): number {
        if ( this.mSpeak ) {
            this.mSpeakEnableFlag = true;
            return 0;
        }
        return -1;
    }


    /**
     * Sprachausgabe ausschalten
     */

    setSpeakOff(): number {
        if ( this.mSpeak ) {
            this.mSpeakEnableFlag = false;
            return 0;
        }
        return -1;
    }


    getSpeak(): SpeakInterface {
        return this.mSpeak;
    }


    // Listen-Funktionen


    isListen(): boolean {
        if ( this.mListenEnableFlag && this.mListen ) {
            return this.mListen.isActive();
        }
        return false;
    }


    setListenOn(): number {
        if ( this.mListen ) {
            this.mListenEnableFlag = true;
            return 0;
        }
        return -1;
    }


    setListenOff(): number {
        if ( this.mListen ) {
            this.mListenEnableFlag = false;
            return 0;
        }
        return -1;
    }


    getListen(): ListenInterface {
        return this.mListen;
    }


    // Action-Funktionen


    isAction(): boolean {
        if ( this.mActionEnableFlag && this.mAction ) {
            return this.mAction.isActive();
        }
        return false;
    }


    setActionOn(): number {
        if ( this.mAction ) {
            this.mActionEnableFlag = true;
            return 0;
        }
        return -1;
    }


    setActionOff(): number {
        if ( this.mAction ) {
            this.mActionEnableFlag = false;
            return 0;
        }
        return -1;
    }


    getAction(): ActionInterface {
        return this.mAction;
    }


    // Json-Funktionen


    transformJsonFile( aJsonFileName: string ): number {
        if ( !this.isActive()) {
            this._error('transformJsonFile', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.transformJsonFile( aJsonFileName );
    }


    transformJsonData( aJsonData: DialogDataInterface[]): number {
        if ( !this.isActive()) {
            this._error('transformJsonData', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.transformJsonData( aJsonData );
    }


    // Parser-Funktionen


    parseSpeechDefFile( aDefFileName: string ): number {
        if ( !this.isActive()) {
            this._error('parseSpeechDefFile', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.parseSpeechDefFile( aDefFileName );
    }


    parseSpeechDefData( aDefData: string ): number {
        if ( !this.isActive()) {
            this._error('parseSpeechDefData', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.parseSpeechDefData( aDefData );
    }


    // Dialog-Funktionen


    /**
     * lokalen Dialogpfad eintragen
     *
     * @param {string} aDialogFilePath
     */

    setDialogFilePath( aDialogFilePath: string ): number {
        // console.log('BotComponent.setDialogFilePath:', aDialogFilePath);
        if ( !this.isActive()) {
            this._error('setDialogFilePath', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.setDialogFilePath( aDialogFilePath );
    }


    /**
     * lokalen Dialogpfad zurueckgeben
     *
     * @return {string} dialogFilePath
     */

    getDialogFilePath(): string {
        // console.log('BotComponent.getDialogFilePath');
        if ( !this.mDialog ) {
            this._error( 'getDialogFilePath', 'keine Dialog-Komponente vorhanden' );
            return '';
        }
        return this.mDialog.getDialogFilePath();
    }


    setDialogFileName( aDialogFileName: string ): number {
        // console.log('BotComponent.setDialogFileName:', aDialogFileName);
        if ( !this.isActive()) {
            this._error('setDialogFileName', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.setDialogFileName( aDialogFileName );
    }


    getDialogFileName(): string {
        // console.log('BotComponent.getDialogFilePath');
        if ( !this.mDialog ) {
            this._error( 'getDialogFileName', 'keine Dialog-Komponente vorhanden' );
            return '';
        }
        return this.mDialog.getDialogFileName();
    }


    /**
     * Def-Datei laden und die Def-Daten an den SpeechServer uebertragen
     *
     * @param {string} aDialogFileName - Name der zu ladenden Speech-Datei (default Speech.def)
     *
     * @return {number} errorcode (0,-1)
     */

    loadDialogFile( aDialogFileName: string ): number {
        // console.log('BotComponent.loadDialogFile:', aDialogFileName);
        if ( !this.isActive()) {
            this._error('loadDialogFile', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.loadDialogFile( aDialogFileName );
    }


    /**
     * Def-Daten uebertragen
     *
     * @param {string} aDialogData - Inhalt der Dialogdatei eintragen
     *
     * @return {number} errorcode (0,-1)
     */

    writeDialogData( aDialogData: string ): number {
        // console.log('BotComponent.writeDialogData');
        if ( !this.isActive()) {
            this._error('writeDialogData', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.writeDialogData( aDialogData );
    }


    clearDialog(): number {
        // console.log('BotComponent.clearDialog');
        if ( !this.isActive()) {
            this._error('clearDialog', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.clearDialog();
    }


    setDialog( aDialogName: string ): number {
        // console.log('BotComponent.setDialog:', aDialogName);
        if ( !this.isActive()) {
            this._error('setDialog', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.setDialog( aDialogName );
    }


    getDialog(): string {
        // console.log('BotComponent.getDialog');
        if ( !this.mDialog ) {
            this._error( 'getDialog', 'keine Dialog-Komponente vorhanden' );
            return '';
        }
        return this.mDialog.getDialog();
    }


    isRunning(): boolean {
        if ( !this.mDialog ) {
            // TODO: sollte keine Fehlermeldung erzeugen, da in Done verwendet !
            // this._error( 'isRunning', 'keine Dialog-Komponente vorhanden' );
            return false;
        }
        return this.mDialog.isRunning();
    }


    toggleDialog(): number {
        // console.log('BotComponent.toggleDialog');
        if ( !this.isActive()) {
            this._error('toggleDialog', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.toggleDialog();
    }


    /**
     * Dialog starten
     *
     * @return {number} errorcode (0,-1)
     */

    start(): number {
        // console.log('BotComponent.startDialog');
        if ( !this.isActive()) {
            this._error('start', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.start();
    }


    /**
     * Dialog stoppen
     *
     * @return {number} errorcode (0,-1)
     */

    stop(): number {
        // console.log('BotComponent.stopDialog');
        if ( !this.isActive()) {
            this._error('stop', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.stop();
    }


    /**
     * Zustand setzen
     *
     * @param {string} aState - aktueller Zustand der App
     * @param {Object} aContext - aktueller Kontext zum Zustand
     *
     * @return {number} errorcode (0,-1)
     */

    setDialogState( aState: string, aContext?: any ): number {
        // console.log('BotComponent.setDialogState:', aState, aContext);
        if ( !this.isActive()) {
            this._error('setDialogState', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.setDialogState( aState, aContext );
    }


    /**
     * aktuellen Zustand zurueckgeben
     *
     * @return {string} Fehlercode 0 oder -1
     */

    getDialogState(): string {
        // console.log('BotComponent.getDialogState');
        if ( !this.mDialog ) {
            this._error( 'getDialogState', 'keine Dialog-Komponente vorhanden' );
            return '';
        }
        return this.mDialog.getDialogState();
    }


    /**
     * Zustandskontext setzen
     *
     * @param {Object} aContext
     *
     * @return {number} errorcode (0,-1)
     */

    setDialogStateContext( aContext: any ): number {
        // console.log('BotComponent.setDialogStateContext:', aContext);
        if ( !this.isActive()) {
            this._error('setDialogStateContext', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.setDialogStateContext( aContext );
    }


    /**
     * Sofortiger Abbruch und ueberspringen des Speak-Kommandos. Es wird die
     * nach dem Speak folgende Aktion ausgefuehrt.
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    skipNextSpeak(): number {
        // console.log('BotComponent.skipNextSpeak');
        if ( !this.isActive()) {
            this._error('skipNextSpeak', 'Komponente ist nicht aktiviert');
            return -1;
        }
        // TODO: ist erst mal wieder aus dem Dialog-Interface herausgenommen worden
        // return this.mDialog.skipNextSpeak();
        return 0;
    }


    // Kontext-Funktionen


    clearContext(): number {
        if ( !this.isActive()) {
            this._error('clearContext', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.clearContext();
    }


    addContextElement( aElementName: string, aContextName: string): number {
        if ( !this.isActive()) {
            this._error('addContextElement', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.addContextElement( aElementName, aContextName );
    }

    removeContextElement( aElementName: string, aContextName: string): number {
        if ( !this.isActive()) {
            this._error('removeContextElement', 'Komponente ist nicht aktiviert');
            return -1;
        }
        return this.mDialog.removeContextElement( aElementName, aContextName );
    }

}
