/**
 * Globale Fabrik zur Erzeugung einer Bot API Instanz.
 *
 * Version: 1.0
 * Datum:   06.09.2018
 *
 * Letzte Aenderung: 06.09.2018
 * Status: gruen
 *
 * @module bot
 * @author SB
 */


// bot

import { BOT_COMPONENT_NAME, BOT_MOCK_NAME } from './bot-const';
import { BotOptionInterface } from './bot-option.interface';
import { BotInterface } from './bot.interface';
import { Bot } from './bot';


// Global API


/** @export
 * Statische Klasse zur Erzeugung eines Bots.
 */

export class BotFactory {


    /**
     * Konstruktor ist privat, es kann keine Instanz der Klasse erzeugt werden
     */

    private constructor() {}


    /**
     * Kann verschiedene Versionen von Bot
     * zurueckgeben, einschließlich eines Bot-Mocks.
     *
     * @param {string} aName - Name des zu erzeugenden Bots
     * @param {BotOptionInterface} aOption - optionale Parameter
     *
     * @return {BotInterface} Bot Instanz wird zurueckgegeben
     */

    static create( aName?: string, aOption?: BotOptionInterface ): BotInterface {
        const name = aName || BOT_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( name === BOT_MOCK_NAME ) {
            // TODO: Einbau des Bot-Mocks
            // return new BotMock();
        }

        try {
            return new Bot( aOption );
        } catch ( aException ) {
            console.log('BotFactory.create: Exception', aException.message);
            return null;
        }
    }

}
