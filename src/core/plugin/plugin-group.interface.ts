/** @packageDocumentation
 * PluginGroup Schnittstelle
 *
 * Letzte Aenderung: 04.10.2018
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */


// global

import { SpeechMessageInterface, SpeechSendMessageFunc } from '../interface/speech-message.interface';


// plugin

import { PluginInterface } from './plugin.interface';


/**
 * Definiert die Schnittstelle fuer eine PluginGroup
 */

export interface PluginGroupInterface extends PluginInterface {

    // Plugin-Funktionen

    insertPlugin( aPluginName: string, aPlugin: PluginInterface ): number;
    removePlugin( aPluginName: string ): number;
    removeAllPlugin(): number;

    findPlugin( aPluginName: string ): PluginInterface;
    firstPlugin(): PluginInterface;
    nextPlugin(): PluginInterface;

    isPlugin( aPluginName: string): boolean;
    getPluginSize(): number;

    startPlugin( aPluginName: string, aOption?: any ): number;
    stopPlugin( aPluginName: string ): number;

    startAllPlugin( aOption?: any ): number;
    stopAllPlugin(): number;
}
