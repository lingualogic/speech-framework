/**
 * MicrosoftConfigData-Schnittstelle
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
 * MicrosoftConfigData Schnittstelle fuer Konfigurationsparameter von Microsoft
 */

export interface MicrosoftConfigDataInterface {
    /** legt die Region fuer die Verbindung zum Server fest */
    microsoftRegion: string;
    /** legt den SubscriptionKey fuer die Verbindung zum Server fest */
    microsoftSubscriptionKey: string;
}

