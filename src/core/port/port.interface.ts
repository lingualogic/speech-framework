/**
 * Port Schnittstelle fuer die Verbindung mit externen Diensten.
 * Ports sind Vermittler zwischen den externen Diensten und den internen Plugins.
 *
 * Letzte Aenderung: 20.03.2019
 * Status: rot
 *
 * @module core/port
 * @author SB
 */


// event

import { EventFunc } from './../event/event-function-list';
import { EventDataInterface } from './../event/event-data.interface';


// Port-Funktionen

export type PortEventFunc = (aPortEvent: EventDataInterface) => number;


/**
 * Port Interface
 */

export interface PortInterface {


    /**
     * initialisert den Port
     *
     * @param {any} [aOption] - optionale Parameter
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number;


    /**
     * gibt den Port frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    done(): number;


    /**
     * setzt den Port wieder auf Defaultwerte und uebergebene optionale Parameter
     * Die Fehlerausgabe wird nicht zurueckgesetzt.
     *
     * @param {any} [aOption] - optionale Parameter
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    reset( aOption?: any ): number;


    /**
     * pruefen auf initialiserten Port
     *
     * @return {boolean} initFlag - true, Port ist initialisiert, false sonst
     */

    isInit(): boolean;


    /**
     * pruefen auf Mock-Port zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Port ein Mock zum Testen ist
     */

    isMock(): boolean;


    /**
     * Rueckgabe eines logischen Port-Typs
     *
     * @return {string} logischer Typ des Ports fuer unterschiedliche Anwendungsschnittstellen
     */

    getType(): string;


    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */

    getClass(): string;


    /**
     * Rueckgabe eines Port-Namens
     *
     * @return {string} Rueckgabe des Portnamens, unter dem er im PortManager gespeichert ist
     */

    getName(): string;


    /**
     * Rueckgabe der Port-Version
     *
     * @return {string} Rueckgabe der Portversion
     */

    getVersion(): string;


    // Fehler-Funktionen


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


    // Event-Funktionen


    /**
     * Event eintragen
     *
     * @param {string} aPluginName - Plugin, welches die Event-Funktion eintraegt
     * @param {EventFunc} aEventFunc - Event-Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addInitEvent( aPluginName: string, aInitEventFunc: PortEventFunc ): number;
    addOpenEvent( aPluginName: string, aOpenEventFunc: PortEventFunc ): number;
    addCloseEvent( aPluginName: string, aCloseEventFunc: PortEventFunc ): number;
    addStartEvent( aPluginName: string, aStartEventFunc: PortEventFunc ): number;
    addStopEvent( aPluginName: string, aStopEventFunc: PortEventFunc ): number;
    addResultEvent( aPluginName: string, aResultEventFunc: PortEventFunc ): number;
    addErrorEvent( aPluginName: string, aErrorEventFunc: EventFunc ): number;


    /**
     * Event wieder entfernen
     *
     * @param {string} aPluginName - Name des Plugins, von dem die Event-Funktion entfernt werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeInitEvent( aPluginName: string ): number;
    removeOpenEvent( aPluginName: string ): number;
    removeCloseEvent( aPluginName: string ): number;
    removeStartEvent( aPluginName: string ): number;
    removeStopEvent( aPluginName: string ): number;
    removeResultEvent( aPluginName: string ): number;
    removeErrorEvent( aPluginName: string ): number;

    removeAllEvent( aPluginName: string ): number;


    // Port-Funktionen


    /**
     * Eintragen der Port-Konfiguration
     *
     * @param {*} aConfigData - Konfiguration eintragen
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setConfig( aConfigData: any ): number;


    /**
     * Rueckgabe der aktuellen Port-Konfiguration
     *
     * @return {any} aktuelle Portkonfigurationsdaten
     */

    getConfig(): any;


    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */

    isOpen(): boolean;


    /**
     * Port oeffnen
     *
     * @param {*} aOption - optionale Parameter
     * @return {number} Fehlercode 0 oder -1
     */

    open( aOption?: any ): number;


    /**
     * Port schliessen
     *
     * @return {number} Fehlercode 0 oder -1
     */

    close(): number;


    /**
     * Rueckgabe des Pluginnamens, der gerade eine Transaktion ausfuehrt
     *
     * @return {string} PluginName oder leerer String
     */

    getPluginName(): string;


    /**
     * Rueckgabe des Aktionsnames, der gerade eine Transaktion ausfuehrt
     *
     * @return {string} ActionName oder leerer String
     */

    getActionName(): string;


    /**
     * Pruefen, ob Port eine Aufgabe ausfuehrt, zu einem bestimmten Plugin
     * und zu einer bestimmten Aufgabe.
     *
     * @param {string} aPluginName - optionaler Pluginname
     * @param {string} aAction - optionaler Aktionsname
     *
     * @return {boolean} True, wenn Port beschaeftigt ist, False sonst
     */

    isRunning( aPluginName?: string, aAction?: string ): boolean;


    /**
     * Pruefen, ob eine Aktion im Port ausgefuehrt werden kann oder nicht.
     *
     * @param {string} aAction - Name der zu pruefenden Aktion
     *
     * @returns {boolean} True, wenn Aktion ausfuehrbar ist, False sonst
     */

    isAction( aAction?: string ): boolean;


    /**
     * Dient zum Setzen eines Timeouts, um Aktionen abzubrechen. 
     * Bei Timeout 0 wird kein Timeout gesetzt.
     * 
     * @param aTimeout - Zeit in Millisekunden bis die Aktion abgebrochen wird
     */

    setActionTimeout( aTimeout: number ): void;


    /**
     * Portaktion starten
     *
     * @param {string} aPluginName - Name des Aufrufers der Transaktion
     * @param {string} aAction - optional auszufuehrende Aktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    start( aPluginName: string, aAction?: string, aOption?: any ): number;


    /**
     * Portaktion beenden
     *
     * @param {string} aPluginName - Name des Aufrufers der Transaktion
     * @param {string} aAction - optional zu beendende Aktion
     * @param {*} aOption - optionale Parameter
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    stop( aPluginName: string, aAction?: string, aOption?: any ): number;


    // Test-Funktionen


    /**
     * Fuehrt Testkommandos aus, um interne Tests ablaufen lassen zu koennen
     *
     * @param {string} aPluginName - Name des Aufrufers der Transaktion
     * @param {string} aTestCommand - Testkommando
     * @param {*} aTestData - optionale Testdaten
     *
     * @return {*} Rueckgabe der Testergebnisse
     */

    test( aPluginName: string, aTestCommand: string, aTestData?: any ): any;

}
