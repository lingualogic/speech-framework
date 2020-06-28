/** @packageDocumentation
 * Globale Fabrik zur Erzeugung eines ActionFunctionPlugin
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * @module action/function
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// action

import { ACTIONFUNCTION_FACTORY_NAME, ACTIONFUNCTION_PLUGIN_NAME, ACTIONFUNCTION_MOCK_NAME } from './action-function-const';
import { ActionFunctionInterface } from './action-function.interface';
import { ActionFunction } from './action-function';


// Global API


/** @export
 * ActionFunctionFactory zur Erzeugung eines ActionFunctionPlugin
 */

export class ActionFunctionFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'ActionFunctionFactory' );
    }

    getName(): string {
        return ACTIONFUNCTION_FACTORY_NAME;
    }


    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): ActionFunctionInterface {
        return new ActionFunction( aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen des ActionFunctionPlugin
     * zurueckgeben, einschließlich eines ActionFunctionPlugin-Mocks.
     *
     * @param {string} aPluginName - Name des zu erzeugenden Plugins
     * @param {boolean} aRegisterFlag - wenn true, wird Plugin in PluginManager eingetragen
     *
     * @return {ActionInterface} actionPlugin Instanz oder null wird zurueckgegeben
     */

    create( aPluginName?: string, aRegisterFlag = true ): ActionFunctionInterface {
        const pluginName = aPluginName || ACTIONFUNCTION_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( pluginName === ACTIONFUNCTION_MOCK_NAME ) {
            // TODO: Einbau des ActionFunction-Mocks
            // return new ActionFunctionMock();
        }

        // ActionFunctionPlugin erzeugen

        try {
            return this._newPlugin( pluginName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }

    }

}
