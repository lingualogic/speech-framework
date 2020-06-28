/** @packageDocumentation
 * ActionOption Schnittstelle
 *
 * API-Version: 1.1
 * Datum:       01.06.2020
 *
 * Letzte Aenderung: 21.06.2020
 * Status: gelb
 *
 * @module action
 * @author SB
 */


// base

/****
 * import { BaseOptionInterface } from './../base/base-option.interface';
 ****/

import { BaseOptionInterface } from '@speech/base';


/** @export
 * ActionOption Schnittstelle fuer optionale Konfigurationsparameter von Action bei der Initialisierung
 */

export interface ActionOptionInterface extends BaseOptionInterface {
    // wegen Typescript-Compilerfehler
    dummy?: string;
}

