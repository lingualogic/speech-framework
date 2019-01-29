/**
 * Listen API Wrapper fuer ListenComponent, einmalige Initialisierung, alle anderen Initialisierungen
 * laufen auf der gleichen ListenComponent.
 * Listen API Wrapper erbt vom Base API Wrapper.
 * SpeechMain muss vorher aufgerufen worden sein, um den ListenBuilder
 * zu erzeugen.
 *
 * Letzte Aenderung: 27.01.2019
 * Status: gelb
 *
 * @module listen
 * @author SB
 */


// base

import { Base } from './../base/base';


// listen

import { LISTEN_TYPE_NAME } from './listen-const';
import { OnListenResultFunc } from './listen-function.type';
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

    removeListenResultEvent( aPluginName: string ): number {
        return this.mListenComponent.removeListenResultEvent( aPluginName );
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


    // Listen-Funktionen


    abort(): number {
        return this.mListenComponent.abort();
    }

}
