/**
 * RasaConfigData-Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       09.07.2019
 *
 * Letzte Aenderung: 09.07.2019
 * Status: rot
 *
 * @module cloud/rasa
 * @author SB
 */


/** @export
 * RasaConfigData Schnittstelle fuer Konfigurationsparameter von Rasa
 */

export interface RasaConfigDataInterface {
    /** legt den App Key fuer die Verbindung zum Server fest */
    rasaAppKey: string;
}

