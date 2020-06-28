/** @packageDocumentation
 * Cloud-Nachrichten Interface
 *
 * API-Version: 1.0
 * Datum:       22.05.2019
 *
 * Letzte Aenderung: 22.05.2019
 * Status: rot
 *
 * @module cloud
 * @author SB
 */


export type CloudSendMessageFunc = ( aMessage: CloudMessageInterface ) => number;


export interface CloudMessageInterface {
    sender: string;
    receiver: string;
    event: string;
}

