/**
 * ActionFunction definiert die Funktionalitaet zur Steuerung einer App mit Hilfe von Aktionen.
 *
 * Letzte Aenderung: 10.09.2018
 * Status: gelb
 *
 * @module action/function
 * @author SB
 */


// plugin

import { Plugin } from '../../core/plugin/plugin';


// action

import { ActionStartFunc, ActionStopFunc } from '../action-function.type';
import { ActionDataInterface } from '../action-data.interface';


// function

import { ACTIONFUNCTION_PLUGIN_NAME } from './action-function-const';
import { ActionFunctionList } from './action-function-list';
import { ActionFunctionInterface } from './action-function.interface';


/** @export
 * ActionFunction Klasse
 */

export class ActionFunction extends Plugin implements ActionFunctionInterface {

    // innere Listen

    mActionFunctionList = new ActionFunctionList();


    /**
     * ActionPlugin Objekt erzeugen
     */

    constructor( aRegisterFlag = true ) {
        super( ACTIONFUNCTION_PLUGIN_NAME, aRegisterFlag );
        this._setErrorClassName( 'ActionFunction' );
        this.mActionFunctionList._setErrorOutputFunc( this._getErrorOutputFunc());
    }


    // Plugin-Funktionen


    /**
     * Initialisierung des ActionFunction-Plugin
     *
     * @param {Object} aOption - optionale Parameter
     *
     * @return {number} errorcode (0,-1)
     */

    init( aOption?: any ): number {
        // console.log('ActionFunction.init:', aOptions);

        // Initialisierung erfolgreich

        return super.init( aOption );
    }


    /**
     * Freigabe der ActionFunction
     *
     * @public
     *
     * @return {number} errorcode (0,-1)
     */

    done(): number {
        // console.log('ActionFunction.done');

        this.mActionFunctionList.clear();
        return super.done();
    }


    // Fehler-Funktionen


    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */

    _setErrorOutput( aErrorOutputFlag: boolean ): void {
        // console.log('ActionFunction._setErrorOutput:', aErrorOutputFlag);
        super._setErrorOutput( aErrorOutputFlag );
        this.mActionFunctionList._setErrorOutput( aErrorOutputFlag );
    }


    // Binding-Funktionen


    getStartActionFunc(): ActionStartFunc {
        return (aAction: ActionDataInterface) => this.startAction( aAction );
    }


    getStopActionFunc(): ActionStopFunc {
        return () => this.stopAction();
    }


    // Aktions-Funktionen


    startAction( aAction: ActionDataInterface ): number {
        return this.mActionFunctionList.startAction( aAction );
    }


    stopAction(): number {
        return this.mActionFunctionList.stopAction();
    }


    // Actionsfunktionen-Funktionen


    /**
     * Eintragen der Actions-Funktion
     *
     * @param {string} aActionName - Name der Aktion
     * @param {ActionStartFunc} mActionStartFunc - startet die Aktion
     * @param {ActionStopFunc} aActionStopFunc - beendet die Aktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    insert( aActionName: string, mActionStartFunc: ActionStartFunc, aActionStopFunc: ActionStopFunc ): number {
        return this.mActionFunctionList.insert( aActionName, mActionStartFunc, aActionStopFunc );
    }


    /**
     * Entfernen der Aktions-Funktion
     *
     * @param {string} aActionName
     *
     * @return {number} Fehlercode 0 oder -1
     */

    remove( aActionName: string ): number {
        return this.mActionFunctionList.remove( aActionName );
    }


    /**
     * Entfernen aller Aktions-Funktionen
     *
     * @return {number} Fehlercode 0 oder -1
     */

    clear(): number {
        this.mActionFunctionList.clear();
        return 0;
    }

}
