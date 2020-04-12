/**
 * Listen Interface
 *
 * API-Version: 1.5
 * Datum: 09.04.2020
 *
 * Letzte Aenderung: 09.04.2020
 * Status: gelb
 *
 * @module listen
 * @author SB
 */


// base

import { BaseInterface } from './../base/base.interface';


// listen

import { OnListenStartFunc, OnListenStopFunc, OnListenResultFunc, OnListenNoMatchFunc } from './listen-function.type';


// Global API


/** @export
 * Listen Schnittstelle
 */

export interface ListenInterface extends BaseInterface {


    // Event-Funktionen


    /**
     * Eintragen eines Spracheingabe-Ergebnis Events. Hier wird der Ergebnistext
     * der Spracheingabe zurueckgegeben.
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {OnListenResultFunc} aEventFunc - Ereignis-Behandlungsfunktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addListenResultEvent( aPluginName: string, aEventFunc: OnListenResultFunc ): number;


    /**
     * Enfernen eines Spracheingabe-Ergebnis Events.
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeListenResultEvent( aPluginName: string ): number;


    /**
     * Eintragen eines Spracheingabe-Zwischenergebnis Events. Hier wird der Ergebnistext
     * der Spracheingabe zurueckgegeben.
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {OnListenResultFunc} aEventFunc - Ereignis-Behandlungsfunktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addListenInterimResultEvent( aPluginName: string, aEventFunc: OnListenResultFunc ): number;


    /**
     * Enfernen eines Spracheingabe-Zwischenergebnis Events.
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeListenInterimResultEvent( aPluginName: string ): number;


    /**
     * Eintragen eines Spracheingabe-NoMatch Events.
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {OnListenNoMatchFunc} aEventFunc - NoMatch-Behandlungsfunktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addListenNoMatchEvent( aPluginName: string, aEventFunc: OnListenNoMatchFunc ): number;


    /**
     * Enfernen eines Spracheingabe-NoMatch Events.
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeListenNoMatchEvent( aPluginName: string ): number;


    /**
     * Eintragen eines Spracheingabe-RecognitionStart Events.
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {OnListenStartFunc} aEventFunc - RecognitionStart-Behandlungsfunktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addListenRecognitionStartEvent( aPluginName: string, aEventFunc: OnListenStartFunc ): number;


    /**
     * Enfernen eines Spracheingabe-RecognitionStart Events.
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeListenRecognitionStartEvent( aPluginName: string ): number;


    /**
     * Eintragen eines Spracheingabe-RecognitionStop Events.
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {OnListenStartFunc} aEventFunc - RecognitionStop-Behandlungsfunktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addListenRecognitionStopEvent( aPluginName: string, aEventFunc: OnListenStopFunc ): number;


    /**
     * Enfernen eines Spracheingabe-RecognitionStop Events.
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeListenRecognitionStopEvent( aPluginName: string ): number;


    /**
     * Eintragen eines Spracheingabe-AudioStart Events.
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {OnListenStartFunc} aEventFunc - AudioStart-Behandlungsfunktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addListenAudioStartEvent( aPluginName: string, aEventFunc: OnListenStartFunc ): number;


    /**
     * Enfernen eines Spracheingabe-AudioStart Events.
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeListenAudioStartEvent( aPluginName: string ): number;


    /**
     * Eintragen eines Spracheingabe-AudioStop Events.
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {OnListenStartFunc} aEventFunc - AudioStop-Behandlungsfunktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addListenAudioStopEvent( aPluginName: string, aEventFunc: OnListenStopFunc ): number;


    /**
     * Enfernen eines Spracheingabe-AudioStop Events.
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeListenAudioStopEvent( aPluginName: string ): number;


    /**
     * Eintragen eines Spracheingabe-SoundStart Events.
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {OnListenStartFunc} aEventFunc - SoundStart-Behandlungsfunktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addListenSoundStartEvent( aPluginName: string, aEventFunc: OnListenStartFunc ): number;


    /**
     * Enfernen eines Spracheingabe-Soundstart Events.
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeListenSoundStartEvent( aPluginName: string ): number;


    /**
     * Eintragen eines Spracheingabe-SoundStop Events.
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {OnListenStartFunc} aEventFunc - SoundStop-Behandlungsfunktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addListenSoundStopEvent( aPluginName: string, aEventFunc: OnListenStopFunc ): number;


    /**
     * Enfernen eines Spracheingabe-SoundStop Events.
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeListenSoundStopEvent( aPluginName: string ): number;


    /**
     * Eintragen eines Spracheingabe-SpeechStart Events.
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {OnListenStartFunc} aEventFunc - SpeechStart-Behandlungsfunktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addListenSpeechStartEvent( aPluginName: string, aEventFunc: OnListenStartFunc ): number;


    /**
     * Enfernen eines Spracheingabe-SpeechStart Events.
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeListenSpeechStartEvent( aPluginName: string ): number;


    /**
     * Eintragen eines Spracheingabe-SpeechStop Events.
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {OnListenStartFunc} aEventFunc - SpeechStop-Behandlungsfunktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addListenSpeechStopEvent( aPluginName: string, aEventFunc: OnListenStopFunc ): number;


    /**
     * Enfernen eines Spracheingabe-SpeechStop Events.
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeListenSpeechStopEvent( aPluginName: string ): number;


    // ASR-Funktionen


    /**
     * pruefen auf vorhandene ASR
     * 
     * @return {boolean} True, wenn ASR vorhanden ist, False sonst
     */

