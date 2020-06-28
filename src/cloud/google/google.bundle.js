import '../../core/builder/builder-manager.ts';
import '../../core/builder/builder.ts';
import '../../core/component/component.ts';
import '../../core/const/speech-version.ts';
import { ErrorBase } from '../../core/error/error-base.ts';
import '../../core/event/event-function-list.ts';
import { FactoryManager } from '../../core/factory/factory-manager.ts';
import '../../core/factory/factory.ts';
import '../../core/plugin/plugin-manager.ts';
import '../../core/plugin/plugin-factory.ts';
import '../../core/plugin/plugin-group.ts';
import '../../core/plugin/plugin.ts';
import { PortManager } from '../../core/port/port-manager.ts';
import { PortFactory } from '../../core/port/port-factory.ts';
import { PortTransaction } from '../../core/port/port-transaction.ts';
import { Port } from '../../core/port/port.ts';
import '../../common/audio/audio-codec.ts';
import { AudioPlayer } from '../../common/audio/audio-player.ts';
import { AudioRecorder } from '../../common/audio/audio-recorder.ts';
import '../../common/audio/audio-resampler.ts';
import { FileHtml5Reader } from '../../common/html5/file-html5-reader.ts';
import { AudioHtml5Reader } from '../../common/html5/audio-html5-reader.ts';
import { NetHtml5Connect } from '../../common/html5/net-html5-connect.ts';
import { NetHtml5WebSocket } from '../../common/html5/net-html5-websocket.ts';
import { AUDIOCONTEXT_FACTORY_NAME, AudioContextFactory } from '../../common/html5/audiocontext-factory.ts';
import '../../common/html5/speechrecognition-factory.ts';
import '../../common/html5/speechsynthesis-factory.ts';
import '../../common/html5/websocket-factory.ts';
import '../../common/html5/webworker-factory.ts';
import { USERMEDIA_FACTORY_NAME, UserMediaFactory } from '../../common/html5/usermedia-factory.ts';
import '../../common/html5/xmlhttprequest-factory.ts';

/** @packageDocumentation
 * Speech-Google Version und Build Konstanten
 *
 * @module cloud/google
 * @author SB
 */
var GOOGLE_VERSION_NUMBER = '0.1.6';
var GOOGLE_VERSION_BUILD = '0007';
var GOOGLE_VERSION_TYPE = 'ALPHA';
var GOOGLE_VERSION_DATE = '20.06.2020';
// tslint:disable-next-line
var GOOGLE_VERSION_STRING = GOOGLE_VERSION_NUMBER + '.' + GOOGLE_VERSION_BUILD + ' vom ' + GOOGLE_VERSION_DATE + ' (' + GOOGLE_VERSION_TYPE + ')';
var GOOGLE_SERVER_VERSION = GOOGLE_VERSION_STRING;
var GOOGLE_WORKER_VERSION = GOOGLE_VERSION_STRING;
var GOOGLE_API_VERSION = GOOGLE_VERSION_STRING;

/** @packageDocumentation
 * Globale Konstanten fuer Google
 *
 * Letzte Aenderung: 02.10.2019
 * Status: rot
 *
 * @module cloud/google
 * @author SB
 */
// Default-Konstanten
var GOOGLE_TYPE_NAME = 'Google';
var GOOGLE_FACTORY_NAME = 'GoogleFactory';
var GOOGLE_PORT_NAME = 'GooglePort';
var GOOGLE_MOCK_NAME = 'GoogleMock';
var GOOGLE_DEFAULT_NAME = GOOGLE_PORT_NAME;
// Default URL des Amazon-Service
var GOOGLE_SERVER_URL = 'ws://localhost:7050';
var GOOGLE_DEFAULT_URL = GOOGLE_SERVER_URL;
// Aktionen
var GOOGLE_NLU_ACTION = 'NLU';
var GOOGLE_ASR_ACTION = 'ASR';
var GOOGLE_ASRNLU_ACTION = 'ASRNLU';
var GOOGLE_TTS_ACTION = 'TTS';
// Konfigurationsdaten
var GOOGLE_CONFIG_PATH = 'assets/';
var GOOGLE_CONFIG_FILE = 'google.json';
var GOOGLE_CONFIG_LOAD = false;
// Sprachen
var GOOGLE_DE_LANGUAGE = 'de-DE';
var GOOGLE_EN_LANGUAGE = 'en-US';
var GOOGLE_DEFAULT_LANGUAGE = GOOGLE_DE_LANGUAGE;
// NLU
var GOOGLE_NLU2_FLAG = true;
// ASR
var GOOGLE_ASR_LANGUAGE1 = 'de-DE';
var GOOGLE_ASR_LANGUAGE2 = 'en-US';
var GOOGLE_ASR_LANGUAGE = GOOGLE_ASR_LANGUAGE1;
// TTS
var GOOGLE_TTS_LANGUAGE1 = 'de-DE';
var GOOGLE_TTS_LANGUAGE2 = 'en-US';
var GOOGLE_TTS_LANGUAGE = GOOGLE_TTS_LANGUAGE1;
// Amazon Stimmen
var GOOGLE_TTS_VOICE1 = 'Yannick';
var GOOGLE_TTS_VOICE2 = 'Markus';
var GOOGLE_TTS_VOICE3 = 'Anna-ML';
var GOOGLE_TTS_VOICE4 = 'Petra-ML';
var GOOGLE_TTS_VOICE = GOOGLE_TTS_VOICE4;
var GOOGLE_DEFAULT_VOICE = GOOGLE_TTS_VOICE;
var GOOGLE_AUDIOTTS_ID = 789;
// Audio-Codec
var GOOGLE_PCM_CODEC = 'audio/L16;rate=16000';
var GOOGLE_DEFAULT_CODEC = GOOGLE_PCM_CODEC;
// Audio-Konstanten
var GOOGLE_AUDIOBUFFER_SIZE = 2048;
var GOOGLE_AUDIOSAMPLE_RATE = 16000;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/** @packageDocumentation
 * GoogleMock zum Testen des Google Cloud-Service mit dem Framework
 *
 * Letzte Aenderung: 20.06.2020
 * Status: rot
 *
 * @module cloud/google
 * @author SB
 */
// Konstanten
// Asynchrones senden von Events nach 100 millisekunden
var GOOGLEMOCK_CALLBACK_TIMEOUT = 100;
/**
 * Definiert die GoogleMock-Klasse
 */
var GoogleMock = /** @class */ (function (_super) {
    __extends(GoogleMock, _super);
    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */
    function GoogleMock(aPortName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var _this = _super.call(this, aPortName || GOOGLE_MOCK_NAME, aRegisterFlag) || this;
        _this.webSocketFlag = true;
        _this.audioContextFlag = true;
        _this.getUserMediaFlag = true;
        _this.googleNLUFlag = true;
        _this.googleASRFlag = true;
        _this.googleTTSFlag = true;
        // weitere Attribute
        _this.disconnectFlag = true;
        _this.defaultOptions = null;
        _this.codec = '';
        _this.intentName = 'TestIntent';
        _this.intentConfidence = 1.0;
        _this.intentSpeech = 'TestSpeech';
        _this.mDynamicCredentialsFlag = false;
        _this.mTransaction = null;
        _this.mRunningFlag = false;
        // Credentials
        _this.googleAppId = '';
        _this.googleAppKey = '';
        _this.googleNluTag = '';
        _this.googleServerUrl = '';
        _this.dialogflowTokenServerUrl = '';
        _this.dialogflowProjectId = '';
        _this.dialogflowSessionId = '';
        _this.dialogflowEnvironmentName = '';
        return _this;
    }
    // Port-Funktionen
    /**
     * pruefen auf Mock-Port zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Port ein Mock zum Testen ist
     */
    GoogleMock.prototype.isMock = function () {
        return true;
    };
    /**
     * Rueckgabe eines logischen Port-Typs
     *
     * @return {string} logischer Typ des Ports fuer unterschiedliche Anwendungsschnittstellen
     */
    GoogleMock.prototype.getType = function () {
        return GOOGLE_TYPE_NAME;
    };
    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */
    GoogleMock.prototype.getClass = function () {
        return 'GoogleMock';
    };
    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */
    GoogleMock.prototype._checkCredentials = function (aOption) {
        if (!aOption) {
            return false;
        }
        if (typeof aOption.googleAppKey === 'string') {
            this.googleAppKey = aOption.googleAppKey;
        }
        // App-Parameter pruefen
        // TODO: jetzt erst mal nur ACCESS-TOKEN (AppKey) von Dialogflow V1 bis Oktober 2019
        if (typeof aOption.googleAppKey !== 'string') {
            return false;
        }
        if (!aOption.googleAppKey) {
            return false;
        }
        // App-Parameter sind vorhanden
        return true;
    };
    /**
     * initialisert den Port
     *
     * erlaubte optionale Parameter:
     *
     *      activeFlag      - legt fest, ob der Port zum Start aktiviert ist oder nicht
     *      errorOutputFlag - legt fest, ob die Fehlerausgabe auf der Konsole erfolgt
     *
     *
     * @param {any} aOption - optionale Parameter fuer die Konfiguration des Plugins
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    GoogleMock.prototype.init = function (aOption) {
        // console.log('NuanceMock: init start', aOption);
        if (this.mInitFlag) {
            this._error('init', 'Init bereits aufgerufen');
            return 0;
        }
        // pruefen auf Error-OutputFlag (Port wird erst am Ende aufgerufen, daher wird das ErrorOutputFlag nicht vorher gesetzt)
        if (aOption && typeof aOption.errorOutputFlag === 'boolean' && aOption.errorOutputFlag) {
            this.setErrorOutputOn();
        }
        else {
            this.setErrorOutputOff();
        }
        // pruefen auf dynamische Credentials
        if (aOption && typeof aOption.googleDynamicCredentialsFlag === 'boolean' && aOption.googleDynamicCredentialsFlag) {
            // dynamische Credentials koennen gesetzt werden
            this.mDynamicCredentialsFlag = true;
            this._checkCredentials(aOption);
        }
        else {
            // pruefen auf Nuance App-Credientials Uebergabe
            if (!this._checkCredentials(aOption)) {
                if (this.isErrorOutput() || (aOption && aOption.errorOutputFlag)) {
                    this._error('init', 'keine AppId und/oder AppKey als Parameter uebergeben');
                }
                return -1;
            }
        }
        // WebSocket
        if (!this.webSocketFlag) {
            // WEnn die WebSocket nicht vorhanden ist, geht gar nichts !
            this._error('init', 'keine WebSocket vorhanden');
            this._onInit(-1);
            return -1;
        }
        // TODO: soll spaeter in die Audio-Komponente
        // AudioContext
        if (!this.audioContextFlag) {
            // wenn der Audiokontext nicht vorhanden ist, gehen TTS und ASR nicht
            this._error('init', 'kein Audiokontext vorhanden, TTS und ASR werden abgeschaltet');
            this._onInit(-1);
        }
        this.googleNLUFlag = true;
        if (this.audioContextFlag) {
            this.googleASRFlag = true;
            if (this.getUserMediaFlag) {
                this.googleTTSFlag = true;
            }
        }
        if (this.isErrorOutput()) {
            if (this.googleNLUFlag) {
                console.log('GoogleMock: NLU ist vorhanden');
            }
            else {
                console.log('GoogleMock: NLU ist nicht vorhanden');
            }
            if (this.googleTTSFlag) {
                console.log('GoogleMock: TTS ist vorhanden');
            }
            else {
                console.log('GoogleMock: TTS ist nicht vorhanden');
            }
            if (this.googleASRFlag) {
                console.log('GoogleMock: ASR ist vorhanden');
            }
            else {
                console.log('GoogleMock: ASR ist nicht vorhanden');
            }
        }
        this._onInit(0);
        // console.log('NuanceMock.init: ende');
        return _super.prototype.init.call(this, aOption);
    };
    /**
     * gibt den Port frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    GoogleMock.prototype.done = function (aFreeFlag) {
        _super.prototype.done.call(this);
        this.webSocketFlag = true;
        this.audioContextFlag = true;
        this.getUserMediaFlag = true;
        this.googleNLUFlag = false;
        this.googleASRFlag = false;
        this.googleTTSFlag = false;
        // weitere Attribute
        this.disconnectFlag = true;
        this.defaultOptions = null;
        this.codec = '';
        this.mTransaction = null;
        this.mRunningFlag = false;
        return 0;
    };
    /**
     * setzt den Port wieder auf Defaultwerte und uebergebene optionale Parameter.
     * Die Fehlerausgabe wird nicht zurueckgesetzt.
     *
     * @param {any} aOption - optionale Parameter
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    GoogleMock.prototype.reset = function (aOption) {
        this.mTransaction = null;
        this.mRunningFlag = false;
        return _super.prototype.reset.call(this, aOption);
    };
    // Event-Funktionen
    /**
     * Ereignisfunktion fuer Stop aufrufen
     *
     * @private
     * @param {string} aDest - Ziel der Operation
     * @param {string} aType - Typ der Operation
     *
     * @return {number} errorCode(0,-1)
     */
    GoogleMock.prototype._onStop = function (aDest, aType) {
        // console.log('NuancePort._onStop: Transaktion wird beendet', aDest, aType);
        // hier muss die Transaktion geloescht werden, da sie beendet ist
        this.mTransaction = null;
        this.mRunningFlag = false;
        return _super.prototype._onStop.call(this, aDest, aType);
    };
    // Port-Funktionen
    /**
     * Dynamische Konfiguration des Ports
     *
     * @param {GoogleConfigDataInterface} aConfigData - Konfigurationsdaten { nuanceAppKey: '', nuanceAppId: '', nuanceNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GoogleMock.prototype.setConfig = function (aConfigData) {
        if (this.mDynamicCredentialsFlag) {
            // Uebertragen der neuen Credentials
            try {
                // this.googleAppId = aConfigData.googleAppId;
                this.googleAppKey = aConfigData.googleAppKey;
                this.googleServerUrl = aConfigData.googleServerUrl;
                this.dialogflowTokenServerUrl = aConfigData.dialogflowTokenServerUrl;
                this.dialogflowProjectId = aConfigData.dialogflowProjectId;
                this.dialogflowSessionId = aConfigData.dialogflowSessionId;
                this.dialogflowEnvironmentName = aConfigData.dialogflowEnvironmentName;
                /****
                if ( typeof aConfigData.googleNluTag === 'string' ) {
                    this.googleNluTag = aConfigData.googleNluTag;
                }
                ****/
                return 0;
            }
            catch (aException) {
                this._exception('setConfig', aException);
                return -1;
            }
        }
        else {
            this._error('setConfig', 'Keine dynamischen Credentials erlaubt');
            return -1;
        }
    };
    /**
     * Rueckgabe der aktuellen Port-Konfiguration
     *
     * @return {GoogleConfigDataInterface} aktuelle Portkonfigurationsdaten
     */
    GoogleMock.prototype.getConfig = function () {
        var configData = {
            // googleAppId: this.googleAppId,
            googleAppKey: this.googleAppKey,
            googleServerUrl: this.googleServerUrl,
            dialogflowTokenServerUrl: this.dialogflowTokenServerUrl,
            dialogflowProjectId: this.dialogflowProjectId,
            dialogflowSessionId: this.dialogflowSessionId,
            dialogflowEnvironmentName: this.dialogflowEnvironmentName
            // googleNluTag: this.googleNluTag
        };
        return configData;
    };
    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */
    GoogleMock.prototype.isOpen = function () {
        return !this.disconnectFlag;
    };
    /**
     * Port oeffnen
     *
     * @param {*} aOption - optionale Parameter
     * @return {number} Fehlercode 0 oder -1
     */
    GoogleMock.prototype.open = function (aOption) {
        // console.log('NuanceMock._connect:', this.disconnectFlag);
        if (!this.disconnectFlag) {
            // Kein Fehler, Verbindung ist bereits vorhanden
            return 0;
        }
        this.disconnectFlag = false;
        // console.log('WebSocket Verbindung aufgebaut');
        this._onOpen();
        return 0;
    };
    /**
     * Port schliessen
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GoogleMock.prototype.close = function () {
        this.disconnectFlag = true;
        return 0;
    };
    /**
     * Pruefen auf beschaeftigten Port.
     *
     * @return {boolean} True, Port ist beschaeftigt, False sonst
     */
    GoogleMock.prototype.isRunning = function () {
        return this.mRunningFlag;
    };
    GoogleMock.prototype._isCredentials = function () {
        if (this.googleAppKey) {
            return true;
        }
        return false;
    };
    /**
     * Pruefen, welche Nuance-Aktionen ausfuehrbar sind.
     *
     * @param {string} aAction - Name der zu pruefenden Aktion
     *
     * @return {boolean} True, wenn Aktion ausfuehrbar ist, False sonst
     */
    GoogleMock.prototype.isAction = function (aAction) {
        var result = false;
        switch (aAction) {
            case GOOGLE_NLU_ACTION:
                result = this.googleNLUFlag;
                break;
            case GOOGLE_ASRNLU_ACTION:
            case GOOGLE_ASR_ACTION:
                result = this.googleASRFlag;
                break;
            case GOOGLE_TTS_ACTION:
                result = this.googleTTSFlag;
                break;
        }
        return result;
    };
    /**
     * Portaktion starten
     *
     * @param {string} aAction - optional auszufuehrende Aktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GoogleMock.prototype.start = function (aPluginName, aAction, aOption) {
        // pruefen, ob eine Aktion bereits laeuft
        if (this.isRunning()) {
            this._error('start', 'Aktion laeuft bereits');
            return -1;
        }
        // pruefen, ob der Port geoeffnet ist
        if (!this.isOpen()) {
            this._error('start', 'Port ist nicht geoeffnet');
            return -1;
        }
        // pruefen auf Credentials
        if (!this._isCredentials()) {
            this._error('start', 'Port hat keine Credentials');
            return -1;
        }
        // pruefen auf laufende Transaktion
        if (this.mTransaction) {
            this._error('start', 'andere Transaktion laeuft noch');
            return -1;
        }
        var option = aOption || {};
        // Aktion ausfuehren
        this.mRunningFlag = true;
        var result = 0;
        switch (aAction) {
            case GOOGLE_NLU_ACTION:
                this.mTransaction = new PortTransaction(aPluginName, GOOGLE_NLU_ACTION);
                result = this._startNLU(this.mTransaction, option.text, option.language || GOOGLE_DEFAULT_LANGUAGE);
                break;
            case GOOGLE_ASRNLU_ACTION:
                this.mTransaction = new PortTransaction(aPluginName, GOOGLE_ASRNLU_ACTION);
                result = this._startASR(this.mTransaction, option.language || GOOGLE_DEFAULT_LANGUAGE, option.audioURL || '', true, option.useProgressive || false);
                break;
            case GOOGLE_ASR_ACTION:
                this.mTransaction = new PortTransaction(aPluginName, GOOGLE_ASR_ACTION);
                result = this._startASR(this.mTransaction, option.language || GOOGLE_DEFAULT_LANGUAGE, option.audioURL || '', false, option.useProgressive || false);
                break;
            case GOOGLE_TTS_ACTION:
                this.mTransaction = new PortTransaction(aPluginName, GOOGLE_TTS_ACTION);
                result = this._startTTS(this.mTransaction, option.text, option.language || GOOGLE_DEFAULT_LANGUAGE, option.voice || GOOGLE_DEFAULT_VOICE);
                break;
            default:
                this._error('start', 'Keine gueltige Aktion uebergeben ' + aAction);
                result = -1;
                break;
        }
        return result;
    };
    /**
     * Portaktion beenden
     *
     * @param {string} aAction - optional zu beendende Aktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GoogleMock.prototype.stop = function (aPluginName, aAction, aOption) {
        // console.log('NuancePort.stop:', aPluginName, aAction, aOption);
        // pruefen, ob eine Aktion bereits laeuft
        if (!this.isRunning()) {
            // console.log('NuancePort.stop: kein isRunning');
            return 0;
        }
        // pruefen, ob der Port geoeffnet ist
        if (!this.isOpen()) {
            this._error('stop', 'Port ist nicht geoeffnet');
            return -1;
        }
        // pruefen auf Credentials
        if (!this._isCredentials()) {
            this._error('stop', 'Port hat keine Credentials');
            return -1;
        }
        // pruefen auf laufende Transaktion
        if (!this.mTransaction) {
            this._error('stop', 'keine Transaktion vorhanden');
            return -1;
        }
        // pruefen auf uebereinstimmende Transaktion
        if (aPluginName !== this.mTransaction.plugin) {
            this._error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + aPluginName + ' != ' + this.mTransaction.plugin);
            return -1;
        }
        if (aAction) {
            if (aAction !== this.mTransaction.type) {
                this._error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + aAction + ' != ' + this.mTransaction.type);
                return -1;
            }
        }
        else {
            aAction = this.mTransaction.type;
        }
        var result = 0;
        // console.log('NuancePort.stop: Action = ', aAction);
        switch (aAction) {
            case GOOGLE_NLU_ACTION:
                result = this._stopNLU(this.mTransaction);
                break;
            case GOOGLE_ASRNLU_ACTION:
            case GOOGLE_ASR_ACTION:
                result = this._stopASR(this.mTransaction);
                break;
            case GOOGLE_TTS_ACTION:
                result = this._stopTTS(this.mTransaction);
                break;
            default:
                this._error('stop', 'Keine gueltige Aktion uebergeben ' + aAction);
                result = -1;
                break;
        }
        this.mTransaction = null;
        this.mRunningFlag = false;
        return result;
    };
    // Nuance-Funktionen
    // Text-Funktionen
    /**
     * Intent zu einem Text holen
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - Text der interpretiert werden soll
     * @param {string} aLanguage - Sprache des Textes der interpretiert werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GoogleMock.prototype._startNLU = function (aTransaction, aText, aLanguage) {
        if (!aText) {
            this._error('_startNLU', 'keinen Text uebergeben');
            return -1;
        }
        if (!this.googleNLUFlag) {
            this._error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden');
            return -1;
        }
        try {
            // Nachrichten senden
            this._onStart(aTransaction.plugin, aTransaction.type);
            var event_1 = {
                metadata: {
                    intentName: this.intentName
                },
                fulfillment: {
                    speech: this.intentSpeech
                },
                resolvedQuery: aText,
                score: this.intentConfidence
            };
            aTransaction.result = event_1;
            console.log('GoogleMock._startNLU: _onResult wird aufgerufen');
            this._onResult(aTransaction.result, aTransaction.plugin, aTransaction.type);
            this._onStop(aTransaction.plugin, aTransaction.type);
            return 0;
        }
        catch (aException) {
            this._exception('_startNLU', aException);
            return -1;
        }
    };
    /**
     * stoppt die Analyse
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GoogleMock.prototype._stopNLU = function (aTransaction) {
        this._onStop(aTransaction.plugin, aTransaction.type);
        // kein Stop der NLU notwendig
        return 0;
    };
    // ASR-Funktionen
    /**
     * startet die Recognition
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @returns {number} Fehlercode 0 oder -1
     */
    GoogleMock.prototype._startASR = function (aTransaction, aLanguage, aAudioUrl, aUseNLUFlag, aProgressiveFlag) {
        // console.log('NuancePort._startASR');
        if (!this.googleASRFlag) {
            this._error('_startASR', 'keine Nuance ASR-Anbindung vorhanden');
            return -1;
        }
        try {
            // Nachrichten senden
            this._onStart(aTransaction.plugin, aTransaction.type);
            aTransaction.result = "Testtext";
            this._onResult(aTransaction.result, aTransaction.plugin, aTransaction.type);
            this._onStop(aTransaction.plugin, aTransaction.type);
            return 0;
        }
        catch (aException) {
            this._exception('_startASR', aException);
            return -1;
        }
    };
    /**
     * stoppt die Recognition
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GoogleMock.prototype._stopASR = function (aTransaction) {
        if (!this.googleASRFlag) {
            this._error('_stopASR', 'keine Nuance ASR-Anbindung vorhanden');
            return -1;
        }
        try {
            this._onStop(aTransaction.plugin, aTransaction.type);
            return 0;
        }
        catch (aException) {
            this._exception('_stopASR', aException);
            return -1;
        }
    };
    // TTS-Funktionen
    /**
     * startet die TTS
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - auszusprechender Text
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GoogleMock.prototype._startTTS = function (aTransaction, aText, aLanguage, aVoice) {
        var _this = this;
        if (!aText) {
            this._error('_startTTS', 'keinen Text uebergeben');
            return -1;
        }
        if (!this.googleTTSFlag) {
            this._error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden');
            return -1;
        }
        try {
            // Nachrichten senden
            this._onStart(aTransaction.plugin, aTransaction.type);
            // asynchron TTS-Stop Event senden
            setTimeout(function () { return _this._onStop(aTransaction.plugin, aTransaction.type); }, GOOGLEMOCK_CALLBACK_TIMEOUT);
            return 0;
        }
        catch (aException) {
            this._exception('_startTTS', aException);
            return -1;
        }
    };
    /**
     * stoppt die TTS
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GoogleMock.prototype._stopTTS = function (aTransaction) {
        if (!this.googleTTSFlag) {
            this._error('_stopTTS', 'keine Nuance TTS-Anbindung vorhanden');
            return -1;
        }
        try {
            this._onStop(aTransaction.plugin, aTransaction.type);
            return 0;
        }
        catch (aException) {
            this._exception('_stopTTS', aException);
            return -1;
        }
    };
    return GoogleMock;
}(Port));

/** @packageDocumentation
 * Google Konstanten Verwaltung
 *
 * Letzte Aenderung: 20.06.2020
 * Status: rot
 *
 * @module cloud/google
 * @author SB
 */
