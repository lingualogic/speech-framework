import { PortManager } from '../../core/port/port-manager.ts';
import { FactoryManager } from '../../core/factory/factory-manager.ts';
import { Port } from '../../core/port/port.ts';
import { FileHtml5Reader } from '../../common/html5/file-html5-reader.ts';
import { AudioHtml5Reader } from '../../common/html5/audio-html5-reader.ts';
import { AUDIOCONTEXT_FACTORY_NAME, AudioContextFactory } from '../../common/html5/audiocontext-factory.ts';
import { USERMEDIA_FACTORY_NAME, UserMediaFactory } from '../../common/html5/usermedia-factory.ts';
import { ErrorBase } from '../../core/error/error-base.ts';
import { NetHtml5Connect } from '../../common/html5/net-html5-connect.ts';
import { NetHtml5WebSocket } from '../../common/html5/net-html5-websocket.ts';

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
var NUANCE_TYPE_NAME = 'Nuance';
var NUANCE_PORT_NAME = 'NuancePort';
var NUANCE_MOCK_NAME = 'NuanceMock';
// Default URL des Nuance-Mix WebSocket-Service
var NUANCE_SERVER_URL = 'wss://ws.dev.nuance.com/v2';
var NUANCE_DEFAULT_URL = NUANCE_SERVER_URL;
// Aktionen
var NUANCE_NLU_ACTION = 'NLU';
var NUANCE_ASR_ACTION = 'ASR';
var NUANCE_ASRNLU_ACTION = 'ASRNLU';
var NUANCE_TTS_ACTION = 'TTS';
// Nuance Konfigurationsdaten
var NUANCE_CONFIG_PATH = 'assets/';
var NUANCE_CONFIG_FILE = 'nuance.json';
var NUANCE_CONFIG_LOAD = false;
// Nuance Sprachen
var NUANCE_DE_LANGUAGE = 'deu-DEU';
var NUANCE_DEFAULT_LANGUAGE = NUANCE_DE_LANGUAGE;
var NUANCE_TTS_VOICE4 = 'Petra-ML';
var NUANCE_TTS_VOICE = NUANCE_TTS_VOICE4;
var NUANCE_DEFAULT_VOICE = NUANCE_TTS_VOICE;
var NUANCE_AUDIOTTS_ID = 789;
// Nuance Codec
var NUANCE_PCM_CODEC = 'audio/L16;rate=16000';
var NUANCE_DEFAULT_CODEC = NUANCE_PCM_CODEC;
// Audio-Konstanten
var NUANCE_AUDIOBUFFER_SIZE = 2048;
var NUANCE_AUDIOSAMPLE_RATE = 16000;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
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

/**
 * Speech-Nuance Version und Build Konstanten
 *
 * @module cloud/nuance
 * @author SB
 */
var NUANCE_VERSION_NUMBER = '0.1.7';
var NUANCE_VERSION_BUILD = '0008';
var NUANCE_VERSION_TYPE = 'ALPHA';
var NUANCE_VERSION_DATE = '07.04.2019';
// tslint:disable-next-line
var NUANCE_VERSION_STRING = NUANCE_VERSION_NUMBER + '.' + NUANCE_VERSION_BUILD + ' vom ' + NUANCE_VERSION_DATE + ' (' + NUANCE_VERSION_TYPE + ')';
var NUANCE_API_VERSION = NUANCE_VERSION_STRING;

/**
 * Event-Klasse fuer alle Nuance-Transaktionen
 *
 * Letzte Aenderung: 15.12.2018
 * Status: rot
 *
 * @module cloud/nuance
 * @author SB
 */
var NuanceTransaction = /** @class */ (function () {
    function NuanceTransaction(aPluginName, aType) {
        if (aPluginName === void 0) { aPluginName = ''; }
        if (aType === void 0) { aType = ''; }
        this.transactionId = 0;
        this.plugin = '';
        this.type = '';
        this.result = null;
        this.error = null;
        this.plugin = aPluginName;
        this.type = aType;
        // automatische Transaktions-ID Erzeugung
        NuanceTransaction.mTransactionCounter += 1;
        this.transactionId = NuanceTransaction.mTransactionCounter;
    }
    NuanceTransaction.mTransactionCounter = 0;
    return NuanceTransaction;
}());

/**
 * Nuance Konstanten Verwaltung
 * Die Nuance-Config Datei wird aus den Assets eingelesen.
 *
 * Letzte Aenderung: 15.12.2018
 * Status: rot
 *
 * @module cloud/nuance
 * @author SB
 */
