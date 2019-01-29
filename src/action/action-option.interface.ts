/**
 * ActionOption Schnittstelle
 *
 * API-Version: 1.1
 * Datum:       18.10.2018
 *
 * Letzte Aenderung: 18.10.2018
 * Status: gelb
 *
 * @module action
 * @author SB
 */


// base

import { BaseOptionInterface } from './../base/base-option.interface';


/** @export
 * ActionOption Schnittstelle fuer optionale Konfigurationsparameter von Action bei der Initialisierung
 */

export interface ActionOptionInterface extends BaseOptionInterface {
    // wegen Typescript-Compilerfehler
    dummy?: string;
}

