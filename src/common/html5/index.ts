/**
 * Globale Export-Datei fuer Html5
 *
 * Version: 1.0
 * Datum:   11.12.2018
 *
 * Definiert das gesamte Html5-API:
 *
 * @module common/html5
 * @author SB
 */


// Global API


// Basisklassen

export { FileHtml5Reader } from './file-html5-reader';
export { NetHtml5WebSocket } from './net-html5-websocket';

// Fabriken fuer HTML5-Klassen

export { AudioContextFactory } from './audiocontext-factory';
export { SpeechRecognitionFactory } from './speechrecognition-factory';
export { SpeechSynthesisFactory } from './speechsynthesis-factory';
export { WebSocketFactory } from './websocket-factory';
export { WebWorkerFactory } from './webworker-factory';
export { XMLHttpRequestFactory } from './xmlhttprequest-factory';
