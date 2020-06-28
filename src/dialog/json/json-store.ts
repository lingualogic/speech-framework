/** @packageDocumentation
 * Dieses Programm speichert die JSON-Daten und erlaubt den Zugriff darauf.
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module dialog/json
 * @author SB
 */


// core

import { ErrorBase } from '@speech/core';


// dialog

import {
    DIALOG_ACTION_COMMAND,
    DIALOG_SPEAK_COMMAND,
    DIALOG_WAIT_COMMAND
} from './../dialog-const';
import { DialogDataInterface, DialogStateInterface, DialogIntentInterface, DialogTextInterface, DialogCommandInterface } from './../dialog-data.interface';


/**
 * Klasse JSON-Store zur Verwaltung der Dialog-Daten
 */

export class JsonStore extends ErrorBase {

    mDialogList: DialogDataInterface[] = null;
    mDialog: DialogDataInterface = null;
    mDialogName = '';

    mStateList: DialogStateInterface[] = null;
    mState: DialogStateInterface = null;
    mStateName = '';

    mIntentList: DialogIntentInterface[] = null;
    mIntent: DialogIntentInterface = null;
    mIntentName = '';

    mCommandList: DialogCommandInterface[] = null;

    mTextList: DialogTextInterface[] = null;
    mText: DialogTextInterface = null;
    mTextName = '';

    // feste Namenslisten

    mCommandNameList = [ DIALOG_ACTION_COMMAND, DIALOG_SPEAK_COMMAND, DIALOG_WAIT_COMMAND ];


    constructor() {
        super( 'JsonStore' );
    }


    // Dialog-Funktionen


    /**
     * Loeschen aller Dialogdaten
     */

    clear(): void {
        this.mDialogList = null;
        this.mDialog = null;
        this.mDialogName = '';
    
        this.mStateList = null;
        this.mState = null;
        this.mStateName = '';
    
        this.mIntentList = null;
        this.mIntent = null;
        this.mIntentName = '';
    
        this.mCommandList = null;
    
        this.mTextList = null;
        this.mText = null;
        this.mTextName = '';
    }


    /**
     * Traegt die aktuelle Liste aller Dialogdaten ein.
     * 
     * @param aDialogList - Liste aller Dialogdaten
     */

    setDialogList( aDialogList: DialogDataInterface[]): number {
        if ( !aDialogList || aDialogList.length === 0 ) {
            this._error( 'setDialogList', 'keine Dialogliste uebergeben' );
            return -1;
        }
        this.clear();
        this.mDialogList = aDialogList;
        return 0;
    }


    /**
     * setzt aktuellen Dialog
     *
     * @param aDialogName - Name des zu setzenden Dialogs
     */

    setCurrentDialog( aDialogName: string ): number {
        if ( !aDialogName ) {
            this._error( 'setCurrentDialog', 'kein Dialogname uebergeben' );
            return -1;
        }
        if ( !this.mDialogList ) {
            this._error( 'setCurrentDialog', 'keine Dialogliste vorhanden' );
            return -1;
        }
        for ( const dialog of this.mDialogList ) {
            // console.log('dataService.setCurrentDialog: ', aDialogName, dialog);
            if ( aDialogName === dialog.name ) {
                this.mDialog = dialog;
                this.mDialogName = dialog.name;
                this.mStateList = dialog.stateList;
                this.mState = null;
                this.mStateName = '';
                this.mIntentList = dialog.intentList;
                this.mIntent = null;
                this.mIntentName = '';
                this.mCommandList = null;
                this.mTextList = dialog.textList;
                this.mText = null;
                this.mTextName = '';
                // console.log('dataService.setCurrentDialog: gefunden');
                return 0;
            }
        }
        // console.log('dataService.setCurrentDialog: nicht gefunden');
        this.mDialog = null;
        this.mDialogName = '';
        this.mStateList = null;
        this.mState = null;
        this.mStateName = '';
        this.mIntentList = null;
        this.mIntent = null;
        this.mIntentName = '';
        this.mCommandList = null;
        this.mTextList = null;
        this.mText = null;
        this.mTextName = '';
        this._error( 'setCurrentDialog', 'kein Dialog zum Dialognamen ' + aDialogName + ' gefunden');
        return -1;
    }


    set dialogList( aDialogList: DialogDataInterface[]) {
        this.mDialogList = aDialogList;
    }


    get dialogList() {
        return this.mDialogList;
    }


    get dialog() {
        return this.mDialog;
    }


    get dialogName() {
        return this.mDialogName;
    }


    // State-Funktionen


    /**
     * Neuen State zum Namen in der Stateliste eintragen
     *
     * @param aStateName - neuer Statename, darf in Stateliste nicht vorhanden sein
     */

