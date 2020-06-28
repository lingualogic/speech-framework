/** @packageDocumentation
 * DialogObjekt als Hauptobjekt eines Dialogs
 *
 * Letzte Aenderung: 07.09.2018
 * Status: gelb
 *
 * @module dialog/store
 * @author SB
 */


// dialog

import { DialogStateInterface } from './dialog-state.interface';


export interface DialogObjectInterface {

    getName(): string;

    newDialogState( aStateName: string, aStateId: number ): DialogStateInterface;
    getDialogState( aStateName: string): DialogStateInterface;

}
