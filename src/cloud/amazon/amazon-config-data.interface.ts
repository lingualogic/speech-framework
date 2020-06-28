/** @packageDocumentation
 * AmazonConfigData-Schnittstelle
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
 * AmazonConfigData Schnittstelle fuer Konfigurationsparameter von Amazon
 */

export interface AmazonConfigDataInterface {
    /** legt die Region fuer die Verbindung zum Server fest */
    amazonRegion: string;
    /** legt die IdentityPoolId fuer die Verbindung zum Server fest */
    amazonIdentityPoolId: string;
}

