/** @packageDocumentation
 * GoogleOption Schnittstelle
 *
 * API-Version: 1.3
 * Datum:       20.06.2020
 *
 * Letzte Aenderung: 20.06.2020
 * Status: rot
 *
 * @module cloud/google
 * @author SB
 */


/** @export
 * GoogleOption Schnittstelle fuer optionale Konfigurationsparameter von Google bei der Initialisierung
 */

export interface GoogleOptionInterface {
    /** legt den konkreten Port fest, der geladen werden soll, wird hier AmazonMock angegeben, wird der Mock geladen */
    googlePortName?: string;
    /** legt fest, ob Verbindung zum Server aufgebaut wird */
    googleServerFlag?: boolean;
    /** legt die URL fuer die Verbindung zum Server fest */
    googleServerUrl?: string;
    /** legt die URL fuer die Verbindung zum Dialogflow-TokenServer fest */
    dialogflowTokenServerUrl?: string;
    /** legt die Projekt-ID von Dialogflow fest */
    dialogflowProjectId?: string;
    /** legt die Session-ID von Dialogflow fest */
    dialogflowSessionId?: string;
    /** legt den Enviromment-Namen des Dialogflow-Agenten fest */
    dialogflowEnvironmentName?: string;
    /** legt dynamische Konfigurierbarkeit fest */
    googleDynamicCredentialsFlag?: boolean;
    /** legt die App-ID fuer die Verbindung zum Server fest */
    googleAppId?: string;
    /** legt den App-Key fuer die Verbindung zum Server fest */
    googleAppKey?: string;
    /** legt die User-ID fuer die Verbindung zum Server fest */
    googleUserId?: string;
    /** legt den NLU-TAG fuer die Verbindung zum Server fest */
    googleNluTag?: string;
    /** legt den Pfad fuer die nuance.json Datei fest. Muss immer mit / abgeschlossen werden */
    googleConfigPath?: string;
    /** legt den Dateinamen fuer die nuance.json Datei fest */
    googleConfigFile?: string;
    /** legt fest, ob die Config-Datei geladen wird */
    googleConfigLoadFlag?: boolean;
    /** legt die Fehlerausgabe fest */
    errorOutputFlag?: boolean;
}

