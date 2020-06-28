/** @packageDocumentation
 * DialogState Interface
 *
 * Letzte Aenderung: 07.09.2018
 * Status: gelb
 *
 * @module dialog/store
 * @author SB
 */


 // dialog

import { DialogNodeInterface } from './dialog-node.interface';


export interface DialogStateInterface {

    getName(): string;
    getId(): number;
    getDialogName(): string;

    newDialogNode(aNodeType: string, aNodeId: number, aParentId: number, aNextId: number): DialogNodeInterface;
    getDialogNode( aNodeId: number ): DialogNodeInterface;

    getFirstDialogNodeId(): number;
    getNextDialogNodeId(): number;
}

