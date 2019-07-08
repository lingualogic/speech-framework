/**
 * TTSGroup definiert die Verwaltungsklasse aller TTS.
 * Hier werden die vorhandenen TTS verwaltet und es kann
 * zwischen ihnen gewechselt werden.
 *
 * Installierte TTS:
 *
 *      TTSHtml5     - Default Web-TTS
 *      TTSAmazon    - Amazon-Service TTS
 *      TTSGoogle    - Google-Service TTS (kann nur mit Speech-Server verwendet werden)
 *      TTSMicrosoft - Microsoft-Service TTS (sollte nur mit Speech-Server verwendet werden)
 *      TTSNuance    - Nuance-Service TTS (deprecated)
 *
 * Letzte Aenderung: 04.07.2019
 * Status: gelb
 *
 * @module speak/tts
 * @author SB
 */


// global

import { OnSpeechInitFunc, OnSpeechErrorFunc } from './../../interface/speech-function.type';


// plugin

import { PluginGroup } from '../../core/plugin/plugin-group';


// tts

import {
    TTS_TYPE_NAME,
    TTS_GROUP_NAME,
    TTS_HTML5_NAME,
    TTS_AMAZON_NAME,
    TTS_GOOGLE_NAME,
    TTS_MICROSOFT_NAME,
    TTS_NUANCE_NAME
} from './tts-const';
import {
    TTSInterface,
    TTSStartSpeakFunc,
    TTSStopSpeakFunc,
    OnTTSSpeakStartFunc,
    OnTTSSpeakStopFunc
} from './tts.interface';
import { TTSFactory } from './tts-factory';


/**
 * Diese Klasse ist die Verwaltungsklasse fuer alle implementierten TTS
 */

export class TTSGroup extends PluginGroup implements TTSInterface {


    /**
     * TTS-Fabrik zur Erzeugung der einzelnen TTS
     * @type {TTSFactory}
     */

    mTTSFactory: TTSFactory = null;


    // alle inneren TTS

    mTTSHtml5: TTSInterface = null;
    mTTSAmazon: TTSInterface = null;
    mTTSGoogle: TTSInterface = null;
    mTTSMicrosoft: TTSInterface = null;
    mTTSNuance: TTSInterface = null;


    // aktuell genutzte TTS

    mCurrentTTS: TTSInterface = null;


    // Event-Funktionen


    /**
     * TTSPlugin erzeugen
     *
     * @param {string} aTTSName - Name der TTS-Klasse
     * @param {boolean} aRegisterFlag - bestimmt, ob Instanz beim PluginManager registriert wird
     */

    constructor( aTTSFactory: TTSFactory, aTTSName?: string, aRegisterFlag = true ) {
        super( aTTSName || TTS_GROUP_NAME, aRegisterFlag );
        this.mTTSFactory = aTTSFactory;
        // eintragen der inneren TTS-Plugins
        this._insertAllTTS();
    }


    /**
     * Typ zurueckgeben
     *
     * @param {string} Name des Typs des Plugins
     */

    getType(): string {
        return TTS_TYPE_NAME;
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'TTSGroup';
    }


    // Plugin-Funktionen


    /**
     * Einfuegen aller verfeugbaren TTS-Plugins
     */

    _insertAllTTS(): void {
        // pruefen auf TTS-Fabrik
        if ( !this.mTTSFactory ) {
            this._error( '_insertAllTTS', 'keine TTS-Fabrik vorhanden' );
            return;
        }
        // eintragen der verfuegbaren TTS-Plugins
        this.insertPlugin( TTS_HTML5_NAME, this.mTTSFactory.create( TTS_HTML5_NAME, false ));
        this.insertPlugin( TTS_NUANCE_NAME, this.mTTSFactory.create( TTS_NUANCE_NAME, false ));
        this.insertPlugin( TTS_AMAZON_NAME, this.mTTSFactory.create( TTS_AMAZON_NAME, false ));
        this.insertPlugin( TTS_GOOGLE_NAME, this.mTTSFactory.create( TTS_GOOGLE_NAME, false ));
        this.insertPlugin( TTS_MICROSOFT_NAME, this.mTTSFactory.create( TTS_MICROSOFT_NAME, false ));
    }


