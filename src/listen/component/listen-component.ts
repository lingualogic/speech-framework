/**
 * ListenComponent zur Verwaltung von ASR-Plugins. Sie erbt von der BaseComponent.
 *
 * Letzte Aenderung: 27.01.2019
 * Status: gelb
 *
 * @module listen/component
 * @author SB
 */


// global

import { SPEECH_LISTENRESULT_EVENT } from '../../const/speech-event-const';


// event

import { EventFunctionList, EventFunc } from '../../core/event/event-function-list';


// base

import { BaseComponent } from '../../base/component/base-component';


// asr

import { ASR_DEFAULT_NAME } from './../asr/asr-const';
import {
    ASRInterface,
    OnASRListenResultFunc
} from '../asr/asr.interface';


// listen

import { LISTEN_API_VERSION } from '../listen-version';
import { LISTEN_TYPE_NAME, LISTEN_COMPONENT_NAME, LISTEN_DEFAULT_LANGUAGE, LISTEN_UNDEFINE_LANGUAGE } from '../listen-const';
import { OnListenResultFunc } from '../listen-function.type';
import { ListenOptionInterface } from '../listen-option.interface';
import {
    ListenComponentInterface,
} from './listen-component.interface';


const LISTEN_COMPONENT_VERSION = LISTEN_API_VERSION;


/**
 * ListenComponent Klasse
 */

export class ListenComponent extends BaseComponent implements ListenComponentInterface {

    // innere Plugins

    mASRPlugin: ASRInterface = null;

    // TODO: AudioRecorder muss noch eingebaut werden
    // mAudioRecorder: AudioRecorderInterface = null;

    // Events

    mListenResultEvent = new EventFunctionList( SPEECH_LISTENRESULT_EVENT, LISTEN_COMPONENT_NAME );

    // Attribute der Komponente

    mASRActiveFlag = false;

    // Features des Servers

    mASRFeatureFlag = false;


    /**
     * Listen Objekt erzeugen
     *
     * @param {boolean} aRegisterFlag - wenn true, dann in PluginManager eintragen
     */

    constructor( aRegisterFlag = true ) {
        super( LISTEN_COMPONENT_NAME, aRegisterFlag );
        this.mListenResultEvent._setErrorOutputFunc( this._getErrorOutputFunc());
    }


    getType(): string {
        return LISTEN_TYPE_NAME;
    }


    getClass(): string {
        return 'ListenComponent';
    }


    getVersion(): string {
        return LISTEN_COMPONENT_VERSION;
    }


    getServerVersion(): string {
        return '';
    }


    // Komponenten-Funktionen


    /**
     * Eintragen der lokalen Optionen
     *
     * @protected
     * @param {ListenOptionInterface} aOption - optionale Parameter
     */

    _setOption( aOption: ListenOptionInterface ): number {
        // console.log('ListenComponent._setOption:', aOption);
        // pruefen auf vorhandene Options
        if ( !aOption ) {
            return -1;
        }
        // TODO: Audiooptionen muessen noch eingebaut werden
        /****
        // Audio-Pfad eintragen
        if (typeof aOption.audioFilePath === 'string') {
            // console.log('SpeakComponent._setOption: AudioPath = ', aOption.audioFilePath);
            this.mAudioFilePath = aOption.audioFilePath;
        }
        // Audioflag eintragen
        if (typeof aOption.audioFlag === 'boolean') {
            if (aOption.audioFlag === true) {
                // console.log('SpeakService Audio: ein');
                this.mAudioFlag = true;
            } else {
                // console.log('SpeakService Audio: aus');
                this.mAudioFlag = false;
            }
        }
        ****/
        // Sprache eintragen
        if ( aOption.listenLanguage ) {
            // console.log('ListenComponent._setOption: language = ', aOption.listenLanguage);
            this.setLanguage( aOption.listenLanguage );
        }
        return super._setOption( aOption );
    }


    /**
     * Hier werden alle inneren Plugins der Komponente initialisiert
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    _initAllPlugin(): number {
        // interne Plugins auslesen

        // TODO: AudioRecorder muss noch eingebaut werden
        // this.mAudioRecorder = this.findPlugin( AUDIORECORDER_PLUGIN_NAME ) as AudioRecorderInterface;

        // TODO: Hier muss die PluginGroup eingefuegt werden
        this.mASRPlugin = this.findPlugin( ASR_DEFAULT_NAME ) as ASRInterface;

        // pruefen, ob ASR aktiv ist

        if ( this.mASRPlugin ) {
            // console.log('ListenComponent.init: ASRActiveFlag = ', this.mASRPlugin.isActive());
            this.mASRActiveFlag = this.mASRPlugin.isActive();
        }
        return 0;
    }


    /**
     * Initialisierung der Listen-Komponente
     *
     * @param {ListenOptionInterface} aOption - optionale Parameter { listenLanguage }
     *
     * @return {number} errorcode (0,-1)
     */

