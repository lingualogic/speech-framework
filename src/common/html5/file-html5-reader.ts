/** @packageDocumentation
 * HTML5 Base FileReader ohne Abhaengigkeiten zu anderen Komponenten
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module common/html5
 * @author SB
 */


// core

import { FactoryManager, ErrorBase } from '@speech/core';


// common

import { XMLHttpRequestFactory, XMLHTTPREQUEST_FACTORY_NAME } from './xmlhttprequest-factory';
import { FileHtml5ReaderInterface, OnFileHtml5ReaderReadFunc, OnFileHtml5ErrorFunc, XMLHTTPREQUEST_TEXT_RESPONSETYPE } from './file-html5-reader.interface';


/**
 * FileHtml5Reader zum Einlesen von Dateien im Browser
 */

export class FileHtml5Reader extends ErrorBase implements FileHtml5ReaderInterface {


    /**
     * XMLHttpRequest-Klasse fuer das einlesen der Datei
     * @member {Object} mXMLHttpRequestClass
     * @private
     */
    mXMLHttpRequestClass: any = null;


    /**
     * Request fuer das einlesen der Datei
     * @member {Object} mRequest
     * @private
     */
    mRequest: any = null;


    /**
     * Callback-Funktion fuer Read-Event
     * @member {callback} mOnReadFunc
     * @private
     */
    mOnReadFunc: OnFileHtml5ReaderReadFunc = null;


    /**
     * Callback-Funktion fuer Error-Event
     * @member {callback} mOnErrorFunc
     * @private
     */

    mOnErrorFunc: OnFileHtml5ErrorFunc = null;


    /**
     * Creates an instance of FileHtml5Reader.
     */

    constructor( aClassName?: string ) {
        super( aClassName || 'FileHtml5Reader' );
        // verbinden der Errorfunktion mit dem ErrorEvent
        this._setErrorOutputFunc((aErrorText: string) => this._onError( new Error( aErrorText )));
    }


    /**
     * Initialisierung von FileReader
     *
     * @param {*} aOptions - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        // pruefen auf vorhandenen XMLHttpRequest in HTML5

        if ( !this._detectXMLHttpRequest()) {
            return -1;
        }
        return 0;
    }


    /**
     * Freigabe der Komponente
     */

    done(): number {
        this.mXMLHttpRequestClass = null;
        this.mRequest = null;
        this.mOnReadFunc = null;
        return 0;
    }


    /**
     * Feststellen, ob HTML5 XMLHttpRequest API vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn XMLHttpRequest existiert, false sonst
     */

    _detectXMLHttpRequest(): boolean {
        // console.log('NuanceConfigReader._detectXMLHttpRequest:', window.XMLHttpRequest);

        // Initialisierung der XMLHttpRequestFactory, ist noch keine Fabrik vorhanden, wird sie eingetragen
        const xmlHttpRequestFactory = FactoryManager.get( XMLHTTPREQUEST_FACTORY_NAME, XMLHttpRequestFactory ) as XMLHttpRequestFactory;
        if ( !xmlHttpRequestFactory ) {
            this._error( '_detectXMLHttpRequest', 'keine File-Fabrik vorhanden' );
            return false;
        }

        this.mXMLHttpRequestClass = xmlHttpRequestFactory.create();
        if ( this.mXMLHttpRequestClass === null ) {
            this._error( '_detectXMLHttpRequest', 'kein XMLHttpRequest vorhanden' );
            return false;
        }

        return true;
    }


    // Event-Funktionen


    /**
     * Ereignisfunktion fuer Fehler aufrufen
     *
     * @private
     * @param {any} aError - Error Datentransferobjekt
     * @return {number} errorCode(0,-1)
     */

    _onError( aError: any ): number {
        // console.log('FileHtml5Reader._onError:', aError);
        if (typeof this.mOnErrorFunc === 'function') {
            try {
                // console.log('FileHtml5Reader._onError: call', this.mOnErrorFunc);
                this.mOnErrorFunc( aError );
            } catch ( aException ) {
                if ( this.isErrorOutput()) {
                    // hier darf nicht this._exception() verwendet werden, da sonst eine Endlosschleife entstehen kann!
                    console.log( '===> EXCEPTION Plugin._onError: ', aException.message );
                }
                return -1;
            }
        }
        return 0;
    }
    

