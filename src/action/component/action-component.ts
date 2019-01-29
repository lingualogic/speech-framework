/**
 * Action Komponente zur Verwaltung von Aktionen
 *
 * Letzte Aenderung: 18.10.2018
 * Status: gelb
 *
 * @module action/component
 * @author SB
 */


// base

import { BaseComponent } from '../../base/component/base-component';


// function

import { ACTIONFUNCTION_PLUGIN_NAME } from './../function/action-function-const';
import { ActionFunctionInterface } from './../function/action-function.interface';


// element

import { ACTIONELEMENT_PLUGIN_NAME } from './../element/action-element-const';
import { ActionElementInterface } from './../element/action-element.interface';


// action

import { ACTION_API_VERSION } from '../action-version';
import { ACTION_TYPE_NAME, ACTION_COMPONENT_NAME, ACTION_MAX_TIMEOUT } from '../action-const';
import { ActionFunc, ActionStartFunc, ActionStopFunc } from './../action-function.type';
import { ActionDataInterface } from './../action-data.interface';
import { ActionOptionInterface } from './../action-option.interface';
import { ActionComponentInterface } from './action-component.interface';


const ACTION_COMPONENT_VERSION = ACTION_API_VERSION;


/** @export
 * ActionComponent Klasse
 */

export class ActionComponent extends BaseComponent implements ActionComponentInterface {


    // innere Komponenten

    mActionFunction: ActionFunctionInterface = null;
    mActionElement: ActionElementInterface = null;


    // interne Attribute

    mActionRunningFlag = false;
    mActionName = '';                          // Name der auszufuehrenden Aktion
    mActionElementType = '';                   // Name des Elementtyps der Aktion
    mActionElementName = '';                   // Name des Elements der Aktion
    mActionTimeout = ACTION_MAX_TIMEOUT;       // Aktions-Timeout 10 sekunden
    mActionTimeoutId = 0;                      // Timeout-ID


    /**
     * Bot Objekt erzeugen
     *
     * @param {boolean} aRegisterFlag - wenn true, dann in PluginManager eintragen
     */

    constructor( aRegisterFlag = true ) {
        super( ACTION_COMPONENT_NAME, aRegisterFlag );
    }


    getType(): string {
        return ACTION_TYPE_NAME;
    }

    getClass(): string {
        return 'ActionComponent';
    }

    getVersion(): string {
        return ACTION_COMPONENT_VERSION;
    }

    getServerVersion(): string {
        return '';
    }


    // Komponenten-Funktionen


    /**
     * Hier werden alle inneren Plugins der Komponente initialisiert
     *
     * @protected
     * @returns {number} Fehlercode 0 oder -1
     */

    _initAllPlugin(): number {
        this.mActionFunction = this.findPlugin( ACTIONFUNCTION_PLUGIN_NAME ) as ActionFunctionInterface;
        this.mActionElement = this.findPlugin( ACTIONELEMENT_PLUGIN_NAME ) as ActionElementInterface;
        return 0;
    }


    /**
     * Initialisierung der Action-Komponente
     *
     * @param {ActionOptionInterface} aOption - optionale Parameter
     *
     * @return {number} errorcode (0,-1)
     */

    init( aOption?: ActionOptionInterface ): number {
        return super.init( aOption );
    }


    /**
     * Loeschen der inneren Plugins
     *
     * @protected
     */

    _doneAllPlugin(): void {
        // interne Komponenten
        this.mActionFunction = null;
        this.mActionElement = null;
    }


    /**
     * Loeschen der inneren Attribute
     *
     * @protected
     */

    _doneAllAttribute(): void {
        // interne Attribute
        this.mActionName = '';
        this.mActionElementType = '';
        this.mActionElementName = '';
        this.mActionTimeout = ACTION_MAX_TIMEOUT;
    }


    /**
     * Defaultwerte setzen
     *
     * @protected
     */

    _resetAllDefault(): void {
        // interne Attribute

        this.mActionName = '';
        this.mActionElementType = '';
        this.mActionElementName = '';
        this.mActionTimeout = ACTION_MAX_TIMEOUT;
    }


    /**
     * Auf Defaultwerte zuruecksetzen
     *
     * @param {ActionOptionInterface} aOption - optionale Parameter
     */

    reset( aOption?: ActionOptionInterface ): number {
        return super.reset( aOption );
    }


    // Binding-Funktionen


    getActionFunc(): ActionFunc {
        return (aActionData: ActionDataInterface) => this.action( aActionData );
    }


    // Aktions-Funktionen


    /**
     * Aktionsnamen eintragen
     *
     * @param {string} aActionName - Name der aktuell auszufuehrenden Aktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActionName( aActionName: string ): number {
        this.mActionName = aActionName;
        return 0;
    }


    /**
     * Aktionsname zurueckgeben
     *
     * @return {string} Rueckgabe des aktuell eingestellten Aktionsnamens
     */

    getActionName(): string {
        return this.mActionName;
    }


