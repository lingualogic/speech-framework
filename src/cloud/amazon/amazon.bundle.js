import { ErrorBase } from '../../core/error/error-base.ts';
import { FactoryManager } from '../../core/factory/factory-manager.ts';
import { Factory } from '../../core/factory/factory.ts';
import { PortManager } from '../../core/port/port-manager.ts';
import { Port } from '../../core/port/port.ts';
import { FileHtml5Reader } from '../../common/html5/file-html5-reader.ts';
import { AudioHtml5Reader } from '../../common/html5/audio-html5-reader.ts';
import { NetHtml5Connect } from '../../common/html5/net-html5-connect.ts';
import '../../common/html5/net-html5-websocket.ts';
import { AUDIOCONTEXT_FACTORY_NAME, AudioContextFactory } from '../../common/html5/audiocontext-factory.ts';
import { USERMEDIA_FACTORY_NAME, UserMediaFactory } from '../../common/html5/usermedia-factory.ts';

/** @packageDocumentation
 * Speech-Amazon Version und Build Konstanten
 *
 * @module cloud/amazon
 * @author SB
 */
var AMAZON_VERSION_NUMBER = '0.1.1';
var AMAZON_VERSION_BUILD = '0002';
var AMAZON_VERSION_TYPE = 'ALPHA';
var AMAZON_VERSION_DATE = '30.05.2020';
// tslint:disable-next-line
var AMAZON_VERSION_STRING = AMAZON_VERSION_NUMBER + '.' + AMAZON_VERSION_BUILD + ' vom ' + AMAZON_VERSION_DATE + ' (' + AMAZON_VERSION_TYPE + ')';
var AMAZON_SERVER_VERSION = AMAZON_VERSION_STRING;
var AMAZON_WORKER_VERSION = AMAZON_VERSION_STRING;
var AMAZON_API_VERSION = AMAZON_VERSION_STRING;

/** @packageDocumentation
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
var AMAZON_FACTORY_NAME = 'AmazonFactory';
var AMAZON_PORT_NAME = 'AmazonPort';
var AMAZON_MOCK_NAME = 'AmazonMock';
var AMAZON_DEFAULT_NAME = AMAZON_PORT_NAME;
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
var AMAZON_EN_LANGUAGE = 'en-US';
var AMAZON_DEFAULT_LANGUAGE = AMAZON_DE_LANGUAGE;
// ASR
var AMAZON_ASR_LANGUAGE1 = 'deu-DEU';
var AMAZON_ASR_LANGUAGE2 = 'eng-USA';
var AMAZON_ASR_LANGUAGE = AMAZON_ASR_LANGUAGE1;
// TTS
var AMAZON_TTS_LANGUAGE1 = 'de-DE';
var AMAZON_TTS_LANGUAGE2 = 'en-US';
var AMAZON_TTS_LANGUAGE = AMAZON_TTS_LANGUAGE1;
// Amazon Stimmen
var AMAZON_TTS_VOICE1 = 'Vicki';
var AMAZON_TTS_VOICE2 = 'Markus';
var AMAZON_TTS_VOICE3 = 'Anna-ML';
var AMAZON_TTS_VOICE4 = 'Petra-ML';
var AMAZON_TTS_VOICE = AMAZON_TTS_VOICE1;
var AMAZON_DEFAULT_VOICE = AMAZON_TTS_VOICE;
var AMAZON_AUDIOTTS_ID = 789;
// Audio-Codec
var AMAZON_PCM_CODEC = 'audio/L16;rate=16000';
var AMAZON_DEFAULT_CODEC = AMAZON_PCM_CODEC;
// Audio-Konstanten
var AMAZON_AUDIOBUFFER_SIZE = 2048;
var AMAZON_AUDIOSAMPLE_RATE = 16000;
var AMAZON_AUDIO_FORMAT = 'pcm';

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

/** @packageDocumentation
 * Builder-Liste zur Speicherung von Plugin-Komponenten
 *
 * Letzte Aenderung: 24.08.2018
 * Status: gruen
 *
 * @module core/builder
 * @author SB
 */
/**
 * Klasse BuilderList zur Speicherung von Buildern
 *
 * @export
 * @class BuilderList
 */
var BuilderList = /** @class */ (function (_super) {
    __extends(BuilderList, _super);
    /**
     * Creates an instance of PluginList.
     */
    function BuilderList() {
        var _this = _super.call(this, 'BuilderList') || this;
        /**
         * Map mit allen erzeugten Buildern
         */
        _this.mBuilderList = new Map();
        _this.mBuilderIterator = _this.mBuilderList.values();
        return _this;
    }
    /**
     * Rueckgabe der Anzahl vorhandener Builder
     *
     * @return {number} size - Anzahl der Builder in der Liste
     */
    BuilderList.prototype.getSize = function () {
        return this.mBuilderList.size;
    };
    /**
     * Eintragen eines Builders
     *
     * @param {string} aBuilderName - Name des Builders
     * @param {BuilderInterface} aBuilder - Builder Instanz
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    BuilderList.prototype.insert = function (aBuilderName, aBuilder) {
        try {
            if (!aBuilderName) {
                this._error('insert', 'kein Buildername uebergeben');
                return -1;
            }
            if (!aBuilder) {
                this._error('insert', 'kein Builder uebergeben');
                return -1;
            }
            // console.log('BuilderList.insert:', this.mBuilderList.size, this.mBuilderList.has( aBuilderName ));
            if (this.mBuilderList.has(aBuilderName)) {
                this._error('insert', 'Builder existiert bereits');
                return -1;
            }
            this.mBuilderList.set(aBuilderName, aBuilder);
            return 0;
        }
        catch (aException) {
            this._exception('insert', aException);
            return -1;
        }
    };
    /**
     * Zurueckgeben eines Builders
     *
     * @param {string} aBuilderName - Name des Builders
     * @returns {BuilderInterface} - Builder Instanz
     */
    BuilderList.prototype.find = function (aBuilderName) {
        try {
            return this.mBuilderList.get(aBuilderName);
        }
        catch (aException) {
            this._exception('find', aException);
            return undefined;
        }
    };
    /**
     * ersten Builder der Liste zurueckgeben
     *
     * @return {BuilderInterface} - Builder Instanz
     */
    BuilderList.prototype.first = function () {
        try {
            this.mBuilderIterator = this.mBuilderList.values();
            return this.mBuilderIterator.next().value;
        }
        catch (aException) {
            this._exception('first', aException);
            return undefined;
        }
    };
    /**
     * naechsten Builder der Liste zurueckgeben. Es muss vorher einmal first aufgerufen werden.
     *
     * @return {BuilderInterface} - Builder Instanz
     */
    BuilderList.prototype.next = function () {
        try {
            return this.mBuilderIterator.next().value;
        }
        catch (aException) {
            this._exception('next', aException);
            return undefined;
        }
    };
    /**
     * Entfernen eines Builders aus der Liste
     *
     * @param {string} aBuilderName - Name des Builders
     * @return {number} errorCode(0,-1)
     */
    BuilderList.prototype.remove = function (aBuilderName) {
        try {
            this.mBuilderList.delete(aBuilderName);
            return 0;
        }
        catch (aException) {
            this._exception('remove', aException);
            return -1;
        }
    };
    /**
     * Loeschen der Liste
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */
    BuilderList.prototype.clear = function () {
        try {
            this.mBuilderList.clear();
            return 0;
        }
        catch (aException) {
            this._exception('clear', aException);
            return -1;
        }
    };
    return BuilderList;
}(ErrorBase));

/** @packageDocumentation
 * Verwaltet alle Builder des Systems. Ist eine statische Klasse.
 *
 * Letzte Aenderung: 24.08.2018
 * Status: gruen
 *
 * @module core/builder
 * @author SB
 */
/**
 * statische Klasse BuildManager
 */
var BuilderManager = /** @class */ (function () {
    // statische Klasse, keine Instanz erzeugbar !
    function BuilderManager() {
    }
    // Fehler-Funktionen
    BuilderManager.setErrorOutputOn = function () {
        BuilderManager.mBuilderList.setErrorOutputOn();
        BuilderManager.mErrorBase.setErrorOutputOn();
    };
    BuilderManager.setErrorOutputOff = function () {
        BuilderManager.mBuilderList.setErrorOutputOff();
        BuilderManager.mErrorBase.setErrorOutputOff();
    };
    /**
     * Eintragen einer Fehlerbehandlungsfunktion
     *
     * @param {SpeechErrorFunc} aErrorFunc - Fehlerbehandlungsfunktion
     */
    BuilderManager._setErrorOutputFunc = function (aErrorFunc) {
        BuilderManager.mBuilderList._setErrorOutputFunc(aErrorFunc);
        BuilderManager.mErrorBase._setErrorOutputFunc(aErrorFunc);
    };
    // Builder-Funktionen
    /**
     * Rueckgabe der Anzahl vorhandener Builder
     *
     * @return {number} size - Anzahl der Builder in der Liste
     */
    BuilderManager.getSize = function () {
        return BuilderManager.mBuilderList.getSize();
    };
    /**
     * Gibt einen neuen oder bereits vorhandenen Builder zurueck
     *
     * @param {string } aBuilderName - Name des Builders
     * @param {BuilderClass} [aBuilderClass] - Klasse des Builders
     *
     * @return {BuilderInterface} builder - gibt ein Objekt von Builder zurueck oder null
     */
    BuilderManager.get = function (aBuilderName, aBuilderClass) {
        if (!aBuilderName) {
            BuilderManager.mErrorBase._error('get', 'kein Buildername uebergeben');
            return null;
        }
        var builder = BuilderManager.find(aBuilderName);
        if (builder) {
            return builder;
        }
        if (!aBuilderClass) {
            BuilderManager.mErrorBase._error('get', 'keine Builderklasse uebergeben');
            return null;
        }
        try {
            // console.log('BuilderManager.get: Builder neu erzeugt');
            builder = new aBuilderClass();
            // console.log('BuilderManager.get: Builder neu erzeugt', builder, builder.getName());
        }
        catch (aException) {
            BuilderManager.mErrorBase._exception('get', aException);
            return null;
        }
        // pruefen auf gleichen Namen
        // console.log('BuilderManager.get: same name? ', aBuilderName, builder.getName());
        if (aBuilderName !== builder.getName()) {
            BuilderManager.mErrorBase._error('get', 'Buildernamen stimmen nicht ueberein ' + aBuilderName + ' != ' + builder.getName());
            BuilderManager.remove(builder.getName());
            return null;
        }
        return builder;
    };
    /**
     * Sucht den Builder zum BuilderNamen und gibt ihn zurueck
     *
     * @param {string} aBuilderName - Name des Builders
     *
     * @return {BuilderInterface} builder - gibt ein Objekt von Builder zurueck oder null
     */
    BuilderManager.find = function (aBuilderName) {
        var builder = BuilderManager.mBuilderList.find(aBuilderName);
        if (!builder) {
            return null;
        }
        return builder;
    };
    /**
     * Fuegt einen Builder in den BuilderManager ein
     *
     * @param {string} aBuilderName - Name des Builders
     * @param {BuilderInterface} aBuilder - Instanz des Builders
     *
     * @return {number} errorCode(0,-1)
     */
    BuilderManager.insert = function (aBuilderName, aBuilder) {
        return BuilderManager.mBuilderList.insert(aBuilderName, aBuilder);
    };
    /**
     * Entfernt einen Builder aus dem BuilderManager
     *
     * @param {string} aBuilderName - Name des Builders
     *
     * @return {number} errorCode(0,-1)
     */
    BuilderManager.remove = function (aBuilderName) {
        return BuilderManager.mBuilderList.remove(aBuilderName);
    };
    /**
     * Entfernt alle Builder aus dem BuilderManager
     *
     * @return {number} errorCode(0,-1)
     */
    BuilderManager.clear = function () {
        return BuilderManager.mBuilderList.clear();
    };
    /**
     * statische Liste aller Builder im System
     */
    BuilderManager.mBuilderList = new BuilderList();
    /**
     * statische ErrorBase fuer die Fehlerbehandlung
     */
    BuilderManager.mErrorBase = new ErrorBase('BuilderManager');
    return BuilderManager;
}());

/** @packageDocumentation
 * Plugin-Liste zur Speicherung von Plugin-Komponenten
 *
 * Letzte Aenderung: 24.08.2018
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */
/**
 * Klasse PluginList zur Speicherung von Plugin-Komponenten
 *
 * @export
 * @class PluginList
 */
var PluginList = /** @class */ (function (_super) {
    __extends(PluginList, _super);
    /**
     * Creates an instance of PluginList.
     */
    function PluginList() {
        var _this = _super.call(this, 'PluginList') || this;
        _this.mPluginList = new Map();
        _this.mPluginIterator = _this.mPluginList.values();
        return _this;
    }
    /**
     * Rueckgabe der Anzahl vorhandener Plugins
     *
     * @return {number} size - Anzahl der Plugins in der Liste
     */
    PluginList.prototype.getSize = function () {
        return this.mPluginList.size;
    };
    /**
     * Eintragen eines Plugins
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {PluginInterface} aPlugin - Plugin Instanz
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    PluginList.prototype.insert = function (aPluginName, aPlugin) {
        try {
            if (!aPluginName) {
                this._error('insert', 'kein Pluginname uebergeben');
                return -1;
            }
            if (!aPlugin) {
                this._error('insert', 'kein Plugin uebergeben');
                return -1;
            }
            if (this.mPluginList.has(aPluginName)) {
                this._error('insert', 'Plugin existiert bereits ' + aPluginName);
                return -1;
            }
            this.mPluginList.set(aPluginName, aPlugin);
            return 0;
        }
        catch (aException) {
            this._exception('insert', aException);
            return -1;
        }
    };
    /**
     * Zurueckgeben eines Plugins
     *
     * @param {string} aPluginName - Name des Plugins
     * @returns {PluginInterface} - Plugin Instanz oder null
     */
    PluginList.prototype.find = function (aPluginName) {
        try {
            return this.mPluginList.get(aPluginName);
        }
        catch (aException) {
            this._exception('find', aException);
            return undefined;
        }
    };
    /**
     * erstes Plugin der Liste zurueckgeben
     *
     * @return {PluginInterface} - Plugin Instanz oder null
     */
    PluginList.prototype.first = function () {
        try {
            this.mPluginIterator = this.mPluginList.values();
            return this.mPluginIterator.next().value;
        }
        catch (aException) {
            this._exception('first', aException);
            return undefined;
        }
    };
    /**
     * naechstes Plugin der Liste zurueckgeben. Es muss vorher einmal first aufgerufen werden.
     *
     * @return {PluginInterface} - Plugin Instanz oder null
     */
    PluginList.prototype.next = function () {
        try {
            return this.mPluginIterator.next().value;
        }
        catch (aException) {
            this._exception('next', aException);
            return undefined;
        }
    };
    /**
     * Rueckgabe aller vorhandenen Plugin-Namen
     *
     * @return {Array<string>} Rueckgabe aller Plugin-Namen als Liste
     */
    PluginList.prototype.getNameList = function () {
        return Array.from(this.mPluginList.keys());
    };
    /**
     * Entfernen eines Plugins aus der Liste
     *
     * @param {string} aPluginName - Name des Plugins
     * @return {number} errorCode(0,-1)
     */
    PluginList.prototype.remove = function (aPluginName) {
        try {
            this.mPluginList.delete(aPluginName);
            return 0;
        }
        catch (aException) {
            this._exception('remove', aException);
            return -1;
        }
    };
    /**
     * Loeschen aller Plugins aus der Liste
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */
    PluginList.prototype.clear = function () {
        try {
            this.mPluginList.clear();
            return 0;
        }
        catch (aException) {
            this._exception('clear', aException);
            return -1;
        }
    };
    return PluginList;
}(ErrorBase));

