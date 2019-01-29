/**
 * DialogComponent definiert einen DialogManager fuer Aktionen und Sprachausgaben
 *
 * Letzte Aenderung: 18.10.2018
 * Status: gelb
 *
 * @module dialog/component
 * @author SB
 */


// store

import { STORE_PLUGIN_NAME } from '../store/store-const';
import { StoreInterface } from '../store/store.interface';


// interpreter

import { INTERPRETER_PLUGIN_NAME } from '../interpreter/interpreter-const';
import { InterpreterInterface } from '../interpreter/interpreter.interface';


// dialog

import { DIALOG_COMPONENT_NAME } from '../dialog-const';
import { DialogStateContextInterface } from '../dialog-state-context.interface';
import { DialogOptionInterface } from '../dialog-option.interface';
import { DialogBase } from './dialog-base';


/** @export
 * DialogComponent Klasse als Basis eines DialogManagers fuer Aktionen und Sprachausgaben
 */

export class DialogComponent extends DialogBase {

    // innere Plugins

    mStore: StoreInterface = null;
    mInterpreter: InterpreterInterface = null;


    /**
     * Creates an instance of Dialog.
     *
     * @param {boolean} aRegisterFlag - wenn true, dann in PluginManager eintragen
     */

    constructor(  aRegisterFlag = true ) {
        super( DIALOG_COMPONENT_NAME, aRegisterFlag );
        this._setErrorClassName( 'DialogComponent' );
    }


    // Komponenten-Funktionen


    /**
     * Initialisierung der DialogComponent
     *
     * @param {DialogOptionInterface} aOptions - optionale Parameter
     *
     * @return {number} errorcode (0,-1)
     */

    init( aOption?: DialogOptionInterface ): number {
        // console.log('DialogComponent.init:', aOptions);
        // pruefen auf bereits initialisiert

        if ( this.isInit()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('DialogComponent.init: bereits initialisiert');
            }
            return 0;
        }

        // interne Plugins auslesen

        this.mStore = this.findPlugin( STORE_PLUGIN_NAME ) as StoreInterface;
        if ( !this.mStore ) {
            return -1;
        }

        this.mInterpreter = this.findPlugin( INTERPRETER_PLUGIN_NAME ) as InterpreterInterface;
        if ( !this.mInterpreter ) {
            return -1;
        }

        // Initialisierung

        return super.init( aOption );
    }


    /**
     * Freigabe der DialogComponent
     *
     * @return {number} errorcode (0,-1)
     */

    done(): number {
        if ( this.mInterpreter ) {
            this.stop();
            this.mInterpreter = null;
        }
        return super.done();
    }


    // Dialog-Funktionen


    /**
     * Loeschen eines Dialogs
     *
     * @return {number} Fehlercode 0 oder -1
     */

    clearDialog(): number {
        try {
            this.mStore.clear();
            return 0;
        } catch ( aException ) {
            this._exception( 'clearDialog', aException );
            return -1;
        }
    }


    /**
     * Setzen eines Dialognamens
     *
     * @param {string} aDialogName - Name eines Dialogs
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setDialog( aDialogName: string ): number {
        try {
            return this.mInterpreter.setDialog( aDialogName );
        } catch ( aException ) {
            this._exception( 'setDialog', aException );
            return -1;
        }
    }


    /**
     * Rueckgabe des aktuellen Dialognamens
     *
     * @return {string} Rueckgabe des aktuell eingestellten Dialogs
     */

    getDialog(): string {
        try {
            return this.mInterpreter.getDialog();
        } catch ( aException ) {
            this._exception( 'getDialog', aException );
            return '';
        }
    }


    /**
     * Gibt True zurueck, wenn ein Dialog gerade ausgefuehrt wird.
     *
     * @return {boolean} Rueckgabe, ob der Dialog gerade laeuft
     */

    isRunning(): boolean {
        if ( !this.mInterpreter ) {
            return false;
        }
        return this.mInterpreter.isDialogRunning();
    }


    /**
     * Dialog ausgeben
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    start(): number {
        if ( !this.mInterpreter ) {
            return -1;
        }
        super.start();
        return this.mInterpreter.startDialog();
    }


    /**
     * Dialog beenden
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    stop(): number {
        if ( !this.mInterpreter ) {
            return -1;
        }
        super.stop();
        return this.mInterpreter.stopDialog();
    }


    /**
     * Dialog-Zustand setzen
     *
     * @param {string} aState - Dialog-Zustandsname
     * @param {DialogStateContextInterface} aContext - Dialog-Zustandskontextobjekt
     *
     * @return {number} errorCode(0,-1) -Fehlercode
     */

    setDialogState( aState: string, aContext?: DialogStateContextInterface ): number {
        try {
            return this.mInterpreter.setState( aState, aContext );
        } catch ( aException ) {
            this._exception( 'setDialogState', aException );
            return -1;
        }
    }

    getDialogState(): string {
        try {
            return this.mInterpreter.getState();
        } catch ( aException ) {
            this._exception( 'getDialogState', aException );
            return '';
        }
    }

    /**
     * Dialog-Zustandskontext setzen
     *
     * @param {DialogStateContextInterface} aContext - Dialog-Zustandskontextobjekt
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    setDialogStateContext( aContext: DialogStateContextInterface ): number {
        try {
            return this.mInterpreter.setStateContext( aContext );
        } catch (aException) {
            this._exception( 'setDialogStateContext', aException );
            return -1;
        }
    }


    /**
     * Ueberspringen des naechsten Speak-Knotens, wenn er laeuft, wird er sofort abgebrochen
     * und mit dem folgenden Knoten weitergemacht.
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    skipNextSpeak() {
        if ( !this.mInterpreter ) {
            return -1;
        }
        // TODO: Bugfix this function
        // return this.mInterpreter.skipNextSpeakNode();
        return 0;
    }

}
