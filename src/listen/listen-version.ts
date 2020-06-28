/** @packageDocumentation
 * Listen Version und Build Konstanten
 *
 * API-Version: 1.0
 * Datum: 08.10.2018
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * @module listen
 * @author SB
 */


// global

import { SPEECH_VERSION_NUMBER, SPEECH_VERSION_BUILD, SPEECH_VERSION_TYPE, SPEECH_VERSION_DATE } from '@speech/core';


// Versions-Konstanten

export const LISTEN_VERSION_NUMBER = SPEECH_VERSION_NUMBER;
export const LISTEN_VERSION_BUILD = SPEECH_VERSION_BUILD;
export const LISTEN_VERSION_TYPE = SPEECH_VERSION_TYPE;
export const LISTEN_VERSION_DATE = SPEECH_VERSION_DATE;
export const LISTEN_VERSION_STRING = LISTEN_VERSION_NUMBER + '.' + LISTEN_VERSION_BUILD + ' vom ' + LISTEN_VERSION_DATE + ' (' + LISTEN_VERSION_TYPE + ')';

export const LISTEN_API_VERSION = LISTEN_VERSION_STRING;