    init( aOption?: ListenOptionInterface ): number {
        return super.init( aOption );
    }


    /**
     * Loeschen der inneren Plugins
     */

    _doneAllPlugin(): void {
        // interne Komponenten

        this.mASRPlugin = null;
        // this.mAudioRecorder = null;
    }


    /**
     * Loeschen der inneren Events
     */

    _doneAllEvent(): void {
        this.mListenResultEvent.clear();
    }


    /**
     * Loeschen der inneren Attribute
     */

    _doneAllAttribute(): void {
        // Attribute

        this.mASRActiveFlag = false;

        // Features des Servers

        this.mASRFeatureFlag = false;
    }


    /**
     * Defaultwerte setzen
     */

    _resetAllDefault(): void {
        this.setLanguage( LISTEN_DEFAULT_LANGUAGE );
        // TODO: Audiodaten muessen noch eingebaut werden
        /****
        this.mAudioFilePath = SPEAK_AUDIOFILE_PATH;
        this.mAudioFileName = '';
        this.mAudioFlag = SPEAK_AUDIO_FLAG;
        ****/
    }


    /**
     * Auf Defaultwerte zuruecksetzen
     *
     * @param {ListenOptionInterface} aOption - optionale Parameter
     */

    // TODO: muss als Basisfunktion in Plugin aufgenommen werden

    reset( aOption?: ListenOptionInterface ): number {
        return super.reset( aOption );
    }


    /**
     * pruefen auf aktive Komponente. Komponente ist nur aktiv, wenn ASR
     * vorhanden ist. Ansonsten ist die Komponente immer deaktiv.
     *
     * @return {boolean} Rueckgabe, ob Kompponente aktiv ist
     */

    isActive(): boolean {
        // pruefen auf vorhandene ASR

        if ( !this.mASRActiveFlag ) {
            return false;
        }
        return super.isActive();
    }


    /**
     * Einschalten der Komponente, wenn ASR vorhanden ist.
     * Ansonsten ist die Komponente nicht einschaltbar.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActiveOn(): number {
        // pruefen auf vorhandene Recognition
        if ( !this.mASRActiveFlag ) {
            return -1;
        }
        return super.setActiveOn();
    }


    /**
     * Hier werden die Features des Servers gesetzt
     *
     * @param {Object} aFeatureInfo {TTS: boolean, ASR: boolean, AUDIO: boolean}
     *
     * @return {number} errorcode (0,-1)
     */

    setFeatureList( aFeatureInfo: any ): number {
        // console.log('SpeechApi.setFeatureList:', aFeatureInfo);
        if ( !aFeatureInfo.features ) {
            this._error( 'setFeatureList', 'keine FeatureInfos uebergeben' );
            return -1;
        }
        // Eintragen des ASR-Features
        if ( aFeatureInfo.features.ASR && typeof( aFeatureInfo.features.ASR ) === 'boolean') {
            this.mASRFeatureFlag = aFeatureInfo.features.ASR;
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
        this.mListenResultEvent._setErrorOutput( aErrorOutputFlag );
    }


    // Event-Funktionen


    /**
     * Ereignisfunktion fuer das Ergebnis der Spracherkennung
     *
     * @private
     * @param {string} aText - Spracherkennungsergebnis
     * @return {number}
     */

    _onListenResult( aText: string ): number {
        // console.log('SpeechListen: onListenResult=', aText);
        return this.mListenResultEvent.dispatch( aText );
    }


    get onListenResult(): OnASRListenResultFunc {
        return (aText: string) => this._onListenResult( aText );
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
            case SPEECH_LISTENRESULT_EVENT:
                result = this.mListenResultEvent.addListener( aPluginName, aEventFunc );
                break;

            default:
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
        let result = 0;
        switch ( aEventName ) {
            case SPEECH_LISTENRESULT_EVENT:
                result = this.mListenResultEvent.removeListener( aPluginName );
                break;

            default:
                result = super.removeEventListener( aPluginName, aEventName );
                break;
        }
        return result;
    }


    addListenResultEvent( aPluginName: string, aEventFunc: OnListenResultFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_LISTENRESULT_EVENT, aEventFunc );
    }

    removeListenResultEvent( aPluginName ): number {
        return this.removeEventListener( aPluginName, SPEECH_LISTENRESULT_EVENT );
    }

    removeAllEvent( aPluginName ): number {
        let result = super.removeAllEvent( aPluginName );
        if ( this.removeListenResultEvent( aPluginName ) !== 0 ) {
            result = -1;
        }
        return result;
    }


    // ASR-Funktionen


    /**
     * pruefen auf vorhandene ASR
     * 
     * @return {boolean} True, wenn ASR vorhanden ist, False sonst
     */

