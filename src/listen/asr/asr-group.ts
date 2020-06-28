/** @packageDocumentation
 * ASRGroup definiert die Verwaltungsklasse aller ASR.
 * Hier werden die vorhandenen ASR verwaltet und es kann
 * zwischen ihnen gewechselt werden.
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * Installierte ASR:
 *
 *      ASRHtml5     - Default Web-ASR
 *      ASRNuance    - Nuance-Service ASR (deprecated)
 *      ASRGoogle    - Google-Service ASR (nur mit Speech-Server)
 *      ASRMicrosoft - Google-Service ASR (nur mit Speech-Server)
 *
 * @module listen/asr
 * @author SB
 */


// core

import { OnSpeechInitFunc, OnSpeechErrorFunc, PluginGroup } from '@speech/core';


// asr

import {
    ASR_TYPE_NAME,
    ASR_GROUP_NAME,
    ASR_HTML5_NAME,
    ASR_NUANCE_NAME,
    ASR_GOOGLE_NAME,
    ASR_MICROSOFT_NAME
} from './asr-const';
import {
    ASRInterface,
    ASRStartListenFunc,
    ASRStopListenFunc,
    OnASRListenStartFunc,
    OnASRListenStopFunc,
    OnASRListenResultFunc,
    OnASRListenNoMatchFunc
} from './asr.interface';
import { ASRFactory } from './asr-factory';


/**
 * Diese Klasse ist die Verwaltungsklasse fuer alle implementierten ASR
 */

export class ASRGroup extends PluginGroup implements ASRInterface {


    /**
     * ASR-Fabrik zur Erzeugung der einzelnen ASR
     * @type {ASRFactory}
     */

    mASRFactory: ASRFactory = null;


    // alle inneren ASR

    mASRHtml5: ASRInterface = null;
    mASRNuance: ASRInterface = null;
    mASRGoogle: ASRInterface = null;
    mASRMicrosoft: ASRInterface = null;


    // aktuell genutzte ASR

    mCurrentASR: ASRInterface = null;


    // Event-Funktionen


    /**
     * ASRPlugin erzeugen
     *
     * @param {string} aASRName - Name der ASR-Klasse
     * @param {boolean} aRegisterFlag - bestimmt, ob Instanz beim PluginManager registriert wird
     */

    constructor( aASRFactory: ASRFactory, aASRName?: string, aRegisterFlag = true ) {
        super( aASRName || ASR_GROUP_NAME, aRegisterFlag );
        this.mASRFactory = aASRFactory;
        // eintragen der inneren ASR-Plugins
        this._insertAllASR();
    }


    /**
     * Typ zurueckgeben
     *
     * @param {string} Name des Typs des Plugins
     */

    getType(): string {
        return ASR_TYPE_NAME;
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'ASRGroup';
    }


    // Plugin-Funktionen


    /**
     * Einfuegen aller verfeugbaren ASR-Plugins
     */

    _insertAllASR(): void {
        // pruefen auf ASR-Fabrik
        if ( !this.mASRFactory ) {
            this._error( '_insertAllASR', 'keine ASR-Fabrik vorhanden' );
            return;
        }
        // eintragen der verfuegbaren ASR-Plugins
        this.insertPlugin( ASR_HTML5_NAME, this.mASRFactory.create( ASR_HTML5_NAME, false ));
        this.insertPlugin( ASR_NUANCE_NAME, this.mASRFactory.create( ASR_NUANCE_NAME, false ));
        this.insertPlugin( ASR_GOOGLE_NAME, this.mASRFactory.create( ASR_GOOGLE_NAME, false ));
        this.insertPlugin( ASR_MICROSOFT_NAME, this.mASRFactory.create( ASR_MICROSOFT_NAME, false ));
    }


