/** @packageDocumentation
 * Manager zur Verwaltung des MicrosoftPort
 *
 * Hier wird die Manager-Schnittstelle von Microsoft definiert, um Microsoft zu
 * initialisieren und als Port zu oeffnen.
 *
 * API-Version: 1.0
 * Datum:       17.06.2019
 *
 * Letzte Aenderung: 21.06.2020
 * Status: rot
 *
 * @module cloud/microsoft
 * @author SB
 */

import { SpeechErrorFunc } from './../../core/interface/speech-function.type';

// import { SpeechErrorFunc } from '@speech/core';
import { MicrosoftConfigDataInterface } from './microsoft-config-data.interface';
import { MicrosoftOptionInterface } from './microsoft-option.interface';
/**
 * statische Microsoft-Klasse zur Erzeugung des MicrosoftPorts
 */
export declare class Microsoft {
    private static mInitFlag;
    private static mErrorOutputFlag;
    private static mCurrentPort;
    private constructor();
    static setErrorOutputOn(): void;
    static setErrorOutputOff(): void;
    static setErrorOutputFunc(aErrorFunc: SpeechErrorFunc): void;
    /**
     * Initialisiert den MicrosoftPort.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    static _initMicrosoftPort(aMicrosoftOption: MicrosoftOptionInterface): number;
    /**
     * Initialisiert den MicrosoftMock.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    static _initMicrosoftMock(aMicrosoftOption: MicrosoftOptionInterface): number;
    /**
     * Initialisiert den MicrosoftPorts
     *
     * @static
     * @param {MicrosoftOptionInterface} aOption - Microsoft-Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    static init(aOption: MicrosoftOptionInterface): number;
    static isInit(): boolean;
    /**
     * Freigabe des MicrosoftPorts
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    static done(): number;
    static _onOpenEvent(aError: any, aPortName: string, aPortResult: number, aOpenEventCallback: any): number;
    /**
     * Oeffnet den MicrosoftPort
     *
     * @param {function} aOpenEventCallback - Funktion fuer OpenEvent-Ereignis fn( PortName: string, PortResult: number)
     *
     * @return {number} Fehlercode 0 oder -1
     */
    static _openMicrosoftPort(aOpenEventCallback: any): number;
    /**
     * Oeffnet den MicrosoftPort
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
    static setConfig(aConfigData: MicrosoftConfigDataInterface): number;
    /**
     * Gibt die aktuellen Credentials zurueck.
     *
     * @static
     * @return {MicrosoftConfigDataInterface} Konfigurationsdaten zurueckgeben
     */
    static getConfig(): MicrosoftConfigDataInterface;
}
