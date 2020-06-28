/** @packageDocumentation
 * Intent Option Schnittstelle
 *
 * API-Version: 1.0
 * Datum: 11.10.2018
 *
 * Letzte Aenderung: 21.06.2020
 * Status: gelb
 *
 * @module intent
 * @author SB
 */


// base

/****
 * import { BaseOptionInterface } from './../base/base-option.interface';
 ****/

import { BaseOptionInterface } from '@speech/base';


/** @export
 * IntentOption Schnittstelle fuer optionale Konfigurationsparameter von Intent bei der Initialisierung
 */

export interface IntentOptionInterface extends BaseOptionInterface {
    /** setzt die Sprache fuer die Sprachanalyse ( de, en )*/
    intentLanguage?: string;
    /** legt die App-ID fuer die Verbindung zum Server fest */
    nuanceAppId?: string;
    /** legt den App-Key fuer die Verbindung zum Server fest */
    nuanceAppKey?: string;
    /** legt den NLU-TAG fuer die Verbindung zum Server fest */
    nuanceNluTag?: string;

}
