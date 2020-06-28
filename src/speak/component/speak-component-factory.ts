/** @packageDocumentation
 * Fabrik zur Erzeugung einer SpeakComponent
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gruen
 *
 * @module speak/component
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// speak

import { SPEAK_COMPONENTFACTORY_NAME, SPEAK_COMPONENT_NAME, SPEAK_MOCK_NAME, SPEAK_TYPE_NAME } from '../speak-const';
import { SpeakComponentInterface } from './speak-component.interface';
import { SpeakComponent } from './speak-component';


// Global API

export class SpeakComponentFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'SpeakComponentFactory' );
    }

    getType(): string {
        return SPEAK_TYPE_NAME;
    }

    getName(): string {
        return SPEAK_COMPONENTFACTORY_NAME;
    }


    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): SpeakComponentInterface {
        return new SpeakComponent( aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen der Speak
     * zurueckgeben, einschließlich eines Speak-Mocks.
     *
     * @param {string} aSpeakName - Name der zu erzeugenden Speak Komponente
     * @param {boolean} aRegisterFlag - wenn true, wird Plugin in PluginFactory eingetragen
     *
     * @return {SpeakComponentInterface} speak wird zurueckgegeben
     */

    create( aSpeakName?: string, aRegisterFlag = true ): SpeakComponentInterface {
        const speakName = aSpeakName || SPEAK_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( speakName === SPEAK_MOCK_NAME ) {
            // TODO: Einbau des Speak-Mocks
            // return new SpeakMock();
        }

        // Speak erzeugen

        try {
            return this._newPlugin( speakName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }

    }

}
