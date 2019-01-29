/**
 * Action API Wrapper fuer ActionComponent.
 *
 * Letzte Aenderung: 18.10.2018
 * Status: gelb
 *
 * @module action
 * @author SB
 */


// base

import { Base } from './../base/base';


// action

import { ACTION_TYPE_NAME } from './action-const';
import { ActionStartFunc, ActionStopFunc } from './action-function.type';
import { ActionOptionInterface } from './action-option.interface';
import { ActionInterface } from './action.interface';
import { ActionComponentInterface } from './component/action-component.interface';


/** @export
 * Action Klasse als API-Wrapper fuer die ActionComponent
 */

export class Action extends Base implements ActionInterface {

    // interne Action-Komponente

    mActionComponent: ActionComponentInterface = null;


    /**
     * Konstruktor fuer ereignisbasierte Initialisierung von Action
     */

    constructor( aOption?: ActionOptionInterface ) {
        super( aOption );
        // eintragen der spezifischen Komponente
        this.mActionComponent = this.mComponent as ActionComponentInterface;
    }


    /**
     * Rueckgabe des Default Buildernamens, der verwendet wird,
     * wenn kein anderer Buildername uebergeben wurde.
     *
     * @returns {string} Rueckgabe des Default Buildernamens
     */

    _getBuilderName(): string {
        return ACTION_TYPE_NAME;
    }


    // Aktions-Funktionen


    setActionName( aActionName: string): number {
        return this.mActionComponent.setActionName( aActionName );
    }

    getActionName(): string {
        return this.mActionComponent.getActionName();
    }

    setElementType( aElementType: string): number {
        return this.mActionComponent.setElementType( aElementType );
    }

    getElementType(): string {
        return this.mActionComponent.getElementType();
    }

    setElementName( aElementName: string): number {
        return this.mActionComponent.setElementName( aElementName );
    }

    getElementName(): string {
        return this.mActionComponent.getElementName();
    }


    // Aktionfunktion-Funktionen


    addFunction( aFunctionName: string, aActionStartFunc: ActionStartFunc, aActionStopFunc?: ActionStopFunc ): number {
        return this.mActionComponent.addFunction( aFunctionName, aActionStartFunc, aActionStopFunc );
    }

    removeFunction( aFunctionName: string ): number {
        return this.mActionComponent.removeFunction( aFunctionName );
    }


    // Aktionelement-Funktionen


    addElement( aElementName: string, aActionStartFunc: ActionStartFunc, aActionStopFunc: ActionStopFunc ): number {
        return this.mActionComponent.addElement( aElementName, aActionStartFunc, aActionStopFunc );
    }

    removeElement( aElementName: string ): number {
        return this.mActionComponent.removeElement( aElementName );
    }

}
