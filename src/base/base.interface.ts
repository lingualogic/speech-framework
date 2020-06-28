/** @packageDocumentation
 * Oeffentliche Base Schnittstelle, fuer alle Komponenten APIs.
 *
 * API-Version: 1.0
 * Datum:       11.10.2018
 *
 * Letzte Aenderung: 21.06.2020
 * Status: gruen
 *
 * @module base
 * @author SB
 */


// core

/****
 * import { OnSpeechInitFunc, OnSpeechErrorFunc } from '../core/interface/speech-function.type';
 ****/

import { OnSpeechInitFunc, OnSpeechErrorFunc } from '@speech/core';


// base

import {
    OnBaseStartFunc,
    OnBaseStopFunc
} from './base-function.type';


// Global API


/**
 * Base Schnittstelle
 */

export interface BaseInterface {


    // Komponenten-Funktionen


    /**
     * Komponente auf initialen Zustand zuruecksetzen
     *
     * @param {*} aOption - optionale Parameter
     */

    reset( aOption?: any ): number;


    /**
     * Typ des Komponenten-Interfaces zurueckgeben
     *
     * @return {string} typeName
     */

    getType(): string;


    /**
     * Name der konkreten Komponente zurueckgeben
     *
     * @return {string} componentName
     */

    getName(): string;


    /**
     * Version der Komponente zurueckgeben
     *
     * @return {string} componentVersion
     */

    getVersion(): string;


    /**
     * Server-Version der Komponente zurueckgeben
     *
     * @return {string} componentVersion
     */

    getServerVersion(): string;


    /**
     * pruefen auf aktive Komponente
     *
     * @return {boolean} activeFlag
     */

    isActive(): boolean;


    /**
     * Komponente aktivieren
     *
     * @return {number} Fehercode 0 oder -1
     */

    setActiveOn(): number;


    /**
     * Komponente daktivieren
     *
     * @return {number} Fehlercode oder -1
     */

    setActiveOff(): number;


    /**
     * pruefen auf Fehlerausgabe auf die Konsole
     *
     * @return {boolean} errorOutputFlag
     */

    isErrorOutput(): boolean;


    /**
     * Fehlerausgabe auf Konsole einschalten
     */

    setErrorOutputOn(): void;


    /**
     * Fehlerausgabe auf Konsole ausschalten
     */

    setErrorOutputOff(): void;


    // Event-Funktionen


    /**
     * Anmelden einer Ereignis Callback-Funktion fuer die Initialisierung
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     * @param {OnSpeechInitFunc} aEventFunc - Ereignis Callback Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addInitEvent( aPluginName: string, aEventFunc: OnSpeechInitFunc ): number;


    /**
     * Anmelden einer Ereignis Callback-Funktion fuer den Start der Aktion
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     * @param {OnActionStartFunc} aEventFunc - Ereignis Callback Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addStartEvent( aPluginName: string, aEventFunc: OnBaseStartFunc ): number;


    /**
     * Anmelden einer Ereignis Callback-Funktion fuer den Stop der Aktion
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     * @param {OnActionStopFunc} aEventFunc - Ereignis Callback Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addStopEvent( aPluginName: string, aEventFunc: OnBaseStopFunc ): number;


    /**
     * Anmelden einer Ereignis Callback-Funktion fuer die Fehler der Aktion
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     * @param {OnSpeechErrorFunc} aEventFunc - Ereignis Callback Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addErrorEvent( aPluginName: string, aEventFunc: OnSpeechErrorFunc ): number;


    /**
     * Entfernen der Ereignisfunktion fuer die Initialisierung
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeInitEvent( aPluginName: string ): number;


    /**
     * Entfernen der Ereignisfunktion fuer den Start der Aktion
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeStartEvent( aPluginName: string ): number;


    /**
     * Entfernen der Ereignisfunktion fuer den Stop der Aktion
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeStopEvent( aPluginName: string ): number;


    /**
     * Entfernen der Ereignisfunktion fuer die Fehler der Aktion
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeErrorEvent( aPluginName: string ): number;


    /**
     * Entfernen aller angemeldeten Ereignisfunktionen
     *
     * @param {string} aPluginName - Name des Beobachter-Plugins
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeAllEvent( aPluginName: string ): number;


    // Base-Funktionen


    /**
     * pruefen, ob Komponente gerade beschaeftigt ist
     *
     * @return {boolean} True, Komponente ist beschaeftigt, False sonst
     */

    isRunning(): boolean;


    /**
     * Startet die Aufgabe.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    start(): number;


    /**
     * Stoppt die Aufgabe
     *
     * @return {number} Fehlercode 0 oder -1
     */

    stop(): number;


    // Test-Funktionen


    /**
     * Fuehrt Testkommandos aus, um interne Tests ablaufen lassen zu koennen
     *
     * @param {string} aTestCommand - Testkommando
     * @param {*} aTestData - optionale Testdaten
     *
     * @return {*} Rueckgabe der Testergebnisse
     */

    test( aTestCommand: string, aTestData?: any ): any;

}
