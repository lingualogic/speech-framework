/** @packageDocumentation
 * Funktionstypen fuer Intent
 *
 * API-Version: 1.1
 * Datum: 03.12.2018
 *
 * Letzte Aenderung: 03.12.2018
 * Status: rot
 *
 * @module intent
 * @author SB
 */


import { IntentDataInterface } from './intent-data.interface';


// Global API


// Events

export type OnListenResultFunc = (aText: string) => number;
export type OnIntentResultFunc = (aIntentData: IntentDataInterface) => number;

