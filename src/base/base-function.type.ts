/** @packageDocumentation
 * Funktionstypen fuer Base
 *
 * API-Version: 1.0
 * Datum: 11.10.2018
 *
 * Letzte Aenderung: 11.10.2018
 * Status: gruen
 *
 * @module base
 * @author SB
 */


// Global API


// Funktionen

/** Definiert die Start Funktion */
export type BaseStartFunc = () => number;
/** Definiert die Stop Funktion */
export type BaseStopFunc = () => number;


// Events

/** Definiert Ereignisfunktion fuer gestartete Komponente */
export type OnBaseStartFunc = () => number;
/** Definiert Ereignisfunktion fuer beendete Komponente */
export type OnBaseStopFunc = () => number;
