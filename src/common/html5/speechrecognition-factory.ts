/** @packageDocumentation
 * Diese Komponente dient als Fabrik zur Erzeugung der SpeechRecognition-Klassen und -Instanzen von Html5
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module common/html5
 * @author SB
 */


// core

import { Factory } from '@speech/core';


// Konstanten

export const SPEECHRECOGNITION_FACTORY_NAME = 'SpeechRecognitionFactory';
export const SPEECHRECOGNITION_TYPE_NAME = 'SpeechRecognition';
export const SPEECHRECOGNITION_GRAMMAR_NAME = 'SpeechGrammar';


/**
 * Diese Klasse kapselt die Pruefung und Erzeugung der HTML5-Spracheingabeklassen
 */

export class SpeechRecognitionFactory extends Factory {


    constructor( aFactoryName?: string, aRegisterFlag = true ) {
        super( aFactoryName || SPEECHRECOGNITION_FACTORY_NAME, aRegisterFlag );
    }


    isMock(): boolean {
        return false;
    }


    getType(): string {
        return SPEECHRECOGNITION_TYPE_NAME;
    }


    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return SPEECHRECOGNITION_FACTORY_NAME;
    }


    /**
     * Erzeugt ein neues Objket
     *
     * @param {string} aObjectName - Name des Objektes
     * @param {boolean} aRegisterFlag - bestimmt, ob Objekt in einen Manager eingetragen wird
     *
     * @return {any} Instanz des Objektes
     */

    create( aObjectName?: string, aRegisterFlag = true ): any {
        const name = aObjectName || SPEECHRECOGNITION_TYPE_NAME;
        // console.log('SpeechRecognitionFactory.SpeechRecognition:', (window as any).SpeechRecognition);
        try {
            // auslesen der SpeechRecognition-Klassen, wenn vorhanden
            if ( name === SPEECHRECOGNITION_TYPE_NAME ) {
                // console.log('SpeechRecognitionFactory.create(SpeechRecognition):', (window as any).SpeechRecognition);
                return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
            }
            // auslesen der SpeechGrammarList-Klassen, wenn vorhanden
            if ( name === SPEECHRECOGNITION_GRAMMAR_NAME ) {
                // console.log('SpeechRecognitionFactory.create(SpeechGrammarList):', (window as any).SpeechGrammarList);
                return (window as any).SpeechGrammarList || (window as any).webkitSpeechGrammarList || null;
            }
            return null;
        } catch (aException) {
            this._exception( 'create', aException );
            return null;
        }
    }


    /** @deprecated
     * Feststellen, ob HTML5 SpeechRecognition API vorhanden ist
     *
     * @return {SpeechRecognition} speechRecognitonClass - Rueckgabe der Spracheingabe-Klasse
     */

    getSpeechRecognitionClass(): any {
        return this.create();
    }


    /** @deprecated
     * Feststellen, ob HTML5 SpeechGrammarList API vorhanden ist
     *
     * @return {SpeechGrammarList} speechGrammarListClass - Rueckgabe der Grammatiklisten-Klasse
     */

    getSpeechGrammarListClass(): any {
        return this.create( SPEECHRECOGNITION_GRAMMAR_NAME );
    }

}
