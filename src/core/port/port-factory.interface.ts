/**
 * PortFactory-Interface fuer die Erzeugung von Port-Komponenten
 *
 * Letzte Aenderung: 15.12.2018
 * Status: rot
 *
 * @module core/port
 * @author SB
 */


// factory

import { FactoryInterface } from './../factory/factory.interface';


// port

import { PortInterface } from './port.interface';



/**
 * Erzeugt einen neuen Port
 *
 * @export
 * @interface PortFactoryInterface
 */

export interface PortFactoryInterface extends FactoryInterface {


    /**
     * Erzeugt eine neue Port-Komponente zum uebergebenen Port Namen
     *
     * @param {string} aPortName - Name des zu erzeugenden Ports
     * @param {boolean} aRegisterFlag - true, wenn Port global im PortManager eingetragen werden soll
     *
     * @return {PortInterface} - Port Instanz oder null
     */

    create( aPortName?: string, aRegisterFlag?: boolean ): PortInterface;
}
