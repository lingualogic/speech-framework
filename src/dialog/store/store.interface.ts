/**
 * Store Schnittstelle
 *
 * Letzte Aenderung: 07.09.2018
 * Status: gelb
 *
 * @module dialog/store
 * @author SB
 */


// plugin

import { PluginInterface } from '../../core/plugin/plugin.interface';


// dialog

import { DialogStateInterface } from './dialog-state.interface';
import { DialogObjectInterface } from './dialog-object.interface';


// Funktionen

export type StoreNewDialogFunc = (aDialogName: string) => DialogObjectInterface;
export type StoreNewDialogStateFunc = (aDialogName: string, aStateName: string, aStateId: number) => DialogStateInterface;
export type StoreGetDialogStateFunc = (aDialogName: string, aStateName: string ) => DialogStateInterface;


/** @export
 * Store Schnittstelle
 */

export interface StoreInterface extends PluginInterface {

    clear(): void;

    // Dialog-Funktionen

    newDialog( aDialogName: string ): DialogObjectInterface;
    getDialog( aDialogName: string ): DialogObjectInterface;

    // Zustands-Funktionen

    newDialogState( aDialogName: string, aStateName: string, aStateId: number ): DialogStateInterface;
    getDialogState( aDialogName: string, aStateName: string ): DialogStateInterface;

    // Bind-Funktionen

    getNewDialogFunc(): StoreNewDialogFunc;
    getNewDialogStateFunc(): StoreNewDialogStateFunc;
    getGetDialogStateFunc(): StoreGetDialogStateFunc;
}