    isASR(): boolean {
        if ( this.mASRPlugin && this.mASRPlugin.isASR()) {
            return true;
        }
        return false;
    }


    /**
     * Setzen der aktuellen ASR ueber ihren Namen
     *
     * @param {string} aASRName - Name der ASR
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setASR( aASRName: string ): number {
        // console.log('ListenComponent.setASR:', aASRName);
        if ( !this.mASRPlugin ) {
            return -1;
        }
        return this.mASRPlugin.setASR( aASRName );
    }


    /**
     * Rueckgabe des eingestellten ASR-Namens
     *
     * @returns {string} Name der aktuellen ASR
     */

    getASR(): string {
        if ( !this.mASRPlugin ) {
            return '';
        }
        return this.mASRPlugin.getASR();
    }


    /**
     * Rueckgabe aller vorhandenen ASR-Namen
     *
     * @return {Array<string>} Liste der ASR-Namen
     */

    getASRList(): Array<string> {
        if ( !this.mASRPlugin ) {
            return [];
        }
        return this.mASRPlugin.getASRList();
    }


    // Language-Funktionen


    /**
     * Aendern der Sprache
     *
     * @param {string} aLanguage - Kurzbezeichnung der Sprache (de, en)
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setLanguage( aLanguage: string ): number {
        if ( !this.mASRPlugin ) {
            return -1;
        }
        // console.log('ListenComponent.setLanguage:', aLanguage);
        return this.mASRPlugin.setLanguage( aLanguage );
    }


    /**
     * aktuell eingestellte Sprache zurueckgeben
     *
     * @return {string} language - Kurzbezeichnung der Sprache (de, en)
     */

    getLanguage(): string {
        if ( !this.mASRPlugin ) {
            return LISTEN_UNDEFINE_LANGUAGE;
        }
        return this.mASRPlugin.getLanguage();
    }


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string> {
        if ( !this.mASRPlugin ) {
            return [];
        }
        return this.mASRPlugin.getLanguageList();
    }


    // Listen-Funktionen


    isRunning(): boolean {
        if ( !this.isActive()) {
            return false;
        }
        if ( !this.mASRPlugin ) {
            return false;
        }
        return this.mASRPlugin.isListenRunning();
    }


    /**
     * Spracheingabe starten, entweder im Server oder lokal
     *
     * @return {number} errorcode (0,-1)
     */

    start(): number {
        // console.log('ListenComponent.start');

        // fehlende ASR wird zuerst abgefrage, um Fehler zu erzeugen
    
        if ( !this.isASR()) {
            this._error( 'start', 'keine ASR vorhanden' );
            return -1;
        }

        if ( !this.isActive()) {
            return 0;
        }

        // interne ASR verwenden
        return this.mASRPlugin.startListen();
    }


    /**
     * Spracheingabe stoppen, entweder im Server oder lokal
     *
     * @return {number} errorcode (0,-1)
     */

    stop(): number {
        // console.log('ListenComponent.stop');

        if ( !this.isActive()) {
            return 0;
        }
        if ( !this.mASRPlugin ) {
            this._error( 'stop', 'kein ASR vorhanden' );
            return -1;
        }
        // interne ASR verwenden
        return this.mASRPlugin.stopListen();
    }


    /**
     * Spracheingabe abbrechen ohne Ergebnis, entweder im Server oder lokal
     *
     * @return {number} errorcode (0,-1)
     */

    abort(): number {
        // console.log('ListenComponent.abort');

        if ( !this.isActive()) {
            return 0;
        }
        if ( !this.mASRPlugin ) {
            this._error( 'abort', 'kein ASR vorhanden' );
            return -1;
        }
        // interne ASR verwenden
        return this.mASRPlugin.abortListen();
    }


    // Test-Funktionen


    /**
     * Fuehrt Testkommandos aus, um interne Tests ablaufen lassen zu koennen
     *
     * Kommandos:       'say', { sayText: 'zurueckzugebender Text fuer ListenResult' }
     *
     * @param {string} aTestCommand - Testkommando
     * @param {*} aTestData - optionale Testdaten
     *
     * @return {*} Rueckgabe der Testergebnisse { result: 0 }
     */

    test( aTestCommand: string, aTestData?: any ): any {
        const result = -1;
        let errorText = '';
        switch ( aTestCommand ) {
            /*
             * say-Kommando dient zum Ausfuehren von say() auf dem Corti-Mock, um SpeechRecognition zu simulieren
             */
            case 'say':
                // Kommando in ASR ausfuehren
                if ( this.mASRPlugin ) {
                    return this.mASRPlugin.test( aTestCommand, aTestData );
                } else {
                    errorText = 'kein ASRPlugin vorhanden';
                }
                break;

            default:
                errorText = 'kein gueltiges Testkommando uebergeben';
                break;
        }
        return { result, errorText };
    }

}
