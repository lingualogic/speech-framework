/**
 * Speech-Amazon
 * 
 * Version: 0.1.1
 * Build:   0002
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

import { PortManager as o } from '../../core/port/port-manager.ts';

import { PortFactory as e } from '../../core/port/port-factory.ts';

import { PortTransaction as r } from '../../core/port/port-transaction.ts';

import { Port as i } from '../../core/port/port.ts';

import '../../common/audio/audio-codec.ts';

import { AudioPlayer as a } from '../../common/audio/audio-player.ts';

import '../../common/audio/audio-recorder.ts';

import '../../common/audio/audio-resampler.ts';

import { FileHtml5Reader as s } from '../../common/html5/file-html5-reader.ts';

import { AudioHtml5Reader as u } from '../../common/html5/audio-html5-reader.ts';

import { NetHtml5Connect as m } from '../../common/html5/net-html5-connect.ts';

import '../../common/html5/net-html5-websocket.ts';

import '../../common/html5/audiocontext-factory.ts';

import '../../common/html5/speechrecognition-factory.ts';

import '../../common/html5/speechsynthesis-factory.ts';

import '../../common/html5/websocket-factory.ts';

import '../../common/html5/webworker-factory.ts';

import { USERMEDIA_FACTORY_NAME as c, UserMediaFactory as l } from '../../common/html5/usermedia-factory.ts';

import '../../common/html5/xmlhttprequest-factory.ts';

import { AudioContextManager as h } from '../../common/html5/audiocontext-manager.ts';

var p = '0.1.1', f = '0002', g = 'ALPHA', d = '30.05.2020', A = "0.1.1.0002 vom 30.05.2020 (ALPHA)", y = "0.1.1.0002 vom 30.05.2020 (ALPHA)", _ = "0.1.1.0002 vom 30.05.2020 (ALPHA)", T = "0.1.1.0002 vom 30.05.2020 (ALPHA)", z = 'Amazon', C = 'AmazonFactory', S = 'AmazonPort', R = 'AmazonMock', k = "AmazonPort", P = '', I = "", v = 'NLU', F = 'ASR', b = 'ASRNLU', O = 'TTS', E = 'assets/', N = 'amazon.json', w = !1, U = 'de-DE', x = 'en-US', L = "de-DE", D = 'deu-DEU', M = 'eng-USA', j = "deu-DEU", G = 'de-DE', K = 'en-US', W = "de-DE", V = 'Vicki', H = 'Markus', q = 'Anna-ML', Y = 'Petra-ML', J = "Vicki", X = "Vicki", B = 789, Q = 'audio/L16;rate=16000', Z = "audio/L16;rate=16000", $ = 2048, tt = 16e3, nt = 'pcm', ot = function(t, n) {
    return (ot = Object.setPrototypeOf || {
        __proto__: []
    } instanceof Array && function(t, n) {
        t.__proto__ = n;
    } || function(t, n) {
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    })(t, n);
};

function et(t, n) {
    if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
    function o() {
        this.constructor = t;
    }
    ot(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, 
    new o);
}

var rt = function(t) {
    function n(n, o) {
        void 0 === o && (o = !0);
        var e = t.call(this, n || "AmazonMock", o) || this;
        return e.audioContextFlag = !0, e.getUserMediaFlag = !0, e.amazonNLUFlag = !0, e.amazonASRFlag = !0, 
        e.amazonTTSFlag = !0, e.disconnectFlag = !0, e.defaultOptions = null, e.codec = '', 
        e.intentName = 'TestIntent', e.intentConfidence = 1, e.mDynamicCredentialsFlag = !1, 
        e.mTransaction = null, e.mRunningFlag = !1, e.amazonRegion = '', e.amazonIdentityPoolId = '', 
        e.amazonNluTag = '', e;
    }
    return et(n, t), n.prototype.isMock = function() {
        return !0;
    }, n.prototype.getType = function() {
        return "Amazon";
    }, n.prototype.getClass = function() {
        return 'AmazonMock';
    }, n.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.amazonRegion && (this.amazonRegion = t.amazonRegion), 
        'string' == typeof t.amazonIdentityPoolId && (this.amazonIdentityPoolId = t.amazonIdentityPoolId), 
        'string' == typeof t.amazonNluTag && (this.amazonNluTag = t.amazonNluTag), 'string' == typeof t.amazonRegion && (!!t.amazonRegion && ('string' == typeof t.amazonIdentityPoolId && !!t.amazonIdentityPoolId)));
    }, n.prototype.init = function(n) {
        if (n && 'boolean' == typeof n.errorOutputFlag && this._setErrorOutput(n.errorOutputFlag), 
        this.mInitFlag) return this._error('init', 'Init bereits aufgerufen'), 0;
        if (n && 'boolean' == typeof n.amazonDynamicCredentialsFlag && n.amazonDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0, 
        this._checkCredentials(n); else if (!this._checkCredentials(n)) return (this.isErrorOutput() || n && n.errorOutputFlag) && this._error('init', 'keine AppId und/oder AppKey als Parameter uebergeben'), 
        -1;
        return this.audioContextFlag || (this._error('init', 'kein Audiokontext vorhanden, TTS und ASR werden abgeschaltet'), 
        this._onInit(-1)), this.amazonNLUFlag = !0, this.audioContextFlag && (this.amazonASRFlag = !0, 
        this.getUserMediaFlag && (this.amazonTTSFlag = !0)), this.isErrorOutput() && (this.amazonNLUFlag ? console.log('AmazonMock: NLU ist vorhanden') : console.log('AmazonMock: NLU ist nicht vorhanden'), 
        this.amazonTTSFlag ? console.log('AmazonMock: TTS ist vorhanden') : console.log('AmazonMock: TTS ist nicht vorhanden'), 
        this.amazonASRFlag ? console.log('AmazonMock: ASR ist vorhanden') : console.log('AmazonMock: ASR ist nicht vorhanden')), 
        this._onInit(0), t.prototype.init.call(this, n);
    }, n.prototype.done = function(n) {
        return t.prototype.done.call(this), this.audioContextFlag = !0, this.getUserMediaFlag = !0, 
        this.amazonNLUFlag = !1, this.amazonASRFlag = !1, this.amazonTTSFlag = !1, this.disconnectFlag = !0, 
        this.defaultOptions = null, this.codec = '', this.mTransaction = null, this.mRunningFlag = !1, 
        0;
    }, n.prototype.reset = function(n) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, n);
    }, n.prototype._onStop = function(n, o) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype._onStop.call(this, n, o);
    }, n.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this._error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return this.amazonRegion = t.amazonRegion, this.amazonIdentityPoolId = t.amazonIdentityPoolId, 
            0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, n.prototype.getConfig = function() {
        return {
            amazonRegion: this.amazonRegion,
            amazonIdentityPoolId: this.amazonIdentityPoolId
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
        return !(!this.amazonRegion || !this.amazonIdentityPoolId);
    }, n.prototype.isAction = function(t) {
        var n = !1;
        switch (t) {
          case "NLU":
            n = this.amazonNLUFlag;
            break;

          case "ASR":
            n = this.amazonASRFlag;
            break;

          case "TTS":
            n = this.amazonTTSFlag;
        }
        return n;
    }, n.prototype.start = function(t, n, o) {
        if (this.isRunning()) return this._error('start', 'Aktion laeuft bereits'), -1;
        if (!this.isOpen()) return this._error('start', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this._error('start', 'Port hat keine Credentials'), 
        -1;
        if (this.mTransaction) return this._error('start', 'andere Transaktion laeuft noch'), 
        -1;
        var e = o || {};
        this.mRunningFlag = !0;
        var i = 0;
        switch (n) {
          case "NLU":
            this.mTransaction = new r(t, "NLU"), i = this._startNLU(this.mTransaction, e.text, e.language || "de-DE");
            break;

          case "ASRNLU":
            this.mTransaction = new r(t, "ASRNLU"), i = this._startASR(this.mTransaction, e.language || "de-DE", e.audioURL || '', !0, e.useProgressive || !1);
            break;

          case "ASR":
            this.mTransaction = new r(t, "ASR"), i = this._startASR(this.mTransaction, e.language || "de-DE", e.audioURL || '', !1, e.useProgressive || !1);
            break;

          case "TTS":
            this.mTransaction = new r(t, "TTS"), i = this._startTTS(this.mTransaction, e.text, e.language || "de-DE", e.voice || "Vicki");
            break;

          default:
            this._error('start', 'Keine gueltige Aktion uebergeben ' + n), i = -1;
        }
        return i;
    }, n.prototype.stop = function(t, n, o) {
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
        var e = 0;
        switch (n) {
          case "NLU":
            e = this._stopNLU(this.mTransaction);
            break;

          case "ASRNLU":
          case "ASR":
            e = this._stopASR(this.mTransaction);
            break;

          case "TTS":
            e = this._stopTTS(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + n), e = -1;
        }
        return this.mTransaction = null, this.mRunningFlag = !1, e;
    }, n.prototype._startNLU = function(t, n, o) {
        if (!n) return this._error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!this.amazonNLUFlag) return this._error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden'), 
        -1;
        try {
            this._onStart(t.plugin, t.type);
            var e = [ {
                action: {
                    intent: {
                        value: this.intentName,
                        confidence: this.intentConfidence
                    }
                },
                literal: n
            } ];
            return t.result = e, this._onResult(t.result, t.plugin, t.type), this._onStop(t.plugin, t.type), 
            0;
        } catch (t) {
            return this._exception('_startNLU', t), -1;
        }
    }, n.prototype._stopNLU = function(t) {
        return this._onStop(t.plugin, t.type), 0;
    }, n.prototype._startASR = function(t, n, o, e, r) {
        if (!this.amazonASRFlag) return this._error('_startASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), t.result = "Testtext", this._onResult(t.result, t.plugin, t.type), 
            this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_startASR', t), -1;
        }
    }, n.prototype._stopASR = function(t) {
        if (!this.amazonASRFlag) return this._error('_stopASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_stopASR', t), -1;
        }
    }, n.prototype._startTTS = function(t, n, o, e) {
        var r = this;
        if (!n) return this._error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.amazonTTSFlag) return this._error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), setTimeout((function() {
                return r._onStop(t.plugin, t.type);
            }), 100), 0;
        } catch (t) {
            return this._exception('_startTTS', t), -1;
        }
    }, n.prototype._stopTTS = function(t) {
        if (!this.amazonTTSFlag) return this._error('_stopTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_stopTTS', t), -1;
        }
    }, n;
}(i), it = function(t) {
    function n(n) {
        var o = t.call(this, 'AmazonConfig') || this;
        return o.mInitFlag = !1, o.mConfigPath = "assets/", o.mConfigFile = "amazon.json", 
        o.mConfigLoadFlag = false, o.mConfigServerUrl = "", o.mConfigRegion = '', o.mConfigIdentityPoolId = '', 
        o.mConfigUserId = '', o.mConfigNluTag = '', o.mFileReader = null, o.mOnInitFunc = null, 
        o.mOnErrorFunc = null, o.mFileReader = n, o._setErrorOutputFunc((function(t) {
            return o._onError(new Error(t));
        })), o;
    }
    return et(n, t), n.prototype._setOption = function(t) {
        t && ('string' == typeof t.amazonConfigPath && (this.mConfigPath = t.amazonConfigPath), 
        'string' == typeof t.amazonConfigFile && (this.mConfigFile = t.amazonConfigFile), 
        'boolean' == typeof t.amazonConfigLoadFlag && (this.mConfigLoadFlag = t.amazonConfigLoadFlag), 
        'string' == typeof t.amazonServerUrl && (this.mConfigServerUrl = t.amazonServerUrl), 
        'string' == typeof t.amazonRegion && (this.mConfigRegion = t.amazonRegion), 'string' == typeof t.amazonIdentityPoolId && (this.mConfigIdentityPoolId = t.amazonIdentityPoolId), 
        'string' == typeof t.amazonUserId && (this.mConfigUserId = t.amazonUserId), 'string' == typeof t.amazonNluTag && (this.mConfigNluTag = t.amazonNluTag));
    }, n.prototype.init = function(t) {
        return this._setOption(t), this.mInitFlag = !0, 0;
    }, n.prototype.done = function() {
        return this.mInitFlag = !1, this.mConfigPath = "assets/", this.mConfigFile = "amazon.json", 
        this.mConfigLoadFlag = false, this.mConfigServerUrl = "", this.mConfigRegion = '', 
        this.mConfigIdentityPoolId = '', this.mConfigUserId = '', this.mConfigNluTag = '', 
        this.mFileReader = null, this.mOnInitFunc = null, 0;
    }, n.prototype.isInit = function() {
        return this.mInitFlag;
    }, n.prototype._onInit = function(t) {
        0 === t && (this.mInitFlag = !0), 'function' == typeof this.mOnInitFunc && this.mOnInitFunc(t);
    }, n.prototype._onError = function(t) {
        if ('function' == typeof this.mOnErrorFunc) try {
            return this.mOnErrorFunc(t), 0;
        } catch (t) {
            return this.isErrorOutput() && console.log('===> EXCEPTION AmazonConfig._onError: ', t.message), 
            -1;
        }
        return 0;
    }, Object.defineProperty(n.prototype, "onInit", {
        set: function(t) {
            this.mOnInitFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(n.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
        },
        enumerable: !1,
        configurable: !0
    }), n.prototype._readConfigData = function(t) {
        if (!t) return this._error('_readConfigData', 'keine Daten uebergeben'), -1;
        try {
            var n = JSON.parse(t);
            return n.URL && (this.serverUrl = n.URL), n.REGION && (this.region = n.REGION), 
            n.IDENTITY_POOL_ID && (this.identityPoolId = n.IDENTITY_POOL_ID), n.USER_ID && (this.userId = n.USER_ID), 
            n.NLU_TAG && (this.nluTag = n.NLU_TAG), this._onInit(0), 0;
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
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(n.prototype, "region", {
        get: function() {
            return this.mConfigRegion;
        },
        set: function(t) {
            this.mConfigRegion = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(n.prototype, "identityPoolId", {
        get: function() {
            return this.mConfigIdentityPoolId;
        },
        set: function(t) {
            this.mConfigIdentityPoolId = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(n.prototype, "userId", {
        get: function() {
            return this.mConfigUserId;
        },
        set: function(t) {
            this.mConfigUserId = t;
        },
        enumerable: !1,
        configurable: !0
    }), Object.defineProperty(n.prototype, "nluTag", {
        get: function() {
            return this.mConfigNluTag;
        },
        set: function(t) {
            this.mConfigNluTag = t;
        },
        enumerable: !1,
        configurable: !0
    }), n.prototype.isCredentials = function() {
        return !(!this.mConfigIdentityPoolId || !this.mConfigRegion);
    }, n;
}(t), at = function(t) {
    function n() {
        return t.call(this, 'AmazonNetwork') || this;
    }
    return et(n, t), n;
}(m), st = function(t) {
    function n(n) {
        var o = t.call(this, 'AmazonConnect') || this;
        return o.mConfig = null, o.mConnectFlag = !1, o.mConfig = n, o;
    }
    return et(n, t), n.prototype.isConnect = function() {
        return this.mConnectFlag;
    }, n.prototype.connect = function() {
        if (this.isConnect()) return 0;
        try {
            return this.mConfig.region && (window.AWS.config.region = this.mConfig.region), 
            this.mConfig.identityPoolId && (window.AWS.config.credentials = new window.AWS.CognitoIdentityCredentials({
                IdentityPoolId: this.mConfig.identityPoolId
            }), !window.AWS.config.credentials) ? (this._error('connect', 'keine Amazon-Credentials erzeugt'), 
            -1) : (this.mConnectFlag = !0, 0);
        } catch (t) {
            return this._exception('connect', t), -1;
        }
    }, n.prototype.disconnect = function() {
        this.mConnectFlag = !1;
        try {
            window.AWS.config.region = '', window.AWS.config.credentials = null;
        } catch (t) {
            return this._exception('disconnect', t), -1;
        }
        return 0;
    }, n;
}(t), ut = function(t) {
    function n(n, o, e) {
        var r = t.call(this, n || 'AmazonDevice') || this;
        return r.mConfig = null, r.mConnect = null, r.mTransaction = null, r.onStart = null, 
        r.onStop = null, r.onResult = null, r.onError = null, r.onClose = null, r.mConfig = o, 
        r.mConnect = e, r;
    }
    return et(n, t), n.prototype._onStart = function() {
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
}(t), mt = function(t) {
    function n(n, o, e, r, i) {
        var a = t.call(this, 'AmazonASR', n, o) || this;
        return a.mAudioContext = null, a.mGetUserMedia = null, a.mAudioReader = null, a.mAudioRecorder = null, 
        a.mUserMediaStream = null, a.mRequestId = 0, a.mVolumeCounter = 0, a.mTimeoutCounter = 0, 
        a.mRecordingFlag = !1, a.mAudioContext = e, a.mGetUserMedia = r, a.mAudioReader = i, 
        a;
    }
    return et(n, t), n.prototype._startAudio = function(t) {}, n.prototype._startASR = function(t) {}, 
    n.prototype._start = function(t) {
        return this._error('_start', 'ASR ist nicht implementiert'), -1;
    }, n.prototype._stop = function() {
        return this._error('_stop', 'ASR ist nicht implementiert'), -1;
    }, n;
}(ut), ct = function(t) {
    function n(n, o, e) {
        var r = t.call(this, 'AmazonTTS', n, o) || this;
        return r.mAudioContext = null, r.mAudioPlayer = null, r.mAudioContext = e, r;
    }
    return et(n, t), n.prototype._start = function(t) {
        var n = this;
        if (!t || !t.text || 'string' != typeof t.text) return this._error('_start', 'kein Text uebergeben'), 
        -1;
        try {
            if (this.mAudioPlayer = new a(this.mAudioContext), !this.mAudioPlayer) return this._error('_start', 'AudioPlayer wurde nicht erzeugt'), 
            -1;
            this.mAudioPlayer.onAudioStart = function() {
                n._onStart();
            }, this.mAudioPlayer.onAudioStop = function() {
                n._onStop();
            };
            var o = new window.AWS.Polly({
                apiVersion: '2016-06-10'
            }), e = {
                LanguageCode: t.language || 'de-DE',
                OutputFormat: "pcm",
                SampleRate: "16000",
                Text: t.text || '',
                TextType: 'text',
                VoiceId: t.voice || 'Vicki'
            };
            return o.synthesizeSpeech(e, (function(t, o) {
                t ? (n._onError(t), n._onStop()) : o && n.mAudioPlayer.decode({
                    codec: "audio/L16;rate=16000"
                }, o.AudioStream);
            })), this.mAudioPlayer.start(), 0;
        } catch (t) {
            return this._exception('_start', t), -1;
        }
    }, n.prototype._stop = function() {
        return this.mAudioPlayer && (this.mAudioPlayer.stop(), this.mAudioPlayer = null), 
        0;
    }, n;
}(ut), lt = function(t) {
    function o(n, o) {
        void 0 === o && (o = !0);
        var e = t.call(this, n || "AmazonPort", o) || this;
        return e.mAudioContext = null, e.mGetUserMedia = null, e.mAmazonConfig = null, e.mAmazonNetwork = null, 
        e.mAmazonConnect = null, e.mAmazonTTS = null, e.mAmazonASR = null, e.mDynamicCredentialsFlag = !1, 
        e.mTransaction = null, e.mRunningFlag = !1, e.mDefaultOptions = null, e.mActionTimeoutId = 0, 
        e.mActionTimeout = 6e4, e;
    }
    return et(o, t), o.prototype.isMock = function() {
        return !1;
    }, o.prototype.getType = function() {
        return "Amazon";
    }, o.prototype.getClass = function() {
        return 'AmazonPort';
    }, o.prototype.getVersion = function() {
        return "0.1.1.0002 vom 30.05.2020 (ALPHA)";
    }, o.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.amazonRegion && (!!t.amazonRegion && ('string' == typeof t.amazonIdentityPoolId && !!t.amazonIdentityPoolId)));
    }, o.prototype._initAllObject = function(t) {
        var n = this, o = new s;
        o.init();
        var e = new u;
        if (e.init({
            audioContext: this.mAudioContext
        }), this.mAmazonConfig = new it(o), 0 !== this.mAmazonConfig.init(t)) return -1;
        if (this.mAmazonNetwork = new at, this.mAmazonNetwork.onOnline = function() {
            return n._onOnline();
        }, this.mAmazonNetwork.onOffline = function() {
            return n._onOffline();
        }, this.mAmazonNetwork.onError = function(t) {
            return n._onError(t);
        }, 0 !== this.mAmazonNetwork.init(t)) return -1;
        if (this.mAmazonConnect = new st(this.mAmazonConfig), this.mAmazonConnect._setErrorOutputFunc((function(t) {
            return n._onError(new Error(t));
        })), this.mAudioContext) {
            this.mAmazonTTS = new ct(this.mAmazonConfig, this.mAmazonConnect, this.mAudioContext), 
            this.mAmazonTTS.onStart = function(t) {
                return n._onStart(t.plugin, t.type);
            }, this.mAmazonTTS.onStop = function(t) {
                return n._onStop(t.plugin, t.type);
            }, this.mAmazonTTS.onResult = function(t) {
                return n._onResult(t.result, t.plugin, t.type);
            }, this.mAmazonTTS.onError = function(t) {
                return n._onError(t.error, t.plugin, t.type);
            }, this.mAmazonTTS.onClose = function(t) {
                return n._onClose();
            };
            try {
                this.mGetUserMedia && (this.mAmazonASR = new mt(this.mAmazonConfig, this.mAmazonConnect, this.mAudioContext, this.mGetUserMedia, e), 
                this.mAmazonASR.onStart = function(t) {
                    return n._onStart(t.plugin, t.type);
                }, this.mAmazonASR.onStop = function(t) {
                    return n._onStop(t.plugin, t.type);
                }, this.mAmazonASR.onResult = function(t) {
                    return n._onResult(t.result, t.plugin, t.type);
                }, this.mAmazonASR.onError = function(t) {
                    return n._onError(t.error, t.plugin, t.type);
                }, this.mAmazonASR.onClose = function(t) {
                    return n._onClose();
                });
            } catch (t) {
                this._exception('_initAllObject', t);
            }
        }
        return 0;
    }, o.prototype.init = function(o) {
        if (o && 'boolean' == typeof o.errorOutputFlag && this._setErrorOutput(o.errorOutputFlag), 
        this.mInitFlag) return this._error('init', 'Port ist bereits initialisiert'), 0;
        if (!window.AWS) return this._error('init', 'AWS-SDK ist nicht vorhanden'), -1;
        if (o && 'boolean' == typeof o.amazonDynamicCredentialsFlag && o.amazonDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0; else if (!this._checkCredentials(o)) return this._error('init', 'keine Region und/oder IdentityPoolId als Parameter uebergeben'), 
        -1;
        this.mAudioContext = h.getAudioContext();
        var e = n.get(c, l);
        return e && (this.mGetUserMedia = e.create()), 0 !== this._initAllObject(o) || 0 !== t.prototype.init.call(this, o) ? -1 : (this.isErrorOutput() && (this.mAmazonTTS ? console.log('AmazonPort: TTS ist vorhanden') : console.log('AmazonPort: TTS ist nicht vorhanden'), 
        this.mAmazonASR ? console.log('AmazonPort: ASR ist vorhanden') : console.log('AmazonPort: ASR ist nicht vorhanden')), 
        0);
    }, o.prototype.done = function() {
        return t.prototype.done.call(this), this._clearActionTimeout(), this.mAmazonNetwork && (this.mAmazonNetwork.done(), 
        this.mAmazonNetwork = null), this.mAmazonConnect && (this.mAmazonConnect.disconnect(), 
        this.mAmazonConnect = null), this.mAmazonConfig && (this.mAmazonConfig.done(), this.mAmazonConfig = null), 
        this.mAmazonTTS = null, this.mAmazonASR = null, this.mAudioContext && (this.mAudioContext = null), 
        this.mGetUserMedia = null, this.mDynamicCredentialsFlag = !1, this.mTransaction = null, 
        this.mRunningFlag = !1, this.mDefaultOptions = null, this.mActionTimeoutId = 0, 
        this.mActionTimeout = 6e4, 0;
    }, o.prototype.reset = function(n) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, n);
    }, o.prototype._setErrorOutput = function(n) {
        t.prototype._setErrorOutput.call(this, n), this.mAmazonConfig && this.mAmazonConfig._setErrorOutput(n), 
        this.mAmazonNetwork && this.mAmazonNetwork._setErrorOutput(n), this.mAmazonConnect && this.mAmazonConnect._setErrorOutput(n), 
        this.mAmazonTTS && this.mAmazonTTS._setErrorOutput(n), this.mAmazonASR && this.mAmazonASR._setErrorOutput(n);
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
        return 0;
    }, o.prototype._onStop = function(n, o) {
        return this._clearActionTimeout(), this.mTransaction = null, this.mRunningFlag = !1, 
        t.prototype._onStop.call(this, n, o);
    }, o.prototype._unlockAudio = function(t) {
        if (this.mAudioContext) {
            if ('running' === this.mAudioContext.state) return void t(!0);
            if ('suspended' === this.mAudioContext.state) {
                var n = setTimeout((function() {
                    return t(!1);
                }), 2e3);
                this.mAudioContext.resume().then((function() {
                    clearTimeout(n), t(!0);
                }), (function(o) {
                    console.log('AmazonPort._unlockAudio:', o), clearTimeout(n), t(!1);
                }));
            } else t(!1);
        } else t(!1);
    }, o.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this._error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return 'string' == typeof t.amazonRegion && t.amazonRegion && (this.mAmazonConfig.region = t.amazonRegion), 
            'string' == typeof t.amazonIdentityPoolId && t.amazonIdentityPoolId && (this.mAmazonConfig.identityPoolId = t.amazonIdentityPoolId, 
            console.log('AmazonPort.setConfig: neue Credentials eintragen ', t.amazonIdentityPoolId), 
            this.mAmazonConnect.disconnect(), this.mAmazonConnect.connect()), 0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, o.prototype.getConfig = function() {
        return {
            amazonRegion: this.mAmazonConfig.region,
            amazonIdentityPoolId: this.mAmazonConfig.identityPoolId
        };
    }, o.prototype.isOnline = function() {
        return !!this.mAmazonNetwork && this.mAmazonNetwork.isOnline();
    }, o.prototype.isOpen = function() {
        return !!this.mAmazonConnect && this.mAmazonConnect.isConnect();
    }, o.prototype._checkOpen = function(t) {
        if (!this.isOnline()) return this._error('_checkOpen', 'kein Netz vorhanden'), t(!1), 
        -1;
        var n = this.open();
        return t(0 === n), n;
    }, o.prototype.open = function(t) {
        if (!this.mAmazonConnect) return this._error('open', 'kein AmazonConnect vorhanden'), 
        -1;
        if (this.isOpen()) return 0;
        var n = this.mAmazonConnect.connect();
        return 0 === n && this._onOpen(), n;
    }, o.prototype.close = function() {
        return this.isOpen() && this.mAmazonConnect ? (this._onClose(), this.mAmazonConnect.disconnect()) : 0;
    }, o.prototype.getPluginName = function() {
        return this.mTransaction ? this.mTransaction.plugin : '';
    }, o.prototype.getActionName = function() {
        return this.mTransaction ? this.mTransaction.type : '';
    }, o.prototype.isRunning = function(t, n) {
        if (!t && !n) return this.mRunningFlag;
        if (t === this.getPluginName()) {
            if (!n) return this.mRunningFlag;
            if (n === this.getActionName()) return this.mRunningFlag;
        }
        return !1;
    }, o.prototype.isAction = function(t) {
        var n = !1;
        switch (t) {
          case "ASR":
            n = !!this.mAmazonASR;
            break;

          case "TTS":
            n = !!this.mAmazonTTS;
        }
        return n;
    }, o.prototype.setActionTimeout = function(t) {
        this.mActionTimeout = t;
    }, o.prototype.start = function(t, n, o) {
        var e = this;
        return this.isRunning() ? (this._error('start', 'Aktion laeuft bereits'), -1) : this.mAmazonConfig.isCredentials() ? this.mTransaction ? (this._error('start', 'andere Transaktion laeuft noch'), 
        -1) : this._checkOpen((function(i) {
            if (!i) return -1;
            e._setActionTimeout();
            var a = o || {};
            e.mPluginName = t, e.mRunningFlag = !0;
            var s = 0;
            switch (n) {
              case "NLU":
                e.mTransaction = new r(t, "NLU"), s = e._startNLU(e.mTransaction, a.text, a.language || "de-DE");
                break;

              case "ASRNLU":
                e.mTransaction = new r(t, "ASRNLU"), s = e._startASR(e.mTransaction, a.language || "de-DE", a.audioURL || '', !0, a.useProgressive || !1);
                break;

              case "ASR":
                e.mTransaction = new r(t, "ASR"), s = e._startASR(e.mTransaction, a.language || "de-DE", a.audioURL || '', !1, a.useProgressive || !1);
                break;

              case "TTS":
                e.mTransaction = new r(t, "TTS"), s = e._startTTS(e.mTransaction, a.text, a.language || "de-DE", a.voice || "Vicki");
                break;

              default:
                e._clearActionTimeout(), e._error('start', 'Keine gueltige Aktion uebergeben ' + n), 
                s = -1;
            }
            return s;
        })) : (this._error('start', 'Port hat keine Credentials'), -1);
    }, o.prototype.stop = function(t, n, o) {
        if (!this.isRunning()) return 0;
        if (!this.isOpen()) return this._error('stop', 'Port ist nicht geoeffnet'), -1;
        if (!this.mAmazonConfig.isCredentials()) return this._error('stop', 'Port hat keine Credentials'), 
        -1;
        if (!this.mTransaction) return this._error('stop', 'keine Transaktion vorhanden'), 
        -1;
        if (t !== this.mTransaction.plugin) return this._error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + t + ' != ' + this.mTransaction.plugin), 
        -1;
        if (n) {
            if (n !== this.mTransaction.type) return this._error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + n + ' != ' + this.mTransaction.type), 
            -1;
        } else n = this.mTransaction.type;
        var e = 0;
        switch (n) {
          case "NLU":
            e = this._stopNLU(this.mTransaction);
            break;

          case "ASR":
            e = this._stopASR(this.mTransaction);
            break;

          case "TTS":
            e = this._stopTTS(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + n), e = -1;
        }
        return this.mRunningFlag = !1, e;
    }, o.prototype._initRecognition = function(t) {
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
    }, o.prototype._startNLU = function(t, n, o) {
        return this._error('_startNLU', 'nicht implementiert'), -1;
    }, o.prototype._stopNLU = function(t) {
        return this._error('_stopNLU', 'nicht implementiert'), -1;
    }, o.prototype._startASR = function(t, n, o, e, r) {
        if (void 0 === e && (e = !1), void 0 === r && (r = !1), !n) return this._error('_startASR', 'keine Sprache uebergeben'), 
        -1;
        if (!this.mAmazonASR) return this._error('_startASR', 'keine Amazon ASR-Anbindung vorhanden'), 
        -1;
        try {
            var i = {
                language: n,
                nlu: e,
                progressive: r
            };
            return o && (i.audioURL = o), this.mAmazonASR.start(t, i);
        } catch (t) {
            return this._exception('_startASR', t), -1;
        }
    }, o.prototype._stopASR = function(t) {
        if (!this.mAmazonASR) return this._error('_stopASR', 'keine Amazon ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this.mAmazonASR.stop(t);
        } catch (t) {
            return this._exception('_stopASR', t), -1;
        }
    }, o.prototype._startTTS = function(t, n, o, e) {
        var r = this;
        if (!n) return this._error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.mAmazonTTS) return this._error('_startTTS', 'keine Amazon TTS-Anbindung vorhanden'), 
        -1;
        try {
            var i = {
                text: n,
                language: o,
                voice: e
            };
            return this._unlockAudio((function(n) {
                n ? r.mAmazonTTS.start(t, i) : (r._error('_startTTS', 'AudioContext ist nicht entsperrt'), 
                r._onStop(t.plugin, t.type));
            })), 0;
        } catch (t) {
            return this._exception('_startTTS', t), -1;
        }
    }, o.prototype._stopTTS = function(t) {
        if (!this.mAmazonTTS) return this._error('_stopTTS', 'keine Amazon TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this.mAmazonTTS.stop(t);
        } catch (t) {
            return this._exception('_stopTTS', t), -1;
        }
    }, o;
}(i), ht = function(t) {
    function n() {
        return t.call(this, 'AmazonFactory') || this;
    }
    return et(n, t), n.prototype.getType = function() {
        return "Amazon";
    }, n.prototype.getName = function() {
        return "AmazonFactory";
    }, n.prototype._newPort = function(t, n) {
        var o = null;
        switch (t) {
          case "AmazonPort":
          case "AmazonPort":
            o = new lt(t, n);
            break;

          case "AmazonMock":
            o = new rt("AmazonMock", n);
            break;

          default:
            this._error('_newPort', 'kein Port vorhanden');
        }
        return o;
    }, n.prototype.create = function(t, n) {
        void 0 === n && (n = !0);
        var o = t || "AmazonPort";
        try {
            return this._newPort(o, n);
        } catch (t) {
            return this._exception('create', t), null;
        }
    }, n;
}(e), pt = function() {
    function t() {}
    return t.setErrorOutputOn = function() {
        t.mErrorOutputFlag = !0, o.setErrorOutputOn();
    }, t.setErrorOutputOff = function() {
        t.mErrorOutputFlag = !1, o.setErrorOutputOff();
    }, t.setErrorOutputFunc = function(t) {
        o._setErrorOutputFunc(t);
    }, t._initAmazonPort = function(n) {
        var e = o.get("Amazon", lt);
        return e ? 0 !== e.init(n) ? (o.remove("Amazon"), -1) : (t.mCurrentPort = e, 0) : -1;
    }, t._initAmazonMock = function(n) {
        var e = o.get("Amazon", rt);
        return e ? 0 !== e.init(n) ? (console.log('Amazon._initAmazonMock: Error AmazonMock wurde nicht initialisiert'), 
        o.remove("Amazon"), -1) : (t.mCurrentPort = e, 0) : (console.log('Amazon._initAmazonMock: Error AmazonMock wurde nicht erzeugt'), 
        -1);
    }, t.init = function(n) {
        if (t.mInitFlag) return 0;
        if (!n) return t.mErrorOutputFlag && console.log('Amazon.init: Keine Amazon-Parameter uebergeben'), 
        -1;
        'boolean' == typeof n.errorOutputFlag && (n.errorOutputFlag ? t.setErrorOutputOn() : t.setErrorOutputOff());
        var o = 'AmazonPort';
        if (n && 'string' == typeof n.amazonPortName && 'AmazonMock' === n.amazonPortName && (o = 'AmazonMock'), 
        'AmazonPort' === o) {
            if (0 !== t._initAmazonPort(n)) return -1;
        } else {
            if ('AmazonMock' !== o) return t.mErrorOutputFlag && console.log('Amazon.init: Kein Amazon PortName vorhanden'), 
            -1;
            if (0 !== t._initAmazonMock(n)) return -1;
        }
        return t.mInitFlag = !0, 0;
    }, t.isInit = function() {
        return t.mInitFlag;
    }, t.done = function() {
        var n = o.find("Amazon");
        n || (n = t.mCurrentPort);
        var e = 0;
        return n && (e = n.done(), o.remove("Amazon")), t.mCurrentPort = null, t.mInitFlag = !1, 
        e;
    }, t._onOpenEvent = function(n, o, e, r) {
        if ('function' == typeof r) try {
            return r(n, o, e), 0;
        } catch (n) {
            return t.mErrorOutputFlag && console.log('Amazon._onOpenEvent: Exception', n.message), 
            -1;
        }
        return 0;
    }, t._openAmazonPort = function(n) {
        var e = o.find("Amazon");
        return e || (e = t.mCurrentPort), e ? (e.addOpenEvent("Amazon", (function(o) {
            return e.removeErrorEvent("Amazon"), e.removeOpenEvent("Amazon"), 'function' == typeof n && t._onOpenEvent(null, "Amazon", o.result, n), 
            o.result;
        })), e.addErrorEvent("Amazon", (function(o) {
            return e.removeOpenEvent("Amazon"), e.removeErrorEvent("Amazon"), 'function' == typeof n && t._onOpenEvent(o, "Amazon", -1, n), 
            0;
        })), e.open()) : (t.mErrorOutputFlag && console.log('Amazon._openAmazonPort: kein Port vorhanden'), 
        t._onOpenEvent(new Error('Amazon._openAmazonPort: Kein Port vorhanden'), "Amazon", -1, n), 
        -1);
    }, t.open = function(n) {
        return t.mInitFlag ? t._openAmazonPort(n) : (t.mErrorOutputFlag && console.log('Amazon.open: Init wurde nicht aufgerufen'), 
        t._onOpenEvent(new Error('Amazon.open: Init wurde nicht aufgerufen'), "Amazon", -1, n), 
        -1);
    }, t.setConfig = function(n) {
        return t.mCurrentPort ? t.mCurrentPort.setConfig(n) : -1;
    }, t.getConfig = function() {
        return t.mCurrentPort ? t.mCurrentPort.getConfig() : {
            amazonRegion: '',
            amazonIdentityPoolId: ''
        };
    }, t.mInitFlag = !1, t.mErrorOutputFlag = !1, t.mCurrentPort = null, t;
}();

export { T as AMAZON_API_VERSION, b as AMAZON_ASRNLU_ACTION, F as AMAZON_ASR_ACTION, j as AMAZON_ASR_LANGUAGE, D as AMAZON_ASR_LANGUAGE1, M as AMAZON_ASR_LANGUAGE2, $ as AMAZON_AUDIOBUFFER_SIZE, tt as AMAZON_AUDIOSAMPLE_RATE, B as AMAZON_AUDIOTTS_ID, nt as AMAZON_AUDIO_FORMAT, N as AMAZON_CONFIG_FILE, w as AMAZON_CONFIG_LOAD, E as AMAZON_CONFIG_PATH, Z as AMAZON_DEFAULT_CODEC, L as AMAZON_DEFAULT_LANGUAGE, k as AMAZON_DEFAULT_NAME, I as AMAZON_DEFAULT_URL, X as AMAZON_DEFAULT_VOICE, U as AMAZON_DE_LANGUAGE, x as AMAZON_EN_LANGUAGE, C as AMAZON_FACTORY_NAME, R as AMAZON_MOCK_NAME, v as AMAZON_NLU_ACTION, Q as AMAZON_PCM_CODEC, S as AMAZON_PORT_NAME, P as AMAZON_SERVER_URL, y as AMAZON_SERVER_VERSION, O as AMAZON_TTS_ACTION, W as AMAZON_TTS_LANGUAGE, G as AMAZON_TTS_LANGUAGE1, K as AMAZON_TTS_LANGUAGE2, J as AMAZON_TTS_VOICE, V as AMAZON_TTS_VOICE1, H as AMAZON_TTS_VOICE2, q as AMAZON_TTS_VOICE3, Y as AMAZON_TTS_VOICE4, z as AMAZON_TYPE_NAME, f as AMAZON_VERSION_BUILD, d as AMAZON_VERSION_DATE, p as AMAZON_VERSION_NUMBER, A as AMAZON_VERSION_STRING, g as AMAZON_VERSION_TYPE, _ as AMAZON_WORKER_VERSION, pt as Amazon, ht as AmazonFactory };