var GoogleConfig = /** @class */ (function (_super) {
    __extends(GoogleConfig, _super);
    /**
     * Creates an instance of AmazonConfig.
     */
    function GoogleConfig(aFileReader) {
        var _this = _super.call(this, 'GoogleConfig') || this;
        _this.mInitFlag = false;
        // Configdatei-Daten
        _this.mConfigPath = GOOGLE_CONFIG_PATH;
        _this.mConfigFile = GOOGLE_CONFIG_FILE;
        _this.mConfigLoadFlag = GOOGLE_CONFIG_LOAD;
        // Nuance-Konfigurationsdaten
        _this.mConfigServerUrl = GOOGLE_DEFAULT_URL;
        _this.mConfigDialogflowTokenServerUrl = '';
        _this.mConfigDialogflowProjectId = '';
        _this.mConfigDialogflowSessionId = '';
        _this.mConfigDialogflowEnvironmentName = '';
        _this.mConfigAppId = '';
        _this.mConfigAppKey = '';
        _this.mConfigUserId = '';
        _this.mConfigNluTag = '';
        // FileReader
        _this.mFileReader = null;
        // Initialisierung fertig
        _this.mOnInitFunc = null;
        _this.mOnErrorFunc = null;
        _this.mFileReader = aFileReader;
        // verbinden der Errorfunktion mit dem ErrorEvent
        _this._setErrorOutputFunc(function (aErrorText) { return _this._onError(new Error(aErrorText)); });
        return _this;
    }
    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */
    GoogleConfig.prototype._setOption = function (aOption) {
        if (!aOption) {
            return;
        }
        // Parameter eintragen
        if (typeof aOption.googleConfigPath === 'string') {
            this.mConfigPath = aOption.googleConfigPath;
        }
        if (typeof aOption.googleConfigFile === 'string') {
            this.mConfigFile = aOption.googleConfigFile;
        }
        if (typeof aOption.googleConfigLoadFlag === 'boolean') {
            this.mConfigLoadFlag = aOption.googleConfigLoadFlag;
        }
        if (typeof aOption.googleServerUrl === 'string') {
            this.mConfigServerUrl = aOption.googleServerUrl;
        }
        if (typeof aOption.dialogflowTokenServerUrl === 'string') {
            this.mConfigDialogflowTokenServerUrl = aOption.dialogflowTokenServerUrl;
        }
        if (typeof aOption.dialogflowProjectId === 'string') {
            this.mConfigDialogflowProjectId = aOption.dialogflowProjectId;
        }
        if (typeof aOption.dialogflowSessionId === 'string') {
            this.mConfigDialogflowSessionId = aOption.dialogflowSessionId;
        }
        if (typeof aOption.dialogflowEnvironmentName === 'string') {
            this.mConfigDialogflowEnvironmentName = aOption.dialogflowEnvironmentName;
        }
        if (typeof aOption.googleAppId === 'string') {
            this.mConfigAppId = aOption.googleAppId;
        }
        if (typeof aOption.googleAppKey === 'string') {
            this.mConfigAppKey = aOption.googleAppKey;
        }
        if (typeof aOption.googleUserId === 'string') {
            this.mConfigUserId = aOption.googleUserId;
        }
        if (typeof aOption.googleNluTag === 'string') {
            this.mConfigNluTag = aOption.googleNluTag;
        }
        if (typeof aOption.googleNluTag === 'string') {
            this.mConfigNluTag = aOption.googleNluTag;
        }
    };
    /**
     * Initialisierung von FileReader
     *
     * @param {GoogleOptionInterface} aOptions - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    GoogleConfig.prototype.init = function (aOption) {
        // console.log('AmazonConfig.init:', aOption);
        // Konfigurationsdaten fuer Nuance uebertragen
        this._setOption(aOption);
        // TODO: Muss fuer NodeJS-Version angepasst werden, sollte nicht in init eingelesen werden,
        //       sondern als eigenstaendige Funktion aufgerufen werden!
        /**** File-Reader wird nicht im Browser verwendet, sondern spaeter einmal nur in NodeJS
        // FileReader pruefen

        if ( !this.mFileReader ) {
            this._error( 'init', 'kein FileReader vorhanden' );
            this._onInit( -1 );
            return -1;
        }

        // Readfunktion in FileReader eintragen

        this.mFileReader.onRead = (aFileData: string) => this._readConfigData( aFileData );
        this.mFileReader.onError = (aErrorText: string) => this._readError( aErrorText );

        // Config-Datei einlesen

        if ( this.mConfigLoadFlag ) {
            return this.read();
        }
        ****/
        this.mInitFlag = true;
        return 0;
    };
    /**
     * Freigabe der Komponente
     */
    GoogleConfig.prototype.done = function () {
        this.mInitFlag = false;
        this.mConfigPath = GOOGLE_CONFIG_PATH;
        this.mConfigFile = GOOGLE_CONFIG_FILE;
        this.mConfigLoadFlag = GOOGLE_CONFIG_LOAD;
        // Nuance-Konfigurationsdaten
        this.mConfigServerUrl = GOOGLE_DEFAULT_URL;
        this.mConfigDialogflowTokenServerUrl = '';
        this.mConfigDialogflowProjectId = '';
        this.mConfigDialogflowSessionId = '';
        this.mConfigDialogflowEnvironmentName = '';
        this.mConfigAppId = '';
        this.mConfigAppKey = '';
        this.mConfigUserId = '';
        this.mConfigNluTag = '';
        // FileReader
        this.mFileReader = null;
        // Initialisierung fertig
        this.mOnInitFunc = null;
        return 0;
    };
    GoogleConfig.prototype.isInit = function () {
        return this.mInitFlag;
    };
    /**
     * Sendet Event fuer fertige Initialisierung
     *
     * @param aResult - Fehlercode 0 oder -1
     */
    GoogleConfig.prototype._onInit = function (aResult) {
        // console.log('AmazonConfig._onInit: start', aResult);
        // Initflag wird nur gesetzt, wenn der Init-Event erfolgreich war
        if (aResult === 0) {
            this.mInitFlag = true;
        }
        if (typeof this.mOnInitFunc === 'function') {
            // console.log('AmazonConfig._onInit: call', aResult);
            this.mOnInitFunc(aResult);
        }
    };
    /**
     * Ereignisfunktion fuer Fehler aufrufen
     *
     * @private
     * @param {any} aError - Error Datentransferobjekt
     * @return {number} errorCode(0,-1)
     */
    GoogleConfig.prototype._onError = function (aError) {
        // console.log('AmazonConfig._onError:', aError);
        if (typeof this.mOnErrorFunc === 'function') {
            try {
                // console.log('AmazonConfig._onError: call', this.mOnErrorFunc);
                this.mOnErrorFunc(aError);
                return 0;
            }
            catch (aException) {
                if (this.isErrorOutput()) {
                    // hier darf nicht this._exception() verwendet werden, da sonst eine Endlosschleife entstehen kann!
                    console.log('===> EXCEPTION AmazonConfig._onError: ', aException.message);
                }
                return -1;
            }
        }
        return 0;
    };
    Object.defineProperty(GoogleConfig.prototype, "onInit", {
        /**
         * Initialisierungs-Event eintragen
         */
        set: function (aOnInitFunc) {
            // console.log('AmazonConfig.set onInit:', aOnInitFunc);
            this.mOnInitFunc = aOnInitFunc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleConfig.prototype, "onError", {
        /**
         * Error-Event Funktion eintragen
         *
         * @param {OnSpeechErrorFunc} aOnErrorFunc
         */
        set: function (aOnErrorFunc) {
            // console.log('Plugin.onError:', aOnErrorFunc);
            this.mOnErrorFunc = aOnErrorFunc;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Einlesen der Config-Daten aus nuance.json (APP_ID, APP_KEY, NLU_TAG)
     *
     * @param aFileData - ConfigDaten als JSON-String
     */
    GoogleConfig.prototype._readConfigData = function (aFileData) {
        // console.log('AmazonConfig._readConfigData:', aFileData);
        if (!aFileData) {
            this._error('_readConfigData', 'keine Daten uebergeben');
            return -1;
        }
        try {
            // String in Json-Objekt umwandeln
            var configData = JSON.parse(aFileData);
            if (configData.URL) {
                this.serverUrl = configData.URL;
            }
            if (configData.APP_ID) {
                this.appId = configData.APP_ID;
            }
            if (configData.APP_KEY) {
                this.appKey = configData.APP_KEY;
            }
            if (configData.USER_ID) {
                this.userId = configData.USER_ID;
            }
            if (configData.NLU_TAG) {
                this.nluTag = configData.NLU_TAG;
            }
            this._onInit(0);
            return 0;
        }
        catch (aException) {
            this._exception('_readConfigData', aException);
            return -1;
        }
    };
    /**
     * Rueckgabe eines Fehlers beim Einlesen der Daten
     *
     * @param aErrorText - Fehlerbeschreibung
     */
    GoogleConfig.prototype._readError = function (aErrorText) {
        this._error('_readError', aErrorText);
        this._onInit(-1);
    };
    /**
     * asynchrones Einlesen der Konfigurationsdaten
     */
    GoogleConfig.prototype.read = function () {
        if (!this.mFileReader) {
            this._error('read', 'kein FileReader vorhanden');
            this._onInit(-1);
            return -1;
        }
        var fileUrl = this.mConfigPath + this.mConfigFile;
        return this.mFileReader.read(fileUrl);
    };
    Object.defineProperty(GoogleConfig.prototype, "serverUrl", {
        get: function () {
            // console.log('AmazonConfig.getServerUrl:', this.mConfigServerUrl);
            return this.mConfigServerUrl;
        },
        // Konfigurations-Funktionen
        set: function (aUrl) {
            // console.log('AmazonConfig.setServerUrl:', aUrl);
            this.mConfigServerUrl = aUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleConfig.prototype, "dialogflowTokenServerUrl", {
        get: function () {
            // console.log('GoogleConfig.getDialogflowTokenServerUrl:', this.mConfigDiaogflowTokenServerUrl);
            return this.mConfigDialogflowTokenServerUrl;
        },
        set: function (aUrl) {
            // console.log('GoogleConfig.setDialogflowTokenServerUrl:', aUrl);
            this.mConfigDialogflowTokenServerUrl = aUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleConfig.prototype, "dialogflowProjectId", {
        get: function () {
            // console.log('GoogleConfig.getDialogflowProjectId:', this.mConfigDiaogflowProjectId);
            return this.mConfigDialogflowProjectId;
        },
        set: function (aProjectId) {
            // console.log('GoogleConfig.setDialogflowProjectId:', aProjectId);
            this.mConfigDialogflowProjectId = aProjectId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleConfig.prototype, "dialogflowSessionId", {
        get: function () {
            // console.log('GoogleConfig.getDialogflowSessionId:', this.mConfigDiaogflowSessionId);
            return this.mConfigDialogflowSessionId;
        },
        set: function (aSessionId) {
            // console.log('GoogleConfig.setDialogflowSessionId:', aSessionId);
            this.mConfigDialogflowSessionId = aSessionId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleConfig.prototype, "dialogflowEnvironmentName", {
        get: function () {
            // console.log('GoogleConfig.getDialogflowEnvironmentName:', this.mConfigDiaogflowEnvironmentName);
            return this.mConfigDialogflowEnvironmentName;
        },
        set: function (aEnvironmentName) {
            // console.log('GoogleConfig.setDialogflowEnvironmentName:', aEnvironmentName);
            this.mConfigDialogflowEnvironmentName = aEnvironmentName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleConfig.prototype, "appId", {
        get: function () {
            return this.mConfigAppId;
        },
        set: function (aAppId) {
            this.mConfigAppId = aAppId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleConfig.prototype, "appKey", {
        get: function () {
            return this.mConfigAppKey;
        },
        set: function (aAppKey) {
            this.mConfigAppKey = aAppKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleConfig.prototype, "userId", {
        get: function () {
            return this.mConfigUserId;
        },
        set: function (aUserId) {
            this.mConfigUserId = aUserId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GoogleConfig.prototype, "nluTag", {
        get: function () {
            return this.mConfigNluTag;
        },
        set: function (aNluTag) {
            this.mConfigNluTag = aNluTag;
        },
        enumerable: true,
        configurable: true
    });
    // pruefen auf vorhandene Credentials
    GoogleConfig.prototype.isCredentials = function () {
        if (this.mConfigAppKey || (this.mConfigDialogflowTokenServerUrl && this.mConfigDialogflowProjectId)) {
            return true;
        }
        return false;
    };
    return GoogleConfig;
}(ErrorBase));

/** @packageDocumentation
 * Definiert die Network fuer Google
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module cloud/google/net
 * @author SB
 */
var GoogleNetwork = /** @class */ (function (_super) {
    __extends(GoogleNetwork, _super);
    function GoogleNetwork() {
        return _super.call(this, 'GoogleNetwork') || this;
    }
    return GoogleNetwork;
}(NetHtml5Connect));

/** @packageDocumentation
 * Definiert die WebSocket fuer den Speech-Server als Verbindung zu Google
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module cloud/google/net
 * @author SB
 */
var GoogleWebSocket = /** @class */ (function (_super) {
    __extends(GoogleWebSocket, _super);
    function GoogleWebSocket() {
        return _super.call(this, 'GoogleWebSocket') || this;
    }
    GoogleWebSocket.prototype.connect = function (aUrl) {
        // pruefen auf URL
        if (!aUrl) {
            this._error('connect', 'keine URL vorhanden');
            return -1;
        }
        // console.log('GoogleWebSocket.connect: start', aUrl);
        if (this._connect(aUrl) !== 0) {
            // console.log('GoogleWebSocket.connect: keine Verbindung moeglich', aUrl);
            this._error('open', 'keine Verbindung moeglich');
            return -1;
        }
        // console.log('GoogleWebSocket.connect: ende', this.mTimeout);
        return 0;
    };
    GoogleWebSocket.prototype.disconnect = function () {
        // TODO: muss geloescht weerden, da sonst falsche Nachrichten an NuanceConnect versendet werden !
        this.onMessage = null;
        this.close();
    };
    // Data Helpers
    GoogleWebSocket.prototype.sendJSON = function (aJson) {
        this.sendMessage(aJson);
    };
    return GoogleWebSocket;
}(NetHtml5WebSocket));

/** @packageDocumentation
 * Definiert die Verbindung zum Google-Service
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module cloud/google/net
 * @author SB
 */
/**
 * Dient zur Verbindungsaufnahme mit GCloud Credentials.
 */
var GoogleConnect = /** @class */ (function (_super) {
    __extends(GoogleConnect, _super);
    /**
     * Erzeugt eine Instanz von Connect
     *
     * @param aConfig - Google Config Objekt
     */
    function GoogleConnect(aConfig, aWebSocket) {
        var _this = _super.call(this, 'GoogleConnect') || this;
        // innere Komponenten
        _this.mConfig = null;
        // externe Komponente
        _this.mWebSocket = null;
        // Verbindung vorhanden
        _this.mConnectFlag = false;
        _this.mConfig = aConfig;
        // kann auch Null sein, wenn Server nicht vorhanden ist !
        _this.mWebSocket = aWebSocket;
        return _this;
    }
    // Verbindungs-Funktionen
    GoogleConnect.prototype.isConnect = function () {
        return this.mConnectFlag;
    };
    /**
     * Verbindungsaufbau mit Google-Service.
     */
    GoogleConnect.prototype.connect = function (aOption) {
        var _this = this;
        // Initialize the Google Cognito credentials provider
        // console.log('GoogleConnect: onMessage einbinden');
        if (this.isConnect()) {
            // Verbindung ist bereits aufgebaut
            return 0;
        }
        // pruefen, ob WebSocket vorhanden ist
        if (!this.mWebSocket) {
            this.mConnectFlag = true;
            return 0;
        }
        // WebSocket Nachrichtenfunktion eintragen
        try {
            this.mWebSocket.onMessage = function (aMessage) {
                // console.log('GoogleConnect.connect: onMessage = ', aMessage.data );
                if (typeof aMessage.data === 'string') {
                    console.log('GoogleConnect.onMessage: String-Nachricht');
                    // Nachricht von Google verarbeiten
                    try {
                        var message = JSON.parse(aMessage.data);
                        // console.log('GoogleConnect: onMessage.data = ', message );
                        if (aOption.onmessage) {
                            aOption.onmessage(message);
                        }
                        else {
                            _this._error('connect.onMessage', 'keine Message-Funktion vorhanden');
                        }
                    }
                    catch (aException) {
                        _this._exception('connect.onMessage', aException);
                        return -1;
                    }
                }
                else if (typeof aMessage.data === 'object') {
                    console.log('GoogleConnect.onMessage: Objekt-Daten');
                    if (aOption.ondata) {
                        aOption.ondata(aMessage.data);
                    }
                    else {
                        _this._error('connect.onMessage', 'keine Daten-Funktion vorhanden');
                    }
                }
                return 0;
            };
            // pruefen auf Credentials
            this.mConnectFlag = true;
            return 0;
        }
        catch (aException) {
            this._exception('connect', aException);
            return -1;
        }
    };
    /**
     * Dient der Entfernung von onMessage aus dem WebSocket.
     */
    GoogleConnect.prototype.disconnect = function () {
        this.mConnectFlag = false;
        if (this.mWebSocket) {
            this.mWebSocket.onMessage = null;
        }
        return 0;
    };
    // Data Helpers
    GoogleConnect.prototype.sendJSON = function (aMessage) {
        if (this.mWebSocket) {
            return this.mWebSocket.sendMessage(aMessage);
        }
        return -1;
    };
    Object.defineProperty(GoogleConnect.prototype, "webSocket", {
        /**
         * Html5-WebSocket zurueckgeben
         */
        get: function () {
            if (this.mWebSocket) {
                return this.mWebSocket.webSocket;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return GoogleConnect;
}(ErrorBase));

var ApiAiConstants;
(function (ApiAiConstants) {
    var AVAILABLE_LANGUAGES;
    (function (AVAILABLE_LANGUAGES) {
        AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["EN"] = "en"] = "EN";
        AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["DE"] = "de"] = "DE";
        AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["ES"] = "es"] = "ES";
        AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["PT_BR"] = "pt-BR"] = "PT_BR";
        AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["ZH_HK"] = "zh-HK"] = "ZH_HK";
        AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["ZH_CN"] = "zh-CN"] = "ZH_CN";
        AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["ZH_TW"] = "zh-TW"] = "ZH_TW";
        AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["NL"] = "nl"] = "NL";
        AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["FR"] = "fr"] = "FR";
        AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["IT"] = "it"] = "IT";
        AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["JA"] = "ja"] = "JA";
        AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["KO"] = "ko"] = "KO";
        AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["PT"] = "pt"] = "PT";
        AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["RU"] = "ru"] = "RU";
        AVAILABLE_LANGUAGES[AVAILABLE_LANGUAGES["UK"] = "uk"] = "UK";
    })(AVAILABLE_LANGUAGES = ApiAiConstants.AVAILABLE_LANGUAGES || (ApiAiConstants.AVAILABLE_LANGUAGES = {}));
    ApiAiConstants.VERSION = "2.0.0-beta.20";
    ApiAiConstants.DEFAULT_BASE_URL = "https://api.api.ai/v1/";
    ApiAiConstants.DEFAULT_API_VERSION = "20150910";
    ApiAiConstants.DEFAULT_CLIENT_LANG = AVAILABLE_LANGUAGES.EN;
    ApiAiConstants.DEFAULT_TTS_HOST = "https://api.api.ai/api/tts";
})(ApiAiConstants || (ApiAiConstants = {}));

var ApiAiBaseError = /** @class */ (function (_super) {
    __extends(ApiAiBaseError, _super);
    function ApiAiBaseError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.stack = new Error().stack;
        return _this;
    }
    return ApiAiBaseError;
}(Error));
var ApiAiClientConfigurationError = /** @class */ (function (_super) {
    __extends(ApiAiClientConfigurationError, _super);
    function ApiAiClientConfigurationError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "ApiAiClientConfigurationError";
        return _this;
    }
    return ApiAiClientConfigurationError;
}(ApiAiBaseError));
var ApiAiRequestError = /** @class */ (function (_super) {
    __extends(ApiAiRequestError, _super);
    function ApiAiRequestError(message, code) {
        if (code === void 0) { code = null; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.code = code;
        _this.name = "ApiAiRequestError";
        return _this;
    }
    return ApiAiRequestError;
}(ApiAiBaseError));

/**
 * quick ts implementation of example from
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * with some minor improvements
 * @todo: test (?)
 * @todo: add node.js implementation with node's http inside. Just to make SDK cross-platform
 */
var XhrRequest = /** @class */ (function () {
    function XhrRequest() {
    }
    // Method that performs the ajax request
    XhrRequest.ajax = function (method, url, args, headers, options) {
        if (args === void 0) { args = null; }
        if (headers === void 0) { headers = null; }
        if (options === void 0) { options = {}; }
        // Creating a promise
        return new Promise(function (resolve, reject) {
            // Instantiates the XMLHttpRequest
            var client = XhrRequest.createXMLHTTPObject();
            var uri = url;
            var payload = null;
            // Add given payload to get request
            if (args && (method === XhrRequest.Method.GET)) {
                uri += "?";
                var argcount = 0;
                for (var key in args) {
                    if (args.hasOwnProperty(key)) {
                        if (argcount++) {
                            uri += "&";
                        }
                        uri += encodeURIComponent(key) + "=" + encodeURIComponent(args[key]);
                    }
                }
            }
            else if (args) {
                if (!headers) {
                    headers = {};
                }
                headers["Content-Type"] = "application/json; charset=utf-8";
                payload = JSON.stringify(args);
            }
            for (var key in options) {
                if (key in client) {
                    client[key] = options[key];
                }
            }
            // hack: method[method] is somewhat like .toString for enum Method
            // should be made in normal way
            client.open(XhrRequest.Method[method], uri, true);
            // Add given headers
            if (headers) {
                console.log('Dialogflow.XhrRequest: Headers', headers);
                for (var key in headers) {
                    if (headers.hasOwnProperty(key)) {
                        client.setRequestHeader(key, headers[key]);
                    }
                }
            }
            payload ? client.send(payload) : client.send();
            client.onload = function () {
                if (client.status >= 200 && client.status < 300) {
                    // Performs the function "resolve" when this.status is equal to 2xx
                    resolve(client);
                }
                else {
                    // Performs the function "reject" when this.status is different than 2xx
                    console.log('Dialogflow.XhrRequest: onLoad->reject ', client);
                    reject(client);
                }
            };
            client.onerror = function () {
                console.log('Dialogflow.XhrRequest: onError ', client);
                reject(client);
            };
        });
    };
    XhrRequest.get = function (url, payload, headers, options) {
        if (payload === void 0) { payload = null; }
        if (headers === void 0) { headers = null; }
        if (options === void 0) { options = {}; }
        return XhrRequest.ajax(XhrRequest.Method.GET, url, payload, headers, options);
    };
    XhrRequest.post = function (url, payload, headers, options) {
        if (payload === void 0) { payload = null; }
        if (headers === void 0) { headers = null; }
        if (options === void 0) { options = {}; }
        return XhrRequest.ajax(XhrRequest.Method.POST, url, payload, headers, options);
    };
    XhrRequest.put = function (url, payload, headers, options) {
        if (payload === void 0) { payload = null; }
        if (headers === void 0) { headers = null; }
        if (options === void 0) { options = {}; }
        return XhrRequest.ajax(XhrRequest.Method.PUT, url, payload, headers, options);
    };
    XhrRequest.delete = function (url, payload, headers, options) {
        if (payload === void 0) { payload = null; }
        if (headers === void 0) { headers = null; }
        if (options === void 0) { options = {}; }
        return XhrRequest.ajax(XhrRequest.Method.DELETE, url, payload, headers, options);
    };
    XhrRequest.createXMLHTTPObject = function () {
        var xmlhttp = null;
        for (var _i = 0, _a = XhrRequest.XMLHttpFactories; _i < _a.length; _i++) {
            var i = _a[_i];
            try {
                xmlhttp = i();
            }
            catch (e) {
                continue;
            }
            break;
        }
        return xmlhttp;
    };
    XhrRequest.XMLHttpFactories = [
        function () { return new XMLHttpRequest(); },
        function () { return new window["ActiveXObject"]("Msxml2.XMLHTTP"); },
        function () { return new window["ActiveXObject"]("Msxml3.XMLHTTP"); },
        function () { return new window["ActiveXObject"]("Microsoft.XMLHTTP"); }
    ];
    return XhrRequest;
}());
(function (XhrRequest) {
    var Method;
    (function (Method) {
        Method[Method["GET"] = "GET"] = "GET";
        Method[Method["POST"] = "POST"] = "POST";
        Method[Method["PUT"] = "PUT"] = "PUT";
        Method[Method["DELETE"] = "DELETE"] = "DELETE";
    })(Method = XhrRequest.Method || (XhrRequest.Method = {}));
})(XhrRequest || (XhrRequest = {}));
var XhrRequest$1 = XhrRequest;

var Request = /** @class */ (function () {
    function Request(apiAiClient, options) {
        this.apiAiClient = apiAiClient;
        this.options = options;
        this.uri = this.apiAiClient.getApiBaseUrl() + "query?v=" + this.apiAiClient.getApiVersion();
        this.requestMethod = XhrRequest$1.Method.POST;
        this.headers = {
            Authorization: "Bearer " + this.apiAiClient.getAccessToken(),
        };
        this.options.lang = this.apiAiClient.getApiLang();
        this.options.sessionId = this.apiAiClient.getSessionId();
    }
    Request.handleSuccess = function (xhr) {
        return Promise.resolve(JSON.parse(xhr.responseText));
    };
    Request.handleError = function (xhr) {
        var error = new ApiAiRequestError(null);
        try {
            var serverResponse = JSON.parse(xhr.responseText);
            if (serverResponse.status && serverResponse.status.errorDetails) {
                error = new ApiAiRequestError(serverResponse.status.errorDetails, serverResponse.status.code);
            }
            else {
                error = new ApiAiRequestError(xhr.statusText, xhr.status);
            }
        }
        catch (e) {
            error = new ApiAiRequestError(xhr.statusText, xhr.status);
        }
        return Promise.reject(error);
    };
    Request.prototype.perform = function (overrideOptions) {
        if (overrideOptions === void 0) { overrideOptions = null; }
        var options = overrideOptions ? overrideOptions : this.options;
        return XhrRequest$1.ajax(this.requestMethod, this.uri, options, this.headers)
            .then(Request.handleSuccess.bind(this))
            .catch(Request.handleError.bind(this));
    };
    return Request;
}());

var EventRequest = /** @class */ (function (_super) {
    __extends(EventRequest, _super);
    function EventRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EventRequest;
}(Request));

var TextRequest = /** @class */ (function (_super) {
    __extends(TextRequest, _super);
    function TextRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TextRequest;
}(Request));

var IStreamClient;
(function (IStreamClient) {
    var ERROR;
    (function (ERROR) {
        ERROR[ERROR["ERR_NETWORK"] = 0] = "ERR_NETWORK";
        ERROR[ERROR["ERR_AUDIO"] = 1] = "ERR_AUDIO";
        ERROR[ERROR["ERR_SERVER"] = 2] = "ERR_SERVER";
        ERROR[ERROR["ERR_CLIENT"] = 3] = "ERR_CLIENT";
    })(ERROR = IStreamClient.ERROR || (IStreamClient.ERROR = {}));
    var EVENT;
    (function (EVENT) {
        EVENT[EVENT["MSG_WAITING_MICROPHONE"] = 0] = "MSG_WAITING_MICROPHONE";
        EVENT[EVENT["MSG_MEDIA_STREAM_CREATED"] = 1] = "MSG_MEDIA_STREAM_CREATED";
        EVENT[EVENT["MSG_INIT_RECORDER"] = 2] = "MSG_INIT_RECORDER";
        EVENT[EVENT["MSG_RECORDING"] = 3] = "MSG_RECORDING";
        EVENT[EVENT["MSG_SEND"] = 4] = "MSG_SEND";
        EVENT[EVENT["MSG_SEND_EMPTY"] = 5] = "MSG_SEND_EMPTY";
        EVENT[EVENT["MSG_SEND_EOS_OR_JSON"] = 6] = "MSG_SEND_EOS_OR_JSON";
        EVENT[EVENT["MSG_WEB_SOCKET"] = 7] = "MSG_WEB_SOCKET";
        EVENT[EVENT["MSG_WEB_SOCKET_OPEN"] = 8] = "MSG_WEB_SOCKET_OPEN";
        EVENT[EVENT["MSG_WEB_SOCKET_CLOSE"] = 9] = "MSG_WEB_SOCKET_CLOSE";
        EVENT[EVENT["MSG_STOP"] = 10] = "MSG_STOP";
        EVENT[EVENT["MSG_CONFIG_CHANGED"] = 11] = "MSG_CONFIG_CHANGED";
    })(EVENT = IStreamClient.EVENT || (IStreamClient.EVENT = {}));
})(IStreamClient || (IStreamClient = {}));

var ApiAiClient = /** @class */ (function () {
    function ApiAiClient(options) {
        if (!options || !options.accessToken) {
            throw new ApiAiClientConfigurationError("Access token is required for new ApiAi.Client instance");
        }
        this.accessToken = options.accessToken;
        this.apiLang = options.lang || ApiAiConstants.DEFAULT_CLIENT_LANG;
        this.apiVersion = options.version || ApiAiConstants.DEFAULT_API_VERSION;
        this.apiBaseUrl = options.baseUrl || ApiAiConstants.DEFAULT_BASE_URL;
        this.sessionId = options.sessionId || this.guid();
    }
    ApiAiClient.prototype.textRequest = function (query, options) {
        if (options === void 0) { options = {}; }
        if (!query) {
            throw new ApiAiClientConfigurationError("Query should not be empty");
        }
        options.query = query;
        return new TextRequest(this, options).perform();
    };
    ApiAiClient.prototype.eventRequest = function (eventName, eventData, options) {
        if (eventData === void 0) { eventData = {}; }
        if (options === void 0) { options = {}; }
        if (!eventName) {
            throw new ApiAiClientConfigurationError("Event name can not be empty");
        }
        options.event = { name: eventName, data: eventData };
        return new EventRequest(this, options).perform();
    };
    // @todo: implement local tts request
    /*public ttsRequest(query) {
        if (!query) {
            throw new ApiAiClientConfigurationError("Query should not be empty");
        }
        return new TTSRequest(this).makeTTSRequest(query);
    }*/
    /*public userEntitiesRequest(options: IRequestOptions = {}): UserEntitiesRequest {
        return new UserEntitiesRequest(this, options);
    }*/
    ApiAiClient.prototype.getAccessToken = function () {
        return this.accessToken;
    };
    ApiAiClient.prototype.getApiVersion = function () {
        return (this.apiVersion) ? this.apiVersion : ApiAiConstants.DEFAULT_API_VERSION;
    };
    ApiAiClient.prototype.getApiLang = function () {
        return (this.apiLang) ? this.apiLang : ApiAiConstants.DEFAULT_CLIENT_LANG;
    };
    ApiAiClient.prototype.getApiBaseUrl = function () {
        return (this.apiBaseUrl) ? this.apiBaseUrl : ApiAiConstants.DEFAULT_BASE_URL;
    };
    ApiAiClient.prototype.setSessionId = function (sessionId) {
        this.sessionId = sessionId;
    };
    ApiAiClient.prototype.getSessionId = function () {
        return this.sessionId;
    };
    /**
     * generates new random UUID
     * @returns {string}
     */
    ApiAiClient.prototype.guid = function () {
        var s4 = function () { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); };
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
            s4() + "-" + s4() + s4() + s4();
    };
    return ApiAiClient;
}());

/** @packageDocumentation
 * Google Geraeteklasse fuer TTS, ASR und NLU
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module cloud/google/device
 * @author SB
 */
/**
 * Basisklasse akller Google-Geraete
 */
var GoogleDevice = /** @class */ (function (_super) {
    __extends(GoogleDevice, _super);
    /**
     * Erzeugt eine Instanz von NuanceDevice
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */
    function GoogleDevice(aDeviceName, aConfig, aConnect) {
        var _this = _super.call(this, aDeviceName || 'GoogleDevice') || this;
        // initialisierung
        _this.mInitFlag = false;
        // innere Komponenten
        _this.mConfig = null;
        _this.mConnect = null;
        // Transaktion
        _this.mTransaction = null;
        // Event-Funktionen
        _this.onStart = null;
        _this.onStop = null;
        _this.onResult = null;
        _this.onError = null;
        _this.onClose = null;
        _this.mConfig = aConfig;
        _this.mConnect = aConnect;
        _this.mInitFlag = true;
        return _this;
    }
    GoogleDevice.prototype.isInit = function () {
        return this.mInitFlag;
    };
    GoogleDevice.prototype.clearToken = function () {
        // muss von erbenden Klassen ueberschrieben werden        
    };
    // Event-Funktionen
    /**
     * StartEvent und Beginn der Transaktion
     *
     * @protected
     */
    GoogleDevice.prototype._onStart = function () {
        // console.log('GoogleDevice._onStart');
        if (this.mTransaction && this.onStart) {
            this.onStart(this.mTransaction);
        }
        return 0;
    };
    /**
     * Stop-Event und Ende der Transaktion
     *
     * @protected
     */
    GoogleDevice.prototype._onStop = function () {
        // console.log('GoogleDevice._onStop:', this.mTransaction, this.onStop );
        if (this.mTransaction && this.onStop) {
            this.onStop(this.mTransaction);
        }
        // Transaktion wird geloescht
        this.mTransaction = null;
        return 0;
    };
    /**
     * Ergebnis Event
     *
     * @protected
     * @param aResult- Ergebnis von Google
     */
    GoogleDevice.prototype._onResult = function (aResult) {
        if (this.mTransaction && this.onResult) {
            this.mTransaction.result = aResult;
            this.onResult(this.mTransaction);
        }
        return 0;
    };
    /**
     * Fehler-Event
     *
     * @protected
     * @param aError
     */
    GoogleDevice.prototype._onError = function (aError) {
        if (this.mTransaction && this.onError) {
            this.mTransaction.error = aError;
            this.onError(this.mTransaction);
        }
        return 0;
    };
    /**
     * WebSocket schliessen Event, deutet auf einen Fehler hin
     *
     * @protected
     */
    GoogleDevice.prototype._onClose = function () {
        if (this.mTransaction && this.onClose) {
            this.onClose(this.mTransaction);
        }
        return 0;
    };
    /**
     * Initialisierung der Geraete Optionen
     *
     * @protected
     *
     * @return {any} Default Optionen fuer die NLU
     */
    // TODO: wird in Google nicht gebraucht
    /****
    _getDefaultOption(): any {
        // console.log('NuanceASR._getDefaultOption: start');
        const defaultOption = {

            onopen: () => {
                // console.log( 'NuanceNLU: Service verbunden' );
                this._onStart();
            },

            onclose: () => {
                // console.log( 'NuanceNLU: Websocket Closed' );
                this._onClose();
                this._onStop();
            },

            onerror: (aError: any) => {
                // console.error('NuanceNLU._getDefaultOption: error = ', aError);
                this._onError( aError );
                this._onStop();
            }

        };
        return defaultOption;
    }
    ****/
    // TODO: wird in Google nicht gebraucht
    /****
    _createOption( aOverrideOption: any): any {
        // console.log( 'NuanceNLU._createOption:', aOverrideOption );
        const option = Object.assign( aOverrideOption, this._getDefaultOption());
        option.appId = aOverrideOption.appId || this.mConfig.appId || '';
        option.appKey = aOverrideOption.appKey || this.mConfig.appKey || '';
        option.userId = aOverrideOption.userId || this.mConfig.userId;
        option.tag = aOverrideOption.tag || this.mConfig.nluTag || '';
        option.language = aOverrideOption.language || GOOGLE_DEFAULT_LANGUAGE;
        option.text = aOverrideOption.text || '';
        option.voice = aOverrideOption.voice || GOOGLE_DEFAULT_VOICE;
        option.codec = aOverrideOption.codec || GOOGLE_DEFAULT_CODEC;
        return option;
    }
    ****/
    // Nachrichten senden
    // TODO: wird in Google nicht gebraucht
    /****
    _sendQueryEndMessage( aTransactionId: number ): number {
        const queryEndMessage = {
            'message': 'query_end',
            'transaction_id': aTransactionId
        };
        return this.mConnect.sendJSON( queryEndMessage );
    }
    ****/
    // Geraete-Funktionen
    /**
     * Interne Geraete Startfunktion
     *
     * @protected
     * @param {*} aOption - optionale Parameter
     */
    GoogleDevice.prototype._start = function (aOption) {
        // muss von erbenden Klassen ueberschrieben werden
    };
    /**
     * Interne Geraete Stopfunktion
     *
     * @protected
     */
    GoogleDevice.prototype._stop = function () {
        // muss von erbenden Klassen ueberschrieben werden
    };
    /**
     * Geraeteaktion starten
     *
     * @param {PortTransaction} aTransaction - auszufuehrende Transaktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GoogleDevice.prototype.start = function (aTransaction, aOption) {
        // console.log('GoogleDevice.start:', aTransaction, aOption);
        if (!aTransaction) {
            this._error('start', 'keine Transaktion uebergeben');
            return -1;
        }
        // pruefen auf vorhandene Transaktion
        if (this.mTransaction) {
            this._error('start', 'vorherige Transaktion nicht beendet');
            return -1;
        }
        // Transaktion eintragen
        this.mTransaction = aTransaction;
        try {
            this._start(aOption);
            return 0;
        }
        catch (aException) {
            this._exception('start', aException);
            return -1;
        }
    };
    /**
     * Geraeteaktion beenden
     *
     * @param {PortTransaction} aTransaction - auszufuehrende Transaktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GoogleDevice.prototype.stop = function (aTransaction) {
        // console.log('GoogleDevice.stop:', aTransaction);
        if (!aTransaction) {
            this._error('stop', 'keine Transaktion uebergeben');
            return -1;
        }
        // pruefen auf vorhandene Transaktion
        if (!this.mTransaction) {
            this._error('stop', 'keine Transaktion gestartet');
            return -1;
        }
        // pruefen auf gleiche Transaktion
        if (this.mTransaction.transactionId !== aTransaction.transactionId) {
            this._error('stop', 'Transaktions-ID stimmt nicht ueberein');
            return -1;
        }
        try {
            this._stop();
            return 0;
        }
        catch (aException) {
            this._exception('stop', aException);
            return -1;
        }
    };
    /**
     * pruefen auf vorhandene Transaktion
     */
    GoogleDevice.prototype.isTransaction = function () {
        if (this.mTransaction) {
            return true;
        }
        return false;
    };
    /**
     * Transaktion zurueckgeben
     */
    GoogleDevice.prototype.getTransaction = function () {
        return this.mTransaction;
    };
    /**
     * Transaktion loeschen
     */
    GoogleDevice.prototype.clearTransaction = function () {
        this.mTransaction = null;
    };
    return GoogleDevice;
}(ErrorBase));

/** @packageDocumentation
 * NLU Anbindung an den Google-Service, hier wird nur ein Text in einen Intent umgewandelt
 *
 * Letzte Aenderung: 07.05.2019
 * Status: rot
 *
 * @module cloud/google/device
 * @author SB
 */
var GoogleNLU = /** @class */ (function (_super) {
    __extends(GoogleNLU, _super);
    /**
     * Erzeugt eine Instanz von NuanceNLU
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */
    function GoogleNLU(aConfig, aConnect) {
        return _super.call(this, 'GoogleNLU', aConfig, aConnect) || this;
    }
    // NLU-Funktionen
    /**
     * started die NLU
     *
     * @param options - Parameter fuer die NLU
     */
    GoogleNLU.prototype._start = function (aOptions) {
        var _this = this;
        // console.log('GoogleNLU._startNLU:', aOptions);
        try {
            if (!this.mConfig.appKey) {
                this._error('_start', 'kein AppKey vorhanden');
                return;
            }
            // Dialogflow V1 Verbindung erzeugen (gilt nur noch bis Oktober 2019)
            this.mDialogflowClient = new ApiAiClient({ accessToken: this.mConfig.appKey });
            // Hier wird die Antwort zurueckgegeben
            this.mDialogflowClient.textRequest(aOptions.text).then(function (aResponse) {
                // console.log('GoogleNlu._start: response = ', aResponse.result);
                try {
                    _this._onResult(aResponse.result);
                }
                catch (aException) {
                    _this._onError(new Error('NLU-Exception: ' + aException.message));
                }
                _this._onStop();
            }, function (aError) {
                console.log('GoogleNlu._start: Promise-Error ', aError);
                _this._onError(new Error('NLU-Error: ' + aError.message));
            });
        }
        catch (aException) {
            this._exception('_start', aException);
        }
    };
    GoogleNLU.prototype._stop = function () {
        // console.log('GoogleNLU._stop');
    };
    return GoogleNLU;
}(GoogleDevice));

/** @packageDocumentation
 * NLU Anbindung an den Google-Service, hier wird nur ein Text in einen Intent umgewandelt
 * Zugriff erfolgt mit Hilfe eines AccessTokens, welche vom Dialogflow-Tokenserver geholt werden muss.
 * Das AccessToken hat eine Stunde Gueltigkeit.
 *
 * Letzte Aenderung: 20.06.2020
 * Status: rot
 *
 * @module cloud/google/device
 * @author SB
 */
// Konstanten
var DIALOGFLOW_SERVER_URL = 'https://dialogflow.googleapis.com/v2/projects';
// Anzahl der Volume-Pruefungen, bis ASR-Aufnahme abgebrochen wird
var ASR_BEGINMAXVOLUME_COUNTER = 100;
var ASR_ENDMAXVOLUME_COUNTER = 20;
var ASR_TIMEOUTVOLUME_COUNTER = 150;
// Schwellwert fuer Lautstaerke, ab der weiter zugehoert wird
var ASR_MINVOLUME_THRESHOLD = 127.0;
var ASR_MAXVOLUME_THRESHOLD = 128.0;
var GoogleNLU2 = /** @class */ (function (_super) {
    __extends(GoogleNLU2, _super);
    /**
     * Erzeugt eine Instanz von DialogflowNLU
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */
    function GoogleNLU2(aConfig, aConnect, aAudioContext, aGetUserMedia) {
        var _this = _super.call(this, 'GoogleNLU2', aConfig, aConnect) || this;
        _this.mAccessToken = '';
        _this.mAccessTokenDate = new Date();
        _this.mAccessTokenDuration = 0;
        _this.mOptions = {};
        // Audio
        _this.mAudioContext = null;
        _this.mAudioPlayer = null;
        // HTML5-Komponenten
        _this.mGetUserMedia = null;
        // weitere Attribute
        _this.mAudioRecorder = null;
        _this.mUserMediaStream = null;
        _this.mRecordingFlag = false;
        _this.mStopFlag = false;
        _this.mSpeakFlag = false;
        _this.mVolumeCounter = 0;
        _this.mMaxVolumeCounter = ASR_BEGINMAXVOLUME_COUNTER;
        _this.mTimeoutCounter = 0;
        _this.mAudioContext = aAudioContext;
        _this.mGetUserMedia = aGetUserMedia;
        // Prefetch des Tokens, dient dem Starten des Tokenservers in der Cloud
        _this.getAccessTokenFromServer();
        return _this;
    }
    // Token-Funktionen
    GoogleNLU2.prototype.clearToken = function () {
        this.mAccessToken = '';
        this.mAccessTokenDate = new Date();
        this.mAccessTokenDuration = 0;
    };
    /**
     * Berechnung der Zeitdifferenz zur Bestimmung der Restgueltigkeitsdauer eines Tokens
     */
    GoogleNLU2.prototype.getDiffTime = function (date1, date2) {
        return date2.getTime() - date1.getTime();
    };
    /**
     * Token wird direkt vom Tokenserver geholt
     */
    GoogleNLU2.prototype.getAccessTokenFromServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, responseJSON, aException_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(this.mConfig.dialogflowTokenServerUrl, {
                                method: 'GET',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        responseJSON = _a.sent();
                        // console.log('AccessToken: ', responseJSON);
                        this.mAccessTokenDate = new Date();
                        this.mAccessToken = responseJSON.token || '';
                        this.mAccessTokenDuration = responseJSON.time || 0;
                        return [3 /*break*/, 4];
                    case 3:
                        aException_1 = _a.sent();
                        this.mInitFlag = false;
                        this._exception('getAccessTokenFromServer', aException_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Token wird zurueckgegeben
     */
    GoogleNLU2.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentDate, diffTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentDate = new Date();
                        diffTime = Math.round(this.getDiffTime(this.mAccessTokenDate, currentDate) / 1000);
                        if (!(diffTime > this.mAccessTokenDuration)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getAccessTokenFromServer()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.mAccessToken];
                }
            });
        });
    };
    // NLU-Funktionen
    /**
     * Detect Intent Text zurueckgeben
     */
    GoogleNLU2.prototype.getDetectIntentText = function (aText, aLanguage) {
        return __awaiter(this, void 0, void 0, function () {
            var sessionId, serverUrl, accessToken, response, responseJSON, aException_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        sessionId = this.mConfig.dialogflowSessionId;
                        // Zufalls-Session, wenn keine Session vorhanden
                        if (!sessionId) {
                            sessionId = Math.floor(Math.random() * Math.floor(9999999999)).toString();
                            this.mConfig.dialogflowSessionId = sessionId;
                        }
                        serverUrl = DIALOGFLOW_SERVER_URL + "/" + this.mConfig.dialogflowProjectId + "/agent/sessions/" + sessionId + ":detectIntent";
                        // Server-URL fuer published Environment-Version des Dialogflow-Agenten
                        if (this.mConfig.dialogflowEnvironmentName) {
                            serverUrl = DIALOGFLOW_SERVER_URL + "/" + this.mConfig.dialogflowProjectId + "/agent/environments/" + this.mConfig.dialogflowEnvironmentName + "/users/-/sessions/" + sessionId + ":detectIntent";
                        }
                        return [4 /*yield*/, this.getAccessToken()];
                    case 1:
                        accessToken = _a.sent();
                        return [4 /*yield*/, fetch(serverUrl, {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                    Authorization: "Bearer " + accessToken,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    queryInput: {
                                        text: {
                                            text: aText,
                                            languageCode: aLanguage
                                        }
                                    }
                                })
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        responseJSON = _a.sent();
                        // console.log('GoogleNLU2.getDetectIntent: ', responseJSON);
                        return [2 /*return*/, responseJSON];
                    case 4:
                        aException_2 = _a.sent();
                        this._exception('getDetectIntentText', aException_2);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(new Error('Exception in getDetectIntentText'));
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Detect Intent Audio zurueckgeben
     */
    GoogleNLU2.prototype.getDetectIntentAudio = function (aAudioData, aLanguage) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, response, responseJSON, aException_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getAccessToken()];
                    case 1:
                        accessToken = _a.sent();
                        return [4 /*yield*/, fetch(DIALOGFLOW_SERVER_URL + "/" + this.mConfig.dialogflowProjectId + "/agent/sessions/123456789:detectIntent", {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                    Authorization: "Bearer " + accessToken,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    queryInput: {
                                        audioConfig: {
                                            audioEncoding: 'AUDIO_ENCODING_LINEAR_16',
                                            languageCode: 'de',
                                            sampleRateHertz: 16000
                                        }
                                    },
                                    inputAudio: aAudioData
                                })
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        responseJSON = _a.sent();
                        // console.log('GoogleNLU2.getDetectIntentAudio: ', responseJSON);
                        return [2 /*return*/, responseJSON];
                    case 4:
                        aException_3 = _a.sent();
                        this._exception('getDetectIntentText', aException_3);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject(new Error('Exception in getDetectIntentAudio'));
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Verarbeitet den empfangenen Intent
     *
     * @param aResponse
     */
    GoogleNLU2.prototype._responseIntent = function (aOption, aResponse) {
        // console.log('GoogleNLU2._readIntent: response = ', aResponse );
        var ttsResult = -1;
        try {
            // Intent zurueckgeben
            this._onResult(aResponse);
            // pruefen auf Abspielen von Audio (MP3)
            if (this.mSpeakFlag && !this.mStopFlag) {
                // pruefen auf MP3-Codec
                if (aResponse.outputAudioConfig && aResponse.outputAudioConfig.audioEncoding === 'OUTPUT_AUDIO_ENCODING_MP3') {
                    ttsResult = this._startTTS(aOption, aResponse.outputAudio);
                }
                else {
                    this._onError(new Error('NLU-Error: no MP3-Format'));
                }
            }
        }
        catch (aException) {
            this._onError(new Error('NLU-Exception: ' + aException.message));
        }
        // pruefen auf TTS gestartet
        if (ttsResult !== 0) {
            this._onStop();
        }
    };
    /**
     * started die NLU
     *
     * @param options - Parameter fuer die NLU
     */
    GoogleNLU2.prototype._start = function (aOption) {
        var _this = this;
        // console.log('GoogleNLU2._startNLU:', aOptions);
        this.mStopFlag = false;
        try {
            if (!this.mConfig.dialogflowTokenServerUrl) {
                this._error('_start', 'kein Tokenserver vorhanden');
                return;
            }
            if (!this.mConfig.dialogflowProjectId) {
                this._error('_start', 'keine ProjektID vorhanden');
                return;
            }
            // pruefen auf Audioaufnahme
            if (!aOption.text) {
                this._startASR(aOption);
            }
            else {
                // Hier wird die Antwort zurueckgegeben
                this.getDetectIntentText(aOption.text, aOption.language).then(function (aResponse) {
                    _this._responseIntent(aOption, aResponse);
                }, function (aError) {
                    // console.log('GoogleNLU2._start: Promise-Error ', aError)
                    _this._onError(new Error('NLU-Error: ' + aError.message));
                    _this._onStop();
                });
            }
        }
        catch (aException) {
            this._exception('_start', aException);
        }
    };
    GoogleNLU2.prototype._stop = function () {
        // console.log('GoogleNLU._stop');
        this.mStopFlag = true;
        this._stopASR({});
        this._stopTTS();
        this._onStop();
    };
    // ASR-Funktionen
    GoogleNLU2.prototype.encodeBase64 = function (aBuffer) {
        if (window.btoa) {
            var binary = '';
            var bytes = new Uint8Array(aBuffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        }
        return '';
    };
    /**
     * Pruefen auf vorhandenem Volumen
     * @param aVolumeData - Audiodaten zum pruefen auf Volumen
     */
    GoogleNLU2.prototype.isVolume = function (aVolumeData) {
        this.mVolumeCounter += 1;
        this.mTimeoutCounter += 1;
        if (aVolumeData) {
            try {
                // Berechnung des Volumens
                var length_1 = aVolumeData.length;
                var volumeSum = 0;
                for (var i = 0; i < length_1; i++) {
                    volumeSum += aVolumeData[i] * aVolumeData[i];
                }
                var volume = Math.sqrt(volumeSum / length_1);
                // console.log('GoogleNLU2.isVolume:', volume);
                if (volume < ASR_MINVOLUME_THRESHOLD || volume > ASR_MAXVOLUME_THRESHOLD) {
                    console.log('GoogleNLU2.isVolume:', volume);
                    this.mVolumeCounter = 0;
                    this.mMaxVolumeCounter = ASR_ENDMAXVOLUME_COUNTER;
                }
            }
            catch (aException) {
                this._exception('isVolume', aException);
            }
        }
        // console.log( 'GoogleASR2.isVolume:', aVolumeData);
        if (this.mVolumeCounter === this.mMaxVolumeCounter) {
            console.log('GoogleASR2.isVolume: VolumeCounter hat beendet');
            return false;
        }
        if (this.mTimeoutCounter === ASR_TIMEOUTVOLUME_COUNTER) {
            console.log('GoogleASR2.isVolume: TimeoutCounter hat beendet');
            return false;
        }
        return true;
    };
    /**
     * hier wird ein Audio uebertragen
     *
     * @param aOption
     */
    GoogleNLU2.prototype._startASRAudio = function (aOption) {
    };
    /**
     * Echtzeitstreamen vom Mikrophon zur Sprachernkennung
     *
     * @param aOption
     */
    GoogleNLU2.prototype._startASRRecording = function (aOption) {
        // console.log('GoogleASR2._startASR:', aOption);
        var _this = this;
        this.mMaxVolumeCounter = ASR_BEGINMAXVOLUME_COUNTER;
        this.mVolumeCounter = 0;
        this.mTimeoutCounter = 0;
        // Audiosource einrichten
        try {
            this.mAudioRecorder = new AudioRecorder(null, this.mAudioContext, function (aVolumeData) {
                // console.log( 'GoogleASR2._startASR: volumeCallback ' + aVolumeData + '\n\n\n');
                if (!_this.isVolume(aVolumeData)) {
                    _this._stopASR(aOption);
                }
            });
            // pruefen auf Mikrofon oder Audiodaten
            if (aOption.userMediaStream) {
                this.mAudioRecorder.start(aOption.userMediaStream, GOOGLE_PCM_CODEC);
            }
            else if (aOption.audioData) {
                this.mAudioRecorder.startAudio(aOption.audioData, GOOGLE_PCM_CODEC);
            }
            else {
                // console.log('GoogleASR2._startASR: keine Audiodaten vorhanden');
                this._error('_startASRRecording', 'keine Audiodaten vorhanden');
                this._stop();
                return;
            }
            this.mRecordingFlag = true;
        }
        catch (aException) {
            this._exception('_startASRRecording', aException);
            this._stopASR(aOption);
        }
    };
    /**
     * startet die Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */
    GoogleNLU2.prototype._startASR = function (aOption) {
        var _this = this;
        // console.log('GoogleNLU2._startASR:', aOption.language);
        if (this.mRecordingFlag) {
            this._error('_startASR', 'ASR laeuft bereits');
            return -1;
        }
        // TODO: Hier muss zwischen vorhandenen Audiodaten zum Streamen und dem Mikrofon
        //       als Audioquelle unterschieden werden.
        if (aOption && aOption.audioURL) {
            var option = {
                audioURL: aOption.audioURL,
                language: aOption.language
            };
            try {
                this._startASRAudio(option);
            }
            catch (aException) {
                this._exception('_startASR', aException);
            }
        }
        else {
            if (!this.mGetUserMedia) {
                this._error('_startASR', 'kein getUserMedia vorhanden');
                return -1;
            }
            try {
                // Verbindung mit dem Mikrofon herstellen ueber einen Stream
                // console.log('NuanceASR._start: getUserMedia = ', this.mGetUserMedia);
                this.mGetUserMedia({ audio: true, video: false }).then(function (stream) {
                    // console.log('GoogleASR2._start: getUserMedia = ', stream);
                    _this.mUserMediaStream = stream;
                    var option = {
                        userMediaStream: _this.mUserMediaStream,
                        language: aOption.language
                    };
                    _this._startASRRecording(option);
                }, function (aError) {
                    // console.log('NuanceASR._start: getMediaError', aError);
                    _this._onError(new Error('ASR-Error: kein UserMedia erzeugt'));
                    _this._error('_startASR', 'keine UserMedia erzeugt: ' + aError.message);
                    // hier muss die ASR sofort beendet werden
                    _this._onStop();
                });
                return 0;
            }
            catch (aException) {
                this._exception('_startASR', aException);
                return -1;
            }
        }
        this._error('_startASR', 'ASR ist nicht implementiert');
        return -1;
    };
    /**
     * Beenden der Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */
    GoogleNLU2.prototype._stopASR = function (aOption) {
        var _this = this;
        // console.log('GoogleASR2._stop: start');
        this.mRecordingFlag = false;
        if (!this.mAudioRecorder) {
            return 0;
        }
        try {
            this.mAudioRecorder.stop(function (aBuffer) {
                if (!_this.mStopFlag) {
                    // Hier wird der Intent geholt
                    _this.getDetectIntentAudio(_this.encodeBase64(aBuffer), '').then(function (aResponse) {
                        _this._responseIntent(aOption, aResponse);
                    }, function (aError) {
                        // console.log('GoogleNLU2._start: Promise-Error ', aError)
                        _this._onError(new Error('NLU-Error: ' + aError.message));
                        _this._onStop();
                    });
                }
            });
            this.mAudioRecorder = null;
            // console.log('GoogleASR2._stop: end');
            return 0;
        }
        catch (aException) {
            this._exception('_stop', aException);
            return -1;
        }
    };
    // TTS-Funktionen
    /**
     * Dekodieren der String-Base64 Codierung
     *
     * @param aBase64Text
     */
    GoogleNLU2.prototype.decodeBase64 = function (aBase64Text) {
        if (window.atob) {
            var binary_string = window.atob(aBase64Text);
            var len = binary_string.length;
            var bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }
        return new ArrayBuffer(1);
    };
    /**
     * TTS starten
     *
     * @param aOptions
     */
    GoogleNLU2.prototype._startTTS = function (aOptions, aAudioData) {
        var _this = this;
        // console.log('GoogleNLU2._startTTS:', aOptions);
        try {
            // pruefen auf vorhandene Audiodaten
            if (!aAudioData) {
                return -1;
            }
            // Audioplayer erzeugen
            this.mAudioPlayer = new AudioPlayer(this.mAudioContext);
            this.mAudioPlayer.start();
            var options = {
                onaudiostart: function () {
                    // console.log('GoogleNLU2._startTTS: Audioplayer gestartet');
                    // TODO: Audiostart-Event einbauen
                },
                onaudioend: function () {
                    // console.log('GoogleNLU2._startTTS: Audioplayer beenden');
                    // TODO: Audiostop einbauen
                    _this._stop();
                }
            };
            // MP3-Audio dekodieren
            // console.log('GoogleNLU2._startTTS: play Audio MP3');
            this.mAudioPlayer.decodeAudio(options, this.decodeBase64(aAudioData));
            return 0;
        }
        catch (aException) {
            this._onError(new Error('NLU2-Exception: ' + aException.message));
            return -1;
        }
    };
    /**
     * Stoppen der TTS
     */
    GoogleNLU2.prototype._stopTTS = function () {
        // console.log('GoogleNLU2._stopTTS');
        if (this.mAudioPlayer) {
            // fuer Streams
            // this.mAudioPlayer.stopOld();
            // fuer MP3
            this.mAudioPlayer.stopAudio();
            this._onStop();
        }
        return 0;
    };
    return GoogleNLU2;
}(GoogleDevice));

/** @packageDocumentation
 * ASR Anbindung an den Google-Service (Tokenserver)
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module cloud/google/device
 * @author SB
 */
// Konstanten
var GOOGLE_ASRSERVER_URL = 'https://speech.googleapis.com/v1/speech:recognize';
// Anzahl der Volume-Pruefungen, bis ASR-Aufnahme abgebrochen wird
var ASR_MAXVOLUME_COUNTER = 30;
var ASR_TIMEOUTVOLUME_COUNTER$1 = 200;
// Schwellwert fuer Lautstaerke, ab der weiter zugehoert wird
var ASR_MINVOLUME_THRESHOLD$1 = 127.0;
var ASR_MAXVOLUME_THRESHOLD$1 = 128.0;
var GoogleASR2 = /** @class */ (function (_super) {
    __extends(GoogleASR2, _super);
    function GoogleASR2(aConfig, aConnect, aAudioContext, aGetUserMedia, aAudioReader) {
        var _this = _super.call(this, 'GoogleASR2', aConfig, aConnect) || this;
        // Access-Token
        _this.mAccessToken = '';
        _this.mAccessTokenDate = new Date();
        _this.mAccessTokenDuration = 0;
        // HTML5-Komponenten
        _this.mAudioContext = null;
        _this.mGetUserMedia = null;
        // AudioReader, fuer Einlesen von Audiodateien, anstatt das Mikrofon zu benutzen
        _this.mAudioReader = null;
        // weitere Attribute
        _this.mAudioRecorder = null;
        _this.mUserMediaStream = null;
        _this.mRecordingFlag = false;
        _this.mVolumeCounter = 0;
        _this.mTimeoutCounter = 0;
        _this.mAudioContext = aAudioContext;
        _this.mGetUserMedia = aGetUserMedia;
        _this.mAudioReader = aAudioReader;
        // Prefetch des Tokens, dient dem Starten des Tokenservers in der Cloud
        _this.getAccessTokenFromServer();
        return _this;
    }
    // Token-Funktionen
    GoogleASR2.prototype.clearToken = function () {
        this.mAccessToken = '';
        this.mAccessTokenDate = new Date();
        this.mAccessTokenDuration = 0;
    };
    /**
     * Berechnung der Zeitdifferenz zur Bestimmung der Restgueltigkeitsdauer eines Tokens
     */
    GoogleASR2.prototype.getDiffTime = function (date1, date2) {
        return date2.getTime() - date1.getTime();
    };
    /**
     * Token wird direkt vom Tokenserver geholt
     */
    GoogleASR2.prototype.getAccessTokenFromServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, responseJSON, aException_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(this.mConfig.serverUrl, {
                                method: 'GET',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        responseJSON = _a.sent();
                        // console.log('AccessToken: ', responseJSON);
                        this.mAccessTokenDate = new Date();
                        this.mAccessToken = responseJSON.token || '';
                        this.mAccessTokenDuration = responseJSON.time || 0;
                        return [3 /*break*/, 4];
                    case 3:
                        aException_1 = _a.sent();
                        this.mInitFlag = false;
                        this._exception('getAccessTokenFromServer', aException_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Token wird zurueckgegeben
     */
    GoogleASR2.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentDate, diffTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentDate = new Date();
                        diffTime = Math.round(this.getDiffTime(this.mAccessTokenDate, currentDate) / 1000);
                        if (!(diffTime > this.mAccessTokenDuration)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getAccessTokenFromServer()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.mAccessToken];
                }
            });
        });
    };
    /**
     * Detect Intent zurueckgeben
     */
    GoogleASR2.prototype.getSpeechToText = function (aLanguageCode, aEncoding, aAudioData) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, response, responseJSON, aException_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getAccessToken()];
                    case 1:
                        accessToken = _a.sent();
                        return [4 /*yield*/, fetch(GOOGLE_ASRSERVER_URL, {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                    Authorization: "Bearer " + accessToken,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    config: {
                                        encoding: 'LINEAR16',
                                        languageCode: 'de-DE',
                                        sampleRateHertz: 16000
                                    },
                                    audio: {
                                        content: aAudioData
                                    }
                                })
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        responseJSON = _a.sent();
                        // JSON-Nachricht als Ergebnis zurueckgeben
                        if (responseJSON) {
                            // console.log('GoogleASR2.getSpeechToText: ', responseJSON);
                            this._onOptionMessage(responseJSON);
                        }
                        this._onStop();
                        return [2 /*return*/, responseJSON];
                    case 4:
                        aException_2 = _a.sent();
                        this._exception('getSpeechToText', aException_2);
                        this._onStop();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GoogleASR2.prototype.decodeBase64 = function (aBase64Text) {
        if (window.atob) {
            var binary_string = window.atob(aBase64Text);
            var len = binary_string.length;
            var bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }
        return new ArrayBuffer(1);
    };
    GoogleASR2.prototype.encodeBase64 = function (aBuffer) {
        if (window.btoa) {
            var binary = '';
            var bytes = new Uint8Array(aBuffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        }
        return '';
    };
    // Message-Funktionen
    GoogleASR2.prototype._onSpeechResult = function (aResult) {
        if (aResult && aResult.length > 0) {
            var text = aResult[0].transcript;
            var confidence = aResult[0].confidence;
            // console.log('Transkript: ', text, '  Confidence: ', confidence );
            // Ergebnis zurueckgeben
            this._onResult(aResult);
        }
    };
    GoogleASR2.prototype._onSpeechEnd = function () {
        // console.log('GoogleASR2._onSpeechEnd: Ende der Spracheingabe');
    };
    GoogleASR2.prototype._onOptionMessage = function (aMessage) {
        // pruefen auf Spracherkennung
        // console.log('GoogleASR2._onOptionMessage: ', aMessage);
        if (aMessage.results && aMessage.results.length > 0) {
            this._onSpeechResult(aMessage.results[0].alternatives);
        }
    };
    /**
     * Pruefen auf vorhandenem Volumen
     * @param aVolumeData - Audiodaten zum pruefen auf Volumen
     */
    GoogleASR2.prototype.isVolume = function (aVolumeData) {
        this.mVolumeCounter += 1;
        this.mTimeoutCounter += 1;
        if (aVolumeData) {
            try {
                // Berechnung des Volumens
                var length_1 = aVolumeData.length;
                var volumeSum = 0;
                for (var i = 0; i < length_1; i++) {
                    volumeSum += aVolumeData[i] * aVolumeData[i];
                }
                var volume = Math.sqrt(volumeSum / length_1);
                // console.log('GoogleASR2.isVolume:', volume);
                if (volume < ASR_MINVOLUME_THRESHOLD$1 || volume > ASR_MAXVOLUME_THRESHOLD$1) {
                    // console.log('GoogleASR2.isVolume: set Null', volume);
                    this.mVolumeCounter = 0;
                }
            }
            catch (aException) {
                this._exception('isVolume', aException);
            }
        }
        // console.log( 'GoogleASR2.isVolume:', aVolumeData);
        if (this.mVolumeCounter === ASR_MAXVOLUME_COUNTER) {
            // console.log('GoogleASR2.isVolume: VolumeCounter hat beendet')
            return false;
        }
        if (this.mTimeoutCounter === ASR_TIMEOUTVOLUME_COUNTER$1) {
            // console.log('GoogleASR2.isVolume: TimeoutCounter hat beendet')
            return false;
        }
        return true;
    };
    // ASR-Funktionen
    /**
     * Callback-Funktion fuer Ende der Audioaufnahme
     *
     * @param aBuffer - Audiodaten, die an Google gesendet werden
     */
    GoogleASR2.prototype._onEndedFunc = function (aBuffer) {
        // console.log('GoogleASR._onEndedFunc: ', aBuffer);
        // wird asynchron ausgefuhert
        this.getSpeechToText('de-DE', 'LINEAR16', this.encodeBase64(aBuffer));
    };
    /**
     * hier wird ein Audio uebertragen
     *
     * @param aOption
     */
    GoogleASR2.prototype._startAudio = function (aOption) {
    };
    /**
     * Echtzeitstreamen vom Mikrophon zur Sprachernkennung
     *
     * @param aOption
     */
    GoogleASR2.prototype._startASR = function (aOption) {
        // console.log('GoogleASR2._startASR:', aOption);
        var _this = this;
        this.mVolumeCounter = 0;
        this.mTimeoutCounter = 0;
        // Audiosource einrichten
        try {
            this.mAudioRecorder = new AudioRecorder(null, this.mAudioContext, function (aVolumeData) {
                // console.log( 'GoogleASR2._startASR: volumeCallback ' + aVolumeData + '\n\n\n');
                if (!_this.isVolume(aVolumeData)) {
                    _this._stop();
                }
            });
            // pruefen auf Mikrofon oder Audiodaten
            if (aOption.userMediaStream) {
                this.mAudioRecorder.start(aOption.userMediaStream, GOOGLE_PCM_CODEC);
            }
            else if (aOption.audioData) {
                this.mAudioRecorder.startAudio(aOption.audioData, GOOGLE_PCM_CODEC);
            }
            else {
                // console.log('GoogleASR2._startASR: keine Audiodaten vorhanden');
                this._error('_startASR', 'keine Audiodaten vorhanden');
                this._stop();
                return;
            }
            this.mRecordingFlag = true;
        }
        catch (aException) {
            this._exception('_startASR', aException);
            this._stop();
        }
    };
    /**
     * startet die Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */
    GoogleASR2.prototype._start = function (aOption) {
        var _this = this;
        // console.log('GoogleASR2._start:', aOption.language);
        if (this.mRecordingFlag) {
            this._error('_start', 'ASR laeuft bereits');
            return -1;
        }
        // TODO: Hier muss zwischen vorhandenen Audiodaten zum Streamen und dem Mikrofon
        //       als Audioquelle unterschieden werden.
        if (aOption && aOption.audioURL) {
            var option = {
                audioURL: aOption.audioURL,
                language: aOption.language
            };
            try {
                this._startAudio(option);
            }
            catch (aException) {
                this._exception('_start', aException);
            }
        }
        else {
            if (!this.mGetUserMedia) {
                this._error('_start', 'kein getUserMedia vorhanden');
                return -1;
            }
            try {
                // Verbindung mit dem Mikrofon herstellen ueber einen Stream
                // console.log('NuanceASR._start: getUserMedia = ', this.mGetUserMedia);
                this.mGetUserMedia({ audio: true, video: false }).then(function (stream) {
                    // console.log('GoogleASR2._start: getUserMedia = ', stream);
                    _this.mUserMediaStream = stream;
                    var option = {
                        userMediaStream: _this.mUserMediaStream,
                        language: aOption.language
                    };
                    _this._startASR(option);
                }, function (aError) {
                    // console.log('NuanceASR._start: getMediaError', aError);
                    _this._onError(new Error('ASR-Error: kein UserMedia erzeugt'));
                    _this._error('_start', 'keine UserMedia erzeugt: ' + aError.message);
                    // hier muss die ASR sofort beendet werden
                    _this._onStop();
                });
                return 0;
            }
            catch (aException) {
                this._exception('_start', aException);
                return -1;
            }
        }
        this._error('_start', 'ASR ist nicht implementiert');
        return -1;
    };
    /**
     * Beenden der Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */
    GoogleASR2.prototype._stop = function () {
        var _this = this;
        // console.log('GoogleASR2._stop: start');
        this.mRecordingFlag = false;
        if (!this.mAudioRecorder) {
            return 0;
        }
        try {
            this.mAudioRecorder.stop(function (aBuffer) {
                _this._onEndedFunc(aBuffer);
            });
            this.mAudioRecorder = null;
            // console.log('GoogleASR2._stop: end');
            return 0;
        }
        catch (aException) {
            this._exception('_stop', aException);
            return -1;
        }
    };
    return GoogleASR2;
}(GoogleDevice));

/** @packageDocumentation
 * TTS2 Anbindung an den Google-Service (Tokenserver)
 *
 * Letzte Aenderung: 30.05.2020
 * Status: rot
 *
 * @module cloud/google/device
 * @author SB
 */
// Konstanten
var GOOGLE_TTSSERVER_URL = 'https://texttospeech.googleapis.com/v1/text:synthesize';
var GoogleTTS2 = /** @class */ (function (_super) {
    __extends(GoogleTTS2, _super);
    /**
     * Erzeugt eine Instanz von GoogleTTS
     *
     * @param aConfig - Konfigurationsobjekt
     * @param aConnect - Verbindungsobjekt
     */
    function GoogleTTS2(aConfig, aConnect, aAudioContext) {
        var _this = _super.call(this, 'GoogleTTS2', aConfig, aConnect) || this;
        // Access-Token
        _this.mAccessToken = '';
        _this.mAccessTokenDate = new Date();
        _this.mAccessTokenDuration = 0;
        // Audio
        _this.mAudioContext = null;
        _this.mAudioPlayer = null;
        _this.mAudioContext = aAudioContext;
        // Prefetch des Tokens, dient dem Starten des Tokenservers in der Cloud
        _this.getAccessTokenFromServer();
        return _this;
    }
    // Token-Funktionen
    GoogleTTS2.prototype.clearToken = function () {
        this.mAccessToken = '';
        this.mAccessTokenDate = new Date();
        this.mAccessTokenDuration = 0;
    };
    /**
     * Berechnung der Zeitdifferenz zur Bestimmung der Restgueltigkeitsdauer eines Tokens
     */
    GoogleTTS2.prototype.getDiffTime = function (date1, date2) {
        return date2.getTime() - date1.getTime();
    };
    /**
     * Token wird direkt vom Tokenserver geholt
     */
    GoogleTTS2.prototype.getAccessTokenFromServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, responseJSON, aException_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(this.mConfig.serverUrl, {
                                method: 'GET',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        responseJSON = _a.sent();
                        // console.log('AccessToken: ', responseJSON);
                        this.mAccessTokenDate = new Date();
                        this.mAccessToken = responseJSON.token || '';
                        this.mAccessTokenDuration = responseJSON.time || 0;
                        return [3 /*break*/, 4];
                    case 3:
                        aException_1 = _a.sent();
                        this.mInitFlag = false;
                        this._exception('getAccessTokenFromServer', aException_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Token wird zurueckgegeben
     */
    GoogleTTS2.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentDate, diffTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentDate = new Date();
                        diffTime = Math.round(this.getDiffTime(this.mAccessTokenDate, currentDate) / 1000);
                        if (!(diffTime > this.mAccessTokenDuration)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getAccessTokenFromServer()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.mAccessToken];
                }
            });
        });
    };
    /**
     * Detect Intent zurueckgeben
     */
    GoogleTTS2.prototype.getTextToSpeech = function (aText, aLanguage, aVoice, aFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, response, responseJSON;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAccessToken()];
                    case 1:
                        accessToken = _a.sent();
                        return [4 /*yield*/, fetch(GOOGLE_TTSSERVER_URL, {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                    Authorization: "Bearer " + accessToken,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    input: {
                                        text: aText
                                    },
                                    voice: {
                                        languageCode: aLanguage,
                                        name: aVoice
                                    },
                                    audioConfig: {
                                        audioEncoding: aFormat
                                    }
                                })
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        responseJSON = _a.sent();
                        // console.log('GoogleTTS2.getTextToSpeak: ', responseJSON);
                        return [2 /*return*/, responseJSON];
                }
            });
        });
    };
    GoogleTTS2.prototype.decodeBase64 = function (aBase64Text) {
        if (window.atob) {
            var binary_string = window.atob(aBase64Text);
            var len = binary_string.length;
            var bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }
        return new ArrayBuffer(1);
    };
    /**
     * TTS starten
     *
     * @param aOptions
     */
    GoogleTTS2.prototype._start = function (aOptions) {
        var _this = this;
        // console.log('GoogleTTS2._start:', aOptions);
        try {
            if (!this.mConfig.serverUrl) {
                this._error('_start', 'kein Tokenserver vorhanden');
                return;
            }
            // Hier wird die Antwort zurueckgegeben
            this.getTextToSpeech(aOptions.text, aOptions.language, aOptions.voice, 'MP3').then(function (aResponse) {
                // console.log('GoogleTTS2._start: response = ', aResponse );
                try {
                    // Audioplayer erzeugen
                    _this.mAudioPlayer = new AudioPlayer(_this.mAudioContext);
                    _this.mAudioPlayer.start();
                    var options = {
                        // codec: GOOGLE_PCM_CODEC,
                        onaudiostart: function () {
                            // console.log('Audioplayer gestartet');
                        },
                        onaudioend: function () {
                            // console.log('Audioplayer beenden');
                            _this._stop();
                        }
                    };
                    // Stream dekodieren
                    // this.mAudioPlayer.decodeOld( options, aData );
                    // MP3-Audio dekodieren
                    var audioContent = aResponse.audioContent;
                    // console.log('GoogleTTS2._start:', audioContent);
                    _this.mAudioPlayer.decodeAudio(options, _this.decodeBase64(audioContent));
                    _this._onResult(aResponse);
                }
                catch (aException) {
                    _this._onError(new Error('TTS2-Exception: ' + aException.message));
                }
                // this._onStop();
            }, function (aError) {
                // console.log('GoogleTTS2._start: Promise-Error ', aError)
                _this._onError(new Error('TTS2-Error: ' + aError.message));
                _this._onStop();
            });
            return 0;
        }
        catch (aException) {
            this._exception('_start', aException);
            return -1;
        }
    };
    GoogleTTS2.prototype._stop = function () {
        // console.log('GoogleTTS2._stop');
        // this.mConnect.sendJSON( audioEndMessage );
        if (this.mAudioPlayer) {
            // fuer Streams
            // this.mAudioPlayer.stopOld();
            // fuer MP3
            this.mAudioPlayer.stopAudio();
            this._onStop();
        }
        return 0;
    };
    return GoogleTTS2;
}(GoogleDevice));

