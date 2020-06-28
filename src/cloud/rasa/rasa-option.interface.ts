/** @packageDocumentation
 * RasaOption Schnittstelle
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
 * RasaOption Schnittstelle fuer optionale Konfigurationsparameter von Rasa bei der Initialisierung
 */

export interface RasaOptionInterface {
    /** legt den konkreten Port fest, der geladen werden soll, wird hier AmazonMock angegeben, wird der Mock geladen */
    rasaPortName?: string;
    /** legt fest, ob Verbindung zum Server aufgebaut wird */
    rasaServerFlag?: boolean;
    /** legt die URL fuer die Verbindung zum Server fest */
    rasaServerUrl?: string;
    /** legt dynamische Konfigurierbarkeit fest */
    rasaDynamicCredentialsFlag?: boolean;
    /** legt die App-ID fuer die Verbindung zum Server fest */
    rasaAppId?: string;
    /** legt den App-Key fuer die Verbindung zum Server fest */
    rasaAppKey?: string;
    /** legt die User-ID fuer die Verbindung zum Server fest */
    rasaUserId?: string;
    /** legt den NLU-TAG fuer die Verbindung zum Server fest */
    rasaNluTag?: string;
    /** legt den Pfad fuer die nuance.json Datei fest. Muss immer mit / abgeschlossen werden */
    rasaConfigPath?: string;
    /** legt den Dateinamen fuer die nuance.json Datei fest */
    rasaConfigFile?: string;
    /** legt fest, ob die Config-Datei geladen wird */
    rasaConfigLoadFlag?: boolean;
    /** legt die Fehlerausgabe fest */
    errorOutputFlag?: boolean;
}

