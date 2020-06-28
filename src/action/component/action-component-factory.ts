/** @packageDocumentation
 * Fabrik zur Erzeugung einer ActionComponent
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gruen
 *
 * @module action/component
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// action

import { ACTION_TYPE_NAME, ACTION_COMPONENTFACTORY_NAME, ACTION_COMPONENT_NAME, ACTION_MOCK_NAME } from '../action-const';
import { ActionComponentInterface } from './action-component.interface';
import { ActionComponent } from './action-component';


// Global API


/** @export
 * ActionComponentFactory zur Erzeugung einer neuen ActionComponent Instanz
 */

export class ActionComponentFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'ActionComponentFactory' );
    }

    getName(): string {
        return ACTION_COMPONENTFACTORY_NAME;
    }

    getType(): string {
        return ACTION_TYPE_NAME;
    }

    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): ActionComponentInterface {
        return new ActionComponent( aRegisterFlag );
    }

    /**
     * Kann verschiedene Versionen von Action
     * zurueckgeben, einschließlich eines Action-Mocks.
     *
     * @param {string} aPluginName - Name der zu erzeugenden Komponente
     * @param {boolean} aRegisterFlag - wenn true, dann in PluginManager eintragen
     *
     * @return {ActionComponentInterface} actionComponent wird zurueckgegeben
     */

    create( aPluginName?: string, aRegisterFlag = true ): ActionComponentInterface {
        const pluginName = aPluginName || ACTION_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( pluginName === ACTION_MOCK_NAME ) {
            // TODO: Einbau des Action-Mocks
            // return new ActionMock();
        }

        // Action erzeugen

        try {
            return this._newPlugin( pluginName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }
    }

}