/** @packageDocumentation
 * GooglePort zur Verbindung des Google Cloud-Service mit dem Framework
 * Stellt Grundfunktionen von Google zur Verfuegung. Werden von mehreren anderen
 * Komponenten geteilt.
 *
 * Letzte Aenderung: 20.06.2020
 * Status: rot
 *
 * @module cloud/google
 * @author SB
 */
// Konstanten
// Zeit die im Unlock-Event auf RESUME gewartet wird
var AUDIO_UNLOCK_TIMEOUT = 2000;
// Default Timeout fuer die Dauer einer Action, maximal eine Minute darf die Verarbeitung einer Action dauern,
// danach wird Stop erzwungen.
var GOOGLE_ACTION_TIMEOUT = 60000;
/**
 * Definiert die GooglePort-Klasse
 */
var GooglePort = /** @class */ (function (_super) {
    __extends(GooglePort, _super);
    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */
    function GooglePort(aPortName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var _this = _super.call(this, aPortName || GOOGLE_PORT_NAME, aRegisterFlag) || this;
        // externe Html5-Komponenten
        _this.mAudioContext = null;
        _this.mGetUserMedia = null;
        // externes Google-Objekt
        _this.mGoogleServerFlag = false;
        _this.mGoogleConfig = null;
        _this.mGoogleNetwork = null;
        _this.mGoogleWebSocket = null;
        _this.mGoogleConnect = null;
        _this.mGoogleTTS = null;
        _this.mGoogleASR = null;
        _this.mGoogleNLU = null;
        _this.mGoogleNLU2 = null;
        _this.mGoogleNLU2Flag = GOOGLE_NLU2_FLAG;
        // weitere Attribute
        _this.mDynamicCredentialsFlag = false;
        _this.mTransaction = null;
        _this.mRunningFlag = false;
        _this.mDefaultOptions = null;
        _this.mActionTimeoutId = 0;
        _this.mActionTimeout = GOOGLE_ACTION_TIMEOUT;
        return _this;
    }
    // Port-Funktionen
    /**
     * pruefen auf Server-Verbindung
     *
     * @return {boolean} true, Port hat Server-Verbindung, false sonst
     */
    GooglePort.prototype.isServer = function () {
        return this.mGoogleServerFlag;
    };
    /**
     * pruefen auf Mock-Port zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Port ein Mock zum Testen ist
     */
    GooglePort.prototype.isMock = function () {
        return false;
    };
    /**
     * Rueckgabe eines logischen Port-Typs
     *
     * @return {string} logischer Typ des Ports fuer unterschiedliche Anwendungsschnittstellen
     */
    GooglePort.prototype.getType = function () {
        return GOOGLE_TYPE_NAME;
    };
    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */
    GooglePort.prototype.getClass = function () {
        return 'GooglePort';
    };
    GooglePort.prototype.getVersion = function () {
        return GOOGLE_API_VERSION;
    };
    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */
    GooglePort.prototype._checkCredentials = function (aOption) {
        // console.log('GooglePort._checkCredentials: ', aOption);
        if (!aOption) {
            return false;
        }
        // App-Parameter pruefen
        // TODO: jetzt erst mal nur ACCESS-TOKEN (AppKey) von Dialogflow V1 bis Oktober 2019
        var nlu2Flag = true;
        if (typeof aOption.dialogflowTokenServerUrl !== 'string') {
            nlu2Flag = false;
        }
        if (!aOption.dialogflowTokenServerUrl) {
            nlu2Flag = false;
        }
        if (typeof aOption.dialogflowProjectId !== 'string') {
            nlu2Flag = false;
        }
        if (!aOption.dialogflowProjectId) {
            nlu2Flag = false;
        }
        // console.log( 'GooglePort._checkCredentials: NLU2 = ', nlu2Flag);
        if (!nlu2Flag) {
            if (typeof aOption.googleAppKey !== 'string') {
                return false;
            }
            if (!aOption.googleAppKey) {
                return false;
            }
        }
        this.mGoogleNLU2Flag = nlu2Flag;
        // App-Parameter sind vorhanden
        return true;
    };
    /**
     * alle inneren Objekte initialisieren
     *
     * @param aOption - optionale Parameter
     */
    GooglePort.prototype._initAllObject = function (aOption) {
        // console.log('GooglePort._initAllObject:', aOption);
        // innere Komponenten eintragen
        var _this = this;
        var fileReader = new FileHtml5Reader();
        fileReader.init();
        var audioReader = new AudioHtml5Reader();
        audioReader.init({ audioContext: this.mAudioContext });
        this.mGoogleConfig = new GoogleConfig(fileReader);
        if (this.mGoogleConfig.init(aOption) !== 0) {
            return -1;
        }
        // Network-Anbindung erzeugen
        this.mGoogleNetwork = new GoogleNetwork();
        this.mGoogleNetwork.onOnline = function () { return _this._onOnline(); };
        this.mGoogleNetwork.onOffline = function () { return _this._onOffline(); };
        this.mGoogleNetwork.onError = function (aError) { return _this._onError(aError); };
        if (this.mGoogleNetwork.init(aOption) !== 0) {
            return -1;
        }
        // pruefen auf vorhandenen Server
        if (this.isServer()) {
            // WebSocket-Anbindung erzeugen und WebSocket API pruefen
            this.mGoogleWebSocket = new GoogleWebSocket();
            this.mGoogleWebSocket.onOpen = function (aUrl) { return _this._onOpen(); };
            this.mGoogleWebSocket.onClose = function () { return _this._onClose(); };
            this.mGoogleWebSocket.onError = function (aError) { return _this._onError(aError); };
            if (this.mGoogleWebSocket.init(aOption) !== 0) {
                return -1;
            }
        }
        this.mGoogleConnect = new GoogleConnect(this.mGoogleConfig, this.mGoogleWebSocket);
        // Google-Komponenten erzeugen
        this.mGoogleNLU = new GoogleNLU(this.mGoogleConfig, this.mGoogleConnect);
        this.mGoogleNLU.onStart = function (aTransaction) { return _this._onStart(aTransaction.plugin, aTransaction.type); };
        this.mGoogleNLU.onStop = function (aTransaction) { return _this._onStop(aTransaction.plugin, aTransaction.type); };
        this.mGoogleNLU.onResult = function (aTransaction) { return _this._onResult(aTransaction.result, aTransaction.plugin, aTransaction.type); };
        this.mGoogleNLU.onError = function (aTransaction) { return _this._onError(aTransaction.error, aTransaction.plugin, aTransaction.type); };
        this.mGoogleNLU.onClose = function (aTransaction) { return _this._onClose(); };
        this.mGoogleNLU2 = new GoogleNLU2(this.mGoogleConfig, this.mGoogleConnect, this.mAudioContext, this.mGetUserMedia);
        this.mGoogleNLU2.onStart = function (aTransaction) { return _this._onStart(aTransaction.plugin, aTransaction.type); };
        this.mGoogleNLU2.onStop = function (aTransaction) { return _this._onStop(aTransaction.plugin, aTransaction.type); };
        this.mGoogleNLU2.onResult = function (aTransaction) { return _this._onResult(aTransaction.result, aTransaction.plugin, aTransaction.type); };
        this.mGoogleNLU2.onError = function (aTransaction) { return _this._onError(aTransaction.error, aTransaction.plugin, aTransaction.type); };
        this.mGoogleNLU2.onClose = function (aTransaction) { return _this._onClose(); };
        // pruefen auf Server und Audiokontext, nur dann koennen TTS und ASR verwendet werden
        if (this.mAudioContext) {
            // laden der Google-TTS2 mit Tokenserver
            // this.mGoogleTTS = new GoogleTTS( this.mGoogleConfig, this.mGoogleConnect, this.mAudioContext );
            this.mGoogleTTS = new GoogleTTS2(this.mGoogleConfig, this.mGoogleConnect, this.mAudioContext);
            this.mGoogleTTS.onStart = function (aTransaction) { return _this._onStart(aTransaction.plugin, aTransaction.type); };
            this.mGoogleTTS.onStop = function (aTransaction) { return _this._onStop(aTransaction.plugin, aTransaction.type); };
            this.mGoogleTTS.onResult = function (aTransaction) { return _this._onResult(aTransaction.result, aTransaction.plugin, aTransaction.type); };
            this.mGoogleTTS.onError = function (aTransaction) { return _this._onError(aTransaction.error, aTransaction.plugin, aTransaction.type); };
            this.mGoogleTTS.onClose = function (aTransaction) { return _this._onClose(); };
            // console.log('GooglePort._initAllObject: googleTTS = ', this.mGoogleTTS);
            try {
                // if ( this.isServer() && this.mGetUserMedia ) {
                if (this.mGetUserMedia) {
                    // ASR kann nur verwendet werden, wenn getUserMedia vorhanden ist
                    this.mGoogleASR = new GoogleASR2(this.mGoogleConfig, this.mGoogleConnect, this.mAudioContext, this.mGetUserMedia, audioReader);
                    this.mGoogleASR.onStart = function (aTransaction) { return _this._onStart(aTransaction.plugin, aTransaction.type); };
                    this.mGoogleASR.onStop = function (aTransaction) { return _this._onStop(aTransaction.plugin, aTransaction.type); };
                    this.mGoogleASR.onResult = function (aTransaction) { return _this._onResult(aTransaction.result, aTransaction.plugin, aTransaction.type); };
                    this.mGoogleASR.onError = function (aTransaction) { return _this._onError(aTransaction.error, aTransaction.plugin, aTransaction.type); };
                    this.mGoogleASR.onClose = function (aTransaction) { return _this._onClose(); };
                    // console.log('GooglePort._initAllObject: googleASR = ', this.mGoogleASR);
                }
            }
            catch (aException) {
                this._exception('_initAllObject', aException);
            }
        }
        return 0;
    };
    /**
     * initialisert den Port
     *
     * Folgende Parameter muessen uebergeben werden, da sonst der Port nicht initalisiert wird:
     *
     *      googleAppId     - Google Credentials fuer APP_ID
     *      googleAppKey    - Google Credentials fuer APP_KEY
     *
     * erlaubte optionale Parameter:
     *
     *      activeFlag      - legt fest, ob der Port zum Start aktiviert ist oder nicht
     *      errorOutputFlag - legt fest, ob die Fehlerausgabe auf der Konsole erfolgt
     *
     *
     * @param {any} aOption - optionale Parameter fuer die Konfiguration des Plugins
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    GooglePort.prototype.init = function (aOption) {
        // console.log('GooglePort.init:', aOption);
        if (this.mInitFlag) {
            this._error('init', 'Port ist bereits initialisiert');
            return 0;
        }
        // pruefen auf dynamische Credentials
        if (aOption && typeof aOption.googleDynamicCredentialsFlag === 'boolean' && aOption.googleDynamicCredentialsFlag) {
            // dynamische Credentials koennen gesetzt werden
            this.mDynamicCredentialsFlag = true;
        }
        else {
            // pruefen auf Google App-Credientials Uebergabe
            if (!this._checkCredentials(aOption)) {
                this._error('init', 'kein AppKey als Parameter uebergeben');
                return -1;
            }
        }
        // pruefen auf Server-Flag
        if (aOption && typeof aOption.googleServerFlag === 'boolean' && aOption.googleServerFlag) {
            this.mGoogleServerFlag = true;
        }
        // AudioContext
        var audioContextFactory = FactoryManager.get(AUDIOCONTEXT_FACTORY_NAME, AudioContextFactory);
        if (audioContextFactory) {
            // TODO: eventuell sollte die AudoContextFactory gleich ein AudioContext-Objekt erzeugen ?
            var audioContextClass = audioContextFactory.create();
            if (audioContextClass) {
                this.mAudioContext = new audioContextClass();
            }
        }
        // getUserMedia
        var getUserMediaFactory = FactoryManager.get(USERMEDIA_FACTORY_NAME, UserMediaFactory);
        if (getUserMediaFactory) {
            this.mGetUserMedia = getUserMediaFactory.create();
        }
        // innere Objekte erzeugen
        if (this._initAllObject(aOption) !== 0) {
            return -1;
        }
        // Initialisierung von Port
        if (_super.prototype.init.call(this, aOption) !== 0) {
            return -1;
        }
        // Debug-Ausgabe fuer Google-Komponenten
        if (this.isErrorOutput()) {
            if (this.mGoogleNLU) {
                console.log('GooglePort: NLU ist vorhanden');
            }
            else {
                console.log('GooglePort: NLU ist nicht vorhanden');
            }
            if (this.mGoogleNLU2) {
                console.log('GooglePort: NLU2 ist vorhanden');
            }
            else {
                console.log('GooglePort: NLU2 ist nicht vorhanden');
            }
            if (this.mGoogleTTS) {
                console.log('GooglePort: TTS ist vorhanden');
            }
            else {
                console.log('GooglePort: TTS ist nicht vorhanden');
            }
            if (this.mGoogleASR) {
                console.log('GooglePort: ASR ist vorhanden');
            }
            else {
                console.log('GooglePort: ASR ist nicht vorhanden');
            }
        }
        return 0;
    };
    /**
     * gibt den Port frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    GooglePort.prototype.done = function () {
        _super.prototype.done.call(this);
        // Timeout loeschen 
        this._clearActionTimeout();
        // Audiokontext schliessen
        if (this.mAudioContext) {
            this.mAudioContext.close();
        }
        this.mAudioContext = null;
        this.mGetUserMedia = null;
        // externes Google-Objekt
        if (this.mGoogleConnect) {
            this.mGoogleConnect.disconnect();
            this.mGoogleConnect = null;
        }
        if (this.mGoogleWebSocket) {
            this.mGoogleWebSocket.done();
            this.mGoogleWebSocket = null;
        }
        if (this.mGoogleNetwork) {
            this.mGoogleNetwork.done();
            this.mGoogleNetwork = null;
        }
        if (this.mGoogleConfig) {
            this.mGoogleConfig.done();
            this.mGoogleConfig = null;
        }
        this.mGoogleTTS = null;
        this.mGoogleASR = null;
        this.mGoogleNLU = null;
        this.mGoogleNLU2 = null;
        this.mGoogleServerFlag = false;
        // weitere Attribute
        this.mDynamicCredentialsFlag = false;
        this.mTransaction = null;
        this.mRunningFlag = false;
        this.mDefaultOptions = null;
        this.mActionTimeoutId = 0;
        this.mActionTimeout = GOOGLE_ACTION_TIMEOUT;
        return 0;
    };
    /**
     * setzt den Port wieder auf Defaultwerte und uebergebene optionale Parameter.
     * Die Fehlerausgabe wird nicht zurueckgesetzt.
     *
     * @param {any} aOption - optionale Parameter
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    GooglePort.prototype.reset = function (aOption) {
        this.mTransaction = null;
        this.mRunningFlag = false;
        return _super.prototype.reset.call(this, aOption);
    };
    // Fehler-Funktionen
    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */
    GooglePort.prototype._setErrorOutput = function (aErrorOutputFlag) {
        _super.prototype._setErrorOutput.call(this, aErrorOutputFlag);
        if (this.mGoogleConfig) {
            this.mGoogleConfig._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mGoogleNetwork) {
            this.mGoogleNetwork._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mGoogleWebSocket) {
            this.mGoogleWebSocket._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mGoogleConnect) {
            this.mGoogleConnect._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mGoogleTTS) {
            this.mGoogleTTS._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mGoogleASR) {
            this.mGoogleASR._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mGoogleNLU) {
            this.mGoogleNLU._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mGoogleNLU2) {
            this.mGoogleNLU2._setErrorOutput(aErrorOutputFlag);
        }
    };
    // Timeout-Funktionen
    /**
     * Aktion wird abgebrochen
     */
    GooglePort.prototype._breakAction = function () {
        // console.log('GooglePort._beakAction');
        this.mActionTimeoutId = 0;
        if (this.mTransaction) {
            this._error('_breakAction', 'Timeout fuer Action erreicht');
            this._onStop(this.mTransaction.plugin, this.mTransaction.type);
        }
    };
    /**
     * Timeout fuer Aktion setzen. Timeout wird nur gesetzt, wenn > 0
     */
    GooglePort.prototype._setActionTimeout = function () {
        var _this = this;
        // console.log('GooglePort._setActionTimeout');
        if (this.mActionTimeoutId === 0 && this.mActionTimeout > 0) {
            this.mActionTimeoutId = window.setTimeout(function () { return _this._breakAction(); }, this.mActionTimeout);
        }
    };
    /**
     * Timeout fuer Aktion loeschen
     */
    GooglePort.prototype._clearActionTimeout = function () {
        // console.log('GooglePort._clearActionTimeout');
        if (this.mActionTimeoutId > 0) {
            clearTimeout(this.mActionTimeoutId);
            this.mActionTimeoutId = 0;
        }
    };
    // Event-Funktionen
    /**
     * Ereignisfunktion fuer Online aufrufen
     *
     * @private
     *
     * @return {number} errorCode(0,-1)
     */
    GooglePort.prototype._onOnline = function () {
        // console.log('GooglePort._onOnline');
        // TODO: muss hier nicht geoeffnet werden, collidiert mit sich schliessender WebSocket
        // this.open();
        return 0;
    };
    /**
     * Ereignisfunktion fuer Offline aufrufen
     *
     * @private
     *
     * @return {number} errorCode(0,-1)
     */
    GooglePort.prototype._onOffline = function () {
        // console.log('GooglePort._onOffline');
        this.close();
        return 0;
    };
    /**
     * Ereignisfunktion fuer Stop aufrufen
     *
     * @private
     * @param {string} aDest - Ziel der Operation
     * @param {string} aType - Typ der Operation
     *
     * @return {number} errorCode(0,-1)
     */
    GooglePort.prototype._onStop = function (aDest, aType) {
        // console.log('GooglePort._onStop: Transaktion wird beendet', aDest, aType);
        // hier muss der Timeout geloescht werden, da die Transaktion zu Ende ist
        this._clearActionTimeout();
        // Hier wird die Verbindung zu onMessage der WebSocket geloescht
        if (this.mGoogleConnect) {
            this.mGoogleConnect.disconnect();
        }
        var result = _super.prototype._onStop.call(this, aDest, aType);
        // hier muss die Transaktion geloescht werden, da sie beendet ist
        this.mTransaction = null;
        this.mRunningFlag = false;
        return result;
    };
    // Audio-Funktionen
    /**
     * Versuch, AudioContext zu entsperren
     */
    GooglePort.prototype._unlockAudio = function (aCallbackFunc) {
        // console.log('GooglePort._unlockAudio: start');
        // Timeout einstellen, um garantiert ein UnlockEvent zu erhalten
        if (this.mAudioContext) {
            if (this.mAudioContext.state === 'running') {
                aCallbackFunc(true);
                return;
            }
            if (this.mAudioContext.state === 'suspended') {
                // console.log('GooglePort._unlockAudio: start', this.mAudioContext.state);
                var timeoutId_1 = setTimeout(function () { return aCallbackFunc(false); }, AUDIO_UNLOCK_TIMEOUT);
                this.mAudioContext.resume().then(function () {
                    // console.log('GooglePort._unlockAudio: state = ', this.mAudioContext.state);
                    clearTimeout(timeoutId_1);
                    aCallbackFunc(true);
                }, function (aError) {
                    console.log('GooglePort._unlockAudio:', aError);
                    clearTimeout(timeoutId_1);
                    aCallbackFunc(false);
                });
            }
            else {
                aCallbackFunc(false);
            }
        }
        else {
            aCallbackFunc(false);
        }
    };
    // Port-Funktionen
    /**
     * Dynamische Konfiguration des Ports
     *
     * @param {GoogleConfigDataInterface} aConfigData - Konfigurationsdaten { googleAppKey: '', googleAppId: '', googleNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GooglePort.prototype.setConfig = function (aConfigData) {
        if (this.mDynamicCredentialsFlag) {
            // Uebertragen der neuen Credentials
            try {
                /****
                if ( typeof aConfigData.googleAppId === 'string' && aConfigData.googleAppId ) {
                    this.mGoogleConfig.appId = aConfigData.googleAppId;
                }
                ****/
                if (typeof aConfigData.googleAppKey === 'string' && aConfigData.googleAppKey) {
                    if (this.mGoogleConfig.appKey !== aConfigData.googleAppKey) {
                        this.mGoogleConfig.appKey = aConfigData.googleAppKey;
                        // Loeschen der Token, nur wenn sich der Wert geaendert hat
                        this.mGoogleASR.clearToken();
                        this.mGoogleTTS.clearToken();
                    }
                }
                if (typeof aConfigData.googleServerUrl === 'string' && aConfigData.googleServerUrl) {
                    if (this.mGoogleConfig.serverUrl !== aConfigData.googleServerUrl) {
                        this.mGoogleConfig.serverUrl = aConfigData.googleServerUrl;
                        // Loeschen der Token, nur wenn sich der Wert geaendert hat
                        this.mGoogleASR.clearToken();
                        this.mGoogleTTS.clearToken();
                    }
                }
                if (typeof aConfigData.dialogflowTokenServerUrl === 'string' && aConfigData.dialogflowTokenServerUrl) {
                    if (this.mGoogleConfig.dialogflowTokenServerUrl !== aConfigData.dialogflowTokenServerUrl) {
                        this.mGoogleConfig.dialogflowTokenServerUrl = aConfigData.dialogflowTokenServerUrl;
                        // Loeschen der Token, nur wenn sich der Wert geaendert hat
                        this.mGoogleNLU2.clearToken();
                    }
                }
                if (typeof aConfigData.dialogflowProjectId === 'string' && aConfigData.dialogflowProjectId) {
                    if (this.mGoogleConfig.dialogflowProjectId !== aConfigData.dialogflowProjectId) {
                        this.mGoogleConfig.dialogflowProjectId = aConfigData.dialogflowProjectId;
                        // Loeschen der Token, nur wenn sich der Wert geaendert hat
                        this.mGoogleNLU2.clearToken();
                    }
                }
                if (typeof aConfigData.dialogflowSessionId === 'string' && aConfigData.dialogflowSessionId) {
                    if (this.mGoogleConfig.dialogflowSessionId !== aConfigData.dialogflowSessionId) {
                        this.mGoogleConfig.dialogflowSessionId = aConfigData.dialogflowSessionId;
                    }
                }
                if (typeof aConfigData.dialogflowEnvironmentName === 'string' && aConfigData.dialogflowEnvironmentName) {
                    if (this.mGoogleConfig.dialogflowEnvironmentName !== aConfigData.dialogflowEnvironmentName) {
                        this.mGoogleConfig.dialogflowEnvironmentName = aConfigData.dialogflowEnvironmentName;
                    }
                }
                /****
                if ( typeof aConfigData.googleNluTag === 'string' && aConfigData.googleNluTag ) {
                    this.mGoogleConfig.nluTag = aConfigData.googleNluTag;
                }
                ****/
                return 0;
            }
            catch (aException) {
                this._exception('setConfig', aException);
                return -1;
            }
        }
        else {
            this._error('setConfig', 'Keine dynamischen Credentials erlaubt');
            return -1;
        }
    };
    /**
     * Rueckgabe der aktuellen Port-Konfiguration
     *
     * @return {GoogleConfigDataInterface} aktuelle Portkonfigurationsdaten
     */
    GooglePort.prototype.getConfig = function () {
        var configData = {
            // googleAppId: this.mGoogleConfig.appId,
            googleAppKey: this.mGoogleConfig.appKey,
            googleServerUrl: this.mGoogleConfig.serverUrl,
            dialogflowTokenServerUrl: this.mGoogleConfig.dialogflowTokenServerUrl,
            dialogflowProjectId: this.mGoogleConfig.dialogflowProjectId,
            dialogflowSessionId: this.mGoogleConfig.dialogflowSessionId,
            dialogflowEnvironmentName: this.mGoogleConfig.dialogflowEnvironmentName
            // googleNluTag: this.mGoogleConfig.nluTag
        };
        return configData;
    };
    /**
     * Pruefen auf Netzwerk-Verbindung
     *
     * @return {boolean} True, wenn Netwerk verbunden ist, ansonsten false
     */
    GooglePort.prototype.isOnline = function () {
        if (this.mGoogleNetwork) {
            return this.mGoogleNetwork.isOnline();
        }
        return false;
    };
    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */
    GooglePort.prototype.isOpen = function () {
        // pruefen auf Server
        if (!this.isServer()) {
            return true;
        }
        return this._isConnect();
    };
    /**
     * Pruefen und Oeffnen der WebSocket, wenn moeglich
     *
     * @private
     * @param aOpenCallbackFunc - Callback fuer WebSocket geoeffnet oder nicht
     */
    GooglePort.prototype._checkOpen = function (aOpenCallbackFunc) {
        var _this = this;
        // console.log('GooglePort.checkOpen:', this.isErrorOutput());
        // pruefen auf Server
        if (!this.isServer()) {
            // console.log('GooglePort._checkOpen: kein Server vorhanden');
            aOpenCallbackFunc(true);
            return 0;
        }
        // pruefen, ob Netzwerk vorhanden ist
        if (!this.isOnline()) {
            // console.log('GooglePort._checkOpen: kein Netz vorhanden');
            this._error('_checkOpen', 'kein Netz vorhanden');
            aOpenCallbackFunc(false);
            return -1;
        }
        // pruefen ob WebSocket geoeffnet ist
        if (this.isOpen()) {
            // console.log('GooglePort._checkOpen: WebSocket ist geoeffnet');
            aOpenCallbackFunc(true);
            return 0;
        }
        // pruefen auf Closing
        if (this.mGoogleWebSocket.getState() === 'CLOSING') {
            // console.log('GooglePort._checkOpen: WebSocket wird geschlossen');
            this._error('_checkOpen', 'Websocket wird geschlossen');
            aOpenCallbackFunc(false);
            return -1;
        }
        // WebSocket pruefen
        if (!this.mGoogleWebSocket) {
            // console.log('GooglePort._checkOpen: WebSocket nicht vorhanden');
            this._error('_checkOpen', 'Websocket ist nicht vorhanden');
            aOpenCallbackFunc(false);
            return -1;
        }
        // WebSocket oeffnen
        this.mGoogleWebSocket.onOpen = function (aUrl) {
            // console.log('GooglePort._checkOpen: onOpen Event');
            // alte Funktion wieder eintragen
            _this.mGoogleWebSocket.onOpen = function (aUrl) { return _this._onOpen(); };
            _this.mGoogleWebSocket.onClose = function () { return _this._onClose(); };
            _this.mGoogleWebSocket.onError = function (aError) { return _this._onError(aError); };
            aOpenCallbackFunc(true);
            return 0;
        };
        // WebSocket schliessen
        this.mGoogleWebSocket.onClose = function () {
            // console.log('GooglePort._checkOpen: onClose Event');
            // alte Funktion wieder eintragen
            _this.mGoogleWebSocket.onOpen = function (aUrl) { return _this._onOpen(); };
            _this.mGoogleWebSocket.onClose = function () { return _this._onClose(); };
            _this.mGoogleWebSocket.onError = function (aError) { return _this._onError(aError); };
            aOpenCallbackFunc(false);
            return 0;
        };
        // WebSocket Fehler behandeln
        this.mGoogleWebSocket.onError = function (aError) {
            // console.log('GooglePort._checkOpen: onError Event:', aError);
            // alte Funktion wieder eintragen
            _this.mGoogleWebSocket.onOpen = function (aUrl) { return _this._onOpen(); };
            _this.mGoogleWebSocket.onClose = function () { return _this._onClose(); };
            _this.mGoogleWebSocket.onError = function (aError) { return _this._onError(aError); };
            aOpenCallbackFunc(false);
            return 0;
        };
        // Websocket oeffnen
        return this.open();
    };
    /**
     * Port oeffnen und mit Server verbinden
     *
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GooglePort.prototype.open = function (aOption) {
        // pruefen auf Server
        if (!this.isServer()) {
            this._onOpen();
            return 0;
        }
        return this._connect(aOption);
    };
    /**
     * Port schliessen und Server-Verbindung trennen
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GooglePort.prototype.close = function () {
        // pruefen auf Server
        if (!this.isServer()) {
            this._onClose();
            return 0;
        }
        return this._disconnect();
    };
    // Connection zum Server
    GooglePort.prototype._isConnect = function () {
        // pruefen auf WebSocket
        if (this.mGoogleWebSocket) {
            // console.log('GooglePort._isConnect:', this.mGoogleWebSocket.getState());
            return this.mGoogleWebSocket.isConnect();
        }
        return false;
    };
    /**
     * WebSocket-Verbindung herstellen
     *
     * @returns {number}
     * @memberof GooglePort
     */
    GooglePort.prototype._connect = function (aOption) {
        // console.log('GooglePort._connect');
        if (this._isConnect()) {
            // Kein Fehler, Verbindung ist bereits vorhanden
            return 0;
        }
        if (!this.mGoogleWebSocket) {
            this._error('_connect', 'kein GoogleWebSocket vorhanden');
            return -1;
        }
        try {
            this.mGoogleWebSocket.connect(this.mGoogleConfig.serverUrl || GOOGLE_DEFAULT_URL);
            return 0;
        }
        catch (aException) {
            this._exception('_connect', aException);
            return -1;
        }
    };
    GooglePort.prototype._disconnect = function () {
        // console.log('GooglePort._disconnect');
        if (!this._isConnect()) {
            return 0;
        }
        if (!this.mGoogleWebSocket) {
            this._error('_disconnect', 'kein GoogleWebSocket vorhanden');
            return -1;
        }
        try {
            // console.log('GooglePort._disconnect: WebSocket Verbindung getrennt');
            this.mGoogleWebSocket.disconnect();
            return 0;
        }
        catch (aException) {
            this._exception('_disconnect', aException);
            return -1;
        }
    };
    /**
     * Rueckgabe des Pluginnamens, der gerade eine Transaktion ausfuehrt
     *
     * @return {string} PluginName oder leerer String
     */
    GooglePort.prototype.getPluginName = function () {
        if (this.mTransaction) {
            return this.mTransaction.plugin;
        }
        return '';
    };
    /**
     * Rueckgabe des Aktionsnames, der gerade eine Transaktion ausfuehrt
     *
     * @return {string} ActionName oder leerer String
     */
    GooglePort.prototype.getActionName = function () {
        if (this.mTransaction) {
            return this.mTransaction.type;
        }
        return '';
    };
    /**
     * Pruefen, ob Port eine Aufgabe ausfuehrt, zu einem bestimmten Plugin
     * und zu einer bestimmten Aufgabe.
     *
     * @param {string} aPluginName - optionaler Pluginname
     * @param {string} aAction - optionaler Aktionsname
     *
     * @return {boolean} True, wenn Port beschaeftigt ist, False sonst
     */
    GooglePort.prototype.isRunning = function (aPluginName, aAction) {
        if (!aPluginName && !aAction) {
            return this.mRunningFlag;
        }
        if (aPluginName === this.getPluginName()) {
            if (!aAction) {
                return this.mRunningFlag;
            }
            else if (aAction === this.getActionName()) {
                return this.mRunningFlag;
            }
        }
        return false;
    };
    /**
     * Pruefen, welche Google-Aktionen ausfuehrbar sind.
     *
     * @param {string} aAction - Name der zu pruefenden Aktion
     *
     * @return {boolean} True, wenn Aktion ausfuehrbar ist, False sonst
     */
    GooglePort.prototype.isAction = function (aAction) {
        var result = false;
        switch (aAction) {
            case GOOGLE_NLU_ACTION:
                // console.log('GooglePort.isAction: isInit = ', this.mGoogleNLU2.isInit());
                result = this.mGoogleNLU && (this.mGoogleNLU2 && this.mGoogleNLU2.isInit()) ? true : false;
                break;
            case GOOGLE_ASRNLU_ACTION:
                result = (this.mGoogleNLU2 && this.mGoogleNLU2.isInit()) ? true : false;
                break;
            case GOOGLE_ASR_ACTION:
                result = (this.mGoogleASR && this.mGoogleASR.isInit()) ? true : false;
                break;
            case GOOGLE_TTS_ACTION:
                result = (this.mGoogleTTS && this.mGoogleTTS.isInit()) ? true : false;
                break;
        }
        return result;
    };
    /**
     * Dient zum Setzen eines Timeouts, um Aktionen abzubrechen.
     * Bei Timeout 0 wird kein Timeout gesetzt.
     *
     * @param aTimeout - Zeit in Millisekunden bis die Aktion abgebrochen wird oder 0 fuer keinen Timeout
     */
    GooglePort.prototype.setActionTimeout = function (aTimeout) {
        this.mActionTimeout = aTimeout;
    };
    /**
     * Portaktion starten
     *
     * @param (string) aPluginName - Name des Aufrufers
     * @param {string} aAction - optional auszufuehrende Aktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GooglePort.prototype.start = function (aPluginName, aAction, aOption) {
        var _this = this;
        // console.log('GooglePort.stop:', aPluginName, aAction, aOption);
        // pruefen, ob eine Aktion bereits laeuft
        if (this.isRunning()) {
            this._error('start', 'Aktion laeuft bereits');
            return -1;
        }
        // pruefen auf Credentials
        if (!this.mGoogleConfig.isCredentials()) {
            this._error('start', 'Port hat keine Credentials');
            return -1;
        }
        // pruefen auf laufende Transaktion
        if (this.mTransaction) {
            this._error('start', 'andere Transaktion laeuft noch');
            return -1;
        }
        // pruefen, ob der Port geoeffnet ist
        return this._checkOpen(function (aOpenFlag) {
            if (!aOpenFlag) {
                // TODO: wird nicht benoetigt, da in _checkOpen die Fehler erzeugt werden
                // this._error( 'start', 'Port ist nicht geoeffnet' );
                return -1;
            }
            // Aktions-Timeout starten
            _this._setActionTimeout();
            var option = aOption || {};
            // Aktion ausfuehren
            _this.mPluginName = aPluginName;
            _this.mRunningFlag = true;
            var result = 0;
            switch (aAction) {
                case GOOGLE_NLU_ACTION:
                    _this.mTransaction = new PortTransaction(aPluginName, GOOGLE_NLU_ACTION);
                    result = _this._startNLU(_this.mTransaction, option.text, option.language || GOOGLE_DEFAULT_LANGUAGE);
                    break;
                case GOOGLE_ASRNLU_ACTION:
                    _this.mTransaction = new PortTransaction(aPluginName, GOOGLE_ASRNLU_ACTION);
                    result = _this._startASRNLU(_this.mTransaction, option.language || GOOGLE_DEFAULT_LANGUAGE);
                    break;
                case GOOGLE_ASR_ACTION:
                    _this.mTransaction = new PortTransaction(aPluginName, GOOGLE_ASR_ACTION);
                    result = _this._startASR(_this.mTransaction, option.language || GOOGLE_DEFAULT_LANGUAGE, option.audioURL || '', false, option.useProgressive || false);
                    break;
                case GOOGLE_TTS_ACTION:
                    _this.mTransaction = new PortTransaction(aPluginName, GOOGLE_TTS_ACTION);
                    result = _this._startTTS(_this.mTransaction, option.text, option.language || GOOGLE_DEFAULT_LANGUAGE, option.voice || GOOGLE_DEFAULT_VOICE);
                    break;
                default:
                    // Aktions-Timeout loeschen, keine Transaktion gestartet
                    _this._clearActionTimeout();
                    _this._error('start', 'Keine gueltige Aktion uebergeben ' + aAction);
                    result = -1;
                    break;
            }
            return result;
        });
    };
    /**
     * Portaktion beenden
     *
     * @param (string) aPluginName - Name des Aufrufers
     * @param {string} aAction - optional zu beendende Aktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GooglePort.prototype.stop = function (aPluginName, aAction, aOption) {
        // console.log('GooglePort.stop:', aPluginName, aAction, aOption, this.mTransaction);
        // pruefen, ob eine Aktion bereits laeuft
        if (!this.isRunning()) {
            // console.log('GooglePort.stop: kein isRunning');
            return 0;
        }
        // pruefen, ob der Port geoeffnet ist
        if (!this.isOpen()) {
            this._error('stop', 'Port ist nicht geoeffnet');
            return -1;
        }
        // pruefen auf Credentials
        if (!this.mGoogleConfig.isCredentials()) {
            this._error('stop', 'Port hat keine Credentials');
            return -1;
        }
        // pruefen auf laufende Transaktion
        if (!this.mTransaction) {
            this._error('stop', 'keine Transaktion vorhanden');
            return -1;
        }
        // pruefen auf uebereinstimmende Transaktion
        if (aPluginName !== this.mTransaction.plugin) {
            this._error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + aPluginName + ' != ' + this.mTransaction.plugin);
            return -1;
        }
        if (aAction) {
            if (aAction !== this.mTransaction.type) {
                this._error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + aAction + ' != ' + this.mTransaction.type);
                return -1;
            }
        }
        else {
            aAction = this.mTransaction.type;
        }
        var result = 0;
        // console.log('GooglePort.stop: Action = ', aAction);
        switch (aAction) {
            case GOOGLE_NLU_ACTION:
            case GOOGLE_ASRNLU_ACTION:
                result = this._stopNLU(this.mTransaction);
                break;
            case GOOGLE_ASR_ACTION:
                result = this._stopASR(this.mTransaction);
                break;
            case GOOGLE_TTS_ACTION:
                result = this._stopTTS(this.mTransaction);
                break;
            default:
                this._error('stop', 'Keine gueltige Aktion uebergeben ' + aAction);
                result = -1;
                break;
        }
        // TODO: das RunningFlag kann hier nicht geloescht werden, da die Verarbeitung asynchron verlaeuft und es erst in _onStop geloescht werden darf
        // console.log('GooglePort.stop: RunningFlag=', this.mRunningFlag);
        // this.mRunningFlag = false;
        return result;
    };
    // Google-Funktionen
    /**
     * Initialisierung der Recognition
     *
     * @protected
     * @param {*} aOption - optionale Parameter fuer die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GooglePort.prototype._initRecognition = function (aOption) {
        var _this = this;
        // console.log('GooglePort._initRecognition: start');
        this.mDefaultOptions = {
            onopen: function () {
                // console.log( 'Websocket Opened' );
                // this._onRecognitionOpen();
            },
            onclose: function () {
                // console.log( 'Websocket Closed' );
                _this._onClose();
            },
            onerror: function (error) {
                // console.error(error);
                _this._onError(error);
            }
        };
        // console.log('GooglePort._initRecognition: end');
        return 0;
    };
    // Text-Funktionen
    /**
     * Intent zu einem Text holen
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - Text der interpretiert werden soll
     * @param {string} aLanguage - Sprache des Textes der interpretiert werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GooglePort.prototype._startNLU = function (aTransaction, aText, aLanguage) {
        if (!aText) {
            this._error('_startNLU', 'keinen Text uebergeben');
            return -1;
        }
        if (!aLanguage) {
            this._error('_startNLU', 'keine Sprache uebergeben');
            return -1;
        }
        if (!this.mGoogleNLU || !this.mGoogleNLU2) {
            this._error('_startNLU', 'keine Google NLU-Anbindung vorhanden');
            return -1;
        }
        try {
            var option = {
                text: aText,
                language: aLanguage
            };
            if (this.mGoogleNLU2Flag) {
                return this.mGoogleNLU2.start(aTransaction, option);
            }
            return this.mGoogleNLU.start(aTransaction, option);
        }
        catch (aException) {
            this._exception('_startNLU', aException);
            return -1;
        }
        return -1;
    };
    /**
     * Intent zu einem gesprochenen Satz holen
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aLanguage - Sprache des Textes der interpretiert werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GooglePort.prototype._startASRNLU = function (aTransaction, aLanguage) {
        if (!aLanguage) {
            this._error('_startASRNLU', 'keine Sprache uebergeben');
            return -1;
        }
        if (!this.mGoogleNLU || !this.mGoogleNLU2) {
            this._error('_startASRNLU', 'keine Google NLU-Anbindung vorhanden');
            return -1;
        }
        try {
            var option = {
                text: '',
                language: aLanguage
            };
            if (this.mGoogleNLU2Flag) {
                return this.mGoogleNLU2.start(aTransaction, option);
            }
            return -1;
        }
        catch (aException) {
            this._exception('_startASRNLU', aException);
            return -1;
        }
        return -1;
    };
    /**
     * stoppt die Analyse
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GooglePort.prototype._stopNLU = function (aTransaction) {
        if (!this.mGoogleNLU || !this.mGoogleNLU2) {
            this._error('_stopNLU', 'keine Google NLU-Anbindung vorhanden');
            return -1;
        }
        try {
            if (this.mGoogleNLU2Flag) {
                return this.mGoogleNLU2.stop(aTransaction);
            }
            return this.mGoogleNLU.stop(aTransaction);
        }
        catch (aException) {
            this._exception('_stopNLU', aException);
            return -1;
        }
        return -1;
    };
    // ASR-Funktionen
    /**
     * startet die Recognition
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @returns {number} Fehlercode 0 oder -1
     */
    GooglePort.prototype._startASR = function (aTransaction, aLanguage, aAudioUrl, aUseNLUFlag, aProgressiveFlag) {
        if (aUseNLUFlag === void 0) { aUseNLUFlag = false; }
        if (aProgressiveFlag === void 0) { aProgressiveFlag = false; }
        // console.log('GooglePort._startASR');
        if (!aLanguage) {
            this._error('_startASR', 'keine Sprache uebergeben');
            return -1;
        }
        if (!this.mGoogleASR) {
            this._error('_startASR', 'keine Google ASR-Anbindung vorhanden');
            return -1;
        }
        try {
            var option = {
                language: aLanguage,
                nlu: aUseNLUFlag,
                progressive: aProgressiveFlag
            };
            // pruefen auf Audiodatei
            if (aAudioUrl) {
                option['audioURL'] = aAudioUrl;
            }
            return this.mGoogleASR.start(aTransaction, option);
        }
        catch (aException) {
            this._exception('_startASR', aException);
            return -1;
        }
    };
    /**
     * stoppt die Recognition
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GooglePort.prototype._stopASR = function (aTransaction) {
        // console.log('GooglePort._stopASR: start');
        if (!this.mGoogleASR) {
            this._error('_stopASR', 'keine Google ASR-Anbindung vorhanden');
            return -1;
        }
        try {
            var result = this.mGoogleASR.stop(aTransaction);
            // console.log('GooglePort._stopASR: stop');
            return result;
        }
        catch (aException) {
            this._exception('_stopASR', aException);
            return -1;
        }
    };
    // TTS-Funktionen
    /**
     * startet die TTS
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - auszusprechender Text
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GooglePort.prototype._startTTS = function (aTransaction, aText, aLanguage, aVoice) {
        var _this = this;
        if (!aText) {
            this._error('_startTTS', 'keinen Text uebergeben');
            return -1;
        }
        if (!this.mGoogleTTS) {
            this._error('_startTTS', 'keine Google TTS-Anbindung vorhanden');
            return -1;
        }
        try {
            var option_1 = {
                text: aText,
                language: aLanguage,
                voice: aVoice
            };
            // TODO: Provisorische Version von AudioContext.resume(), muss in Audio-Komponmente untergebracht werden!
            // pruefen auf AutoContext Zustand suspended
            // console.log('GooglePort._startTTS: AudioContext.state = ', this.mAudioContext.state);
            this._unlockAudio(function (aUnlockFlag) {
                if (aUnlockFlag) {
                    _this.mGoogleTTS.start(aTransaction, option_1);
                }
                else {
                    _this._error('_startTTS', 'AudioContext ist nicht entsperrt');
                    _this._onStop(aTransaction.plugin, aTransaction.type);
                }
            });
            return 0;
        }
        catch (aException) {
            this._exception('_startTTS', aException);
            return -1;
        }
    };
    /**
     * stoppt die TTS
     *
     * @private
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    GooglePort.prototype._stopTTS = function (aTransaction) {
        // console.log('GooglePort._stopTTS', aTransaction);
        if (!this.mGoogleTTS) {
            this._error('_stopTTS', 'keine Google TTS-Anbindung vorhanden');
            return -1;
        }
        try {
            return this.mGoogleTTS.stop(aTransaction);
        }
        catch (aException) {
            this._exception('_stopTTS', aException);
            return -1;
        }
    };
    return GooglePort;
}(Port));

/** @packageDocumentation
 * Globale Fabrik zur Erzeugung eines GooglePorts
 *
 * Letzte Aenderung: 21.06.2020
 * Status: rot
 *
 * @module cloud/google
 * @author SB
 */
