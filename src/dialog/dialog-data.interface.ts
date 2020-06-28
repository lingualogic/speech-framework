/** @packageDocumentation
 * globale Dialog-Daten Interfaces fuer den Json-Transformer
 *
 * API-Version: 1.0
 * Datum:   07.09.2019
 *
 * Letzte Aenderung: 07.09.2019
 * Status: rot
 *
 * @module dialog
 * @author SB
 */


 /**
  * DialogState-Daten beinhaltet den Name des States und eine Liste der zugeordneten Intentnamen
  */

export interface DialogStateInterface {
    // State-Name
    name: string;
    // Liste der Intent-Namen
    intentList: Array<string>;
}


/**
 * DialogCommand-Daten beinhaltet den Namen des Kommandos (ACTION, SPEAK, WAIT) und weitere optionale 
 * Parameter.
 * 
 * ACTION:  action  - Name der auszufuehrenden Funktion
 *          type    - Name des Elementtyps (ButtonOnly z.B)
 *          element - Name des Elementes 
 * 
 * SPEAK:   textId  - Name des auszugebenden Textes/Audiofdatei
 * 
 * WAIT:    time    - Zeit in Sekunden, die gewartet werden soll
 */

export interface DialogCommandInterface {
    // Name des Kommandos (ACTION, SPEAK, WAIT)
    name: string;
    // Aktionsname, fuer auszufuehrende Aktion
    action?: string;
    // Elementtypname, um Elementtyp fuer die Aktion festzulegen
    type?: string;
    // Elementname, um Element fuer die Aktion festzulegen
    element?: string;
    // Textname, fuer die Ausgabe eines Textes in SPEAK
    textId?: string;
    // Zeit, fuer Warten in Sekunden bei WAIT
    time?: number;
}


/**
 * DialogIntent beinhaltet den Namen eines Intents, eine Kommandoliste der auszufuehrenden Aktionen des Intents
 * und weitere Flags fuer Optionen und Scrollbar.
 */

export interface DialogIntentInterface {
    // Name des Intents
    name: string;
    // Liste aller Kommandos, die der Intent ausfuehren soll
    commandList: Array<DialogCommandInterface>;
    // Optional-Flag, Ausgabe erfolgt nur bei Vorhandensein des Intents
    optional?: boolean;
    // Scroll-Flag, wenn Aktion sich auf scrollbare Elemente bezieht
    scrollable?: boolean;
}


/**
 * DialogText beinhaltet einen Textnamen, einen auszugebenden Text und die Zeit, die der Text fuer die Ausgabe benoetigt.
 */

export interface DialogTextInterface {
    // Name des Textes
    name: string;
    // auszugebender Text
    text: string;
    // Zeit, die der Text fuer die Ausgabe benoetigt
    time: number;
}


/**
 * DialogData beinhaltet alle Daten fuer einen Dialog
 */

export interface DialogDataInterface {
    // Dialogname
    name: string;
    // Liste aller Dialog-States
    stateList: DialogStateInterface[];
    // Liste aller Dialog-Intents
    intentList: DialogIntentInterface[];
    // Liste aller Dialog-Texte
    textList: DialogTextInterface[];
}
