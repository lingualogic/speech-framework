/** @packageDocumentation
 * Parser Interface
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * @module dialog/parser
 * @author SB
 */


// plugin

import { PluginInterface } from '@speech/core';


// store

import { StoreNewDialogFunc, StoreNewDialogStateFunc } from '../store/store.interface';


// Funktionen

export type ParserSpeechDefFileFunc = (aDefFileName: string) => number;
export type ParserSpeechDefDataFunc = (aDefData: string) => number;


// Events

export type OnParserEndFunc = () => number;


/** @export
 * Parser Schnittstelle
 */

export interface ParserInterface extends PluginInterface {

    // Event-Funktionen

    onParserEnd: OnParserEndFunc;

    // Parser-Funktionen

    parseSpeechDefFile( aDefFileName: string ): number;
    parseSpeechDefData( aDefData: string ): number;

    // Bind-Funktionen

    getParseSpeechDefFileFunc(): ParserSpeechDefFileFunc;
    getParseSpeechDefDataFunc(): ParserSpeechDefDataFunc;

    setNewDialogFunc( aNewDialogFunc: StoreNewDialogFunc ): number;
    setNewDialogStateFunc( aNewDialogStateFunc: StoreNewDialogStateFunc ): number;
}
