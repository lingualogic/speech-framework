/** @packageDocumentation
 * Google-Manager zur Verwaltung des GooglePort
 *
 * Hier wird die Manager-Schnittstelle von Google definiert, um Google zu
 * initialisieren und als Port zu oeffnen.
 *
 * API-Version: 1.0
 * Datum:       08.05.2019
 *
 * Letzte Aenderung: 21.06.2020
 * Status: rot
 *
 * @module cloud/google
 * @author SB
 */

import { SpeechErrorFunc } from './../../core/interface/speech-function.type';

// import { SpeechErrorFunc } from '@speech/core';
import { GoogleConfigDataInterface } from './google-config-data.interface';
import { GoogleOptionInterface } from './google-option.interface';
/**
 * statische Google-Klasse zur Erzeugung des GooglePorts
 */
export declare class Google {
    private static mInitFlag;
    private static mErrorOutputFlag;
    private static mCurrentPort;
    private constructor();
    static setErrorOutputOn(): void;
    static setErrorOutputOff(): void;
    static setErrorOutputFunc(aErrorFunc: SpeechErrorFunc): void;
    /**
     * Initialisiert den GooglePort.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    static _initGooglePort(aGoogleOption: GoogleOptionInterface): number;
    /**
     * Initialisiert den GoogleMock.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    static _initGoogleMock(aGoogleOption: GoogleOptionInterface): number;
    /**
     * Initialisiert den GooglePorts
     *
     * @static
     * @param {GoogleOptionInterface} aOption - Google-Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    static init(aOption: GoogleOptionInterface): number;
    static isInit(): boolean;
    /**
     * Freigabe des GooglePorts
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    static done(): number;
    static _onOpenEvent(aError: any, aPortName: string, aPortResult: number, aOpenEventCallback: any): number;
    /**
     * Oeffnet den GooglePort
     *
     * @param {function} aOpenEventCallback - Funktion fuer OpenEvent-Ereignis fn( PortName: string, PortResult: number)
     *
     * @return {number} Fehlercode 0 oder -1
     */
    static _openGooglePort(aOpenEventCallback: any): number;
    /**
     * Oeffnet den GooglePort
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
    static setConfig(aConfigData: GoogleConfigDataInterface): number;
    /**
     * Gibt die aktuellen Credentials zurueck.
     *
     * @static
     * @return {GoogleConfigDataInterface} Konfigurationsdaten zurueckgeben
     */
    static getConfig(): GoogleConfigDataInterface;
}
