/**
 * Diese Komponente liest eine Datei in den Browser als String
 *
 * Letzte Aenderung: 09.05.2019
 * Status: rot
 * 
 * @module file/reader
 * @author SB
 */


// core

import { Plugin } from '../../core/plugin/plugin';


// common

import { XMLHTTPREQUEST_TEXT_RESPONSETYPE } from './../../common/html5/file-html5-reader.interface';
import { FileHtml5Reader } from './../../common/html5/file-html5-reader';


// file

import { FILEREADER_PLUGIN_NAME } from '../const/file-const';
import { FileReaderInterface, FileReaderReadFunc, OnFileReaderReadFunc } from './file-reader.interface';


// TODO: Klasse muss mit FileHtml5Reader umgeschrieben werden, alternativ muss auch FileNodeReader mit eingebaut werden!
//       Damit wird das Plugin faehig, sowohl im Browser, wie auch in Node zu laufen.


/**
 * FileReader Klasse zum Laden einer Datei in HTML5 mit XMLHttpRequest
 */

export class FileReader extends Plugin implements FileReaderInterface {

    // interne Implementierungsklasse zum Einlesen von Dateien aus dem Browser

    mFileHtml5Reader: FileHtml5Reader = null;


    /**
     * Creates an instance of FileReader.
     *
     * @param {boolean} aRegisterFlag - wenn true, wird das Plugin in den PluginManager eingetragen
     */

    constructor( aRegisterFlag = true ) {
        super( FILEREADER_PLUGIN_NAME, aRegisterFlag );
        this.mFileHtml5Reader = new FileHtml5Reader();
        // verbinden der Errorfunktion mit dem ErrorEvent
        this.mFileHtml5Reader.onError = this.onError;
    }


    /**
     * Rueckgabe eines logischen Plugin-Typs
     *
     * @return {string} pluginType - logischer Typ des Plugins fuer unterschiedliche Anwendungsschnittstellen
     */

    getType(): string {
        return 'FileReader';
    }


    getClass(): string {
        return 'FileReader';
    }


    /**
     * Initialisierung von FileReader
     *
     * @param {any} [aOptions] - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOptions?: any ): number {
        // pruefen auf doppelte Initialisierung

        if ( this.isInit()) {
            this._error( 'init', 'init doppelt aufgerufen' );
            return -1;
        }

        // FileHtml5Reader initialisieren

        if ( this.mFileHtml5Reader.init( aOptions ) != 0 ) {
            return -1;
        }

        return super.init( aOptions );
    }


    /**
     * Freigabe der Komponente
     */

    done(): number {
        this.mFileHtml5Reader.done();
        return super.done();
    }


    // Error-Funktionen

    
    _setErrorOutput( aOutputFlag: boolean): void {
        super._setErrorOutput( aOutputFlag );
        this.mFileHtml5Reader._setErrorOutput( aOutputFlag );
    }


    // FileReader-Funktionen


    getReadFunc(): FileReaderReadFunc {
        return (aFileUrl: string) => {
            return this.read( aFileUrl );
        };
    }


    /**
     * Einlesen einer Datei
     *
     * @param {string} aFileUrl - Pfad fuer einzulesende Datei
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    read( aFileUrl: string ): number {
        // console.log('FileReader.loadDialogFile:', aFileUrl);
        if ( !this.isInit()) {
            this._error( 'read', 'nicht initialisiert' );
            return -1;
        }
        return this.mFileHtml5Reader._loadFile( aFileUrl, XMLHTTPREQUEST_TEXT_RESPONSETYPE );
    }


    /**
     * Laden einer Datei
     *
     * @public
     * @param {string} aUrl - Pfad fuer einzulesende Datei
     * @return {number} errorCode(0,-1) - Fehlercode
     * @deprecated
     */

    loadDialogFile( aUrl: string ): number {
        return this.read( aUrl );
    }


    /**
     * onRead Callback-Funktion eintragen
     *
     * @param {OnFileReaderReadFunc} aReadFunc - Callback fuer Dateidaten geladen
     */

    set onRead( aReadFunc: OnFileReaderReadFunc ) {
        this.mFileHtml5Reader.onRead = aReadFunc;
    }


    /**
     * Dialogdaten laden Callback-Funktion eintragen
     *
     * @param {OnFileReaderReadFunc} aReadFunc - Callback fuer Dialogdaten laden
     * @deprecated
     */

    set onLoadDialogFile( aReadFunc: OnFileReaderReadFunc ) {
        this.mFileHtml5Reader.onRead = aReadFunc;
    }

}
