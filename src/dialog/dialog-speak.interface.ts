/** @packageDocumentation
 * Public Dialog Speak Schnittstelle
 *
 * API-Version: 1.0
 * Datum:   07.09.2018
 *
 * Letzte Aenderung: 07.09.2018
 * Status: gelb
 *
 * @module dialog
 * @author SB
 */


// Global API


/** @export
 * Speak-Event Schnittstelle fuer das Speak-Datentransferobjekt
 */

export interface DialogSpeakInterface {
    /** definiertes Ereignis */
    event: string;
    /** aktueller Dialogzustand */
    state: string;
    /** eindeutiger Audiodateiname fuer die Sprachausgabe */
    id: string;
    /** zu synthetisierender Text fuer die Sprachausgabe */
    text: string;
    /** Zeitdauer, die fuer die Sprachausgabe gewartet wird */
    timeout: number;
}
