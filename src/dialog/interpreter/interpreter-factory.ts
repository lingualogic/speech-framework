/** @packageDocumentation
 * Globale Fabrik zur Erzeugung einer Interpreter Version
 * Interpreter wird als Singleton verwaltet
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * @module dialog/interpreter
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// interpreter

import { INTERPRETER_FACTORY_NAME, INTERPRETER_PLUGIN_NAME, INTERPRETER_MOCK_NAME } from './interpreter-const';
import { InterpreterInterface } from './interpreter.interface';
import { InterpreterPlugin } from './interpreter-plugin';


// Global API

export class InterpreterFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'InterpreterFactory' );
    }

    getName(): string {
        return INTERPRETER_FACTORY_NAME;
    }


    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): InterpreterInterface {
        return new InterpreterPlugin( aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen des Interpreters
     * zurueckgeben, einschließlich eines Interpreter-Mocks.
     *
     * @param {string} aPluginName - Name des zu erzeugenden Plugins
     * @param {boolean} aRegisterFlag - wenn true, dann wird Plugin in PluginManager eingetragen
     *
     * @return {InterpreterInterface} Interpreter wird zurueckgegeben
     */

    create( aPluginName?: string, aRegisterFlag = true ): InterpreterInterface {
        const pluginName = aPluginName || INTERPRETER_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( pluginName === INTERPRETER_MOCK_NAME ) {
            // TODO: Einbau des Interpreter-Mocks
            // return new InterpreterMock();
        }

        // Interpreter erzeugen

        try {
            return this._newPlugin( pluginName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }

    }

}
