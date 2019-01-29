/**
 * Public Intent Data Schnittstelle
 *
 * API-Version: 1.0
 * Datum:   04.12.2018
 *
 * Letzte Aenderung: 04.12.2018
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
    /** Text zum Intent */
    literal: string;
    /** aufgetretene Fehler */
    error: string;
}
