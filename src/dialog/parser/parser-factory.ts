/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer Parser Version
 * Parser wird als Singleton verwaltet
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * @module dialog/parser
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// parser

import { PARSER_FACTORY_NAME, PARSER_PLUGIN_NAME, PARSER_MOCK_NAME } from './parser-const';
import { ParserInterface } from './parser.interface';
import { ParserPlugin } from './parser-plugin';


// Global API


/** @export
 * ParserFactory Klasse
 */

export class ParserFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'ParserFactory' );
    }


    getName(): string {
        return PARSER_FACTORY_NAME;
    }


    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): ParserInterface {
        return new ParserPlugin( aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen des Parser Plugins
     * zurueckgeben, einschließlich eines Parser-Mocks.
     *
     * @param {string} aPluginName - Name des zu erzeugenden Parser Plugins
     * @param {boolean} aRegisterFlag - wenn true, dann wird Plugin in PluginManager eingetragen
     *
     * @return {ParserInterface} Parser Plugin wird zurueckgegeben
     */

    create( aPluginName?: string, aRegisterFlag = true ): ParserInterface {
        const parserName = aPluginName || PARSER_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( parserName === PARSER_MOCK_NAME ) {
            // TODO: Einbau des Parser-Mocks
            // return new ParserMock();
        }

        // Parser erzeugen

        try {
            return this._newPlugin( parserName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }
    }

}
