/** @packageDocumentation
 * TTSPlugin definiert die Basisklasse aller TTS
 *
 * Letzte Aenderung: 09.06.2020
 * Status: gelb
 *
 * @module speak/tts
 * @author SB
 */


// plugin

import { Plugin } from '@speech/core';


// tts

import {
    TTS_TYPE_NAME,
    TTS_PLUGIN_NAME,
    TTS_DEFAULT_LANGUAGE,
    TTS_DE_LANGUAGE,
    TTS_EN_LANGUAGE
} from './tts-const';
import {
    TTSInterface,
    TTSStartSpeakFunc,
    TTSStopSpeakFunc,
    OnTTSSpeakStartFunc,
    OnTTSSpeakStopFunc
} from './tts.interface';


/**
 * Diese Klasse ist die Basisklasse aller ASRs
 */

export class TTSPlugin extends Plugin implements TTSInterface {

    /**
     * Flag fuer laufende Sprachausgabe
     * @private
     */
    mSpeakRunningFlag = false;


    /**
     * Sprache fuer die Sprachausgabe
     * @private
     */
    mSpeakLanguage = TTS_DEFAULT_LANGUAGE;


    /**
     * Stimme fuer die Sprachausgabe
     * @private
     */
    mSpeakVoice = '';


    // Event-Funktionen


    /**
     * Callback-Funktion fuer SpeakStart-Event
     * @private
     */
    mOnSpeakStartFunc: OnTTSSpeakStartFunc = null;


    /**
     * Callback-Funktion fuer ListenStop-Event
     * @private
     */
    mOnSpeakStopFunc: OnTTSSpeakStopFunc = null;


    /**
     * TTSPlugin erzeugen
     *
     * @param {string} aTTSName - Name der TTS-Klasse
     * @param {boolean} aRegisterFlag - bestimmt, ob Instanz beim PluginManager registriert wird
     */

    constructor( aTTSName?: string, aRegisterFlag = true ) {
        super( aTTSName || TTS_PLUGIN_NAME, aRegisterFlag );
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
        return 'TTSPlugin';
    }


    // Plugin-Funktionen


    /**
     * Initialisierung von TTSPlugin
     *
     * @param {any} [aOption] - optionale Parameter
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        // console.log('TTSPlugin.init:', aOption);
        // pruefen auf doppelte Initialisierung

        if ( this.isInit()) {
            this._error( 'init', 'init doppelt aufgerufen' );
            return -1;
        }

        // console.log('TTSPlugin.init: erfolgreich');
        if ( super.init( aOption ) !== 0 ) {
            return -1;
        }

        // pruefen auf vorhandene Spracherkennung in HTML5

        if ( !this._detectSynthesis()) {
            // TODO: Anstelle eines Fehlers wird hier 0 zurueckgegeben,
            //       die Komponente aber auf Active Off gesetzt
            this.setActiveOff();
            return 0;
        }

        // Sprachsynthese initialisieren

        if ( this._initSynthesis( aOption ) !== 0 ) {
            this._clearInit();
            return -1;
        }

        // Sprache eintragen

        if ( aOption && aOption.language ) {
            this.setLanguage( aOption.language );
        }

        // Stimme eintragen

        if ( aOption && aOption.voice ) {
            this.setVoice( aOption.voice );
        }

        return 0;
    }


    /**
     * Freigabe von TTS
     */

    done(): number {
        if ( this.isSpeakRunning()) {
            this.stopSpeak();
        }
        this.mSpeakRunningFlag = false;
        this.mSpeakLanguage = TTS_DEFAULT_LANGUAGE;
        this.mSpeakVoice = '';
        this.mOnSpeakStartFunc = null;
        this.mOnSpeakStopFunc = null;
        return super.done();
    }


    /**
     * pruefen auf aktive Komponente. Komponente ist nur aktiv, wenn Synthese
     * vorhanden ist. Ansonsten ist die Komponente immer deaktiv.
     *
     * @return {boolean} Rueckgabe, ob Kompponente aktiv ist
     */

    isActive(): boolean {
        // pruefen auf vorhandene Speech-Synthesis
        if ( !this._isSynthesis()) {
            return false;
        }
        return super.isActive();
    }


    /**
     * Einschalten der Komponente, wenn Speech-Recognition vorhanden ist.
     * Ansonsten ist die Komponente nicht einschaltbar.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActiveOn(): number {
        // pruefen auf vorhandene Speech-Synthesis
        if ( !this._isSynthesis()) {
            return -1;
        }
        return super.setActiveOn();
    }


    // Event-Funktionen


    /**
     * Start-Ereignis fuer die Sprachausgabe
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _onSpeakStart(): number {
        // console.log('TTSPlugin._onSpeakStart:', this.getName());
        if ( typeof this.mOnSpeakStartFunc === 'function' ) {
            try {
                // console.log('TTSPlugin._onSpeakStart: funktion ausfuehren', this.mOnSpeakStartFunc);
                return this.mOnSpeakStartFunc();
            } catch ( aException ) {
                this._exception( '_onSpeakStart', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Stop-Ereignis fuer die Sprachausgabe
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _onSpeakStop(): number {
        // console.log('TTSPlugin._onSpeakStop');
        if ( typeof this.mOnSpeakStopFunc === 'function' ) {
            try {
                // console.log('TTSPlugin._onSpeakStart: funktion ausfuehren', this.mOnSpeakStopFunc);
                return this.mOnSpeakStopFunc();
            } catch ( aException ) {
                this._exception( '_onSpeakStop', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Start-Ereignis Funktion eintragen
     *
     * @param {OnTTSSpeakStartFunc} aOnSpeakStartFunc - Callback-Funktion fuer Startereignis
     */

