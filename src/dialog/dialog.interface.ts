/**
 * Oeffentliche Dialog Schnittstelle
 *
 * API-Version: 1.1
 * Datum:   18.10.2018
 *
 * Letzte Aenderung: 15.12.2018
 * Status: gelb
 *
 * @module dialog
 * @author SB
 */


// global

import { OnSpeechErrorFunc } from '../interface/speech-function.type';


// base

import { BaseInterface } from './../base/base.interface';


// dialog

import {
    OnDialogParseFunc,
    OnDialogSetFunc,
    OnDialogStartFunc,
    OnDialogStopFunc,
    OnDialogStateSetFunc,
    OnDialogActionFunc,
    OnDialogActionStopFunc,
    OnDialogSpeakFunc,
    OnDialogSpeakStartFunc,
    OnDialogSpeakStopFunc
} from './dialog-function.type';
import { DialogStateContextInterface } from './dialog-state-context.interface';


// Global API


/** @export
 * Dialog Schnittstelle
 */

export interface DialogInterface extends BaseInterface {


    // Event-Funktionen


    /**
     * Traegt eine Ereignisfunktion in das DialogParse Ereignis ein.
     * DialogParse wird ausgeloest, wenn ein Dialogskript geparst worden ist.
     *
     * @param {string} aPluginName - Name des Plugins, welches die Funktion eintragt
     * @param {OnDialogParseFunc} aEventFunc - Funktion, die Ereignis verarbeitet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addDialogParseEvent( aPluginName: string, aEventFunc: OnDialogParseFunc ): number;


    /**
     * Traegt eine Ereignisfunktion in das DialogSet Ereignis ein.
     * DialogSet wird ausgeloest, wenn ein neuer Dialogname eingetragen worden ist.
     * Der Dialogname wird der Ereignisfunktion uebergeben.
     *
     * @param {string} aPluginName - Name des Plugins, welches die Funktion eintragt
     * @param {OnDialogSetFunc} aEventFunc - Funktion, die Ereignis verarbeitet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addDialogSetEvent( aPluginName: string, aEventFunc: OnDialogSetFunc ): number;


    /**
     * Traegt eine Ereignisfunktion in das DialogStart Ereignis ein.
     * DialogStart wird ausgeloest, wenn ein Dialog gestartet wurde.
     *
     * @param {string} aPluginName - Name des Plugins, welches die Funktion eintragt
     * @param {OnDialogStartFunc} aEventFunc - Funktion, die Ereignis verarbeitet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addDialogStartEvent( aPluginName: string, aEventFunc: OnDialogStartFunc ): number;


    /**
     * Traegt eine Ereignisfunktion in das DialogStop Ereignis ein.
     * DialogStop wird ausgeloest, wenn ein Dialog beendet wurde.
     *
     * @param {string} aPluginName - Name des Plugins, welches die Funktion eintragt
     * @param {OnDialogStopFunc} aEventFunc - Funktion, die Ereignis verarbeitet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addDialogStopEvent( aPluginName: string, aEventFunc: OnDialogStopFunc ): number;


    /**
     * Traegt eine Ereignisfunktion in das DialogStateSet Ereignis ein.
     * DialogStateSet wird ausgeloest, wenn ein neuer Dialogzustand eingetragen worden ist.
     * Der Dialogzustand wird der Ereignisfunktion uebergeben.
     *
     * @param {string} aPluginName - Name des Plugins, welches die Funktion eintragt
     * @param {OnDialogStateSetFunc} aEventFunc - Funktion, die Ereignis verarbeitet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addDialogStateSetEvent( aPluginName: string, aEventFunc: OnDialogStateSetFunc ): number;


    /**
     * Traegt eine Ereignisfunktion in das DialogAction Ereignis ein.
     * DialogAction wird ausgeloest, wenn eine Aktion ausgefuhert werden soll.
     * Die Aktionsdaten werden der Ereignisfunktion uebergeben.
     *
     * @param {string} aPluginName - Name des Plugins, welches die Funktion eintragt
     * @param {OnDialogActionFunc} aEventFunc - Funktion, die Ereignis verarbeitet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addDialogActionEvent( aPluginName: string, aEventFunc: OnDialogActionFunc ): number;


    /**
     * Traegt eine Ereignisfunktion in das DialogActionStop Ereignis ein.
     * DialogActionStop wird ausgeloest, wenn eine Aktion beendert werden soll.
     *
     * @param {string} aPluginName - Name des Plugins, welches die Funktion eintragt
     * @param {OnDialogActionStopFunc} aEventFunc - Funktion, die Ereignis verarbeitet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addDialogActionStopEvent( aPluginName: string, aEventFunc: OnDialogActionStopFunc ): number;


    /**
     * Traegt eine Ereignisfunktion in das DialogSpeak Ereignis ein.
     * DialogSpeak wird ausgeloest, wenn eine Sprachausgabe ausgefuehrt werden soll.
     * Die Sprachausgabedaten werden der Ereignisfunktion uebergeben.
     *
     * @param {string} aPluginName - Name des Plugins, welches die Funktion eintragt
     * @param {OnDialogSpeakFunc} aEventFunc - Funktion, die Ereignis verarbeitet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addDialogSpeakEvent( aPluginName: string, aEventFunc: OnDialogSpeakFunc ): number;


    /**
     * Traegt eine Ereignisfunktion in das DialogSpeakStart Ereignis ein.
     * DialogSpeakStart wird ausgeloest, wenn eine Sprachausgabe gestartet wird.
     *
     * @param {string} aPluginName - Name des Plugins, welches die Funktion eintragt
     * @param {OnDialogSpeakStartFunc} aEventFunc - Funktion, die Ereignis verarbeitet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addDialogSpeakStartEvent( aPluginName: string, aEventFunc: OnDialogSpeakStartFunc ): number;


    /**
     * Traegt eine Ereignisfunktion in das DialogSpeakStop Ereignis ein.
     * DialogSpeakStop wird ausgeloest, wenn eine Sprachausgabe durch den Timeout beendert wird.
     *
     * @param {string} aPluginName - Name des Plugins, welches die Funktion eintragt
     * @param {OnDialogSpeakStopFunc} aEventFunc - Funktion, die Ereignis verarbeitet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addDialogSpeakStopEvent( aPluginName: string, aEventFunc: OnDialogSpeakStopFunc ): number;


    /**
     * Traegt eine Ereignisfunktion in das Error Ereignis ein.
     * Error wird ausgeloest, wenn ein Fehler bei der Ausfuehrung einer Funktion auftrat.
     * Die Fehlerdaten werden der Ereignisfunktion uebergeben.
     *
     * @param {string} aPluginName - Name des Plugins, welches die Funktion eintragt
     * @param {OnSpeechErrorFunc} aEventFunc - Funktion, die Ereignis verarbeitet
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addErrorEvent( aPluginName: string, aEventFunc: OnSpeechErrorFunc ): number;


    /**
     * Entfernt die Ereignisfunktion aus dem DialogParse Ereignis.
     *
     * @param aPluginName - Name des Plugins, von dem die Funktion entfernt werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeDialogParseEvent( aPluginName: string ): number;


    /**
     * Entfernt die Ereignisfunktion aus dem DialogSet Ereignis.
     *
     * @param aPluginName - Name des Plugins, von dem die Funktion entfernt werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeDialogSetEvent( aPluginName: string ): number;


    /**
     * Entfernt die Ereignisfunktion aus dem DialogStart Ereignis.
     *
     * @param aPluginName - Name des Plugins, von dem die Funktion entfernt werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeDialogStartEvent( aPluginName: string ): number;


    /**
     * Entfernt die Ereignisfunktion aus dem DialogStop Ereignis.
     *
     * @param aPluginName - Name des Plugins, von dem die Funktion entfernt werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeDialogStopEvent( aPluginName: string ): number;


    /**
     * Entfernt die Ereignisfunktion aus dem DialogStateSet Ereignis.
     *
     * @param aPluginName - Name des Plugins, von dem die Funktion entfernt werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeDialogStateSetEvent( aPluginName: string ): number;


    /**
     * Entfernt die Ereignisfunktion aus dem DialogAction Ereignis.
     *
     * @param aPluginName - Name des Plugins, von dem die Funktion entfernt werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeDialogActionEvent( aPluginName: string ): number;


    /**
     * Entfernt die Ereignisfunktion aus dem DialogActionStop Ereignis.
     *
     * @param aPluginName - Name des Plugins, von dem die Funktion entfernt werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeDialogActionStopEvent( aPluginName: string ): number;


    /**
     * Entfernt die Ereignisfunktion aus dem DialogSpeak Ereignis.
     *
     * @param aPluginName - Name des Plugins, von dem die Funktion entfernt werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeDialogSpeakEvent( aPluginName: string ): number;


    /**
     * Entfernt die Ereignisfunktion aus dem DialogSpeakStart Ereignis.
     *
     * @param aPluginName - Name des Plugins, von dem die Funktion entfernt werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeDialogSpeakStartEvent( aPluginName: string ): number;


    /**
     * Entfernt die Ereignisfunktion aus dem DialogSpeakStop Ereignis.
     *
     * @param aPluginName - Name des Plugins, von dem die Funktion entfernt werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeDialogSpeakStopEvent( aPluginName: string ): number;


    /**
     * Entfernt die Ereignisfunktion aus dem Error Ereignis.
     *
     * @param aPluginName - Name des Plugins, von dem die Funktion entfernt werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeErrorEvent( aPluginName: string ): number;


    /**
     * Entfernt alle Ereignisfunktionen des Plugins.
     *
     * @param aPluginName - Name des Plugins, von dem alle Funktionen entfernt werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeAllEvent( aPluginName: string ): number;


    // Parser-Funktionen


    /**
     * Parsen einer Dialogskriptdatei
     *
     * @param aDefFileName - Name der Dialogskriptdatei, die geparst werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    parseSpeechDefFile( aDefFileName: string ): number;


    /**
     * Parsen eines Dialogskripttextes
     *
     * @param aDefData - Dialogskripttext, der geparst weren soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    parseSpeechDefData( aDefData: string ): number;


    // Dialog-Funktionen


    /**
     * Loeschen des Dialogspeichers.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    clearDialog(): number;


    /**
     * Eintragen des Dialogdateiverzeichnisses, in dem die Dialogskripte
     * abgelegt sind.
     *
     * @param aDialogFilePath - lokales Dateiverzeichnis fuer alle Dialogdateien
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setDialogFilePath( aDialogFilePath: string ): number;


    /**
     * Rueckgabe des aktuellen Dialogdateiverzeichnisses fuer alle Dialogskripte.
     *
     * return {string} Dialogverzeichnis der Dialogskripte
     */