    isASR(): boolean;


    /**
     * Setzen der aktuellen ASR ueber ihren Namen
     *
     * @param {string} aASRName - Name der ASR
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setASR( aASRName: string ): number;


    /**
     * Rueckgabe des eingestellten ASR-Namens
     *
     * @returns {string} Name der aktuellen ASR
     */

    getASR(): string;


    /**
     * Rueckgabe aller vorhandenen ASR-Namen
     *
     * @return {Array<string>} Liste der ASR-Namen
     */

    getASRList(): Array<string>;


    // Timeout-Funktionen


    /**
     * Timeout eintragen
     *
     * @param {number} aTimeout - Timeout in Millisekunden
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setTimeout( aTimeout: number ): number;


    // Language-Funktionen


    /**
     * Aendern der Sprache
     *
     * @param {string} aLanguage - Kurzzeichen fuer Sprache ( de, en )
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setLanguage( aLanguage: string ): number;


    /**
     * aktuell eingestellte Sprache zurueckgeben
     *
     * @returns {string} language - Kurzzeichenstring fuer Sprache ( de, en )
     */

    getLanguage(): string;


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string>;


    // Mode-Funktionen


    /**
     * pruefen, ob der Eingabemode verfuegbar ist.
     * 
     * @param {string} aMode - Modus fuer die Spracheingabe (Command, Dictate)
     *
     * @return {boolean} True, wenn Eingabemode verfuegbar, False sonst
     */

    isMode( aMode: string ): boolean;


    /**
     * pruefen, ob der Eingabemode Command eingestellt ist
     * Dann kurzen Text nicht laenger als 30 Sekunden von der Spracherkennung zu verarbeiten
     * 
     * @return {boolean} True, wenn Eingabemode Command eingestellt ist
     */

    isCommandMode(): boolean;


    /**
     * pruefen, ob der Eingabemode Dictate eingestellt ist
     * Dann kontinuierlich Text von der Spracherkennung zu verarbeiten
     * 
     * @return {boolean} True, wenn Eingabemode Dictate eingestellt ist
     */

    isDictateMode(): boolean;


    /**
     * Aendern des Modus
     *
     * @param {string} aMode - Modus fuer die Spracheingabe (Command, Dictate)
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setMode( aMode: string ): number;


    /**
     * aktuell eingestellten Modus der Spracheingabe zurueckgeben
     *
     * @returns {string} Rueckgabe des Modus fuer die Spracheingabe (Command, Dictate)
     */

    getMode(): string;


    /**
     * Rueckgabe aller vorhandenen Modi fuer die Spracheingabe
     *
     * @return {Array<string>} Liste der Mode-Namen
     */

    getModeList(): Array<string>;


    // Listen-Funktionen


    /**
     * Sofortiger Abbruch der Spracheingabe ohne Resultate zurueckzugeben
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    abort(): number;

}
