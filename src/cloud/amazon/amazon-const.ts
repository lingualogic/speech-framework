/**
 * Globale Konstanten fuer Amazon
 *
 * Letzte Aenderung: 01.04.2019
 * Status: rot
 *
 * @module cloud/amazon
 * @author SB
 */


// Default-Konstanten

export const AMAZON_TYPE_NAME = 'Amazon';
export const AMAZON_FACTORY_NAME = 'AmazonFactory';
export const AMAZON_PORT_NAME = 'AmazonPort';
export const AMAZON_MOCK_NAME = 'AmazonMock';
export const AMAZON_DEFAULT_NAME = AMAZON_PORT_NAME;


// Default URL des Amazon-Service

export const AMAZON_SERVER_URL = '';
export const AMAZON_DEFAULT_URL = AMAZON_SERVER_URL;


// Aktionen

export const AMAZON_NLU_ACTION = 'NLU';
export const AMAZON_ASR_ACTION = 'ASR';
export const AMAZON_ASRNLU_ACTION = 'ASRNLU';
export const AMAZON_TTS_ACTION = 'TTS';


// Konfigurationsdaten

export const AMAZON_CONFIG_PATH = 'assets/';
export const AMAZON_CONFIG_FILE = 'amazon.json';
export const AMAZON_CONFIG_LOAD = false;


// Sprachen


export const AMAZON_DE_LANGUAGE = 'de-DE';
export const AMAZON_EN_LANGUAGE = 'en-US';
export const AMAZON_DEFAULT_LANGUAGE = AMAZON_DE_LANGUAGE;


// ASR

export const AMAZON_ASR_LANGUAGE1 = 'deu-DEU';
export const AMAZON_ASR_LANGUAGE2 = 'eng-USA';
export const AMAZON_ASR_LANGUAGE = AMAZON_ASR_LANGUAGE1;

// TTS

export const AMAZON_TTS_LANGUAGE1 = 'de-DE';
export const AMAZON_TTS_LANGUAGE2 = 'en-US';
export const AMAZON_TTS_LANGUAGE = AMAZON_TTS_LANGUAGE1;


// Amazon Stimmen

export const AMAZON_TTS_VOICE1 = 'Vicki';
export const AMAZON_TTS_VOICE2 = 'Markus';
export const AMAZON_TTS_VOICE3 = 'Anna-ML';
export const AMAZON_TTS_VOICE4 = 'Petra-ML';
export const AMAZON_TTS_VOICE = AMAZON_TTS_VOICE1;
export const AMAZON_DEFAULT_VOICE = AMAZON_TTS_VOICE;

export const AMAZON_AUDIOTTS_ID = 789;


// Audio-Codec

export const AMAZON_PCM_CODEC = 'audio/L16;rate=16000';
export const AMAZON_DEFAULT_CODEC = AMAZON_PCM_CODEC;


// Audio-Konstanten

export const AMAZON_AUDIOBUFFER_SIZE = 2048;
export const AMAZON_AUDIOSAMPLE_RATE = 16000;
export const AMAZON_AUDIO_FORMAT = 'pcm';


// Wenn der Action-Timeout in NuancePort abgeschaltet werden soll

const AMAZON_NOACTION_TIMEOUT = 0;
