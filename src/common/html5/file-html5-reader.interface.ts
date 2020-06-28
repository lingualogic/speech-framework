/** @packageDocumentation
 * FileHtml5Reader Schnittstelle
 *
 * Version: 1.0
 * Datum:   26.11.2018
 *
 * @module common/html5
 * @author SB
 */



// Konstanten

export const XMLHTTPREQUEST_TEXT_RESPONSETYPE = 'text';
export const XMLHTTPREQUEST_ARRAYBUFFER_RESPONSETYPE = 'arraybuffer';


// Events


/**
 * Zu uebergebende Event-Funktion als Callback zur Uebergabe der Daten an den Aufrufer.
 * Muss vor dem Aufruf von read() in onRead eingetragen werden.
 */

export type OnFileHtml5ReaderReadFunc = (aFileData: any) => void;
export type OnFileHtml5ErrorFunc = (aErrorText: string) => void;


export interface FileHtml5ReaderInterface {


    /**
     * Hier wird eine Read-Callback Funktion als Event eingetragen
     */

    onRead: OnFileHtml5ReaderReadFunc;

    /**
     * Hier wird eine Error-Callback Funktion als Event eingetragen
     */

    onError: OnFileHtml5ErrorFunc;


    /**
     * Hier wird eine Date eingelesen und ueber die onRead-Funktion die Daten als String zurueckgegeben
     *
     * @param aFileUrl - Pfad und Name der einzulesenden Datei
     *
     * @return {number} Fehlercode 0 oder -1
     */

    read( aFileUrl: string ): number;
}
