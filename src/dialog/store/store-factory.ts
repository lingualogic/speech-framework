/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer Store Version
 * Store wird als Singleton verwaltet
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * @module dialog/store
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// store

import { STORE_FACTORY_NAME, STORE_PLUGIN_NAME, STORE_MOCK_NAME } from './store-const';
import { StoreInterface } from './store.interface';
import { StorePlugin } from './store-plugin';


// Global API

export class StoreFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'StoreFactory' );
    }

    getName(): string {
        return STORE_FACTORY_NAME;
    }


    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): StoreInterface {
        return new StorePlugin( aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen des Store Plugins
     * zurueckgeben, einschließlich eines Store-Mocks.
     *
     * @param {string} aPluginName - Name des zu erzeugenden Store Plugins
     * @param {boolean} aRegisterFlag - wenn true, dann wird Plugin in PluginManager eingetragen
     *
     * @return {StoreInterface} Store Plugin wird zurueckgegeben
     */

    create( aPluginName?: string, aRegisterFlag = true ): StoreInterface {
        const storeName = aPluginName || STORE_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( storeName === STORE_MOCK_NAME ) {
            // TODO: Einbau des Store-Mocks
            // return new StoreMock();
        }

        // Store erzeugen

        try {
            return this._newPlugin( storeName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }
    }

}