    /**
     * Initialisierung des HTML5-TTS Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    _initTTSHtml5( aOption: any ): void {
        this.mTTSHtml5 = this.findPlugin( TTS_HTML5_NAME ) as TTSInterface;
        if ( this.mTTSHtml5 ) {
            this.mTTSHtml5.init( aOption );
            if ( this.mTTSHtml5.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('TTSGroup._initTTSHtml5: TTS eingefuegt');
                }
                return;
            }
            this.removePlugin( TTS_HTML5_NAME );
            this.mTTSHtml5.done();
            this.mTTSHtml5 = null;
        }
        if ( this.isErrorOutput()) {
            console.log('TTSGroup._initTTSHtml5: TTS nicht eingefuegt');
        }
    }


    /**
     * Initialisierung des AMAZON-TTS Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    _initTTSAmazon( aOption: any ): void {
        this.mTTSAmazon = this.findPlugin( TTS_AMAZON_NAME ) as TTSInterface;
        if ( this.mTTSAmazon ) {
            this.mTTSAmazon.init( aOption );
            if ( this.mTTSAmazon.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('TTSGroup._initTTSAmazon: TTS eingefuegt');
                }
                return;
            }
            this.removePlugin( TTS_AMAZON_NAME );
            this.mTTSAmazon.done();
            this.mTTSAmazon = null;
        }
        if ( this.isErrorOutput()) {
            console.log('TTSGroup._initTTSAmazon: TTS nicht eingefuegt');
        }
    }


    /**
     * Initialisierung des GOOGLE-TTS Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    _initTTSGoogle( aOption: any ): void {
        this.mTTSGoogle = this.findPlugin( TTS_GOOGLE_NAME ) as TTSInterface;
        if ( this.mTTSGoogle ) {
            this.mTTSGoogle.init( aOption );
            if ( this.mTTSGoogle.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('TTSGroup._initTTSGoogle: TTS eingefuegt');
                }
                return;
            }
            this.removePlugin( TTS_GOOGLE_NAME );
            this.mTTSGoogle.done();
            this.mTTSGoogle = null;
        }
        if ( this.isErrorOutput()) {
            console.log('TTSGroup._initTTSGoogle: TTS nicht eingefuegt');
        }
    }


    /**
     * Initialisierung des Microsoft-TTS Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    _initTTSMicrosoft( aOption: any ): void {
        this.mTTSMicrosoft = this.findPlugin( TTS_MICROSOFT_NAME ) as TTSInterface;
        if ( this.mTTSMicrosoft ) {
            this.mTTSMicrosoft.init( aOption );
            if ( this.mTTSMicrosoft.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('TTSMicrosoft._initTTSMicrosoft: TTS eingefuegt');
                }
                return;
            }
            this.removePlugin( TTS_MICROSOFT_NAME );
            this.mTTSMicrosoft.done();
            this.mTTSMicrosoft = null;
        }
        if ( this.isErrorOutput()) {
            console.log('TTSGroup._initTTSMicrosoft: TTS nicht eingefuegt');
        }
    }


    /**
     * Initialisierung des NUANCE-TTS Plugins
     *
     * @param {*} aOption - optionale Parameter
     */

    _initTTSNuance( aOption: any ): void {
        this.mTTSNuance = this.findPlugin( TTS_NUANCE_NAME ) as TTSInterface;
        if ( this.mTTSNuance ) {
            this.mTTSNuance.init( aOption );
            if ( this.mTTSNuance.isActive()) {
                if ( this.isErrorOutput()) {
                    console.log('TTSGroup._initTTSNuance: TTS eingefuegt');
                }
                return;
            }
            this.removePlugin( TTS_NUANCE_NAME );
            this.mTTSNuance.done();
            this.mTTSNuance = null;
        }
        if ( this.isErrorOutput()) {
            console.log('TTSGroup._initTTSNuance: TTS nicht eingefuegt');
        }
    }


    /**
     * Initialisierung von TTSPlugin
     *
     * @param {any} [aOption] - optionale Parameter
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        // console.log('TTSGroup.init:', aOption);
        // pruefen auf doppelte Initialisierung

        if ( this.isInit()) {
            this._error( 'init', 'init doppelt aufgerufen' );
            return -1;
        }

        // Eintragen der inneren TTS

        if ( !this.mTTSFactory ) {
            this._error( 'init', 'keine TTS-Fabrik vorhanden' );
            return -1;
        }

        // pruefen auf Fehleroutput

        const option = aOption || {};
        if ( !this.isErrorOutput()) {
            option.errorOutputFlag = false;
        }

        // TTS eintragen in Reihenfolge ihrer Nutzung

        this._initTTSHtml5( option );   // Default-TTS
        this._initTTSNuance( option );
        this._initTTSAmazon( option );  // dritter wegen Tests
        this._initTTSGoogle( option );  // vierter wegen Tests
        this._initTTSMicrosoft( option );  // fuenfter wegen Tests

        // console.log('TTSGroup.init: erfolgreich');
        if ( super.init( aOption ) !== 0 ) {
            return -1;
        }

        // erste TTS einstellen als Default-TTS

        this.mCurrentTTS = this.firstPlugin() as TTSInterface;
        if ( !this.mCurrentTTS ) {
            // keine TTS verfuegbar !
            if ( this.isErrorOutput()) {
                console.log('TTSGroup.init: keine TTS verfuegbar');
            }
            this.setActiveOff();
        }

        // TTS-Option einstellen

        if ( aOption && aOption.tts ) {
            this.setTTS( aOption.tts );
        }

        return 0;
    }


    /**
     * Freigabe von TTS
     */

