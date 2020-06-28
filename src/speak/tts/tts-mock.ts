/** @packageDocumentation
 * TTSMock definiert eine Mock-Klasse fuer die TTS, um sie in Unit-Tests verwenden zu koennen
 *
 * Letzte Aenderung: 09.06.2020
 * Status: gelb
 *
 * @module speak/tts
 * @author SB
 */


// tts

import { TTS_MOCK_NAME } from './tts-const';
import { TTSPlugin } from './tts-plugin';


/**
 * Diese Klasse ist die Basisklasse aller ASRs
 */

export class TTSMock extends TTSPlugin {

    // Mock-API

    /**
     * Definiert, ob eine Synthesis vorhanden ist oder nicht
     * @public
     */

    synthesisFlag = true;


    /**
     * Definiert, was bei _initSynthesis zurueckgeben wird, 0 oder -1
     * @public
     */

    initSynthesisResult = 0;

    startSynthesisResult = 0;
    startSynthesisExceptionFlag = false;
    startSynthesisExceptionText = 'TestException startSynthesis';

    stopSynthesisResult = 0;
    stopSynthesisExceptionFlag = false;
    stopSynthesisExceptionText = 'TestException stopSynthesis';

    // Synthesis-Ereignisfunktionen eintragen

    onStartFunc = () => 0;
    onEndFunc = () => 0;
    onErrorFunc = () => 0;


    /**
     * TTSMock erzeugen
     *
     * @param {string} aTTSName - Name der TTS-Klasse
     * @param {boolean} aRegisterFlag - bestimmt, ob Instanz beim PluginManager registriert wird
     */

    constructor( aTTSName?: string, aRegisterFlag = true ) {
        super( aTTSName || TTS_MOCK_NAME, aRegisterFlag );
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'TTSMock';
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
     * Freigabe von TTS
     */

    done(): number {
        this.synthesisFlag = true;
        this.initSynthesisResult = 0;
        this.startSynthesisResult = 0;
        this.stopSynthesisResult = 0;
        this.startSynthesisExceptionFlag = false;
        this.stopSynthesisExceptionFlag = false;
        this.startSynthesisExceptionText = 'TestException startSynthesis';
        this.stopSynthesisExceptionText = 'TestException stopSynthesis';
        this.onStartFunc = () => 0;
        this.onEndFunc = () => 0;
        this.onErrorFunc = () => 0;
        return super.done();
    }


    // Synthesis-Funktionen


    /**
     * Feststellen, ob SpeechSynthesis Service vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn SpeechSynthesis existiert, false sonst
     */

    _detectSynthesis(): boolean {
        return this.synthesisFlag;
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
        this._onInit();
        return this.initSynthesisResult;
    }


    /**
     * pruefen auf vorhandene Synthese
     *
     * @returns {boolean} True, wenn Synthese vorhanden ist, False sonst
     */

    _isSynthesis(): boolean {
        // muss von erbenden Klassen ueberschrieben werden
        return this.synthesisFlag;
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
        return 0;
    }


    /**
     * startet die Synthese
     *
     * @protected
     * @returns {number} Fehlercode 0 oder -1
     */

    _startSynthesis( aText: string ): number {
        if ( this.startSynthesisExceptionFlag ) {
            throw new Error( this.startSynthesisExceptionText );
        }
        this.onStartFunc();
        this.onErrorFunc();
        this.onEndFunc();
        return this.startSynthesisResult;
    }


    /**
     * stoppt die Synthese
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    _stopSynthesis(): number {
        if ( this.stopSynthesisExceptionFlag ) {
            throw new Error( this.stopSynthesisExceptionText );
        }
        this.onErrorFunc();
        this.onEndFunc();
        return this.stopSynthesisResult;
    }

}
