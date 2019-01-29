/**
 * NLU Schnittstelle
 *
 * Version: 1.2
 * Datum:   27.01.2019
 *
 * Letzte Aenderung: 27.01.2019
 * Status: rot
 *
 * @module intent/nlu
 * @author SB
 */


// plugin

import { PluginInterface } from '../../core/plugin/plugin.interface';


// Funktionen

export type NLUStartListenFunc = () => number;
export type NLUStopListenFunc = () => number;


// Events

export type OnNLUConnectFunc = () => number;
export type OnNLUDisconnectFunc = () => number;
export type OnNLUListenStartFunc = () => number;
export type OnNLUListenStopFunc = () => number;
export type OnNLUListenResultFunc = (aText: string) => number;
export type OnNLUIntentResultFunc = (aIntent: any) => number;


/**
 *  NLUInterface
 */

export interface NLUInterface extends PluginInterface {

    // Event-Funktionen

    onConnect: OnNLUConnectFunc;
    onDisconnect: OnNLUDisconnectFunc;
    onListenStart: OnNLUListenStartFunc;
    onListenStop: OnNLUListenStopFunc;
    onListenResult: OnNLUListenResultFunc;
    onIntentResult: OnNLUIntentResultFunc;


    // NLU-Funktionen


    /**
     * pruefen auf vorhandene NLU
     * 
     * @return {boolean} True, wenn NLU vorhanden ist, False sonst
     */

    isNLU(): boolean;


    /**
     * Setzen der aktuellen NLU ueber ihren Namen
     *
     * @param {string} aNLUName - Name der NLU
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setNLU( aNLUName: string ): number;


    /**
     * Rueckgabe des eingestellten NLU-Namens
     *
     * @returns {string} Name der aktuellen NLU
     */

    getNLU(): string;


    /**
     * Rueckgabe aller vorhandenen NLU-Namen
     *
     * @return {Array<string>} Liste der NLU-Namen
     */

    getNLUList(): Array<string>;


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


    // Intent-Funktionen


    /**
     * pruefen auf vorhandenen Initent-Dienst
     *
     * @returns {boolean}
     * @memberof ASRPlugin
     */

    isIntent(): boolean;


    startIntent( aText: string ): number;



    // Listen-Funktionen



    /**
     * pruefen auf vorhandene Listen-Dienst
     *
     * @returns {boolean}
     * @memberof ASRPlugin
     */

    isListen(): boolean;


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


    getStartListenFunc(): NLUStartListenFunc;
    getStopListenFunc(): NLUStopListenFunc;
}
