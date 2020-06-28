/** @packageDocumentation
 * Listen API Wrapper fuer ListenComponent, einmalige Initialisierung, alle anderen Initialisierungen
 * laufen auf der gleichen ListenComponent.
 * Listen API Wrapper erbt vom Base API Wrapper.
 * SpeechMain muss vorher aufgerufen worden sein, um den ListenBuilder
 * zu erzeugen.
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gruen
 *
 * @module listen
 * @author SB
 */


// base

import { Base } from '@speech/base';


// listen

import { LISTEN_TYPE_NAME } from './listen-const';
import { OnListenResultFunc, OnListenNoMatchFunc, OnListenStartFunc, OnListenStopFunc } from './listen-function.type';
import { ListenOptionInterface } from './listen-option.interface';
import { ListenComponentInterface } from './component/listen-component.interface';
import { ListenInterface } from './listen.interface';


/** @export
 * Listen Klasse als API-Wrapper fuer die ListenComponent
 */

export class Listen extends Base implements ListenInterface {


    // ListenComponentBuilder

    mListenComponent: ListenComponentInterface = null;


    /**
     * Konstruktor fuer ereignisbasierte Initialisierung des Listen
     */

    constructor( aOption?: ListenOptionInterface ) {
        super( aOption );
        // eintragen der spezifischen Komponente
        this.mListenComponent = this.mComponent as ListenComponentInterface;
    }


    /**
     * Rueckgabe des Default Buildernamens, der verwendet wird,
     * wenn kein anderer Buildername uebergeben wurde.
     *
     * @returns {string} Rueckgabe des Default Buildernamens
     */

    _getBuilderName(): string {
        return LISTEN_TYPE_NAME;
    }


    // Event-Funktionen


    addListenResultEvent( aPluginName: string, aEventFunc: OnListenResultFunc ): number {
        return this.mListenComponent.addListenResultEvent( aPluginName, aEventFunc );
    }

    addListenInterimResultEvent( aPluginName: string, aEventFunc: OnListenResultFunc ): number {
        return this.mListenComponent.addListenInterimResultEvent( aPluginName, aEventFunc );
    }

    addListenNoMatchEvent( aPluginName: string, aEventFunc: OnListenNoMatchFunc ): number {
        return this.mListenComponent.addListenNoMatchEvent( aPluginName, aEventFunc );
    }

    addListenRecognitionStartEvent( aPluginName: string, aEventFunc: OnListenStartFunc ): number {
        return this.mListenComponent.addListenRecognitionStartEvent( aPluginName, aEventFunc );
    }

    addListenRecognitionStopEvent( aPluginName: string, aEventFunc: OnListenStopFunc ): number {
        return this.mListenComponent.addListenRecognitionStopEvent( aPluginName, aEventFunc );
    }

    addListenAudioStartEvent( aPluginName: string, aEventFunc: OnListenStartFunc ): number {
        return this.mListenComponent.addListenAudioStartEvent( aPluginName, aEventFunc );
    }

    addListenAudioStopEvent( aPluginName: string, aEventFunc: OnListenStopFunc ): number {
        return this.mListenComponent.addListenAudioStopEvent( aPluginName, aEventFunc );
    }

    addListenSoundStartEvent( aPluginName: string, aEventFunc: OnListenStartFunc ): number {
        return this.mListenComponent.addListenSoundStartEvent( aPluginName, aEventFunc );
    }

    addListenSoundStopEvent( aPluginName: string, aEventFunc: OnListenStopFunc ): number {
        return this.mListenComponent.addListenSoundStopEvent( aPluginName, aEventFunc );
    }

    addListenSpeechStartEvent( aPluginName: string, aEventFunc: OnListenStartFunc ): number {
        return this.mListenComponent.addListenSpeechStartEvent( aPluginName, aEventFunc );
    }

    addListenSpeechStopEvent( aPluginName: string, aEventFunc: OnListenStopFunc ): number {
        return this.mListenComponent.addListenSpeechStopEvent( aPluginName, aEventFunc );
    }


    removeListenResultEvent( aPluginName: string ): number {
        return this.mListenComponent.removeListenResultEvent( aPluginName );
    }

    removeListenInterimResultEvent( aPluginName: string ): number {
        return this.mListenComponent.removeListenInterimResultEvent( aPluginName );
    }

    removeListenNoMatchEvent( aPluginName: string ): number {
        return this.mListenComponent.removeListenNoMatchEvent( aPluginName );
    }

    removeListenRecognitionStartEvent( aPluginName: string ): number {
        return this.mListenComponent.removeListenRecognitionStartEvent( aPluginName );
    }

