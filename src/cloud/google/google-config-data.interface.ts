/** @packageDocumentation
 * GoogleConfigData-Schnittstelle
 *
 * API-Version: 1.3
 * Datum:       20.06.2020
 *
 * Letzte Aenderung: 21.06.2020
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
    /** legt die URL fuer den Google Tokenserver fest */
    googleServerUrl: string;
    /** legt die URL fuer den Dialogflow Tokenserver fest */
    dialogflowTokenServerUrl: string;
    /** legt die ProjektID fuer Dialogflow fest */
    dialogflowProjectId: string;
    /** legt die SessionID fuer Dialogflow fest */
    dialogflowSessionId?: string;
    /** legt fest, ob der Dialogflow-Agent aus Draft oder aus EnvironmentName ausgelesen wird */
    dialogflowEnvironmentName?: string;
}

