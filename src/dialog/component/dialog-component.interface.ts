/**
 * DialogComponent Schnittstelle
 *
 * Letzte Aenderung: 18.10.2018
 * Status: gelb
 *
 * @module dialog/component
 * @author SB
 */


// base

import { BaseComponentInterface } from '../../base/component/base-component.interface';


// file

import { OnFileReaderReadFunc } from '../../file/reader/file-reader.interface';


// parser

import { ParserSpeechDefFileFunc, ParserSpeechDefDataFunc } from '../parser/parser.interface';


// dialog

import {
    OnDialogParseFunc,
    OnDialogSetFunc,
    OnDialogStartFunc,
    OnDialogStopFunc,
    OnDialogStateSetFunc,
    OnDialogActionFunc,
    OnDialogActionStopFunc,
    OnDialogSpeakFunc,
    OnDialogSpeakStartFunc,
    OnDialogSpeakStopFunc,
    DialogWriteFileDataFunc
} from '../dialog-function.type';
import { DialogInterface } from '../dialog.interface';


/** @export
 * DialogComponent Schnittstelle
 */

export interface DialogComponentInterface extends BaseComponentInterface, DialogInterface {


    // Event-Funktionen

    onNetOpen: () => number;

    onDialogParse: OnDialogParseFunc;
    onDialogSet: OnDialogSetFunc;
    onDialogStart: OnDialogStartFunc;
    onDialogStop: OnDialogStopFunc;
    onDialogStateSet: OnDialogStateSetFunc;
    onDialogAction: OnDialogActionFunc;
    onDialogActionStop: OnDialogActionStopFunc;
    onDialogSpeak: OnDialogSpeakFunc;
    onDialogSpeakStart: OnDialogSpeakStartFunc;
    onDialogSpeakStop: OnDialogSpeakStopFunc;


    // Binding-Funktionen


    setParseSpeechDefFileFunc( aParseSpeechDefFileFunc: ParserSpeechDefFileFunc ): number;
    setParseSpeechDefDataFunc( aParseSpeechDefDataFunc: ParserSpeechDefDataFunc ): number;

    setReadFileFunc( aReadFunc: OnFileReaderReadFunc ): number;
    getWriteFileDataFunc(): DialogWriteFileDataFunc;

}