    set onSpeakStart( aOnSpeakStartFunc: OnTTSSpeakStartFunc ) {
        this.mOnSpeakStartFunc = aOnSpeakStartFunc;
    }


    /**
     * Stop-Ereignis Funktion eintragen
     *
     * @param {OnTTSSpeakStopFunc} aOnSpeakStopFunc - Callback-Funktion fuer Stopereignis
     */

    set onSpeakStop( aOnSpeakStopFunc: OnTTSSpeakStopFunc ) {
        this.mOnSpeakStopFunc = aOnSpeakStopFunc;
    }


    // Synthesis-Funktionen


    /**
     * Feststellen, ob SpeechSynthesis Service vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn SpeechSynthesis existiert, false sonst
     */

    _detectSynthesis(): boolean {
        // muss von erbenden Klassen ueberschrieben werden
        return false;
    }


    /**
     * Initialisierung der Synthese
     *
     * @protected
     * @param {*} aOption - optionale Parameter fuer die Synthese
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _initSynthesis( aOption?: any ): number {
        // muss von erbenden Klassen ueberschrieben werden
        return -1;
    }


    /**
     * pruefen auf vorhandene Synthese
     *
     * @returns {boolean} True, wenn Synthese vorhanden ist, False sonst
     */

    _isSynthesis(): boolean {
        // muss von erbenden Klassen ueberschrieben werden
        return false;
    }


    /**
     * Synthese-Start Event
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    _onSynthesisStart(): number {
        // console.log('TTSPlugin._onSynthesisStart');
        return 0;
    }


    /**
     * Synthese-End Event
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    _onSynthesisEnd(): number {
        // console.log('TTSPlugin._onSynthesisEnd:', this.mSpeakRunningFlag);
        let result = 0;
        if ( this.mSpeakRunningFlag ) {
            this.mSpeakRunningFlag = false;
            result = this._onSpeakStop();
        }
        return result;
    }


    /**
     * Synthese-Fehler Event
     *
     * @private
     * @param {any} aEvent
     * @return {number} errorCode(0,-1)
     */

    _onSynthesisError( aEvent: any ): number {
        // console.log('TTSPlugin._onSynthesisError:', aEvent);
        try {
            // TODO: muss noch in normale Fehlerbehandlung uebertragen werden
            // console.log( 'TTSPlugin.startSpeak: onerror ', aEvent.error );
            let result = this._onError( new Error( aEvent.error ));
            if ( this.isSpeakRunning()) {
                this.mSpeakRunningFlag = false;
                if ( this._onSpeakStop() !== 0 ) {
                    result = -1;
                }
            }
            return result;
        } catch ( aException ) {
            this._exception( '_onSynthesisError', aException );
            return -1;
        }
    }


    /**
     * Erzeugen der Synthese-Objekte
     *
     * @protected
     * @param {string} aText - zu synthethisiernder Text
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _createSynthesis( aText: string ): number {
        // muss von erbenden Klassen ueberschrieben werden
        return -1;
    }


    /**
     * startet die Synthese
     *
     * @protected
     * @returns {number} Fehlercode 0 oder -1
     */

    _startSynthesis( aText: string ): number {
        // muss von erbenden Klassen ueberschrieben werden
        return -1;
    }


    /**
     * stoppt die Synthese
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    _stopSynthesis(): number {
        // muss von erbenden Klassen ueberschrieben werden
        return -1;
    }


    _isSynthesisRunning(): boolean {
        // muss von erbenden Klassen ueberschrieben werden
        return true;
    }


    // TTS-Funktionen


    /**
     * pruefen auf vorhandene TTS
     * 
     * @return {boolean} True, wenn TTS vorhanden ist, False sonst
     */

    isTTS(): boolean {
        return true;
    }


    /**
     * Setzen der aktuellen TTS ueber ihren Namen
     *
     * @param {string} aTTSName - Name der TTS
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setTTS( aTTSName: string ): number {
        return 0;
    }


    /**
     * Rueckgabe des eingestellten TTS-Namens
     *
     * @returns {string} Name der aktuellen TTS
     */

    getTTS(): string {
        return this.getName();
    }


    /**
     * Rueckgabe aller vorhandenen TTS-Namen
     *
     * @return {Array<string>} Liste der TTS-Namen
     */

