/**
 * IntentComponent zur Verwaltung von NLU-Plugins. Sie erbt von der BaseComponent.
 *
 * Letzte Aenderung: 13.02.2019
 * Status: rot
 *
 * @module intent/component
 * @author SB
 */


// global

import { SPEECH_LISTENRESULT_EVENT, SPEECH_INTENTRESULT_EVENT } from '../../const/speech-event-const';


// event

import { EventFunctionList, EventFunc } from '../../core/event/event-function-list';


// base

import { BaseComponent } from '../../base/component/base-component';


// nlu

import { NLU_DEFAULT_NAME } from './../nlu/nlu-const';
import {
    NLUInterface,
    OnNLUListenResultFunc,
    OnNLUIntentResultFunc
} from '../nlu/nlu.interface';


// intent

import { INTENT_API_VERSION } from '../intent-version';
import { INTENT_TYPE_NAME, INTENT_COMPONENT_NAME, INTENT_DEFAULT_LANGUAGE, INTENT_UNDEFINE_LANGUAGE } from '../intent-const';
import { OnListenResultFunc, OnIntentResultFunc } from '../intent-function.type';
import { IntentOptionInterface } from '../intent-option.interface';
import { IntentComponentInterface } from './intent-component.interface';


const INTENT_COMPONENT_VERSION = INTENT_API_VERSION;


/**
 * IntentComponent Klasse
 */

export class IntentComponent extends BaseComponent implements IntentComponentInterface {

    // innere Plugins

    mNLUPlugin: NLUInterface = null;

    // Events

    mListenResultEvent = new EventFunctionList( SPEECH_LISTENRESULT_EVENT, INTENT_COMPONENT_NAME );
    mIntentResultEvent = new EventFunctionList( SPEECH_INTENTRESULT_EVENT, INTENT_COMPONENT_NAME );

    // Attribute der Komponente

    mASRActiveFlag = false;
    mNLUActiveFlag = false;

    // Features des Servers

    mNLUFeatureFlag = false;
    mASRFeatureFlag = false;

    // zu analysierender Text fuer die NLU

    mIntentText = '';


    /**
     * Intent Objekt erzeugen
     *
     * @param {boolean} aRegisterFlag - wenn true, dann in PluginManager eintragen
     */

    constructor( aRegisterFlag = true ) {
        super( INTENT_COMPONENT_NAME, aRegisterFlag );
        this.mListenResultEvent._setErrorOutputFunc( this._getErrorOutputFunc());
        this.mIntentResultEvent._setErrorOutputFunc( this._getErrorOutputFunc());
    }


    getType(): string {
        return INTENT_TYPE_NAME;
    }


    getClass(): string {
        return 'IntentComponent';
    }


    getVersion(): string {
        return INTENT_COMPONENT_VERSION;
    }


    getServerVersion(): string {
        return '';
    }


    // Komponenten-Funktionen


    /**
     * Eintragen der lokalen Optionen
     *
     * @protected
     * @param {IntentOptionInterface} aOption - optionale Parameter
     */

