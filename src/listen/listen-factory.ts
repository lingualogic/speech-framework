/**
 * Globale Fabrik zur Erzeugung einer Listen API Instanz
 *
 * API-Version: 1.0
 * Datum: 08.10.2018
 *
 * Letzte Aenderung: 08.10.2018
 * Status: gelb
 *
 * @module listen
 * @author SB
 */


// listen

import { LISTEN_PLUGIN_NAME, LISTEN_MOCK_NAME } from './listen-const';
import { ListenOptionInterface } from './listen-option.interface';
import { ListenInterface } from './listen.interface';
import { Listen } from './listen';


// Global API


/** @export
 * Statische Klasse zur Erzeugung einer ListenComponent Instanz.
 */

export class ListenFactory {


    /**
     * Konstruktor ist privat, es kann keine Instanz der Klasse erzeugt werden
     */

    private constructor() {}


    /**
     * Kann verschiedene Versionen von Listen
     * zurueckgeben, einschließlich eines Listen-Mocks.
     *
     * @param {string} aName - Name des zu erzeugenden Listen
     * @param {ListenOptionInterface} aOption - optionale Parameter
     *
     * @return {ListenInterface} Listen Instanz wird zurueckgegeben
     */

    static create( aName?: string, aOption?: ListenOptionInterface ): ListenInterface {
        const name = aName || LISTEN_PLUGIN_NAME;
        // Mock zurueckgeben
        if ( name === LISTEN_MOCK_NAME ) {
            // TODO: Einbau des Listen-Mocks
            // return new ListenMock();
        }

        try {
            return new Listen( aOption );
        } catch ( aException ) {
            console.log('ListenFactory.create: Exception', aException);
            return null;
        }
    }

}
