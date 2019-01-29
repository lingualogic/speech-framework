/**
 * Verwaltet alle Factories des Systems. Ist eine statische Klasse.
 *
 * Letzte Aenderung: 04.10.2018
 * Status: gruen
 *
 * @module core/factory
 * @author SB
 */


// global

import { SpeechErrorFunc } from '../../interface/speech-function.type';


// error

import { ErrorBase } from '../error/error-base';


// factory

import { FactoryList } from './factory-list';
import { FactoryInterface } from './factory.interface';
import { Factory } from './factory';


/**
 * statische Klasse FactoryManager
 */

export class FactoryManager {

    /**
     * statische Liste aller Builder im System
     */

    static mFactoryList = new FactoryList();


    /**
     * statische ErrorBase fuer die Fehlerbehandlung
     */

    static mErrorBase = new ErrorBase( 'FactoryManager' );


    // statische Klasse, keine Instanz erzeugbar !

    private constructor() {}


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        FactoryManager.mFactoryList.setErrorOutputOn();
        FactoryManager.mErrorBase.setErrorOutputOn();
    }


    static setErrorOutputOff(): void {
        FactoryManager.mFactoryList.setErrorOutputOff();
        FactoryManager.mErrorBase.setErrorOutputOff();
    }

    /**
     * Eintragen einer Fehlerbehandlungsfunktion
     *
     * @param {SpeechErrorFunc} aErrorFunc - Fehlerbehandlungsfunktion
     */

    static _setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        FactoryManager.mFactoryList._setErrorOutputFunc( aErrorFunc );
        FactoryManager.mErrorBase._setErrorOutputFunc( aErrorFunc );
    }


    // Factory-Funktionen


    /**
     * Rueckgabe der Anzahl vorhandener Factories
     *
     * @return {number} size - Anzahl der Factories in der Liste
     */

    static getSize(): number {
        return FactoryManager.mFactoryList.getSize();
    }


    /**
     * Gibt eine neue oder bereits vorhandene Factory zurueck
     *
     * @param {string} aFactoryName - Name der Factory
     * @param {FactoryClass} [aFactoryClass] - Klasse der Factory
     *
     * @return {FactoryInterface} factory - gibt ein Objekt von Factory zurueck oder null
     */

    static get( aFactoryName: string, aFactoryClass?: typeof Factory ): FactoryInterface {
        if ( !aFactoryName ) {
            this.mErrorBase._error( 'get', 'kein FactoryName uebergeben' );
            return null;
        }
        let factory = FactoryManager.find( aFactoryName );
        if ( factory ) {
            // console.log('FactoryManager.get: gefundene Factory wird zurueckgegeben', aFactoryName, factory);
            return factory;
        }
        if ( !aFactoryClass ) {
            this.mErrorBase._error( 'get', 'keine Factoryklasse uebergeben' );
            return null;
        }
        // console.log('FactoryManager.get: FactoryClass=', aFactoryClass);
        try {
            // console.log('FactoryManager.get: Factory neu erzeugt', aFactoryClass);
            factory = new aFactoryClass();
            // console.log('FactoryManager.get: Factory neu erzeugt', factory.getName(), factory);
        } catch ( aException ) {
            this.mErrorBase._exception( 'get', aException );
            return null;
        }
        // pruefen auf gleichen Namen
        // console.log('FactoryManager.get: same name? ', aFactoryName, factory.getName());
        if ( aFactoryName !== factory.getName()) {
            this.mErrorBase._error('get', 'FactoryName stimmen nicht ueberein ' + aFactoryName + ' != ' + factory.getName());
            FactoryManager.remove( factory.getName());
            return null;
        }
        return factory;
    }


    /**
     * Zurueckgeben einer Factory
     *
     * @param {string} aFactoryName - Name der Factory
     * @returns {FactoryInterface} - Factory Instanz
     */

    static find( aFactoryName: string ): FactoryInterface {
        const factory = FactoryManager.mFactoryList.find( aFactoryName );
        if ( !factory ) {
            return null;
        }
        return factory;
    }


    /**
     * Eintragen einer Factory
     *
     * @param {string} aFactoryName - Name der Factory
     * @param {FactoryInterface} aFactory - Factory Instanz
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static insert( aFactoryName: string, aFactory: FactoryInterface ): number {
        // console.log('FactoryManager.insert:', aFactoryName, aFactory);
        return FactoryManager.mFactoryList.insert( aFactoryName, aFactory );
    }


    /**
     * Entfernen einer Factory aus der Liste
     *
     * @param {string} aFactoryName - Name der Factory
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static remove( aFactoryName: string ): number {
        return FactoryManager.mFactoryList.remove( aFactoryName );
    }


    /**
     * Loeschen aller Factories
     *
     * @return {number} Fehlercode 0 oder -1
     */

    static clear(): number {
        return FactoryManager.mFactoryList.clear();
    }

}
