/**
 * Oeffentliche Bot Schnittstelle, beinhaltet die Dialog Schnittstelle
 *
 * API-Version: 1.1
 * Datum:       18.10.2018
 *
 * Letzte Aenderung: 18.10.2018
 * Status: gelb
 *
 * @module bot
 * @author SB
 */


// speak

import { SpeakInterface } from './../speak/speak.interface';


// listen

import { ListenInterface } from './../listen/listen.interface';


// action

import { ActionInterface } from './../action/action.interface';


// dialog

import { DialogInterface } from './../dialog/dialog.interface';


// Global API


/**
 * Bot Schnittstelle
 */

export interface BotInterface extends DialogInterface {


    // Speak-Funktionen


    /**
     * Prueft, ob die Speak-Komponente eingeschaltet ist. Nur dann wird sie
     * vom Bot auch verwendet.
     *
     * @return {boolean} True, wenn Speak-Komponente von Bot verwendet wird, sonst False
     */

    isSpeak(): boolean;


    /**
     * Schaltet die Speak-Komponente ein, um sie im Bot zu verwenden.
     * Die Sprachausgabe wird dann an Speak weitergereicht.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setSpeakOn(): number;


    /**
     * Schaltet die Speak-Komponente aus, so dass sie von Bot nicht mehr
     * verwendet wird. Die Sprachausgabe wird nicht mehr an Speak weitergereicht.
     */

    setSpeakOff(): number;


    /**
     * Rueckgabe des SpeakInterface, um direkt in Bot auf die Speak-Komponente
     * zugreifen zu koennen.
     *
     * @return {SpeakInterface} Speak-Komponente in Bot
     */

    getSpeak(): SpeakInterface;


    // Listen-Funktionen


    /**
     * Prueft, ob die Listen-Komponente eingeschaltet ist. Nur dann wird sie
     * vom Bot auch verwendet.
     *
     * @return {boolean} True, wenn Listen-Komponente von Bot verwendet wird, sonst False
     */

    isListen(): boolean;


    /**
     * Schaltet die Listen-Komponente ein, um sie im Bot zu verwenden.
     * Die Spracheingabe wird dann an Listen weitergereicht.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setListenOn(): number;


    /**
     * Schaltet die Listen-Komponente aus, so dass sie von Bot nicht mehr
     * verwendet wird. Die Spracheingabe wird nicht mehr an Listen weitergereicht.
     */

    setListenOff(): number;


    /**
     * Rueckgabe des ListenInterface, um direkt in Bot auf die Listen-Komponente
     * zugreifen zu koennen.
     *
     * @return {ListenInterface} Listen-Komponente in Bot
     */

    getListen(): ListenInterface;


    // Action-Funktionen


    /**
     * Prueft, ob die Action-Komponente eingeschaltet ist. Nur dann wird sie
     * vom Bot auch verwendet.
     *
     * @return {boolean} True, wenn Action-Komponente von Bot verwendet wird, sonst False
     */

    isAction(): boolean;


    /**
     * Schaltet die Action-Komponente ein, um sie im Bot zu verwenden.
     * Die Aktionen werden dann an Action weitergereicht.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActionOn(): number;


    /**
     * Schaltet die Action-Komponente aus, so dass sie von Bot nicht mehr
     * verwendet wird. Die Aktionen werden nicht mehr an Action weitergereicht.
     */

    setActionOff(): number;


    /**
     * Rueckgabe des ActionInterface, um direkt in Bot auf die Action-Komponente
     * zugreifen zu koennen.
     *
     * @return {ActionInterface} Action-Komponente in Bot
     */

    getAction(): ActionInterface;


    // Kontext-Funktionen


    /**
     * Loeschen des aktuellen Kontextes
     *
     * @return {number} Fehlercode 0 oder -1
     */

    clearContext(): number;


    /**
     * Eintragen eines Elementes in den Kontext.
     *
     * @param aElementName - Name des Elementes, fuer das der Kontext eingetragen wird
     * @param aContextName - Name des Kontextes
     *
     * @return {number} Fehlercode 0 oder -1
     */

    addContextElement( aElementName: string, aContextName: string ): number;


    /**
     * Entfernen eines Elementes in den Kontext.
     *
     * @param aElementName - Name des Elementes, fuer das der Kontext entfernt wird
     * @param aContextName - Name des Kontextes
     *
     * @return {number} Fehlercode 0 oder -1
     */

    removeContextElement( aElementName: string, aContextName: string ): number;
}
