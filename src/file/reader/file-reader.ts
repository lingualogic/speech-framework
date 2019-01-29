/**
 * Diese Komponente liest eine Datei in den Browser als String
 *
 * @module file/reader
 * @author SB
 */


// core

import { FactoryManager } from './../../core/factory/factory-manager';
import { Plugin } from '../../core/plugin/plugin';


// common

import { XMLHttpRequestFactory, XMLHTTPREQUEST_FACTORY_NAME } from './../../common/html5/xmlhttprequest-factory';


// file

import { FILEREADER_PLUGIN_NAME } from '../const/file-const';
import { FileReaderInterface, FileReaderReadFunc, OnFileReaderReadFunc } from './file-reader.interface';


// TODO: Klasse muss mit FileHtml5Reader umgeschrieben werden, alternativ muss auch FileNodeReader mit eingebaut werden!
//       Damit wird das Plugin faehig, sowohl im Browser, wie auch in Node zu laufen.


/**
 * FileReader Klasse zum Laden einer Datei in HTML5 mit XMLHttpRequest
 */

export class FileReader extends Plugin implements FileReaderInterface {

    /**
     * Fabrik zur Erzeugung der Audioobjekte
     * @member {XMLHttpRequestFactory} mXMLHttpRequestFactory
     * @private
     */
    mXMLHttpRequestFactory: XMLHttpRequestFactory;

    /**
     * XMLHttpRequest fuer das einlesen der Datei
     * @member {Object} mXMLHttpRequest
     * @private
     */
    mXMLHttpRequest: any = null;

    /**
     * Request fuer das einlesen der Audiodaten
     * @member {Object} mRequest
     * @private
     */
    mRequest: any = null;

    /**
     * Callback-Funktion fuer LoadDialog-Event
     * @member {callback} mOnReadFile
     * @private
     */
    mOnReadFunc: OnFileReaderReadFunc = null;

    /**
     * Creates an instance of FileReader.
     *
     * @param {boolean} aRegisterFlag - wenn true, wird das Plugin in den PluginManager eingetragen
     */

    constructor( aRegisterFlag = true ) {
        super( FILEREADER_PLUGIN_NAME, aRegisterFlag );
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

        // Initialisierung der XMLHttpRequestFactory, ist noch keine Fabrik vorhanden, wird sie eingetragen

        this.mXMLHttpRequestFactory = FactoryManager.get( XMLHTTPREQUEST_FACTORY_NAME, XMLHttpRequestFactory ) as XMLHttpRequestFactory;

        // pruefen auf vorhandenen XMLHttpRequest in HTML5

        if ( !this._detectXMLHttpRequest()) {
            return -1;
        }

        return super.init( aOptions );
    }


    /**
     * Freigabe der Komponente
     */

    done(): number {
        this.mXMLHttpRequest = null;
        this.mRequest = null;
        this.mOnReadFunc = null;
        return super.done();
    }


    /**
     * Feststellen, ob HTML5 XMLHttpRequest API vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn XMLHttpRequest existiert, false sonst
     */

    _detectXMLHttpRequest(): boolean {
        // console.log('SpeechFile._detectXMLHttpRequest:', window.XMLHttpRequest);
        // pruefen auf Fabrik

        if ( !this.mXMLHttpRequestFactory ) {
            this._error( '_detectXMLHttpRequest', 'keine File-Fabrik vorhanden' );
            return false;
        }

        try {
            this.mXMLHttpRequest = this.mXMLHttpRequestFactory.getXMLHttpRequestClass();
        } catch (aException) {
            this._exception( '_detectXMLHttpRequest', aException );
            return false;
        }

        if ( this.mXMLHttpRequest === null ) {
            this._error( '_detectXMLHttpRequest', 'kein XMLHttpRequest vorhanden' );
            return false;
        }

        return true;
    }


    /**
     * XMLHttpRequest zum einlesen einer Datei ausfuehren
     *
     * @private
     * @param {string} aUrl
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    _requestDialogFile(aUrl: string): number {
        if ( !this.mXMLHttpRequest ) {
            this._error( '_requestDialogFile', 'kein XMLHttpRequest vorhanden' );
            return -1;
        }
        try {
            this.mRequest = new this.mXMLHttpRequest();
            this.mRequest.open('GET', aUrl, true);
            this.mRequest.responseType = 'text';

            // console.log('FileReader._requestDialogFile:', this.mRequest);
            const request = this.mRequest;

            this.mRequest.onload = () => {
                // console.log('FileReader._requestDialogFile: onload');
                if ( this.mOnReadFunc ) {
                    try {
                        this.mOnReadFunc( request.response );
                    } catch (aException) {
                        this._exception( '_requestDialogFile', aException );
                    }
                }
            };

            this.mRequest.onloadend = () => {
                if ( request.status === 404 ) {
                    this._error( '_requestDialogFile', 'Error 404' );
                }
            };

            this.mRequest.onerror = ( aErrorEvent: any ) => {
                // TODO: muss in Fehlerbehandlung uebertragen werden
                console.log('FileReader._loadAudioFile: onerror', aErrorEvent);
                this._onError(aErrorEvent);
            };

            this.mRequest.onabord = ( aEvent: any ) => {
                // TODO: muss in Fehlerbehandlung uebertragen werden
                console.log('FileReader._loadAudioFile: onabord', aEvent);
            };

            this.mRequest.send();
            return 0;
        } catch (aException) {
            this._exception( '_requestDialogFile', aException );
            return -1;
        }
    }


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
        return this._requestDialogFile( aFileUrl );
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
        this.mOnReadFunc = aReadFunc;
    }


    /**
     * Dialogdaten laden Callback-Funktion eintragen
     *
     * @param {OnFileReaderReadFunc} aReadFunc - Callback fuer Dialogdaten laden
     * @deprecated
     */

    set onLoadDialogFile( aReadFunc: OnFileReaderReadFunc ) {
        this.mOnReadFunc = aReadFunc;
    }

}
