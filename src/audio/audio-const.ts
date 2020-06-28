/** @packageDocumentation
 * Globale Konstanten fuer Audio
 *
 * @module audio
 * @author SB
 */


// Konstanten

export const AUDIOPLAYER_FACTORY_NAME = 'AudioPlayerFactory';
export const AUDIOPLAYER_PLUGIN_NAME = 'AudioPlayer';
export const AUDIOPLAYER_MOCK_NAME = 'AudioPlayerMock';

export const AUDIO_PLUGIN_NAME = 'AudioPlugin';
export const AUDIO_MOCK_NAME = 'AudioMock';

// Audioformat-Konstanten

/** MP3-Format, Dateiendung .mp3 */
export const AUDIO_MP3_FORMAT = 'mp3';
/** WAV-Format, Dateiendung .wav */
export const AUDIO_WAV_FORMAT = 'wav';

export const AUDIO_DEFAULT_FORMAT = AUDIO_MP3_FORMAT;

// Navigation Codec

export const AUDIO_PCM_CODEC = 'audio/L16;rate=16000';
export const AUDIO_DEFAULT_CODEC = AUDIO_PCM_CODEC;

// Audio-Konstanten

export const AUDIO_AUDIOBUFFER_SIZE = 2048;
export const AUDIO_AUDIOSAMPLE_RATE = 16000;

// Minimum-Samplerate fuer Safari

export const AUDIO_MIN_SAMPLERATE = 22500;

