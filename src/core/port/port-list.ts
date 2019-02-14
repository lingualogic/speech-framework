/**
 * Port-Liste zur Speicherung von Port-Komponenten
 *
 * Letzte Aenderung: 14.02.2019
 * Status: rot
 *
 * @module core/port
 * @author SB
 */


// error

import { ErrorBase } from './../error/error-base';


// port

import { PortInterface } from './port.interface';


/**
 * Klasse PortList zur Speicherung von Ports
 *
 * @export
 * @class PortList
 */

export class PortList extends ErrorBase {

    /**
     * Map mit allen erzeugten Ports
     */

    mPortList = new Map<string, PortInterface>();


    /**
     * Iterator fuer PortList
     */

    mPortIterator: IterableIterator<PortInterface>;


    /**
     * Erzeuge eine Instanz von PortList.
     */

    constructor() {
        super( 'PortList' );
        this.mPortIterator = this.mPortList.values();
    }


    /**
     * Rueckgabe der Anzahl vorhandener Ports
     *
     * @return {number} size - Anzahl der Ports in der Liste
     */

    getSize(): number {
        return this.mPortList.size;
    }


    /**
     * Eintragen eines Ports
     *
     * @param {string} aPortName - Name des Ports
     * @param {PortInterface} aPort - Port Instanz
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    insert( aPortName: string, aPort: PortInterface ): number {
        try {
            if ( !aPortName ) {
                this._error( 'insert', 'kein Portname uebergeben' );
                return -1;
            }
            if ( !aPort ) {
                this._error( 'insert', 'kein Port uebergeben' );
                return -1;
            }
            // console.log( 'PortList.insert: ', aPortName, this.mPortList.size, this.mPortList.has( aPortName ));
            if ( this.mPortList.has( aPortName )) {
                this._error( 'insert', 'Port existiert bereits: ' + aPortName );
                return -1;
            }
            // console.log('PortList.insert: Port wird eingetragen', aPortName, aPort);
            this.mPortList.set( aPortName, aPort );
            // console.log('PortList.insert: Port wurde eingetragen', this.mPortList.get( aPortName ));
            return 0;
        } catch ( aException ) {
            this._exception( 'insert', aException );
            return -1;
        }
    }


    /**
     * Zurueckgeben eines Ports
     *
     * @param {string} aPortName - Name des Ports
     * @returns {PortInterface} - Port Instanz
     */

    find( aPortName: string ): PortInterface {
        try {
            // const port = this.mPortList.get( aPortName );
            // console.log('PortList.find:', aPortName, port);
            // return port;
            return this.mPortList.get( aPortName );
        } catch ( aException ) {
            this._exception( 'find', aException );
            return undefined;
        }
    }


    /**
     * ersten Port der Liste zurueckgeben
     *
     * @return {PortInterface} - Port Instanz
     */

    first(): PortInterface  {
        try {
            this.mPortIterator = this.mPortList.values();
            return this.mPortIterator.next().value;
        } catch ( aException ) {
            this._exception( 'first', aException );
            return undefined;
        }
    }


    /**
     * naechsten Port der Liste zurueckgeben. Es muss vorher einmal first aufgerufen werden.
     *
     * @return {PortInterface} - Port Instanz
     */

    next(): PortInterface {
        try {
            return this.mPortIterator.next().value;
        } catch ( aException ) {
            this._exception( 'next', aException );
            return undefined;
        }
    }


    /**
     * Entfernen eines Ports aus der Liste
     *
     * @param {string} aPortName - Name des Ports
     * @return {number} errorCode(0,-1)
     */

    remove( aPortName: string ): number {
        try {
            // console.log('PortList.remove:', aPortName);
            this.mPortList.delete( aPortName );
            return 0;
        } catch ( aException ) {
            this._exception( 'remove', aException );
            return -1;
        }
    }


    /**
     * Loeschen der Liste
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    clear(): number {
        try {
            this.mPortList.clear();
            return 0;
        } catch ( aException ) {
            this._exception('clear', aException );
            return -1;
        }
    }

}
