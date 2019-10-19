/**
 *  ASRPlugin definiert die Basisklasse aller ASRs
 *
 * Letzte Aenderung: 21.03.2019
 * Status: rot
 *
 * @module listen/asr
 * @author SB
 */


// plugin

import { Plugin } from '../../core/plugin/plugin';


// asr

import {
    ASR_TYPE_NAME,
    ASR_PLUGIN_NAME,
    ASR_TIMEOUT_TIME,
    ASR_DE_LANGUAGE,
    ASR_EN_LANGUAGE,
    ASR_DEFAULT_LANGUAGE
} from './asr-const';
import {
    ASRInterface,
    ASRStartListenFunc,
    ASRStopListenFunc,
    OnASRListenStartFunc,
    OnASRListenStopFunc,
    OnASRListenResultFunc
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
            this.stopListen();
        }
        this._clearRecognitionTimeout();
        this.mListenTimeoutTime = ASR_TIMEOUT_TIME;
        this.mListenRunningFlag = false;
        this.mListenLanguage = ASR_DEFAULT_LANGUAGE;
        this.mOnListenStartFunc = null;
        this.mOnListenStopFunc = null;
        this.mOnListenResultFunc = null;
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
        this.mListenTimeoutId = window.setTimeout(() => { this.stopListen(); }, this.mListenTimeoutTime );
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
        return 0;
    }


    /**
     * Recognition-End
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */

    _onRecognitionEnd(): number {
        // console.log('ASRPlugin._onRecognitionEnd');
        return this._stopListen();
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
        return 0;
    }


    /**
     * Recognition-Ende
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */

    _onRecognitionSpeechEnd(): number {
        // console.log('ASRPlugin._onRecognitionSpeechEnd');
        return this._stopListen();
    }


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aResult - rohes Ergebnis der Spracherkennung
     *
     * @return {any} Rueckgabe eines aufbereiteten Ergebnisses
     */

    _getRecognitionResult( aResult: any ): any {
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        // muss von erbenden Klassen ueberschrieben werden
        return aResult;
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
            result = this._onListenResult( this._getRecognitionResult( aEvent ));
        } catch ( aException ) {
            this._exception( '_onRecognitionResult', aException );
            result = -1;
        }
        if ( this._stopListen() !== 0 ) {
            result = -1;
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
        return this._stopListen();
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
                        errorEvent = new Error( aEvent.error );
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
        return true;
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
        console.log('ASRPlugin.getLanguage:', language);
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


    // Listen-Funktionen


    /**
     * pruefen auf gestartete Spracheingabe
     *
     * @return {boolean} true, wenn Sprache gerade aufgenommen wird
     */

    isListenRunning(): boolean {
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
        // console.log('ASRPlugin.setListenTimeout:', this.mListenTimeoutTime, aTimeout);
    }


    /**
     * Sprache aufnehmen
     *
     * @return {number} errorCode (0,-1)
     */

    startListen(): number {
        // console.log('ASRPlugin.startListen:', this.getName());

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

        let result = 0;
        try {
            result = this._startRecognition();
            if ( result !== 0 ) {
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
        // ListenStop senden

        let result = 0;
        if ( this.isListenRunning()) {
            // Timeout loeschen
            this._clearRecognitionTimeout();
            this.mListenRunningFlag = false;
            if ( this._onListenStop() !== 0 ) {
                result = -1;
            }
        }
        return result;
    }


    /**
     * Spracheingabe beenden
     *
     * @return {number} Fehlercode 0 oder -1
     */

    stopListen(): number {
        // console.log('ASRPlugin.stopListen');

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
            if ( this._onListenStop() !== 0 ) {
                result = -1;
            }
        }
        return result;
    }

}
