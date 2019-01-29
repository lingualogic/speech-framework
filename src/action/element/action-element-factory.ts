/**
 * Globale Fabrik zur Erzeugung eines ActionElement-Plugins
 *
 * Letzte Aenderung: 10.09.2018
 * Status: gelb
 *
 * @module action/elemenet
 * @author SB
 */


// plugin

import { PluginFactory } from '../../core/plugin/plugin-factory';


// element

import { ACTIONELEMENT_FACTORY_NAME, ACTIONELEMENT_PLUGIN_NAME, ACTIONELEMENT_MOCK_NAME } from './action-element-const';
import { ActionElementInterface } from './action-element.interface';
import { ActionElement } from './action-element';


// Global API


/** @export
 * ActionElementFactory zur Erzeugung eines ActionElement-Plugin
 */

export class ActionElementFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'ActionElementFactory' );
    }

    getName(): string {
        return ACTIONELEMENT_FACTORY_NAME;
    }


    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): ActionElementInterface {
        return new ActionElement( aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen des ActionElement-Plugin
     * zurueckgeben, einschließlich eines ActionElement-Mocks.
     *
     * @param {string} aPluginName - Name des zu erzeugenden Plugins
     * @param {boolean} aRegisterFlag - wenn true, wird Plugin in PluginManager eingetragen
     *
     * @return {ActionInterface} actionElement-Plugin Instanz oder null wird zurueckgegeben
     */

    create( aPluginName?: string, aRegisterFlag = true ): ActionElementInterface {
        const pluginName = aPluginName || ACTIONELEMENT_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( pluginName === ACTIONELEMENT_MOCK_NAME ) {
            // TODO: Einbau des ActionElement-Mocks
            // return new ActionElementMock();
        }

        // ActionElement-Plugin erzeugen

        try {
            return this._newPlugin( pluginName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }

    }

}
