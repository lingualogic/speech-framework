import { PortManager } from '../../core/port/port-manager.ts';
import { FactoryManager } from '../../core/factory/factory-manager.ts';
import { Port } from '../../core/port/port.ts';
import { FileHtml5Reader } from '../../common/html5/file-html5-reader.ts';
import { AudioHtml5Reader } from '../../common/html5/audio-html5-reader.ts';
import { AUDIOCONTEXT_FACTORY_NAME, AudioContextFactory } from '../../common/html5/audiocontext-factory.ts';
import { USERMEDIA_FACTORY_NAME, UserMediaFactory } from '../../common/html5/usermedia-factory.ts';
import { ErrorBase } from '../../core/error/error-base.ts';
import { NetHtml5Connect } from '../../common/html5/net-html5-connect.ts';

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
var MICROSOFT_TYPE_NAME = 'Microsoft';
var MICROSOFT_PORT_NAME = 'MicrosoftPort';
var MICROSOFT_MOCK_NAME = 'MicrosoftMock';
// Default URL des Microsoft-Service
var MICROSOFT_SERVER_URL = '';
var MICROSOFT_DEFAULT_URL = MICROSOFT_SERVER_URL;
// Aktionen
var MICROSOFT_NLU_ACTION = 'NLU';
var MICROSOFT_ASR_ACTION = 'ASR';
var MICROSOFT_ASRNLU_ACTION = 'ASRNLU';
var MICROSOFT_TTS_ACTION = 'TTS';
// Konfigurationsdaten
var MICROSOFT_CONFIG_PATH = 'assets/';
var MICROSOFT_CONFIG_FILE = 'microsoft.json';
var MICROSOFT_CONFIG_LOAD = false;
// Sprachen
var MICROSOFT_DE_LANGUAGE = 'de-DE';
var MICROSOFT_DEFAULT_LANGUAGE = MICROSOFT_DE_LANGUAGE;
// Microsoft Stimmen
var MICROSOFT_TTS_VOICE1 = 'de-DE-Hedda';
var MICROSOFT_TTS_VOICE = MICROSOFT_TTS_VOICE1;
var MICROSOFT_DEFAULT_VOICE = MICROSOFT_TTS_VOICE;
// Audio-Codec
var MICROSOFT_PCM_CODEC = 'audio/L16;rate=16000';
var MICROSOFT_AUDIOSAMPLE_RATE = 16000;
var MICROSOFT_AUDIO_FORMAT = 'raw-16khz-16bit-mono-pcm';

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
 * Speech-Microsoft Version und Build Konstanten
 *
 * @module cloud/microsoft
 * @author SB
 */
var MICROSOFT_VERSION_NUMBER = '0.1.1';
var MICROSOFT_VERSION_BUILD = '0002';
var MICROSOFT_VERSION_TYPE = 'ALPHA';
var MICROSOFT_VERSION_DATE = '28.08.2019';
// tslint:disable-next-line
var MICROSOFT_VERSION_STRING = MICROSOFT_VERSION_NUMBER + '.' + MICROSOFT_VERSION_BUILD + ' vom ' + MICROSOFT_VERSION_DATE + ' (' + MICROSOFT_VERSION_TYPE + ')';
var MICROSOFT_API_VERSION = MICROSOFT_VERSION_STRING;

/**
 * Event-Klasse fuer alle Microsoft-Transaktionen
 *
 * Letzte Aenderung: 17.06.2019
 * Status: rot
 *
 * @module cloud/microsoft
 * @author SB
 */
var MicrosoftTransaction = /** @class */ (function () {
    function MicrosoftTransaction(aPluginName, aType) {
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
        MicrosoftTransaction.mTransactionCounter += 1;
        this.transactionId = MicrosoftTransaction.mTransactionCounter;
    }
    MicrosoftTransaction.mTransactionCounter = 0;
    return MicrosoftTransaction;
}());

/**
 * Microsoft Konstanten Verwaltung
 *
 * Letzte Aenderung: 17.06.2019
 * Status: rot
 *
 * @module cloud/microsoft
 * @author SB
 */
