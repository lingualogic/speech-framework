import { PortManager } from '../../core/port/port-manager.ts';
import { Port } from '../../core/port/port.ts';
import { FileHtml5Reader } from '../../common/html5/file-html5-reader.ts';
import { ErrorBase } from '../../core/error/error-base.ts';
import { NetHtml5Connect } from '../../common/html5/net-html5-connect.ts';

/**
 * Globale Konstanten fuer Rasa
 *
 * Letzte Aenderung: 09.07.2019
 * Status: rot
 *
 * @module cloud/rasa
 * @author SB
 */
// Default-Konstanten
var RASA_TYPE_NAME = 'Rasa';
var RASA_PORT_NAME = 'RasaPort';
var RASA_MOCK_NAME = 'RasaMock';
// Default URL des Rasa-Service
var RASA_SERVER_URL = 'http://localhost:5005';
var RASA_DEFAULT_URL = RASA_SERVER_URL;
// Aktionen
var RASA_NLU_ACTION = 'NLU';
// Konfigurationsdaten
var RASA_CONFIG_PATH = 'assets/';
var RASA_CONFIG_FILE = 'rasa.json';
var RASA_CONFIG_LOAD = false;
// Sprachen
var RASA_DE_LANGUAGE = 'de-DE';
var RASA_DEFAULT_LANGUAGE = RASA_DE_LANGUAGE;

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
 * Speech-Rasa Version und Build Konstanten
 *
 * @module cloud/rasa
 * @author SB
 */
var RASA_VERSION_NUMBER = '0.1.1';
var RASA_VERSION_BUILD = '0002';
var RASA_VERSION_TYPE = 'ALPHA';
var RASA_VERSION_DATE = '22.07.2019';
// tslint:disable-next-line
var RASA_VERSION_STRING = RASA_VERSION_NUMBER + '.' + RASA_VERSION_BUILD + ' vom ' + RASA_VERSION_DATE + ' (' + RASA_VERSION_TYPE + ')';
var RASA_API_VERSION = RASA_VERSION_STRING;

/**
 * Event-Klasse fuer alle Rasa-Transaktionen
 *
 * Letzte Aenderung: 09.07.2019
 * Status: rot
 *
 * @module cloud/rasa
 * @author SB
 */
var RasaTransaction = /** @class */ (function () {
    function RasaTransaction(aPluginName, aType) {
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
        RasaTransaction.mTransactionCounter += 1;
        this.transactionId = RasaTransaction.mTransactionCounter;
    }
    RasaTransaction.mTransactionCounter = 0;
    return RasaTransaction;
}());

/**
 * Rasa Konstanten Verwaltung
 *
 * Letzte Aenderung: 09.07.2019
 * Status: rot
 *
 * @module cloud/rasa
 * @author SB
 */
