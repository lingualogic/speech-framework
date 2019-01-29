/**
 * Globale Fabrik zur Erzeugung einer Speak API Instanz
 *
 * API-Version: 1.0
 * Datum:   03.09.2018
 *
 * Letzte Aenderung: 03.09.2018
 * Status: gruen
 *
 * @module speak
 * @author SB
 */


// speak

import { SPEAK_COMPONENT_NAME, SPEAK_MOCK_NAME } from './speak-const';
import { SpeakOptionInterface } from './speak-option.interface';
import { SpeakInterface } from './speak.interface';
import { Speak } from './speak';


// Global API


/** @export
 * Statische Klasse zur Erzeugung eines Speak.
 */

export class SpeakFactory {


    /**
     * Konstruktor ist privat, es kann keine Instanz der Klasse erzeugt werden
     */

    private constructor() {}


    /**
     * Kann verschiedene Versionen von Speak
     * zurueckgeben, einschließlich eines Speak-Mocks.
     *
     * @param {string} aName - Name des zu erzeugenden Speak
     * @param {SpeakOptionInterface} aOption - optionale Parameter
     *
     * @return {SpeakInterface} Speak Instanz wird zurueckgegeben
     */

    static create( aName?: string, aOption?: SpeakOptionInterface ): SpeakInterface {
        // console.log('SpeakFactory.create:', aName, aOption );
        const name = aName || SPEAK_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( name === SPEAK_MOCK_NAME ) {
            // TODO: Einbau des Speak-Mocks
            // return new SpeakMock();
        }

        try {
            return new Speak( aOption );
        } catch ( aException ) {
            console.log('===> EXCEPTION SpeakFactory.create: Exception', aException.message);
            return null;
        }
    }

}
