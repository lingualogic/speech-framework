/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer ListenComponent
 * ListenComponent wird als Singleton verwaltet
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gruen
 *
 * @module listen/component
 * @author SB
 */


// plugin

import { PluginFactory } from '@speech/core';


// listen

import { LISTEN_TYPE_NAME, LISTEN_COMPONENTFACTORY_NAME, LISTEN_COMPONENT_NAME, LISTEN_MOCK_NAME } from '../listen-const';
import { ListenComponentInterface } from './listen-component.interface';
import { ListenComponent } from './listen-component';


// Global API

export class ListenComponentFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'ListenComponentFactory' );
    }

    getName(): string {
        return LISTEN_COMPONENTFACTORY_NAME;
    }

    getType(): string {
        return LISTEN_TYPE_NAME;
    }


    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): ListenComponentInterface {
        return new ListenComponent( aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen der Listen
     * zurueckgeben, einschließlich eines Listen-Mocks.
     *
     * @param {string} aListenName - Name der zu erzeugenden Listen Komponente
     * @param {boolean} aRegisterFlag - wenn true, dann in PluginManager eintragen
     *
     * @return {ListenComponentInterface} Listen wird zurueckgegeben
     */

    create( aListenName?: string, aRegisterFlag = true ): ListenComponentInterface {
        const listenName = aListenName || LISTEN_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( listenName === LISTEN_MOCK_NAME ) {
            // TODO: Einbau des Listen-Mocks
            // return new ListenMock();
        }

        // Listen-Singleton erzeugen

        try {
            return this._newPlugin( listenName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }
    }

}
