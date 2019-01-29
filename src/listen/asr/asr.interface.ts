/**
 * ASR Schnittstelle
 *
 * Version: 1.2
 * Datum:   27.01.2019
 *
 * Letzte Aenderung: 02.12.2018
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


/**
 * ASRInterface Interface
 */

export interface ASRInterface extends PluginInterface {

    // Listen-Events

    onListenStart: OnASRListenStartFunc;
    onListenStop: OnASRListenStopFunc;
    onListenResult: OnASRListenResultFunc;


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


    // Listen-Funktionen


    isListenRunning(): boolean;


    /**
     * Timout in Millisekunden setzen. Der Timeout begrenzt die Zeit,
     * die auf Listen gewartet wird, wenn listen nicht starten kann.
     *
     * @param {number} aTimeout
     */

    setListenTimeout( aTimeout: number): void;

    startListen(): number;
    stopListen(): number;
    abortListen(): number;

    // Binding-Funktionen


    getStartListenFunc(): ASRStartListenFunc;
    getStopListenFunc(): ASRStopListenFunc;
}
