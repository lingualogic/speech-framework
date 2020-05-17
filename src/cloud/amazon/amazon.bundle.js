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
 * Globale Konstanten fuer Amazon
 *
 * Letzte Aenderung: 01.04.2019
 * Status: rot
 *
 * @module cloud/amazon
 * @author SB
 */
// Default-Konstanten
var AMAZON_TYPE_NAME = 'Amazon';
var AMAZON_PORT_NAME = 'AmazonPort';
var AMAZON_MOCK_NAME = 'AmazonMock';
// Default URL des Amazon-Service
var AMAZON_SERVER_URL = '';
var AMAZON_DEFAULT_URL = AMAZON_SERVER_URL;
// Aktionen
var AMAZON_NLU_ACTION = 'NLU';
var AMAZON_ASR_ACTION = 'ASR';
var AMAZON_ASRNLU_ACTION = 'ASRNLU';
var AMAZON_TTS_ACTION = 'TTS';
// Konfigurationsdaten
var AMAZON_CONFIG_PATH = 'assets/';
var AMAZON_CONFIG_FILE = 'amazon.json';
var AMAZON_CONFIG_LOAD = false;
// Sprachen
var AMAZON_DE_LANGUAGE = 'de-DE';
var AMAZON_DEFAULT_LANGUAGE = AMAZON_DE_LANGUAGE;
// Amazon Stimmen
var AMAZON_TTS_VOICE1 = 'Vicki';
var AMAZON_TTS_VOICE = AMAZON_TTS_VOICE1;
var AMAZON_DEFAULT_VOICE = AMAZON_TTS_VOICE;
// Audio-Codec
var AMAZON_PCM_CODEC = 'audio/L16;rate=16000';
var AMAZON_AUDIOSAMPLE_RATE = 16000;
var AMAZON_AUDIO_FORMAT = 'pcm';

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
 * Speech-Amazon Version und Build Konstanten
 *
 * @module cloud/amazon
 * @author SB
 */
var AMAZON_VERSION_NUMBER = '0.1.0';
var AMAZON_VERSION_BUILD = '0001';
var AMAZON_VERSION_TYPE = 'ALPHA';
var AMAZON_VERSION_DATE = '07.04.2019';
// tslint:disable-next-line
var AMAZON_VERSION_STRING = AMAZON_VERSION_NUMBER + '.' + AMAZON_VERSION_BUILD + ' vom ' + AMAZON_VERSION_DATE + ' (' + AMAZON_VERSION_TYPE + ')';
var AMAZON_API_VERSION = AMAZON_VERSION_STRING;

/**
 * Event-Klasse fuer alle Amazon-Transaktionen
 *
 * Letzte Aenderung: 01.04.2019
 * Status: rot
 *
 * @module cloud/amazon
 * @author SB
 */
var AmazonTransaction = /** @class */ (function () {
    function AmazonTransaction(aPluginName, aType) {
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
        AmazonTransaction.mTransactionCounter += 1;
        this.transactionId = AmazonTransaction.mTransactionCounter;
    }
    AmazonTransaction.mTransactionCounter = 0;
    return AmazonTransaction;
}());

/**
 * Amazon Konstanten Verwaltung
 *
 * Letzte Aenderung: 01.04.2019
 * Status: rot
 *
 * @module cloud/amazon
 * @author SB
 */
