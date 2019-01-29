/**
 * ActionFunction Schnittstelle fuer die Steuerung einer App ueber Aktionen
 *
 * Letzte Aenderung: 10.09.2018
 * Status: gelb
 *
 * @module action/function
 * @author SB
 */


// plugin

import { PluginInterface } from '../../core/plugin/plugin.interface';


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
