/**
 * GoogleConfigData-Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       07.05.2019
 *
 * Letzte Aenderung: 07.05.2019
 * Status: rot
 *
 * @module cloud/google
 * @author SB
 */


/** @export
 * GoogleConfigData Schnittstelle fuer Konfigurationsparameter von Google
 */

export interface GoogleConfigDataInterface {
    /** legt den App Key fuer die Verbindung zum Server fest */
    googleAppKey: string;
    /** legt die URL fuer den Dialogflow Tokenserver fest */
    dialogflowTokenServerUrl: string;
    /** legt die   ProjektID fuer Dialogflow fest */
    dialogflowProjectId: string;
}

