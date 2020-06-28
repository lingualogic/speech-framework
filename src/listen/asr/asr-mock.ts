/** @packageDocumentation
 * ASRMock definiert eine Mock-Klasse fuer die ASR, um sie in Unit-Tests verwenden zu koennen
 *
 * Letzte Aenderung: 31.03.2020
 * Status: gruen
 *
 * @module listen/asr
 * @author SB
 */


// asr

import { ASR_MOCK_NAME } from './asr-const';
import { ASRPlugin } from './asr-plugin';


/**
 * Diese Klasse ist die Mock-Klasse fuer eine ASR
 */

export class ASRMock extends ASRPlugin {

    // Mock-API

    /**
     * Definiert, ob eine Recognition vorhanden ist oder nicht
     * @public
     */

    recognitionFlag = true;


    /**
     * Definiert das Ergebnis der Recognition
     * @public
     */

    recognitionResult: any = '';


    /**
     * Definiert, was bei _initRecognition zurueckgeben wird, 0 oder -1
     * @public
     */

    initRecognitionResult = 0;


    startRecognitionResult = 0;
    startRecognitionExceptionFlag = false;
    startRecognitionExceptionText = 'TestException startRecognition';

    stopRecognitionResult = 0;
    stopRecognitionExceptionFlag = false;
    stopRecognitionExceptionText = 'TestException stopRecognition';

    abortRecognitionResult = 0;
    abortRecognitionExceptionFlag = false;
    abortRecognitionExceptionText = 'TestException abortRecognition';


    // Recognition-Ereignisfunktionen eintragen


    onStartFunc = () => 0;
    onEndFunc = () => 0;
    onRecognitionStartFunc = () => 0;
    onRecognitionEndFunc = () => 0;
    onAudioStartFunc = () => 0;
    onAudioEndFunc = () => 0;
    onSoundStartFunc = () => 0;
    onSoundEndFunc = () => 0;
    onSpeechStartFunc = () => 0;
    onSpeechEndFunc = () => 0;
    onResultFunc = () => '';
    onInterimResultFunc = () => '';
    onNoMatchFunc = () => 0;
    onErrorFunc = () => 0;


    /**
     * ASRMock erzeugen
     *
     * @param {string} aASRName - Name der ASR-Klasse
     * @param {boolean} aRegisterFlag - bestimmt, ob Instanz beim PluginManager registriert wird
     */

    constructor( aASRName?: string, aRegisterFlag = true ) {
        super( aASRName || ASR_MOCK_NAME, aRegisterFlag );
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'ASRMock';
    }


    // Mock-API


    /**
     * pruefen auf Mock-Plugin zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Plugin ein Mock zum Testen ist
     */

    isMock(): boolean {
        return true;
    }


    // Plugin-Funktionen


    /**
     * Freigabe der Komponente
     *
     * @return {number} Fehlercode 0 oder -1
     */

    done(): number {
        this.recognitionFlag = true;
        this.recognitionResult = null;
        this.initRecognitionResult = 0;
        this.startRecognitionResult = 0;
        this.stopRecognitionResult = 0;
        this.abortRecognitionResult = 0;
        this.startRecognitionExceptionFlag = false;
        this.stopRecognitionExceptionFlag = false;
        this.abortRecognitionExceptionFlag = false;
        this.startRecognitionExceptionText = 'TestException startRecognition';
        this.stopRecognitionExceptionText = 'TestException stopRecognition';
        this.abortRecognitionExceptionText = 'TestException abortRecognition';
        this.onStartFunc = () => 0;
        this.onEndFunc = () => 0;
        this.onRecognitionStartFunc = () => 0;
        this.onRecognitionEndFunc = () => 0;
        this.onAudioStartFunc = () => 0;
        this.onAudioEndFunc = () => 0;
        this.onSoundStartFunc = () => 0;
        this.onSoundEndFunc = () => 0;
        this.onSpeechStartFunc = () => 0;
        this.onSpeechEndFunc = () => 0;
        this.onResultFunc = () => '';
        this.onInterimResultFunc = () => '';
        this.onNoMatchFunc = () => 0;
        this.onErrorFunc = () => 0;
        return super.done();
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
        return this.recognitionFlag;
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
        return this.initRecognitionResult;
    }


    /**
     * pruefen auf vorhandene Recognition
     *
     * @returns {boolean}
     * @memberof ASRPlugin
     */

    _isRecognition(): boolean {
        // muss von erbenden Klassen ueberschrieben werden
        return this.recognitionFlag;
    }


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     */

    _getRecognitionResult( aEvent: any ): any {
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        // muss von erbenden Klassen ueberschrieben werden
        return this.recognitionResult;
    }

    /**
     * statet die Recognition
     *
     * @protected
     * @returns {number}
     */

    _startRecognition(): number {
        if ( this.startRecognitionExceptionFlag ) {
            throw new Error( this.startRecognitionExceptionText );
        }
        this.onStartFunc();
        this.onRecognitionStartFunc();
        this.onAudioStartFunc();
        this.onSpeechStartFunc();
        this.onInterimResultFunc();
        this.onResultFunc();
        this.onNoMatchFunc();
        this.onSpeechEndFunc();
        this.onAudioEndFunc();
        this.onRecognitionEndFunc();
        this.onErrorFunc();
        this.onEndFunc();
        return this.startRecognitionResult;
    }


    /**
     * stoppt die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _stopRecognition(): number {
        if ( this.stopRecognitionExceptionFlag ) {
            throw new Error( this.stopRecognitionExceptionText );
        }
        this.onSpeechEndFunc();
        this.onAudioEndFunc();
        this.onRecognitionEndFunc();
        this.onErrorFunc();
        this.onEndFunc();
        return this.stopRecognitionResult;
    }


    /**
     * bricht die Recognition ab
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _abortRecognition(): number {
        if ( this.abortRecognitionExceptionFlag ) {
            throw new Error( this.abortRecognitionExceptionText );
        }
        this.onEndFunc();
        this.onErrorFunc();
        return this.abortRecognitionResult;
    }

}
