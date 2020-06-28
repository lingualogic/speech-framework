/** @packageDocumentation
 * Interpreter Schnittstelle
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * @module dialog/interpreter
 * @author SB
 */


// core

import { PluginInterface } from '@speech/core';


// store

import { StoreGetDialogStateFunc } from '../store/store.interface';


// dialog

import {
    OnDialogSetFunc,
    OnDialogStartFunc,
    OnDialogStopFunc,
    OnDialogStateSetFunc,
    OnDialogActionFunc,
    OnDialogSpeakFunc,
    OnDialogSpeakStartFunc,
    OnDialogSpeakStopFunc
} from '../dialog-function.type';
import { DialogStateContextInterface } from '../dialog-state-context.interface';


/** @export
 * DialogInterpreter Schnittstelle
 */

export interface InterpreterInterface extends PluginInterface {

    // Event-Funktionen

    onDialogSet: OnDialogSetFunc;
    onDialogStart: OnDialogStartFunc;
    onDialogStop: OnDialogStopFunc;
    onDialogStateSet: OnDialogStateSetFunc;
    onDialogAction: OnDialogActionFunc;
    onDialogSpeak: OnDialogSpeakFunc;
    onDialogSpeakStart: OnDialogSpeakStartFunc;
    onDialogSpeakStop: OnDialogSpeakStopFunc;

    // Dialog-Funktionen

    setDialog( aDialogName: string ): number;
    getDialog(): string;

    startDialog(): number;
    stopDialog(): number;
    isDialogRunning(): boolean;

    // Zustands-Funktionen

    setState( aStateName: string, aStateContext: DialogStateContextInterface ): number;
    getState(): string;

    setStateContext( aStateContext: DialogStateContextInterface): number;

    // Speak-Funktionen

    isSpeakRunning(): boolean;
    skipNextSpeakNode(): number;

    // Bind-Funktionen

    setGetDialogStateFunc( aGetDialogStateFunc: StoreGetDialogStateFunc ): number;

}
