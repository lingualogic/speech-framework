/** @packageDocumentation
 * Audio Version und Build Konstanten
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module audio
 * @author SB
 */


// core

import { SPEECH_VERSION_NUMBER, SPEECH_VERSION_BUILD, SPEECH_VERSION_TYPE, SPEECH_VERSION_DATE } from '@speech/core';


// Versions-Konstanten

export const AUDIO_VERSION_NUMBER = SPEECH_VERSION_NUMBER;
export const AUDIO_VERSION_BUILD = SPEECH_VERSION_BUILD;
export const AUDIO_VERSION_TYPE = SPEECH_VERSION_TYPE;
export const AUDIO_VERSION_DATE = SPEECH_VERSION_DATE;
export const AUDIO_VERSION_STRING = AUDIO_VERSION_NUMBER + '.' + AUDIO_VERSION_BUILD + ' vom ' + AUDIO_VERSION_DATE + ' (' + AUDIO_VERSION_TYPE + ')';

export const AUDIO_API_VERSION = AUDIO_VERSION_STRING;
