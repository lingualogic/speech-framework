/**
 * Plugin-Liste zur Speicherung von Plugin-Komponenten
 *
 * Letzte Aenderung: 24.08.2018
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */


// error

import { ErrorBase } from './../error/error-base';


// plugin

import { PluginInterface } from './plugin.interface';


/**
 * Klasse PluginList zur Speicherung von Plugin-Komponenten
 *
 * @export
 * @class PluginList
 */

export class PluginList extends ErrorBase {

    mPluginList = new Map<string, PluginInterface>();
    mPluginIterator: IterableIterator<PluginInterface>;


    /**
     * Creates an instance of PluginList.
     */

    constructor() {
        super( 'PluginList' );
        this.mPluginIterator = this.mPluginList.values();
    }


    /**
     * Rueckgabe der Anzahl vorhandener Plugins
     *
     * @return {number} size - Anzahl der Plugins in der Liste
     */

    getSize(): number {
        return this.mPluginList.size;
    }


    /**
     * Eintragen eines Plugins
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {PluginInterface} aPlugin - Plugin Instanz
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    insert( aPluginName: string, aPlugin: PluginInterface ): number {
        try {
            if ( !aPluginName ) {
                this._error( 'insert', 'kein Pluginname uebergeben' );
                return -1;
            }
            if ( !aPlugin ) {
                this._error( 'insert', 'kein Plugin uebergeben' );
                return -1;
            }
            if ( this.mPluginList.has( aPluginName )) {
                this._error( 'insert', 'Plugin existiert bereits ' + aPluginName );
                return -1;
            }
            this.mPluginList.set( aPluginName, aPlugin );
            return 0;
        } catch ( aException ) {
            this._exception( 'insert', aException );
            return -1;
        }
    }


    /**
     * Zurueckgeben eines Plugins
     *
     * @param {string} aPluginName - Name des Plugins
     * @returns {PluginInterface} - Plugin Instanz oder null
     */

    find( aPluginName: string ): PluginInterface {
        try {
            return this.mPluginList.get( aPluginName );
        } catch ( aException ) {
            this._exception( 'find', aException );
            return undefined;
        }
    }


    /**
     * erstes Plugin der Liste zurueckgeben
     *
     * @return {PluginInterface} - Plugin Instanz oder null
     */

    first(): PluginInterface {
        try {
            this.mPluginIterator = this.mPluginList.values();
            return this.mPluginIterator.next().value;
        } catch ( aException ) {
            this._exception( 'first', aException );
            return undefined;
        }

    }


    /**
     * naechstes Plugin der Liste zurueckgeben. Es muss vorher einmal first aufgerufen werden.
     *
     * @return {PluginInterface} - Plugin Instanz oder null
     */

    next(): PluginInterface {
        try {
            return this.mPluginIterator.next().value;
        } catch ( aException ) {
            this._exception( 'next', aException );
            return undefined;
        }
    }


    /**
     * Rueckgabe aller vorhandenen Plugin-Namen
     *
     * @return {Array<string>} Rueckgabe aller Plugin-Namen als Liste
     */

    getNameList(): Array<string> {
        return Array.from( this.mPluginList.keys());
    }


    /**
     * Entfernen eines Plugins aus der Liste
     *
     * @param {string} aPluginName - Name des Plugins
     * @return {number} errorCode(0,-1)
     */

    remove( aPluginName: string ): number {
        try {
            this.mPluginList.delete( aPluginName );
            return 0;
        } catch ( aException ) {
            this._exception( 'remove', aException );
            return -1;
        }
    }


    /**
     * Loeschen aller Plugins aus der Liste
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    clear(): number {
        try {
            this.mPluginList.clear();
            return 0;
        } catch ( aException ) {
            this._exception( 'clear', aException );
            return -1;
        }
    }

}
