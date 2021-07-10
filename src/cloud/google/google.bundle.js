/**
 * Speech-Google
 * 
 * Version: 0.1.7
 * Build:   0008
 * TYPE:    ALPHA
 * Datum:   18.08.2020
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

import '../../core/const/speech-version.ts';

import { ErrorBase as t } from '../../core/error/error-base.ts';

import '../../core/event/event-function-list.ts';

import { FactoryManager as e } from '../../core/factory/factory-manager.ts';

import '../../core/factory/factory.ts';

import '../../core/plugin/plugin-manager.ts';

import '../../core/plugin/plugin-factory.ts';

import '../../core/plugin/plugin-group.ts';

import '../../core/plugin/plugin.ts';

import { PortManager as o } from '../../core/port/port-manager.ts';

import { PortFactory as n } from '../../core/port/port-factory.ts';

import { PortTransaction as r } from '../../core/port/port-transaction.ts';

import { Port as i } from '../../core/port/port.ts';

import '../../common/audio/audio-codec.ts';

import { AudioPlayer as s } from '../../common/audio/audio-player.ts';

import { AudioRecorder as a } from '../../common/audio/audio-recorder.ts';

import '../../common/audio/audio-resampler.ts';

import { FileHtml5Reader as u } from '../../common/html5/file-html5-reader.ts';

import { AudioHtml5Reader as l } from '../../common/html5/audio-html5-reader.ts';

import { NetHtml5Connect as c } from '../../common/html5/net-html5-connect.ts';

import { NetHtml5WebSocket as g } from '../../common/html5/net-html5-websocket.ts';

import '../../common/html5/audiocontext-factory.ts';

import '../../common/html5/speechrecognition-factory.ts';

import '../../common/html5/speechsynthesis-factory.ts';

import '../../common/html5/websocket-factory.ts';

import '../../common/html5/webworker-factory.ts';

import { USERMEDIA_FACTORY_NAME as h, UserMediaFactory as p } from '../../common/html5/usermedia-factory.ts';

import '../../common/html5/xmlhttprequest-factory.ts';

import { AudioContextManager as m } from '../../common/html5/audiocontext-manager.ts';

var f = '0.1.7', d = '0008', _ = 'ALPHA', T = '18.08.2020', S = "0.1.7.0008 vom 18.08.2020 (ALPHA)", y = "0.1.7.0008 vom 18.08.2020 (ALPHA)", A = "0.1.7.0008 vom 18.08.2020 (ALPHA)", v = "0.1.7.0008 vom 18.08.2020 (ALPHA)", C = 'Google', G = 'GoogleFactory', k = 'GooglePort', E = 'GoogleMock', w = "GooglePort", R = 'ws://localhost:7050', U = "ws://localhost:7050", b = 'NLU', N = 'ASR', O = 'ASRNLU', I = 'TTS', L = 'assets/', F = 'google.json', P = !1, D = 'de-DE', M = 'en-US', x = "de-DE", j = !0, K = 'de-DE', W = 'en-US', V = "de-DE", B = 'de-DE', H = 'en-US', z = "de-DE", q = 'Yannick', J = 'Markus', X = 'Anna-ML', Z = 'Petra-ML', Y = "Petra-ML", Q = "Petra-ML", $ = 789, tt = 'audio/L16;rate=16000', et = "audio/L16;rate=16000", ot = 2048, nt = 16e3, rt = function(t, e) {
    return (rt = Object.setPrototypeOf || {
        __proto__: []
    } instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    })(t, e);
};

function it(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    function o() {
        this.constructor = t;
    }
    rt(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, 
    new o);
}

function st(t, e, o, n) {
    return new (o || (o = Promise))((function(r, i) {
        function s(t) {
            try {
                u(n.next(t));
            } catch (t) {
                i(t);
            }
        }
        function a(t) {
            try {
                u(n.throw(t));
            } catch (t) {
                i(t);
            }
        }
        function u(t) {
            var e;
            t.done ? r(t.value) : (e = t.value, e instanceof o ? e : new o((function(t) {
                t(e);
            }))).then(s, a);
        }
        u((n = n.apply(t, e || [])).next());
    }));
}

function at(t, e) {
    var o, n, r, i, s = {
        label: 0,
        sent: function() {
            if (1 & r[0]) throw r[1];
            return r[1];
        },
        trys: [],
        ops: []
    };
    return i = {
        next: a(0),
        throw: a(1),
        return: a(2)
    }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
        return this;
    }), i;
    function a(i) {
        return function(a) {
            return function(i) {
                if (o) throw new TypeError("Generator is already executing.");
                for (;s; ) try {
                    if (o = 1, n && (r = 2 & i[0] ? n.return : i[0] ? n.throw || ((r = n.return) && r.call(n), 
                    0) : n.next) && !(r = r.call(n, i[1])).done) return r;
                    switch (n = 0, r && (i = [ 2 & i[0], r.value ]), i[0]) {
                      case 0:
                      case 1:
                        r = i;
                        break;

                      case 4:
                        return s.label++, {
                            value: i[1],
                            done: !1
                        };

                      case 5:
                        s.label++, n = i[1], i = [ 0 ];
                        continue;

                      case 7:
                        i = s.ops.pop(), s.trys.pop();
                        continue;

                      default:
                        if (!(r = s.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                            s = 0;
                            continue;
                        }
                        if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {
                            s.label = i[1];
                            break;
                        }
                        if (6 === i[0] && s.label < r[1]) {
                            s.label = r[1], r = i;
                            break;
                        }
                        if (r && s.label < r[2]) {
                            s.label = r[2], s.ops.push(i);
                            break;
                        }
                        r[2] && s.ops.pop(), s.trys.pop();
                        continue;
                    }
                    i = e.call(t, s);
                } catch (t) {
                    i = [ 6, t ], n = 0;
                } finally {
                    o = r = 0;
                }
                if (5 & i[0]) throw i[1];
                return {
                    value: i[0] ? i[1] : void 0,
                    done: !0
                };
            }([ i, a ]);
        };
    }
}

var ut, lt = function(t) {
    function e(e, o) {
        void 0 === o && (o = !0);
        var n = t.call(this, e || "GoogleMock", o) || this;
        return n.webSocketFlag = !0, n.audioContextFlag = !0, n.getUserMediaFlag = !0, n.googleNLUFlag = !0, 
        n.googleASRFlag = !0, n.googleTTSFlag = !0, n.disconnectFlag = !0, n.defaultOptions = null, 
        n.codec = '', n.intentName = 'TestIntent', n.intentConfidence = 1, n.intentSpeech = 'TestSpeech', 
        n.mDynamicCredentialsFlag = !1, n.mTransaction = null, n.mRunningFlag = !1, n.googleAppId = '', 
        n.googleAppKey = '', n.googleNluTag = '', n.googleServerUrl = '', n.dialogflowTokenServerUrl = '', 
        n.dialogflowProjectId = '', n.dialogflowSessionId = '', n.dialogflowEnvironmentName = '', 
        n;
    }
    return it(e, t), e.prototype.isMock = function() {
        return !0;
    }, e.prototype.getType = function() {
        return "Google";
    }, e.prototype.getClass = function() {
        return 'GoogleMock';
    }, e.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.googleAppKey && (this.googleAppKey = t.googleAppKey), 
        'string' == typeof t.googleAppKey && !!t.googleAppKey);
    }, e.prototype.init = function(e) {
        if (e && 'boolean' == typeof e.errorOutputFlag && this._setErrorOutput(e.errorOutputFlag), 
        this.mInitFlag) return this._error('init', 'Init bereits aufgerufen'), 0;
        if (e && 'boolean' == typeof e.errorOutputFlag && e.errorOutputFlag ? this.setErrorOutputOn() : this.setErrorOutputOff(), 
        e && 'boolean' == typeof e.googleDynamicCredentialsFlag && e.googleDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0, 
        this._checkCredentials(e); else if (!this._checkCredentials(e)) return (this.isErrorOutput() || e && e.errorOutputFlag) && this._error('init', 'keine AppId und/oder AppKey als Parameter uebergeben'), 
        -1;
        return this.webSocketFlag ? (this.audioContextFlag || (this._error('init', 'kein Audiokontext vorhanden, TTS und ASR werden abgeschaltet'), 
        this._onInit(-1)), this.googleNLUFlag = !0, this.audioContextFlag && (this.googleASRFlag = !0, 
        this.getUserMediaFlag && (this.googleTTSFlag = !0)), this.isErrorOutput() && (this.googleNLUFlag ? console.log('GoogleMock: NLU ist vorhanden') : console.log('GoogleMock: NLU ist nicht vorhanden'), 
        this.googleTTSFlag ? console.log('GoogleMock: TTS ist vorhanden') : console.log('GoogleMock: TTS ist nicht vorhanden'), 
        this.googleASRFlag ? console.log('GoogleMock: ASR ist vorhanden') : console.log('GoogleMock: ASR ist nicht vorhanden')), 
        this._onInit(0), t.prototype.init.call(this, e)) : (this._error('init', 'keine WebSocket vorhanden'), 
        this._onInit(-1), -1);
    }, e.prototype.done = function(e) {
        return t.prototype.done.call(this), this.webSocketFlag = !0, this.audioContextFlag = !0, 
        this.getUserMediaFlag = !0, this.googleNLUFlag = !1, this.googleASRFlag = !1, this.googleTTSFlag = !1, 
        this.disconnectFlag = !0, this.defaultOptions = null, this.codec = '', this.mTransaction = null, 
        this.mRunningFlag = !1, 0;
    }, e.prototype.reset = function(e) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, e);
    }, e.prototype._onStop = function(e, o) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype._onStop.call(this, e, o);
    }, e.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this._error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return this.googleAppKey = t.googleAppKey, this.googleServerUrl = t.googleServerUrl, 
            this.dialogflowTokenServerUrl = t.dialogflowTokenServerUrl, this.dialogflowProjectId = t.dialogflowProjectId, 
            this.dialogflowSessionId = t.dialogflowSessionId, this.dialogflowEnvironmentName = t.dialogflowEnvironmentName, 
            0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, e.prototype.getConfig = function() {
        return {
            googleAppKey: this.googleAppKey,
            googleServerUrl: this.googleServerUrl,
            dialogflowTokenServerUrl: this.dialogflowTokenServerUrl,
            dialogflowProjectId: this.dialogflowProjectId,
            dialogflowSessionId: this.dialogflowSessionId,
            dialogflowEnvironmentName: this.dialogflowEnvironmentName
        };
    }, e.prototype.isOpen = function() {
        return !this.disconnectFlag;
    }, e.prototype.open = function(t) {
        return this.disconnectFlag ? (this.disconnectFlag = !1, this._onOpen(), 0) : 0;
    }, e.prototype.close = function() {
        return this.disconnectFlag = !0, 0;
    }, e.prototype.isRunning = function() {
        return this.mRunningFlag;
    }, e.prototype._isCredentials = function() {
        return !!this.googleAppKey;
    }, e.prototype.isAction = function(t) {
        var e = !1;
        switch (t) {
          case "NLU":
            e = this.googleNLUFlag;
            break;

          case "ASRNLU":
          case "ASR":
            e = this.googleASRFlag;
            break;

          case "TTS":
            e = this.googleTTSFlag;
        }
        return e;
    }, e.prototype.start = function(t, e, o) {
        if (this.isRunning()) return this._error('start', 'Aktion laeuft bereits'), -1;
        if (!this.isOpen()) return this._error('start', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this._error('start', 'Port hat keine Credentials'), 
        -1;
        if (this.mTransaction) return this._error('start', 'andere Transaktion laeuft noch'), 
        -1;
        var n = o || {};
        this.mRunningFlag = !0;
        var i = 0;
        switch (e) {
          case "NLU":
            this.mTransaction = new r(t, "NLU"), i = this._startNLU(this.mTransaction, n.text, n.language || "de-DE");
            break;

          case "ASRNLU":
            this.mTransaction = new r(t, "ASRNLU"), i = this._startASR(this.mTransaction, n.language || "de-DE", n.audioURL || '', !0, n.useProgressive || !1);
            break;

          case "ASR":
            this.mTransaction = new r(t, "ASR"), i = this._startASR(this.mTransaction, n.language || "de-DE", n.audioURL || '', !1, n.useProgressive || !1);
            break;

          case "TTS":
            this.mTransaction = new r(t, "TTS"), i = this._startTTS(this.mTransaction, n.text, n.language || "de-DE", n.voice || "Petra-ML");
            break;

          default:
            this._error('start', 'Keine gueltige Aktion uebergeben ' + e), i = -1;
        }
        return i;
    }, e.prototype.stop = function(t, e, o) {
        if (!this.isRunning()) return 0;
        if (!this.isOpen()) return this._error('stop', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this._error('stop', 'Port hat keine Credentials'), 
        -1;
        if (!this.mTransaction) return this._error('stop', 'keine Transaktion vorhanden'), 
        -1;
        if (t !== this.mTransaction.plugin) return this._error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + t + ' != ' + this.mTransaction.plugin), 
        -1;
        if (e) {
            if (e !== this.mTransaction.type) return this._error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + e + ' != ' + this.mTransaction.type), 
            -1;
        } else e = this.mTransaction.type;
        var n = 0;
        switch (e) {
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
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + e), n = -1;
        }
        return this.mTransaction = null, this.mRunningFlag = !1, n;
    }, e.prototype._startNLU = function(t, e, o) {
        if (!e) return this._error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!this.googleNLUFlag) return this._error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden'), 
        -1;
        try {
            this._onStart(t.plugin, t.type);
            var n = {
                metadata: {
                    intentName: this.intentName
                },
                fulfillment: {
                    speech: this.intentSpeech
                },
                resolvedQuery: e,
                score: this.intentConfidence
            };
            return t.result = n, console.log('GoogleMock._startNLU: _onResult wird aufgerufen'), 
            this._onResult(t.result, t.plugin, t.type), this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_startNLU', t), -1;
        }
    }, e.prototype._stopNLU = function(t) {
        return this._onStop(t.plugin, t.type), 0;
    }, e.prototype._startASR = function(t, e, o, n, r) {
        if (!this.googleASRFlag) return this._error('_startASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), t.result = "Testtext", this._onResult(t.result, t.plugin, t.type), 
            this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_startASR', t), -1;
        }
    }, e.prototype._stopASR = function(t) {
        if (!this.googleASRFlag) return this._error('_stopASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_stopASR', t), -1;
        }
    }, e.prototype._startTTS = function(t, e, o, n) {
        var r = this;
        if (!e) return this._error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.googleTTSFlag) return this._error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), setTimeout((function() {
                return r._onStop(t.plugin, t.type);
            }), 100), 0;
        } catch (t) {
            return this._exception('_startTTS', t), -1;
        }
    }, e.prototype._stopTTS = function(t) {
        if (!this.googleTTSFlag) return this._error('_stopTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_stopTTS', t), -1;
        }
    }, e;
}(i), ct = function(t) {
    function e(e) {
        var o = t.call(this, 'GoogleConfig') || this;
        return o.mInitFlag = !1, o.mConfigPath = "assets/", o.mConfigFile = "google.json", 
        o.mConfigLoadFlag = false, o.mConfigServerUrl = "ws://localhost:7050", o.mConfigDialogflowTokenServerUrl = '', 
        o.mConfigDialogflowProjectId = '', o.mConfigDialogflowSessionId = '', o.mConfigDialogflowEnvironmentName = '', 
        o.mConfigAppId = '', o.mConfigAppKey = '', o.mConfigUserId = '', o.mConfigNluTag = '', 
        o.mFileReader = null, o.mOnInitFunc = null, o.mOnErrorFunc = null, o.mFileReader = e, 
        o._setErrorOutputFunc((function(t) {
            return o._onError(new Error(t));
        })), o;
    }
    return it(e, t), e.prototype._setOption = function(t) {
        t && ('string' == typeof t.googleConfigPath && (this.mConfigPath = t.googleConfigPath), 
        'string' == typeof t.googleConfigFile && (this.mConfigFile = t.googleConfigFile), 
        'boolean' == typeof t.googleConfigLoadFlag && (this.mConfigLoadFlag = t.googleConfigLoadFlag), 
        'string' == typeof t.googleServerUrl && (this.mConfigServerUrl = t.googleServerUrl), 
        'string' == typeof t.dialogflowTokenServerUrl && (this.mConfigDialogflowTokenServerUrl = t.dialogflowTokenServerUrl), 
        'string' == typeof t.dialogflowProjectId && (this.mConfigDialogflowProjectId = t.dialogflowProjectId), 
        'string' == typeof t.dialogflowSessionId && (this.mConfigDialogflowSessionId = t.dialogflowSessionId), 
        'string' == typeof t.dialogflowEnvironmentName && (this.mConfigDialogflowEnvironmentName = t.dialogflowEnvironmentName), 
        'string' == typeof t.googleAppId && (this.mConfigAppId = t.googleAppId), 'string' == typeof t.googleAppKey && (this.mConfigAppKey = t.googleAppKey), 
        'string' == typeof t.googleUserId && (this.mConfigUserId = t.googleUserId), 'string' == typeof t.googleNluTag && (this.mConfigNluTag = t.googleNluTag), 
        'string' == typeof t.googleNluTag && (this.mConfigNluTag = t.googleNluTag), 'boolean' == typeof t.errorOutputFlag && this._setErrorOutput(t.errorOutputFlag));
    }, e.prototype.init = function(t) {
        return this._setOption(t), this.mInitFlag = !0, 0;
    }, e.prototype.done = function() {
        return this.mInitFlag = !1, this.mConfigPath = "assets/", this.mConfigFile = "google.json", 
        this.mConfigLoadFlag = false, this.mConfigServerUrl = "ws://localhost:7050", this.mConfigDialogflowTokenServerUrl = '', 
        this.mConfigDialogflowProjectId = '', this.mConfigDialogflowSessionId = '', this.mConfigDialogflowEnvironmentName = '', 
        this.mConfigAppId = '', this.mConfigAppKey = '', this.mConfigUserId = '', this.mConfigNluTag = '', 
        this.mFileReader = null, this.mOnInitFunc = null, 0;
    }, e.prototype.isInit = function() {
        return this.mInitFlag;
    }, e.prototype._onInit = function(t) {
        0 === t && (this.mInitFlag = !0), 'function' == typeof this.mOnInitFunc && this.mOnInitFunc(t);
    }, e.prototype._onError = function(t) {
        if ('function' == typeof this.mOnErrorFunc) try {
            return this.mOnErrorFunc(t), 0;
        } catch (t) {
            return this.isErrorOutput() && console.log('===> EXCEPTION AmazonConfig._onError: ', t.message), 
            -1;
        }
        return 0;
    }, Object.defineProperty(e.prototype, "onInit", {
        set: function(t) {
            this.mOnInitFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype._readConfigData = function(t) {
        if (!t) return this._error('_readConfigData', 'keine Daten uebergeben'), -1;
        try {
            var e = JSON.parse(t);
            return e.URL && (this.serverUrl = e.URL), e.APP_ID && (this.appId = e.APP_ID), e.APP_KEY && (this.appKey = e.APP_KEY), 
            e.USER_ID && (this.userId = e.USER_ID), e.NLU_TAG && (this.nluTag = e.NLU_TAG), 
            this._onInit(0), 0;
        } catch (t) {
            return this._exception('_readConfigData', t), -1;
        }
    }, e.prototype._readError = function(t) {
        this._error('_readError', t), this._onInit(-1);
    }, e.prototype.read = function() {
        if (!this.mFileReader) return this._error('read', 'kein FileReader vorhanden'), 
        this._onInit(-1), -1;
        var t = this.mConfigPath + this.mConfigFile;
        return this.mFileReader.read(t);
    }, Object.defineProperty(e.prototype, "serverUrl", {
        get: function() {
            return this.mConfigServerUrl;
        },
        set: function(t) {
            this.mConfigServerUrl = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "dialogflowTokenServerUrl", {
        get: function() {
            return this.mConfigDialogflowTokenServerUrl;
        },
        set: function(t) {
            this.mConfigDialogflowTokenServerUrl = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "dialogflowProjectId", {
        get: function() {
            return this.mConfigDialogflowProjectId;
        },
        set: function(t) {
            this.mConfigDialogflowProjectId = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "dialogflowSessionId", {
        get: function() {
            return this.mConfigDialogflowSessionId;
        },
        set: function(t) {
            this.mConfigDialogflowSessionId = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "dialogflowEnvironmentName", {
        get: function() {
            return this.mConfigDialogflowEnvironmentName;
        },
        set: function(t) {
            this.mConfigDialogflowEnvironmentName = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "appId", {
        get: function() {
            return this.mConfigAppId;
        },
        set: function(t) {
            this.mConfigAppId = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "appKey", {
        get: function() {
            return this.mConfigAppKey;
        },
        set: function(t) {
            this.mConfigAppKey = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "userId", {
        get: function() {
            return this.mConfigUserId;
        },
        set: function(t) {
            this.mConfigUserId = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(e.prototype, "nluTag", {
        get: function() {
            return this.mConfigNluTag;
        },
        set: function(t) {
            this.mConfigNluTag = t;
        },
        enumerable: !1,
        configurable: !0
    }), e.prototype.isCredentials = function() {
        return !!(this.mConfigAppKey || this.mConfigDialogflowTokenServerUrl && this.mConfigDialogflowProjectId);
    }, e;
}(t), gt = function(t) {
    function e() {
        return t.call(this, 'GoogleNetwork') || this;
    }
    return it(e, t), e;
}(c), ht = function(t) {
    function e() {
        return t.call(this, 'GoogleWebSocket') || this;
    }
    return it(e, t), e.prototype.connect = function(t) {
        return t ? 0 !== this._connect(t) ? (this._error('open', 'keine Verbindung moeglich'), 
        -1) : 0 : (this._error('connect', 'keine URL vorhanden'), -1);
    }, e.prototype.disconnect = function() {
        this.onMessage = null, this.close();
    }, e.prototype.sendJSON = function(t) {
        this.sendMessage(t);
    }, e;
}(g), pt = function(t) {
    function e(e, o) {
        var n = t.call(this, 'GoogleConnect') || this;
        return n.mConfig = null, n.mWebSocket = null, n.mConnectFlag = !1, n.mConfig = e, 
        n.mWebSocket = o, n;
    }
    return it(e, t), e.prototype.isConnect = function() {
        return this.mConnectFlag;
    }, e.prototype.connect = function(t) {
        var e = this;
        if (this.isConnect()) return 0;
        if (!this.mWebSocket) return this.mConnectFlag = !0, 0;
        try {
            return this.mWebSocket.onMessage = function(o) {
                if ('string' == typeof o.data) {
                    console.log('GoogleConnect.onMessage: String-Nachricht');
                    try {
                        var n = JSON.parse(o.data);
                        t.onmessage ? t.onmessage(n) : e._error('connect.onMessage', 'keine Message-Funktion vorhanden');
                    } catch (t) {
                        return e._exception('connect.onMessage', t), -1;
                    }
                } else 'object' == typeof o.data && (console.log('GoogleConnect.onMessage: Objekt-Daten'), 
                t.ondata ? t.ondata(o.data) : e._error('connect.onMessage', 'keine Daten-Funktion vorhanden'));
                return 0;
            }, this.mConnectFlag = !0, 0;
        } catch (t) {
            return this._exception('connect', t), -1;
        }
    }, e.prototype.disconnect = function() {
        return this.mConnectFlag = !1, this.mWebSocket && (this.mWebSocket.onMessage = null), 
        0;
    }, e.prototype.sendJSON = function(t) {
        return this.mWebSocket ? this.mWebSocket.sendMessage(t) : -1;
    }, Object.defineProperty(e.prototype, "webSocket", {
        get: function() {
            return this.mWebSocket ? this.mWebSocket.webSocket : null;
        },
        enumerable: !1,
        configurable: !0
    }), e;
}(t);

!function(t) {
    var e;
    !function(t) {
        t[t.EN = "en"] = "EN", t[t.DE = "de"] = "DE", t[t.ES = "es"] = "ES", t[t.PT_BR = "pt-BR"] = "PT_BR", 
        t[t.ZH_HK = "zh-HK"] = "ZH_HK", t[t.ZH_CN = "zh-CN"] = "ZH_CN", t[t.ZH_TW = "zh-TW"] = "ZH_TW", 
        t[t.NL = "nl"] = "NL", t[t.FR = "fr"] = "FR", t[t.IT = "it"] = "IT", t[t.JA = "ja"] = "JA", 
        t[t.KO = "ko"] = "KO", t[t.PT = "pt"] = "PT", t[t.RU = "ru"] = "RU", t[t.UK = "uk"] = "UK";
    }(e = t.AVAILABLE_LANGUAGES || (t.AVAILABLE_LANGUAGES = {})), t.VERSION = "2.0.0-beta.20", 
    t.DEFAULT_BASE_URL = "https://api.api.ai/v1/", t.DEFAULT_API_VERSION = "20150910", 
    t.DEFAULT_CLIENT_LANG = e.EN, t.DEFAULT_TTS_HOST = "https://api.api.ai/api/tts";
}(ut || (ut = {}));

var mt = function(t) {
    function e(e) {
        var o = t.call(this, e) || this;
        return o.message = e, o.stack = (new Error).stack, o;
    }
    return it(e, t), e;
}(Error), ft = function(t) {
    function e(e) {
        var o = t.call(this, e) || this;
        return o.name = "ApiAiClientConfigurationError", o;
    }
    return it(e, t), e;
}(mt), dt = function(t) {
    function e(e, o) {
        void 0 === o && (o = null);
        var n = t.call(this, e) || this;
        return n.message = e, n.code = o, n.name = "ApiAiRequestError", n;
    }
    return it(e, t), e;
}(mt), _t = function() {
    function t() {}
    return t.ajax = function(e, o, n, r, i) {
        return void 0 === n && (n = null), void 0 === r && (r = null), void 0 === i && (i = {}), 
        new Promise((function(s, a) {
            var u = t.createXMLHTTPObject(), l = o, c = null;
            if (n && e === t.Method.GET) {
                l += "?";
                var g = 0;
                for (var h in n) n.hasOwnProperty(h) && (g++ && (l += "&"), l += encodeURIComponent(h) + "=" + encodeURIComponent(n[h]));
            } else n && (r || (r = {}), r["Content-Type"] = "application/json; charset=utf-8", 
            c = JSON.stringify(n));
            for (var h in i) h in u && (u[h] = i[h]);
            if (u.open(t.Method[e], l, !0), r) for (var h in console.log('Dialogflow.XhrRequest: Headers', r), 
            r) r.hasOwnProperty(h) && u.setRequestHeader(h, r[h]);
            c ? u.send(c) : u.send(), u.onload = function() {
                u.status >= 200 && u.status < 300 ? s(u) : (console.log('Dialogflow.XhrRequest: onLoad->reject ', u), 
                a(u));
            }, u.onerror = function() {
                console.log('Dialogflow.XhrRequest: onError ', u), a(u);
            };
        }));
    }, t.get = function(e, o, n, r) {
        return void 0 === o && (o = null), void 0 === n && (n = null), void 0 === r && (r = {}), 
        t.ajax(t.Method.GET, e, o, n, r);
    }, t.post = function(e, o, n, r) {
        return void 0 === o && (o = null), void 0 === n && (n = null), void 0 === r && (r = {}), 
        t.ajax(t.Method.POST, e, o, n, r);
    }, t.put = function(e, o, n, r) {
        return void 0 === o && (o = null), void 0 === n && (n = null), void 0 === r && (r = {}), 
        t.ajax(t.Method.PUT, e, o, n, r);
    }, t.delete = function(e, o, n, r) {
        return void 0 === o && (o = null), void 0 === n && (n = null), void 0 === r && (r = {}), 
        t.ajax(t.Method.DELETE, e, o, n, r);
    }, t.createXMLHTTPObject = function() {
        for (var e = null, o = 0, n = t.XMLHttpFactories; o < n.length; o++) {
            var r = n[o];
            try {
                e = r();
            } catch (t) {
                continue;
            }
            break;
        }
        return e;
    }, t.XMLHttpFactories = [ function() {
        return new XMLHttpRequest;
    }, function() {
        return new window.ActiveXObject("Msxml2.XMLHTTP");
    }, function() {
        return new window.ActiveXObject("Msxml3.XMLHTTP");
    }, function() {
        return new window.ActiveXObject("Microsoft.XMLHTTP");
    } ], t;
}();

!function(t) {
    var e;
    (e = t.Method || (t.Method = {}))[e.GET = "GET"] = "GET", e[e.POST = "POST"] = "POST", 
    e[e.PUT = "PUT"] = "PUT", e[e.DELETE = "DELETE"] = "DELETE";
}(_t || (_t = {}));

var Tt, St = _t, yt = function() {
    function t(t, e) {
        this.apiAiClient = t, this.options = e, this.uri = this.apiAiClient.getApiBaseUrl() + "query?v=" + this.apiAiClient.getApiVersion(), 
        this.requestMethod = St.Method.POST, this.headers = {
            Authorization: "Bearer " + this.apiAiClient.getAccessToken()
        }, this.options.lang = this.apiAiClient.getApiLang(), this.options.sessionId = this.apiAiClient.getSessionId();
    }
    return t.handleSuccess = function(t) {
        return Promise.resolve(JSON.parse(t.responseText));
    }, t.handleError = function(t) {
        var e = new dt(null);
        try {
            var o = JSON.parse(t.responseText);
            e = o.status && o.status.errorDetails ? new dt(o.status.errorDetails, o.status.code) : new dt(t.statusText, t.status);
        } catch (o) {
            e = new dt(t.statusText, t.status);
        }
        return Promise.reject(e);
    }, t.prototype.perform = function(e) {
        void 0 === e && (e = null);
        var o = e || this.options;
        return St.ajax(this.requestMethod, this.uri, o, this.headers).then(t.handleSuccess.bind(this)).catch(t.handleError.bind(this));
    }, t;
}(), At = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return it(e, t), e;
}(yt), vt = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return it(e, t), e;
}(yt);

!function(t) {
    var e, o;
    (e = t.ERROR || (t.ERROR = {}))[e.ERR_NETWORK = 0] = "ERR_NETWORK", e[e.ERR_AUDIO = 1] = "ERR_AUDIO", 
    e[e.ERR_SERVER = 2] = "ERR_SERVER", e[e.ERR_CLIENT = 3] = "ERR_CLIENT", (o = t.EVENT || (t.EVENT = {}))[o.MSG_WAITING_MICROPHONE = 0] = "MSG_WAITING_MICROPHONE", 
    o[o.MSG_MEDIA_STREAM_CREATED = 1] = "MSG_MEDIA_STREAM_CREATED", o[o.MSG_INIT_RECORDER = 2] = "MSG_INIT_RECORDER", 
    o[o.MSG_RECORDING = 3] = "MSG_RECORDING", o[o.MSG_SEND = 4] = "MSG_SEND", o[o.MSG_SEND_EMPTY = 5] = "MSG_SEND_EMPTY", 
    o[o.MSG_SEND_EOS_OR_JSON = 6] = "MSG_SEND_EOS_OR_JSON", o[o.MSG_WEB_SOCKET = 7] = "MSG_WEB_SOCKET", 
    o[o.MSG_WEB_SOCKET_OPEN = 8] = "MSG_WEB_SOCKET_OPEN", o[o.MSG_WEB_SOCKET_CLOSE = 9] = "MSG_WEB_SOCKET_CLOSE", 
    o[o.MSG_STOP = 10] = "MSG_STOP", o[o.MSG_CONFIG_CHANGED = 11] = "MSG_CONFIG_CHANGED";
}(Tt || (Tt = {}));

var Ct = function() {
    function t(t) {
        if (!t || !t.accessToken) throw new ft("Access token is required for new ApiAi.Client instance");
        this.accessToken = t.accessToken, this.apiLang = t.lang || ut.DEFAULT_CLIENT_LANG, 
        this.apiVersion = t.version || ut.DEFAULT_API_VERSION, this.apiBaseUrl = t.baseUrl || ut.DEFAULT_BASE_URL, 
        this.sessionId = t.sessionId || this.guid();
    }
    return t.prototype.textRequest = function(t, e) {
        if (void 0 === e && (e = {}), !t) throw new ft("Query should not be empty");
        return e.query = t, new vt(this, e).perform();
    }, t.prototype.eventRequest = function(t, e, o) {
        if (void 0 === e && (e = {}), void 0 === o && (o = {}), !t) throw new ft("Event name can not be empty");
        return o.event = {
            name: t,
            data: e
        }, new At(this, o).perform();
    }, t.prototype.getAccessToken = function() {
        return this.accessToken;
    }, t.prototype.getApiVersion = function() {
        return this.apiVersion ? this.apiVersion : ut.DEFAULT_API_VERSION;
    }, t.prototype.getApiLang = function() {
        return this.apiLang ? this.apiLang : ut.DEFAULT_CLIENT_LANG;
    }, t.prototype.getApiBaseUrl = function() {
        return this.apiBaseUrl ? this.apiBaseUrl : ut.DEFAULT_BASE_URL;
    }, t.prototype.setSessionId = function(t) {
        this.sessionId = t;
    }, t.prototype.getSessionId = function() {
        return this.sessionId;
    }, t.prototype.guid = function() {
        var t = function() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
        };
        return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t();
    }, t;
}(), Gt = function(t) {
    function e(e, o, n) {
        var r = t.call(this, e || 'GoogleDevice') || this;
        return r.mInitFlag = !1, r.mConfig = null, r.mConnect = null, r.mTransaction = null, 
        r.onStart = null, r.onStop = null, r.onResult = null, r.onError = null, r.onClose = null, 
        r.mConfig = o, r.mConnect = n, r.mInitFlag = !0, r._setErrorOutput(o.isErrorOutput()), 
        r;
    }
    return it(e, t), e.prototype.isInit = function() {
        return this.mInitFlag;
    }, e.prototype.clearToken = function() {}, e.prototype._onStart = function() {
        return this.mTransaction && this.onStart && this.onStart(this.mTransaction), 0;
    }, e.prototype._onStop = function() {
        return this.mTransaction && this.onStop && this.onStop(this.mTransaction), this.mTransaction = null, 
        0;
    }, e.prototype._onResult = function(t) {
        return this.mTransaction && this.onResult && (this.mTransaction.result = t, this.onResult(this.mTransaction)), 
        0;
    }, e.prototype._onError = function(t) {
        return this.mTransaction && this.onError && (this.mTransaction.error = t, this.onError(this.mTransaction)), 
        0;
    }, e.prototype._onClose = function() {
        return this.mTransaction && this.onClose && this.onClose(this.mTransaction), 0;
    }, e.prototype._start = function(t) {
        return -1;
    }, e.prototype._stop = function() {
        return -1;
    }, e.prototype.start = function(t, e) {
        if (!t) return this._error('start', 'keine Transaktion uebergeben'), -1;
        if (this.mTransaction) return this._error('start', 'vorherige Transaktion nicht beendet'), 
        -1;
        this.mTransaction = t;
        try {
            return 0 !== this._start(e) ? (this.mTransaction = null, -1) : 0;
        } catch (t) {
            return this._exception('start', t), -1;
        }
    }, e.prototype.stop = function(t) {
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
    }, e.prototype.isTransaction = function() {
        return !!this.mTransaction;
    }, e.prototype.getTransaction = function() {
        return this.mTransaction;
    }, e.prototype.clearTransaction = function() {
        this.mTransaction = null;
    }, e;
}(t), kt = function(t) {
    function e(e, o) {
        return t.call(this, 'GoogleNLU', e, o) || this;
    }
    return it(e, t), e.prototype._start = function(t) {
        var e = this;
        try {
            return this.mConfig.appKey ? (this.mDialogflowClient = new Ct({
                accessToken: this.mConfig.appKey
            }), this.mDialogflowClient.textRequest(t.text).then((function(t) {
                try {
                    e._onResult(t.result);
                } catch (t) {
                    e._onError(new Error('NLU-Exception: ' + t.message));
                }
                e._onStop();
            }), (function(t) {
                console.log('GoogleNlu._start: Promise-Error ', t), e._onError(new Error('NLU-Error: ' + t.message));
            })), 0) : (this._error('_start', 'kein AppKey vorhanden'), -1);
        } catch (t) {
            return this._exception('_start', t), -1;
        }
    }, e.prototype._stop = function() {
        return 0;
    }, e;
}(Gt), Et = 'https://dialogflow.googleapis.com/v2/projects', wt = function(t) {
    function e(e, o, n, r) {
        var i = t.call(this, 'GoogleNLU2', e, o) || this;
        return i.mAccessToken = '', i.mAccessTokenDate = new Date, i.mAccessTokenDuration = 0, 
        i.mOptions = {}, i.mAudioContext = null, i.mAudioPlayer = null, i.mGetUserMedia = null, 
        i.mAudioRecorder = null, i.mUserMediaStream = null, i.mRecordingFlag = !1, i.mStopFlag = !1, 
        i.mSpeakFlag = !1, i.mVolumeCounter = 0, i.mMaxVolumeCounter = 100, i.mTimeoutCounter = 0, 
        i.mMicrophoneFlag = !1, i.mAudioContext = n, i.mGetUserMedia = r, i.getAccessTokenFromServer(), 
        i;
    }
    return it(e, t), e.prototype.clearToken = function() {
        this.mAccessToken = '', this.mAccessTokenDate = new Date, this.mAccessTokenDuration = 0;
    }, e.prototype.getDiffTime = function(t, e) {
        return e.getTime() - t.getTime();
    }, e.prototype.getAccessTokenFromServer = function() {
        return st(this, void 0, void 0, (function() {
            var t, e;
            return at(this, (function(o) {
                switch (o.label) {
                  case 0:
                    return o.trys.push([ 0, 3, , 4 ]), [ 4, fetch(this.mConfig.dialogflowTokenServerUrl, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }) ];

                  case 1:
                    return [ 4, o.sent().json() ];

                  case 2:
                    return t = o.sent(), this.mAccessTokenDate = new Date, this.mAccessToken = t.token || '', 
                    this.mAccessTokenDuration = t.time || 0, [ 3, 4 ];

                  case 3:
                    return e = o.sent(), this.mInitFlag = !1, this._exception('getAccessTokenFromServer', e), 
                    [ 3, 4 ];

                  case 4:
                    return [ 2 ];
                }
            }));
        }));
    }, e.prototype.getAccessToken = function() {
        return st(this, void 0, void 0, (function() {
            var t;
            return at(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return t = new Date, Math.round(this.getDiffTime(this.mAccessTokenDate, t) / 1e3) > this.mAccessTokenDuration ? [ 4, this.getAccessTokenFromServer() ] : [ 3, 2 ];

                  case 1:
                    e.sent(), e.label = 2;

                  case 2:
                    return [ 2, this.mAccessToken ];
                }
            }));
        }));
    }, e.prototype.getDetectIntentText = function(t, e) {
        return st(this, void 0, void 0, (function() {
            var o, n, r, i;
            return at(this, (function(s) {
                switch (s.label) {
                  case 0:
                    return s.trys.push([ 0, 4, , 5 ]), (o = this.mConfig.dialogflowSessionId) || (o = Math.floor(Math.random() * Math.floor(9999999999)).toString(), 
                    this.mConfig.dialogflowSessionId = o), n = Et + "/" + this.mConfig.dialogflowProjectId + "/agent/sessions/" + o + ":detectIntent", 
                    this.mConfig.dialogflowEnvironmentName && (n = Et + "/" + this.mConfig.dialogflowProjectId + "/agent/environments/" + this.mConfig.dialogflowEnvironmentName + "/users/-/sessions/" + o + ":detectIntent"), 
                    [ 4, this.getAccessToken() ];

                  case 1:
                    return r = s.sent(), [ 4, fetch(n, {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            Authorization: "Bearer " + r,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            queryInput: {
                                text: {
                                    text: t,
                                    languageCode: e
                                }
                            }
                        })
                    }) ];

                  case 2:
                    return [ 4, s.sent().json() ];

                  case 3:
                    return [ 2, s.sent() ];

                  case 4:
                    return i = s.sent(), this._exception('getDetectIntentText', i), [ 2, new Promise((function(t, e) {
                        e(new Error('Exception in getDetectIntentText'));
                    })) ];

                  case 5:
                    return [ 2 ];
                }
            }));
        }));
    }, e.prototype.getDetectIntentAudio = function(t, e) {
        return st(this, void 0, void 0, (function() {
            var e, o, n, r;
            return at(this, (function(i) {
                switch (i.label) {
                  case 0:
                    return i.trys.push([ 0, 4, , 5 ]), (e = this.mConfig.dialogflowSessionId) || (e = Math.floor(Math.random() * Math.floor(9999999999)).toString(), 
                    this.mConfig.dialogflowSessionId = e), o = Et + "/" + this.mConfig.dialogflowProjectId + "/agent/sessions/" + e + ":detectIntent", 
                    this.mConfig.dialogflowEnvironmentName && (o = Et + "/" + this.mConfig.dialogflowProjectId + "/agent/environments/" + this.mConfig.dialogflowEnvironmentName + "/users/-/sessions/" + e + ":detectIntent"), 
                    [ 4, this.getAccessToken() ];

                  case 1:
                    return n = i.sent(), [ 4, fetch(o, {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            Authorization: "Bearer " + n,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            queryInput: {
                                audioConfig: {
                                    audioEncoding: 'AUDIO_ENCODING_LINEAR_16',
                                    languageCode: 'de',
                                    sampleRateHertz: 16e3
                                }
                            },
                            inputAudio: t
                        })
                    }) ];

                  case 2:
                    return [ 4, i.sent().json() ];

                  case 3:
                    return [ 2, i.sent() ];

                  case 4:
                    return r = i.sent(), this._exception('getDetectIntentAudio', r), [ 2, new Promise((function(t, e) {
                        e(new Error('Exception in getDetectIntentAudio'));
                    })) ];

                  case 5:
                    return [ 2 ];
                }
            }));
        }));
    }, e.prototype._responseIntent = function(t, e) {
        var o = -1;
        try {
            this._onResult(e), this.mSpeakFlag && !this.mStopFlag && (e.outputAudioConfig && 'OUTPUT_AUDIO_ENCODING_MP3' === e.outputAudioConfig.audioEncoding ? o = this._startTTS(t, e.outputAudio) : this._onError(new Error('NLU-Error: no MP3-Format')));
        } catch (t) {
            this._onError(new Error('NLU-Exception: ' + t.message));
        }
        0 !== o && this._onStop();
    }, e.prototype._start = function(t) {
        var e = this;
        this.mStopFlag = !1;
        try {
            return this.mConfig.dialogflowTokenServerUrl ? this.mConfig.dialogflowProjectId ? t.text ? (this.getDetectIntentText(t.text, t.language).then((function(o) {
                e._responseIntent(t, o);
            }), (function(t) {
                e._onError(new Error('NLU-Error: ' + t.message)), e._onStop();
            })), 0) : this._startASR(t) : (this._error('_start', 'keine ProjektID vorhanden'), 
            -1) : (this._error('_start', 'kein Tokenserver vorhanden'), -1);
        } catch (t) {
            return this._exception('_start', t), -1;
        }
    }, e.prototype._stop = function() {
        return this.mStopFlag = !0, this._stopASR({}), this._stopTTS(), this._onStop(), 
        0;
    }, e.prototype.encodeBase64 = function(t) {
        if (window.btoa) {
            for (var e = '', o = new Uint8Array(t), n = o.byteLength, r = 0; r < n; r++) e += String.fromCharCode(o[r]);
            return window.btoa(e);
        }
        return '';
    }, e.prototype.isVolume = function(t) {
        if (this.mVolumeCounter += 1, this.mTimeoutCounter += 1, t) try {
            for (var e = t.length, o = 0, n = 0; n < e; n++) o += t[n] * t[n];
            var r = Math.sqrt(o / e);
            (r < 127 || r > 128) && (this.mVolumeCounter = 0, this.mMaxVolumeCounter = 20);
        } catch (t) {
            this._exception('isVolume', t);
        }
        return this.mVolumeCounter !== this.mMaxVolumeCounter && 150 !== this.mTimeoutCounter;
    }, e.prototype._detectMicrophone = function() {
        return new Promise((function(t) {
            navigator.mediaDevices && navigator.mediaDevices.enumerateDevices ? navigator.mediaDevices.enumerateDevices().then((function(e) {
                var o = !1;
                e.forEach((function(t) {
                    'audioinput' === t.kind && (o = !0);
                })), t(o);
            })).catch((function(e) {
                t(!0);
            })) : t(!0);
        }));
    }, e.prototype._startASRAudio = function(t) {}, e.prototype._startASRRecording = function(t) {
        var e = this;
        this.mMaxVolumeCounter = 100, this.mVolumeCounter = 0, this.mTimeoutCounter = 0;
        try {
            if (this.mAudioRecorder = new a(null, this.mAudioContext, (function(o) {
                e.isVolume(o) || e._stopASR(t);
            })), t.userMediaStream) this.mAudioRecorder.start(t.userMediaStream, "audio/L16;rate=16000"); else {
                if (!t.audioData) return this._error('_startASRRecording', 'keine Audiodaten vorhanden'), 
                void this._stop();
                this.mAudioRecorder.startAudio(t.audioData, "audio/L16;rate=16000");
            }
            this.mRecordingFlag = !0;
        } catch (e) {
            this._exception('_startASRRecording', e), this._stopASR(t);
        }
    }, e.prototype._startASR = function(t) {
        var e = this;
        if (this.mRecordingFlag) return this._error('_startASR', 'ASR laeuft bereits'), 
        -1;
        if (t && t.audioURL) {
            var o = {
                audioURL: t.audioURL,
                language: t.language
            };
            try {
                this._startASRAudio(o);
            } catch (t) {
                return this._exception('_startASR', t), -1;
            }
        } else {
            if (!this.mGetUserMedia) return this._onError(new Error('ASR-Error: kein UserMedia erzeugt')), 
            this._error('_startASR', 'kein getUserMedia vorhanden'), -1;
            try {
                return this._detectMicrophone().then((function(o) {
                    o ? e.mGetUserMedia({
                        audio: !0,
                        video: !1
                    }).then((function(o) {
                        e.mUserMediaStream = o;
                        var n = {
                            userMediaStream: e.mUserMediaStream,
                            language: t.language
                        };
                        e._startASRRecording(n);
                    }), (function(t) {
                        e._onError(new Error('ASR-Error: kein UserMedia erzeugt')), e._error('_startASR', 'keine UserMedia erzeugt: ' + t.message), 
                        e._onStop();
                    })) : (e._onError(new Error('ASR-Error: kein UserMedia erzeugt')), e._error('_startASR', 'kein Microphone vorhanden'), 
                    e._onStop());
                })), 0;
            } catch (t) {
                return this._exception('_startASR', t), -1;
            }
        }
        return this._error('_startASR', 'ASR ist nicht implementiert'), -1;
    }, e.prototype._stopASR = function(t) {
        var e = this;
        if (this.mRecordingFlag = !1, !this.mAudioRecorder) return 0;
        try {
            return this.mAudioRecorder.stop((function(o) {
                e.mStopFlag || e.getDetectIntentAudio(e.encodeBase64(o), '').then((function(o) {
                    e._responseIntent(t, o);
                }), (function(t) {
                    e._onError(new Error('NLU-Error: ' + t.message)), e._onStop();
                }));
            })), this.mAudioRecorder = null, 0;
        } catch (t) {
            return this._exception('_stop', t), -1;
        }
    }, e.prototype.decodeBase64 = function(t) {
        if (window.atob) {
            for (var e = window.atob(t), o = e.length, n = new Uint8Array(o), r = 0; r < o; r++) n[r] = e.charCodeAt(r);
            return n.buffer;
        }
        return new ArrayBuffer(1);
    }, e.prototype._startTTS = function(t, e) {
        var o = this;
        try {
            if (!e) return -1;
            this.mAudioPlayer = new s(this.mAudioContext), this.mAudioPlayer.start();
            var n = {
                onaudiostart: function() {},
                onaudioend: function() {
                    o._stop();
                }
            };
            return this.mAudioPlayer.decodeAudio(n, this.decodeBase64(e)), 0;
        } catch (t) {
            return this._onError(new Error('NLU2-Exception: ' + t.message)), -1;
        }
    }, e.prototype._stopTTS = function() {
        return this.mAudioPlayer && (this.mAudioPlayer.stopAudio(), this._onStop()), 0;
    }, e;
}(Gt), Rt = function(t) {
    function e(e, o, n, r, i) {
        var s = t.call(this, 'GoogleASR2', e, o) || this;
        return s.mAccessToken = '', s.mAccessTokenDate = new Date, s.mAccessTokenDuration = 0, 
        s.mAudioContext = null, s.mGetUserMedia = null, s.mAudioReader = null, s.mAudioRecorder = null, 
        s.mUserMediaStream = null, s.mRecordingFlag = !1, s.mVolumeCounter = 0, s.mTimeoutCounter = 0, 
        s.mAudioContext = n, s.mGetUserMedia = r, s.mAudioReader = i, s.getAccessTokenFromServer(), 
        s;
    }
    return it(e, t), e.prototype.clearToken = function() {
        this.mAccessToken = '', this.mAccessTokenDate = new Date, this.mAccessTokenDuration = 0;
    }, e.prototype.getDiffTime = function(t, e) {
        return e.getTime() - t.getTime();
    }, e.prototype.getAccessTokenFromServer = function() {
        return st(this, void 0, void 0, (function() {
            var t, e;
            return at(this, (function(o) {
                switch (o.label) {
                  case 0:
                    return o.trys.push([ 0, 3, , 4 ]), [ 4, fetch(this.mConfig.serverUrl, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }) ];

                  case 1:
                    return [ 4, o.sent().json() ];

                  case 2:
                    return t = o.sent(), this.mAccessTokenDate = new Date, this.mAccessToken = t.token || '', 
                    this.mAccessTokenDuration = t.time || 0, [ 3, 4 ];

                  case 3:
                    return e = o.sent(), this.mInitFlag = !1, this._exception('getAccessTokenFromServer', e), 
                    [ 3, 4 ];

                  case 4:
                    return [ 2 ];
                }
            }));
        }));
    }, e.prototype.getAccessToken = function() {
        return st(this, void 0, void 0, (function() {
            var t;
            return at(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return t = new Date, Math.round(this.getDiffTime(this.mAccessTokenDate, t) / 1e3) > this.mAccessTokenDuration ? [ 4, this.getAccessTokenFromServer() ] : [ 3, 2 ];

                  case 1:
                    e.sent(), e.label = 2;

                  case 2:
                    return [ 2, this.mAccessToken ];
                }
            }));
        }));
    }, e.prototype.getSpeechToText = function(t, e, o) {
        return st(this, void 0, void 0, (function() {
            var t, e, n;
            return at(this, (function(r) {
                switch (r.label) {
                  case 0:
                    return r.trys.push([ 0, 4, , 5 ]), [ 4, this.getAccessToken() ];

                  case 1:
                    return t = r.sent(), [ 4, fetch("https://speech.googleapis.com/v1/speech:recognize", {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            Authorization: "Bearer " + t,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            config: {
                                encoding: 'LINEAR16',
                                languageCode: 'de-DE',
                                sampleRateHertz: 16e3
                            },
                            audio: {
                                content: o
                            }
                        })
                    }) ];

                  case 2:
                    return [ 4, r.sent().json() ];

                  case 3:
                    return (e = r.sent()) && this._onOptionMessage(e), this._onStop(), [ 2, e ];

                  case 4:
                    return n = r.sent(), this._exception('getSpeechToText', n), this._onStop(), [ 3, 5 ];

                  case 5:
                    return [ 2 ];
                }
            }));
        }));
    }, e.prototype.decodeBase64 = function(t) {
        if (window.atob) {
            for (var e = window.atob(t), o = e.length, n = new Uint8Array(o), r = 0; r < o; r++) n[r] = e.charCodeAt(r);
            return n.buffer;
        }
        return new ArrayBuffer(1);
    }, e.prototype.encodeBase64 = function(t) {
        if (window.btoa) {
            for (var e = '', o = new Uint8Array(t), n = o.byteLength, r = 0; r < n; r++) e += String.fromCharCode(o[r]);
            return window.btoa(e);
        }
        return '';
    }, e.prototype._onSpeechResult = function(t) {
        t && t.length > 0 && (t[0].transcript, t[0].confidence, this._onResult(t));
    }, e.prototype._onSpeechEnd = function() {}, e.prototype._onOptionMessage = function(t) {
        t.results && t.results.length > 0 && this._onSpeechResult(t.results[0].alternatives);
    }, e.prototype.isVolume = function(t) {
        if (this.mVolumeCounter += 1, this.mTimeoutCounter += 1, t) try {
            for (var e = t.length, o = 0, n = 0; n < e; n++) o += t[n] * t[n];
            var r = Math.sqrt(o / e);
            (r < 127 || r > 128) && (this.mVolumeCounter = 0);
        } catch (t) {
            this._exception('isVolume', t);
        }
        return 30 !== this.mVolumeCounter && 200 !== this.mTimeoutCounter;
    }, e.prototype._onEndedFunc = function(t) {
        this.getSpeechToText('de-DE', 'LINEAR16', this.encodeBase64(t));
    }, e.prototype._startAudio = function(t) {}, e.prototype._startASR = function(t) {
        var e = this;
        this.mVolumeCounter = 0, this.mTimeoutCounter = 0;
        try {
            if (this.mAudioRecorder = new a(null, this.mAudioContext, (function(t) {
                e.isVolume(t) || e._stop();
            })), t.userMediaStream) this.mAudioRecorder.start(t.userMediaStream, "audio/L16;rate=16000"); else {
                if (!t.audioData) return this._error('_startASR', 'keine Audiodaten vorhanden'), 
                void this._stop();
                this.mAudioRecorder.startAudio(t.audioData, "audio/L16;rate=16000");
            }
            this.mRecordingFlag = !0;
        } catch (t) {
            this._exception('_startASR', t), this._stop();
        }
    }, e.prototype._start = function(t) {
        var e = this;
        if (this.mRecordingFlag) return this._error('_start', 'ASR laeuft bereits'), -1;
        if (t && t.audioURL) {
            var o = {
                audioURL: t.audioURL,
                language: t.language
            };
            try {
                this._startAudio(o);
            } catch (t) {
                this._exception('_start', t);
            }
        } else {
            if (!this.mGetUserMedia) return this._error('_start', 'kein getUserMedia vorhanden'), 
            -1;
            try {
                return this.mGetUserMedia({
                    audio: !0,
                    video: !1
                }).then((function(o) {
                    e.mUserMediaStream = o;
                    var n = {
                        userMediaStream: e.mUserMediaStream,
                        language: t.language
                    };
                    e._startASR(n);
                }), (function(t) {
                    e._onError(new Error('ASR-Error: kein UserMedia erzeugt')), e._error('_start', 'keine UserMedia erzeugt: ' + t.message), 
                    e._onStop();
                })), 0;
            } catch (t) {
                return this._exception('_start', t), -1;
            }
        }
        return this._error('_start', 'ASR ist nicht implementiert'), -1;
    }, e.prototype._stop = function() {
        var t = this;
        if (this.mRecordingFlag = !1, !this.mAudioRecorder) return 0;
        try {
            return this.mAudioRecorder.stop((function(e) {
                t._onEndedFunc(e);
            })), this.mAudioRecorder = null, 0;
        } catch (t) {
            return this._exception('_stop', t), -1;
        }
    }, e;
}(Gt), Ut = function(t) {
    function e(e, o, n) {
        var r = t.call(this, 'GoogleTTS2', e, o) || this;
        return r.mAccessToken = '', r.mAccessTokenDate = new Date, r.mAccessTokenDuration = 0, 
        r.mAudioContext = null, r.mAudioPlayer = null, r.mAudioContext = n, r.getAccessTokenFromServer(), 
        r;
    }
    return it(e, t), e.prototype.clearToken = function() {
        this.mAccessToken = '', this.mAccessTokenDate = new Date, this.mAccessTokenDuration = 0;
    }, e.prototype.getDiffTime = function(t, e) {
        return e.getTime() - t.getTime();
    }, e.prototype.getAccessTokenFromServer = function() {
        return st(this, void 0, void 0, (function() {
            var t, e;
            return at(this, (function(o) {
                switch (o.label) {
                  case 0:
                    return o.trys.push([ 0, 3, , 4 ]), [ 4, fetch(this.mConfig.serverUrl, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }) ];

                  case 1:
                    return [ 4, o.sent().json() ];

                  case 2:
                    return t = o.sent(), this.mAccessTokenDate = new Date, this.mAccessToken = t.token || '', 
                    this.mAccessTokenDuration = t.time || 0, [ 3, 4 ];

                  case 3:
                    return e = o.sent(), this.mInitFlag = !1, this._exception('getAccessTokenFromServer', e), 
                    [ 3, 4 ];

                  case 4:
                    return [ 2 ];
                }
            }));
        }));
    }, e.prototype.getAccessToken = function() {
        return st(this, void 0, void 0, (function() {
            var t;
            return at(this, (function(e) {
                switch (e.label) {
                  case 0:
                    return t = new Date, Math.round(this.getDiffTime(this.mAccessTokenDate, t) / 1e3) > this.mAccessTokenDuration ? [ 4, this.getAccessTokenFromServer() ] : [ 3, 2 ];

                  case 1:
                    e.sent(), e.label = 2;

                  case 2:
                    return [ 2, this.mAccessToken ];
                }
            }));
        }));
    }, e.prototype.getTextToSpeech = function(t, e, o, n) {
        return st(this, void 0, void 0, (function() {
            var r;
            return at(this, (function(i) {
                switch (i.label) {
                  case 0:
                    return [ 4, this.getAccessToken() ];

                  case 1:
                    return r = i.sent(), [ 4, fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            Authorization: "Bearer " + r,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            input: {
                                text: t
                            },
                            voice: {
                                languageCode: e,
                                name: o
                            },
                            audioConfig: {
                                audioEncoding: n
                            }
                        })
                    }) ];

                  case 2:
                    return [ 4, i.sent().json() ];

                  case 3:
                    return [ 2, i.sent() ];
                }
            }));
        }));
    }, e.prototype.decodeBase64 = function(t) {
        if (window.atob) {
            for (var e = window.atob(t), o = e.length, n = new Uint8Array(o), r = 0; r < o; r++) n[r] = e.charCodeAt(r);
            return n.buffer;
        }
        return new ArrayBuffer(1);
    }, e.prototype._start = function(t) {
        var e = this;
        try {
            return this.mConfig.serverUrl ? (this.getTextToSpeech(t.text, t.language, t.voice, 'MP3').then((function(t) {
                try {
                    e.mAudioPlayer = new s(e.mAudioContext), e.mAudioPlayer.start();
                    var o = {
                        onaudiostart: function() {},
                        onaudioend: function() {
                            e._stop();
                        }
                    }, n = t.audioContent;
                    e.mAudioPlayer.decodeAudio(o, e.decodeBase64(n)), e._onResult(t);
                } catch (t) {
                    e._onError(new Error('TTS2-Exception: ' + t.message));
                }
            }), (function(t) {
                e._onError(new Error('TTS2-Error: ' + t.message)), e._onStop();
            })), 0) : (this._error('_start', 'kein Tokenserver vorhanden'), -1);
        } catch (t) {
            return this._exception('_start', t), -1;
        }
    }, e.prototype._stop = function() {
        return this.mAudioPlayer && (this.mAudioPlayer.stopAudio(), this._onStop()), 0;
    }, e;
}(Gt), bt = function(t) {
    function o(e, o) {
        void 0 === o && (o = !0);
        var n = t.call(this, e || "GooglePort", o) || this;
        return n.mAudioContext = null, n.mGetUserMedia = null, n.mGoogleServerFlag = !1, 
        n.mGoogleConfig = null, n.mGoogleNetwork = null, n.mGoogleWebSocket = null, n.mGoogleConnect = null, 
        n.mGoogleTTS = null, n.mGoogleASR = null, n.mGoogleNLU = null, n.mGoogleNLU2 = null, 
        n.mGoogleNLU2Flag = true, n.mDynamicCredentialsFlag = !1, n.mTransaction = null, 
        n.mRunningFlag = !1, n.mDefaultOptions = null, n.mActionTimeoutId = 0, n.mActionTimeout = 6e4, 
        n;
    }
    return it(o, t), o.prototype.isServer = function() {
        return this.mGoogleServerFlag;
    }, o.prototype.isMock = function() {
        return !1;
    }, o.prototype.getType = function() {
        return "Google";
    }, o.prototype.getClass = function() {
        return 'GooglePort';
    }, o.prototype.getVersion = function() {
        return "0.1.7.0008 vom 18.08.2020 (ALPHA)";
    }, o.prototype._checkCredentials = function(t) {
        if (!t) return !1;
        var e = !0;
        if ('string' != typeof t.dialogflowTokenServerUrl && (e = !1), t.dialogflowTokenServerUrl || (e = !1), 
        'string' != typeof t.dialogflowProjectId && (e = !1), t.dialogflowProjectId || (e = !1), 
        !e) {
            if ('string' != typeof t.googleAppKey) return !1;
            if (!t.googleAppKey) return !1;
        }
        return this.mGoogleNLU2Flag = e, !0;
    }, o.prototype._initAllObject = function(t) {
        var e = this, o = new u;
        o.init();
        var n = new l;
        if (n.init({
            audioContext: this.mAudioContext
        }), this.mGoogleConfig = new ct(o), 0 !== this.mGoogleConfig.init(t)) return -1;
        if (this.mGoogleConfig.isErrorOutput() !== this.isErrorOutput() && this.mGoogleConfig._setErrorOutput(this.isErrorOutput()), 
        this.mGoogleNetwork = new gt, this.mGoogleNetwork.onOnline = function() {
            return e._onOnline();
        }, this.mGoogleNetwork.onOffline = function() {
            return e._onOffline();
        }, this.mGoogleNetwork.onError = function(t) {
            return e._onError(t);
        }, 0 !== this.mGoogleNetwork.init(t)) return -1;
        if (this.isServer() && (this.mGoogleWebSocket = new ht, this.mGoogleWebSocket.onOpen = function(t) {
            return e._onOpen();
        }, this.mGoogleWebSocket.onClose = function() {
            return e._onClose();
        }, this.mGoogleWebSocket.onError = function(t) {
            return e._onError(t);
        }, 0 !== this.mGoogleWebSocket.init(t))) return -1;
        if (this.mGoogleConnect = new pt(this.mGoogleConfig, this.mGoogleWebSocket), this.mGoogleNLU = new kt(this.mGoogleConfig, this.mGoogleConnect), 
        this.mGoogleNLU.onStart = function(t) {
            return e._onStart(t.plugin, t.type);
        }, this.mGoogleNLU.onStop = function(t) {
            return e._onStop(t.plugin, t.type);
        }, this.mGoogleNLU.onResult = function(t) {
            return e._onResult(t.result, t.plugin, t.type);
        }, this.mGoogleNLU.onError = function(t) {
            return e._onError(t.error, t.plugin, t.type);
        }, this.mGoogleNLU.onClose = function(t) {
            return e._onClose();
        }, this.mGoogleNLU2 = new wt(this.mGoogleConfig, this.mGoogleConnect, this.mAudioContext, this.mGetUserMedia), 
        this.mGoogleNLU2.onStart = function(t) {
            return e._onStart(t.plugin, t.type);
        }, this.mGoogleNLU2.onStop = function(t) {
            return e._onStop(t.plugin, t.type);
        }, this.mGoogleNLU2.onResult = function(t) {
            return e._onResult(t.result, t.plugin, t.type);
        }, this.mGoogleNLU2.onError = function(t) {
            return e._onError(t.error, t.plugin, t.type);
        }, this.mGoogleNLU2.onClose = function(t) {
            return e._onClose();
        }, this.mAudioContext) {
            this.mGoogleTTS = new Ut(this.mGoogleConfig, this.mGoogleConnect, this.mAudioContext), 
            this.mGoogleTTS.onStart = function(t) {
                return e._onStart(t.plugin, t.type);
            }, this.mGoogleTTS.onStop = function(t) {
                return e._onStop(t.plugin, t.type);
            }, this.mGoogleTTS.onResult = function(t) {
                return e._onResult(t.result, t.plugin, t.type);
            }, this.mGoogleTTS.onError = function(t) {
                return e._onError(t.error, t.plugin, t.type);
            }, this.mGoogleTTS.onClose = function(t) {
                return e._onClose();
            };
            try {
                this.mGetUserMedia && (this.mGoogleASR = new Rt(this.mGoogleConfig, this.mGoogleConnect, this.mAudioContext, this.mGetUserMedia, n), 
                this.mGoogleASR.onStart = function(t) {
                    return e._onStart(t.plugin, t.type);
                }, this.mGoogleASR.onStop = function(t) {
                    return e._onStop(t.plugin, t.type);
                }, this.mGoogleASR.onResult = function(t) {
                    return e._onResult(t.result, t.plugin, t.type);
                }, this.mGoogleASR.onError = function(t) {
                    return e._onError(t.error, t.plugin, t.type);
                }, this.mGoogleASR.onClose = function(t) {
                    return e._onClose();
                });
            } catch (t) {
                this._exception('_initAllObject', t);
            }
        }
        return 0;
    }, o.prototype.init = function(o) {
        if (o && 'boolean' == typeof o.errorOutputFlag && this._setErrorOutput(o.errorOutputFlag), 
        this.mInitFlag) return this._error('init', 'Port ist bereits initialisiert'), 0;
        if (o && 'boolean' == typeof o.googleDynamicCredentialsFlag && o.googleDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0; else if (!this._checkCredentials(o)) return this._error('init', 'kein AppKey als Parameter uebergeben'), 
        -1;
        o && 'boolean' == typeof o.googleServerFlag && o.googleServerFlag && (this.mGoogleServerFlag = !0), 
        this.mAudioContext = m.getAudioContext();
        var n = e.get(h, p);
        return n && (this.mGetUserMedia = n.create()), 0 !== this._initAllObject(o) || 0 !== t.prototype.init.call(this, o) ? -1 : (this.isErrorOutput() && (this.mGoogleNLU ? console.log('GooglePort: NLU ist vorhanden') : console.log('GooglePort: NLU ist nicht vorhanden'), 
        this.mGoogleNLU2 ? console.log('GooglePort: NLU2 ist vorhanden') : console.log('GooglePort: NLU2 ist nicht vorhanden'), 
        this.mGoogleTTS ? console.log('GooglePort: TTS ist vorhanden') : console.log('GooglePort: TTS ist nicht vorhanden'), 
        this.mGoogleASR ? console.log('GooglePort: ASR ist vorhanden') : console.log('GooglePort: ASR ist nicht vorhanden')), 
        0);
    }, o.prototype.done = function() {
        return t.prototype.done.call(this), this._clearActionTimeout(), this.mAudioContext, 
        this.mAudioContext = null, this.mGetUserMedia = null, this.mGoogleConnect && (this.mGoogleConnect.disconnect(), 
        this.mGoogleConnect = null), this.mGoogleWebSocket && (this.mGoogleWebSocket.done(), 
        this.mGoogleWebSocket = null), this.mGoogleNetwork && (this.mGoogleNetwork.done(), 
        this.mGoogleNetwork = null), this.mGoogleConfig && (this.mGoogleConfig.done(), this.mGoogleConfig = null), 
        this.mGoogleTTS = null, this.mGoogleASR = null, this.mGoogleNLU = null, this.mGoogleNLU2 = null, 
        this.mGoogleServerFlag = !1, this.mDynamicCredentialsFlag = !1, this.mTransaction = null, 
        this.mRunningFlag = !1, this.mDefaultOptions = null, this.mActionTimeoutId = 0, 
        this.mActionTimeout = 6e4, 0;
    }, o.prototype.reset = function(e) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, e);
    }, o.prototype._setErrorOutput = function(e) {
        t.prototype._setErrorOutput.call(this, e), this.mGoogleConfig && this.mGoogleConfig._setErrorOutput(e), 
        this.mGoogleNetwork && this.mGoogleNetwork._setErrorOutput(e), this.mGoogleWebSocket && this.mGoogleWebSocket._setErrorOutput(e), 
        this.mGoogleConnect && this.mGoogleConnect._setErrorOutput(e), this.mGoogleTTS && this.mGoogleTTS._setErrorOutput(e), 
        this.mGoogleASR && this.mGoogleASR._setErrorOutput(e), this.mGoogleNLU && this.mGoogleNLU._setErrorOutput(e), 
        this.mGoogleNLU2 && this.mGoogleNLU2._setErrorOutput(e);
    }, o.prototype._breakAction = function() {
        this.mActionTimeoutId = 0, this.mTransaction && (this._error('_breakAction', 'Timeout fuer Action erreicht'), 
        this._onStop(this.mTransaction.plugin, this.mTransaction.type));
    }, o.prototype._setActionTimeout = function() {
        var t = this;
        0 === this.mActionTimeoutId && this.mActionTimeout > 0 && (this.mActionTimeoutId = window.setTimeout((function() {
            return t._breakAction();
        }), this.mActionTimeout));
    }, o.prototype._clearActionTimeout = function() {
        this.mActionTimeoutId > 0 && (clearTimeout(this.mActionTimeoutId), this.mActionTimeoutId = 0);
    }, o.prototype._onOnline = function() {
        return 0;
    }, o.prototype._onOffline = function() {
        return this.close(), 0;
    }, o.prototype._onStop = function(e, o) {
        this._clearActionTimeout(), this.mGoogleConnect && this.mGoogleConnect.disconnect();
        var n = t.prototype._onStop.call(this, e, o);
        return this.mTransaction = null, this.mRunningFlag = !1, n;
    }, o.prototype._unlockAudio = function(t) {
        if (this.mAudioContext) {
            if ('running' === this.mAudioContext.state) return void t(!0);
            if ('suspended' === this.mAudioContext.state || 'interrupted' === this.mAudioContext.state) {
                var e = setTimeout((function() {
                    return t(!1);
                }), 2e3);
                this.mAudioContext.resume().then((function() {
                    clearTimeout(e), t(!0);
                }), (function(o) {
                    console.log('GooglePort._unlockAudio:', o), clearTimeout(e), t(!1);
                }));
            } else t(!1);
        } else t(!1);
    }, o.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this._error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return 'string' == typeof t.googleAppKey && t.googleAppKey && this.mGoogleConfig.appKey !== t.googleAppKey && (this.mGoogleConfig.appKey = t.googleAppKey, 
            this.mGoogleASR.clearToken(), this.mGoogleTTS.clearToken()), 'string' == typeof t.googleServerUrl && t.googleServerUrl && this.mGoogleConfig.serverUrl !== t.googleServerUrl && (this.mGoogleConfig.serverUrl = t.googleServerUrl, 
            this.mGoogleASR.clearToken(), this.mGoogleTTS.clearToken()), 'string' == typeof t.dialogflowTokenServerUrl && t.dialogflowTokenServerUrl && this.mGoogleConfig.dialogflowTokenServerUrl !== t.dialogflowTokenServerUrl && (this.mGoogleConfig.dialogflowTokenServerUrl = t.dialogflowTokenServerUrl, 
            this.mGoogleNLU2.clearToken()), 'string' == typeof t.dialogflowProjectId && t.dialogflowProjectId && this.mGoogleConfig.dialogflowProjectId !== t.dialogflowProjectId && (this.mGoogleConfig.dialogflowProjectId = t.dialogflowProjectId, 
            this.mGoogleNLU2.clearToken()), 'string' == typeof t.dialogflowSessionId && t.dialogflowSessionId && this.mGoogleConfig.dialogflowSessionId !== t.dialogflowSessionId && (this.mGoogleConfig.dialogflowSessionId = t.dialogflowSessionId), 
            'string' == typeof t.dialogflowEnvironmentName && t.dialogflowEnvironmentName && this.mGoogleConfig.dialogflowEnvironmentName !== t.dialogflowEnvironmentName && (this.mGoogleConfig.dialogflowEnvironmentName = t.dialogflowEnvironmentName), 
            0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, o.prototype.getConfig = function() {
        return {
            googleAppKey: this.mGoogleConfig.appKey,
            googleServerUrl: this.mGoogleConfig.serverUrl,
            dialogflowTokenServerUrl: this.mGoogleConfig.dialogflowTokenServerUrl,
            dialogflowProjectId: this.mGoogleConfig.dialogflowProjectId,
            dialogflowSessionId: this.mGoogleConfig.dialogflowSessionId,
            dialogflowEnvironmentName: this.mGoogleConfig.dialogflowEnvironmentName
        };
    }, o.prototype.isOnline = function() {
        return !!this.mGoogleNetwork && this.mGoogleNetwork.isOnline();
    }, o.prototype.isOpen = function() {
        return !this.isServer() || this._isConnect();
    }, o.prototype._checkOpen = function(t) {
        var e = this;
        return this.isServer() ? this.isOnline() ? this.isOpen() ? t(!0) : 'CLOSING' === this.mGoogleWebSocket.getState() ? (this._error('_checkOpen', 'Websocket wird geschlossen'), 
        t(!1), -1) : this.mGoogleWebSocket ? (this.mGoogleWebSocket.onOpen = function(o) {
            return e.mGoogleWebSocket.onOpen = function(t) {
                return e._onOpen();
            }, e.mGoogleWebSocket.onClose = function() {
                return e._onClose();
            }, e.mGoogleWebSocket.onError = function(t) {
                return e._onError(t);
            }, t(!0);
        }, this.mGoogleWebSocket.onClose = function() {
            return e.mGoogleWebSocket.onOpen = function(t) {
                return e._onOpen();
            }, e.mGoogleWebSocket.onClose = function() {
                return e._onClose();
            }, e.mGoogleWebSocket.onError = function(t) {
                return e._onError(t);
            }, t(!1), 0;
        }, this.mGoogleWebSocket.onError = function(o) {
            return e.mGoogleWebSocket.onOpen = function(t) {
                return e._onOpen();
            }, e.mGoogleWebSocket.onClose = function() {
                return e._onClose();
            }, e.mGoogleWebSocket.onError = function(t) {
                return e._onError(t);
            }, t(!1), 0;
        }, this.open()) : (this._error('_checkOpen', 'Websocket ist nicht vorhanden'), t(!1), 
        -1) : (this._error('_checkOpen', 'kein Netz vorhanden'), t(!1), -1) : t(!0);
    }, o.prototype.open = function(t) {
        return this.isServer() ? this._connect(t) : (this._onOpen(), 0);
    }, o.prototype.close = function() {
        return this.isServer() ? this._disconnect() : (this._onClose(), 0);
    }, o.prototype._isConnect = function() {
        return !!this.mGoogleWebSocket && this.mGoogleWebSocket.isConnect();
    }, o.prototype._connect = function(t) {
        if (this._isConnect()) return 0;
        if (!this.mGoogleWebSocket) return this._error('_connect', 'kein GoogleWebSocket vorhanden'), 
        -1;
        try {
            return this.mGoogleWebSocket.connect(this.mGoogleConfig.serverUrl || "ws://localhost:7050"), 
            0;
        } catch (t) {
            return this._exception('_connect', t), -1;
        }
    }, o.prototype._disconnect = function() {
        if (!this._isConnect()) return 0;
        if (!this.mGoogleWebSocket) return this._error('_disconnect', 'kein GoogleWebSocket vorhanden'), 
        -1;
        try {
            return this.mGoogleWebSocket.disconnect(), 0;
        } catch (t) {
            return this._exception('_disconnect', t), -1;
        }
    }, o.prototype.getPluginName = function() {
        return this.mTransaction ? this.mTransaction.plugin : '';
    }, o.prototype.getActionName = function() {
        return this.mTransaction ? this.mTransaction.type : '';
    }, o.prototype.isRunning = function(t, e) {
        if (!t && !e) return this.mRunningFlag;
        if (t === this.getPluginName()) {
            if (!e) return this.mRunningFlag;
            if (e === this.getActionName()) return this.mRunningFlag;
        }
        return !1;
    }, o.prototype.isAction = function(t) {
        var e = !1;
        switch (t) {
          case "NLU":
            e = !!(this.mGoogleNLU && this.mGoogleNLU2 && this.mGoogleNLU2.isInit());
            break;

          case "ASRNLU":
            e = !(!this.mGoogleNLU2 || !this.mGoogleNLU2.isInit());
            break;

          case "ASR":
            e = !(!this.mGoogleASR || !this.mGoogleASR.isInit());
            break;

          case "TTS":
            e = !(!this.mGoogleTTS || !this.mGoogleTTS.isInit());
        }
        return e;
    }, o.prototype.setActionTimeout = function(t) {
        this.mActionTimeout = t;
    }, o.prototype.start = function(t, e, o) {
        var n = this;
        return this.isRunning() ? (this._error('start', 'Aktion laeuft bereits'), -1) : this.mGoogleConfig.isCredentials() ? this.mTransaction ? (this._error('start', 'andere Transaktion laeuft noch'), 
        -1) : this._checkOpen((function(i) {
            if (!i) return -1;
            n._setActionTimeout();
            var s = o || {};
            n.mPluginName = t, n.mRunningFlag = !0;
            var a = 0;
            switch (e) {
              case "NLU":
                n.mTransaction = new r(t, "NLU"), a = n._startNLU(n.mTransaction, s.text, s.language || "de-DE");
                break;

              case "ASRNLU":
                n.mTransaction = new r(t, "ASRNLU"), a = n._startASRNLU(n.mTransaction, s.language || "de-DE");
                break;

              case "ASR":
                n.mTransaction = new r(t, "ASR"), a = n._startASR(n.mTransaction, s.language || "de-DE", s.audioURL || '', !1, s.useProgressive || !1);
                break;

              case "TTS":
                n.mTransaction = new r(t, "TTS"), a = n._startTTS(n.mTransaction, s.text, s.language || "de-DE", s.voice || "Petra-ML");
                break;

              default:
                n._clearActionTimeout(), n._error('start', 'Keine gueltige Aktion uebergeben ' + e), 
                a = -1;
            }
            return 0 !== a && (n._clearActionTimeout(), n.mTransaction = null, n.mRunningFlag = !1), 
            a;
        })) : (this._error('start', 'Port hat keine Credentials'), -1);
    }, o.prototype.stop = function(t, e, o) {
        if (!this.isRunning()) return 0;
        if (!this.isOpen()) return this._error('stop', 'Port ist nicht geoeffnet'), -1;
        if (!this.mGoogleConfig.isCredentials()) return this._error('stop', 'Port hat keine Credentials'), 
        -1;
        if (!this.mTransaction) return this._error('stop', 'keine Transaktion vorhanden'), 
        -1;
        if (t !== this.mTransaction.plugin) return this._error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + t + ' != ' + this.mTransaction.plugin), 
        -1;
        if (e) {
            if (e !== this.mTransaction.type) return this._error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + e + ' != ' + this.mTransaction.type), 
            -1;
        } else e = this.mTransaction.type;
        var n = 0;
        switch (e) {
          case "NLU":
          case "ASRNLU":
            n = this._stopNLU(this.mTransaction);
            break;

          case "ASR":
            n = this._stopASR(this.mTransaction);
            break;

          case "TTS":
            n = this._stopTTS(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + e), n = -1;
        }
        return n;
    }, o.prototype._initRecognition = function(t) {
        var e = this;
        return this.mDefaultOptions = {
            onopen: function() {},
            onclose: function() {
                e._onClose();
            },
            onerror: function(t) {
                e._onError(t);
            }
        }, 0;
    }, o.prototype._startNLU = function(t, e, o) {
        if (!e) return this._error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!o) return this._error('_startNLU', 'keine Sprache uebergeben'), -1;
        if (!this.mGoogleNLU || !this.mGoogleNLU2) return this._error('_startNLU', 'keine Google NLU-Anbindung vorhanden'), 
        -1;
        try {
            var n = {
                text: e,
                language: o
            };
            return this.mGoogleNLU2Flag ? this.mGoogleNLU2.start(t, n) : this.mGoogleNLU.start(t, n);
        } catch (t) {
            return this._exception('_startNLU', t), -1;
        }
        return -1;
    }, o.prototype._startASRNLU = function(t, e) {
        if (!e) return this._error('_startASRNLU', 'keine Sprache uebergeben'), -1;
        if (!this.mGoogleNLU || !this.mGoogleNLU2) return this._error('_startASRNLU', 'keine Google NLU-Anbindung vorhanden'), 
        -1;
        try {
            var o = {
                text: '',
                language: e
            };
            return this.mGoogleNLU2Flag ? this.mGoogleNLU2.start(t, o) : -1;
        } catch (t) {
            return this._exception('_startASRNLU', t), -1;
        }
        return -1;
    }, o.prototype._stopNLU = function(t) {
        if (!this.mGoogleNLU || !this.mGoogleNLU2) return this._error('_stopNLU', 'keine Google NLU-Anbindung vorhanden'), 
        -1;
        try {
            return this.mGoogleNLU2Flag ? this.mGoogleNLU2.stop(t) : this.mGoogleNLU.stop(t);
        } catch (t) {
            return this._exception('_stopNLU', t), -1;
        }
        return -1;
    }, o.prototype._startASR = function(t, e, o, n, r) {
        if (void 0 === n && (n = !1), void 0 === r && (r = !1), !e) return this._error('_startASR', 'keine Sprache uebergeben'), 
        -1;
        if (!this.mGoogleASR) return this._error('_startASR', 'keine Google ASR-Anbindung vorhanden'), 
        -1;
        try {
            var i = {
                language: e,
                nlu: n,
                progressive: r
            };
            return o && (i.audioURL = o), this.mGoogleASR.start(t, i);
        } catch (t) {
            return this._exception('_startASR', t), -1;
        }
    }, o.prototype._stopASR = function(t) {
        if (!this.mGoogleASR) return this._error('_stopASR', 'keine Google ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this.mGoogleASR.stop(t);
        } catch (t) {
            return this._exception('_stopASR', t), -1;
        }
    }, o.prototype._startTTS = function(t, e, o, n) {
        var r = this;
        if (!e) return this._error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.mGoogleTTS) return this._error('_startTTS', 'keine Google TTS-Anbindung vorhanden'), 
        -1;
        try {
            var i = {
                text: e,
                language: o,
                voice: n
            };
            return this._unlockAudio((function(e) {
                e ? r.mGoogleTTS.start(t, i) : (r._error('_startTTS', 'AudioContext ist nicht entsperrt'), 
                r._onStop(t.plugin, t.type));
            })), 0;
        } catch (t) {
            return this._exception('_startTTS', t), -1;
        }
    }, o.prototype._stopTTS = function(t) {
        if (!this.mGoogleTTS) return this._error('_stopTTS', 'keine Google TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this.mGoogleTTS.stop(t);
        } catch (t) {
            return this._exception('_stopTTS', t), -1;
        }
    }, o;
}(i), Nt = function(t) {
    function e() {
        return t.call(this, 'GoogleFactory') || this;
    }
    return it(e, t), e.prototype.getType = function() {
        return "Google";
    }, e.prototype.getName = function() {
        return "GoogleFactory";
    }, e.prototype._newPort = function(t, e) {
        var o = null;
        switch (t) {
          case "GooglePort":
          case "GooglePort":
            o = new bt(t, e);
            break;

          case "GoogleMock":
            o = new lt("GoogleMock", e);
            break;

          default:
            this._error('_newPort', 'kein Port vorhanden');
        }
        return o;
    }, e.prototype.create = function(t, e) {
        void 0 === e && (e = !0);
        var o = t || "GooglePort";
        try {
            return this._newPort(o, e);
        } catch (t) {
            return this._exception('create', t), null;
        }
    }, e;
}(n), Ot = function() {
    function t() {}
    return t.setErrorOutputOn = function() {
        t.mErrorOutputFlag = !0, o.setErrorOutputOn();
    }, t.setErrorOutputOff = function() {
        t.mErrorOutputFlag = !1, o.setErrorOutputOff();
    }, t.setErrorOutputFunc = function(t) {
        o._setErrorOutputFunc(t);
    }, t._initGooglePort = function(e) {
        var n = o.get("Google", bt);
        return n ? 0 !== n.init(e) ? (o.remove("Google"), -1) : (t.mCurrentPort = n, 0) : -1;
    }, t._initGoogleMock = function(e) {
        var n = o.get("Google", lt);
        return n ? 0 !== n.init(e) ? (console.log('Google._initGoogleMock: Error GoogleMock wurde nicht initialisiert'), 
        o.remove("Google"), -1) : (t.mCurrentPort = n, 0) : (console.log('Google._initGoogleMock: Error GoogleMock wurde nicht erzeugt'), 
        -1);
    }, t.init = function(e) {
        if (t.mInitFlag) return 0;
        if (!e) return t.mErrorOutputFlag && console.log('Google.init: Keine Google-Parameter uebergeben'), 
        -1;
        'boolean' == typeof e.errorOutputFlag && (e.errorOutputFlag ? t.setErrorOutputOn() : t.setErrorOutputOff());
        var o = 'GooglePort';
        if (e && 'string' == typeof e.googlePortName && 'GoogleMock' === e.googlePortName && (o = 'GoogleMock'), 
        'GooglePort' === o) {
            if (0 !== t._initGooglePort(e)) return -1;
        } else {
            if ('GoogleMock' !== o) return t.mErrorOutputFlag && console.log('Google.init: Kein Google PortName vorhanden'), 
            -1;
            if (0 !== t._initGoogleMock(e)) return -1;
        }
        return t.mInitFlag = !0, 0;
    }, t.isInit = function() {
        return t.mInitFlag;
    }, t.done = function() {
        var e = o.find("Google");
        e || (e = t.mCurrentPort);
        var n = 0;
        return e && (n = e.done(), o.remove("Google")), t.mCurrentPort = null, t.mInitFlag = !1, 
        n;
    }, t._onOpenEvent = function(e, o, n, r) {
        if ('function' == typeof r) try {
            return r(e, o, n), 0;
        } catch (e) {
            return t.mErrorOutputFlag && console.log('Google._onOpenEvent: Exception', e.message), 
            -1;
        }
        return 0;
    }, t._openGooglePort = function(e) {
        var n = o.find("Google");
        return n || (n = t.mCurrentPort), n ? (n.addOpenEvent("Google", (function(o) {
            return n.removeErrorEvent("Google"), n.removeOpenEvent("Google"), 'function' == typeof e && t._onOpenEvent(null, "Google", o.result, e), 
            o.result;
        })), n.addErrorEvent("Google", (function(o) {
            return n.removeOpenEvent("Google"), n.removeErrorEvent("Google"), 'function' == typeof e && t._onOpenEvent(o, "Google", -1, e), 
            0;
        })), n.open()) : (t.mErrorOutputFlag && console.log('Google._openGooglePort: kein Port vorhanden'), 
        t._onOpenEvent(new Error('Google._openGooglePort: Kein Port vorhanden'), "Google", -1, e), 
        -1);
    }, t.open = function(e) {
        return t.mInitFlag ? t._openGooglePort(e) : (t.mErrorOutputFlag && console.log('Google.open: Init wurde nicht aufgerufen'), 
        t._onOpenEvent(new Error('Google.open: Init wurde nicht aufgerufen'), "Google", -1, e), 
        -1);
    }, t.setConfig = function(e) {
        return t.mCurrentPort ? t.mCurrentPort.setConfig(e) : -1;
    }, t.getConfig = function() {
        return t.mCurrentPort ? t.mCurrentPort.getConfig() : {
            googleAppKey: '',
            googleServerUrl: '',
            dialogflowTokenServerUrl: '',
            dialogflowProjectId: '',
            dialogflowSessionId: '',
            dialogflowEnvironmentName: ''
        };
    }, t.mInitFlag = !1, t.mErrorOutputFlag = !1, t.mCurrentPort = null, t;
}();

export { v as GOOGLE_API_VERSION, O as GOOGLE_ASRNLU_ACTION, N as GOOGLE_ASR_ACTION, V as GOOGLE_ASR_LANGUAGE, K as GOOGLE_ASR_LANGUAGE1, W as GOOGLE_ASR_LANGUAGE2, ot as GOOGLE_AUDIOBUFFER_SIZE, nt as GOOGLE_AUDIOSAMPLE_RATE, $ as GOOGLE_AUDIOTTS_ID, F as GOOGLE_CONFIG_FILE, P as GOOGLE_CONFIG_LOAD, L as GOOGLE_CONFIG_PATH, et as GOOGLE_DEFAULT_CODEC, x as GOOGLE_DEFAULT_LANGUAGE, w as GOOGLE_DEFAULT_NAME, U as GOOGLE_DEFAULT_URL, Q as GOOGLE_DEFAULT_VOICE, D as GOOGLE_DE_LANGUAGE, M as GOOGLE_EN_LANGUAGE, G as GOOGLE_FACTORY_NAME, E as GOOGLE_MOCK_NAME, j as GOOGLE_NLU2_FLAG, b as GOOGLE_NLU_ACTION, tt as GOOGLE_PCM_CODEC, k as GOOGLE_PORT_NAME, R as GOOGLE_SERVER_URL, y as GOOGLE_SERVER_VERSION, I as GOOGLE_TTS_ACTION, z as GOOGLE_TTS_LANGUAGE, B as GOOGLE_TTS_LANGUAGE1, H as GOOGLE_TTS_LANGUAGE2, Y as GOOGLE_TTS_VOICE, q as GOOGLE_TTS_VOICE1, J as GOOGLE_TTS_VOICE2, X as GOOGLE_TTS_VOICE3, Z as GOOGLE_TTS_VOICE4, C as GOOGLE_TYPE_NAME, d as GOOGLE_VERSION_BUILD, T as GOOGLE_VERSION_DATE, f as GOOGLE_VERSION_NUMBER, S as GOOGLE_VERSION_STRING, _ as GOOGLE_VERSION_TYPE, A as GOOGLE_WORKER_VERSION, Ot as Google, Nt as GoogleFactory };
