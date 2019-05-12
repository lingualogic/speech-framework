/**
 * Globale Konstanten fuer SpeechApi
 *
 * @module speech
 * @author SB
 */


// Konstanten

export const SPEECH_API_NAME = 'SpeechApi';
export const SPEECH_APIMOCK_NAME = 'SpeechApiMock';


// Umschalten zwischen Fehlerausgabe ein/aus

/**
 * Legt fuer die Fehlerbehandlung fest, ob ein Fehler zusaetzlich
 * auf der Konsole ausgegeben werden soll. Fuer die Alpha-Version
 * ist dieser Wert auf true festgelegt, um jeden Fehler beim
 * Testen sehen zu koennen. Fuer eine Produktversion, wird der
 * Wert auf false gesetzt, um unnoetige Fehlerausgaben zu vermeiden.
 * Die Konstante wird in ErrorBase verwendet.
 */

export const SPEECH_ERROR_OUTPUT = true;


// Umschalten zwischen Sprachsynthese und Audiowiedergabe

export const SPEECH_AUDIO_FLAG = true;
export const SPEECH_AUDIO_PATH = '';


// Audio-Format Konstanten (deprecated)

// TODO: Austausch mit AUDIO_XXX_FORMAT

export const SPEECH_MP3_EXT = 'mp3';
export const SPEECH_WAV_EXT = 'wav';
export const SPEECH_DEFAULT_EXT = SPEECH_MP3_EXT;


// Datei Konstanten

export const SPEECH_PATH_NAME = 'speech/';
export const SPEECH_FILE_NAME = 'speech.def';


// SpeechWorker aus dem SpeechWorker-Projekt

export const SPEECH_WEBWORKER_PATH = '';
export const SPEECH_WEBWORKER_FILE = 'speechworker.js';


// Speech-Typ Konstanten

export const SPEECH_WEB_TYPE = 'web';
export const SPEECH_CORDOVA_TYPE = 'cordova';


// Net-Type Konstanten

export const SPEECH_WEBSOCKET_TYPE = 'WebSocket';
export const SPEECH_WEBWORKER_TYPE = 'WebWorker';


// Stimmen-Konstanten

export const VOICE_PETRA_NAME = 'PETRA';
export const VOICE_ANNA_NAME = 'ANNA';
export const VOICE_YANNICK_NAME = 'YANNICK';
export const VOICE_MARKUS_NAME = 'MARKUS';
export const VOICE_HANNA_NAME = 'Hanna';
export const VOICE_DEFAULT_NAME = VOICE_HANNA_NAME;


// Nachrichten-Konstanten

// TODO: muessen mit Client-Konstanten synchron gehalten werden-
//       Erst mit Typescript kann ich gemeinsame Dateien zwischen
//       Client und Server teilen.

export const SPEECH_FEATUREINFO_MESSAGE = 'featureInfo';
export const SPEECH_STARTDIALOG_MESSAGE = 'startDialog';
export const SPEECH_STOPDIALOG_MESSAGE = 'stopDialog';
export const SPEECH_LOADDIALOGFILE_MESSAGE = 'loadDialogFile'; // eslint-disable-line
export const SPEECH_WRITEDIALOGDATA_MESSAGE = 'writeData';
export const SPEECH_STARTLISTEN_MESSAGE = 'startListen';
export const SPEECH_STOPLISTEN_MESSAGE = 'stopListen';
export const SPEECH_SETTING_MESSAGE = 'setting';
export const SPEECH_SETSTATE_MESSAGE = 'setState';
export const SPEECH_SETSTATECONTEXT_MESSAGE = 'setStateContext';
export const SPEECH_SKIPNEXTSPEAK_MESSAGE = 'skipNextSpeak';


// Ereignis Konstanten

export const SPEECH_INIT_EVENT = 'init';
export const SPEECH_START_EVENT = 'start';
export const SPEECH_STOP_EVENT = 'stop';
export const SPEECH_DIALOGSTART_EVENT = 'dialogStart';
export const SPEECH_DIALOGSTOP_EVENT = 'dialogStop';
export const SPEECH_STATE_EVENT = 'state';
export const SPEECH_LISTENSTART_EVENT = 'listenStart';
export const SPEECH_LISTENSTOP_EVENT = 'listenStop';
export const SPEECH_LISTENRESULT_EVENT = 'listenResult';
export const SPEECH_LISTENINTENT_EVENT = 'listenIntent';
export const SPEECH_SPEAK_EVENT = 'speak';
export const SPEECH_SPEAKSTART_EVENT = 'speakStart';
export const SPEECH_SPEAKSTOP_EVENT = 'speakStop';
export const SPEECH_ACTION_EVENT = 'action';
export const SPEECH_EVENT_EVENT = 'event';
export const SPEECH_ERROR_EVENT = 'error';
export const SPEECH_FEATUREINFO_EVENT = 'featureInfo';

