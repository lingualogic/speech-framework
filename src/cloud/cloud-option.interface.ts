/** @packageDocumentation
 * CloudOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       15.12.2018
 *
 * Letzte Aenderung: 15.10.2018
 * Status: gruen
 *
 * @module cloud
 * @author SB
 */


/** @export
 * CloudOption Schnittstelle fuer optionale Konfigurationsparameter aller Cloud-Ports bei der Initialisierung
 */

export interface CloudOptionInterface {
    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
    errorOutputFlag?: boolean;
}

