/**
 * Listen Interface
 *
 * API-Version: 1.3
 * Datum: 27.01.2019
 *
 * Letzte Aenderung: 27.01.2019
 * Status: gelb
 *
 * @module listen
 * @author SB
 */


// base

import { BaseInterface } from './../base/base.interface';


// listen

import { OnListenResultFunc } from './listen-function.type';


// Global API


/** @export
 * Listen Schnittstelle
 */

export interface ListenInterface extends BaseInterface {


    // Event-Funktionen


    /**
     * Eintragen eines Spracheingabe-Ergebnis Events. Hier wird der Ergebnistext
     * der Spracheingabe zurueckgegeben.
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {OnListenResultFunc} aEventFunc - Ereignis-Behandlungsfunktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addListenResultEvent( aPluginName: string, aEventFunc: OnListenResultFunc ): number;


    /**
     * Enfernen eines Spracheingabe-Ergebnis Events.
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeListenResultEvent( aPluginName: string ): number;


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
     * @param {string} aLanguage - Kurzzeichen fuer Sprache ( de, en )
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setLanguage( aLanguage: string ): number;


    /**
     * aktuell eingestellte Sprache zurueckgeben
     *
     * @returns {string} language - Kurzzeichenstring fuer Sprache ( de, en )
     */

    getLanguage(): string;


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string>;


    // Listen-Funktionen


    /**
     * Sofortiger Abbruch der Spracheingabe ohne Resultate zurueckzugeben
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    abort(): number;

}
