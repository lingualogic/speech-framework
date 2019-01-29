/**
 * Globale Konstanten fuer Nuance
 *
 * Letzte Aenderung: 18.01.2019
 * Status: rot
 *
 * @module cloud/nuance
 * @author SB
 */


// Default-Konstanten

export const NUANCE_TYPE_NAME = 'Nuance';
export const NUANCE_FACTORY_NAME = 'NuanceFactory';
export const NUANCE_PORT_NAME = 'NuancePort';
export const NUANCE_MOCK_NAME = 'NuanceMock';
export const NUANCE_DEFAULT_NAME = NUANCE_PORT_NAME;


// Default URL des Nuance-Mix WebSocket-Service

export const NUANCE_SERVER_URL = 'wss://ws.dev.nuance.com/v2';
export const NUANCE_DEFAULT_URL = NUANCE_SERVER_URL;


// Aktionen

export const NUANCE_NLU_ACTION = 'NLU';
export const NUANCE_ASR_ACTION = 'ASR';
export const NUANCE_ASRNLU_ACTION = 'ASRNLU';
export const NUANCE_TTS_ACTION = 'TTS';


// Nuance Konfigurationsdaten

export const NUANCE_CONFIG_PATH = 'assets/';
export const NUANCE_CONFIG_FILE = 'nuance.json';
export const NUANCE_CONFIG_LOAD = false;


// Nuance Sprachen


export const NUANCE_DE_LANGUAGE = 'deu-DEU';
export const NUANCE_EN_LANGUAGE = 'eng-USA';
export const NUANCE_DEFAULT_LANGUAGE = NUANCE_DE_LANGUAGE;


// ASR

// Siehe: https://developer.nuance.com/public/index.php?task=supportedLanguages
export const NUANCE_ASR_LANGUAGE1 = 'deu-DEU';
export const NUANCE_ASR_LANGUAGE2 = 'eng-USA';
export const NUANCE_ASR_LANGUAGE = NUANCE_ASR_LANGUAGE1;

// TTS

// Siehe: https://developer.nuance.com/public/index.php?task=supportedLanguages
export const NUANCE_TTS_LANGUAGE1 = 'deu-DEU';
export const NUANCE_TTS_LANGUAGE2 = 'eng-USA';
export const NUANCE_TTS_LANGUAGE = NUANCE_TTS_LANGUAGE1;



// Nuance Stimmen

export const NUANCE_TTS_VOICE1 = 'Yannick';
export const NUANCE_TTS_VOICE2 = 'Markus';
export const NUANCE_TTS_VOICE3 = 'Anna-ML';
export const NUANCE_TTS_VOICE4 = 'Petra-ML';
export const NUANCE_TTS_VOICE = NUANCE_TTS_VOICE4;
export const NUANCE_DEFAULT_VOICE = NUANCE_TTS_VOICE;

export const NUANCE_AUDIOTTS_ID = 789;


// Nuance Codec

export const NUANCE_PCM_CODEC = 'audio/L16;rate=16000';
export const NUANCE_DEFAULT_CODEC = NUANCE_PCM_CODEC;


// Audio-Konstanten

export const NUANCE_AUDIOBUFFER_SIZE = 2048;
export const NUANCE_AUDIOSAMPLE_RATE = 16000;
