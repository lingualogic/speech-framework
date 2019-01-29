/**
 * BotComponent Schnittstelle
 *
 * Letzte Aenderung: 18.10.2018
 * Status: gelb
 *
 * @module bot/component
 * @author SB
 */


// base

import { BaseComponentInterface } from '../../base/component/base-component.interface';


// dialog

import { OnDialogActionFunc, OnDialogActionStopFunc, OnDialogSpeakFunc, OnDialogSpeakStopFunc } from './../../dialog/dialog-function.type';


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
