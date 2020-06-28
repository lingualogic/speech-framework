/** @packageDocumentation
 * Globale Export-Datei fuer Audio
 *
 * Version: 1.0
 * Datum:   01.06.2020
 *
 * Definiert das gesamte Audio-API:
 *
 * @module audio
 * @author SB
 */


// Global API

export { AudioPlayerInterface } from './player/audio-player.interface';
export { AudioPlayerFactory } from './player/audio-player-factory';

export { AUDIO_PLUGIN_NAME, AUDIOPLAYER_MOCK_NAME, AUDIOPLAYER_FACTORY_NAME, AUDIOPLAYER_PLUGIN_NAME, AUDIO_DEFAULT_FORMAT, AUDIO_MP3_FORMAT, AUDIO_WAV_FORMAT } from './audio-const';
export { AudioInterface } from './audio.interface';
export { AudioFactory } from './audio-factory';
