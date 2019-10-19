/**
 * DialogComponentBuilder
 *
 * Letzte Aenderung: 07.09.2019
 * Status: gelb
 *
 * @module dialog/component
 * @author SB
 */


// builder

import { Builder } from '../../core/builder/builder';


// file

import { FILEREADER_FACTORY_NAME, FILEREADER_PLUGIN_NAME } from '../../file/const/file-const';
import { FileReaderFactory } from '../../file/reader/file-reader-factory';
import { FileReaderInterface } from '../../file/reader/file-reader.interface';


// store

import { STORE_FACTORY_NAME, STORE_PLUGIN_NAME } from '../store/store-const';
import { StoreFactory } from '../store/store-factory';
import { StoreInterface } from '../store/store.interface';


// json

import { JSON_FACTORY_NAME, JSON_PLUGIN_NAME } from '../json/json-const';
import { JsonFactory } from '../json/json-factory';
import { JsonInterface } from '../json/json.interface';


// parser

import { PARSER_FACTORY_NAME, PARSER_PLUGIN_NAME } from '../parser/parser-const';
import { ParserFactory } from '../parser/parser-factory';
import { ParserInterface } from '../parser/parser.interface';


// interpreter

import { INTERPRETER_FACTORY_NAME, INTERPRETER_PLUGIN_NAME } from '../interpreter/interpreter-const';
import { InterpreterFactory } from '../interpreter/interpreter-factory';
import { InterpreterInterface } from '../interpreter/interpreter.interface';


// dialog

import { DIALOG_TYPE_NAME, DIALOG_COMPONENTBUILDER_NAME, DIALOG_COMPONENTFACTORY_NAME, DIALOG_COMPONENT_NAME } from '../dialog-const';
import { DialogComponentFactory } from './dialog-component-factory';
import { DialogComponentInterface } from './dialog-component.interface';


/** @export
 * Klasse DialogComponentBuilder zum Erzeugen der Dialog-Komponente
 */

export class DialogComponentBuilder extends Builder {


    /**
     * Singleton der Dialog-Komponente
     */

    mDialogComponent: DialogComponentInterface = null;


    constructor( aBuilderName?: string, aRegisterFlag = true ) {
        super( aBuilderName || 'DialogComponentBuilder', aRegisterFlag );
    }


    getClass(): string {
        return 'DialogComponentBuilder';
    }


    /**
     * Name des Builders zurueckgeben
     *
     * @return {string} builderName
     */

    getName(): string {
        return DIALOG_COMPONENTBUILDER_NAME;
    }


    /**
     * Typ des Builders zurueckgeben
     *
     * @return {string} builderType
     */

    getType(): string {
        return DIALOG_TYPE_NAME;
    }


    // Builder-Funktionen


    /**
     * Hauptfunktion des Builders.
     *
     * @return {DialogComponentInterface} component - Rueckgabe der erzeugten Komponente oder null
     */

    build(): DialogComponentInterface {
        // pruefen auf vorhandene Komponente
        if ( this.mDialogComponent ) {
            return this.mDialogComponent;
        }
        try {
            const dialog = this._buildComponent();
            const fileReader = this._getPlugin( FILEREADER_PLUGIN_NAME, FILEREADER_FACTORY_NAME, FileReaderFactory ) as FileReaderInterface;
            const store = this._getPlugin( STORE_PLUGIN_NAME, STORE_FACTORY_NAME, StoreFactory ) as StoreInterface;
            const json = this._getPlugin( JSON_PLUGIN_NAME, JSON_FACTORY_NAME, JsonFactory ) as JsonInterface;
            const parser = this._getPlugin( PARSER_PLUGIN_NAME, PARSER_FACTORY_NAME, ParserFactory ) as ParserInterface;
            const interpreter = this._getPlugin( INTERPRETER_PLUGIN_NAME, INTERPRETER_FACTORY_NAME, InterpreterFactory ) as InterpreterInterface;
            if ( this._binder( dialog, fileReader, store, json, parser, interpreter ) !== 0 ) {
                this._error( 'build', 'Komponenten nicht verbunden' );
                return null;
            }
            return dialog;
        } catch ( aException ) {
            this._exception( 'build', aException );
            return null;
        }
    }


    /**
     * Hier wird die Komponente als Singelton erzeugt
     *
     * @return {DialogInterface} component - Rueckgabe des Component-Singletons
     */

