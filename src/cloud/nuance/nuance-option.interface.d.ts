/**
 * NuanceOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       26.11.2018
 *
 * Letzte Aenderung: 26.11.2018
 * Status: rot
 *
 * @module cloud/nuance
 * @author SB
 */
/** @export
 * ActionOption Schnittstelle fuer optionale Konfigurationsparameter von Action bei der Initialisierung
 */
export interface NuanceOptionInterface {
    /** legt den konkreten Port fest, der geladen werden soll */
    nuancePortName?: string;
    /** legt die URL fuer die Verbindung zum Server fest */
    nuanceServerUrl?: string;
    /** legt die App-ID fuer die Verbindung zum Server fest */
    nuanceAppId?: string;
    /** legt den App-Key fuer die Verbindung zum Server fest */
    nuanceAppKey?: string;
    /** legt die User-ID fuer die Verbindung zum Server fest */
    nuanceUserId?: string;
    /** legt den NLU-TAG fuer die Verbindung zum Server fest */
    nuanceNluTag?: string;
    /** legt den Pfad fuer die nuance.json Datei fest. Muss immer mit / abgeschlossen werden */
    nuanceConfigPath?: string;
    /** legt den Dateinamen fuer die nuance.json Datei fest */
    nuanceConfigFile?: string;
    /** legt fest, ob die Config-Datei geladen wird */
    nuanceConfigLoadFlag?: boolean;
    /** legt die Fehlerausgabe fest */
    errorOutputFlag?: boolean;
}
