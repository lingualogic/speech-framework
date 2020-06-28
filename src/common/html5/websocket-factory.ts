/** @packageDocumentation
 * Diese Komponente dient als Fabrik zur Erzeugung der Html5 WebSocket-Klasse und -Instanz
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module common/html5
 * @author SB
 */


// core

import { Factory } from '@speech/core';


// Konstanten

export const WEBSOCKET_FACTORY_NAME = 'WebSocketFactory';
export const WEBSOCKET_TYPE_NAME = 'WebSocket';


/**
 * Die WebSocketFactory Klasse kapselt die Pruefung und Erzeugung der HTML5-WebSocket
 */

export class WebSocketFactory extends Factory {


    constructor( aFactoryName?: string, aRegisterFlag = true ) {
        super( aFactoryName || WEBSOCKET_FACTORY_NAME, aRegisterFlag );
    }


    isMock(): boolean {
        return false;
    }


    getType(): string {
        return WEBSOCKET_TYPE_NAME;
    }


    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return WEBSOCKET_FACTORY_NAME;
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
        // auslesen der WebSocket-Klasse, wenn vorhanden
        try {
            return (window as any).WebSocket || null;
        } catch (aException) {
            this._exception( 'create', aException );
            return null;
        }
    }

}
