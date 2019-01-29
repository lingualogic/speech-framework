/**
 * ActionComponentBuilder fuer die Erzeugung der ActionComponent
 *
 * Letzte Aenderung: 10.09.2018
 * Status: gruen
 *
 * @module action/component
 * @author SB
 */


// builder

import { Builder } from '../../core/builder/builder';


// action

import { ACTIONFUNCTION_FACTORY_NAME, ACTIONFUNCTION_PLUGIN_NAME } from './../function/action-function-const';
import { ActionFunctionFactory } from './../function/action-function-factory';
import { ActionFunctionInterface } from './../function/action-function.interface';

import { ACTIONELEMENT_FACTORY_NAME, ACTIONELEMENT_PLUGIN_NAME } from './../element/action-element-const';
import { ActionElementFactory } from './../element/action-element-factory';
import { ActionElementInterface } from './../element/action-element.interface';

import { ACTION_TYPE_NAME, ACTION_COMPONENTBUILDER_NAME, ACTION_COMPONENTFACTORY_NAME, ACTION_COMPONENT_NAME } from '../action-const';
import { ActionComponentFactory } from './action-component-factory';
import { ActionComponentInterface } from './action-component.interface';


/** @export
 * Klasse ActionComponentBuilder zum Erzeugen der Action-Komponente
 */

export class ActionComponentBuilder extends Builder {


    /**
     * Singleton der Action-Komponente
     */

    mActionComponent: ActionComponentInterface = null;


    constructor( aBuilderName?: string, aRegisterFlag = true ) {
        super( aBuilderName || 'ActionComponentBuilder', aRegisterFlag );
    }


    getClass(): string {
        return 'ActionComponentBuilder';
    }


    /**
     * Name des Builders zurueckgeben
     *
     * @return {string} builderName
     */

    getName(): string {
        return ACTION_COMPONENTBUILDER_NAME;
    }

    /**
     * Typ des Builders zurueckgeben
     *
     * @return {string} builderType
     */

    getType(): string {
        return ACTION_TYPE_NAME;
    }


    // Builder-Funktionen


    /**
     * Hauptfunktion des Builders.
     *
     * @return {ActionComponentInterface} component - Rueckgabe der erzeugten Komponente oder null
     */

    build(): ActionComponentInterface {
        // console.log('ActionComponentBuilder.build: start');
        // pruefen auf vorhandene Komponente
        if ( this.mActionComponent ) {
            // console.log('ActionComponentBuilder.build: Komponente ist bereits erzeugt');
            return this.mActionComponent;
        }
        try {
            const action = this._buildComponent();
            const actionFunction = this._getPlugin( ACTIONFUNCTION_PLUGIN_NAME, ACTIONFUNCTION_FACTORY_NAME, ActionFunctionFactory ) as ActionFunctionInterface;
            const actionElement = this._getPlugin( ACTIONELEMENT_PLUGIN_NAME, ACTIONELEMENT_FACTORY_NAME, ActionElementFactory ) as ActionElementInterface;
            if ( this._binder( action, actionFunction, actionElement ) !== 0 ) {
                this._error( 'build', 'Komponenten nicht verbunden' );
                return null;
            }
            return action;
        } catch ( aException ) {
            this._exception( 'build', aException );
            return null;
        }
    }


    /**
     * Hier wird die Komponente als Singleton erzeugt
     *
     * @private
     * @return {ActionComponentInterface} actionComponent - Rueckgabe des Component-Singletons
     */

    _buildComponent(): ActionComponentInterface {
        if ( !this.mActionComponent ) {
            this.mActionComponent = this._getPlugin( ACTION_COMPONENT_NAME, ACTION_COMPONENTFACTORY_NAME, ActionComponentFactory ) as ActionComponentInterface;
        }
        return this.mActionComponent;
    }


    /**
     * Verbindert die Komponenten und Plugins miteinander
     *
     * @private
     * @param {ActionComponentInterface} aAction - Action Komponente
     * @param {ActionFunctionInterface} aActionFunction - ActionFunction Plugin
     * @param {ActionElementInterface} aActionElement - ActionElement Plugin
     *
     * @return {number} errorCode(0,-1)
     */

    _binder( aAction: ActionComponentInterface, aActionFunction: ActionFunctionInterface, aActionElement: ActionElementInterface ): number {
        if ( !aAction ) {
            this._error( '_binder', 'Keine Action-Komponente vorhanden' );
            return -1;
        }
        if ( !aActionFunction ) {
            this._error( '_binder', 'Kein ActionFunction-Plugin vorhanden' );
            return -1;
        }
        if ( !aActionElement ) {
            this._error( '_binder', 'Kein ActionElement-Plugin vorhanden' );
            return -1;
        }
        // Einfuegen aller Komponenten und Plugins in Initialisierungreihenfolge
        if ( aAction.insertPlugin( aActionFunction.getName(), aActionFunction ) !== 0 ) {
            this._error( '_binder', 'ActionFunction-Plugin wurde nicht eingefuegt' );
            return -1;
        }
        if ( aAction.insertPlugin( aActionElement.getName(), aActionElement ) !== 0 ) {
            this._error( '_binder', 'ActionElement-Plugin wurde nicht eingefuegt' );
            return -1;
        }
        aActionFunction.onError = aAction.onError;
        aActionElement.onError = aAction.onError;
        return 0;
    }

}
