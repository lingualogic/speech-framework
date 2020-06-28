/** @packageDocumentation
 * Funktionstypen fuer Speak
 *
 * API-Version: 1.0
 * Datum:   03.09.2018
 *
 * Letzte Aenderung: 05.09.2018
 * Status: gruen
 *
 * @module speak
 * @author SB
 */


// Global API


// Speak-Funktionen

/** Definiert die Start Funktion fuer den Beginn einer Sprachausgabe */
export type SpeakStartFunc = () => number;
/** Definiert die Stop Funktion fuer das Ende einer Speachausgabe */
export type SpeakStopFunc = () => number;


// Events

/** Definiert Ereignisfunktion fuer gestartete Sprachausgabe */
export type OnSpeakStartFunc = () => number;
/** Definiert Ereignisfunktion fuer beendete Sprachausgabe */
export type OnSpeakStopFunc = () => number;
/** Definiert Ereignisfunktion fuer entsperren von AudioContext */
export type OnSpeakAudioUnlockFunc = (aUnlockFlag: boolean) => number;
export type OnAudioUnlockFunc = (aState: string) => number;

