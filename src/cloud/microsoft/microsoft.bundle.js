/**
 * Speech-Microsoft
 * 
 * Version: 0.1.2
 * Build:   0003
 * TYPE:    ALPHA
 * Datum:   30.05.2020
 * Autor:   LinguaLogic Team
 * Lizenz:  MIT
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import '../../core/builder/builder-manager.ts';

import '../../core/builder/builder.ts';

import '../../core/component/component.ts';

import { ErrorBase as t } from '../../core/error/error-base.ts';

import '../../core/event/event-function-list.ts';

import { FactoryManager as o } from '../../core/factory/factory-manager.ts';

import '../../core/factory/factory.ts';

import '../../core/plugin/plugin-manager.ts';

import '../../core/plugin/plugin-factory.ts';

import '../../core/plugin/plugin-group.ts';

import '../../core/plugin/plugin.ts';

import { PortManager as r } from '../../core/port/port-manager.ts';

import { PortFactory as n } from '../../core/port/port-factory.ts';

import { PortTransaction as i } from '../../core/port/port-transaction.ts';

import { Port as e } from '../../core/port/port.ts';

import '../../common/audio/audio-codec.ts';

import { AudioPlayer as s } from '../../common/audio/audio-player.ts';

import '../../common/audio/audio-recorder.ts';

import '../../common/audio/audio-resampler.ts';

import { FileHtml5Reader as c } from '../../common/html5/file-html5-reader.ts';

import { AudioHtml5Reader as u } from '../../common/html5/audio-html5-reader.ts';

import { NetHtml5Connect as a } from '../../common/html5/net-html5-connect.ts';

import '../../common/html5/net-html5-websocket.ts';

import '../../common/html5/audiocontext-factory.ts';

import '../../common/html5/speechrecognition-factory.ts';

import '../../common/html5/speechsynthesis-factory.ts';

import '../../common/html5/websocket-factory.ts';

import '../../common/html5/webworker-factory.ts';

import { USERMEDIA_FACTORY_NAME as f, UserMediaFactory as p } from '../../common/html5/usermedia-factory.ts';

import '../../common/html5/xmlhttprequest-factory.ts';

import { AudioContextManager as h } from '../../common/html5/audiocontext-manager.ts';

var m = '0.1.2', l = '0003', g = 'ALPHA', d = '30.05.2020', _ = "0.1.2.0003 vom 30.05.2020 (ALPHA)", y = "0.1.2.0003 vom 30.05.2020 (ALPHA)", T = "0.1.2.0003 vom 30.05.2020 (ALPHA)", S = "0.1.2.0003 vom 30.05.2020 (ALPHA)", M = 'Microsoft', C = 'MicrosoftFactory', A = 'MicrosoftPort', R = 'MicrosoftMock', b = "MicrosoftPort", v = '', k = "", E = 'NLU', F = 'ASR', L = 'ASRNLU', N = 'TTS', O = 'assets/', U = 'microsoft.json', P = !1, w = 'de-DE', x = 'en-US', I = "de-DE", D = 'deu-DEU', K = 'eng-USA', H = "deu-DEU", j = 'de-DE', z = 'en-US', G = "de-DE", q = 'de-DE-Hedda', B = 'de-DE-HeddaRUS', X = 'de-DE-Stefan-Apollo', V = "de-DE-Hedda", W = "de-DE-Hedda", Y = 789, J = 'audio/L16;rate=16000', Q = "audio/L16;rate=16000", Z = 2048, $ = 16e3, tt = 'raw-16khz-16bit-mono-pcm', ot = function(t, o) {
    return (ot = Object.setPrototypeOf || {
        __proto__: []
    } instanceof Array && function(t, o) {
        t.__proto__ = o;
    } || function(t, o) {
        for (var r in o) o.hasOwnProperty(r) && (t[r] = o[r]);
    })(t, o);
};

function rt(t, o) {
    function r() {
        this.constructor = t;
    }
    ot(t, o), t.prototype = null === o ? Object.create(o) : (r.prototype = o.prototype, 
    new r);
}

var nt = function(t) {
    function o(o, r) {
        void 0 === r && (r = !0);
        var n = t.call(this, o || "MicrosoftMock", r) || this;
        return n.audioContextFlag = !0, n.getUserMediaFlag = !0, n.microsoftNLUFlag = !0, 
        n.microsoftASRFlag = !0, n.microsoftTTSFlag = !0, n.disconnectFlag = !0, n.defaultOptions = null, 
        n.codec = '', n.intentName = 'TestIntent', n.intentConfidence = 1, n.mDynamicCredentialsFlag = !1, 
        n.mTransaction = null, n.mRunningFlag = !1, n.microsoftRegion = '', n.microsoftSubscriptionKey = '', 
        n.microsoftLuisEndpoint = '', n.microsoftNluTag = '', n;
    }
    return rt(o, t), o.prototype.isMock = function() {
        return !0;
    }, o.prototype.getType = function() {
        return "Microsoft";
    }, o.prototype.getClass = function() {
        return 'MicrosoftMock';
    }, o.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.microsoftRegion && (this.microsoftRegion = t.microsoftRegion), 
        'string' == typeof t.microsoftSubscriptionKey && (this.microsoftSubscriptionKey = t.microsoftSubscriptionKey), 
        'string' == typeof t.microsoftLuisEndpoint && (this.microsoftLuisEndpoint = t.microsoftLuisEndpoint), 
        'string' == typeof t.microsoftNluTag && (this.microsoftNluTag = t.microsoftNluTag), 
        'string' == typeof t.microsoftRegion && (!!t.microsoftRegion && ('string' == typeof t.microsoftSubscriptionKey && !!t.microsoftSubscriptionKey)));
    }, o.prototype.init = function(o) {
        if (o && 'boolean' == typeof o.errorOutputFlag && this._setErrorOutput(o.errorOutputFlag), 
        this.mInitFlag) return this._error('init', 'Init bereits aufgerufen'), 0;
        if (o && 'boolean' == typeof o.microsoftDynamicCredentialsFlag && o.microsoftDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0, 
        this._checkCredentials(o); else if (!this._checkCredentials(o)) return (this.isErrorOutput() || o && o.errorOutputFlag) && this._error('init', 'keine AppId und/oder AppKey als Parameter uebergeben'), 
        -1;
        return this.audioContextFlag || (this._error('init', 'kein Audiokontext vorhanden, TTS und ASR werden abgeschaltet'), 
        this._onInit(-1)), this.microsoftNLUFlag = !0, this.audioContextFlag && (this.microsoftASRFlag = !0, 
        this.getUserMediaFlag && (this.microsoftTTSFlag = !0)), this.isErrorOutput() && (this.microsoftNLUFlag ? console.log('MicrosoftMock: NLU ist vorhanden') : console.log('MicrosoftMock: NLU ist nicht vorhanden'), 
        this.microsoftTTSFlag ? console.log('MicrosoftMock: TTS ist vorhanden') : console.log('MicrosoftMock: TTS ist nicht vorhanden'), 
        this.microsoftASRFlag ? console.log('MicrosoftMock: ASR ist vorhanden') : console.log('MicrosoftMock: ASR ist nicht vorhanden')), 
        this._onInit(0), t.prototype.init.call(this, o);
    }, o.prototype.done = function(o) {
        return t.prototype.done.call(this), this.audioContextFlag = !0, this.getUserMediaFlag = !0, 
        this.microsoftNLUFlag = !1, this.microsoftASRFlag = !1, this.microsoftTTSFlag = !1, 
        this.disconnectFlag = !0, this.defaultOptions = null, this.codec = '', this.mTransaction = null, 
        this.mRunningFlag = !1, 0;
    }, o.prototype.reset = function(o) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, o);
    }, o.prototype._onStop = function(o, r) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype._onStop.call(this, o, r);
    }, o.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this._error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return this.microsoftRegion = t.microsoftRegion, this.microsoftSubscriptionKey = t.microsoftSubscriptionKey, 
            this.microsoftLuisEndpoint = t.microsoftLuisEndpoint, 0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, o.prototype.getConfig = function() {
        return {
            microsoftRegion: this.microsoftRegion,
            microsoftSubscriptionKey: this.microsoftSubscriptionKey,
            microsoftLuisEndpoint: this.microsoftLuisEndpoint
        };
    }, o.prototype.isOpen = function() {
        return !this.disconnectFlag;
    }, o.prototype.open = function(t) {
        return this.disconnectFlag ? (this.disconnectFlag = !1, this._onOpen(), 0) : 0;
    }, o.prototype.close = function() {
        return this.disconnectFlag = !0, 0;
    }, o.prototype.isRunning = function() {
        return this.mRunningFlag;
    }, o.prototype._isCredentials = function() {
        return !(!this.microsoftRegion || !this.microsoftSubscriptionKey);
    }, o.prototype.isAction = function(t) {
        var o = !1;
        switch (t) {
          case "NLU":
            o = this.microsoftNLUFlag;
            break;

          case "ASR":
            o = this.microsoftASRFlag;
            break;

          case "TTS":
            o = this.microsoftTTSFlag;
        }
        return o;
    }, o.prototype.start = function(t, o, r) {
        if (this.isRunning()) return this._error('start', 'Aktion laeuft bereits'), -1;
        if (!this.isOpen()) return this._error('start', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this._error('start', 'Port hat keine Credentials'), 
        -1;
        if (this.mTransaction) return this._error('start', 'andere Transaktion laeuft noch'), 
        -1;
        var n = r || {};
        this.mRunningFlag = !0;
        var e = 0;
        switch (o) {
          case "NLU":
            this.mTransaction = new i(t, "NLU"), e = this._startNLU(this.mTransaction, n.text, n.language || "de-DE");
            break;

          case "ASRNLU":
            this.mTransaction = new i(t, "ASRNLU"), e = this._startASR(this.mTransaction, n.language || "de-DE", n.audioURL || '', !0, n.useProgressive || !1);
            break;

          case "ASR":
            this.mTransaction = new i(t, "ASR"), e = this._startASR(this.mTransaction, n.language || "de-DE", n.audioURL || '', !1, n.useProgressive || !1);
            break;

          case "TTS":
            this.mTransaction = new i(t, "TTS"), e = this._startTTS(this.mTransaction, n.text, n.language || "de-DE", n.voice || "de-DE-Hedda");
            break;

          default:
            this._error('start', 'Keine gueltige Aktion uebergeben ' + o), e = -1;
        }
        return e;
    }, o.prototype.stop = function(t, o, r) {
        if (!this.isRunning()) return 0;
        if (!this.isOpen()) return this._error('stop', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this._error('stop', 'Port hat keine Credentials'), 
        -1;
        if (!this.mTransaction) return this._error('stop', 'keine Transaktion vorhanden'), 
        -1;
        if (t !== this.mTransaction.plugin) return this._error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + t + ' != ' + this.mTransaction.plugin), 
        -1;
        if (o) {
            if (o !== this.mTransaction.type) return this._error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + o + ' != ' + this.mTransaction.type), 
            -1;
        } else o = this.mTransaction.type;
        var n = 0;
        switch (o) {
          case "NLU":
            n = this._stopNLU(this.mTransaction);
            break;

          case "ASRNLU":
          case "ASR":
            n = this._stopASR(this.mTransaction);
            break;

          case "TTS":
            n = this._stopTTS(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + o), n = -1;
        }
        return this.mTransaction = null, this.mRunningFlag = !1, n;
    }, o.prototype._startNLU = function(t, o, r) {
        if (!o) return this._error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!this.microsoftNLUFlag) return this._error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden'), 
        -1;
        try {
            this._onStart(t.plugin, t.type);
            var n = {
                topScoringIntent: {
                    intent: this.intentName,
                    score: this.intentConfidence
                },
                query: o
            };
            return t.result = n, this._onResult(t.result, t.plugin, t.type), this._onStop(t.plugin, t.type), 
            0;
        } catch (t) {
            return this._exception('_startNLU', t), -1;
        }
    }, o.prototype._stopNLU = function(t) {
        return this._onStop(t.plugin, t.type), 0;
    }, o.prototype._startASR = function(t, o, r, n, i) {
        if (!this.microsoftASRFlag) return this._error('_startASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), t.result = "Testtext", this._onResult(t.result, t.plugin, t.type), 
            this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_startASR', t), -1;
        }
    }, o.prototype._stopASR = function(t) {
        if (!this.microsoftASRFlag) return this._error('_stopASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_stopASR', t), -1;
        }
    }, o.prototype._startTTS = function(t, o, r, n) {
        var i = this;
        if (!o) return this._error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.microsoftTTSFlag) return this._error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), setTimeout((function() {
                return i._onStop(t.plugin, t.type);
            }), 100), 0;
        } catch (t) {
            return this._exception('_startTTS', t), -1;
        }
    }, o.prototype._stopTTS = function(t) {
        if (!this.microsoftTTSFlag) return this._error('_stopTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_stopTTS', t), -1;
        }
    }, o;
}(e), it = function(t) {
    function o(o) {
        var r = t.call(this, 'MicrosoftConfig') || this;
        return r.mInitFlag = !1, r.mConfigPath = "assets/", r.mConfigFile = "microsoft.json", 
        r.mConfigLoadFlag = !1, r.mConfigServerUrl = "", r.mConfigRegion = '', r.mConfigSubscriptionKey = '', 
        r.mConfigLuisEndpoint = '', r.mConfigUserId = '', r.mConfigNluTag = '', r.mFileReader = null, 
        r.mOnInitFunc = null, r.mOnErrorFunc = null, r.mFileReader = o, r._setErrorOutputFunc((function(t) {
            return r._onError(new Error(t));
        })), r;
    }
    return rt(o, t), o.prototype._setOption = function(t) {
        t && ('string' == typeof t.microsoftConfigPath && (this.mConfigPath = t.microsoftConfigPath), 
        'string' == typeof t.microsoftConfigFile && (this.mConfigFile = t.microsoftConfigFile), 
        'boolean' == typeof t.microsoftConfigLoadFlag && (this.mConfigLoadFlag = t.microsoftConfigLoadFlag), 
        'string' == typeof t.microsoftServerUrl && (this.mConfigServerUrl = t.microsoftServerUrl), 
        'string' == typeof t.microsoftRegion && (this.mConfigRegion = t.microsoftRegion), 
        'string' == typeof t.microsoftSubscriptionKey && (this.mConfigSubscriptionKey = t.microsoftSubscriptionKey), 
        'string' == typeof t.microsoftLuisEndpoint && (this.mConfigLuisEndpoint = t.microsoftLuisEndpoint), 
        'string' == typeof t.microsoftUserId && (this.mConfigUserId = t.microsoftUserId), 
        'string' == typeof t.microsoftNluTag && (this.mConfigNluTag = t.microsoftNluTag));
    }, o.prototype.init = function(t) {
        return this._setOption(t), this.mInitFlag = !0, 0;
    }, o.prototype.done = function() {
        return this.mInitFlag = !1, this.mConfigPath = "assets/", this.mConfigFile = "microsoft.json", 
        this.mConfigLoadFlag = !1, this.mConfigServerUrl = "", this.mConfigRegion = '', 
        this.mConfigSubscriptionKey = '', this.mConfigLuisEndpoint = '', this.mConfigUserId = '', 
        this.mConfigNluTag = '', this.mFileReader = null, this.mOnInitFunc = null, 0;
    }, o.prototype.isInit = function() {
        return this.mInitFlag;
    }, o.prototype._onInit = function(t) {
        0 === t && (this.mInitFlag = !0), 'function' == typeof this.mOnInitFunc && this.mOnInitFunc(t);
    }, o.prototype._onError = function(t) {
        if ('function' == typeof this.mOnErrorFunc) try {
            return this.mOnErrorFunc(t), 0;
        } catch (t) {
            return this.isErrorOutput() && console.log('===> EXCEPTION MicrosoftConfig._onError: ', t.message), 
            -1;
        }
        return 0;
    }, Object.defineProperty(o.prototype, "onInit", {
        set: function(t) {
            this.mOnInitFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), o.prototype._readConfigData = function(t) {
        if (!t) return this._error('_readConfigData', 'keine Daten uebergeben'), -1;
        try {
            var o = JSON.parse(t);
            return o.URL && (this.serverUrl = o.URL), o.REGION && (this.region = o.REGION), 
            o.SUBSCRIPTION_KEY && (this.subscriptionKey = o.SUBSCRIPTION_KEY), o.LUIS_ENDPOINT && (this.luisEndpoint = o.LUIS_ENDPOINT), 
            o.USER_ID && (this.userId = o.USER_ID), o.NLU_TAG && (this.nluTag = o.NLU_TAG), 
            this._onInit(0), 0;
        } catch (t) {
            return this._exception('_readConfigData', t), -1;
        }
    }, o.prototype._readError = function(t) {
        this._error('_readError', t), this._onInit(-1);
    }, o.prototype.read = function() {
        if (!this.mFileReader) return this._error('read', 'kein FileReader vorhanden'), 
        this._onInit(-1), -1;
        var t = this.mConfigPath + this.mConfigFile;
        return this.mFileReader.read(t);
    }, Object.defineProperty(o.prototype, "serverUrl", {
        get: function() {
            return this.mConfigServerUrl;
        },
        set: function(t) {
            this.mConfigServerUrl = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "region", {
        get: function() {
            return this.mConfigRegion;
        },
        set: function(t) {
            this.mConfigRegion = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "subscriptionKey", {
        get: function() {
            return this.mConfigSubscriptionKey;
        },
        set: function(t) {
            this.mConfigSubscriptionKey = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "luisEndpoint", {
        get: function() {
            return this.mConfigLuisEndpoint;
        },
        set: function(t) {
            this.mConfigLuisEndpoint = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "userId", {
        get: function() {
            return this.mConfigUserId;
        },
        set: function(t) {
            this.mConfigUserId = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "nluTag", {
        get: function() {
            return this.mConfigNluTag;
        },
        set: function(t) {
            this.mConfigNluTag = t;
        },
        enumerable: !0,
        configurable: !0
    }), o.prototype.isCredentials = function() {
        return !(!this.mConfigSubscriptionKey || !this.mConfigRegion);
    }, o;
}(t), et = function(t) {
    function o() {
        return t.call(this, 'MicrosoftNetwork') || this;
    }
    return rt(o, t), o;
}(a), st = function(t) {
    function o(o) {
        var r = t.call(this, 'MicrosoftConnect') || this;
        return r.mConfig = null, r.mConnectFlag = !1, r.mSpeechConfig = null, r.mConfig = o, 
        r;
    }
    return rt(o, t), Object.defineProperty(o.prototype, "speechConfig", {
        get: function() {
            return this.mSpeechConfig;
        },
        enumerable: !0,
        configurable: !0
    }), o.prototype.isConnect = function() {
        return this.mConnectFlag;
    }, o.prototype.connect = function() {
        if (this.isConnect()) return 0;
        try {
            return window.SpeechSDK ? this.mConfig.region && this.mConfig.subscriptionKey && (this.mSpeechConfig = window.SpeechSDK.SpeechConfig.fromSubscription(this.mConfig.subscriptionKey, this.mConfig.region), 
            !this.mSpeechConfig) ? (this._error('connect', 'keine Microsoft-Credentials erzeugt'), 
            -1) : (this.mConnectFlag = !0, 0) : (this._error('connect', 'kein Microsoft SpeechSDK vorhanden'), 
            -1);
        } catch (t) {
            return this._exception('connect', t), -1;
        }
    }, o.prototype.disconnect = function() {
        return this.mConnectFlag = !1, this.mSpeechConfig = null, 0;
    }, o;
}(t), ct = function(t) {
    function o(o, r, n) {
        var i = t.call(this, o || 'MicrosoftDevice') || this;
        return i.mConfig = null, i.mConnect = null, i.mTransaction = null, i.onStart = null, 
        i.onStop = null, i.onResult = null, i.onError = null, i.onClose = null, i.mConfig = r, 
        i.mConnect = n, i;
    }
    return rt(o, t), o.prototype._onStart = function() {
        return this.mTransaction && this.onStart && this.onStart(this.mTransaction), 0;
    }, o.prototype._onStop = function() {
        return this.mTransaction && this.onStop && this.onStop(this.mTransaction), this.mTransaction = null, 
        0;
    }, o.prototype._onResult = function(t) {
        return this.mTransaction && this.onResult && (this.mTransaction.result = t, this.onResult(this.mTransaction)), 
        0;
    }, o.prototype._onError = function(t) {
        return this.mTransaction && this.onError && (this.mTransaction.error = t, this.onError(this.mTransaction)), 
        0;
    }, o.prototype._onClose = function() {
        return this.mTransaction && this.onClose && this.onClose(this.mTransaction), 0;
    }, o.prototype._start = function(t) {}, o.prototype._stop = function() {}, o.prototype.start = function(t, o) {
        if (!t) return this._error('start', 'keine Transaktion uebergeben'), -1;
        if (this.mTransaction) return this._error('start', 'vorherige Transaktion nicht beendet'), 
        -1;
        this.mTransaction = t;
        try {
            return this._start(o), 0;
        } catch (t) {
            return this._exception('start', t), -1;
        }
    }, o.prototype.stop = function(t) {
        if (!t) return this._error('stop', 'keine Transaktion uebergeben'), -1;
        if (!this.mTransaction) return this._error('stop', 'keine Transaktion gestartet'), 
        -1;
        if (this.mTransaction.transactionId !== t.transactionId) return this._error('stop', 'Transaktions-ID stimmt nicht ueberein'), 
        -1;
        try {
            return this._stop(), 0;
        } catch (t) {
            return this._exception('stop', t), -1;
        }
    }, o.prototype.isTransaction = function() {
        return !!this.mTransaction;
    }, o.prototype.getTransaction = function() {
        return this.mTransaction;
    }, o.prototype.clearTransaction = function() {
        this.mTransaction = null;
    }, o;
}(t), ut = function(t) {
    function o(o, r) {
        return t.call(this, 'MicrosoftNLU', o, r) || this;
    }
    return rt(o, t), o.prototype._start = function(t) {
        var o = this;
        try {
            var r = this.mConfig.luisEndpoint;
            if (!r) return this._onError(new Error('NLU-Error: kein Luis-Endpunkt vorhanden')), 
            void this._onStop();
            var n = new XMLHttpRequest, i = r + t.text;
            n.responseType = 'json', n.onload = function(t) {
                try {
                    o._onResult(n.response);
                } catch (t) {
                    o._onError(new Error('NLU-Exception: ' + t.message));
                }
                o._onStop();
            }, n.onerror = function(t) {
                console.log('MicrosoftNLU._start: onerror ', t);
            }, n.onabort = function(t) {
                console.log('MicrosoftNLU._start: onabort ', t);
            }, n.open("GET", i), n.send();
        } catch (t) {
            this._exception('_start', t);
        }
    }, o.prototype._stop = function() {}, o;
}(ct), at = function(t) {
    function o(o, r, n, i, e) {
        var s = t.call(this, 'MicrosoftASR', o, r) || this;
        return s.mAudioContext = null, s.mGetUserMedia = null, s.mAudioReader = null, s.mAudioRecorder = null, 
        s.mUserMediaStream = null, s.mRequestId = 0, s.mVolumeCounter = 0, s.mTimeoutCounter = 0, 
        s.mRecordingFlag = !1, s.mRecognizer = null, s.mAudioContext = n, s.mGetUserMedia = i, 
        s.mAudioReader = e, s;
    }
    return rt(o, t), o.prototype._startAudio = function(t) {}, o.prototype._startASR = function(t) {
        var o = this;
        try {
            if (!window.SpeechSDK) return this._error('_startASR', 'kein Microsoft SpeechSDK vorhanden'), 
            -1;
            var r = this.mConnect.speechConfig;
            if (!r) return this._error('_startASR', 'kein Microsoft SpeechConfig vorhanden'), 
            -1;
            r.speechRecognitionLanguage = 'de-DE', t.language && (r.speechRecognitionLanguage = t.language);
            var n = window.SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
            return this.mRecordingFlag = !0, this.mRecognizer = new window.SpeechSDK.SpeechRecognizer(r, n), 
            this.mRecognizer.recognizeOnceAsync((function(t) {
                t.privErrorDetails || (o._onResult(t), o._stop());
            }), (function(t) {
                o._onError(new Error('ASR-Error: ' + t)), o._stop();
            })), 0;
        } catch (t) {
            return this._exception('_startASR', t), -1;
        }
    }, o.prototype._start = function(t) {
        if (this.mRecordingFlag) return this._error('_start', 'ASR laeuft bereits'), -1;
        var o = {
            language: t.language
        };
        return this._startASR(o);
    }, o.prototype._stop = function() {
        this.mRecordingFlag = !1;
        try {
            return this.mRecognizer && (this.mRecognizer.close(), this.mRecognizer = null, this._onStop()), 
            0;
        } catch (t) {
            return -1;
        }
    }, o;
}(ct), ft = function(t) {
    function o(o, r, n) {
        var i = t.call(this, 'MicrosoftTTS', o, r) || this;
        return i.mAudioContext = null, i.mAudioPlayer = null, i.mAccessToken = '', i.mAudioContext = n, 
        i;
    }
    return rt(o, t), o.prototype._getAccessToken = function(t, o) {
        var r = this;
        return new Promise((function(n, i) {
            try {
                var e = 'https://' + t + ".api.cognitive.microsoft.com/sts/v1.0/issueToken", s = new XMLHttpRequest;
                r.mAccessToken = '', s.open('POST', e), s.setRequestHeader('Ocp-Apim-Subscription-Key', o), 
                s.onload = function() {
                    try {
                        r.mAccessToken = s.responseText, n(r.mAccessToken);
                    } catch (t) {
                        r._exception('getAccessToken', t), i();
                    }
                }, s.onerror = function(t) {
                    r._error('getAccessToken', t.message), i();
                }, s.send('');
            } catch (t) {
                r._exception('_getAccessToken', t), i();
            }
        }));
    }, o.prototype._getSSMLBody = function(t, o, r) {
        return t ? o ? r ? "<?xml version=\"1.0\"?><speak version=\"1.0\" xml:lang=\"" + o + "\"><voice xml:lang=\"" + o + "\" name=\"" + r + "\">" + t + "</voice></speak>" : (this._error('getSSMLBody', 'keine Stimme uebergeben'), 
        '') : (this._error('getSSMLBody', 'keine Sprache uebergeben'), '') : (this._error('getSSMLBody', 'kein Text uebergeben'), 
        '');
    }, o.prototype._sendToTTS = function(t, o, r, n) {
        var i = this;
        try {
            var e = 'https://' + o + ".tts.speech.microsoft.com/cognitiveservices/v1", s = new XMLHttpRequest;
            return s.open('POST', e), s.setRequestHeader('Authorization', 'Bearer ' + r), s.setRequestHeader('cache-control', 'no-cache'), 
            s.setRequestHeader('X-Microsoft-OutputFormat', "raw-16khz-16bit-mono-pcm"), s.setRequestHeader('Content-Type', 'application/ssml+xml'), 
            s.responseType = 'arraybuffer', s.onload = function() {
                i.mAudioPlayer.decode(t, s.response);
            }, s.onerror = function(t) {
                i._error('_sentToTTS', t.message);
            }, s.send(n), 0;
        } catch (t) {
            return this._exception('_sendToTTS', t), -1;
        }
    }, o.prototype._start = function(t) {
        var o = this;
        if (!t || !t.text || 'string' != typeof t.text) return this._error('_start', 'kein Text uebergeben'), 
        -1;
        try {
            if (this.mAudioPlayer = new s(this.mAudioContext), !this.mAudioPlayer) return this._error('_start', 'AudioPlayer wurde nicht erzeugt'), 
            -1;
            this.mAudioPlayer.onAudioStart = function() {
                o._onStart();
            }, this.mAudioPlayer.onAudioStop = function() {
                o._onStop();
            };
            var r = this._getSSMLBody(t.text, t.language, t.voice);
            if (!r) return -1;
            var n = {
                codec: "audio/L16;rate=16000"
            };
            return this._getAccessToken(this.mConfig.region, this.mConfig.subscriptionKey).then((function(t) {
                o._sendToTTS(n, o.mConfig.region, t, r);
            })).catch((function() {})), this.mAudioPlayer.start(), 0;
        } catch (t) {
            return this._exception('_start', t), -1;
        }
    }, o.prototype._stop = function() {
        return this.mAudioPlayer && (this.mAudioPlayer.stop(), this.mAudioPlayer = null), 
        0;
    }, o;
}(ct), pt = function(t) {
    function r(o, r) {
        void 0 === r && (r = !0);
        var n = t.call(this, o || "MicrosoftPort", r) || this;
        return n.mAudioContext = null, n.mGetUserMedia = null, n.mMicrosoftConfig = null, 
        n.mMicrosoftNetwork = null, n.mMicrosoftConnect = null, n.mMicrosoftTTS = null, 
        n.mMicrosoftASR = null, n.mMicrosoftNLU = null, n.mDynamicCredentialsFlag = !1, 
        n.mTransaction = null, n.mRunningFlag = !1, n.mDefaultOptions = null, n.mActionTimeoutId = 0, 
        n.mActionTimeout = 6e4, n;
    }
    return rt(r, t), r.prototype.isMock = function() {
        return !1;
    }, r.prototype.getType = function() {
        return "Microsoft";
    }, r.prototype.getClass = function() {
        return 'MicrosoftPort';
    }, r.prototype.getVersion = function() {
        return "0.1.2.0003 vom 30.05.2020 (ALPHA)";
    }, r.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.microsoftRegion && (!!t.microsoftRegion && ('string' == typeof t.microsoftSubscriptionKey && !!t.microsoftSubscriptionKey)));
    }, r.prototype._initAllObject = function(t) {
        var o = this, r = new c;
        r.init();
        var n = new u;
        if (n.init({
            audioContext: this.mAudioContext
        }), this.mMicrosoftConfig = new it(r), 0 !== this.mMicrosoftConfig.init(t)) return -1;
        if (this.mMicrosoftNetwork = new et, this.mMicrosoftNetwork.onOnline = function() {
            return o._onOnline();
        }, this.mMicrosoftNetwork.onOffline = function() {
            return o._onOffline();
        }, this.mMicrosoftNetwork.onError = function(t) {
            return o._onError(t);
        }, 0 !== this.mMicrosoftNetwork.init(t)) return -1;
        if (this.mMicrosoftConnect = new st(this.mMicrosoftConfig), this.mMicrosoftConnect._setErrorOutputFunc((function(t) {
            return o._onError(new Error(t));
        })), this.mMicrosoftNLU = new ut(this.mMicrosoftConfig, this.mMicrosoftConnect), 
        this.mMicrosoftNLU.onStart = function(t) {
            return o._onStart(t.plugin, t.type);
        }, this.mMicrosoftNLU.onStop = function(t) {
            return o._onStop(t.plugin, t.type);
        }, this.mMicrosoftNLU.onResult = function(t) {
            return o._onResult(t.result, t.plugin, t.type);
        }, this.mMicrosoftNLU.onError = function(t) {
            return o._onError(t.error, t.plugin, t.type);
        }, this.mMicrosoftNLU.onClose = function(t) {
            return o._onClose();
        }, this.mAudioContext) {
            this.mMicrosoftTTS = new ft(this.mMicrosoftConfig, this.mMicrosoftConnect, this.mAudioContext), 
            this.mMicrosoftTTS.onStart = function(t) {
                return o._onStart(t.plugin, t.type);
            }, this.mMicrosoftTTS.onStop = function(t) {
                return o._onStop(t.plugin, t.type);
            }, this.mMicrosoftTTS.onResult = function(t) {
                return o._onResult(t.result, t.plugin, t.type);
            }, this.mMicrosoftTTS.onError = function(t) {
                return o._onError(t.error, t.plugin, t.type);
            }, this.mMicrosoftTTS.onClose = function(t) {
                return o._onClose();
            };
            try {
                this.mGetUserMedia && (this.mMicrosoftASR = new at(this.mMicrosoftConfig, this.mMicrosoftConnect, this.mAudioContext, this.mGetUserMedia, n), 
                this.mMicrosoftASR.onStart = function(t) {
                    return o._onStart(t.plugin, t.type);
                }, this.mMicrosoftASR.onStop = function(t) {
                    return o._onStop(t.plugin, t.type);
                }, this.mMicrosoftASR.onResult = function(t) {
                    return o._onResult(t.result, t.plugin, t.type);
                }, this.mMicrosoftASR.onError = function(t) {
                    return o._onError(t.error, t.plugin, t.type);
                }, this.mMicrosoftASR.onClose = function(t) {
                    return o._onClose();
                });
            } catch (t) {
                this._exception('_initAllObject', t);
            }
        }
        return 0;
    }, r.prototype.init = function(r) {
        if (r && 'boolean' == typeof r.errorOutputFlag && this._setErrorOutput(r.errorOutputFlag), 
        this.mInitFlag) return this._error('init', 'Port ist bereits initialisiert'), 0;
        if (!window.SpeechSDK) return this._error('init', 'Microsoft SpeechSDK ist nicht vorhanden'), 
        -1;
        if (r && 'boolean' == typeof r.microsoftDynamicCredentialsFlag && r.microsoftDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0; else if (!this._checkCredentials(r)) return this._error('init', 'keine Region und/oder SubscriptionKey als Parameter uebergeben'), 
        -1;
        this.mAudioContext = h.getAudioContext();
        var n = o.get(f, p);
        return n && (this.mGetUserMedia = n.create()), 0 !== this._initAllObject(r) || 0 !== t.prototype.init.call(this, r) ? -1 : (this.isErrorOutput() && (this.mMicrosoftNLU ? console.log('MicrosoftPort: NLU ist vorhanden') : console.log('MicrosoftPort: NLU ist nicht vorhanden'), 
        this.mMicrosoftTTS ? console.log('MicrosoftPort: TTS ist vorhanden') : console.log('MicrosoftPort: TTS ist nicht vorhanden'), 
        this.mMicrosoftASR ? console.log('MicrosoftPort: ASR ist vorhanden') : console.log('MicrosoftPort: ASR ist nicht vorhanden')), 
        0);
    }, r.prototype.done = function() {
        return t.prototype.done.call(this), this._clearActionTimeout(), this.mMicrosoftNetwork && (this.mMicrosoftNetwork.done(), 
        this.mMicrosoftNetwork = null), this.mMicrosoftConnect && (this.mMicrosoftConnect.disconnect(), 
        this.mMicrosoftConnect = null), this.mMicrosoftConfig && (this.mMicrosoftConfig.done(), 
        this.mMicrosoftConfig = null), this.mMicrosoftTTS = null, this.mMicrosoftASR = null, 
        this.mMicrosoftNLU = null, this.mAudioContext && (this.mAudioContext = null), this.mGetUserMedia = null, 
        this.mDynamicCredentialsFlag = !1, this.mTransaction = null, this.mRunningFlag = !1, 
        this.mDefaultOptions = null, this.mActionTimeoutId = 0, this.mActionTimeout = 6e4, 
        0;
    }, r.prototype.reset = function(o) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, o);
    }, r.prototype._setErrorOutput = function(o) {
        t.prototype._setErrorOutput.call(this, o), this.mMicrosoftConfig && this.mMicrosoftConfig._setErrorOutput(o), 
        this.mMicrosoftNetwork && this.mMicrosoftNetwork._setErrorOutput(o), this.mMicrosoftConnect && this.mMicrosoftConnect._setErrorOutput(o), 
        this.mMicrosoftTTS && this.mMicrosoftTTS._setErrorOutput(o), this.mMicrosoftASR && this.mMicrosoftASR._setErrorOutput(o), 
        this.mMicrosoftNLU && this.mMicrosoftNLU._setErrorOutput(o);
    }, r.prototype._breakAction = function() {
        this.mActionTimeoutId = 0, this.mTransaction && (this._error('_breakAction', 'Timeout fuer Action erreicht'), 
        this._onStop(this.mTransaction.plugin, this.mTransaction.type));
    }, r.prototype._setActionTimeout = function() {
        var t = this;
        0 === this.mActionTimeoutId && this.mActionTimeout > 0 && (this.mActionTimeoutId = window.setTimeout((function() {
            return t._breakAction();
        }), this.mActionTimeout));
    }, r.prototype._clearActionTimeout = function() {
        this.mActionTimeoutId > 0 && (clearTimeout(this.mActionTimeoutId), this.mActionTimeoutId = 0);
    }, r.prototype._onOnline = function() {
        return 0;
    }, r.prototype._onOffline = function() {
        return 0;
    }, r.prototype._onStop = function(o, r) {
        this._clearActionTimeout();
        var n = t.prototype._onStop.call(this, o, r);
        return this.mTransaction = null, this.mRunningFlag = !1, n;
    }, r.prototype._unlockAudio = function(t) {
        if (this.mAudioContext) {
            if ('running' === this.mAudioContext.state) return void t(!0);
            if ('suspended' === this.mAudioContext.state) {
                var o = setTimeout((function() {
                    return t(!1);
                }), 2e3);
                this.mAudioContext.resume().then((function() {
                    clearTimeout(o), t(!0);
                }), (function(r) {
                    console.log('MicrosoftPort._unlockAudio:', r), clearTimeout(o), t(!1);
                }));
            } else t(!1);
        } else t(!1);
    }, r.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this._error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return 'string' == typeof t.microsoftRegion && t.microsoftRegion && (this.mMicrosoftConfig.region = t.microsoftRegion), 
            'string' == typeof t.microsoftSubscriptionKey && t.microsoftSubscriptionKey && (this.mMicrosoftConfig.subscriptionKey = t.microsoftSubscriptionKey, 
            console.log('MicrosoftPort.setConfig: neue Credentials eintragen ', t.microsoftSubscriptionKey), 
            this.mMicrosoftConnect.disconnect(), this.mMicrosoftConnect.connect()), 'string' == typeof t.microsoftLuisEndpoint && t.microsoftLuisEndpoint && (this.mMicrosoftConfig.luisEndpoint = t.microsoftLuisEndpoint), 
            0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, r.prototype.getConfig = function() {
        return {
            microsoftRegion: this.mMicrosoftConfig.region,
            microsoftSubscriptionKey: this.mMicrosoftConfig.subscriptionKey,
            microsoftLuisEndpoint: this.mMicrosoftConfig.luisEndpoint
        };
    }, r.prototype.isOnline = function() {
        return !!this.mMicrosoftNetwork && this.mMicrosoftNetwork.isOnline();
    }, r.prototype.isOpen = function() {
        return !!this.mMicrosoftConnect && this.mMicrosoftConnect.isConnect();
    }, r.prototype._checkOpen = function(t) {
        if (!this.isOnline()) return this._error('_checkOpen', 'kein Netz vorhanden'), t(!1), 
        -1;
        var o = this.open();
        return t(0 === o), o;
    }, r.prototype.open = function(t) {
        if (!this.mMicrosoftConnect) return this._error('open', 'kein MicrosoftConnect vorhanden'), 
        -1;
        if (this.isOpen()) return 0;
        var o = this.mMicrosoftConnect.connect();
        return 0 === o && this._onOpen(), o;
    }, r.prototype.close = function() {
        return this.isOpen() && this.mMicrosoftConnect ? (this._onClose(), this.mMicrosoftConnect.disconnect()) : 0;
    }, r.prototype.getPluginName = function() {
        return this.mTransaction ? this.mTransaction.plugin : '';
    }, r.prototype.getActionName = function() {
        return this.mTransaction ? this.mTransaction.type : '';
    }, r.prototype.isRunning = function(t, o) {
        if (!t && !o) return this.mRunningFlag;
        if (t === this.getPluginName()) {
            if (!o) return this.mRunningFlag;
            if (o === this.getActionName()) return this.mRunningFlag;
        }
        return !1;
    }, r.prototype.isAction = function(t) {
        var o = !1;
        switch (t) {
          case "NLU":
            o = !!this.mMicrosoftNLU;
            break;

          case "ASR":
            o = !!this.mMicrosoftASR;
            break;

          case "TTS":
            o = !!this.mMicrosoftTTS;
        }
        return o;
    }, r.prototype.setActionTimeout = function(t) {
        this.mActionTimeout = t;
    }, r.prototype.start = function(t, o, r) {
        var n = this;
        return this.isRunning() ? (this._error('start', 'Aktion laeuft bereits'), -1) : this.mMicrosoftConfig.isCredentials() ? this.mTransaction ? (this._error('start', 'andere Transaktion laeuft noch'), 
        -1) : this._checkOpen((function(e) {
            if (!e) return -1;
            n._setActionTimeout();
            var s = r || {};
            n.mPluginName = t, n.mRunningFlag = !0;
            var c = 0;
            switch (o) {
              case "NLU":
                n.mTransaction = new i(t, "NLU"), c = n._startNLU(n.mTransaction, s.text, s.language || "de-DE");
                break;

              case "ASRNLU":
                n.mTransaction = new i(t, "ASRNLU"), c = n._startASR(n.mTransaction, s.language || "de-DE", s.audioURL || '', !0, s.useProgressive || !1);
                break;

              case "ASR":
                n.mTransaction = new i(t, "ASR"), c = n._startASR(n.mTransaction, s.language || "de-DE", s.audioURL || '', !1, s.useProgressive || !1);
                break;

              case "TTS":
                n.mTransaction = new i(t, "TTS"), c = n._startTTS(n.mTransaction, s.text, s.language || "de-DE", s.voice || "de-DE-Hedda");
                break;

              default:
                n._clearActionTimeout(), n._error('start', 'Keine gueltige Aktion uebergeben ' + o), 
                c = -1;
            }
            return c;
        })) : (this._error('start', 'Port hat keine Credentials'), -1);
    }, r.prototype.stop = function(t, o, r) {
        if (!this.isRunning()) return 0;
        if (!this.isOpen()) return this._error('stop', 'Port ist nicht geoeffnet'), -1;
        if (!this.mMicrosoftConfig.isCredentials()) return this._error('stop', 'Port hat keine Credentials'), 
        -1;
        if (!this.mTransaction) return this._error('stop', 'keine Transaktion vorhanden'), 
        -1;
        if (t !== this.mTransaction.plugin) return this._error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + t + ' != ' + this.mTransaction.plugin), 
        -1;
        if (o) {
            if (o !== this.mTransaction.type) return this._error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + o + ' != ' + this.mTransaction.type), 
            -1;
        } else o = this.mTransaction.type;
        var n = 0;
        switch (o) {
          case "NLU":
            n = this._stopNLU(this.mTransaction);
            break;

          case "ASR":
            n = this._stopASR(this.mTransaction);
            break;

          case "TTS":
            n = this._stopTTS(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + o), n = -1;
        }
        return this.mRunningFlag = !1, n;
    }, r.prototype._initRecognition = function(t) {
        var o = this;
        return this.mDefaultOptions = {
            onopen: function() {
                console.log('Websocket Opened');
            },
            onclose: function() {
                console.log('Websocket Closed'), o._onClose();
            },
            onerror: function(t) {
                console.error(t), o._onError(t);
            }
        }, 0;
    }, r.prototype._startNLU = function(t, o, r) {
        if (!o) return this._error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!r) return this._error('_startNLU', 'keine Sprache uebergeben'), -1;
        if (!this.mMicrosoftNLU) return this._error('_startNLU', 'keine Microsoft NLU-Anbindung vorhanden'), 
        -1;
        try {
            var n = {
                text: o,
                language: r
            };
            return this.mMicrosoftNLU.start(t, n);
        } catch (t) {
            return this._exception('_startNLU', t), -1;
        }
    }, r.prototype._stopNLU = function(t) {
        if (!this.mMicrosoftNLU) return this._error('_stopNLU', 'keine Microsoft NLU-Anbindung vorhanden'), 
        -1;
        try {
            return this.mMicrosoftNLU.stop(t);
        } catch (t) {
            return this._exception('_stopNLU', t), -1;
        }
    }, r.prototype._startASR = function(t, o, r, n, i) {
        if (void 0 === n && (n = !1), void 0 === i && (i = !1), !o) return this._error('_startASR', 'keine Sprache uebergeben'), 
        -1;
        if (!this.mMicrosoftASR) return this._error('_startASR', 'keine Microsoft ASR-Anbindung vorhanden'), 
        -1;
        try {
            var e = {
                language: o,
                nlu: n,
                progressive: i
            };
            return r && (e.audioURL = r), this.mMicrosoftASR.start(t, e);
        } catch (t) {
            return this._exception('_startASR', t), -1;
        }
    }, r.prototype._stopASR = function(t) {
        if (!this.mMicrosoftASR) return this._error('_stopASR', 'keine Microsoft ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this.mMicrosoftASR.stop(t);
        } catch (t) {
            return this._exception('_stopASR', t), -1;
        }
    }, r.prototype._startTTS = function(t, o, r, n) {
        var i = this;
        if (!o) return this._error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.mMicrosoftTTS) return this._error('_startTTS', 'keine Microsoft TTS-Anbindung vorhanden'), 
        -1;
        try {
            var e = {
                text: o,
                language: r,
                voice: n
            };
            return this._unlockAudio((function(o) {
                o ? i.mMicrosoftTTS.start(t, e) : (i._error('_startTTS', 'AudioContext ist nicht entsperrt'), 
                i._onStop(t.plugin, t.type));
            })), 0;
        } catch (t) {
            return this._exception('_startTTS', t), -1;
        }
    }, r.prototype._stopTTS = function(t) {
        if (!this.mMicrosoftTTS) return this._error('_stopTTS', 'keine Microsoft TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this.mMicrosoftTTS.stop(t);
        } catch (t) {
            return this._exception('_stopTTS', t), -1;
        }
    }, r;
}(e), ht = function(t) {
    function o() {
        return t.call(this, 'MicrosoftFactory') || this;
    }
    return rt(o, t), o.prototype.getType = function() {
        return "Microsoft";
    }, o.prototype.getName = function() {
        return "MicrosoftFactory";
    }, o.prototype._newPort = function(t, o) {
        var r = null;
        switch (t) {
          case "MicrosoftPort":
          case "MicrosoftPort":
            r = new pt(t, o);
            break;

          case "MicrosoftMock":
            r = new nt("MicrosoftMock", o);
            break;

          default:
            this._error('_newPort', 'kein Port vorhanden');
        }
        return r;
    }, o.prototype.create = function(t, o) {
        void 0 === o && (o = !0);
        var r = t || "MicrosoftPort";
        try {
            return this._newPort(r, o);
        } catch (t) {
            return this._exception('create', t), null;
        }
    }, o;
}(n), mt = function() {
    function t() {}
    return t.setErrorOutputOn = function() {
        t.mErrorOutputFlag = !0, r.setErrorOutputOn();
    }, t.setErrorOutputOff = function() {
        t.mErrorOutputFlag = !1, r.setErrorOutputOff();
    }, t.setErrorOutputFunc = function(t) {
        r._setErrorOutputFunc(t);
    }, t._initMicrosoftPort = function(o) {
        var n = r.get("Microsoft", pt);
        return n ? 0 !== n.init(o) ? (r.remove("Microsoft"), -1) : (t.mCurrentPort = n, 
        0) : -1;
    }, t._initMicrosoftMock = function(o) {
        var n = r.get("Microsoft", nt);
        return n ? 0 !== n.init(o) ? (console.log('Microsoft._initMicrosoftMock: Error MicrosoftMock wurde nicht initialisiert'), 
        r.remove("Microsoft"), -1) : (t.mCurrentPort = n, 0) : (console.log('Microsoft._initMicrosoftMock: Error MicrosoftMock wurde nicht erzeugt'), 
        -1);
    }, t.init = function(o) {
        if (t.mInitFlag) return 0;
        if (!o) return t.mErrorOutputFlag && console.log('Microsoft.init: Keine Microsoft-Parameter uebergeben'), 
        -1;
        'boolean' == typeof o.errorOutputFlag && (o.errorOutputFlag ? t.setErrorOutputOn() : t.setErrorOutputOff());
        var r = 'MicrosoftPort';
        if (o && 'string' == typeof o.microsoftPortName && 'MicrosoftMock' === o.microsoftPortName && (r = 'MicrosoftMock'), 
        'MicrosoftPort' === r) {
            if (0 !== t._initMicrosoftPort(o)) return -1;
        } else {
            if ('MicrosoftMock' !== r) return t.mErrorOutputFlag && console.log('Microsoft.init: Kein Microsoft PortName vorhanden'), 
            -1;
            if (0 !== t._initMicrosoftMock(o)) return -1;
        }
        return t.mInitFlag = !0, 0;
    }, t.isInit = function() {
        return t.mInitFlag;
    }, t.done = function() {
        var o = r.find("Microsoft");
        o || (o = t.mCurrentPort);
        var n = 0;
        return o && (n = o.done(), r.remove("Microsoft")), t.mCurrentPort = null, t.mInitFlag = !1, 
        n;
    }, t._onOpenEvent = function(o, r, n, i) {
        if ('function' == typeof i) try {
            return i(o, r, n), 0;
        } catch (o) {
            return t.mErrorOutputFlag && console.log('Microsoft._onOpenEvent: Exception', o.message), 
            -1;
        }
        return 0;
    }, t._openMicrosoftPort = function(o) {
        var n = r.find("Microsoft");
        return n || (n = t.mCurrentPort), n ? (n.addOpenEvent("Microsoft", (function(r) {
            return n.removeErrorEvent("Microsoft"), n.removeOpenEvent("Microsoft"), 'function' == typeof o && t._onOpenEvent(null, "Microsoft", r.result, o), 
            r.result;
        })), n.addErrorEvent("Microsoft", (function(r) {
            return n.removeOpenEvent("Microsoft"), n.removeErrorEvent("Microsoft"), 'function' == typeof o && t._onOpenEvent(r, "Microsoft", -1, o), 
            0;
        })), n.open()) : (t.mErrorOutputFlag && console.log('Microsoft._openMicrosoftPort: kein Port vorhanden'), 
        t._onOpenEvent(new Error('Microsoft._openMicrosoftPort: Kein Port vorhanden'), "Microsoft", -1, o), 
        -1);
    }, t.open = function(o) {
        return t.mInitFlag ? t._openMicrosoftPort(o) : (t.mErrorOutputFlag && console.log('Microsoft.open: Init wurde nicht aufgerufen'), 
        t._onOpenEvent(new Error('Microsoft.open: Init wurde nicht aufgerufen'), "Microsoft", -1, o), 
        -1);
    }, t.setConfig = function(o) {
        return t.mCurrentPort ? t.mCurrentPort.setConfig(o) : -1;
    }, t.getConfig = function() {
        return t.mCurrentPort ? t.mCurrentPort.getConfig() : {
            microsoftRegion: '',
            microsoftSubscriptionKey: '',
            microsoftLuisEndpoint: ''
        };
    }, t.mInitFlag = !1, t.mErrorOutputFlag = !1, t.mCurrentPort = null, t;
}();

export { S as MICROSOFT_API_VERSION, L as MICROSOFT_ASRNLU_ACTION, F as MICROSOFT_ASR_ACTION, H as MICROSOFT_ASR_LANGUAGE, D as MICROSOFT_ASR_LANGUAGE1, K as MICROSOFT_ASR_LANGUAGE2, Z as MICROSOFT_AUDIOBUFFER_SIZE, $ as MICROSOFT_AUDIOSAMPLE_RATE, Y as MICROSOFT_AUDIOTTS_ID, tt as MICROSOFT_AUDIO_FORMAT, U as MICROSOFT_CONFIG_FILE, P as MICROSOFT_CONFIG_LOAD, O as MICROSOFT_CONFIG_PATH, Q as MICROSOFT_DEFAULT_CODEC, I as MICROSOFT_DEFAULT_LANGUAGE, b as MICROSOFT_DEFAULT_NAME, k as MICROSOFT_DEFAULT_URL, W as MICROSOFT_DEFAULT_VOICE, w as MICROSOFT_DE_LANGUAGE, x as MICROSOFT_EN_LANGUAGE, C as MICROSOFT_FACTORY_NAME, R as MICROSOFT_MOCK_NAME, E as MICROSOFT_NLU_ACTION, J as MICROSOFT_PCM_CODEC, A as MICROSOFT_PORT_NAME, v as MICROSOFT_SERVER_URL, y as MICROSOFT_SERVER_VERSION, N as MICROSOFT_TTS_ACTION, G as MICROSOFT_TTS_LANGUAGE, j as MICROSOFT_TTS_LANGUAGE1, z as MICROSOFT_TTS_LANGUAGE2, V as MICROSOFT_TTS_VOICE, q as MICROSOFT_TTS_VOICE1, B as MICROSOFT_TTS_VOICE2, X as MICROSOFT_TTS_VOICE3, M as MICROSOFT_TYPE_NAME, l as MICROSOFT_VERSION_BUILD, d as MICROSOFT_VERSION_DATE, m as MICROSOFT_VERSION_NUMBER, _ as MICROSOFT_VERSION_STRING, g as MICROSOFT_VERSION_TYPE, T as MICROSOFT_WORKER_VERSION, mt as Microsoft, ht as MicrosoftFactory };
