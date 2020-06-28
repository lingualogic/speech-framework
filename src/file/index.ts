/** @packageDocumentation
 * Globale Export-Datei fuer File
 *
 * Version: 1.0
 * Datum:   31.05.2020
 *
 * Definiert das gesamte File-API:
 *
 * @module file
 * @author SB
 */


// Global API

export * from './const/file-const';
export { FileReaderFactory } from './reader/file-reader-factory';
export { FileReaderInterface, FileReaderReadFunc, OnFileReaderReadFunc } from './reader/file-reader.interface';
export { FileReader } from './reader/file-reader';