    getDialogFilePath(): string;


    /**
     * Eintragen eines Default-Dialogsktiptdateinamens.
     *
     * @param {string} aDialogFileName - Name des Dialogskriptes
     */

    setDialogFileName( aDialogFileName: string ): number;


    /**
     * Rueckgabe des aktuellen Defaultnamens des Dialogskriptes.
     *
     * @return {string} Dialogskriptdateiname
     */

    getDialogFileName(): string;


    /**
     * Laden eines Dialogskriptes in den Dialogspeicher, um ihn ausfuehren
     * zu koennen.
     *
     * @param {string} aDialogFileName - Name des Dialogskripts
     *
     * @return {number} Fehlercode 0 oder -1
     */

    loadDialogFile( aDialogFileName: string ): number;


    /**
     * schreiben eines Dialogskripttextes in den Dialogspeicher, um ihn ausfuehren
     * zu koennen.
     *
     * @param aDialogData - Dialogskripttext
     *
     * @return {number} Fehlercode 0 oder -1
     */

    writeDialogData( aDialogData: string ): number;


    /**
     * Eintragen eines Dialognamens, um den Dialog ausfuehren zu koennen.
     * Ein bereits laufender Dialog wird beendet.
     *
     * @param aDialogName - Name des Dialogs, der im geladenen Dialogskript enthalten sein muss
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setDialog( aDialogName: string ): number;


    /**
     * Rueckgabe des aktuell eingestellten Dialognamens.
     *
     * @return {string} Name des aktuell ausfuehrbaren Dialogs
     */

    getDialog(): string;


    /**
     * Schaltet zwischen Dialog ausfuehren und Dialog beenden hin und her.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    toggleDialog(): number;


    /**
     * Ueberspringt eine Sprachausgabe.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    skipNextSpeak(): number;


    // Dialogzustands-Funktionen


    /**
     * Setzt einen aktuellen Dialogzustand, der ausgefuhert werden kann.
     * Der Dialogzustand ist die kleinste auszufuehrende Einheit eines Dialogs.
     * Ein laufender Dialog wird beendet.
     *
     * @param aState - Name des zu setzenden Dialogzustands
     * @param aContext - optionaler Kontext fuer den Dialogzustand
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setDialogState( aState: string, aContext?: DialogStateContextInterface ): number;


    /**
     * Gibt den aktuell eingestellten Dialogzustand zurueck.
     *
     * @return {string} Name des aktuell eingestellten Dialogzustands
     */

    getDialogState(): string;


    /**
     * Traegt den Kontext zu einem Dialogzustand ein.
     *
     * @param aContext - Kontextdaten, die fuer den Dialogzustand eingetragen werden
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setDialogStateContext( aContext: DialogStateContextInterface ): number;

}
