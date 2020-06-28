/** @packageDocumentation
 * Public Dialog Aktion Schnittstelle
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
 * Action Event Schnittstelle fuer das Action-Datentransferobjekt
 */

export interface DialogActionInterface {
    /** definiertes Ereignis */
    event: string;
    /** aktueller Dialogzustand */
    state: string;
    /** definierte Aktion */
    action: string;
    /** Objekttyp fuer die Aktion */
    type: string;
    /** eindeutiger Objektname fuer die Aktion */
    id: string;
}

