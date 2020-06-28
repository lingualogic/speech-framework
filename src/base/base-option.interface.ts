/** @packageDocumentation
 * BaseOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       11.10.2018
 *
 * Letzte Aenderung: 11.10.2018
 * Status: gruen
 *
 * @module base
 * @author SB
 */


/** @export
 * BaseOption Schnittstelle fuer optionale Konfigurationsparameter einer Komponente bei der Initialisierung
 */

export interface BaseOptionInterface {
    /** definiert den zu verwendenden Builder fuer die Erzeugung der Komponente */
    builderName?: string;
    /** legt fest, ob die Fehlermeldungen zusaetzlich auf der Konsole ausgegeben werden */
    errorOutputFlag?: boolean;
}

