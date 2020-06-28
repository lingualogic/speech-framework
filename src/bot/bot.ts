/** @packageDocumentation
 * Dialog API Wrapper fuer BotComponent.
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * @module bot
 * @author SB
 */


// core

import { OnSpeechErrorFunc } from '@speech/core';


// base

import { Base } from '@speech/base';


// speak

import { SpeakInterface } from '@speech/speak';


// listen

import { ListenInterface } from '@speech/listen';


// action

import { ActionInterface } from '@speech/action';


// dialog

import {
    OnDialogSetFunc,
    OnDialogJsonFunc,
    OnDialogParseFunc,
    OnDialogStartFunc,
    OnDialogStopFunc,
    OnDialogStateSetFunc,
    OnDialogActionFunc,
    OnDialogActionStopFunc,
    OnDialogSpeakFunc,
    OnDialogSpeakStartFunc,
    OnDialogSpeakStopFunc,
    DialogStateContextInterface,
    DialogDataInterface
} from '@speech/dialog';


// bot

import { BOT_TYPE_NAME } from './bot-const';
import { BotOptionInterface } from './bot-option.interface';
import { BotInterface } from './/bot.interface';
import { BotComponentInterface } from './component/bot-component.interface';


/** @export
 * Dialog Klasse als API-Wrapper fuer die BotComponent
 */

export class Bot extends Base implements BotInterface {

    // interne Dialog-Komponente

    mBotComponent: BotComponentInterface = null;


    /**
     * Konstruktor fuer ereignisbasierte Initialisierung des Bots
     */

    constructor( aOption?: BotOptionInterface ) {
        super( aOption );
        // eintragen der spezifischen Komponente
        this.mBotComponent = this.mComponent as BotComponentInterface;
    }


    /**
     * Rueckgabe des Default Buildernamens, der verwendet wird,
     * wenn kein anderer Buildername uebergeben wurde.
     *
     * @returns {string} Rueckgabe des Default Buildernamens
     */

    _getBuilderName(): string {
        return BOT_TYPE_NAME;
    }


    // Event-Funktionen


    addDialogSetEvent( aPluginName: string, aEventFunc: OnDialogSetFunc ): number {
        return this.mBotComponent.addDialogSetEvent( aPluginName, aEventFunc );
    }

    addDialogJsonEvent( aPluginName: string, aEventFunc: OnDialogJsonFunc ): number {
        return this.mBotComponent.addDialogJsonEvent( aPluginName, aEventFunc );
    }

    addDialogParseEvent( aPluginName: string, aEventFunc: OnDialogParseFunc ): number {
        return this.mBotComponent.addDialogParseEvent( aPluginName, aEventFunc );
    }

    addDialogStartEvent( aPluginName: string, aEventFunc: OnDialogStartFunc ): number {
        return this.mBotComponent.addDialogStartEvent( aPluginName, aEventFunc );
    }

    addDialogStopEvent( aPluginName: string, aEventFunc: OnDialogStopFunc ): number {
        return this.mBotComponent.addDialogStopEvent( aPluginName, aEventFunc );
    }

    addDialogStateSetEvent( aPluginName: string, aEventFunc: OnDialogStateSetFunc ): number {
        return this.mBotComponent.addDialogStateSetEvent( aPluginName, aEventFunc );
    }

    addDialogActionEvent( aPluginName: string, aEventFunc: OnDialogActionFunc ): number {
        return this.mBotComponent.addDialogActionEvent( aPluginName, aEventFunc );
    }

    addDialogActionStopEvent( aPluginName: string, aEventFunc: OnDialogActionStopFunc ): number {
        return this.mBotComponent.addDialogActionStopEvent( aPluginName, aEventFunc );
    }

    addDialogSpeakEvent( aPluginName: string, aEventFunc: OnDialogSpeakFunc ): number {
        return this.mBotComponent.addDialogSpeakEvent( aPluginName, aEventFunc );
    }

    addDialogSpeakStartEvent( aPluginName: string, aEventFunc: OnDialogSpeakStartFunc ): number {
        return this.mBotComponent.addDialogSpeakStartEvent( aPluginName, aEventFunc );
    }

    addDialogSpeakStopEvent( aPluginName: string, aEventFunc: OnDialogSpeakStopFunc ): number {
        return this.mBotComponent.addDialogSpeakStopEvent( aPluginName, aEventFunc );
    }

    addErrorEvent( aPluginName: string, aEventFunc: OnSpeechErrorFunc ): number {
        return this.mBotComponent.addErrorEvent( aPluginName, aEventFunc );
    }


    removeDialogSetEvent( aPluginName: string ): number {
        return this.mBotComponent.removeDialogSetEvent( aPluginName );
    }

    removeDialogJsonEvent( aPluginName: string ): number {
        return this.mBotComponent.removeDialogJsonEvent( aPluginName );
    }

    removeDialogParseEvent( aPluginName: string ): number {
        return this.mBotComponent.removeDialogParseEvent( aPluginName );
    }

    removeDialogStartEvent( aPluginName ): number {
        return this.mBotComponent.removeDialogStartEvent( aPluginName );
    }

