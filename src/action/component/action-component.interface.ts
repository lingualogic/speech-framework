/** @packageDocumentation
 * ActionComponent Schnittstelle
 *
 * Letzte Aenderung: 18.10.2018
 * Status: gelb
 *
 * @module action/component
 * @author SB
 */


// base

import { BaseComponentInterface } from '@speech/base';


// action

import { ActionFunc } from './../action-function.type';
import { ActionDataInterface } from '../action-data.interface';
import { ActionInterface } from '../action.interface';


/** @export
 * ActionComponent Schnittstelle
 *
 * @extends {BaseComponentInterface, ActionInterface}
 */

export interface ActionComponentInterface extends BaseComponentInterface, ActionInterface {


    // Bind-Functionen


    /**
     * Dient zum Verbinden der StartAction Funktion mit einer anderen Komponente, die diese Funktion aufruft
     *
     * @returns {ActionFunc} Rueckgabe der StartAction Funktion
     */

    getActionFunc(): ActionFunc;


    // Aktion-Funktionen


    /**
     * Ausfuehren einer Aktion mit den uebergebenen Aktionsdaten.
     * Es werden nicht die vorher eingetragenen Aktionsattribute verwendet.
     *
     * @param {ActionDataInterface} aActionData - Aktionsdaten fuer auszufuehrende Aktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    action( aAction: ActionDataInterface ): number;

}