/** @packageDocumentation
 * PluginManager zur Verwaltung aller Plugins
 *
 * Letzte Aenderung: 08.11.2018
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */
var PluginManager = /** @class */ (function () {
    // statische Klasse, keine Instanz erzeugbar !
    function PluginManager() {
    }
    // Fehler-Funktionen
    PluginManager.setErrorOutputOn = function () {
        PluginManager.mPluginList.setErrorOutputOn();
        PluginManager.mErrorBase.setErrorOutputOn();
    };
    PluginManager.setErrorOutputOff = function () {
        PluginManager.mPluginList.setErrorOutputOff();
        PluginManager.mErrorBase.setErrorOutputOff();
    };
    /**
     * Eintragen einer Fehlerbehandlungsfunktion
     *
     * @param {SpeechErrorFunc} aErrorFunc - Fehlerbehandlungsfunktion
     */
    PluginManager._setErrorOutputFunc = function (aErrorFunc) {
        PluginManager.mPluginList._setErrorOutputFunc(aErrorFunc);
        PluginManager.mErrorBase._setErrorOutputFunc(aErrorFunc);
    };
    // Plugin-Funktionen
    /**
     * Rueckgabe der Anzahl vorhandener Plugins
     *
     * @return {number} size - Anzahl der Plugins in der Liste
     */
    PluginManager.getSize = function () {
        return PluginManager.mPluginList.getSize();
    };
    /**
     * Rueckgabe eines Plugins.
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {string} [aPluginType] - Type des Plugins (FactoryName)
     * @param {PluginFactoryInterface} [aPluginFactory] - Plugin Fabrik Klasse
     *
     * @return {PluginInterface} plugin - Rueckgabe des Plugins oder null
     */
    PluginManager.get = function (aPluginName, aPluginFactory) {
        if (!aPluginName) {
            PluginManager.mErrorBase._error('get', 'kein PluginName uebergeben');
            return null;
        }
        var plugin = PluginManager.find(aPluginName);
        if (plugin) {
            // console.log('PluginManager.get: Plugin wurde gefunden', aPluginName);
            return plugin;
        }
        if (!aPluginFactory) {
            PluginManager.mErrorBase._error('get', 'keine PluginFactoryClass uebergeben');
            return null;
        }
        // console.log('PluginManager.get: Plugin wurde erzeugt', aPluginName);
        return aPluginFactory.create(aPluginName);
    };
    /**
     * Rueckgabe eines Plugins
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {AudioPluginInterface} - Rueckgabe des AudioPlugins
     */
    PluginManager.find = function (aPluginName) {
        var plugin = PluginManager.mPluginList.find(aPluginName);
        if (!plugin) {
            return null;
        }
        return plugin;
    };
    /**
     * Eintragen eines Plugin
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {PluginInterface} aPlugin - Plugin
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */
    PluginManager.insert = function (aPluginName, aPlugin) {
        return PluginManager.mPluginList.insert(aPluginName, aPlugin);
    };
    /**
     * Entfernt das Plugin aus der Liste
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    PluginManager.remove = function (aPluginName) {
        return PluginManager.mPluginList.remove(aPluginName);
    };
    /**
     * Entfernt alle Plugins. Die Plugins werden vorher mit done() freigegeben.
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    PluginManager.clear = function () {
        var plugin = PluginManager.mPluginList.first();
        while (plugin) {
            try {
                // Plugins muessen freigegeben werden, um ihre Ressourcen ebenfalls freizugeben
                plugin.done();
            }
            catch (aException) {
                PluginManager.mErrorBase._exception('clear', aException);
            }
            plugin = PluginManager.mPluginList.next();
        }
        return PluginManager.mPluginList.clear();
    };
    PluginManager.mPluginList = new PluginList();
    /**
     * statische ErrorBase fuer die Fehlerbehandlung
     */
    PluginManager.mErrorBase = new ErrorBase('PluginManager');
    return PluginManager;
}());

/** @packageDocumentation
 * Builder fuer die Erzeugung von Komponenten
 *
 * Letzte Aenderung: 03.09.2018
 * Status: gruen
 *
 * @module core/builder
 * @author SB
 */
/** @export
 * Klasse Builder
 */
var Builder = /** @class */ (function (_super) {
    __extends(Builder, _super);
    /**
     * Erzeugt eine Instanz von Builder
     */
    function Builder(aBuilderName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var _this = _super.call(this, 'Builder') || this;
        _this._setErrorClassName(_this.getClass());
        // console.log('Builder.constructor:', aBuilderName);
        if (aRegisterFlag && BuilderManager.insert(aBuilderName || _this.getName(), _this) !== 0) {
            throw new Error('Builder ' + _this.getName() + ' existiert bereits im BuilderManager');
        }
        return _this;
    }
    /**
     * Typ der vom Builder erzeugten Komponenten
     *
     * @return {string} typeName
     */
    Builder.prototype.getType = function () {
        return '';
    };
    /**
     * Klasse des Builders zurueckgeben
     *
     * @return {string} builderName
     */
    Builder.prototype.getClass = function () {
        return 'Builder';
    };
    /**
     * Name des Builders zurueckgeben
     *
     * @return {string} builderName
     */
    Builder.prototype.getName = function () {
        return 'Builder';
    };
    // Builder-Funktionen
    /**
     * Hauptfunktion des Builders.
     *
     * @return {ComponentInterface} component - Rueckgabe der erzeugten Komponente oder null
     */
    Builder.prototype.build = function () {
        return null;
    };
    // Hilfsfunktionen
    Builder.prototype._getBuilder = function (aBuilderName, aBuilderClass) {
        return BuilderManager.get(aBuilderName, aBuilderClass);
    };
    Builder.prototype._getFactory = function (aFactoryName, aFactoryClass) {
        return FactoryManager.get(aFactoryName, aFactoryClass);
    };
    Builder.prototype._getComponent = function (aComponentName, aComponentType, aComponentBuilderClass) {
        if (aComponentType) {
            var builder = this._getBuilder(aComponentType, aComponentBuilderClass);
            // console.log('Builder._getComponent: builder=', builder.getName(), builder);
            if (builder) {
                return builder.build();
            }
        }
        return PluginManager.get(aComponentName);
    };
    Builder.prototype._getPlugin = function (aPluginName, aPluginType, aPluginFactoryClass) {
        if (aPluginType && aPluginFactoryClass) {
            var factory = this._getFactory(aPluginType, aPluginFactoryClass);
            // console.log('Builder._getPlugin: factory=', factory.getName(), factory);
            if (factory) {
                return PluginManager.get(aPluginName, factory);
            }
        }
        return PluginManager.get(aPluginName);
    };
    return Builder;
}(ErrorBase));

/** @packageDocumentation
 * Speech-Framework Version und Build Konstanten
 *
 * Automatisch erzeugte Datei
 *
 * @module speech
 * @author SB
 */
var SPEECH_VERSION_NUMBER = '0.5.21';
var SPEECH_VERSION_BUILD = '0065';
var SPEECH_VERSION_TYPE = 'release';
var SPEECH_VERSION_DATE = '28.06.2020';
// tslint:disable-next-line
var SPEECH_VERSION_STRING = SPEECH_VERSION_NUMBER + '.' + SPEECH_VERSION_BUILD + ' vom ' + SPEECH_VERSION_DATE + ' (' + SPEECH_VERSION_TYPE + ')';
var SPEECH_API_VERSION = SPEECH_VERSION_STRING;

/** @packageDocumentation
 * globale Speech Event Konstanten
 *
 * @module speech
 * @author SB
 */
// speech
var SPEECH_INIT_EVENT = 'init';
var SPEECH_ERROR_EVENT = 'error';

/** @packageDocumentation
 * Event-Funktionsliste, um Eventfunktionen verschiedener Listener zu speichern
 *
 * Letzte Aenderung: 08.12.2018
 * Status: gruen
 *
 * @module core/event
 * @author SB
 */
/**
 * Klasse EventFunctionList
 *
 * @export
 * @class EventFunctionList
 */
var EventFunctionList = /** @class */ (function (_super) {
    __extends(EventFunctionList, _super);
    /**
     *Creates an instance of EventList.
     *
     * @param {string} aEventName - Name des Events
     * @param {string} aComponentName - Name der QuellKomponente des Events
     * @param {boolean} aAsyncFlag - legt fest, ob der Event asynchron ausgeliefert wird (experimentell)
     */
    function EventFunctionList(aEventName, aComponentName, aAsyncFlag) {
        if (aAsyncFlag === void 0) { aAsyncFlag = false; }
        var _this = _super.call(this, 'EventFunctionList') || this;
        _this.mEventName = 'Event';
        _this.mComponentName = 'Component';
        // TODO: Asynchrone Events sind noch nicht freigegeben, muessen erst noch getestet werden !
        _this.mAsyncFlag = false;
        // Plugin-Name, Event-Funktion
        _this.mFunctionList = new Map();
        _this.mEventName = aEventName;
        _this.mComponentName = aComponentName;
        _this.mAsyncFlag = aAsyncFlag;
        return _this;
    }
    EventFunctionList.prototype.setComponentName = function (aComponentName) {
        this.mComponentName = aComponentName;
    };
    EventFunctionList.prototype.getComponentName = function () {
        return this.mComponentName;
    };
    /**
     * Rueckgabe des Event-Namens
     *
     * @returns {string} eventName
     */
    EventFunctionList.prototype.getName = function () {
        return this.mEventName;
    };
    /**
     * Anzahl der Listener zurueckgeben
     *
     * @returns {number} listenerSize
     */
    EventFunctionList.prototype.getSize = function () {
        return this.mFunctionList.size;
    };
    /**
     * Einfuegen eines Events zum Listener
     *
     * @param {string} aListenerName - Name des Listeners (Pluginname)
     * @param {EventFunc} aEventFunc - Eventfunktion fuer diesen Event
     *
     * @returns {number} errorCode(0,-1)
     */
    EventFunctionList.prototype.addListener = function (aListenerName, aEventFunc) {
        // console.log('EventFunctionList.addListener:', this.getComponentName(), this.getName(), aListenerName, aEventFunc);
        if (!aListenerName) {
            this._error('addListener', 'kein Listenername uebergeben ' + this.getComponentName() + ',' + this.getName());
            return -1;
        }
        if (typeof aEventFunc !== 'function') {
            this._error('addListener', 'keine Eventfunktion uebergeben ' + aListenerName + ',' + this.getComponentName() + ',' + this.getName());
            return -1;
        }
        if (this.mFunctionList.has(aListenerName)) {
            this._error('addListener', 'Eventfunktion bereits vorhanden ' + aListenerName + ',' + this.getComponentName() + ',' + this.getName());
            return -1;
        }
        // console.log('EventFunctionList.addEventListener: Elementfunktion eingetragen', aListenerName, this.getComponentName(), this.getName());
        this.mFunctionList.set(aListenerName, aEventFunc);
        return 0;
    };
    /**
     * Entfernen eines Events zum Listener
     *
     * @param {string} aListenerName - Name des Listeners (Pluginname)
     *
     * @returns {number} errorCode(0,-1)
     */
    EventFunctionList.prototype.removeListener = function (aListenerName) {
        if (!aListenerName) {
            this._error('removeListener', 'kein Listenername uebergeben' + ',' + this.getComponentName() + ',' + this.getName());
            return -1;
        }
        /**** TODO: Diese Fehlerausgabe ist nicht notwendig!
        if ( !this.mFunctionList.has( aListenerName )) {
            this._error( 'removeListener', 'Eventfunktion nicht vorhanden ' + aListenerName + ', ' + this.getComponentName() + ', ' + this.getName());
            return -1;
        }
        ****/
        // console.log('EventFunctionList.removeEventListener: Elementfunktion entfernt', aListenerName, this.getComponentName(), this.getName());
        this.mFunctionList.delete(aListenerName);
        return 0;
    };
    /**
     * Ereignis ausloesen
     *
     * @param {any} aEvent - optionale Ereignisdaten
     *
     * @returns {number} errorCode(0,-1)
     */
    EventFunctionList.prototype.dispatch = function (aEvent) {
        var _this = this;
        // console.log('EventFunctionList.dispatch:', this.getName(), aEvent);
        var result = 0;
        this.mFunctionList.forEach(function (eventFunc) {
            // console.log('EventFunctionList.dispatch:', this.getComponentName(), this.getName(), eventFunc);
            if (_this.mAsyncFlag) {
                // asynchrone Ausfuehrung des Events
                setTimeout(function () {
                    try {
                        eventFunc(aEvent);
                    }
                    catch (aException) {
                        console.log('EventFunction.dispatch: Exception', aException);
                    }
                }, 0);
            }
            else {
                try {
                    // synchrone Ausfuehrung des Events
                    if (eventFunc(aEvent) !== 0) {
                        result = -1;
                    }
                }
                catch (aException) {
                    // console.log('EventFunctionList.dispatch:', this.getComponentName(), this.getName(), eventFunc);
                    _this._exception('dispatch', aException);
                    result = -1;
                }
            }
        });
        return result;
    };
    /**
     * Ereignis fuer einen einzelnen Listener ausloesen
     *
     * @param {string} aListenerName - Name des Listeners, an den die Ereignisse versendet werden
     * @param {any} aEvent - optionale Ereignisdaten
     *
     * @returns {number} errorCode(0,-1)
     */
    EventFunctionList.prototype.dispatchListener = function (aListenerName, aEvent) {
        // console.log('EventFunctionList.dispatchListener:', aListenerName, this.getName(), aEvent);
        if (!aListenerName) {
            this._error('dispatchListener', 'kein Listenername uebergeben ' + this.getComponentName() + ',' + this.getName());
            return -1;
        }
        // Aufruf der Eventfunktion des Listeners
        var result = 0;
        var eventFunc = this.mFunctionList.get(aListenerName);
        if (eventFunc) {
            // console.log('EventFunctionList.dispatchListener:', aListenerName, this.getComponentName(), this.getName(), eventFunc);
            if (this.mAsyncFlag) {
                // asynchrone Ausfuehrung des Events
                setTimeout(function () {
                    try {
                        eventFunc(aEvent);
                    }
                    catch (aException) {
                        console.log('EventFunction.dispatchListener: Exception', aException);
                    }
                }, 0);
            }
            else {
                // synchrone Ausfuehrung des Events
                try {
                    result = eventFunc(aEvent);
                }
                catch (aException) {
                    // console.log('EventFunctionList.dispatchListener:', aListenerName, this.getComponentName(), this.getName(), eventFunc);
                    this._exception('dispatchListener', aException);
                    result = -1;
                }
            }
        }
        return result;
    };
    /**
     * Ereignisfunktionsliste loeschen
     */
    EventFunctionList.prototype.clear = function () {
        this.mFunctionList.clear();
    };
    return EventFunctionList;
}(ErrorBase));

