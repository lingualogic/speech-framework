/** @packageDocumentation
 * Fabrik zur Erzeugung einer BotComponent
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gruen
 *
 * @module bot/component
 * @author SB
 */


// core

import { PluginFactory } from '@speech/core';


// bot

import { BOT_TYPE_NAME, BOT_COMPONENTFACTORY_NAME, BOT_COMPONENT_NAME, BOT_MOCK_NAME } from '../bot-const';
import { BotComponentInterface } from './bot-component.interface';
import { BotComponent } from './bot-component';


// Global API


/** @export
 * BotComponentFactory zur Erzeugung einer neuen BotComponent Instanz
 */

export class BotComponentFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'BotComponentFactory' );
    }


    getType(): string {
        return BOT_TYPE_NAME;
    }


    getName(): string {
        return BOT_COMPONENTFACTORY_NAME;
    }


    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): BotComponentInterface {
        return new BotComponent( aRegisterFlag );
    }

    /**
     * Kann verschiedene Versionen des Bot
     * zurueckgeben, einschließlich eines Bot-Mocks.
     *
     * @param {string} aBotName - Name der zu erzeugenden Bot Komponente
     * @param {boolean} aRegisterFlag - wenn true, dann in PluginManager eintragen
     *
     * @return {BotComponentInterface} botComponent wird zurueckgegeben
     */

    create( aBotName?: string, aRegisterFlag = true ): BotComponentInterface {
        const botName = aBotName || BOT_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( botName === BOT_MOCK_NAME ) {
            // TODO: Einbau des Listen-Mocks
            // return new ListenMock();
        }

        // Bot erzeugen

        try {
            return this._newPlugin( botName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }
    }

}
