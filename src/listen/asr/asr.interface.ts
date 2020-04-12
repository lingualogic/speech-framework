/**
 * ASR Schnittstelle
 *
 * Version: 1.4
 * Datum:   09.04.2020
 *
 * Letzte Aenderung: 09.04.2020
 * Status: rot
 *
 * @module listen/asr
 * @author SB
 */


// plugin

import { PluginInterface } from '../../core/plugin/plugin.interface';


// Funktionen

export type ASRStartListenFunc = () => number;
export type ASRStopListenFunc = () => number;


// Events

export type OnASRListenStartFunc = () => number;
export type OnASRListenStopFunc = () => number;
export type OnASRListenResultFunc = (aText: string) => number;
export type OnASRListenNoMatchFunc = () => number;

export type OnASRListenAudioStartFunc = () => number;
export type OnASRListenAudioStopFunc = () => number;


/**
 * ASRInterface Interface
 */

export interface ASRInterface extends PluginInterface {

    // Listen-Events

    onListenStart: OnASRListenStartFunc;
    onListenStop: OnASRListenStopFunc;
    onListenResult: OnASRListenResultFunc;
    onListenInterimResult: OnASRListenResultFunc;
    onListenNoMatch: OnASRListenNoMatchFunc;

    onListenRecognitionStart: OnASRListenStartFunc;
    onListenRecognitionStop: OnASRListenStopFunc;

    onListenAudioStart: OnASRListenStartFunc;
    onListenAudioStop: OnASRListenStopFunc;

    onListenSoundStart: OnASRListenStartFunc;
    onListenSoundStop: OnASRListenStopFunc;

    onListenSpeechStart: OnASRListenStartFunc;
    onListenSpeechStop: OnASRListenStopFunc;


    // ASR-Funktionen


    /**
     * pruefen auf vorhandene ASR
     * 
     * @return {boolean} True, wenn ASR vorhanden ist, False sonst
     */

    isASR(): boolean;


    /**
     * Setzen der aktuellen ASR ueber ihren Namen
     *
     * @param {string} aASRName - Name der ASR
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setASR( aASRName: string ): number;


    /**
     * Rueckgabe des eingestellten ASR-Namens
     *
     * @returns {string} Name der aktuellen ASR
     */

    getASR(): string;


    /**
     * Rueckgabe aller vorhandenen ASR-Namen
     *
     * @return {Array<string>} Liste der ASR-Namen
     */

    getASRList(): Array<string>;


    // Language-Funktionen


    /**
     * Aendern der Sprache
     *
     * @param {string} aLanguage - Sprachcode (de, en)
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setLanguage( aLanguage: string ): number;


    /**
     * aktuell eingestellte Sprache zurueckgeben
     *
     * @returns {string} Rueckgabe des Sprachcodes (de, en)
     */

    getLanguage(): string;


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string>;


    // Mode-Funktionen


    /**
     * pruefen, ob der Eingabemode verfuegbar ist.
     * 
     * @param {string} aMode - Modus fuer die Spracheingabe (Command, Dictate)
     *
     * @return {boolean} True, wenn Eingabemode verfuegbar, False sonst
     */

    isMode( aMode: string ): boolean;


    /**
     * pruefen, ob der Eingabemode Command eingestellt ist
     * Dann kurzen Text nicht laenger als 30 Sekunden von der Spracherkennung zu verarbeiten
     * 
     * @return {boolean} True, wenn Eingabemode Command eingestellt ist
     */

    isCommandMode(): boolean;


    /**
     * pruefen, ob der Eingabemode Dictate eingestellt ist
     * Dann kontinuierlich Text von der Spracherkennung zu verarbeiten
     * 
     * @return {boolean} True, wenn Eingabemode Dictate eingestellt ist
     */

    isDictateMode(): boolean;


    /**
     * Aendern des Modus
     *
     * @param {string} aMode - Modus fuer die Spracheingabe (Command, Dictate)
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setMode( aMode: string ): number;


    /**
     * aktuell eingestellten Modus der Spracheingabe zurueckgeben
     *
     * @returns {string} Rueckgabe des Modus fuer die Spracheingabe (Command, Dictate)
     */

    getMode(): string;


    /**
     * Rueckgabe aller vorhandenen Modi fuer die Spracheingabe
     *
     * @return {Array<string>} Liste der Mode-Namen
     */

    getModeList(): Array<string>;
    

    // Listen-Funktionen


    /**
     * pruefen, ob Listen gerade laeuft
     *
     * @return {boolean} True, wenn Listen gestartet ist und laeuft, False sonst
     */

    isListenRunning(): boolean;


    /**
     * Timout in Millisekunden setzen. Der Timeout begrenzt die Zeit,
     * die auf Listen gewartet wird, wenn listen nicht starten kann.
     *
     * @param {number} aTimeout
     */

    setListenTimeout( aTimeout: number): void;

    /**
     * Startet die Spracheingabe
     * 
     * @return {number} Fehlercode 0 oder -1
     */

    startListen(): number;

    /**
     * Beendet die Spracheingabe (sendet ListenResultEvent)
     * 
     * @return {number} Fehlercode 0 oder -1
     */

    stopListen(): number;

    /**
     * Bricht die Spracheingabe ab (kein senden von ListenResultEvent)
     * 
     * @return {number} Fehlercode 0 oder -1
     */

    abortListen(): number;

    // Binding-Funktionen


    getStartListenFunc(): ASRStartListenFunc;
    getStopListenFunc(): ASRStopListenFunc;
    getAbortListenFunc(): ASRStopListenFunc;
}
