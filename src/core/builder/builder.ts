/** @packageDocumentation
 * Builder fuer die Erzeugung von Komponenten
 *
 * Letzte Aenderung: 03.09.2018
 * Status: gruen
 *
 * @module core/builder
 * @author SB
 */


// error

import { ErrorBase } from '../error/error-base';


// factory

import { FactoryManager } from '../factory/factory-manager';


// plugin

import { PluginFactoryInterface } from '../plugin/plugin-factory.interface';
import { PluginFactory } from '../plugin/plugin-factory';
import { PluginManager } from '../plugin/plugin-manager';
import { PluginInterface } from '../plugin/plugin.interface';


// component

import { ComponentInterface } from '../component/component.interface';


// builder

import { BuilderInterface } from './builder.interface';
import { BuilderManager } from './builder-manager';


/** @export
 * Klasse Builder
 */

export class Builder extends ErrorBase implements BuilderInterface {

    /**
     * Erzeugt eine Instanz von Builder
     */

    constructor( aBuilderName?: string, aRegisterFlag = true ) {
        super( 'Builder' );
        this._setErrorClassName( this.getClass());
        // console.log('Builder.constructor:', aBuilderName);
        if ( aRegisterFlag && BuilderManager.insert( aBuilderName || this.getName(), this ) !== 0 ) {
            throw new Error('Builder ' + this.getName() + ' existiert bereits im BuilderManager');
        }
    }


    /**
     * Typ der vom Builder erzeugten Komponenten
     *
     * @return {string} typeName
     */

    getType(): string {
        return '';
    }


    /**
     * Klasse des Builders zurueckgeben
     *
     * @return {string} builderName
     */

    getClass(): string {
        return 'Builder';
    }


    /**
     * Name des Builders zurueckgeben
     *
     * @return {string} builderName
     */

    getName(): string {
        return 'Builder';
    }


    // Builder-Funktionen


    /**
     * Hauptfunktion des Builders.
     *
     * @return {ComponentInterface} component - Rueckgabe der erzeugten Komponente oder null
     */

    build(): ComponentInterface {
        return null;
    }


    // Hilfsfunktionen

    _getBuilder( aBuilderName: string, aBuilderClass?: typeof Builder ): BuilderInterface {
        return BuilderManager.get( aBuilderName, aBuilderClass );
    }

    _getFactory( aFactoryName: string, aFactoryClass?: typeof PluginFactory ): PluginFactoryInterface {
        return FactoryManager.get( aFactoryName, aFactoryClass );
    }

    _getComponent( aComponentName: string, aComponentType?: string, aComponentBuilderClass?: typeof Builder ): PluginInterface {
        if ( aComponentType ) {
            const builder = this._getBuilder( aComponentType, aComponentBuilderClass );
            // console.log('Builder._getComponent: builder=', builder.getName(), builder);
            if ( builder ) {
                return builder.build();
            }
        }
        return PluginManager.get( aComponentName );
    }

    _getPlugin( aPluginName: string, aPluginType?: string, aPluginFactoryClass?: typeof PluginFactory ): PluginInterface {
        if ( aPluginType && aPluginFactoryClass ) {
            const factory = this._getFactory( aPluginType, aPluginFactoryClass );
            // console.log('Builder._getPlugin: factory=', factory.getName(), factory);
            if ( factory ) {
                return PluginManager.get( aPluginName, factory );
            }
        }
        return PluginManager.get( aPluginName );
    }

}
