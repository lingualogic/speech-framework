/** @packageDocumentation
 * NLUGroup definiert die Verwaltungsklasse aller NLU.
 * Hier werden die vorhandenen NLU verwaltet und es kann
 * zwischen ihnen gewechselt werden.
 *
 * Installierte NLU:
 *
 *      NLUNuance    - Default Nuance-Service NLU
 *      NLUGoogle    - Google Dialogflow NLU (Version1-API, bis Oktober 2019)
 *      NLUMicrosoft - Microsoft NLU
 *      NLURasa      - Rasa NLU 
 *      NLUHtml5     - Web-NLU (Grammatik muss definiert werden)
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module intent/nlu
 * @author SB
 */


// TODO: Html5-NLU soll erst mal nicht verwendet werden, bis Grammatik aufgebaut ist !


// core

import { OnSpeechInitFunc, OnSpeechErrorFunc, PluginGroup } from '@speech/core';


// nlu

import {
    NLU_TYPE_NAME,
    NLU_GROUP_NAME,
    NLU_HTML5_NAME,
    NLU_NUANCE_NAME,
    NLU_GOOGLE_NAME,
    NLU_MICROSOFT_NAME,
    NLU_RASA_NAME
} from './nlu-const';
import {
    NLUInterface,
    NLUStartListenFunc,
    NLUStopListenFunc,
    OnNLUConnectFunc,
    OnNLUDisconnectFunc,
    OnNLUListenStartFunc,
    OnNLUListenStopFunc,
    OnNLUListenResultFunc,
    OnNLUIntentResultFunc
} from './nlu.interface';
import { NLUFactory } from './nlu-factory';


/**
 * Diese Klasse ist die Verwaltungsklasse fuer alle implementierten NLU
 */

export class NLUGroup extends PluginGroup implements NLUInterface {


    /**
     * NLU-Fabrik zur Erzeugung der einzelnen NLU
     * @type {NLUFactory}
     */

    mNLUFactory: NLUFactory = null;


    // alle inneren NLU

    mNLUHtml5: NLUInterface = null;
    mNLUNuance: NLUInterface = null;
    mNLUGoogle: NLUInterface = null;
    mNLUMicrosoft: NLUInterface = null;
    mNLURasa: NLUInterface = null;


    // aktuell genutzte NLU

    mCurrentNLU: NLUInterface = null;


    // Event-Funktionen


    /**
     * NLUPlugin erzeugen
     *
     * @param {NLUFactory} aNLUFactory - Fabrik zur Erzeugung der NLUs
     * @param {string} aNLUName - Name der NLU-Klasse
     * @param {boolean} aRegisterFlag - bestimmt, ob Instanz beim PluginManager registriert wird
     */

    constructor( aNLUFactory: NLUFactory, aNLUName?: string, aRegisterFlag = true ) {
        super( aNLUName || NLU_GROUP_NAME, aRegisterFlag );
        this.mNLUFactory = aNLUFactory;
        // eintragen der inneren NLU-Plugins
        this._insertAllNLU();
    }


    /**
     * Typ zurueckgeben
     *
     * @param {string} Name des Typs des Plugins
     */

    getType(): string {
        return NLU_TYPE_NAME;
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'NLUGroup';
    }


    // Plugin-Funktionen


    /**
     * Einfuegen aller verfeugbaren NLU-Plugins
     */

    _insertAllNLU(): void {
        // pruefen auf NLU-Fabrik
        if ( !this.mNLUFactory ) {
            this._error( '_insertAllNLU', 'keine NLU-Fabrik vorhanden' );
            return;
        }
        // eintragen der verfuegbaren NLU-Plugins
        this.insertPlugin( NLU_NUANCE_NAME, this.mNLUFactory.create( NLU_NUANCE_NAME, false ));
        this.insertPlugin( NLU_GOOGLE_NAME, this.mNLUFactory.create( NLU_GOOGLE_NAME, false ));
        this.insertPlugin( NLU_MICROSOFT_NAME, this.mNLUFactory.create( NLU_MICROSOFT_NAME, false ));
        this.insertPlugin( NLU_RASA_NAME, this.mNLUFactory.create( NLU_RASA_NAME, false ));
        // TODO: Html5 erst eintragen, wenn Grammatik programmiert wurde
        // this.insertPlugin( NLU_HTML5_NAME, this.mNLUFactory.create( NLU_HTML5_NAME, false ));
    }


