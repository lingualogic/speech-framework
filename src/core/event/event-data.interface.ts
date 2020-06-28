/** @packageDocumentation
 * Event Rueckgabedaten, die jeder Event zurueckgibt
 *
 * Letzte Aenderung: 26.10.2018
 * Status: gruen
 *
 * @module core/event
 * @author SB
 */


export interface EventDataInterface {
    // Event
    event: string;
    // Eventtyp
    type: string;
    // Quelle, die den Event erzeugt hat
    source: string;
    // Ziel, welches den Event empfaengt
    dest: string;
    // Rueckgabewert des Events (0, -1)
    result: number;
    // beliebige Daten
    data: any;
}
