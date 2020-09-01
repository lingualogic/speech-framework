/** @packageDocumentation
 * Globale Export-Datei fuer Html5
 *
 * Version: 1.1
 * Datum:   14.08.2020
 *
 * Definiert das gesamte Html5-API:
 *
 * @module common/html5
 * @author SB
 */


// Global API


// Basisklassen

export { FileHtml5ReaderInterface, XMLHTTPREQUEST_TEXT_RESPONSETYPE, XMLHTTPREQUEST_ARRAYBUFFER_RESPONSETYPE } from './file-html5-reader.interface';
export { FileHtml5Reader } from './file-html5-reader';
export { AudioHtml5ReaderInterface } from './audio-html5-reader.interface';
export { AudioHtml5Reader } from './audio-html5-reader';
export { NetHtml5Connect } from './net-html5-connect';
export { NetHtml5WebSocket, NET_CONNECTINTERVAL_TIMEOUT } from './net-html5-websocket';

// Fabriken fuer HTML5-Klassen

export { AudioContextFactory, AUDIOCONTEXT_FACTORY_NAME, AUDIOCONTEXT_TYPE_NAME } from './audiocontext-factory';
export { SpeechRecognitionFactory, SPEECHRECOGNITION_FACTORY_NAME, SPEECHRECOGNITION_TYPE_NAME, SPEECHRECOGNITION_GRAMMAR_NAME } from './speechrecognition-factory';
export { SpeechSynthesisFactory, SPEECHSYNTHESIS_FACTORY_NAME, SPEECHSYNTHESIS_TYPE_NAME, SPEECHSYNTHESIS_UTTERANCE_NAME } from './speechsynthesis-factory';
export { WebSocketFactory, WEBSOCKET_FACTORY_NAME, WEBSOCKET_TYPE_NAME } from './websocket-factory';
export { WebWorkerFactory, WEBWORKER_FACTORY_NAME, WEBWORKER_TYPE_NAME } from './webworker-factory';
export { UserMediaFactory, USERMEDIA_FACTORY_NAME, USERMEDIA_TYPE_NAME } from './usermedia-factory';
export { XMLHttpRequestFactory, XMLHTTPREQUEST_FACTORY_NAME, XMLHTTPREQUEST_TYPE_NAME } from './xmlhttprequest-factory';

// Manager fuer Html5-Klassen

export { AudioContextManager } from './audiocontext-manager';
