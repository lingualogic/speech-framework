/** @packageDocumentation
 * BotComponent Schnittstelle
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * @module bot/component
 * @author SB
 */


// base

import { BaseComponentInterface } from '@speech/base';


// dialog

import { OnDialogActionFunc, OnDialogActionStopFunc, OnDialogSpeakFunc, OnDialogSpeakStopFunc } from '@speech/dialog';


// bot

import { BotInterface } from './../bot.interface';


/** @export
 * BotComponent Schnittstelle
 *
 * @extends {ComponentInterface, BotInterface}
 */

export interface BotComponentInterface extends BaseComponentInterface, BotInterface {


    // Bind-Funktionen


    getDialogSpeakFunc(): OnDialogSpeakFunc;
    getDialogSpeakStopFunc(): OnDialogSpeakStopFunc;

    getDialogActionFunc(): OnDialogActionFunc;
    getDialogActionStopFunc(): OnDialogActionStopFunc;

}
