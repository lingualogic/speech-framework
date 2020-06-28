/** @packageDocumentation
 * PluginFactory-Interface fuer die Erzeugung von Plugin-Komponenten
 *
 * Letzte Aenderung: 08.10.2018
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */


// factory

import { FactoryInterface } from './../factory/factory.interface';


// plugin

import { PluginInterface } from './plugin.interface';



/**
 * Erzeugt ein neues Plugin
 *
 * @export
 * @interface PluginFactoryInterface
 */

export interface PluginFactoryInterface extends FactoryInterface {


    /**
     * Erzeugt eine neue Plugin-Komponente zum uebergebenen Plugin Namen
     *
     * @param {string} aPluginName - Name des zu erzeugenden Plugins
     * @param {boolean} aRegisterFlag - true, wenn Plugin global im PluginManager eingetragen werden soll
     *
     * @return {PluginInterface} - Plugin Instanz oder null
     */

    create( aPluginName?: string, aRegisterFlag?: boolean ): PluginInterface;
}
