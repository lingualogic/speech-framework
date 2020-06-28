/** @packageDocumentation
 * Plugin Fabrik zur Erzeugung von Plugins
 *
 * Letzte Aenderung: 08.10.2018
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */


// factory

import { Factory } from './../factory/factory';


// plugin

import { PluginFactoryInterface } from './plugin-factory.interface';
import { PluginInterface } from './plugin.interface';
import { Plugin } from './plugin';


/**
 * Implementiert die Plugin Fabrik
 *
 * @export
 * @class PluginFactory
 * @implements {PluginFactoryInterface}
 */

export class PluginFactory extends Factory implements PluginFactoryInterface {

    /**
     * Creates an instance of PluginFactory.
     *
     * @param {string} aFactoryName - Name der Fabrik
     */

    constructor( aFactoryName?: string ) {
        super( aFactoryName || 'PluginFactory' );
    }

    getType(): string {
        return 'Plugin';
    }


    /**
     * Name der PluginFactory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return 'PluginFactory';
    }


    // Plugin-Funktionen


    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): PluginInterface {
        return new Plugin( aPluginName, aRegisterFlag );
    }


    /**
     * Erzeugt ein neues Plugin
     *
     * @param {string} [aPluginName] - Name des Plugins
     *
     * @return {PluginInterface} plugin - Instanz des Plugins
     */

    create( aPluginName?: string, aRegisterFlag = true ): PluginInterface {
        const pluginName = aPluginName || 'Plugin';
        try {
            return this._newPlugin( pluginName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'PluginFactory.create', aException );
            return null;
        }
    }

}
