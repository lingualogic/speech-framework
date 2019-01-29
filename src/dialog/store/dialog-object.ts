/**
 * DialogObjekt als Hauptobjekt eines Dialogs
 *
 * Letzte Aenderung: 07.09.2018
 * Status: gelb
 *
 * @module dialog/store
 * @author SB
 */

// extern

// TODO: import debug syntax muss noch ermittelt werden
// const debug = require('debug')('speech:dialog:store:object');

// dialog

import { DialogStateInterface } from './dialog-state.interface';
import { DialogState } from './dialog-state';


/**
 * DialogObject Klasse
 */

export class DialogObject {

    private mDialogName = '';
    private mDialogStateList = new Map<string, DialogStateInterface>();


    /**
     * Creates an instance of DialogObject.
     *
     * @param {string} aDialogName
     */

    constructor( aDialogName: string ) {
        // debug('constructor:', aDialogName);
        this.mDialogName = aDialogName;
    }


    getName(): string {
        return this.mDialogName;
    }

    /**
     * Neues Dialog Zustandsobjekt erzeugen im Dialogobjekt
     *
     * @param {string} aStateName - Zustandsname
     * @param {number} aStateId   - Zustandsnummer
     *
     * @return {DialogStateInterface} dialogState - Zustandsobjekt
     */

    newDialogState( aStateName: string, aStateId: number ): DialogStateInterface {
        // debug('newDialogState:', aStateName, aStateId);
        const dialogState = new DialogState( this.mDialogName, aStateName, aStateId );
        this.mDialogStateList.set( aStateName, dialogState );
        return dialogState;
    }


    /**
     * Rueckgabe des Dialogzustandsobjekte
     *
     * @param {string} aStateName - Zustandsname
     *
     * @return {DialogStateInterface} dialogState - Zustandsobjekt
     */

    getDialogState( aStateName: string ): DialogStateInterface {
        // debug('getDialogState:', aStateName);
        return this.mDialogStateList.get( aStateName );
    }

}
