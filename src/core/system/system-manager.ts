/** @packageDocumentation
 * SystemManager als oberster Manager des gesamten Systems
 * SystemManager ist eine statische Klasse
 *
 * Letzte Aenderung: 24.10.2018
 * Status: gruen
 *
 * @module core/system
 * @author SB
 */


// global

import { SpeechErrorFunc } from '../interface/speech-function.type';


// builder

import { BuilderManager } from '../builder/builder-manager';
import { BuilderInterface } from '../builder/builder.interface';
import { Builder } from '../builder/builder';


// factory

import { FactoryManager } from '../factory/factory-manager';


// plugin

import { PluginManager } from '../plugin/plugin-manager';


/** @export
 * Statische SystemManager Klasse
 */

export class SystemManager {

    // statische Klasse, keine Instanz erzeugbar !

    private constructor() {}


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        BuilderManager.setErrorOutputOn();
        FactoryManager.setErrorOutputOn();
        PluginManager.setErrorOutputOn();
    }


    static setErrorOutputOff(): void {
        BuilderManager.setErrorOutputOff();
        FactoryManager.setErrorOutputOff();
        PluginManager.setErrorOutputOff();
    }


    /**
     * Eintragen einer Fehlerbehandlungsfunktion
     *
     * @param {SpeechErrorFunc} aErrorFunc - Fehlerbehandlungsfunktion
     */

    static _setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        BuilderManager._setErrorOutputFunc( aErrorFunc );
        FactoryManager._setErrorOutputFunc( aErrorFunc );
        PluginManager._setErrorOutputFunc( aErrorFunc );
    }


    // Manager-Funktionen


    /**
     * Fuegt einen Builder in den BuilderManager ein
     *
     * @param {string} aBuilderName - Name des Builders
     * @param {BuilderInterface} aBuilder - Instanz des Builders
     *
     * @return {number} errorCode(0,-1)
     */

    static insertBuilder( aBuilderName: string, aBuilder: BuilderInterface ): number {
        return BuilderManager.mBuilderList.insert( aBuilderName, aBuilder);
    }


    /**
     * Rueckgabe eines Builders. Bei Uebergabe der Builderklasse wird
     * der Builder neu erzeugt, wenn er noch nicht vorhanden ist.
     *
     * @static
     * @param {string} aBuilderName - Name des Builders
     * @param {typeof Builder} aBuilderClass - Builder Klasse
     *
     * @return {BuilderInterface} builder - Rueckgabe der Instanz des Builders oder null
     */

    static getBuilder( aBuilderName: string, aBuilderClass?: typeof Builder): BuilderInterface {
        return BuilderManager.get( aBuilderName, aBuilderClass );
    }


    /**
     * Rueckgabe eines Builders, wenn er vorhanden ist.
     *
     * @static
     * @param {string} aBuilderName - Name des Builders
     *
     * @return {BuilderInterface} builder - Rueckgabe der Instanz des Builders oder null
     */

    static findBuilder( aBuilderName: string ): BuilderInterface {
        return BuilderManager.find( aBuilderName );
    }


    /**
     * Loeschen aller Instanzen des Systems
     *
     * @static
     */

    static clear(): void {
        BuilderManager.clear();
        FactoryManager.clear();
        PluginManager.clear();
    }

}
