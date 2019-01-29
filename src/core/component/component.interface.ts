/**
 * Komponenten Schnittstelle
 *
 * Letzte Aenderung: 04.10.2018
 * Status: gruen
 *
 * @module core/component
 * @author SB
 */


// global

import { SpeechMessageInterface, SpeechSendMessageFunc } from '../../interface/speech-message.interface';


// event

import { EventFunc } from '../event/event-function-list';


// plugin

import { PluginGroupInterface } from '../plugin/plugin-group.interface';


// Funktionen

export type ComponentHandleMessageFunc = ( aMessage: SpeechMessageInterface ) => number;


/**
 * Definiert die Schnittstelle fuer eine Komponente
 */

export interface ComponentInterface extends PluginGroupInterface {


    // Component-Funktionen

    getVersion(): string;


    // Netz-Funktionen


    connect(): number;
    isConnect(): boolean;

    getNetType(): string;


    // Message-Funktionen


    setSendMessageFunc( aSendMessageFunc: SpeechSendMessageFunc ): number;
    sendMessage( aMessage: SpeechMessageInterface ): number;


    // Event-Funktionen


    addEventListener( aPluginName: string, aEventName: string, aEventFunc: EventFunc ): number;
    removeEventListener( aPluginName: string, aEventName: string ): number;
}
