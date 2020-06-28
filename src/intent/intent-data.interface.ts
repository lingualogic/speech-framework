/** @packageDocumentation
 * Public Intent Data Schnittstelle
 *
 * API-Version: 1.1
 * Datum:   28.03.2019
 *
 * Letzte Aenderung: 28.03.2019
 * Status: gelb
 *
 * @module intent
 * @author SB
 */


// Global API


/** @export
 * Intent-Event Schnittstelle fuer das Intent-Datentransferobjekt
 */

export interface IntentDataInterface {
    /** definiert den Intent-Namen */
    intent: string;
    /** definiert die Wahrscheinlichkeit fuer den Intent */
    confidence: number;
    /** defniert moegliche Konzepte */
    conceptList: any;
    /** Text zum Intent */
    literal: string;
    /** Textantwort zum Intent */
    speech: string;
    /** aufgetretene Fehler */
    error: string;
}
