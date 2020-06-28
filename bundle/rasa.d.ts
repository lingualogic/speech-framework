/** @packageDocumentation
 * Rasa-Manager zur Verwaltung des RasaPort
 *
 * Hier wird die Manager-Schnittstelle von Rasa definiert, um Rasa zu
 * initialisieren und als Port zu oeffnen.
 *
 * API-Version: 1.0
 * Datum:       09.07.2019
 *
 * Letzte Aenderung: 21.06.2020
 * Status: rot
 *
 * @module cloud/rasa
 * @author SB
 */

import { SpeechErrorFunc } from './../../core/interface/speech-function.type';

// import { SpeechErrorFunc } from '@speech/core';
import { RasaConfigDataInterface } from './rasa-config-data.interface';
import { RasaOptionInterface } from './rasa-option.interface';
/**
 * statische Rasa-Klasse zur Erzeugung des RasaPorts
 */
export declare class Rasa {
    private static mInitFlag;
    private static mErrorOutputFlag;
    private static mCurrentPort;
    private constructor();
    static setErrorOutputOn(): void;
    static setErrorOutputOff(): void;
    static setErrorOutputFunc(aErrorFunc: SpeechErrorFunc): void;
    /**
     * Initialisiert den RasaPort.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    static _initRasaPort(aRasaOption: RasaOptionInterface): number;
    /**
     * Initialisiert den RasaMock.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    static _initRasaMock(aRasaOption: RasaOptionInterface): number;
    /**
     * Initialisiert den RasaPorts
     *
     * @static
     * @param {RasaOptionInterface} aOption - Rasa-Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    static init(aOption: RasaOptionInterface): number;
    static isInit(): boolean;
    /**
     * Freigabe des RasaPorts
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    static done(): number;
    static _onOpenEvent(aError: any, aPortName: string, aPortResult: number, aOpenEventCallback: any): number;
    /**
     * Oeffnet den RasaPort
     *
     * @param {function} aOpenEventCallback - Funktion fuer OpenEvent-Ereignis fn( PortName: string, PortResult: number)
     *
     * @return {number} Fehlercode 0 oder -1
     */
    static _openRasaPort(aOpenEventCallback: any): number;
    /**
     * Oeffnet den RasaPort
     *
     * @static
     * @param {function} aOpenEventCallback - Ereignis-Funktion fuer Port geoeffnet
     *
     * @return {number} Fehlercode 0 oder -1
     */
    static open(aOpenEventCallback?: any): number;
    /**
     * Traegt geaenderte Credentials ein.
     *
     * @static
     * @param {function} aOpenEventCallback - Ereignis-Funktion fuer Port geoeffnet
     *
     * @return {number} Fehlercode 0 oder -1
     */
    static setConfig(aConfigData: RasaConfigDataInterface): number;
    /**
     * Gibt die aktuellen Credentials zurueck.
     *
     * @static
     * @return {RasaConfigDataInterface} Konfigurationsdaten zurueckgeben
     */
    static getConfig(): RasaConfigDataInterface;
}
