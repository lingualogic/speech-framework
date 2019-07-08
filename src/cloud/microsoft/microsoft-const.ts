/**
 * Globale Konstanten fuer Microsoft
 *
 * Letzte Aenderung: 17.06.2019
 * Status: rot
 *
 * @module cloud/microsoft
 * @author SB
 */


// Default-Konstanten

export const MICROSOFT_TYPE_NAME = 'Microsoft';
export const MICROSOFT_FACTORY_NAME = 'MicrosoftFactory';
export const MICROSOFT_PORT_NAME = 'MicrosoftPort';
export const MICROSOFT_MOCK_NAME = 'MicrosoftMock';
export const MICROSOFT_DEFAULT_NAME = MICROSOFT_PORT_NAME;


// Default URL des Microsoft-Service

export const MICROSOFT_SERVER_URL = '';
export const MICROSOFT_DEFAULT_URL = MICROSOFT_SERVER_URL;


// Aktionen

export const MICROSOFT_NLU_ACTION = 'NLU';
export const MICROSOFT_ASR_ACTION = 'ASR';
export const MICROSOFT_ASRNLU_ACTION = 'ASRNLU';
export const MICROSOFT_TTS_ACTION = 'TTS';


// Konfigurationsdaten

export const MICROSOFT_CONFIG_PATH = 'assets/';
export const MICROSOFT_CONFIG_FILE = 'microsoft.json';
export const MICROSOFT_CONFIG_LOAD = false;


// Sprachen


export const MICROSOFT_DE_LANGUAGE = 'de-DE';
export const MICROSOFT_EN_LANGUAGE = 'en-US';
export const MICROSOFT_DEFAULT_LANGUAGE = MICROSOFT_DE_LANGUAGE;


// ASR

export const MICROSOFT_ASR_LANGUAGE1 = 'deu-DEU';
export const MICROSOFT_ASR_LANGUAGE2 = 'eng-USA';
export const MICROSOFT_ASR_LANGUAGE = MICROSOFT_ASR_LANGUAGE1;

// TTS

export const MICROSOFT_TTS_LANGUAGE1 = 'de-DE';
export const MICROSOFT_TTS_LANGUAGE2 = 'en-US';
export const MICROSOFT_TTS_LANGUAGE = MICROSOFT_TTS_LANGUAGE1;


// Microsoft Stimmen

export const MICROSOFT_TTS_VOICE1 = 'de-DE-Hedda';
export const MICROSOFT_TTS_VOICE2 = 'de-DE-HeddaRUS';
export const MICROSOFT_TTS_VOICE3 = 'de-DE-Stefan-Apollo';
export const MICROSOFT_TTS_VOICE = MICROSOFT_TTS_VOICE1;
export const MICROSOFT_DEFAULT_VOICE = MICROSOFT_TTS_VOICE;

export const MICROSOFT_AUDIOTTS_ID = 789;


// Audio-Codec

export const MICROSOFT_PCM_CODEC = 'audio/L16;rate=16000';
export const MICROSOFT_DEFAULT_CODEC = MICROSOFT_PCM_CODEC;


// Audio-Konstanten

export const MICROSOFT_AUDIOBUFFER_SIZE = 2048;
export const MICROSOFT_AUDIOSAMPLE_RATE = 16000;
export const MICROSOFT_AUDIO_FORMAT = 'raw-16khz-16bit-mono-pcm';


// Wenn der Action-Timeout in NuancePort abgeschaltet werden soll

const MICROSOFT_NOACTION_TIMEOUT = 0;
