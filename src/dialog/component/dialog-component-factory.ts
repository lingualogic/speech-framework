/**
 * Globale Fabrik zur Erzeugung eines DialogComponent
 *
 * Letzte Aenderung: 04.10.2018
 * Status: gelb
 *
 * @module dialog/component
 * @author SB
 */


// plugin

import { PluginFactory } from '../../core/plugin/plugin-factory';


// dialog

import { DIALOG_TYPE_NAME, DIALOG_COMPONENTFACTORY_NAME, DIALOG_COMPONENT_NAME, DIALOG_MOCK_NAME } from '../dialog-const';
import { DialogComponentInterface } from './dialog-component.interface';
import { DialogComponent } from './dialog-component';


// Global API


/** @export
 * DialogComponentFactory Klasse
 */
export class DialogComponentFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'DialogComponentFactory' );
    }


    getName(): string {
        return DIALOG_COMPONENTFACTORY_NAME;
    }


    getType(): string {
        return DIALOG_TYPE_NAME;
    }


    /**
     * Kann verschiedene Versionen des Dialog Plugins
     * zurueckgeben, einschließlich eines Dialog-Mocks.
     *
     * @param {string} aDialogName - Name der zu erzeugenden Dialog Komponente
     * @param {boolean} aRegisterFlag - eintragen in PluginManager
     *
     * @return {DialogComponentInterface} Dialog wird zurueckgegeben
     */

    create( aDialogName?: string, aRegisterFlag = true ): DialogComponentInterface {
        const dialogName = aDialogName || DIALOG_COMPONENT_NAME;
        // Mock zurueckgeben
        if ( dialogName === DIALOG_MOCK_NAME ) {
            // TODO: Einbau des Dialog-Mocks
            // return new DialogMock();
        }

        // Dialog erzeugen

        try {
            return new DialogComponent( aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }
    }

}