    _buildComponent(): DialogComponentInterface {
        if ( !this.mDialogComponent ) {
            this.mDialogComponent = this._getPlugin( DIALOG_COMPONENT_NAME, DIALOG_COMPONENTFACTORY_NAME, DialogComponentFactory ) as DialogComponentInterface;
        }
        return this.mDialogComponent;
    }


    /**
     * Verbindert die Komponenten und Plugins miteinander
     *
     * @private
     * @param {DialogComponentInterface} aDialog - Diaog Komponente
     * @param {FileReaderInterface} aFileReader - FileRader Plugin
     *
     * @return {number} errorCode(0,-1)
     */

    _binder( aDialog: DialogComponentInterface, aFileReader: FileReaderInterface, aStore: StoreInterface, aJson: JsonInterface, aParser: ParserInterface, aInterpreter: InterpreterInterface ): number {
        if ( !aDialog ) {
            this._error( '_binder', 'Dialog nicht vorhanden' );
            return -1;
        }
        if ( !aFileReader ) {
            this._error( '_binder', 'FileReader nicht vorhanden' );
            return -1;
        }
        if ( !aStore ) {
            this._error( '_binder', 'Store nicht vorhanden' );
            return -1;
        }
        if ( !aJson ) {
            this._error( '_binder', 'Json nicht vorhanden' );
            return -1;
        }
        if ( !aParser ) {
            this._error( '_binder', 'Parser nicht vorhanden' );
            return -1;
        }
        if ( !aInterpreter ) {
            this._error( '_binder', 'Interpreter nicht vorhanden' );
            return -1;
        }
        // Plugins eintragen
        if ( aDialog.insertPlugin( aFileReader.getName(), aFileReader ) !== 0 ) { return -1; }
        if ( aDialog.insertPlugin( aStore.getName(), aStore ) !== 0 ) { return -1; }
        if ( aDialog.insertPlugin( aJson.getName(), aJson ) !== 0 ) { return -1; }
        if ( aDialog.insertPlugin( aParser.getName(), aParser ) !== 0 ) { return -1; }
        if ( aDialog.insertPlugin( aInterpreter.getName(), aInterpreter ) !== 0 ) { return -1; }
        // binden der FileReader-Funktionen
        if ( aDialog.setReadFileFunc( aFileReader.getReadFunc()) !== 0 ) { return -1; }
        aFileReader.onRead = aDialog.getWriteFileDataFunc();
        aFileReader.onError = aDialog.onError;
        // binden von Store an Json
        aJson.setNewDialogFunc( aStore.getNewDialogFunc());
        aJson.setNewDialogStateFunc( aStore.getNewDialogStateFunc());
        // binden von Store an Parser
        aParser.setNewDialogFunc(aStore.getNewDialogFunc());
        aParser.setNewDialogStateFunc(aStore.getNewDialogStateFunc());
        // binden von Store an Interpreter
        aInterpreter.setGetDialogStateFunc(aStore.getGetDialogStateFunc());
        aInterpreter.onError = aDialog.onError;
        // binden von Json und Dialog
        aDialog.setTransformJsonFileFunc(aJson.getTransformJsonFileFunc());
        aDialog.setTransformJsonDataFunc(aJson.getTransformJsonDataFunc());
        aJson.onJsonEnd = aDialog.onDialogJson;
        aJson.onError = aDialog.onError;
        // binden von Parser und Dialog
        aDialog.setParseSpeechDefFileFunc(aParser.getParseSpeechDefFileFunc());
        aDialog.setParseSpeechDefDataFunc(aParser.getParseSpeechDefDataFunc());
        aParser.onParserEnd = aDialog.onDialogParse;
        aParser.onError = aDialog.onError;
        // binden von Interpreter und Dialog
        aInterpreter.onDialogSet = aDialog.onDialogSet;
        aInterpreter.onDialogStart = aDialog.onDialogStart;
        aInterpreter.onDialogStop = aDialog.onDialogStop;
        aInterpreter.onDialogStateSet = aDialog.onDialogStateSet;
        aInterpreter.onDialogAction = aDialog.onDialogAction;
        aInterpreter.onDialogSpeak = aDialog.onDialogSpeak;
        aInterpreter.onDialogSpeakStart = aDialog.onDialogSpeakStart;
        aInterpreter.onDialogSpeakStop = aDialog.onDialogSpeakStop;
        aInterpreter.onError = aDialog.onError;
        return 0;
    }

}