    removeDialogStopEvent( aPluginName ): number {
        return this.mBotComponent.removeDialogStopEvent( aPluginName );
    }

    removeDialogStateSetEvent( aPluginName: string ): number {
        return this.mBotComponent.removeDialogStateSetEvent( aPluginName );
    }

    removeDialogActionEvent( aPluginName: string ): number {
        return this.mBotComponent.removeDialogActionEvent( aPluginName );
    }

    removeDialogActionStopEvent( aPluginName: string ): number {
        return this.mBotComponent.removeDialogActionStopEvent( aPluginName );
    }

    removeDialogSpeakEvent( aPluginName: string ): number {
        return this.mBotComponent.removeDialogSpeakEvent( aPluginName );
    }

    removeDialogSpeakStartEvent( aPluginName: string ): number {
        return this.mBotComponent.removeDialogSpeakStartEvent( aPluginName );
    }

    removeDialogSpeakStopEvent( aPluginName: string ): number {
        return this.mBotComponent.removeDialogSpeakStopEvent( aPluginName );
    }

    removeErrorEvent( aPluginName: string ): number {
        return this.mBotComponent.removeErrorEvent( aPluginName );
    }

    removeAllEvent( aPluginName: string ): number {
        return this.mBotComponent.removeAllEvent( aPluginName );
    }


    // Speak-Funktionen


    isSpeak(): boolean {
        return this.mBotComponent.isSpeak();
    }


    setSpeakOn(): number {
        return this.mBotComponent.setSpeakOn();
    }


    setSpeakOff(): number {
        return this.mBotComponent.setSpeakOff();
    }

    getSpeak(): SpeakInterface {
        return this.mBotComponent.getSpeak();
    }


    // Listen-Funktionen


    isListen(): boolean {
        return this.mBotComponent.isListen();
    }

    setListenOn(): number {
        return this.mBotComponent.setListenOn();
    }


    setListenOff(): number {
        return this.mBotComponent.setListenOff();
    }


    getListen(): ListenInterface {
        return this.mBotComponent.getListen();
    }


    // Action-Funktionen


    isAction(): boolean {
        return this.mBotComponent.isAction();
    }

    setActionOn(): number {
        return this.mBotComponent.setActionOn();
    }


    setActionOff(): number {
        return this.mBotComponent.setActionOff();
    }


    getAction(): ActionInterface {
        return this.mBotComponent.getAction();
    }


    // Json-Funktionen


    transformJsonFile( aJsonFileName: string ): number {
        return this.mBotComponent.transformJsonFile( aJsonFileName );
    }


    transformJsonData( aJsonData: DialogDataInterface[]): number {
        return this.mBotComponent.transformJsonData( aJsonData );
    }


    // Parser-Funktionen


    parseSpeechDefFile( aFileName: string ): number {
        return this.mBotComponent.parseSpeechDefFile( aFileName );
    }


    parseSpeechDefData( aData: string ): number {
        return this.mBotComponent.parseSpeechDefData( aData );
    }


    // Dialog-Funktionen


    clearDialog(): number {
        return this.mBotComponent.clearDialog();
    }

    setDialog( aDialogName: string ): number {
        return this.mBotComponent.setDialog( aDialogName );
    }

    getDialog(): string {
        return this.mBotComponent.getDialog();
    }


    toggleDialog(): number {
        return this.mBotComponent.toggleDialog();
    }


    setDialogFilePath( aDialogFilePath: string ): number {
        return this.mBotComponent.setDialogFilePath( aDialogFilePath );
    }


    getDialogFilePath(): string {
        return this.mBotComponent.getDialogFilePath();
    }

    setDialogFileName( aDialogFileName: string ): number {
        return this.mBotComponent.setDialogFileName( aDialogFileName );
    }

    getDialogFileName(): string {
        return this.mBotComponent.getDialogFileName();
    }

    loadDialogFile( aDialogFileName: string ): number {
        return this.mBotComponent.loadDialogFile( aDialogFileName );
    }

    writeDialogData( aDialogData: string ): number {
        return this.mBotComponent.writeDialogData( aDialogData );
    }

    skipNextSpeak(): number {
        return this.mBotComponent.skipNextSpeak();
    }


    // Zustands-Funktionen


    setDialogState( aState: string, aContext?: DialogStateContextInterface ): number {
        return this.mBotComponent.setDialogState( aState, aContext );
    }

    getDialogState(): string {
        return this.mBotComponent.getDialogState();
    }

    setDialogStateContext( aContext: DialogStateContextInterface ): number {
        return this.mBotComponent.setDialogStateContext( aContext );
    }


    // Kontext-Funktionen


    clearContext(): number {
        return this.mBotComponent.clearContext();
    }

    addContextElement( aElementName: string, aContextName: string ): number {
        return this.mBotComponent.addContextElement( aElementName, aContextName );
    }

    removeContextElement( aElementName: string, aContextName: string ): number {
        return this.mBotComponent.removeContextElement( aElementName, aContextName );
    }

}