    getTTSList(): Array<string> {
        return [ this.getName() ];
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
        switch ( aLanguage ) {
            case 'de':
                this.mSpeakLanguage = TTS_DE_LANGUAGE;
                break;

            case 'en':
                this.mSpeakLanguage = TTS_EN_LANGUAGE;
                break;

            default:
                this._error( 'setLanguage', 'keine gueltige Sprache uebergeben' );
                result = -1;
                break;
        }
        return result;
    }


    /**
     * Gibt die aktuell einstestellte Sprache zurueck
     *
     * @return {string}
     */

    getLanguage(): string {
        let language = '';
        switch ( this.mSpeakLanguage ) {
            case TTS_DE_LANGUAGE:
                language = 'de';
                break;

            case TTS_EN_LANGUAGE:
                language = 'en';
                break;

            default:
                // TODO: Eventuell muss hier language='' wegen Rollup-Problem hin
                language = '';
                break;
        }
        return language;
    }


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string> {
        // muss von erbenden Klassen ueberschrieben werden
        return [ 'de', 'en' ];
    }


    /**
     * gibt den in der TTS verwendeten Sprachcode zurueck
     *
     * @protected
     * @returns {string} Sprachcode der ASR (de-DE, en-US)
     */

    _getTTSLanguage(): string {
        return this.mSpeakLanguage;
    }


    // Voice-Funktionen


    setVoice( aVoice: string ): number {
        this.mSpeakVoice = aVoice;
        return 0;
    }


    getVoice(): string {
        return this.mSpeakVoice;
    }


    /**
     * Rueckgabe aller vorhandenen Voice-Namen
     *
     * @return {Array<string>} Liste der Voice-Namen
     */

    getVoiceList(): Array<string> {
        // muss von erbenden Klassen ueberschrieben werden
        return [];
    }


    // Speak-Funktionen


    /**
     * Prueft, ob die Sprachausgabe gerade laeuft
     *
     * @return {boolean} True, wenn Sprachausgabe laeuft, False sonst
     */

    isSpeakRunning() {
        return this.mSpeakRunningFlag && this._isSynthesisRunning();
    }


    /**
     * Text in Sprache umwandeln
     *
     * @param {string} aText
     *
     * @return {number} errorcode(0,-1)
     */

    startSpeak( aText: string ): number {
        // console.log('TTSPlugin.startSpeak:', aText, this.getVoice(), this.getLanguage(), this.getTTS());

        // pruefen auf aktive Komponente

        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('TTSPlugin.startSpeak: TTS ist nicht aktiv');
            }
            return 0;
        }

        // pruefen auf vorhandenen Text

        if ( !aText ) {
            this._error( 'startSpeak', 'kein text uebergeben' );
            return -1;
        }

        // pruefen auf laufende Sprachausgabe

        // console.log('TTSPlugin.startSpeak: speakRunning = ', this.isSpeakRunning(), ' synthesisRunning = ', this._isSynthesisRunning());
        if ( this.isSpeakRunning()) {
            // console.log('TTSPlugin.startSpeak: isSpeakRunning == true');
            this._error( 'startSpeak', 'Sprachausgabe laeuft bereits' );
            return -1;
        }

        // Sprachausgabe starten

        this.mSpeakRunningFlag = true;
        try {
            // erzeugen der Synthese-Objekte

            if ( this._createSynthesis( aText ) !== 0 ) {
                this.mSpeakRunningFlag = false;
                return -1;
            }

            // console.log('TTSPlugin.startSpeak: Sprachausgabe starten', aText);
            if ( this._startSynthesis( aText ) !== 0 ) {
                this.mSpeakRunningFlag = false;
                return -1;
            }
            return this._onSpeakStart();
        } catch ( aException ) {
            // console.log('TTSPlugin.startSpeak: Exception', aException.message);
            this._exception( 'startSpeak', aException );
            this.mSpeakRunningFlag = false;
            return -1;
        }
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
        // console.log('TTSPlugin.stopSpeak:', this.getVoice(), this.getLanguage(), this.getTTS());

        // pruefen auf aktive Komponente

        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('TTSPlugin.stopSpeak: TTS ist nicht aktiv');
            }
            return 0;
        }

        // pruefen auf laufende Sprachausgabe

        if ( !this.isSpeakRunning()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('TTSPlugin.stopSpeak: keine aktive Sprachausgabe');
            }
            return 0;
        }

        // Sprachausgabe beenden

        let result = 0;
        try {
            // console.log('TTSPlugin.stopSpeak: Sprachausgabe beenden');
            result = this._stopSynthesis();
        } catch ( aException ) {
            this._exception( 'stopSpeak', aException );
            result = -1;
        }

        // SpeakStop senden

        if ( this.isSpeakRunning()) {
            this.mSpeakRunningFlag = false;
            if ( this._onSpeakStop() !== 0 ) {
                result = -1;
            }
        }
        return result;

    }


    /**
     * Rueckgabe der Stop-Funktion, um mit anderen Komponenten verbunden zu werden.
     *
     * @return {TTSStoptSpeakFunc} Instanz der Stop-Funktion
     */

    getStopSpeakFunc(): TTSStopSpeakFunc {
        return () => this.stopSpeak();
    }

}
