/**
 * FileReader Schnittstelle
 *
 * Version: 1.0
 * Datum:   28.06.2018
 *
 * @module file/reader
 * @author SB
 */


// plugin

import { PluginInterface } from '../../core/plugin/plugin.interface';


// Funktionen

export type FileReaderReadFunc = (aFileUrl: string) => number;

// Events

export type OnFileReaderReadFunc = (aFileData: string) => number;


export interface FileReaderInterface extends PluginInterface {

    // Lese-Funktion

    onRead: OnFileReaderReadFunc;
    // @deprecated
    onLoadDialogFile: OnFileReaderReadFunc;

    getReadFunc(): FileReaderReadFunc;
    read(aFileUrl: string): number;


    // @deprecated
    loadDialogFile( aUrl: string ): number;
}
