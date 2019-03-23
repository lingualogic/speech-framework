/**
 * Nuance zur Verwaltung des NuancePort
 *
 * Hier wird die Manager-Schnittstelle von Nuance definiert, um Nuance zu
 * initialisieren und als Port zu oeffnen.
 *
 * API-Version: 1.1
 * Datum:       06.02.2019
 *
 * Letzte Aenderung: 14.02.2019
 * Status: rot
 *
 * @module cloud/nuance
 * @author SB
 */
import { SpeechErrorFunc } from './../../interface/speech-function.type';
import { NuanceConfigDataInterface } from './nuance-config-data.interface';
import { NuanceOptionInterface } from './nuance-option.interface';
/**
 * statische Nuance-Klasse zur Erzeugung des NuancePorts
 */
export declare class Nuance {
    private static mInitFlag;
    private static mErrorOutputFlag;
    private static mCurrentPort;
    private constructor();
    static setErrorOutputOn(): void;
    static setErrorOutputOff(): void;
    static setErrorOutputFunc(aErrorFunc: SpeechErrorFunc): void;
    /**
     * Initialisiert den NuancePort.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    static _initNuancePort(aNuanceOption: NuanceOptionInterface): number;
    /**
     * Initialisiert den NuanceMock.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    static _initNuanceMock(aNuanceOption: NuanceOptionInterface): number;
    /**
     * Initialisiert den NuancePorts
     *
     * @static
     * @param {NuanceOptionInterface} aOption - Nuance-Parameter (nuanceAppId, nuanceAppKey, nuanceNluTag)
     *
     * @return {number} Fehlercode 0 oder -1
     */
    static init(aOption: NuanceOptionInterface): number;
    static isInit(): boolean;
    /**
     * Freigabe des NuancePorts
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    static done(): number;
    static _onOpenEvent(aError: any, aPortName: string, aPortResult: number, aOpenEventCallback: any): number;
    /**
     * Oeffnet den NuancePort
     *
     * @param {function} aOpenEventCallback - Funktion fuer OpenEvent-Ereignis fn( PortName: string, PortResult: number)
     *
     * @return {number} Fehlercode 0 oder -1
     */
    static _openNuancePort(aOpenEventCallback: any): number;
    /**
     * Oeffnet den NuancePort
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
    static setConfig(aConfigData: NuanceConfigDataInterface): number;
    /**
     * Gibt die aktuellen Credentials zurueck.
     *
     * @static
     * @return {NuanceConfigDataInterface} Konfigurationsdaten zurueckgeben
     */
    static getConfig(): NuanceConfigDataInterface;
}
