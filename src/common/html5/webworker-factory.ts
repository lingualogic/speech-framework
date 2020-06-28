/** @packageDocumentation
 * Diese Komponente dient als Fabrik zur Erzeugung der WebWorker-Klasse und -Instanz fuer Net
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

export const WEBWORKER_FACTORY_NAME = 'WebWorkerFactory';
export const WEBWORKER_TYPE_NAME = 'WebWorker';


/**
 * Die WebWorkerFactory Klasse kapselt die Pruefung und Erzeugung der HTML5-WebWorker
 */

export class WebWorkerFactory extends Factory {


    constructor( aFactoryName?: string, aRegisterFlag = true ) {
        super( aFactoryName || WEBWORKER_FACTORY_NAME, aRegisterFlag );
    }


    isMock(): boolean {
        return false;
    }


    getType(): string {
        return WEBWORKER_TYPE_NAME;
    }


    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return WEBWORKER_FACTORY_NAME;
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
        // auslesen der WebWorker-Klassen, wenn vorhanden
        try {
            return (window as any).Worker || null;
        } catch (aException) {
            this._exception( 'create', aException );
            return null;
        }
    }


    /** @deprecated
     * Feststellen, ob HTML5 WebWorker API vorhanden ist
     *
     * @return {Worker} WorkerClass - Rueckgabe der WebWorker-Klasse
     */

    getWebWorkerClass(): typeof Worker {
        return this.create();
    }

    /** @deprecated
     * Rueckgabe einer Instanz der HTML5-WebWorker
     *
     * @param {string} aUrl - URL fuer die WebWorker Datei
     * @return {Worker} worker - Objekt zurueckgeben
     */

    createWebWorker( aUrl: string ): Worker | null {
        const workerClass = this.getWebWorkerClass();
        if ( !workerClass ) {
            return null;
        }
        try {
            return new workerClass( aUrl );
        } catch (aException) {
            this._exception( 'createWebWorker', aException );
            return null;
        }
    }

}
