/** @packageDocumentation
 *  ASRPlugin definiert die Basisklasse aller ASRs
 *
 * Letzte Aenderung: 15.06.2020
 * Status: gruen
 *
 * @module listen/asr
 * @author SB
 */


// core

import { Plugin } from '@speech/core';


// asr

import {
    ASR_TYPE_NAME,
    ASR_PLUGIN_NAME,
    ASR_TIMEOUT_TIME,
    ASR_DE_LANGUAGE,
    ASR_EN_LANGUAGE,
    ASR_DEFAULT_LANGUAGE,
    ASR_COMMAND_MODE,
    ASR_DICTATE_MODE,
    ASR_DEFAULT_MODE
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


/**
 * Diese Klasse ist die Basisklasse aller ASRs
 */

export class ASRPlugin extends Plugin implements ASRInterface {

    /**
     * Flag fuer laufende Spracherkennung
     * @private
     */

    mListenRunningFlag = false;


    /**
     * Sprache fuer die Spracheingabe
     * @private
     */

     mListenLanguage = ASR_DEFAULT_LANGUAGE;


    /**
     * Modus fuer die Spracheingabe
     * @private
     */

    mListenMode = ASR_DEFAULT_MODE;


    /**
     * speichert den StartListen-Timeout. Wenn kein Speech-Event
     * registriert wird, wird nach 30 Sekunden Listen beendet.
     * @private
     */

    mListenTimeoutId = 0;


    /**
     * Timeout-Zeit in Millisekunden, die vergeht, bis der Timeout ausgeloest wird
     * @private
     */

    mListenTimeoutTime = ASR_TIMEOUT_TIME;


    /**
     * markiert erhaltenen ListenResult. Dient dazu, einen NoMatch-Event zu senden, wenn keine Sprache erkannt wurde.
     */

    mListenResultFlag = false;


    // Event-Funktionen


    /**
     * Callback-Funktion fuer ListenStart-Event
     * @private
     */

    mOnListenStartFunc: OnASRListenStartFunc = null;


    /**
     * Callback-Funktion fuer ListenStop-Event
     * @private
     */

    mOnListenStopFunc: OnASRListenStopFunc = null;


    /**
     * Callback-Funktion fuer ListenResult-Event
     * @private
     */

    mOnListenResultFunc: OnASRListenResultFunc = null;


    /**
     * Callback-Funktion fuer ListenInterimResult-Event
     * @private
     */

    mOnListenInterimResultFunc: OnASRListenResultFunc = null;


    /**
     * Callback-Funktion fuer ListenNoMatch-Event
     * @private
     */

    mOnListenNoMatchFunc: OnASRListenNoMatchFunc = null;


    /**
     * Callback-Funktion fuer ListenRecognitionStart-Event
     * @private
     */

    mOnListenRecognitionStartFunc: OnASRListenStartFunc = null;


    /**
     * Callback-Funktion fuer ListenRecognitionStop-Event
     * @private
     */

    mOnListenRecognitionStopFunc: OnASRListenStopFunc = null;


    /**
     * Callback-Funktion fuer ListenAudioStart-Event
     * @private
     */

    mOnListenAudioStartFunc: OnASRListenStartFunc = null;


    /**
     * Callback-Funktion fuer ListenAudioStop-Event
     * @private
     */

    mOnListenAudioStopFunc: OnASRListenStopFunc = null;

    /**
     * Callback-Funktion fuer ListenSoundStart-Event
     * @private
     */

    mOnListenSoundStartFunc: OnASRListenStartFunc = null;


    /**
     * Callback-Funktion fuer ListenSoundStop-Event
     * @private
     */

    mOnListenSoundStopFunc: OnASRListenStopFunc = null;

    /**
     * Callback-Funktion fuer ListenSpeechStart-Event
     * @private
     */

    mOnListenSpeechStartFunc: OnASRListenStartFunc = null;


    /**
     * Callback-Funktion fuer ListenSpeechStop-Event
     * @private
     */

    mOnListenSpeechStopFunc: OnASRListenStopFunc = null;

    /**
     * ASRPlugin erzeugen
     *
     * @param {string} aASRName - Name der ASR-Klasse
     * @param {boolean} aRegisterFlag - bestimmt, ob Instanz beim PluginManager registriert wird
     */

    constructor( aASRName?: string, aRegisterFlag = true ) {
        super( aASRName || ASR_PLUGIN_NAME, aRegisterFlag );
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
        return 'ASRPlugin';
    }


    // Plugin-Funktionen


    /**
     * Initialisierung der Komponente
     *
     * @param {any} [aOption] - optionale Parameter
     * @return {number} errorCode (0,-1)
     */

    init( aOption?: any ): number {
        // console.log('ASRPlugin.init:', aOption);
        // pruefen auf doppelte Initialisierung

        if ( this.isInit()) {
            this._error( 'init', 'init doppelt aufgerufen' );
            return -1;
        }

        // console.log('ASRPlugin.init: erfolgreich');
        if ( super.init( aOption ) !== 0 ) {
            return -1;
        }

        // pruefen auf vorhandenen Recognition-Service

        if ( !this._detectRecognition()) {
            // TODO: Anstelle eines Fehlers wird hier 0 zurueckgegeben,
            //       die Komponente aber auf Active Off gesetzt
            this.setActiveOff();
            return 0;
        }

        // Recognition initialisieren

        if ( this._initRecognition( aOption ) !== 0 ) {
            // TODO: Anstelle eines Fehlers wird hier 0 zurueckgegeben,
            //       die Komponente aber auf Active Off gesetzt
            this.setActiveOff();
            return 0;
        }

        // Initialisierung erfolgreich

        return 0;
    }


    /**
     * Freigabe der Komponente
     *
     * @return {number} Fehlercode 0 oder -1
     */

    done(): number {
        if ( this.isListenRunning()) {
            this.abortListen();
        }
        this._clearRecognitionTimeout();
        this.mListenTimeoutTime = ASR_TIMEOUT_TIME;
        this.mListenRunningFlag = false;
        this.mListenLanguage = ASR_DEFAULT_LANGUAGE;
        this.mListenMode = ASR_DEFAULT_MODE;
        this.mOnListenStartFunc = null;
        this.mOnListenStopFunc = null;
        this.mOnListenResultFunc = null;
        this.mOnListenInterimResultFunc = null;
        this.mOnListenNoMatchFunc = null;
        this.mOnListenRecognitionStartFunc = null;
        this.mOnListenRecognitionStopFunc = null;
        this.mOnListenAudioStartFunc = null;
        this.mOnListenAudioStopFunc = null;
        this.mOnListenSoundStartFunc = null;
        this.mOnListenSoundStopFunc = null;
        this.mOnListenSpeechStartFunc = null;
        this.mOnListenSpeechStopFunc = null;
        return super.done();
    }


    /**
     * pruefen auf aktive Komponente. Komponente ist nur aktiv, wenn Recognition
     * vorhanden ist. Ansonsten ist die Komponente immer deaktiv.
     *
     * @return {boolean} Rueckgabe, ob Kompponente aktiv ist
     */

    isActive(): boolean {
        // pruefen auf vorhandene Recognition
        if ( !this._isRecognition()) {
            return false;
        }
        return super.isActive();
    }


    /**
     * Einschalten der Komponente, wenn Recognition vorhanden ist.
     * Ansonsten ist die Komponente nicht einschaltbar.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActiveOn(): number {
        // pruefen auf vorhandene Recognition
        if ( !this._isRecognition()) {
            return -1;
        }
        return super.setActiveOn();
    }


    // Event-Funktionen


    /**
     * ListenStart Event Funktion aufrufen
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onListenStart(): number {
        // console.log('ASRPlugin._onListenStart');
        try {
            if ( typeof this.mOnListenStartFunc === 'function' ) {
                return this.mOnListenStartFunc();
            }
            return 0;
        } catch (aException) {
            this._exception( '_onListenStart', aException );
            return -1;
        }
    }


    /**
     * ListenStop Event Funktion aufrufen
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onListenStop(): number {
        // console.log('ASRPlugin._onListenStop');
        try {
            if ( typeof this.mOnListenStopFunc === 'function' ) {
                return this.mOnListenStopFunc();
            }
            return 0;
        } catch (aException) {
            this._exception( '_onListenStop', aException );
            return -1;
        }
    }


    /**
     * ListenResult-Ereignis Funktion aufrufen
     *
     * @private
     * @param {any} aResultData - Daten aus der Spracherkennung
     *
     * @return {number} errorCode(0,-1)
     */

    _onListenResult( aResultData: any ): number {
        // console.log('ASRPlugin._onListenResult:', this.getName(), aResultData);
        try {
            if ( typeof this.mOnListenResultFunc === 'function' ) {
                return this.mOnListenResultFunc( aResultData );
            }
            return 0;
        } catch (aException) {
            this._exception( '_onListenResult', aException );
            return -1;
        }
    }


    /**
     * ListenResult-Zwischenereignis Funktion aufrufen
     *
     * @private
     * @param {any} aResultData - Daten aus der Spracherkennung
     *
     * @return {number} errorCode(0,-1)
     */

    _onListenInterimResult( aResultData: any ): number {
        // console.log('ASRPlugin._onListenInterimResult:', this.getName(), aResultData);
        try {
            if ( typeof this.mOnListenInterimResultFunc === 'function' ) {
                return this.mOnListenInterimResultFunc( aResultData );
            }
            return 0;
        } catch (aException) {
            this._exception( '_onListenInterimResult', aException );
            return -1;
        }
    }


    /**
     * ListenNoMatch Event Funktion aufrufen
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onListenNoMatch(): number {
        // console.log('ASRPlugin._onListenNoMatch');
        try {
            if ( typeof this.mOnListenNoMatchFunc === 'function' ) {
                return this.mOnListenNoMatchFunc();
            }
            return 0;
        } catch (aException) {
            this._exception( '_onListenNoMatch', aException );
            return -1;
        }
    }


    /**
     * ListenRecognitionStart Event Funktion aufrufen
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onListenRecognitionStart(): number {
        // console.log('ASRPlugin._onListenRecognitionStart');
        try {
            if ( typeof this.mOnListenRecognitionStartFunc === 'function' ) {
                return this.mOnListenRecognitionStartFunc();
            }
            return 0;
        } catch (aException) {
            this._exception( '_onListenRecognitionStart', aException );
            return -1;
        }
    }


    /**
     * ListenRecognitionStop Event Funktion aufrufen
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onListenRecognitionStop(): number {
        // console.log('ASRPlugin._onListenRecognitionStop');
        try {
            if ( typeof this.mOnListenRecognitionStopFunc === 'function' ) {
                return this.mOnListenRecognitionStopFunc();
            }
            return 0;
        } catch (aException) {
            this._exception( '_onListenRecognitionStop', aException );
            return -1;
        }
    }


    /**
     * ListenAudioStart Event Funktion aufrufen
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onListenAudioStart(): number {
        // console.log('ASRPlugin._onListenAudioStart');
        try {
            if ( typeof this.mOnListenAudioStartFunc === 'function' ) {
                return this.mOnListenAudioStartFunc();
            }
            return 0;
        } catch (aException) {
            this._exception( '_onListenAudioStart', aException );
            return -1;
        }
    }


    /**
     * ListenAudioStop Event Funktion aufrufen
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onListenAudioStop(): number {
        // console.log('ASRPlugin._onListenAudioStop');
        try {
            if ( typeof this.mOnListenAudioStopFunc === 'function' ) {
                return this.mOnListenAudioStopFunc();
            }
            return 0;
        } catch (aException) {
            this._exception( '_onListenAudioStop', aException );
            return -1;
        }
    }


    /**
     * ListenSoundStart Event Funktion aufrufen
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onListenSoundStart(): number {
        // console.log('ASRPlugin._onListenSoundStart');
        try {
            if ( typeof this.mOnListenSoundStartFunc === 'function' ) {
                return this.mOnListenSoundStartFunc();
            }
            return 0;
        } catch (aException) {
            this._exception( '_onListenSoundStart', aException );
            return -1;
        }
    }


    /**
     * ListenSoundStop Event Funktion aufrufen
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onListenSoundStop(): number {
        // console.log('ASRPlugin._onListenStop');
        try {
            if ( typeof this.mOnListenSoundStopFunc === 'function' ) {
                return this.mOnListenSoundStopFunc();
            }
            return 0;
        } catch (aException) {
            this._exception( '_onListenSoundStop', aException );
            return -1;
        }
    }


    /**
     * ListenSpeechStart Event Funktion aufrufen
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onListenSpeechStart(): number {
        // console.log('ASRPlugin._onListenSpeechStart');
        try {
            if ( typeof this.mOnListenSpeechStartFunc === 'function' ) {
                return this.mOnListenSpeechStartFunc();
            }
            return 0;
        } catch (aException) {
            this._exception( '_onListenSpeechStart', aException );
            return -1;
        }
    }


    /**
     * ListenSpeechStop Event Funktion aufrufen
     *
     * @private
     * @return {number} errorCode(0,-1)
     */

    _onListenSpeechStop(): number {
        // console.log('ASRPlugin._onListenSpeechStop');
        try {
            if ( typeof this.mOnListenSpeechStopFunc === 'function' ) {
                return this.mOnListenSpeechStopFunc();
            }
            return 0;
        } catch (aException) {
            this._exception( '_onListenSpeechStop', aException );
            return -1;
        }
    }


    /**
     * Spracheingabe starten Callback-Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenStartFunction - Callback fuer Spracheingabe gestartet
     */

    set onListenStart( aOnListenStartFunction: OnASRListenStartFunc ) {
        this.mOnListenStartFunc = aOnListenStartFunction;
    }


    /**
     * Spracheingabe stoppen Callback-Funktion eintragen
     *
     * @param {OnASRListenStopFunc} aOnListenStopFunction - Callback fuer Spracheingabe gestoppt
     */

    set onListenStop( aOnListenStopFunction: OnASRListenStopFunc ) {
        this.mOnListenStopFunc = aOnListenStopFunction;
    }


    /**
     * Spracheingabe Ergebnisrueckgabe Callback-Funktion eintragen
     *
     * @param {OnASRListenResultFunc} aOnListenResultFunction - Callback fuer Spracheingabe Ergebnis
     */

    set onListenResult( aOnListenResultFunction: OnASRListenResultFunc ) {
        this.mOnListenResultFunc = aOnListenResultFunction;
    }


    /**
     * Spracheingabe Zwischenergebnisrueckgabe Callback-Funktion eintragen
     *
     * @param {OnASRListenResultFunc} aOnListenInterimResultFunction - Callback fuer Spracheingabe Zwischenergebnis
     */

    set onListenInterimResult( aOnListenInterimResultFunction: OnASRListenResultFunc ) {
        this.mOnListenInterimResultFunc = aOnListenInterimResultFunction;
    }


    /**
     * Spracheingabe kein Ergebnis Callback-Funktion eintragen
     *
     * @param {OnASRListenNoMatchFunc} aOnListenNoMatchFunction - Callback fuer Spracheingabe kein Ergebnis
     */

    set onListenNoMatch( aOnListenNoMatchFunction: OnASRListenNoMatchFunc ) {
        this.mOnListenNoMatchFunc = aOnListenNoMatchFunction;
    }


    /**
     * Spracheingabe Rekognition starten Callback-Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenRecognitionStartFunction - Callback fuer Spracheingabe Recognition gestartet
     */

    set onListenRecognitionStart( aOnListenRecognitionStartFunction: OnASRListenStartFunc ) {
        this.mOnListenRecognitionStartFunc = aOnListenRecognitionStartFunction;
    }


    /**
     * Spracheingabe Recognition stoppen Callback-Funktion eintragen
     *
     * @param {OnASRListenStopFunc} aOnListenRecognitionStopFunction - Callback fuer Spracheingabe Recognition gestoppt
     */

    set onListenRecognitionStop( aOnListenRecognitionStopFunction: OnASRListenStopFunc ) {
        this.mOnListenRecognitionStopFunc = aOnListenRecognitionStopFunction;
    }


    /**
     * Spracheingabe Audio starten Callback-Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenAudioStartFunction - Callback fuer Spracheingabe Audio gestartet
     */

    set onListenAudioStart( aOnListenAudioStartFunction: OnASRListenStartFunc ) {
        this.mOnListenAudioStartFunc = aOnListenAudioStartFunction;
    }


    /**
     * Spracheingabe Audio stoppen Callback-Funktion eintragen
     *
     * @param {OnASRListenStopFunc} aOnListenAudioStopFunction - Callback fuer Spracheingabe Audio gestoppt
     */

    set onListenAudioStop( aOnListenAudioStopFunction: OnASRListenStopFunc ) {
        this.mOnListenAudioStopFunc = aOnListenAudioStopFunction;
    }


    /**
     * Spracheingabe Sound starten Callback-Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenSoundStartFunction - Callback fuer Spracheingabe Sound gestartet
     */

    set onListenSoundStart( aOnListenSoundStartFunction: OnASRListenStartFunc ) {
        this.mOnListenSoundStartFunc = aOnListenSoundStartFunction;
    }


    /**
     * Spracheingabe Sound stoppen Callback-Funktion eintragen
     *
     * @param {OnASRListenStopFunc} aOnListenSoundStopFunction - Callback fuer Spracheingabe Sound gestoppt
     */

    set onListenSoundStop( aOnListenSoundStopFunction: OnASRListenStopFunc ) {
        this.mOnListenSoundStopFunc = aOnListenSoundStopFunction;
    }


    /**
     * Spracheingabe Speech starten Callback-Funktion eintragen
     *
     * @param {OnASRListenStartFunc} aOnListenSpeechStartFunction - Callback fuer Spracheingabe Speech gestartet
     */

    set onListenSpeechStart( aOnListenSpeechStartFunction: OnASRListenStartFunc ) {
        this.mOnListenSpeechStartFunc = aOnListenSpeechStartFunction;
    }


    /**
     * Spracheingabe Speech stoppen Callback-Funktion eintragen
     *
     * @param {OnASRListenSpeechStopFunc} aOnListenSpeechStopFunction - Callback fuer Spracheingabe Speech gestoppt
     */

    set onListenSpeechStop( aOnListenSpeechStopFunction: OnASRListenStopFunc ) {
        this.mOnListenSpeechStopFunc = aOnListenSpeechStopFunction;
    }


    // Recognition-Funktionen


    /**
     * Feststellen, ob eine Recognition fuer die ASR vorhanden ist. Hier wird
     * getestet, ob die verwendete Recognition Implementierung vorhanden ist.
     *
     * @protected
     * @return {boolean} true, wenn Recognition Implementierung existiert, false sonst
     */

    _detectRecognition(): boolean {
        return false;
    }


    /**
     * Initialisierung der Recognition
     *
     * @protected
     * @param {*} aOption - optionale Parameter fuer die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _initRecognition( aOption?: any ): number {
        // muss von erbenden Klassen ueberschrieben werden
        return -1;
    }


    /**
     * pruefen auf vorhandene Recognition
     *
     * @returns {boolean} True, wenn Recognition vorhanden ist, False sonst
     */

    _isRecognition(): boolean {
        // muss von erbenden Klassen ueberschrieben werden
        return false;
    }


    /**
     * Timeout fuer Recognition setzen
     *
     * @private
     */

    _setRecognitionTimeout(): void {
        this._clearRecognitionTimeout();
        this.mListenTimeoutId = window.setTimeout(() => this.stopListen(), this.mListenTimeoutTime );
        // console.log('ASRPlugin._setRecognitionTimeout:', this.mListenTimeoutTime, this.mListenTimeoutId );
    }


    /**
     * Timeout fuer Recognition loeschen
     *
     * @private
     */

    _clearRecognitionTimeout(): void {
        // console.log('ASRPlugin._clearRecognitionTimeout: start = ', this.mListenTimeoutId );
        // Timeout loeschen
        if ( this.mListenTimeoutId ) {
            clearTimeout( this.mListenTimeoutId );
            this.mListenTimeoutId = 0;
        }
        // console.log('ASRPlugin._clearRecognitionTimeout: end = ', this.mListenTimeoutId );
    }


    /**
     * Recognition-Start
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */

    _onRecognitionStart(): number {
        // console.log('ASRPlugin._onRecognitionStart');
        return this._onListenRecognitionStart();;
    }


    /**
     * Recognition-End
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */

    _onRecognitionEnd(): number {
        // console.log('ASRPlugin._onRecognitionEnd');
        this._onListenRecognitionStop();
        return this._stopListen();
    }


    /**
     * Recognition-AudioStart
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */

    _onRecognitionAudioStart(): number {
        // console.log('ASRPlugin._onRecognitionAudioStart');
        if ( this.isDictateMode()) {
            this._setRecognitionTimeout();
        }
        return this._onListenAudioStart();
    }


    /**
     * Recognition-AudioEnde
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */

    _onRecognitionAudioEnd(): number {
        // console.log('ASRPlugin._onRecognitionAudioEnd');
        return this._onListenAudioStop();
    }


    /**
     * Recognition-SoundStart
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */

    _onRecognitionSoundStart(): number {
        // console.log('ASRPlugin._onRecognitionSoundStart');
        return this._onListenSoundStart();
    }


    /**
     * Recognition-SoundEnde
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */

    _onRecognitionSoundEnd(): number {
        // console.log('ASRPlugin._onRecognitionSoundEnd');
        return this._onListenSoundStop();
    }


    /**
     * Recognition-SpeechStart
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */

    _onRecognitionSpeechStart(): number {
        // console.log('ASRPlugin._onRecognitionSpeechStart');
        this._clearRecognitionTimeout();
        return this._onListenSpeechStart();
    }


    /**
     * Recognition-SpeechEnde
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */

    _onRecognitionSpeechEnd(): number {
        // console.log('ASRPlugin._onRecognitionSpeechEnd');
        let result = this._onListenSpeechStop();
        // TODO: loest zu frueh ein Stop-Event aus !
        // pruefen auf Command Mode
        /*
        if ( this.isCommandMode()) {
            if ( this._stopListen() !== 0 ) {
                result = -1;
            }
        }
        */
        return result;
    }


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     *
     * @return {any} Rueckgabe eines aufbereiteten Ergebnisses
     */

    _getRecognitionResult( aEvent: any ): any {
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        // muss von erbenden Klassen ueberschrieben werden
        return aEvent;
    }


    /**
     * prueft, ob es sich um das finale Result handelt
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     *
     * @return {boolean} Rueckgabe von True, wenn Result final ist, False ansonsten
     */

    _isRecognitionFinalResult( aEvent: any ): boolean {
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        // muss von erbenden Klassen ueberschrieben werden
        return true;
    }


    /**
     * Recognition-Ergebnis
     *
     * @private
     * @param {any} aEvent
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _onRecognitionResult( aEvent: any ): number {
        // console.log('ASRPlugin._onRecognitionResult:', aEvent);
        let result = 0;
        try {
            this.mListenResultFlag = true;
            // console.log('ASRPlugin._onRecognitionResult:', this._isRecognitionFinalResult( aEvent ));
            if ( this._isRecognitionFinalResult( aEvent )) {
                // Endergebnisse liefern
                result = this._onListenResult( this._getRecognitionResult( aEvent ));
                // neuen Timeout setzen, wenn Diktiermodus
                if ( this.isDictateMode()) {
                    this._setRecognitionTimeout();
                }
            } else {
                // Zwischenergebnisse liefern
                result = this._onListenInterimResult( this._getRecognitionResult( aEvent ));
                // neuen Timeout loeschen, wenn Diktiermodus
                if ( this.isDictateMode()) {
                    this._clearRecognitionTimeout();
                }
            }
        } catch ( aException ) {
            this._exception( '_onRecognitionResult', aException );
            result = -1;
        }
        // pruefen auf Command Mode
        if ( this.isCommandMode()) {
            if ( this._stopListen() !== 0 ) {
                result = -1;
            }
        }
        return result;
    }


    /**
     * Recognition ohne Ergebnis beendet
     *
     * @private
     * @param {any} aEvent - ErgebnisEvent fuer Spracheingabe
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _onRecognitionNoMatch( aEvent: any ): number {
        // console.log('ASRPlugin._onRecognitionNoMatch', aEvent);
        let result = this._onListenNoMatch();
        // Testen auf Command Mode
        if ( this.isCommandMode()) {
            if ( this._stopListen() !== 0 ) {
                result = -1;
            }
        }
        return result;
    }


    /**
     * Recognition Fehler aufgetreten
     *
     * @private
     * @param {any} aEvent
     * @return {number} errorCode(0,-1)
     */

    _onRecognitionError( aEvent: any ): number {
        // console.log('ASRPlugin._onRecognitionError:', aEvent, aEvent.error, aEvent.message);
        this._clearRecognitionTimeout();
        try {
            // pruefen auf leeren error.message
            let errorEvent = aEvent;
            if ( typeof aEvent.error === 'string' && !aEvent.message ) {
                // Umwandlung der ASR-Fehler in richtige Fehlermeldungen
                switch ( aEvent.error ) {
                    case 'network':
                        errorEvent = new Error( 'ASR-Error: Netzwerk nicht eingeschaltet' );
                        break;
                    case 'no-speech':
                        errorEvent = new Error( 'ASR-Error: Keine Sprache aufgenommen' );
                        break;
                    case 'not-allowed':
                        errorEvent = new Error( 'ASR-Error: Kein Mikrofon vorhanden' );
                        break;
                    default:
                        errorEvent = new Error( 'ASR-Error: ' + aEvent.error );
                        break;
                }
            }
            let result = this._onError( errorEvent );
            if ( this._stopListen() !== 0 ) {
                result = -1;
            }
            return result;
        } catch ( aException ) {
            this._exception( '_onRecognitionError', aException );
            return -1;
        }
    }


    /**
     * statet die Recognition
     *
     * @protected
     * @returns {number}
     */

    _startRecognition(): number {
        // muss von erbenden Klassen ueberschrieben werden
        return -1;
    }


    /**
     * stoppt die Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    _stopRecognition(): number {
        return -1;
    }


    /**
     * bricht die Recognition ab
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    _abortRecognition(): number {
        return -1;
    }


    _isRecognitionRunning(): boolean {
        // muss von erbenden Klassen ueberschrieben werden
        return false;
    }


    // ASR-Funktionen


    /**
     * pruefen auf vorhandene ASR
     * 
     * @return {boolean} True, wenn ASR vorhanden ist, False sonst
     */

    isASR(): boolean {
        return true;
    }


    /**
     * Setzen der aktuellen ASR ueber ihren Namen
     *
     * @param {string} aASRName - Name der ASR
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setASR( aASRName: string ): number {
        return 0;
    }


    /**
     * Rueckgabe des eingestellten ASR-Namens
     *
     * @returns {string} Name der aktuellen ASR
     */

    getASR(): string {
        return this.getName();
    }


    /**
     * Rueckgabe aller vorhandenen ASR-Namen
     *
     * @return {Array<string>} Liste der ASR-Namen
     */

    getASRList(): Array<string> {
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
                this.mListenLanguage = ASR_DE_LANGUAGE;
                break;

            case 'en':
                this.mListenLanguage = ASR_EN_LANGUAGE;
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
     * @return {string} Rueckgabe des Sprachcodes (de, en)
     */

    getLanguage(): string {
        let language = '';
        switch ( this.mListenLanguage ) {
            case ASR_DE_LANGUAGE:
                language = 'de';
                break;

            case ASR_EN_LANGUAGE:
                language = 'en';
                break;

            default:
                // TODO: Eventuell muss hier language='' wegen Rollup-Problem hin
                language = '';
                break;
        }
        // console.log('ASRPlugin.getLanguage:', language);
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
     * gibt den in der ASR verwendeten Sprachcode zurueck
     *
     * @protected
     * @returns {string} Sprachcode der ASR (de-DE, en-US)
     */

    _getASRLanguage(): string {
        return this.mListenLanguage;
    }


    // Modus-Funktionen


    /**
     * pruefen auf vorhandenen Eingabemode
     *
     * @param {string} aMode - Command oder Dictate
     * 
     * @return {boolean} True, wenn ASR vorhanden ist, False sonst
     */

    isMode( aMode: string ): boolean {
        if ( aMode === ASR_COMMAND_MODE ) {
            return true;
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
        if ( this.mListenMode === ASR_COMMAND_MODE ) {
            return true;
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
        if ( this.mListenMode === ASR_DICTATE_MODE ) {
            return true;
        }
        return false;
    }


    /**
     * Traegt einen neuen Eingabemodus fuer die Spracherkennung ein
     *
     * @param {string} aMode - Command oder Dictate
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setMode( aMode: string ): number {
        // console.log('ASRPlugin.setMode:', aMode, this.mListenMode, this.isMode( aMode ))
        if ( this.isMode( aMode )) {
            this.mListenMode = aMode;
            return 0;
        }
        this._error( 'setMode', 'kein gueltiger Eingabemodus uebergeben' );
        return -1;
    }


    /**
     * Gibt den aktuell einstestellten Eingabemodus zurueck
     *
     * @return {string} Rueckgabe des Eingabemodus (Commad, Dictate)
     */

    getMode(): string {
        return this.mListenMode;;
    }


    /**
     * Rueckgabe aller vorhandenen Eingabemodi fuer die Spracherkennung
     *
     * @return {Array<string>} Liste der Eingabemodi
     */

    getModeList(): Array<string> {
        // muss von erbenden Klassen ueberschrieben werden
        return [ ASR_COMMAND_MODE ];
    }


    // Listen-Funktionen


    /**
     * pruefen auf gestartete Spracheingabe
     *
     * @return {boolean} true, wenn Sprache gerade aufgenommen wird
     */

    isListenRunning(): boolean {
        // console.log('ASRPlugin.isListenRunning: RunningFlag=', this.mListenRunningFlag, ' RecognitionRunning=', this._isRecognitionRunning());
        return this.mListenRunningFlag && this._isRecognitionRunning();
    }


    /**
     * Timout in Millisekunden setzen. Der Timeout begrenzt die Zeit,
     * die auf Listen gewartet wird, wenn listen nicht starten kann.
     *
     * @param {number} aTimeout
     */

    setListenTimeout( aTimeout: number ): void {
        this.mListenTimeoutTime = aTimeout;
        // console.log('ASRPlugin.setListenTimeout:', this.getASR(), this.mListenTimeoutTime, aTimeout);
    }


    /**
     * Sprache aufnehmen
     *
     * @return {number} errorCode (0,-1)
     */

    startListen(): number {
        // console.log('ASRPlugin.startListen:', this.getName());

        this.mListenResultFlag = false;

        // pruefen auf aktive Komponente

        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('ASRPlugin.startListen: ASR ist nicht aktiv');
            }
            return 0;
        }

        if ( this.isListenRunning()) {
            this._error( 'startListen', 'Spracheingabe laeuft bereits' );
            return -1;
        }

        // ListenTimeout erzeugen

        this._setRecognitionTimeout();

        // Spracheingabe starten

        try {
            if ( this._startRecognition() !== 0 ) {
                return -1;
            }
        } catch ( aException ) {
            this._exception( 'startListen', aException );
            return -1;
        }

        this.mListenRunningFlag = true;
        return this._onListenStart();
    }


    /**
     * Rueckgabe der startListen-Funktion, um die ASR mit anderen Komponenten zu verbinden
     *
     * @returns {ASRStartListenFunc} Rueckgabe der startListen-Funktion
     */

    getStartListenFunc(): ASRStartListenFunc {
        return () => this.startListen();
    }


    /**
     * senden von onStopListen und loeschen des Timeouts
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    _stopListen(): number {
        // console.log('ASRPlugin._stopListen: start');
        // ListenStop senden

        if ( this.isListenRunning()) {
            this.mListenRunningFlag = false;
            // Timeout loeschen
            this._clearRecognitionTimeout();
            // pruefen auf ResultFlag
            if ( !this.mListenResultFlag ) {
                // senden von noMatch-Event, wenn result-Event nicht gesendet wurde
                this._onListenNoMatch();
            }
            if ( this._onListenStop() !== 0 ) {
                return -1;
            }
        }
        // console.log('ASRPlugin._stopListen: end', result);
        return 0;
    }


    /**
     * Spracheingabe beenden
     *
     * @return {number} Fehlercode 0 oder -1
     */

    stopListen(): number {
        // console.log('ASRPlugin._stopAbortListen:', aAbortFlag);

        // pruefen auf aktive Komponente

        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('ASRPlugin.stopListen: ASR ist nicht aktiv');
            }
            return 0;
        }

        // pruefen auf laufende Spracheingabe

        if ( !this.isListenRunning()) {
            // TODO: Sollte eigentlich kein Fehler sein, da StopListen immer aufrufbar sein soll,
            //       auch wenn gerade keine Sprachausgabe laeuft
            // this._error( 'stopListen', 'Spracheingabe nicht gestartet' );
            return 0;
        }

        // Timeout loeschen

        this._clearRecognitionTimeout();

        // Spracheingabe beenden

        let result = 0;
        try {
            result = this._stopRecognition();
        } catch (aException) {
            this._exception( 'stopListen', aException );
            result = -1;
        }

        // ListenStop senden

        if ( this.isListenRunning()) {
            this.mListenRunningFlag = false;
            // pruefen auf ResultFlag
            if ( !this.mListenResultFlag ) {
                // senden von noMatch-Event, wenn result-Event nicht gesendet wurde
                this._onListenNoMatch();
            }
            if ( this._onListenStop() !== 0 ) {
                result = -1;
            }
        }
        return result;
    }


    /**
     * Rueckgabe der stopListen-Funktion, um die ASR mit anderen Komponenten zu verbinden
     *
     * @returns {ASRStopListenFunc} Rueckgabe der stopListen-Funktion
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
        // console.log('ASRPlugin.abortListen');

        // pruefen auf aktive Komponente

        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('ASRPlugin.abortListen: ASR ist nicht aktiv');
            }
            return 0;
        }

        // pruefen auf laufende Spracheingabe

        if ( !this.isListenRunning()) {
            // TODO: Sollte eigentlich kein Fehler sein, da StopListen immer aufrufbar sein soll,
            //       auch wenn gerade keine Sprachausgabe laeuft
            // this._error( 'abortListen', 'Spracheingabe nicht gestartet' );
            return 0;
        }

        // Timeout loeschen

        this._clearRecognitionTimeout();

        // Spracheingabe beenden

        let result = 0;
        try {
            result = this._abortRecognition();
        } catch (aException) {
            this._exception( 'abortListen', aException );
            result = -1;
        }

        // ListenStop senden

        if ( this.isListenRunning()) {
            this.mListenRunningFlag = false;
            // pruefen auf ResultFlag
            if ( !this.mListenResultFlag ) {
                // senden von noMatch-Event, wenn result-Event nicht gesendet wurde
                this._onListenNoMatch();
            }
            if ( this._onListenStop() !== 0 ) {
                result = -1;
            }
        }
        return result;
    }


    /**
     * Rueckgabe der stopListen-Funktion, um die ASR mit anderen Komponenten zu verbinden
     *
     * @returns {ASRStopListenFunc} Rueckgabe der stopListen-Funktion
     */

    getAbortListenFunc(): ASRStopListenFunc {
        return () => this.abortListen();
    }

}


