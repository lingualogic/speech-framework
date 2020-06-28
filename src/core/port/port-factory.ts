/** @packageDocumentation
 * PortFactory zur Erzeugung von Ports
 *
 * Letzte Aenderung: 15.12.2018
 * Status: rot
 *
 * @module core/port
 * @author SB
 */


// factory

import { Factory } from './../factory/factory';


// port

import { PortFactoryInterface } from './port-factory.interface';
import { PortInterface } from './port.interface';
import { Port } from './port';


/**
 * Implementiert die Port Fabrik
 *
 * @export
 * @class PortFactory
 * @implements {PortFactoryInterface}
 */

export class PortFactory extends Factory implements PortFactoryInterface {

    /**
     * Creates an instance of PortFactory.
     *
     * @param {string} aFactoryName - Name der Fabrik
     */

    constructor( aFactoryName?: string ) {
        super( aFactoryName || 'PortFactory' );
    }

    getType(): string {
        return 'Port';
    }


    /**
     * Name der PluginFactory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return 'PortFactory';
    }


    // Port-Funktionen


    _newPort( aPortName: string, aRegisterFlag: boolean ): PortInterface {
        return new Port( aPortName, aRegisterFlag );
    }


    /**
     * Erzeugt ein neuen Port
     *
     * @param {string} [aPortName] - Name des Ports
     *
     * @return {PortInterface} plugin - Instanz des Ports
     */

    create( aPortName?: string, aRegisterFlag = true ): PortInterface {
        const portName = aPortName || 'Port';
        try {
            return this._newPort( portName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'PortFactory.create', aException );
            return null;
        }
    }

}