    done(): number {
        this.mTTSHtml5 = null;
        this.mTTSAmazon = null;
        this.mTTSGoogle = null;
        this.mTTSMicrosoft = null;
        this.mTTSNuance = null;
        this.mCurrentTTS = null;
        return super.done();
    }


    /**
     * pruefen auf aktive Komponente. Komponente ist nur aktiv, wenn eine TTS
     * vorhanden ist. Ansonsten ist die Komponente immer deaktiv.
     *
     * @return {boolean} Rueckgabe, ob Kompponente aktiv ist
     */

    isActive(): boolean {
        // pruefen auf vorhandene TTS
        if ( !this.mCurrentTTS ) {
            return false;
        }
        if ( !this.mCurrentTTS.isActive()) {
            return false;
        }
        return super.isActive();
    }


    /**
     * Einschalten der Komponente, wenn TTS vorhanden ist.
     * Ansonsten ist die Komponente nicht einschaltbar.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActiveOn(): number {
        // pruefen auf vorhandene TTS
        if ( !this.mCurrentTTS ) {
            return -1;
        }
        if ( !this.mCurrentTTS.isActive()) {
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
        // console.log('TTSGroup.onInit:', aOnInitFunc );
        let tts = this.firstPlugin() as TTSInterface;
        // console.log('TTSGroup.onInit: tts = ', tts);
        while ( tts ) {
            // console.log('TTSGroup.onInit:', tts.getName());
            tts.onInit = aOnInitFunc;
            tts = this.nextPlugin() as TTSInterface;
        }
    }


    /**
     * Start-Ereignis Funktion eintragen
     *
     * @param {OnTTSSpeakStartFunc} aOnSpeakStartFunc - Callback-Funktion fuer Startereignis
     */

    set onSpeakStart( aOnSpeakStartFunc: OnTTSSpeakStartFunc ) {
        let tts = this.firstPlugin() as TTSInterface;
        while ( tts ) {
            tts.onSpeakStart = aOnSpeakStartFunc;
            tts = this.nextPlugin() as TTSInterface;
        }
    }


    /**
     * Stop-Ereignis Funktion eintragen
     *
     * @param {OnTTSSpeakStopFunc} aOnSpeakStopFunc - Callback-Funktion fuer Stopereignis
     */

    set onSpeakStop( aOnSpeakStopFunc: OnTTSSpeakStopFunc ) {
        let tts = this.firstPlugin() as TTSInterface;
        while ( tts ) {
            tts.onSpeakStop = aOnSpeakStopFunc;
            tts = this.nextPlugin() as TTSInterface;
        }
    }


    /**
     * Fehler-Ereignis Funktion eintragen
     *
     * @param {OnSpeechErrorFunc} aOnSpeechErrorFunc - Callback-Funktion fuer Fehler-Ereignis
     */

    set onError( aOnErrorFunc: OnSpeechErrorFunc ) {
        // console.log('TTSGroup.onError: start', aOnErrorFunc);
        this.mOnErrorFunc = aOnErrorFunc;
        // Schleife fuer alle Plugins
        let tts = this.firstPlugin() as TTSInterface;
        // console.log('TTSGroup.onError: first tts = ', tts);
        while ( tts ) {
            tts.onError = aOnErrorFunc;
            tts = this.nextPlugin() as TTSInterface;
            // console.log('TTSGroup.onError: next tts = ', tts);
        }
    }


    // TTS-Funktionen


    /**
     * pruefen auf vorhandene TTS
     * 
     * @return {boolean} True, wenn TTS vorhanden ist, False sonst
     */

    isTTS(): boolean {
        if ( this.mCurrentTTS ) {
            return true;
        }
        return false;
    }


    /**
     * Setzen der aktuellen TTS ueber ihren Namen
     *
     * @param {string} aTTSName - Name der TTS
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setTTS( aTTSName: string ): number {
        // console.log( 'TTSGroup.setTTS:', aTTSName );
        let tts = null;
        switch ( aTTSName ) {

            case TTS_HTML5_NAME:
                tts = this.mTTSHtml5;
                break;

            case TTS_AMAZON_NAME:
                tts = this.mTTSAmazon;
                break;

            case TTS_GOOGLE_NAME:
                tts = this.mTTSGoogle;
                break;

            case TTS_MICROSOFT_NAME:
                tts = this.mTTSMicrosoft;
                break;
                    
            case TTS_NUANCE_NAME:
                tts = this.mTTSNuance;
                break;

            default:
                break;
        }

        // pruefen auf gefundene TTS

        if ( !tts ) {
            this._error( 'setTTS', 'Keine TTS vorhanden' );
            return -1;
        }

        // neue TTS eintragen

        this.mCurrentTTS = tts;
        return 0;
    }


    /**
     * Rueckgabe des eingestellten TTS-Namens
     *
     * @returns {string} Name der aktuellen TTS
     */

