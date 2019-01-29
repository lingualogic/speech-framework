/**
 * BotOption Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       06.09.2018
 *
 * Letzte Aenderung: 06.09.2018
 * Status: gruen
 *
 * @module bot
 * @author SB
 */


// dialog

import { DialogOptionInterface } from './../dialog/dialog-option.interface';


/** @export
 * BotOption Schnittstelle fuer optionale Konfigurationsparameter von Bot bei der Initialisierung
 */

export interface BotOptionInterface extends DialogOptionInterface {
    /** Verzeichnis, in dem die Audiodateien liegen */
    audioFilePath?: string;
    /** Audioformat MP3 oder WAV */
    audioFormat?: string;
    /** globaler Audiokontext wird von HTML5 definiert, und der App uebergeben */
    audioContext?: AudioContext;
    /** True, wenn Audiodateien abgespielt werden sollen */
    audioFlag?: boolean;
}

