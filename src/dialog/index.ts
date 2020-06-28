/** @packageDocumentation
 * Globale Export-Datei fuer Dialog
 *
 * Version: 1.0
 * Datum:   01.06.2020
 *
 * Definiert das gesamte Dialog-API:
 *
 * @module dialog
 * @author SB
 */


// Global API

export * from './dialog-version';
export * from './dialog-const';
export * from './dialog-function.type';
export { DialogComponentBuilder } from './component/dialog-component-builder';
export { DialogComponentFactory } from './component/dialog-component-factory';
export { DialogComponentInterface } from './component/dialog-component.interface';
export { DialogComponent } from './component/dialog-component';
export { DialogActionInterface } from './dialog-action.interface';
export { DialogDataInterface } from './dialog-data.interface';
export { DialogOptionInterface } from './dialog-option.interface';
export { DialogSpeakInterface } from './dialog-speak.interface';
export { DialogStateContextInterface } from './dialog-state-context.interface';
export { DialogInterface } from './dialog.interface';
export { DialogFactory } from './dialog-factory';
export { Dialog } from './dialog';
