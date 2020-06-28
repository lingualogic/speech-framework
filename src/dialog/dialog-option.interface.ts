/** @packageDocumentation
 * DialogOption Schnittstelle
 *
 * API-Version: 1.1
 * Datum:       18.10.2018
 *
 * Letzte Aenderung: 21.06.2020
 * Status: gelb
 *
 * @module dialog
 * @author SB
 */


// base

/****
 * import { BaseOptionInterface } from './../base/base-option.interface';
 ****/

import { BaseOptionInterface } from '@speech/base';


/** @export
 * DialogOption Schnittstelle fuer optionale Konfigurationsparameter von Dialog bei der Initialisierung
 */

export interface DialogOptionInterface extends BaseOptionInterface {
    /** Startdialogname, wenn ein Dialog gestartet wird, z.B: 'main' */
    dialogName?: string;
    /** Startdialogzustand, wenn ein Dialog gestartet wird, z.B: 'root' */
    dialogRootState?: string;
    /** legt fest, ob ein Dialog direkt bei der Initialisierung geladen wird */
    dialogLoadFlag?: boolean;
    /** definiert das Verzeichnis fuer die Dialogdefinitionsdateien, muss mit '/' abgeschlossen werden, z.B.: 'assets/' */
    dialogFilePath?: string;
    /** Dialogdefinitionsdateiname fuer die erste zu ladende Dialogdefinitonsdatei, z.B: 'speech.def' */
    dialogFileName?: string;
}
