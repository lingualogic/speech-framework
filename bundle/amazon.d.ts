/** @packageDocumentation
 * Amazon zur Verwaltung des AmazonPort
 *
 * Hier wird die Manager-Schnittstelle von Amazon definiert, um Amazon zu
 * initialisieren und als Port zu oeffnen.
 *
 * API-Version: 1.0
 * Datum:       01.04.2019
 *
 * Letzte Aenderung: 21.06.2020
 * Status: rot
 *
 * @module cloud/amazon
 * @author SB
 */

import { SpeechErrorFunc } from './../../core/interface/speech-function.type';

// import { SpeechErrorFunc } from '@speech/core';
import { AmazonConfigDataInterface } from './amazon-config-data.interface';
import { AmazonOptionInterface } from './amazon-option.interface';
/**
 * statische Amazon-Klasse zur Erzeugung des AmazonPorts
 */
export declare class Amazon {
    private static mInitFlag;
    private static mErrorOutputFlag;
    private static mCurrentPort;
    private constructor();
    static setErrorOutputOn(): void;
    static setErrorOutputOff(): void;
    static setErrorOutputFunc(aErrorFunc: SpeechErrorFunc): void;
    /**
     * Initialisiert den AmazonPort.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    static _initAmazonPort(aAmazonOption: AmazonOptionInterface): number;
    /**
     * Initialisiert den AmazonMock.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    static _initAmazonMock(aAmazonOption: AmazonOptionInterface): number;
    /**
     * Initialisiert den AmazonPorts
     *
     * @static
     * @param {AmazonOptionInterface} aOption - Amazon-Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    static init(aOption: AmazonOptionInterface): number;
    static isInit(): boolean;
    /**
     * Freigabe des AmazonPorts
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    static done(): number;
    static _onOpenEvent(aError: any, aPortName: string, aPortResult: number, aOpenEventCallback: any): number;
    /**
     * Oeffnet den AmazonPort
     *
     * @param {function} aOpenEventCallback - Funktion fuer OpenEvent-Ereignis fn( PortName: string, PortResult: number)
     *
     * @return {number} Fehlercode 0 oder -1
     */
    static _openAmazonPort(aOpenEventCallback: any): number;
    /**
     * Oeffnet den AmazonPort
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
    static setConfig(aConfigData: AmazonConfigDataInterface): number;
    /**
     * Gibt die aktuellen Credentials zurueck.
     *
     * @static
     * @return {AmazonConfigDataInterface} Konfigurationsdaten zurueckgeben
     */
    static getConfig(): AmazonConfigDataInterface;
}
