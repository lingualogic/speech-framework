/** @packageDocumentation
 * Fehlercodes und Fehlertexte des Speech-Servers, deutsch und englisch
 *
 * @module speech-common
 * @author SB
 */

// Konfiguration der Fehlerausgabesprache

export const SPEECH_ERROR_ENGLISH = 'EN';
export const SPEECH_ERROR_GERMAN = 'DE';

let errorLanguage = SPEECH_ERROR_GERMAN;

// Fehlercode-Konstanten

export const SPEECH_NO_ERROR = 0;
export const SPEECH_UNDEFINE_ERROR = 1;
export const SPEECH_NOSETDIALOG_ERROR = 2;
export const SPEECH_NOSTARTDIALOG_ERROR = 3;
export const SPEECH_NOSTOPDIALOG_ERROR = 4;
export const SPEECH_NOLOADDIALOGFILE_ERROR = 5;
export const SPEECH_NOWRITEDIALOGDATA_ERROR = 6;
export const SPEECH_NOSETTING_ERROR = 7;
export const SPEECH_NOSETSTATE_ERROR = 8;
export const SPEECH_NOSETSTATECONTEXT_ERROR = 9;
export const SPEECH_NOSKIPNEXTSPEAK_ERROR = 10;
export const SPEECH_EXCEPTION_ERROR = 11;
export const SPEECH_INVALIDMESSAGE_ERROR = 12;

// Mapping Fehlercode-Fehlertext

export const SPEECH_UNDEFINE_ERRORTEXT = 'undefine Error';

const errorMapDE = {
    [SPEECH_NO_ERROR]: 'kein Fehler',
    [SPEECH_UNDEFINE_ERROR]: 'undefinierter Fehler',
    [SPEECH_NOSETDIALOG_ERROR]: 'kein setDialog',
    [SPEECH_NOSTARTDIALOG_ERROR]: 'kein startDialog',
    [SPEECH_NOSTOPDIALOG_ERROR]: 'kein stopDialog',
    [SPEECH_NOLOADDIALOGFILE_ERROR]: 'kein loadDialogFile',
    [SPEECH_NOWRITEDIALOGDATA_ERROR]: 'kein writeDialogData',
    [SPEECH_NOSETTING_ERROR]: 'kein setting',
    [SPEECH_NOSETSTATE_ERROR]: 'kein setState',
    [SPEECH_NOSETSTATECONTEXT_ERROR]: 'kein setStateContext',
    [SPEECH_NOSKIPNEXTSPEAK_ERROR]: 'kein skipNextSpeak',
    [SPEECH_EXCEPTION_ERROR]: 'Exception aufgetreten',
    [SPEECH_INVALIDMESSAGE_ERROR]: 'keine gueltige Nachricht',
};

const errorMapEN = {
    [SPEECH_NO_ERROR]: 'no Error',
    [SPEECH_UNDEFINE_ERROR]: SPEECH_UNDEFINE_ERRORTEXT,
    [SPEECH_NOSETDIALOG_ERROR]: 'no setDialog',
    [SPEECH_NOSTARTDIALOG_ERROR]: 'no startDialog',
    [SPEECH_NOSTOPDIALOG_ERROR]: 'no stopDialog',
    [SPEECH_NOLOADDIALOGFILE_ERROR]: 'no loadDialogFile',
    [SPEECH_NOWRITEDIALOGDATA_ERROR]: 'no writeDialogData',
    [SPEECH_NOSETTING_ERROR]: 'no setting',
    [SPEECH_NOSETSTATE_ERROR]: 'no setState',
    [SPEECH_NOSETSTATECONTEXT_ERROR]: 'no setStateContext',
    [SPEECH_NOSKIPNEXTSPEAK_ERROR]: 'no skipNextSpeak',
    [SPEECH_EXCEPTION_ERROR]: 'throw exception',
    [SPEECH_INVALIDMESSAGE_ERROR]: 'invalid message',
};

/**
 * Eintragen der Fehlerausgabesprache
 *
 * @param {string} aErrorLanguage - Kuerzel fuer die Sprache (EN/DE), Konstanten dafuer vorhanden
 *
 * @return {string} errorLanguage - eingestelltes SprachKuerzel zurueckgeben (EN/DE)
 */

export function setErrorLanguage( aErrorLanguage? ) {
    if ( aErrorLanguage === SPEECH_ERROR_ENGLISH ) {
        errorLanguage = SPEECH_ERROR_ENGLISH;
    } else {
        errorLanguage = SPEECH_ERROR_GERMAN;
    }
    return errorLanguage;
}

/**
 * Rueckgabe des zum Fehlercode gehoerenden Fehlertextes
 *
 * @param {number} aErrorCode - eindeutige Fehlernummer, egal ob positiv oder negativ uebergeben
 *
 * @return {string} errorText - Fehlertext in der eingestellten Ausgabesprache zum Fehlercode
 */

export function getErrorText( aErrorCode ) {
    const errorCode = Math.abs( aErrorCode );
    let errorMap = errorMapDE;
    if ( errorLanguage === SPEECH_ERROR_ENGLISH ) {
        errorMap = errorMapEN;
    }
    return errorMap[ errorCode ] || errorMap[ SPEECH_UNDEFINE_ERROR ] || SPEECH_UNDEFINE_ERRORTEXT;
}
