/**
 * Oeffentliche Speak Schnittstelle als Teil des Speak-API
 *
 * API-Version: 1.2
 * Datum:       27.01.2019
 *
 * Letzte Aenderung: 27.01.2019
 * Status: gruen
 *
 * @module speak
 * @author SB
 */


// base

import { BaseInterface } from './../base/base.interface';


// Global API


/** @export
 * Speak Schnittstelle
 */

export interface SpeakInterface extends BaseInterface {


    // Audio-Funktionen


    /**
     * Prueft, ob Audioausgabe oder Sprachsynthese eingeschaltet ist
     *
     * @return {boolean} True, Audioausgabe eingeschaltet, False die Sprachsynthese ist eingeschaltet
     */

    isAudio(): boolean;


    /**
     * Audioausgabe einschalten, dann werden Audiodateien fuer die Sprachausgabe abgespielt.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setAudioOn(): number;


    /**
     * Audioausgabe abschalten, dann wird die Sprachsynthese fuer die Sprachausgabe benutzt.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setAudioOff(): number;


    /**
     * Rueckgabe des globalen Audiokontext der App.
     *
     * @return {AudioContext} Gibt den globalen HTML5-Audiokontext zurueck
     */

    getAudioContext(): AudioContext;


    /**
     * Eintragen des Audioformats (AUDIO_MP3_FORMAT, AUDIO_WAV_FORMAT)
     *
     * @param aAudioFormat - Name des Formates
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setAudioFormat( aAudioFormat: string ): number;


    /**
     * Rueckgabe des aktuell eingestellten Audioformats.
     *
     * @return {string} gibt MP3 oder WAV zurueck
     */

    getAudioFormat(): string;


    /**
     * Aktuelles Audiodateiverzeichnis eintragen.
     *
     * @param {string} aFilePath - Verzeichnis fuer die Audiodateien
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setAudioFilePath( aAudioFilePath: string ): number;


    /**
     * Aktuelles Audiodateiverzeichnis zurueckgeben
     *
     * @return {string} Rueckgabe des Verzeichnisses
     */

    getAudioFilePath(): string;


    /**
     * Aktuellen Audiodateinamen ohne Formatangabe eintragen.
     *
     * @param {string} aFileName - Audiodateiname
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setAudioFileName( aAudioFileName: string ): number;


    /**
     * Aktuellen Audiodateinamen zurueckgeben
     *
     * @return {string} Rueckgabe des Dateinamens
     */

    getAudioFileName(): string;


    // TTS-Funktionen


    /**
     * pruefen auf vorhandene TTS
     * 
     * @return {boolean} True, wenn TTS vorhanden ist, False sonst
     */

    isTTS(): boolean;


    /**
     * Setzen der aktuellen TTS ueber ihren Namen
     *
     * @param {string} aTTSName - Name der TTS
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setTTS( aTTSName: string ): number;


    /**
     * Rueckgabe des eingestellten TTS-Namens
     *
     * @returns {string} Name der aktuellen TTS
     */

    getTTS(): string;


    /**
     * Rueckgabe aller vorhandenen TTS-Namen
     *
     * @return {Array<string>} Liste der TTS-Namen
     */

    getTTSList(): Array<string>;


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
     * @return {string} language - Kurzzeichenstring fuer Sprache ( de, en )
     */

    getLanguage(): string;


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string>;


    // Voice-Funktionen


    /**
     * Aendern der Stimme
     *
     * @param {string} aVoice - Name fuer die Stimme
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setVoice( aVoice: string ): number;


    /**
     * aktuell eingestellte Stimme zurueckgeben
     *
     * @returns {string} Rueckgabe fuer Name der Stimme
     */

    getVoice(): string;


    /**
     * Rueckgabe aller vorhandenen Voice-Namen
     *
     * @return {Array<string>} Liste der Voice-Namen
     */

    getVoiceList(): Array<string>;


    // Speak-Funktionen


    /**
     * Eintragen des zu sprechenden Textes
     *
     * @param {string} aText - zu sprechenden Text
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setSpeakText( aText: string ): number;


    /**
     * Rueckgabe des aktuell zu sprechenden Textes
     *
     * @return {string} zu sprechender Text
     */

    getSpeakText(): string;

}