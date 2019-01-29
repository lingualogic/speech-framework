/**
 * IntentComponentBuilder fuer lokale IntentComponent
 *
 * Letzte Aenderung: 03.12.2018
 * Status: rot
 *
 * @module intent/component
 * @author SB
 */


// builder

import { Builder } from '../../core/builder/builder';


// nlu

import { NLU_FACTORY_NAME, NLU_DEFAULT_NAME } from '../nlu/nlu-const';
import { NLUFactory } from '../nlu/nlu-factory';
import { NLUInterface } from '../nlu/nlu.interface';


// intent

import { INTENT_TYPE_NAME, INTENT_COMPONENTBUILDER_NAME, INTENT_COMPONENTFACTORY_NAME, INTENT_COMPONENT_NAME } from '../intent-const';
import { IntentComponentInterface } from './intent-component.interface';
import { IntentComponentFactory } from './intent-component-factory';


/**
 * Klasse Builder zum Erzeugen der Intent-Komponente
 */

export class IntentComponentBuilder extends Builder {


    /**
     * Singleton der Intent-Komponente
     */

    mIntentComponent: IntentComponentInterface = null;


    constructor( aBuilderName?: string, aRegisterFlag = true ) {
        super( aBuilderName || 'IntentComponentBuilder', aRegisterFlag );
    }


    /**
     * Typ des Builders zurueckgeben
     *
     * @return {string} builderType
     */

    getType(): string {
        return INTENT_TYPE_NAME;
    }


    getClass(): string {
        return 'IntentComponentBuilder';
    }

    /**
     * Name des Builders zurueckgeben
     *
     * @return {string} builderName
     */

    getName(): string {
        return INTENT_COMPONENTBUILDER_NAME;
    }


    // Builder-Funktionen


    /**
     * Hauptfunktion des Builders.
     *
     * @return {IntentComponentInterface} component - Rueckgabe der erzeugten Komponente oder null
     */

    build(): IntentComponentInterface {
        // console.log('IntentComponentBuilder.build: start');
        // pruefen auf vorhandene Komponente
        if ( this.mIntentComponent ) {
            // console.log('IntentComponentBuilder.build: Komponente ist bereits erzeugt');
            return this.mIntentComponent;
        }
        try {
            const intent = this._buildComponent();
            const nlu = this._getPlugin( NLU_DEFAULT_NAME, NLU_FACTORY_NAME, NLUFactory ) as NLUInterface;
            if ( this._binder( intent, nlu ) !== 0 ) {
                this._error( 'build', 'Komponenten nicht verbunden' );
                return null;
            }
            return intent;
        } catch ( aException ) {
            this._exception( 'build', aException );
            return null;
        }
    }


    /**
     * Hier wird die Komponente als Singelton erzeugt
     *
     * @private
     * @return {IntentComponentInterface} Rueckgabe des Component-Singletons
     */

    _buildComponent(): IntentComponentInterface {
        if ( !this.mIntentComponent ) {
            this.mIntentComponent = this._getPlugin( INTENT_COMPONENT_NAME, INTENT_COMPONENTFACTORY_NAME, IntentComponentFactory ) as IntentComponentInterface;
        }
        return this.mIntentComponent;
    }


    /**
     * Verbindert die Komponenten und Plugins miteinander
     *
     * @private
     * @param {IntentInterface} aIntent - Intent Komponente
     * @param {NLUInterface} aNLU - NLU Plugin
     *
     * @return {number} errorCode(0,-1)
     */

    _binder( aIntent: IntentComponentInterface, aNLU: NLUInterface ): number {
        // console.log('IntentComponentBuilder._binder');
        if ( !aIntent ) {
            this._error( '_binder', 'Keine Intent-Komponente vorhanden' );
            return -1;
        }
        if ( !aNLU ) {
            this._error( '_binder', 'Kein NLU-Plugin vorhanden' );
            return -1;
        }
        // Einfuegen des NLU-Plugins
        if ( aIntent.insertPlugin( aNLU.getName(), aNLU ) !== 0 ) {
            this._error( '_binder', 'NLU-Plugin wurde nicht eingefuegt' );
            return -1;
        }
        // binden der NLU-Funktionen
        aNLU.onInit = aIntent.onInit;
        aNLU.onListenStart = aIntent.onStart;
        aNLU.onListenStop = aIntent.onStop;
        aNLU.onListenResult = aIntent.onListenResult;
        aNLU.onIntentResult = aIntent.onIntentResult;
        aNLU.onError = aIntent.onError;
        return 0;
    }

}
