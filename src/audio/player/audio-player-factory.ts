/**
 * Globale Fabrik zur Erzeugung eines AudioPlayer
 *
 * API-Version: 1.1
 * Datum:       23.07.2018
 *
 * Letzte Aenderung: 11.12.2018
 * Status: gelb
 *
 * @module audio/player
 * @author SB
 */


// plugin

import { PluginFactory } from '../../core/plugin/plugin-factory';


// audio

import { AUDIOPLAYER_FACTORY_NAME, AUDIOPLAYER_PLUGIN_NAME, AUDIOPLAYER_MOCK_NAME } from '../audio-const';
import { AudioPlayerInterface } from './audio-player.interface';
import { AudioPlayer } from './audio-player';


// Global API

export class AudioPlayerFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'AudioPlayerFactory' );
    }


    isMock(): boolean {
        return false;
    }


    getName(): string {
        return AUDIOPLAYER_FACTORY_NAME;
    }


    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): AudioPlayerInterface {
        return new AudioPlayer( AUDIOPLAYER_PLUGIN_NAME, aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen des AudioPlayer
     * zurueckgeben, einschließlich eines AudioPlayer-Mocks.
     *
     * @param {string} aPlayerName - Name der zu erzeugenden AudioPlayer
     * @param {boolean} aRegisterFlag - wenn gesetzt wird das Plugin im PluginManager eingetragen
     *
     * @return {AudioPlayerInterface} audioPlayer wird zurueckgegeben
     */

    create( aPlayerName?: string, aRegisterFlag = true ): AudioPlayerInterface {
        const playerName = aPlayerName || AUDIOPLAYER_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( playerName === AUDIOPLAYER_MOCK_NAME ) {
            // TODO: Einbau des AudioPlayer-Mocks
            // return new AudioPlayerMock();
        }

        // AudioPlayer erzeugen

        try {
            return this._newPlugin( playerName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }
    }

}
