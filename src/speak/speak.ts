/** @packageDocumentation
 * Speak API fuer SpeakComponent, einmalige Initialisierung, alle anderen Initialisierungen
 * laufen auf der gleichen SpeakComponent.
 *
 * Letzte Aenderung: 21.02.2019
 * Status: gelb
 *
 * @module speak
 * @author SB
 */


// base

import { Base } from './../base/base';


// speak

import { SPEAK_TYPE_NAME } from './speak-const';
import { OnSpeakAudioUnlockFunc } from './speak-function.type';
import { SpeakOptionInterface } from './speak-option.interface';
import { SpeakInterface } from './speak.interface';
import { SpeakComponentInterface } from './component/speak-component.interface';


/** @export
 * Speak Klasse als API-Wrapper fuer die SpeakComponent
 */

export class Speak extends Base implements SpeakInterface {


    // SpeakComponent

    private mSpeakComponent: SpeakComponentInterface = null;


    /**
     * Konstruktor fuer ereignisbasierte Initialisierung von Speak
     */

    constructor( aOption?: SpeakOptionInterface ) {
        super( aOption );
        // console.log('Speak.constructor:', aOption);
        // eintragen der spezifischen Komponente
        this.mSpeakComponent = this.mComponent as SpeakComponentInterface;
    }


    /**
     * Rueckgabe des Default Buildernamens, der verwendet wird,
     * wenn kein anderer Buildername uebergeben wurde.
     *
     * @returns {string} Rueckgabe des Default Buildernamens
     */

    _getBuilderName(): string {
        return SPEAK_TYPE_NAME;
    }


    // Event-Funktionen


    addAudioUnlockEvent( aPluginName: string, aEventFunc: OnSpeakAudioUnlockFunc ): number {
        return this.mSpeakComponent.addAudioUnlockEvent( aPluginName, aEventFunc );
    }


    removeAudioUnlockEvent( aPluginName: string ): number {
        return this.mSpeakComponent.removeAudioUnlockEvent( aPluginName );
    }


    // Audio-Funktionen


    unlockAudio(): number {
        return this.mSpeakComponent.unlockAudio();
    }


    isUnlockAudio(): boolean {
        return this.mSpeakComponent.isUnlockAudio();
    }


    isAudio(): boolean {
        return this.mSpeakComponent.isAudio();
    }


    setAudioOn(): number {
        return this.mSpeakComponent.setAudioOn();
    }


    setAudioOff(): number {
        return this.mSpeakComponent.setAudioOff();
    }


    /**
     * Eintragen des AudioFormats, das in Speak verwendet wird
     *
     * @param {string} aAudioFormat - 'wav' oder 'mp3'
     */

    setAudioFormat( aAudioFormat: string ): number {
        return this.mSpeakComponent.setAudioFormat( aAudioFormat );
    }


    /**
     * Rueckgabe des globalen AudioFormats, das in SpeechAudio verwendet wird
     *
     * @return {string} audioFormat - 'wav' oder 'mp3' oder ''
     */

    getAudioFormat(): string {
        return this.mSpeakComponent.getAudioFormat();
    }


    /**
     * Rueckgabe des globalen AudioContext, der in SpeechAudio verwendet wird
     *
     * @return {AudioContext} audioContext - globale Instanz des AudioContext
     * @memberof SpeechService
     */

    getAudioContext(): AudioContext {
        return this.mSpeakComponent.getAudioContext();
    }


    setAudioFilePath( aFilePath: string ): number {
        return this.mSpeakComponent.setAudioFilePath( aFilePath );
    }


    getAudioFilePath(): string {
        return this.mSpeakComponent.getAudioFilePath();
    }


    setAudioFileName( aFileName: string ): number {
        return this.mSpeakComponent.setAudioFileName( aFileName );
    }


    getAudioFileName(): string {
        return this.mSpeakComponent.getAudioFileName();
    }


    // TTS-Funktionen


    /**
     * pruefen auf vorhandene TTS
     * 
     * @return {boolean} True, wenn TTS vorhanden ist, False sonst
     */

    isTTS(): boolean {
        return this.mSpeakComponent.isTTS();
    }


    /**
     * Setzen der aktuellen TTS ueber ihren Namen
     *
     * @param {string} aTTSName - Name der TTS
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setTTS( aTTSName: string ): number {
        return this.mSpeakComponent.setTTS( aTTSName );
    }


    /**
     * Rueckgabe des eingestellten TTS-Namens
     *
     * @returns {string} Name der aktuellen TTS
     */

    getTTS(): string {
        return this.mSpeakComponent.getTTS();
    }


    /**
     * Rueckgabe aller vorhandenen TTS-Namen
     *
     * @return {Array<string>} Liste der TTS-Namen
     */

    getTTSList(): Array<string> {
        return this.mSpeakComponent.getTTSList();
    }


    // Language-Funktionen


    /**
     * Aendern der Sprache
     *
     * @param {string} aLanguage - Kurzbezeichnung der Sprache (de, en)
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setLanguage( aLanguage: string ): number {
        return this.mSpeakComponent.setLanguage( aLanguage );
    }


    /**
     * aktuell eingestellte Sprache zurueckgeben
     *
     * @returns {string} language - Kurzbezeichnung der Sprache (de, en)
     */

    getLanguage(): string {
        return this.mSpeakComponent.getLanguage();
    }


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string> {
        return this.mSpeakComponent.getLanguageList();
    }


    // Voice-Funktionen


    /**
     * Aendern der Stimme
     *
     * @param {string} aVoice - Name der Stimme
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setVoice( aVoice: string ): number {
        return this.mSpeakComponent.setVoice( aVoice );
    }


    /**
     * aktuell eingestellte Stimme zurueckgeben
     *
     * @returns {string} Name der Stimme
     */

    getVoice(): string {
        return this.mSpeakComponent.getVoice();
    }


    /**
     * Rueckgabe aller vorhandenen Voice-Namen
     *
     * @return {Array<string>} Liste der Voice-Namen
     */

    getVoiceList(): Array<string> {
        return this.mSpeakComponent.getVoiceList();
    }


    // Speak-Funktionen


    setSpeakText( aText: string ): number {
        return this.mSpeakComponent.setSpeakText( aText );
    }

    getSpeakText(): string {
        return this.mSpeakComponent.getSpeakText();
    }

}
