/**
 * Speech-Nuance
 * 
 * Version: 0.1.8
 * Build:   0009
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

import { FactoryManager as n } from '../../core/factory/factory-manager.ts';

import '../../core/factory/factory.ts';

import '../../core/plugin/plugin-manager.ts';

import '../../core/plugin/plugin-factory.ts';

import '../../core/plugin/plugin-group.ts';

import '../../core/plugin/plugin.ts';

import { PortManager as e } from '../../core/port/port-manager.ts';

import { PortFactory as r } from '../../core/port/port-factory.ts';

import { PortTransaction as o } from '../../core/port/port-transaction.ts';

import { Port as i } from '../../core/port/port.ts';

import '../../common/audio/audio-codec.ts';

import { AudioPlayer as a } from '../../common/audio/audio-player.ts';

import { AudioRecorder as s } from '../../common/audio/audio-recorder.ts';

import '../../common/audio/audio-resampler.ts';

import { FileHtml5Reader as u } from '../../common/html5/file-html5-reader.ts';

import { AudioHtml5Reader as c } from '../../common/html5/audio-html5-reader.ts';

import { NetHtml5Connect as p } from '../../common/html5/net-html5-connect.ts';

import { NetHtml5WebSocket as l } from '../../common/html5/net-html5-websocket.ts';

import '../../common/html5/audiocontext-factory.ts';

import '../../common/html5/speechrecognition-factory.ts';

import '../../common/html5/speechsynthesis-factory.ts';

import '../../common/html5/websocket-factory.ts';

import '../../common/html5/webworker-factory.ts';

import { USERMEDIA_FACTORY_NAME as h, UserMediaFactory as m } from '../../common/html5/usermedia-factory.ts';

import '../../common/html5/xmlhttprequest-factory.ts';

import { AudioContextManager as g } from '../../common/html5/audiocontext-manager.ts';

var f = '0.1.8', d = '0009', _ = 'ALPHA', y = '30.05.2020', N = "0.1.8.0009 vom 30.05.2020 (ALPHA)", T = "0.1.8.0009 vom 30.05.2020 (ALPHA)", S = "0.1.8.0009 vom 30.05.2020 (ALPHA)", A = "0.1.8.0009 vom 30.05.2020 (ALPHA)", C = 'Nuance', k = 'NuanceFactory', v = 'NuancePort', b = 'NuanceMock', R = "NuancePort", O = 'wss://ws.dev.nuance.com/v2', E = "wss://ws.dev.nuance.com/v2", U = 'NLU', P = 'ASR', F = 'ASRNLU', I = 'TTS', L = 'assets/', M = 'nuance.json', w = !1, D = 'deu-DEU', x = 'eng-USA', W = "deu-DEU", K = 'deu-DEU', j = 'eng-USA', q = "deu-DEU", Q = 'deu-DEU', J = 'eng-USA', G = "deu-DEU", V = 'Yannick', B = 'Markus', H = 'Anna-ML', z = 'Petra-ML', Y = "Petra-ML", X = "Petra-ML", Z = 789, $ = 'audio/L16;rate=16000', tt = "audio/L16;rate=16000", nt = 2048, et = 16e3, rt = function(t, n) {
    return (rt = Object.setPrototypeOf || {
        __proto__: []
    } instanceof Array && function(t, n) {
        t.__proto__ = n;
    } || function(t, n) {
        for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
    })(t, n);
};

function ot(t, n) {
    function e() {
        this.constructor = t;
    }
    rt(t, n), t.prototype = null === n ? Object.create(n) : (e.prototype = n.prototype, 
    new e);
}

var it = function(t) {
    function n(n, e) {
        void 0 === e && (e = !0);
        var r = t.call(this, n || "NuanceMock", e) || this;
        return r.webSocketFlag = !0, r.audioContextFlag = !0, r.getUserMediaFlag = !0, r.nuanceNLUFlag = !0, 
        r.nuanceASRFlag = !0, r.nuanceTTSFlag = !0, r.disconnectFlag = !0, r.defaultOptions = null, 
        r.codec = '', r.intentName = 'TestIntent', r.intentConfidence = 1, r.mDynamicCredentialsFlag = !1, 
        r.mTransaction = null, r.mRunningFlag = !1, r.nuanceAppId = '', r.nuanceAppKey = '', 
        r.nuanceNluTag = '', r;
    }
    return ot(n, t), n.prototype.isMock = function() {
        return !0;
    }, n.prototype.getType = function() {
        return "Nuance";
    }, n.prototype.getClass = function() {
        return 'NuanceMock';
    }, n.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.nuanceAppId && (this.nuanceAppId = t.nuanceAppId), 
        'string' == typeof t.nuanceAppKey && (this.nuanceAppKey = t.nuanceAppKey), 'string' == typeof t.nuanceNluTag && (this.nuanceNluTag = t.nuanceNluTag), 
        'string' == typeof t.nuanceAppId && (!!t.nuanceAppId && ('string' == typeof t.nuanceAppKey && !!t.nuanceAppKey)));
    }, n.prototype.init = function(n) {
        if (n && 'boolean' == typeof n.errorOutputFlag && this._setErrorOutput(n.errorOutputFlag), 
        this.mInitFlag) return this._error('init', 'Init bereits aufgerufen'), 0;
        if (n && 'boolean' == typeof n.nuanceDynamicCredentialsFlag && n.nuanceDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0, 
        this._checkCredentials(n); else if (!this._checkCredentials(n)) return (this.isErrorOutput() || n && n.errorOutputFlag) && this._error('init', 'keine AppId und/oder AppKey als Parameter uebergeben'), 
        -1;
        return this.webSocketFlag ? (this.audioContextFlag || (this._error('init', 'kein Audiokontext vorhanden, TTS und ASR werden abgeschaltet'), 
        this._onInit(-1)), this.nuanceNLUFlag = !0, this.audioContextFlag && (this.nuanceASRFlag = !0, 
        this.getUserMediaFlag && (this.nuanceTTSFlag = !0)), this.isErrorOutput() && (this.nuanceNLUFlag ? console.log('NuanceMock: NLU ist vorhanden') : console.log('NuanceMock: NLU ist nicht vorhanden'), 
        this.nuanceTTSFlag ? console.log('NuanceMock: TTS ist vorhanden') : console.log('NuanceMock: TTS ist nicht vorhanden'), 
        this.nuanceASRFlag ? console.log('NuanceMock: ASR ist vorhanden') : console.log('NuanceMock: ASR ist nicht vorhanden')), 
        this._onInit(0), t.prototype.init.call(this, n)) : (this._error('init', 'keine WebSocket vorhanden'), 
        this._onInit(-1), -1);
    }, n.prototype.done = function(n) {
        return t.prototype.done.call(this), this.webSocketFlag = !0, this.audioContextFlag = !0, 
        this.getUserMediaFlag = !0, this.nuanceNLUFlag = !1, this.nuanceASRFlag = !1, this.nuanceTTSFlag = !1, 
        this.disconnectFlag = !0, this.defaultOptions = null, this.codec = '', this.mTransaction = null, 
        this.mRunningFlag = !1, 0;
    }, n.prototype.reset = function(n) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, n);
    }, n.prototype._onStop = function(n, e) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype._onStop.call(this, n, e);
    }, n.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this._error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return this.nuanceAppId = t.nuanceAppId, this.nuanceAppKey = t.nuanceAppKey, 'string' == typeof t.nuanceNluTag && (this.nuanceNluTag = t.nuanceNluTag), 
            0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, n.prototype.getConfig = function() {
        return {
            nuanceAppId: this.nuanceAppId,
            nuanceAppKey: this.nuanceAppKey,
            nuanceNluTag: this.nuanceNluTag
        };
    }, n.prototype.isOpen = function() {
        return !this.disconnectFlag;
    }, n.prototype.open = function(t) {
        return this.disconnectFlag ? (this.disconnectFlag = !1, this._onOpen(), 0) : 0;
    }, n.prototype.close = function() {
        return this.disconnectFlag = !0, 0;
    }, n.prototype.isRunning = function() {
        return this.mRunningFlag;
    }, n.prototype._isCredentials = function() {
        return !(!this.nuanceAppId || !this.nuanceAppKey);
    }, n.prototype.isAction = function(t) {
        var n = !1;
        switch (t) {
          case "NLU":
            n = this.nuanceNLUFlag;
            break;

          case "ASRNLU":
          case "ASR":
            n = this.nuanceASRFlag;
            break;

          case "TTS":
            n = this.nuanceTTSFlag;
        }
        return n;
    }, n.prototype.start = function(t, n, e) {
        if (this.isRunning()) return this._error('start', 'Aktion laeuft bereits'), -1;
        if (!this.isOpen()) return this._error('start', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this._error('start', 'Port hat keine Credentials'), 
        -1;
        if (this.mTransaction) return this._error('start', 'andere Transaktion laeuft noch'), 
        -1;
        var r = e || {};
        this.mRunningFlag = !0;
        var i = 0;
        switch (n) {
          case "NLU":
            this.mTransaction = new o(t, "NLU"), i = this._startNLU(this.mTransaction, r.text, r.language || "deu-DEU");
            break;

          case "ASRNLU":
            this.mTransaction = new o(t, "ASRNLU"), i = this._startASR(this.mTransaction, r.language || "deu-DEU", r.audioURL || '', !0, r.useProgressive || !1);
            break;

          case "ASR":
            this.mTransaction = new o(t, "ASR"), i = this._startASR(this.mTransaction, r.language || "deu-DEU", r.audioURL || '', !1, r.useProgressive || !1);
            break;

          case "TTS":
            this.mTransaction = new o(t, "TTS"), i = this._startTTS(this.mTransaction, r.text, r.language || "deu-DEU", r.voice || "Petra-ML");
            break;

          default:
            this._error('start', 'Keine gueltige Aktion uebergeben ' + n), i = -1;
        }
        return i;
    }, n.prototype.stop = function(t, n, e) {
        if (!this.isRunning()) return 0;
        if (!this.isOpen()) return this._error('stop', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this._error('stop', 'Port hat keine Credentials'), 
        -1;
        if (!this.mTransaction) return this._error('stop', 'keine Transaktion vorhanden'), 
        -1;
        if (t !== this.mTransaction.plugin) return this._error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + t + ' != ' + this.mTransaction.plugin), 
        -1;
        if (n) {
            if (n !== this.mTransaction.type) return this._error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + n + ' != ' + this.mTransaction.type), 
            -1;
        } else n = this.mTransaction.type;
        var r = 0;
        switch (n) {
          case "NLU":
            r = this._stopNLU(this.mTransaction);
            break;

          case "ASRNLU":
          case "ASR":
            r = this._stopASR(this.mTransaction);
            break;

          case "TTS":
            r = this._stopTTS(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + n), r = -1;
        }
        return this.mTransaction = null, this.mRunningFlag = !1, r;
    }, n.prototype._startNLU = function(t, n, e) {
        if (!n) return this._error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!this.nuanceNLUFlag) return this._error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden'), 
        -1;
        try {
            this._onStart(t.plugin, t.type);
            var r = [ {
                action: {
                    intent: {
                        value: this.intentName,
                        confidence: this.intentConfidence
                    }
                },
                literal: n
            } ];
            return t.result = r, this._onResult(t.result, t.plugin, t.type), this._onStop(t.plugin, t.type), 
            0;
        } catch (t) {
            return this._exception('_startNLU', t), -1;
        }
    }, n.prototype._stopNLU = function(t) {
        return this._onStop(t.plugin, t.type), 0;
    }, n.prototype._startASR = function(t, n, e, r, o) {
        if (!this.nuanceASRFlag) return this._error('_startASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), t.result = "Testtext", this._onResult(t.result, t.plugin, t.type), 
            this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_startASR', t), -1;
        }
    }, n.prototype._stopASR = function(t) {
        if (!this.nuanceASRFlag) return this._error('_stopASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_stopASR', t), -1;
        }
    }, n.prototype._startTTS = function(t, n, e, r) {
        var o = this;
        if (!n) return this._error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.nuanceTTSFlag) return this._error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), setTimeout((function() {
                return o._onStop(t.plugin, t.type);
            }), 100), 0;
        } catch (t) {
            return this._exception('_startTTS', t), -1;
        }
    }, n.prototype._stopTTS = function(t) {
        if (!this.nuanceTTSFlag) return this._error('_stopTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_stopTTS', t), -1;
        }
    }, n;
}(i), at = function(t) {
    function n(n) {
        var e = t.call(this, 'NuanceConfig') || this;
        return e.mInitFlag = !1, e.mConfigPath = "assets/", e.mConfigFile = "nuance.json", 
        e.mConfigLoadFlag = !1, e.mConfigServerUrl = "wss://ws.dev.nuance.com/v2", e.mConfigAppId = '', 
        e.mConfigAppKey = '', e.mConfigUserId = '', e.mConfigNluTag = '', e.mFileReader = null, 
        e.mOnInitFunc = null, e.mOnErrorFunc = null, e.mFileReader = n, e._setErrorOutputFunc((function(t) {
            return e._onError(new Error(t));
        })), e;
    }
    return ot(n, t), n.prototype._setOption = function(t) {
        t && ('string' == typeof t.nuanceConfigPath && (this.mConfigPath = t.nuanceConfigPath), 
        'string' == typeof t.nuanceConfigFile && (this.mConfigFile = t.nuanceConfigFile), 
        'boolean' == typeof t.nuanceConfigLoadFlag && (this.mConfigLoadFlag = t.nuanceConfigLoadFlag), 
        'string' == typeof t.nuanceServerUrl && (this.mConfigServerUrl = t.nuanceServerUrl), 
        'string' == typeof t.nuanceAppId && (this.mConfigAppId = t.nuanceAppId), 'string' == typeof t.nuanceAppKey && (this.mConfigAppKey = t.nuanceAppKey), 
        'string' == typeof t.nuanceUserId && (this.mConfigUserId = t.nuanceUserId), 'string' == typeof t.nuanceNluTag && (this.mConfigNluTag = t.nuanceNluTag));
    }, n.prototype.init = function(t) {
        return this._setOption(t), this.mInitFlag = !0, 0;
    }, n.prototype.done = function() {
        return this.mInitFlag = !1, this.mConfigPath = "assets/", this.mConfigFile = "nuance.json", 
        this.mConfigLoadFlag = !1, this.mConfigServerUrl = "wss://ws.dev.nuance.com/v2", 
        this.mConfigAppId = '', this.mConfigAppKey = '', this.mConfigUserId = '', this.mConfigNluTag = '', 
        this.mFileReader = null, this.mOnInitFunc = null, 0;
    }, n.prototype.isInit = function() {
        return this.mInitFlag;
    }, n.prototype._onInit = function(t) {
        0 === t && (this.mInitFlag = !0), 'function' == typeof this.mOnInitFunc && this.mOnInitFunc(t);
    }, n.prototype._onError = function(t) {
        if ('function' == typeof this.mOnErrorFunc) try {
            return this.mOnErrorFunc(t), 0;
        } catch (t) {
            return this.isErrorOutput() && console.log('===> EXCEPTION NuanceConfig._onError: ', t.message), 
            -1;
        }
        return 0;
    }, Object.defineProperty(n.prototype, "onInit", {
        set: function(t) {
            this.mOnInitFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), n.prototype._readConfigData = function(t) {
        if (!t) return this._error('_readConfigData', 'keine Daten uebergeben'), -1;
        try {
            var n = JSON.parse(t);
            return n.URL && (this.serverUrl = n.URL), n.APP_ID && (this.appId = n.APP_ID), n.APP_KEY && (this.appKey = n.APP_KEY), 
            n.USER_ID && (this.userId = n.USER_ID), n.NLU_TAG && (this.nluTag = n.NLU_TAG), 
            this._onInit(0), 0;
        } catch (t) {
            return this._exception('_readConfigData', t), -1;
        }
    }, n.prototype._readError = function(t) {
        this._error('_readError', t), this._onInit(-1);
    }, n.prototype.read = function() {
        if (!this.mFileReader) return this._error('read', 'kein FileReader vorhanden'), 
        this._onInit(-1), -1;
        var t = this.mConfigPath + this.mConfigFile;
        return this.mFileReader.read(t);
    }, Object.defineProperty(n.prototype, "serverUrl", {
        get: function() {
            return this.mConfigServerUrl;
        },
        set: function(t) {
            this.mConfigServerUrl = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "appId", {
        get: function() {
            return this.mConfigAppId;
        },
        set: function(t) {
            this.mConfigAppId = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "appKey", {
        get: function() {
            return this.mConfigAppKey;
        },
        set: function(t) {
            this.mConfigAppKey = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "userId", {
        get: function() {
            return this.mConfigUserId;
        },
        set: function(t) {
            this.mConfigUserId = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "nluTag", {
        get: function() {
            return this.mConfigNluTag;
        },
        set: function(t) {
            this.mConfigNluTag = t;
        },
        enumerable: !0,
        configurable: !0
    }), n.prototype.isCredentials = function() {
        return !(!this.mConfigAppKey || !this.mConfigAppId);
    }, n;
}(t), st = function(t) {
    function n() {
        return t.call(this, 'NuanceNetwork') || this;
    }
    return ot(n, t), n;
}(p), ut = function(t) {
    function n() {
        return t.call(this, 'NuanceWebSocket') || this;
    }
    return ot(n, t), n.prototype.connect = function(t) {
        return t ? 0 !== this._connect(t) ? (this._error('open', 'keine Verbindung moeglich'), 
        -1) : 0 : (this._error('connect', 'keine URL vorhanden'), -1);
    }, n.prototype.disconnect = function() {
        this.onMessage = null, this.close();
    }, n.prototype.sendJSON = function(t) {
        this.sendMessage(t);
    }, n;
}(l), ct = function(t) {
    function n(n) {
        var e = t.call(this, 'NuanceConnect') || this;
        return e.mWebSocket = null, e.mWebSocket = n, e;
    }
    return ot(n, t), n.prototype._sendConnectMessage = function(t) {
        var n = window.navigator, e = [ n.platform, n.vendor, n.language ].join('_').replace(/\s/g, ''), r = {
            message: 'connect',
            user_id: t.userId,
            codec: t.codec || 'audio/L16;rate=16000',
            app_id: t.appId,
            app_key: t.appKey,
            device_id: e,
            phone_model: 'nuance_internal_mixjsapp',
            phone_number: t.userId
        };
        return this.mWebSocket.sendMessage(r);
    }, n.prototype.connect = function(t) {
        t = t || {}, this._sendConnectMessage(t), t.onopen(), this.mWebSocket.onMessage = function(n) {
            try {
                switch (typeof n.data) {
                  case 'object':
                    t.onttsdecode(t, n.data);
                    break;

                  case 'string':
                    var e = JSON.parse(n.data);
                    'volume' === e.message ? t.onvolume(e.volume) : t.onresult(e), 'audio_begin' === e.message && t.onttsstart(), 
                    'audio_end' === e.message && t.onttscomplete();
                    break;

                  default:
                    t.onresult(n.data);
                }
                return 0;
            } catch (t) {
                return console.log('NuanceConnect.connect: Exception', t.message), -1;
            }
        };
    }, n.prototype.disconnect = function() {
        return this.mWebSocket && (this.mWebSocket.onMessage = null), 0;
    }, n.prototype.sendJSON = function(t) {
        return this.mWebSocket ? this.mWebSocket.sendMessage(t) : -1;
    }, Object.defineProperty(n.prototype, "webSocket", {
        get: function() {
            return this.mWebSocket.webSocket;
        },
        enumerable: !0,
        configurable: !0
    }), n;
}(t), pt = function(t) {
    function n(n, e, r) {
        var o = t.call(this, n || 'NuanceDevice') || this;
        return o.mConfig = null, o.mConnect = null, o.mTransaction = null, o.onStart = null, 
        o.onStop = null, o.onResult = null, o.onError = null, o.onClose = null, o.mConfig = e, 
        o.mConnect = r, o;
    }
    return ot(n, t), n.prototype._onStart = function() {
        return this.mTransaction && this.onStart && this.onStart(this.mTransaction), 0;
    }, n.prototype._onStop = function() {
        return this.mTransaction && this.onStop && this.onStop(this.mTransaction), this.mTransaction = null, 
        0;
    }, n.prototype._onResult = function(t) {
        return this.mTransaction && this.onResult && (this.mTransaction.result = t, this.onResult(this.mTransaction)), 
        0;
    }, n.prototype._onError = function(t) {
        return this.mTransaction && this.onError && (this.mTransaction.error = t, this.onError(this.mTransaction)), 
        0;
    }, n.prototype._onClose = function() {
        return this.mTransaction && this.onClose && this.onClose(this.mTransaction), 0;
    }, n.prototype._getDefaultOption = function() {
        var t = this;
        return {
            onopen: function() {
                t._onStart();
            },
            onclose: function() {
                t._onClose(), t._onStop();
            },
            onerror: function(n) {
                t._onError(n), t._onStop();
            }
        };
    }, n.prototype._createOption = function(t) {
        var n = Object.assign(t, this._getDefaultOption());
        return n.appId = t.appId || this.mConfig.appId || '', n.appKey = t.appKey || this.mConfig.appKey || '', 
        n.userId = t.userId || this.mConfig.userId, n.tag = t.tag || this.mConfig.nluTag || '', 
        n.language = t.language || "deu-DEU", n.text = t.text || '', n.voice = t.voice || "Petra-ML", 
        n.codec = t.codec || "audio/L16;rate=16000", n;
    }, n.prototype._sendQueryEndMessage = function(t) {
        var n = {
            message: 'query_end',
            transaction_id: t
        };
        return this.mConnect.sendJSON(n);
    }, n.prototype._start = function(t) {}, n.prototype._stop = function() {}, n.prototype.start = function(t, n) {
        if (!t) return this._error('start', 'keine Transaktion uebergeben'), -1;
        if (this.mTransaction) return this._error('start', 'vorherige Transaktion nicht beendet'), 
        -1;
        this.mTransaction = t;
        try {
            return this._start(n), 0;
        } catch (t) {
            return this._exception('start', t), -1;
        }
    }, n.prototype.stop = function(t) {
        if (!t) return this._error('stop', 'keine Transaktion uebergeben'), -1;
        if (!this.mTransaction) return this._error('stop', 'keine Transaktion gestartet'), 
        -1;
        if (this.mTransaction.transactionId !== t.transactionId) return this._error('stop', 'Transaktions-ID stimmt nicht ueberein'), 
        -1;
        try {
            return this._stop(), this._onStop(), 0;
        } catch (t) {
            return this._exception('stop', t), -1;
        }
    }, n.prototype.isTransaction = function() {
        return !!this.mTransaction;
    }, n.prototype.getTransaction = function() {
        return this.mTransaction;
    }, n.prototype.clearTransaction = function() {
        this.mTransaction = null;
    }, n;
}(t), lt = function(t) {
    function n(n, e, r, o, i) {
        var a = t.call(this, 'NuanceASR', n, e) || this;
        return a.mAudioContext = null, a.mGetUserMedia = null, a.mAudioReader = null, a.mAudioRecorder = null, 
        a.mUserMediaStream = null, a.mRequestId = 0, a.mVolumeCounter = 0, a.mTimeoutCounter = 0, 
        a.mRecordingFlag = !1, a.mAudioContext = r, a.mGetUserMedia = o, a.mAudioReader = i, 
        a;
    }
    return ot(n, t), n.prototype.isVolume = function(t) {
        if (this.mVolumeCounter += 1, this.mTimeoutCounter += 1, t) try {
            for (var n = t.length, e = 0, r = 0; r < n; r++) e += t[r] * t[r];
            var o = Math.sqrt(e / n);
            (o < 127 || o > 128) && (this.mVolumeCounter = 0);
        } catch (t) {
            this._exception('isVolume', t);
        }
        return 50 !== this.mVolumeCounter && 200 !== this.mTimeoutCounter;
    }, n.prototype._getDefaultOption = function() {
        var n = this, e = t.prototype._getDefaultOption.call(this);
        return e.onvolume = function(t) {
            n.isVolume(t) || n._stop();
        }, e.onresult = function(t) {
            if ('NVC_ASR_CMD' === t.result_type || 'NMDP_ASR_CMD' === t.result_type) 'rec_text_results' === t.result_format ? n._onResult(t.transcriptions) : console.log('ASR Response', t); else if ('NDSP_ASR_APP_CMD' === t.result_type || 'NDSP_APP_CMD' === t.result_type) if ('nlu_interpretation_results' === t.result_format) if ('failure' !== t.nlu_interpretation_results.status) try {
                n._onResult(t.nlu_interpretation_results.payload.interpretations);
            } catch (t) {
                n._onError(new Error('ASRNLU-Exception: ' + t.message));
            } else n._onError(new Error('ASRNLU-Error: ' + t.nlu_interpretation_results.reason)); else 'rec_text_results' === t.result_format ? n._onResult(t.transcriptions) : console.log('ASR', t); else 'NDSP_CONCEPT_UPLOAD_FULL_CMD' === t.result_type || 'NDSP_DELETE_ALL_CONCEPTS_DATA_CMD' === t.result_type || ('query_error' === t.message ? (n._onError(new Error('ASR-Error.' + t.message + ': ' + t.reason)), 
            n._onStop()) : 'disconnect' === t.message && ('Transaction completed.' !== t.reason && (n._onError(new Error('ASR-Error.' + t.message + ': ' + t.reason)), 
            n._stop()), n._onStop()));
        }, e;
    }, n.prototype._sendQueryBeginMessage = function(t, n, e, r, o) {
        var i = {
            message: 'query_begin',
            transaction_id: t,
            language: n,
            codec: r
        };
        return o ? (i.command = 'NDSP_ASR_APP_CMD', i.context_tag = e) : (i.command = 'NMDP_ASR_CMD', 
        i.recognition_type = e || 'dictation'), this.mConnect.sendJSON(i);
    }, n.prototype._sendRequestInfoMessage = function(t, n) {
        var e = {};
        n && (e.result_delivery = 'progressive');
        var r = {
            message: 'query_parameter',
            transaction_id: t,
            parameter_name: 'REQUEST_INFO',
            parameter_type: 'dictionary',
            dictionary: e
        };
        return this.mConnect.sendJSON(r);
    }, n.prototype._sendAudioInfoMessage = function(t, n) {
        var e = {
            message: 'query_parameter',
            transaction_id: t,
            parameter_name: 'AUDIO_INFO',
            parameter_type: 'audio',
            audio_id: n
        };
        return this.mConnect.sendJSON(e);
    }, n.prototype._sendAudioBeginMessage = function(t) {
        var n = {
            message: 'audio',
            audio_id: t
        };
        return this.mConnect.sendJSON(n);
    }, n.prototype._startASR = function(t) {
        var n = this;
        t = this._createOption(t);
        var e = Object.assign({}, t);
        e.onopen = function() {
            t.onopen(), n.mRequestId++, n._sendQueryBeginMessage(n.mTransaction.transactionId, e.language, e.tag, e.codec, e.nlu), 
            n._sendRequestInfoMessage(n.mTransaction.transactionId, e.progressive), n._sendAudioInfoMessage(n.mTransaction.transactionId, n.mRequestId), 
            n._sendQueryEndMessage(n.mTransaction.transactionId), n._sendAudioBeginMessage(n.mRequestId);
            try {
                if (n.mAudioRecorder = new s(n.mConnect.webSocket, n.mAudioContext, (function(n) {
                    t.onvolume(n);
                })), t.userMediaStream) n.mAudioRecorder.start(t.userMediaStream, e.codec); else {
                    if (!t.audioData) return void console.log('NuanceASR._startASR: keine Audiodaten vorhanden');
                    n.mAudioRecorder.startAudio(t.audioData, e.codec);
                }
                n.mRecordingFlag = !0;
            } catch (t) {
                n._exception('_start', t);
            }
        }, this.mConnect.connect(e);
    }, n.prototype._startAudio = function(t) {
        var n = this;
        return t && t.audioURL && this.mAudioReader ? (this.mAudioReader.onRead = function(e) {
            console.log('NuanceASR._startAudio: Aufruf von _startASR mit den Audiodaten'), t.audioData = e, 
            n._startASR(t);
        }, this.mAudioReader.onError = function(t) {
            console.log('NuanceASR._startAudio: Fehlermeldung', t), n._error('_startAudio', t), 
            n._onStop();
        }, this.mAudioReader.read(t.audioURL)) : (this._error('_startAudio', 'keine Audio-URL vorhanden'), 
        -1);
    }, n.prototype._start = function(t) {
        var n = this;
        if (this.mRecordingFlag) return this._error('_start', 'ASR laeuft bereits'), -1;
        if (t && t.audioURL) {
            var e = {
                audioURL: t.audioURL,
                language: t.language
            };
            t.nlu && (e.nlu = !0, e.tag = this.mConfig.nluTag), t.progressive && (e.progressive = !0);
            try {
                this._startAudio(e);
            } catch (t) {
                this._exception('_start', t);
            }
        } else {
            if (!this.mGetUserMedia) return this._error('_start', 'kein getUserMedia vorhanden'), 
            -1;
            this.mVolumeCounter = 0, this.mTimeoutCounter = 0;
            try {
                return this.mGetUserMedia({
                    audio: !0,
                    video: !1
                }).then((function(e) {
                    n.mUserMediaStream = e;
                    var r = {
                        userMediaStream: n.mUserMediaStream,
                        language: t.language,
                        tag: n.mConfig.nluTag
                    };
                    t.nlu && (r.nlu = !0), t.progressive && (r.progressive = !0);
                    try {
                        n._startASR(r);
                    } catch (t) {
                        n._exception('_start', t);
                    }
                }), (function(t) {
                    n._onError(new Error('ASR-Error: kein UserMedia erzeugt')), n._error('_start', 'keine UserMedia erzeugt: ' + t.message), 
                    n._onStop();
                })), 0;
            } catch (t) {
                return this._exception('_start', t), -1;
            }
        }
    }, n.prototype._stop = function() {
        var t = this;
        if (this.mRecordingFlag = !1, !this.mAudioRecorder) return 0;
        try {
            return this.mAudioRecorder.stop((function() {
                var n = {
                    message: 'audio_end',
                    audio_id: t.mRequestId
                };
                t.mConnect.sendJSON(n);
            })), this.mAudioRecorder = null, 0;
        } catch (t) {
            return this._exception('_stop', t), -1;
        }
    }, n;
}(pt), ht = function(t) {
    function n(n, e) {
        return t.call(this, 'NuanceNLU', n, e) || this;
    }
    return ot(n, t), n.prototype._getDefaultOption = function() {
        var n = this, e = t.prototype._getDefaultOption.call(this);
        return e.onresult = function(t) {
            if ('NDSP_APP_CMD' === t.result_type) if ('nlu_interpretation_results' === t.result_format) {
                if ('failure' !== t.nlu_interpretation_results.status) try {
                    n._onResult(t.nlu_interpretation_results.payload.interpretations);
                } catch (t) {
                    n._onError(new Error('NLU-Exception: ' + t.message));
                } else n._onError(new Error('NLU-Error: ' + t.nlu_interpretation_results.reason));
                n._onStop();
            } else console.log('ASR', t); else 'NDSP_CONCEPT_UPLOAD_FULL_CMD' === t.result_type ? console.log('Concept Upload', t) : 'NDSP_DELETE_ALL_CONCEPTS_DATA_CMD' === t.result_type ? console.log('Concept Upload Reset', t) : ('query_error' === t.message || 'disconnect' === t.message && 'Transaction completed.' !== t.reason) && (n._onError(new Error('NLU-Error.' + t.message + ': ' + t.reason)), 
            n._onStop());
        }, e;
    }, n.prototype._sendQueryBeginMessage = function(t, n, e) {
        var r = {
            message: 'query_begin',
            transaction_id: t,
            command: 'NDSP_APP_CMD',
            language: n,
            context_tag: e
        };
        return this.mConnect.sendJSON(r);
    }, n.prototype._sendQueryParameterMessage = function(t, n) {
        var e = {
            message: 'query_parameter',
            transaction_id: t,
            parameter_name: 'REQUEST_INFO',
            parameter_type: 'dictionary',
            dictionary: {
                application_data: {
                    text_input: n
                }
            }
        };
        return this.mConnect.sendJSON(e);
    }, n.prototype._start = function(t) {
        var n = this;
        t = this._createOption(t);
        var e = Object.assign({}, t);
        e.onopen = function() {
            t.onopen(), n._sendQueryBeginMessage(n.mTransaction.transactionId, e.language, e.tag), 
            n._sendQueryParameterMessage(n.mTransaction.transactionId, e.text), n._sendQueryEndMessage(n.mTransaction.transactionId);
        }, this.mConnect.connect(e);
    }, n.prototype._stop = function() {}, n;
}(pt), mt = function(t) {
    function n(n, e, r) {
        var o = t.call(this, 'NuanceTTS', n, e) || this;
        return o.mAudioContext = null, o.mAudioPlayer = null, o.mAudioContext = r, o;
    }
    return ot(n, t), n.prototype._getDefaultOption = function() {
        var n = this, e = t.prototype._getDefaultOption.call(this);
        return e.onresult = function(t) {
            'NMDP_TTS_CMD' === t.result_type || 'NVC_TTS_CMD' === t.result_type || ('query_error' === t.message || 'disconnect' === t.message && 'Transaction completed.' !== t.reason) && (n._onError(new Error('TTS-Error.' + t.message + ': ' + t.reason)), 
            n._onStop());
        }, e.onttsdecode = function(t, e) {
            n.mAudioPlayer && n.mAudioPlayer.decodeOld(t, e);
        }, e.onttsstart = function() {
            n.mAudioPlayer && n.mAudioPlayer.start();
        }, e.onttscomplete = function() {
            n.mAudioPlayer && n._onResult(n.mAudioPlayer.mQueue);
        }, e.onaudiostart = function() {
            n._onStart();
        }, e.onaudioend = function() {
            n.mAudioPlayer = null, n._onStop();
        }, e;
    }, n.prototype._sendQueryBeginMessage = function(t, n, e, r) {
        var o = {
            message: 'query_begin',
            transaction_id: t,
            command: 'NMDP_TTS_CMD',
            language: n,
            codec: r,
            tts_voice: e
        };
        return this.mConnect.sendJSON(o);
    }, n.prototype._sendQueryParameterMessage = function(t, n) {
        var e = {
            message: 'query_parameter',
            transaction_id: t,
            parameter_name: 'TEXT_TO_READ',
            parameter_type: 'dictionary',
            dictionary: {
                audio_id: 789,
                tts_input: n,
                tts_type: 'text'
            }
        };
        return this.mConnect.sendJSON(e);
    }, n.prototype._start = function(t) {
        var n = this;
        t = this._createOption(t);
        var e = Object.assign({}, t);
        e.onopen = function() {
            t.onopen(), n.mAudioPlayer = new a(n.mAudioContext), n._sendQueryBeginMessage(n.mTransaction.transactionId, t.language, t.voice, t.codec), 
            n._sendQueryParameterMessage(n.mTransaction.transactionId, t.text), n._sendQueryEndMessage(n.mTransaction.transactionId);
        }, this.mConnect.connect(e);
    }, n.prototype._stop = function() {
        this.mAudioPlayer && this.mAudioPlayer.stopOld();
    }, n;
}(pt), gt = function(t) {
    function e(n, e) {
        void 0 === e && (e = !0);
        var r = t.call(this, n || "NuancePort", e) || this;
        return r.mAudioContext = null, r.mGetUserMedia = null, r.mNuanceConfig = null, r.mNuanceNetwork = null, 
        r.mNuanceWebSocket = null, r.mNuanceConnect = null, r.mNuanceTTS = null, r.mNuanceASR = null, 
        r.mNuanceNLU = null, r.mDynamicCredentialsFlag = !1, r.mTransaction = null, r.mRunningFlag = !1, 
        r.mDefaultOptions = null, r.mActionTimeoutId = 0, r.mActionTimeout = 6e4, r;
    }
    return ot(e, t), e.prototype.isMock = function() {
        return !1;
    }, e.prototype.getType = function() {
        return "Nuance";
    }, e.prototype.getClass = function() {
        return 'NuancePort';
    }, e.prototype.getVersion = function() {
        return "0.1.8.0009 vom 30.05.2020 (ALPHA)";
    }, e.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.nuanceAppId && (!!t.nuanceAppId && ('string' == typeof t.nuanceAppKey && !!t.nuanceAppKey)));
    }, e.prototype._initAllObject = function(t) {
        var n = this, e = new u;
        e.init();
        var r = new c;
        if (r.init({
            audioContext: this.mAudioContext
        }), this.mNuanceConfig = new at(e), 0 !== this.mNuanceConfig.init(t)) return -1;
        if (this.mNuanceNetwork = new st, this.mNuanceNetwork.onOnline = function() {
            return n._onOnline();
        }, this.mNuanceNetwork.onOffline = function() {
            return n._onOffline();
        }, this.mNuanceNetwork.onError = function(t) {
            return n._onError(t);
        }, 0 !== this.mNuanceNetwork.init(t)) return -1;
        if (this.mNuanceWebSocket = new ut, this.mNuanceWebSocket.onOpen = function(t) {
            return n._onOpen();
        }, this.mNuanceWebSocket.onClose = function() {
            return n._onClose();
        }, this.mNuanceWebSocket.onError = function(t) {
            return n._onError(t);
        }, 0 !== this.mNuanceWebSocket.init(t)) return -1;
        if (this.mNuanceConnect = new ct(this.mNuanceWebSocket), this.mNuanceNLU = new ht(this.mNuanceConfig, this.mNuanceConnect), 
        this.mNuanceNLU.onStart = function(t) {
            return n._onStart(t.plugin, t.type);
        }, this.mNuanceNLU.onStop = function(t) {
            return n._onStop(t.plugin, t.type);
        }, this.mNuanceNLU.onResult = function(t) {
            return n._onResult(t.result, t.plugin, t.type);
        }, this.mNuanceNLU.onError = function(t) {
            return n._onError(t.error, t.plugin, t.type);
        }, this.mNuanceNLU.onClose = function(t) {
            return n._onClose();
        }, this.mAudioContext) {
            this.mNuanceTTS = new mt(this.mNuanceConfig, this.mNuanceConnect, this.mAudioContext), 
            this.mNuanceTTS.onStart = function(t) {
                return n._onStart(t.plugin, t.type);
            }, this.mNuanceTTS.onStop = function(t) {
                return n._onStop(t.plugin, t.type);
            }, this.mNuanceTTS.onResult = function(t) {
                return n._onResult(t.result, t.plugin, t.type);
            }, this.mNuanceTTS.onError = function(t) {
                return n._onError(t.error, t.plugin, t.type);
            }, this.mNuanceTTS.onClose = function(t) {
                return n._onClose();
            };
            try {
                this.mGetUserMedia && (this.mNuanceASR = new lt(this.mNuanceConfig, this.mNuanceConnect, this.mAudioContext, this.mGetUserMedia, r), 
                this.mNuanceASR.onStart = function(t) {
                    return n._onStart(t.plugin, t.type);
                }, this.mNuanceASR.onStop = function(t) {
                    return n._onStop(t.plugin, t.type);
                }, this.mNuanceASR.onResult = function(t) {
                    return n._onResult(t.result, t.plugin, t.type);
                }, this.mNuanceASR.onError = function(t) {
                    return n._onError(t.error, t.plugin, t.type);
                }, this.mNuanceASR.onClose = function(t) {
                    return n._onClose();
                });
            } catch (t) {
                this._exception('_initAllObject', t);
            }
        }
        return 0;
    }, e.prototype.init = function(e) {
        if (e && 'boolean' == typeof e.errorOutputFlag && this._setErrorOutput(e.errorOutputFlag), 
        this.mInitFlag) return this._error('init', 'Port ist bereits initialisiert'), 0;
        if (e && 'boolean' == typeof e.nuanceDynamicCredentialsFlag && e.nuanceDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0; else if (!this._checkCredentials(e)) return this._error('init', 'keine AppId und/oder AppKey als Parameter uebergeben'), 
        -1;
        this.mAudioContext = g.getAudioContext();
        var r = n.get(h, m);
        return r && (this.mGetUserMedia = r.create()), 0 !== this._initAllObject(e) || 0 !== t.prototype.init.call(this, e) ? -1 : (this.isErrorOutput() && (this.mNuanceNLU ? console.log('NuancePort: NLU ist vorhanden') : console.log('NuancePort: NLU ist nicht vorhanden'), 
        this.mNuanceTTS ? console.log('NuancePort: TTS ist vorhanden') : console.log('NuancePort: TTS ist nicht vorhanden'), 
        this.mNuanceASR ? console.log('NuancePort: ASR ist vorhanden') : console.log('NuancePort: ASR ist nicht vorhanden')), 
        0);
    }, e.prototype.done = function() {
        return t.prototype.done.call(this), this._clearActionTimeout(), this.mAudioContext, 
        this.mAudioContext = null, this.mGetUserMedia = null, this.mNuanceConfig && (this.mNuanceConfig.done(), 
        this.mNuanceConfig = null), this.mNuanceNetwork && (this.mNuanceNetwork.done(), 
        this.mNuanceNetwork = null), this.mNuanceWebSocket && (this.mNuanceWebSocket.done(), 
        this.mNuanceWebSocket = null), this.mNuanceConnect = null, this.mNuanceTTS = null, 
        this.mNuanceASR = null, this.mNuanceNLU = null, this.mDynamicCredentialsFlag = !1, 
        this.mTransaction = null, this.mRunningFlag = !1, this.mDefaultOptions = null, this.mActionTimeoutId = 0, 
        this.mActionTimeout = 6e4, 0;
    }, e.prototype.reset = function(n) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, n);
    }, e.prototype._setErrorOutput = function(n) {
        t.prototype._setErrorOutput.call(this, n), this.mNuanceConfig && this.mNuanceConfig._setErrorOutput(n), 
        this.mNuanceNetwork && this.mNuanceNetwork._setErrorOutput(n), this.mNuanceWebSocket && this.mNuanceWebSocket._setErrorOutput(n), 
        this.mNuanceConnect && this.mNuanceConnect._setErrorOutput(n), this.mNuanceTTS && this.mNuanceTTS._setErrorOutput(n), 
        this.mNuanceASR && this.mNuanceASR._setErrorOutput(n), this.mNuanceNLU && this.mNuanceNLU._setErrorOutput(n);
    }, e.prototype._breakAction = function() {
        this.mActionTimeoutId = 0, this.mTransaction && (this._error('_breakAction', 'Timeout fuer Action erreicht'), 
        this._onStop(this.mTransaction.plugin, this.mTransaction.type));
    }, e.prototype._setActionTimeout = function() {
        var t = this;
        0 === this.mActionTimeoutId && this.mActionTimeout > 0 && (this.mActionTimeoutId = window.setTimeout((function() {
            return t._breakAction();
        }), this.mActionTimeout));
    }, e.prototype._clearActionTimeout = function() {
        this.mActionTimeoutId > 0 && (clearTimeout(this.mActionTimeoutId), this.mActionTimeoutId = 0);
    }, e.prototype._onOnline = function() {
        return 0;
    }, e.prototype._onOffline = function() {
        return this.close(), 0;
    }, e.prototype._onStop = function(n, e) {
        return this._clearActionTimeout(), this.mTransaction = null, this.mRunningFlag = !1, 
        this.mNuanceConnect && this.mNuanceConnect.disconnect(), t.prototype._onStop.call(this, n, e);
    }, e.prototype._unlockAudio = function(t) {
        if (this.mAudioContext) {
            if ('running' === this.mAudioContext.state) return void t(!0);
            if ('suspended' === this.mAudioContext.state) {
                var n = setTimeout((function() {
                    return t(!1);
                }), 2e3);
                this.mAudioContext.resume().then((function() {
                    clearTimeout(n), t(!0);
                }), (function(e) {
                    console.log('NuancePort._unlockAudio:', e), clearTimeout(n), t(!1);
                }));
            } else t(!1);
        } else t(!1);
    }, e.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this._error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return 'string' == typeof t.nuanceAppId && t.nuanceAppId && (this.mNuanceConfig.appId = t.nuanceAppId), 
            'string' == typeof t.nuanceAppKey && t.nuanceAppKey && (this.mNuanceConfig.appKey = t.nuanceAppKey), 
            'string' == typeof t.nuanceNluTag && t.nuanceNluTag && (this.mNuanceConfig.nluTag = t.nuanceNluTag), 
            0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, e.prototype.getConfig = function() {
        return {
            nuanceAppId: this.mNuanceConfig.appId,
            nuanceAppKey: this.mNuanceConfig.appKey,
            nuanceNluTag: this.mNuanceConfig.nluTag
        };
    }, e.prototype.isOnline = function() {
        return !!this.mNuanceNetwork && this.mNuanceNetwork.isOnline();
    }, e.prototype.isOpen = function() {
        return this._isConnect();
    }, e.prototype._checkOpen = function(t) {
        var n = this;
        return this.isOnline() ? this.isOpen() ? (t(!0), 0) : 'CLOSING' === this.mNuanceWebSocket.getState() ? (this._error('_checkOpen', 'Websocket wird geschlossen'), 
        t(!1), -1) : this.mNuanceWebSocket ? (this.mNuanceWebSocket.onOpen = function(e) {
            return n.mNuanceWebSocket.onOpen = function(t) {
                return n._onOpen();
            }, n.mNuanceWebSocket.onClose = function() {
                return n._onClose();
            }, n.mNuanceWebSocket.onError = function(t) {
                return n._onError(t);
            }, t(!0), 0;
        }, this.mNuanceWebSocket.onClose = function() {
            return n.mNuanceWebSocket.onOpen = function(t) {
                return n._onOpen();
            }, n.mNuanceWebSocket.onClose = function() {
                return n._onClose();
            }, n.mNuanceWebSocket.onError = function(t) {
                return n._onError(t);
            }, t(!1), 0;
        }, this.mNuanceWebSocket.onError = function(e) {
            return n.mNuanceWebSocket.onOpen = function(t) {
                return n._onOpen();
            }, n.mNuanceWebSocket.onClose = function() {
                return n._onClose();
            }, n.mNuanceWebSocket.onError = function(t) {
                return n._onError(t);
            }, t(!1), 0;
        }, this.open()) : (this._error('_checkOpen', 'Websocket ist nicht vorhanden'), t(!1), 
        -1) : (this._error('_checkOpen', 'kein Netz vorhanden'), t(!1), -1);
    }, e.prototype.open = function(t) {
        return this._connect(t);
    }, e.prototype.close = function() {
        return this._disconnect();
    }, e.prototype.getPluginName = function() {
        return this.mTransaction ? this.mTransaction.plugin : '';
    }, e.prototype.getActionName = function() {
        return this.mTransaction ? this.mTransaction.type : '';
    }, e.prototype.isRunning = function(t, n) {
        if (!t && !n) return this.mRunningFlag;
        if (t === this.getPluginName()) {
            if (!n) return this.mRunningFlag;
            if (n === this.getActionName()) return this.mRunningFlag;
        }
        return !1;
    }, e.prototype.isAction = function(t) {
        var n = !1;
        switch (t) {
          case "NLU":
            n = !!this.mNuanceNLU;
            break;

          case "ASRNLU":
          case "ASR":
            n = !!this.mNuanceASR;
            break;

          case "TTS":
            n = !!this.mNuanceTTS;
        }
        return n;
    }, e.prototype.setActionTimeout = function(t) {
        this.mActionTimeout = t;
    }, e.prototype.start = function(t, n, e) {
        var r = this;
        return this.isRunning() ? (this._error('start', 'Aktion laeuft bereits'), -1) : this.mNuanceConfig.isCredentials() ? this.mTransaction ? (this._error('start', 'andere Transaktion laeuft noch'), 
        -1) : this._checkOpen((function(i) {
            if (!i) return -1;
            r._setActionTimeout();
            var a = e || {};
            r.mPluginName = t, r.mRunningFlag = !0;
            var s = 0;
            switch (n) {
              case "NLU":
                r.mTransaction = new o(t, "NLU"), s = r._startNLU(r.mTransaction, a.text, a.language || "deu-DEU");
                break;

              case "ASRNLU":
                r.mTransaction = new o(t, "ASRNLU"), s = r._startASR(r.mTransaction, a.language || "deu-DEU", a.audioURL || '', !0, a.useProgressive || !1);
                break;

              case "ASR":
                r.mTransaction = new o(t, "ASR"), s = r._startASR(r.mTransaction, a.language || "deu-DEU", a.audioURL || '', !1, a.useProgressive || !1);
                break;

              case "TTS":
                r.mTransaction = new o(t, "TTS"), s = r._startTTS(r.mTransaction, a.text, a.language || "deu-DEU", a.voice || "Petra-ML");
                break;

              default:
                r._clearActionTimeout(), r._error('start', 'Keine gueltige Aktion uebergeben ' + n), 
                s = -1;
            }
            return s;
        })) : (this._error('start', 'Port hat keine Credentials'), -1);
    }, e.prototype.stop = function(t, n, e) {
        if (!this.isRunning()) return 0;
        if (!this.isOpen()) return this._error('stop', 'Port ist nicht geoeffnet'), -1;
        if (!this.mNuanceConfig.isCredentials()) return this._error('stop', 'Port hat keine Credentials'), 
        -1;
        if (!this.mTransaction) return this._error('stop', 'keine Transaktion vorhanden'), 
        -1;
        if (t !== this.mTransaction.plugin) return this._error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + t + ' != ' + this.mTransaction.plugin), 
        -1;
        if (n) {
            if (n !== this.mTransaction.type) return this._error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + n + ' != ' + this.mTransaction.type), 
            -1;
        } else n = this.mTransaction.type;
        var r = 0;
        switch (n) {
          case "NLU":
            r = this._stopNLU(this.mTransaction);
            break;

          case "ASRNLU":
          case "ASR":
            r = this._stopASR(this.mTransaction);
            break;

          case "TTS":
            r = this._stopTTS(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + n), r = -1;
        }
        return this.mRunningFlag = !1, r;
    }, e.prototype._initRecognition = function(t) {
        var n = this;
        return this.mDefaultOptions = {
            onopen: function() {
                console.log('Websocket Opened');
            },
            onclose: function() {
                console.log('Websocket Closed'), n._onClose();
            },
            onerror: function(t) {
                console.error(t), n._onError(t);
            }
        }, 0;
    }, e.prototype._isConnect = function() {
        return !!this.mNuanceWebSocket && this.mNuanceWebSocket.isConnect();
    }, e.prototype._connect = function(t) {
        if (this._isConnect()) return 0;
        if (!this.mNuanceWebSocket) return this._error('_connect', 'kein NuanceWebSocket vorhanden'), 
        -1;
        try {
            return this.mNuanceWebSocket.connect(this.mNuanceConfig.serverUrl || "wss://ws.dev.nuance.com/v2"), 
            0;
        } catch (t) {
            return this._exception('_connect', t), -1;
        }
    }, e.prototype._disconnect = function() {
        if (!this._isConnect()) return 0;
        if (!this.mNuanceWebSocket) return this._error('_disconnect', 'kein NuanceWebSocket vorhanden'), 
        -1;
        try {
            return this.mNuanceWebSocket.disconnect(), 0;
        } catch (t) {
            return this._exception('_disconnect', t), -1;
        }
    }, e.prototype._startNLU = function(t, n, e) {
        if (!n) return this._error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!e) return this._error('_startNLU', 'keine Sprache uebergeben'), -1;
        if (!this.mNuanceNLU) return this._error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden'), 
        -1;
        try {
            var r = {
                text: n,
                language: e
            };
            return this.mNuanceNLU.start(t, r);
        } catch (t) {
            return this._exception('_startNLU', t), -1;
        }
    }, e.prototype._stopNLU = function(t) {
        if (!this.mNuanceNLU) return this._error('_stopNLU', 'keine Nuance NLU-Anbindung vorhanden'), 
        -1;
        try {
            return this.mNuanceNLU.stop(t);
        } catch (t) {
            return this._exception('_stopNLU', t), -1;
        }
    }, e.prototype._startASR = function(t, n, e, r, o) {
        if (void 0 === r && (r = !1), void 0 === o && (o = !1), !n) return this._error('_startASR', 'keine Sprache uebergeben'), 
        -1;
        if (!this.mNuanceASR) return this._error('_startASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            var i = {
                language: n,
                nlu: r,
                progressive: o
            };
            return e && (i.audioURL = e), this.mNuanceASR.start(t, i);
        } catch (t) {
            return this._exception('_startASR', t), -1;
        }
    }, e.prototype._stopASR = function(t) {
        if (!this.mNuanceASR) return this._error('_stopASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this.mNuanceASR.stop(t);
        } catch (t) {
            return this._exception('_stopASR', t), -1;
        }
    }, e.prototype._startTTS = function(t, n, e, r) {
        var o = this;
        if (!n) return this._error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.mNuanceTTS) return this._error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            var i = {
                text: n,
                language: e,
                voice: r
            };
            return this._unlockAudio((function(n) {
                n ? o.mNuanceTTS.start(t, i) : (o._error('_startTTS', 'AudioContext ist nicht entsperrt'), 
                o._onStop(t.plugin, t.type));
            })), 0;
        } catch (t) {
            return this._exception('_startTTS', t), -1;
        }
    }, e.prototype._stopTTS = function(t) {
        if (!this.mNuanceTTS) return this._error('_stopTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this.mNuanceTTS.stop(t);
        } catch (t) {
            return this._exception('_stopTTS', t), -1;
        }
    }, e;
}(i), ft = function(t) {
    function n() {
        return t.call(this, 'NuanceFactory') || this;
    }
    return ot(n, t), n.prototype.getType = function() {
        return "Nuance";
    }, n.prototype.getName = function() {
        return "NuanceFactory";
    }, n.prototype._newPort = function(t, n) {
        var e = null;
        switch (t) {
          case "NuancePort":
          case "NuancePort":
            e = new gt(t, n);
            break;

          case "NuanceMock":
            e = new it("NuanceMock", n);
            break;

          default:
            this._error('_newPort', 'kein Port vorhanden');
        }
        return e;
    }, n.prototype.create = function(t, n) {
        void 0 === n && (n = !0);
        var e = t || "NuancePort";
        try {
            return this._newPort(e, n);
        } catch (t) {
            return this._exception('create', t), null;
        }
    }, n;
}(r), dt = function() {
    function t() {}
    return t.setErrorOutputOn = function() {
        t.mErrorOutputFlag = !0, e.setErrorOutputOn();
    }, t.setErrorOutputOff = function() {
        t.mErrorOutputFlag = !1, e.setErrorOutputOff();
    }, t.setErrorOutputFunc = function(t) {
        e._setErrorOutputFunc(t);
    }, t._initNuancePort = function(n) {
        var r = e.get("Nuance", gt);
        return r ? 0 !== r.init(n) ? (e.remove("Nuance"), -1) : (t.mCurrentPort = r, 0) : -1;
    }, t._initNuanceMock = function(n) {
        var r = e.get("Nuance", it);
        return r ? 0 !== r.init(n) ? (console.log('Nuance._initNuanceMock: Error NuanceMock wurde nicht initialisiert'), 
        e.remove("Nuance"), -1) : (t.mCurrentPort = r, 0) : (console.log('Nuance._initNuanceMock: Error NuanceMock wurde nicht erzeugt'), 
        -1);
    }, t.init = function(n) {
        if (t.mInitFlag) return 0;
        if (!n) return t.mErrorOutputFlag && console.log('Nuance.init: Keine Nuance-Parameter uebergeben'), 
        -1;
        'boolean' == typeof n.errorOutputFlag && (n.errorOutputFlag ? t.setErrorOutputOn() : t.setErrorOutputOff());
        var e = 'NuancePort';
        if (n && 'string' == typeof n.nuancePortName && 'NuanceMock' === n.nuancePortName && (e = 'NuanceMock'), 
        'NuancePort' === e) {
            if (0 !== t._initNuancePort(n)) return -1;
        } else {
            if ('NuanceMock' !== e) return t.mErrorOutputFlag && console.log('Nuance.init: Kein Nuance PortName vorhanden'), 
            -1;
            if (0 !== t._initNuanceMock(n)) return -1;
        }
        return t.mInitFlag = !0, 0;
    }, t.isInit = function() {
        return t.mInitFlag;
    }, t.done = function() {
        var n = e.find("Nuance");
        n || (n = t.mCurrentPort);
        var r = 0;
        return n && (r = n.done(), e.remove("Nuance")), t.mCurrentPort = null, t.mInitFlag = !1, 
        r;
    }, t._onOpenEvent = function(n, e, r, o) {
        if ('function' == typeof o) try {
            return o(n, e, r), 0;
        } catch (n) {
            return t.mErrorOutputFlag && console.log('Nuance._onOpenEvent: Exception', n.message), 
            -1;
        }
        return 0;
    }, t._openNuancePort = function(n) {
        var r = e.find("Nuance");
        return r || (r = t.mCurrentPort), r ? (r.addOpenEvent("Nuance", (function(e) {
            return r.removeErrorEvent("Nuance"), r.removeOpenEvent("Nuance"), 'function' == typeof n && t._onOpenEvent(null, "Nuance", e.result, n), 
            e.result;
        })), r.addErrorEvent("Nuance", (function(e) {
            return r.removeOpenEvent("Nuance"), r.removeErrorEvent("Nuance"), 'function' == typeof n && t._onOpenEvent(e, "Nuance", -1, n), 
            0;
        })), r.open()) : (t.mErrorOutputFlag && console.log('Nuance._openNuancePort: kein Port vorhanden'), 
        t._onOpenEvent(new Error('Nuance._openNUancePort: Kein Port vorhanden'), "Nuance", -1, n), 
        -1);
    }, t.open = function(n) {
        return t.mInitFlag ? t._openNuancePort(n) : (t.mErrorOutputFlag && console.log('Nuance.open: Init wurde nicht aufgerufen'), 
        t._onOpenEvent(new Error('Nuance.open: Init wurde nicht aufgerufen'), "Nuance", -1, n), 
        -1);
    }, t.setConfig = function(n) {
        return t.mCurrentPort ? t.mCurrentPort.setConfig(n) : -1;
    }, t.getConfig = function() {
        return t.mCurrentPort ? t.mCurrentPort.getConfig() : {
            nuanceAppId: '',
            nuanceAppKey: ''
        };
    }, t.mInitFlag = !1, t.mErrorOutputFlag = !1, t.mCurrentPort = null, t;
}();

export { A as NUANCE_API_VERSION, F as NUANCE_ASRNLU_ACTION, P as NUANCE_ASR_ACTION, q as NUANCE_ASR_LANGUAGE, K as NUANCE_ASR_LANGUAGE1, j as NUANCE_ASR_LANGUAGE2, nt as NUANCE_AUDIOBUFFER_SIZE, et as NUANCE_AUDIOSAMPLE_RATE, Z as NUANCE_AUDIOTTS_ID, M as NUANCE_CONFIG_FILE, w as NUANCE_CONFIG_LOAD, L as NUANCE_CONFIG_PATH, tt as NUANCE_DEFAULT_CODEC, W as NUANCE_DEFAULT_LANGUAGE, R as NUANCE_DEFAULT_NAME, E as NUANCE_DEFAULT_URL, X as NUANCE_DEFAULT_VOICE, D as NUANCE_DE_LANGUAGE, x as NUANCE_EN_LANGUAGE, k as NUANCE_FACTORY_NAME, b as NUANCE_MOCK_NAME, U as NUANCE_NLU_ACTION, $ as NUANCE_PCM_CODEC, v as NUANCE_PORT_NAME, O as NUANCE_SERVER_URL, T as NUANCE_SERVER_VERSION, I as NUANCE_TTS_ACTION, G as NUANCE_TTS_LANGUAGE, Q as NUANCE_TTS_LANGUAGE1, J as NUANCE_TTS_LANGUAGE2, Y as NUANCE_TTS_VOICE, V as NUANCE_TTS_VOICE1, B as NUANCE_TTS_VOICE2, H as NUANCE_TTS_VOICE3, z as NUANCE_TTS_VOICE4, C as NUANCE_TYPE_NAME, d as NUANCE_VERSION_BUILD, y as NUANCE_VERSION_DATE, f as NUANCE_VERSION_NUMBER, N as NUANCE_VERSION_STRING, _ as NUANCE_VERSION_TYPE, S as NUANCE_WORKER_VERSION, dt as Nuance, ft as NuanceFactory };