// Global API
var GoogleFactory = /** @class */ (function (_super) {
    __extends(GoogleFactory, _super);
    // Konstruktor
    function GoogleFactory() {
        return _super.call(this, 'GoogleFactory') || this;
    }
    /**
     * Typ der erzeugten Objekte der Fabrik zurueckgeben
     *
     * @return {string} gibt den Typ der Fabrik zurueck
     */
    GoogleFactory.prototype.getType = function () {
        return GOOGLE_TYPE_NAME;
    };
    /**
     * Name der Fabrik
     *
     * @return {string} gibt den Namen der Fabrik zurueck
     */
    GoogleFactory.prototype.getName = function () {
        return GOOGLE_FACTORY_NAME;
    };
    /**
     * Erzeugt einen Port zum vorgegebenen Port-Namen. Wird ein falscher Port-Name uebergeben,
     * wird null zurueckgegeben
     *
     * @private
     * @param aPortName - Name des zu erzeugenden Ports
     * @param aRegisterFlag - bestimmt, ob Port im PortManager registriert wird
     *
     * @return {PortInterface} gibt Port Instanz oder null zurueck
     */
    GoogleFactory.prototype._newPort = function (aPortName, aRegisterFlag) {
        var port = null;
        switch (aPortName) {
            case GOOGLE_DEFAULT_NAME:
            case GOOGLE_PORT_NAME:
                port = new GooglePort(aPortName, aRegisterFlag);
                break;
            // Mock-Port
            case GOOGLE_MOCK_NAME:
                port = new GoogleMock(GOOGLE_MOCK_NAME, aRegisterFlag);
                break;
            // keinen Port erkannt
            default:
                this._error('_newPort', 'kein Port vorhanden');
                break;
        }
        return port;
    };
    /**
     * Kann verschiedene Versionen des Ports
     * zurueckgeben, einschließlich eines Port-Mocks.
     *
     * @param {string} aName - Name des zu erzeugenden Ports
     * @param {boolean} aRegisterFlag - wenn true, wird Port in PortManager eingetragen
     *
     * @return {PortInterface} Port Instanz wird zurueckgegeben
     */
    GoogleFactory.prototype.create = function (aName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var portName = aName || GOOGLE_DEFAULT_NAME;
        // Port erzeugen
        try {
            return this._newPort(portName, aRegisterFlag);
        }
        catch (aException) {
            this._exception('create', aException);
            return null;
        }
    };
    return GoogleFactory;
}(PortFactory));