/** @packageDocumentation
 * Plugin Basiskomponente, von der alle Plungins abgeleitet sind
 *
 * Letzte Aenderung: 19.10.2018
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */
/**
 * Definiert die Basisklasse aller Plugins
 *
 * @export
 * @class AudioPlugin
 * @implements {PluginInterface}
 */
var Plugin = /** @class */ (function (_super) {
    __extends(Plugin, _super);
    /**
     * Creates an instance of Plugin.
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {boolean} aRegisterFlag - true, wenn Plugin in PluginManager eingetragen werden soll
     */
    function Plugin(aPluginName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var _this = _super.call(this, 'Plugin') || this;
        _this.mPluginName = '';
        // Events
        _this.mOnInitFunc = null;
        _this.mOnErrorFunc = null;
        // interne Attribute
        _this.mInitFlag = false;
        _this.mActiveFlag = false;
        _this._setErrorClassName(_this.getClass());
        _this.mPluginName = aPluginName;
        // console.log('Plugin.constructor:', aPluginName, aRegisterFlag);
        if (aRegisterFlag && PluginManager.insert(aPluginName, _this) !== 0) {
            throw new Error('Plugin ' + _this.getName() + ' ist bereits im PluginManager vorhanden');
        }
        // verbinden der Errorfunktion mit dem ErrorEvent
        _this._setErrorOutputFunc(_this._getErrorOutputFunc());
        return _this;
    }
    // Plugin-Funktionen
    /**
     * pruefen auf Mock-Plugin zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Plugin ein Mock zum Testen ist
     */
    Plugin.prototype.isMock = function () {
        return false;
    };
    /**
     * Rueckgabe eines logischen Plugin-Typs
     *
     * @return {string} pluginType - logischer Typ des Plugins fuer unterschiedliche Anwendungsschnittstellen
     * @memberof PluginInterface
     */
    Plugin.prototype.getType = function () {
        return 'Plugin';
    };
    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */
    Plugin.prototype.getClass = function () {
        return 'Plugin';
    };
    /**
     * Rueckgabe des Plugin-Namens
     *
     * @return {string} pluginName - Rueckgabe des Plugin-Namens
     */
    Plugin.prototype.getName = function () {
        return this.mPluginName;
    };
    /**
     * initialisert das Plugin
     *
     * erlaubte optionale Parameter:
     *
     *      activeFlag      - legt fest, ob das Plugin zum Start aktiviert ist oder nicht
     *      errorOutputFlag - legt fest, ob die Fehlerausgabe auf der Konsole erfolgt
     *
     *
     * @param {any} aOption - optionale Parameter fuer die Konfiguration des Plugins
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    Plugin.prototype.init = function (aOption) {
        this.mActiveFlag = true;
        if (aOption) {
            // traegt das activeFlag ein
            if (typeof aOption.activeFlag === 'boolean') {
                // console.log('Plugin.init: activeFlag =', aOption.activeFlag, this.getName());
                this.mActiveFlag = aOption.activeFlag;
            }
            // traegt das errorOutputFlag ein
            if (typeof aOption.errorOutputFlag === 'boolean') {
                // console.log('Plugin.init: errorOutputFlag =', aOption.errorOutputFlag, this.getName());
                this._setErrorOutput(aOption.errorOutputFlag);
            }
        }
        this.mInitFlag = true;
        return 0;
    };
    /**
     * gibt das Plugin frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     * @memberof PluginInterface
     */
    Plugin.prototype.done = function () {
        // console.log('Plugin.done:', this.getName());
        this.mInitFlag = false;
        this.mActiveFlag = false;
        this.mOnInitFunc = null;
        this.mOnErrorFunc = null;
        _super.prototype._setErrorOutputDefault.call(this);
        return 0;
    };
    /**
     * setzt das Plugin wieder auf Defaultwerte und uebergebene optionale Parameter.
     * Die Fehlerausgabe wird nicht zurueckgesetzt.
     *
     * @param {any} aOption - optionale Parameter
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    Plugin.prototype.reset = function (aOption) {
        this.mActiveFlag = this.isInit();
        return 0;
    };
    /**
     * pruefen auf initialisertes Plugin
     *
     * @return {boolean} initFlag - true, Plugin ist initialisiert, false sonst
     * @memberof PluginInterface
     */
    Plugin.prototype.isInit = function () {
        return this.mInitFlag;
    };
    /**
     * internes loeschen des Init-Flags, falls Init abgebrochen werden muss
     *
     * @protected
     */
    Plugin.prototype._clearInit = function () {
        this.mInitFlag = false;
        this.mActiveFlag = false;
    };
    /**
     * Dynamische Konfiguration des Plugins
     *
     * @param {any} aFeatureInfo - Konfigurationsdaten
     */
    Plugin.prototype.setFeatureList = function (aFeatureInfo) {
        return 0;
    };
    /**
     * pruefen, ob Plugin aktiv ist
     *
     * @return {boolean} Aktiv ein oder aus
     */
    Plugin.prototype.isActive = function () {
        return this.mActiveFlag;
    };
    /**
     * Plugin aktiv setzen (Default)
     *
     * @return {number} Fehlercode 0 oder -1
     */
    Plugin.prototype.setActiveOn = function () {
        this.mActiveFlag = true;
        return 0;
    };
    /**
     * Plugin deaktivieren
     *
     * @return {number}
     */
    Plugin.prototype.setActiveOff = function () {
        this.mActiveFlag = false;
        return 0;
    };
    /**
     * Rueckgabe der internen Fehlerfunktion fuer innere Klassen
     *
     * @private
     * @return {SpeechErrorFunc} Rueckgabe der Fehlerfunktion fuer ErrorBase
     * @memberof Plugin
     */
    Plugin.prototype._getErrorOutputFunc = function () {
        var _this = this;
        // Uebersetzt ErrorBase Fehlerfunktion mit Fehlertext in Fehlerevent mit erzeugtem Fehlerobjekt
        return function (aErrorText) { return _this._onError(new Error(aErrorText)); };
    };
    // Nachrichten-Funktionen
    /**
     * Nachrichten verarbeiten
     *
     * @param {SpeechMessageInterface} aMessage - zu verarbeitende Nachricht
     * @return {number} errorCode(0,-1)
     */
    Plugin.prototype.handleMessage = function (aMessage) {
        return 0;
    };
    /**
     * Rueckgabe der Nachrichtenverarbeitungsfunktion
     *
     * @return {PluginHandleMessageFunc} handleMessageFunc
     */
    Plugin.prototype.getHandleMessageFunc = function () {
        var _this = this;
        return function (aMessage) { return _this.handleMessage(aMessage); };
    };
    // Event-Funktionen
    /**
     * Ereignisfunktion fuer Init aufrufen
     *
     * @private
     * @param {string} aPluginName - Name des initialiserten Plugins
     *
     * @return {number} errorCode(0,-1)
     */
    Plugin.prototype._onInit = function () {
        // console.log('Plugin._onInit:', this.getName(), this.mOnInitFunc);
        if (typeof this.mOnInitFunc === 'function') {
            try {
                return this.mOnInitFunc(this.getName());
            }
            catch (aException) {
                this._exception('Plugin._onInit', aException);
                return -1;
            }
        }
        return 0;
    };
    /**
     * Ereignisfunktion fuer Fehler aufrufen
     *
     * @private
     * @param {any} aError - Error Datentransferobjekt
     * @return {number} errorCode(0,-1)
     */
    Plugin.prototype._onError = function (aError) {
        // console.log('Plugin._onError:', this.getName(), aError);
        if (typeof this.mOnErrorFunc === 'function') {
            try {
                // console.log('Plugin._onError: call', this.mOnErrorFunc);
                return this.mOnErrorFunc(aError);
            }
            catch (aException) {
                if (this.isErrorOutput()) {
                    // hier darf nicht this._exception() verwendet werden, da sonst eine Endlosschleife entstehen kann!
                    console.log('===> EXCEPTION Plugin._onError: ', aException.message);
                }
                return -1;
            }
        }
        return 0;
    };
    Object.defineProperty(Plugin.prototype, "onInit", {
        /**
         * Init-Event Funktion zurueckgeben
         *
         * @readonly
         * @type {OnSpeechInitFunc}
         */
        get: function () {
            var _this = this;
            return function () { return _this._onInit(); };
        },
        /**
         * Init-Event Funktion eintragen
         *
         * @param {OnSpeechInitFunc} aOnInitFunc
         */
        set: function (aOnInitFunc) {
            // console.log('Plugin.onInit:', this.getName(), aOnInitFunc);
            this.mOnInitFunc = aOnInitFunc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Plugin.prototype, "onError", {
        /**
         * Error-Event Funktion zurueckgeben
         *
         * @readonly
         * @type {OnSpeechErrorFunc}
         */
        get: function () {
            var _this = this;
            return function (aError) { return _this._onError(aError); };
        },
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
    // Test-Funktionen
    /**
     * Fuehrt Testkommandos aus, um interne Tests ablaufen lassen zu koennen
     * @param {string} aTestCommand - Testkommando
     * @param {*} aTestData - optionale Testdaten
     *
     * @return {*} Rueckgabe der Testergebnisse
     */
    Plugin.prototype.test = function (aTestCommand, aTestData) {
        return { result: 0 };
    };
    return Plugin;
}(ErrorBase));

/** @packageDocumentation
 * PluginGroup als Manager fuer Plugins.
 *
 * Letzte Aenderung: 05.11.2018
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */
/**
 * Definiert die Basisklasse aller PluginGroup
 */
var PluginGroup = /** @class */ (function (_super) {
    __extends(PluginGroup, _super);
    /**
     * Erzeugt eine Instanz von PluginGroup
     *
     * @param {string} aPluginGroupName - Name der PluginGroup
     * @param {boolean} aRegisterFlag - wenn true, dann wird PluginGroup in PluginManager eingetragen
     */
    function PluginGroup(aPluginGroupName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var _this = _super.call(this, aPluginGroupName, aRegisterFlag) || this;
        _this.mSendMessageFunc = null;
        /**
         * Liste aller eingefuegten Plugins
         *
         * @type {PluginList}
         */
        _this.mPluginList = new PluginList();
        /**
         * Aktuell ausgewaehltes Plugin
         *
         * @type {Plugin}
         */
        _this.mCurrentPlugin = null;
        _this.mPluginList._setErrorOutputFunc(_this._getErrorOutputFunc());
        return _this;
    }
    // PluginGroup-Funktionen
    PluginGroup.prototype.getType = function () {
        return 'PluginGroup';
    };
    PluginGroup.prototype.getClass = function () {
        return 'PluginGroup';
    };
    /**
     * Initalisiert die PluginGroup
     *
     * @param {any} aOption - optionale Parameter
     * @return {number} Fehlercode 0 oder -1
     */
    PluginGroup.prototype.init = function (aOption) {
        if (_super.prototype.init.call(this, aOption) !== 0) {
            return -1;
        }
        // Initialisierung aller eingetragenen Plugins
        if (this.startAllPlugin(aOption) !== 0) {
            this._clearInit();
            return -1;
        }
        return 0;
    };
    /**
     * Gibt die PluginGroup frei
     *
     * @return {number} Fehlercode 0 oder -1
     */
    PluginGroup.prototype.done = function () {
        this.mCurrentPlugin = null;
        // TODO: Problem der shared Plugins, muss mit Referenzzaehler geloest werden
        this.stopAllPlugin();
        // this.removeAllPlugin();
        return _super.prototype.done.call(this);
    };
    /**
     * Konfiguration der PluginGroup eintragen
     *
     * @param {*} aFeatureInfo - Informationen zu den Features der PluginGroup
     *
     * @return {number} errorCode(0,-1)
     */
    PluginGroup.prototype.setFeatureList = function (aFeatureInfo) {
        // console.log('PluginGroup.setFeatureList:', aFeatureInfo);
        // Funktion zum testen eines leeren Objekts
        var isEmpty = function (obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    // console.log('PluginGroup.setFeatureList: key = ', key);
                    return false;
                }
            }
            return true;
        };
        // pruefen auf gueltiges Objekt
        if (typeof aFeatureInfo !== 'object') {
            this._error('setFeatureList', 'keine gueltige Feature Liste');
            return -1;
        }
        // pruefen auf leeres Objekt
        if (isEmpty(aFeatureInfo)) {
            // console.log('PluginGroup.setFeatureList: isEmpty = true');
            // kein Fehler, es muss nichts getan werden!
            return 0;
        }
        // console.log('PluginGroup.setFeatureList: isEmpty = false');
        try {
            // Plugin-Basisklasse aufrufen
            var result = _super.prototype.setFeatureList.call(this, aFeatureInfo);
            var plugin = this.mPluginList.first();
            // Schleife fuer alle Plugins
            while (plugin) {
                if (plugin.setFeatureList(aFeatureInfo) !== 0) {
                    result = -1;
                }
                plugin = this.mPluginList.next();
            }
            return result;
        }
        catch (aException) {
            this._exception('setFeatureList', aException);
            return -1;
        }
    };
    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */
    PluginGroup.prototype._setErrorOutput = function (aErrorOutputFlag) {
        _super.prototype._setErrorOutput.call(this, aErrorOutputFlag);
        this.mPluginList._setErrorOutput(aErrorOutputFlag);
        this._setErrorOutputAllPlugin(aErrorOutputFlag);
    };
    // Plugin-Funktionen
    /**
     * Einfuegen eines Plugins in die Komponente
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {PluginInterface} aPlugin - Plugin
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */
    PluginGroup.prototype.insertPlugin = function (aPluginName, aPlugin) {
        // console.log('Component.insertPlugin:', aPluginName);
        return this.mPluginList.insert(aPluginName, aPlugin);
    };
    /**
     * Entfernt das Plugin aus der Komponente
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    PluginGroup.prototype.removePlugin = function (aPluginName) {
        return this.mPluginList.remove(aPluginName);
    };
    /**
     * Entfernt alle Plugins aus der Komponente
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    PluginGroup.prototype.removeAllPlugin = function () {
        return this.mPluginList.clear();
    };
    /**
     * Rueckgabe eines Plugins oder null, wenn das Plugin nicht gefunden wurde
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {PluginInterface} - Rueckgabe des Plugins oder null
     */
    PluginGroup.prototype.findPlugin = function (aPluginName, aPluginType) {
        var plugin = this.mPluginList.find(aPluginName);
        if (!plugin) {
            return null;
        }
        return plugin;
    };
    PluginGroup.prototype.firstPlugin = function () {
        return this.mPluginList.first();
    };
    PluginGroup.prototype.nextPlugin = function () {
        return this.mPluginList.next();
    };
    /**
     * Rueckgabe aller Plugin-Namen
     *
     * @return {Array<string>} Liste aller Plugin-Namen
     */
    PluginGroup.prototype.getPluginNameList = function () {
        return this.mPluginList.getNameList();
    };
    /**
     * Aktuelles Plugins pruefen
     *
     * @return {boolean} True, aktuelles Plugin vorhanden, False sonst
     */
    PluginGroup.prototype.isCurrentPlugin = function () {
        return this.mCurrentPlugin ? true : false;
    };
    /**
     * Existierendes Plugin zum ausgewaehlten Plugin machen.
     *
     * @param {string} aPluginName - Name des Plugins, welches zum aktuellen Plugin werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */
    PluginGroup.prototype.setCurrentPlugin = function (aPluginName) {
        var currentPlugin = this.findPlugin(aPluginName);
        if (!currentPlugin) {
            this._error('setCurrentPlugin', 'Kein Plugin vorhanden');
            return 0;
        }
        this.mCurrentPlugin = currentPlugin;
        return 0;
    };
    /**
     * Aktuelles Plugin zurueckgeben
     *
     * @return {PluginInterface} Rueckgabe des aktuellen Plugins oder null
     */
    PluginGroup.prototype.getCurrentPlugin = function () {
        return this.mCurrentPlugin;
    };
    /**
     * Rueckgabe des aktuellen Plugin-Namens
     *
     * @return {string} Name des Plugins oder ''
     */
    PluginGroup.prototype.getCurrentPluginName = function () {
        if (!this.mCurrentPlugin) {
            return '';
        }
        return this.mCurrentPlugin.getName();
    };
    /**
     * pruefen, ob Plugin bereits eingefuegt wurde
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {boolean} pluginFlag - true, Plugin ist vorhanden
     */
    PluginGroup.prototype.isPlugin = function (aPluginName) {
        return this.mPluginList.find(aPluginName) ? true : false;
    };
    /**
     * Anzahl der enthaltenen Plugins zurueckgeben
     *
     * @return {number} size
     */
    PluginGroup.prototype.getPluginSize = function () {
        return this.mPluginList.getSize();
    };
    /**
     * startet ein registriertes Plugin
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {any} [aOption] - Optionale Parameter fuer das Plugin
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    PluginGroup.prototype.startPlugin = function (aPluginName, aOption) {
        // console.log('Component.startPlugin:', aPluginName, aOption);
        var plugin = this.mPluginList.find(aPluginName);
        if (!plugin) {
            this._error('startPlugin', 'Plugin nicht vorhanden');
            return -1;
        }
        if (plugin.isInit()) {
            return 0;
        }
        return plugin.init(aOption);
    };
    /**
     * stoppt ein registriertes Plugin
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     * @memberof PluginManager
     */
    PluginGroup.prototype.stopPlugin = function (aPluginName) {
        // console.log('Component.stopPlugin:', aPluginName);
        var plugin = this.mPluginList.find(aPluginName);
        if (!plugin) {
            this._error('stopPlugin', 'Plugin nicht vorhanden');
            return -1;
        }
        return plugin.done();
    };
    /**
     * Startet alle registrierten Plugins
     *
     * @param {any} [aOption] - optionale Parameter fuer alle Plugins
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     * @memberof PluginManager
     */
    PluginGroup.prototype.startAllPlugin = function (aOption) {
        // console.log('Component.startAllPlugin:', this.getName(), aOption);
        try {
            var result = 0;
            var plugin = this.mPluginList.first();
            while (plugin) {
                // console.log('Component.startAllPlugin:', this.getName(), plugin.getName());
                if (!plugin.isInit() && plugin.init(aOption) !== 0) {
                    result = -1;
                }
                plugin = this.mPluginList.next();
            }
            return result;
        }
        catch (aException) {
            this._exception('startAllPlugin', aException);
            return -1;
        }
    };
    /**
     * stoppt alle registrierten Plugins
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     * @memberof PluginManager
     */
    PluginGroup.prototype.stopAllPlugin = function () {
        // console.log('Component.stopAllPlugin');
        try {
            var result = 0;
            var plugin = this.mPluginList.first();
            while (plugin) {
                if (plugin.done() !== 0) {
                    result = -1;
                }
                plugin = this.mPluginList.next();
            }
            return result;
        }
        catch (aException) {
            this._exception('stopAllPlugin', aException);
            return -1;
        }
    };
    /**
     * setzt Errorausgabe ein/aus fuer alle Plugins
     *
     * @private
     * @param {boolean} aErrorOutputFlag - bestimmt die Ausgabe von Fehlern
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    PluginGroup.prototype._setErrorOutputAllPlugin = function (aErrorOutputFlag) {
        // console.log('Component.setErrorOutputAllPlugin:', this.getName(), aErrorOutputFlag);
        try {
            var plugin = this.mPluginList.first();
            while (plugin) {
                if (aErrorOutputFlag) {
                    plugin.setErrorOutputOn();
                }
                else {
                    plugin.setErrorOutputOff();
                }
                plugin = this.mPluginList.next();
            }
            return 0;
        }
        catch (aException) {
            this._exception('_setErrorOutputAllPlugin', aException);
            return -1;
        }
    };
    return PluginGroup;
}(Plugin));

/** @packageDocumentation
 * Komponente als semantische Einheit fuer Plugins und Klassen.
 *
 * Letzte Aenderung: 15.12.2018
 * Status: gruen
 *
 * @module core/component
 * @author SB
 */
/**
 * Definiert die Basisklasse aller Komponenten
 */
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    /**
     * Creates an instance of Component
     *
     * @param {string} aComponentName - Name der Komponente
     * @param {boolean} aRegisterFlag - wenn true, dann wird Komponente in PluginManager eingetragen
     */
    function Component(aComponentName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var _this = _super.call(this, aComponentName, aRegisterFlag) || this;
        _this.mSendMessageFunc = null;
        // Events
        _this.mInitEvent = new EventFunctionList(SPEECH_INIT_EVENT);
        _this.mErrorEvent = new EventFunctionList(SPEECH_ERROR_EVENT);
        _this.mInitEvent.setComponentName(aComponentName);
        _this.mErrorEvent.setComponentName(aComponentName);
        _this.mInitEvent._setErrorOutputFunc(_this._getErrorOutputFunc());
        _this.mErrorEvent._setErrorOutputFunc(_this._getErrorOutputFunc());
        return _this;
    }
    // Komponenten-Funktionen
    Component.prototype.getType = function () {
        return 'Component';
    };
    Component.prototype.getClass = function () {
        return 'Component';
    };
    Component.prototype.getVersion = function () {
        return SPEECH_API_VERSION;
    };
    /**
     * Initalisiert das Plugin
     *
     * @param {any} [aOption] - optionale Parameter
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    Component.prototype.init = function (aOption) {
        if (_super.prototype.init.call(this, aOption) !== 0) {
            return -1;
        }
        return 0;
    };
    /**
     * Gibt das plugin frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    Component.prototype.done = function () {
        this.mInitEvent.clear();
        this.mErrorEvent.clear();
        return _super.prototype.done.call(this);
    };
    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */
    Component.prototype._setErrorOutput = function (aErrorOutputFlag) {
        _super.prototype._setErrorOutput.call(this, aErrorOutputFlag);
        this.mInitEvent._setErrorOutput(aErrorOutputFlag);
        this.mErrorEvent._setErrorOutput(aErrorOutputFlag);
        this._setErrorOutputAllPlugin(aErrorOutputFlag);
    };
    // Netz-Funktionen
    /**
     * Komponente mit Server verbinden
     *
     * @returns {number} errorCode(0,-1)
     */
    Component.prototype.connect = function () {
        return 0;
    };
    /**
     * Pruefen, ob Komponente erfolgreich mit dem Server verbunden ist
     *
     * @return {boolean} true, erfolgreich verbunden, false sonst.
     */
    Component.prototype.isConnect = function () {
        return true;
    };
    /**
     * Rueckgabe des Typs des Speech-APIs
     *
     * @public
     *
     * @return {string} type des Speech-APIS (web, cordova)
     */
    Component.prototype.getNetType = function () {
        return 'undefined';
    };
    /**
     * EventListener in alle registrierten Plugins eintragen
     *
     * @private
     * @param {string} aPluginName - Name des Plugins, welches eine Eventfunktion eintraegt
     * @param {string} aEventName - Name des Events
     * @param {EventFunc} aEventFunc - Funktion fuer den Event
     *
     * @return {number} errorCode (0,-1) - Fehlercode, ob Event eingetragen wurde oder nicht
     */
    Component.prototype._addEventListenerAllPlugin = function (aPluginName, aEventName, aEventFunc) {
        // console.log('Component.addEventListenerAllPlugin:', this.getName());
        try {
            var result = -1;
            var plugin = this.mPluginList.first();
            while (plugin) {
                // nur Komponenten haben EventListener
                if (plugin instanceof Component) {
                    var component = plugin;
                    // console.log('Component.addEventListenerAllPlugin:', plugin.getName(), component);
                    if (component) {
                        // console.log('Component.addEventAllPlugin:', this.getName(), component.getName());
                        if (component.addEventListener(aPluginName, aEventName, aEventFunc) === 0) {
                            result = 0;
                        }
                    }
                }
                plugin = this.mPluginList.next();
            }
            return result;
        }
        catch (aException) {
            this._exception('addEventListenerAllPlugin', aException);
            return -1;
        }
    };
    /**
     * EventListener aus allen registrierten Plugins entfernen
     *
     * @private
     * @param {string} aPluginName - Name des Plugins, welches eine Eventfunktion eintraegt
     * @param {string} aEventName - Name des Events
     *
     * @return {number} errorCode (0,-1) - Fehlercode, ob ein Event entfernt wurde
     */
    Component.prototype._removeEventListenerAllPlugin = function (aPluginName, aEventName) {
        // console.log('Component.removeEventListenerAllPlugin:', this.getName());
        try {
            var result = -1;
            var plugin = this.mPluginList.first();
            while (plugin) {
                // nur Komponenten haben EventListener
                if (plugin instanceof Component) {
                    var component = plugin;
                    // console.log('Component.removeEventListenerAllPlugin:', plugin.getName(), component);
                    if (component) {
                        // console.log('Component.removeEventAllPlugin:', this.getName(), component.getName());
                        if (component.removeEventListener(aPluginName, aEventName) === 0) {
                            result = 0;
                        }
                    }
                }
                plugin = this.mPluginList.next();
            }
            return result;
        }
        catch (aException) {
            this._exception('removeEventListenerAllPlugin', aException);
            return -1;
        }
    };
    // Bindungs-Funktionen
    /**
     * Eintragen der externen SendMessage-Funktion
     *
     * @param {SpeechSendMessageFunc} aSendMessageFunc
     * @memberof SpeechListen
     */
    Component.prototype.setSendMessageFunc = function (aSendMessageFunc) {
        this.mSendMessageFunc = aSendMessageFunc;
        return 0;
    };
    // Nachrichten-Funktionen
    /**
     * Senden einer Nachricht
     *
     * @param {SpeechMessageInterface} aMessage
     * @return {number}
     */
    Component.prototype.sendMessage = function (aMessage) {
        if (typeof this.mSendMessageFunc !== 'function') {
            return -1;
        }
        return this.mSendMessageFunc(aMessage);
    };
    /**
     * Behandelt alle empfangenen Nachrichten
     *
     * @param {SpeechMessageInterface} aMessage - Nachrichtenpaket
     * @return {number} errorCode(0,-1)
     */
    Component.prototype.handleMessage = function (aMessage) {
        try {
            var result = 0;
            switch (aMessage.event) {
                case SPEECH_INIT_EVENT:
                    // console.log('Component.handleMessage: error event');
                    result = this.mInitEvent.dispatch(aMessage);
                    break;
                case SPEECH_ERROR_EVENT:
                    // console.log('Component.handleMessage: error event');
                    result = this.mErrorEvent.dispatch(aMessage);
                    break;
                default:
                    this._error('handleMessage', 'ungueltige Nachricht: ' + aMessage.event);
                    result = -1;
                    break;
            }
            return result;
        }
        catch (aException) {
            this._exception('handleMessage', aException);
            return -1;
        }
    };
    // Event-Funktionen
    /*
     * Kommentar:
     *
     * Generische Eventfunktions-API dient der Verbindung der Kompnenten
     * untereinander ueber Ereignisfunktionen.
     */
    /**
     * Ereignisfunktion fuer Sprachausgabe gestoppt
     *
     * @private
     * @return {number} errorCode(0,-1)
     */
    Component.prototype._onInit = function () {
        // console.log('Component._onInit:', this.getName());
        return this.mInitEvent.dispatch(this.getName());
    };
    Object.defineProperty(Component.prototype, "onInit", {
        get: function () {
            var _this = this;
            return function () { return _this._onInit(); };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Ereignisfunktion fuer Sprachausgabe gestoppt
     *
     * @private
     * @return {number} errorCode(0,-1)
     */
    Component.prototype._onError = function (aError) {
        // console.log('Component._onError:', this.getName(), aError.message);
        return this.mErrorEvent.dispatch(aError);
    };
    Object.defineProperty(Component.prototype, "onError", {
        get: function () {
            var _this = this;
            return function (aError) { return _this._onError(aError); };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * EventFunktion eintragen
     *
     * @param {string} aPluginName - Name des Listeners
     * @param {string} aEventName - Name des Events
     * @param {EventFunc} aEventFunc - Funktion fuer den Event
     *
     * @return {number} errorcode(0,-1)
     */
    Component.prototype.addEventListener = function (aPluginName, aEventName, aEventFunc) {
        var result = 0;
        switch (aEventName) {
            case SPEECH_INIT_EVENT:
                // console.log('Component.addEventListener: init event');
                result = this.mInitEvent.addListener(aPluginName, aEventFunc);
                break;
            case SPEECH_ERROR_EVENT:
                // console.log('Component.addEventListener: error event');
                this._addEventListenerAllPlugin(aPluginName, aEventName, aEventFunc);
                result = this.mErrorEvent.addListener(aPluginName, aEventFunc);
                break;
            default:
                // in alle Unterkomponenten den Event eintragen, wenn moeglich
                result = this._addEventListenerAllPlugin(aPluginName, aEventName, aEventFunc);
                break;
        }
        return result;
    };
    /**
     * EventFunktion entfernen
     *
     * @param {string} aPluginName - Name des Listeners (Pluginname)
     * @param {string} aEventName - Name des Events
     */
    Component.prototype.removeEventListener = function (aPluginName, aEventName) {
        var result = 0;
        switch (aEventName) {
            case SPEECH_INIT_EVENT:
                result = this.mInitEvent.removeListener(aPluginName);
                break;
            case SPEECH_ERROR_EVENT:
                this._removeEventListenerAllPlugin(aPluginName, aEventName);
                result = this.mErrorEvent.removeListener(aPluginName);
                break;
            default:
                result = this._removeEventListenerAllPlugin(aPluginName, aEventName);
                break;
        }
        return result;
    };
    return Component;
}(PluginGroup));

/** @packageDocumentation
 * Plugin Fabrik zur Erzeugung von Plugins
 *
 * Letzte Aenderung: 08.10.2018
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */
/**
 * Implementiert die Plugin Fabrik
 *
 * @export
 * @class PluginFactory
 * @implements {PluginFactoryInterface}
 */
var PluginFactory = /** @class */ (function (_super) {
    __extends(PluginFactory, _super);
    /**
     * Creates an instance of PluginFactory.
     *
     * @param {string} aFactoryName - Name der Fabrik
     */
    function PluginFactory(aFactoryName) {
        return _super.call(this, aFactoryName || 'PluginFactory') || this;
    }
    PluginFactory.prototype.getType = function () {
        return 'Plugin';
    };
    /**
     * Name der PluginFactory zurueckgeben
     *
     * @return {string} factoryName
     */
    PluginFactory.prototype.getName = function () {
        return 'PluginFactory';
    };
    // Plugin-Funktionen
    PluginFactory.prototype._newPlugin = function (aPluginName, aRegisterFlag) {
        return new Plugin(aPluginName, aRegisterFlag);
    };
    /**
     * Erzeugt ein neues Plugin
     *
     * @param {string} [aPluginName] - Name des Plugins
     *
     * @return {PluginInterface} plugin - Instanz des Plugins
     */
    PluginFactory.prototype.create = function (aPluginName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var pluginName = aPluginName || 'Plugin';
        try {
            return this._newPlugin(pluginName, aRegisterFlag);
        }
        catch (aException) {
            this._exception('PluginFactory.create', aException);
            return null;
        }
    };
    return PluginFactory;
}(Factory));

/** @packageDocumentation
 * PortFactory zur Erzeugung von Ports
 *
 * Letzte Aenderung: 15.12.2018
 * Status: rot
 *
 * @module core/port
 * @author SB
 */
/**
 * Implementiert die Port Fabrik
 *
 * @export
 * @class PortFactory
 * @implements {PortFactoryInterface}
 */
var PortFactory = /** @class */ (function (_super) {
    __extends(PortFactory, _super);
    /**
     * Creates an instance of PortFactory.
     *
     * @param {string} aFactoryName - Name der Fabrik
     */
    function PortFactory(aFactoryName) {
        return _super.call(this, aFactoryName || 'PortFactory') || this;
    }
    PortFactory.prototype.getType = function () {
        return 'Port';
    };
    /**
     * Name der PluginFactory zurueckgeben
     *
     * @return {string} factoryName
     */
    PortFactory.prototype.getName = function () {
        return 'PortFactory';
    };
    // Port-Funktionen
    PortFactory.prototype._newPort = function (aPortName, aRegisterFlag) {
        return new Port(aPortName, aRegisterFlag);
    };
    /**
     * Erzeugt ein neuen Port
     *
     * @param {string} [aPortName] - Name des Ports
     *
     * @return {PortInterface} plugin - Instanz des Ports
     */
    PortFactory.prototype.create = function (aPortName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var portName = aPortName || 'Port';
        try {
            return this._newPort(portName, aRegisterFlag);
        }
        catch (aException) {
            this._exception('PortFactory.create', aException);
            return null;
        }
    };
    return PortFactory;
}(Factory));

/** @packageDocumentation
 * Event-Klasse fuer alle Port-Transaktionen
 *
 * Letzte Aenderung: 30.05.2020
 * Status: rot
 *
 * @module core/port
 * @author SB
 */
var PortTransaction = /** @class */ (function () {
    function PortTransaction(aPluginName, aType) {
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
        PortTransaction.mTransactionCounter += 1;
        this.transactionId = PortTransaction.mTransactionCounter;
    }
    PortTransaction.mTransactionCounter = 0;
    return PortTransaction;
}());

/** @packageDocumentation
 * AmazonMock zum Testen des Amazon Cloud-Service mit dem Framework
 *
 * Letzte Aenderung: 01.06.2020
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
                this.mTransaction = new PortTransaction(aPluginName, AMAZON_NLU_ACTION);
                result = this._startNLU(this.mTransaction, option.text, option.language || AMAZON_DEFAULT_LANGUAGE);
                break;
            case AMAZON_ASRNLU_ACTION:
                this.mTransaction = new PortTransaction(aPluginName, AMAZON_ASRNLU_ACTION);
                result = this._startASR(this.mTransaction, option.language || AMAZON_DEFAULT_LANGUAGE, option.audioURL || '', true, option.useProgressive || false);
                break;
            case AMAZON_ASR_ACTION:
                this.mTransaction = new PortTransaction(aPluginName, AMAZON_ASR_ACTION);
                result = this._startASR(this.mTransaction, option.language || AMAZON_DEFAULT_LANGUAGE, option.audioURL || '', false, option.useProgressive || false);
                break;
            case AMAZON_TTS_ACTION:
                this.mTransaction = new PortTransaction(aPluginName, AMAZON_TTS_ACTION);
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
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
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
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
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
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
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
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
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
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
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
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
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

/** @packageDocumentation
 * AudioCodec fuer Encode/Decode PCM
 *
 * Zur Zeit wird nur PCM-Codec unterstuetzt.
 *
 * Letzte Aenderung: 30.05.2020
 * Status: rot
 *
 * @module common/audio
 * @author SB
 */
// Konstanten
var PCM_L16CodecArray = ['audio/L16;rate=8000', 'audio/L16;rate=16000'];
var OpusCodecArray = ['audio/opus;rate=8000', 'audio/opus;rate=16000'];
/**
 * Klasse AudioCodec zur Codierung/Decodierung von Audiodaten
 */
var AudioCodec = /** @class */ (function (_super) {
    __extends(AudioCodec, _super);
    function AudioCodec() {
        return _super.call(this, 'AudioCodec') || this;
    }
    // Codec-Funktionen
    /**
     * Codec pruefen
     *
     * @private
     * @param {string} aCodec - zu pruefender Codec
     * @param {string[]} aCodecArray - Codec-Array
     */
    AudioCodec.prototype._findCodec = function (aCodec, aCodecArray) {
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
    AudioCodec.prototype.findPcmCodec = function (aCodec) {
        return this._findCodec(aCodec, PCM_L16CodecArray);
    };
    /**
     * Pruefen auf Opus-Codec
     *
     * @param {string} aCodec - zu pruefender codec
     */
    AudioCodec.prototype.findOpusCodec = function (aCodec) {
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
    AudioCodec.prototype._float32ToInt16 = function (aFloat32) {
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
    AudioCodec.prototype._float32ArrayToInt16Array = function (aFloat32Array) {
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
    AudioCodec.prototype.encodePCM = function (aFrame, aCodec) {
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
     * Umwandlung von UInt8-Array nach Int16 nach Float32-Array
     *
     * Poly liefert ein UInt8-Array als PCM, welches umgewandelt werden muss.
     *
     * @param {*} aAudioData - umzuwandelnde Audiodaten
     */
    AudioCodec.prototype.decodePCM = function (aAudioData) {
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
    /**
     * Umwandlung von Int16-Array nach Float32-Array
     *
     * @param {*} aAudioData - umzuwandelnde Audiodaten
     */
    AudioCodec.prototype.decodePCMInt16 = function (aAudioData) {
        try {
            var pcm16Buffer = new Int16Array(aAudioData);
            var pcm16BufferLength = pcm16Buffer.length;
            var outputArray = new Float32Array(pcm16BufferLength);
            // console.log( 'GoogleAudioCodec.decodePCM: puffer = ', pcm16Buffer);
            // console.log( 'GoogleAudioCodec.decodePCM: laenge = ', pcm16BufferLength);
            var i = 0;
            for (; i < pcm16BufferLength; ++i) {
                outputArray[i] = pcm16Buffer[i] / 32768;
            }
            // console.log('GoogleAudioCodec.decodePCM: Float32 = ', outputArray);
            return outputArray;
        }
        catch (aException) {
            console.log('GoogleAudioCodec.decodePCM: Exception', aException);
            this._exception('decodePCM', aException);
            return [];
        }
    };
    return AudioCodec;
}(ErrorBase));

/** @packageDocumentation
 * externe Resampler-Klasse
 *
 * Letzte Aenderung: 30.05.2020
 * Status: rot
 *
 * @module common/audio
 * @author SB
 */
// JavaScript Audio Resampler (c) 2011 - Grant Galitz
// https://github.com/taisel/XAudioJS/blob/master/resampler.js
var AudioResampler = /** @class */ (function () {
    function AudioResampler(fromSampleRate, toSampleRate, channels, outputBufferSize, noReturn) {
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
    AudioResampler.prototype.initialize = function () {
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
    AudioResampler.prototype.compileInterpolationFunction = function () {
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
    AudioResampler.prototype.bypassResampler = function (buffer) {
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
    AudioResampler.prototype.bufferSlice = function (sliceAmount) {
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
    AudioResampler.prototype.initializeBuffers = function (generateTailCache) {
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
    return AudioResampler;
}());

/** @packageDocumentation
 * AudioPlayer fuer Abspielen von Sprachdaten
 *
 * Zur Zeit wird nur PCM-Codec unterstuetzt.
 *
 * Letzte Aenderung: 30.05.2020
 * Status: rot
 *
 * @module common/audio
 * @author SB
 */
// Minimum-Samplerate fuer Safari
var AUDIO_MIN_SAMPLERATE = 22500;
var AUDIO_DEFAULT_SAMPLERATE = 16000;
/**
 * Klasse AudioPlayer zum Absielen des Audiostreams
 */
var AudioPlayer = /** @class */ (function (_super) {
    __extends(AudioPlayer, _super);
    // mOpusDecoder = null;
    /**
     * Konstruktor
     *
     * @param aAudioContext - globaler AudioContext
     */
    function AudioPlayer(aAudioContext) {
        var _this = _super.call(this, 'AudioPlayer') || this;
        _this.mAudioContext = null;
        _this.mAudioCodec = null;
        _this.mResampler = null;
        _this.mOnAudioStartFunc = null;
        _this.mOnAudioStopFunc = null;
        _this.mOnAudioEndFunc = null;
        _this.mAudioSource = null;
        _this.mAudioArray = [];
        _this.mQueue = [];
        _this.mBeginSpeakFlag = true;
        _this.mAudioStopFlag = false;
        _this.mAudioBuffer = null;
        _this.mSource = null;
        _this.mAudioContext = aAudioContext;
        // TODO: wird hier erst mal temporaer eingefuegt. Muss spaeter einmal uebergeben werden
        _this.mAudioCodec = new AudioCodec();
        return _this;
    }
    /**
     * Start-Event fuer Audio
     */
    AudioPlayer.prototype._onAudioStart = function () {
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
    AudioPlayer.prototype._onAudioStop = function () {
        if (this.mOnAudioStopFunc) {
            try {
                this.mOnAudioStopFunc();
            }
            catch (aException) {
                this._exception('_onAudioStop', aException);
            }
        }
    };
    Object.defineProperty(AudioPlayer.prototype, "onAudioStart", {
        set: function (aAudioStartFunc) {
            this.mOnAudioStartFunc = aAudioStartFunc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioPlayer.prototype, "onAudioStop", {
        set: function (aAudioStopFunc) {
            this.mOnAudioStopFunc = aAudioStopFunc;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Start der Wiedergabe
     */
    AudioPlayer.prototype.start = function () {
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
    AudioPlayer.prototype._getAudioBufferFirst = function (aData) {
        var audioBuffer = null;
        // fuer die meisten aktuellen Browser mit AudioBuffer Constructor 
        try {
            var audioToPlay = new Float32Array(aData.length);
            audioToPlay.set(aData);
            // console.log('AudioPlayer.playByStream: buffer direkt erzeugen:', audioToPlay.length);
            audioBuffer = new AudioBuffer({ length: audioToPlay.length, numberOfChannels: 1, sampleRate: AUDIO_DEFAULT_SAMPLERATE });
            audioBuffer.getChannelData(0).set(audioToPlay);
        }
        catch (aException) {
            audioBuffer = null;
            console.log('AudioPlayer._getAudioBufferFirst: Exception', aException);
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
    AudioPlayer.prototype._getAudioBufferSecond = function (aData) {
        var audioBuffer = null;
        // fuer die Browser ohne AudioBuffer Constructor
        try {
            var audioToPlay = new Float32Array(aData.length);
            audioToPlay.set(aData);
            // console.log('AudioPlayer.playByStream: buffer erzeugen mit 16000 Samplerate:', audioToPlay.length);
            audioBuffer = this.mAudioContext.createBuffer(1, audioToPlay.length, AUDIO_DEFAULT_SAMPLERATE);
            audioBuffer.getChannelData(0).set(audioToPlay);
        }
        catch (aException) {
            audioBuffer = null;
            console.log('AudioPlayer._getAudioBufferSecond: Exception', aException);
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
    AudioPlayer.prototype._getAudioBufferResample = function (aData) {
        var audioBuffer = null;
        // Fuer Safari wird eine hoehere SampleRate als 16000 benoetigt, da createBuffer sonst nicht funktioniert
        // hier wird der Resampler eingesetzt
        try {
            // notwendig ist ein groesseres FloatArray 22500/16000 = 1.4 
            var audioToPlay = new Float32Array(aData.length * 1.4);
            audioToPlay.set(aData);
            // Resampler, um die Frequenz des AudioBuffers anzuheben auf 22500 Hz fuer Safari
            this.mResampler = new AudioResampler(AUDIO_DEFAULT_SAMPLERATE, AUDIO_MIN_SAMPLERATE, 1, audioToPlay.length, undefined);
            var _audioToPlay = this.mResampler.resampler(audioToPlay);
            // console.log('AudioPlayer.playByStream: buffer erzeugen mit 22500 Samplerate:', _audioToPlay.length);
            audioBuffer = this.mAudioContext.createBuffer(1, _audioToPlay.length, AUDIO_MIN_SAMPLERATE);
            audioBuffer.getChannelData(0).set(_audioToPlay);
        }
        catch (aException) {
            audioBuffer = null;
            console.log('AudioPlayer._getAudioBufferResample: Exception', aException);
        }
        return audioBuffer;
    };
    // Player-Funktionen
    /** old Function
     * Abspielen des Audiostreams
     *
     * @param {*} aOptions - Optionen
     * @param {*} aAudioArray - Audiostream
     */
    AudioPlayer.prototype.playByStreamOld = function (aOptions, aAudioArray) {
        var _this = this;
        try {
            if (!this.mAudioContext) {
                console.log('AudioPlayer.playByStream: kein AudioContext vorhanden');
                return;
            }
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
            // console.log('AudioPlayer.playByStream: AudioContext.state = ', this.mAudioContext.state);
            this.mAudioSource = this.mAudioContext.createBufferSource();
            // TODO: falls mehrere Stream-Abschnitte verwendet werden
            this.mAudioSource.onended = function () { return _this.playByStreamOld(aOptions, aAudioArray); };
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
            // console.log('AudioPlayer.playByStream: audio start', this.mAudioSource);
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
            console.log('AudioPlayer.playByStream: Exception', aException);
            this._exception('playByStream', aException);
        }
    };
    /**
     * Abspielen des Audiostreams
     *
     * @param {*} aAudioArray - Audiostream
     */
    AudioPlayer.prototype.playByStream = function (aAudioArray) {
        var _this = this;
        try {
            if (!this.mAudioContext) {
                console.log('AudioPlayer.playByStream: kein AudioContext vorhanden');
                return;
            }
            // console.log('AudioPlayer.playByStream: start');
            if (aAudioArray.length === 0 || this.mAudioStopFlag) {
                this.mBeginSpeakFlag = true;
                this._onAudioStop();
                this.mAudioSource = null;
                return;
            }
            // console.log('AudioPlayer.playByStream: AudioContext.state = ', this.mAudioContext.state);
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
            // console.log('AudioPlayer.playByStream: audio start', this.mAudioSource);
            if (this.mAudioSource.start) {
                this.mAudioSource.start(0);
            }
            else {
                this.mAudioSource.noteOn(0);
            }
            this._onAudioStart();
            // console.log('AudioPlayer.playByStream: end');
        }
        catch (aException) {
            this.mBeginSpeakFlag = true;
            this._onAudioStop();
            this.mAudioSource = null;
            // console.log('AudioPlayer.playByStream: Exception', aException);
            this._exception('playByStream', aException);
        }
    };
    /**
     * Audiodaten abspielen
     *
     * @param aOptions - optionale Parameter (codec, onaudiostart)
     * @param aAudioData - abzuspielende Audiodaten
     */
    AudioPlayer.prototype.decodeOld = function (aOptions, aAudioData) {
        try {
            // console.log('NuanceConnect.connect: object');
            if (this.mAudioCodec.findPcmCodec(aOptions.codec)) {
                var decodePCM16KData = this.mAudioCodec.decodePCM(aAudioData);
                this.mAudioArray.push(decodePCM16KData);
                this.mQueue.push(decodePCM16KData);
                // console.log('NuanceConnect.connect: PCM AudioSink', this.mBeginSpeakFlag);
                if (this.mBeginSpeakFlag) {
                    this.mBeginSpeakFlag = false;
                    this.playByStreamOld(aOptions, this.mAudioArray);
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
     * Audiodaten abspielen
     *
     * @param aOptions - optionale Parameter (codec)
     * @param aAudioData - abzuspielende Audiodaten
     */
    AudioPlayer.prototype.decode = function (aOptions, aAudioData) {
        try {
            // console.log('AudioPlayer.decode: start');
            if (this.mAudioCodec.findPcmCodec(aOptions.codec)) {
                var decodePCM16KData = this.mAudioCodec.decodePCM(aAudioData);
                this.mAudioArray.push(decodePCM16KData);
                this.mQueue.push(decodePCM16KData);
                // console.log('AudioPlayer.decode: end');
                // console.log('AudioPlayer.decode: PCM AudioSink', this.mBeginSpeakFlag);
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
     * Dekodieren der Audiodaten (MP3)
     *
     * @private
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    AudioPlayer.prototype.decodeAudio = function (aOptions, aData) {
        var _this = this;
        if (!this.mAudioContext) {
            this._error('_decodeAudio', 'kein AudioContext vorhanden');
            return -1;
        }
        try {
            this.mAudioContext.decodeAudioData(aData, function (aBuffer) {
                // console.log('AudioPlayer._decodeAudio: decodeAudioData start', aBuffer);
                _this.mAudioBuffer = aBuffer;
                _this._playStart(aOptions);
                // console.log('AudioPlayer._decodeAudio: decodeAudioData end');
            }, function (aError) {
                // TODO: muss in Fehlerbehandlung uebertragen werden
                // console.log('AudioPlayer._decodeAudio:', aError);
                _this._error('_decodeAudio', 'DOMException');
            });
            return 0;
        }
        catch (aException) {
            this._exception('_decodeAudio', aException);
            return -1;
        }
    };
    /**
     * Start der Audioausgabe
     *
     * @private
     * @return {number} errorCode (0,-1) - Fehlercode
     */
    AudioPlayer.prototype._playStart = function (aOptions) {
        // console.log('AudioPlayer._playStart:', aOptions);
        if (!this.mAudioBuffer) {
            this._error('_playStart', 'kein AudioBuffer vorhanden');
            return -1;
        }
        if (!this.mAudioContext) {
            this._error('_playStart', 'kein AudioContext vorhanden');
            return -1;
        }
        // Create two sources and play them both together.
        try {
            this.mSource = this.mAudioContext.createBufferSource();
            // Ende-Event
            this.mSource.onended = function () {
                // TODO: hier muss ein Ende-Event fuer Audio-Ende eingebaut werden
                // console.log('AudioPlayer._playStart: onended');
                // Audio Stop-Ereignis senden
                if (aOptions.onaudioend) {
                    aOptions.onaudioend();
                }
            };
            this.mSource.buffer = this.mAudioBuffer;
            this.mSource.connect(this.mAudioContext.destination);
            // console.log('AudioPlayer._playStart: ', this.mSource, this.mAudioContext.state);
            if (this.mSource.start) {
                this.mSource.start(0);
            }
            else {
                this.mSource.noteOn(0);
            }
            // Audio Start-Ereignis senden
            if (aOptions.onaudiostart) {
                aOptions.onaudiostart();
            }
            return 0;
        }
        catch (aException) {
            this._exception('_playStart', aException);
            return -1;
        }
    };
    /**
     * Audioausgabe stoppen
     */
    AudioPlayer.prototype.stopOld = function () {
        try {
            // console.log('NuanceAudioSink.stop');
            this.mAudioStopFlag = true;
            if (this.mAudioSource) {
                this.mAudioSource.stop(0);
                this.mAudioSource.disconnect(0);
                if (typeof this.mOnAudioEndFunc === 'function') {
                    // console.log( 'AudioPlayer.stop: send onended event' );
                    this.mOnAudioEndFunc();
                }
            }
        }
        catch (aException) {
            this._exception('stop', aException);
        }
        this.mAudioSource = null;
    };
    /**
     * Audioausgabe stoppen
     */
    AudioPlayer.prototype.stop = function () {
        try {
            // console.log('AudioPlayer.stop');
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
    AudioPlayer.prototype.stopAudio = function () {
        // console.log('AudioPlayer.stopAudio');
        if (this.mSource) {
            try {
                if (this.mSource.stop) {
                    this.mSource.stop(0);
                }
                else {
                    this.mSource.noteOff(0);
                }
                this.mSource.disconnect(0);
            }
            catch (aException) {
                this._exception('stop', aException);
            }
            this.mSource = null;
            this.mAudioBuffer = null;
        }
    };
    return AudioPlayer;
}(ErrorBase));

/** @packageDocumentation
 * AudioRecorder, sendet Audiostream vom Mikrophon
 *
 * Zur Zeit wird nur PCM-Codec unterstuetzt.
 *
 * Letzte Aenderung: 23.06.2020
 * Status: rot
 *
 * @module common/audio
 * @author SB
 */
// Konstanten
var AUDIO_PCM_CODEC = 'audio/L16;rate=16000';
var AUDIO_DEFAULT_CODEC = AUDIO_PCM_CODEC;
var AUDIO_BUFFER_SIZE = 2048;
var AUDIO_DEFAULT_SAMPLERATE$1 = 16000;
/**
 * Klasse AudioRecorder zum Aufnehmen von Audiodaten und streamen
 */
var AudioRecorder = /** @class */ (function (_super) {
    __extends(AudioRecorder, _super);
    /**
     * Konstruktor
     *
     * @param {WebSocket} aWebSocket - WebSocket-Objekt oder null
     * @param {AudioContext} aAudioContext - AudioContext-Objekt
     * @param {(aVolumeData) => void} aVolumeCallback - Callback-Funktion
     */
    function AudioRecorder(aWebSocket, aAudioContext, aVolumeCallback) {
        var _this = _super.call(this, 'AudioRecorder') || this;
        // Komponenten
        _this.mWebSocket = null;
        _this.mAudioContext = null;
        _this.mAudioCodec = null;
        _this.mResampler = null;
        // FLag fuer eigenen Server an der WebSocket
        _this.mServerFlag = false;
        // Audio-Paramter
        _this.mBufferSize = AUDIO_BUFFER_SIZE;
        _this.mSampleRate = AUDIO_DEFAULT_SAMPLERATE$1; // 16k up to server
        _this.mCodec = AUDIO_DEFAULT_CODEC;
        // Audio-Knoten
        _this.mAudioInputNode = null;
        _this.mAnalyseNode = null;
        _this.mRecordingNode = null;
        // Audio-Daten
        _this.mUserMediaStream = null;
        _this.mChannelDataList = [];
        _this.mBytesRecorded = 0;
        _this.mRecordingFlag = false;
        // Event-Funktionen
        _this.mOnVolumeFunc = null;
        _this.mOnEndedFunc = null;
        _this.mOnMicrophoneStartFunc = null;
        _this.mOnMicrophoneStopFunc = null;
        _this.mWebSocket = aWebSocket;
        _this.mAudioContext = aAudioContext;
        _this.mOnVolumeFunc = aVolumeCallback;
        // TODO: wird hier erst mal temporaer eingefuegt. Muss spaeter einmal uebergeben werden
        _this.mAudioCodec = new AudioCodec();
        /****
        if ($("#codec").val() === "audio/L16;rate=8000" || $("#codec").val() === "audio/opus;rate=8000") {
            mSampleRate = 8000;
        }
        ****/
        try {
            _this.mResampler = new AudioResampler(_this.mAudioContext.sampleRate, _this.mSampleRate, 1, _this.mBufferSize, undefined);
        }
        catch (aException) {
            // console.log('AudioRecorder: Exception', aException.message);
            _this._exception('constructor', aException);
            // Exception wird geworfen, da AudioRecorder nicht funktionsfaehig ist !
            throw new Error('AudioRecorder nicht initialisiert');
        }
        return _this;
        // this.opusEncoderSetup( this.mSampleRate );
    }
    /**
     * Setzen, ob eigener Server an WebSocket oder nicht
     *
     * @param aServerFlag - true, wenn eigener Server an WebSocket, sonst false
     */
    AudioRecorder.prototype.setServer = function (aServerFlag) {
        this.mServerFlag = aServerFlag;
    };
    // Recorder-Funktionen
    /**
     * Hier wird der MediaStream wieder geschlossen, damit das Mikrofon-Symbol
     * im Browser wieder verschwindet.
     *
     * @private
     */
    AudioRecorder.prototype._closeMediaStream = function () {
        try {
            // Schliessen des MediaStreams
            if (this.mUserMediaStream) {
                // pruefen, ob Tracks vorhanden sind
                if (this.mUserMediaStream.getAudioTracks) {
                    var trackList = this.mUserMediaStream.getAudioTracks();
                    // console.log('AudioRecorder.start: Tracks = ', trackList);
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
            // console.log('AudioRecorder._closeMediaStream: Exception', aException);
            this._exception('_closeMediaStream', aException);
        }
        this.mUserMediaStream = null;
    };
    AudioRecorder.prototype.getAudioData = function (aDataList) {
        // console.log('GoogleAudioRecorder2.getAudioData', aDataList);
        // pruefen auf Gesamtanzahl aller Bytes
        var count = 0;
        for (var _i = 0, aDataList_1 = aDataList; _i < aDataList_1.length; _i++) {
            var array = aDataList_1[_i];
            count += array.length;
        }
        // Arraybuffer mit Gesamtanzahl der Bytes erzeugen
        var typedArray = new Int16Array(count);
        var index = 0;
        for (var _a = 0, aDataList_2 = aDataList; _a < aDataList_2.length; _a++) {
            var array = aDataList_2[_a];
            for (var i = 0; i < array.length; i++) {
                typedArray[index] = array[i];
                index++;
            }
        }
        // Buffer zurueckgeben
        return typedArray.buffer;
    };
    /**
     * Hier wird der Ende-Handler ausgefuehrt
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */
    AudioRecorder.prototype._onEnded = function () {
        // console.log('AudioRecorder._onEnded:', this.mOnEndedFunc);
        // Verarbeiten der Daten zu einem ArrayBuffer
        var buffer = this.getAudioData(this.mChannelDataList);
        if (typeof this.mOnEndedFunc === 'function') {
            try {
                this.mOnEndedFunc(buffer);
            }
            catch (aException) {
                // console.log('AudioRecorder._onEnded: Exception', aException);
                this._exception('_onEnded', aException);
                return -1;
            }
        }
        return 0;
    };
    /**
     * Hier wird der Microphone Start-Handler ausgefuehrt
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */
    AudioRecorder.prototype._onMicrophoneStart = function () {
        // console.log('AudioRecorder._onMicrophoneStart:', this.mOnMicrophoneStartFunc);
        if (typeof this.mOnMicrophoneStartFunc === 'function') {
            try {
                this.mOnMicrophoneStartFunc();
            }
            catch (aException) {
                // console.log('AudioRecorder._onMicrophoneStart: Exception', aException);
                this._exception('_onMicrophoneStart', aException);
                return -1;
            }
        }
        return 0;
    };
    /**
     * Hier wird der Microphone Start-Handler ausgefuehrt
     *
     * @private
     * @return {number} Fehlercode 0 oder -1
     */
    AudioRecorder.prototype._onMicrophoneStop = function () {
        // console.log('AudioRecorder._onMicrophoneStop:', this.mOnMicrophoneStopFunc);
        if (typeof this.mOnMicrophoneStopFunc === 'function') {
            try {
                this.mOnMicrophoneStopFunc();
            }
            catch (aException) {
                // console.log('AudioRecorder._onMicrophoneStop: Exception', aException);
                this._exception('_onMicrophoneStop', aException);
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
    AudioRecorder.prototype._onVolume = function (aVolumeData) {
        // console.log('AudioRecorder._onVolume:', aVolumeData);
        if (typeof this.mOnVolumeFunc === 'function') {
            try {
                this.mOnVolumeFunc(aVolumeData);
            }
            catch (aException) {
                // console.log('AudioRecorder._onVolume: Exception', aException);
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
    AudioRecorder.prototype._onAudioProcess = function (aEvent) {
        var _this = this;
        // console.log('AudioRecorder._onAudioProcess: ', this.mRecordingFlag, aEvent);
        try {
            // Audioprozess beenden
            if (!this.mRecordingFlag) {
                this.mAudioInputNode.disconnect(this.mAnalyseNode);
                this.mAnalyseNode.disconnect(this.mRecordingNode);
                this.mRecordingNode.disconnect(this.mAudioContext.destination);
                this._closeMediaStream();
                this._onMicrophoneStop();
                this._onEnded();
                // Nachricht an eigenen Server, um Streaming zu beenden
                if (this.mWebSocket && this.mServerFlag) {
                    this.mWebSocket.send(JSON.stringify({ event: 'googleASRAudioStop' }));
                }
                // console.log('AudioRecorder._onAudioProcess: disconnect');
                // TODO: hier sollte ein Event fuer das ausgeschaltete Mikrofon hin
                return;
            }
            // Audiodaten sammeln
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
                    // console.log('AudioRecorder._onAudioProcess:', typedArray);
                    // TODO: hier muessen die Daten zu einem einzigen Array gesammelt werden
                    // Daten senden ueber WebSocket
                    if (_this.mWebSocket) {
                        _this.mWebSocket.send(typedArray.buffer);
                    }
                    _this.mChannelDataList.push(typedArray);
                });
            }
            else {
                // andere Codec sind nicht implementiert
                this._error('_onAudioProcess', 'Codec nicht implementiert');
            }
            if (this.mServerFlag) {
                // TODO: muss neu entwickelt werden, um Recording-Stop zu finden
                // this._onVolume( ampArray );
            }
            else {
                this._onVolume(ampArray);
            }
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
    AudioRecorder.prototype.start = function (aUserMediaStream, aCodec) {
        var _this = this;
        // console.log('AudioRecorder.start: start', aUserMediaStream, aCodec);
        this.mRecordingFlag = true;
        this.mUserMediaStream = aUserMediaStream;
        this.mCodec = aCodec;
        // Fuer Chrome muss hier mAudioContext.resume() aufgerufen werden, da Chrome das Web-API mit einer Policy versehen hat,
        // nach der nur nach einer User-Aktion das Web-API ausgefuehrt werden kann. Wenn der Context vor einer User-Aktion
        // erzeugt wird, ist er im syspend-Modus und muss mit resume() umgeschaltet werden.
        this.mAudioContext.resume().then(function () {
            // console.log('AudioRecorder.start: resume')
            try {
                // Nachricht an eigenen Server, um mit Streaming zu beginnen
                if (_this.mWebSocket && _this.mServerFlag) {
                    _this.mWebSocket.send(JSON.stringify({ event: 'googleASRAudioStart' }));
                }
                _this.mAudioInputNode = _this.mAudioContext.createMediaStreamSource(_this.mUserMediaStream);
                _this.mAnalyseNode = _this.mAudioContext.createAnalyser();
                _this.mRecordingNode = _this.mAudioContext.createScriptProcessor(_this.mBufferSize, 1, 2);
                // Audioprozess-Funktion
                _this.mRecordingNode.onaudioprocess = function (aEvent) { return _this._onAudioProcess(aEvent); };
                // alle Audioknoten miteinander verbinden
                _this.mAudioInputNode.connect(_this.mAnalyseNode);
                _this.mAnalyseNode.connect(_this.mRecordingNode);
                _this.mRecordingNode.connect(_this.mAudioContext.destination);
                // Event fuer das eingeschaltete Mikrofon
                _this._onMicrophoneStart();
            }
            catch (aException) {
                // console.log('AudioRecorder.start: Exception', aException);
                _this._exception('start', aException);
            }
            // console.log('AudioRecorder.start: end');
        }, function (aError) {
            // console.log('AudioRecorder.start: Resume-Error', aError);
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
    AudioRecorder.prototype.startAudio = function (aAudioData, aCodec) {
        // console.log('AudioRecorder.startAudio:', aCodec);
        // TODO: Audiodaten in Bloecke aufteilen und verarbeiten
        // Schleife fuer alle Audiodaten versenden
    };
    /**
     * Stop-Funktion fuer Audioaufnahme
     *
     * @param {() => void} aOnEndedFunc - Handler fuer Ende der Audioaufnahme
     */
    AudioRecorder.prototype.stop = function (aOnEndedFunc) {
        // console.log('AudioRecorder.stop');
        this.mOnEndedFunc = aOnEndedFunc;
        this.mRecordingFlag = false;
    };
    Object.defineProperty(AudioRecorder.prototype, "onMicrophoneStart", {
        // Event-Funktionen
        set: function (aMicrophoneStartFunc) {
            this.mOnMicrophoneStartFunc = aMicrophoneStartFunc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioRecorder.prototype, "onMicrophoneStop", {
        set: function (aMicrophoneStopFunc) {
            this.mOnMicrophoneStopFunc = aMicrophoneStopFunc;
        },
        enumerable: true,
        configurable: true
    });
    return AudioRecorder;
}(ErrorBase));

/** @packageDocumentation
 * Diese Komponente dient als Fabrik zur Erzeugung der SpeechRecognition-Klassen und -Instanzen von Html5
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module common/html5
 * @author SB
 */
// Konstanten
var SPEECHRECOGNITION_FACTORY_NAME = 'SpeechRecognitionFactory';
var SPEECHRECOGNITION_TYPE_NAME = 'SpeechRecognition';
var SPEECHRECOGNITION_GRAMMAR_NAME = 'SpeechGrammar';
/**
 * Diese Klasse kapselt die Pruefung und Erzeugung der HTML5-Spracheingabeklassen
 */
var SpeechRecognitionFactory = /** @class */ (function (_super) {
    __extends(SpeechRecognitionFactory, _super);
    function SpeechRecognitionFactory(aFactoryName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        return _super.call(this, aFactoryName || SPEECHRECOGNITION_FACTORY_NAME, aRegisterFlag) || this;
    }
    SpeechRecognitionFactory.prototype.isMock = function () {
        return false;
    };
    SpeechRecognitionFactory.prototype.getType = function () {
        return SPEECHRECOGNITION_TYPE_NAME;
    };
    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */
    SpeechRecognitionFactory.prototype.getName = function () {
        return SPEECHRECOGNITION_FACTORY_NAME;
    };
    /**
     * Erzeugt ein neues Objket
     *
     * @param {string} aObjectName - Name des Objektes
     * @param {boolean} aRegisterFlag - bestimmt, ob Objekt in einen Manager eingetragen wird
     *
     * @return {any} Instanz des Objektes
     */
    SpeechRecognitionFactory.prototype.create = function (aObjectName, aRegisterFlag) {
        var name = aObjectName || SPEECHRECOGNITION_TYPE_NAME;
        // console.log('SpeechRecognitionFactory.SpeechRecognition:', (window as any).SpeechRecognition);
        try {
            // auslesen der SpeechRecognition-Klassen, wenn vorhanden
            if (name === SPEECHRECOGNITION_TYPE_NAME) {
                // console.log('SpeechRecognitionFactory.create(SpeechRecognition):', (window as any).SpeechRecognition);
                return window.SpeechRecognition || window.webkitSpeechRecognition || null;
            }
            // auslesen der SpeechGrammarList-Klassen, wenn vorhanden
            if (name === SPEECHRECOGNITION_GRAMMAR_NAME) {
                // console.log('SpeechRecognitionFactory.create(SpeechGrammarList):', (window as any).SpeechGrammarList);
                return window.SpeechGrammarList || window.webkitSpeechGrammarList || null;
            }
            return null;
        }
        catch (aException) {
            this._exception('create', aException);
            return null;
        }
    };
    /** @deprecated
     * Feststellen, ob HTML5 SpeechRecognition API vorhanden ist
     *
     * @return {SpeechRecognition} speechRecognitonClass - Rueckgabe der Spracheingabe-Klasse
     */
    SpeechRecognitionFactory.prototype.getSpeechRecognitionClass = function () {
        return this.create();
    };
    /** @deprecated
     * Feststellen, ob HTML5 SpeechGrammarList API vorhanden ist
     *
     * @return {SpeechGrammarList} speechGrammarListClass - Rueckgabe der Grammatiklisten-Klasse
     */
    SpeechRecognitionFactory.prototype.getSpeechGrammarListClass = function () {
        return this.create(SPEECHRECOGNITION_GRAMMAR_NAME);
    };
    return SpeechRecognitionFactory;
}(Factory));

/** @packageDocumentation
 * Diese Komponente dient als Fabrik zur Erzeugung der SpeechSynthesis-Klassen und -Instanzen fuer Html5
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * @module common/html5
 * @author SB
 */
// Konstanten
var SPEECHSYNTHESIS_FACTORY_NAME = 'SpeechSynthesisFactory';
var SPEECHSYNTHESIS_TYPE_NAME = 'SpeechSynthesis';
var SPEECHSYNTHESIS_UTTERANCE_NAME = 'SpeechUtterance';
/**
 * Diese Klasse kapselt die Pruefung und Erzeugung der HTML5-Sprachausgabeklassen
 */
var SpeechSynthesisFactory = /** @class */ (function (_super) {
    __extends(SpeechSynthesisFactory, _super);
    function SpeechSynthesisFactory(aFactoryName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        return _super.call(this, aFactoryName || SPEECHSYNTHESIS_FACTORY_NAME, aRegisterFlag) || this;
    }
    SpeechSynthesisFactory.prototype.isMock = function () {
        return false;
    };
    SpeechSynthesisFactory.prototype.getType = function () {
        return SPEECHSYNTHESIS_TYPE_NAME;
    };
    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */
    SpeechSynthesisFactory.prototype.getName = function () {
        return SPEECHSYNTHESIS_FACTORY_NAME;
    };
    /**
     * Erzeugt ein neues Objekt
     *
     * @param {string} aObjectName - Name des Objektes
     * @param {boolean} aRegisterFlag - bestimmt, ob Objekt in einen Manager eingetragen wird
     *
     * @return {any} Instanz des Objektes
     */
    SpeechSynthesisFactory.prototype.create = function (aObjectName, aRegisterFlag) {
        var name = aObjectName || SPEECHSYNTHESIS_TYPE_NAME;
        // console.log('SpeechRecognitionFactory.SpeechRecognition:', (window as any).SpeechRecognition);
        try {
            if (name === SPEECHSYNTHESIS_TYPE_NAME) {
                return window.speechSynthesis || null;
            }
            if (name === SPEECHSYNTHESIS_UTTERANCE_NAME) {
                return window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance || null;
            }
            return null;
        }
        catch (aException) {
            this._exception('create', aException);
            return null;
        }
    };
    /** @pdeprecated
     * Feststellen, ob HTML5 SpeechSynthesis API vorhanden ist
     *
     * @return {SpeechSynthesis} speechSynthesis - Rueckgabe der Sprachsynthesis Instanz
     */
    SpeechSynthesisFactory.prototype.getSpeechSynthesis = function () {
        return this.create();
    };
    /** @deprecated
     * Feststellen, ob HTML5 SpeechSynthesisUtterance API vorhanden ist
     *
     * @return {SpeechSynthesisUtterance} speechSynthesisUtteranceClass - Rueckgabe der Sprachausgabe-Klasse
     */
    SpeechSynthesisFactory.prototype.getSpeechSynthesisUtteranceClass = function () {
        return this.create(SPEECHSYNTHESIS_UTTERANCE_NAME);
    };
    return SpeechSynthesisFactory;
}(Factory));

/** @packageDocumentation
 * Diese Komponente dient als Fabrik zur Erzeugung der Html5 WebSocket-Klasse und -Instanz
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module common/html5
 * @author SB
 */
// Konstanten
var WEBSOCKET_FACTORY_NAME = 'WebSocketFactory';
var WEBSOCKET_TYPE_NAME = 'WebSocket';
/**
 * Die WebSocketFactory Klasse kapselt die Pruefung und Erzeugung der HTML5-WebSocket
 */
var WebSocketFactory = /** @class */ (function (_super) {
    __extends(WebSocketFactory, _super);
    function WebSocketFactory(aFactoryName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        return _super.call(this, aFactoryName || WEBSOCKET_FACTORY_NAME, aRegisterFlag) || this;
    }
    WebSocketFactory.prototype.isMock = function () {
        return false;
    };
    WebSocketFactory.prototype.getType = function () {
        return WEBSOCKET_TYPE_NAME;
    };
    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */
    WebSocketFactory.prototype.getName = function () {
        return WEBSOCKET_FACTORY_NAME;
    };
    /**
     * Erzeugt ein neues Objket
     *
     * @param {string} aObjectName - Name des Objektes
     * @param {boolean} aRegisterFlag - bestimmt, ob Objekt in einen Manager eingetragen wird
     *
     * @return {any} Instanz des Objektes
     */
    WebSocketFactory.prototype.create = function (aObjectName, aRegisterFlag) {
        // auslesen der WebSocket-Klasse, wenn vorhanden
        try {
            return window.WebSocket || null;
        }
        catch (aException) {
            this._exception('create', aException);
            return null;
        }
    };
    return WebSocketFactory;
}(Factory));

/** @packageDocumentation
 * Diese Komponente dient als Fabrik zur Erzeugung der WebWorker-Klasse und -Instanz fuer Net
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module common/html5
 * @author SB
 */
// Konstanten
var WEBWORKER_FACTORY_NAME = 'WebWorkerFactory';
var WEBWORKER_TYPE_NAME = 'WebWorker';
/**
 * Die WebWorkerFactory Klasse kapselt die Pruefung und Erzeugung der HTML5-WebWorker
 */
var WebWorkerFactory = /** @class */ (function (_super) {
    __extends(WebWorkerFactory, _super);
    function WebWorkerFactory(aFactoryName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        return _super.call(this, aFactoryName || WEBWORKER_FACTORY_NAME, aRegisterFlag) || this;
    }
    WebWorkerFactory.prototype.isMock = function () {
        return false;
    };
    WebWorkerFactory.prototype.getType = function () {
        return WEBWORKER_TYPE_NAME;
    };
    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */
    WebWorkerFactory.prototype.getName = function () {
        return WEBWORKER_FACTORY_NAME;
    };
    /**
     * Erzeugt ein neues Objket
     *
     * @param {string} aObjectName - Name des Objektes
     * @param {boolean} aRegisterFlag - bestimmt, ob Objekt in einen Manager eingetragen wird
     *
     * @return {any} Instanz des Objektes
     */
    WebWorkerFactory.prototype.create = function (aObjectName, aRegisterFlag) {
        // auslesen der WebWorker-Klassen, wenn vorhanden
        try {
            return window.Worker || null;
        }
        catch (aException) {
            this._exception('create', aException);
            return null;
        }
    };
    /** @deprecated
     * Feststellen, ob HTML5 WebWorker API vorhanden ist
     *
     * @return {Worker} WorkerClass - Rueckgabe der WebWorker-Klasse
     */
    WebWorkerFactory.prototype.getWebWorkerClass = function () {
        return this.create();
    };
    /** @deprecated
     * Rueckgabe einer Instanz der HTML5-WebWorker
     *
     * @param {string} aUrl - URL fuer die WebWorker Datei
     * @return {Worker} worker - Objekt zurueckgeben
     */
    WebWorkerFactory.prototype.createWebWorker = function (aUrl) {
        var workerClass = this.getWebWorkerClass();
        if (!workerClass) {
            return null;
        }
        try {
            return new workerClass(aUrl);
        }
        catch (aException) {
            this._exception('createWebWorker', aException);
            return null;
        }
    };
    return WebWorkerFactory;
}(Factory));

/** @packageDocumentation
 * Diese Komponente dient als Fabrik zur Erzeugung der XMLHttpRequest-Klasse und -Instanz fuer FileReader
 * Sie wird nur im Browser verwendet.
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module common/html5
 * @author SB
 */
// Konstanten
var XMLHTTPREQUEST_FACTORY_NAME = 'XMLHttpRequestFactory';
var XMLHTTPREQUEST_TYPE_NAME = 'XMLHttpRequest';
/**
 * Die XMLHttpRequestFactory Klasse kapselt die Pruefung und Erzeugung der HTML5-XMLHttpRequest
 */
var XMLHttpRequestFactory = /** @class */ (function (_super) {
    __extends(XMLHttpRequestFactory, _super);
    function XMLHttpRequestFactory(aFactoryName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        return _super.call(this, aFactoryName || XMLHTTPREQUEST_FACTORY_NAME, aRegisterFlag) || this;
    }
    XMLHttpRequestFactory.prototype.isMock = function () {
        return false;
    };
    XMLHttpRequestFactory.prototype.getType = function () {
        return XMLHTTPREQUEST_TYPE_NAME;
    };
    /**
     * Name der Factory zurueckgeben
     *
     * @return {string} factoryName
     */
    XMLHttpRequestFactory.prototype.getName = function () {
        return XMLHTTPREQUEST_FACTORY_NAME;
    };
    /**
     * Erzeugt ein neues Objket
     *
     * @param {string} aObjectName - Name des Objektes
     * @param {boolean} aRegisterFlag - bestimmt, ob Objekt in einen Manager eingetragen wird
     *
     * @return {any} Instanz des Objektes
     */
    XMLHttpRequestFactory.prototype.create = function (aObjectName, aRegisterFlag) {
        // auslesen der XMLHttpRequest-Klasse, wenn vorhanden
        try {
            // return (window as any).XMLHttpRequest || null;
            return XMLHttpRequest || null;
        }
        catch (aException) {
            this._exception('create', aException);
            return null;
        }
    };
    /**  @deprecated
     * Feststellen, ob HTML5 XMLHttpRequest API vorhanden ist
     *
     * @return {XMLHttpRequest} xmlHttpRequestClass - Rueckgabe der XMLHttpRequest-Klasse
     */
    XMLHttpRequestFactory.prototype.getXMLHttpRequestClass = function () {
        return this.create();
    };
    return XMLHttpRequestFactory;
}(Factory));

/** @packageDocumentation
 * Amazon Konstanten Verwaltung
 *
 * Letzte Aenderung: 01.06.2020
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

/** @packageDocumentation
 * Definiert die Network fuer Amazon
 *
 * Letzte Aenderung: 01.06.2020
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

/** @packageDocumentation
 * Definiert die Verbindung zum Amazon-Service
 *
 * Letzte Aenderung: 01.06.2020
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

/** @packageDocumentation
 * Amazon Geraeteklasse fuer TTS, ASR und NLU
 *
 * Letzte Aenderung: 01.06.2020
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
     * @param {PortTransaction} aTransaction - auszufuehrende Transaktion
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
     * @param {PortTransaction} aTransaction - auszufuehrende Transaktion
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

/** @packageDocumentation
 * ASR Anbindung an den Amazon-Service
 *
 * Letzte Aenderung: 01.06.2020
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

/** @packageDocumentation
 * TTS Anbindung an den Amazon-Service
 *
 * Letzte Aenderung: 01.06.2020
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
            this.mAudioPlayer = new AudioPlayer(this.mAudioContext);
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

/** @packageDocumentation
 * AmazonPort zur Verbindung des Amazon Cloud-Service mit dem Framework
 * Stellt Grundfunktionen von Amazon zur Verfuegung. Werden von mehreren anderen
 * Komponenten geteilt.
 *
 * Letzte Aenderung: 01.06.2020
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
        this.mAmazonNLU.onStart = (aTransaction: PortTransaction) => this._onStart( aTransaction.plugin, aTransaction.type );
        this.mAmazonNLU.onStop = (aTransaction: PortTransaction) => this._onStop( aTransaction.plugin, aTransaction.type );
        this.mAmazonNLU.onResult = (aTransaction: PortTransaction) => this._onResult( aTransaction.result, aTransaction.plugin, aTransaction.type );
        this.mAmazonNLU.onError = (aTransaction: PortTransaction) => this._onError( aTransaction.error, aTransaction.plugin, aTransaction.type );
        this.mAmazonNLU.onClose = (aTransaction: PortTransaction) => this._onClose();
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
                    _this.mTransaction = new PortTransaction(aPluginName, AMAZON_NLU_ACTION);
                    result = _this._startNLU(_this.mTransaction, option.text, option.language || AMAZON_DEFAULT_LANGUAGE);
                    break;
                case AMAZON_ASRNLU_ACTION:
                    _this.mTransaction = new PortTransaction(aPluginName, AMAZON_ASRNLU_ACTION);
                    result = _this._startASR(_this.mTransaction, option.language || AMAZON_DEFAULT_LANGUAGE, option.audioURL || '', true, option.useProgressive || false);
                    break;
                case AMAZON_ASR_ACTION:
                    _this.mTransaction = new PortTransaction(aPluginName, AMAZON_ASR_ACTION);
                    result = _this._startASR(_this.mTransaction, option.language || AMAZON_DEFAULT_LANGUAGE, option.audioURL || '', false, option.useProgressive || false);
                    break;
                case AMAZON_TTS_ACTION:
                    _this.mTransaction = new PortTransaction(aPluginName, AMAZON_TTS_ACTION);
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
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
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
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
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
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
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
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
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
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
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
     * @param {PortTransaction} aTransaction - Transaktions-Objekt fuer diese Funktion
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

/** @packageDocumentation
 * Globale Fabrik zur Erzeugung eines AmazonPorts
 *
 * Letzte Aenderung: 21.06.2020
 * Status: rot
 *
 * @module cloud/amazon
 * @author SB
 */
// Global API
var AmazonFactory = /** @class */ (function (_super) {
    __extends(AmazonFactory, _super);
    // Konstruktor
    function AmazonFactory() {
        return _super.call(this, 'AmazonFactory') || this;
    }
    /**
     * Typ der erzeugten Objekte der Fabrik zurueckgeben
     *
     * @return {string} gibt den Typ der Fabrik zurueck
     */
    AmazonFactory.prototype.getType = function () {
        return AMAZON_TYPE_NAME;
    };
    /**
     * Name der Fabrik
     *
     * @return {string} gibt den Namen der Fabrik zurueck
     */
    AmazonFactory.prototype.getName = function () {
        return AMAZON_FACTORY_NAME;
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
    AmazonFactory.prototype._newPort = function (aPortName, aRegisterFlag) {
        var port = null;
        switch (aPortName) {
            case AMAZON_DEFAULT_NAME:
            case AMAZON_PORT_NAME:
                port = new AmazonPort(aPortName, aRegisterFlag);
                break;
            // Mock-Port
            case AMAZON_MOCK_NAME:
                port = new AmazonMock(AMAZON_MOCK_NAME, aRegisterFlag);
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
    AmazonFactory.prototype.create = function (aName, aRegisterFlag) {
        if (aRegisterFlag === void 0) { aRegisterFlag = true; }
        var portName = aName || AMAZON_DEFAULT_NAME;
        // Port erzeugen
        try {
            return this._newPort(portName, aRegisterFlag);
        }
        catch (aException) {
            this._exception('create', aException);
            return null;
        }
    };
    return AmazonFactory;
}(PortFactory));

/** @packageDocumentation
 * Amazon zur Verwaltung des AmazonPort
 *
 * Hier wird die Manager-Schnittstelle von Amazon definiert, um Amazon zu
 * initialisieren und als Port zu oeffnen.
 *
 * API-Version: 1.0
 * Datum:       01.04.2019
 *
 * Letzte Aenderung: 21.06.2020
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

export { AMAZON_API_VERSION, AMAZON_ASRNLU_ACTION, AMAZON_ASR_ACTION, AMAZON_ASR_LANGUAGE, AMAZON_ASR_LANGUAGE1, AMAZON_ASR_LANGUAGE2, AMAZON_AUDIOBUFFER_SIZE, AMAZON_AUDIOSAMPLE_RATE, AMAZON_AUDIOTTS_ID, AMAZON_AUDIO_FORMAT, AMAZON_CONFIG_FILE, AMAZON_CONFIG_LOAD, AMAZON_CONFIG_PATH, AMAZON_DEFAULT_CODEC, AMAZON_DEFAULT_LANGUAGE, AMAZON_DEFAULT_NAME, AMAZON_DEFAULT_URL, AMAZON_DEFAULT_VOICE, AMAZON_DE_LANGUAGE, AMAZON_EN_LANGUAGE, AMAZON_FACTORY_NAME, AMAZON_MOCK_NAME, AMAZON_NLU_ACTION, AMAZON_PCM_CODEC, AMAZON_PORT_NAME, AMAZON_SERVER_URL, AMAZON_SERVER_VERSION, AMAZON_TTS_ACTION, AMAZON_TTS_LANGUAGE, AMAZON_TTS_LANGUAGE1, AMAZON_TTS_LANGUAGE2, AMAZON_TTS_VOICE, AMAZON_TTS_VOICE1, AMAZON_TTS_VOICE2, AMAZON_TTS_VOICE3, AMAZON_TTS_VOICE4, AMAZON_TYPE_NAME, AMAZON_VERSION_BUILD, AMAZON_VERSION_DATE, AMAZON_VERSION_NUMBER, AMAZON_VERSION_STRING, AMAZON_VERSION_TYPE, AMAZON_WORKER_VERSION, Amazon, AmazonFactory };
