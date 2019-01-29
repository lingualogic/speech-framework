/**
 * Plugin-Interface fuer alle Plugin Komponenten
 *
 * Letzte Aenderung: 15.12.2018
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */


// global

import { OnSpeechInitFunc, OnSpeechErrorFunc } from '../../interface/speech-function.type';
import { SpeechMessageInterface } from '../../interface/speech-message.interface';


// Funktionen

export type PluginHandleMessageFunc = ( aMessage: SpeechMessageInterface ) => number;


/**
 * Definiert die Schnittstelle fuer ein Plugin
 *
 * @export
 * @interface PluginInterface
 */

export interface PluginInterface {


    // Events

    onInit:  OnSpeechInitFunc;
    onError: OnSpeechErrorFunc;


    /**
     * initialisert das Plugin
     *
     * @param {any} [aOption] - optionale Parameter
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number;


    /**
     * gibt das Plugin frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    done(): number;


    /**
     * setzt das Plugin wieder auf Defaultwerte und uebergebene optionale Parameter
     * Die Fehlerausgabe wird nicht zurueckgesetzt.
     *
     * @param {any} [aOption] - optionale Parameter
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    reset( aOption?: any ): number;


    /**
     * pruefen auf initialisertes Plugin
     *
     * @return {boolean} initFlag - true, Plugin ist initialisiert, false sonst
     */

    isInit(): boolean;


    /**
     * pruefen auf Mock-Plugin zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Plugin ein Mock zum Testen ist
     */

    isMock(): boolean;


    /**
     * Rueckgabe eines logischen Plugin-Typs
     *
     * @return {string} pluginType - logischer Typ des Plugins fuer unterschiedliche Anwendungsschnittstellen
     */

    getType(): string;


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string;


    /**
     * Rueckgabe eines Plugin-Namens
     *
     * @return {string} pluginName - Rueckgabe des Pluginnamens
     */

    getName(): string;


    /**
     * Dynamische Konfiguration des Plugins
     *
     * @param {any} aFeatureInfo - Konfigurationsdaten
     */

    setFeatureList( aFeatureInfo: any ): number;


    /**
     * pruefen, ob Plugin aktiv ist
     *
     * @return {boolean} Aktiv ein oder aus
     */

    isActive(): boolean;


    /**
     * Plugin aktiv setzen (Default)
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActiveOn(): number;


    /**
     * Plugin deaktivieren
     *
     * @return {number}
     */

    setActiveOff(): number;


    /**
     * Fehlerausgabe pruefen
     */

    isErrorOutput(): boolean;


    /**
     * Fehlerausgabe einschalten
     */

    setErrorOutputOn(): void;


    /**
     * Fehlerausgabe ausschalten
     */

    setErrorOutputOff(): void;


    // Nachrichten-Funktionen


    // TODO: Nachrichten-Funktionen gelten nur fuer Client/Server, nicht fuer Komponenten

    /**
     * Nachrichten verarbeiten
     *
     * @param {SpeechMessageInterface} aMessage - zu verarbeitende Nachricht
     *
     * @return {number} errorCode(0,-1)
     */

    handleMessage( aMessage: SpeechMessageInterface ): number;


    /**
     * Rueckgabe der Nachrichtenverarbeitungsfunktion
     *
     * @return {PluginHandleMessageFunc} handleMessageFunc
     */

    getHandleMessageFunc(): PluginHandleMessageFunc;


    // Test-Funktionen


    /**
     * Fuehrt Testkommandos aus, um interne Tests ablaufen lassen zu koennen
     * @param {string} aTestCommand - Testkommando
     * @param {*} aTestData - optionale Testdaten
     *
     * @return {*} Rueckgabe der Testergebnisse
     */

    test( aTestCommand: string, aTestData?: any ): any;
}