    newState( aStateName: string ): number {
        if ( !this.mDialog || !this.mStateList ) {
            this._error( 'newState', 'kein Dialog vorhanden' );
            return -1;
        }
        if ( this.checkState( aStateName )) {
            this._error( 'newState', 'kein State Name uebergeben' );
            return -1;
        }
        // State erzeugen
        const newState = {
            name: aStateName,
            intentList: []
        };
        this.mStateList.push( newState );
        return 0;
    }


    /**
     * State aus Stateliste loeschen
     *
     * @param aStateName - zu loeschender State
     */

    deleteState( aStateName: string ): number {
        // console.log('DataService.deleteState:', aStateName, this.mStateList);
        if ( !this.mDialog || !this.mStateList ) {
            this._error( 'deleteState', 'kein Dialog vorhanden' );
            return -1;
        }
        if ( !this.checkState( aStateName )) {
            this._error( 'deleteState', 'kein State vorhanden' );
            return -1;
        }
        // State entfernen
        const newStateList = this.mStateList.filter((value, index, arr) => {
          // console.log('DataService.deleteState:', aStateName, value);
          return value.name !== aStateName;
        });
        // console.log('DataService.deleteState:', newStateList);
        this.mStateList = newStateList;
        this.mDialog.stateList = newStateList;
        return 0;
    }


    checkState( aStateName: string ): boolean {
        if ( aStateName && this.mStateList ) {
            for ( const state of this.mStateList ) {
                // console.log('dataService.checkState: ', aStateName, state);
                if ( aStateName === state.name ) {
                    // console.log('dataService.checkState: gefunden');
                    return true;
                }
            }
        }
        return false;
    }


    /**
     * aktuellen State eintragen
     *
     * @param aStateName - Name des zu setzenden States
     */

    setCurrentState( aStateName: string ): number {
        for ( const state of this.mStateList ) {
            // console.log('dataService.setCurrentState: ', aStateName, state);
            if ( aStateName === state.name ) {
                this.mState = state;
                this.mStateName = state.name;
                this.mIntent = null;
                this.mIntentName = '';
                // console.log('dataService.setCurrentState: gefunden');
                return 0;
            }
        }
        // console.log('dataService.setCurrentState: nicht gefunden');
        this.mState = null;
        this.mStateName = '';
        this.mIntent = null;
        this.mIntentName = '';
        this._error( 'setCurrentState', 'kein State vorhanden' );
        return -1;
    }


    get stateList() {
        return this.mStateList;
    }


    get state() {
        return this.mState;
    }


    get stateName() {
        return this.mStateName;
    }

    get stateIntentList() {
        if ( !this.mState ) {
            return null;
        }
        return this.mState.intentList;
    }


    /**
     * Neuen Intentnamen in den State eintragen
     *
     * @param aIntentName - neuer Intentname
     */

    newStateIntent( aIntentName: string ): number {
        if ( !aIntentName ) {
            this._error( 'newStateIntent', 'kein Intent Name uebergeben' );
            return -1;
        }
        if ( !this.mState ) {
            this._error( 'newStateIntent', 'kein State vorhanden' );
            return -1;
        }
        // Intent in State eintragen
        this.mState.intentList.push( aIntentName );
        return 0;
  }


  /**
   * Intent aus State loeschen
   *
   * @param aIntentName - zu loeschender Intent
   */

    deleteStateIntent( aIntentName: string ): number {
        // console.log('DataService.deleteStateIntent:', aIntentName, this.mState);
        if ( !this.mState ) {
            this._error( 'deleteStateIntent', 'kein State vorhanden' );
            return -1;
        }
        if ( !this.checkStateIntent( aIntentName )) {
            this._error( 'deleteStateIntent', 'kein Intent vorhanden' );
            return -1;
        }
        // Intent entfernen
        const newIntentList = this.mState.intentList.filter((value, index, arr) => {
          // console.log('DataService.deleteStateIntent:', aIntentName, value);
          return value !== aIntentName;
        });
        // console.log('DataService.deleteStateIntent:', newIntentList);
        this.mState.intentList = newIntentList;
        return 0;
    }


    checkStateIntent( aIntentName: string ): boolean {
      if ( aIntentName && this.mState ) {
          for ( const intent of this.mState.intentList ) {
              // console.log('dataService.checkStateIntent: ', aIntentName, intent);
              if ( aIntentName === intent ) {
                  // console.log('dataService.checkStateIntent: gefunden');
                  return true;
              }
          }
      }
      return false;
    }


    // Intent-Funktionen


    setCurrentIntent( aIntentName: string ): number {
        if ( this.mIntentList ) {
            for ( const intent of this.mIntentList ) {
                // console.log('dataService.setCurrentintent: ', aIntentName, intent);
                if ( aIntentName === intent.name ) {
                    this.mIntent = intent;
                    this.mIntentName = intent.name;
                    this.mCommandList = intent.commandList;
                    // console.log('dataService.setCurrentIntent: mCommandList = ', intent, this.mCommandList);
                    return 0;
                }
            }
        }
        this.mIntent = null;
        this.mIntentName = '';
        this.mCommandList = null;
        this._error( 'setCurrentIntent', 'kein Intent vorhanden' );
        return -1;
    }