var RasaConfig = /** @class */ (function (_super) {
    __extends(RasaConfig, _super);
    /**
     * Creates an instance of AmazonConfig.
     */
    function RasaConfig(aFileReader) {
        var _this = _super.call(this, 'RasaConfig') || this;
        _this.mInitFlag = false;
        // Configdatei-Daten
        _this.mConfigPath = RASA_CONFIG_PATH;
        _this.mConfigFile = RASA_CONFIG_FILE;
        _this.mConfigLoadFlag = RASA_CONFIG_LOAD;
        // Nuance-Konfigurationsdaten
        _this.mConfigServerUrl = RASA_DEFAULT_URL;
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
    RasaConfig.prototype._setOption = function (aOption) {
        if (!aOption) {
            return;
        }
        // Parameter eintragen
        if (typeof aOption.rasaConfigPath === 'string') {
            this.mConfigPath = aOption.rasaConfigPath;
        }
        if (typeof aOption.rasaConfigFile === 'string') {
            this.mConfigFile = aOption.rasaConfigFile;
        }
        if (typeof aOption.rasaConfigLoadFlag === 'boolean') {
            this.mConfigLoadFlag = aOption.rasaConfigLoadFlag;
        }
        if (typeof aOption.rasaServerUrl === 'string') {
            this.mConfigServerUrl = aOption.rasaServerUrl;
        }
        if (typeof aOption.rasaAppId === 'string') {
            this.mConfigAppId = aOption.rasaAppId;
        }
        if (typeof aOption.rasaAppKey === 'string') {
            this.mConfigAppKey = aOption.rasaAppKey;
        }
        if (typeof aOption.rasaUserId === 'string') {
            this.mConfigUserId = aOption.rasaUserId;
        }
        if (typeof aOption.rasaNluTag === 'string') {
            this.mConfigNluTag = aOption.rasaNluTag;
        }
        if (typeof aOption.rasaNluTag === 'string') {
            this.mConfigNluTag = aOption.rasaNluTag;
        }
    };
    /**
     * Initialisierung von FileReader
     *
     * @param {RasaOptionInterface} aOptions - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    RasaConfig.prototype.init = function (aOption) {
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
    RasaConfig.prototype.done = function () {
        this.mInitFlag = false;
        this.mConfigPath = RASA_CONFIG_PATH;
        this.mConfigFile = RASA_CONFIG_FILE;
        this.mConfigLoadFlag = RASA_CONFIG_LOAD;
        // Nuance-Konfigurationsdaten
        this.mConfigServerUrl = RASA_DEFAULT_URL;
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
    RasaConfig.prototype.isInit = function () {
        return this.mInitFlag;
    };
    /**
     * Sendet Event fuer fertige Initialisierung
     *
     * @param aResult - Fehlercode 0 oder -1
     */
    RasaConfig.prototype._onInit = function (aResult) {
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
    RasaConfig.prototype._onError = function (aError) {
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
    Object.defineProperty(RasaConfig.prototype, "onInit", {
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
    Object.defineProperty(RasaConfig.prototype, "onError", {
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
    RasaConfig.prototype._readConfigData = function (aFileData) {
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
    RasaConfig.prototype._readError = function (aErrorText) {
        this._error('_readError', aErrorText);
        this._onInit(-1);
    };
    /**
     * asynchrones Einlesen der Konfigurationsdaten
     */
    RasaConfig.prototype.read = function () {
        if (!this.mFileReader) {
            this._error('read', 'kein FileReader vorhanden');
            this._onInit(-1);
            return -1;
        }
        var fileUrl = this.mConfigPath + this.mConfigFile;
        return this.mFileReader.read(fileUrl);
    };
    Object.defineProperty(RasaConfig.prototype, "serverUrl", {
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
    Object.defineProperty(RasaConfig.prototype, "appId", {
        get: function () {
            return this.mConfigAppId;
        },
        set: function (aAppId) {
            this.mConfigAppId = aAppId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RasaConfig.prototype, "appKey", {
        get: function () {
            return this.mConfigAppKey;
        },
        set: function (aAppKey) {
            this.mConfigAppKey = aAppKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RasaConfig.prototype, "userId", {
        get: function () {
            return this.mConfigUserId;
        },
        set: function (aUserId) {
            this.mConfigUserId = aUserId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RasaConfig.prototype, "nluTag", {
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
    RasaConfig.prototype.isCredentials = function () {
        if (this.mConfigAppKey) {
            return true;
        }
        return false;
    };
    return RasaConfig;
}(ErrorBase));

/**
 * Definiert die Network fuer Rasa
 *
 * Letzte Aenderung: 09.07.2019
 * Status: rot
 *
 * @module cloud/rasa/net
 * @author SB
 */
var RasaNetwork = /** @class */ (function (_super) {
    __extends(RasaNetwork, _super);
    function RasaNetwork() {
        return _super.call(this, 'RasaNetwork') || this;
    }
    return RasaNetwork;
}(NetHtml5Connect));

/**
 * Definiert die Verbindung zum Rasa-Service
 *
 * Letzte Aenderung: 10.07.2019
 * Status: rot
 *
 * @module cloud/rasa/net
 * @author SB
 */
/**
 * Dient zur Verbindungsaufnahme mit Cloud Credentials.
 */
var RasaConnect = /** @class */ (function (_super) {
    __extends(RasaConnect, _super);
    /**
     * Erzeugt eine Instanz von Connect
     *
     * @param aConfig - Rasa Config Objekt
     */
    function RasaConnect(aConfig) {
        var _this = _super.call(this, 'RasaConnect') || this;
        // innere Komponenten
        _this.mConfig = null;
        // Verbindung vorhanden
        _this.mConnectFlag = false;
        _this.mConfig = aConfig;
        return _this;
    }
    // Verbindungs-Funktionen
    RasaConnect.prototype.isConnect = function () {
        return this.mConnectFlag;
    };
    /**
     * Verbindungsaufbau mit Rasa-Service.
     */
    RasaConnect.prototype.connect = function () {
        // Initialize the Rasa Cognito credentials provider
        // console.log('RasaConnect: onMessage einbinden');
        if (this.isConnect()) {
            // Verbindung ist bereits aufgebaut
            return 0;
        }
        // pruefen auf Credentials
        this.mConnectFlag = true;
        return 0;
    };
    /**
     * Dient der Entfernung von onMessage aus dem WebSocket.
     */
    RasaConnect.prototype.disconnect = function () {
        this.mConnectFlag = false;
        return 0;
    };
    return RasaConnect;
}(ErrorBase));

/**
 * Rasa Geraeteklasse fuer TTS, ASR und NLU
 *
 * Letzte Aenderung: 10.07.2019
 * Status: rot
 *
 * @module cloud/rasa/device
 * @author SB
 */
/**
 * Basisklasse akller Rasa-Geraete
 */
var RasaDevice = /** @class */ (function (_super) {
    __extends(RasaDevice, _super);
    /**
     * Erzeugt eine Instanz von NuanceDevice
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */
    function RasaDevice(aDeviceName, aConfig, aConnect) {
        var _this = _super.call(this, aDeviceName || 'RasaDevice') || this;
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
    RasaDevice.prototype._onStart = function () {
        // console.log('RasaDevice._onStart');
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
    RasaDevice.prototype._onStop = function () {
        // console.log('RasaDevice._onStop:', this.mTransaction, this.onStop );
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
     * @param aResult- Ergebnis von Rasa
     */
    RasaDevice.prototype._onResult = function (aResult) {
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
    RasaDevice.prototype._onError = function (aError) {
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
    RasaDevice.prototype._onClose = function () {
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
    // TODO: wird in Rasa nicht gebraucht
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
    // TODO: wird in Rasa nicht gebraucht
    /****
    _createOption( aOverrideOption: any): any {
        // console.log( 'NuanceNLU._createOption:', aOverrideOption );
        const option = Object.assign( aOverrideOption, this._getDefaultOption());
        option.appId = aOverrideOption.appId || this.mConfig.appId || '';
        option.appKey = aOverrideOption.appKey || this.mConfig.appKey || '';
        option.userId = aOverrideOption.userId || this.mConfig.userId;
        option.tag = aOverrideOption.tag || this.mConfig.nluTag || '';
        option.language = aOverrideOption.language || RASA_DEFAULT_LANGUAGE;
        option.text = aOverrideOption.text || '';
        option.voice = aOverrideOption.voice || RASA_DEFAULT_VOICE;
        option.codec = aOverrideOption.codec || RASA_DEFAULT_CODEC;
        return option;
    }
    ****/
    // Nachrichten senden
    // TODO: wird in Rasa nicht gebraucht
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
    RasaDevice.prototype._start = function (aOption) {
        // muss von erbenden Klassen ueberschrieben werden
    };
    /**
     * Interne Geraete Stopfunktion
     *
     * @protected
     */
    RasaDevice.prototype._stop = function () {
        // muss von erbenden Klassen ueberschrieben werden
    };
    /**
     * Geraeteaktion starten
     *
     * @param {RasaTransaction} aTransaction - auszufuehrende Transaktion
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    RasaDevice.prototype.start = function (aTransaction, aOption) {
        // console.log('RasaDevice.start:', aTransaction, aOption);
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
     * @param {RasaTransaction} aTransaction - auszufuehrende Transaktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    RasaDevice.prototype.stop = function (aTransaction) {
        // console.log('RasaDevice.stop:', aTransaction);
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
    RasaDevice.prototype.isTransaction = function () {
        if (this.mTransaction) {
            return true;
        }
        return false;
    };
    /**
     * Transaktion zurueckgeben
     */
    RasaDevice.prototype.getTransaction = function () {
        return this.mTransaction;
    };
    /**
     * Transaktion loeschen
     */
    RasaDevice.prototype.clearTransaction = function () {
        this.mTransaction = null;
    };
    return RasaDevice;
}(ErrorBase));

/**
 * NLU Anbindung an den Rasa-Service, hier wird nur ein Text in einen Intent umgewandelt
 *
 * Letzte Aenderung: 10.07.2019
 * Status: rot
 *
 * @module cloud/rasa/device
 * @author SB
 */
var RasaNLU = /** @class */ (function (_super) {
    __extends(RasaNLU, _super);
    /**
     * Erzeugt eine Instanz von NuanceNLU
     *
     * @param aConfig - Konfigurationsobjekt fuer Nuance-Konfigurationsdaten
     * @param aConnect - Verbindungsobjekt zu Nuance-Server
     */
    function RasaNLU(aConfig, aConnect) {
        return _super.call(this, 'RasaNLU', aConfig, aConnect) || this;
    }
    // NLU-Funktionen
    /**
     * Senden eines Http-Request an die TTS fuer die Audiosynthese
     *
     * @private
     * @param aText - Text fuer die NLU
     */
    RasaNLU.prototype._sendToNLU = function (aText) {
        var _this = this;
        console.log('_sendToNLU:', aText);
        try {
            var baseUrl = this.mConfig.serverUrl + '/model/parse?token=' + this.mConfig.appKey;
            console.log('_sendToNLU.url:', baseUrl);
            var xmlHttpRequest_1 = new XMLHttpRequest();
            xmlHttpRequest_1.open('POST', baseUrl);
            // xmlHttpRequest.setRequestHeader( 'Authorization', 'Bearer ' + aAccessToken );
            // xmlHttpRequest.setRequestHeader( 'Access-Control-Allow-Origin', '*' );
            xmlHttpRequest_1.setRequestHeader('Accept', '*/*');
            xmlHttpRequest_1.setRequestHeader('cache-control', 'no-cache');
            xmlHttpRequest_1.setRequestHeader('Content-Type', 'text/plain');
            // xmlHttpRequest.responseType = 'application/json';
            // Audiodaten empfangen
            xmlHttpRequest_1.onload = function () {
                // Json-Daten als Ergebnis vom NLU-Server
                console.log('Response:', xmlHttpRequest_1.response);
                try {
                    _this._onResult(JSON.parse(xmlHttpRequest_1.response));
                }
                catch (aException) {
                    _this._exception('_sendToNLU', aException);
                }
                _this._onStop();
            };
            // Fehlerbehandlung
            xmlHttpRequest_1.onerror = function (aError) {
                console.log('_sendToNLU.error:', xmlHttpRequest_1);
                _this._error('_sendToNLU', 'Fehler aufgetreten');
                _this._onStop();
            };
            // Text als Json an NLU senden
            var jsonText = "{ \"text\": \"" + aText + "\" }";
            // console.log('_sendToNLU.jsonText:', jsonText);
            xmlHttpRequest_1.send(jsonText);
            return 0;
        }
        catch (aException) {
            this._exception('_sendToNLU', aException);
            return -1;
        }
    };
    /**
     * started die NLU
     *
     * @param options - Parameter fuer die NLU
     */
    RasaNLU.prototype._start = function (aOptions) {
        console.log('RasaNLU._startNLU:', aOptions);
        try {
            if (!this.mConfig.appKey) {
                this._error('_start', 'kein AppKey vorhanden');
                return;
            }
            // Rasa aufrufen
            this._sendToNLU(aOptions.text);
        }
        catch (aException) {
            this._exception('_start', aException);
        }
    };
    RasaNLU.prototype._stop = function () {
        console.log('RasaNLU._stop');
    };
    return RasaNLU;
}(RasaDevice));

/**
 * RasaPort zur Verbindung des Rasa Cloud-Service mit dem Framework
 * Stellt Grundfunktionen von Rasa zur Verfuegung. Werden von mehreren anderen
 * Komponenten geteilt.
 *
 * Letzte Aenderung: 22.07.2019
 * Status: rot
 *
 * @module cloud/rasa
 * @author SB
 */
// Konstanten
// Default Timeout fuer die Dauer einer Action, maximal eine Minute darf die Verarbeitung einer Action dauern,
// danach wird Stop erzwungen.
var RASA_ACTION_TIMEOUT = 60000;
/**
 * Definiert die RasaPort-Klasse
 */
var RasaPort = /** @class */ (function (_super) {
    __extends(RasaPort, _super);
    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */
    function RasaPort(aPortName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var _this = _super.call(this, aPortName || RASA_PORT_NAME, aRegisterFlag) || this;
        // externes Rasa-Objekt
        _this.mRasaServerFlag = false;
        _this.mRasaConfig = null;
        _this.mRasaNetwork = null;
        _this.mRasaConnect = null;
        _this.mRasaNLU = null;
        // weitere Attribute
        _this.mDynamicCredentialsFlag = false;
        _this.mTransaction = null;
        _this.mRunningFlag = false;
        _this.mDefaultOptions = null;
        _this.mActionTimeoutId = 0;
        _this.mActionTimeout = RASA_ACTION_TIMEOUT;
        return _this;
    }
    // Port-Funktionen
    /**
     * pruefen auf Server-Verbindung
     *
     * @return {boolean} true, Port hat Server-Verbindung, false sonst
     */
    RasaPort.prototype.isServer = function () {
        return this.mRasaServerFlag;
    };
    /**
     * pruefen auf Mock-Port zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Port ein Mock zum Testen ist
     */
    RasaPort.prototype.isMock = function () {
        return false;
    };
    /**
     * Rueckgabe eines logischen Port-Typs
     *
     * @return {string} logischer Typ des Ports fuer unterschiedliche Anwendungsschnittstellen
     */
    RasaPort.prototype.getType = function () {
        return RASA_TYPE_NAME;
    };
    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */
    RasaPort.prototype.getClass = function () {
        return 'RasaPort';
    };
    RasaPort.prototype.getVersion = function () {
        return RASA_API_VERSION;
    };
    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */
    RasaPort.prototype._checkCredentials = function (aOption) {
        // console.log('RasaPort._checkCredentials: ', aOption);
        if (!aOption) {
            return false;
        }
        // App-Parameter pruefen
        // TODO: jetzt erst mal nur ACCESS-TOKEN (AppKey) von Dialogflow V1 bis Oktober 2019
        if (typeof aOption.rasaAppKey !== 'string') {
            return false;
        }
        if (!aOption.rasaAppKey) {
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
    RasaPort.prototype._initAllObject = function (aOption) {
        // console.log('RasaPort._initAllObject:', aOption);
        // innere Komponenten eintragen
        var _this = this;
        var fileReader = new FileHtml5Reader();
        fileReader.init();
        /* wird erst fuer ASR benoetigt
        const audioReader = new AudioHtml5Reader();
        audioReader.init({ audioContext: this.mAudioContext });
        */
        this.mRasaConfig = new RasaConfig(fileReader);
        if (this.mRasaConfig.init(aOption) !== 0) {
            return -1;
        }
        // Network-Anbindung erzeugen
        this.mRasaNetwork = new RasaNetwork();
        this.mRasaNetwork.onOnline = function () { return _this._onOnline(); };
        this.mRasaNetwork.onOffline = function () { return _this._onOffline(); };
        this.mRasaNetwork.onError = function (aError) { return _this._onError(aError); };
        if (this.mRasaNetwork.init(aOption) !== 0) {
            return -1;
        }
        this.mRasaConnect = new RasaConnect(this.mRasaConfig);
        // Rasa-Komponenten erzeugen
        this.mRasaNLU = new RasaNLU(this.mRasaConfig, this.mRasaConnect);
        this.mRasaNLU.onStart = function (aTransaction) { return _this._onStart(aTransaction.plugin, aTransaction.type); };
        this.mRasaNLU.onStop = function (aTransaction) { return _this._onStop(aTransaction.plugin, aTransaction.type); };
        this.mRasaNLU.onResult = function (aTransaction) { return _this._onResult(aTransaction.result, aTransaction.plugin, aTransaction.type); };
        this.mRasaNLU.onError = function (aTransaction) { return _this._onError(aTransaction.error, aTransaction.plugin, aTransaction.type); };
        this.mRasaNLU.onClose = function (aTransaction) { return _this._onClose(); };
        return 0;
    };
    /**
     * initialisert den Port
     *
     * Folgende Parameter muessen uebergeben werden, da sonst der Port nicht initalisiert wird:
     *
     *      rasaAppId     - Rasa Credentials fuer APP_ID
     *      rasaAppKey    - Rasa Credentials fuer APP_KEY
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
    RasaPort.prototype.init = function (aOption) {
        // console.log('RasaPort.init:', aOption);
        if (this.mInitFlag) {
            this._error('init', 'Port ist bereits initialisiert');
            return 0;
        }
        // pruefen auf dynamische Credentials
        if (aOption && typeof aOption.rasaDynamicCredentialsFlag === 'boolean' && aOption.rasaDynamicCredentialsFlag) {
            // dynamische Credentials koennen gesetzt werden
            this.mDynamicCredentialsFlag = true;
        }
        else {
            // pruefen auf Rasa App-Credientials Uebergabe
            if (!this._checkCredentials(aOption)) {
                this._error('init', 'kein AppKey als Parameter uebergeben');
                return -1;
            }
        }
        // pruefen auf Server-Flag
        if (aOption && typeof aOption.rasaServerFlag === 'boolean' && aOption.rasaServerFlag) {
            this.mRasaServerFlag = true;
        }
        // innere Objekte erzeugen
        if (this._initAllObject(aOption) !== 0) {
            return -1;
        }
        // Initialisierung von Port
        if (_super.prototype.init.call(this, aOption) !== 0) {
            return -1;
        }
        // Debug-Ausgabe fuer Rasa-Komponenten
        if (this.isErrorOutput()) {
            if (this.mRasaNLU) {
                console.log('RasaPort: NLU ist vorhanden');
            }
            else {
                console.log('RasaPort: NLU ist nicht vorhanden');
            }
        }
        return 0;
    };
    /**
     * gibt den Port frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    RasaPort.prototype.done = function () {
        _super.prototype.done.call(this);
        // Timeout loeschen 
        this._clearActionTimeout();
        // externes Rasa-Objekt
        if (this.mRasaConnect) {
            this.mRasaConnect.disconnect();
            this.mRasaConnect = null;
        }
        if (this.mRasaNetwork) {
            this.mRasaNetwork.done();
            this.mRasaNetwork = null;
        }
        if (this.mRasaConfig) {
            this.mRasaConfig.done();
            this.mRasaConfig = null;
        }
        this.mRasaNLU = null;
        this.mRasaServerFlag = false;
        // weitere Attribute
        this.mDynamicCredentialsFlag = false;
        this.mTransaction = null;
        this.mRunningFlag = false;
        this.mDefaultOptions = null;
        this.mActionTimeoutId = 0;
        this.mActionTimeout = RASA_ACTION_TIMEOUT;
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
    RasaPort.prototype.reset = function (aOption) {
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
    RasaPort.prototype._setErrorOutput = function (aErrorOutputFlag) {
        _super.prototype._setErrorOutput.call(this, aErrorOutputFlag);
        if (this.mRasaConfig) {
            this.mRasaConfig._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mRasaNetwork) {
            this.mRasaNetwork._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mRasaConnect) {
            this.mRasaConnect._setErrorOutput(aErrorOutputFlag);
        }
        if (this.mRasaNLU) {
            this.mRasaNLU._setErrorOutput(aErrorOutputFlag);
        }
    };
    // Timeout-Funktionen
    /**
     * Aktion wird abgebrochen
     */
    RasaPort.prototype._breakAction = function () {
        // console.log('RasaPort._beakAction');
        this.mActionTimeoutId = 0;
        if (this.mTransaction) {
            this._error('_breakAction', 'Timeout fuer Action erreicht');
            this._onStop(this.mTransaction.plugin, this.mTransaction.type);
        }
    };
    /**
     * Timeout fuer Aktion setzen. Timeout wird nur gesetzt, wenn > 0
     */
    RasaPort.prototype._setActionTimeout = function () {
        var _this = this;
        // console.log('RasaPort._setActionTimeout');
        if (this.mActionTimeoutId === 0 && this.mActionTimeout > 0) {
            this.mActionTimeoutId = window.setTimeout(function () { return _this._breakAction(); }, this.mActionTimeout);
        }
    };
    /**
     * Timeout fuer Aktion loeschen
     */
    RasaPort.prototype._clearActionTimeout = function () {
        // console.log('RasaPort._clearActionTimeout');
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
    RasaPort.prototype._onOnline = function () {
        // console.log('RasaPort._onOnline');
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
    RasaPort.prototype._onOffline = function () {
        // console.log('RasaPort._onOffline');
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
    RasaPort.prototype._onStop = function (aDest, aType) {
        // console.log('RasaPort._onStop: Transaktion wird beendet', aDest, aType);
        // hier muss der Timeout geloescht werden, da die Transaktion zu Ende ist
        this._clearActionTimeout();
        // hier muss die Transaktion geloescht werden, da sie beendet ist
        this.mTransaction = null;
        this.mRunningFlag = false;
        // Hier wird die Verbindung zu onMessage der WebSocket geloescht
        if (this.mRasaConnect) {
            this.mRasaConnect.disconnect();
        }
        return _super.prototype._onStop.call(this, aDest, aType);
    };
    // Port-Funktionen
    /**
     * Dynamische Konfiguration des Ports
     *
     * @param {RasaConfigDataInterface} aConfigData - Konfigurationsdaten { rasaAppKey: '', rasaAppId: '', rasaNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */
    RasaPort.prototype.setConfig = function (aConfigData) {
        if (this.mDynamicCredentialsFlag) {
            // Uebertragen der neuen Credentials
            try {
                if (typeof aConfigData.rasaServerUrl === 'string' && aConfigData.rasaServerUrl) {
                    this.mRasaConfig.serverUrl = aConfigData.rasaServerUrl;
                }
                /****
                if ( typeof aConfigData.rasaAppId === 'string' && aConfigData.rasaAppId ) {
                    this.mRasaConfig.appId = aConfigData.rasaAppId;
                }
                ****/
                if (typeof aConfigData.rasaAppKey === 'string' && aConfigData.rasaAppKey) {
                    this.mRasaConfig.appKey = aConfigData.rasaAppKey;
                }
                /****
                if ( typeof aConfigData.rasaNluTag === 'string' && aConfigData.rasaNluTag ) {
                    this.mRasaConfig.nluTag = aConfigData.rasaNluTag;
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
     * @return {RasaConfigDataInterface} aktuelle Portkonfigurationsdaten
     */
    RasaPort.prototype.getConfig = function () {
        var configData = {
            rasaServerUrl: this.mRasaConfig.serverUrl,
            // rasaAppId: this.mRasaConfig.appId,
            rasaAppKey: this.mRasaConfig.appKey,
        };
        return configData;
    };
    /**
     * Pruefen auf Netzwerk-Verbindung
     *
     * @return {boolean} True, wenn Netwerk verbunden ist, ansonsten false
     */
    RasaPort.prototype.isOnline = function () {
        if (this.mRasaNetwork) {
            return this.mRasaNetwork.isOnline();
        }
        return false;
    };
    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */
    RasaPort.prototype.isOpen = function () {
        if (this.mRasaConnect) {
            // console.log('RasaPort.isOpen:', this.mRasaConnect.isConnect());
            return this.mRasaConnect.isConnect();
        }
        return false;
    };
    /**
     * Pruefen und Oeffnen der WebSocket, wenn moeglich
     *
     * @private
     * @param aOpenCallbackFunc - Callback fuer WebSocket geoeffnet oder nicht
     */
    RasaPort.prototype._checkOpen = function (aOpenCallbackFunc) {
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
     * Port oeffnen und mit Server verbinden
     *
     * @param {*} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    RasaPort.prototype.open = function (aOption) {
        // console.log('RasaPort.open');
        if (!this.mRasaConnect) {
            this._error('open', 'kein RasaConnect vorhanden');
            return -1;
        }
        if (this.isOpen()) {
            return 0;
        }
        var result = this.mRasaConnect.connect();
        if (result === 0) {
            this._onOpen();
        }
        return result;
    };
    /**
     * Port schliessen und Server-Verbindung trennen
     *
     * @return {number} Fehlercode 0 oder -1
     */
    RasaPort.prototype.close = function () {
        if (!this.isOpen()) {
            return 0;
        }
        // console.log('RasaPort.close');
        if (this.mRasaConnect) {
            this._onClose();
            return this.mRasaConnect.disconnect();
        }
        return 0;
    };
    /**
     * Rueckgabe des Pluginnamens, der gerade eine Transaktion ausfuehrt
     *
     * @return {string} PluginName oder leerer String
     */
    RasaPort.prototype.getPluginName = function () {
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
    RasaPort.prototype.getActionName = function () {
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
    RasaPort.prototype.isRunning = function (aPluginName, aAction) {
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
     * Pruefen, welche Rasa-Aktionen ausfuehrbar sind.
     *
     * @param {string} aAction - Name der zu pruefenden Aktion
     *
     * @return {boolean} True, wenn Aktion ausfuehrbar ist, False sonst
     */
    RasaPort.prototype.isAction = function (aAction) {
        var result = false;
        switch (aAction) {
            case RASA_NLU_ACTION:
                result = this.mRasaNLU ? true : false;
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
    RasaPort.prototype.setActionTimeout = function (aTimeout) {
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
    RasaPort.prototype.start = function (aPluginName, aAction, aOption) {
        var _this = this;
        // console.log('RasaPort.stop:', aPluginName, aAction, aOption);
        // pruefen, ob eine Aktion bereits laeuft
        if (this.isRunning()) {
            this._error('start', 'Aktion laeuft bereits');
            return -1;
        }
        // pruefen auf Credentials
        if (!this.mRasaConfig.isCredentials()) {
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
                case RASA_NLU_ACTION:
                    _this.mTransaction = new RasaTransaction(aPluginName, RASA_NLU_ACTION);
                    result = _this._startNLU(_this.mTransaction, option.text, option.language || RASA_DEFAULT_LANGUAGE);
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
    RasaPort.prototype.stop = function (aPluginName, aAction, aOption) {
        // console.log('RasaPort.stop:', aPluginName, aAction, aOption, this.mTransaction);
        // pruefen, ob eine Aktion bereits laeuft
        if (!this.isRunning()) {
            // console.log('RasaPort.stop: kein isRunning');
            return 0;
        }
        // pruefen, ob der Port geoeffnet ist
        if (!this.isOpen()) {
            this._error('stop', 'Port ist nicht geoeffnet');
            return -1;
        }
        // pruefen auf Credentials
        if (!this.mRasaConfig.isCredentials()) {
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
        // console.log('RasaPort.stop: Action = ', aAction);
        switch (aAction) {
            case RASA_NLU_ACTION:
                result = this._stopNLU(this.mTransaction);
                break;
            default:
                this._error('stop', 'Keine gueltige Aktion uebergeben ' + aAction);
                result = -1;
                break;
        }
        this.mRunningFlag = false;
        return result;
    };
    // NLU-Funktionen
    /**
     * Intent zu einem Text holen
     *
     * @private
     * @param {RasaTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - Text der interpretiert werden soll
     * @param {string} aLanguage - Sprache des Textes der interpretiert werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */
    RasaPort.prototype._startNLU = function (aTransaction, aText, aLanguage) {
        if (!aText) {
            this._error('_startNLU', 'keinen Text uebergeben');
            return -1;
        }
        if (!aLanguage) {
            this._error('_startNLU', 'keine Sprache uebergeben');
            return -1;
        }
        if (!this.mRasaNLU) {
            this._error('_startNLU', 'keine Rasa NLU-Anbindung vorhanden');
            return -1;
        }
        try {
            var option = {
                text: aText,
                language: aLanguage
            };
            return this.mRasaNLU.start(aTransaction, option);
        }
        catch (aException) {
            this._exception('_startNLU', aException);
            return -1;
        }
        return -1;
    };
    /**
     * stoppt die Analyse
     *
     * @private
     * @param {RasaTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    RasaPort.prototype._stopNLU = function (aTransaction) {
        if (!this.mRasaNLU) {
            this._error('_stopNLU', 'keine Rasa NLU-Anbindung vorhanden');
            return -1;
        }
        try {
            return this.mRasaNLU.stop(aTransaction);
        }
        catch (aException) {
            this._exception('_stopNLU', aException);
            return -1;
        }
        return -1;
    };
    return RasaPort;
}(Port));

/**
 * RasaMock zum Testen des Rasa Cloud-Service mit dem Framework
 *
 * Letzte Aenderung: 10.07.2019
 * Status: rot
 *
 * @module cloud/rasa
 * @author SB
 */
/**
 * Definiert die RasaMock-Klasse
 */
var RasaMock = /** @class */ (function (_super) {
    __extends(RasaMock, _super);
    /**
     * Erzeugt eine Instanz von Port.
     *
     * @param {string} aPortName - Name des Ports
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */
    function RasaMock(aPortName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var _this = _super.call(this, aPortName || RASA_MOCK_NAME, aRegisterFlag) || this;
        _this.rasaNLUFlag = true;
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
        _this.rasaAppId = '';
        _this.rasaAppKey = '';
        _this.rasaNluTag = '';
        return _this;
    }
    // Port-Funktionen
    /**
     * pruefen auf Mock-Port zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Port ein Mock zum Testen ist
     */
    RasaMock.prototype.isMock = function () {
        return true;
    };
    /**
     * Rueckgabe eines logischen Port-Typs
     *
     * @return {string} logischer Typ des Ports fuer unterschiedliche Anwendungsschnittstellen
     */
    RasaMock.prototype.getType = function () {
        return RASA_TYPE_NAME;
    };
    /**
     * Rueckgabe der Port-Klasse
     *
     * @return {string} konkrete Klasse des Ports
     */
    RasaMock.prototype.getClass = function () {
        return 'RasaMock';
    };
    /**
     * Optionen eintragen
     * @param aOption - optionale Parameter
     */
    RasaMock.prototype._checkCredentials = function (aOption) {
        if (!aOption) {
            return false;
        }
        if (typeof aOption.rasaAppKey === 'string') {
            this.rasaAppKey = aOption.rasaAppKey;
        }
        // App-Parameter pruefen
        // TODO: jetzt erst mal nur ACCESS-TOKEN (AppKey) von Dialogflow V1 bis Oktober 2019
        if (typeof aOption.rasaAppKey !== 'string') {
            return false;
        }
        if (!aOption.rasaAppKey) {
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
    RasaMock.prototype.init = function (aOption) {
        // console.log('NuanceMock: init start', aOption);
        if (this.mInitFlag) {
            this._error('init', 'Init bereits aufgerufen');
            return 0;
        }
        // pruefen auf dynamische Credentials
        if (aOption && typeof aOption.rasaDynamicCredentialsFlag === 'boolean' && aOption.rasaDynamicCredentialsFlag) {
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
        this.rasaNLUFlag = true;
        if (this.isErrorOutput()) {
            if (this.rasaNLUFlag) {
                console.log('RasaMock: NLU ist vorhanden');
            }
            else {
                console.log('RasaMock: NLU ist nicht vorhanden');
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
    RasaMock.prototype.done = function (aFreeFlag) {
        _super.prototype.done.call(this);
        this.rasaNLUFlag = false;
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
    RasaMock.prototype.reset = function (aOption) {
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
    RasaMock.prototype._onStop = function (aDest, aType) {
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
     * @param {RasaConfigDataInterface} aConfigData - Konfigurationsdaten { nuanceAppKey: '', nuanceAppId: '', nuanceNluTag: ''}
     *
     * @return {number} Fehlercode 0 oder -1
     */
    RasaMock.prototype.setConfig = function (aConfigData) {
        if (this.mDynamicCredentialsFlag) {
            // Uebertragen der neuen Credentials
            try {
                // this.rasaAppId = aConfigData.rasaAppId;
                this.rasaAppKey = aConfigData.rasaAppKey;
                /****
                if ( typeof aConfigData.rasaNluTag === 'string' ) {
                    this.rasaNluTag = aConfigData.rasaNluTag;
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
     * @return {RasaConfigDataInterface} aktuelle Portkonfigurationsdaten
     */
    RasaMock.prototype.getConfig = function () {
        var configData = {
            // rasaAppId: this.rasaAppId,
            rasaAppKey: this.rasaAppKey,
        };
        return configData;
    };
    /**
     * Pruefen auf geoeffneten Port
     *
     * @return {boolean} True, wenn Port offen ist, False sonst
     */
    RasaMock.prototype.isOpen = function () {
        return !this.disconnectFlag;
    };
    /**
     * Port oeffnen
     *
     * @param {*} aOption - optionale Parameter
     * @return {number} Fehlercode 0 oder -1
     */
    RasaMock.prototype.open = function (aOption) {
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
    RasaMock.prototype.close = function () {
        this.disconnectFlag = true;
        return 0;
    };
    /**
     * Pruefen auf beschaeftigten Port.
     *
     * @return {boolean} True, Port ist beschaeftigt, False sonst
     */
    RasaMock.prototype.isRunning = function () {
        return this.mRunningFlag;
    };
    RasaMock.prototype._isCredentials = function () {
        if (this.rasaAppKey) {
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
    RasaMock.prototype.isAction = function (aAction) {
        var result = false;
        switch (aAction) {
            case RASA_NLU_ACTION:
                result = this.rasaNLUFlag;
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
    RasaMock.prototype.start = function (aPluginName, aAction, aOption) {
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
            case RASA_NLU_ACTION:
                this.mTransaction = new RasaTransaction(aPluginName, RASA_NLU_ACTION);
                result = this._startNLU(this.mTransaction, option.text, option.language || RASA_DEFAULT_LANGUAGE);
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
    RasaMock.prototype.stop = function (aPluginName, aAction, aOption) {
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
            case RASA_NLU_ACTION:
                result = this._stopNLU(this.mTransaction);
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
    // NLU-Funktionen
    /**
     * Intent zu einem Text holen
     *
     * @private
     * @param {RasaTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     * @param {string} aText - Text der interpretiert werden soll
     * @param {string} aLanguage - Sprache des Textes der interpretiert werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */
    RasaMock.prototype._startNLU = function (aTransaction, aText, aLanguage) {
        if (!aText) {
            this._error('_startNLU', 'keinen Text uebergeben');
            return -1;
        }
        if (!this.rasaNLUFlag) {
            this._error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden');
            return -1;
        }
        try {
            // Nachrichten senden
            this._onStart(aTransaction.plugin, aTransaction.type);
            var event_1 = {
                intent: {
                    name: this.intentName,
                    confidence: this.intentConfidence
                },
                text: aText
            };
            aTransaction.result = event_1;
            console.log('RasaMock._startNLU: _onResult wird aufgerufen');
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
     * @param {RasaTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
     *
     * @return {number} Fehlercode 0 oder -1
     */
    RasaMock.prototype._stopNLU = function (aTransaction) {
        this._onStop(aTransaction.plugin, aTransaction.type);
        // kein Stop der NLU notwendig
        return 0;
    };
    return RasaMock;
}(Port));

/**
 * Rasa-Manager zur Verwaltung des RasaPort
 *
 * Hier wird die Manager-Schnittstelle von Rasa definiert, um Rasa zu
 * initialisieren und als Port zu oeffnen.
 *
 * API-Version: 1.0
 * Datum:       09.07.2019
 *
 * Letzte Aenderung: 10.07.2019
 * Status: rot
 *
 * @module cloud/rasa
 * @author SB
 */
/**
 * statische Rasa-Klasse zur Erzeugung des RasaPorts
 */
var Rasa = /** @class */ (function () {
    // statische Klasse, keine Instanz erzeugbar !
    function Rasa() {
    }
    // Fehler-Funktionen
    Rasa.setErrorOutputOn = function () {
        Rasa.mErrorOutputFlag = true;
        PortManager.setErrorOutputOn();
    };
    Rasa.setErrorOutputOff = function () {
        Rasa.mErrorOutputFlag = false;
        PortManager.setErrorOutputOff();
    };
    Rasa.setErrorOutputFunc = function (aErrorFunc) {
        PortManager._setErrorOutputFunc(aErrorFunc);
    };
    /**
     * Initialisiert den RasaPort.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    Rasa._initRasaPort = function (aRasaOption) {
        // console.log('Rasa._initRasaPort:', aRasaOption);
        var port = PortManager.get(RASA_TYPE_NAME, RasaPort);
        if (!port) {
            return -1;
        }
        if (port.init(aRasaOption) !== 0) {
            PortManager.remove(RASA_TYPE_NAME);
            return -1;
        }
        Rasa.mCurrentPort = port;
        return 0;
    };
    /**
     * Initialisiert den RasaMock.
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    Rasa._initRasaMock = function (aRasaOption) {
        // console.log('Rasa._initRasaMock:', aRasaOption);
        var port = PortManager.get(RASA_TYPE_NAME, RasaMock);
        if (!port) {
            console.log('Rasa._initRasaMock: Error RasaMock wurde nicht erzeugt');
            return -1;
        }
        if (port.init(aRasaOption) !== 0) {
            console.log('Rasa._initRasaMock: Error RasaMock wurde nicht initialisiert');
            PortManager.remove(RASA_TYPE_NAME);
            return -1;
        }
        Rasa.mCurrentPort = port;
        return 0;
    };
    /**
     * Initialisiert den RasaPorts
     *
     * @static
     * @param {RasaOptionInterface} aOption - Rasa-Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Rasa.init = function (aOption) {
        // console.log('Rasa.init:', aOption);
        if (Rasa.mInitFlag) {
            return 0;
        }
        // pruefen auf Optionen
        if (!aOption) {
            if (Rasa.mErrorOutputFlag) {
                console.log('Rasa.init: Keine Rasa-Parameter uebergeben');
            }
            return -1;
        }
        // pruefen auf ErrorOutputFlag
        if (typeof aOption.errorOutputFlag === 'boolean') {
            if (aOption.errorOutputFlag) {
                Rasa.setErrorOutputOn();
            }
            else {
                Rasa.setErrorOutputOff();
            }
        }
        // hier wird der zu erzeugende Portname selectiert
        var portName = 'RasaPort';
        if (aOption && typeof aOption.rasaPortName === 'string') {
            if (aOption.rasaPortName === 'RasaMock') {
                portName = 'RasaMock';
            }
        }
        // hier wird der Rasa-Port initialisiert
        // console.log('Rasa.init: PortName = ', portName);
        if (portName === 'RasaPort') {
            if (Rasa._initRasaPort(aOption) !== 0) {
                return -1;
            }
        }
        else if (portName === 'RasaMock') {
            if (Rasa._initRasaMock(aOption) !== 0) {
                return -1;
            }
        }
        else {
            if (Rasa.mErrorOutputFlag) {
                console.log('Rasa.init: Kein Rasa PortName vorhanden');
            }
            return -1;
        }
        // console.log('Rasa.init: end', result);
        Rasa.mInitFlag = true;
        return 0;
    };
    Rasa.isInit = function () {
        return Rasa.mInitFlag;
    };
    /**
     * Freigabe des RasaPorts
     *
     * @static
     * @return {number} Fehlercode 0 oder -1
     */
    Rasa.done = function () {
        var port = PortManager.find(RASA_TYPE_NAME);
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if (!port) {
            port = Rasa.mCurrentPort;
        }
        var result = 0;
        if (port) {
            result = port.done();
            PortManager.remove(RASA_TYPE_NAME);
        }
        Rasa.mCurrentPort = null;
        Rasa.mInitFlag = false;
        return result;
    };
    // Port-Funktionen
    Rasa._onOpenEvent = function (aError, aPortName, aPortResult, aOpenEventCallback) {
        if (typeof aOpenEventCallback === 'function') {
            try {
                // console.log('Rasa._onOpenEvent:', aPortName, aPortResult);
                aOpenEventCallback(aError, aPortName, aPortResult);
                return 0;
            }
            catch (aException) {
                if (Rasa.mErrorOutputFlag) {
                    console.log('Rasa._onOpenEvent: Exception', aException.message);
                }
                return -1;
            }
        }
        return 0;
    };
    /**
     * Oeffnet den RasaPort
     *
     * @param {function} aOpenEventCallback - Funktion fuer OpenEvent-Ereignis fn( PortName: string, PortResult: number)
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Rasa._openRasaPort = function (aOpenEventCallback) {
        // console.log('Rasa._openRasaPort: start');
        var port = PortManager.find(RASA_TYPE_NAME);
        // TODO: Workaround eines Bugs in PortList nur unter Windows!
        if (!port) {
            port = Rasa.mCurrentPort;
        }
        if (!port) {
            if (Rasa.mErrorOutputFlag) {
                console.log('Rasa._openRasaPort: kein Port vorhanden');
            }
            Rasa._onOpenEvent(new Error('Rasa._openRasaPort: Kein Port vorhanden'), RASA_TYPE_NAME, -1, aOpenEventCallback);
            return -1;
        }
        // Events verarbeiten
        port.addOpenEvent(RASA_TYPE_NAME, function (aEvent) {
            port.removeErrorEvent(RASA_TYPE_NAME);
            port.removeOpenEvent(RASA_TYPE_NAME);
            // console.log('Rasa._openRasaPort: openEvent');
            if (typeof aOpenEventCallback === 'function') {
                Rasa._onOpenEvent(null, RASA_TYPE_NAME, aEvent.result, aOpenEventCallback);
            }
            return aEvent.result;
        });
        port.addErrorEvent(RASA_TYPE_NAME, function (aError) {
            port.removeOpenEvent(RASA_TYPE_NAME);
            port.removeErrorEvent(RASA_TYPE_NAME);
            // console.log('Rasa._openRasaPort: errorEvent', aError.message);
            if (typeof aOpenEventCallback === 'function') {
                Rasa._onOpenEvent(aError, RASA_TYPE_NAME, -1, aOpenEventCallback);
            }
            return 0;
        });
        // Port oeffnen
        return port.open();
    };
    /**
     * Oeffnet den RasaPort
     *
     * @static
     * @param {function} aOpenEventCallback - Ereignis-Funktion fuer Port geoeffnet
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Rasa.open = function (aOpenEventCallback) {
        if (!Rasa.mInitFlag) {
            if (Rasa.mErrorOutputFlag) {
                console.log('Rasa.open: Init wurde nicht aufgerufen');
            }
            Rasa._onOpenEvent(new Error('Rasa.open: Init wurde nicht aufgerufen'), RASA_TYPE_NAME, -1, aOpenEventCallback);
            return -1;
        }
        // hier wird der Nuance-Port geoeffnet
        var result = Rasa._openRasaPort(aOpenEventCallback);
        // console.log('Rasa.open: end', result);
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
    Rasa.setConfig = function (aConfigData) {
        if (Rasa.mCurrentPort) {
            return Rasa.mCurrentPort.setConfig(aConfigData);
        }
        return -1;
    };
    /**
     * Gibt die aktuellen Credentials zurueck.
     *
     * @static
     * @return {RasaConfigDataInterface} Konfigurationsdaten zurueckgeben
     */
    Rasa.getConfig = function () {
        if (Rasa.mCurrentPort) {
            return Rasa.mCurrentPort.getConfig();
        }
        return { rasaAppKey: '' };
    };
    Rasa.mInitFlag = false;
    Rasa.mErrorOutputFlag = false;
    Rasa.mCurrentPort = null;
    return Rasa;
}());

export { RASA_NLU_ACTION, RASA_TYPE_NAME, Rasa };