    _setOption( aOption: IntentOptionInterface ): number {
        // pruefen auf vorhandene Options
        if ( !aOption ) {
            return -1;
        }
        // TODO: Audiooptionen muessen noch eingebaut werden
        // Sprache eintragen
        if ( aOption.intentLanguage ) {
            // console.log('IntentComponent._setOption: language = ', aOption.intentLanguage);
            this.setLanguage( aOption.intentLanguage );
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

        // TODO: Hier muss die PluginGroup eingefuegt werden
        this.mNLUPlugin = this.findPlugin( NLU_DEFAULT_NAME ) as NLUInterface;

        // pruefen, ob NLU aktiv ist

        if ( this.mNLUPlugin ) {
            // console.log('IntentComponent.init: NLUActiveFlag = ', this.mNLUPlugin.isActive());
            this.mNLUActiveFlag = this.mNLUPlugin.isActive();
        }
        return 0;
    }


    /**
     * Initialisierung der Intent-Komponente
     *
     * @param {IntentOptionInterface} aOption - optionale Parameter { intentLanguage }
     *
     * @return {number} errorcode (0,-1)
     */

    init( aOption?: IntentOptionInterface ): number {
        return super.init( aOption );
    }


    /**
     * Loeschen der inneren Plugins
     */

    _doneAllPlugin(): void {
        // interne Komponenten

        this.mNLUPlugin = null;
    }


    /**
     * Loeschen der inneren Events
     */

    _doneAllEvent(): void {
        this.mListenResultEvent.clear();
        this.mIntentResultEvent.clear();
    }


    /**
     * Loeschen der inneren Attribute
     */

    _doneAllAttribute(): void {
        // Attribute

        this.mASRActiveFlag = false;
        this.mNLUActiveFlag = false;

        // Features des Servers

        this.mASRFeatureFlag = false;
        this.mNLUFeatureFlag = false;
    }


    /**
     * Defaultwerte setzen
     */

    _resetAllDefault(): void {
        this.setLanguage( INTENT_DEFAULT_LANGUAGE );
        this.setIntentText( '' );
    }


    /**
     * Auf Defaultwerte zuruecksetzen
     *
     * @param {IntentOptionInterface} aOption - optionale Parameter
     */

    // TODO: muss als Basisfunktion in Plugin aufgenommen werden

    reset( aOption?: IntentOptionInterface ): number {
        return super.reset( aOption );
    }


    /**
     * pruefen auf aktive Komponente. Komponente ist nur aktiv, wenn NLU
     * vorhanden ist. Ansonsten ist die Komponente immer deaktiv.
     *
     * @return {boolean} Rueckgabe, ob Kompponente aktiv ist
     */

    isActive(): boolean {
        // pruefen auf vorhandene NLU

        if ( !this.mNLUActiveFlag ) {
            return false;
        }
        return super.isActive();
    }


    /**
     * Einschalten der Komponente, wenn NLU vorhanden ist.
     * Ansonsten ist die Komponente nicht einschaltbar.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActiveOn(): number {
        // pruefen auf vorhandene Recognition
        if ( !this.mNLUActiveFlag ) {
            return -1;
        }
        return super.setActiveOn();
    }


    /**
     * Hier werden die Features des Servers gesetzt
     *
     * @param {Object} aFeatureInfo {NLU: boolean}
     *
     * @return {number} errorcode (0,-1)
     */

    setFeatureList( aFeatureInfo: any ): number {
        // console.log('IntentComponent.setFeatureList:', aFeatureInfo);
        if ( !aFeatureInfo.features ) {
            this._error( 'setFeatureList', 'keine FeatureInfos uebergeben' );
            return -1;
        }
        // Eintragen des ASR-Features
        if ( aFeatureInfo.features.ASR && typeof( aFeatureInfo.features.ASR ) === 'boolean') {
            this.mASRFeatureFlag = aFeatureInfo.features.ASR;
        }
        // Eintragen des NLU-Features
        if ( aFeatureInfo.features.NLU && typeof(aFeatureInfo.features.NLU ) === 'boolean') {
            this.mNLUFeatureFlag = aFeatureInfo.features.NLU;
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
        this.mIntentResultEvent._setErrorOutput( aErrorOutputFlag );
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


    get onListenResult(): OnNLUListenResultFunc {
        return (aText: string) => this._onListenResult( aText );
    }


    /**
     * Ereignisfunktion fuer das Ergebnis der Sprachanalyse
     *
     * @private
     * @param {any} aIntent - Sprachanalyseergebnis mit Intent
     *
     * @return {number}
     */

    _onIntentResult( aIntent: any ): number {
        // console.log('IntentComponent: onIntentResult = ', aIntent);
        return this.mIntentResultEvent.dispatch( aIntent );
    }


    get onIntentResult(): OnNLUIntentResultFunc {
        return (aIntent: any) => this._onIntentResult( aIntent );
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

            case SPEECH_INTENTRESULT_EVENT:
                result = this.mIntentResultEvent.addListener( aPluginName, aEventFunc );
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

            case SPEECH_INTENTRESULT_EVENT:
                result = this.mIntentResultEvent.removeListener( aPluginName );
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

    addIntentResultEvent( aPluginName: string, aEventFunc: OnIntentResultFunc ): number {
        return this.addEventListener( aPluginName, SPEECH_INTENTRESULT_EVENT, aEventFunc );
    }

    removeIntentResultEvent( aPluginName ): number {
        return this.removeEventListener( aPluginName, SPEECH_INTENTRESULT_EVENT );
    }

    removeAllEvent( aPluginName ): number {
        let result = super.removeAllEvent( aPluginName );
        if ( this.removeListenResultEvent( aPluginName ) !== 0 ) {
            result = -1;
        }
        if ( this.removeIntentResultEvent( aPluginName ) !== 0 ) {
            result = -1;
        }
        return result;
    }


    // NLU-Funktionen


    /**
     * pruefen auf vorhandene NLU
     * 
     * @return {boolean} True, wenn NLU vorhanden ist, False sonst
     */

    isNLU(): boolean {
        if ( this.mNLUPlugin && this.mNLUPlugin.isNLU()) {
            return true;
        }
        return false;
    }


    /**
     * Setzen der aktuellen NLU ueber ihren Namen
     *
     * @param {string} aNLUName - Name der NLU
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setNLU( aNLUName: string ): number {
        if ( !this.mNLUPlugin ) {
            return -1;
        }
        return this.mNLUPlugin.setNLU( aNLUName );
    }


    /**
     * Rueckgabe des eingestellten NLU-Namens
     *
     * @returns {string} Name der aktuellen NLU
     */

    getNLU(): string {
        if ( !this.mNLUPlugin ) {
            return '';
        }
        return this.mNLUPlugin.getNLU();
    }


    /**
     * Rueckgabe aller vorhandenen NLU-Namen
     *
     * @return {Array<string>} Liste der NLU-Namen
     */

    getNLUList(): Array<string> {
        if ( !this.mNLUPlugin ) {
            return [];
        }
        return this.mNLUPlugin.getNLUList();
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
        if ( !this.mNLUPlugin ) {
            return -1;
        }
        // console.log('ListenComponent.setLanguage:', aLanguage);
        return this.mNLUPlugin.setLanguage( aLanguage );
    }


    /**
     * aktuell eingestellte Sprache zurueckgeben
     *
     * @return {string} language - Kurzbezeichnung der Sprache (de, en)
     */

    getLanguage(): string {
        if ( !this.mNLUPlugin ) {
            return INTENT_UNDEFINE_LANGUAGE;
        }
        return this.mNLUPlugin.getLanguage();
    }


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string> {
        if ( !this.mNLUPlugin ) {
            return [];
        }
        return this.mNLUPlugin.getLanguageList();
    }


    // Text-Funktionen


    /**
     * Eintragen des aktuell zu analysierenden Textes
     *
     * @param aText - Text fuer die Sprachanalyse
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setIntentText( aText: string ): number {
        this.mIntentText = aText;
        return 0;
    }


    /**
     * Rueckgabe des aktuell zu anlysierenden Textes
     *
     * @return {string} Text
     */

    getIntentText(): string {
        return this.mIntentText;
    }


    // Intent-Funktionen


    isRunning(): boolean {
        if ( !this.isActive()) {
            return false;
        }
        if ( !this.mNLUPlugin ) {
            return false;
        }
        return this.mNLUPlugin.isListenRunning();
    }


    /**
     * Sprachanalyse starten, entweder im Server oder lokal
     *
     * @return {number} errorcode (0,-1)
     */

    start(): number {
        // console.log('IntentComponent.start:', this.mIntentText);

        // fehlende NLU wird zuerst abgefrage, um Fehler zu erzeugen
    
        if ( !this.isNLU()) {
            this._error( 'start', 'keine NLU vorhanden' );
            return -1;
        }

        if ( !this.isActive()) {
            return 0;
        }

        // pruefen auf Server-Konponente
        if ( this.mNLUFeatureFlag ) {
            // NLU wird vom Server verwendet
            return 0;
        }

        // pruefen auf Text, wenn nicht vorhanden die ASR starten, wenn vorhanden

        if ( !this.mIntentText ) {
            if ( this.mNLUPlugin.isListen()) {
                // TODO: pruefen auf ASRFEatureFlag, um ASR vom Server aufzurufen
                // interne NLU mit ASR verwenden
                return this.mNLUPlugin.startListen();
            } else {
                this._error( 'start', 'Keinen Text zur Sprachanalyse uebergeben' );
                return -1;
            }
        }

        // interne NLU mit Text verwenden

        return this.mNLUPlugin.startIntent( this.mIntentText );
    }


    /**
     * Sprachanalyse stoppen, entweder im Server oder lokal
     *
     * @return {number} errorcode (0,-1)
     */

    stop(): number {
        // console.log('IntentComponent.stop');

        if ( !this.isActive()) {
            return 0;
        }
        if ( !this.mNLUPlugin ) {
            this._error( 'stop', 'keine NLU vorhanden' );
            return -1;
        }

        if ( !this.mIntentText ) {
            // TODO: pruefen auf ASRFEatureFlag, um ASR vom Server aufzurufen
            // interne NLU mit ASR verwenden
            return this.mNLUPlugin.stopListen();
        }

        // interne NLU verwenden
        // return this.mNLUPlugin.stopIntent();
        return 0;
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
        if ( !this.mNLUPlugin ) {
            this._error( 'abort', 'keine NLU vorhanden' );
            return -1;
        }
        // interne NLU verwenden
        if ( !this.mIntentText ) {
            return this.mNLUPlugin.abortListen();
        }
        return 0;
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
                if ( this.mNLUPlugin ) {
                    return this.mNLUPlugin.test( aTestCommand, aTestData );
                } else {
                    errorText = 'kein NLUPlugin vorhanden';
                }
                break;

            default:
                errorText = 'kein gueltiges Testkommando uebergeben';
                break;
        }
        return { result, errorText };
    }

}