    removeListenRecognitionStopEvent( aPluginName: string ): number {
        return this.mListenComponent.removeListenRecognitionStopEvent( aPluginName );
    }

    removeListenAudioStartEvent( aPluginName: string ): number {
        return this.mListenComponent.removeListenAudioStartEvent( aPluginName );
    }

    removeListenAudioStopEvent( aPluginName: string ): number {
        return this.mListenComponent.removeListenAudioStopEvent( aPluginName );
    }

    removeListenSoundStartEvent( aPluginName: string ): number {
        return this.mListenComponent.removeListenSoundStartEvent( aPluginName );
    }

    removeListenSoundStopEvent( aPluginName: string ): number {
        return this.mListenComponent.removeListenSoundStopEvent( aPluginName );
    }

    removeListenSpeechStartEvent( aPluginName: string ): number {
        return this.mListenComponent.removeListenSpeechStartEvent( aPluginName );
    }

    removeListenSpeechStopEvent( aPluginName: string ): number {
        return this.mListenComponent.removeListenSpeechStopEvent( aPluginName );
    }


    // ASR-Funktionen


    /**
     * pruefen auf vorhandene ASR
     * 
     * @return {boolean} True, wenn ASR vorhanden ist, False sonst
     */

    isASR(): boolean {
        return this.mListenComponent.isASR();
    }


    /**
     * Setzen der aktuellen ASR ueber ihren Namen
     *
     * @param {string} aASRName - Name der ASR
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setASR( aASRName: string ): number {
        return this.mListenComponent.setASR( aASRName );
    }


    /**
     * Rueckgabe des eingestellten ASR-Namens
     *
     * @returns {string} Name der aktuellen ASR
     */

    getASR(): string {
        return this.mListenComponent.getASR();
    }


    /**
     * Rueckgabe aller vorhandenen ASR-Namen
     *
     * @return {Array<string>} Liste der ASR-Namen
     */

    getASRList(): Array<string> {
        return this.mListenComponent.getASRList();
    }


    // Timeout-Funktionen


    /**
     * Timeout eintragen
     *
     * @param {number} aTimeout - Timeout in Millisekunden
     *
     * @return {number} Fehlercode 0 oder -1
     */

    
    setTimeout( aTimeout: number ): number {
        return this.mListenComponent.setTimeout( aTimeout );
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
        return this.mListenComponent.setLanguage( aLanguage );
    }


    /**
     * aktuell eingestellte Sprache zurueckgeben
     *
     * @returns {string} language - Kurzbezeichnung der Sprache (de, en)
     */

    getLanguage(): string {
        return this.mListenComponent.getLanguage();
    }


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string> {
        return this.mListenComponent.getLanguageList();
    }


    // Modus-Funktionen


    /**
     * Gibt den aktuell einstestellten Eingabemodus der Spracherkennung zurueck
     *
     * @return {string} Rueckgabe des Eingabemodus
     */

    isMode( aMode: string ): boolean {
        return this.mListenComponent.isMode( aMode );
    }


    /**
     * pruefen, ob der Eingabemode Command eingestellt ist
     * Dann kurzen Text nicht laenger als 30 Sekunden von der Spracherkennung zu verarbeiten
     * 
     * @return {boolean} True, wenn Eingabemode Command eingestellt ist
     */

    isCommandMode(): boolean {
        return this.mListenComponent.isCommandMode();
    }


    /**
     * pruefen, ob der Eingabemode Dictate eingestellt ist
     * Dann kontinuierlich Text von der Spracherkennung zu verarbeiten
     * 
     * @return {boolean} True, wenn Eingabemode Dictate eingestellt ist
     */

    isDictateMode(): boolean {
        return this.mListenComponent.isDictateMode();
    }


    /**
     * Traegt einen neue Eingabemodus fuer die Spracherkennung ein
     *
     * @param {string} aMode - Command oder Dictate
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setMode( aMode: string ): number {
        let result = this.mListenComponent.setMode( aMode );
        // console.log('Listen.setMode:', aMode, result);
        return result;
    }


    /**
     * Gibt den aktuell einstestellten Eingabemodus der Spracherkennung zurueck
     *
     * @return {string} Rueckgabe des Eingabemodus
     */

    getMode(): string {
        return this.mListenComponent.getMode();
    }


    /**
     * Rueckgabe aller vorhandenen Eingabemodi fuer die Spracherkennung
     *
     * @return {Array<string>} Liste der Eingabemodi
     */

    getModeList(): Array<string> {
        return this.mListenComponent.getModeList();
    }


    // Listen-Funktionen


    abort(): number {
        return this.mListenComponent.abort();
    }

}
