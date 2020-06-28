/** @packageDocumentation
 * NLU Schnittstelle
 *
 * Version: 1.2
 * Datum:   27.01.2019
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module intent/nlu
 * @author SB
 */


// core

import { PluginInterface } from '@speech/core';


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


    /**
     * Startet die Textanalyse und gibt einen Intent mit Entities zurueck
     *
     * @param aText - Text, der analysiert werden soll
     */
    startIntent( aText: string ): number;


    // Listen-Funktionen

    // Kommentar: Alle Listenfunktionen werden aus Intent wieder entfernt

    /**
     * pruefen auf vorhandene Listen-Dienst
     *
     * @deprecated
     * @returns {boolean}
     * @memberof ASRPlugin
     */

    isListen(): boolean;


    /**
     * pruefen auf aktuelle Sprachaufnahme
     * 
     * @deprecated
     * 
     * @return {boolean} True, wenn Aufnahme laeuft, false sonst
     */

    isListenRunning(): boolean;


    /**
     * Timout in Millisekunden setzen. Der Timeout begrenzt die Zeit,
     * die auf Listen gewartet wird, wenn listen nicht starten kann.
     *
     * @deprecated
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
