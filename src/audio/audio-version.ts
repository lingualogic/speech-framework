/**
 * Audio Version und Build Konstanten
 *
 * Letzte Aenderung: 30.01.2019
 * Status: rot
 *
 * @module audio
 * @author SB
 */


// global

import { SPEECH_VERSION_NUMBER, SPEECH_VERSION_BUILD, SPEECH_VERSION_TYPE, SPEECH_VERSION_DATE } from '../const/speech-version';


// Versions-Konstanten

export const AUDIO_VERSION_NUMBER = SPEECH_VERSION_NUMBER;
export const AUDIO_VERSION_BUILD = SPEECH_VERSION_BUILD;
export const AUDIO_VERSION_TYPE = SPEECH_VERSION_TYPE;
export const AUDIO_VERSION_DATE = SPEECH_VERSION_DATE;
export const AUDIO_VERSION_STRING = AUDIO_VERSION_NUMBER + '.' + AUDIO_VERSION_BUILD + ' vom ' + AUDIO_VERSION_DATE + ' (' + AUDIO_VERSION_TYPE + ')';

export const AUDIO_API_VERSION = AUDIO_VERSION_STRING;
