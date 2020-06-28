/** @packageDocumentation
 * Funktionstypen fuer Dialog
 *
 * API-Version: 1.0
 * Datum:   07.09.2018
 *
 * Letzte Aenderung: 07.09.2018
 * Status: gelb
 *
 * @module dialog
 * @author SB
 */


// dialog

import { DialogActionInterface } from './dialog-action.interface';
import { DialogSpeakInterface } from './dialog-speak.interface';


// Global API


// Action-Funktionen

/** Definiert die StartAction Funktion fuer eine Dialogaktion */
export type DialogStartActionFunc = (aActionObject: DialogActionInterface) => void;
/** Definiert die StopAction Funktion fuer eine Dialogaktion */
export type DialogStopActionFunc = () => void;


// Funktionen

export type DialogWriteFileDataFunc = (aFileData: string) => number;


// Events

export type OnDialogJsonFunc = () => number;
export type OnDialogParseFunc = () => number;
export type OnDialogSetFunc = (aDialogName: string) => number;
export type OnDialogStartFunc = (aResult: number) => number;
export type OnDialogStopFunc = () => number;
export type OnDialogStateSetFunc = (aState: string) => number;
export type OnDialogActionFunc = (aAction: DialogActionInterface) => number;
export type OnDialogActionStopFunc = () => number;
export type OnDialogSpeakFunc = (aSpeak: DialogSpeakInterface) => number;
export type OnDialogSpeakStartFunc = () => number;
export type OnDialogSpeakStopFunc = () => number;