    getTTS(): string {
        if ( !this.mCurrentTTS ) {
            return '';
        }
        return this.mCurrentTTS.getName();
    }


    /**
     * Rueckgabe aller vorhandenen TTS-Namen
     *
     * @return {Array<string>} Liste der TTS-Namen
     */

    getTTSList(): Array<string> {
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
        // console.log('TTSGroup.setLanguage', this.getTTS(), this.getTTSList());
        let result = 0;
        let tts = this.firstPlugin() as TTSInterface;
        // pruefen, ob eine TTS vorhanden ist
        if ( !tts ) {
            this._error( 'setLanguage', 'Keine TTS vorhanden' );
            return -1;
        }
        while ( tts ) {
            // console.log('ASRGroup.setLanguage: ', tts.getTTS(), aLanguage);
            if ( tts.setLanguage( aLanguage ) !== 0 ) {
                result = -1;
            }
            tts = this.nextPlugin() as TTSInterface;
        }
        return result;
    }


    /**
     * Gibt die aktuell einstestellte Sprache zurueck
     *
     * @return {string}
     */

    getLanguage(): string {
        if ( this.mCurrentTTS ) {
            return this.mCurrentTTS.getLanguage();
        }
        return '';
    }


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string> {
        if ( this.mCurrentTTS ) {
            return this.mCurrentTTS.getLanguageList();
        }
        return [];
    }


    // Voice-Funktionen


    /**
     * Stimme in aktueller TTS eintragen
     *
     * @param {string} aVoice - Name der Stimme
     * @return {number} Fehlercode 0 oder -1
     */

    setVoice( aVoice: string): number {
        // console.log( 'TTSGroup.setVoice:', aVoice );
        if ( this.mCurrentTTS ) {
            return this.mCurrentTTS.setVoice( aVoice );
        }
        return -1;
    }


    getVoice(): string {
        if ( this.mCurrentTTS ) {
            return this.mCurrentTTS.getVoice();
        }
        return '';
    }


    /**
     * Rueckgabe aller vorhandenen Voice-Namen
     *
     * @return {Array<string>} Liste der Voice-Namen
     */

    getVoiceList(): Array<string> {
        if ( this.mCurrentTTS ) {
            return this.mCurrentTTS.getVoiceList();
        }
        return [];
    }


    // Speak-Funktionen


    /**
     * Prueft, ob die Sprachausgabe gerade laeuft
     *
     * @return {boolean} True, wenn Sprachausgabe laeuft, False sonst
     */

    isSpeakRunning() {
        if ( this.mCurrentTTS ) {
            return this.mCurrentTTS.isSpeakRunning();
        }
        return false;
    }


    /**
     * Text in Sprache umwandeln
     *
     * @param {string} aText
     *
     * @return {number} errorcode(0,-1)
     */

    startSpeak( aText: string ): number {
        // console.log('TTSGroup.startSpeak:', this.getTTS(), this.getTTSList());
        // pruefen auf vorhandene TTS
        if ( !this.mCurrentTTS ) {
            this._error( 'startSpeak', 'keine TTS vorhanden' );
            return -1;
        }
        // pruefen auf aktive Komponente
        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('TTSGroup.startSpeak: TTS ist nicht aktiv');
            }
            return 0;
        }
        return this.mCurrentTTS.startSpeak( aText );
    }


    /**
     * Rueckgabe der Start-Funktion, um mit anderen Komponenten verbunden zu werden.
     *
     * @return {TTSStartSpeakFunc} Instanz der Start-Funktion
     */

    getStartSpeakFunc(): TTSStartSpeakFunc {
        return (aText: string) => this.startSpeak( aText );
    }


    /**
     * Sprachausgabe beenden
     *
     * @return {number} errorcode(0,-1)
     */

    stopSpeak(): number {
        // pruefen auf aktive Komponente
        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('TTSGroup.stopSpeak: TTS ist nicht aktiv');
            }
            return 0;
        }
        return this.mCurrentTTS.stopSpeak();
    }


    /**
     * Rueckgabe der Stop-Funktion, um mit anderen Komponenten verbunden zu werden.
     *
     * @return {TTSStopSpeakFunc} Instanz der Stop-Funktion
     */

    getStopSpeakFunc(): TTSStopSpeakFunc {
        return () => this.stopSpeak();
    }

}
