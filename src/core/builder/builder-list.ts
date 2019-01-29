/**
 * Builder-Liste zur Speicherung von Plugin-Komponenten
 *
 * Letzte Aenderung: 24.08.2018
 * Status: gruen
 *
 * @module core/builder
 * @author SB
 */

// _error

import { ErrorBase } from './../error/error-base';


// builder

import { BuilderInterface } from './builder.interface';


/**
 * Klasse BuilderList zur Speicherung von Buildern
 *
 * @export
 * @class BuilderList
 */

export class BuilderList extends ErrorBase {

    /**
     * Map mit allen erzeugten Buildern
     */

    mBuilderList = new Map<string, BuilderInterface>();


    /**
     * Iterator fuer BuilderList
     */

    mBuilderIterator: IterableIterator<BuilderInterface>;


    /**
     * Creates an instance of PluginList.
     */

    constructor() {
        super( 'BuilderList' );
        this.mBuilderIterator = this.mBuilderList.values();
    }


    /**
     * Rueckgabe der Anzahl vorhandener Builder
     *
     * @return {number} size - Anzahl der Builder in der Liste
     */

    getSize(): number {
        return this.mBuilderList.size;
    }


    /**
     * Eintragen eines Builders
     *
     * @param {string} aBuilderName - Name des Builders
     * @param {BuilderInterface} aBuilder - Builder Instanz
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    insert( aBuilderName: string, aBuilder: BuilderInterface ): number {
        try {
            if ( !aBuilderName ) {
                this._error( 'insert', 'kein Buildername uebergeben' );
                return -1;
            }
            if ( !aBuilder ) {
                this._error( 'insert', 'kein Builder uebergeben' );
                return -1;
            }
            // console.log('BuilderList.insert:', this.mBuilderList.size, this.mBuilderList.has( aBuilderName ));
            if ( this.mBuilderList.has( aBuilderName )) {
                this._error( 'insert', 'Builder existiert bereits' );
                return -1;
            }
            this.mBuilderList.set( aBuilderName, aBuilder );
            return 0;
        } catch ( aException ) {
            this._exception( 'insert', aException );
            return -1;
        }
    }


    /**
     * Zurueckgeben eines Builders
     *
     * @param {string} aBuilderName - Name des Builders
     * @returns {BuilderInterface} - Builder Instanz
     */

    find( aBuilderName: string ): BuilderInterface {
        try {
            return this.mBuilderList.get( aBuilderName );
        } catch ( aException ) {
            this._exception( 'find', aException );
            return undefined;
        }
    }


    /**
     * ersten Builder der Liste zurueckgeben
     *
     * @return {BuilderInterface} - Builder Instanz
     */

    first(): BuilderInterface  {
        try {
            this.mBuilderIterator = this.mBuilderList.values();
            return this.mBuilderIterator.next().value;
        } catch ( aException ) {
            this._exception( 'first', aException );
            return undefined;
        }
    }


    /**
     * naechsten Builder der Liste zurueckgeben. Es muss vorher einmal first aufgerufen werden.
     *
     * @return {BuilderInterface} - Builder Instanz
     */

    next(): BuilderInterface {
        try {
            return this.mBuilderIterator.next().value;
        } catch ( aException ) {
            this._exception( 'next', aException );
            return undefined;
        }
    }


    /**
     * Entfernen eines Builders aus der Liste
     *
     * @param {string} aBuilderName - Name des Builders
     * @return {number} errorCode(0,-1)
     */

    remove( aBuilderName: string ): number {
        try {
            this.mBuilderList.delete( aBuilderName );
            return 0;
        } catch ( aException ) {
            this._exception( 'remove', aException );
            return -1;
        }
    }


    /**
     * Loeschen der Liste
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    clear(): number {
        try {
            this.mBuilderList.clear();
            return 0;
        } catch ( aException ) {
            this._exception('clear', aException );
            return -1;
        }
    }

}
