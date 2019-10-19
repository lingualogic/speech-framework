/**
 * Globale Konstanten fuer Google
 *
 * Letzte Aenderung: 02.10.2019
 * Status: rot
 *
 * @module cloud/google
 * @author SB
 */


// Default-Konstanten

export const GOOGLE_TYPE_NAME = 'Google';
export const GOOGLE_FACTORY_NAME = 'GoogleFactory';
export const GOOGLE_PORT_NAME = 'GooglePort';
export const GOOGLE_MOCK_NAME = 'GoogleMock';
export const GOOGLE_DEFAULT_NAME = GOOGLE_PORT_NAME;


// Default URL des Amazon-Service

export const GOOGLE_SERVER_URL = 'ws://localhost:7050';
export const GOOGLE_DEFAULT_URL = GOOGLE_SERVER_URL;


// Aktionen

export const GOOGLE_NLU_ACTION = 'NLU';
export const GOOGLE_ASR_ACTION = 'ASR';
export const GOOGLE_ASRNLU_ACTION = 'ASRNLU';
export const GOOGLE_TTS_ACTION = 'TTS';


// Konfigurationsdaten

export const GOOGLE_CONFIG_PATH = 'assets/';
export const GOOGLE_CONFIG_FILE = 'google.json';
export const GOOGLE_CONFIG_LOAD = false;


// Sprachen


export const GOOGLE_DE_LANGUAGE = 'de-DE';
export const GOOGLE_EN_LANGUAGE = 'en-US';
export const GOOGLE_DEFAULT_LANGUAGE = GOOGLE_DE_LANGUAGE;

// NLU

export const GOOGLE_NLU2_FLAG = true;

// ASR

export const GOOGLE_ASR_LANGUAGE1 = 'de-DE';
export const GOOGLE_ASR_LANGUAGE2 = 'en-US';
export const GOOGLE_ASR_LANGUAGE = GOOGLE_ASR_LANGUAGE1;

// TTS

export const GOOGLE_TTS_LANGUAGE1 = 'de-DE';
export const GOOGLE_TTS_LANGUAGE2 = 'en-US';
export const GOOGLE_TTS_LANGUAGE = GOOGLE_TTS_LANGUAGE1;


// Amazon Stimmen

export const GOOGLE_TTS_VOICE1 = 'Yannick';
export const GOOGLE_TTS_VOICE2 = 'Markus';
export const GOOGLE_TTS_VOICE3 = 'Anna-ML';
export const GOOGLE_TTS_VOICE4 = 'Petra-ML';
export const GOOGLE_TTS_VOICE = GOOGLE_TTS_VOICE4;
export const GOOGLE_DEFAULT_VOICE = GOOGLE_TTS_VOICE;

export const GOOGLE_AUDIOTTS_ID = 789;


// Audio-Codec

export const GOOGLE_PCM_CODEC = 'audio/L16;rate=16000';
export const GOOGLE_DEFAULT_CODEC = GOOGLE_PCM_CODEC;


// Audio-Konstanten

export const GOOGLE_AUDIOBUFFER_SIZE = 2048;
export const GOOGLE_AUDIOSAMPLE_RATE = 16000;


// Wenn der Action-Timeout in NuancePort abgeschaltet werden soll

const GOOGLE_NOACTION_TIMEOUT = 0;
