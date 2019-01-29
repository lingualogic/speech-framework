/**
 * DialogContext verwaltet den Kontext des Dialogs
 *
 * Letzte Aenderung: 07.09.2018
 * Status: gelb
 *
 * @module dialog/component
 * @author SB
 */


// core

import { ErrorBase } from './../../core/error/error-base';


// dialog

import { DialogStateContextInterface } from '../dialog-state-context.interface';


/** @export
 * Klasse DialogContext zur Verwaltung des Kontextes eines Zustands
 */

export class DialogContext extends ErrorBase {

    // Context object

    private mContext: DialogStateContextInterface = { property: {}};

    constructor() {
        super( 'DialogContext' );
    }

    // Context-Functions

    clear(): void {
        this.mContext = { property: {}};
    }

    getContext(): DialogStateContextInterface {
        return this.mContext;
    }


    /**
     * Eintragen einer Komponente in einen Kontext
     *
     * @param {string} aComponentName - Name der einzutragenden Komponente
     * @param {string} aContextName - Name des Kontextes
     *
     * @return {number} errorcode (0,-1)
     */

    insert( aComponentName: string, aContextName: string ): number {
        // console.log('DialogContext.insert:', aComponentName, aContextName);
        if ( !aComponentName ) {
            this._error( 'insert', 'kein Komponentenname' );
            return -1;
        }
        if ( !aContextName ) {
            this._error( 'insert', 'kein Kontextname' );
            return -1;
        }
        const property = this.mContext.property;
        if ( !property[ aContextName ]) {
            property[ aContextName ] = [];
        }
        try {
            // pruefen auf bereits eingetragen
            let name: string;
            for ( name  of property[ aContextName ]) {
                if ( name === aComponentName ) {
                    return 0;
                }
            }
            property[ aContextName ].push( aComponentName );
            // console.log('DialogContext.insert:', aComponentName, this.mContext);
            return 0;
        } catch ( aException ) {
            this._exception( 'insert', aException );
            return -1;
        }
    }


    /**
     * Entfernen einer Komponente aus einem Kontext
     *
     * @param {string} aComponentName - Name der zu entfernenden Komponente
     * @param {string} aContextName - Name des Kontextes
     *
     * @return {number} errorcode (0,-1)
     */

    remove( aComponentName: string, aContextName: string ): number {
        // console.log('DialogContext.remove:', aComponentName, aContextName);
        if ( !aComponentName ) {
            this._error( 'remove', 'kein Komponentenname' );
            return -1;
        }
        if ( !aContextName ) {
            this._error( 'remove', 'kein Kontextname' );
            return -1;
        }
        const property = this.mContext.property;
        if ( !property[ aContextName ]) {
            return 0;
        }
        try {
            const context = [];
            for ( const component of property[ aContextName ]) {
                if ( component && component !== aComponentName ) {
                    context.push( component );
                }
            }
            if ( context.length > 0 ) {
                property[ aContextName ] = context;
            } else {
                delete property[ aContextName ];
            }
            // console.log('SpeechContext.removeScrollableItem:', this.mContext);
            return 0;
        } catch ( aException ) {
            this._exception( 'remove', aException );
            return -1;
        }
    }

}
