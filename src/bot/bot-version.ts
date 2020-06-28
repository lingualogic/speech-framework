/** @packageDocumentation
 * Bot Version und Build Konstanten
 *
 * API-Version: 1.0
 * Datum:       01.06.2020
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gruen
 *
 * @module bot
 * @author SB
 */


// core

import { SPEECH_VERSION_NUMBER, SPEECH_VERSION_BUILD, SPEECH_VERSION_TYPE, SPEECH_VERSION_DATE } from '@speech/core';


// Versions-Konstanten

export const BOT_VERSION_NUMBER = SPEECH_VERSION_NUMBER;
export const BOT_VERSION_BUILD = SPEECH_VERSION_BUILD;
export const BOT_VERSION_TYPE = SPEECH_VERSION_TYPE;
export const BOT_VERSION_DATE = SPEECH_VERSION_DATE;
export const BOT_VERSION_STRING = BOT_VERSION_NUMBER + '.' + BOT_VERSION_BUILD + ' vom ' + BOT_VERSION_DATE + ' (' + BOT_VERSION_TYPE + ')';

export const BOT_API_VERSION = BOT_VERSION_STRING;