var AmazonConfig = /** @class */ (function (_super) {
    __extends(AmazonConfig, _super);
    /**
     * Creates an instance of AmazonConfig.
     */
    function AmazonConfig(aFileReader) {
        var _this = _super.call(this, 'AmazonConfig') || this;
        _this.mInitFlag = false;
        // Configdatei-Daten
        _this.mConfigPath = AMAZON_CONFIG_PATH;
        _this.mConfigFile = AMAZON_CONFIG_FILE;
        _this.mConfigLoadFlag = AMAZON_CONFIG_LOAD;
        // Nuance-Konfigurationsdaten
        _this.mConfigServerUrl = AMAZON_DEFAULT_URL;
        _this.mConfigRegion = '';
        _this.mConfigIdentityPoolId = '';
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
    AmazonConfig.prototype._setOption = function (aOption) {
        if (!aOption) {
            return;
        }
        // Parameter eintragen
        if (typeof aOption.amazonConfigPath === 'string') {
            this.mConfigPath = aOption.amazonConfigPath;
        }
        if (typeof aOption.amazonConfigFile === 'string') {
            this.mConfigFile = aOption.amazonConfigFile;
        }
        if (typeof aOption.amazonConfigLoadFlag === 'boolean') {
            this.mConfigLoadFlag = aOption.amazonConfigLoadFlag;
        }
        if (typeof aOption.amazonServerUrl === 'string') {
            this.mConfigServerUrl = aOption.amazonServerUrl;
        }
        if (typeof aOption.amazonRegion === 'string') {
            this.mConfigRegion = aOption.amazonRegion;
        }
        if (typeof aOption.amazonIdentityPoolId === 'string') {
            this.mConfigIdentityPoolId = aOption.amazonIdentityPoolId;
        }
        if (typeof aOption.amazonUserId === 'string') {
            this.mConfigUserId = aOption.amazonUserId;
        }
        if (typeof aOption.amazonNluTag === 'string') {
            this.mConfigNluTag = aOption.amazonNluTag;
        }
    };
    /**
     * Initialisierung von FileReader
     *
     * @param {AmazonOptionInterface} aOptions - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    AmazonConfig.prototype.init = function (aOption) {
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
    AmazonConfig.prototype.done = function () {
        this.mInitFlag = false;
        this.mConfigPath = AMAZON_CONFIG_PATH;
        this.mConfigFile = AMAZON_CONFIG_FILE;
        this.mConfigLoadFlag = AMAZON_CONFIG_LOAD;
        // Nuance-Konfigurationsdaten
        this.mConfigServerUrl = AMAZON_DEFAULT_URL;
        this.mConfigRegion = '';
        this.mConfigIdentityPoolId = '';
        this.mConfigUserId = '';
        this.mConfigNluTag = '';
        // FileReader
        this.mFileReader = null;
        // Initialisierung fertig
        this.mOnInitFunc = null;
        return 0;
    };
    AmazonConfig.prototype.isInit = function () {
        return this.mInitFlag;
    };
    /**
     * Sendet Event fuer fertige Initialisierung
     *
     * @param aResult - Fehlercode 0 oder -1
     */
    AmazonConfig.prototype._onInit = function (aResult) {
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
    AmazonConfig.prototype._onError = function (aError) {
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
    Object.defineProperty(AmazonConfig.prototype, "onInit", {
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
    Object.defineProperty(AmazonConfig.prototype, "onError", {
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
    AmazonConfig.prototype._readConfigData = function (aFileData) {
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
            if (configData.REGION) {
                this.region = configData.REGION;
            }
            if (configData.IDENTITY_POOL_ID) {
                this.identityPoolId = configData.IDENTITY_POOL_ID;
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
    AmazonConfig.prototype._readError = function (aErrorText) {
        this._error('_readError', aErrorText);
        this._onInit(-1);
    };
    /**
     * asynchrones Einlesen der Konfigurationsdaten
     */
    AmazonConfig.prototype.read = function () {
        if (!this.mFileReader) {
            this._error('read', 'kein FileReader vorhanden');
            this._onInit(-1);
            return -1;
        }
        var fileUrl = this.mConfigPath + this.mConfigFile;
        return this.mFileReader.read(fileUrl);
    };
    Object.defineProperty(AmazonConfig.prototype, "serverUrl", {
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
    Object.defineProperty(AmazonConfig.prototype, "region", {
        get: function () {
            return this.mConfigRegion;
        },
        set: function (aRegion) {
            this.mConfigRegion = aRegion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AmazonConfig.prototype, "identityPoolId", {
        get: function () {
            return this.mConfigIdentityPoolId;
        },
        set: function (aIdentityPoolId) {
            this.mConfigIdentityPoolId = aIdentityPoolId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AmazonConfig.prototype, "userId", {
        get: function () {
            return this.mConfigUserId;
        },
        set: function (aUserId) {
            this.mConfigUserId = aUserId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AmazonConfig.prototype, "nluTag", {
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
    AmazonConfig.prototype.isCredentials = function () {
        if (this.mConfigIdentityPoolId && this.mConfigRegion) {
            return true;
        }
        return false;
    };
    return AmazonConfig;
}(ErrorBase));

/**
 * Definiert die Network fuer Amazon
 *
 * Letzte Aenderung: 02.04.2019
 * Status: rot
 *
 * @module cloud/amazon/net
 * @author SB
 */
var AmazonNetwork = /** @class */ (function (_super) {
    __extends(AmazonNetwork, _super);
    function AmazonNetwork() {
        return _super.call(this, 'AmazonNetwork') || this;
    }
    return AmazonNetwork;
}(NetHtml5Connect));

/**
 * Definiert die Verbindung zum Amazon-Service
 *
 * Letzte Aenderung: 03.04.2019
 * Status: rot
 *
 * @module cloud/amazon/net
 * @author SB
 */
/**
 * Dient zur Verbindungsaufnahme mit AWS Credentials.
 */
var AmazonConnect = /** @class */ (function (_super) {
    __extends(AmazonConnect, _super);
    /**
     * Erzeugt eine Instanz von NuanceConnect
     *
     * @param aConfig - Amazon Config Objekt
     */
    function AmazonConnect(aConfig) {
        var _this = _super.call(this, 'AmazonConnect') || this;
        // innere Komponenten
        _this.mConfig = null;
        // Verbindung vorhanden
        _this.mConnectFlag = false;
        _this.mConfig = aConfig;
        return _this;
    }
    // Verbindungs-Funktionen
    AmazonConnect.prototype.isConnect = function () {
        return this.mConnectFlag;
    };
    /**
     * Verbindungsaufbau mit Amazon-Service.
     */
    AmazonConnect.prototype.connect = function () {
        // Initialize the Amazon Cognito credentials provider
        // console.log('AmazonConnect: Credentials eintragen in AWS');
        if (this.isConnect()) {
            // Verbindung ist bereits aufgebaut
            return 0;
        }
        try {
            // pruefen auf Credentials
            // console.log('AmazonConnect: Region = ', this.mConfig.region);
            // console.log('AmazonConnect: IdentityPoolId = ', this.mConfig.identityPoolId);
            if (this.mConfig.region) {
                window.AWS.config.region = this.mConfig.region;
            }
            if (this.mConfig.identityPoolId) {
                window.AWS.config.credentials = new window.AWS.CognitoIdentityCredentials({ IdentityPoolId: this.mConfig.identityPoolId });
                if (!window.AWS.config.credentials) {
                    this._error('connect', 'keine Amazon-Credentials erzeugt');
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
    AmazonConnect.prototype.disconnect = function () {
        this.mConnectFlag = false;
        try {
            window.AWS.config.region = '';
            window.AWS.config.credentials = null;
        }
        catch (aException) {
            this._exception('disconnect', aException);
            return -1;
        }
        return 0;
    };
    return AmazonConnect;
}(ErrorBase));

/**
 * Amazon Geraeteklasse fuer TTS, ASR und NLU
 *
 * Letzte Aenderung: 08.05.2019
 * Status: rot
 *
 * @module cloud/amazon/device
 * @author SB
 */
/**
 * Basisklasse akller Amazon-Geraete
 */
var AmazonDevice = /** @class */ (function (_super) {
    __extends(AmazonDevice, _super);
    /**
     * Erzeugt eine Instanz von NuanceDevice
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */
    function AmazonDevice(aDeviceName, aConfig, aConnect) {
        var _this = _super.call(this, aDeviceName || 'AmazonDevice') || this;
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
    AmazonDevice.prototype._onStart = function () {
        // console.log('AmazonDevice._onStart');
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
    AmazonDevice.prototype._onStop = function () {
        // console.log('AmazonDevice._onStop:', this.mTransaction, this.onStop );
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
    AmazonDevice.prototype._onResult = function (aResult) {
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
    AmazonDevice.prototype._onError = function (aError) {
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
    AmazonDevice.prototype._onClose = function () {
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
    // TODO: wird in Amazon nicht gebraucht
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
    // TODO: wird in Amazon nicht gebraucht
    /****
    _createOption( aOverrideOption: any): any {
        // console.log( 'NuanceNLU._createOption:', aOverrideOption );
        const option = Object.assign( aOverrideOption, this._getDefaultOption());
        option.appId = aOverrideOption.appId || this.mConfig.appId || '';
        option.appKey = aOverrideOption.appKey || this.mConfig.appKey || '';
        option.userId = aOverrideOption.userId || this.mConfig.userId;
        option.tag = aOverrideOption.tag || this.mConfig.nluTag || '';
        option.language = aOverrideOption.language || AMAZON_DEFAULT_LANGUAGE;
        option.text = aOverrideOption.text || '';
        option.voice = aOverrideOption.voice || AMAZON_DEFAULT_VOICE;
        option.codec = aOverrideOption.codec || AMAZON_DEFAULT_CODEC;
        return option;
    }
    ****/
    // Nachrichten senden
    // TODO: wird in Amazon nicht gebraucht
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
    AmazonDevice.prototype._start = function (aOption) {
        // muss von erbenden Klassen ueberschrieben werden
    };
    /**
     * Interne Geraete Stopfunktion
     *
     * @protected
     */
    AmazonDevice.prototype._stop = function () {
        // muss von erbenden Klassen ueberschrieben werden
    };
    /**
     * Geraeteaktion starten
     *
     * @param {AmazonTransaction} aTransaction - auszufuehrende Transaktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonDevice.prototype.start = function (aTransaction, aOption) {
        // console.log('AmazonDevice.start:', aTransaction, aOption);
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
     * @param {AmazonTransaction} aTransaction - auszufuehrende Transaktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonDevice.prototype.stop = function (aTransaction) {
        // console.log('AmazonDevice.stop:', aTransaction);
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
    AmazonDevice.prototype.isTransaction = function () {
        if (this.mTransaction) {
            return true;
        }
        return false;
    };
    /**
     * Transaktion zurueckgeben
     */
    AmazonDevice.prototype.getTransaction = function () {
        return this.mTransaction;
    };
    /**
     * Transaktion loeschen
     */
    AmazonDevice.prototype.clearTransaction = function () {
        this.mTransaction = null;
    };
    return AmazonDevice;
}(ErrorBase));

/**
 * ASR Anbindung an den Amazon-Service
 *
 * Letzte Aenderung: 16.05.2019
 * Status: rot
 *
 * @module cloud/amazon/device
 * @author SB
 */
var AmazonASR = /** @class */ (function (_super) {
    __extends(AmazonASR, _super);
    function AmazonASR(aConfig, aConnect, aAudioContext, aGetUserMedia, aAudioReader) {
        var _this = _super.call(this, 'AmazonASR', aConfig, aConnect) || this;
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
    // ASR-Funktionen
    AmazonASR.prototype._startAudio = function (aOption) {
    };
    /**
     * Echtzeitstreamen vom Mikrophon zur Sprachernkennung
     *
     * @param aOption
     */
    AmazonASR.prototype._startASR = function (aOption) {
    };
    /**
     * startet die Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonASR.prototype._start = function (aOption) {
        /****
        // console.log('AmazonASR._start:', aOption.language);
        if ( this.mRecordingFlag ) {
            this._error( '_start', 'ASR laeuft bereits' );
            return -1;
        }

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
        return 0;
        ****/
        this._error('_start', 'ASR ist nicht implementiert');
        return -1;
    };
    AmazonASR.prototype._stop = function () {
        /****
        // console.log('NuanceASR._stop');
        this.mRecordingFlag = false;
        if ( !this.mAudioRecorder ) {
            return 0;
        }
        try {
            this.mAudioRecorder.stop(() => {
            const _audio_end = {
                    'message': 'audio_end',
                    'audio_id': this.mRequestId
                };
                this.mConnect.sendJSON( _audio_end );
            });
            this.mAudioRecorder = null;
            return 0;
        } catch ( aException ) {
            this._exception( '_stop', aException );
            return -1;
        }
        ****/
        this._error('_stop', 'ASR ist nicht implementiert');
        return -1;
    };
    return AmazonASR;
}(AmazonDevice));

/**
 * AmazonAudioCodec fuer Encode/Decode PCM
 *
 * Zur Zeit wird nur PCM-Codec unterstuetzt.
 *
 * Letzte Aenderung: 02.04.2019
 * Status: rot
 *
 * @module cloud/amazon/audio
 * @author SB
 */
// Konstanten
var PCM_L16CodecArray = ['audio/L16;rate=8000', 'audio/L16;rate=16000'];
/**
 * Klasse AmazonAudioCodec zur Codierung/Decodierung von Audiodaten
 */
var AmazonAudioCodec = /** @class */ (function (_super) {
    __extends(AmazonAudioCodec, _super);
    function AmazonAudioCodec() {
        return _super.call(this, 'AmazonAudioCodec') || this;
    }
    // Codec-Funktionen
    /**
     * Codec pruefen
     *
     * @private
     * @param {string} aCodec - zu pruefender Codec
     * @param {string[]} aCodecArray - Codec-Array
     */
    AmazonAudioCodec.prototype._findCodec = function (aCodec, aCodecArray) {
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
    AmazonAudioCodec.prototype.findPcmCodec = function (aCodec) {
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
    AmazonAudioCodec.prototype._float32ToInt16 = function (aFloat32) {
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
    AmazonAudioCodec.prototype._float32ArrayToInt16Array = function (aFloat32Array) {
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
    AmazonAudioCodec.prototype.encodePCM = function (aFrame, aCodec) {
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
    AmazonAudioCodec.prototype.decodePCM = function (aAudioData) {
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
            // console.log('AmazonAudioCodec.decodePCM: Exception', aException);
            this._exception('decodePCM', aException);
            return [];
        }
    };
    return AmazonAudioCodec;
}(ErrorBase));

/**
 * externe Resampler-Klasse
 *
 * Letzte Aenderung: 15.12.2018
 * Status: rot
 *
 * @module cloud/amazon/audio
 * @author SB
 */
// JavaScript Audio Resampler (c) 2011 - Grant Galitz
// https://github.com/taisel/XAudioJS/blob/master/resampler.js
var AmazonResampler = /** @class */ (function () {
    function AmazonResampler(fromSampleRate, toSampleRate, channels, outputBufferSize, noReturn) {
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
    AmazonResampler.prototype.initialize = function () {
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
    AmazonResampler.prototype.compileInterpolationFunction = function () {
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
    AmazonResampler.prototype.bypassResampler = function (buffer) {
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
    AmazonResampler.prototype.bufferSlice = function (sliceAmount) {
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
    AmazonResampler.prototype.initializeBuffers = function (generateTailCache) {
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
    return AmazonResampler;
}());

/**
 * AmazonAudioPlayer fuer Abspielen von Sprachdaten
 *
 * Zur Zeit wird nur PCM-Codec unterstuetzt.
 *
 * Letzte Aenderung: 02.04.2019
 * Status: rot
 *
 * @module cloud/amazon/audio
 * @author SB
 */
// Minimum-Samplerate fuer Safari
var AUDIO_MIN_SAMPLERATE = 22500;
/**
 * Klasse AmazonAudioPlayer zum Absielen des Amazon-Audiostreams
 */
var AmazonAudioPlayer = /** @class */ (function (_super) {
    __extends(AmazonAudioPlayer, _super);
    /**
     * Konstruktor
     *
     * @param aAudioContext - globaler AudioContext
     */
    function AmazonAudioPlayer(aAudioContext) {
        var _this = _super.call(this, 'AmazonAudioPlayer') || this;
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
        _this.mAudioCodec = new AmazonAudioCodec();
        return _this;
    }
    /**
     * Start-Event fuer Audio
     */
    AmazonAudioPlayer.prototype._onAudioStart = function () {
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
    AmazonAudioPlayer.prototype._onAudioStop = function () {
        if (this.mOnAudioStopFunc) {
            try {
                this.mOnAudioStopFunc();
            }
            catch (aException) {
                this._exception('_onAudioStop', aException);
            }
        }
    };
    Object.defineProperty(AmazonAudioPlayer.prototype, "onAudioStart", {
        set: function (aAudioStartFunc) {
            this.mOnAudioStartFunc = aAudioStartFunc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AmazonAudioPlayer.prototype, "onAudioStop", {
        set: function (aAudioStopFunc) {
            this.mOnAudioStopFunc = aAudioStopFunc;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Start der Wiedergabe
     */
    AmazonAudioPlayer.prototype.start = function () {
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
    AmazonAudioPlayer.prototype._getAudioBufferFirst = function (aData) {
        var audioBuffer = null;
        // fuer die meisten aktuellen Browser mit AudioBuffer Constructor 
        try {
            var audioToPlay = new Float32Array(aData.length);
            audioToPlay.set(aData);
            // console.log('AmazonAudioPlayer.playByStream: buffer direkt erzeugen:', audioToPlay.length);
            audioBuffer = new AudioBuffer({ length: audioToPlay.length, numberOfChannels: 1, sampleRate: AMAZON_AUDIOSAMPLE_RATE });
            audioBuffer.getChannelData(0).set(audioToPlay);
        }
        catch (aException) {
            audioBuffer = null;
            console.log('AmazonAudioPlayer._getAudioBufferFirst: Exception', aException);
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
    AmazonAudioPlayer.prototype._getAudioBufferSecond = function (aData) {
        var audioBuffer = null;
        // fuer die Browser ohne AudioBuffer Constructor
        try {
            var audioToPlay = new Float32Array(aData.length);
            audioToPlay.set(aData);
            // console.log('AmazonAudioPlayer.playByStream: buffer erzeugen mit 16000 Samplerate:', audioToPlay.length);
            audioBuffer = this.mAudioContext.createBuffer(1, audioToPlay.length, AMAZON_AUDIOSAMPLE_RATE);
            audioBuffer.getChannelData(0).set(audioToPlay);
        }
        catch (aException) {
            audioBuffer = null;
            console.log('AmazonAudioPlayer._getAudioBufferSecond: Exception', aException);
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
    AmazonAudioPlayer.prototype._getAudioBufferResample = function (aData) {
        var audioBuffer = null;
        // Fuer Safari wird eine hoehere SampleRate als 16000 benoetigt, da createBuffer sonst nicht funktioniert
        // hier wird der Resampler eingesetzt
        try {
            // notwendig ist ein groesseres FloatArray 22500/16000 = 1.4 
            var audioToPlay = new Float32Array(aData.length * 1.4);
            audioToPlay.set(aData);
            // Resampler, um die Frequenz des AudioBuffers anzuheben auf 22500 Hz fuer Safari
            this.mResampler = new AmazonResampler(AMAZON_AUDIOSAMPLE_RATE, AUDIO_MIN_SAMPLERATE, 1, audioToPlay.length, undefined);
            var _audioToPlay = this.mResampler.resampler(audioToPlay);
            // console.log('AmazonAudioPlayer.playByStream: buffer erzeugen mit 22500 Samplerate:', _audioToPlay.length);
            audioBuffer = this.mAudioContext.createBuffer(1, _audioToPlay.length, AUDIO_MIN_SAMPLERATE);
            audioBuffer.getChannelData(0).set(_audioToPlay);
        }
        catch (aException) {
            audioBuffer = null;
            console.log('AmazonAudioPlayer._getAudioBufferResample: Exception', aException);
        }
        return audioBuffer;
    };
    // Player-Funktionen
    /**
     * Abspielen des Audiostreams
     *
     * @param {*} aAudioArray - Audiostream
     */
    AmazonAudioPlayer.prototype.playByStream = function (aAudioArray) {
        var _this = this;
        try {
            if (!this.mAudioContext) {
                console.log('AmazonAudioPlayer.playByStream: kein AudioContext vorhanden');
                return;
            }
            console.log('AmazonAudioPlayer.playByStream: start');
            if (aAudioArray.length === 0 || this.mAudioStopFlag) {
                this.mBeginSpeakFlag = true;
                // console.log( 'AmazonConnect.connect: source.onended' );
                this._onAudioStop();
                this.mAudioSource = null;
                return;
            }
            // console.log('AmazonAudioPlayer.playByStream: AudioContext.state = ', this.mAudioContext.state);
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
            // console.log('AmazonAudioPlayer.playByStream: audio start', this.mAudioSource);
            if (this.mAudioSource.start) {
                this.mAudioSource.start(0);
            }
            else {
                this.mAudioSource.noteOn(0);
            }
            this._onAudioStart();
            console.log('AmazonAudioPlayer.playByStream: end');
        }
        catch (aException) {
            this.mBeginSpeakFlag = true;
            this._onAudioStop();
            this.mAudioSource = null;
            // console.log('AmazonAudioPlayer.playByStream: Exception', aException);
            this._exception('playByStream', aException);
        }
    };
    /**
     * Audiodaten abspielen
     *
     * @param aOptions - optionale Parameter (codec, onaudiostart)
     * @param aAudioData - abzuspielende Audiodaten
     */
    AmazonAudioPlayer.prototype.decode = function (aOptions, aAudioData) {
        try {
            console.log('AmazonAudioPlayer.decode: start');
            if (this.mAudioCodec.findPcmCodec(aOptions.codec)) {
                var decodePCM16KData = this.mAudioCodec.decodePCM(aAudioData);
                this.mAudioArray.push(decodePCM16KData);
                this.mQueue.push(decodePCM16KData);
                console.log('AmazonAudioPlayer.decode: end');
                // console.log('AmazonConnect.connect: PCM AudioSink', this.mBeginSpeakFlag);
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
    AmazonAudioPlayer.prototype.stop = function () {
        try {
            console.log('AmazonAudioPlayer.stop');
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
    return AmazonAudioPlayer;
}(ErrorBase));

/**
 * TTS Anbindung an den Amazon-Service
 *
 * Letzte Aenderung: 08.05.2019
 * Status: rot
 *
 * @module cloud/amazon/device
 * @author SB
 */
/**
 * AmazonTTS Klasse fuer Sprachausgaben
 */
var AmazonTTS = /** @class */ (function (_super) {
    __extends(AmazonTTS, _super);
    /**
     * Erzeugt eine Instanz von AmazonTTS
     *
     * @param aConfig - Konfigurationsobjekt
     * @param aConnect - Verbindungsobjekt
     */
    function AmazonTTS(aConfig, aConnect, aAudioContext) {
        var _this = _super.call(this, 'AmazonTTS', aConfig, aConnect) || this;
        // Audio
        _this.mAudioContext = null;
        _this.mAudioPlayer = null;
        _this.mAudioContext = aAudioContext;
        return _this;
    }
    /**
     * Startet die Sprachausgabe
     *
     * @param aOptions - Parameter text, language und voice fuer die Sprach-TTS
     */
    AmazonTTS.prototype._start = function (aOptions) {
        // console.log('AmazonTTS._start: Start', aOptions);
        var _this = this;
        if (!aOptions || !aOptions.text || typeof aOptions.text !== 'string') {
            this._error('_start', 'kein Text uebergeben');
            return -1;
        }
        try {
            // Audio-Player erzeugen
            this.mAudioPlayer = new AmazonAudioPlayer(this.mAudioContext);
            if (!this.mAudioPlayer) {
                this._error('_start', 'AudioPlayer wurde nicht erzeugt');
                return -1;
            }
            this.mAudioPlayer.onAudioStart = function () {
                // console.log('AmazonTTS._start: AudioStartEvent');
                _this._onStart();
            };
            this.mAudioPlayer.onAudioStop = function () {
                // console.log('AmazonTTS._start: AudioStopEvent');
                _this._onStop();
            };
            // Amazon-Credentials ausgeben
            // AWS.config.region = this.mConfig.region; 
            // AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: this.mConfig.identityPoolId });
            // console.log('AmazonTTS._start: Credentials', AWS.config.region, AWS.config.credentials);
            // Create synthesizeSpeech params JSON
            // console.log('AmazonTTS: Speech-Parameter erzeugen');
            // Create the Polly service object
            var polly = new window.AWS.Polly({ apiVersion: '2016-06-10' });
            // Parameter fuer Polly
            var params = {
                LanguageCode: aOptions.language || 'de-DE',
                OutputFormat: AMAZON_AUDIO_FORMAT,
                SampleRate: '' + AMAZON_AUDIOSAMPLE_RATE,
                Text: aOptions.text || '',
                TextType: 'text',
                VoiceId: aOptions.voice || 'Vicki'
            };
            polly.synthesizeSpeech(params, function (aError, aData) {
                // console.log('AmazonTTS._start: synthesizeSpeech');
                if (aError) {
                    // console.log('AmazonTTS._start: syntheseSpeech Error = ', aError);
                    _this._onError(aError);
                    _this._onStop();
                }
                else if (aData) {
                    // console.log('AmazonTTS._start: syntheseSpeech AudioStream start');
                    _this.mAudioPlayer.decode({ codec: AMAZON_PCM_CODEC }, aData.AudioStream);
                    // console.log('AmazonTTS._start: syntheseSpeech AudioStream end');
                }
            });
            // Audioplayer starten
            this.mAudioPlayer.start();
            return 0;
        }
        catch (aException) {
            this._exception('_start', aException);
            return -1;
        }
        // console.log('AmazonTTS._start: End');
    };
    AmazonTTS.prototype._stop = function () {
        // console.log('AmazonTTS._stop:', this.mAudioPlayer);
        if (this.mAudioPlayer) {
            this.mAudioPlayer.stop();
            this.mAudioPlayer = null;
        }
        return 0;
    };
    return AmazonTTS;
}(AmazonDevice));

/**
 * AmazonPort zur Verbindung des Amazon Cloud-Service mit dem Framework
 * Stellt Grundfunktionen von Amazon zur Verfuegung. Werden von mehreren anderen
 * Komponenten geteilt.
 *
 * Letzte Aenderung: 16.05.2019
 * Status: rot
 *
 * @module cloud/amazon
 * @author SB
 */
// Konstanten
// Zeit die im Unlock-Event auf RESUME gewartet wird
var AUDIO_UNLOCK_TIMEOUT = 2000;
// Default Timeout fuer die Dauer einer Action, maximal eine Minute darf die Verarbeitung einer Action dauern,
// danach wird Stop erzwungen.
var AMAZON_ACTION_TIMEOUT = 60000;
/**
 * Definiert die AmazonPort-Klasse
 */
var AmazonPort = /** @class */ (function (_super) {
    __extends(AmazonPort, _super);
    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */
    function AmazonPort(aPortName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var _this = _super.call(this, aPortName || AMAZON_PORT_NAME, aRegisterFlag) || this;
        // externe Html5-Komponenten
        _this.mAudioContext = null;
        _this.mGetUserMedia = null;
        // externes Amazon-Objekt
        _this.mAmazonConfig = null;
        _this.mAmazonNetwork = null;
        _this.mAmazonConnect = null;
        _this.mAmazonTTS = null;
        _this.mAmazonASR = null;
        // mAmazonNLU: AmazonNLU = null;
        // weitere Attribute
        _this.mDynamicCredentialsFlag = false;
        _this.mTransaction = null;
        _this.mRunningFlag = false;
        _this.mDefaultOptions = null;
        _this.mActionTimeoutId = 0;
        _this.mActionTimeout = AMAZON_ACTION_TIMEOUT;
        return _this;
    }
    // Port-Funktionen
    /**
     * pruefen auf Mock-Port zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Port ein Mock zum Testen ist
     */
    AmazonPort.prototype.isMock = function () {
        return false;
    };
    /**
     * Rueckgabe eines logischen Port-Typs
     *
     * @return {string} logischer Typ des Ports fuer unterschiedliche Anwendungsschnittstellen
     */
    AmazonPort.prototype.getType = function () {
        return AMAZON_TYPE_NAME;
    };
    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */
    AmazonPort.prototype.getClass = function () {
        return 'AmazonPort';
    };
    AmazonPort.prototype.getVersion = function () {
        return AMAZON_API_VERSION;
    };
    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */
    AmazonPort.prototype._checkCredentials = function (aOption) {
        if (!aOption) {
            return false;
        }
        // App-Parameter pruefen
        if (typeof aOption.amazonRegion !== 'string') {
            return false;
        }
        if (!aOption.amazonRegion) {
            return false;
        }
        if (typeof aOption.amazonIdentityPoolId !== 'string') {
            return false;
        }
        if (!aOption.amazonIdentityPoolId) {
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
    AmazonPort.prototype._initAllObject = function (aOption) {
        // console.log('AmazonPort._initAllObject:', aOption);
        // innere Komponenten eintragen
        var _this = this;
        var fileReader = new FileHtml5Reader();
        fileReader.init();
        var audioReader = new AudioHtml5Reader();
        audioReader.init({ audioContext: this.mAudioContext });
        this.mAmazonConfig = new AmazonConfig(fileReader);
        if (this.mAmazonConfig.init(aOption) !== 0) {
            return -1;
        }
        // Network-Anbindung erzeugen
        this.mAmazonNetwork = new AmazonNetwork();
        this.mAmazonNetwork.onOnline = function () { return _this._onOnline(); };
        this.mAmazonNetwork.onOffline = function () { return _this._onOffline(); };
        this.mAmazonNetwork.onError = function (aError) { return _this._onError(aError); };
        if (this.mAmazonNetwork.init(aOption) !== 0) {
            return -1;
        }
        this.mAmazonConnect = new AmazonConnect(this.mAmazonConfig);
        this.mAmazonConnect._setErrorOutputFunc(function (aErrorText) { return _this._onError(new Error(aErrorText)); });
        // Amazon-Komponenten erzeugen
        /****
        this.mAmazonNLU = new AmazonNLU( this.mAmazonConfig, this.mAmazonConnect );
        this.mAmazonNLU.onStart = (aTransaction: AmazonTransaction) => this._onStart( aTransaction.plugin, aTransaction.type );
        this.mAmazonNLU.onStop = (aTransaction: AmazonTransaction) => this._onStop( aTransaction.plugin, aTransaction.type );
        this.mAmazonNLU.onResult = (aTransaction: AmazonTransaction) => this._onResult( aTransaction.result, aTransaction.plugin, aTransaction.type );
        this.mAmazonNLU.onError = (aTransaction: AmazonTransaction) => this._onError( aTransaction.error, aTransaction.plugin, aTransaction.type );
        this.mAmazonNLU.onClose = (aTransaction: AmazonTransaction) => this._onClose();
        ****/
        // pruefen auf Audiokontext, nur dann koennen TTS und ASR verwendet werden
        if (this.mAudioContext) {
            // this.mAmazonTTS = new AmazonTTS( this.mAmazonConfig, this.mAmazonConnect, this.mAudioContext );
            this.mAmazonTTS = new AmazonTTS(this.mAmazonConfig, this.mAmazonConnect, this.mAudioContext);
            this.mAmazonTTS.onStart = function (aTransaction) { return _this._onStart(aTransaction.plugin, aTransaction.type); };
            this.mAmazonTTS.onStop = function (aTransaction) { return _this._onStop(aTransaction.plugin, aTransaction.type); };
            this.mAmazonTTS.onResult = function (aTransaction) { return _this._onResult(aTransaction.result, aTransaction.plugin, aTransaction.type); };
            this.mAmazonTTS.onError = function (aTransaction) { return _this._onError(aTransaction.error, aTransaction.plugin, aTransaction.type); };
            this.mAmazonTTS.onClose = function (aTransaction) { return _this._onClose(); };
            try {
                if (this.mGetUserMedia) {
                    // ASR kann nur verwendet werden, wenn getUserMedia vorhanden ist
                    this.mAmazonASR = new AmazonASR(this.mAmazonConfig, this.mAmazonConnect, this.mAudioContext, this.mGetUserMedia, audioReader);
                    this.mAmazonASR.onStart = function (aTransaction) { return _this._onStart(aTransaction.plugin, aTransaction.type); };
                    this.mAmazonASR.onStop = function (aTransaction) { return _this._onStop(aTransaction.plugin, aTransaction.type); };
                    this.mAmazonASR.onResult = function (aTransaction) { return _this._onResult(aTransaction.result, aTransaction.plugin, aTransaction.type); };
                    this.mAmazonASR.onError = function (aTransaction) { return _this._onError(aTransaction.error, aTransaction.plugin, aTransaction.type); };
                    this.mAmazonASR.onClose = function (aTransaction) { return _this._onClose(); };
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
     *      amazonAppId     - Amazon Credentials fuer APP_ID
     *      amazonAppKey    - Amazon Credentials fuer APP_KEY
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
    AmazonPort.prototype.init = function (aOption) {
        // console.log('AmazonPort.init:', aOption);
        if (this.mInitFlag) {
            this._error('init', 'Port ist bereits initialisiert');
            return 0;
        }
        // pruefen auf vorhandene AWS-Bibliothek
        if (!window.AWS) {
            this._error('init', 'AWS-SDK ist nicht vorhanden');
            return -1;
        }
        // pruefen auf dynamische Credentials
        if (aOption && typeof aOption.amazonDynamicCredentialsFlag === 'boolean' && aOption.amazonDynamicCredentialsFlag) {
            // dynamische Credentials koennen gesetzt werden
            this.mDynamicCredentialsFlag = true;
        }
        else {
            // pruefen auf Amazon App-Credientials Uebergabe
            if (!this._checkCredentials(aOption)) {
                this._error('init', 'keine Region und/oder IdentityPoolId als Parameter uebergeben');
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
        // Debug-Ausgabe fuer Amazon-Komponenten
        if (this.isErrorOutput()) {
            /****
            if ( this.mAmazonNLU ) {
                console.log('AmazonPort: NLU ist vorhanden');
            } else {
                console.log('AmazonPort: NLU ist nicht vorhanden');
            }
            ****/
            if (this.mAmazonTTS) {
                console.log('AmazonPort: TTS ist vorhanden');
            }
            else {
                console.log('AmazonPort: TTS ist nicht vorhanden');
            }
            if (this.mAmazonASR) {
                console.log('AmazonPort: ASR ist vorhanden');
            }
            else {
                console.log('AmazonPort: ASR ist nicht vorhanden');
            }
        }
        return 0;
    };
    /**
     * gibt den Port frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    AmazonPort.prototype.done = function () {
        _super.prototype.done.call(this);
        // Timeout loeschen 
        this._clearActionTimeout();
        // externes Amazon-Objekt
        if (this.mAmazonNetwork) {
            this.mAmazonNetwork.done();
            this.mAmazonNetwork = null;
        }
        if (this.mAmazonConnect) {
            this.mAmazonConnect.disconnect();
            this.mAmazonConnect = null;
        }
        if (this.mAmazonConfig) {
            this.mAmazonConfig.done();
            this.mAmazonConfig = null;
        }
        this.mAmazonTTS = null;
        this.mAmazonASR = null;
        // this.mAmazonNLU = null;
        // Audiokontext schliessen
        if (this.mAudioContext) {
            // console.log('AmazonPort.done: Close AudioContext');
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
        this.mActionTimeout = AMAZON_ACTION_TIMEOUT;
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
    AmazonPort.prototype.reset = function (aOption) {
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
    AmazonPort.prototype._setErrorOutput = function (aErrorOutputFlag) {
        _super.prototype._setErrorOutput.call(this, aErrorOutputFlag);
        if (this.mAmazonConfig) {
            this.mAmazonConfig._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mAmazonNetwork) {
            this.mAmazonNetwork._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mAmazonConnect) {
            this.mAmazonConnect._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mAmazonTTS) {
            this.mAmazonTTS._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mAmazonASR) {
            this.mAmazonASR._setErrorOutput(aErrorOutputFlag);
        }
        // if ( this.mAmazonNLU ) { this.mAmazonNLU._setErrorOutput( aErrorOutputFlag ); }
    };
    // Timeout-Funktionen
    /**
     * Aktion wird abgebrochen
     */
    AmazonPort.prototype._breakAction = function () {
        // console.log('AmazonPort._beakAction');
        this.mActionTimeoutId = 0;
        if (this.mTransaction) {
            this._error('_breakAction', 'Timeout fuer Action erreicht');
            this._onStop(this.mTransaction.plugin, this.mTransaction.type);
        }
    };
    /**
     * Timeout fuer Aktion setzen. Timeout wird nur gesetzt, wenn > 0
     */
    AmazonPort.prototype._setActionTimeout = function () {
        var _this = this;
        // console.log('AmazonPort._setActionTimeout');
        if (this.mActionTimeoutId === 0 && this.mActionTimeout > 0) {
            this.mActionTimeoutId = window.setTimeout(function () { return _this._breakAction(); }, this.mActionTimeout);
        }
    };
    /**
     * Timeout fuer Aktion loeschen
     */
    AmazonPort.prototype._clearActionTimeout = function () {
        // console.log('AmazonPort._clearActionTimeout');
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
    AmazonPort.prototype._onOnline = function () {
        // console.log('AmazonPort._onOnline');
        return 0;
    };
    /**
     * Ereignisfunktion fuer Offline aufrufen
     *
     * @private
     *
     * @return {number} errorCode(0,-1)
     */
    AmazonPort.prototype._onOffline = function () {
        // console.log('AmazonPort._onOffline');
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
    AmazonPort.prototype._onStop = function (aDest, aType) {
        // console.log('AmazonPort._onStop: Transaktion wird beendet', aDest, aType);
        // hier muss der Timeout geloescht werden, da die Transaktion zu Ende ist
        this._clearActionTimeout();
        // hier muss die Transaktion geloescht werden, da sie beendet ist
        this.mTransaction = null;
        this.mRunningFlag = false;
        return _super.prototype._onStop.call(this, aDest, aType);
    };
    // Audio-Funktionen
    /**
     * Versuch, AudioContext zu entsperren
     */
    AmazonPort.prototype._unlockAudio = function (aCallbackFunc) {
        // console.log('AmazonPort._unlockAudio: start');
        // Timeout einstellen, um garantiert ein UnlockEvent zu erhalten
        if (this.mAudioContext) {
            if (this.mAudioContext.state === 'running') {
                aCallbackFunc(true);
                return;
            }
            if (this.mAudioContext.state === 'suspended') {
                // console.log('AmazonPort._unlockAudio: start', this.mAudioContext.state);
                var timeoutId_1 = setTimeout(function () { return aCallbackFunc(false); }, AUDIO_UNLOCK_TIMEOUT);
                this.mAudioContext.resume().then(function () {
                    // console.log('AmazonPort._unlockAudio: state = ', this.mAudioContext.state);
                    clearTimeout(timeoutId_1);
                    aCallbackFunc(true);
                }, function (aError) {
                    console.log('AmazonPort._unlockAudio:', aError);
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
     * @param {AmazonConfigDataInterface} aConfigData - Konfigurationsdaten { amazonAppKey: '', amazonAppId: '', amazonNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonPort.prototype.setConfig = function (aConfigData) {
        if (this.mDynamicCredentialsFlag) {
            // Uebertragen der neuen Credentials
            try {
                if (typeof aConfigData.amazonRegion === 'string' && aConfigData.amazonRegion) {
                    this.mAmazonConfig.region = aConfigData.amazonRegion;
                }
                if (typeof aConfigData.amazonIdentityPoolId === 'string' && aConfigData.amazonIdentityPoolId) {
                    this.mAmazonConfig.identityPoolId = aConfigData.amazonIdentityPoolId;
                    console.log('AmazonPort.setConfig: neue Credentials eintragen ', aConfigData.amazonIdentityPoolId);
                    // neue Amazon-Credentials eintragen
                    this.mAmazonConnect.disconnect();
                    this.mAmazonConnect.connect();
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
     * @return {AmazonConfigDataInterface} aktuelle Portkonfigurationsdaten
     */
    AmazonPort.prototype.getConfig = function () {
        var configData = {
            amazonRegion: this.mAmazonConfig.region,
            amazonIdentityPoolId: this.mAmazonConfig.identityPoolId
        };
        return configData;
    };
    /**
     * Pruefen auf Netzwerk-Verbindung
     *
     * @return {boolean} True, wenn Netwerk verbunden ist, ansonsten false
     */
    AmazonPort.prototype.isOnline = function () {
        if (this.mAmazonNetwork) {
            return this.mAmazonNetwork.isOnline();
        }
        return false;
    };
    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */
    AmazonPort.prototype.isOpen = function () {
        if (this.mAmazonConnect) {
            // console.log('AmazonPort.isOpen:', this.mAmazonConnect.isConnect());
            return this.mAmazonConnect.isConnect();
        }
        return false;
    };
    /**
     * Pruefen und Oeffnen der WebSocket, wenn moeglich
     *
     * @private
     * @param aOpenCallbackFunc - Callback fuer WebSocket geoeffnet oder nicht
     */
    AmazonPort.prototype._checkOpen = function (aOpenCallbackFunc) {
        // console.log('AmazonPort._checkOpen:');
        // pruefen, ob Netzwerk vorhanden ist
        if (!this.isOnline()) {
            // console.log('AmazonPort._checkOpen: kein Netz vorhanden');
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
    AmazonPort.prototype.open = function (aOption) {
        // console.log('AmazonPort.open');
        if (!this.mAmazonConnect) {
            this._error('open', 'kein AmazonConnect vorhanden');
            return -1;
        }
        if (this.isOpen()) {
            return 0;
        }
        var result = this.mAmazonConnect.connect();
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
    AmazonPort.prototype.close = function () {
        if (!this.isOpen()) {
            return 0;
        }
        // console.log('AmazonPort.close');
        if (this.mAmazonConnect) {
            this._onClose();
            return this.mAmazonConnect.disconnect();
        }
        return 0;
    };
    /**
     * Rueckgabe des Pluginnamens, der gerade eine Transaktion ausfuehrt
     *
     * @return {string} PluginName oder leerer String
     */
    AmazonPort.prototype.getPluginName = function () {
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
    AmazonPort.prototype.getActionName = function () {
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
    AmazonPort.prototype.isRunning = function (aPluginName, aAction) {
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
     * Pruefen, welche Amazon-Aktionen ausfuehrbar sind.
     *
     * @param {string} aAction - Name der zu pruefenden Aktion
     *
     * @return {boolean} True, wenn Aktion ausfuehrbar ist, False sonst
     */
    AmazonPort.prototype.isAction = function (aAction) {
        var result = false;
        switch (aAction) {
            /****
            case AMAZON_NLU_ACTION:
                result = this.mAmazonNLU ? true : false;
                break;
            ****/
            case AMAZON_ASR_ACTION:
                result = this.mAmazonASR ? true : false;
                break;
            case AMAZON_TTS_ACTION:
                result = this.mAmazonTTS ? true : false;
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
    AmazonPort.prototype.setActionTimeout = function (aTimeout) {
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
    AmazonPort.prototype.start = function (aPluginName, aAction, aOption) {
        var _this = this;
        // console.log('AmazonPort.start:', aPluginName, aAction, aOption);
        // pruefen, ob eine Aktion bereits laeuft
        if (this.isRunning()) {
            this._error('start', 'Aktion laeuft bereits');
            return -1;
        }
        // pruefen auf Credentials
        if (!this.mAmazonConfig.isCredentials()) {
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
                case AMAZON_NLU_ACTION:
                    _this.mTransaction = new AmazonTransaction(aPluginName, AMAZON_NLU_ACTION);
                    result = _this._startNLU(_this.mTransaction, option.text, option.language || AMAZON_DEFAULT_LANGUAGE);
                    break;
                case AMAZON_ASRNLU_ACTION:
                    _this.mTransaction = new AmazonTransaction(aPluginName, AMAZON_ASRNLU_ACTION);
                    result = _this._startASR(_this.mTransaction, option.language || AMAZON_DEFAULT_LANGUAGE, option.audioURL || '', true, option.useProgressive || false);
                    break;
                case AMAZON_ASR_ACTION:
                    _this.mTransaction = new AmazonTransaction(aPluginName, AMAZON_ASR_ACTION);
                    result = _this._startASR(_this.mTransaction, option.language || AMAZON_DEFAULT_LANGUAGE, option.audioURL || '', false, option.useProgressive || false);
                    break;
                case AMAZON_TTS_ACTION:
                    _this.mTransaction = new AmazonTransaction(aPluginName, AMAZON_TTS_ACTION);
                    result = _this._startTTS(_this.mTransaction, option.text, option.language || AMAZON_DEFAULT_LANGUAGE, option.voice || AMAZON_DEFAULT_VOICE);
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
    AmazonPort.prototype.stop = function (aPluginName, aAction, aOption) {
        // console.log('AmazonPort.stop:', aPluginName, aAction, aOption, this.mTransaction);
        // pruefen, ob eine Aktion bereits laeuft
        if (!this.isRunning()) {
            // console.log('AmazonPort.stop: kein isRunning');
            return 0;
        }
        // pruefen, ob der Port geoeffnet ist
        if (!this.isOpen()) {
            this._error('stop', 'Port ist nicht geoeffnet');
            return -1;
        }
        // pruefen auf Credentials
        if (!this.mAmazonConfig.isCredentials()) {
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
        // console.log('AmazonPort.stop: Action = ', aAction);
        switch (aAction) {
            case AMAZON_NLU_ACTION:
                result = this._stopNLU(this.mTransaction);
                break;
            case AMAZON_ASR_ACTION:
                result = this._stopASR(this.mTransaction);
                break;
            case AMAZON_TTS_ACTION:
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
    // Amazon-Funktionen
    /**
     * Initialisierung der Recognition
     *
     * @protected
     * @param {*} aOption - optionale Parameter fuer die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonPort.prototype._initRecognition = function (aOption) {
        var _this = this;
        // console.log('AmazonPort._initRecognition: start');
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
        // console.log('AmazonPort._initRecognition: end');
        return 0;
    };
    // Text-Funktionen
    /**
     * Intent zu einem Text holen
     *
     * @private
     * @param {AmazonTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - Text der interpretiert werden soll
     * @param {string} aLanguage - Sprache des Textes der interpretiert werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonPort.prototype._startNLU = function (aTransaction, aText, aLanguage) {
        // TODO: NLU muss noch implementiert werden
        /****
        if ( !aText ) {
            this._error( '_startNLU', 'keinen Text uebergeben' );
            return -1;
        }
        if ( !aLanguage ) {
            this._error( '_startNLU', 'keine Sprache uebergeben' );
            return -1;
        }
        if ( !this.mAmazonNLU ) {
            this._error( '_startNLU', 'keine Amazon NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            const option = {
                text: aText,
                language: aLanguage
            };
            return this.mAmazonNLU.start( aTransaction, option );
        } catch ( aException ) {
            this._exception( '_startNLU', aException );
            return -1;
        }
        ****/
        this._error('_startNLU', 'nicht implementiert');
        return -1;
    };
    /**
     * stoppt die Analyse
     *
     * @private
     * @param {AmazonTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonPort.prototype._stopNLU = function (aTransaction) {
        // TODO: NLU muss noch implementiert werden
        /****
        if ( !this.mAmazonNLU ) {
            this._error( '_stopNLU', 'keine Amazon NLU-Anbindung vorhanden' );
            return -1;
        }
        try {
            return this.mAmazonNLU.stop( aTransaction );
        } catch ( aException ) {
            this._exception( '_stopNLU', aException );
            return -1;
        }
        ****/
        this._error('_stopNLU', 'nicht implementiert');
        return -1;
    };
    // ASR-Funktionen
    /**
     * startet die Recognition
     *
     * @private
     * @param {AmazonTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @returns {number} Fehlercode 0 oder -1
     */
    AmazonPort.prototype._startASR = function (aTransaction, aLanguage, aAudioUrl, aUseNLUFlag, aProgressiveFlag) {
        if (aUseNLUFlag === void 0) { aUseNLUFlag = false; }
        if (aProgressiveFlag === void 0) { aProgressiveFlag = false; }
        // console.log('AmazonPort._startASR');
        if (!aLanguage) {
            this._error('_startASR', 'keine Sprache uebergeben');
            return -1;
        }
        if (!this.mAmazonASR) {
            this._error('_startASR', 'keine Amazon ASR-Anbindung vorhanden');
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
            return this.mAmazonASR.start(aTransaction, option);
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
     * @param {AmazonTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonPort.prototype._stopASR = function (aTransaction) {
        // console.log('AmazonPort._stopASR');
        if (!this.mAmazonASR) {
            this._error('_stopASR', 'keine Amazon ASR-Anbindung vorhanden');
            return -1;
        }
        try {
            return this.mAmazonASR.stop(aTransaction);
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
     * @param {AmazonTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - auszusprechender Text
     *
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonPort.prototype._startTTS = function (aTransaction, aText, aLanguage, aVoice) {
        var _this = this;
        // console.log('AmazonPort._startTTS:', aTransaction, aText, aLanguage, aVoice);
        if (!aText) {
            this._error('_startTTS', 'keinen Text uebergeben');
            return -1;
        }
        if (!this.mAmazonTTS) {
            this._error('_startTTS', 'keine Amazon TTS-Anbindung vorhanden');
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
            // console.log('AmazonPort._startTTS: AudioContext.state = ', this.mAudioContext.state);
            this._unlockAudio(function (aUnlockFlag) {
                if (aUnlockFlag) {
                    _this.mAmazonTTS.start(aTransaction, option_1);
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
     * @param {AmazonTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonPort.prototype._stopTTS = function (aTransaction) {
        // console.log('AmazonPort._stopTTS', aTransaction);
        if (!this.mAmazonTTS) {
            this._error('_stopTTS', 'keine Amazon TTS-Anbindung vorhanden');
            return -1;
        }
        try {
            return this.mAmazonTTS.stop(aTransaction);
        }
        catch (aException) {
            this._exception('_stopTTS', aException);
            return -1;
        }
    };
    return AmazonPort;
}(Port));

/**
 * AmazonMock zum Testen des Amazon Cloud-Service mit dem Framework
 *
 * Letzte Aenderung: 01.04.2019
 * Status: rot
 *
 * @module cloud/amazon
 * @author SB
 */
// Konstanten
// Asynchrones senden von Events nach 100 millisekunden
var AMAZONMOCK_CALLBACK_TIMEOUT = 100;
/**
 * Definiert die AmazonMock-Klasse
 */
var AmazonMock = /** @class */ (function (_super) {
    __extends(AmazonMock, _super);
    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */
    function AmazonMock(aPortName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var _this = _super.call(this, aPortName || AMAZON_MOCK_NAME, aRegisterFlag) || this;
        _this.audioContextFlag = true;
        _this.getUserMediaFlag = true;
        _this.amazonNLUFlag = true;
        _this.amazonASRFlag = true;
        _this.amazonTTSFlag = true;
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
        _this.amazonRegion = '';
        _this.amazonIdentityPoolId = '';
        _this.amazonNluTag = '';
        return _this;
    }
    // Port-Funktionen
    /**
     * pruefen auf Mock-Port zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Port ein Mock zum Testen ist
     */
    AmazonMock.prototype.isMock = function () {
        return true;
    };
    /**
     * Rueckgabe eines logischen Port-Typs
     *
     * @return {string} logischer Typ des Ports fuer unterschiedliche Anwendungsschnittstellen
     */
    AmazonMock.prototype.getType = function () {
        return AMAZON_TYPE_NAME;
    };
    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */
    AmazonMock.prototype.getClass = function () {
        return 'AmazonMock';
    };
    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */
    AmazonMock.prototype._checkCredentials = function (aOption) {
        if (!aOption) {
            return false;
        }
        if (typeof aOption.amazonRegion === 'string') {
            this.amazonRegion = aOption.amazonRegion;
        }
        if (typeof aOption.amazonIdentityPoolId === 'string') {
            this.amazonIdentityPoolId = aOption.amazonIdentityPoolId;
        }
        if (typeof aOption.amazonNluTag === 'string') {
            this.amazonNluTag = aOption.amazonNluTag;
        }
        // App-Parameter pruefen
        if (typeof aOption.amazonRegion !== 'string') {
            return false;
        }
        if (!aOption.amazonRegion) {
            return false;
        }
        if (typeof aOption.amazonIdentityPoolId !== 'string') {
            return false;
        }
        if (!aOption.amazonIdentityPoolId) {
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
    AmazonMock.prototype.init = function (aOption) {
        // console.log('AmazonMock: init start', aOption);
        if (this.mInitFlag) {
            this._error('init', 'Init bereits aufgerufen');
            return 0;
        }
        // pruefen auf dynamische Credentials
        if (aOption && typeof aOption.amazonDynamicCredentialsFlag === 'boolean' && aOption.amazonDynamicCredentialsFlag) {
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
        this.amazonNLUFlag = true;
        if (this.audioContextFlag) {
            this.amazonASRFlag = true;
            if (this.getUserMediaFlag) {
                this.amazonTTSFlag = true;
            }
        }
        if (this.isErrorOutput()) {
            if (this.amazonNLUFlag) {
                console.log('AmazonMock: NLU ist vorhanden');
            }
            else {
                console.log('AmazonMock: NLU ist nicht vorhanden');
            }
            if (this.amazonTTSFlag) {
                console.log('AmazonMock: TTS ist vorhanden');
            }
            else {
                console.log('AmazonMock: TTS ist nicht vorhanden');
            }
            if (this.amazonASRFlag) {
                console.log('AmazonMock: ASR ist vorhanden');
            }
            else {
                console.log('AmazonMock: ASR ist nicht vorhanden');
            }
        }
        this._onInit(0);
        // console.log('AmazonMock.init: ende');
        return _super.prototype.init.call(this, aOption);
    };
    /**
     * gibt den Port frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    AmazonMock.prototype.done = function (aFreeFlag) {
        _super.prototype.done.call(this);
        this.audioContextFlag = true;
        this.getUserMediaFlag = true;
        this.amazonNLUFlag = false;
        this.amazonASRFlag = false;
        this.amazonTTSFlag = false;
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
    AmazonMock.prototype.reset = function (aOption) {
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
    AmazonMock.prototype._onStop = function (aDest, aType) {
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
     * @param {AmazonConfigDataInterface} aConfigData - Konfigurationsdaten { nuanceAppKey: '', nuanceAppId: '', nuanceNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonMock.prototype.setConfig = function (aConfigData) {
        if (this.mDynamicCredentialsFlag) {
            // Uebertragen der neuen Credentials
            try {
                this.amazonRegion = aConfigData.amazonRegion;
                this.amazonIdentityPoolId = aConfigData.amazonIdentityPoolId;
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
     * @return {AmazonConfigDataInterface} aktuelle Portkonfigurationsdaten
     */
    AmazonMock.prototype.getConfig = function () {
        var configData = {
            amazonRegion: this.amazonRegion,
            amazonIdentityPoolId: this.amazonIdentityPoolId,
        };
        return configData;
    };
    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */
    AmazonMock.prototype.isOpen = function () {
        return !this.disconnectFlag;
    };
    /**
     * Port oeffnen
     *
     * @param {*} aOption - optionale Parameter
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonMock.prototype.open = function (aOption) {
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
    AmazonMock.prototype.close = function () {
        this.disconnectFlag = true;
        return 0;
    };
    /**
     * Pruefen auf beschaeftigten Port.
     *
     * @return {boolean} True, Port ist beschaeftigt, False sonst
     */
    AmazonMock.prototype.isRunning = function () {
        return this.mRunningFlag;
    };
    AmazonMock.prototype._isCredentials = function () {
        if (this.amazonRegion && this.amazonIdentityPoolId) {
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
    AmazonMock.prototype.isAction = function (aAction) {
        var result = false;
        switch (aAction) {
            case AMAZON_NLU_ACTION:
                result = this.amazonNLUFlag;
                break;
            case AMAZON_ASR_ACTION:
                result = this.amazonASRFlag;
                break;
            case AMAZON_TTS_ACTION:
                result = this.amazonTTSFlag;
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
    AmazonMock.prototype.start = function (aPluginName, aAction, aOption) {
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
            case AMAZON_NLU_ACTION:
                this.mTransaction = new AmazonTransaction(aPluginName, AMAZON_NLU_ACTION);
                result = this._startNLU(this.mTransaction, option.text, option.language || AMAZON_DEFAULT_LANGUAGE);
                break;
            case AMAZON_ASRNLU_ACTION:
                this.mTransaction = new AmazonTransaction(aPluginName, AMAZON_ASRNLU_ACTION);
                result = this._startASR(this.mTransaction, option.language || AMAZON_DEFAULT_LANGUAGE, option.audioURL || '', true, option.useProgressive || false);
                break;
            case AMAZON_ASR_ACTION:
                this.mTransaction = new AmazonTransaction(aPluginName, AMAZON_ASR_ACTION);
                result = this._startASR(this.mTransaction, option.language || AMAZON_DEFAULT_LANGUAGE, option.audioURL || '', false, option.useProgressive || false);
                break;
            case AMAZON_TTS_ACTION:
                this.mTransaction = new AmazonTransaction(aPluginName, AMAZON_TTS_ACTION);
                result = this._startTTS(this.mTransaction, option.text, option.language || AMAZON_DEFAULT_LANGUAGE, option.voice || AMAZON_DEFAULT_VOICE);
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
    AmazonMock.prototype.stop = function (aPluginName, aAction, aOption) {
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
            case AMAZON_NLU_ACTION:
                result = this._stopNLU(this.mTransaction);
                break;
            case AMAZON_ASRNLU_ACTION:
            case AMAZON_ASR_ACTION:
                result = this._stopASR(this.mTransaction);
                break;
            case AMAZON_TTS_ACTION:
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
     * @param {AmazonTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - Text der interpretiert werden soll
     * @param {string} aLanguage - Sprache des Textes der interpretiert werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonMock.prototype._startNLU = function (aTransaction, aText, aLanguage) {
        if (!aText) {
            this._error('_startNLU', 'keinen Text uebergeben');
            return -1;
        }
        if (!this.amazonNLUFlag) {
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
     * @param {AmazonTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonMock.prototype._stopNLU = function (aTransaction) {
        this._onStop(aTransaction.plugin, aTransaction.type);
        // kein Stop der NLU notwendig
        return 0;
    };
    // ASR-Funktionen
    /**
     * startet die Recognition
     *
     * @private
     * @param {AmazonTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @returns {number} Fehlercode 0 oder -1
     */
    AmazonMock.prototype._startASR = function (aTransaction, aLanguage, aAudioUrl, aUseNLUFlag, aProgressiveFlag) {
        // console.log('NuancePort._startASR');
        if (!this.amazonASRFlag) {
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
     * @param {AmazonTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonMock.prototype._stopASR = function (aTransaction) {
        if (!this.amazonASRFlag) {
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
     * @param {AmazonTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - auszusprechender Text
     *
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonMock.prototype._startTTS = function (aTransaction, aText, aLanguage, aVoice) {
        var _this = this;
        if (!aText) {
            this._error('_startTTS', 'keinen Text uebergeben');
            return -1;
        }
        if (!this.amazonTTSFlag) {
            this._error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden');
            return -1;
        }
        try {
            // Nachrichten senden
            this._onStart(aTransaction.plugin, aTransaction.type);
            // asynchron TTS-Stop Event senden
            setTimeout(function () { return _this._onStop(aTransaction.plugin, aTransaction.type); }, AMAZONMOCK_CALLBACK_TIMEOUT);
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
     * @param {AmazonTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    AmazonMock.prototype._stopTTS = function (aTransaction) {
        if (!this.amazonTTSFlag) {
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
    return AmazonMock;
}(Port));

/**
 * Amazon zur Verwaltung des AmazonPort
 *
 * Hier wird die Manager-Schnittstelle von Amazon definiert, um Amazon zu
 * initialisieren und als Port zu oeffnen.
 *
 * API-Version: 1.0
 * Datum:       01.04.2019
 *
 * Letzte Aenderung: 01.04.2019
 * Status: rot
 *
 * @module cloud/amazon
 * @author SB
 */
/**
 * statische Amazon-Klasse zur Erzeugung des AmazonPorts
 */
var Amazon = /** @class */ (function () {
    // statische Klasse, keine Instanz erzeugbar !
    function Amazon() {
    }
    // Fehler-Funktionen
    Amazon.setErrorOutputOn = function () {
        Amazon.mErrorOutputFlag = true;
        PortManager.setErrorOutputOn();
    };
    Amazon.setErrorOutputOff = function () {
        Amazon.mErrorOutputFlag = false;
        PortManager.setErrorOutputOff();
    };
    Amazon.setErrorOutputFunc = function (aErrorFunc) {
        PortManager._setErrorOutputFunc(aErrorFunc);
    };
    /**
     * Initialisiert den AmazonPort.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    Amazon._initAmazonPort = function (aAmazonOption) {
        // console.log('Amazon._initAmazonPort:', aAmazonOption);
        var port = PortManager.get(AMAZON_TYPE_NAME, AmazonPort);
        if (!port) {
            return -1;
        }
        if (port.init(aAmazonOption) !== 0) {
            PortManager.remove(AMAZON_TYPE_NAME);
            return -1;
        }
        Amazon.mCurrentPort = port;
        return 0;
    };
    /**
     * Initialisiert den AmazonMock.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    Amazon._initAmazonMock = function (aAmazonOption) {
        // console.log('Amazon._initAmazonMock:', aAmazonOption);
        var port = PortManager.get(AMAZON_TYPE_NAME, AmazonMock);
        if (!port) {
            console.log('Amazon._initAmazonMock: Error AmazonMock wurde nicht erzeugt');
            return -1;
        }
        if (port.init(aAmazonOption) !== 0) {
            console.log('Amazon._initAmazonMock: Error AmazonMock wurde nicht initialisiert');
            PortManager.remove(AMAZON_TYPE_NAME);
            return -1;
        }
        Amazon.mCurrentPort = port;
        return 0;
    };
    /**
     * Initialisiert den AmazonPorts
     *
     * @static
     * @param {AmazonOptionInterface} aOption - Amazon-Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Amazon.init = function (aOption) {
        // console.log('Amazon.init:', aOption);
        if (Amazon.mInitFlag) {
            return 0;
        }
        // pruefen auf Optionen
        if (!aOption) {
            if (Amazon.mErrorOutputFlag) {
                console.log('Amazon.init: Keine Amazon-Parameter uebergeben');
            }
            return -1;
        }
        // pruefen auf ErrorOutputFlag
        if (typeof aOption.errorOutputFlag === 'boolean') {
            if (aOption.errorOutputFlag) {
                Amazon.setErrorOutputOn();
            }
            else {
                Amazon.setErrorOutputOff();
            }
        }
        // hier wird der zu erzeugende Portname selectiert
        var portName = 'AmazonPort';
        if (aOption && typeof aOption.amazonPortName === 'string') {
            if (aOption.amazonPortName === 'AmazonMock') {
                portName = 'AmazonMock';
            }
        }
        // hier wird der Amazon-Port initialisiert
        // console.log('Amazon.init: PortName = ', portName);
        if (portName === 'AmazonPort') {
            if (Amazon._initAmazonPort(aOption) !== 0) {
                return -1;
            }
        }
        else if (portName === 'AmazonMock') {
            if (Amazon._initAmazonMock(aOption) !== 0) {
                return -1;
            }
        }
        else {
            if (Amazon.mErrorOutputFlag) {
                console.log('Amazon.init: Kein Amazon PortName vorhanden');
            }
            return -1;
        }
        // console.log('Amazon.init: end', result);
        Amazon.mInitFlag = true;
        return 0;
    };
    Amazon.isInit = function () {
        return Amazon.mInitFlag;
    };
    /**
     * Freigabe des AmazonPorts
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    Amazon.done = function () {
        var port = PortManager.find(AMAZON_TYPE_NAME);
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if (!port) {
            port = Amazon.mCurrentPort;
        }
        var result = 0;
        if (port) {
            result = port.done();
            PortManager.remove(AMAZON_TYPE_NAME);
        }
        Amazon.mCurrentPort = null;
        Amazon.mInitFlag = false;
        return result;
    };
    // Port-Funktionen
    Amazon._onOpenEvent = function (aError, aPortName, aPortResult, aOpenEventCallback) {
        if (typeof aOpenEventCallback === 'function') {
            try {
                // console.log('Amazon._onOpenEvent:', aPortName, aPortResult);
                aOpenEventCallback(aError, aPortName, aPortResult);
                return 0;
            }
            catch (aException) {
                if (Amazon.mErrorOutputFlag) {
                    console.log('Amazon._onOpenEvent: Exception', aException.message);
                }
                return -1;
            }
        }
        return 0;
    };
    /**
     * Oeffnet den AmazonPort
     *
     * @param {function} aOpenEventCallback - Funktion fuer OpenEvent-Ereignis fn( PortName: string, PortResult: number)
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Amazon._openAmazonPort = function (aOpenEventCallback) {
        // console.log('Amazon._openAmazonPort: start');
        var port = PortManager.find(AMAZON_TYPE_NAME);
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if (!port) {
            port = Amazon.mCurrentPort;
        }
        if (!port) {
            if (Amazon.mErrorOutputFlag) {
                console.log('Amazon._openAmazonPort: kein Port vorhanden');
            }
            Amazon._onOpenEvent(new Error('Amazon._openAmazonPort: Kein Port vorhanden'), AMAZON_TYPE_NAME, -1, aOpenEventCallback);
            return -1;
        }
        // Events verarbeiten
        port.addOpenEvent(AMAZON_TYPE_NAME, function (aEvent) {
            port.removeErrorEvent(AMAZON_TYPE_NAME);
            port.removeOpenEvent(AMAZON_TYPE_NAME);
            // console.log('Amazon._openAmazonPort: openEvent');
            if (typeof aOpenEventCallback === 'function') {
                Amazon._onOpenEvent(null, AMAZON_TYPE_NAME, aEvent.result, aOpenEventCallback);
            }
            return aEvent.result;
        });
        port.addErrorEvent(AMAZON_TYPE_NAME, function (aError) {
            port.removeOpenEvent(AMAZON_TYPE_NAME);
            port.removeErrorEvent(AMAZON_TYPE_NAME);
            // console.log('Amazon._openAmazonPort: errorEvent', aError.message);
            if (typeof aOpenEventCallback === 'function') {
                Amazon._onOpenEvent(aError, AMAZON_TYPE_NAME, -1, aOpenEventCallback);
            }
            return 0;
        });
        // Port oeffnen
        return port.open();
    };
    /**
     * Oeffnet den AmazonPort
     *
     * @static
     * @param {function} aOpenEventCallback - Ereignis-Funktion fuer Port geoeffnet
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Amazon.open = function (aOpenEventCallback) {
        if (!Amazon.mInitFlag) {
            if (Amazon.mErrorOutputFlag) {
                console.log('Amazon.open: Init wurde nicht aufgerufen');
            }
            Amazon._onOpenEvent(new Error('Amazon.open: Init wurde nicht aufgerufen'), AMAZON_TYPE_NAME, -1, aOpenEventCallback);
            return -1;
        }
        // hier wird der Nuance-Port geoeffnet
        var result = Amazon._openAmazonPort(aOpenEventCallback);
        // console.log('Amazon.open: end', result);
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
    Amazon.setConfig = function (aConfigData) {
        if (Amazon.mCurrentPort) {
            return Amazon.mCurrentPort.setConfig(aConfigData);
        }
        return -1;
    };
    /**
     * Gibt die aktuellen Credentials zurueck.
     *
     * @static
     * @return {AmazonConfigDataInterface} Konfigurationsdaten zurueckgeben
     */
    Amazon.getConfig = function () {
        if (Amazon.mCurrentPort) {
            return Amazon.mCurrentPort.getConfig();
        }
        return { amazonRegion: '', amazonIdentityPoolId: '' };
    };
    Amazon.mInitFlag = false;
    Amazon.mErrorOutputFlag = false;
    Amazon.mCurrentPort = null;
    return Amazon;
}());

export { AMAZON_ASRNLU_ACTION, AMAZON_ASR_ACTION, AMAZON_NLU_ACTION, AMAZON_TTS_ACTION, AMAZON_TYPE_NAME, Amazon };
