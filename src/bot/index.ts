/** @packageDocumentation
 * Globale Export-Datei fuer Bot
 *
 * Version: 1.0
 * Datum:   01.06.2020
 *
 * Definiert das gesamte Bot-API:
 *
 * @module bot
 * @author SB
 */


// Global API


export { BOT_API_VERSION } from './bot-version';
export { BOT_TYPE_NAME, BOT_MOCK_NAME, BOT_COMPONENT_NAME, BOT_COMPONENTFACTORY_NAME, BOT_COMPONENTBUILDER_NAME } from './bot-const';
export { BotComponentBuilder } from './component/bot-component-builder';
export { BotComponentFactory } from './component/bot-component-factory';
export { BotComponentInterface } from './component/bot-component.interface';
export { BotComponent } from './component/bot-component';
export { BotOptionInterface } from './bot-option.interface';
export { BotInterface } from './bot.interface';
export { BotFactory } from './bot-factory';
export { Bot } from './bot';
