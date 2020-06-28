/** @packageDocumentation
 * Funktionstypen fuer Audio
 *
 * API-Version: 1.0
 * Datum: 30.01.2019
 *
 * Letzte Aenderung: 30.01.2019
 * Status: rot
 *
 * @module audio
 * @author SB
 */


// Global API


// Funktionen

/** Definiert die Start Funktion */
export type AudioStartFunc = () => number;
/** Definiert die Stop Funktion */
export type AudioStopFunc = () => number;


// Events

/** Definiert Ereignisfunktion fuer gestartete Komponente */
export type OnAudioStartFunc = () => number;
/** Definiert Ereignisfunktion fuer beendete Komponente */
export type OnAudioStopFunc = () => number;
/** Definiert Ereignisfunktion fuer entsperren von AudioContext */
export type OnAudioUnlockFunc = (aState: string) => number;
