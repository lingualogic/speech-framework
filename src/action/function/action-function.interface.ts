/** @packageDocumentation
 * ActionFunction Schnittstelle fuer die Steuerung einer App ueber Aktionen
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * @module action/function
 * @author SB
 */


// core

import { PluginInterface } from '@speech/core';


// action

import { ActionStartFunc, ActionStopFunc } from './../action-function.type';
import { ActionDataInterface } from './../action-data.interface';


/** @export
 * ActionFunction Schnittstelle
 */

export interface ActionFunctionInterface extends PluginInterface {


    // Bind-Functionen


    getStartActionFunc(): ActionStartFunc;
    getStopActionFunc(): ActionStopFunc;


    // Aktions-Funktionen


    startAction( aAction: ActionDataInterface ): number;
    stopAction(): number;


    // Listen-Funktionen


    insert( aFunctionName: string, aActionStartFunc: ActionStartFunc, aActionStopFunc: ActionStopFunc ): number;
    remove( aFunctionName: string ): number;
    clear(): number;

}
