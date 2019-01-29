/**
 * Listen Option Schnittstelle
 *
 * API-Version: 1.1
 * Datum: 11.10.2018
 *
 * Letzte Aenderung: 11.10.2018
 * Status: gelb
 *
 * @module listen
 * @author SB
 */


// base

import { BaseOptionInterface } from './../base/base-option.interface';


/** @export
 * ListenOption Schnittstelle fuer optionale Konfigurationsparameter von Listen bei der Initialisierung
 */

export interface ListenOptionInterface extends BaseOptionInterface {
    /** setzt die Sprache fuer die Spracheingabe ( de, en )*/
    listenLanguage?: string;
    /** legt die App-ID fuer die Verbindung zum Server fest */
    nuanceAppId?: string;
    /** legt den App-Key fuer die Verbindung zum Server fest */
    nuanceAppKey?: string;
    /** legt den NLU-TAG fuer die Verbindung zum Server fest */
    nuanceNluTag?: string;
}
