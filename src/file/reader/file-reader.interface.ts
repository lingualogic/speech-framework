/** @packageDocumentation
 * FileReader Schnittstelle
 *
 * Version: 1.0
 * Datum:   01.06.2020
 *
 * @module file/reader
 * @author SB
 */


// core

import { PluginInterface } from '@speech/core';


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
