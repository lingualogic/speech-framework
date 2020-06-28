/** @packageDocumentation
 * Dialog Version und Build Konstanten
 *
 * API-Version: 1.0
 * Datum:   07.09.2018
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * @module dialog
 * @author SB
 */


// global

import { SPEECH_VERSION_NUMBER, SPEECH_VERSION_BUILD, SPEECH_VERSION_TYPE, SPEECH_VERSION_DATE } from '@speech/core';


// Versions-Konstanten

export const DIALOG_VERSION_NUMBER = SPEECH_VERSION_NUMBER;
export const DIALOG_VERSION_BUILD = SPEECH_VERSION_BUILD;
export const DIALOG_VERSION_TYPE = SPEECH_VERSION_TYPE;
export const DIALOG_VERSION_DATE = SPEECH_VERSION_DATE;
export const DIALOG_VERSION_STRING = DIALOG_VERSION_NUMBER + '.' + DIALOG_VERSION_BUILD + ' vom ' + DIALOG_VERSION_DATE + ' (' + DIALOG_VERSION_TYPE + ')';

export const DIALOG_API_VERSION = DIALOG_VERSION_STRING;
