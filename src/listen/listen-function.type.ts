/** @packageDocumentation
 * Funktionstypen fuer Listen
 *
 * API-Version: 1.0
 * Datum: 08.10.2018
 *
 * Letzte Aenderung: 08.10.2018
 * Status: gelb
 *
 * @module listen
 * @author SB
 */


// Global API


// Action-Funktionen

/** Definiert die Start Funktion fuer den Beginn einer Sprachausgabe */
export type ListenStartFunc = () => number;
/** Definiert die Stop Funktion fuer das Ende einer Speachausgabe */
export type ListenStopFunc = () => number;


// Events

export type OnListenStartFunc = () => number;
export type OnListenStopFunc = () => number;
export type OnListenResultFunc = (aText: string) => number;
export type OnListenNoMatchFunc = () => number;

