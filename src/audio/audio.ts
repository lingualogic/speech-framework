/**
 * Dialog API Wrapper fuer AudioComponent (erst mal AudioPlayer)
 *
 * @module audio
 * @author SB
 */


// factory

import { FactoryManager } from './../core/factory/factory-manager';


// plugin

import { PluginManager } from './../core/plugin/plugin-manager';


// Audio

import { AUDIOPLAYER_FACTORY_NAME, AUDIOPLAYER_PLUGIN_NAME } from './audio-const';
import { AudioInterface } from './audio.interface';
import { AudioPlayerInterface } from './player/audio-player.interface';
import { AudioPlayerFactory } from './player/audio-player-factory';


/** @export
 * Audio Klasse als API-Wrapper fuer die AudioComponent
 */

export class Audio implements AudioInterface {

    // interne Komponenten

    mAudioPlayer: AudioPlayerInterface = null;


    /**
     * Konstruktor fuer ereignisbasierte Initialisierung des Bots
     */

    constructor( aOption?: any ) {
        if ( this._init( aOption ) !== 0 ) {
            throw new Error('Audio nicht initialisiert');
        }
    }


    /**
     * Initialisierung des Bots
     *
     * @private
     * @param {any} aOption - optionale Parameter zur Konfiguration
     *
     * @return {number} errorCode(0,-1)
     */

    _init( aOption?: any ): number {
        if ( this.mAudioPlayer ) {
            return 0;
        }

        try {
            // erzeugen der Bot-Komponente

            const audioPlayerFactory = FactoryManager.get( AUDIOPLAYER_FACTORY_NAME, AudioPlayerFactory );
            this.mAudioPlayer = PluginManager.get( AUDIOPLAYER_PLUGIN_NAME, audioPlayerFactory ) as AudioPlayerInterface;
            if ( !this.mAudioPlayer ) {
                console.log('Audio._init: kein AudioPlayer erzeugt');
                return -1;
            }

            // AudioPlayer initialisieren

            if ( !this.mAudioPlayer.isInit()) {
                if ( this.mAudioPlayer.init( aOption ) !== 0 ) {
                    console.log('Audio._init: AudioPlayer nicht initialisiert');
                    return -1;
                }
            }

            return 0;
        } catch ( aException ) {
            console.log('Audio._init: Exception ', aException.message);
            return -1;
        }
    }


    playFile( aFileName: string ): number {
        return this.mAudioPlayer.playFile( aFileName );
    }


    stop(): number {
        return this.mAudioPlayer.stop();
    }

}
