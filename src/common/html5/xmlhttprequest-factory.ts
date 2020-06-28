/** @packageDocumentation
 * Diese Komponente dient als Fabrik zur Erzeugung der XMLHttpRequest-Klasse und -Instanz fuer FileReader
 * Sie wird nur im Browser verwendet.
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

export const XMLHTTPREQUEST_FACTORY_NAME = 'XMLHttpRequestFactory';
export const XMLHTTPREQUEST_TYPE_NAME = 'XMLHttpRequest';


/**
 * Die XMLHttpRequestFactory Klasse kapselt die Pruefung und Erzeugung der HTML5-XMLHttpRequest
 */

export class XMLHttpRequestFactory extends Factory {


    constructor( aFactoryName?: string, aRegisterFlag = true ) {
        super( aFactoryName || XMLHTTPREQUEST_FACTORY_NAME, aRegisterFlag );
    }


    isMock(): boolean {
        return false;
    }


    getType(): string {
        return XMLHTTPREQUEST_TYPE_NAME;
    }


    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return XMLHTTPREQUEST_FACTORY_NAME;
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
        // auslesen der XMLHttpRequest-Klasse, wenn vorhanden
        try {
            // return (window as any).XMLHttpRequest || null;
            return XMLHttpRequest || null;
        } catch (aException) {
            this._exception( 'create', aException );
            return null;
        }
    }


    /**  @deprecated
     * Feststellen, ob HTML5 XMLHttpRequest API vorhanden ist
     *
     * @return {XMLHttpRequest} xmlHttpRequestClass - Rueckgabe der XMLHttpRequest-Klasse
     */

    getXMLHttpRequestClass(): any {
        return this.create();
    }

}