/** @packageDocumentation
 * Google-Manager zur Verwaltung des GooglePort
 *
 * Hier wird die Manager-Schnittstelle von Google definiert, um Google zu
 * initialisieren und als Port zu oeffnen.
 *
 * API-Version: 1.0
 * Datum:       08.05.2019
 *
 * Letzte Aenderung: 21.06.2020
 * Status: rot
 *
 * @module cloud/google
 * @author SB
 */
/**
 * statische Google-Klasse zur Erzeugung des GooglePorts
 */
var Google = /** @class */ (function () {
    // statische Klasse, keine Instanz erzeugbar !
    function Google() {
    }
    // Fehler-Funktionen
    Google.setErrorOutputOn = function () {
        Google.mErrorOutputFlag = true;
        PortManager.setErrorOutputOn();
    };
    Google.setErrorOutputOff = function () {
        Google.mErrorOutputFlag = false;
        PortManager.setErrorOutputOff();
    };
    Google.setErrorOutputFunc = function (aErrorFunc) {
        PortManager._setErrorOutputFunc(aErrorFunc);
    };
    /**
     * Initialisiert den GooglePort.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    Google._initGooglePort = function (aGoogleOption) {
        // console.log('Google._initGooglePort:', aGoogleOption);
        var port = PortManager.get(GOOGLE_TYPE_NAME, GooglePort);
        if (!port) {
            return -1;
        }
        if (port.init(aGoogleOption) !== 0) {
            PortManager.remove(GOOGLE_TYPE_NAME);
            return -1;
        }
        Google.mCurrentPort = port;
        return 0;
    };
    /**
     * Initialisiert den GoogleMock.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    Google._initGoogleMock = function (aGoogleOption) {
        // console.log('Google._initGoogleMock:', aGoogleOption);
        var port = PortManager.get(GOOGLE_TYPE_NAME, GoogleMock);
        if (!port) {
            console.log('Google._initGoogleMock: Error GoogleMock wurde nicht erzeugt');
            return -1;
        }
        if (port.init(aGoogleOption) !== 0) {
            console.log('Google._initGoogleMock: Error GoogleMock wurde nicht initialisiert');
            PortManager.remove(GOOGLE_TYPE_NAME);
            return -1;
        }
        Google.mCurrentPort = port;
        return 0;
    };
    /**
     * Initialisiert den GooglePorts
     *
     * @static
     * @param {GoogleOptionInterface} aOption - Google-Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Google.init = function (aOption) {
        // console.log('Google.init:', aOption);
        if (Google.mInitFlag) {
            return 0;
        }
        // pruefen auf Optionen
        if (!aOption) {
            if (Google.mErrorOutputFlag) {
                console.log('Google.init: Keine Google-Parameter uebergeben');
            }
            return -1;
        }
        // pruefen auf ErrorOutputFlag
        if (typeof aOption.errorOutputFlag === 'boolean') {
            if (aOption.errorOutputFlag) {
                Google.setErrorOutputOn();
            }
            else {
                Google.setErrorOutputOff();
            }
        }
        // hier wird der zu erzeugende Portname selectiert
        var portName = 'GooglePort';
        if (aOption && typeof aOption.googlePortName === 'string') {
            if (aOption.googlePortName === 'GoogleMock') {
                portName = 'GoogleMock';
            }
        }
        // hier wird der Google-Port initialisiert
        // console.log('Google.init: PortName = ', portName);
        if (portName === 'GooglePort') {
            if (Google._initGooglePort(aOption) !== 0) {
                return -1;
            }
        }
        else if (portName === 'GoogleMock') {
            if (Google._initGoogleMock(aOption) !== 0) {
                return -1;
            }
        }
        else {
            if (Google.mErrorOutputFlag) {
                console.log('Google.init: Kein Google PortName vorhanden');
            }
            return -1;
        }
        // console.log('Google.init: end', result);
        Google.mInitFlag = true;
        return 0;
    };
    Google.isInit = function () {
        return Google.mInitFlag;
    };
    /**
     * Freigabe des GooglePorts
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    Google.done = function () {
        var port = PortManager.find(GOOGLE_TYPE_NAME);
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if (!port) {
            port = Google.mCurrentPort;
        }
        var result = 0;
        if (port) {
            result = port.done();
            PortManager.remove(GOOGLE_TYPE_NAME);
        }
        Google.mCurrentPort = null;
        Google.mInitFlag = false;
        return result;
    };
    // Port-Funktionen
    Google._onOpenEvent = function (aError, aPortName, aPortResult, aOpenEventCallback) {
        if (typeof aOpenEventCallback === 'function') {
            try {
                // console.log('Google._onOpenEvent:', aPortName, aPortResult);
                aOpenEventCallback(aError, aPortName, aPortResult);
                return 0;
            }
            catch (aException) {
                if (Google.mErrorOutputFlag) {
                    console.log('Google._onOpenEvent: Exception', aException.message);
                }
                return -1;
            }
        }
        return 0;
    };
    /**
     * Oeffnet den GooglePort
     *
     * @param {function} aOpenEventCallback - Funktion fuer OpenEvent-Ereignis fn( PortName: string, PortResult: number)
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Google._openGooglePort = function (aOpenEventCallback) {
        // console.log('Google._openGooglePort: start');
        var port = PortManager.find(GOOGLE_TYPE_NAME);
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if (!port) {
            port = Google.mCurrentPort;
        }
        if (!port) {
            if (Google.mErrorOutputFlag) {
                console.log('Google._openGooglePort: kein Port vorhanden');
            }
            Google._onOpenEvent(new Error('Google._openGooglePort: Kein Port vorhanden'), GOOGLE_TYPE_NAME, -1, aOpenEventCallback);
            return -1;
        }
        // Events verarbeiten
        port.addOpenEvent(GOOGLE_TYPE_NAME, function (aEvent) {
            port.removeErrorEvent(GOOGLE_TYPE_NAME);
            port.removeOpenEvent(GOOGLE_TYPE_NAME);
            // console.log('Google._openGooglePort: openEvent');
            if (typeof aOpenEventCallback === 'function') {
                Google._onOpenEvent(null, GOOGLE_TYPE_NAME, aEvent.result, aOpenEventCallback);
            }
            return aEvent.result;
        });
        port.addErrorEvent(GOOGLE_TYPE_NAME, function (aError) {
            port.removeOpenEvent(GOOGLE_TYPE_NAME);
            port.removeErrorEvent(GOOGLE_TYPE_NAME);
            // console.log('Google._openGooglePort: errorEvent', aError.message);
            if (typeof aOpenEventCallback === 'function') {
                Google._onOpenEvent(aError, GOOGLE_TYPE_NAME, -1, aOpenEventCallback);
            }
            return 0;
        });
        // Port oeffnen
        return port.open();
    };
    /**
     * Oeffnet den GooglePort
     *
     * @static
     * @param {function} aOpenEventCallback - Ereignis-Funktion fuer Port geoeffnet
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Google.open = function (aOpenEventCallback) {
        if (!Google.mInitFlag) {
            if (Google.mErrorOutputFlag) {
                console.log('Google.open: Init wurde nicht aufgerufen');
            }
            Google._onOpenEvent(new Error('Google.open: Init wurde nicht aufgerufen'), GOOGLE_TYPE_NAME, -1, aOpenEventCallback);
            return -1;
        }
        // hier wird der Nuance-Port geoeffnet
        var result = Google._openGooglePort(aOpenEventCallback);
        // console.log('Google.open: end', result);
        return result;
    };
    /**
     * Traegt geaenderte Credentials ein.
     *
     * @static
     * @param {function} aOpenEventCallback - Ereignis-Funktion fuer Port geoeffnet
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Google.setConfig = function (aConfigData) {
        if (Google.mCurrentPort) {
            return Google.mCurrentPort.setConfig(aConfigData);
        }
        return -1;
    };
    /**
     * Gibt die aktuellen Credentials zurueck.
     *
     * @static
     * @return {GoogleConfigDataInterface} Konfigurationsdaten zurueckgeben
     */
    Google.getConfig = function () {
        if (Google.mCurrentPort) {
            return Google.mCurrentPort.getConfig();
        }
        return { googleAppKey: '', googleServerUrl: '', dialogflowTokenServerUrl: '', dialogflowProjectId: '', dialogflowSessionId: '', dialogflowEnvironmentName: '' };
    };
    Google.mInitFlag = false;
    Google.mErrorOutputFlag = false;
    Google.mCurrentPort = null;
    return Google;
}());

