/** @packageDocumentation
 * ActionElement Schnittstelle fuer die Steuerung einer App ueber Aktionen
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * @module action/element
 * @author SB
 */


// core

import { PluginInterface } from '@speech/core';


// action

import { ActionStartFunc, ActionStopFunc } from './../action-function.type';
import { ActionDataInterface } from './../action-data.interface';


/** @export
 * ActionElement Schnittstelle
 */

export interface ActionElementInterface extends PluginInterface {


    // Bind-Functionen


    getStartActionFunc(): ActionStartFunc;
    getStopActionFunc(): ActionStopFunc;


    // Aktions-Funktionen


    startAction( aAction: ActionDataInterface ): number;
    stopAction(): number;


    // Listen-Funktionen


    insert( aElementName: string, aActionStartFunc: ActionStartFunc, aActionStopFunc: ActionStopFunc ): number;
    remove( aElementName: string ): number;
    clear(): number;

}