    /**
     * Initialisierung des HTML5-ASR Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    _initASRHtml5( aOption: any ): void {
        this.mASRHtml5 = this.findPlugin( ASR_HTML5_NAME ) as ASRInterface;
        if ( this.mASRHtml5 ) {
            this.mASRHtml5.init( aOption );
            if ( this.mASRHtml5.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('ASRGroup._initASRHtml5: ASR eingefuegt');
                }
                return;
            }
            this.removePlugin( ASR_HTML5_NAME );
            this.mASRHtml5.done();
            this.mASRHtml5 = null;
        }
        if ( this.isErrorOutput()) {
            console.log('ASRGroup._initASRHtml5: ASR nicht eingefuegt');
        }
    }


    /**
     * Initialisierung des NUANCE-ASR Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    _initASRNuance( aOption: any ): void {
        this.mASRNuance = this.findPlugin( ASR_NUANCE_NAME ) as ASRInterface;
        if ( this.mASRNuance ) {
            this.mASRNuance.init( aOption );
            if ( this.mASRNuance.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('ASRGroup._initASRNuance: ASR eingefuegt');
                }
                return;
            }
            this.removePlugin( ASR_NUANCE_NAME );
            this.mASRNuance.done();
            this.mASRNuance = null;
        }
        if ( this.isErrorOutput()) {
            console.log('ASRGroup._initASRNuance: ASR nicht eingefuegt');
        }
    }


    /**
     * Initialisierung des GOOGLE-ASR Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    _initASRGoogle( aOption: any ): void {
        this.mASRGoogle = this.findPlugin( ASR_GOOGLE_NAME ) as ASRInterface;
        if ( this.mASRGoogle ) {
            this.mASRGoogle.init( aOption );
            if ( this.mASRGoogle.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('ASRGroup._initASRGoogle: ASR eingefuegt');
                }
                return;
            }
            this.removePlugin( ASR_GOOGLE_NAME );
            this.mASRGoogle.done();
            this.mASRGoogle = null;
        }
        if ( this.isErrorOutput()) {
            console.log('ASRGroup._initASRGoogle: ASR nicht eingefuegt');
        }
    }


    /**
     * Initialisierung des Microsoft-ASR Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    _initASRMicrosoft( aOption: any ): void {
        this.mASRMicrosoft = this.findPlugin( ASR_MICROSOFT_NAME ) as ASRInterface;
        if ( this.mASRMicrosoft ) {
            this.mASRMicrosoft.init( aOption );
            if ( this.mASRMicrosoft.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('ASRGroup._initASRMicrosoft: ASR eingefuegt');
                }
                return;
            }
            this.removePlugin( ASR_MICROSOFT_NAME );
            this.mASRMicrosoft.done();
            this.mASRMicrosoft = null;
        }
        if ( this.isErrorOutput()) {
            console.log('ASRGroup._initASRMicrosoft: ASR nicht eingefuegt');
        }
    }


    /**
     * Initialisierung von ASRPlugin
     *
     * @param {any} [aOption] - optionale Parameter
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        // console.log('ASRGroup.init:', aOption);
        // pruefen auf doppelte Initialisierung

        if ( this.isInit()) {
            this._error( 'init', 'init doppelt aufgerufen' );
            return -1;
        }

        // Eintragen der inneren ASR

        if ( !this.mASRFactory ) {
            this._error( 'init', 'keine ASR-Fabrik vorhanden' );
            return -1;
        }

        // pruefen auf Fehleroutput

        const option = aOption || {};
        if ( !this.isErrorOutput()) {
            option.errorOutputFlag = false;
        }

        // ASR eintragen in Reihenfolge ihrer Nutzung

        this._initASRHtml5( option );   // Default-ASR
        this._initASRNuance( option );
        this._initASRGoogle( option );
        this._initASRMicrosoft( option );

        // console.log('ASRGroup.init: erfolgreich');
        if ( super.init( aOption ) !== 0 ) {
            return -1;
        }

        // erste ASR einstellen als Default-ASR

        this.mCurrentASR = this.firstPlugin() as ASRInterface;
        if ( !this.mCurrentASR ) {
            // keine ASR verfuegbar !
            if ( this.isErrorOutput()) {
                console.log('ASRGroup.init: keine ASR verfuegbar');
            }
            this.setActiveOff();
        }

        // ASR-Option einstellen

        if ( aOption && aOption.tts ) {
            this.setASR( aOption.tts );
        }

        return 0;
    }


    /**
     * Freigabe von ASR
     */

