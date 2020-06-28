/** @packageDocumentation
 * AudioHtml5Reader Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       12.12.2018
 *
 * Letzte Aenderung: 12.12.2018
 * Status: rot
 *
 * @module audio/player
 * @author SB
 */


// common

import { FileHtml5ReaderInterface } from './file-html5-reader.interface';


// Audioformat-Konstanten


/** MP3-Format, Dateiendung .mp3 */
export const AUDIO_MP3_FORMAT = 'mp3';
/** WAV-Format, Dateiendung .wav */
export const AUDIO_WAV_FORMAT = 'wav';

export const AUDIO_DEFAULT_FORMAT = AUDIO_MP3_FORMAT;


export interface AudioHtml5ReaderInterface extends FileHtml5ReaderInterface {

    // Audio-Funktionen

    getAudioContext(): AudioContext;

    setAudioFormat( aAudioFormat: string ): number;
    getAudioFormat(): string;

}