    /**
     * Initialisierung des HTML5-NLU Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    _initNLUHtml5( aOption: any ): void {
        this.mNLUHtml5 = this.findPlugin( NLU_HTML5_NAME ) as NLUInterface;
        if ( this.mNLUHtml5 ) {
            this.mNLUHtml5.init( aOption );
            if ( this.mNLUHtml5.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('NLUGroup._initNLUHtml5: NLU eingefuegt');
                }
                return;
            }
            this.removePlugin( NLU_HTML5_NAME );
            this.mNLUHtml5.done();
            this.mNLUHtml5 = null;
        }
        if ( this.isErrorOutput()) {
            console.log('NLUGroup._initNLUHtml5: NLU nicht eingefuegt');
        }
    }


    /**
     * Initialisierung des NUANCE-NLU Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    _initNLUNuance( aOption: any ): void {
        this.mNLUNuance = this.findPlugin( NLU_NUANCE_NAME ) as NLUInterface;
        if ( this.mNLUNuance ) {
            this.mNLUNuance.init( aOption );
            if ( this.mNLUNuance.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('NLUGroup._initNLUNuance: NLU eingefuegt');
                }
                return;
            }
            this.removePlugin( NLU_NUANCE_NAME );
            this.mNLUNuance.done();
            this.mNLUNuance = null;
        }
        if ( this.isErrorOutput()) {
            console.log('NLUGroup._initNLUNuance: NLU nicht eingefuegt');
        }
    }


    /**
     * Initialisierung des Google-NLU Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    _initNLUGoogle( aOption: any ): void {
        this.mNLUGoogle = this.findPlugin( NLU_GOOGLE_NAME ) as NLUInterface;
        if ( this.mNLUGoogle ) {
            this.mNLUGoogle.init( aOption );
            if ( this.mNLUGoogle.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('NLUGroup._initNLUGoogle: NLU eingefuegt');
                }
                return;
            }
            this.removePlugin( NLU_GOOGLE_NAME );
            this.mNLUGoogle.done();
            this.mNLUGoogle = null;
        }
        if ( this.isErrorOutput()) {
            console.log('NLUGroup._initNLUGoogle: NLU nicht eingefuegt');
        }
    }


    /**
     * Initialisierung des Microsoft-NLU Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    _initNLUMicrosoft( aOption: any ): void {
        this.mNLUMicrosoft = this.findPlugin( NLU_MICROSOFT_NAME ) as NLUInterface;
        if ( this.mNLUMicrosoft ) {
            this.mNLUMicrosoft.init( aOption );
            if ( this.mNLUMicrosoft.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('NLUGroup._initNLUMicrosoft: NLU eingefuegt');
                }
                return;
            }
            this.removePlugin( NLU_MICROSOFT_NAME );
            this.mNLUMicrosoft.done();
            this.mNLUMicrosoft = null;
        }
        if ( this.isErrorOutput()) {
            console.log('NLUGroup._initNLUMicrosoft: NLU nicht eingefuegt');
        }
    }


    /**
     * Initialisierung des Rasa-NLU Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    _initNLURasa( aOption: any ): void {
        this.mNLURasa = this.findPlugin( NLU_RASA_NAME ) as NLUInterface;
        if ( this.mNLURasa ) {
            this.mNLURasa.init( aOption );
            if ( this.mNLURasa.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('NLUGroup._initNLURasa: NLU eingefuegt');
                }
                return;
            }
            this.removePlugin( NLU_RASA_NAME );
            this.mNLURasa.done();
            this.mNLURasa = null;
        }
        if ( this.isErrorOutput()) {
            console.log('NLUGroup._initNLURasa: NLU nicht eingefuegt');
        }
    }


    /**
     * Initialisierung von NLUPlugin
     *
     * @param {any} [aOption] - optionale Parameter
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        // pruefen auf doppelte Initialisierung

        if ( this.isInit()) {
            this._error( 'init', 'init doppelt aufgerufen' );
            return -1;
        }

        // Eintragen der inneren NLU

        if ( !this.mNLUFactory ) {
            this._error( 'init', 'keine NLU-Fabrik vorhanden' );
            return -1;
        }

        // pruefen auf Fehleroutput

        const option = aOption || {};
        if ( !this.isErrorOutput()) {
            option.errorOutputFlag = false;
        }

        // NLU eintragen in Reihenfolge ihrer Nutzung

        this._initNLUNuance( option );  // Default-NLU
        this._initNLUGoogle( option );  // Dialogflow-NLU Version-1 bis Oktober 2019
        this._initNLUMicrosoft( option );  // Microsoft-NLU
        this._initNLURasa( option );    // Rasa-NLU
        // TODO: Html5 erst eintragen, wenn Grammatik programmiert wurde
        // this._initNLUHtml5( option );

        // console.log('NLUGroup.init: erfolgreich');
        if ( super.init( aOption ) !== 0 ) {
            return -1;
        }

        // erste NLU einstellen als Default-NLU

        this.mCurrentNLU = this.firstPlugin() as NLUInterface;
        if ( !this.mCurrentNLU ) {
            // keine NLU verfuegbar !
            if ( this.isErrorOutput()) {
                console.log('NLUGroup.init: keine NLU verfuegbar');
            }
            this.setActiveOff();
        }

        // NLU-Option einstellen

        if ( aOption && aOption.tts ) {
            this.setNLU( aOption.tts );
        }

        return 0;
    }


    /**
     * Freigabe von NLU
     */

