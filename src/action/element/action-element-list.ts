/**
 * Verwaltet alle angemeldeten Elemente fuer die Action-Events
 * Ermoeglicht die direkte Verbindung von App-Elementen mit den Action-Events.
 *
 * Letzte Aenderung: 10.09.2018
 * Status: gelb
 *
 * @module action/element
 * @author SB
 */


// core

import { ErrorBase } from '../../core/error/error-base';


// action

import { ActionStartFunc, ActionStopFunc } from './../action-function.type';
import { ActionDataInterface } from './../action-data.interface';


// Konstanten

const ACTION_START_INDEX = 0;
const ACTION_STOP_INDEX = 1;


/** @export
 * ActionElementList Klasse
 */

export class ActionElementList extends ErrorBase {

    mActionFuncList = new Map<string, [ActionStartFunc, ActionStopFunc]>();
    mActionStopFuncList = new Map<string, ActionStopFunc>();


    constructor() {
        super( 'ActionElementList' );
    }


    /**
     * Liste loeschen
     */

    clear(): void {
        this.mActionFuncList.clear();
        this.mActionStopFuncList.clear();
    }


    /**
     * Eintragen eines Elementes in die Liste
     *
     * @param {string} aElementName - Name des Elementes zu den Actionfunktionen
     * @param {function} aActionStartFunc - StartActionfunktion als Callback-Objekt eintragen
     * @param {function} aActionStopFunc - StopActionfunktion als Callback-Objekt eintragen
     *
     * @return {number} errorcode (0,-1)
     */

    insert( aElementName: string, aActionStartFunc: ActionStartFunc, aActionStopFunc: ActionStopFunc ): number {
        // pruefen auf Parameter
        if ( !aElementName ) {
            // TODO: Fehler kommt haeufiger vor, daher erst mal keine Fehlermeldung
            this._error( 'insert', 'kein Elementname uebergeben' );
            return -1;
        }
        if ( this.mActionFuncList.get( aElementName )) {
            this._error( 'insert', 'Element bereits eingetragen' );
            return -1;
        }
        if ( typeof aActionStartFunc !== 'function' ) {
            this._error( 'insert', 'keine ActionStart-Funktion uebergeben' );
            return -1;
        }
        if ( typeof aActionStopFunc !== 'function' ) {
            this._error( 'insert', 'keine ActionStop-Funktion uebergeben' );
            return -1;
        }
        // Element in Funktionsliste eintragen
        try {
            const actionTuple: [ActionStartFunc, ActionStopFunc] = [ aActionStartFunc, aActionStopFunc ];
            this.mActionFuncList.set( aElementName, actionTuple );
            return 0;
        } catch ( aException ) {
            this._exception( 'insert', aException );
            return -1;
        }
    }


    /**
     * Entfernen des Elements aus der Liste
     *
     * @param {string} aElementName - Name des Elementes
     *
     * @return {number} errorcode (0,-1)
     */

    remove( aElementName: string ): number {
        if ( !aElementName ) {
            this._error( 'remove', 'kein Action-Elementname uebergeben' );
            return -1;
        }
        try {
            this.mActionFuncList.delete( aElementName );
            return 0;
        } catch ( aException ) {
            this._exception( 'remove', aException );
            return -1;
        }
    }


    /**
     * Rueckgabe der Element-StartActionfunktion
     *
     * @param {string} aElementName - Name des aktuellen ELements
     */

    getStartAction( aElementName: string ): ActionStartFunc {
        try {
            const actionTuple = this.mActionFuncList.get( aElementName );
            if ( actionTuple ) {
                return actionTuple[ ACTION_START_INDEX ];
            }
        } catch ( aException ) {
            this._exception( 'getStartAction', aException );
        }
        // leere Funktion zurueckgeben
        this._error( 'getStartAction', 'keine Funktion vorhanden' );
        return (aActionObject: ActionDataInterface) => 0;
    }


    /**
     * Rueckgabe der Element-StopActionfunktion
     *
     * @param {string} aElementName - Name des aktuellen Elements
     */

    getStopAction( aElementName: string ): ActionStopFunc {
        try {
            const actionTuple = this.mActionFuncList.get( aElementName );
            if ( actionTuple ) {
                return actionTuple[ ACTION_STOP_INDEX ];
            }
        } catch ( aException ) {
            this._exception( 'getStopAction', aException );
        }
        // leere Funktion zurueckgeben
        this._error( 'getStopAction', 'keine Funktion vorhanden' );
        return () => 0;
    }


    /**
     * Rueckgabe der Element-Actionfunktionen
     *
     * @param {string} aElementName - Name des aktuellen Elements
     *
     * @return {array} actionTuple - null oder beide Actionfunktionen
     */

    getActionTuple( aElementName: string ): [ActionStartFunc, ActionStopFunc] {
        try {
            return this.mActionFuncList.get( aElementName );
        } catch ( aException ) {
            this._exception( 'getActionTupel', aException );
            return null;
        }
    }


    /**
     * Aktion ausfuehren
     *
     * @param {ActionDataInterface} aAction - Aktionsobjekt
     *
     * @return {number} errorcode (0,-1)
     */

    startAction(aAction: ActionDataInterface): number {
        // console.logs('ActionElementList.startAction:', aAction);
        try {
            // pruefen auf Element-Name
            const elementName = aAction.id || '';
            if ( !elementName ) {
                this._error( 'startAction', 'kein Elementname vorhanden' );
                return -1;
            }
            // Aktionsfunktionen auslesen
            const actionTuple = this.getActionTuple( elementName );
            if ( !actionTuple ) {
                // ist eigentlich kein Fehler
                // this._error( 'startAction', 'Action nicht gefunden ' + elementName );
                return 0;
            }
            // StartAction ausfuehren
            const startActionFunction = actionTuple[ ACTION_START_INDEX ];
            if ( typeof startActionFunction !== 'function' ) {
                this._error( 'startAction', 'keine StartAction-Funktion vorhanden' );
                return -1;
            }
            // Stopfunktion in Stopliste eintragen
            const stopActionFunction = actionTuple[ ACTION_STOP_INDEX ];
            if ( typeof stopActionFunction !== 'function' ) {
                this._error( 'startAction', 'keine StopAction-Funktion vorhanden' );
                return -1;
            }
            this.mActionStopFuncList.set( elementName, stopActionFunction );
            // Startfunktion ausfuehren
            startActionFunction( aAction );
            return 0;
        } catch ( aException ) {
            this._exception( 'startAction', aException );
            return -1;
        }
    }


    /**
     * alle Aktionen, die gestartet worden sind, sofort beenden
     */

    stopAction(): number {
        try {
            // Stopliste abarbeiten
            this.mActionStopFuncList.forEach(( value: ActionStopFunc ) => {
                const stopActionFunction = value;
                if ( typeof stopActionFunction === 'function' ) {
                    stopActionFunction();
                }
            });
            // stopliste loeschen
            this.mActionStopFuncList.clear();
           return 0;
        } catch ( aException ) {
            this._exception( 'stopAction', aException );
            return -1;
        }
    }

}
