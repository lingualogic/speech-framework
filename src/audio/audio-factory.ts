/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer Audio API Instanz.
 *
 * Version: 1.0
 * Datum:   23.08.2018
 *
 * @module audio
 * @author SB
 */


// audio

import { AUDIO_PLUGIN_NAME, AUDIO_MOCK_NAME } from './audio-const';
import { AudioInterface } from './audio.interface';
import { Audio } from './audio';


// Global API


/** @export
 * Statische Klasse zur Erzeugung eines Audio.
 */

export class AudioFactory {


    /**
     * Konstruktor ist privat, es kann keine Instanz der Klasse erzeugt werden
     */

    private constructor() {}


    /**
     * Kann verschiedene Versionen von Bot
     * zurueckgeben, einschließlich eines Bot-Mocks.
     *
     * @param {string} aName - Name des zu erzeugenden Bots
     * @param {BotOptionInterface} aOption - optionale Parameter
     *
     * @return {BotInterface} Bot Instanz wird zurueckgegeben
     */

    static create( aName?: string, aOption?: any ): AudioInterface {
        const name = aName || AUDIO_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( name === AUDIO_MOCK_NAME ) {
            // TODO: Einbau des Audio-Mocks
            // return new AudioMock();
        }

        try {
            return new Audio( aOption );
        } catch ( aException ) {
            console.log('AudioFactory.create: Exception', aException);
            return null;
        }
    }

}