    done(): number {
        this.mNLUHtml5 = null;
        this.mNLUNuance = null;
        this.mNLUGoogle = null;
        this.mNLUMicrosoft = null;
        this.mNLURasa = null;
        this.mCurrentNLU = null;
        return super.done();
    }


    /**
     * pruefen auf aktive Komponente. Komponente ist nur aktiv, wenn eine NLU
     * vorhanden ist. Ansonsten ist die Komponente immer deaktiv.
     *
     * @return {boolean} Rueckgabe, ob Kompponente aktiv ist
     */

    isActive(): boolean {
        // pruefen auf vorhandene NLU
        if ( !this.mCurrentNLU ) {
            return false;
        }
        if ( !this.mCurrentNLU.isActive()) {
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
        // pruefen auf vorhandene NLU
        if ( !this.mCurrentNLU ) {
            return -1;
        }
        if ( !this.mCurrentNLU.isActive()) {
            return -1;
        }
        return super.setActiveOn();
    }


    // Event-Funktionen


    /**
     * Init-Ereignis Funktion eintragen
     *
     * @param {OnSpeechInitFunc} aOnInitFunc - Callback-Funktion fuer Initereignis
     */

    set onInit( aOnInitFunc: OnSpeechInitFunc ) {
        // console.log('NLUGroup.onInit:', aOnInitFunc );
        let nlu = this.firstPlugin() as NLUInterface;
        // console.log('NLUGroup.onInit: nlu = ', nlu);
        while ( nlu ) {
            // console.log('NLUGroup.onInit:', nlu.getName());
            nlu.onInit = aOnInitFunc;
            nlu = this.nextPlugin() as NLUInterface;
        }
    }


    /**
     * Verbindung aufgebaut Callback-Funktion eintragen
     *
     * @param {OnNLUConnectFunc} aOnConnectFunc - Callback fuer Verbindung aufgebaut
     */

    set onConnect( aOnConnectFunc: OnNLUConnectFunc ) {
        // console.log('NLUGroup.onConnect:', aOnConnectFunc );
        let nlu = this.firstPlugin() as NLUInterface;
        // console.log('NLUGroup.onConnect: nlu = ', nlu);
        while ( nlu ) {
            // console.log('NLUGroup.onConnect:', nlu.getName());
            nlu.onConnect = aOnConnectFunc;
            nlu = this.nextPlugin() as NLUInterface;
        }
    }


    /**
     * Verbindung getrennt Callback-Funktion eintragen
     *
     * @param {OnNLUDisconnectFunc} aOnDisconnectFunc - Callback fuer Verbindung getrennt
     */

    set onDisconnect( aOnDisconnectFunc: OnNLUDisconnectFunc ) {
        // console.log('NLUGroup.onDisconnect:', aOnDisconnectFunc );
        let nlu = this.firstPlugin() as NLUInterface;
        // console.log('NLUGroup.onDisconnect: nlu = ', nlu);
        while ( nlu ) {
            // console.log('NLUGroup.onDisconnect:', nlu.getName());
            nlu.onDisconnect = aOnDisconnectFunc;
            nlu = this.nextPlugin() as NLUInterface;
        }
    }


    /**
     * Start-Ereignis Funktion eintragen
     *
     * @param {OnNLUListenStartFunc} aOnListenStartFunc - Callback-Funktion fuer Startereignis
     */

    set onListenStart( aOnListenStartFunc: OnNLUListenStartFunc ) {
        let nlu = this.firstPlugin() as NLUInterface;
        while ( nlu ) {
            nlu.onListenStart = aOnListenStartFunc;
            nlu = this.nextPlugin() as NLUInterface;
        }
    }


    /**
     * Stop-Ereignis Funktion eintragen
     *
     * @param {OnNLUListenStopFunc} aOnListenStopFunc - Callback-Funktion fuer Stopereignis
     */

    set onListenStop( aOnListenStopFunc: OnNLUListenStopFunc ) {
        let nlu = this.firstPlugin() as NLUInterface;
        while ( nlu ) {
            nlu.onListenStop = aOnListenStopFunc;
            nlu = this.nextPlugin() as NLUInterface;
        }
    }


    /**
     * Spracheingabe Ergebnisrueckgabe Callback-Funktion eintragen
     *
     * @param {OnNLUListenResultFunc} aOnListenResultFunc - Callback fuer Result Ergebnis
     */

    set onListenResult( aOnListenResultFunc: OnNLUListenResultFunc ) {
        let nlu = this.firstPlugin() as NLUInterface;
        while ( nlu ) {
            nlu.onListenResult = aOnListenResultFunc;
            nlu = this.nextPlugin() as NLUInterface;
        }
    }


    /**
     * Sprachanalyse Ergebnisrueckgabe Callback-Funktion eintragen
     *
     * @param {OnNLUIntentResultFunc} aOnIntentResultFunc - Callback fuer Result Ergebnis
     */

    set onIntentResult( aOnIntentResultFunc: OnNLUIntentResultFunc ) {
        let nlu = this.firstPlugin() as NLUInterface;
        while ( nlu ) {
            nlu.onIntentResult = aOnIntentResultFunc;
            nlu = this.nextPlugin() as NLUInterface;
        }
    }


    /**
     * Fehler-Ereignis Funktion eintragen
     *
     * @param {OnSpeechErrorFunc} aOnSpeechErrorFunc - Callback-Funktion fuer Fehler-Ereignis
     */

    set onError( aOnErrorFunc: OnSpeechErrorFunc ) {
        // console.log('NLUGroup.onError: start', aOnErrorFunc);
        this.mOnErrorFunc = aOnErrorFunc;
        // Schleife fuer alle Plugins
        let asr = this.firstPlugin() as NLUInterface;
        // console.log('NLUGroup.onError: first asr = ', asr);
        while ( asr ) {
            asr.onError = aOnErrorFunc;
            asr = this.nextPlugin() as NLUInterface;
            // console.log('NLUGroup.onError: next asr = ', asr);
        }
    }


    // NLU-Funktionen


    /**
     * pruefen auf vorhandene NLU
     * 
     * @return {boolean} True, wenn NLU vorhanden ist, False sonst
     */

    isNLU(): boolean {
        if ( this.mCurrentNLU ) {
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
        // console.log( 'NLUGroup.setNLU:', aNLUName );
        let nlu = null;
        switch ( aNLUName ) {

            case NLU_HTML5_NAME:
                nlu = this.mNLUHtml5;
                break;

            case NLU_NUANCE_NAME:
                nlu = this.mNLUNuance;
                break;

            case NLU_GOOGLE_NAME:
                nlu = this.mNLUGoogle;
                break;

            case NLU_MICROSOFT_NAME:
                nlu = this.mNLUMicrosoft;
                break;
    
            case NLU_RASA_NAME:
                nlu = this.mNLURasa;
                break;
    
            default:
                break;
        }

        // pruefen auf gefundene NLU

        if ( !nlu ) {
            this._error( 'setNLU', 'Keine NLU vorhanden' );
            return -1;
        }

        // neue NLU eintragen

        this.mCurrentNLU = nlu;
        return 0;
    }


    /**
     * Rueckgabe des eingestellten NLU-Namens
     *
     * @returns {string} Name der aktuellen NLU
     */

    getNLU(): string {
        if ( !this.mCurrentNLU ) {
            return '';
        }
        return this.mCurrentNLU.getName();
    }


    /**
     * Rueckgabe aller vorhandenen NLU-Namen
     *
     * @return {Array<string>} Liste der NLU-Namen
     */

    getNLUList(): Array<string> {
        return this.getPluginNameList();
    }


    // Language-Funktionen


    /**
     * Traegt eine neue Sprache ein
     *
     * @param {string} aLanguage - de oder en
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setLanguage( aLanguage: string ): number {
        let result = 0;
        let nlu = this.firstPlugin() as NLUInterface;
        // pruefen, ob eine NLU vorhanden ist
        if ( !nlu ) {
            this._error( 'setLanguage', 'Keine NLU vorhanden' );
            return -1;
        }
        while ( nlu ) {
            if ( nlu.setLanguage( aLanguage ) !== 0 ) {
                result = -1;
            }
            nlu = this.nextPlugin() as NLUInterface;
        }
        return result;
    }


    /**
     * Gibt die aktuell einstestellte Sprache zurueck
     *
     * @return {string}
     */

    getLanguage(): string {
        if ( this.mCurrentNLU ) {
            return this.mCurrentNLU.getLanguage();
        }
        return '';
    }


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string> {
        if ( this.mCurrentNLU ) {
            return this.mCurrentNLU.getLanguageList();
        }
        return [];
    }


    // Intent-Funktionen


    /**
     * pruefen auf vorhandene Recognition fuer Intents
     *
     * @returns {boolean} True, wenn Recognition vorhanden ist, False sonst
     */

    isIntent(): boolean {
        if ( this.mCurrentNLU ) {
            return this.mCurrentNLU.isIntent();
        }
        return false;
    }


    /**
     * Intentanalyse starten
     *
     * @param aText - auf Intent zu analysierender Text
     *
     * @return {number} Fehlercode 0 oder -1
     */

    startIntent( aText: string ): number {
        // console.log('NLUGroup.startIntent');
        if ( !this.mCurrentNLU ) {
            this._error( 'startIntent', 'keine NLU vorhanden' );
            return -1;
        }
        // pruefen auf aktive Komponente
        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('NLUGroup.startIntent: NLU ist nicht aktiv');
            }
            return 0;
        }
        return this.mCurrentNLU.startIntent( aText );
    }


