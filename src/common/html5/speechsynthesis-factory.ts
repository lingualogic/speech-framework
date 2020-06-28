/** @packageDocumentation
 * Diese Komponente dient als Fabrik zur Erzeugung der SpeechSynthesis-Klassen und -Instanzen fuer Html5
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * @module common/html5
 * @author SB
 */


// core

import { Factory } from '@speech/core';


// Konstanten

export const SPEECHSYNTHESIS_FACTORY_NAME = 'SpeechSynthesisFactory';
export const SPEECHSYNTHESIS_TYPE_NAME = 'SpeechSynthesis';
export const SPEECHSYNTHESIS_UTTERANCE_NAME = 'SpeechUtterance';

/**
 * Diese Klasse kapselt die Pruefung und Erzeugung der HTML5-Sprachausgabeklassen
 */

export class SpeechSynthesisFactory extends Factory {


    constructor( aFactoryName?: string, aRegisterFlag = true ) {
        super( aFactoryName || SPEECHSYNTHESIS_FACTORY_NAME, aRegisterFlag );
    }


    isMock(): boolean {
        return false;
    }


    getType(): string {
        return SPEECHSYNTHESIS_TYPE_NAME;
    }


    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return SPEECHSYNTHESIS_FACTORY_NAME;
    }


    /**
     * Erzeugt ein neues Objekt
     *
     * @param {string} aObjectName - Name des Objektes
     * @param {boolean} aRegisterFlag - bestimmt, ob Objekt in einen Manager eingetragen wird
     *
     * @return {any} Instanz des Objektes
     */

    create( aObjectName?: string, aRegisterFlag = true ): any {
        const name = aObjectName || SPEECHSYNTHESIS_TYPE_NAME;
        // console.log('SpeechRecognitionFactory.SpeechRecognition:', (window as any).SpeechRecognition);
        try {
            if ( name === SPEECHSYNTHESIS_TYPE_NAME ) {
                return window.speechSynthesis || null;
            }
            if ( name === SPEECHSYNTHESIS_UTTERANCE_NAME ) {
                return (window as any).SpeechSynthesisUtterance || (window as any).webkitSpeechSynthesisUtterance || null;
            }
            return null;
        } catch (aException) {
            this._exception( 'create', aException );
            return null;
        }
    }


    /** @pdeprecated
     * Feststellen, ob HTML5 SpeechSynthesis API vorhanden ist
     *
     * @return {SpeechSynthesis} speechSynthesis - Rueckgabe der Sprachsynthesis Instanz
     */

    getSpeechSynthesis(): any {
        return this.create();
    }


    /** @deprecated
     * Feststellen, ob HTML5 SpeechSynthesisUtterance API vorhanden ist
     *
     * @return {SpeechSynthesisUtterance} speechSynthesisUtteranceClass - Rueckgabe der Sprachausgabe-Klasse
     */

    getSpeechSynthesisUtteranceClass(): any {
        return this.create( SPEECHSYNTHESIS_UTTERANCE_NAME );
    }


}
