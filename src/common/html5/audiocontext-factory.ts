/**
 * Diese Komponente dient als Fabrik zur Erzeugung der Audio-Klassen und -Instanzen fuer Audio
 *
 * Letzte Aenderung: 11.12.2018
 * Status: gelb
 *
 * @module common/html5
 * @author SB
 */


// core

import { Factory } from './../../core/factory/factory';


// Konstanten

export const AUDIOCONTEXT_FACTORY_NAME = 'AudioContextFactory';
export const AUDIOCONTEXT_TYPE_NAME = 'AudioContext';


/**
 * Diese Klasse kapselt die Pruefung und Erzeugung der HTML5-AudioContext Klasse
 */

export class AudioContextFactory extends Factory {


    constructor( aFactoryName?: string, aRegisterFlag = true ) {
        super( aFactoryName || AUDIOCONTEXT_FACTORY_NAME, aRegisterFlag );
    }


    isMock(): boolean {
        return false;
    }


    getType(): string {
        return AUDIOCONTEXT_TYPE_NAME;
    }


    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */

    getName(): string {
        return AUDIOCONTEXT_FACTORY_NAME;
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
        const name = aObjectName || AUDIOCONTEXT_TYPE_NAME;
        // console.log('AudioContextFactory.create:', (window as any).AudioContext);
        try {
            return (window as any).AudioContext || (window as any).webkitAudioContext || null;
        } catch (aException) {
            this._exception( 'create', aException );
            return null;
        }
    }

}
