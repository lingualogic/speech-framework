/**
 * Action Version und Build Konstanten
 *
 * Letzte Aenderung: 10.09.2018
 * Status: gelb
 *
 * @module action
 * @author SB
 */


// global

import { SPEECH_VERSION_NUMBER, SPEECH_VERSION_BUILD, SPEECH_VERSION_TYPE, SPEECH_VERSION_DATE } from '../const/speech-version';


// Versions-Konstanten

export const ACTION_VERSION_NUMBER = SPEECH_VERSION_NUMBER;
export const ACTION_VERSION_BUILD = SPEECH_VERSION_BUILD;
export const ACTION_VERSION_TYPE = SPEECH_VERSION_TYPE;
export const ACTION_VERSION_DATE = SPEECH_VERSION_DATE;
export const ACTION_VERSION_STRING = ACTION_VERSION_NUMBER + '.' + ACTION_VERSION_BUILD + ' vom ' + ACTION_VERSION_DATE + ' (' + ACTION_VERSION_TYPE + ')';

export const ACTION_API_VERSION = ACTION_VERSION_STRING;