export { GOOGLE_API_VERSION, GOOGLE_ASRNLU_ACTION, GOOGLE_ASR_ACTION, GOOGLE_ASR_LANGUAGE, GOOGLE_ASR_LANGUAGE1, GOOGLE_ASR_LANGUAGE2, GOOGLE_AUDIOBUFFER_SIZE, GOOGLE_AUDIOSAMPLE_RATE, GOOGLE_AUDIOTTS_ID, GOOGLE_CONFIG_FILE, GOOGLE_CONFIG_LOAD, GOOGLE_CONFIG_PATH, GOOGLE_DEFAULT_CODEC, GOOGLE_DEFAULT_LANGUAGE, GOOGLE_DEFAULT_NAME, GOOGLE_DEFAULT_URL, GOOGLE_DEFAULT_VOICE, GOOGLE_DE_LANGUAGE, GOOGLE_EN_LANGUAGE, GOOGLE_FACTORY_NAME, GOOGLE_MOCK_NAME, GOOGLE_NLU2_FLAG, GOOGLE_NLU_ACTION, GOOGLE_PCM_CODEC, GOOGLE_PORT_NAME, GOOGLE_SERVER_URL, GOOGLE_SERVER_VERSION, GOOGLE_TTS_ACTION, GOOGLE_TTS_LANGUAGE, GOOGLE_TTS_LANGUAGE1, GOOGLE_TTS_LANGUAGE2, GOOGLE_TTS_VOICE, GOOGLE_TTS_VOICE1, GOOGLE_TTS_VOICE2, GOOGLE_TTS_VOICE3, GOOGLE_TTS_VOICE4, GOOGLE_TYPE_NAME, GOOGLE_VERSION_BUILD, GOOGLE_VERSION_DATE, GOOGLE_VERSION_NUMBER, GOOGLE_VERSION_STRING, GOOGLE_VERSION_TYPE, GOOGLE_WORKER_VERSION, Google, GoogleFactory };
