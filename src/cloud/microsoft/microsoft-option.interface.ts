/**
 * MicrosoftOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       17.06.2019
 *
 * Letzte Aenderung: 17.06.2019
 * Status: rot
 *
 * @module cloud/microsoft
 * @author SB
 */


/** @export
 * MicrosoftOption Schnittstelle fuer optionale Konfigurationsparameter von Microsoft bei der Initialisierung
 */

export interface MicrosoftOptionInterface {
    /** legt den konkreten Port fest, der geladen werden soll, wird hier MicrosoftMock angegeben, wird der Mock geladen */
    microsoftPortName?: string;
    /** legt die URL fuer die Verbindung zum Server fest */
    microsoftServerUrl?: string;
    /** legt dynamische Konfigurierbarkeit fest */
    microsoftDynamicCredentialsFlag?: boolean;
    /** legt die Region fuer die Verbindung zum Server fest */
    microsoftRegion?: string;
    /** legt den SubscriptionKey fuer die Verbindung zum Server fest */
    microsoftSubscriptionKey?: string;
    /** legt den LUIS (NLU) Endpunkt fuer die Verbindung zum Server fest */
    microsoftLuisEndpoint?: string;
    /** legt die User-ID fuer die Verbindung zum Server fest */
    microsoftUserId?: string;
    /** legt den NLU-TAG fuer die Verbindung zum Server fest */
    microsoftNluTag?: string;
    /** legt den Pfad fuer die nuance.json Datei fest. Muss immer mit / abgeschlossen werden */
    microsoftConfigPath?: string;
    /** legt den Dateinamen fuer die nuance.json Datei fest */
    microsoftConfigFile?: string;
    /** legt fest, ob die Config-Datei geladen wird */
    microsoftConfigLoadFlag?: boolean;
    /** legt die Fehlerausgabe fest */
    errorOutputFlag?: boolean;
}

