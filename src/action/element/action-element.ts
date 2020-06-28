/** @packageDocumentation
 * ActionElement-Plugin definiert die Funktionalitaet zur Steuerung einer App mit Hilfe von Aktionen.
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * @module action/element
 * @author SB
 */


// core

import { Plugin } from '@speech/core';


// action

import { ActionStartFunc, ActionStopFunc } from './../action-function.type';
import { ActionDataInterface } from './../action-data.interface';


// element

import { ACTIONELEMENT_PLUGIN_NAME } from './action-element-const';
import { ActionElementList } from './action-element-list';
import { ActionElementInterface } from './action-element.interface';


/** @export
 * ActionPlugin Klasse
 */

export class ActionElement extends Plugin implements ActionElementInterface {

    // innere Listen

    mActionElementList = new ActionElementList();


    /**
     * ActionPlugin Objekt erzeugen
     */

    constructor( aRegisterFlag = true ) {
        super( ACTIONELEMENT_PLUGIN_NAME, aRegisterFlag );
        this._setErrorClassName( 'ActionElement' );
        this.mActionElementList._setErrorOutputFunc( this._getErrorOutputFunc());
    }


    // Plugin-Funktionen


    /**
     * Initialisierung des ActionElement-Plugin
     *
     * @param {Object} aOption - optionale Parameter
     *
     * @return {number} errorcode (0,-1)
     */

    init( aOption?: any ): number {
        // console.log('ActionElement.init:', aOptions);

        // Initialisierung erfolgreich

        return super.init( aOption );
    }


    /**
     * Freigabe des Speech-Systems
     *
     * @public
     *
     * @return {number} errorcode (0,-1)
     */

    done(): number {
        // console.log('ActionElement.done');

        this.mActionElementList.clear();
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
        super._setErrorOutput( aErrorOutputFlag );
        this.mActionElementList._setErrorOutput( aErrorOutputFlag );
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
        return this.mActionElementList.startAction( aAction );
    }


    stopAction(): number {
        return this.mActionElementList.stopAction();
    }


    // Actionelement-Funktionen


    /**
     * Elementaktionen eintragen
     *
     * @param {string} aElementName - Name des Elements
     * @param {ActionStartFunc} mActionStartFunc - startet eine Aktion zum Element
     * @param {ActiopnStopFunc} aActionStopFunc - beendet eine Aktion zum Element
     *
     * @return errorcode(0,-1)
     */

    insert( aElementName: string, mActionStartFunc: ActionStartFunc, aActionStopFunc: ActionStopFunc ): number {
        return this.mActionElementList.insert( aElementName, mActionStartFunc, aActionStopFunc );
    }


    /**
     * Elementaktionen aus Liste wieder entfernen
     *
     * @param aElementName - Name des zu entfernenden Elements
     *
     * @return errorcode(0,-1)
     */

    remove( aElementName: string ): number {
        return this.mActionElementList.remove( aElementName );
    }


    /**
     * Entfernen aller Aktions-Elemente
     *
     * @return {number} Fehlercode 0 oder -1
     */

    clear(): number {
        this.mActionElementList.clear();
        return 0;
    }

}
