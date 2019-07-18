/**
 * Automatisch erzeugte globale speech-main.ts Datei fuer Speech-Framework
 * 
 * Hauptbuilder des gesamten Speech-Frameworks. Hier werden alle Builder eingetragen,
 * die in den Komponenten verwendet werden duerfen. Muss vor allen Komponenten ausgefuehrt
 * einmal zur Initialisierung des Speech-Frameworks ausgefuehrt werden !
 *
 * Konfiguration: stable
 * Version: 0.5.13.0055 (Alpha) vom 18.07.2019
 *
 * Komponenten:
 *
 *              Action      - Aktionsausfuehrung
 *              Speak       - Sprachausgabe
 *              Listen      - Spracheingabe
 *              intent      - Sprachanalyse
 *              Dialog      - Dialogproxy
 *              Bot       - Sprachassistent
 *
 * @module main
 * @author SB
 */


// system

import { SystemManager } from './core/system/system-manager';


// action

import { ACTION_TYPE_NAME } from './action/action-const';
import { ActionComponentBuilder } from './action/component/action-component-builder';


// speak

import { SPEAK_TYPE_NAME } from './speak/speak-const';
import { SpeakComponentBuilder } from './speak/component/speak-component-builder';


// listen

import { LISTEN_TYPE_NAME } from './listen/listen-const';
import { ListenComponentBuilder } from './listen/component/listen-component-builder';


// intent

import { INTENT_TYPE_NAME } from './intent/intent-const';
import { IntentComponentBuilder } from './intent/component/intent-component-builder';


// dialog

import { DIALOG_TYPE_NAME } from './dialog/dialog-const';
import { DialogComponentBuilder } from './dialog/component/dialog-component-builder';


// bot

import { BOT_TYPE_NAME } from './bot/bot-const';
import { BotComponentBuilder } from './bot/component/bot-component-builder';


/**
 * statische MainBuilder Klasse zur Erzeugung aller Builder des
 * Speech-Frameworks.
 *
 * @export
 * @class MainBuilder
 */

export class SpeechMain {

    private static initFlag = false;

    // statische Klasse

    private constructor() {}


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        SystemManager.setErrorOutputOn();
    }


    static setErrorOutputOff(): void {
        SystemManager.setErrorOutputOff();
    }


    /**
     * Initialisiert alle Builder
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */

    static _createAllBuilder(): number {
        // console.log('SpeechMain._createAllBuilder: start');
        let result = 0;
        // Hier werden die Builder aller Komponenten erzeugt

        if ( SystemManager.insertBuilder( ACTION_TYPE_NAME, new ActionComponentBuilder( '', false )) !== 0 ) { result = -1; }
        if ( SystemManager.insertBuilder( SPEAK_TYPE_NAME, new SpeakComponentBuilder( '', false )) !== 0 ) { result = -1; }
        if ( SystemManager.insertBuilder( LISTEN_TYPE_NAME, new ListenComponentBuilder( '', false )) !== 0 ) { result = -1; }
        if ( SystemManager.insertBuilder( INTENT_TYPE_NAME, new IntentComponentBuilder( '', false )) !== 0 ) { result = -1; }
        if ( SystemManager.insertBuilder( DIALOG_TYPE_NAME, new DialogComponentBuilder( '', false )) !== 0 ) { result = -1; }
        if ( SystemManager.insertBuilder( BOT_TYPE_NAME, new BotComponentBuilder( '', false )) !== 0 ) { result = -1; }

        // console.log('SpeechMain.init: _createAllBuilder', result);
        return result;
    }


    /*
    * Initialisiert alle Builder und Ports
    *
    * @static
    * @return {number} Fehlercode 0 oder -1
    */

    static init(): number {
        if ( SpeechMain.initFlag ) {
            return 0;
        }
        // console.log('SpeechMain.init: start');
        // hier werden alle Builder erzeugt
        if ( SpeechMain._createAllBuilder() !== 0 ) {
            return -1;
        }
        // console.log('SpeechMain.init: end', result);
        SpeechMain.initFlag = true;
        return 0;
    }


    static isInit(): boolean {
        return SpeechMain.initFlag;
    }


    /**
    * Freigabe des Systems
    *
    * @static
    * @return {number} Fehlercode 0 oder -1
    */

    static done(): number {
        SystemManager.clear();
        SpeechMain.initFlag = false;
        return 0;
    }

}
