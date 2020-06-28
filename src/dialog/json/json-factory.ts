/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer JSON Version
 * JSON wird als Singleton verwaltet
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module dialog/json
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// json

import { JSON_FACTORY_NAME, JSON_PLUGIN_NAME, JSON_MOCK_NAME } from './json-const';
import { JsonInterface } from './json.interface';
import { JsonPlugin } from './json-plugin';


// Global API


/** @export
 * JsonFactory Klasse
 */

export class JsonFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'JsonFactory' );
    }


    getName(): string {
        return JSON_FACTORY_NAME;
    }


    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): JsonInterface {
        return new JsonPlugin( aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen des Json Plugins
     * zurueckgeben, einschließlich eines Json-Mocks.
     *
     * @param {string} aPluginName - Name des zu erzeugenden Json Plugins
     * @param {boolean} aRegisterFlag - wenn true, dann wird Plugin in PluginManager eingetragen
     *
     * @return {JsonInterface} Json Plugin wird zurueckgegeben
     */

    create( aPluginName?: string, aRegisterFlag = true ): JsonInterface {
        const jsonName = aPluginName || JSON_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( jsonName === JSON_MOCK_NAME ) {
            // TODO: Einbau des Mocks
            // return new JsonMock();
        }

        // Json erzeugen

        try {
            return this._newPlugin( jsonName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }
    }

}
