/**
 * Grundlegende Fehlerbehandlung
 *
 * Letzte Aenderung: 24.08.2018
 * Status: gruen
 *
 * @module core/error
 * @author SB
 */


// global

import { SPEECH_ERROR_OUTPUT } from './../../const/speech-api-const';
import { SpeechErrorFunc } from './../../interface/speech-function.type';


/** @export
 * Basisklasse fuer die Fehlerbehandlung in allen anderen Klassen
 */

export class ErrorBase {

    /**
     * statischer Klassenname fuer die Ausgabe des Fehlers
     */

    mErrorClassName = 'ErrorBase';


    /**
     * Fehlerausgabeflag zur Bestimmung, ob ein Fehler auf der Konsole
     * ausgegeben wird.
     * Der Defaultwert ist in SPEECH_ERROR_OUTPUT festgelegt.
     */

    mErrorOutputFlag = SPEECH_ERROR_OUTPUT;


    /**
     * Rueckgabe des Fehlertextes, wenn error oder exception aufgerufen wurde
     *
     * errorCallbackFunc( aErrorText: string )
     */

    mErrorOutputFunc: SpeechErrorFunc = null;


    /**
     * Erzeugt eine Instanz von ErrorBase
     *
     * @param aClassName - statischer Klassenname fuer die Fehlerbehandlung
     */

    constructor( aClassName: string ) {
        this.mErrorClassName = aClassName;
    }


    // Fehler-Funktionen


    /**
     * setzen eines statischen Klassennamens fuer die Fehlerausgabe
     *
     * @protected
     * @param {string} aClassName - Name der Klasse
     */


    _setErrorClassName( aClassName: string ): void {
        this.mErrorClassName = aClassName;
    }


    /**
     * Rueckgage des eingetragenen statischen Klassennamens
     *
     * @protected
     * @return {string} statischer Klassenname fuer die Fehlerausgabe
     */

    _getErrorClassName(): string {
        return this.mErrorClassName;
    }


    /**
     * setzen des Fehlerausgabeflags
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - Fehlerausgabeflag
     */

    _setErrorOutput( aErrorOutputFlag: boolean ): void {
        this.mErrorOutputFlag = aErrorOutputFlag;
    }


    /**
     * setzt die Fehlerausgabewieder auf Defaultwert SPEECH_ERROR_OUTPUT
     */

    _setErrorOutputDefault(): void {
        this._setErrorOutput( SPEECH_ERROR_OUTPUT );
    }


    /**
     * Eintragen einer Fehlerfunktion fuer den Fehler, wenn error
     * oder exception aufgerufen wurden. Es wird ein Fehlertext uebergeben.
     *
     * @param {SpeechErrorFunc} aErrorFunc - Funktion fuer die Fehlerbehandlung
     */

    _setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        this.mErrorOutputFunc = aErrorFunc;
    }


    /**
     * Fehlerausgabe in Abhaengigkeit vom eingestellten ErrorOutput Flag
     *
     * @param {string} aFuncName - Name der Funktion, in der der Fehler auftrat
     * @param {string} aErrorText - Fehlertext fuer Ausgabe
     */

    _error( aFuncName: string, aErrorText: string ): void {
        // pruefen auf Konsolenausgabe
        if ( this.mErrorOutputFlag ) {
            console.log('===> ERROR ', this.mErrorClassName + '.' + aFuncName + ':', aErrorText);
        }
        // rueckgabe des Fehlertextes, wenn error aufgerufen wurde
        if ( typeof this.mErrorOutputFunc === 'function' ) {
            try {
                this.mErrorOutputFunc( this.mErrorClassName + '.' + aFuncName + ': ' + aErrorText );
            } catch ( aException ) {
                console.log('ErrorBase._error: Exception ', aException.message);
            }
        }
    }


    /**
     * Exceptionausgabe, ist nicht im PluginInterface vorhanden,
     * da es nur intern verwendet wird. Versendet einen ErrorEvent
     *
     * @param {string} aFuncName - Name der Funktion, in der der Fehler auftrat
     * @param {Exception} aException - Exceptionobjekt
     */

    _exception( aFuncName: string, aException: any ): void {
        if ( this.mErrorOutputFlag ) {
            console.log('===> EXCEPTION ', this.mErrorClassName + '.' + aFuncName + ':', aException.message);
        }
        // rueckgabe des Fehlertextes, wenn exception aufgerufen wurde
        if ( typeof this.mErrorOutputFunc === 'function' ) {
            try {
                this.mErrorOutputFunc( 'EXCEPTION ' + this.mErrorClassName + '.' + aFuncName + ': ' + aException.message );
            } catch ( aFailException ) {
                console.log('ErrorBase._exception: Exception ', aFailException.message);
            }
        }
    }


    // oeffentliche Fehlerfunktionen


    /**
     * Pruefen auf Fehlerausgabe ueber die Konsole
     *
     * @returns {boolean}
     */

    isErrorOutput(): boolean {
        return this.mErrorOutputFlag;
    }


    /**
     * Einschalten der Fehlerausgabe ueber die Konsole
     */

    setErrorOutputOn(): void {
        this._setErrorOutput( true );
    }


    /**
     * Ausschalten der Fehlerausgabe ueber die Konsole
     */

    setErrorOutputOff(): void {
        this._setErrorOutput( false );
    }

}
