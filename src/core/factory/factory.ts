/**
 * Factory zur Erzeugung von Objekten
 *
 * Letzte Aenderung: 04.10.2018
 * Status: gruen
 *
 * @module core/factory
 * @author SB
 */


// error

import { ErrorBase } from '../error/error-base';


// factory

import { FactoryManager } from './factory-manager';
import { FactoryInterface } from './factory.interface';


/**
 * Implementiert die Factory
 *
 * @export
 * @class Factory
 * @implements {FactoryInterface}
 */

export class Factory extends ErrorBase implements FactoryInterface {

    /**
     * Creates an instance of Factory.
     *
     * @param {string} aFactoryName - Name der Factory
     */

    constructor( aFactoryName?: string, aRegisterFlag = true ) {
        super( aFactoryName || 'Factory' );
        if ( aRegisterFlag ) {
            if ( FactoryManager.insert( this.getName(), this ) !== 0 ) {
                throw new Error('Factory ' + this.getName() + ' existiert bereits im FactoryManager');
            }
        }
    }

    isMock(): boolean {
        return false;
    }


    getType(): string {
        return 'any';
    }


    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return 'Factory';
    }


    /**
     * Erzeugt ein neues Objket
     *
     * @param {string} aObjectName - Name des Objektes
     * @param {boolean} aRegisterFlag - bestimmt, ob Objekt in einen Manager eingetragen wird
     *
     * @return {any} Instanz des Objektes
     */

    create( aObjectName?: string, aRegisterFlag = true ): any {
        return null;
    }

}