    get intentList() {
        return this.mIntentList;
    }


    get intent() {
        return this.mIntent;
    }


    get intentName() {
        return this.mIntentName;
    }


    get commandList() {
        return this.mCommandList;
    }


    // Command-Funktionen


    /**
     * Neuen Kommandonamen in den Intent eintragen
     *
     * @param aCommandName - neuer Kommandoname
     */

    newCommand( aCommandName: string ): number {
        if ( !aCommandName ) {
            this._error( 'newCommand', 'kein Kommandoname uebergeben' );
            return -1;
        }
        if ( !this.mIntent ) {
            this._error( 'newCommand', 'kein Intent vorhanden' );
            return -1;
        }
        // Kommando in Intent eintragen
        const command: DialogCommandInterface = {
            name: aCommandName
        };
        this.mIntent.commandList.push( command );
        this.mCommandList = this.mIntent.commandList;
        return 0;
    }


    /**
     * Kommand aus Intent loeschen
     *
     * @param aCommandIndex - zu loeschendes Kommando an Position
     */

    deleteCommand( aCommandIndex: number ): number {
        // console.log('DataService.deleteCommand:', aCommandIndex, this.mIntent);
        if ( !this.mIntent ) {
            this._error( 'deleteCommand', 'kein Intent vorhanden' );
            return -1;
        }
        // Command entfernen
        const newCommandList = this.mIntent.commandList.filter((value, index, arr) => {
            // console.log('DataService.deleteCommand:', aCommandIndex, index);
            return index !== aCommandIndex;
        });
        // console.log('DataService.deleteCommand:', newCommandList);
        this.mIntent.commandList = newCommandList;
        this.mCommandList = this.mIntent.commandList;
        return 0;
    }


    get commandNameList() {
        return this.mCommandNameList;
    }


    // Text-Funktionen


    setCurrentText( aTextName: string ): number {
        if ( this.mTextList ) {
            for ( const text of this.mTextList ) {
                // console.log('dataService.setCurrentText: ', aTextName, text);
                if ( aTextName === text.name ) {
                    this.mText = text;
                    this.mTextName = text.name;
                    // console.log('dataService.setCurrentText: gefunden');
                    return 0;
                }
            }
        }
        this.mText = null;
        this.mTextName = '';
        // console.log('dataService.setCurrentText: nicht gefunden');
        this._error( 'setCurrentText', 'kein Text gefunden' );
        return -1;
    }


    get textList() {
        return this.mTextList;
    }


    get text() {
        return this.mText;
    }


    get textName() {
        return this.mTextName;
    }


    /**
     * Neuen Text in die Textliste eintragen
     *
     * @param aTextName - neuer Textname
     */

    newText( aTextName: string ): number {
        if ( !aTextName ) {
            this._error( 'newText', 'kein Text Name uebergeben' );
            return -1;
        }
        if ( !this.mTextList ) {
            this._error( 'newText', 'keine Textliste vorhanden' );
            return -1;
        }
        const text: DialogTextInterface = {
            name: aTextName,
            text: '',
            time: 0
        };
        this.mTextList.push( text );
        return 0;
    }


    deleteText( aTextId: string ): number {
        // console.log('DataService.deleteText:', aTextId, this.mTextList);
        if ( !this.mTextList ) {
            this._error( 'deleteText', 'keine Textliste vorhanden' );
            return -1;
        }
        const newTextList = this.mTextList.filter((value, index, arr) => {
            // console.log('DataService.deleteText:', aTextId, value);
            return value.name !== aTextId;
        });
        // console.log('DataService.deleteText:', newTextList);
        this.mDialog.textList = newTextList;
        this.mTextList = newTextList;
        return 0;
    }


    findText( aTextId: string ): string {
        // console.log('dataService.findText: ', aTextId, this.mTextList);
        if ( aTextId && this.mTextList ) {
            for ( const text of this.mTextList ) {
                // console.log('dataService.findText: ', aTextId, text.name, text.text);
                if ( aTextId === text.name ) {
                    return text.text;
                }
            }
        }
        return '';
    }


    findTextTime( aTextId: string ): number {
        // console.log('dataService.findTextTime: ', aTextId, this.mTextList);
        if ( aTextId && this.mTextList ) {
            for ( const text of this.mTextList ) {
                // console.log('dataService.findText: ', aTextId, text);
                if ( aTextId === text.name ) {
                    return text.time;
                }
            }
        }
        return 0;
    }


    setText( aTextId: string, aText: string, aTime: number ): number {
        if ( !aTextId || !aText || !this.mTextList ) {
            this._error( 'setText', 'keine Textdaten uebergeben' );
            return -1;
        }
        for ( const text of this.mTextList ) {
            // console.log('dataService.setText: ', aTextId, text);
            if ( aTextId === text.name ) {
                text.text = aText;
                text.time = aTime;
            }
        }
        return 0;
    }
}