    /**
     * Elementtyp eintragen
     *
     * @param {string} aElementType - Name des Elementyps
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setElementType( aElementType: string ): number {
        this.mActionElementType = aElementType;
        return 0;
    }


    /**
     * Elementtyp zurueckgeben
     *
     * @return {string} Rueckgabe des aktuell eingestellten Elementtyps
     */

    getElementType(): string {
        return this.mActionElementType;
    }


    /**
     * Elementname eintragen
     *
     * @param {string} aElementName - Name des Elemens
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setElementName( aElementName: string ): number {
        this.mActionElementName = aElementName;
        return 0;
    }


    /**
     * Elementname zurueckgeben
     *
     * @return {string} Rueckgabe des aktuell eingestellten Elementnamens
     */

    getElementName(): string {
        return this.mActionElementName;
    }


    /**
     * Pruefen auf laufende Aktion.
     *
     * @return {boolean} Rueckgabe True, wenn Aktion laeuft
     */

    isRunning(): boolean {
        if ( !this.isActive()) {
            return false;
        }
        return this.mActionRunningFlag;
    }


    /**
     * Ausfuehren einer Aktion mit den uebergebenen Aktionsdaten.
     * Es werden nicht die vorher eingetragenen Aktionsattribute verwendet.
     *
     * @param {ActionDataInterface} aActionData - Aktionsdaten fuer auszufuehrende Aktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    action( aActionData: ActionDataInterface ): number {
        // pruefen auf externe Audiokomponente
        if ( !this.isActive()) {
            return 0;
        }
        // pruefen auf bereits gestarteten Aktion
        if ( this.isRunning()) {
            this._error( 'startAction', 'Aktion laeuft bereits' );
            return -1;
        }
        this.mActionRunningFlag = true;
        let result = 0;
        if ( this.mActionFunction ) {
            if ( this.mActionFunction.startAction( aActionData ) !== 0 ) {
                result = -1;
            }
        }
        if ( this.mActionElement ) {
            if ( this.mActionElement.startAction( aActionData ) !== 0 ) {
                result = -1;
            }
        }
        // Timeout fuer ActionStop setzen
        this.mActionTimeoutId = setTimeout(() => this.stop(), this.mActionTimeout );
        this._onStart();
        return result;
    }


    /**
     * Ausfuehren einer Aktion.
     * Es werden die vorher eingetragenen Aktionsattribute verwendet.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    start(): number {
        if ( !this.mActionName ) {
            this._error( 'startAction', 'kein Aktionsname vorhanden' );
            return -1;
        }
        if ( !this.mActionElementName ) {
            this._error( 'startAction', 'kein Elementname vorhanden' );
            return -1;
        }
        const actionData: ActionDataInterface = {
            action: this.mActionName,
            type: this.mActionElementType,
            id: this.mActionElementName
        };
        return this.action( actionData );
    }


    /**
     * Beenden einer Aktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    stop(): number {
        // pruefen auf externe Audiokomponente
        if ( !this.isActive()) {
            return 0;
        }
        // Timeout entfernen
        if ( this.mActionTimeoutId ) {
            clearTimeout( this.mActionTimeoutId );
            this.mActionTimeoutId = 0;
        }
        // pruefen auf laufende Aktion
        if ( !this.isRunning()) {
            return 0;
        }
        let result = 0;
        if ( this.mActionFunction ) {
            if ( this.mActionFunction.stopAction() !== 0 ) {
                result = -1;
            }
        }
        if ( this.mActionElement ) {
            if ( this.mActionElement.stopAction() !== 0 ) {
                result = -1;
            }
        }
        this.mActionRunningFlag = false;
        this._onStop();
        return result;
    }


    // Aktionfunktion-Funktionen


    addFunction( aFunctionName: string, aStartActionFunc: ActionStartFunc, aStopActionFunc?: ActionStopFunc ): number {
        if ( !this.mActionFunction ) {
            this._error( 'addFunction', 'kein ActionFunction-Plugin vorhanden' );
            return -1;
        }
        return this.mActionFunction.insert( aFunctionName, aStartActionFunc, aStopActionFunc );
    }


    removeFunction( aFunctionName: string ): number {
        if ( !this.mActionFunction) {
            this._error( 'removeFunction', 'kein ActionFunction-Plugin vorhanden' );
            return -1;
        }
        return this.mActionFunction.remove( aFunctionName );
    }


    // Aktionelement-Funktionen


    addElement( aElementName: string, aStartActionFunc: ActionStartFunc, aStopActionFunc: ActionStopFunc ): number {
        if ( !this.mActionElement ) {
            this._error( 'addElement', 'kein ActionElement-Plugin vorhanden' );
            return -1;
        }
        return this.mActionElement.insert( aElementName, aStartActionFunc, aStopActionFunc );
    }


    removeElement( aElementName: string ): number {
        if ( !this.mActionElement ) {
            this._error( 'removeElement', 'kein ActionElement-Plugin vorhanden' );
            return -1;
        }
        return this.mActionElement.remove( aElementName );
    }


}
