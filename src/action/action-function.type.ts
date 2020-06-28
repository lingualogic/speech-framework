/** @packageDocumentation
 * Funktionstypen fuer Action
 *
 * API-Version: 1.0
 * Datum:   30.08.2018
 *
 * Letzte Aenderung: 10.09.2018
 * Status: gelb
 *
 * @module action
 * @author SB
 */


// action

import { ActionDataInterface } from './action-data.interface';


// Global API


// Action-Funktionen

/** Definiert die StartAction Funktion fuer eine Aktion */
export type ActionFunc = (aAction: ActionDataInterface) => number;
/** Definiert die StartAction Funktion fuer eine Aktion */
export type ActionStartFunc = (aAction: ActionDataInterface) => number;
/** Definiert die StopAction Funktion fuer eine Aktion */
export type ActionStopFunc = () => number;


// Events

/** Definiert Ereignisfunktion fuer gestartete Aktion */
export type OnActionStartFunc = () => number;
/** Definiert Ereignisfunktion fuer beendete Aktion */
export type OnActionStopFunc = () => number;
