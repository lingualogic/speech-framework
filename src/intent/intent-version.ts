/**
 * Intent Version und Build Konstanten
 *
 * API-Version: 1.0
 * Datum: 28.11.2018
 *
 * Letzte Aenderung: 28.11.2018
 * Status: rot
 *
 * @module intent
 * @author SB
 */


// global

import { SPEECH_VERSION_NUMBER, SPEECH_VERSION_BUILD, SPEECH_VERSION_TYPE, SPEECH_VERSION_DATE } from '../const/speech-version';


// Versions-Konstanten

export const INTENT_VERSION_NUMBER = SPEECH_VERSION_NUMBER;
export const INTENT_VERSION_BUILD = SPEECH_VERSION_BUILD;
export const INTENT_VERSION_TYPE = SPEECH_VERSION_TYPE;
export const INTENT_VERSION_DATE = SPEECH_VERSION_DATE;
export const INTENT_VERSION_STRING = INTENT_VERSION_NUMBER + '.' + INTENT_VERSION_BUILD + ' vom ' + INTENT_VERSION_DATE + ' (' + INTENT_VERSION_TYPE + ')';

export const INTENT_API_VERSION = INTENT_VERSION_STRING;
