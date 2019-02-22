/**
 * Dieses Programm transformiert die Speech-Def Dateien in
 * Dialog Datenobjekte im Dialog-Store.
 *
 * Letzte Aenderung: 07.09.2018
 * Status: gelb
 *
 * @module dialog/parser
 * @author SB
 */


// plugin

import { Plugin } from '../../core/plugin/plugin';


// dialog

import {
    DIALOG_GROUP_NODE,
    DIALOG_ACTION_NODE,
    DIALOG_SPEAK_NODE,
    DIALOG_WAIT_NODE
} from '../dialog-const';

import { DialogNodeInterface } from '../store/dialog-node.interface';
import { DialogStateInterface } from '../store/dialog-state.interface';
import { DialogObjectInterface } from '../store/dialog-object.interface';
import { StoreNewDialogFunc, StoreNewDialogStateFunc } from '../store/store.interface';
import { ParserInterface, OnParserEndFunc, ParserSpeechDefFileFunc, ParserSpeechDefDataFunc } from './parser.interface';
import { PARSER_PLUGIN_NAME } from './parser-const';


/**
 * Speech-Def Parser Klasse
 */

export class ParserPlugin extends Plugin implements ParserInterface {

    // Event-Funktionen

    mOnParserEndFunc: OnParserEndFunc = null;

    // Funktionen

    mNewDialogFunc: StoreNewDialogFunc = null;
    mNewDialogStateFunc: StoreNewDialogStateFunc = null;


    /**
     * Creates an instance of DialogParser
     *
     * @param {DialogStore} aDialogStore - Dialogspeicherobjekt
     */

    constructor( aRegisterFlag = true ) {
        super( PARSER_PLUGIN_NAME, aRegisterFlag );
        this._setErrorClassName( 'ParserPlugin' );
    }


    /**
     * Initialisierung des Parsers
     *
     * @param {any} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    init( aOption?: any ): number {
        return super.init( aOption );
    }


    /**
     * Freigabe des Parsers
     *
     * @return {number} Fehlercode 0 oder -1
     */

    done(): number {
        // Event-Funktionen
        this.mOnParserEndFunc = null;
        // Funktionen
        this.mNewDialogFunc = null;
        this.mNewDialogStateFunc = null;
        return super.done();
    }


    // Event-Funktionen


    _onParserEnd(): number {
        // console.log('ParserPlugin._onParserEnd');
        if ( typeof this.mOnParserEndFunc === 'function' ) {
            try {
                // console.log('ParserPlugin._onParserEnd: funktion ausfuehren');
                return this.mOnParserEndFunc();
            } catch ( aException ) {
                this._exception( '_onParserEnd', aException );
                return -1;
            }
        }
        return 0;
    }


    set onParserEnd( aOnParserEndFunc: OnParserEndFunc ) {
        this.mOnParserEndFunc = aOnParserEndFunc;
    }


    // Store-Funktionen


    /**
     * Neuen Dialog aus dem Store zurueckgeben
     *
     * @private
     * @param aDialogName - Name des zurueckzugebenden Dialogs
     *
     * @return {DialogObjectInterface} Rueckgabe des Dialogdatenobjektes
     */

    _newDialog( aDialogName: string ): DialogObjectInterface {
        if (typeof this.mNewDialogFunc === 'function' ) {
            return this.mNewDialogFunc( aDialogName );
        }
        return null;
    }


    /**
     * Neuen DialogZustand aus dem Store zurueckgeben
     *
     * @private
     * @param aDialogName - Name des zurueckzugebenden Dialogs
     * @param aStateName - Name des zurueckzugebenden Dialogzustands
     * @param aStateId - Name der zurueckzugebenden Dialogzustandsnummer
     *
     * @return {DialogStateInterface} Rueckgabe des Dialogzustandsdatenobjektes
     */

    _newDialogState( aDialogName: string, aStateName: string, aStateId: number ): DialogStateInterface {
        if (typeof this.mNewDialogStateFunc === 'function' ) {
            return this.mNewDialogStateFunc( aDialogName, aStateName, aStateId );
        }
        return null;
    }


    // Parser-Funktionen


