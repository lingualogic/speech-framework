/** @packageDocumentation
 * Globale Export-Datei fuer Speak
 *
 * Version: 1.0
 * Datum:   01.12.2018
 *
 * Definiert das gesamte Speak-API:
 *
 * @module speak
 * @author SB
 */


// Global API


export * from './speak-version';
export * from './speak-const';
export { SpeakComponentBuilder } from './component/speak-component-builder';
export { SpeakComponentFactory } from './component/speak-component-factory';
export { SpeakComponentInterface } from './component/speak-component.interface';
export { SpeakComponent } from './component/speak-component';
export { SpeakOptionInterface } from './speak-option.interface';
export { SpeakInterface } from './speak.interface';
export { SpeakFactory } from './speak-factory';
export { Speak } from './speak';
