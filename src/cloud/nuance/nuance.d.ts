/**
 * Nuance-Modul
 *
 * Hier wird die Modul-Schnittstelle von Nuance definiert, um Nuance zu
 * initialisieren und als Port zu oeffnen.
 *
 * API-Version: 1.0
 * Datum:       16.12.2018
 *
 * Letzte Aenderung: 16.12.2018
 * Status: rot
 *
 * @module cloud/nuance
 * @author SB
 */
import { SpeechErrorFunc } from './../../interface/speech-function.type';
import { NuanceOptionInterface } from './nuance-option.interface';
/**
 * statische Nuance Modul-Klasse zur Erzeugung des NuancePorts
 */
export declare class Nuance {
    private static mInitFlag;
    private static mErrorOutputFlag;
    private constructor();
    static setErrorOutputOn(): void;
    static setErrorOutputOff(): void;
    static setErrorOutputFunc(aErrorFunc: SpeechErrorFunc): void;
    /**
     * Initialisiert den NuancePort. Zu Testzwecken koennen Port-Mocks vor
     * Aufruf von _createAllPorts erzeugt werden. Deshalb wird kein
     * Fehler zurueckgegeben.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    static _initNuancePort(aNuanceOption: NuanceOptionInterface): number;
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
}