var MicrosoftConfig = /** @class */ (function (_super) {
    __extends(MicrosoftConfig, _super);
    /**
     * Creates an instance of MicrosoftConfig.
     */
    function MicrosoftConfig(aFileReader) {
        var _this = _super.call(this, 'MicrosoftConfig') || this;
        _this.mInitFlag = false;
        // Configdatei-Daten
        _this.mConfigPath = MICROSOFT_CONFIG_PATH;
        _this.mConfigFile = MICROSOFT_CONFIG_FILE;
        _this.mConfigLoadFlag = MICROSOFT_CONFIG_LOAD;
        // Nuance-Konfigurationsdaten
        _this.mConfigServerUrl = MICROSOFT_DEFAULT_URL;
        _this.mConfigRegion = '';
        _this.mConfigSubscriptionKey = '';
        _this.mConfigLuisEndpoint = '';
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
    MicrosoftConfig.prototype._setOption = function (aOption) {
        if (!aOption) {
            return;
        }
        // Parameter eintragen
        if (typeof aOption.microsoftConfigPath === 'string') {
            this.mConfigPath = aOption.microsoftConfigPath;
        }
        if (typeof aOption.microsoftConfigFile === 'string') {
            this.mConfigFile = aOption.microsoftConfigFile;
        }
        if (typeof aOption.microsoftConfigLoadFlag === 'boolean') {
            this.mConfigLoadFlag = aOption.microsoftConfigLoadFlag;
        }
        if (typeof aOption.microsoftServerUrl === 'string') {
            this.mConfigServerUrl = aOption.microsoftServerUrl;
        }
        if (typeof aOption.microsoftRegion === 'string') {
            this.mConfigRegion = aOption.microsoftRegion;
        }
        if (typeof aOption.microsoftSubscriptionKey === 'string') {
            this.mConfigSubscriptionKey = aOption.microsoftSubscriptionKey;
        }
        if (typeof aOption.microsoftLuisEndpoint === 'string') {
            this.mConfigLuisEndpoint = aOption.microsoftLuisEndpoint;
        }
        if (typeof aOption.microsoftUserId === 'string') {
            this.mConfigUserId = aOption.microsoftUserId;
        }
        if (typeof aOption.microsoftNluTag === 'string') {
            this.mConfigNluTag = aOption.microsoftNluTag;
        }
    };
    /**
     * Initialisierung von FileReader
     *
     * @param {MicrosoftOptionInterface} aOptions - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    MicrosoftConfig.prototype.init = function (aOption) {
        // console.log('MicrosoftConfig.init:', aOption);
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
    MicrosoftConfig.prototype.done = function () {
        this.mInitFlag = false;
        this.mConfigPath = MICROSOFT_CONFIG_PATH;
        this.mConfigFile = MICROSOFT_CONFIG_FILE;
        this.mConfigLoadFlag = MICROSOFT_CONFIG_LOAD;
        // Nuance-Konfigurationsdaten
        this.mConfigServerUrl = MICROSOFT_DEFAULT_URL;
        this.mConfigRegion = '';
        this.mConfigSubscriptionKey = '';
        this.mConfigLuisEndpoint = '';
        this.mConfigUserId = '';
        this.mConfigNluTag = '';
        // FileReader
        this.mFileReader = null;
        // Initialisierung fertig
        this.mOnInitFunc = null;
        return 0;
    };
    MicrosoftConfig.prototype.isInit = function () {
        return this.mInitFlag;
    };
    /**
     * Sendet Event fuer fertige Initialisierung
     *
     * @param aResult - Fehlercode 0 oder -1
     */
    MicrosoftConfig.prototype._onInit = function (aResult) {
        // console.log('MicrosoftConfig._onInit: start', aResult);
        // Initflag wird nur gesetzt, wenn der Init-Event erfolgreich war
        if (aResult === 0) {
            this.mInitFlag = true;
        }
        if (typeof this.mOnInitFunc === 'function') {
            // console.log('MicrosoftConfig._onInit: call', aResult);
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
    MicrosoftConfig.prototype._onError = function (aError) {
        // console.log('MicrosoftConfig._onError:', aError);
        if (typeof this.mOnErrorFunc === 'function') {
            try {
                // console.log('MicrosoftConfig._onError: call', this.mOnErrorFunc);
                this.mOnErrorFunc(aError);
                return 0;
            }
            catch (aException) {
                if (this.isErrorOutput()) {
                    // hier darf nicht this._exception() verwendet werden, da sonst eine Endlosschleife entstehen kann!
                    console.log('===> EXCEPTION MicrosoftConfig._onError: ', aException.message);
                }
                return -1;
            }
        }
        return 0;
    };
    Object.defineProperty(MicrosoftConfig.prototype, "onInit", {
        /**
         * Initialisierungs-Event eintragen
         */
        set: function (aOnInitFunc) {
            // console.log('MicrosoftConfig.set onInit:', aOnInitFunc);
            this.mOnInitFunc = aOnInitFunc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MicrosoftConfig.prototype, "onError", {
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
     * Einlesen der Config-Daten aus google.json (REGION, IDENTITY_POOL_ID)
     *
     * @param aFileData - ConfigDaten als JSON-String
     */
    MicrosoftConfig.prototype._readConfigData = function (aFileData) {
        // console.log('MicrosoftConfig._readConfigData:', aFileData);
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
            if (configData.REGION) {
                this.region = configData.REGION;
            }
            if (configData.SUBSCRIPTION_KEY) {
                this.subscriptionKey = configData.SUBSCRIPTION_KEY;
            }
            if (configData.LUIS_ENDPOINT) {
                this.luisEndpoint = configData.LUIS_ENDPOINT;
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
    MicrosoftConfig.prototype._readError = function (aErrorText) {
        this._error('_readError', aErrorText);
        this._onInit(-1);
    };
    /**
     * asynchrones Einlesen der Konfigurationsdaten
     */
    MicrosoftConfig.prototype.read = function () {
        if (!this.mFileReader) {
            this._error('read', 'kein FileReader vorhanden');
            this._onInit(-1);
            return -1;
        }
        var fileUrl = this.mConfigPath + this.mConfigFile;
        return this.mFileReader.read(fileUrl);
    };
    Object.defineProperty(MicrosoftConfig.prototype, "serverUrl", {
        get: function () {
            // console.log('MicrosoftConfig.getServerUrl:', this.mConfigServerUrl);
            return this.mConfigServerUrl;
        },
        // Konfigurations-Funktionen
        set: function (aUrl) {
            // console.log('MicrosoftConfig.setServerUrl:', aUrl);
            this.mConfigServerUrl = aUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MicrosoftConfig.prototype, "region", {
        get: function () {
            return this.mConfigRegion;
        },
        set: function (aRegion) {
            this.mConfigRegion = aRegion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MicrosoftConfig.prototype, "subscriptionKey", {
        get: function () {
            return this.mConfigSubscriptionKey;
        },
        set: function (aSubscriptionKey) {
            this.mConfigSubscriptionKey = aSubscriptionKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MicrosoftConfig.prototype, "luisEndpoint", {
        get: function () {
            return this.mConfigLuisEndpoint;
        },
        set: function (aLuisEndpoint) {
            this.mConfigLuisEndpoint = aLuisEndpoint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MicrosoftConfig.prototype, "userId", {
        get: function () {
            return this.mConfigUserId;
        },
        set: function (aUserId) {
            this.mConfigUserId = aUserId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MicrosoftConfig.prototype, "nluTag", {
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
    MicrosoftConfig.prototype.isCredentials = function () {
        if (this.mConfigSubscriptionKey && this.mConfigRegion) {
            return true;
        }
        return false;
    };
    return MicrosoftConfig;
}(ErrorBase));

/**
 * Definiert die Network fuer Microsoft
 *
 * Letzte Aenderung: 17.06.2019
 * Status: rot
 *
 * @module cloud/microsoft/net
 * @author SB
 */
var MicrosoftNetwork = /** @class */ (function (_super) {
    __extends(MicrosoftNetwork, _super);
    function MicrosoftNetwork() {
        return _super.call(this, 'MicrosoftNetwork') || this;
    }
    return MicrosoftNetwork;
}(NetHtml5Connect));

/**
 * Definiert die Verbindung zum Microsoft-Service
 *
 * Letzte Aenderung: 17.06.2019
 * Status: rot
 *
 * @module cloud/microsoft/net
 * @author SB
 */
/**
 * Dient zur Verbindungsaufnahme mit AWS Credentials.
 */
var MicrosoftConnect = /** @class */ (function (_super) {
    __extends(MicrosoftConnect, _super);
    /**
     * Erzeugt eine Instanz von NuanceConnect
     *
     * @param aConfig - Microsoft Config Objekt
     */
    function MicrosoftConnect(aConfig) {
        var _this = _super.call(this, 'MicrosoftConnect') || this;
        // innere Komponenten
        _this.mConfig = null;
        // Verbindung vorhanden
        _this.mConnectFlag = false;
        // Credentials-Objekt fuer Microsoft-SDK
        _this.mSpeechConfig = null;
        _this.mConfig = aConfig;
        return _this;
    }
    Object.defineProperty(MicrosoftConnect.prototype, "speechConfig", {
        /**
         * Rueckgabe der Microsoft SpeechConfig
         */
        get: function () {
            return this.mSpeechConfig;
        },
        enumerable: true,
        configurable: true
    });
    // Verbindungs-Funktionen
    MicrosoftConnect.prototype.isConnect = function () {
        return this.mConnectFlag;
    };
    /**
     * Verbindungsaufbau mit Microsoft-Service.
     */
    MicrosoftConnect.prototype.connect = function () {
        // Initialize the Microsoft Cognito credentials provider
        // console.log('MicrosoftConnect: Credentials eintragen in AWS');
        if (this.isConnect()) {
            // Verbindung ist bereits aufgebaut
            return 0;
        }
        try {
            // pruefen auf Miccorsoft SpeechSDK
            if (!window.SpeechSDK) {
                this._error('connect', 'kein Microsoft SpeechSDK vorhanden');
                return -1;
            }
            // pruefen auf Credentials
            // console.log('MicrosoftConnect: Region = ', this.mConfig.region);
            // console.log('MicrosoftConnect: SubscriptionKey = ', this.mConfig.subscriptioinKey);
            if (this.mConfig.region && this.mConfig.subscriptionKey) {
                this.mSpeechConfig = window.SpeechSDK.SpeechConfig.fromSubscription(this.mConfig.subscriptionKey, this.mConfig.region);
                if (!this.mSpeechConfig) {
                    this._error('connect', 'keine Microsoft-Credentials erzeugt');
                    return -1;
                }
            }
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
    MicrosoftConnect.prototype.disconnect = function () {
        this.mConnectFlag = false;
        this.mSpeechConfig = null;
        return 0;
    };
    return MicrosoftConnect;
}(ErrorBase));

/**
 * Microsoft Geraeteklasse fuer TTS, ASR und NLU
 *
 * Letzte Aenderung: 08.03.2020
 * Status: rot
 *
 * @module cloud/microsoft/device
 * @author SB
 */
/**
 * Basisklasse akller Microsoft-Geraete
 */
var MicrosoftDevice = /** @class */ (function (_super) {
    __extends(MicrosoftDevice, _super);
    /**
     * Erzeugt eine Instanz von NuanceDevice
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */
    function MicrosoftDevice(aDeviceName, aConfig, aConnect) {
        var _this = _super.call(this, aDeviceName || 'MicrosoftDevice') || this;
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
    MicrosoftDevice.prototype._onStart = function () {
        // console.log('MicrosoftDevice._onStart');
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
    MicrosoftDevice.prototype._onStop = function () {
        // console.log('MicrosoftDevice._onStop:', this.mTransaction, this.onStop );
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
    MicrosoftDevice.prototype._onResult = function (aResult) {
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
    MicrosoftDevice.prototype._onError = function (aError) {
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
    MicrosoftDevice.prototype._onClose = function () {
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
    // TODO: wird in Microsoft nicht gebraucht
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
    // TODO: wird in Microsoft nicht gebraucht
    /****
    _createOption( aOverrideOption: any): any {
        // console.log( 'NuanceNLU._createOption:', aOverrideOption );
        const option = Object.assign( aOverrideOption, this._getDefaultOption());
        option.appId = aOverrideOption.appId || this.mConfig.appId || '';
        option.appKey = aOverrideOption.appKey || this.mConfig.appKey || '';
        option.userId = aOverrideOption.userId || this.mConfig.userId;
        option.tag = aOverrideOption.tag || this.mConfig.nluTag || '';
        option.language = aOverrideOption.language || MICROSOFT_DEFAULT_LANGUAGE;
        option.text = aOverrideOption.text || '';
        option.voice = aOverrideOption.voice || MICROSOFT_DEFAULT_VOICE;
        option.codec = aOverrideOption.codec || MICROSOFT_DEFAULT_CODEC;
        return option;
    }
    ****/
    // Nachrichten senden
    // TODO: wird in Microsoft nicht gebraucht
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
    MicrosoftDevice.prototype._start = function (aOption) {
        // muss von erbenden Klassen ueberschrieben werden
    };
    /**
     * Interne Geraete Stopfunktion
     *
     * @protected
     */
    MicrosoftDevice.prototype._stop = function () {
        // muss von erbenden Klassen ueberschrieben werden
    };
    /**
     * Geraeteaktion starten
     *
     * @param {MicrosoftTransaction} aTransaction - auszufuehrende Transaktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftDevice.prototype.start = function (aTransaction, aOption) {
        // console.log('MicrosoftDevice.start:', aTransaction, aOption);
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
     * @param {MicrosoftTransaction} aTransaction - auszufuehrende Transaktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftDevice.prototype.stop = function (aTransaction) {
        // console.log('MicrosoftDevice.stop:', aTransaction);
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
    MicrosoftDevice.prototype.isTransaction = function () {
        if (this.mTransaction) {
            return true;
        }
        return false;
    };
    /**
     * Transaktion zurueckgeben
     */
    MicrosoftDevice.prototype.getTransaction = function () {
        return this.mTransaction;
    };
    /**
     * Transaktion loeschen
     */
    MicrosoftDevice.prototype.clearTransaction = function () {
        this.mTransaction = null;
    };
    return MicrosoftDevice;
}(ErrorBase));

/**
 * NLU Anbindung an den Microsoft-Service, hier wird nur ein Text in einen Intent umgewandelt
 *
 * Letzte Aenderung: 28.08.2019
 * Status: rot
 *
 * @module cloud/microsoft/device
 * @author SB
 */
var MicrosoftNLU = /** @class */ (function (_super) {
    __extends(MicrosoftNLU, _super);
    /**
     * Erzeugt eine Instanz der NLU
     *
     * @param aConfig - Konfigurationsobjekt fuer Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zum Server
     */
    function MicrosoftNLU(aConfig, aConnect) {
        return _super.call(this, 'MicrosoftNLU', aConfig, aConnect) || this;
    }
    // NLU-Funktionen
    /**
     * started die NLU
     *
     * @param options - Parameter fuer die NLU
     */
    MicrosoftNLU.prototype._start = function (aOptions) {
        var _this = this;
        // console.log('MicrosoftNLU._start: ', aOptions);
        try {
            // pruefen auf vorhandenen Luis-Endpunkt
            var luisEndpoint = this.mConfig.luisEndpoint;
            if (!luisEndpoint) {
                this._onError(new Error('NLU-Error: kein Luis-Endpunkt vorhanden'));
                this._onStop();
                return;
            }
            // Http-Request fuer Luis-Abfrage senden
            var httpRequest_1 = new XMLHttpRequest();
            var url = luisEndpoint + aOptions.text;
            httpRequest_1.responseType = 'json';
            httpRequest_1.onload = function (aEvent) {
                try {
                    // console.log('MicrosoftNLU._start: onload ', httpRequest.response);
                    _this._onResult(httpRequest_1.response);
                }
                catch (aException) {
                    _this._onError(new Error('NLU-Exception: ' + aException.message));
                }
                _this._onStop();
            };
            httpRequest_1.onerror = function (aEvent) {
                console.log('MicrosoftNLU._start: onerror ', aEvent);
            };
            httpRequest_1.onabort = function (aEvent) {
                console.log('MicrosoftNLU._start: onabort ', aEvent);
            };
            httpRequest_1.open("GET", url);
            httpRequest_1.send();
        }
        catch (aException) {
            this._exception('_start', aException);
        }
    };
    MicrosoftNLU.prototype._stop = function () {
        // console.log('MicrosoftNLU._stop');
    };
    return MicrosoftNLU;
}(MicrosoftDevice));

/**
 * ASR Anbindung an den Microsoft-Service
 *
 * Letzte Aenderung: 08.03.2020
 * Status: rot
 *
 * @module cloud/microsoft/device
 * @author SB
 */
var MicrosoftASR = /** @class */ (function (_super) {
    __extends(MicrosoftASR, _super);
    function MicrosoftASR(aConfig, aConnect, aAudioContext, aGetUserMedia, aAudioReader) {
        var _this = _super.call(this, 'MicrosoftASR', aConfig, aConnect) || this;
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
        _this.mRecognizer = null;
        _this.mAudioContext = aAudioContext;
        _this.mGetUserMedia = aGetUserMedia;
        _this.mAudioReader = aAudioReader;
        return _this;
    }
    // ASR-Funktionen
    MicrosoftASR.prototype._startAudio = function (aOption) {
    };
    /**
     * Echtzeitstreamen vom Mikrophon zur Sprachernkennung
     *
     * @param aOption
     */
    // TODO: Muss mehr dem SDK von Microsoft angepasst werden fuer die Fehlerbehandung
    MicrosoftASR.prototype._startASR = function (aOption) {
        var _this = this;
        try {
            if (!window.SpeechSDK) {
                this._error('_startASR', 'kein Microsoft SpeechSDK vorhanden');
                return -1;
            }
            // Sprache einstellen
            var speechConfig = this.mConnect.speechConfig;
            if (!speechConfig) {
                this._error('_startASR', 'kein Microsoft SpeechConfig vorhanden');
                return -1;
            }
            speechConfig.speechRecognitionLanguage = 'de-DE';
            if (aOption.language) {
                speechConfig.speechRecognitionLanguage = aOption.language;
            }
            // Mikrofon als Audioquelle holen
            var audioConfig = window.SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
            // Speech Recognition aufrufen
            this.mRecordingFlag = true;
            this.mRecognizer = new window.SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
            this.mRecognizer.recognizeOnceAsync(function (aResult) {
                // console.log('MicrosoftASR._startASR:', aResult);
                // pruefen auf vorgekommenen Fehler
                if (!aResult.privErrorDetails) {
                    _this._onResult(aResult);
                    _this._stop();
                }
            }, function (aError) {
                // console.log('MicrosoftASR._startASR: Error ', aError);
                _this._onError(new Error('ASR-Error: ' + aError));
                _this._stop();
            });
            return 0;
        }
        catch (aException) {
            this._exception('_startASR', aException);
            return -1;
        }
    };
    /**
     * startet die Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftASR.prototype._start = function (aOption) {
        // console.log('MicrosoftASR._start:', aOption.language);
        if (this.mRecordingFlag) {
            this._error('_start', 'ASR laeuft bereits');
            return -1;
        }
        /*
        // TODO: Hier muss zwischen vorhandenen Audiodaten zum Streamen und dem Mikrofon
        //       als Audioquelle unterschieden werden.

        if ( aOption && aOption.audioURL ) {
            const option = {
                audioURL: aOption.audioURL,
                language: aOption.language
            };
            if ( aOption.nlu ) {
                option['nlu'] = true;
                option['tag'] = this.mConfig.nluTag;
            }
            if ( aOption.progressive ) {
                option['progressive'] = true;
            }
            try {
                this._startAudio( option );
            } catch ( aException ) {
                this._exception( '_start', aException );
            }
        } else {
            if ( !this.mGetUserMedia ) {
                this._error( '_start', 'kein getUserMedia vorhanden' );
                return -1;
            }
            this.mVolumeCounter = 0;
            this.mTimeoutCounter = 0;
            try {
                // Verbindung mit dem Mikrofon herstellen ueber einen Stream
                // console.log('NuanceASR._start: getUserMedia = ', this.mGetUserMedia);
                this.mGetUserMedia({ audio: true, video: false }).then((stream: any) => {
                    // console.log('NuanceASR._start: getUserMedia = ', stream);
                    this.mUserMediaStream = stream;
                    const option = {
                        userMediaStream: this.mUserMediaStream,
                        language: aOption.language,
                        tag: this.mConfig.nluTag
                    };
                    if ( aOption.nlu ) {
                        option['nlu'] = true;
                    }
                    if ( aOption.progressive ) {
                        option['progressive'] = true;
                    }
                    try {
                        this._startASR( option );
                    } catch ( aException ) {
                        this._exception( '_start', aException );
                    }
                }, (aError) => {
                    // console.log('NuanceASR._start: getMediaError', aError);
                    this._onError( new Error( 'ASR-Error: kein UserMedia erzeugt' ));
                    this._error( '_start', 'keine UserMedia erzeugt: ' + aError.message );
                    // hier muss die ASR sofort beendet werden
                    this._onStop();
                });
                return 0;
            } catch ( aException ) {
                this._exception( '_start', aException );
                return -1;
            }
        }
        */
        var option = {
            language: aOption.language,
        };
        return this._startASR(option);
    };
    MicrosoftASR.prototype._stop = function () {
        // console.log('MicrosoftASR._stop');
        this.mRecordingFlag = false;
        try {
            if (this.mRecognizer) {
                this.mRecognizer.close();
                this.mRecognizer = null;
                this._onStop();
            }
            return 0;
        }
        catch (aException) {
            return -1;
        }
    };
    return MicrosoftASR;
}(MicrosoftDevice));

/**
 * MicrosoftAudioCodec fuer Encode/Decode PCM
 *
 * Zur Zeit wird nur PCM-Codec unterstuetzt.
 *
 * Letzte Aenderung: 17.06.2019
 * Status: rot
 *
 * @module cloud/microsoft/audio
 * @author SB
 */
// Konstanten
var PCM_L16CodecArray = ['audio/L16;rate=8000', 'audio/L16;rate=16000'];
/**
 * Klasse MicrosoftAudioCodec zur Codierung/Decodierung von Audiodaten
 */
var MicrosoftAudioCodec = /** @class */ (function (_super) {
    __extends(MicrosoftAudioCodec, _super);
    function MicrosoftAudioCodec() {
        return _super.call(this, 'MicrosoftAudioCodec') || this;
    }
    // Codec-Funktionen
    /**
     * Codec pruefen
     *
     * @private
     * @param {string} aCodec - zu pruefender Codec
     * @param {string[]} aCodecArray - Codec-Array
     */
    MicrosoftAudioCodec.prototype._findCodec = function (aCodec, aCodecArray) {
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
    MicrosoftAudioCodec.prototype.findPcmCodec = function (aCodec) {
        return this._findCodec(aCodec, PCM_L16CodecArray);
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
    MicrosoftAudioCodec.prototype._float32ToInt16 = function (aFloat32) {
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
    MicrosoftAudioCodec.prototype._float32ArrayToInt16Array = function (aFloat32Array) {
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
    MicrosoftAudioCodec.prototype.encodePCM = function (aFrame, aCodec) {
        if (this.findPcmCodec(aCodec)) {
            return [this._float32ArrayToInt16Array(aFrame)];
        }
        return [aFrame];
    };
    // Decode-Funktionen
    /**
     * Umwandlung von UInt8-Array nach Int16 nach Float32-Array
     *
     * Poly liefert ein UInt8-Array als PCM, welches umgewandelt werden muss.
     *
     * @param {*} aAudioData - umzuwandelnde Audiodaten
     */
    MicrosoftAudioCodec.prototype.decodePCM = function (aAudioData) {
        try {
            var buffer = new Uint8Array(aAudioData);
            var bufferLength = buffer.length;
            var outputArray = new Float32Array(bufferLength / 2);
            // Schleife fuer alle UInt8-Werte
            var valueArray = new Int16Array(1);
            var j = 0;
            for (var i = 0; i < bufferLength; i = i + 2) {
                // Umwandlung in Int16
                valueArray[0] = (buffer[i + 1] << 8) + buffer[i];
                // Umwandlung in Float32
                outputArray[j] = valueArray[0] / 32768;
                j++;
            }
            return outputArray;
        }
        catch (aException) {
            // console.log('MicrosoftAudioCodec.decodePCM: Exception', aException);
            this._exception('decodePCM', aException);
            return [];
        }
    };
    return MicrosoftAudioCodec;
}(ErrorBase));

/**
 * externe Resampler-Klasse
 *
 * Letzte Aenderung: 17.06.2019
 * Status: rot
 *
 * @module cloud/microsoft/audio
 * @author SB
 */
// JavaScript Audio Resampler (c) 2011 - Grant Galitz
// https://github.com/taisel/XAudioJS/blob/master/resampler.js
var MicrosoftResampler = /** @class */ (function () {
    function MicrosoftResampler(fromSampleRate, toSampleRate, channels, outputBufferSize, noReturn) {
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
    MicrosoftResampler.prototype.initialize = function () {
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
    MicrosoftResampler.prototype.compileInterpolationFunction = function () {
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
    MicrosoftResampler.prototype.bypassResampler = function (buffer) {
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
    MicrosoftResampler.prototype.bufferSlice = function (sliceAmount) {
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
    MicrosoftResampler.prototype.initializeBuffers = function (generateTailCache) {
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
    return MicrosoftResampler;
}());

/**
 * MicrosoftAudioPlayer fuer Abspielen von Sprachdaten
 *
 * Zur Zeit wird nur PCM-Codec unterstuetzt.
 *
 * Letzte Aenderung: 08.03.2020
 * Status: rot
 *
 * @module cloud/microsoft/audio
 * @author SB
 */
// Minimum-Samplerate fuer Safari
var AUDIO_MIN_SAMPLERATE = 22500;
/**
 * Klasse MicrosoftAudioPlayer zum Absielen des Microsoft-Audiostreams
 */
var MicrosoftAudioPlayer = /** @class */ (function (_super) {
    __extends(MicrosoftAudioPlayer, _super);
    /**
     * Konstruktor
     *
     * @param aAudioContext - globaler AudioContext
     */
    function MicrosoftAudioPlayer(aAudioContext) {
        var _this = _super.call(this, 'MicrosoftAudioPlayer') || this;
        _this.mAudioContext = null;
        _this.mAudioCodec = null;
        _this.mResampler = null;
        _this.mOnAudioStartFunc = null;
        _this.mOnAudioStopFunc = null;
        _this.mAudioSource = null;
        _this.mAudioArray = [];
        _this.mQueue = [];
        _this.mBeginSpeakFlag = true;
        _this.mAudioStopFlag = false;
        _this.mAudioContext = aAudioContext;
        // TODO: wird hier erst mal temporaer eingefuegt. Muss spaeter einmal uebergeben werden
        _this.mAudioCodec = new MicrosoftAudioCodec();
        return _this;
    }
    /**
     * Start-Event fuer Audio
     */
    MicrosoftAudioPlayer.prototype._onAudioStart = function () {
        if (this.mOnAudioStartFunc) {
            try {
                this.mOnAudioStartFunc();
            }
            catch (aException) {
                this._exception('_onAudioStart', aException);
            }
        }
    };
    /**
     *
     */
    MicrosoftAudioPlayer.prototype._onAudioStop = function () {
        if (this.mOnAudioStopFunc) {
            try {
                this.mOnAudioStopFunc();
            }
            catch (aException) {
                this._exception('_onAudioStop', aException);
            }
        }
    };
    Object.defineProperty(MicrosoftAudioPlayer.prototype, "onAudioStart", {
        set: function (aAudioStartFunc) {
            this.mOnAudioStartFunc = aAudioStartFunc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MicrosoftAudioPlayer.prototype, "onAudioStop", {
        set: function (aAudioStopFunc) {
            this.mOnAudioStopFunc = aAudioStopFunc;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Start der Wiedergabe
     */
    MicrosoftAudioPlayer.prototype.start = function () {
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
    MicrosoftAudioPlayer.prototype._getAudioBufferFirst = function (aData) {
        var audioBuffer = null;
        // fuer die meisten aktuellen Browser mit AudioBuffer Constructor 
        try {
            var audioToPlay = new Float32Array(aData.length);
            audioToPlay.set(aData);
            // console.log('MicrosoftAudioPlayer.playByStream: buffer direkt erzeugen:', audioToPlay.length);
            audioBuffer = new AudioBuffer({ length: audioToPlay.length, numberOfChannels: 1, sampleRate: MICROSOFT_AUDIOSAMPLE_RATE });
            audioBuffer.getChannelData(0).set(audioToPlay);
        }
        catch (aException) {
            audioBuffer = null;
            console.log('MicrosoftAudioPlayer._getAudioBufferFirst: Exception', aException);
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
    MicrosoftAudioPlayer.prototype._getAudioBufferSecond = function (aData) {
        var audioBuffer = null;
        // fuer die Browser ohne AudioBuffer Constructor
        try {
            var audioToPlay = new Float32Array(aData.length);
            audioToPlay.set(aData);
            // console.log('MicrosoftAudioPlayer.playByStream: buffer erzeugen mit 16000 Samplerate:', audioToPlay.length);
            audioBuffer = this.mAudioContext.createBuffer(1, audioToPlay.length, MICROSOFT_AUDIOSAMPLE_RATE);
            audioBuffer.getChannelData(0).set(audioToPlay);
        }
        catch (aException) {
            audioBuffer = null;
            console.log('MicrosoftAudioPlayer._getAudioBufferSecond: Exception', aException);
        }
        return audioBuffer;
    };
    /**
     * Hier wird der Audiobuffer mit Resample erzeugt, um in Safari abgespielt zu werden
     * SapmpleRate wird von PCM 16000 Hz auf 22500 Hz angehoben, da createBuffer in Safari
     * erst ab dieser Frequenz arbeitet.
     *
     * @private
     * @param aData - Audiodaten
     *
     * @return {AudioBuffer} Rueckgabe des erzeugten Audiobuffers oder null bei einem Fehler
     */
    MicrosoftAudioPlayer.prototype._getAudioBufferResample = function (aData) {
        var audioBuffer = null;
        // Fuer Safari wird eine hoehere SampleRate als 16000 benoetigt, da createBuffer sonst nicht funktioniert
        // hier wird der Resampler eingesetzt
        try {
            // notwendig ist ein groesseres FloatArray 22500/16000 = 1.4 
            var audioToPlay = new Float32Array(aData.length * 1.4);
            audioToPlay.set(aData);
            // Resampler, um die Frequenz des AudioBuffers anzuheben auf 22500 Hz fuer Safari
            this.mResampler = new MicrosoftResampler(MICROSOFT_AUDIOSAMPLE_RATE, AUDIO_MIN_SAMPLERATE, 1, audioToPlay.length, undefined);
            var _audioToPlay = this.mResampler.resampler(audioToPlay);
            // console.log('MicrosoftAudioPlayer.playByStream: buffer erzeugen mit 22500 Samplerate:', _audioToPlay.length);
            audioBuffer = this.mAudioContext.createBuffer(1, _audioToPlay.length, AUDIO_MIN_SAMPLERATE);
            audioBuffer.getChannelData(0).set(_audioToPlay);
        }
        catch (aException) {
            audioBuffer = null;
            console.log('MicrosoftAudioPlayer._getAudioBufferResample: Exception', aException);
        }
        return audioBuffer;
    };
    // Player-Funktionen
    /**
     * Abspielen des Audiostreams
     *
     * @param {*} aAudioArray - Audiostream
     */
    MicrosoftAudioPlayer.prototype.playByStream = function (aAudioArray) {
        var _this = this;
        try {
            if (!this.mAudioContext) {
                console.log('MicrosoftAudioPlayer.playByStream: kein AudioContext vorhanden');
                return;
            }
            // console.log('MicrosoftAudioPlayer.playByStream: start');
            if (aAudioArray.length === 0 || this.mAudioStopFlag) {
                this.mBeginSpeakFlag = true;
                // console.log( 'MicrosoftConnect.connect: source.onended' );
                this._onAudioStop();
                this.mAudioSource = null;
                return;
            }
            // console.log('MicrosoftAudioPlayer.playByStream: AudioContext.state = ', this.mAudioContext.state);
            this.mAudioSource = this.mAudioContext.createBufferSource();
            // Ende-Funktion mit AudioStop-Event verbinden
            this.mAudioSource.onended = function () { return _this.stop(); };
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
            // console.log('MicrosoftAudioPlayer.playByStream: audio start', this.mAudioSource);
            if (this.mAudioSource.start) {
                this.mAudioSource.start(0);
            }
            else {
                this.mAudioSource.noteOn(0);
            }
            this._onAudioStart();
            // console.log('MicrosoftAudioPlayer.playByStream: end');
        }
        catch (aException) {
            this.mBeginSpeakFlag = true;
            this._onAudioStop();
            this.mAudioSource = null;
            // console.log('MicrosoftAudioPlayer.playByStream: Exception', aException);
            this._exception('playByStream', aException);
        }
    };
    /**
     * Audiodaten abspielen
     *
     * @param aOptions - optionale Parameter (codec)
     * @param aAudioData - abzuspielende Audiodaten
     */
    MicrosoftAudioPlayer.prototype.decode = function (aOptions, aAudioData) {
        try {
            // console.log('MicrosoftAudioPlayer.decode: start');
            if (this.mAudioCodec.findPcmCodec(aOptions.codec)) {
                var decodePCM16KData = this.mAudioCodec.decodePCM(aAudioData);
                this.mAudioArray.push(decodePCM16KData);
                this.mQueue.push(decodePCM16KData);
                // console.log('MicrosoftAudioPlayer.decode: end');
                // console.log('MicrosoftConnect.connect: PCM AudioSink', this.mBeginSpeakFlag);
                if (this.mBeginSpeakFlag) {
                    this.mBeginSpeakFlag = false;
                    this.playByStream(this.mAudioArray);
                }
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
    MicrosoftAudioPlayer.prototype.stop = function () {
        try {
            // console.log('MicrosoftAudioPlayer.stop');
            this.mAudioStopFlag = true;
            if (this.mAudioSource) {
                this.mAudioSource.stop(0);
                this.mAudioSource.disconnect(0);
                this._onAudioStop();
            }
        }
        catch (aException) {
            this._exception('stop', aException);
        }
        this.mAudioSource = null;
    };
    return MicrosoftAudioPlayer;
}(ErrorBase));

/**
 * TTS Anbindung an den Microsoft-Service
 *
 * Letzte Aenderung: 17.06.2019
 * Status: rot
 *
 * @module cloud/microsoft/device
 * @author SB
 */
// Konstanten
var MICROSOFT_ACCESSTOKEN_URL = '.api.cognitive.microsoft.com/sts/v1.0/issueToken';
var MICROSOFT_TTS_URL = '.tts.speech.microsoft.com/cognitiveservices/v1';
/**
 * MicrosoftTTS Klasse fuer Sprachausgaben
 */
var MicrosoftTTS = /** @class */ (function (_super) {
    __extends(MicrosoftTTS, _super);
    /**
     * Erzeugt eine Instanz von MicrosoftTTS
     *
     * @param aConfig - Konfigurationsobjekt
     * @param aConnect - Verbindungsobjekt
     */
    function MicrosoftTTS(aConfig, aConnect, aAudioContext) {
        var _this = _super.call(this, 'MicrosoftTTS', aConfig, aConnect) || this;
        // Audio
        _this.mAudioContext = null;
        _this.mAudioPlayer = null;
        // Token
        _this.mAccessToken = '';
        _this.mAudioContext = aAudioContext;
        return _this;
    }
    /**
     * Access-Token holen fuer Zugriff auf die TTS. Ist fuer 10 Minuten gueltig.
     *
     * @private
     * @param aRegion - Region von Microsoft
     * @param aSubscriptionKey - Zugriffsschluessel von Microsoft
     *
     * @return Promise mit dem AccessToken
     */
    MicrosoftTTS.prototype._getAccessToken = function (aRegion, aSubscriptionKey) {
        var _this = this;
        return new Promise(function (aResolve, aReject) {
            try {
                var baseUrl = 'https://' + aRegion + MICROSOFT_ACCESSTOKEN_URL;
                var xmlHttpRequest_1 = new XMLHttpRequest();
                _this.mAccessToken = '';
                // synchrone Verarbeitung des Http-Requests
                xmlHttpRequest_1.open('POST', baseUrl);
                xmlHttpRequest_1.setRequestHeader('Ocp-Apim-Subscription-Key', aSubscriptionKey);
                // Auslesen des AccessTokens
                xmlHttpRequest_1.onload = function () {
                    try {
                        // let token = JSON.parse( atob( xmlHttpRequest.responseText.split(".")[1]));
                        _this.mAccessToken = xmlHttpRequest_1.responseText;
                        aResolve(_this.mAccessToken);
                    }
                    catch (aException) {
                        _this._exception('getAccessToken', aException);
                        aReject();
                    }
                };
                // Fehlerbehandlung
                xmlHttpRequest_1.onerror = function (aError) {
                    _this._error('getAccessToken', aError.message);
                    aReject();
                };
                xmlHttpRequest_1.send('');
            }
            catch (aException) {
                _this._exception('_getAccessToken', aException);
                aReject();
            }
        });
    };
    /**
     * Rueckgabe eines SSML-Textes fuer Microsofts TTS
     *
     * @private
     * @param aText - reiner Ausgabetext fuer die Umwandlung
     * @param aLanguage - Sprache
     * @param aVoice - Stimme
     *
     * @return generierter SSML-Text
     */
    MicrosoftTTS.prototype._getSSMLBody = function (aText, aLanguage, aVoice) {
        if (!aText) {
            this._error('getSSMLBody', 'kein Text uebergeben');
            return '';
        }
        if (!aLanguage) {
            this._error('getSSMLBody', 'keine Sprache uebergeben');
            return '';
        }
        if (!aVoice) {
            this._error('getSSMLBody', 'keine Stimme uebergeben');
            return '';
        }
        return "<?xml version=\"1.0\"?><speak version=\"1.0\" xml:lang=\"" + aLanguage + "\"><voice xml:lang=\"" + aLanguage + "\" name=\"" + aVoice + "\">" + aText + "</voice></speak>";
    };
    /**
     * Senden eines Http-Request an die TTS fuer die Audiosynthese
     *
     * @private
     * @param aOption - optionale Parameter
     * @param aRegion - Name der Region von Microsoft
     * @param aAccessToken - Text des Tokens fuer den Zugriff auf die TTS
     * @param aBody - SSML Text fuer die Umwandlung in einen Audio-Stream
     */
    MicrosoftTTS.prototype._sendToTTS = function (aOption, aRegion, aAccessToken, aSSMLText) {
        var _this = this;
        try {
            var baseUrl = 'https://' + aRegion + MICROSOFT_TTS_URL;
            var xmlHttpRequest_2 = new XMLHttpRequest();
            xmlHttpRequest_2.open('POST', baseUrl);
            xmlHttpRequest_2.setRequestHeader('Authorization', 'Bearer ' + aAccessToken);
            xmlHttpRequest_2.setRequestHeader('cache-control', 'no-cache');
            xmlHttpRequest_2.setRequestHeader('X-Microsoft-OutputFormat', MICROSOFT_AUDIO_FORMAT);
            xmlHttpRequest_2.setRequestHeader('Content-Type', 'application/ssml+xml');
            xmlHttpRequest_2.responseType = 'arraybuffer';
            // Audiodaten empfangen
            xmlHttpRequest_2.onload = function () {
                // Audiodaten als Ergebnis
                // console.log('Response:', xmlHttpRequest);
                // Audiodaten verarbeiten
                _this.mAudioPlayer.decode(aOption, xmlHttpRequest_2.response);
            };
            // Fehlerbehandlung
            xmlHttpRequest_2.onerror = function (aError) {
                _this._error('_sentToTTS', aError.message);
            };
            // SSML-Text an TTS senden
            xmlHttpRequest_2.send(aSSMLText);
            return 0;
        }
        catch (aException) {
            this._exception('_sendToTTS', aException);
            return -1;
        }
    };
    /**
     * Startet die Sprachausgabe
     *
     * @private
     * @param aOptions - Parameter text, language und voice fuer die Sprach-TTS
     */
    MicrosoftTTS.prototype._start = function (aOptions) {
        // console.log('MicrosoftTTS._start: Start', aOptions);
        var _this = this;
        if (!aOptions || !aOptions.text || typeof aOptions.text !== 'string') {
            this._error('_start', 'kein Text uebergeben');
            return -1;
        }
        try {
            // Audio-Player erzeugen
            this.mAudioPlayer = new MicrosoftAudioPlayer(this.mAudioContext);
            if (!this.mAudioPlayer) {
                this._error('_start', 'AudioPlayer wurde nicht erzeugt');
                return -1;
            }
            this.mAudioPlayer.onAudioStart = function () {
                // console.log('MicrosoftTTS._start: AudioStartEvent');
                _this._onStart();
            };
            this.mAudioPlayer.onAudioStop = function () {
                // console.log('MicrosoftTTS._start: AudioStopEvent');
                _this._onStop();
            };
            // SSML-Body holen
            var ssmlText_1 = this._getSSMLBody(aOptions.text, aOptions.language, aOptions.voice);
            if (!ssmlText_1) {
                return -1;
            }
            // Accesstoken holen
            var option_1 = {
                codec: MICROSOFT_PCM_CODEC
            };
            this._getAccessToken(this.mConfig.region, this.mConfig.subscriptionKey)
                .then(function (aAccessToken) {
                // Sprachsyntese ausfuehren
                _this._sendToTTS(option_1, _this.mConfig.region, aAccessToken, ssmlText_1);
            })
                .catch(function () {
                // Fehler aufgetreten
            });
            // Audioplayer starten
            this.mAudioPlayer.start();
            return 0;
        }
        catch (aException) {
            this._exception('_start', aException);
            return -1;
        }
        // console.log('MicrosoftTTS._start: End');
    };
    /**
     * Sprachausgabe beenden
     */
    MicrosoftTTS.prototype._stop = function () {
        // console.log('MicrosoftTTS._stop:', this.mAudioPlayer);
        if (this.mAudioPlayer) {
            this.mAudioPlayer.stop();
            this.mAudioPlayer = null;
        }
        return 0;
    };
    return MicrosoftTTS;
}(MicrosoftDevice));

/**
 * MicrosoftPort zur Verbindung des Microsoft Cloud-Service mit dem Framework
 * Stellt Grundfunktionen von Microsoft zur Verfuegung. Werden von mehreren anderen
 * Komponenten geteilt.
 *
 * Letzte Aenderung: 08.03.2020
 * Status: rot
 *
 * @module cloud/microsoft
 * @author SB
 */
// Konstanten
// Zeit die im Unlock-Event auf RESUME gewartet wird
var AUDIO_UNLOCK_TIMEOUT = 2000;
// Default Timeout fuer die Dauer einer Action, maximal eine Minute darf die Verarbeitung einer Action dauern,
// danach wird Stop erzwungen.
var MICROSOFT_ACTION_TIMEOUT = 60000;
/**
 * Definiert die MicrosoftPort-Klasse
 */
var MicrosoftPort = /** @class */ (function (_super) {
    __extends(MicrosoftPort, _super);
    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */
    function MicrosoftPort(aPortName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var _this = _super.call(this, aPortName || MICROSOFT_PORT_NAME, aRegisterFlag) || this;
        // externe Html5-Komponenten
        _this.mAudioContext = null;
        _this.mGetUserMedia = null;
        // externes Microsoft-Objekt
        _this.mMicrosoftConfig = null;
        _this.mMicrosoftNetwork = null;
        _this.mMicrosoftConnect = null;
        _this.mMicrosoftTTS = null;
        _this.mMicrosoftASR = null;
        _this.mMicrosoftNLU = null;
        // weitere Attribute
        _this.mDynamicCredentialsFlag = false;
        _this.mTransaction = null;
        _this.mRunningFlag = false;
        _this.mDefaultOptions = null;
        _this.mActionTimeoutId = 0;
        _this.mActionTimeout = MICROSOFT_ACTION_TIMEOUT;
        return _this;
    }
    // Port-Funktionen
    /**
     * pruefen auf Mock-Port zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Port ein Mock zum Testen ist
     */
    MicrosoftPort.prototype.isMock = function () {
        return false;
    };
    /**
     * Rueckgabe eines logischen Port-Typs
     *
     * @return {string} logischer Typ des Ports fuer unterschiedliche Anwendungsschnittstellen
     */
    MicrosoftPort.prototype.getType = function () {
        return MICROSOFT_TYPE_NAME;
    };
    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */
    MicrosoftPort.prototype.getClass = function () {
        return 'MicrosoftPort';
    };
    MicrosoftPort.prototype.getVersion = function () {
        return MICROSOFT_API_VERSION;
    };
    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */
    MicrosoftPort.prototype._checkCredentials = function (aOption) {
        if (!aOption) {
            return false;
        }
        // App-Parameter pruefen
        if (typeof aOption.microsoftRegion !== 'string') {
            return false;
        }
        if (!aOption.microsoftRegion) {
            return false;
        }
        if (typeof aOption.microsoftSubscriptionKey !== 'string') {
            return false;
        }
        if (!aOption.microsoftSubscriptionKey) {
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
    MicrosoftPort.prototype._initAllObject = function (aOption) {
        // console.log('MicrosoftPort._initAllObject:', aOption);
        // innere Komponenten eintragen
        var _this = this;
        var fileReader = new FileHtml5Reader();
        fileReader.init();
        var audioReader = new AudioHtml5Reader();
        audioReader.init({ audioContext: this.mAudioContext });
        this.mMicrosoftConfig = new MicrosoftConfig(fileReader);
        if (this.mMicrosoftConfig.init(aOption) !== 0) {
            return -1;
        }
        // Network-Anbindung erzeugen
        this.mMicrosoftNetwork = new MicrosoftNetwork();
        this.mMicrosoftNetwork.onOnline = function () { return _this._onOnline(); };
        this.mMicrosoftNetwork.onOffline = function () { return _this._onOffline(); };
        this.mMicrosoftNetwork.onError = function (aError) { return _this._onError(aError); };
        if (this.mMicrosoftNetwork.init(aOption) !== 0) {
            return -1;
        }
        this.mMicrosoftConnect = new MicrosoftConnect(this.mMicrosoftConfig);
        this.mMicrosoftConnect._setErrorOutputFunc(function (aErrorText) { return _this._onError(new Error(aErrorText)); });
        // Microsoft-Komponenten erzeugen
        this.mMicrosoftNLU = new MicrosoftNLU(this.mMicrosoftConfig, this.mMicrosoftConnect);
        this.mMicrosoftNLU.onStart = function (aTransaction) { return _this._onStart(aTransaction.plugin, aTransaction.type); };
        this.mMicrosoftNLU.onStop = function (aTransaction) { return _this._onStop(aTransaction.plugin, aTransaction.type); };
        this.mMicrosoftNLU.onResult = function (aTransaction) { return _this._onResult(aTransaction.result, aTransaction.plugin, aTransaction.type); };
        this.mMicrosoftNLU.onError = function (aTransaction) { return _this._onError(aTransaction.error, aTransaction.plugin, aTransaction.type); };
        this.mMicrosoftNLU.onClose = function (aTransaction) { return _this._onClose(); };
        // pruefen auf Audiokontext, nur dann koennen TTS und ASR verwendet werden
        if (this.mAudioContext) {
            this.mMicrosoftTTS = new MicrosoftTTS(this.mMicrosoftConfig, this.mMicrosoftConnect, this.mAudioContext);
            this.mMicrosoftTTS.onStart = function (aTransaction) { return _this._onStart(aTransaction.plugin, aTransaction.type); };
            this.mMicrosoftTTS.onStop = function (aTransaction) { return _this._onStop(aTransaction.plugin, aTransaction.type); };
            this.mMicrosoftTTS.onResult = function (aTransaction) { return _this._onResult(aTransaction.result, aTransaction.plugin, aTransaction.type); };
            this.mMicrosoftTTS.onError = function (aTransaction) { return _this._onError(aTransaction.error, aTransaction.plugin, aTransaction.type); };
            this.mMicrosoftTTS.onClose = function (aTransaction) { return _this._onClose(); };
            try {
                if (this.mGetUserMedia) {
                    // ASR kann nur verwendet werden, wenn getUserMedia vorhanden ist
                    this.mMicrosoftASR = new MicrosoftASR(this.mMicrosoftConfig, this.mMicrosoftConnect, this.mAudioContext, this.mGetUserMedia, audioReader);
                    this.mMicrosoftASR.onStart = function (aTransaction) { return _this._onStart(aTransaction.plugin, aTransaction.type); };
                    this.mMicrosoftASR.onStop = function (aTransaction) { return _this._onStop(aTransaction.plugin, aTransaction.type); };
                    this.mMicrosoftASR.onResult = function (aTransaction) { return _this._onResult(aTransaction.result, aTransaction.plugin, aTransaction.type); };
                    this.mMicrosoftASR.onError = function (aTransaction) { return _this._onError(aTransaction.error, aTransaction.plugin, aTransaction.type); };
                    this.mMicrosoftASR.onClose = function (aTransaction) { return _this._onClose(); };
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
     *      microsoftAppId     - Microsoft Credentials fuer APP_ID
     *      microsoftAppKey    - Microsoft Credentials fuer APP_KEY
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
    MicrosoftPort.prototype.init = function (aOption) {
        // console.log('MicrosoftPort.init:', aOption);
        if (this.mInitFlag) {
            this._error('init', 'Port ist bereits initialisiert');
            return 0;
        }
        // pruefen auf vorhandene SppechSDK-Bibliothek
        if (!window.SpeechSDK) {
            this._error('init', 'Microsoft SpeechSDK ist nicht vorhanden');
            return -1;
        }
        // pruefen auf dynamische Credentials
        // console.log('MicrosoftPort.init: option = ', aOption);
        if (aOption && typeof aOption.microsoftDynamicCredentialsFlag === 'boolean' && aOption.microsoftDynamicCredentialsFlag) {
            console.log('MicrosoftPort.init: dynamic credentials eingeschaltet');
            // dynamische Credentials koennen gesetzt werden
            this.mDynamicCredentialsFlag = true;
        }
        else {
            // pruefen auf Microsoft App-Credientials Uebergabe
            if (!this._checkCredentials(aOption)) {
                this._error('init', 'keine Region und/oder SubscriptionKey als Parameter uebergeben');
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
        // Debug-Ausgabe fuer Microsoft-Komponenten
        if (this.isErrorOutput()) {
            if (this.mMicrosoftNLU) {
                console.log('MicrosoftPort: NLU ist vorhanden');
            }
            else {
                console.log('MicrosoftPort: NLU ist nicht vorhanden');
            }
            if (this.mMicrosoftTTS) {
                console.log('MicrosoftPort: TTS ist vorhanden');
            }
            else {
                console.log('MicrosoftPort: TTS ist nicht vorhanden');
            }
            if (this.mMicrosoftASR) {
                console.log('MicrosoftPort: ASR ist vorhanden');
            }
            else {
                console.log('MicrosoftPort: ASR ist nicht vorhanden');
            }
        }
        return 0;
    };
    /**
     * gibt den Port frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    MicrosoftPort.prototype.done = function () {
        _super.prototype.done.call(this);
        // Timeout loeschen 
        this._clearActionTimeout();
        // externes Microsoft-Objekt
        if (this.mMicrosoftNetwork) {
            this.mMicrosoftNetwork.done();
            this.mMicrosoftNetwork = null;
        }
        if (this.mMicrosoftConnect) {
            this.mMicrosoftConnect.disconnect();
            this.mMicrosoftConnect = null;
        }
        if (this.mMicrosoftConfig) {
            this.mMicrosoftConfig.done();
            this.mMicrosoftConfig = null;
        }
        this.mMicrosoftTTS = null;
        this.mMicrosoftASR = null;
        this.mMicrosoftNLU = null;
        // Audiokontext schliessen
        if (this.mAudioContext) {
            // console.log('MicrosoftPort.done: Close AudioContext');
            this.mAudioContext.close();
            this.mAudioContext = null;
        }
        this.mGetUserMedia = null;
        // weitere Attribute
        this.mDynamicCredentialsFlag = false;
        this.mTransaction = null;
        this.mRunningFlag = false;
        this.mDefaultOptions = null;
        this.mActionTimeoutId = 0;
        this.mActionTimeout = MICROSOFT_ACTION_TIMEOUT;
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
    MicrosoftPort.prototype.reset = function (aOption) {
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
    MicrosoftPort.prototype._setErrorOutput = function (aErrorOutputFlag) {
        _super.prototype._setErrorOutput.call(this, aErrorOutputFlag);
        if (this.mMicrosoftConfig) {
            this.mMicrosoftConfig._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mMicrosoftNetwork) {
            this.mMicrosoftNetwork._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mMicrosoftConnect) {
            this.mMicrosoftConnect._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mMicrosoftTTS) {
            this.mMicrosoftTTS._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mMicrosoftASR) {
            this.mMicrosoftASR._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mMicrosoftNLU) {
            this.mMicrosoftNLU._setErrorOutput(aErrorOutputFlag);
        }
    };
    // Timeout-Funktionen
    /**
     * Aktion wird abgebrochen
     */
    MicrosoftPort.prototype._breakAction = function () {
        // console.log('MicrosoftPort._beakAction');
        this.mActionTimeoutId = 0;
        if (this.mTransaction) {
            this._error('_breakAction', 'Timeout fuer Action erreicht');
            this._onStop(this.mTransaction.plugin, this.mTransaction.type);
        }
    };
    /**
     * Timeout fuer Aktion setzen. Timeout wird nur gesetzt, wenn > 0
     */
    MicrosoftPort.prototype._setActionTimeout = function () {
        var _this = this;
        // console.log('MicrosoftPort._setActionTimeout');
        if (this.mActionTimeoutId === 0 && this.mActionTimeout > 0) {
            this.mActionTimeoutId = window.setTimeout(function () { return _this._breakAction(); }, this.mActionTimeout);
        }
    };
    /**
     * Timeout fuer Aktion loeschen
     */
    MicrosoftPort.prototype._clearActionTimeout = function () {
        // console.log('MicrosoftPort._clearActionTimeout');
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
    MicrosoftPort.prototype._onOnline = function () {
        // console.log('MicrosoftPort._onOnline');
        return 0;
    };
    /**
     * Ereignisfunktion fuer Offline aufrufen
     *
     * @private
     *
     * @return {number} errorCode(0,-1)
     */
    MicrosoftPort.prototype._onOffline = function () {
        // console.log('MicrosoftPort._onOffline');
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
    MicrosoftPort.prototype._onStop = function (aDest, aType) {
        // console.log('MicrosoftPort._onStop: Transaktion wird beendet', aDest, aType);
        // hier muss der Timeout geloescht werden, da die Transaktion zu Ende ist
        this._clearActionTimeout();
        // StopEvent versenden
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
    MicrosoftPort.prototype._unlockAudio = function (aCallbackFunc) {
        // console.log('MicrosoftPort._unlockAudio: start');
        // Timeout einstellen, um garantiert ein UnlockEvent zu erhalten
        if (this.mAudioContext) {
            if (this.mAudioContext.state === 'running') {
                aCallbackFunc(true);
                return;
            }
            if (this.mAudioContext.state === 'suspended') {
                // console.log('MicrosoftPort._unlockAudio: start', this.mAudioContext.state);
                var timeoutId_1 = setTimeout(function () { return aCallbackFunc(false); }, AUDIO_UNLOCK_TIMEOUT);
                this.mAudioContext.resume().then(function () {
                    // console.log('MicrosoftPort._unlockAudio: state = ', this.mAudioContext.state);
                    clearTimeout(timeoutId_1);
                    aCallbackFunc(true);
                }, function (aError) {
                    console.log('MicrosoftPort._unlockAudio:', aError);
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
     * @param {MicrosoftConfigDataInterface} aConfigData - Konfigurationsdaten { microsoftAppKey: '', microsoftAppId: '', microsoftNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftPort.prototype.setConfig = function (aConfigData) {
        if (this.mDynamicCredentialsFlag) {
            // Uebertragen der neuen Credentials
            try {
                if (typeof aConfigData.microsoftRegion === 'string' && aConfigData.microsoftRegion) {
                    this.mMicrosoftConfig.region = aConfigData.microsoftRegion;
                }
                if (typeof aConfigData.microsoftSubscriptionKey === 'string' && aConfigData.microsoftSubscriptionKey) {
                    this.mMicrosoftConfig.subscriptionKey = aConfigData.microsoftSubscriptionKey;
                    console.log('MicrosoftPort.setConfig: neue Credentials eintragen ', aConfigData.microsoftSubscriptionKey);
                    // neue Microsoft-Credentials eintragen
                    this.mMicrosoftConnect.disconnect();
                    this.mMicrosoftConnect.connect();
                }
                if (typeof aConfigData.microsoftLuisEndpoint === 'string' && aConfigData.microsoftLuisEndpoint) {
                    this.mMicrosoftConfig.luisEndpoint = aConfigData.microsoftLuisEndpoint;
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
     * @return {MicrosoftConfigDataInterface} aktuelle Portkonfigurationsdaten
     */
    MicrosoftPort.prototype.getConfig = function () {
        var configData = {
            microsoftRegion: this.mMicrosoftConfig.region,
            microsoftSubscriptionKey: this.mMicrosoftConfig.subscriptionKey,
            microsoftLuisEndpoint: this.mMicrosoftConfig.luisEndpoint
        };
        return configData;
    };
    /**
     * Pruefen auf Netzwerk-Verbindung
     *
     * @return {boolean} True, wenn Netwerk verbunden ist, ansonsten false
     */
    MicrosoftPort.prototype.isOnline = function () {
        if (this.mMicrosoftNetwork) {
            return this.mMicrosoftNetwork.isOnline();
        }
        return false;
    };
    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */
    MicrosoftPort.prototype.isOpen = function () {
        if (this.mMicrosoftConnect) {
            // console.log('MicrosoftPort.isOpen:', this.mMicrosoftConnect.isConnect());
            return this.mMicrosoftConnect.isConnect();
        }
        return false;
    };
    /**
     * Pruefen und Oeffnen der WebSocket, wenn moeglich
     *
     * @private
     * @param aOpenCallbackFunc - Callback fuer WebSocket geoeffnet oder nicht
     */
    MicrosoftPort.prototype._checkOpen = function (aOpenCallbackFunc) {
        // console.log('MicrosoftPort._checkOpen:');
        // pruefen, ob Netzwerk vorhanden ist
        if (!this.isOnline()) {
            // console.log('MicrosoftPort._checkOpen: kein Netz vorhanden');
            this._error('_checkOpen', 'kein Netz vorhanden');
            aOpenCallbackFunc(false);
            return -1;
        }
        // oeffnen des Ports
        var result = this.open();
        if (result !== 0) {
            aOpenCallbackFunc(false);
        }
        else {
            aOpenCallbackFunc(true);
        }
        return result;
    };
    /**
     * Port oeffnen
     *
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftPort.prototype.open = function (aOption) {
        // console.log('MicrosoftPort.open');
        if (!this.mMicrosoftConnect) {
            this._error('open', 'kein MicrosoftConnect vorhanden');
            return -1;
        }
        if (this.isOpen()) {
            return 0;
        }
        var result = this.mMicrosoftConnect.connect();
        if (result === 0) {
            this._onOpen();
        }
        return result;
    };
    /**
     * Port schliessen
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftPort.prototype.close = function () {
        if (!this.isOpen()) {
            return 0;
        }
        // console.log('MicrosoftPort.close');
        if (this.mMicrosoftConnect) {
            this._onClose();
            return this.mMicrosoftConnect.disconnect();
        }
        return 0;
    };
    /**
     * Rueckgabe des Pluginnamens, der gerade eine Transaktion ausfuehrt
     *
     * @return {string} PluginName oder leerer String
     */
    MicrosoftPort.prototype.getPluginName = function () {
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
    MicrosoftPort.prototype.getActionName = function () {
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
    MicrosoftPort.prototype.isRunning = function (aPluginName, aAction) {
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
     * Pruefen, welche Microsoft-Aktionen ausfuehrbar sind.
     *
     * @param {string} aAction - Name der zu pruefenden Aktion
     *
     * @return {boolean} True, wenn Aktion ausfuehrbar ist, False sonst
     */
    MicrosoftPort.prototype.isAction = function (aAction) {
        var result = false;
        switch (aAction) {
            case MICROSOFT_NLU_ACTION:
                result = this.mMicrosoftNLU ? true : false;
                break;
            case MICROSOFT_ASR_ACTION:
                result = this.mMicrosoftASR ? true : false;
                break;
            case MICROSOFT_TTS_ACTION:
                result = this.mMicrosoftTTS ? true : false;
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
    MicrosoftPort.prototype.setActionTimeout = function (aTimeout) {
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
    MicrosoftPort.prototype.start = function (aPluginName, aAction, aOption) {
        var _this = this;
        // console.log('MicrosoftPort.start:', aPluginName, aAction, aOption);
        // pruefen, ob eine Aktion bereits laeuft
        if (this.isRunning()) {
            this._error('start', 'Aktion laeuft bereits');
            return -1;
        }
        // pruefen auf Credentials
        if (!this.mMicrosoftConfig.isCredentials()) {
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
            // console.log('MicrosoftPort.start: RunningFlag=', this.mRunningFlag);
            _this.mRunningFlag = true;
            var result = 0;
            switch (aAction) {
                case MICROSOFT_NLU_ACTION:
                    _this.mTransaction = new MicrosoftTransaction(aPluginName, MICROSOFT_NLU_ACTION);
                    result = _this._startNLU(_this.mTransaction, option.text, option.language || MICROSOFT_DEFAULT_LANGUAGE);
                    break;
                case MICROSOFT_ASRNLU_ACTION:
                    _this.mTransaction = new MicrosoftTransaction(aPluginName, MICROSOFT_ASRNLU_ACTION);
                    result = _this._startASR(_this.mTransaction, option.language || MICROSOFT_DEFAULT_LANGUAGE, option.audioURL || '', true, option.useProgressive || false);
                    break;
                case MICROSOFT_ASR_ACTION:
                    _this.mTransaction = new MicrosoftTransaction(aPluginName, MICROSOFT_ASR_ACTION);
                    result = _this._startASR(_this.mTransaction, option.language || MICROSOFT_DEFAULT_LANGUAGE, option.audioURL || '', false, option.useProgressive || false);
                    break;
                case MICROSOFT_TTS_ACTION:
                    _this.mTransaction = new MicrosoftTransaction(aPluginName, MICROSOFT_TTS_ACTION);
                    result = _this._startTTS(_this.mTransaction, option.text, option.language || MICROSOFT_DEFAULT_LANGUAGE, option.voice || MICROSOFT_DEFAULT_VOICE);
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
    MicrosoftPort.prototype.stop = function (aPluginName, aAction, aOption) {
        // console.log('MicrosoftPort.stop:', aPluginName, aAction, aOption, this.mTransaction);
        // pruefen, ob eine Aktion bereits laeuft
        if (!this.isRunning()) {
            // console.log('MicrosoftPort.stop: kein isRunning');
            return 0;
        }
        // pruefen, ob der Port geoeffnet ist
        if (!this.isOpen()) {
            this._error('stop', 'Port ist nicht geoeffnet');
            return -1;
        }
        // pruefen auf Credentials
        if (!this.mMicrosoftConfig.isCredentials()) {
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
        // console.log('MicrosoftPort.stop: Action = ', aAction);
        switch (aAction) {
            case MICROSOFT_NLU_ACTION:
                result = this._stopNLU(this.mTransaction);
                break;
            case MICROSOFT_ASR_ACTION:
                result = this._stopASR(this.mTransaction);
                break;
            case MICROSOFT_TTS_ACTION:
                result = this._stopTTS(this.mTransaction);
                break;
            default:
                this._error('stop', 'Keine gueltige Aktion uebergeben ' + aAction);
                result = -1;
                break;
        }
        // console.log('MicrosoftPort.stop: RunningFlag=', this.mRunningFlag);
        this.mRunningFlag = false;
        return result;
    };
    // Microsoft-Funktionen
    /**
     * Initialisierung der Recognition
     *
     * @protected
     * @param {*} aOption - optionale Parameter fuer die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftPort.prototype._initRecognition = function (aOption) {
        var _this = this;
        // console.log('MicrosoftPort._initRecognition: start');
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
        // console.log('MicrosoftPort._initRecognition: end');
        return 0;
    };
    // Text-Funktionen
    /**
     * Intent zu einem Text holen
     *
     * @private
     * @param {MicrosoftTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - Text der interpretiert werden soll
     * @param {string} aLanguage - Sprache des Textes der interpretiert werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftPort.prototype._startNLU = function (aTransaction, aText, aLanguage) {
        if (!aText) {
            this._error('_startNLU', 'keinen Text uebergeben');
            return -1;
        }
        if (!aLanguage) {
            this._error('_startNLU', 'keine Sprache uebergeben');
            return -1;
        }
        if (!this.mMicrosoftNLU) {
            this._error('_startNLU', 'keine Microsoft NLU-Anbindung vorhanden');
            return -1;
        }
        try {
            var option = {
                text: aText,
                language: aLanguage
            };
            return this.mMicrosoftNLU.start(aTransaction, option);
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
     * @param {MicrosoftTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftPort.prototype._stopNLU = function (aTransaction) {
        if (!this.mMicrosoftNLU) {
            this._error('_stopNLU', 'keine Microsoft NLU-Anbindung vorhanden');
            return -1;
        }
        try {
            return this.mMicrosoftNLU.stop(aTransaction);
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
     * @param {MicrosoftTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @returns {number} Fehlercode 0 oder -1
     */
    MicrosoftPort.prototype._startASR = function (aTransaction, aLanguage, aAudioUrl, aUseNLUFlag, aProgressiveFlag) {
        if (aUseNLUFlag === void 0) { aUseNLUFlag = false; }
        if (aProgressiveFlag === void 0) { aProgressiveFlag = false; }
        // console.log('MicrosoftPort._startASR');
        if (!aLanguage) {
            this._error('_startASR', 'keine Sprache uebergeben');
            return -1;
        }
        if (!this.mMicrosoftASR) {
            this._error('_startASR', 'keine Microsoft ASR-Anbindung vorhanden');
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
            return this.mMicrosoftASR.start(aTransaction, option);
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
     * @param {MicrosoftTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftPort.prototype._stopASR = function (aTransaction) {
        // console.log('MicrosoftPort._stopASR');
        if (!this.mMicrosoftASR) {
            this._error('_stopASR', 'keine Microsoft ASR-Anbindung vorhanden');
            return -1;
        }
        try {
            return this.mMicrosoftASR.stop(aTransaction);
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
     * @param {MicrosoftTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - auszusprechender Text
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftPort.prototype._startTTS = function (aTransaction, aText, aLanguage, aVoice) {
        var _this = this;
        // console.log('MicrosoftPort._startTTS:', aTransaction, aText, aLanguage, aVoice);
        if (!aText) {
            this._error('_startTTS', 'keinen Text uebergeben');
            return -1;
        }
        if (!this.mMicrosoftTTS) {
            this._error('_startTTS', 'keine Microsoft TTS-Anbindung vorhanden');
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
            // console.log('MicrosoftPort._startTTS: AudioContext.state = ', this.mAudioContext.state);
            this._unlockAudio(function (aUnlockFlag) {
                if (aUnlockFlag) {
                    _this.mMicrosoftTTS.start(aTransaction, option_1);
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
     * @param {MicrosoftTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftPort.prototype._stopTTS = function (aTransaction) {
        // console.log('MicrosoftPort._stopTTS', aTransaction);
        if (!this.mMicrosoftTTS) {
            this._error('_stopTTS', 'keine Microsoft TTS-Anbindung vorhanden');
            return -1;
        }
        try {
            return this.mMicrosoftTTS.stop(aTransaction);
        }
        catch (aException) {
            this._exception('_stopTTS', aException);
            return -1;
        }
    };
    return MicrosoftPort;
}(Port));

/**
 * MicrosoftMock zum Testen des Microsoft Cloud-Service mit dem Framework
 *
 * Letzte Aenderung: 17.06.2019
 * Status: rot
 *
 * @module cloud/microsoft
 * @author SB
 */
// Konstanten
// Asynchrones senden von Events nach 100 millisekunden
var MICROSOFTMOCK_CALLBACK_TIMEOUT = 100;
/**
 * Definiert die MicrosoftMock-Klasse
 */
var MicrosoftMock = /** @class */ (function (_super) {
    __extends(MicrosoftMock, _super);
    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */
    function MicrosoftMock(aPortName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var _this = _super.call(this, aPortName || MICROSOFT_MOCK_NAME, aRegisterFlag) || this;
        _this.audioContextFlag = true;
        _this.getUserMediaFlag = true;
        _this.microsoftNLUFlag = true;
        _this.microsoftASRFlag = true;
        _this.microsoftTTSFlag = true;
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
        _this.microsoftRegion = '';
        _this.microsoftSubscriptionKey = '';
        _this.microsoftLuisEndpoint = '';
        _this.microsoftNluTag = '';
        return _this;
    }
    // Port-Funktionen
    /**
     * pruefen auf Mock-Port zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Port ein Mock zum Testen ist
     */
    MicrosoftMock.prototype.isMock = function () {
        return true;
    };
    /**
     * Rueckgabe eines logischen Port-Typs
     *
     * @return {string} logischer Typ des Ports fuer unterschiedliche Anwendungsschnittstellen
     */
    MicrosoftMock.prototype.getType = function () {
        return MICROSOFT_TYPE_NAME;
    };
    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */
    MicrosoftMock.prototype.getClass = function () {
        return 'MicrosoftMock';
    };
    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */
    MicrosoftMock.prototype._checkCredentials = function (aOption) {
        if (!aOption) {
            return false;
        }
        if (typeof aOption.microsoftRegion === 'string') {
            this.microsoftRegion = aOption.microsoftRegion;
        }
        if (typeof aOption.microsoftSubscriptionKey === 'string') {
            this.microsoftSubscriptionKey = aOption.microsoftSubscriptionKey;
        }
        if (typeof aOption.microsoftLuisEndpoint === 'string') {
            this.microsoftLuisEndpoint = aOption.microsoftLuisEndpoint;
        }
        if (typeof aOption.microsoftNluTag === 'string') {
            this.microsoftNluTag = aOption.microsoftNluTag;
        }
        // App-Parameter pruefen
        if (typeof aOption.microsoftRegion !== 'string') {
            return false;
        }
        if (!aOption.microsoftRegion) {
            return false;
        }
        if (typeof aOption.microsoftSubscriptionKey !== 'string') {
            return false;
        }
        if (!aOption.microsoftSubscriptionKey) {
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
    MicrosoftMock.prototype.init = function (aOption) {
        // console.log('MicrosoftMock: init start', aOption);
        if (this.mInitFlag) {
            this._error('init', 'Init bereits aufgerufen');
            return 0;
        }
        // pruefen auf dynamische Credentials
        if (aOption && typeof aOption.microsoftDynamicCredentialsFlag === 'boolean' && aOption.microsoftDynamicCredentialsFlag) {
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
        // TODO: soll spaeter in die Audio-Komponente
        // AudioContext
        if (!this.audioContextFlag) {
            // wenn der Audiokontext nicht vorhanden ist, gehen TTS und ASR nicht
            this._error('init', 'kein Audiokontext vorhanden, TTS und ASR werden abgeschaltet');
            this._onInit(-1);
        }
        this.microsoftNLUFlag = true;
        if (this.audioContextFlag) {
            this.microsoftASRFlag = true;
            if (this.getUserMediaFlag) {
                this.microsoftTTSFlag = true;
            }
        }
        if (this.isErrorOutput()) {
            if (this.microsoftNLUFlag) {
                console.log('MicrosoftMock: NLU ist vorhanden');
            }
            else {
                console.log('MicrosoftMock: NLU ist nicht vorhanden');
            }
            if (this.microsoftTTSFlag) {
                console.log('MicrosoftMock: TTS ist vorhanden');
            }
            else {
                console.log('MicrosoftMock: TTS ist nicht vorhanden');
            }
            if (this.microsoftASRFlag) {
                console.log('MicrosoftMock: ASR ist vorhanden');
            }
            else {
                console.log('MicrosoftMock: ASR ist nicht vorhanden');
            }
        }
        this._onInit(0);
        // console.log('MicrosoftMock.init: ende');
        return _super.prototype.init.call(this, aOption);
    };
    /**
     * gibt den Port frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    MicrosoftMock.prototype.done = function (aFreeFlag) {
        _super.prototype.done.call(this);
        this.audioContextFlag = true;
        this.getUserMediaFlag = true;
        this.microsoftNLUFlag = false;
        this.microsoftASRFlag = false;
        this.microsoftTTSFlag = false;
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
    MicrosoftMock.prototype.reset = function (aOption) {
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
    MicrosoftMock.prototype._onStop = function (aDest, aType) {
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
     * @param {MicrosoftConfigDataInterface} aConfigData - Konfigurationsdaten { microsoftRegion: '', microsoftSubscriptionKey: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftMock.prototype.setConfig = function (aConfigData) {
        if (this.mDynamicCredentialsFlag) {
            // Uebertragen der neuen Credentials
            try {
                this.microsoftRegion = aConfigData.microsoftRegion;
                this.microsoftSubscriptionKey = aConfigData.microsoftSubscriptionKey;
                this.microsoftLuisEndpoint = aConfigData.microsoftLuisEndpoint;
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
     * @return {MicrosoftConfigDataInterface} aktuelle Portkonfigurationsdaten
     */
    MicrosoftMock.prototype.getConfig = function () {
        var configData = {
            microsoftRegion: this.microsoftRegion,
            microsoftSubscriptionKey: this.microsoftSubscriptionKey,
            microsoftLuisEndpoint: this.microsoftLuisEndpoint
        };
        return configData;
    };
    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */
    MicrosoftMock.prototype.isOpen = function () {
        return !this.disconnectFlag;
    };
    /**
     * Port oeffnen
     *
     * @param {*} aOption - optionale Parameter
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftMock.prototype.open = function (aOption) {
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
    MicrosoftMock.prototype.close = function () {
        this.disconnectFlag = true;
        return 0;
    };
    /**
     * Pruefen auf beschaeftigten Port.
     *
     * @return {boolean} True, Port ist beschaeftigt, False sonst
     */
    MicrosoftMock.prototype.isRunning = function () {
        return this.mRunningFlag;
    };
    MicrosoftMock.prototype._isCredentials = function () {
        if (this.microsoftRegion && this.microsoftSubscriptionKey) {
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
    MicrosoftMock.prototype.isAction = function (aAction) {
        var result = false;
        switch (aAction) {
            case MICROSOFT_NLU_ACTION:
                result = this.microsoftNLUFlag;
                break;
            case MICROSOFT_ASR_ACTION:
                result = this.microsoftASRFlag;
                break;
            case MICROSOFT_TTS_ACTION:
                result = this.microsoftTTSFlag;
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
    MicrosoftMock.prototype.start = function (aPluginName, aAction, aOption) {
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
            case MICROSOFT_NLU_ACTION:
                this.mTransaction = new MicrosoftTransaction(aPluginName, MICROSOFT_NLU_ACTION);
                result = this._startNLU(this.mTransaction, option.text, option.language || MICROSOFT_DEFAULT_LANGUAGE);
                break;
            case MICROSOFT_ASRNLU_ACTION:
                this.mTransaction = new MicrosoftTransaction(aPluginName, MICROSOFT_ASRNLU_ACTION);
                result = this._startASR(this.mTransaction, option.language || MICROSOFT_DEFAULT_LANGUAGE, option.audioURL || '', true, option.useProgressive || false);
                break;
            case MICROSOFT_ASR_ACTION:
                this.mTransaction = new MicrosoftTransaction(aPluginName, MICROSOFT_ASR_ACTION);
                result = this._startASR(this.mTransaction, option.language || MICROSOFT_DEFAULT_LANGUAGE, option.audioURL || '', false, option.useProgressive || false);
                break;
            case MICROSOFT_TTS_ACTION:
                this.mTransaction = new MicrosoftTransaction(aPluginName, MICROSOFT_TTS_ACTION);
                result = this._startTTS(this.mTransaction, option.text, option.language || MICROSOFT_DEFAULT_LANGUAGE, option.voice || MICROSOFT_DEFAULT_VOICE);
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
    MicrosoftMock.prototype.stop = function (aPluginName, aAction, aOption) {
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
            case MICROSOFT_NLU_ACTION:
                result = this._stopNLU(this.mTransaction);
                break;
            case MICROSOFT_ASRNLU_ACTION:
            case MICROSOFT_ASR_ACTION:
                result = this._stopASR(this.mTransaction);
                break;
            case MICROSOFT_TTS_ACTION:
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
     * @param {MicrosoftTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - Text der interpretiert werden soll
     * @param {string} aLanguage - Sprache des Textes der interpretiert werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftMock.prototype._startNLU = function (aTransaction, aText, aLanguage) {
        if (!aText) {
            this._error('_startNLU', 'keinen Text uebergeben');
            return -1;
        }
        if (!this.microsoftNLUFlag) {
            this._error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden');
            return -1;
        }
        try {
            // Nachrichten senden
            this._onStart(aTransaction.plugin, aTransaction.type);
            var event_1 = {
                topScoringIntent: {
                    intent: this.intentName,
                    score: this.intentConfidence
                },
                query: aText
            };
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
     * @param {MicrosoftTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftMock.prototype._stopNLU = function (aTransaction) {
        this._onStop(aTransaction.plugin, aTransaction.type);
        // kein Stop der NLU notwendig
        return 0;
    };
    // ASR-Funktionen
    /**
     * startet die Recognition
     *
     * @private
     * @param {MicrosoftTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @returns {number} Fehlercode 0 oder -1
     */
    MicrosoftMock.prototype._startASR = function (aTransaction, aLanguage, aAudioUrl, aUseNLUFlag, aProgressiveFlag) {
        // console.log('NuancePort._startASR');
        if (!this.microsoftASRFlag) {
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
     * @param {MicrosoftTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftMock.prototype._stopASR = function (aTransaction) {
        if (!this.microsoftASRFlag) {
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
     * @param {MicrosoftTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - auszusprechender Text
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftMock.prototype._startTTS = function (aTransaction, aText, aLanguage, aVoice) {
        var _this = this;
        if (!aText) {
            this._error('_startTTS', 'keinen Text uebergeben');
            return -1;
        }
        if (!this.microsoftTTSFlag) {
            this._error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden');
            return -1;
        }
        try {
            // Nachrichten senden
            this._onStart(aTransaction.plugin, aTransaction.type);
            // asynchron TTS-Stop Event senden
            setTimeout(function () { return _this._onStop(aTransaction.plugin, aTransaction.type); }, MICROSOFTMOCK_CALLBACK_TIMEOUT);
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
     * @param {MicrosoftTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    MicrosoftMock.prototype._stopTTS = function (aTransaction) {
        if (!this.microsoftTTSFlag) {
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
    return MicrosoftMock;
}(Port));

/**
 * Manager zur Verwaltung des MicrosoftPort
 *
 * Hier wird die Manager-Schnittstelle von Microsoft definiert, um Microsoft zu
 * initialisieren und als Port zu oeffnen.
 *
 * API-Version: 1.0
 * Datum:       17.06.2019
 *
 * Letzte Aenderung: 17.06.2019
 * Status: rot
 *
 * @module cloud/microsoft
 * @author SB
 */
/**
 * statische Microsoft-Klasse zur Erzeugung des MicrosoftPorts
 */
var Microsoft = /** @class */ (function () {
    // statische Klasse, keine Instanz erzeugbar !
    function Microsoft() {
    }
    // Fehler-Funktionen
    Microsoft.setErrorOutputOn = function () {
        Microsoft.mErrorOutputFlag = true;
        PortManager.setErrorOutputOn();
    };
    Microsoft.setErrorOutputOff = function () {
        Microsoft.mErrorOutputFlag = false;
        PortManager.setErrorOutputOff();
    };
    Microsoft.setErrorOutputFunc = function (aErrorFunc) {
        PortManager._setErrorOutputFunc(aErrorFunc);
    };
    /**
     * Initialisiert den MicrosoftPort.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    Microsoft._initMicrosoftPort = function (aMicrosoftOption) {
        // console.log('Microsoft._initMicrosoftPort:', aMicrosoftOption);
        var port = PortManager.get(MICROSOFT_TYPE_NAME, MicrosoftPort);
        if (!port) {
            return -1;
        }
        if (port.init(aMicrosoftOption) !== 0) {
            PortManager.remove(MICROSOFT_TYPE_NAME);
            return -1;
        }
        Microsoft.mCurrentPort = port;
        return 0;
    };
    /**
     * Initialisiert den MicrosoftMock.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    Microsoft._initMicrosoftMock = function (aMicrosoftOption) {
        // console.log('Microsoft._initMicrosoftMock:', aMicrosoftOption);
        var port = PortManager.get(MICROSOFT_TYPE_NAME, MicrosoftMock);
        if (!port) {
            console.log('Microsoft._initMicrosoftMock: Error MicrosoftMock wurde nicht erzeugt');
            return -1;
        }
        if (port.init(aMicrosoftOption) !== 0) {
            console.log('Microsoft._initMicrosoftMock: Error MicrosoftMock wurde nicht initialisiert');
            PortManager.remove(MICROSOFT_TYPE_NAME);
            return -1;
        }
        Microsoft.mCurrentPort = port;
        return 0;
    };
    /**
     * Initialisiert den MicrosoftPorts
     *
     * @static
     * @param {MicrosoftOptionInterface} aOption - Microsoft-Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Microsoft.init = function (aOption) {
        // console.log('Microsoft.init:', aOption);
        if (Microsoft.mInitFlag) {
            return 0;
        }
        // pruefen auf Optionen
        if (!aOption) {
            if (Microsoft.mErrorOutputFlag) {
                console.log('Microsoft.init: Keine Microsoft-Parameter uebergeben');
            }
            return -1;
        }
        // pruefen auf ErrorOutputFlag
        if (typeof aOption.errorOutputFlag === 'boolean') {
            if (aOption.errorOutputFlag) {
                Microsoft.setErrorOutputOn();
            }
            else {
                Microsoft.setErrorOutputOff();
            }
        }
        // hier wird der zu erzeugende Portname selectiert
        var portName = 'MicrosoftPort';
        if (aOption && typeof aOption.microsoftPortName === 'string') {
            if (aOption.microsoftPortName === 'MicrosoftMock') {
                portName = 'MicrosoftMock';
            }
        }
        // hier wird der Microsoft-Port initialisiert
        // console.log('Microsoft.init: PortName = ', portName);
        if (portName === 'MicrosoftPort') {
            if (Microsoft._initMicrosoftPort(aOption) !== 0) {
                return -1;
            }
        }
        else if (portName === 'MicrosoftMock') {
            if (Microsoft._initMicrosoftMock(aOption) !== 0) {
                return -1;
            }
        }
        else {
            if (Microsoft.mErrorOutputFlag) {
                console.log('Microsoft.init: Kein Microsoft PortName vorhanden');
            }
            return -1;
        }
        // console.log('Microsoft.init: end', result);
        Microsoft.mInitFlag = true;
        return 0;
    };
    Microsoft.isInit = function () {
        return Microsoft.mInitFlag;
    };
    /**
     * Freigabe des MicrosoftPorts
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    Microsoft.done = function () {
        var port = PortManager.find(MICROSOFT_TYPE_NAME);
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if (!port) {
            port = Microsoft.mCurrentPort;
        }
        var result = 0;
        if (port) {
            result = port.done();
            PortManager.remove(MICROSOFT_TYPE_NAME);
        }
        Microsoft.mCurrentPort = null;
        Microsoft.mInitFlag = false;
        return result;
    };
    // Port-Funktionen
    Microsoft._onOpenEvent = function (aError, aPortName, aPortResult, aOpenEventCallback) {
        if (typeof aOpenEventCallback === 'function') {
            try {
                // console.log('Microsoft._onOpenEvent:', aPortName, aPortResult);
                aOpenEventCallback(aError, aPortName, aPortResult);
                return 0;
            }
            catch (aException) {
                if (Microsoft.mErrorOutputFlag) {
                    console.log('Microsoft._onOpenEvent: Exception', aException.message);
                }
                return -1;
            }
        }
        return 0;
    };
    /**
     * Oeffnet den MicrosoftPort
     *
     * @param {function} aOpenEventCallback - Funktion fuer OpenEvent-Ereignis fn( PortName: string, PortResult: number)
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Microsoft._openMicrosoftPort = function (aOpenEventCallback) {
        // console.log('Microsoft._openMicrosoftPort: start');
        var port = PortManager.find(MICROSOFT_TYPE_NAME);
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if (!port) {
            port = Microsoft.mCurrentPort;
        }
        if (!port) {
            if (Microsoft.mErrorOutputFlag) {
                console.log('Microsoft._openMicrosoftPort: kein Port vorhanden');
            }
            Microsoft._onOpenEvent(new Error('Microsoft._openMicrosoftPort: Kein Port vorhanden'), MICROSOFT_TYPE_NAME, -1, aOpenEventCallback);
            return -1;
        }
        // Events verarbeiten
        port.addOpenEvent(MICROSOFT_TYPE_NAME, function (aEvent) {
            port.removeErrorEvent(MICROSOFT_TYPE_NAME);
            port.removeOpenEvent(MICROSOFT_TYPE_NAME);
            // console.log('Microsoft._openMicrosoftPort: openEvent');
            if (typeof aOpenEventCallback === 'function') {
                Microsoft._onOpenEvent(null, MICROSOFT_TYPE_NAME, aEvent.result, aOpenEventCallback);
            }
            return aEvent.result;
        });
        port.addErrorEvent(MICROSOFT_TYPE_NAME, function (aError) {
            port.removeOpenEvent(MICROSOFT_TYPE_NAME);
            port.removeErrorEvent(MICROSOFT_TYPE_NAME);
            // console.log('Microsoft._openMicrosoftPort: errorEvent', aError.message);
            if (typeof aOpenEventCallback === 'function') {
                Microsoft._onOpenEvent(aError, MICROSOFT_TYPE_NAME, -1, aOpenEventCallback);
            }
            return 0;
        });
        // Port oeffnen
        return port.open();
    };
    /**
     * Oeffnet den MicrosoftPort
     *
     * @static
     * @param {function} aOpenEventCallback - Ereignis-Funktion fuer Port geoeffnet
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Microsoft.open = function (aOpenEventCallback) {
        if (!Microsoft.mInitFlag) {
            if (Microsoft.mErrorOutputFlag) {
                console.log('Microsoft.open: Init wurde nicht aufgerufen');
            }
            Microsoft._onOpenEvent(new Error('Microsoft.open: Init wurde nicht aufgerufen'), MICROSOFT_TYPE_NAME, -1, aOpenEventCallback);
            return -1;
        }
        // hier wird der Nuance-Port geoeffnet
        var result = Microsoft._openMicrosoftPort(aOpenEventCallback);
        // console.log('Microsoft.open: end', result);
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
    Microsoft.setConfig = function (aConfigData) {
        if (Microsoft.mCurrentPort) {
            return Microsoft.mCurrentPort.setConfig(aConfigData);
        }
        return -1;
    };
    /**
     * Gibt die aktuellen Credentials zurueck.
     *
     * @static
     * @return {MicrosoftConfigDataInterface} Konfigurationsdaten zurueckgeben
     */
    Microsoft.getConfig = function () {
        if (Microsoft.mCurrentPort) {
            return Microsoft.mCurrentPort.getConfig();
        }
        return { microsoftRegion: '', microsoftSubscriptionKey: '', microsoftLuisEndpoint: '' };
    };
    Microsoft.mInitFlag = false;
    Microsoft.mErrorOutputFlag = false;
    Microsoft.mCurrentPort = null;
    return Microsoft;
}());

export { MICROSOFT_ASRNLU_ACTION, MICROSOFT_ASR_ACTION, MICROSOFT_NLU_ACTION, MICROSOFT_TTS_ACTION, MICROSOFT_TYPE_NAME, Microsoft };
