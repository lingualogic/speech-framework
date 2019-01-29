/**
 * Public Audio Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       23.08.2018
 *
 * @module audio
 * @author SB
 */


// Global API


/**
 * Bot Schnittstelle
 */

export interface AudioInterface {

    playFile( aFileName: string ): number;
    stop(): number;

}
