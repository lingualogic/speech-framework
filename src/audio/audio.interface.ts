/** @packageDocumentation
 * Public Audio Schnittstelle
 *
 * API-Version: 1.2
 * Datum:       24.03.2020
 *
 * @module audio
 * @author SB
 */


// global

/****
 * import { OnSpeechInitFunc, OnSpeechErrorFunc } from '../core/interface/speech-function.type';
 ****/

import { OnSpeechInitFunc, OnSpeechErrorFunc } from '@speech/core';


// audio

import {
    OnAudioStartFunc,
    OnAudioStopFunc,
    OnAudioUnlockFunc
} from './audio-function.type';


// Global API


/**
 * Bot Schnittstelle
 */

export interface AudioInterface {


    // Komponenten-Funktionen


    /**
     * Version der Komponente zurueckgeben
     *
     * @return {string} componentVersion
     */

    getVersion(): string;


    /**
     * pruefen auf Fehlerausgabe auf die Konsole
     *
     * @return {boolean} errorOutputFlag
     */

    isErrorOutput(): boolean;


    /**
     * Fehlerausgabe auf Konsole einschalten
     */

    setErrorOutputOn(): void;


    /**
     * Fehlerausgabe auf Konsole ausschalten
     */

    setErrorOutputOff(): void;


    // Event-Funktionen


    /**
     * Anmelden einer Ereignis Callback-Funktion fuer die Initialisierung
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     * @param {OnSpeechInitFunc} aEventFunc - Ereignis Callback Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addInitEvent( aPluginName: string, aEventFunc: OnSpeechInitFunc ): number;


    /**
     * Anmelden einer Ereignis Callback-Funktion fuer den Start der Aktion
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     * @param {OnActionStartFunc} aEventFunc - Ereignis Callback Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addPlayerStartEvent( aPluginName: string, aEventFunc: OnAudioStartFunc ): number;


    /**
     * Anmelden einer Ereignis Callback-Funktion fuer den Stop der Aktion
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     * @param {OnActionStopFunc} aEventFunc - Ereignis Callback Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addPlayerStopEvent( aPluginName: string, aEventFunc: OnAudioStopFunc ): number;


    /**
     * Anmelden einer Ereignis Callback-Funktion fuer das Entsperren von Audio
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     * @param {OnAudioUnlockFunc} aEventFunc - Ereignis Callback Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addUnlockEvent( aPluginName: string, aEventFunc: OnAudioUnlockFunc ): number;


    /**
     * Anmelden einer Ereignis Callback-Funktion fuer die Fehler der Aktion
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     * @param {OnSpeechErrorFunc} aEventFunc - Ereignis Callback Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addErrorEvent( aPluginName: string, aEventFunc: OnSpeechErrorFunc ): number;


    /**
     * Entfernen der Ereignisfunktion fuer die Initialisierung
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeInitEvent( aPluginName: string ): number;


    /**
     * Entfernen der Ereignisfunktion fuer den Start der Aktion
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removePlayerStartEvent( aPluginName: string ): number;


    /**
     * Entfernen der Ereignisfunktion fuer den Stop der Aktion
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removePlayerStopEvent( aPluginName: string ): number;


    /**
     * Entfernen der Ereignisfunktion fuer Entsperren von Audio
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeUnlockEvent( aPluginName: string ): number;


    /**
     * Entfernen der Ereignisfunktion fuer die Fehler der Aktion
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeErrorEvent( aPluginName: string ): number;


    /**
     * Entfernen aller angemeldeten Ereignisfunktionen
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeAllEvent( aPluginName: string ): number;

    
    // Audio-Funktionen


    unlockAudio(): void;
    isUnlockAudio(): boolean;

    getAudioFormatList(): string[];
    setAudioFormat( aAudioFormat: string): number;
    getAudioFormat(): string;

    // Player-Funktionen


    playFile( aFileName: string ): number;

    /**
     * Abspielen von Audiodaten
     *
     * @param aAudioData - Base64 String fuer Audiodaten
     */

    playData( aAudioData: string ): number;
    stopPlay(): number;

    // @deprecated
    stop(): number;

}
