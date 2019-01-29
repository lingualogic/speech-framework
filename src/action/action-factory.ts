/**
 * Globale Fabrik zur Erzeugung einer Action API Instanz.
 *
 * API-Version: 1.0
 * Datum:   29.08.2018
 *
 * Letzte Aenderung: 10.09.2018
 * Status: gelb
 *
 * @module action
 * @author SB
 */


// action

import { ACTION_PLUGIN_NAME, ACTION_MOCK_NAME } from './action-const';
import { ActionOptionInterface } from './action-option.interface';
import { ActionInterface } from './action.interface';
import { Action } from './action';


// Global API


/** @export
 * Statische Klasse zur Erzeugung von Action.
 */

export class ActionFactory {


    /**
     * Konstruktor ist privat, es kann keine Instanz der Klasse erzeugt werden
     */

    private constructor() {}


    /**
     * Kann verschiedene Versionen von Action
     * zurueckgeben, einschließlich eines Action-Mocks.
     *
     * @param {string} aName - Name der zu erzeugenden Action
     * @param {ActionOptionInterface} aOption - optionale Parameter
     *
     * @return {ActionInterface} Action Instanz wird zurueckgegeben
     */

    static create( aName?: string, aOption?: ActionOptionInterface ): ActionInterface {
        const name = aName || ACTION_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( name === ACTION_MOCK_NAME ) {
            // TODO: Einbau des Action-Mocks
            // return new ActionMock();
        }

        try {
            // console.log('ActionFactory.create:', aName, aOption);
            return new Action( aOption );
        } catch ( aException ) {
            console.log('ActionFactory.create: Exception', aException);
            return null;
        }
    }

}
