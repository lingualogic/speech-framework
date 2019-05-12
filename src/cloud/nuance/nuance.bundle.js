/**
 * Speech-Nuance
 * 
 * Version: 0.1.7
 * Build:   0008
 * TYPE:    ALPHA
 * Datum:   07.04.2019
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

import { ErrorBase } from '../../core/error/error-base.ts';

import { FactoryManager } from '../../core/factory/factory-manager.ts';

import { NetHtml5WebSocket } from '../../common/html5/net-html5-websocket.ts';

import { Port } from '../../core/port/port.ts';

import { FileHtml5Reader } from '../../common/html5/file-html5-reader.ts';

import { AudioHtml5Reader } from '../../common/html5/audio-html5-reader.ts';

import { AudioContextFactory, AUDIOCONTEXT_FACTORY_NAME } from '../../common/html5/audiocontext-factory.ts';

import { PortManager } from '../../core/port/port-manager.ts';

var NUANCE_TYPE_NAME = 'Nuance', NUANCE_PORT_NAME = 'NuancePort', NUANCE_MOCK_NAME = 'NuanceMock', NUANCE_SERVER_URL = 'wss://ws.dev.nuance.com/v2', NUANCE_DEFAULT_URL = NUANCE_SERVER_URL, NUANCE_NLU_ACTION = 'NLU', NUANCE_ASR_ACTION = 'ASR', NUANCE_ASRNLU_ACTION = 'ASRNLU', NUANCE_TTS_ACTION = 'TTS', NUANCE_CONFIG_PATH = 'assets/', NUANCE_CONFIG_FILE = 'nuance.json', NUANCE_CONFIG_LOAD = !1, NUANCE_DE_LANGUAGE = 'deu-DEU', NUANCE_DEFAULT_LANGUAGE = NUANCE_DE_LANGUAGE, NUANCE_TTS_VOICE4 = 'Petra-ML', NUANCE_TTS_VOICE = NUANCE_TTS_VOICE4, NUANCE_DEFAULT_VOICE = NUANCE_TTS_VOICE, NUANCE_AUDIOTTS_ID = 789, NUANCE_PCM_CODEC = 'audio/L16;rate=16000', NUANCE_DEFAULT_CODEC = NUANCE_PCM_CODEC, NUANCE_AUDIOBUFFER_SIZE = 2048, NUANCE_AUDIOSAMPLE_RATE = 16e3, extendStatics = function(t, e) {
    return (extendStatics = Object.setPrototypeOf || {
        __proto__: []
    } instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    })(t, e);
};

function __extends(t, e) {
    function n() {
        this.constructor = t;
    }
    extendStatics(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, 
    new n());
}

var Factory = function(t) {
    function e(e, n) {
        void 0 === n && (n = !0);
        var r = t.call(this, e || 'Factory') || this;
        if (n && 0 !== FactoryManager.insert(r.getName(), r)) throw new Error('Factory ' + r.getName() + ' existiert bereits im FactoryManager');
        return r;
    }
    return __extends(e, t), e.prototype.isMock = function() {
        return !1;
    }, e.prototype.getType = function() {
        return 'any';
    }, e.prototype.getName = function() {
        return 'Factory';
    }, e.prototype.create = function(t, e) {
        return void 0 === e && (e = !0), null;
    }, e;
}(ErrorBase), USERMEDIA_FACTORY_NAME = 'UserMediaFactory', USERMEDIA_TYPE_NAME = 'UserMedia', UserMediaFactory = function(t) {
    function e(e, n) {
        return void 0 === n && (n = !0), t.call(this, e || USERMEDIA_FACTORY_NAME, n) || this;
    }
    return __extends(e, t), e.prototype.isMock = function() {
        return !1;
    }, e.prototype.getType = function() {
        return USERMEDIA_TYPE_NAME;
    }, e.prototype.getName = function() {
        return USERMEDIA_FACTORY_NAME;
    }, e.prototype.create = function(t, e) {
        void 0 === e && (e = !0);
        try {
            if (void 0 === navigator.mediaDevices && (console.log('UserMediaFactory: no mediaDevices'), 
            navigator.mediaDevices = {}), void 0 === navigator.mediaDevices.getUserMedia) {
                console.log('UserMediaFactory: no getUserMedia');
                var n = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || null;
                if (!n) return null;
                navigator.mediaDevices.getUserMedia = function(t) {
                    return new Promise(function(e, r) {
                        n.call(navigator, t, e, r);
                    });
                };
            }
            return function(t) {
                return navigator.mediaDevices.getUserMedia(t);
            };
        } catch (t) {
            return this._exception('create', t), null;
        }
    }, e;
}(Factory), NUANCE_VERSION_NUMBER = '0.1.7', NUANCE_VERSION_BUILD = '0008', NUANCE_VERSION_TYPE = 'ALPHA', NUANCE_VERSION_DATE = '07.04.2019', NUANCE_VERSION_STRING = NUANCE_VERSION_NUMBER + '.' + NUANCE_VERSION_BUILD + ' vom ' + NUANCE_VERSION_DATE + ' (' + NUANCE_VERSION_TYPE + ')', NUANCE_API_VERSION = NUANCE_VERSION_STRING, NuanceTransaction = function() {
    function t(e, n) {
        void 0 === e && (e = ''), void 0 === n && (n = ''), this.transactionId = 0, this.plugin = '', 
        this.type = '', this.result = null, this.error = null, this.plugin = e, this.type = n, 
        t.mTransactionCounter += 1, this.transactionId = t.mTransactionCounter;
    }
    return t.mTransactionCounter = 0, t;
}(), NuanceConfig = function(t) {
    function e(e) {
        var n = t.call(this, 'NuanceConfig') || this;
        return n.mInitFlag = !1, n.mConfigPath = NUANCE_CONFIG_PATH, n.mConfigFile = NUANCE_CONFIG_FILE, 
        n.mConfigLoadFlag = NUANCE_CONFIG_LOAD, n.mConfigServerUrl = NUANCE_DEFAULT_URL, 
        n.mConfigAppId = '', n.mConfigAppKey = '', n.mConfigUserId = '', n.mConfigNluTag = '', 
        n.mFileReader = null, n.mOnInitFunc = null, n.mOnErrorFunc = null, n.mFileReader = e, 
        n._setErrorOutputFunc(function(t) {
            return n._onError(new Error(t));
        }), n;
    }
    return __extends(e, t), e.prototype._setOption = function(t) {
        t && ('string' == typeof t.nuanceConfigPath && (this.mConfigPath = t.nuanceConfigPath), 
        'string' == typeof t.nuanceConfigFile && (this.mConfigFile = t.nuanceConfigFile), 
        'boolean' == typeof t.nuanceConfigLoadFlag && (this.mConfigLoadFlag = t.nuanceConfigLoadFlag), 
        'string' == typeof t.nuanceServerUrl && (this.mConfigServerUrl = t.nuanceServerUrl), 
        'string' == typeof t.nuanceAppId && (this.mConfigAppId = t.nuanceAppId), 'string' == typeof t.nuanceAppKey && (this.mConfigAppKey = t.nuanceAppKey), 
        'string' == typeof t.nuanceUserId && (this.mConfigUserId = t.nuanceUserId), 'string' == typeof t.nuanceNluTag && (this.mConfigNluTag = t.nuanceNluTag));
    }, e.prototype.init = function(t) {
        return this._setOption(t), this.mInitFlag = !0, 0;
    }, e.prototype.done = function() {
        return this.mInitFlag = !1, this.mConfigPath = NUANCE_CONFIG_PATH, this.mConfigFile = NUANCE_CONFIG_FILE, 
        this.mConfigLoadFlag = NUANCE_CONFIG_LOAD, this.mConfigServerUrl = NUANCE_DEFAULT_URL, 
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
            return this.isErrorOutput() && console.log('===> EXCEPTION NuanceConfig._onError: ', t.message), 
            -1;
        }
        return 0;
    }, Object.defineProperty(e.prototype, "onInit", {
        set: function(t) {
            this.mOnInitFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
        },
        enumerable: !0,
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
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "appId", {
        get: function() {
            return this.mConfigAppId;
        },
        set: function(t) {
            this.mConfigAppId = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "appKey", {
        get: function() {
            return this.mConfigAppKey;
        },
        set: function(t) {
            this.mConfigAppKey = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "userId", {
        get: function() {
            return this.mConfigUserId;
        },
        set: function(t) {
            this.mConfigUserId = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "nluTag", {
        get: function() {
            return this.mConfigNluTag;
        },
        set: function(t) {
            this.mConfigNluTag = t;
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype.isCredentials = function() {
        return !(!this.mConfigAppKey || !this.mConfigAppId);
    }, e;
}(ErrorBase), NetHtml5Connect = function(t) {
    function e(e) {
        var n = t.call(this, e || 'NetHtml5Connect') || this;
        return n.mInitFlag = !1, n.mOnOnlineFunc = null, n.mOnOfflineFunc = null, n.mOnErrorFunc = null, 
        n._setErrorOutputFunc(function(t) {
            return n._onError(new Error(t));
        }), n;
    }
    return __extends(e, t), e.prototype.init = function(t) {
        var e = this;
        try {
            window && (window.ononline = function() {
                return e._onOnline();
            }, window.onoffline = function() {
                return e._onOffline();
            });
        } catch (t) {
            return this._exception('init', t), -1;
        }
        return this.mInitFlag = !0, 0;
    }, e.prototype.isInit = function() {
        return this.mInitFlag;
    }, e.prototype.done = function() {
        return window.ononline = null, window.onoffline = null, this.mOnOnlineFunc = null, 
        this.mOnOfflineFunc = null, this.mOnErrorFunc = null, this.mInitFlag = !1, 0;
    }, e.prototype.isOnline = function() {
        return !!navigator && navigator.onLine;
    }, Object.defineProperty(e.prototype, "onOnline", {
        set: function(t) {
            this.mOnOnlineFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "onOffline", {
        set: function(t) {
            this.mOnOfflineFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), e.prototype._onOnline = function() {
        if ('function' == typeof this.mOnOnlineFunc) try {
            return this.mOnOnlineFunc();
        } catch (t) {
            return this._exception('_onOnline', t), -1;
        }
        return 0;
    }, e.prototype._onOffline = function() {
        if ('function' == typeof this.mOnOfflineFunc) try {
            return this.mOnOfflineFunc();
        } catch (t) {
            return this._exception('_onOffline', t), -1;
        }
        return 0;
    }, e.prototype._onError = function(t) {
        if ('function' == typeof this.mOnErrorFunc) try {
            return this.mOnErrorFunc(t);
        } catch (t) {
            return this.isErrorOutput() && console.log('===> EXCEPTION NetHtml5Connect._onError: ', t.message), 
            -1;
        }
        return 0;
    }, e;
}(ErrorBase), NuanceNetwork = function(t) {
    function e() {
        return t.call(this, 'NuanceNetwork') || this;
    }
    return __extends(e, t), e;
}(NetHtml5Connect), NuanceWebSocket = function(t) {
    function e() {
        return t.call(this, 'NuanceWebSocket') || this;
    }
    return __extends(e, t), e.prototype.connect = function(t) {
        return t ? 0 !== this._connect(t) ? (this._error('open', 'keine Verbindung moeglich'), 
        -1) : 0 : (this._error('connect', 'keine URL vorhanden'), -1);
    }, e.prototype.disconnect = function() {
        this.onMessage = null, this.close();
    }, e.prototype.sendJSON = function(t) {
        this.sendMessage(t);
    }, e;
}(NetHtml5WebSocket), NuanceConnect = function(t) {
    function e(e) {
        var n = t.call(this, 'NuanceConnect') || this;
        return n.mWebSocket = null, n.mWebSocket = e, n;
    }
    return __extends(e, t), e.prototype._sendConnectMessage = function(t) {
        var e = window.navigator, n = [ e.platform, e.vendor, e.language ].join('_').replace(/\s/g, ''), r = {
            message: 'connect',
            user_id: t.userId,
            codec: t.codec || 'audio/L16;rate=16000',
            app_id: t.appId,
            app_key: t.appKey,
            device_id: n,
            phone_model: 'nuance_internal_mixjsapp',
            phone_number: t.userId
        };
        return this.mWebSocket.sendMessage(r);
    }, e.prototype.connect = function(t) {
        t = t || {}, this._sendConnectMessage(t), t.onopen(), this.mWebSocket.onMessage = function(e) {
            try {
                switch (typeof e.data) {
                  case 'object':
                    t.onttsdecode(t, e.data);
                    break;

                  case 'string':
                    var n = JSON.parse(e.data);
                    'volume' === n.message ? t.onvolume(n.volume) : t.onresult(n), 'audio_begin' === n.message && t.onttsstart(), 
                    'audio_end' === n.message && t.onttscomplete();
                    break;

                  default:
                    t.onresult(e.data);
                }
                return 0;
            } catch (t) {
                return console.log('NuanceConnect.connect: Exception', t.message), -1;
            }
        };
    }, e.prototype.disconnect = function() {
        return this.mWebSocket && (this.mWebSocket.onMessage = null), 0;
    }, e.prototype.sendJSON = function(t) {
        return this.mWebSocket ? this.mWebSocket.sendMessage(t) : -1;
    }, Object.defineProperty(e.prototype, "webSocket", {
        get: function() {
            return this.mWebSocket.webSocket;
        },
        enumerable: !0,
        configurable: !0
    }), e;
}(ErrorBase), PCM_L16CodecArray = [ 'audio/L16;rate=8000', 'audio/L16;rate=16000' ], OpusCodecArray = [ 'audio/opus;rate=8000', 'audio/opus;rate=16000' ], NuanceAudioCodec = function(t) {
    function e() {
        return t.call(this, 'NuanceAudioCodec') || this;
    }
    return __extends(e, t), e.prototype._findCodec = function(t, e) {
        for (var n = 0; n < e.length; n++) if (t === e[n]) return !0;
        return !1;
    }, e.prototype.findPcmCodec = function(t) {
        return this._findCodec(t, PCM_L16CodecArray);
    }, e.prototype.findOpusCodec = function(t) {
        return this._findCodec(t, OpusCodecArray);
    }, e.prototype._float32ToInt16 = function(t) {
        var e = t < 0 ? 32768 * t : 32767 * t;
        return Math.max(-32768, Math.min(32768, e));
    }, e.prototype._float32ArrayToInt16Array = function(t) {
        for (var e = new Int16Array(t.length), n = 0; n < t.length; ) e[n] = this._float32ToInt16(t[n++]);
        return e;
    }, e.prototype.encodePCM = function(t, e) {
        return this.findPcmCodec(e) ? [ this._float32ArrayToInt16Array(t) ] : [ t ];
    }, e.prototype.decodePCM = function(t) {
        try {
            for (var e = new Int16Array(t), n = e.length, r = new Float32Array(n), o = 0; o < n; ++o) r[o] = e[o] / 32768;
            return r;
        } catch (t) {
            return console.log('NuanceAudioCodec.decodePCM: Exception', t), this._exception('decodePCM', t), 
            [];
        }
    }, e;
}(ErrorBase), NuanceResampler = function() {
    function t(t, e, n, r, o) {
        this.fromSampleRate = 0, this.toSampleRate = 0, this.channels = 0, this.outputBufferSize = 0, 
        this.noReturn = !1, this.resampler = null, this.ratioWeight = 0, this.interpolate = null, 
        this.lastWeight = 0, this.outputBuffer = null, this.lastOutput = null, this.fromSampleRate = t, 
        this.toSampleRate = e, this.channels = n || 0, this.outputBufferSize = r, this.noReturn = !!o, 
        this.initialize();
    }
    return t.prototype.initialize = function() {
        if (!(this.fromSampleRate > 0 && this.toSampleRate > 0 && this.channels > 0)) throw new Error('Invalid settings specified for the resampler.');
        this.fromSampleRate === this.toSampleRate ? (this.resampler = this.bypassResampler, 
        this.ratioWeight = 1) : (this.compileInterpolationFunction(), this.resampler = this.interpolate, 
        this.ratioWeight = this.fromSampleRate / this.toSampleRate, this.tailExists = !1, 
        this.lastWeight = 0, this.initializeBuffers());
    }, t.prototype.compileInterpolationFunction = function() {
        for (var t = 'var bufferLength = Math.min(buffer.length, this.outputBufferSize);        if ((bufferLength % ' + this.channels + ') == 0) {            if (bufferLength > 0) {                var ratioWeight = this.ratioWeight;                var weight = 0;', e = 0; e < this.channels; ++e) t += 'var output' + e + ' = 0;';
        t += 'var actualPosition = 0;                var amountToNext = 0;                var alreadyProcessedTail = !this.tailExists;                this.tailExists = false;                var outputBuffer = this.outputBuffer;                var outputOffset = 0;                var currentPosition = 0;                do {                    if (alreadyProcessedTail) {                        weight = ratioWeight;';
        for (e = 0; e < this.channels; ++e) t += 'output' + e + ' = 0;';
        t += '}                    else {                        weight = this.lastWeight;';
        for (e = 0; e < this.channels; ++e) t += 'output' + e + ' = this.lastOutput[' + e + '];';
        t += 'alreadyProcessedTail = true;                    }                    while (weight > 0 && actualPosition < bufferLength) {                        amountToNext = 1 + actualPosition - currentPosition;                        if (weight >= amountToNext) {';
        for (e = 0; e < this.channels; ++e) t += 'output' + e + ' += buffer[actualPosition++] * amountToNext;';
        t += 'currentPosition = actualPosition;                            weight -= amountToNext;                        }                        else {';
        for (e = 0; e < this.channels; ++e) t += 'output' + e + ' += buffer[actualPosition' + (e > 0 ? ' + ' + e : '') + '] * weight;';
        t += 'currentPosition += weight;                            weight = 0;                            break;                        }                    }                    if (weight == 0) {';
        for (e = 0; e < this.channels; ++e) t += 'outputBuffer[outputOffset++] = output' + e + ' / ratioWeight;';
        t += '}                    else {                        this.lastWeight = weight;';
        for (e = 0; e < this.channels; ++e) t += 'this.lastOutput[' + e + '] = output' + e + ';';
        t += 'this.tailExists = true;                        break;                    }                } while (actualPosition < bufferLength);                return this.bufferSlice(outputOffset);            }            else {                return (this.noReturn) ? 0 : [];            }        }        else {            throw(new Error("Buffer was of incorrect sample length."));        }', 
        this.interpolate = Function('buffer', t);
    }, t.prototype.bypassResampler = function(t) {
        return this.noReturn ? (this.outputBuffer = t, t.length) : t;
    }, t.prototype.bufferSlice = function(t) {
        if (this.noReturn) return t;
        try {
            return this.outputBuffer.subarray(0, t);
        } catch (e) {
            try {
                return this.outputBuffer.length = t, this.outputBuffer;
            } catch (e) {
                return this.outputBuffer.slice(0, t);
            }
        }
    }, t.prototype.initializeBuffers = function(t) {
        try {
            this.outputBuffer = new Float32Array(this.outputBufferSize), this.lastOutput = new Float32Array(this.channels);
        } catch (t) {
            this.outputBuffer = [], this.lastOutput = [];
        }
    }, t;
}(), NuanceAudioRecorder = function(t) {
    function e(e, n, r) {
        var o = t.call(this, 'NuanceAudioRecorder') || this;
        o.mWebSocket = null, o.mAudioContext = null, o.mAudioCodec = null, o.mResampler = null, 
        o.mBufferSize = NUANCE_AUDIOBUFFER_SIZE, o.mSampleRate = NUANCE_AUDIOSAMPLE_RATE, 
        o.mCodec = NUANCE_DEFAULT_CODEC, o.mAudioInputNode = null, o.mAnalyseNode = null, 
        o.mRecordingNode = null, o.mUserMediaStream = null, o.mBytesRecorded = 0, o.mRecordingFlag = !1, 
        o.mOnVolumeFunc = null, o.mOnEndedFunc = null, o.mWebSocket = e, o.mAudioContext = n, 
        o.mOnVolumeFunc = r, o.mAudioCodec = new NuanceAudioCodec();
        try {
            o.mResampler = new NuanceResampler(o.mAudioContext.sampleRate, o.mSampleRate, 1, o.mBufferSize, void 0);
        } catch (t) {
            throw o._exception('constructor', t), new Error('NuanceAudioRecorder nicht initialisiert');
        }
        return o;
    }
    return __extends(e, t), e.prototype._closeMediaStream = function() {
        try {
            if (this.mUserMediaStream && this.mUserMediaStream.getAudioTracks) for (var t = 0, e = this.mUserMediaStream.getAudioTracks(); t < e.length; t++) {
                var n = e[t];
                n.stop && n.stop();
            }
        } catch (t) {
            this._exception('_closeMediaStream', t);
        }
        this.mUserMediaStream = null;
    }, e.prototype._onEnded = function() {
        if ('function' == typeof this.mOnEndedFunc) try {
            this.mOnEndedFunc();
        } catch (t) {
            return this._exception('_onEnded', t), -1;
        }
        return 0;
    }, e.prototype._onVolume = function(t) {
        if ('function' == typeof this.mOnVolumeFunc) try {
            this.mOnVolumeFunc(t);
        } catch (t) {
            return this._exception('_onVolume', t), -1;
        }
        return 0;
    }, e.prototype._onAudioProcess = function(t) {
        var e = this;
        try {
            if (!this.mRecordingFlag) return this.mAudioInputNode.disconnect(this.mAnalyseNode), 
            this.mAnalyseNode.disconnect(this.mRecordingNode), this.mRecordingNode.disconnect(this.mAudioContext.destination), 
            this._closeMediaStream(), void this._onEnded();
            var n = t.inputBuffer.getChannelData(0), r = this.mResampler.resampler(n);
            this.mBytesRecorded += r.length;
            var o = new Uint8Array(this.mAnalyseNode.frequencyBinCount);
            if (this.mAnalyseNode.getByteTimeDomainData(o), this.mAudioCodec.findPcmCodec(this.mCodec)) this.mAudioCodec.encodePCM(r, this.mCodec).forEach(function(t) {
                e.mWebSocket.send(t.buffer);
            }); else this.mAudioCodec.findOpusCodec(this.mCodec);
            this._onVolume(o);
        } catch (t) {
            this._exception('_onAudioProcess', t);
        }
    }, e.prototype.start = function(t, e) {
        var n = this;
        this.mUserMediaStream = t, this.mCodec = e, this.mAudioContext.resume().then(function() {
            try {
                n.mRecordingFlag = !0, n.mAudioInputNode = n.mAudioContext.createMediaStreamSource(n.mUserMediaStream), 
                n.mAnalyseNode = n.mAudioContext.createAnalyser(), n.mRecordingNode = n.mAudioContext.createScriptProcessor(n.mBufferSize, 1, 2), 
                n.mRecordingNode.onaudioprocess = function(t) {
                    return n._onAudioProcess(t);
                }, n.mAudioInputNode.connect(n.mAnalyseNode), n.mAnalyseNode.connect(n.mRecordingNode), 
                n.mRecordingNode.connect(n.mAudioContext.destination);
            } catch (t) {
                n._exception('start', t);
            }
        }, function(t) {
            t && t.message && n._error('start.resume', t.message);
        });
    }, e.prototype.startAudio = function(t, e) {}, e.prototype.stop = function(t) {
        this.mOnEndedFunc = t, this.mRecordingFlag = !1;
    }, e;
}(ErrorBase), NuanceDevice = function(t) {
    function e(e, n, r) {
        var o = t.call(this, e || 'NuanceDevice') || this;
        return o.mConfig = null, o.mConnect = null, o.mTransaction = null, o.onStart = null, 
        o.onStop = null, o.onResult = null, o.onError = null, o.onClose = null, o.mConfig = n, 
        o.mConnect = r, o;
    }
    return __extends(e, t), e.prototype._onStart = function() {
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
    }, e.prototype._getDefaultOption = function() {
        var t = this;
        return {
            onopen: function() {
                t._onStart();
            },
            onclose: function() {
                t._onClose(), t._onStop();
            },
            onerror: function(e) {
                t._onError(e), t._onStop();
            }
        };
    }, e.prototype._createOption = function(t) {
        var e = Object.assign(t, this._getDefaultOption());
        return e.appId = t.appId || this.mConfig.appId || '', e.appKey = t.appKey || this.mConfig.appKey || '', 
        e.userId = t.userId || this.mConfig.userId, e.tag = t.tag || this.mConfig.nluTag || '', 
        e.language = t.language || NUANCE_DEFAULT_LANGUAGE, e.text = t.text || '', e.voice = t.voice || NUANCE_DEFAULT_VOICE, 
        e.codec = t.codec || NUANCE_DEFAULT_CODEC, e;
    }, e.prototype._sendQueryEndMessage = function(t) {
        var e = {
            message: 'query_end',
            transaction_id: t
        };
        return this.mConnect.sendJSON(e);
    }, e.prototype._start = function(t) {}, e.prototype._stop = function() {}, e.prototype.start = function(t, e) {
        if (!t) return this._error('start', 'keine Transaktion uebergeben'), -1;
        if (this.mTransaction) return this._error('start', 'vorherige Transaktion nicht beendet'), 
        -1;
        this.mTransaction = t;
        try {
            return this._start(e), 0;
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
            return this._stop(), this._onStop(), 0;
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
}(ErrorBase), ASR_MAXVOLUME_COUNTER = 50, ASR_TIMEOUTVOLUME_COUNTER = 200, ASR_MINVOLUME_THRESHOLD = 127, ASR_MAXVOLUME_THRESHOLD = 128, NuanceASR = function(t) {
    function e(e, n, r, o, i) {
        var a = t.call(this, 'NuanceASR', e, n) || this;
        return a.mAudioContext = null, a.mGetUserMedia = null, a.mAudioReader = null, a.mAudioRecorder = null, 
        a.mUserMediaStream = null, a.mRequestId = 0, a.mVolumeCounter = 0, a.mTimeoutCounter = 0, 
        a.mRecordingFlag = !1, a.mAudioContext = r, a.mGetUserMedia = o, a.mAudioReader = i, 
        a;
    }
    return __extends(e, t), e.prototype.isVolume = function(t) {
        if (this.mVolumeCounter += 1, this.mTimeoutCounter += 1, t) try {
            for (var e = t.length, n = 0, r = 0; r < e; r++) n += t[r] * t[r];
            var o = Math.sqrt(n / e);
            (o < ASR_MINVOLUME_THRESHOLD || o > ASR_MAXVOLUME_THRESHOLD) && (this.mVolumeCounter = 0);
        } catch (t) {
            this._exception('isVolume', t);
        }
        return this.mVolumeCounter !== ASR_MAXVOLUME_COUNTER && this.mTimeoutCounter !== ASR_TIMEOUTVOLUME_COUNTER;
    }, e.prototype._getDefaultOption = function() {
        var e = this, n = t.prototype._getDefaultOption.call(this);
        return n.onvolume = function(t) {
            e.isVolume(t) || e._stop();
        }, n.onresult = function(t) {
            if ('NVC_ASR_CMD' === t.result_type || 'NMDP_ASR_CMD' === t.result_type) 'rec_text_results' === t.result_format ? e._onResult(t.transcriptions) : console.log('ASR Response', t); else if ('NDSP_ASR_APP_CMD' === t.result_type || 'NDSP_APP_CMD' === t.result_type) if ('nlu_interpretation_results' === t.result_format) if ('failure' !== t.nlu_interpretation_results.status) try {
                e._onResult(t.nlu_interpretation_results.payload.interpretations);
            } catch (t) {
                e._onError(new Error('ASRNLU-Exception: ' + t.message));
            } else e._onError(new Error('ASRNLU-Error: ' + t.nlu_interpretation_results.reason)); else 'rec_text_results' === t.result_format ? e._onResult(t.transcriptions) : console.log('ASR', t); else 'NDSP_CONCEPT_UPLOAD_FULL_CMD' === t.result_type || 'NDSP_DELETE_ALL_CONCEPTS_DATA_CMD' === t.result_type || ('query_error' === t.message ? (e._onError(new Error('ASR-Error.' + t.message + ': ' + t.reason)), 
            e._onStop()) : 'disconnect' === t.message && ('Transaction completed.' !== t.reason && (e._onError(new Error('ASR-Error.' + t.message + ': ' + t.reason)), 
            e._stop()), e._onStop()));
        }, n;
    }, e.prototype._sendQueryBeginMessage = function(t, e, n, r, o) {
        var i = {
            message: 'query_begin',
            transaction_id: t,
            language: e,
            codec: r
        };
        return o ? (i.command = 'NDSP_ASR_APP_CMD', i.context_tag = n) : (i.command = 'NMDP_ASR_CMD', 
        i.recognition_type = n || 'dictation'), this.mConnect.sendJSON(i);
    }, e.prototype._sendRequestInfoMessage = function(t, e) {
        var n = {};
        e && (n.result_delivery = 'progressive');
        var r = {
            message: 'query_parameter',
            transaction_id: t,
            parameter_name: 'REQUEST_INFO',
            parameter_type: 'dictionary',
            dictionary: n
        };
        return this.mConnect.sendJSON(r);
    }, e.prototype._sendAudioInfoMessage = function(t, e) {
        var n = {
            message: 'query_parameter',
            transaction_id: t,
            parameter_name: 'AUDIO_INFO',
            parameter_type: 'audio',
            audio_id: e
        };
        return this.mConnect.sendJSON(n);
    }, e.prototype._sendAudioBeginMessage = function(t) {
        var e = {
            message: 'audio',
            audio_id: t
        };
        return this.mConnect.sendJSON(e);
    }, e.prototype._startASR = function(t) {
        var e = this;
        t = this._createOption(t);
        var n = Object.assign({}, t);
        n.onopen = function() {
            t.onopen(), e.mRequestId++, e._sendQueryBeginMessage(e.mTransaction.transactionId, n.language, n.tag, n.codec, n.nlu), 
            e._sendRequestInfoMessage(e.mTransaction.transactionId, n.progressive), e._sendAudioInfoMessage(e.mTransaction.transactionId, e.mRequestId), 
            e._sendQueryEndMessage(e.mTransaction.transactionId), e._sendAudioBeginMessage(e.mRequestId);
            try {
                if (e.mAudioRecorder = new NuanceAudioRecorder(e.mConnect.webSocket, e.mAudioContext, function(e) {
                    t.onvolume(e);
                }), t.userMediaStream) e.mAudioRecorder.start(t.userMediaStream, n.codec); else {
                    if (!t.audioData) return void console.log('NuanceASR._startASR: keine Audiodaten vorhanden');
                    e.mAudioRecorder.startAudio(t.audioData, n.codec);
                }
                e.mRecordingFlag = !0;
            } catch (t) {
                e._exception('_start', t);
            }
        }, this.mConnect.connect(n);
    }, e.prototype._startAudio = function(t) {
        var e = this;
        return t && t.audioURL && this.mAudioReader ? (this.mAudioReader.onRead = function(n) {
            console.log('NuanceASR._startAudio: Aufruf von _startASR mit den Audiodaten'), t.audioData = n, 
            e._startASR(t);
        }, this.mAudioReader.onError = function(t) {
            console.log('NuanceASR._startAudio: Fehlermeldung', t), e._error('_startAudio', t), 
            e._onStop();
        }, this.mAudioReader.read(t.audioURL)) : (this._error('_startAudio', 'keine Audio-URL vorhanden'), 
        -1);
    }, e.prototype._start = function(t) {
        var e = this;
        if (this.mRecordingFlag) return this._error('_start', 'ASR laeuft bereits'), -1;
        if (t && t.audioURL) {
            var n = {
                audioURL: t.audioURL,
                language: t.language
            };
            t.nlu && (n.nlu = !0, n.tag = this.mConfig.nluTag), t.progressive && (n.progressive = !0);
            try {
                this._startAudio(n);
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
                }).then(function(n) {
                    e.mUserMediaStream = n;
                    var r = {
                        userMediaStream: e.mUserMediaStream,
                        language: t.language,
                        tag: e.mConfig.nluTag
                    };
                    t.nlu && (r.nlu = !0), t.progressive && (r.progressive = !0);
                    try {
                        e._startASR(r);
                    } catch (t) {
                        e._exception('_start', t);
                    }
                }, function(t) {
                    e._onError(new Error('ASR-Error: kein UserMedia erzeugt')), e._error('_start', 'keine UserMedia erzeugt: ' + t.message), 
                    e._onStop();
                }), 0;
            } catch (t) {
                return this._exception('_start', t), -1;
            }
        }
    }, e.prototype._stop = function() {
        var t = this;
        if (this.mRecordingFlag = !1, !this.mAudioRecorder) return 0;
        try {
            return this.mAudioRecorder.stop(function() {
                var e = {
                    message: 'audio_end',
                    audio_id: t.mRequestId
                };
                t.mConnect.sendJSON(e);
            }), this.mAudioRecorder = null, 0;
        } catch (t) {
            return this._exception('_stop', t), -1;
        }
    }, e;
}(NuanceDevice), NuanceNLU = function(t) {
    function e(e, n) {
        return t.call(this, 'NuanceNLU', e, n) || this;
    }
    return __extends(e, t), e.prototype._getDefaultOption = function() {
        var e = this, n = t.prototype._getDefaultOption.call(this);
        return n.onresult = function(t) {
            if ('NDSP_APP_CMD' === t.result_type) if ('nlu_interpretation_results' === t.result_format) {
                if ('failure' !== t.nlu_interpretation_results.status) try {
                    e._onResult(t.nlu_interpretation_results.payload.interpretations);
                } catch (t) {
                    e._onError(new Error('NLU-Exception: ' + t.message));
                } else e._onError(new Error('NLU-Error: ' + t.nlu_interpretation_results.reason));
                e._onStop();
            } else console.log('ASR', t); else 'NDSP_CONCEPT_UPLOAD_FULL_CMD' === t.result_type ? console.log('Concept Upload', t) : 'NDSP_DELETE_ALL_CONCEPTS_DATA_CMD' === t.result_type ? console.log('Concept Upload Reset', t) : 'query_error' === t.message ? (e._onError(new Error('NLU-Error.' + t.message + ': ' + t.reason)), 
            e._onStop()) : 'disconnect' === t.message && 'Transaction completed.' !== t.reason && (e._onError(new Error('NLU-Error.' + t.message + ': ' + t.reason)), 
            e._onStop());
        }, n;
    }, e.prototype._sendQueryBeginMessage = function(t, e, n) {
        var r = {
            message: 'query_begin',
            transaction_id: t,
            command: 'NDSP_APP_CMD',
            language: e,
            context_tag: n
        };
        return this.mConnect.sendJSON(r);
    }, e.prototype._sendQueryParameterMessage = function(t, e) {
        var n = {
            message: 'query_parameter',
            transaction_id: t,
            parameter_name: 'REQUEST_INFO',
            parameter_type: 'dictionary',
            dictionary: {
                application_data: {
                    text_input: e
                }
            }
        };
        return this.mConnect.sendJSON(n);
    }, e.prototype._start = function(t) {
        var e = this;
        t = this._createOption(t);
        var n = Object.assign({}, t);
        n.onopen = function() {
            t.onopen(), e._sendQueryBeginMessage(e.mTransaction.transactionId, n.language, n.tag), 
            e._sendQueryParameterMessage(e.mTransaction.transactionId, n.text), e._sendQueryEndMessage(e.mTransaction.transactionId);
        }, this.mConnect.connect(n);
    }, e.prototype._stop = function() {}, e;
}(NuanceDevice), AUDIO_MIN_SAMPLERATE = 22500, NuanceAudioPlayer = function(t) {
    function e(e) {
        var n = t.call(this, 'NuanceAudioPlayer') || this;
        return n.mAudioContext = null, n.mAudioCodec = null, n.mResampler = null, n.mOnAudioEndFunc = null, 
        n.mAudioSource = null, n.mAudioArray = [], n.mQueue = [], n.mBeginSpeakFlag = !0, 
        n.mAudioStopFlag = !1, n.mAudioContext = e, n.mAudioCodec = new NuanceAudioCodec(), 
        n;
    }
    return __extends(e, t), e.prototype.start = function() {
        this.mOnAudioEndFunc = null, this.mAudioSource = null, this.mAudioArray = [], this.mQueue = [], 
        this.mBeginSpeakFlag = !0, this.mAudioStopFlag = !1;
    }, e.prototype._getAudioBufferFirst = function(t) {
        var e = null;
        try {
            var n = new Float32Array(t.length);
            n.set(t), (e = new AudioBuffer({
                length: n.length,
                numberOfChannels: 1,
                sampleRate: NUANCE_AUDIOSAMPLE_RATE
            })).getChannelData(0).set(n);
        } catch (t) {
            e = null, console.log('NuanceAudioPlayer._getAudioBufferFirst: Exception', t);
        }
        return e;
    }, e.prototype._getAudioBufferSecond = function(t) {
        var e = null;
        try {
            var n = new Float32Array(t.length);
            n.set(t), (e = this.mAudioContext.createBuffer(1, n.length, NUANCE_AUDIOSAMPLE_RATE)).getChannelData(0).set(n);
        } catch (t) {
            e = null, console.log('NuanceAudioPlayer._getAudioBufferSecond: Exception', t);
        }
        return e;
    }, e.prototype._getAudioBufferResample = function(t) {
        var e = null;
        try {
            var n = new Float32Array(1.4 * t.length);
            n.set(t), this.mResampler = new NuanceResampler(NUANCE_AUDIOSAMPLE_RATE, AUDIO_MIN_SAMPLERATE, 1, n.length, void 0);
            var r = this.mResampler.resampler(n);
            (e = this.mAudioContext.createBuffer(1, r.length, AUDIO_MIN_SAMPLERATE)).getChannelData(0).set(r);
        } catch (t) {
            e = null, console.log('NuanceAudioPlayer._getAudioBufferResample: Exception', t);
        }
        return e;
    }, e.prototype.playByStream = function(t, e) {
        var n = this;
        try {
            if (this.mOnAudioEndFunc = t.onaudioend, 0 === e.length || this.mAudioStopFlag) return this.mBeginSpeakFlag = !0, 
            t.onaudioend(), this.mOnAudioEndFunc = null, void (this.mAudioSource = null);
            this.mAudioSource = this.mAudioContext.createBufferSource(), this.mAudioSource.onended = function() {
                return n.playByStream(t, e);
            };
            var r = e.shift(), o = this._getAudioBufferFirst(r);
            if (o || (o = this._getAudioBufferSecond(r)), o || (o = this._getAudioBufferResample(r)), 
            !o) return void this._error('playByStream', 'kein Audiobuffer erzeugt');
            this.mAudioSource.buffer = o, this.mAudioSource.connect(this.mAudioContext.destination), 
            this.mAudioSource.start ? this.mAudioSource.start(0) : this.mAudioSource.noteOn(0), 
            t.onaudiostart();
        } catch (e) {
            this.mBeginSpeakFlag = !0, t.onaudioend(), this.mOnAudioEndFunc = null, this.mAudioSource = null, 
            console.log('NuanceAudioPlayer.playByStream: Exception', e), this._exception('playByStream', e);
        }
    }, e.prototype.decode = function(t, e) {
        try {
            if (this.mAudioCodec.findPcmCodec(t.codec)) {
                var n = this.mAudioCodec.decodePCM(e);
                this.mAudioArray.push(n), this.mQueue.push(n), this.mBeginSpeakFlag && (this.mBeginSpeakFlag = !1, 
                this.playByStream(t, this.mAudioArray));
            } else this.mAudioCodec.findOpusCodec(t.codec) || this._error('decode', 'Kein Decoder vorhanden fuer ' + t.codec);
        } catch (t) {
            this._exception('decode', t);
        }
    }, e.prototype.stop = function() {
        try {
            this.mAudioStopFlag = !0, this.mAudioSource && (this.mAudioSource.stop(0), this.mAudioSource.disconnect(0), 
            'function' == typeof this.mOnAudioEndFunc && this.mOnAudioEndFunc());
        } catch (t) {
            this._exception('stop', t);
        }
        this.mAudioSource = null;
    }, e;
}(ErrorBase), NuanceTTS = function(t) {
    function e(e, n, r) {
        var o = t.call(this, 'NuanceTTS', e, n) || this;
        return o.mAudioContext = null, o.mAudioPlayer = null, o.mAudioContext = r, o;
    }
    return __extends(e, t), e.prototype._getDefaultOption = function() {
        var e = this, n = t.prototype._getDefaultOption.call(this);
        return n.onresult = function(t) {
            'NMDP_TTS_CMD' === t.result_type || 'NVC_TTS_CMD' === t.result_type || ('query_error' === t.message ? (e._onError(new Error('TTS-Error.' + t.message + ': ' + t.reason)), 
            e._onStop()) : 'disconnect' === t.message && 'Transaction completed.' !== t.reason && (e._onError(new Error('TTS-Error.' + t.message + ': ' + t.reason)), 
            e._onStop()));
        }, n.onttsdecode = function(t, n) {
            e.mAudioPlayer && e.mAudioPlayer.decode(t, n);
        }, n.onttsstart = function() {
            e.mAudioPlayer && e.mAudioPlayer.start();
        }, n.onttscomplete = function() {
            e.mAudioPlayer && e._onResult(e.mAudioPlayer.mQueue);
        }, n.onaudiostart = function() {
            e._onStart();
        }, n.onaudioend = function() {
            e.mAudioPlayer = null, e._onStop();
        }, n;
    }, e.prototype._sendQueryBeginMessage = function(t, e, n, r) {
        var o = {
            message: 'query_begin',
            transaction_id: t,
            command: 'NMDP_TTS_CMD',
            language: e,
            codec: r,
            tts_voice: n
        };
        return this.mConnect.sendJSON(o);
    }, e.prototype._sendQueryParameterMessage = function(t, e) {
        var n = {
            message: 'query_parameter',
            transaction_id: t,
            parameter_name: 'TEXT_TO_READ',
            parameter_type: 'dictionary',
            dictionary: {
                audio_id: NUANCE_AUDIOTTS_ID,
                tts_input: e,
                tts_type: 'text'
            }
        };
        return this.mConnect.sendJSON(n);
    }, e.prototype._start = function(t) {
        var e = this;
        t = this._createOption(t);
        var n = Object.assign({}, t);
        n.onopen = function() {
            t.onopen(), e.mAudioPlayer = new NuanceAudioPlayer(e.mAudioContext), e._sendQueryBeginMessage(e.mTransaction.transactionId, t.language, t.voice, t.codec), 
            e._sendQueryParameterMessage(e.mTransaction.transactionId, t.text), e._sendQueryEndMessage(e.mTransaction.transactionId);
        }, this.mConnect.connect(n);
    }, e.prototype._stop = function() {
        this.mAudioPlayer && this.mAudioPlayer.stop();
    }, e;
}(NuanceDevice), AUDIO_UNLOCK_TIMEOUT = 2e3, NUANCE_ACTION_TIMEOUT = 6e4, NuancePort = function(t) {
    function e(e, n) {
        void 0 === n && (n = !0);
        var r = t.call(this, e || NUANCE_PORT_NAME, n) || this;
        return r.mAudioContext = null, r.mGetUserMedia = null, r.mNuanceConfig = null, r.mNuanceNetwork = null, 
        r.mNuanceWebSocket = null, r.mNuanceConnect = null, r.mNuanceTTS = null, r.mNuanceASR = null, 
        r.mNuanceNLU = null, r.mDynamicCredentialsFlag = !1, r.mTransaction = null, r.mRunningFlag = !1, 
        r.mDefaultOptions = null, r.mActionTimeoutId = 0, r.mActionTimeout = NUANCE_ACTION_TIMEOUT, 
        r;
    }
    return __extends(e, t), e.prototype.isMock = function() {
        return !1;
    }, e.prototype.getType = function() {
        return NUANCE_TYPE_NAME;
    }, e.prototype.getClass = function() {
        return 'NuancePort';
    }, e.prototype.getVersion = function() {
        return NUANCE_API_VERSION;
    }, e.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.nuanceAppId && (!!t.nuanceAppId && ('string' == typeof t.nuanceAppKey && !!t.nuanceAppKey)));
    }, e.prototype._initAllObject = function(t) {
        var e = this, n = new FileHtml5Reader();
        n.init();
        var r = new AudioHtml5Reader();
        if (r.init({
            audioContext: this.mAudioContext
        }), this.mNuanceConfig = new NuanceConfig(n), 0 !== this.mNuanceConfig.init(t)) return -1;
        if (this.mNuanceNetwork = new NuanceNetwork(), this.mNuanceNetwork.onOnline = function() {
            return e._onOnline();
        }, this.mNuanceNetwork.onOffline = function() {
            return e._onOffline();
        }, this.mNuanceNetwork.onError = function(t) {
            return e._onError(t);
        }, 0 !== this.mNuanceNetwork.init(t)) return -1;
        if (this.mNuanceWebSocket = new NuanceWebSocket(), this.mNuanceWebSocket.onOpen = function(t) {
            return e._onOpen();
        }, this.mNuanceWebSocket.onClose = function() {
            return e._onClose();
        }, this.mNuanceWebSocket.onError = function(t) {
            return e._onError(t);
        }, 0 !== this.mNuanceWebSocket.init(t)) return -1;
        if (this.mNuanceConnect = new NuanceConnect(this.mNuanceWebSocket), this.mNuanceNLU = new NuanceNLU(this.mNuanceConfig, this.mNuanceConnect), 
        this.mNuanceNLU.onStart = function(t) {
            return e._onStart(t.plugin, t.type);
        }, this.mNuanceNLU.onStop = function(t) {
            return e._onStop(t.plugin, t.type);
        }, this.mNuanceNLU.onResult = function(t) {
            return e._onResult(t.result, t.plugin, t.type);
        }, this.mNuanceNLU.onError = function(t) {
            return e._onError(t.error, t.plugin, t.type);
        }, this.mNuanceNLU.onClose = function(t) {
            return e._onClose();
        }, this.mAudioContext) {
            this.mNuanceTTS = new NuanceTTS(this.mNuanceConfig, this.mNuanceConnect, this.mAudioContext), 
            this.mNuanceTTS.onStart = function(t) {
                return e._onStart(t.plugin, t.type);
            }, this.mNuanceTTS.onStop = function(t) {
                return e._onStop(t.plugin, t.type);
            }, this.mNuanceTTS.onResult = function(t) {
                return e._onResult(t.result, t.plugin, t.type);
            }, this.mNuanceTTS.onError = function(t) {
                return e._onError(t.error, t.plugin, t.type);
            }, this.mNuanceTTS.onClose = function(t) {
                return e._onClose();
            };
            try {
                this.mGetUserMedia && (this.mNuanceASR = new NuanceASR(this.mNuanceConfig, this.mNuanceConnect, this.mAudioContext, this.mGetUserMedia, r), 
                this.mNuanceASR.onStart = function(t) {
                    return e._onStart(t.plugin, t.type);
                }, this.mNuanceASR.onStop = function(t) {
                    return e._onStop(t.plugin, t.type);
                }, this.mNuanceASR.onResult = function(t) {
                    return e._onResult(t.result, t.plugin, t.type);
                }, this.mNuanceASR.onError = function(t) {
                    return e._onError(t.error, t.plugin, t.type);
                }, this.mNuanceASR.onClose = function(t) {
                    return e._onClose();
                });
            } catch (t) {
                this._exception('_initAllObject', t);
            }
        }
        return 0;
    }, e.prototype.init = function(e) {
        if (this.mInitFlag) return this._error('init', 'Port ist bereits initialisiert'), 
        0;
        if (e && 'boolean' == typeof e.nuanceDynamicCredentialsFlag && e.nuanceDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0; else if (!this._checkCredentials(e)) return this._error('init', 'keine AppId und/oder AppKey als Parameter uebergeben'), 
        -1;
        var n = FactoryManager.get(AUDIOCONTEXT_FACTORY_NAME, AudioContextFactory);
        if (n) {
            var r = n.create();
            r && (this.mAudioContext = new r());
        }
        var o = FactoryManager.get(USERMEDIA_FACTORY_NAME, UserMediaFactory);
        return o && (this.mGetUserMedia = o.create()), 0 !== this._initAllObject(e) ? -1 : 0 !== t.prototype.init.call(this, e) ? -1 : (this.isErrorOutput() && (this.mNuanceNLU ? console.log('NuancePort: NLU ist vorhanden') : console.log('NuancePort: NLU ist nicht vorhanden'), 
        this.mNuanceTTS ? console.log('NuancePort: TTS ist vorhanden') : console.log('NuancePort: TTS ist nicht vorhanden'), 
        this.mNuanceASR ? console.log('NuancePort: ASR ist vorhanden') : console.log('NuancePort: ASR ist nicht vorhanden')), 
        0);
    }, e.prototype.done = function() {
        return t.prototype.done.call(this), this._clearActionTimeout(), this.mAudioContext && this.mAudioContext.close(), 
        this.mAudioContext = null, this.mGetUserMedia = null, this.mNuanceConfig && (this.mNuanceConfig.done(), 
        this.mNuanceConfig = null), this.mNuanceNetwork && (this.mNuanceNetwork.done(), 
        this.mNuanceNetwork = null), this.mNuanceWebSocket && (this.mNuanceWebSocket.done(), 
        this.mNuanceWebSocket = null), this.mNuanceConnect = null, this.mNuanceTTS = null, 
        this.mNuanceASR = null, this.mNuanceNLU = null, this.mDynamicCredentialsFlag = !1, 
        this.mTransaction = null, this.mRunningFlag = !1, this.mDefaultOptions = null, this.mActionTimeoutId = 0, 
        this.mActionTimeout = NUANCE_ACTION_TIMEOUT, 0;
    }, e.prototype.reset = function(e) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, e);
    }, e.prototype._setErrorOutput = function(e) {
        t.prototype._setErrorOutput.call(this, e), this.mNuanceConfig && this.mNuanceConfig._setErrorOutput(e), 
        this.mNuanceNetwork && this.mNuanceNetwork._setErrorOutput(e), this.mNuanceWebSocket && this.mNuanceWebSocket._setErrorOutput(e), 
        this.mNuanceConnect && this.mNuanceConnect._setErrorOutput(e), this.mNuanceTTS && this.mNuanceTTS._setErrorOutput(e), 
        this.mNuanceASR && this.mNuanceASR._setErrorOutput(e), this.mNuanceNLU && this.mNuanceNLU._setErrorOutput(e);
    }, e.prototype._breakAction = function() {
        this.mActionTimeoutId = 0, this.mTransaction && (this._error('_breakAction', 'Timeout fuer Action erreicht'), 
        this._onStop(this.mTransaction.plugin, this.mTransaction.type));
    }, e.prototype._setActionTimeout = function() {
        var t = this;
        0 === this.mActionTimeoutId && this.mActionTimeout > 0 && (this.mActionTimeoutId = window.setTimeout(function() {
            return t._breakAction();
        }, this.mActionTimeout));
    }, e.prototype._clearActionTimeout = function() {
        this.mActionTimeoutId > 0 && (clearTimeout(this.mActionTimeoutId), this.mActionTimeoutId = 0);
    }, e.prototype._onOnline = function() {
        return 0;
    }, e.prototype._onOffline = function() {
        return this.close(), 0;
    }, e.prototype._onStop = function(e, n) {
        return this._clearActionTimeout(), this.mTransaction = null, this.mRunningFlag = !1, 
        this.mNuanceConnect && this.mNuanceConnect.disconnect(), t.prototype._onStop.call(this, e, n);
    }, e.prototype._unlockAudio = function(t) {
        if (this.mAudioContext) {
            if ('running' === this.mAudioContext.state) return void t(!0);
            if ('suspended' === this.mAudioContext.state) {
                var e = setTimeout(function() {
                    return t(!1);
                }, AUDIO_UNLOCK_TIMEOUT);
                this.mAudioContext.resume().then(function() {
                    clearTimeout(e), t(!0);
                }, function(n) {
                    console.log('NuancePort._unlockAudio:', n), clearTimeout(e), t(!1);
                });
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
        var e = this;
        return this.isOnline() ? this.isOpen() ? (t(!0), 0) : 'CLOSING' === this.mNuanceWebSocket.getState() ? (this._error('_checkOpen', 'Websocket wird geschlossen'), 
        t(!1), -1) : this.mNuanceWebSocket ? (this.mNuanceWebSocket.onOpen = function(n) {
            return e.mNuanceWebSocket.onOpen = function(t) {
                return e._onOpen();
            }, e.mNuanceWebSocket.onClose = function() {
                return e._onClose();
            }, e.mNuanceWebSocket.onError = function(t) {
                return e._onError(t);
            }, t(!0), 0;
        }, this.mNuanceWebSocket.onClose = function() {
            return e.mNuanceWebSocket.onOpen = function(t) {
                return e._onOpen();
            }, e.mNuanceWebSocket.onClose = function() {
                return e._onClose();
            }, e.mNuanceWebSocket.onError = function(t) {
                return e._onError(t);
            }, t(!1), 0;
        }, this.mNuanceWebSocket.onError = function(n) {
            return e.mNuanceWebSocket.onOpen = function(t) {
                return e._onOpen();
            }, e.mNuanceWebSocket.onClose = function() {
                return e._onClose();
            }, e.mNuanceWebSocket.onError = function(t) {
                return e._onError(t);
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
    }, e.prototype.isRunning = function(t, e) {
        if (!t && !e) return this.mRunningFlag;
        if (t === this.getPluginName()) {
            if (!e) return this.mRunningFlag;
            if (e === this.getActionName()) return this.mRunningFlag;
        }
        return !1;
    }, e.prototype.isAction = function(t) {
        var e = !1;
        switch (t) {
          case NUANCE_NLU_ACTION:
            e = !!this.mNuanceNLU;
            break;

          case NUANCE_ASRNLU_ACTION:
          case NUANCE_ASR_ACTION:
            e = !!this.mNuanceASR;
            break;

          case NUANCE_TTS_ACTION:
            e = !!this.mNuanceTTS;
        }
        return e;
    }, e.prototype.setActionTimeout = function(t) {
        this.mActionTimeout = t;
    }, e.prototype.start = function(t, e, n) {
        var r = this;
        return this.isRunning() ? (this._error('start', 'Aktion laeuft bereits'), -1) : this.mNuanceConfig.isCredentials() ? this.mTransaction ? (this._error('start', 'andere Transaktion laeuft noch'), 
        -1) : this._checkOpen(function(o) {
            if (!o) return -1;
            r._setActionTimeout();
            var i = n || {};
            r.mPluginName = t, r.mRunningFlag = !0;
            var a = 0;
            switch (e) {
              case NUANCE_NLU_ACTION:
                r.mTransaction = new NuanceTransaction(t, NUANCE_NLU_ACTION), a = r._startNLU(r.mTransaction, i.text, i.language || NUANCE_DEFAULT_LANGUAGE);
                break;

              case NUANCE_ASRNLU_ACTION:
                r.mTransaction = new NuanceTransaction(t, NUANCE_ASRNLU_ACTION), a = r._startASR(r.mTransaction, i.language || NUANCE_DEFAULT_LANGUAGE, i.audioURL || '', !0, i.useProgressive || !1);
                break;

              case NUANCE_ASR_ACTION:
                r.mTransaction = new NuanceTransaction(t, NUANCE_ASR_ACTION), a = r._startASR(r.mTransaction, i.language || NUANCE_DEFAULT_LANGUAGE, i.audioURL || '', !1, i.useProgressive || !1);
                break;

              case NUANCE_TTS_ACTION:
                r.mTransaction = new NuanceTransaction(t, NUANCE_TTS_ACTION), a = r._startTTS(r.mTransaction, i.text, i.language || NUANCE_DEFAULT_LANGUAGE, i.voice || NUANCE_DEFAULT_VOICE);
                break;

              default:
                r._clearActionTimeout(), r._error('start', 'Keine gueltige Aktion uebergeben ' + e), 
                a = -1;
            }
            return a;
        }) : (this._error('start', 'Port hat keine Credentials'), -1);
    }, e.prototype.stop = function(t, e, n) {
        if (!this.isRunning()) return 0;
        if (!this.isOpen()) return this._error('stop', 'Port ist nicht geoeffnet'), -1;
        if (!this.mNuanceConfig.isCredentials()) return this._error('stop', 'Port hat keine Credentials'), 
        -1;
        if (!this.mTransaction) return this._error('stop', 'keine Transaktion vorhanden'), 
        -1;
        if (t !== this.mTransaction.plugin) return this._error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + t + ' != ' + this.mTransaction.plugin), 
        -1;
        if (e) {
            if (e !== this.mTransaction.type) return this._error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + e + ' != ' + this.mTransaction.type), 
            -1;
        } else e = this.mTransaction.type;
        var r = 0;
        switch (e) {
          case NUANCE_NLU_ACTION:
            r = this._stopNLU(this.mTransaction);
            break;

          case NUANCE_ASRNLU_ACTION:
          case NUANCE_ASR_ACTION:
            r = this._stopASR(this.mTransaction);
            break;

          case NUANCE_TTS_ACTION:
            r = this._stopTTS(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + e), r = -1;
        }
        return this.mRunningFlag = !1, r;
    }, e.prototype._initRecognition = function(t) {
        var e = this;
        return this.mDefaultOptions = {
            onopen: function() {
                console.log('Websocket Opened');
            },
            onclose: function() {
                console.log('Websocket Closed'), e._onClose();
            },
            onerror: function(t) {
                console.error(t), e._onError(t);
            }
        }, 0;
    }, e.prototype._isConnect = function() {
        return !!this.mNuanceWebSocket && this.mNuanceWebSocket.isConnect();
    }, e.prototype._connect = function(t) {
        if (this._isConnect()) return 0;
        if (!this.mNuanceWebSocket) return this._error('_connect', 'kein NuanceWebSocket vorhanden'), 
        -1;
        try {
            return this.mNuanceWebSocket.connect(this.mNuanceConfig.serverUrl || NUANCE_DEFAULT_URL), 
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
    }, e.prototype._startNLU = function(t, e, n) {
        if (!e) return this._error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!n) return this._error('_startNLU', 'keine Sprache uebergeben'), -1;
        if (!this.mNuanceNLU) return this._error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden'), 
        -1;
        try {
            var r = {
                text: e,
                language: n
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
    }, e.prototype._startASR = function(t, e, n, r, o) {
        if (void 0 === r && (r = !1), void 0 === o && (o = !1), !e) return this._error('_startASR', 'keine Sprache uebergeben'), 
        -1;
        if (!this.mNuanceASR) return this._error('_startASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            var i = {
                language: e,
                nlu: r,
                progressive: o
            };
            return n && (i.audioURL = n), this.mNuanceASR.start(t, i);
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
    }, e.prototype._startTTS = function(t, e, n, r) {
        var o = this;
        if (!e) return this._error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.mNuanceTTS) return this._error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            var i = {
                text: e,
                language: n,
                voice: r
            };
            return this._unlockAudio(function(e) {
                e ? o.mNuanceTTS.start(t, i) : (o._error('_startTTS', 'AudioContext ist nicht entsperrt'), 
                o._onStop(t.plugin, t.type));
            }), 0;
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
}(Port), NUANCEMOCK_CALLBACK_TIMEOUT = 100, NuanceMock = function(t) {
    function e(e, n) {
        void 0 === n && (n = !0);
        var r = t.call(this, e || NUANCE_MOCK_NAME, n) || this;
        return r.webSocketFlag = !0, r.audioContextFlag = !0, r.getUserMediaFlag = !0, r.nuanceNLUFlag = !0, 
        r.nuanceASRFlag = !0, r.nuanceTTSFlag = !0, r.disconnectFlag = !0, r.defaultOptions = null, 
        r.codec = '', r.intentName = 'TestIntent', r.intentConfidence = 1, r.mDynamicCredentialsFlag = !1, 
        r.mTransaction = null, r.mRunningFlag = !1, r.nuanceAppId = '', r.nuanceAppKey = '', 
        r.nuanceNluTag = '', r;
    }
    return __extends(e, t), e.prototype.isMock = function() {
        return !0;
    }, e.prototype.getType = function() {
        return NUANCE_TYPE_NAME;
    }, e.prototype.getClass = function() {
        return 'NuanceMock';
    }, e.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.nuanceAppId && (this.nuanceAppId = t.nuanceAppId), 
        'string' == typeof t.nuanceAppKey && (this.nuanceAppKey = t.nuanceAppKey), 'string' == typeof t.nuanceNluTag && (this.nuanceNluTag = t.nuanceNluTag), 
        'string' == typeof t.nuanceAppId && (!!t.nuanceAppId && ('string' == typeof t.nuanceAppKey && !!t.nuanceAppKey)));
    }, e.prototype.init = function(e) {
        if (this.mInitFlag) return this._error('init', 'Init bereits aufgerufen'), 0;
        if (e && 'boolean' == typeof e.nuanceDynamicCredentialsFlag && e.nuanceDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0, 
        this._checkCredentials(e); else if (!this._checkCredentials(e)) return (this.isErrorOutput() || e && e.errorOutputFlag) && this._error('init', 'keine AppId und/oder AppKey als Parameter uebergeben'), 
        -1;
        return this.webSocketFlag ? (this.audioContextFlag || (this._error('init', 'kein Audiokontext vorhanden, TTS und ASR werden abgeschaltet'), 
        this._onInit(-1)), this.nuanceNLUFlag = !0, this.audioContextFlag && (this.nuanceASRFlag = !0, 
        this.getUserMediaFlag && (this.nuanceTTSFlag = !0)), this.isErrorOutput() && (this.nuanceNLUFlag ? console.log('NuanceMock: NLU ist vorhanden') : console.log('NuanceMock: NLU ist nicht vorhanden'), 
        this.nuanceTTSFlag ? console.log('NuanceMock: TTS ist vorhanden') : console.log('NuanceMock: TTS ist nicht vorhanden'), 
        this.nuanceASRFlag ? console.log('NuanceMock: ASR ist vorhanden') : console.log('NuanceMock: ASR ist nicht vorhanden')), 
        this._onInit(0), t.prototype.init.call(this, e)) : (this._error('init', 'keine WebSocket vorhanden'), 
        this._onInit(-1), -1);
    }, e.prototype.done = function(e) {
        return void 0 === e && (e = !1), t.prototype.done.call(this), this.webSocketFlag = !0, 
        this.audioContextFlag = !0, this.getUserMediaFlag = !0, this.nuanceNLUFlag = !1, 
        this.nuanceASRFlag = !1, this.nuanceTTSFlag = !1, this.disconnectFlag = !0, this.defaultOptions = null, 
        this.codec = '', this.mTransaction = null, this.mRunningFlag = !1, 0;
    }, e.prototype.reset = function(e) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, e);
    }, e.prototype._onStop = function(e, n) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype._onStop.call(this, e, n);
    }, e.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this._error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return this.nuanceAppId = t.nuanceAppId, this.nuanceAppKey = t.nuanceAppKey, 'string' == typeof t.nuanceNluTag && (this.nuanceNluTag = t.nuanceNluTag), 
            0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, e.prototype.getConfig = function() {
        return {
            nuanceAppId: this.nuanceAppId,
            nuanceAppKey: this.nuanceAppKey,
            nuanceNluTag: this.nuanceNluTag
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
        return !(!this.nuanceAppId || !this.nuanceAppKey);
    }, e.prototype.isAction = function(t) {
        var e = !1;
        switch (t) {
          case NUANCE_NLU_ACTION:
            e = this.nuanceNLUFlag;
            break;

          case NUANCE_ASRNLU_ACTION:
          case NUANCE_ASR_ACTION:
            e = this.nuanceASRFlag;
            break;

          case NUANCE_TTS_ACTION:
            e = this.nuanceTTSFlag;
        }
        return e;
    }, e.prototype.start = function(t, e, n) {
        if (this.isRunning()) return this._error('start', 'Aktion laeuft bereits'), -1;
        if (!this.isOpen()) return this._error('start', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this._error('start', 'Port hat keine Credentials'), 
        -1;
        if (this.mTransaction) return this._error('start', 'andere Transaktion laeuft noch'), 
        -1;
        var r = n || {};
        this.mRunningFlag = !0;
        var o = 0;
        switch (e) {
          case NUANCE_NLU_ACTION:
            this.mTransaction = new NuanceTransaction(t, NUANCE_NLU_ACTION), o = this._startNLU(this.mTransaction, r.text, r.language || NUANCE_DEFAULT_LANGUAGE);
            break;

          case NUANCE_ASRNLU_ACTION:
            this.mTransaction = new NuanceTransaction(t, NUANCE_ASRNLU_ACTION), o = this._startASR(this.mTransaction, r.language || NUANCE_DEFAULT_LANGUAGE, r.audioURL || '', !0, r.useProgressive || !1);
            break;

          case NUANCE_ASR_ACTION:
            this.mTransaction = new NuanceTransaction(t, NUANCE_ASR_ACTION), o = this._startASR(this.mTransaction, r.language || NUANCE_DEFAULT_LANGUAGE, r.audioURL || '', !1, r.useProgressive || !1);
            break;

          case NUANCE_TTS_ACTION:
            this.mTransaction = new NuanceTransaction(t, NUANCE_TTS_ACTION), o = this._startTTS(this.mTransaction, r.text, r.language || NUANCE_DEFAULT_LANGUAGE, r.voice || NUANCE_DEFAULT_VOICE);
            break;

          default:
            this._error('start', 'Keine gueltige Aktion uebergeben ' + e), o = -1;
        }
        return o;
    }, e.prototype.stop = function(t, e, n) {
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
        var r = 0;
        switch (e) {
          case NUANCE_NLU_ACTION:
            r = this._stopNLU(this.mTransaction);
            break;

          case NUANCE_ASRNLU_ACTION:
          case NUANCE_ASR_ACTION:
            r = this._stopASR(this.mTransaction);
            break;

          case NUANCE_TTS_ACTION:
            r = this._stopTTS(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + e), r = -1;
        }
        return this.mTransaction = null, this.mRunningFlag = !1, r;
    }, e.prototype._startNLU = function(t, e, n) {
        if (!e) return this._error('_startNLU', 'keinen Text uebergeben'), -1;
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
                literal: e
            } ];
            return t.result = r, this._onResult(t.result, t.plugin, t.type), this._onStop(t.plugin, t.type), 
            0;
        } catch (t) {
            return this._exception('_startNLU', t), -1;
        }
    }, e.prototype._stopNLU = function(t) {
        return this._onStop(t.plugin, t.type), 0;
    }, e.prototype._startASR = function(t, e, n, r, o) {
        if (void 0 === r && (r = !1), void 0 === o && (o = !1), !this.nuanceASRFlag) return this._error('_startASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), t.result = "Testtext", this._onResult(t.result, t.plugin, t.type), 
            this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_startASR', t), -1;
        }
    }, e.prototype._stopASR = function(t) {
        if (!this.nuanceASRFlag) return this._error('_stopASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_stopASR', t), -1;
        }
    }, e.prototype._startTTS = function(t, e, n, r) {
        var o = this;
        if (!e) return this._error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.nuanceTTSFlag) return this._error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), setTimeout(function() {
                return o._onStop(t.plugin, t.type);
            }, NUANCEMOCK_CALLBACK_TIMEOUT), 0;
        } catch (t) {
            return this._exception('_startTTS', t), -1;
        }
    }, e.prototype._stopTTS = function(t) {
        if (!this.nuanceTTSFlag) return this._error('_stopTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_stopTTS', t), -1;
        }
    }, e;
}(Port), Nuance = function() {
    function t() {}
    return t.setErrorOutputOn = function() {
        t.mErrorOutputFlag = !0, PortManager.setErrorOutputOn();
    }, t.setErrorOutputOff = function() {
        t.mErrorOutputFlag = !1, PortManager.setErrorOutputOff();
    }, t.setErrorOutputFunc = function(t) {
        PortManager._setErrorOutputFunc(t);
    }, t._initNuancePort = function(e) {
        var n = PortManager.get(NUANCE_TYPE_NAME, NuancePort);
        return n ? 0 !== n.init(e) ? (PortManager.remove(NUANCE_TYPE_NAME), -1) : (t.mCurrentPort = n, 
        0) : -1;
    }, t._initNuanceMock = function(e) {
        var n = PortManager.get(NUANCE_TYPE_NAME, NuanceMock);
        return n ? 0 !== n.init(e) ? (console.log('Nuance._initNuanceMock: Error NuanceMock wurde nicht initialisiert'), 
        PortManager.remove(NUANCE_TYPE_NAME), -1) : (t.mCurrentPort = n, 0) : (console.log('Nuance._initNuanceMock: Error NuanceMock wurde nicht erzeugt'), 
        -1);
    }, t.init = function(e) {
        if (t.mInitFlag) return 0;
        if (!e) return t.mErrorOutputFlag && console.log('Nuance.init: Keine Nuance-Parameter uebergeben'), 
        -1;
        'boolean' == typeof e.errorOutputFlag && (e.errorOutputFlag ? t.setErrorOutputOn() : t.setErrorOutputOff());
        var n = 'NuancePort';
        if (e && 'string' == typeof e.nuancePortName && 'NuanceMock' === e.nuancePortName && (n = 'NuanceMock'), 
        'NuancePort' === n) {
            if (0 !== t._initNuancePort(e)) return -1;
        } else {
            if ('NuanceMock' !== n) return t.mErrorOutputFlag && console.log('Nuance.init: Kein Nuance PortName vorhanden'), 
            -1;
            if (0 !== t._initNuanceMock(e)) return -1;
        }
        return t.mInitFlag = !0, 0;
    }, t.isInit = function() {
        return t.mInitFlag;
    }, t.done = function() {
        var e = PortManager.find(NUANCE_TYPE_NAME);
        e || (e = t.mCurrentPort);
        var n = 0;
        return e && (n = e.done(), PortManager.remove(NUANCE_TYPE_NAME)), t.mCurrentPort = null, 
        t.mInitFlag = !1, n;
    }, t._onOpenEvent = function(e, n, r, o) {
        if ('function' == typeof o) try {
            return o(e, n, r), 0;
        } catch (e) {
            return t.mErrorOutputFlag && console.log('Nuance._onOpenEvent: Exception', e.message), 
            -1;
        }
        return 0;
    }, t._openNuancePort = function(e) {
        var n = PortManager.find(NUANCE_TYPE_NAME);
        return n || (n = t.mCurrentPort), n ? (n.addOpenEvent(NUANCE_TYPE_NAME, function(r) {
            return n.removeErrorEvent(NUANCE_TYPE_NAME), n.removeOpenEvent(NUANCE_TYPE_NAME), 
            'function' == typeof e && t._onOpenEvent(null, NUANCE_TYPE_NAME, r.result, e), r.result;
        }), n.addErrorEvent(NUANCE_TYPE_NAME, function(r) {
            return n.removeOpenEvent(NUANCE_TYPE_NAME), n.removeErrorEvent(NUANCE_TYPE_NAME), 
            'function' == typeof e && t._onOpenEvent(r, NUANCE_TYPE_NAME, -1, e), 0;
        }), n.open()) : (t.mErrorOutputFlag && console.log('Nuance._openNuancePort: kein Port vorhanden'), 
        t._onOpenEvent(new Error('Nuance._openNUancePort: Kein Port vorhanden'), NUANCE_TYPE_NAME, -1, e), 
        -1);
    }, t.open = function(e) {
        return t.mInitFlag ? t._openNuancePort(e) : (t.mErrorOutputFlag && console.log('Nuance.open: Init wurde nicht aufgerufen'), 
        t._onOpenEvent(new Error('Nuance.open: Init wurde nicht aufgerufen'), NUANCE_TYPE_NAME, -1, e), 
        -1);
    }, t.setConfig = function(e) {
        return t.mCurrentPort ? t.mCurrentPort.setConfig(e) : -1;
    }, t.getConfig = function() {
        return t.mCurrentPort ? t.mCurrentPort.getConfig() : {
            nuanceAppId: '',
            nuanceAppKey: ''
        };
    }, t.mInitFlag = !1, t.mErrorOutputFlag = !1, t.mCurrentPort = null, t;
}();

export { NUANCE_TYPE_NAME, NUANCE_TTS_ACTION, NUANCE_ASR_ACTION, NUANCE_ASRNLU_ACTION, NUANCE_NLU_ACTION, Nuance };