    /**
     * Parser fuer speech.def Datei. Liest die Def-Daten ein und uebertraegt sie
     * in den DialogStore.
     *
     * @param {string} aDefFileName - Name der einzulesenden Def-Datei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    parseSpeechDefFile( aDefFileName: string ): number {
        // debug('parseSpeechDefFile:', aDefFileName);
        if ( !aDefFileName ) {
            this._error( 'parseSpeechDefFile', 'kein Dateiname uebergeben' );
            return -1;
        }
        try {
            // TODO: fs muss durch eine eigene kompatible Bibliothek zum Laden von Dateien ersetzt werden
            // const speechDef = String(fs.readFileSync(aDefFileName));
            // return this.parseSpeechDefData(speechDef);
            this._error( 'parseSpeechDefFile', 'nicht implementiert' );
            return 0;
        } catch ( aException ) {
            this._exception( 'parseSpeechDefFile', aException );
            return -1;
        }
    }


    /**
     * Parser fuer speech.def Daten.
     *
     * @param {string} aDefData - String der speech.def Daten
     *
     * @return {number} errorCode (0,-1) -Fehlercode
     */

    parseSpeechDefData( aDefData: string ): number {
        // debug('parseSpeechDefData: start');
        if (!aDefData) {
            this._error( 'parseSpeechDefData', 'keine Def-Daten uebergeben' );
            return -1;
        }

        const speechDefArray = aDefData.split('\n');
        // console.log('ParserPlugin.parseSpeechDefData: speechDefArray=', speechDefArray);

        // Umwandeln in Objektdaten

        const lineArray = [];
        let token = '';
        let dialogName = '';
        let dialogObject: DialogObjectInterface = null;
        let stateObject: DialogStateInterface = null;
        let nodeObject: DialogNodeInterface = null;
        let stateIdCount = 0;
        let nodeIdCount = 0;
        let stateId = 0;
        let firstNodeId = 0;
        let paramArray = [];
        let speechDefLine = '';
        let nextSpeechDefLine = '';
        let id = 0;
        let nextId = 0;
        let name = '';
        let objectType = '';
        let objectName = '';
        let text = '';
        let timeout = 0;
        let pos = 0;
        let groupId = 0;
        let groupProperty = '';
        let groupEndFlag = false;

        try {
            for ( let index = 0; index < speechDefArray.length; ++index ) {
                speechDefLine = speechDefArray[ index ].trim();
                // debug('speechDefLine: ', speechDefLine );
                // naechste Zeile einlesen fuer vorausschauendes parsen
                nextSpeechDefLine = '';
                if ( index < speechDefArray.length - 1 ) {
                    nextSpeechDefLine = speechDefArray[ index + 1 ].trim();
                }
                // pruefen auf leere Zeile
                if ( !speechDefLine ) {
                    continue;
                }
                // pruefen auf Kommentar
                pos = speechDefLine.indexOf( '#' );
                if ( pos === 0 ) {
                    // debug('parse KOMMENTAR: ', speechDefLine);
                    continue;
                }
                // Token einlesen
                pos = speechDefLine.indexOf( ' ' );
                // console.log('ParserPlugin.parseSpeechDefData: pos', pos);
                if ( pos === -1 ) {
                    pos = speechDefLine.length;
                }
                token = speechDefLine.substr( 0, pos );
                // pruefen auf Gruppenende
                if ( nextSpeechDefLine === 'GROUPEND' ) {
                    groupEndFlag = true;
                    nextSpeechDefLine = '';
                    if ( index < speechDefArray.length - 2 ) {
                        nextSpeechDefLine = speechDefArray[ index + 2 ].trim();
                    }
                }
                // Parameter fuer Token auslesen
                speechDefLine = speechDefLine.substr( pos + 1, speechDefLine.length );
                paramArray = speechDefLine.split( ',' );
                // console.log( 'ParserPlugin.parseSpeechDefData: start parsing', token, paramArray);
                // Auswahl des Dialog-Elements
                switch ( token ) {

                    case 'DIALOG':
                        dialogName = paramArray[ 0 ].trim();
                        dialogObject = this._newDialog( dialogName );
                        // debug('parse DIALOG: ', dialogName);
                        break;

                    case 'STATE':
                        stateIdCount++;
                        stateId = stateIdCount;
                        name = paramArray[ 0 ].trim();
                        firstNodeId = 0;
                        stateObject = this._newDialogState( dialogName, name, stateId );
                        // debug('parse STATE:', stateId, name, dialogName);
                        break;

                    case 'GROUP':
                        nodeIdCount++;
                        id = nodeIdCount;
                        if ( firstNodeId === 0 ) {
                            firstNodeId = id;
                        }
                        groupProperty = paramArray[ 0 ].trim();
                        nextId = id + 1;
                        if ( !nextSpeechDefLine ) {
                            nextId = 0;
                        }
                        groupId = id;
                        nodeObject = stateObject.newDialogNode( DIALOG_GROUP_NODE, id, 0, nextId );
                        nodeObject.setProperty( groupProperty );
                        // debug('parse GROUP:', id, stateId, nextId, groupProperty);
                        break;

                    case 'GROUPEND':
                        break;

                    case 'ACTION':
                        nodeIdCount++;
                        id = nodeIdCount;
                        if ( firstNodeId === 0 ) {
                            firstNodeId = id;
                        }
                        name = paramArray[ 0 ].trim();
                        objectType = paramArray[ 1 ].trim();
                        objectName = paramArray[ 2 ].trim();
                        nextId = id + 1;
                        if ( !nextSpeechDefLine ) {
                            nextId = 0;
                        }
                        nodeObject = stateObject.newDialogNode( DIALOG_ACTION_NODE, id, groupId, nextId );
                        nodeObject.setName( name );
                        nodeObject.setObjectType( objectType );
                        nodeObject.setObjectName( objectName );
                        nodeObject.setProperty( groupProperty );
                        // debug('parse ACTION:', id, stateId, groupId, nextId, name, objectType, objectName);
                        break;

                    case 'SPEAK':
                        nodeIdCount++;
                        id = nodeIdCount;
                        if ( firstNodeId === 0 ) {
                            firstNodeId = id;
                        }
                        timeout = parseInt( paramArray[ 0 ].trim(), 10 ) * 1000;
                        text = paramArray[ 1 ].trim();
                        for ( let i = 2; i < paramArray.length; i++ ) {
                            text += ',' + paramArray[ i ].trim();
                        }
                        nextId = id + 1;
                        if ( !nextSpeechDefLine ) {
                            nextId = 0;
                        }
                        nodeObject = stateObject.newDialogNode( DIALOG_SPEAK_NODE, id, groupId, nextId );
                        nodeObject.setTimeout( timeout );
                        nodeObject.setText( text );
                        nodeObject.setProperty( groupProperty );
                        // debug('parse SPEAK:', id, stateId, groupId, nextId, text, timeout);
                        break;

                    case 'WAIT':
                        nodeIdCount++;
                        id = nodeIdCount;
                        if ( firstNodeId === 0 ) {
                            firstNodeId = id;
                        }
                        timeout = parseInt( paramArray[ 0 ].trim(), 10 ) * 1000;
                        nextId = id + 1;
                        if ( !nextSpeechDefLine ) {
                            nextId = 0;
                        }
                        nodeObject = stateObject.newDialogNode( DIALOG_WAIT_NODE, id, groupId, nextId );
                        nodeObject.setTimeout( timeout );
                        nodeObject.setProperty( groupProperty );
                        // debug('parse SPEAK:', id, stateId, groupId, nextId, text, timeout);
                        break;

                    case '':
                        break;

                    default:
                        // console.log('ParserPlugin.parseSpeechDefData: Daten = ', aDefData);
                        this._error( 'parseSpeechDefData', 'ParserFehler' );
                        return -1;
                        // break;
                }

                // pruefen auf Gruppenende
                if (groupEndFlag) {
                    groupId = 0;
                    groupProperty = '';
                    groupEndFlag = false;
                    // debug('parse GROUPEND:');
                }
            }
            // Parser-Ende Ereignis erzeugen
            return this._onParserEnd();
        } catch ( aException ) {
            this._exception( 'parseSpeechDefData', aException );
            return -1;
        }
    }


    // Bind-Funktionen


    getParseSpeechDefFileFunc(): ParserSpeechDefFileFunc {
        return (aFileName: string) => {
            return this.parseSpeechDefFile( aFileName );
        };
    }


    getParseSpeechDefDataFunc(): ParserSpeechDefDataFunc {
        return (aFileName: string) => {
            return this.parseSpeechDefData( aFileName );
        };
    }


    setNewDialogFunc( aNewDialogFunc: StoreNewDialogFunc ): number {
        this.mNewDialogFunc = aNewDialogFunc;
        return 0;
    }


    setNewDialogStateFunc( aNewDialogStateFunc: StoreNewDialogStateFunc ): number {
        this.mNewDialogStateFunc = aNewDialogStateFunc;
        return 0;
    }

}
