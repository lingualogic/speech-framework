/**
 * AudioPlayer Schnittstelle
 *
 * API-Version: 1.0
 * Datum:       28.06.2018
 *
 * Letzte Aenderung: 01.10.2018
 * Status: gelb
 *
 * @module audio/player
 * @author SB
 */


// plugin

import { PluginInterface } from '../../core/plugin/plugin.interface';


// Funktionen

export type AudioPlayFunc = (aAudioFilePath: string, aAudioId: string) => number;
export type AudioStopFunc = () => number;


// Events

export type OnAudioStartFunc = () => number;
export type OnAudioStopFunc = () => number;
export type OnAudioUnlockFunc = (aState: string) => number;

export interface AudioPlayerInterface extends PluginInterface {

    // Events

    onAudioStart: OnAudioStartFunc;
    onAudioStop: OnAudioStopFunc;
    onAudioUnlock: OnAudioUnlockFunc;


    // Audio-Funktionen

    getAudioContext(): AudioContext;
    unlockAudio(): void;
    isUnlockAudio(): boolean;

    setAudioFormat( aAudioFormat: string ): number;
    getAudioFormat(): string;

    // Player-Funktionen

    isLoad(): boolean;
    isPlay(): boolean;
    isCancel(): boolean;

    play( aAudioFilePath: string, aAudioId: string ): number;
    playFile( aFileName: string ): number;
    stop(): number;

    // Binding-Funktionen

    getPlayFunc(): AudioPlayFunc;
    getStopFunc(): AudioStopFunc;

}
