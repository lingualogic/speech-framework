/**
 * Globale Fabrik zur Erzeugung einer IntentComponent
 *
 * Letzte Aenderung: 28.11.2018
 * Status: rot
 *
 * @module intent/component
 * @author SB
 */


// plugin

import { PluginFactory } from '../../core/plugin/plugin-factory';


// intent

import { INTENT_TYPE_NAME, INTENT_COMPONENTFACTORY_NAME, INTENT_COMPONENT_NAME, INTENT_MOCK_NAME } from '../intent-const';
import { IntentComponentInterface } from './intent-component.interface';
import { IntentComponent } from './intent-component';


// Global API

export class IntentComponentFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'IntentComponentFactory' );
    }

    getName(): string {
        return INTENT_COMPONENTFACTORY_NAME;
    }

    getType(): string {
        return INTENT_TYPE_NAME;
    }


    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): IntentComponentInterface {
        return new IntentComponent( aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen von Intent
     * zurueckgeben, einschließlich eines Intent-Mocks.
     *
     * @param {string} aName - Name der zu erzeugenden Komponente
     * @param {boolean} aRegisterFlag - wenn true, dann in PluginManager eintragen
     *
     * @return {IntentComponentInterface} Intent wird zurueckgegeben
     */

    create( aName?: string, aRegisterFlag = true ): IntentComponentInterface {
        const intentName = aName || INTENT_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( intentName === INTENT_MOCK_NAME ) {
            // TODO: Einbau des Intent-Mocks
            // return new IntentMock();
        }

        // Intent-Singleton erzeugen

        try {
            return this._newPlugin( intentName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }
    }

}
