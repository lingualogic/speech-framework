/**
 * AmazonOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       01.04.2019
 *
 * Letzte Aenderung: 01.04.2019
 * Status: rot
 *
 * @module cloud/amazon
 * @author SB
 */


/** @export
 * AmazonOption Schnittstelle fuer optionale Konfigurationsparameter von Amazon bei der Initialisierung
 */

export interface AmazonOptionInterface {
    /** legt den konkreten Port fest, der geladen werden soll, wird hier AmazonMock angegeben, wird der Mock geladen */
    amazonPortName?: string;
    /** legt die URL fuer die Verbindung zum Server fest */
    amazonServerUrl?: string;
    /** legt dynamische Konfigurierbarkeit fest */
    amazonDynamicCredentialsFlag?: boolean;
    /** legt die Region fuer die Verbindung zum Server fest */
    amazonRegion?: string;
    /** legt die IdentityPoolId fuer die Verbindung zum Server fest */
    amazonIdentityPoolId?: string;
    /** legt die User-ID fuer die Verbindung zum Server fest */
    amazonUserId?: string;
    /** legt den NLU-TAG fuer die Verbindung zum Server fest */
    amazonNluTag?: string;
    /** legt den Pfad fuer die nuance.json Datei fest. Muss immer mit / abgeschlossen werden */
    amazonConfigPath?: string;
    /** legt den Dateinamen fuer die nuance.json Datei fest */
    amazonConfigFile?: string;
    /** legt fest, ob die Config-Datei geladen wird */
    amazonConfigLoadFlag?: boolean;
    /** legt die Fehlerausgabe fest */
    errorOutputFlag?: boolean;
}

