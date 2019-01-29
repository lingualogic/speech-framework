/**
 * Globale Fabrik zur Erzeugung eines FileReader Plugins
 *
 * Version: 1.1
 * Datum:   23.07.2018
 *
 * @module file/reader
 * @author SB
 */


// plugin

import { PluginFactory } from '../../core/plugin/plugin-factory';


// file

import { FILEREADER_FACTORY_NAME, FILEREADER_PLUGIN_NAME, FILEREADER_MOCK_NAME } from '../const/file-const';
import { FileReaderInterface } from './file-reader.interface';
import { FileReader } from './file-reader';


// Global API

export class FileReaderFactory extends PluginFactory {

    /**
     * Erzeugt die Factory
     */

    constructor() {
        super( 'FileReaderFactory' );
    }

    getName(): string {
        return FILEREADER_FACTORY_NAME;
    }

    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): FileReaderInterface {
        return new FileReader( aRegisterFlag );
    }


    /**
     * Kann verschiedene Versionen des FileReader
     * zurueckgeben, einschließlich eines FileReader-Mocks.
     *
     * @param {string} aReaderName - Name der zu erzeugenden FileReader-Komponente
     * @param {boolean} aRegisterFlag - wenn gesetztm, wird das Plugin in den PluginManager eingetragen
     *
     * @return {FileReaderInterface} fileReader wird zurueckgegeben
     */

    create( aReaderName?: string, aRegisterFlag = true ): FileReaderInterface {
        const readerName = aReaderName || FILEREADER_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( readerName === FILEREADER_MOCK_NAME ) {
            // TODO: Einbau des FileReader-Mocks
            // return new FileReaderMock();
        }

        // FileReader erzeugen

        try {
            return this._newPlugin( readerName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }
    }

}