    done(): number {
        this.mASRHtml5 = null;
        this.mASRNuance = null;
        this.mASRGoogle = null;
        this.mASRMicrosoft = null;
        this.mCurrentASR = null;
        return super.done();
    }


    /**
     * pruefen auf aktive Komponente. Komponente ist nur aktiv, wenn eine ASR
     * vorhanden ist. Ansonsten ist die Komponente immer deaktiv.
     *
     * @return {boolean} Rueckgabe, ob Kompponente aktiv ist
     */

    isActive(): boolean {
        // pruefen auf vorhandene ASR
        if ( !this.mCurrentASR ) {
            return false;
        }
        if ( !this.mCurrentASR.isActive()) {
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
        // pruefen auf vorhandene ASR
        if ( !this.mCurrentASR ) {
            return -1;
        }
        if ( !this.mCurrentASR.isActive()) {
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
        // console.log('ASRGroup.onInit:', aOnInitFunc );
        let asr = this.firstPlugin() as ASRInterface;
        // console.log('ASRGroup.onInit: asr = ', asr);
        while ( asr ) {
            // console.log('ASRGroup.onInit:', asr.getName());
            asr.onInit = aOnInitFunc;
            asr = this.nextPlugin() as ASRInterface;
        }
    }


    /**
     * Start-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenStartFunc - Callback-Funktion fuer Startereignis
     */

    set onListenStart( aOnListenStartFunc: OnASRListenStartFunc ) {
        let asr = this.firstPlugin() as ASRInterface;
        while ( asr ) {
            asr.onListenStart = aOnListenStartFunc;
            asr = this.nextPlugin() as ASRInterface;
        }
    }


    /**
     * Stop-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStopFunc} aOnListenStopFunc - Callback-Funktion fuer Stopereignis
     */

    set onListenStop( aOnListenStopFunc: OnASRListenStopFunc ) {
        let asr = this.firstPlugin() as ASRInterface;
        while ( asr ) {
            asr.onListenStop = aOnListenStopFunc;
            asr = this.nextPlugin() as ASRInterface;
        }
    }


    /**
     * Spracheingabe Ergebnisrueckgabe Callback-Funktion eintragen
     *
     * @param {OnASRListenResultFunc} aOnListenResultFunc - Callback fuer Result Ergebnis
     */

    set onListenResult( aOnListenResultFunc: OnASRListenResultFunc ) {
        let asr = this.firstPlugin() as ASRInterface;
        while ( asr ) {
            asr.onListenResult = aOnListenResultFunc;
            asr = this.nextPlugin() as ASRInterface;
        }
    }


    /**
     * Spracheingabe Zwischenergebnisrueckgabe Callback-Funktion eintragen
     *
     * @param {OnASRListenResultFunc} aOnListenInterimResultFunc - Callback fuer Result Ergebnis
     */

    set onListenInterimResult( aOnListenInterimResultFunc: OnASRListenResultFunc ) {
        let asr = this.firstPlugin() as ASRInterface;
        while ( asr ) {
            asr.onListenInterimResult = aOnListenInterimResultFunc;
            asr = this.nextPlugin() as ASRInterface;
        }
    }


    /**
     * Start-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenStartFunc - Callback-Funktion fuer Startereignis
     */

    set onListenNoMatch( aOnListenNoMatchFunc: OnASRListenNoMatchFunc ) {
        let asr = this.firstPlugin() as ASRInterface;
        while ( asr ) {
            asr.onListenNoMatch = aOnListenNoMatchFunc;
            asr = this.nextPlugin() as ASRInterface;
        }
    }


    /**
     * Recognition Start-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenRecognitionStartFunc - Callback-Funktion fuer Recognition Startereignis
     */

    set onListenRecognitionStart( aOnListenRecognitionStartFunc: OnASRListenStartFunc ) {
        let asr = this.firstPlugin() as ASRInterface;
        while ( asr ) {
            asr.onListenRecognitionStart = aOnListenRecognitionStartFunc;
            asr = this.nextPlugin() as ASRInterface;
        }
    }


    /**
     * Recognition Stop-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStopFunc} aOnListenRecognitionStopFunc - Callback-Funktion fuer Recognition Stopereignis
     */

    set onListenRecognitionStop( aOnListenRecognitionStopFunc: OnASRListenStopFunc ) {
        let asr = this.firstPlugin() as ASRInterface;
        while ( asr ) {
            asr.onListenRecognitionStop = aOnListenRecognitionStopFunc;
            asr = this.nextPlugin() as ASRInterface;
        }
    }


    /**
     * Audio Start-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenAudioStartFunc - Callback-Funktion fuer Audio Startereignis
     */

    set onListenAudioStart( aOnListenAudioStartFunc: OnASRListenStartFunc ) {
        let asr = this.firstPlugin() as ASRInterface;
        while ( asr ) {
            asr.onListenAudioStart = aOnListenAudioStartFunc;
            asr = this.nextPlugin() as ASRInterface;
        }
    }


    /**
     * Audio Stop-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStopFunc} aOnListenAudioStopFunc - Callback-Funktion fuer Audio Stopereignis
     */

    set onListenAudioStop( aOnListenAudioStopFunc: OnASRListenStopFunc ) {
        let asr = this.firstPlugin() as ASRInterface;
        while ( asr ) {
            asr.onListenAudioStop = aOnListenAudioStopFunc;
            asr = this.nextPlugin() as ASRInterface;
        }
    }


    /**
     * Sound Start-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenSoundStartFunc - Callback-Funktion fuer Sound Startereignis
     */

    set onListenSoundStart( aOnListenSoundStartFunc: OnASRListenStartFunc ) {
        let asr = this.firstPlugin() as ASRInterface;
        while ( asr ) {
            asr.onListenSoundStart = aOnListenSoundStartFunc;
            asr = this.nextPlugin() as ASRInterface;
        }
    }


    /**
     * Sound Stop-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStopFunc} aOnListenSoundStopFunc - Callback-Funktion fuer Sound Stopereignis
     */

    set onListenSoundStop( aOnListenSoundStopFunc: OnASRListenStopFunc ) {
        let asr = this.firstPlugin() as ASRInterface;
        while ( asr ) {
            asr.onListenSoundStop = aOnListenSoundStopFunc;
            asr = this.nextPlugin() as ASRInterface;
        }
    }

    /**
     * Speech Start-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenSpeechStartFunc - Callback-Funktion fuer Speech Startereignis
     */

    set onListenSpeechStart( aOnListenSpeechStartFunc: OnASRListenStartFunc ) {
        let asr = this.firstPlugin() as ASRInterface;
        while ( asr ) {
            asr.onListenSpeechStart = aOnListenSpeechStartFunc;
            asr = this.nextPlugin() as ASRInterface;
        }
    }


    /**
     * Speech Stop-Ereignis Funktion eintragen
     *
     * @param {OnASRListenStopFunc} aOnListenSpeechStopFunc - Callback-Funktion fuer Speech Stopereignis
     */

    set onListenSpeechStop( aOnListenSpeechStopFunc: OnASRListenStopFunc ) {
        let asr = this.firstPlugin() as ASRInterface;
        while ( asr ) {
            asr.onListenSpeechStop = aOnListenSpeechStopFunc;
            asr = this.nextPlugin() as ASRInterface;
        }
    }


    /**
     * Fehler-Ereignis Funktion eintragen
     *
     * @param {OnSpeechErrorFunc} aOnSpeechErrorFunc - Callback-Funktion fuer Fehler-Ereignis
     */

    set onError( aOnErrorFunc: OnSpeechErrorFunc ) {
        // console.log('ASRGroup.onError: start', aOnErrorFunc);
        this.mOnErrorFunc = aOnErrorFunc;
        // Schleife fuer alle Plugins
        let asr = this.firstPlugin() as ASRInterface;
        // console.log('ASRGroup.onError: first asr = ', asr);
        while ( asr ) {
            asr.onError = aOnErrorFunc;
            asr = this.nextPlugin() as ASRInterface;
            // console.log('ASRGroup.onError: next asr = ', asr);
        }
    }


    // ASR-Funktionen


    /**
     * pruefen auf vorhandene ASR
     * 
     * @return {boolean} True, wenn ASR vorhanden ist, False sonst
     */

    isASR(): boolean {
        if ( this.mCurrentASR ) {
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
        // console.log( 'ASRGroup.setASR:', aASRName );
        let asr = null;
        switch ( aASRName ) {

            case ASR_HTML5_NAME:
                // console.log( 'ASRGroup.setASR: HTML5', this.mASRHtml5);
                asr = this.mASRHtml5;
                break;

            case ASR_NUANCE_NAME:
                // console.log( 'ASRGroup.setASR: Nuance', this.mASRNuance);
                asr = this.mASRNuance;
                break;

            case ASR_GOOGLE_NAME:
                // console.log( 'ASRGroup.setASR: Google', this.mASRGoogle);
                asr = this.mASRGoogle;
                break;

            case ASR_MICROSOFT_NAME:
                // console.log( 'ASRGroup.setASR: Microsoft', this.mASRMicrosoft);
                asr = this.mASRMicrosoft;
                break;
    
            default:
                break;
        }

        // pruefen auf gefundene ASR

        if ( !asr ) {
            this._error( 'setASR', 'Keine ASR vorhanden' );
            return -1;
        }

        // neue ASR eintragen

        this.mCurrentASR = asr;
        return 0;
    }


    /**
     * Rueckgabe des eingestellten ASR-Namens
     *
     * @returns {string} Name der aktuellen ASR
     */

    getASR(): string {
        if ( !this.mCurrentASR ) {
            return '';
        }
        return this.mCurrentASR.getName();
    }


    /**
     * Rueckgabe aller vorhandenen ASR-Namen
     *
     * @return {Array<string>} Liste der ASR-Namen
     */

    getASRList(): Array<string> {
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
        // console.log('ASRGroup.setLanguage', this.getASR(), this.getASRList());
        let result = 0;
        let asr = this.firstPlugin() as ASRInterface;
        // pruefen, ob eine ASR vorhanden ist
        if ( !asr ) {
            this._error( 'setLanguage', 'Keine ASR vorhanden' );
            return -1;
        }
        while ( asr ) {
            // console.log('ASRGroup.setLanguage: ', asr.getASR(), aLanguage);
            if ( asr.setLanguage( aLanguage ) !== 0 ) {
                result = -1;
            }
            asr = this.nextPlugin() as ASRInterface;
        }
        return result;
    }


    /**
     * Gibt die aktuell einstestellte Sprache zurueck
     *
     * @return {string}
     */

    getLanguage(): string {
        // console.log('ASRGroup.getLanguage:', this.mCurrentASR );
        if ( this.mCurrentASR ) {
            return this.mCurrentASR.getLanguage();
        }
        return '';
    }


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string> {
        if ( this.mCurrentASR ) {
            return this.mCurrentASR.getLanguageList();
        }
        return [];
    }


    // Modus-Funktionen


    /**
     * Gibt den aktuell einstestellten Eingabemodus der Spracherkennung zurueck
     *
     * @return {string} Rueckgabe des Eingabemodus
     */

    isMode( aMode: string ): boolean {
        // console.log('ASRGroup.isMode:', this.mCurrentASR, aMode );
        if ( this.mCurrentASR ) {
            return this.mCurrentASR.isMode( aMode );
        }
        return false;
    }


    /**
     * pruefen, ob der Eingabemode Command eingestellt ist
     * Dann kurzen Text nicht laenger als 30 Sekunden von der Spracherkennung zu verarbeiten
     * 
     * @return {boolean} True, wenn Eingabemode Command eingestellt ist
     */

    isCommandMode(): boolean {
        if ( this.mCurrentASR ) {
            return this.mCurrentASR.isCommandMode();
        }
        return false;
    }


    /**
     * pruefen, ob der Eingabemode Dictate eingestellt ist
     * Dann kontinuierlich Text von der Spracherkennung zu verarbeiten
     * 
     * @return {boolean} True, wenn Eingabemode Dictate eingestellt ist
     */

    isDictateMode(): boolean {
        if ( this.mCurrentASR ) {
            return this.mCurrentASR.isDictateMode();
        }
        return false;
    }


    /**
     * Traegt eine neue Eingabemodus fuer die Spracherkennung ein
     *
     * @param {string} aMode - Command oder Dictate
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setMode( aMode: string ): number {
        // console.log('ASRGroup.setMode:', aMode );
        if ( !aMode ) {
            this._error( 'setMode', 'Kein Eingabemodus uebergeben' );
            return -1;
        }
        let result = 0;
        let asr = this.firstPlugin() as ASRInterface;
        // pruefen, ob eine ASR vorhanden ist
        if ( !asr ) {
            this._error( 'setMode', 'Keine ASR vorhanden' );
            return -1;
        }
        while ( asr ) {
            // console.log('ASRGroup.setMode: ', asr.getASR(), aMode, asr.isMode( aMode ));
            if ( asr.isMode( aMode )) {
                // console.log('ASRGroup.setMode: ', asr.getASR(), aMode);
                if ( asr.setMode( aMode ) !== 0 ) {
                    result = -1;
                }
            }
            asr = this.nextPlugin() as ASRInterface;
        }
        return result;
    }


    /**
     * Gibt den aktuell einstestellten Eingabemodus der Spracherkennung zurueck
     *
     * @return {string} Rueckgabe des Eingabemodus
     */

    getMode(): string {
        // console.log('ASRGroup.getMode:', this.mCurrentASR );
        if ( this.mCurrentASR ) {
            return this.mCurrentASR.getMode();
        }
        return '';
    }


    /**
     * Rueckgabe aller vorhandenen Eingabemodi fuer die Spracherkennung
     *
     * @return {Array<string>} Liste der Eingabemodi
     */

    getModeList(): Array<string> {
        if ( this.mCurrentASR ) {
            return this.mCurrentASR.getModeList();
        }
        return [];
    }


    // Listen-Funktionen


    /**
     * Prueft, ob die Spracheingabe gerade laeuft
     *
     * @return {boolean} True, wenn Spracheingabe laeuft, False sonst
     */

    isListenRunning() {
        if ( this.mCurrentASR ) {
            return this.mCurrentASR.isListenRunning();
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
        if ( this.mCurrentASR ) {
            this.mCurrentASR.setListenTimeout( aTimeout );
        }
    }


    /**
     * Spracherkennung starten
     *
     * @return {number} errorcode(0,-1)
     */

    startListen(): number {
        // console.log('ASRGroup.startListen:', this.getASR(), this.getASRList());
        // pruefen auf vorhandene ASR
        if ( !this.mCurrentASR ) {
            this._error( 'startListen', 'keine ASR vorhanden' );
            return -1;
        }
        // pruefen auf aktive Komponente
        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('ASRGroup.startListen: ASR ist nicht aktiv');
            }
            return 0;
        }
        return this.mCurrentASR.startListen();
    }


    /**
     * Rueckgabe der Start-Funktion, um mit anderen Komponenten verbunden zu werden.
     *
     * @return {ASRStartListenFunc} Instanz der Start-Funktion
     */

    getStartListenFunc(): ASRStartListenFunc {
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
                console.log('ASRGroup.stopListen: ASR ist nicht aktiv');
            }
            return 0;
        }
        return this.mCurrentASR.stopListen();
    }


    /**
     * Rueckgabe der Stop-Funktion, um mit anderen Komponenten verbunden zu werden.
     *
     * @return {ASRStopListenFunc} Instanz der Stop-Funktion
     */

    getStopListenFunc(): ASRStopListenFunc {
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
                console.log('ASRGroup.abortListen: ASR ist nicht aktiv');
            }
            return 0;
        }
        return this.mCurrentASR.abortListen();
    }


    /**
     * Rueckgabe der Abort-Funktion, um mit anderen Komponenten verbunden zu werden.
     *
     * @return {ASRStopListenFunc} Instanz der Abort-Funktion
     */

    getAbortListenFunc(): ASRStopListenFunc {
        return () => this.abortListen();
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
                console.log('ASRGroup.abortListen: ASR ist nicht aktiv');
            }
            return 0;
        }
        return this.mCurrentASR.test( aTestCommand, aTestData );
    }


}