    // Listen-Funktionen


    /**
     * pruefen auf vorhandene Recognition fuer Listen
     *
     * @returns {boolean} True, wenn Recognition vorhanden ist, False sonst
     */

    isListen(): boolean {
        if ( this.mCurrentNLU ) {
            return this.mCurrentNLU.isListen();
        }
        return false;
    }


    /**
     * Prueft, ob die Spracheingabe gerade laeuft
     *
     * @return {boolean} True, wenn Spracheingabe laeuft, False sonst
     */

    isListenRunning() {
        if ( this.mCurrentNLU ) {
            return this.mCurrentNLU.isListenRunning();
        }
        return false;
    }


    /**
     * Timout in Millisekunden setzen. Der Timeout begrenzt die Zeit,
     * die auf Listen gewartet wird, wenn listen nicht starten kann.
     *
     * @param {number} aTimeout
     */

    setListenTimeout( aTimeout: number ): void {
        if ( this.mCurrentNLU ) {
            this.mCurrentNLU.setListenTimeout( aTimeout );
        }
    }


    /**
     * Spracherkennung starten
     *
     * @return {number} errorcode(0,-1)
     */

    startListen(): number {
        // pruefen auf aktive Komponente
        if ( !this.mCurrentNLU ) {
            this._error( 'startListen', 'keine NLU vorhanden' );
            return -1;
        }
        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('NLUGroup.startListen: NLU ist nicht aktiv');
            }
            return 0;
        }
        return this.mCurrentNLU.startListen();
    }


    /**
     * Rueckgabe der Start-Funktion, um mit anderen Komponenten verbunden zu werden.
     *
     * @return {NLUStartListenFunc} Instanz der Start-Funktion
     */

    getStartListenFunc(): NLUStartListenFunc {
        return () => this.startListen();
    }


    /**
     * Spracherkennung beenden
     *
     * @return {number} errorcode(0,-1)
     */

    stopListen(): number {
        // pruefen auf aktive Komponente
        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('NLUGroup.stopListen: NLU ist nicht aktiv');
            }
            return 0;
        }
        return this.mCurrentNLU.stopListen();
    }


    /**
     * Rueckgabe der Stop-Funktion, um mit anderen Komponenten verbunden zu werden.
     *
     * @return {NLUStopListenFunc} Instanz der Stop-Funktion
     */

    getStopListenFunc(): NLUStopListenFunc {
        return () => this.stopListen();
    }


    /**
     * Spracheingabe beenden
     *
     * @return {number} Fehlercode 0 oder -1
     */

    abortListen(): number {
        // pruefen auf aktive Komponente
        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('NLUGroup.abortListen: NLU ist nicht aktiv');
            }
            return 0;
        }
        return this.mCurrentNLU.abortListen();
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
        // pruefen auf aktive Komponente
        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('NLUGroup.abortListen: NLU ist nicht aktiv');
            }
            return 0;
        }
        return this.mCurrentNLU.test( aTestCommand, aTestData );
    }


}
