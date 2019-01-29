/**
 * FactoryList zur Speicherung von Factories
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

import { FactoryInterface } from './factory.interface';


/**
 * Klasse FactoryList zur Speicherung von Factories
 *
 * @export
 * @class FactoryList
 */

export class FactoryList extends ErrorBase {

    mFactoryList = new Map<string, FactoryInterface>();
    mFactoryIterator: IterableIterator<FactoryInterface> = null;


    /**
     * Creates an instance of PluginFactoryList.
     */

    constructor() {
        super( 'FactoryList' );
        this.mFactoryIterator = this.mFactoryList.values();
    }


    /**
     * Rueckgabe der Anzahl vorhandener Factories
     *
     * @return {number} size - Anzahl der Factories in der Liste
     */

    getSize(): number {
        return this.mFactoryList.size;
    }


    /**
     * Eintragen einer Factory
     *
     * @param {string} aFactoryName - Name der Factory
     * @param {FactoryInterface} aFactory - Factory Instanz
     *
     * @return {number} Fehlercode 0 oder -1
     */

    insert( aFactoryName: string, aFactory: FactoryInterface ): number {
        try {
            if ( !aFactoryName ) {
                this._error( 'insert', 'kein Factoryname uebergeben' );
                return -1;
            }
            if ( !aFactory ) {
                this._error( 'insert', 'keine Factory uebergeben' );
                return -1;
            }
            if ( this.mFactoryList.has( aFactoryName )) {
                this._error( 'insert', 'Factory existiert bereits' );
                return -1;
            }
            this.mFactoryList.set( aFactoryName, aFactory );
            return 0;
        } catch ( aException ) {
            this._exception( 'insert', aException );
            return -1;
        }
    }


    /**
     * Zurueckgeben einer Factory
     *
     * @param {string} aFactoryName - Name der Factory
     * @returns {FactoryInterface} - Factory Instanz
     */

    find( aFactoryName: string ): FactoryInterface {
        try {
            return this.mFactoryList.get( aFactoryName );
        } catch ( aException ) {
            this._exception( 'find', aException );
            return undefined;
        }
    }


    /**
     * erste Factory der Liste zurueckgeben
     *
     * @return {FactoryInterface} - Factory Instanz
     */

    first(): FactoryInterface  {
        try {
            this.mFactoryIterator = this.mFactoryList.values();
            return this.mFactoryIterator.next().value;
        } catch ( aException ) {
            this._exception( 'first', aException );
            return undefined;
        }
    }


    /**
     * naechste Factory der Liste zurueckgeben. Es muss vorher einmal first aufgerufen werden.
     *
     * @return {FactoryInterface} - Factory Instanz
     */

    next(): FactoryInterface {
        try {
            return this.mFactoryIterator.next().value;
        } catch ( aException ) {
            this._exception( 'next', aException );
            return undefined;
        }
    }


    /**
     * Entfernen einer Factory aus der Liste
     *
     * @param {string} aFactoryName - Name der Factory
     * @return {number} Fehlercode 0 oder -1
     */

    remove( aFactoryName: string ): number {
        try {
            this.mFactoryList.delete( aFactoryName );
            return 0;
        } catch ( aException ) {
            this._exception( 'remove', aException );
            return -1;
        }
    }


    /**
     * Loeschen aller Factories
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    clear(): number {
        try {
            this.mFactoryList.clear();
            return 0;
        } catch ( aException ) {
            this._exception( 'clear', aException );
            return -1;
        }
    }

}