var NuanceConfig = /** @class */ (function (_super) {
    __extends(NuanceConfig, _super);
    /**
     * Creates an instance of NuanceConfig.
     */
    function NuanceConfig(aFileReader) {
        var _this = _super.call(this, 'NuanceConfig') || this;
        _this.mInitFlag = false;
        // Configdatei-Daten
        _this.mConfigPath = NUANCE_CONFIG_PATH;
        _this.mConfigFile = NUANCE_CONFIG_FILE;
        _this.mConfigLoadFlag = NUANCE_CONFIG_LOAD;
        // Nuance-Konfigurationsdaten
        _this.mConfigServerUrl = NUANCE_DEFAULT_URL;
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
    NuanceConfig.prototype._setOption = function (aOption) {
        if (!aOption) {
            return;
        }
        // Parameter eintragen
        if (typeof aOption.nuanceConfigPath === 'string') {
            this.mConfigPath = aOption.nuanceConfigPath;
        }
        if (typeof aOption.nuanceConfigFile === 'string') {
            this.mConfigFile = aOption.nuanceConfigFile;
        }
        if (typeof aOption.nuanceConfigLoadFlag === 'boolean') {
            this.mConfigLoadFlag = aOption.nuanceConfigLoadFlag;
        }
        if (typeof aOption.nuanceServerUrl === 'string') {
            this.mConfigServerUrl = aOption.nuanceServerUrl;
        }
        if (typeof aOption.nuanceAppId === 'string') {
            this.mConfigAppId = aOption.nuanceAppId;
        }
        if (typeof aOption.nuanceAppKey === 'string') {
            this.mConfigAppKey = aOption.nuanceAppKey;
        }
        if (typeof aOption.nuanceUserId === 'string') {
            this.mConfigUserId = aOption.nuanceUserId;
        }
        if (typeof aOption.nuanceNluTag === 'string') {
            this.mConfigNluTag = aOption.nuanceNluTag;
        }
    };
    /**
     * Initialisierung von FileReader
     *
     * @param {NuanceOptionInterface} aOptions - optionale Parameter { nuanceConfigPath, unanceConfigFile }
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    NuanceConfig.prototype.init = function (aOption) {
        // console.log('NuanceConfig.init:', aOption);
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
    NuanceConfig.prototype.done = function () {
        this.mInitFlag = false;
        this.mConfigPath = NUANCE_CONFIG_PATH;
        this.mConfigFile = NUANCE_CONFIG_FILE;
        this.mConfigLoadFlag = NUANCE_CONFIG_LOAD;
        // Nuance-Konfigurationsdaten
        this.mConfigServerUrl = NUANCE_DEFAULT_URL;
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
    NuanceConfig.prototype.isInit = function () {
        return this.mInitFlag;
    };
    /**
     * Sendet Event fuer fertige Initialisierung
     *
     * @param aResult - Fehlercode 0 oder -1
     */
    NuanceConfig.prototype._onInit = function (aResult) {
        // console.log('NuanceConfig._onInit: start', aResult);
        // Initflag wird nur gesetzt, wenn der Init-Event erfolgreich war
        if (aResult === 0) {
            this.mInitFlag = true;
        }
        if (typeof this.mOnInitFunc === 'function') {
            // console.log('NuanceConfig._onInit: call', aResult);
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
    NuanceConfig.prototype._onError = function (aError) {
        // console.log('NuanceConfig._onError:', aError);
        if (typeof this.mOnErrorFunc === 'function') {
            try {
                // console.log('NuanceConfig._onError: call', this.mOnErrorFunc);
                this.mOnErrorFunc(aError);
                return 0;
            }
            catch (aException) {
                if (this.isErrorOutput()) {
                    // hier darf nicht this._exception() verwendet werden, da sonst eine Endlosschleife entstehen kann!
                    console.log('===> EXCEPTION NuanceConfig._onError: ', aException.message);
                }
                return -1;
            }
        }
        return 0;
    };
    Object.defineProperty(NuanceConfig.prototype, "onInit", {
        /**
         * Initialisierungs-Event eintragen
         */
        set: function (aOnInitFunc) {
            // console.log('NuanceConfig.set onInit:', aOnInitFunc);
            this.mOnInitFunc = aOnInitFunc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NuanceConfig.prototype, "onError", {
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
    NuanceConfig.prototype._readConfigData = function (aFileData) {
        // console.log('NuanceConfig._readConfigData:', aFileData);
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
    NuanceConfig.prototype._readError = function (aErrorText) {
        this._error('_readError', aErrorText);
        this._onInit(-1);
    };
    /**
     * asynchrones Einlesen der Konfigurationsdaten
     */
    NuanceConfig.prototype.read = function () {
        if (!this.mFileReader) {
            this._error('read', 'kein FileReader vorhanden');
            this._onInit(-1);
            return -1;
        }
        var fileUrl = this.mConfigPath + this.mConfigFile;
        return this.mFileReader.read(fileUrl);
    };
    Object.defineProperty(NuanceConfig.prototype, "serverUrl", {
        get: function () {
            // console.log('NuanceConfig.getServerUrl:', this.mConfigServerUrl);
            return this.mConfigServerUrl;
        },
        // Konfigurations-Funktionen
        set: function (aUrl) {
            // console.log('NuanceConfig.setServerUrl:', aUrl);
            this.mConfigServerUrl = aUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NuanceConfig.prototype, "appId", {
        get: function () {
            return this.mConfigAppId;
        },
        set: function (aAppId) {
            this.mConfigAppId = aAppId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NuanceConfig.prototype, "appKey", {
        get: function () {
            return this.mConfigAppKey;
        },
        set: function (aAppKey) {
            this.mConfigAppKey = aAppKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NuanceConfig.prototype, "userId", {
        get: function () {
            return this.mConfigUserId;
        },
        set: function (aUserId) {
            this.mConfigUserId = aUserId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NuanceConfig.prototype, "nluTag", {
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
    NuanceConfig.prototype.isCredentials = function () {
        if (this.mConfigAppKey && this.mConfigAppId) {
            return true;
        }
        return false;
    };
    return NuanceConfig;
}(ErrorBase));

/**
 * Definiert die Network fuer Nuance
 *
 * Letzte Aenderung: 18.03.2019
 * Status: rot
 *
 * @module cloud/nuance/net
 * @author SB
 */
var NuanceNetwork = /** @class */ (function (_super) {
    __extends(NuanceNetwork, _super);
    function NuanceNetwork() {
        return _super.call(this, 'NuanceNetwork') || this;
    }
    return NuanceNetwork;
}(NetHtml5Connect));

/**
 * Definiert die WebSocket fuer Nuance
 *
 * Letzte Aenderung: 15.12.2018
 * Status: rot
 *
 * @module cloud/nuance/net
 * @author SB
 */
var NuanceWebSocket = /** @class */ (function (_super) {
    __extends(NuanceWebSocket, _super);
    function NuanceWebSocket() {
        return _super.call(this, 'NuanceWebSocket') || this;
    }
    NuanceWebSocket.prototype.connect = function (aUrl) {
        // pruefen auf URL
        if (!aUrl) {
            this._error('connect', 'keine URL vorhanden');
            return -1;
        }
        // console.log('NuanceWebSocket.connect: start', aUrl);
        if (this._connect(aUrl) !== 0) {
            // console.log('NuanceWebSocket.connect: keine Verbindung moeglich', aUrl);
            this._error('open', 'keine Verbindung moeglich');
            return -1;
        }
        // console.log('NuanceWebSocket.connect: ende', this.mTimeout);
        return 0;
    };
    NuanceWebSocket.prototype.disconnect = function () {
        // TODO: muss geloescht weerden, da sonst falsche Nachrichten an NuanceConnect versendet werden !
        this.onMessage = null;
        this.close();
    };
    // Data Helpers
    NuanceWebSocket.prototype.sendJSON = function (aJson) {
        this.sendMessage(aJson);
    };
    return NuanceWebSocket;
}(NetHtml5WebSocket));

/**
 * Definiert die Verbindung zum Nuance-Service
 *
 * Letzte Aenderung: 20.03.2019
 * Status: rot
 *
 * @module cloud/nuance/net
 * @author SB
 */
var NuanceConnect = /** @class */ (function (_super) {
    __extends(NuanceConnect, _super);
    /**
     * Erzeugt eine Instanz von NuanceConnect
     *
     * @param aWebSocket - WebSocket
     */
    function NuanceConnect(aWebSocket) {
        var _this = _super.call(this, 'NuanceConnect') || this;
        // externe Komponente
        _this.mWebSocket = null;
        _this.mWebSocket = aWebSocket;
        return _this;
    }
    // Nachrichten-Funktionen
    /**
     * Verbindungsaufbau mit dem Nuance-Server
     *
     * @param aOption - optionale Parameter
     */
    NuanceConnect.prototype._sendConnectMessage = function (aOption) {
        // console.log('NuanceConnect._sendConnectMessage:', aOption);
        var nav = window.navigator;
        var deviceId = [
            nav.platform,
            nav.vendor,
            nav.language
        ].join('_').replace(/\s/g, '');
        // Verbindungsnachricht erstellen
        var connectMessage = {
            'message': 'connect',
            'user_id': aOption.userId,
            'codec': aOption.codec || 'audio/L16;rate=16000',
            'app_id': aOption.appId,
            'app_key': aOption.appKey,
            'device_id': deviceId,
            'phone_model': 'nuance_internal_mixjsapp',
            'phone_number': aOption.userId
        };
        // Nachricht versenden
        return this.mWebSocket.sendMessage(connectMessage);
    };
    /**
     * Verbindungsaufbau mit Nuance-Service. WebSocket muss vorher geoeffnet worden sein!
     *
     * @param {*} aOptions - optionale Parameter
     */
    NuanceConnect.prototype.connect = function (aOptions) {
        // console.log( 'NuanceConnect.connect: start');
        aOptions = aOptions || {};
        // senden einer Verbindungs-Nachricht an den Nuance-Service
        this._sendConnectMessage(aOptions);
        // Verbindung oeffnen
        aOptions.onopen();
        // Nachrichten verarbeiten
        this.mWebSocket.onMessage = function (aMessage) {
            // console.log( 'NuanceConnect.connect: Message = ', aMessage);
            try {
                var msgType = typeof (aMessage.data);
                // console.log( 'NuanceConnect.connect: MessageType = ', msgType);
                switch (msgType) {
                    // Decode Audiodaten
                    case 'object':
                        // console.log('NuanceConnect.connect: object');
                        aOptions.onttsdecode(aOptions, aMessage.data);
                        break;
                    // Audio behandeln
                    case 'string':
                        var msg = JSON.parse(aMessage.data);
                        if (msg.message === 'volume') {
                            aOptions.onvolume(msg.volume);
                        }
                        else {
                            aOptions.onresult(msg);
                        }
                        if (msg.message === 'audio_begin') {
                            // console.log('NuanceConnect.connect: audio_begin');
                            aOptions.onttsstart();
                        }
                        if (msg.message === 'audio_end') {
                            // console.log('NuanceConnect.connect: audio_end');
                            aOptions.onttscomplete();
                        }
                        break;
                    // Weitergabe der Nachricht
                    default:
                        aOptions.onresult(aMessage.data);
                }
                return 0;
            }
            catch (aException) {
                console.log('NuanceConnect.connect: Exception', aException.message);
                return -1;
            }
        };
        // TODO: duerfte nicht eingetragen werden
        // WebSocket-Funktionen eintragen
        // this.mWebSocket.onClose = aOptions.onclose;
        // this.mWebSocket.onError = aOptions.onerror;
    };
    /**
     * Dient der Entfernung von onMessage aus dem WebSocket.
     */
    NuanceConnect.prototype.disconnect = function () {
        if (this.mWebSocket) {
            this.mWebSocket.onMessage = null;
        }
        return 0;
    };
    // Data Helpers
    NuanceConnect.prototype.sendJSON = function (aMessage) {
        if (this.mWebSocket) {
            return this.mWebSocket.sendMessage(aMessage);
        }
        return -1;
    };
    Object.defineProperty(NuanceConnect.prototype, "webSocket", {
        /**
         * Html5-WebSocket zurueckgeben
         */
        get: function () {
            return this.mWebSocket.webSocket;
        },
        enumerable: true,
        configurable: true
    });
    return NuanceConnect;
}(ErrorBase));

/**
 * NuanceAudioCodec fuer Encode/Decode PCM
 *
 * Zur Zeit wird nur PCM-Codec unterstuetzt.
 *
 * Letzte Aenderung: 18.01.2019
 * Status: rot
 *
 * @module cloud/nuance/audio
 * @author SB
 */
// Nuance
// import { AudioEncoder } from './audio-encoder';
// Konstanten
var PCM_L16CodecArray = ['audio/L16;rate=8000', 'audio/L16;rate=16000'];
var OpusCodecArray = ['audio/opus;rate=8000', 'audio/opus;rate=16000'];
/**
 * Klasse NuanceAudioCodec zur Codierung/Decodierung von Audiodaten
 */
var NuanceAudioCodec = /** @class */ (function (_super) {
    __extends(NuanceAudioCodec, _super);
    function NuanceAudioCodec() {
        return _super.call(this, 'NuanceAudioCodec') || this;
    }
    // Codec-Funktionen
    /**
     * Codec pruefen
     *
     * @private
     * @param {string} aCodec - zu pruefender Codec
     * @param {string[]} aCodecArray - Codec-Array
     */
    NuanceAudioCodec.prototype._findCodec = function (aCodec, aCodecArray) {
        for (var i = 0; i < aCodecArray.length; i++) {
            if (aCodec === aCodecArray[i]) {
                return true;
            }
        }
        return false;
    };
    /**
     * Pruefen auf PCM-Codec
     *
     * @param {string} aCodec - zu pruefender codec
     */
    NuanceAudioCodec.prototype.findPcmCodec = function (aCodec) {
        return this._findCodec(aCodec, PCM_L16CodecArray);
    };
    /**
     * Pruefen auf Opus-Codec
     *
     * @param {string} aCodec - zu pruefender codec
     */
    NuanceAudioCodec.prototype.findOpusCodec = function (aCodec) {
        return this._findCodec(aCodec, OpusCodecArray);
    };
    // Encode-Funktionen
    /**
     * Umwandlung von Float32 nach Int16
     *
     * @private
     * @param {*} aFloat32 - umzuwandelnder Wert
     *
     * @return {*} Rueckgabe des passenden Int-Wertes
     */
    NuanceAudioCodec.prototype._float32ToInt16 = function (aFloat32) {
        var int16 = aFloat32 < 0 ? aFloat32 * 32768 : aFloat32 * 32767;
        return Math.max(-32768, Math.min(32768, int16));
    };
    /**
     * Umwandlung des Float32Arrays nach Int16Array
     *
     * @private
     * @param {*} aFloat32Array - umzuwandelndes Float32-Array
     *
     * @return {*} Rueckgabe des Int16-Arrays
     */
    NuanceAudioCodec.prototype._float32ArrayToInt16Array = function (aFloat32Array) {
        var int16Array = new Int16Array(aFloat32Array.length);
        var i = 0;
        while (i < aFloat32Array.length) {
            int16Array[i] = this._float32ToInt16(aFloat32Array[i++]);
        }
        return int16Array;
    };
    /**
     * Umwandlung von FloatArray nach Int16Array
     *
     * @private
     * @param {*} aFrame - umzuwandelnde Daten
     * @param {string} aCodec - Codec fuer Umwandlung
     */
    NuanceAudioCodec.prototype.encodePCM = function (aFrame, aCodec) {
        if (this.findPcmCodec(aCodec)) {
            return [this._float32ArrayToInt16Array(aFrame)];
        }
        return [aFrame];
    };
    /* Opus-Codec
    opusEncoderSetup( aRate: any ): void {
        // TODO: Problem mit globalen Worker-Verzeichnis fuer alle Worker
        this.opusEncoder = new AudioEncoder( 'lib/opus_encoder.js' );
        this.opusEncoder.setup({ num_of_channels: 1, params: { application: 2048, frame_duration: 20, sampling_rate: aRate }, sampling_rate: aRate });
    }
    */
    /*
    encodeOpusAndSend( aFrame: any, aWs: any ): void {
        this.opusEncoder.encode({ samples: aFrame, timestamp: 0, transferable: true })
        .then((packets: any) => {
            for ( let i = 0; i < packets.length; ++i ) {
                aWs.send( packets[ i ].data );
            }
        }, rejectLog( 'opusDecoder.encode error' ));
    }
    */
    // Decode-Funktionen
    /**
     * Umwandlung von Int16-Array nach Float32-Array
     *
     * @param {*} aAudioData - umzuwandelnde Audiodaten
     */
    NuanceAudioCodec.prototype.decodePCM = function (aAudioData) {
        try {
            var pcm16Buffer = new Int16Array(aAudioData);
            var pcm16BufferLength = pcm16Buffer.length;
            var outputArray = new Float32Array(pcm16BufferLength);
            // console.log( 'AmazonAudioCodec.decodePCM: puffer = ', pcm16Buffer);
            // console.log( 'AmazonAudioCodec.decodePCM: laenge = ', pcm16BufferLength);
            var i = 0;
            for (; i < pcm16BufferLength; ++i) {
                outputArray[i] = pcm16Buffer[i] / 32768;
            }
            // console.log('NuanceAudioCodec.decodePCM: Float32 = ', outputArray);
            return outputArray;
        }
        catch (aException) {
            console.log('NuanceAudioCodec.decodePCM: Exception', aException);
            this._exception('decodePCM', aException);
            return [];
        }
    };
    return NuanceAudioCodec;
}(ErrorBase));

/**
 * externe Resampler-Klasse
 *
 * Letzte Aenderung: 15.12.2018
 * Status: rot
 *
 * @module cloud/nuance/audio
 * @author SB
 */
// JavaScript Audio Resampler (c) 2011 - Grant Galitz
// https://github.com/taisel/XAudioJS/blob/master/resampler.js
var NuanceResampler = /** @class */ (function () {
    function NuanceResampler(fromSampleRate, toSampleRate, channels, outputBufferSize, noReturn) {
        this.fromSampleRate = 0;
        this.toSampleRate = 0;
        this.channels = 0;
        this.outputBufferSize = 0;
        this.noReturn = false;
        this.resampler = null;
        this.ratioWeight = 0;
        this.interpolate = null;
        this.lastWeight = 0;
        this.outputBuffer = null;
        this.lastOutput = null;
        this.fromSampleRate = fromSampleRate;
        this.toSampleRate = toSampleRate;
        this.channels = channels || 0;
        this.outputBufferSize = outputBufferSize;
        this.noReturn = !!noReturn;
        this.initialize();
    }
    NuanceResampler.prototype.initialize = function () {
        // console.log('Resampler.initialize:', this.fromSampleRate, this.toSampleRate, this.channels);
        // Perform some checks:
        if (this.fromSampleRate > 0 && this.toSampleRate > 0 && this.channels > 0) {
            if (this.fromSampleRate === this.toSampleRate) {
                // Setup a resampler bypass:
                this.resampler = this.bypassResampler; // Resampler just returns what was passed through.
                this.ratioWeight = 1;
            }
            else {
                // Setup the interpolation resampler:
                this.compileInterpolationFunction();
                this.resampler = this.interpolate; // Resampler is a custom quality interpolation algorithm.
                this.ratioWeight = this.fromSampleRate / this.toSampleRate;
                this.tailExists = false;
                this.lastWeight = 0;
                this.initializeBuffers();
            }
        }
        else {
            throw (new Error('Invalid settings specified for the resampler.'));
        }
    };
    NuanceResampler.prototype.compileInterpolationFunction = function () {
        var toCompile = 'var bufferLength = Math.min(buffer.length, this.outputBufferSize);\
        if ((bufferLength % ' + this.channels + ') == 0) {\
            if (bufferLength > 0) {\
                var ratioWeight = this.ratioWeight;\
                var weight = 0;';
        for (var channel = 0; channel < this.channels; ++channel) {
            toCompile += 'var output' + channel + ' = 0;';
        }
        toCompile += 'var actualPosition = 0;\
                var amountToNext = 0;\
                var alreadyProcessedTail = !this.tailExists;\
                this.tailExists = false;\
                var outputBuffer = this.outputBuffer;\
                var outputOffset = 0;\
                var currentPosition = 0;\
                do {\
                    if (alreadyProcessedTail) {\
                        weight = ratioWeight;';
        for (var channel = 0; channel < this.channels; ++channel) {
            toCompile += 'output' + channel + ' = 0;';
        }
        toCompile += '}\
                    else {\
                        weight = this.lastWeight;';
        for (var channel = 0; channel < this.channels; ++channel) {
            toCompile += 'output' + channel + ' = this.lastOutput[' + channel + '];';
        }
        toCompile += 'alreadyProcessedTail = true;\
                    }\
                    while (weight > 0 && actualPosition < bufferLength) {\
                        amountToNext = 1 + actualPosition - currentPosition;\
                        if (weight >= amountToNext) {';
        for (var channel = 0; channel < this.channels; ++channel) {
            toCompile += 'output' + channel + ' += buffer[actualPosition++] * amountToNext;';
        }
        toCompile += 'currentPosition = actualPosition;\
                            weight -= amountToNext;\
                        }\
                        else {';
        for (var channel = 0; channel < this.channels; ++channel) {
            toCompile += 'output' + channel + ' += buffer[actualPosition' + ((channel > 0) ? (' + ' + channel) : '') + '] * weight;';
        }
        toCompile += 'currentPosition += weight;\
                            weight = 0;\
                            break;\
                        }\
                    }\
                    if (weight == 0) {';
        for (var channel = 0; channel < this.channels; ++channel) {
            toCompile += 'outputBuffer[outputOffset++] = output' + channel + ' / ratioWeight;';
        }
        toCompile += '}\
                    else {\
                        this.lastWeight = weight;';
        for (var channel = 0; channel < this.channels; ++channel) {
            toCompile += 'this.lastOutput[' + channel + '] = output' + channel + ';';
        }
        toCompile += 'this.tailExists = true;\
                        break;\
                    }\
                } while (actualPosition < bufferLength);\
                return this.bufferSlice(outputOffset);\
            }\
            else {\
                return (this.noReturn) ? 0 : [];\
            }\
        }\
        else {\
            throw(new Error(\"Buffer was of incorrect sample length.\"));\
        }';
        this.interpolate = Function('buffer', toCompile);
    };
    NuanceResampler.prototype.bypassResampler = function (buffer) {
        if (this.noReturn) {
            // Set the buffer passed as our own, as we don't need to resample it:
            this.outputBuffer = buffer;
            return buffer.length;
        }
        else {
            // Just return the buffer passsed:
            return buffer;
        }
    };
    NuanceResampler.prototype.bufferSlice = function (sliceAmount) {
        if (this.noReturn) {
            // If we're going to access the properties directly from this object:
            return sliceAmount;
        }
        else {
            // Typed array and normal array buffer section referencing:
            try {
                return this.outputBuffer.subarray(0, sliceAmount);
            }
            catch (error) {
                try {
                    // Regular array pass:
                    this.outputBuffer.length = sliceAmount;
                    return this.outputBuffer;
                }
                catch (error) {
                    // Nightly Firefox 4 used to have the subarray function named as slice:
                    return this.outputBuffer.slice(0, sliceAmount);
                }
            }
        }
    };
    NuanceResampler.prototype.initializeBuffers = function (generateTailCache) {
        // Initialize the internal buffer:
        try {
            this.outputBuffer = new Float32Array(this.outputBufferSize);
            this.lastOutput = new Float32Array(this.channels);
        }
        catch (error) {
            this.outputBuffer = [];
            this.lastOutput = [];
        }
    };
    return NuanceResampler;
}());

/**
 * NuanceAudioRecorder, sendet Audiostream vom Mikrophon nach Nuance
 *
 * Zur Zeit wird nur PCM-Codec unterstuetzt.
 *
 * Letzte Aenderung: 18.01.2019
 * Status: rot
 *
 * @module cloud/nuance/audio
 * @author SB
 */
// import { AudioEncoder } from './audio-encoder';
/**
 * Klasse NuanceAudioRecorder zum Aufnehmen von Audiodaten und streamen ueber eine WebSocket
 */
var NuanceAudioRecorder = /** @class */ (function (_super) {
    __extends(NuanceAudioRecorder, _super);
    // opusEncoder = null;
    /**
     * Konstruktor
     *
     * @param {WebSocket} aWebSocket - WebSocket-Objekt
     * @param {AudioContext} aAudioContext - AudioContext-Objekt
     * @param {(aVolumeData) => void} aVolumeCallback - Callback-Funktion
     */
    function NuanceAudioRecorder(aWebSocket, aAudioContext, aVolumeCallback) {
        var _this = _super.call(this, 'NuanceAudioRecorder') || this;
        // Komponenten
        _this.mWebSocket = null;
        _this.mAudioContext = null;
        _this.mAudioCodec = null;
        _this.mResampler = null;
        // Audio-Paramter
        _this.mBufferSize = NUANCE_AUDIOBUFFER_SIZE;
        _this.mSampleRate = NUANCE_AUDIOSAMPLE_RATE; // 16k up to server
        _this.mCodec = NUANCE_DEFAULT_CODEC;
        // Audio-Knoten
        _this.mAudioInputNode = null;
        _this.mAnalyseNode = null;
        _this.mRecordingNode = null;
        // Audio-Daten
        _this.mUserMediaStream = null;
        // mChannelDataList = [];
        _this.mBytesRecorded = 0;
        _this.mRecordingFlag = false;
        // Event-Funktionen
        _this.mOnVolumeFunc = null;
        _this.mOnEndedFunc = null;
        _this.mWebSocket = aWebSocket;
        _this.mAudioContext = aAudioContext;
        _this.mOnVolumeFunc = aVolumeCallback;
        // TODO: wird hier erst mal temporaer eingefuegt. Muss spaeter einmal uebergeben werden
        _this.mAudioCodec = new NuanceAudioCodec();
        /****
        if ($("#codec").val() === "audio/L16;rate=8000" || $("#codec").val() === "audio/opus;rate=8000") {
            mSampleRate = 8000;
        }
        ****/
        try {
            _this.mResampler = new NuanceResampler(_this.mAudioContext.sampleRate, _this.mSampleRate, 1, _this.mBufferSize, undefined);
        }
        catch (aException) {
            // console.log('NuanceAudioRecorder: Exception', aException.message);
            _this._exception('constructor', aException);
            // Exception wird geworfen, da AudioRecorder nicht funktionsfaehig ist !
            throw new Error('NuanceAudioRecorder nicht initialisiert');
        }
        return _this;
        // this.opusEncoderSetup( this.mSampleRate );
    }
    // Recorder-Funktionen
    /**
     * Hier wird der MediaStream wieder geschlossen, damit das Mikrofon-Symbol
     * im Browser wieder verschwindet.
     *
     * @private
     */
    NuanceAudioRecorder.prototype._closeMediaStream = function () {
        try {
            // Schliessen des MediaStreams
            if (this.mUserMediaStream) {
                // pruefen, ob Tracks vorhanden sind
                if (this.mUserMediaStream.getAudioTracks) {
                    var trackList = this.mUserMediaStream.getAudioTracks();
                    // console.log('NuanceAudioSource.start: Tracks = ', trackList);
                    for (var _i = 0, trackList_1 = trackList; _i < trackList_1.length; _i++) {
                        var track = trackList_1[_i];
                        if (track.stop) {
                            track.stop();
                        }
                    }
                }
            }
        }
        catch (aException) {
            // console.log('NuanceAudioRecorder._closeMediaStream: Exception', aException);
            this._exception('_closeMediaStream', aException);
        }
        this.mUserMediaStream = null;
    };
    /**
     * Hier wird der Ende-Handler ausgefuehrt
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */
    NuanceAudioRecorder.prototype._onEnded = function () {
        if (typeof this.mOnEndedFunc === 'function') {
            try {
                this.mOnEndedFunc();
            }
            catch (aException) {
                // console.log('NuanceAudioRecorder._onEnded: Exception', aException);
                this._exception('_onEnded', aException);
                return -1;
            }
        }
        return 0;
    };
    /**
     * Hier wird der Volumen-Callback Aufruf getaetigt
     *
     * @private
     * @param {*} aVolumeData - Volumendaten zur Auswertung
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuanceAudioRecorder.prototype._onVolume = function (aVolumeData) {
        // console.log('NuanceAudioSource._onVolume:', aVolumeData);
        if (typeof this.mOnVolumeFunc === 'function') {
            try {
                this.mOnVolumeFunc(aVolumeData);
            }
            catch (aException) {
                // console.log('NuanceAudioRecorder._onVolume: Exception', aException);
                this._exception('_onVolume', aException);
                return -1;
            }
        }
        return 0;
    };
    /**
     * Audioprozess Funktion
     *
     * @private
     * @param {*} aEvent - AudioProzess-Event mit InputDaten vom Mikrofon
     */
    NuanceAudioRecorder.prototype._onAudioProcess = function (aEvent) {
        var _this = this;
        // console.log('NuanceAudioSource._onAudioProcess: ', this.mRecordingFlag, aEvent);
        try {
            // Audioprozess beenden
            if (!this.mRecordingFlag) {
                this.mAudioInputNode.disconnect(this.mAnalyseNode);
                this.mAnalyseNode.disconnect(this.mRecordingNode);
                this.mRecordingNode.disconnect(this.mAudioContext.destination);
                this._closeMediaStream();
                this._onEnded();
                // console.log('NuanceAudioSource._onAudioProcess: disconnect');
                // TODO: hier sollte ein Event fuer das ausgeschaltete Mikrofon hin
                return;
            }
            // Audiodaten ueber WebSocket versenden
            var inputData = aEvent.inputBuffer.getChannelData(0);
            var _inputData = this.mResampler.resampler(inputData);
            // this.mChannelDataList.push( _inputData );
            this.mBytesRecorded += _inputData.length;
            var ampArray = new Uint8Array(this.mAnalyseNode.frequencyBinCount);
            this.mAnalyseNode.getByteTimeDomainData(ampArray);
            // pruefen auf Codec
            if (this.mAudioCodec.findPcmCodec(this.mCodec)) {
                var encodedList = this.mAudioCodec.encodePCM(_inputData, this.mCodec);
                encodedList.forEach(function (typedArray) {
                    // Daten senden ueber WebSocket
                    _this.mWebSocket.send(typedArray.buffer);
                });
            }
            else if (this.mAudioCodec.findOpusCodec(this.mCodec)) {
                // this.encodeOpusAndSend( _inputData, this.mWebSocket );
            }
            this._onVolume(ampArray);
        }
        catch (aException) {
            this._exception('_onAudioProcess', aException);
        }
    };
    /**
     * Startet die Audioaufnahmen und das Audiostreaming
     *
     * @param {MediaStream} aUserMediaStream - MediaStream vom Aufnahmegeraet(Mikrofon)
     * @param {string} aCodec - Audio-Codec
     */
    NuanceAudioRecorder.prototype.start = function (aUserMediaStream, aCodec) {
        var _this = this;
        // console.log('NuanceAudioRecorder.start: start', aUserMediaStream, aCodec);
        this.mUserMediaStream = aUserMediaStream;
        this.mCodec = aCodec;
        // Fuer Chrome muss hier mAudioContext.resume() aufgerufen werden, da Chrome das Web-API mit einer Policy versehen hat,
        // nach der nur nach einer User-Aktion das Web-API ausgefuehrt werden kann. Wenn der Context vor einer User-Aktion
        // erzeugt wird, ist er im syspend-Modus und muss mit resume() umgeschaltet werden.
        this.mAudioContext.resume().then(function () {
            // console.log('NuanceAudioRecorder.start: resume')
            try {
                _this.mRecordingFlag = true;
                _this.mAudioInputNode = _this.mAudioContext.createMediaStreamSource(_this.mUserMediaStream);
                _this.mAnalyseNode = _this.mAudioContext.createAnalyser();
                _this.mRecordingNode = _this.mAudioContext.createScriptProcessor(_this.mBufferSize, 1, 2);
                // Audioprozess-Funktion
                _this.mRecordingNode.onaudioprocess = function (aEvent) { return _this._onAudioProcess(aEvent); };
                // alle Audioknoten miteinander verbinden
                _this.mAudioInputNode.connect(_this.mAnalyseNode);
                _this.mAnalyseNode.connect(_this.mRecordingNode);
                _this.mRecordingNode.connect(_this.mAudioContext.destination);
                // TODO: hier sollte ein Event fuer das eingeschaltete Mikrofon hin
            }
            catch (aException) {
                // console.log('NuanceAudioRecorder.start: Exception', aException);
                _this._exception('start', aException);
            }
            // console.log('NuanceAudioSource.start: end');
        }, function (aError) {
            // console.log('NuanceAudioRecorder.start: Resume-Error', aError);
            if (aError && aError.message) {
                _this._error('start.resume', aError.message);
            }
        });
    };
    /**
     * Audiodaten fuer Uebertragung nach Nuance verwenden, anstelle des Mikrofons
     *
     * @param {*} aAudioData - Audiodaten aus Audiodatei
     * @param {string} aCodec - Audio-Codec
     */
    // TODO: Problem mit der Uebertragung an Nuance als Stream
    NuanceAudioRecorder.prototype.startAudio = function (aAudioData, aCodec) {
        // console.log('NuanceAudioRecorder.startAudio:', aCodec);
        // TODO: Audiodaten in Bloecke aufteilen und verarbeiten
        // Schleife fuer alle Audiodaten versenden
    };
    /**
     * Stop-Funktion fuer Audioaufnahme
     *
     * @param {() => void} aOnEndedFunc - Handler fuer Ende der Audioaufnahme
     */
    NuanceAudioRecorder.prototype.stop = function (aOnEndedFunc) {
        // console.log('NuanceAudioSource.stop:', aOnEndedHandler);
        this.mOnEndedFunc = aOnEndedFunc;
        this.mRecordingFlag = false;
    };
    return NuanceAudioRecorder;
}(ErrorBase));

/**
 * Nuance Geraeteklasse fuer TTS, ASR und NLU
 *
 * Letzte Aenderung: 15.12.2018
 * Status: gelb
 *
 * @module cloud/nuance/device
 * @author SB
 */
/**
 * Basisklasse akller Nuance-Geraete
 */
var NuanceDevice = /** @class */ (function (_super) {
    __extends(NuanceDevice, _super);
    /**
     * Erzeugt eine Instanz von NuanceDevice
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */
    function NuanceDevice(aDeviceName, aConfig, aConnect) {
        var _this = _super.call(this, aDeviceName || 'NuanceDevice') || this;
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
        return _this;
    }
    // Event-Funktionen
    /**
     * StartEvent und Beginn der Transaktion
     *
     * @protected
     */
    NuanceDevice.prototype._onStart = function () {
        // console.log('NuanceDevice._onStart');
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
    NuanceDevice.prototype._onStop = function () {
        // console.log('NuanceDevice._onStop:', this.mTransaction, this.onStop );
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
     * @param aResult- Ergebnis von Nuance
     */
    NuanceDevice.prototype._onResult = function (aResult) {
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
    NuanceDevice.prototype._onError = function (aError) {
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
    NuanceDevice.prototype._onClose = function () {
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
    NuanceDevice.prototype._getDefaultOption = function () {
        var _this = this;
        // console.log('NuanceASR._getDefaultOption: start');
        var defaultOption = {
            onopen: function () {
                // console.log( 'NuanceNLU: Service verbunden' );
                _this._onStart();
            },
            onclose: function () {
                // console.log( 'NuanceNLU: Websocket Closed' );
                _this._onClose();
                _this._onStop();
            },
            onerror: function (aError) {
                // console.error('NuanceNLU._getDefaultOption: error = ', aError);
                _this._onError(aError);
                _this._onStop();
            }
        };
        return defaultOption;
    };
    NuanceDevice.prototype._createOption = function (aOverrideOption) {
        // console.log( 'NuanceNLU._createOption:', aOverrideOption );
        var option = Object.assign(aOverrideOption, this._getDefaultOption());
        option.appId = aOverrideOption.appId || this.mConfig.appId || '';
        option.appKey = aOverrideOption.appKey || this.mConfig.appKey || '';
        option.userId = aOverrideOption.userId || this.mConfig.userId;
        option.tag = aOverrideOption.tag || this.mConfig.nluTag || '';
        option.language = aOverrideOption.language || NUANCE_DEFAULT_LANGUAGE;
        option.text = aOverrideOption.text || '';
        option.voice = aOverrideOption.voice || NUANCE_DEFAULT_VOICE;
        option.codec = aOverrideOption.codec || NUANCE_DEFAULT_CODEC;
        return option;
    };
    // Nachrichten senden
    NuanceDevice.prototype._sendQueryEndMessage = function (aTransactionId) {
        var queryEndMessage = {
            'message': 'query_end',
            'transaction_id': aTransactionId
        };
        return this.mConnect.sendJSON(queryEndMessage);
    };
    // Geraete-Funktionen
    /**
     * Interne Geraete Startfunktion
     *
     * @protected
     * @param {*} aOption - optionale Parameter
     */
    NuanceDevice.prototype._start = function (aOption) {
        // muss von erbenden Klassen ueberschrieben werden
    };
    /**
     * Interne Geraete Stopfunktion
     *
     * @protected
     */
    NuanceDevice.prototype._stop = function () {
        // muss von erbenden Klassen ueberschrieben werden
    };
    /**
     * Geraeteaktion starten
     *
     * @param {NuanceTransaction} aTransaction - auszufuehrende Transaktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuanceDevice.prototype.start = function (aTransaction, aOption) {
        // console.log('NuanceDevice.start:', aTransaction, aOption);
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
     * @param {NuanceTransaction} aTransaction - auszufuehrende Transaktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuanceDevice.prototype.stop = function (aTransaction) {
        // console.log('NuanceDevice.stop:', aTransaction);
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
            this._onStop();
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
    NuanceDevice.prototype.isTransaction = function () {
        if (this.mTransaction) {
            return true;
        }
        return false;
    };
    /**
     * Transaktion zurueckgeben
     */
    NuanceDevice.prototype.getTransaction = function () {
        return this.mTransaction;
    };
    /**
     * Transaktion loeschen
     */
    NuanceDevice.prototype.clearTransaction = function () {
        this.mTransaction = null;
    };
    return NuanceDevice;
}(ErrorBase));

/**
 * ASR Anbindung an den Nuance-Service, inklusive ASRNLU
 *
 * Letzte Aenderung: 18.01.2019
 * Status: rot
 *
 * @module cloud/nuance/device
 * @author SB
 */
// Konstanten
// Anzahl der Volume-Pruefungen, bis ASR-Aufnahme abgebrochen wird
var ASR_MAXVOLUME_COUNTER = 50;
var ASR_TIMEOUTVOLUME_COUNTER = 200;
// Schwellwert fuer Lautstaerke, ab der weiter zugehoert wird
var ASR_MINVOLUME_THRESHOLD = 127.0;
var ASR_MAXVOLUME_THRESHOLD = 128.0;
var NuanceASR = /** @class */ (function (_super) {
    __extends(NuanceASR, _super);
    function NuanceASR(aConfig, aConnect, aAudioContext, aGetUserMedia, aAudioReader) {
        var _this = _super.call(this, 'NuanceASR', aConfig, aConnect) || this;
        // HTML5-Komponenten
        _this.mAudioContext = null;
        _this.mGetUserMedia = null;
        // AudioReader, fuer Einlesen von Audiodateien, anstatt das Mikrofon zu benutzen
        _this.mAudioReader = null;
        // weitere Attribute
        _this.mAudioRecorder = null;
        _this.mUserMediaStream = null;
        _this.mRequestId = 0;
        _this.mVolumeCounter = 0;
        _this.mTimeoutCounter = 0;
        _this.mRecordingFlag = false;
        _this.mAudioContext = aAudioContext;
        _this.mGetUserMedia = aGetUserMedia;
        _this.mAudioReader = aAudioReader;
        return _this;
    }
    /**
     * Pruefen auf vorhandenem Volumen
     * @param aVolumeData - Audiodaten zum pruefen auf Volumen
     */
    NuanceASR.prototype.isVolume = function (aVolumeData) {
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
                // console.log('NuanceASR.isVolume:', volume);
                if (volume < ASR_MINVOLUME_THRESHOLD || volume > ASR_MAXVOLUME_THRESHOLD) {
                    // console.log('NuanceASR.isVolume:', volume);
                    this.mVolumeCounter = 0;
                }
            }
            catch (aException) {
                this._exception('isVolume', aException);
            }
        }
        // console.log( 'NuanceASR.isVolume:', aVolumeData);
        if (this.mVolumeCounter === ASR_MAXVOLUME_COUNTER) {
            return false;
        }
        if (this.mTimeoutCounter === ASR_TIMEOUTVOLUME_COUNTER) {
            return false;
        }
        return true;
    };
    /**
     * Initialisierung der ASR Optionen
     *
     * @protected
     *
     * @return {any} Default Optionen fuer die ASR
     */
    NuanceASR.prototype._getDefaultOption = function () {
        var _this = this;
        // console.log('NuanceASR._getDefaultOption: start');
        var defaultOption = _super.prototype._getDefaultOption.call(this);
        defaultOption['onvolume'] = function (aVolumeData) {
            // console.log( aVolume + '\n\n\n');
            if (!_this.isVolume(aVolumeData)) {
                _this._stop();
            }
        };
        defaultOption['onresult'] = function (aMessage) {
            // console.log( 'Result:', aMessage );
            if (aMessage.result_type === 'NVC_ASR_CMD' || aMessage.result_type === 'NMDP_ASR_CMD') {
                if (aMessage.result_format === 'rec_text_results') {
                    // console.log('Progressive Results', aMessage.transcriptions);
                    _this._onResult(aMessage.transcriptions);
                }
                else {
                    console.log('ASR Response', aMessage);
                }
            }
            else if (aMessage.result_type === 'NDSP_ASR_APP_CMD' || aMessage.result_type === 'NDSP_APP_CMD') {
                if (aMessage.result_format === 'nlu_interpretation_results') {
                    if (aMessage.nlu_interpretation_results.status !== 'failure') {
                        try {
                            // console.log('ASRNLU Interpretations', aMessage.nlu_interpretation_results.payload.interpretations);
                            _this._onResult(aMessage.nlu_interpretation_results.payload.interpretations);
                        }
                        catch (aException) {
                            // console.log('ASRNLU-Exceptions', aMessage, aException);
                            _this._onError(new Error('ASRNLU-Exception: ' + aException.message));
                        }
                    }
                    else {
                        _this._onError(new Error('ASRNLU-Error: ' + aMessage.nlu_interpretation_results.reason));
                    }
                }
                else if (aMessage.result_format === 'rec_text_results') {
                    // console.log('NLU Transkription', aMessage.transcriptions);
                    _this._onResult(aMessage.transcriptions);
                }
                else {
                    console.log('ASR', aMessage);
                }
            }
            else if (aMessage.result_type === 'NDSP_CONCEPT_UPLOAD_FULL_CMD') ;
            else if (aMessage.result_type === 'NDSP_DELETE_ALL_CONCEPTS_DATA_CMD') ;
            else if (aMessage.message === 'query_error') {
                // console.error('ASR-Error:', aMessage.reason);
                _this._onError(new Error('ASR-Error.' + aMessage.message + ': ' + aMessage.reason));
                _this._onStop();
            }
            else if (aMessage.message === 'disconnect') {
                if (aMessage.reason !== 'Transaction completed.') {
                    // console.error('ASR-Error:', aMessage.reason);
                    _this._onError(new Error('ASR-Error.' + aMessage.message + ': ' + aMessage.reason));
                    // Muss Audiorecorder beenden
                    _this._stop();
                }
                _this._onStop();
            }
        };
        return defaultOption;
    };
    // Nachrichten senden
    NuanceASR.prototype._sendQueryBeginMessage = function (aTransactionId, aLanguage, aTag, aCodec, aNluFlag) {
        // console.log('NuanceASR._sendQueryBeginMessage:', aTransactionId, aLanguage, aTag, aCodec, aNluFlag);
        var queryBeginMessage = {
            'message': 'query_begin',
            'transaction_id': aTransactionId,
            'language': aLanguage,
            'codec': aCodec
        };
        // pruefen auf NLU
        if (aNluFlag) {
            queryBeginMessage['command'] = 'NDSP_ASR_APP_CMD';
            queryBeginMessage['context_tag'] = aTag;
        }
        else {
            queryBeginMessage['command'] = 'NMDP_ASR_CMD';
            queryBeginMessage['recognition_type'] = aTag || 'dictation';
        }
        // console.log('NuanceASR._sendQueryBeginMessage: message = ', queryBeginMessage);
        return this.mConnect.sendJSON(queryBeginMessage);
    };
    NuanceASR.prototype._sendRequestInfoMessage = function (aTransactionId, aProgressiveFlag) {
        var reqInfoDict = {};
        if (aProgressiveFlag) {
            reqInfoDict['result_delivery'] = 'progressive';
        }
        var requestInfoMessage = {
            'message': 'query_parameter',
            'transaction_id': aTransactionId,
            'parameter_name': 'REQUEST_INFO',
            'parameter_type': 'dictionary',
            'dictionary': reqInfoDict
        };
        return this.mConnect.sendJSON(requestInfoMessage);
    };
    NuanceASR.prototype._sendAudioInfoMessage = function (aTransactionId, aRequestId) {
        var audioInfoMessage = {
            'message': 'query_parameter',
            'transaction_id': aTransactionId,
            'parameter_name': 'AUDIO_INFO',
            'parameter_type': 'audio',
            'audio_id': aRequestId
        };
        return this.mConnect.sendJSON(audioInfoMessage);
    };
    NuanceASR.prototype._sendAudioBeginMessage = function (aRequestId) {
        var audioBeginMessage = {
            'message': 'audio',
            'audio_id': aRequestId
        };
        return this.mConnect.sendJSON(audioBeginMessage);
    };
    // ASR-Funktionen
    /**
     *
     * @param options
     * - usermedia
     * - tag
     * - language
     * - onopen
     * - onclose
     * - onvolume
     * - onresult
     */
    NuanceASR.prototype._startASR = function (aOptions) {
        var _this = this;
        // console.log('NuanceASR._startASR: option = ', aOptions);
        aOptions = this._createOption(aOptions);
        var _options = Object.assign({}, aOptions);
        // console.log('NuanceASR._startASR: _option = ', _options);
        _options.onopen = function () {
            aOptions.onopen();
            _this.mRequestId++;
            // Nachrichten senden
            _this._sendQueryBeginMessage(_this.mTransaction.transactionId, _options.language, _options.tag, _options.codec, _options.nlu);
            _this._sendRequestInfoMessage(_this.mTransaction.transactionId, _options.progressive);
            _this._sendAudioInfoMessage(_this.mTransaction.transactionId, _this.mRequestId);
            _this._sendQueryEndMessage(_this.mTransaction.transactionId);
            _this._sendAudioBeginMessage(_this.mRequestId);
            // Audiosource einrichten
            try {
                _this.mAudioRecorder = new NuanceAudioRecorder(_this.mConnect.webSocket, _this.mAudioContext, function (volume) {
                    aOptions.onvolume(volume);
                });
                // pruefen auf Mikrofon oder Audiodaten
                if (aOptions.userMediaStream) {
                    _this.mAudioRecorder.start(aOptions.userMediaStream, _options.codec);
                }
                else if (aOptions.audioData) {
                    _this.mAudioRecorder.startAudio(aOptions.audioData, _options.codec);
                }
                else {
                    console.log('NuanceASR._startASR: keine Audiodaten vorhanden');
                    return;
                }
                _this.mRecordingFlag = true;
            }
            catch (aException) {
                _this._exception('_start', aException);
            }
        };
        // logische Verbindung mit Nuance-Server ufbauen
        this.mConnect.connect(_options);
    };
    /**
     * Laed eine Audidatei und startet dann die ASR mit den gelesenen Audiodaten
     *
     * @param aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuanceASR.prototype._startAudio = function (aOption) {
        var _this = this;
        if (!aOption || !aOption.audioURL) {
            this._error('_startAudio', 'keine Audio-URL vorhanden');
            return -1;
        }
        if (!this.mAudioReader) {
            this._error('_startAudio', 'keine Audio-URL vorhanden');
            return -1;
        }
        // einlesen der Audiodaten und Aufruf der ASR
        this.mAudioReader.onRead = function (aAudioData) {
            console.log('NuanceASR._startAudio: Aufruf von _startASR mit den Audiodaten');
            aOption['audioData'] = aAudioData;
            _this._startASR(aOption);
        };
        this.mAudioReader.onError = function (aError) {
            console.log('NuanceASR._startAudio: Fehlermeldung', aError);
            _this._error('_startAudio', aError);
            _this._onStop();
        };
        return this.mAudioReader.read(aOption.audioURL);
    };
    /**
     * startet die Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */
    NuanceASR.prototype._start = function (aOption) {
        var _this = this;
        // console.log('NuanceASR._start:', aOption.language);
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
            if (aOption.nlu) {
                option['nlu'] = true;
                option['tag'] = this.mConfig.nluTag;
            }
            if (aOption.progressive) {
                option['progressive'] = true;
            }
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
            this.mVolumeCounter = 0;
            this.mTimeoutCounter = 0;
            try {
                // Verbindung mit dem Mikrofon herstellen ueber einen Stream
                // console.log('NuanceASR._start: getUserMedia = ', this.mGetUserMedia);
                this.mGetUserMedia({ audio: true, video: false }).then(function (stream) {
                    // console.log('NuanceASR._start: getUserMedia = ', stream);
                    _this.mUserMediaStream = stream;
                    var option = {
                        userMediaStream: _this.mUserMediaStream,
                        language: aOption.language,
                        tag: _this.mConfig.nluTag
                    };
                    if (aOption.nlu) {
                        option['nlu'] = true;
                    }
                    if (aOption.progressive) {
                        option['progressive'] = true;
                    }
                    try {
                        _this._startASR(option);
                    }
                    catch (aException) {
                        _this._exception('_start', aException);
                    }
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
    };
    NuanceASR.prototype._stop = function () {
        var _this = this;
        // console.log('NuanceASR._stop');
        this.mRecordingFlag = false;
        if (!this.mAudioRecorder) {
            return 0;
        }
        try {
            this.mAudioRecorder.stop(function () {
                var _audio_end = {
                    'message': 'audio_end',
                    'audio_id': _this.mRequestId
                };
                _this.mConnect.sendJSON(_audio_end);
            });
            this.mAudioRecorder = null;
            return 0;
        }
        catch (aException) {
            this._exception('_stop', aException);
            return -1;
        }
    };
    return NuanceASR;
}(NuanceDevice));

/**
 * NLU Anbindung an den Nuance-Service, hier wird nur ein Text in einen Intent umgewandelt
 *
 * Letzte Aenderung: 28.03.2019
 * Status: gelb
 *
 * @module cloud/nuance/device
 * @author SB
 */
var NuanceNLU = /** @class */ (function (_super) {
    __extends(NuanceNLU, _super);
    /**
     * Erzeugt eine Instanz von NuanceNLU
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */
    function NuanceNLU(aConfig, aConnect) {
        return _super.call(this, 'NuanceNLU', aConfig, aConnect) || this;
    }
    /**
     * Initialisierung der NLU Optionen
     *
     * @protected
     *
     * @return {any} Default Optionen fuer die NLU
     */
    NuanceNLU.prototype._getDefaultOption = function () {
        var _this = this;
        // console.log('NuanceASR._getDefaultOption: start');
        var defaultOption = _super.prototype._getDefaultOption.call(this);
        defaultOption['onresult'] = function (aMessage) {
            // console.log( 'Result:', aMessage );
            if (aMessage.result_type === 'NDSP_APP_CMD') {
                if (aMessage.result_format === 'nlu_interpretation_results') {
                    if (aMessage.nlu_interpretation_results.status !== 'failure') {
                        try {
                            // console.log('NLU Interpretations', aMessage.nlu_interpretation_results.payload.interpretations);
                            _this._onResult(aMessage.nlu_interpretation_results.payload.interpretations);
                        }
                        catch (aException) {
                            _this._onError(new Error('NLU-Exception: ' + aException.message));
                        }
                    }
                    else {
                        _this._onError(new Error('NLU-Error: ' + aMessage.nlu_interpretation_results.reason));
                    }
                    _this._onStop();
                }
                else {
                    console.log('ASR', aMessage);
                }
            }
            else if (aMessage.result_type === 'NDSP_CONCEPT_UPLOAD_FULL_CMD') { // DATA UPLOAD
                console.log('Concept Upload', aMessage);
            }
            else if (aMessage.result_type === 'NDSP_DELETE_ALL_CONCEPTS_DATA_CMD') { // DATA UPLOAD
                console.log('Concept Upload Reset', aMessage);
            }
            else if (aMessage.message === 'query_error') {
                // console.error('NLU-Error:', aMessage.reason);
                _this._onError(new Error('NLU-Error.' + aMessage.message + ': ' + aMessage.reason));
                _this._onStop();
            }
            else if (aMessage.message === 'disconnect') {
                if (aMessage.reason !== 'Transaction completed.') {
                    // console.error('NLU-Error:', aMessage.reason);
                    _this._onError(new Error('NLU-Error.' + aMessage.message + ': ' + aMessage.reason));
                    _this._onStop();
                }
            }
        };
        return defaultOption;
    };
    // Nachrichten senden
    NuanceNLU.prototype._sendQueryBeginMessage = function (aTransactionId, aLanguage, aTag) {
        // console.log('NuanceNLU._sendQueryBeginMessage: ', aTransactionId, aLanguage, aTag);
        var queryBeginMessage = {
            'message': 'query_begin',
            'transaction_id': aTransactionId,
            'command': 'NDSP_APP_CMD',
            'language': aLanguage,
            'context_tag': aTag
        };
        // console.log('NuanceNLU._sendQueryBeginMessage: message = ', queryBeginMessage);
        return this.mConnect.sendJSON(queryBeginMessage);
    };
    NuanceNLU.prototype._sendQueryParameterMessage = function (aTransactionId, aText) {
        var queryParameterMessage = {
            'message': 'query_parameter',
            'transaction_id': aTransactionId,
            'parameter_name': 'REQUEST_INFO',
            'parameter_type': 'dictionary',
            'dictionary': {
                'application_data': {
                    'text_input': aText
                }
            }
        };
        // console.log('NuanceNLU._sendQueryParameterMessage: message = ', queryParameterMessage);
        return this.mConnect.sendJSON(queryParameterMessage);
    };
    // NLU-Funktionen
    /**
     *
     * @param options
     * - text
     * - tag
     * - language
     * - onopen
     * - onclose
     * - onresult
     */
    NuanceNLU.prototype._start = function (aOptions) {
        var _this = this;
        // console.log('NuanceNLU._startNLU:', aOptions);
        aOptions = this._createOption(aOptions);
        var _options = Object.assign({}, aOptions);
        // console.log('NuanceNLU._startNLU:', _options);
        _options.onopen = function () {
            aOptions.onopen();
            // Nachrichten senden
            _this._sendQueryBeginMessage(_this.mTransaction.transactionId, _options.language, _options.tag);
            _this._sendQueryParameterMessage(_this.mTransaction.transactionId, _options.text);
            _this._sendQueryEndMessage(_this.mTransaction.transactionId);
        };
        // logische Verbindung mit Nuance-Server ufbauen
        this.mConnect.connect(_options);
    };
    NuanceNLU.prototype._stop = function () {
        // console.log('NuanceNLU._stop');
    };
    return NuanceNLU;
}(NuanceDevice));

/**
 * NuanceAudioPlayer fuer Abspielen von Sprachdaten
 *
 * Zur Zeit wird nur PCM-Codec unterstuetzt.
 *
 * Letzte Aenderung: 18.01.2019
 * Status: rot
 *
 * @module cloud/nuance/audio
 * @author SB
 */
// Minimum-Samplerate fuer Safari
var AUDIO_MIN_SAMPLERATE = 22500;
/**
 * Klasse NuanceAudioPlayer zum Absielen des Nuance-Audiostreams
 */
var NuanceAudioPlayer = /** @class */ (function (_super) {
    __extends(NuanceAudioPlayer, _super);
    // mOpusDecoder = null;
    /**
     * Konstruktor
     *
     * @param aAudioContext - globaler AudioContext
     */
    function NuanceAudioPlayer(aAudioContext) {
        var _this = _super.call(this, 'NuanceAudioPlayer') || this;
        _this.mAudioContext = null;
        _this.mAudioCodec = null;
        _this.mResampler = null;
        _this.mOnAudioEndFunc = null;
        _this.mAudioSource = null;
        _this.mAudioArray = [];
        _this.mQueue = [];
        _this.mBeginSpeakFlag = true;
        _this.mAudioStopFlag = false;
        _this.mAudioContext = aAudioContext;
        // TODO: wird hier erst mal temporaer eingefuegt. Muss spaeter einmal uebergeben werden
        _this.mAudioCodec = new NuanceAudioCodec();
        return _this;
    }
    /**
     * Start der Wiedergabe
     */
    NuanceAudioPlayer.prototype.start = function () {
        this.mOnAudioEndFunc = null;
        this.mAudioSource = null;
        this.mAudioArray = [];
        this.mQueue = [];
        this.mBeginSpeakFlag = true;
        this.mAudioStopFlag = false;
    };
    // AudioBuffer-Funktionen
    /**
     * Hier wird der AudioBuffer direkt ueber seinen Constructor erzeugt
     *
     * @private
     * @param aData - Audiodaten
     *
     * @return {AudioBuffer} Rueckgabe des erzeugten Audiobuffers oder null bei einem Fehler
     */
    NuanceAudioPlayer.prototype._getAudioBufferFirst = function (aData) {
        var audioBuffer = null;
        // fuer die meisten aktuellen Browser mit AudioBuffer Constructor 
        try {
            var audioToPlay = new Float32Array(aData.length);
            audioToPlay.set(aData);
            // console.log('NuanceAudioPlayer.playByStream: buffer direkt erzeugen:', audioToPlay.length);
            audioBuffer = new AudioBuffer({ length: audioToPlay.length, numberOfChannels: 1, sampleRate: NUANCE_AUDIOSAMPLE_RATE });
            audioBuffer.getChannelData(0).set(audioToPlay);
        }
        catch (aException) {
            audioBuffer = null;
            console.log('NuanceAudioPlayer._getAudioBufferFirst: Exception', aException);
        }
        return audioBuffer;
    };
    /**
     * Hier wird der AudioBuffer ueber AudioContext.createBuffer() erzeugt
     *
     * @private
     * @param aData  - Audiodaten
     *
     * @return {AudioBuffer} Rueckgabe des erzeugten Audiobuffers oder null bei einem Fehler
     */
    NuanceAudioPlayer.prototype._getAudioBufferSecond = function (aData) {
        var audioBuffer = null;
        // fuer die Browser ohne AudioBuffer Constructor
        try {
            var audioToPlay = new Float32Array(aData.length);
            audioToPlay.set(aData);
            // console.log('NuanceAudioPlayer.playByStream: buffer erzeugen mit 16000 Samplerate:', audioToPlay.length);
            audioBuffer = this.mAudioContext.createBuffer(1, audioToPlay.length, NUANCE_AUDIOSAMPLE_RATE);
            audioBuffer.getChannelData(0).set(audioToPlay);
        }
        catch (aException) {
            audioBuffer = null;
            console.log('NuanceAudioPlayer._getAudioBufferSecond: Exception', aException);
        }
        return audioBuffer;
    };
    /**
     * Hier wird der Audiobuffer mit Resample erzeugt, um in Safari abgespielt zu werden
     * SampleRate wird von PCM 16000 Hz auf 22500 Hz angehoben, da createBuffer in Safari
     * erst ab dieser Frequenz arbeitet.
     *
     * @private
     * @param aData - Audiodaten
     *
     * @return {AudioBuffer} Rueckgabe des erzeugten Audiobuffers oder null bei einem Fehler
     */
    NuanceAudioPlayer.prototype._getAudioBufferResample = function (aData) {
        var audioBuffer = null;
        // Fuer Safari wird eine hoehere SampleRate als 16000 benoetigt, da createBuffer sonst nicht funktioniert
        // hier wird der Resampler eingesetzt
        try {
            // notwendig ist ein groesseres FloatArray 22500/16000 = 1.4 
            var audioToPlay = new Float32Array(aData.length * 1.4);
            audioToPlay.set(aData);
            // Resampler, um die Frequenz des AudioBuffers anzuheben auf 22500 Hz fuer Safari
            this.mResampler = new NuanceResampler(NUANCE_AUDIOSAMPLE_RATE, AUDIO_MIN_SAMPLERATE, 1, audioToPlay.length, undefined);
            var _audioToPlay = this.mResampler.resampler(audioToPlay);
            // console.log('NuanceAudioPlayer.playByStream: buffer erzeugen mit 22500 Samplerate:', _audioToPlay.length);
            audioBuffer = this.mAudioContext.createBuffer(1, _audioToPlay.length, AUDIO_MIN_SAMPLERATE);
            audioBuffer.getChannelData(0).set(_audioToPlay);
        }
        catch (aException) {
            audioBuffer = null;
            console.log('NuanceAudioPlayer._getAudioBufferResample: Exception', aException);
        }
        return audioBuffer;
    };
    // Player-Funktionen
    /**
     * Abspielen des Audiostreams
     *
     * @param {*} aOptions - Optionen
     * @param {*} aAudioArray - Audiostream
     */
    NuanceAudioPlayer.prototype.playByStream = function (aOptions, aAudioArray) {
        var _this = this;
        try {
            // console.log('NuanceConnect.playByStream: start', this.mAudioStopFlag);
            this.mOnAudioEndFunc = aOptions.onaudioend;
            if (aAudioArray.length === 0 || this.mAudioStopFlag) {
                this.mBeginSpeakFlag = true;
                // console.log( 'NuanceConnect.connect: source.onended' );
                aOptions.onaudioend();
                this.mOnAudioEndFunc = null;
                this.mAudioSource = null;
                return;
            }
            // console.log('NuanceAudioPlayer.playByStream: AudioContext.state = ', this.mAudioContext.state);
            this.mAudioSource = this.mAudioContext.createBufferSource();
            // TODO: falls mehrere Stream-Abschnitte verwendet werden
            this.mAudioSource.onended = function () { return _this.playByStream(aOptions, aAudioArray); };
            /*
            source.onended = () => {
                console.log( 'NuanceConnect.connect: source.onended' );
                aOptions.onaudioend();
            };
            */
            var desiredSampleRate = NUANCE_AUDIOSAMPLE_RATE;
            /*
            if ($("#selectCodec").val() === "audio/L16;rate=8000" || $("#selectCodec").val() === "audio/opus;rate=8000") {
                desiredSampleRate = 8000;
            }
            */
            // AudioBuffer direkt erzeugen
            var data = aAudioArray.shift();
            var audioBuffer = this._getAudioBufferFirst(data);
            // fuer die Browser ohne AudioBuffer Constructor
            if (!audioBuffer) {
                audioBuffer = this._getAudioBufferSecond(data);
            }
            // Fuer Safari wird eine hoehere SampleRate als 16000 benoetigt, da createBuffer sonst nicht funktioniert
            // hier wird der Resampler eingesetzt
            if (!audioBuffer) {
                audioBuffer = this._getAudioBufferResample(data);
            }
            if (!audioBuffer) {
                this._error('playByStream', 'kein Audiobuffer erzeugt');
                return;
            }
            this.mAudioSource.buffer = audioBuffer;
            this.mAudioSource.connect(this.mAudioContext.destination);
            // console.log('NuanceAudioPlayer.playByStream: audio start', this.mAudioSource);
            if (this.mAudioSource.start) {
                this.mAudioSource.start(0);
            }
            else {
                this.mAudioSource.noteOn(0);
            }
            aOptions.onaudiostart();
            // console.log('NuanceConnect.playByStream: end');
        }
        catch (aException) {
            this.mBeginSpeakFlag = true;
            // console.log( 'NuanceConnect.connect: source.onended' );
            aOptions.onaudioend();
            this.mOnAudioEndFunc = null;
            this.mAudioSource = null;
            console.log('NuanceAudioPlayer.playByStream: Exception', aException);
            this._exception('playByStream', aException);
        }
    };
    /**
     * Audiodaten abspielen
     *
     * @param aOptions - optionale Parameter (codec, onaudiostart)
     * @param aAudioData - abzuspielende Audiodaten
     */
    NuanceAudioPlayer.prototype.decode = function (aOptions, aAudioData) {
        try {
            // console.log('NuanceConnect.connect: object');
            if (this.mAudioCodec.findPcmCodec(aOptions.codec)) {
                var decodePCM16KData = this.mAudioCodec.decodePCM(aAudioData);
                this.mAudioArray.push(decodePCM16KData);
                this.mQueue.push(decodePCM16KData);
                // console.log('NuanceConnect.connect: PCM AudioSink', this.mBeginSpeakFlag);
                if (this.mBeginSpeakFlag) {
                    this.mBeginSpeakFlag = false;
                    this.playByStream(aOptions, this.mAudioArray);
                }
            }
            else if (this.mAudioCodec.findOpusCodec(aOptions.codec)) {
                /* Opus-Codec
                audioOpusDecodeArray.push( aMessage.data );
                if ( beginOpusDecodeFlag ) {
                    beginOpusDecodeFlag = false;
                    decodeOpus( audioOpusDecodeArray.shift(), this.mAudioSink.mQueue );
                }
                */
            }
            else {
                this._error('decode', 'Kein Decoder vorhanden fuer ' + aOptions.codec);
            }
        }
        catch (aException) {
            this._exception('decode', aException);
        }
    };
    /**
     * Audioausgabe stoppen
     */
    NuanceAudioPlayer.prototype.stop = function () {
        try {
            // console.log('NuanceAudioSink.stop');
            this.mAudioStopFlag = true;
            if (this.mAudioSource) {
                this.mAudioSource.stop(0);
                this.mAudioSource.disconnect(0);
                if (typeof this.mOnAudioEndFunc === 'function') {
                    // console.log( 'NuanceAudioPlayer.stop: send onended event' );
                    this.mOnAudioEndFunc();
                }
            }
        }
        catch (aException) {
            this._exception('stop', aException);
        }
        this.mAudioSource = null;
    };
    return NuanceAudioPlayer;
}(ErrorBase));

/**
 * TTS Anbindung an den Nuance-Service
 *
 * Letzte Aenderung: 18.01.2019
 * Status: gelb
 *
 * @module cloud/nuance/device
 * @author SB
 */
var NuanceTTS = /** @class */ (function (_super) {
    __extends(NuanceTTS, _super);
    /**
     * Erzeugt eine Instanz von NuanceTTS
     *
     * @param aConfig - Konfigurationsobjekt
     * @param aConnect - Verbindungsobjekt
     */
    function NuanceTTS(aConfig, aConnect, aAudioContext) {
        var _this = _super.call(this, 'NuanceTTS', aConfig, aConnect) || this;
        // Audio
        _this.mAudioContext = null;
        _this.mAudioPlayer = null;
        _this.mAudioContext = aAudioContext;
        return _this;
    }
    /**
     * Initialisierung der TTS Optionen
     *
     * @protected
     *
     * @return {any} Default Optionen fuer die TTS
     */
    NuanceTTS.prototype._getDefaultOption = function () {
        // console.log('NuanceTTS._getDefaultOption: start');
        var _this = this;
        var defaultOption = _super.prototype._getDefaultOption.call(this);
        defaultOption['onresult'] = function (aMessage) {
            // console.log( 'NuanceTTS._getDefaultOption: onresult', aMessage );
            if (aMessage.result_type === 'NMDP_TTS_CMD' || aMessage.result_type === 'NVC_TTS_CMD') ;
            else if (aMessage.message === 'query_error') {
                // console.log('NuanceTTS._getDefaultOption: onresult error = ', aMessage.reason);
                _this._onError(new Error('TTS-Error.' + aMessage.message + ': ' + aMessage.reason));
                _this._onStop();
            }
            else if (aMessage.message === 'disconnect') {
                if (aMessage.reason !== 'Transaction completed.') {
                    // console.error('TTS-Error:', aMessage.reason);
                    _this._onError(new Error('TTS-Error.' + aMessage.message + ': ' + aMessage.reason));
                    _this._onStop();
                }
            }
        };
        defaultOption['onttsdecode'] = function (aOption, aAudioData) {
            // console.log('NuanceTTS._getDefaultOption: ondecode');
            if (_this.mAudioPlayer) {
                _this.mAudioPlayer.decode(aOption, aAudioData);
            }
        };
        defaultOption['onttsstart'] = function () {
            // console.log('NuanceTTS._getDefaultOption: onttsstart');
            if (_this.mAudioPlayer) {
                _this.mAudioPlayer.start();
            }
        };
        defaultOption['onttscomplete'] = function () {
            // console.log('NuanceTTS._getDefaultOption: onttscomplete');
            if (_this.mAudioPlayer) {
                _this._onResult(_this.mAudioPlayer.mQueue);
            }
        };
        // wenn Audio wirklich abgespielt wird
        defaultOption['onaudiostart'] = function () {
            // console.log('NuanceTTS._getDefaultOption: onaudiostart');
            // TODO: muss eigentlich ein onAudioStart-Event sein
            _this._onStart();
        };
        defaultOption['onaudioend'] = function () {
            // console.log('NuanceTTS._getDefaultOption: onaudioend');
            // TODO: muss eigentlich ein onAudioEnd-Event sein
            _this.mAudioPlayer = null;
            _this._onStop();
        };
        return defaultOption;
    };
    // Nachrichten senden
    NuanceTTS.prototype._sendQueryBeginMessage = function (aTransactionId, aLanguage, aVoice, aCodec) {
        // console.log('NuanceTTS._sendStartMessage:', aTransactionId, aLanguage, aVoice, aCodec);
        var queryBeginMessage = {
            'message': 'query_begin',
            'transaction_id': aTransactionId,
            'command': 'NMDP_TTS_CMD',
            'language': aLanguage,
            'codec': aCodec,
            'tts_voice': aVoice
        };
        return this.mConnect.sendJSON(queryBeginMessage);
    };
    NuanceTTS.prototype._sendQueryParameterMessage = function (aTransactionId, aText) {
        // console.log('NuanceTTS._sendSynthesizeMessage:', aTransactionId, aText);
        var queryParameterMessage = {
            'message': 'query_parameter',
            'transaction_id': aTransactionId,
            'parameter_name': 'TEXT_TO_READ',
            'parameter_type': 'dictionary',
            'dictionary': {
                'audio_id': NUANCE_AUDIOTTS_ID,
                'tts_input': aText,
                'tts_type': 'text'
            }
        };
        return this.mConnect.sendJSON(queryParameterMessage);
    };
    /**
     *
     * @param aOptions
     * - text
     * - tag
     * - language
     * - voice
     * - codec
     * - onopen
     * - onclose
     * - onresult
     */
    NuanceTTS.prototype._start = function (aOptions) {
        var _this = this;
        aOptions = this._createOption(aOptions);
        var _options = Object.assign({}, aOptions);
        // console.log('NuanceTTS._playTTS:', _options);
        // oeffnen der Verbindung
        _options.onopen = function () {
            // console.log('NuanceTTS._playTTS: onopen start');
            aOptions.onopen();
            // Audiosenke eintragen
            _this.mAudioPlayer = new NuanceAudioPlayer(_this.mAudioContext);
            // wird nicht benoetigt
            // this.mAudioPlayer.transaction_id = this.mTransactionId;
            // Nachrichten senden
            _this._sendQueryBeginMessage(_this.mTransaction.transactionId, aOptions.language, aOptions.voice, aOptions.codec);
            _this._sendQueryParameterMessage(_this.mTransaction.transactionId, aOptions.text);
            _this._sendQueryEndMessage(_this.mTransaction.transactionId);
            // console.log('NuanceTTS._playTTS: onopen end');
        };
        // logische Verbindung mit Nuance-Server ufbauen
        this.mConnect.connect(_options);
    };
    NuanceTTS.prototype._stop = function () {
        // console.log('NuanceTTS._stop:', this.mAudioPlayer);
        // TODO: diese Nachricht muss nochmal auf Korrektheit geprueft werden
        /*
        const audioEndMessage = {
            'message': 'audio_end',
            'audio_id': NUANCE_AUDIOTTS_ID
        };
        this.mConnect.sendJSON( audioEndMessage );
        */
        if (this.mAudioPlayer) {
            this.mAudioPlayer.stop();
        }
    };
    return NuanceTTS;
}(NuanceDevice));

/**
 * NuancePort zur Verbindung des Nuance Mix Cloud-Service mit dem Framework
 * Stellt Grundfunktionen von Nuance zur Verfuegung. Werden von mehreren anderen
 * Komponenten geteilt.
 *
 * Letzte Aenderung: 20.03.2019
 * Status: rot
 *
 * @module cloud/nuance
 * @author SB
 */
// Konstanten
// Zeit die im Unlock-Event auf RESUME gewartet wird
var AUDIO_UNLOCK_TIMEOUT = 2000;
// Default Timeout fuer die Dauer einer Action, maximal eine Minute darf die Verarbeitung einer Action dauern,
// danach wird Stop erzwungen.
var NUANCE_ACTION_TIMEOUT = 60000;
/**
 * Definiert die NuancePort-Klasse
 */
var NuancePort = /** @class */ (function (_super) {
    __extends(NuancePort, _super);
    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */
    function NuancePort(aPortName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var _this = _super.call(this, aPortName || NUANCE_PORT_NAME, aRegisterFlag) || this;
        // externe Html5-Komponenten
        _this.mAudioContext = null;
        _this.mGetUserMedia = null;
        // externes Nuance-Objekt
        _this.mNuanceConfig = null;
        _this.mNuanceNetwork = null;
        _this.mNuanceWebSocket = null;
        _this.mNuanceConnect = null;
        _this.mNuanceTTS = null;
        _this.mNuanceASR = null;
        _this.mNuanceNLU = null;
        // weitere Attribute
        _this.mDynamicCredentialsFlag = false;
        _this.mTransaction = null;
        _this.mRunningFlag = false;
        _this.mDefaultOptions = null;
        _this.mActionTimeoutId = 0;
        _this.mActionTimeout = NUANCE_ACTION_TIMEOUT;
        return _this;
    }
    // Port-Funktionen
    /**
     * pruefen auf Mock-Port zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Port ein Mock zum Testen ist
     */
    NuancePort.prototype.isMock = function () {
        return false;
    };
    /**
     * Rueckgabe eines logischen Port-Typs
     *
     * @return {string} logischer Typ des Ports fuer unterschiedliche Anwendungsschnittstellen
     */
    NuancePort.prototype.getType = function () {
        return NUANCE_TYPE_NAME;
    };
    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */
    NuancePort.prototype.getClass = function () {
        return 'NuancePort';
    };
    NuancePort.prototype.getVersion = function () {
        return NUANCE_API_VERSION;
    };
    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */
    NuancePort.prototype._checkCredentials = function (aOption) {
        if (!aOption) {
            return false;
        }
        // App-Parameter pruefen
        if (typeof aOption.nuanceAppId !== 'string') {
            return false;
        }
        if (!aOption.nuanceAppId) {
            return false;
        }
        if (typeof aOption.nuanceAppKey !== 'string') {
            return false;
        }
        if (!aOption.nuanceAppKey) {
            return false;
        }
        // App-Parameter sind vorhanden
        return true;
    };
    /**
     * alle inneren Objekte initialisieren
     *
     * @param aOption - optionale Parameter
     */
    NuancePort.prototype._initAllObject = function (aOption) {
        // console.log('NuancePort._initAllObject:', aOption);
        // innere Komponenten eintragen
        var _this = this;
        var fileReader = new FileHtml5Reader();
        fileReader.init();
        var audioReader = new AudioHtml5Reader();
        audioReader.init({ audioContext: this.mAudioContext });
        this.mNuanceConfig = new NuanceConfig(fileReader);
        if (this.mNuanceConfig.init(aOption) !== 0) {
            return -1;
        }
        // Network-Anbindung erzeugen
        this.mNuanceNetwork = new NuanceNetwork();
        this.mNuanceNetwork.onOnline = function () { return _this._onOnline(); };
        this.mNuanceNetwork.onOffline = function () { return _this._onOffline(); };
        this.mNuanceNetwork.onError = function (aError) { return _this._onError(aError); };
        if (this.mNuanceNetwork.init(aOption) !== 0) {
            return -1;
        }
        // WebSocket-Anbindung erzeugen und WebSocket API pruefen
        this.mNuanceWebSocket = new NuanceWebSocket();
        this.mNuanceWebSocket.onOpen = function (aUrl) { return _this._onOpen(); };
        this.mNuanceWebSocket.onClose = function () { return _this._onClose(); };
        this.mNuanceWebSocket.onError = function (aError) { return _this._onError(aError); };
        if (this.mNuanceWebSocket.init(aOption) !== 0) {
            return -1;
        }
        this.mNuanceConnect = new NuanceConnect(this.mNuanceWebSocket);
        // Nuance-Komponenten erzeugen
        this.mNuanceNLU = new NuanceNLU(this.mNuanceConfig, this.mNuanceConnect);
        this.mNuanceNLU.onStart = function (aTransaction) { return _this._onStart(aTransaction.plugin, aTransaction.type); };
        this.mNuanceNLU.onStop = function (aTransaction) { return _this._onStop(aTransaction.plugin, aTransaction.type); };
        this.mNuanceNLU.onResult = function (aTransaction) { return _this._onResult(aTransaction.result, aTransaction.plugin, aTransaction.type); };
        this.mNuanceNLU.onError = function (aTransaction) { return _this._onError(aTransaction.error, aTransaction.plugin, aTransaction.type); };
        this.mNuanceNLU.onClose = function (aTransaction) { return _this._onClose(); };
        // pruefen auf Audiokontext, nur dann koennen TTS und ASR verwendet werden
        if (this.mAudioContext) {
            this.mNuanceTTS = new NuanceTTS(this.mNuanceConfig, this.mNuanceConnect, this.mAudioContext);
            this.mNuanceTTS.onStart = function (aTransaction) { return _this._onStart(aTransaction.plugin, aTransaction.type); };
            this.mNuanceTTS.onStop = function (aTransaction) { return _this._onStop(aTransaction.plugin, aTransaction.type); };
            this.mNuanceTTS.onResult = function (aTransaction) { return _this._onResult(aTransaction.result, aTransaction.plugin, aTransaction.type); };
            this.mNuanceTTS.onError = function (aTransaction) { return _this._onError(aTransaction.error, aTransaction.plugin, aTransaction.type); };
            this.mNuanceTTS.onClose = function (aTransaction) { return _this._onClose(); };
            try {
                if (this.mGetUserMedia) {
                    // ASR kann nur verwendet werden, wenn getUserMedia vorhanden ist
                    this.mNuanceASR = new NuanceASR(this.mNuanceConfig, this.mNuanceConnect, this.mAudioContext, this.mGetUserMedia, audioReader);
                    this.mNuanceASR.onStart = function (aTransaction) { return _this._onStart(aTransaction.plugin, aTransaction.type); };
                    this.mNuanceASR.onStop = function (aTransaction) { return _this._onStop(aTransaction.plugin, aTransaction.type); };
                    this.mNuanceASR.onResult = function (aTransaction) { return _this._onResult(aTransaction.result, aTransaction.plugin, aTransaction.type); };
                    this.mNuanceASR.onError = function (aTransaction) { return _this._onError(aTransaction.error, aTransaction.plugin, aTransaction.type); };
                    this.mNuanceASR.onClose = function (aTransaction) { return _this._onClose(); };
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
     *      nuanceAppId     - Nuance Credentials fuer APP_ID
     *      nuanceAppKey    - Nuance Credentials fuer APP_KEY
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
    NuancePort.prototype.init = function (aOption) {
        // console.log('NuancePort.init:', aOption);
        if (this.mInitFlag) {
            this._error('init', 'Port ist bereits initialisiert');
            return 0;
        }
        // pruefen auf dynamische Credentials
        if (aOption && typeof aOption.nuanceDynamicCredentialsFlag === 'boolean' && aOption.nuanceDynamicCredentialsFlag) {
            // dynamische Credentials koennen gesetzt werden
            this.mDynamicCredentialsFlag = true;
        }
        else {
            // pruefen auf Nuance App-Credientials Uebergabe
            if (!this._checkCredentials(aOption)) {
                this._error('init', 'keine AppId und/oder AppKey als Parameter uebergeben');
                return -1;
            }
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
        // Debug-Ausgabe fuer Nuance-Komponenten
        if (this.isErrorOutput()) {
            if (this.mNuanceNLU) {
                console.log('NuancePort: NLU ist vorhanden');
            }
            else {
                console.log('NuancePort: NLU ist nicht vorhanden');
            }
            if (this.mNuanceTTS) {
                console.log('NuancePort: TTS ist vorhanden');
            }
            else {
                console.log('NuancePort: TTS ist nicht vorhanden');
            }
            if (this.mNuanceASR) {
                console.log('NuancePort: ASR ist vorhanden');
            }
            else {
                console.log('NuancePort: ASR ist nicht vorhanden');
            }
        }
        return 0;
    };
    /**
     * gibt den Port frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    NuancePort.prototype.done = function () {
        _super.prototype.done.call(this);
        // Timeout loeschen 
        this._clearActionTimeout();
        // Audiokontext schliessen
        if (this.mAudioContext) {
            this.mAudioContext.close();
        }
        this.mAudioContext = null;
        this.mGetUserMedia = null;
        // externes Nuance-Objekt
        if (this.mNuanceConfig) {
            this.mNuanceConfig.done();
            this.mNuanceConfig = null;
        }
        if (this.mNuanceNetwork) {
            this.mNuanceNetwork.done();
            this.mNuanceNetwork = null;
        }
        if (this.mNuanceWebSocket) {
            this.mNuanceWebSocket.done();
            this.mNuanceWebSocket = null;
        }
        this.mNuanceConnect = null;
        this.mNuanceTTS = null;
        this.mNuanceASR = null;
        this.mNuanceNLU = null;
        // weitere Attribute
        this.mDynamicCredentialsFlag = false;
        this.mTransaction = null;
        this.mRunningFlag = false;
        this.mDefaultOptions = null;
        this.mActionTimeoutId = 0;
        this.mActionTimeout = NUANCE_ACTION_TIMEOUT;
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
    NuancePort.prototype.reset = function (aOption) {
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
    NuancePort.prototype._setErrorOutput = function (aErrorOutputFlag) {
        _super.prototype._setErrorOutput.call(this, aErrorOutputFlag);
        if (this.mNuanceConfig) {
            this.mNuanceConfig._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mNuanceNetwork) {
            this.mNuanceNetwork._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mNuanceWebSocket) {
            this.mNuanceWebSocket._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mNuanceConnect) {
            this.mNuanceConnect._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mNuanceTTS) {
            this.mNuanceTTS._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mNuanceASR) {
            this.mNuanceASR._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mNuanceNLU) {
            this.mNuanceNLU._setErrorOutput(aErrorOutputFlag);
        }
    };
    // Timeout-Funktionen
    /**
     * Aktion wird abgebrochen
     */
    NuancePort.prototype._breakAction = function () {
        // console.log('NuancePort._beakAction');
        this.mActionTimeoutId = 0;
        if (this.mTransaction) {
            this._error('_breakAction', 'Timeout fuer Action erreicht');
            this._onStop(this.mTransaction.plugin, this.mTransaction.type);
        }
    };
    /**
     * Timeout fuer Aktion setzen. Timeout wird nur gesetzt, wenn > 0
     */
    NuancePort.prototype._setActionTimeout = function () {
        var _this = this;
        // console.log('NuancePort._setActionTimeout');
        if (this.mActionTimeoutId === 0 && this.mActionTimeout > 0) {
            this.mActionTimeoutId = window.setTimeout(function () { return _this._breakAction(); }, this.mActionTimeout);
        }
    };
    /**
     * Timeout fuer Aktion loeschen
     */
    NuancePort.prototype._clearActionTimeout = function () {
        // console.log('NuancePort._clearActionTimeout');
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
    NuancePort.prototype._onOnline = function () {
        // console.log('NuancePort._onOnline');
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
    NuancePort.prototype._onOffline = function () {
        // console.log('NuancePort._onOffline');
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
    NuancePort.prototype._onStop = function (aDest, aType) {
        // console.log('NuancePort._onStop: Transaktion wird beendet', aDest, aType);
        // hier muss der Timeout geloescht werden, da die Transaktion zu Ende ist
        this._clearActionTimeout();
        // hier muss die Transaktion geloescht werden, da sie beendet ist
        this.mTransaction = null;
        this.mRunningFlag = false;
        // Hier wird die Verbindung zu onMessage der WebSocket geloescht
        if (this.mNuanceConnect) {
            this.mNuanceConnect.disconnect();
        }
        return _super.prototype._onStop.call(this, aDest, aType);
    };
    // Audio-Funktionen
    /**
     * Versuch, AudioContext zu entsperren
     *
     * @private
     */
    NuancePort.prototype._unlockAudio = function (aCallbackFunc) {
        // console.log('NuancePort._unlockAudio: start');
        // Timeout einstellen, um garantiert ein UnlockEvent zu erhalten
        if (this.mAudioContext) {
            if (this.mAudioContext.state === 'running') {
                aCallbackFunc(true);
                return;
            }
            if (this.mAudioContext.state === 'suspended') {
                // console.log('NuancePort._unlockAudio: start', this.mAudioContext.state);
                var timeoutId_1 = setTimeout(function () { return aCallbackFunc(false); }, AUDIO_UNLOCK_TIMEOUT);
                this.mAudioContext.resume().then(function () {
                    // console.log('NuancePort._unlockAudio: state = ', this.mAudioContext.state);
                    clearTimeout(timeoutId_1);
                    aCallbackFunc(true);
                }, function (aError) {
                    console.log('NuancePort._unlockAudio:', aError);
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
     * @param {NuanceConfigDataInterface} aConfigData - Konfigurationsdaten { nuanceAppKey: '', nuanceAppId: '', nuanceNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuancePort.prototype.setConfig = function (aConfigData) {
        if (this.mDynamicCredentialsFlag) {
            // Uebertragen der neuen Credentials
            try {
                if (typeof aConfigData.nuanceAppId === 'string' && aConfigData.nuanceAppId) {
                    this.mNuanceConfig.appId = aConfigData.nuanceAppId;
                }
                if (typeof aConfigData.nuanceAppKey === 'string' && aConfigData.nuanceAppKey) {
                    this.mNuanceConfig.appKey = aConfigData.nuanceAppKey;
                }
                if (typeof aConfigData.nuanceNluTag === 'string' && aConfigData.nuanceNluTag) {
                    this.mNuanceConfig.nluTag = aConfigData.nuanceNluTag;
                }
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
     * @return {NuanceConfigDataInterface} aktuelle Portkonfigurationsdaten
     */
    NuancePort.prototype.getConfig = function () {
        var configData = {
            nuanceAppId: this.mNuanceConfig.appId,
            nuanceAppKey: this.mNuanceConfig.appKey,
            nuanceNluTag: this.mNuanceConfig.nluTag
        };
        return configData;
    };
    /**
     * Pruefen auf Netzwerk-Verbindung
     *
     * @return {boolean} True, wenn Netwerk verbunden ist, ansonsten false
     */
    NuancePort.prototype.isOnline = function () {
        if (this.mNuanceNetwork) {
            return this.mNuanceNetwork.isOnline();
        }
        return false;
    };
    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */
    NuancePort.prototype.isOpen = function () {
        return this._isConnect();
    };
    /**
     * Pruefen und Oeffnen der WebSocket, wenn moeglich
     *
     * @private
     * @param aOpenCallbackFunc - Callback fuer WebSocket geoeffnet oder nicht
     */
    NuancePort.prototype._checkOpen = function (aOpenCallbackFunc) {
        var _this = this;
        // console.log('NuancePort.checkOpen:', this.isErrorOutput());
        // pruefen, ob Netzwerk vorhanden ist
        if (!this.isOnline()) {
            // console.log('NuancePort._checkOpen: kein Netz vorhanden');
            this._error('_checkOpen', 'kein Netz vorhanden');
            aOpenCallbackFunc(false);
            return -1;
        }
        // pruefen ob WebSocket geoeffnet ist
        if (this.isOpen()) {
            // console.log('NuancePort._checkOpen: WebSocket ist geoeffnet');
            aOpenCallbackFunc(true);
            return 0;
        }
        // pruefen auf Closing
        if (this.mNuanceWebSocket.getState() === 'CLOSING') {
            // console.log('NuancePort._checkOpen: WebSocket wird geschlossen');
            this._error('_checkOpen', 'Websocket wird geschlossen');
            aOpenCallbackFunc(false);
            return -1;
        }
        // WebSocket pruefen
        if (!this.mNuanceWebSocket) {
            // console.log('NuancePort._checkOpen: WebSocket nicht vorhanden');
            this._error('_checkOpen', 'Websocket ist nicht vorhanden');
            aOpenCallbackFunc(false);
            return -1;
        }
        // WebSocket oeffnen
        this.mNuanceWebSocket.onOpen = function (aUrl) {
            // console.log('NuancePort._checkOpen: onOpen Event');
            // alte Funktion wieder eintragen
            _this.mNuanceWebSocket.onOpen = function (aUrl) { return _this._onOpen(); };
            _this.mNuanceWebSocket.onClose = function () { return _this._onClose(); };
            _this.mNuanceWebSocket.onError = function (aError) { return _this._onError(aError); };
            aOpenCallbackFunc(true);
            return 0;
        };
        // WebSocket schliessen
        this.mNuanceWebSocket.onClose = function () {
            // console.log('NuancePort._checkOpen: onClose Event');
            // alte Funktion wieder eintragen
            _this.mNuanceWebSocket.onOpen = function (aUrl) { return _this._onOpen(); };
            _this.mNuanceWebSocket.onClose = function () { return _this._onClose(); };
            _this.mNuanceWebSocket.onError = function (aError) { return _this._onError(aError); };
            aOpenCallbackFunc(false);
            return 0;
        };
        // WebSocket Fehler behandeln
        this.mNuanceWebSocket.onError = function (aError) {
            // console.log('NuancePort._checkOpen: onError Event:', aError);
            // alte Funktion wieder eintragen
            _this.mNuanceWebSocket.onOpen = function (aUrl) { return _this._onOpen(); };
            _this.mNuanceWebSocket.onClose = function () { return _this._onClose(); };
            _this.mNuanceWebSocket.onError = function (aError) { return _this._onError(aError); };
            aOpenCallbackFunc(false);
            return 0;
        };
        // Websocket oeffnen
        return this.open();
    };
    /**
     * Port oeffnen
     *
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuancePort.prototype.open = function (aOption) {
        return this._connect(aOption);
    };
    /**
     * Port schliessen
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuancePort.prototype.close = function () {
        return this._disconnect();
    };
    /**
     * Rueckgabe des Pluginnamens, der gerade eine Transaktion ausfuehrt
     *
     * @return {string} PluginName oder leerer String
     */
    NuancePort.prototype.getPluginName = function () {
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
    NuancePort.prototype.getActionName = function () {
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
    NuancePort.prototype.isRunning = function (aPluginName, aAction) {
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
     * Pruefen, welche Nuance-Aktionen ausfuehrbar sind.
     *
     * @param {string} aAction - Name der zu pruefenden Aktion
     *
     * @return {boolean} True, wenn Aktion ausfuehrbar ist, False sonst
     */
    NuancePort.prototype.isAction = function (aAction) {
        var result = false;
        switch (aAction) {
            case NUANCE_NLU_ACTION:
                result = this.mNuanceNLU ? true : false;
                break;
            case NUANCE_ASRNLU_ACTION:
            case NUANCE_ASR_ACTION:
                result = this.mNuanceASR ? true : false;
                break;
            case NUANCE_TTS_ACTION:
                result = this.mNuanceTTS ? true : false;
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
    NuancePort.prototype.setActionTimeout = function (aTimeout) {
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
    NuancePort.prototype.start = function (aPluginName, aAction, aOption) {
        var _this = this;
        // pruefen, ob eine Aktion bereits laeuft
        if (this.isRunning()) {
            this._error('start', 'Aktion laeuft bereits');
            return -1;
        }
        // pruefen auf Credentials
        if (!this.mNuanceConfig.isCredentials()) {
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
                case NUANCE_NLU_ACTION:
                    _this.mTransaction = new NuanceTransaction(aPluginName, NUANCE_NLU_ACTION);
                    result = _this._startNLU(_this.mTransaction, option.text, option.language || NUANCE_DEFAULT_LANGUAGE);
                    break;
                case NUANCE_ASRNLU_ACTION:
                    _this.mTransaction = new NuanceTransaction(aPluginName, NUANCE_ASRNLU_ACTION);
                    result = _this._startASR(_this.mTransaction, option.language || NUANCE_DEFAULT_LANGUAGE, option.audioURL || '', true, option.useProgressive || false);
                    break;
                case NUANCE_ASR_ACTION:
                    _this.mTransaction = new NuanceTransaction(aPluginName, NUANCE_ASR_ACTION);
                    result = _this._startASR(_this.mTransaction, option.language || NUANCE_DEFAULT_LANGUAGE, option.audioURL || '', false, option.useProgressive || false);
                    break;
                case NUANCE_TTS_ACTION:
                    _this.mTransaction = new NuanceTransaction(aPluginName, NUANCE_TTS_ACTION);
                    result = _this._startTTS(_this.mTransaction, option.text, option.language || NUANCE_DEFAULT_LANGUAGE, option.voice || NUANCE_DEFAULT_VOICE);
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
    NuancePort.prototype.stop = function (aPluginName, aAction, aOption) {
        // console.log('NuancePort.stop:', aPluginName, aAction, aOption, this.mTransaction);
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
        if (!this.mNuanceConfig.isCredentials()) {
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
            case NUANCE_NLU_ACTION:
                result = this._stopNLU(this.mTransaction);
                break;
            case NUANCE_ASRNLU_ACTION:
            case NUANCE_ASR_ACTION:
                result = this._stopASR(this.mTransaction);
                break;
            case NUANCE_TTS_ACTION:
                result = this._stopTTS(this.mTransaction);
                break;
            default:
                this._error('stop', 'Keine gueltige Aktion uebergeben ' + aAction);
                result = -1;
                break;
        }
        this.mRunningFlag = false;
        return result;
    };
    // Nuance-Funktionen
    /**
     * Initialisierung der Recognition
     *
     * @protected
     * @param {*} aOption - optionale Parameter fuer die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuancePort.prototype._initRecognition = function (aOption) {
        var _this = this;
        // console.log('NuancePort._initRecognition: start');
        this.mDefaultOptions = {
            onopen: function () {
                console.log('Websocket Opened');
                // this._onRecognitionOpen();
            },
            onclose: function () {
                console.log('Websocket Closed');
                _this._onClose();
            },
            onerror: function (error) {
                console.error(error);
                _this._onError(error);
            }
        };
        // console.log('NuancePort._initRecognition: end');
        return 0;
    };
    // Connection
    NuancePort.prototype._isConnect = function () {
        if (this.mNuanceWebSocket) {
            // console.log('NuancePort._isConnect:', this.mNuanceWebSocket.getState());
            return this.mNuanceWebSocket.isConnect();
        }
        return false;
    };
    /**
     * WebSocket-Verbindung herstellen
     *
     * @returns {number}
     * @memberof NuancePort
     */
    NuancePort.prototype._connect = function (aOption) {
        // console.log('NuancePort._connect');
        if (this._isConnect()) {
            // Kein Fehler, Verbindung ist bereits vorhanden
            return 0;
        }
        if (!this.mNuanceWebSocket) {
            this._error('_connect', 'kein NuanceWebSocket vorhanden');
            return -1;
        }
        try {
            this.mNuanceWebSocket.connect(this.mNuanceConfig.serverUrl || NUANCE_DEFAULT_URL);
            return 0;
        }
        catch (aException) {
            this._exception('_connect', aException);
            return -1;
        }
    };
    NuancePort.prototype._disconnect = function () {
        // console.log('NuancePort._disconnect');
        if (!this._isConnect()) {
            return 0;
        }
        if (!this.mNuanceWebSocket) {
            this._error('_disconnect', 'kein NuanceWebSocket vorhanden');
            return -1;
        }
        try {
            // console.log('NuancePort._disconnect: WebSocket Verbindung getrennt');
            this.mNuanceWebSocket.disconnect();
            return 0;
        }
        catch (aException) {
            this._exception('_disconnect', aException);
            return -1;
        }
    };
    // Text-Funktionen
    /**
     * Intent zu einem Text holen
     *
     * @private
     * @param {NuanceTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - Text der interpretiert werden soll
     * @param {string} aLanguage - Sprache des Textes der interpretiert werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuancePort.prototype._startNLU = function (aTransaction, aText, aLanguage) {
        if (!aText) {
            this._error('_startNLU', 'keinen Text uebergeben');
            return -1;
        }
        if (!aLanguage) {
            this._error('_startNLU', 'keine Sprache uebergeben');
            return -1;
        }
        if (!this.mNuanceNLU) {
            this._error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden');
            return -1;
        }
        try {
            var option = {
                text: aText,
                language: aLanguage
            };
            return this.mNuanceNLU.start(aTransaction, option);
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
     * @param {NuanceTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuancePort.prototype._stopNLU = function (aTransaction) {
        if (!this.mNuanceNLU) {
            this._error('_stopNLU', 'keine Nuance NLU-Anbindung vorhanden');
            return -1;
        }
        try {
            return this.mNuanceNLU.stop(aTransaction);
        }
        catch (aException) {
            this._exception('_stopNLU', aException);
            return -1;
        }
    };
    // ASR-Funktionen
    /**
     * startet die Recognition
     *
     * @private
     * @param {NuanceTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @returns {number} Fehlercode 0 oder -1
     */
    NuancePort.prototype._startASR = function (aTransaction, aLanguage, aAudioUrl, aUseNLUFlag, aProgressiveFlag) {
        if (aUseNLUFlag === void 0) { aUseNLUFlag = false; }
        if (aProgressiveFlag === void 0) { aProgressiveFlag = false; }
        // console.log('NuancePort._startASR');
        if (!aLanguage) {
            this._error('_startASR', 'keine Sprache uebergeben');
            return -1;
        }
        if (!this.mNuanceASR) {
            this._error('_startASR', 'keine Nuance ASR-Anbindung vorhanden');
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
            return this.mNuanceASR.start(aTransaction, option);
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
     * @param {NuanceTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuancePort.prototype._stopASR = function (aTransaction) {
        // console.log('NuancePort._stopASR');
        if (!this.mNuanceASR) {
            this._error('_stopASR', 'keine Nuance ASR-Anbindung vorhanden');
            return -1;
        }
        try {
            return this.mNuanceASR.stop(aTransaction);
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
     * @param {NuanceTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - auszusprechender Text
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuancePort.prototype._startTTS = function (aTransaction, aText, aLanguage, aVoice) {
        var _this = this;
        if (!aText) {
            this._error('_startTTS', 'keinen Text uebergeben');
            return -1;
        }
        if (!this.mNuanceTTS) {
            this._error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden');
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
            // console.log('NuancePort._startTTS: AudioContext.state = ', this.mAudioContext.state);
            this._unlockAudio(function (aUnlockFlag) {
                if (aUnlockFlag) {
                    _this.mNuanceTTS.start(aTransaction, option_1);
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
     * @param {NuanceTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuancePort.prototype._stopTTS = function (aTransaction) {
        // console.log('NuancePort._stopTTS', aTransaction);
        if (!this.mNuanceTTS) {
            this._error('_stopTTS', 'keine Nuance TTS-Anbindung vorhanden');
            return -1;
        }
        try {
            return this.mNuanceTTS.stop(aTransaction);
        }
        catch (aException) {
            this._exception('_stopTTS', aException);
            return -1;
        }
    };
    return NuancePort;
}(Port));

/**
 * NuanceMock zum Testen des Nuance Mix Cloud-Service mit dem Framework
 *
 * Letzte Aenderung: 14.03.2019
 * Status: rot
 *
 * @module cloud/nuance
 * @author SB
 */
// Konstanten
// Asynchrones senden von Events nach 100 millisekunden
var NUANCEMOCK_CALLBACK_TIMEOUT = 100;
/**
 * Definiert die NuanceMock-Klasse
 */
var NuanceMock = /** @class */ (function (_super) {
    __extends(NuanceMock, _super);
    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */
    function NuanceMock(aPortName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var _this = _super.call(this, aPortName || NUANCE_MOCK_NAME, aRegisterFlag) || this;
        _this.webSocketFlag = true;
        _this.audioContextFlag = true;
        _this.getUserMediaFlag = true;
        _this.nuanceNLUFlag = true;
        _this.nuanceASRFlag = true;
        _this.nuanceTTSFlag = true;
        // weitere Attribute
        _this.disconnectFlag = true;
        _this.defaultOptions = null;
        _this.codec = '';
        _this.intentName = 'TestIntent';
        _this.intentConfidence = 1.0;
        _this.mDynamicCredentialsFlag = false;
        _this.mTransaction = null;
        _this.mRunningFlag = false;
        // Credentials
        _this.nuanceAppId = '';
        _this.nuanceAppKey = '';
        _this.nuanceNluTag = '';
        return _this;
    }
    // Port-Funktionen
    /**
     * pruefen auf Mock-Port zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Port ein Mock zum Testen ist
     */
    NuanceMock.prototype.isMock = function () {
        return true;
    };
    /**
     * Rueckgabe eines logischen Port-Typs
     *
     * @return {string} logischer Typ des Ports fuer unterschiedliche Anwendungsschnittstellen
     */
    NuanceMock.prototype.getType = function () {
        return NUANCE_TYPE_NAME;
    };
    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */
    NuanceMock.prototype.getClass = function () {
        return 'NuanceMock';
    };
    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */
    NuanceMock.prototype._checkCredentials = function (aOption) {
        if (!aOption) {
            return false;
        }
        if (typeof aOption.nuanceAppId === 'string') {
            this.nuanceAppId = aOption.nuanceAppId;
        }
        if (typeof aOption.nuanceAppKey === 'string') {
            this.nuanceAppKey = aOption.nuanceAppKey;
        }
        if (typeof aOption.nuanceNluTag === 'string') {
            this.nuanceNluTag = aOption.nuanceNluTag;
        }
        // App-Parameter pruefen
        if (typeof aOption.nuanceAppId !== 'string') {
            return false;
        }
        if (!aOption.nuanceAppId) {
            return false;
        }
        if (typeof aOption.nuanceAppKey !== 'string') {
            return false;
        }
        if (!aOption.nuanceAppKey) {
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
    NuanceMock.prototype.init = function (aOption) {
        // console.log('NuanceMock: init start', aOption);
        if (this.mInitFlag) {
            this._error('init', 'Init bereits aufgerufen');
            return 0;
        }
        // pruefen auf dynamische Credentials
        if (aOption && typeof aOption.nuanceDynamicCredentialsFlag === 'boolean' && aOption.nuanceDynamicCredentialsFlag) {
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
        this.nuanceNLUFlag = true;
        if (this.audioContextFlag) {
            this.nuanceASRFlag = true;
            if (this.getUserMediaFlag) {
                this.nuanceTTSFlag = true;
            }
        }
        if (this.isErrorOutput()) {
            if (this.nuanceNLUFlag) {
                console.log('NuanceMock: NLU ist vorhanden');
            }
            else {
                console.log('NuanceMock: NLU ist nicht vorhanden');
            }
            if (this.nuanceTTSFlag) {
                console.log('NuanceMock: TTS ist vorhanden');
            }
            else {
                console.log('NuanceMock: TTS ist nicht vorhanden');
            }
            if (this.nuanceASRFlag) {
                console.log('NuanceMock: ASR ist vorhanden');
            }
            else {
                console.log('NuanceMock: ASR ist nicht vorhanden');
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
    NuanceMock.prototype.done = function (aFreeFlag) {
        _super.prototype.done.call(this);
        this.webSocketFlag = true;
        this.audioContextFlag = true;
        this.getUserMediaFlag = true;
        this.nuanceNLUFlag = false;
        this.nuanceASRFlag = false;
        this.nuanceTTSFlag = false;
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
    NuanceMock.prototype.reset = function (aOption) {
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
    NuanceMock.prototype._onStop = function (aDest, aType) {
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
     * @param {NuanceConfigDataInterface} aConfigData - Konfigurationsdaten { nuanceAppKey: '', nuanceAppId: '', nuanceNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuanceMock.prototype.setConfig = function (aConfigData) {
        if (this.mDynamicCredentialsFlag) {
            // Uebertragen der neuen Credentials
            try {
                this.nuanceAppId = aConfigData.nuanceAppId;
                this.nuanceAppKey = aConfigData.nuanceAppKey;
                if (typeof aConfigData.nuanceNluTag === 'string') {
                    this.nuanceNluTag = aConfigData.nuanceNluTag;
                }
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
     * @return {NuanceConfigDataInterface} aktuelle Portkonfigurationsdaten
     */
    NuanceMock.prototype.getConfig = function () {
        var configData = {
            nuanceAppId: this.nuanceAppId,
            nuanceAppKey: this.nuanceAppKey,
            nuanceNluTag: this.nuanceNluTag
        };
        return configData;
    };
    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */
    NuanceMock.prototype.isOpen = function () {
        return !this.disconnectFlag;
    };
    /**
     * Port oeffnen
     *
     * @param {*} aOption - optionale Parameter
     * @return {number} Fehlercode 0 oder -1
     */
    NuanceMock.prototype.open = function (aOption) {
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
    NuanceMock.prototype.close = function () {
        this.disconnectFlag = true;
        return 0;
    };
    /**
     * Pruefen auf beschaeftigten Port.
     *
     * @return {boolean} True, Port ist beschaeftigt, False sonst
     */
    NuanceMock.prototype.isRunning = function () {
        return this.mRunningFlag;
    };
    NuanceMock.prototype._isCredentials = function () {
        if (this.nuanceAppId && this.nuanceAppKey) {
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
    NuanceMock.prototype.isAction = function (aAction) {
        var result = false;
        switch (aAction) {
            case NUANCE_NLU_ACTION:
                result = this.nuanceNLUFlag;
                break;
            case NUANCE_ASRNLU_ACTION:
            case NUANCE_ASR_ACTION:
                result = this.nuanceASRFlag;
                break;
            case NUANCE_TTS_ACTION:
                result = this.nuanceTTSFlag;
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
    NuanceMock.prototype.start = function (aPluginName, aAction, aOption) {
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
            case NUANCE_NLU_ACTION:
                this.mTransaction = new NuanceTransaction(aPluginName, NUANCE_NLU_ACTION);
                result = this._startNLU(this.mTransaction, option.text, option.language || NUANCE_DEFAULT_LANGUAGE);
                break;
            case NUANCE_ASRNLU_ACTION:
                this.mTransaction = new NuanceTransaction(aPluginName, NUANCE_ASRNLU_ACTION);
                result = this._startASR(this.mTransaction, option.language || NUANCE_DEFAULT_LANGUAGE, option.audioURL || '', true, option.useProgressive || false);
                break;
            case NUANCE_ASR_ACTION:
                this.mTransaction = new NuanceTransaction(aPluginName, NUANCE_ASR_ACTION);
                result = this._startASR(this.mTransaction, option.language || NUANCE_DEFAULT_LANGUAGE, option.audioURL || '', false, option.useProgressive || false);
                break;
            case NUANCE_TTS_ACTION:
                this.mTransaction = new NuanceTransaction(aPluginName, NUANCE_TTS_ACTION);
                result = this._startTTS(this.mTransaction, option.text, option.language || NUANCE_DEFAULT_LANGUAGE, option.voice || NUANCE_DEFAULT_VOICE);
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
    NuanceMock.prototype.stop = function (aPluginName, aAction, aOption) {
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
            case NUANCE_NLU_ACTION:
                result = this._stopNLU(this.mTransaction);
                break;
            case NUANCE_ASRNLU_ACTION:
            case NUANCE_ASR_ACTION:
                result = this._stopASR(this.mTransaction);
                break;
            case NUANCE_TTS_ACTION:
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
     * @param {NuanceTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - Text der interpretiert werden soll
     * @param {string} aLanguage - Sprache des Textes der interpretiert werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuanceMock.prototype._startNLU = function (aTransaction, aText, aLanguage) {
        if (!aText) {
            this._error('_startNLU', 'keinen Text uebergeben');
            return -1;
        }
        if (!this.nuanceNLUFlag) {
            this._error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden');
            return -1;
        }
        try {
            // Nachrichten senden
            this._onStart(aTransaction.plugin, aTransaction.type);
            var event_1 = [
                {
                    action: {
                        intent: {
                            value: this.intentName,
                            confidence: this.intentConfidence
                        }
                    },
                    literal: aText
                }
            ];
            aTransaction.result = event_1;
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
     * @param {NuanceTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuanceMock.prototype._stopNLU = function (aTransaction) {
        this._onStop(aTransaction.plugin, aTransaction.type);
        // kein Stop der NLU notwendig
        return 0;
    };
    // ASR-Funktionen
    /**
     * startet die Recognition
     *
     * @private
     * @param {NuanceTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @returns {number} Fehlercode 0 oder -1
     */
    NuanceMock.prototype._startASR = function (aTransaction, aLanguage, aAudioUrl, aUseNLUFlag, aProgressiveFlag) {
        // console.log('NuancePort._startASR');
        if (!this.nuanceASRFlag) {
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
     * @param {NuanceTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuanceMock.prototype._stopASR = function (aTransaction) {
        if (!this.nuanceASRFlag) {
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
     * @param {NuanceTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - auszusprechender Text
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuanceMock.prototype._startTTS = function (aTransaction, aText, aLanguage, aVoice) {
        var _this = this;
        if (!aText) {
            this._error('_startTTS', 'keinen Text uebergeben');
            return -1;
        }
        if (!this.nuanceTTSFlag) {
            this._error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden');
            return -1;
        }
        try {
            // Nachrichten senden
            this._onStart(aTransaction.plugin, aTransaction.type);
            // asynchron TTS-Stop Event senden
            setTimeout(function () { return _this._onStop(aTransaction.plugin, aTransaction.type); }, NUANCEMOCK_CALLBACK_TIMEOUT);
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
     * @param {NuanceTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    NuanceMock.prototype._stopTTS = function (aTransaction) {
        if (!this.nuanceTTSFlag) {
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
    return NuanceMock;
}(Port));

/**
 * Nuance zur Verwaltung des NuancePort
 *
 * Hier wird die Manager-Schnittstelle von Nuance definiert, um Nuance zu
 * initialisieren und als Port zu oeffnen.
 *
 * API-Version: 1.1
 * Datum:       06.02.2019
 *
 * Letzte Aenderung: 14.02.2019
 * Status: rot
 *
 * @module cloud/nuance
 * @author SB
 */
/**
 * statische Nuance-Klasse zur Erzeugung des NuancePorts
 */
var Nuance = /** @class */ (function () {
    // statische Klasse, keine Instanz erzeugbar !
    function Nuance() {
    }
    // Fehler-Funktionen
    Nuance.setErrorOutputOn = function () {
        Nuance.mErrorOutputFlag = true;
        PortManager.setErrorOutputOn();
    };
    Nuance.setErrorOutputOff = function () {
        Nuance.mErrorOutputFlag = false;
        PortManager.setErrorOutputOff();
    };
    Nuance.setErrorOutputFunc = function (aErrorFunc) {
        PortManager._setErrorOutputFunc(aErrorFunc);
    };
    /**
     * Initialisiert den NuancePort.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    Nuance._initNuancePort = function (aNuanceOption) {
        // console.log('Nuance._initNuancePort:', aNuanceOption);
        var port = PortManager.get(NUANCE_TYPE_NAME, NuancePort);
        if (!port) {
            return -1;
        }
        if (port.init(aNuanceOption) !== 0) {
            PortManager.remove(NUANCE_TYPE_NAME);
            return -1;
        }
        Nuance.mCurrentPort = port;
        return 0;
    };
    /**
     * Initialisiert den NuanceMock.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    Nuance._initNuanceMock = function (aNuanceOption) {
        // console.log('Nuance._initNuanceMock:', aNuanceOption);
        var port = PortManager.get(NUANCE_TYPE_NAME, NuanceMock);
        if (!port) {
            console.log('Nuance._initNuanceMock: Error NuanceMock wurde nicht erzeugt');
            return -1;
        }
        if (port.init(aNuanceOption) !== 0) {
            console.log('Nuance._initNuanceMock: Error NuanceMock wurde nicht initialisiert');
            PortManager.remove(NUANCE_TYPE_NAME);
            return -1;
        }
        Nuance.mCurrentPort = port;
        return 0;
    };
    /**
     * Initialisiert den NuancePorts
     *
     * @static
     * @param {NuanceOptionInterface} aOption - Nuance-Parameter (nuanceAppId, nuanceAppKey, nuanceNluTag)
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Nuance.init = function (aOption) {
        // console.log('Nuance.init:', aOption);
        if (Nuance.mInitFlag) {
            return 0;
        }
        // pruefen auf Optionen
        if (!aOption) {
            if (Nuance.mErrorOutputFlag) {
                console.log('Nuance.init: Keine Nuance-Parameter uebergeben');
            }
            return -1;
        }
        // pruefen auf ErrorOutputFlag
        if (typeof aOption.errorOutputFlag === 'boolean') {
            if (aOption.errorOutputFlag) {
                Nuance.setErrorOutputOn();
            }
            else {
                Nuance.setErrorOutputOff();
            }
        }
        // hier wird der zu erzeugende Portname selectiert
        var portName = 'NuancePort';
        if (aOption && typeof aOption.nuancePortName === 'string') {
            if (aOption.nuancePortName === 'NuanceMock') {
                portName = 'NuanceMock';
            }
        }
        // hier wird der Nuance-Port initialisiert
        // console.log('Nuance.init: PortName = ', portName);
        if (portName === 'NuancePort') {
            if (Nuance._initNuancePort(aOption) !== 0) {
                return -1;
            }
        }
        else if (portName === 'NuanceMock') {
            if (Nuance._initNuanceMock(aOption) !== 0) {
                return -1;
            }
        }
        else {
            if (Nuance.mErrorOutputFlag) {
                console.log('Nuance.init: Kein Nuance PortName vorhanden');
            }
            return -1;
        }
        // console.log('Nuance.init: end', result);
        Nuance.mInitFlag = true;
        return 0;
    };
    Nuance.isInit = function () {
        return Nuance.mInitFlag;
    };
    /**
     * Freigabe des NuancePorts
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    Nuance.done = function () {
        // console.log('Nuance.done: start');
        var port = PortManager.find(NUANCE_TYPE_NAME);
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if (!port) {
            port = Nuance.mCurrentPort;
        }
        var result = 0;
        if (port) {
            // console.log('Nuance.done: port.done, PortManager.remove');
            result = port.done();
            PortManager.remove(NUANCE_TYPE_NAME);
        }
        Nuance.mCurrentPort = null;
        Nuance.mInitFlag = false;
        return result;
    };
    // Port-Funktionen
    Nuance._onOpenEvent = function (aError, aPortName, aPortResult, aOpenEventCallback) {
        if (typeof aOpenEventCallback === 'function') {
            try {
                // console.log('Nuance._onOpenEvent:', aPortName, aPortResult);
                aOpenEventCallback(aError, aPortName, aPortResult);
                return 0;
            }
            catch (aException) {
                if (Nuance.mErrorOutputFlag) {
                    console.log('Nuance._onOpenEvent: Exception', aException.message);
                }
                return -1;
            }
        }
        return 0;
    };
    /**
     * Oeffnet den NuancePort
     *
     * @param {function} aOpenEventCallback - Funktion fuer OpenEvent-Ereignis fn( PortName: string, PortResult: number)
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Nuance._openNuancePort = function (aOpenEventCallback) {
        // console.log('Nuance._openNuancePort: start');
        var port = PortManager.find(NUANCE_TYPE_NAME);
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if (!port) {
            port = Nuance.mCurrentPort;
        }
        if (!port) {
            if (Nuance.mErrorOutputFlag) {
                console.log('Nuance._openNuancePort: kein Port vorhanden');
            }
            Nuance._onOpenEvent(new Error('Nuance._openNUancePort: Kein Port vorhanden'), NUANCE_TYPE_NAME, -1, aOpenEventCallback);
            return -1;
        }
        // Events verarbeiten
        port.addOpenEvent(NUANCE_TYPE_NAME, function (aEvent) {
            port.removeErrorEvent(NUANCE_TYPE_NAME);
            port.removeOpenEvent(NUANCE_TYPE_NAME);
            // console.log('Nuance._openNuancePort: openEvent');
            if (typeof aOpenEventCallback === 'function') {
                Nuance._onOpenEvent(null, NUANCE_TYPE_NAME, aEvent.result, aOpenEventCallback);
            }
            return aEvent.result;
        });
        port.addErrorEvent(NUANCE_TYPE_NAME, function (aError) {
            port.removeOpenEvent(NUANCE_TYPE_NAME);
            port.removeErrorEvent(NUANCE_TYPE_NAME);
            // console.log('Nuance._openNuancePort: errorEvent', aError.message);
            if (typeof aOpenEventCallback === 'function') {
                Nuance._onOpenEvent(aError, NUANCE_TYPE_NAME, -1, aOpenEventCallback);
            }
            return 0;
        });
        // Port oeffnen
        return port.open();
    };
    /**
     * Oeffnet den NuancePort
     *
     * @static
     * @param {function} aOpenEventCallback - Ereignis-Funktion fuer Port geoeffnet
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Nuance.open = function (aOpenEventCallback) {
        if (!Nuance.mInitFlag) {
            if (Nuance.mErrorOutputFlag) {
                console.log('Nuance.open: Init wurde nicht aufgerufen');
            }
            Nuance._onOpenEvent(new Error('Nuance.open: Init wurde nicht aufgerufen'), NUANCE_TYPE_NAME, -1, aOpenEventCallback);
            return -1;
        }
        // hier wird der Nuance-Port geoeffnet
        var result = Nuance._openNuancePort(aOpenEventCallback);
        // console.log('Nuance.open: end', result);
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
    Nuance.setConfig = function (aConfigData) {
        if (Nuance.mCurrentPort) {
            return Nuance.mCurrentPort.setConfig(aConfigData);
        }
        return -1;
    };
    /**
     * Gibt die aktuellen Credentials zurueck.
     *
     * @static
     * @return {NuanceConfigDataInterface} Konfigurationsdaten zurueckgeben
     */
    Nuance.getConfig = function () {
        if (Nuance.mCurrentPort) {
            return Nuance.mCurrentPort.getConfig();
        }
        return { nuanceAppId: '', nuanceAppKey: '' };
    };
    Nuance.mInitFlag = false;
    Nuance.mErrorOutputFlag = false;
    Nuance.mCurrentPort = null;
    return Nuance;
}());

export { NUANCE_ASRNLU_ACTION, NUANCE_ASR_ACTION, NUANCE_NLU_ACTION, NUANCE_TTS_ACTION, NUANCE_TYPE_NAME, Nuance };