    _onLoad( aData: any, aStatus: number ): number {
        // console.log('FileHtml5Reader._onLoad:', aData, aStatus);
        if ( this.mOnReadFunc ) {
            try {
                // console.log('FileReader._onLoad:', aData, aStatus);
                if ( aStatus === 404 ) {
                    this._error( '_onLoad', 'Error 404' );
                } else {
                    this.mOnReadFunc( aData );
                }
            } catch (aException) {
                this._exception( '_onLoad', aException );
                return -1;
            }
        }
        return 0;
    }


    _onLoadEnd( aStatus: number ): number {
        // console.log('FileHtml5Reader._onLoadEnd:', aStatus);
        if ( aStatus === 404 ) {
            this._error( '_onLoadEnd', 'Error 404' );
            return -1;
        }
        return 0;
    }


    _onLoadError( aErrorEvent: any ): void {
        // TODO: muss in Fehlerbehandlung uebertragen werden
        // console.log('FileHtml5Reader._onLoadError:', aErrorEvent);
        // TODO: muss noch ausgebaut werden
        this._error( '_onLoadError', aErrorEvent );
    }


    _onLoadAbort( aEvent: any ): void {
        // TODO: muss in Fehlerbehandlung uebertragen werden
        // console.log('FileHtml5Reader._onLoadAbort:', aEvent);
        this._error( '_onLoadAbort', aEvent );
    }


    /**
     * XMLHttpRequest zum einlesen einer Datei ausfuehren
     *
     * @private
     * @param {string} aUrl - Adresse des zu ladenden Files
     * @param {string} aResponseType - optionale Angabe des XMLHttpRequest-ResponseTyps(text,arraybuffer)
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    _loadFile( aUrl: string, aResponseType: string ): number {
        if ( !this.mXMLHttpRequestClass ) {
            this._error( '_loadFile', 'kein XMLHttpRequest vorhanden' );
            return -1;
        }
        if ( !aUrl ) {
            this._error( '_loadFile', 'keine URL uebergeben' );
            return -1;
        }
        try {
            this.mRequest = new this.mXMLHttpRequestClass();
            this.mRequest.open('GET', aUrl, true);
            this.mRequest.responseType = aResponseType;
            // console.log('FileHtml5Reader._requestFile:', this.mRequest);
            const request = this.mRequest;
            this.mRequest.onload = () => this._onLoad( request.response, request.status );
            this.mRequest.onloadend = () => this._onLoadEnd( request.status );
            this.mRequest.onerror = ( aErrorEvent: any ) => this._onLoadError( aErrorEvent );
            this.mRequest.onabord = ( aEvent: any ) => this._onLoadAbort( aEvent );
            this.mRequest.send();
            return 0;
        } catch (aException) {
            this._exception( '_loadFile', aException );
            return -1;
        }
    }


    /**
     * onRead Callback-Funktion eintragen
     *
     * @param {*} aReadFunc - Callback fuer Dateidaten geladen
     */

    set onRead( aReadFunc: OnFileHtml5ReaderReadFunc ) {
        this.mOnReadFunc = aReadFunc;
    }


    /**
     * onError Callback-Funktion eintragen
     *
     * @param {*} aErrorFunc - Callback fuer Dateidaten geladen
     */

    set onError( aErrorFunc: OnFileHtml5ErrorFunc ) {
        this.mOnErrorFunc = aErrorFunc;
    }


    /**
     * Einlesen einer Datei
     *
     * @param {string} aFileUrl - optionale URL fuer fuer einzulesende Datei
     * @param {string} aResponseType - optionale Angabe des XMLHttpRequest-ResponseTyps(text,arraybuffer)
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    read( aFileUrl: string, aResponseType = XMLHTTPREQUEST_TEXT_RESPONSETYPE ): number {
        // console.log('FileHtml5Reader.read:', aFileUrl, aResponseType);
        return this._loadFile( aFileUrl, aResponseType );
    }

}
