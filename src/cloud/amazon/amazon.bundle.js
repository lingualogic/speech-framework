/**
 * Speech-Amazon
 * 
 * Version: 0.1.0
 * Build:   0001
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

import { Port } from '../../core/port/port.ts';

import { FileHtml5Reader } from '../../common/html5/file-html5-reader.ts';

import { AudioHtml5Reader } from '../../common/html5/audio-html5-reader.ts';

import { AudioContextFactory, AUDIOCONTEXT_FACTORY_NAME } from '../../common/html5/audiocontext-factory.ts';

import { PortManager } from '../../core/port/port-manager.ts';

var AMAZON_TYPE_NAME = 'Amazon', AMAZON_PORT_NAME = 'AmazonPort', AMAZON_MOCK_NAME = 'AmazonMock', AMAZON_SERVER_URL = '', AMAZON_DEFAULT_URL = AMAZON_SERVER_URL, AMAZON_NLU_ACTION = 'NLU', AMAZON_ASR_ACTION = 'ASR', AMAZON_ASRNLU_ACTION = 'ASRNLU', AMAZON_TTS_ACTION = 'TTS', AMAZON_CONFIG_PATH = 'assets/', AMAZON_CONFIG_FILE = 'amazon.json', AMAZON_CONFIG_LOAD = !1, AMAZON_DE_LANGUAGE = 'de-DE', AMAZON_DEFAULT_LANGUAGE = AMAZON_DE_LANGUAGE, AMAZON_TTS_VOICE1 = 'Vicki', AMAZON_TTS_VOICE = AMAZON_TTS_VOICE1, AMAZON_DEFAULT_VOICE = AMAZON_TTS_VOICE, AMAZON_PCM_CODEC = 'audio/L16;rate=16000', AMAZON_AUDIOSAMPLE_RATE = 16e3, AMAZON_AUDIO_FORMAT = 'pcm', extendStatics = function(t, n) {
    return (extendStatics = Object.setPrototypeOf || {
        __proto__: []
    } instanceof Array && function(t, n) {
        t.__proto__ = n;
    } || function(t, n) {
        for (var o in n) n.hasOwnProperty(o) && (t[o] = n[o]);
    })(t, n);
};

function __extends(t, n) {
    function o() {
        this.constructor = t;
    }
    extendStatics(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, 
    new o());
}

var Factory = function(t) {
    function n(n, o) {
        void 0 === o && (o = !0);
        var e = t.call(this, n || 'Factory') || this;
        if (o && 0 !== FactoryManager.insert(e.getName(), e)) throw new Error('Factory ' + e.getName() + ' existiert bereits im FactoryManager');
        return e;
    }
    return __extends(n, t), n.prototype.isMock = function() {
        return !1;
    }, n.prototype.getType = function() {
        return 'any';
    }, n.prototype.getName = function() {
        return 'Factory';
    }, n.prototype.create = function(t, n) {
        return void 0 === n && (n = !0), null;
    }, n;
}(ErrorBase), USERMEDIA_FACTORY_NAME = 'UserMediaFactory', USERMEDIA_TYPE_NAME = 'UserMedia', UserMediaFactory = function(t) {
    function n(n, o) {
        return void 0 === o && (o = !0), t.call(this, n || USERMEDIA_FACTORY_NAME, o) || this;
    }
    return __extends(n, t), n.prototype.isMock = function() {
        return !1;
    }, n.prototype.getType = function() {
        return USERMEDIA_TYPE_NAME;
    }, n.prototype.getName = function() {
        return USERMEDIA_FACTORY_NAME;
    }, n.prototype.create = function(t, n) {
        void 0 === n && (n = !0);
        try {
            if (void 0 === navigator.mediaDevices && (console.log('UserMediaFactory: no mediaDevices'), 
            navigator.mediaDevices = {}), void 0 === navigator.mediaDevices.getUserMedia) {
                console.log('UserMediaFactory: no getUserMedia');
                var o = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || null;
                if (!o) return null;
                navigator.mediaDevices.getUserMedia = function(t) {
                    return new Promise(function(n, e) {
                        o.call(navigator, t, n, e);
                    });
                };
            }
            return function(t) {
                return navigator.mediaDevices.getUserMedia(t);
            };
        } catch (t) {
            return this._exception('create', t), null;
        }
    }, n;
}(Factory), AMAZON_VERSION_NUMBER = '0.1.0', AMAZON_VERSION_BUILD = '0001', AMAZON_VERSION_TYPE = 'ALPHA', AMAZON_VERSION_DATE = '07.04.2019', AMAZON_VERSION_STRING = AMAZON_VERSION_NUMBER + '.' + AMAZON_VERSION_BUILD + ' vom ' + AMAZON_VERSION_DATE + ' (' + AMAZON_VERSION_TYPE + ')', AMAZON_API_VERSION = AMAZON_VERSION_STRING, AmazonTransaction = function() {
    function t(n, o) {
        void 0 === n && (n = ''), void 0 === o && (o = ''), this.transactionId = 0, this.plugin = '', 
        this.type = '', this.result = null, this.error = null, this.plugin = n, this.type = o, 
        t.mTransactionCounter += 1, this.transactionId = t.mTransactionCounter;
    }
    return t.mTransactionCounter = 0, t;
}(), AmazonConfig = function(t) {
    function n(n) {
        var o = t.call(this, 'AmazonConfig') || this;
        return o.mInitFlag = !1, o.mConfigPath = AMAZON_CONFIG_PATH, o.mConfigFile = AMAZON_CONFIG_FILE, 
        o.mConfigLoadFlag = AMAZON_CONFIG_LOAD, o.mConfigServerUrl = AMAZON_DEFAULT_URL, 
        o.mConfigRegion = '', o.mConfigIdentityPoolId = '', o.mConfigUserId = '', o.mConfigNluTag = '', 
        o.mFileReader = null, o.mOnInitFunc = null, o.mOnErrorFunc = null, o.mFileReader = n, 
        o._setErrorOutputFunc(function(t) {
            return o._onError(new Error(t));
        }), o;
    }
    return __extends(n, t), n.prototype._setOption = function(t) {
        t && ('string' == typeof t.amazonConfigPath && (this.mConfigPath = t.amazonConfigPath), 
        'string' == typeof t.amazonConfigFile && (this.mConfigFile = t.amazonConfigFile), 
        'boolean' == typeof t.amazonConfigLoadFlag && (this.mConfigLoadFlag = t.amazonConfigLoadFlag), 
        'string' == typeof t.amazonServerUrl && (this.mConfigServerUrl = t.amazonServerUrl), 
        'string' == typeof t.amazonRegion && (this.mConfigRegion = t.amazonRegion), 'string' == typeof t.amazonIdentityPoolId && (this.mConfigIdentityPoolId = t.amazonIdentityPoolId), 
        'string' == typeof t.amazonUserId && (this.mConfigUserId = t.amazonUserId), 'string' == typeof t.amazonNluTag && (this.mConfigNluTag = t.amazonNluTag));
    }, n.prototype.init = function(t) {
        return this._setOption(t), this.mInitFlag = !0, 0;
    }, n.prototype.done = function() {
        return this.mInitFlag = !1, this.mConfigPath = AMAZON_CONFIG_PATH, this.mConfigFile = AMAZON_CONFIG_FILE, 
        this.mConfigLoadFlag = AMAZON_CONFIG_LOAD, this.mConfigServerUrl = AMAZON_DEFAULT_URL, 
        this.mConfigRegion = '', this.mConfigIdentityPoolId = '', this.mConfigUserId = '', 
        this.mConfigNluTag = '', this.mFileReader = null, this.mOnInitFunc = null, 0;
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
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "region", {
        get: function() {
            return this.mConfigRegion;
        },
        set: function(t) {
            this.mConfigRegion = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "identityPoolId", {
        get: function() {
            return this.mConfigIdentityPoolId;
        },
        set: function(t) {
            this.mConfigIdentityPoolId = t;
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
        return !(!this.mConfigIdentityPoolId || !this.mConfigRegion);
    }, n;
}(ErrorBase), NetHtml5Connect = function(t) {
    function n(n) {
        var o = t.call(this, n || 'NetHtml5Connect') || this;
        return o.mInitFlag = !1, o.mOnOnlineFunc = null, o.mOnOfflineFunc = null, o.mOnErrorFunc = null, 
        o._setErrorOutputFunc(function(t) {
            return o._onError(new Error(t));
        }), o;
    }
    return __extends(n, t), n.prototype.init = function(t) {
        var n = this;
        try {
            window && (window.ononline = function() {
                return n._onOnline();
            }, window.onoffline = function() {
                return n._onOffline();
            });
        } catch (t) {
            return this._exception('init', t), -1;
        }
        return this.mInitFlag = !0, 0;
    }, n.prototype.isInit = function() {
        return this.mInitFlag;
    }, n.prototype.done = function() {
        return window.ononline = null, window.onoffline = null, this.mOnOnlineFunc = null, 
        this.mOnOfflineFunc = null, this.mOnErrorFunc = null, this.mInitFlag = !1, 0;
    }, n.prototype.isOnline = function() {
        return !!navigator && navigator.onLine;
    }, Object.defineProperty(n.prototype, "onOnline", {
        set: function(t) {
            this.mOnOnlineFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "onOffline", {
        set: function(t) {
            this.mOnOfflineFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), n.prototype._onOnline = function() {
        if ('function' == typeof this.mOnOnlineFunc) try {
            return this.mOnOnlineFunc();
        } catch (t) {
            return this._exception('_onOnline', t), -1;
        }
        return 0;
    }, n.prototype._onOffline = function() {
        if ('function' == typeof this.mOnOfflineFunc) try {
            return this.mOnOfflineFunc();
        } catch (t) {
            return this._exception('_onOffline', t), -1;
        }
        return 0;
    }, n.prototype._onError = function(t) {
        if ('function' == typeof this.mOnErrorFunc) try {
            return this.mOnErrorFunc(t);
        } catch (t) {
            return this.isErrorOutput() && console.log('===> EXCEPTION NetHtml5Connect._onError: ', t.message), 
            -1;
        }
        return 0;
    }, n;
}(ErrorBase), AmazonNetwork = function(t) {
    function n() {
        return t.call(this, 'AmazonNetwork') || this;
    }
    return __extends(n, t), n;
}(NetHtml5Connect), AmazonConnect = function(t) {
    function n(n) {
        var o = t.call(this, 'AmazonConnect') || this;
        return o.mConfig = null, o.mConnectFlag = !1, o.mConfig = n, o;
    }
    return __extends(n, t), n.prototype.isConnect = function() {
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
}(ErrorBase), AmazonDevice = function(t) {
    function n(n, o, e) {
        var r = t.call(this, n || 'AmazonDevice') || this;
        return r.mConfig = null, r.mConnect = null, r.mTransaction = null, r.onStart = null, 
        r.onStop = null, r.onResult = null, r.onError = null, r.onClose = null, r.mConfig = o, 
        r.mConnect = e, r;
    }
    return __extends(n, t), n.prototype._onStart = function() {
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
}(ErrorBase), AmazonASR = function(t) {
    function n(n, o, e, r, i) {
        var a = t.call(this, 'AmazonASR', n, o) || this;
        return a.mAudioContext = null, a.mGetUserMedia = null, a.mAudioReader = null, a.mAudioRecorder = null, 
        a.mUserMediaStream = null, a.mRequestId = 0, a.mVolumeCounter = 0, a.mTimeoutCounter = 0, 
        a.mRecordingFlag = !1, a.mAudioContext = e, a.mGetUserMedia = r, a.mAudioReader = i, 
        a;
    }
    return __extends(n, t), n.prototype._startAudio = function(t) {}, n.prototype._startASR = function(t) {}, 
    n.prototype._start = function(t) {
        return this._error('_start', 'ASR ist nicht implementiert'), -1;
    }, n.prototype._stop = function() {
        return this._error('_stop', 'ASR ist nicht implementiert'), -1;
    }, n;
}(AmazonDevice), PCM_L16CodecArray = [ 'audio/L16;rate=8000', 'audio/L16;rate=16000' ], AmazonAudioCodec = function(t) {
    function n() {
        return t.call(this, 'AmazonAudioCodec') || this;
    }
    return __extends(n, t), n.prototype._findCodec = function(t, n) {
        for (var o = 0; o < n.length; o++) if (t === n[o]) return !0;
        return !1;
    }, n.prototype.findPcmCodec = function(t) {
        return this._findCodec(t, PCM_L16CodecArray);
    }, n.prototype._float32ToInt16 = function(t) {
        var n = t < 0 ? 32768 * t : 32767 * t;
        return Math.max(-32768, Math.min(32768, n));
    }, n.prototype._float32ArrayToInt16Array = function(t) {
        for (var n = new Int16Array(t.length), o = 0; o < t.length; ) n[o] = this._float32ToInt16(t[o++]);
        return n;
    }, n.prototype.encodePCM = function(t, n) {
        return this.findPcmCodec(n) ? [ this._float32ArrayToInt16Array(t) ] : [ t ];
    }, n.prototype.decodePCM = function(t) {
        try {
            for (var n = new Uint8Array(t), o = n.length, e = new Float32Array(o / 2), r = new Int16Array(1), i = 0, a = 0; a < o; a += 2) r[0] = (n[a + 1] << 8) + n[a], 
            e[i] = r[0] / 32768, i++;
            return e;
        } catch (t) {
            return this._exception('decodePCM', t), [];
        }
    }, n;
}(ErrorBase), AmazonResampler = function() {
    function t(t, n, o, e, r) {
        this.fromSampleRate = 0, this.toSampleRate = 0, this.channels = 0, this.outputBufferSize = 0, 
        this.noReturn = !1, this.resampler = null, this.ratioWeight = 0, this.interpolate = null, 
        this.lastWeight = 0, this.outputBuffer = null, this.lastOutput = null, this.fromSampleRate = t, 
        this.toSampleRate = n, this.channels = o || 0, this.outputBufferSize = e, this.noReturn = !!r, 
        this.initialize();
    }
    return t.prototype.initialize = function() {
        if (!(this.fromSampleRate > 0 && this.toSampleRate > 0 && this.channels > 0)) throw new Error('Invalid settings specified for the resampler.');
        this.fromSampleRate === this.toSampleRate ? (this.resampler = this.bypassResampler, 
        this.ratioWeight = 1) : (this.compileInterpolationFunction(), this.resampler = this.interpolate, 
        this.ratioWeight = this.fromSampleRate / this.toSampleRate, this.tailExists = !1, 
        this.lastWeight = 0, this.initializeBuffers());
    }, t.prototype.compileInterpolationFunction = function() {
        for (var t = 'var bufferLength = Math.min(buffer.length, this.outputBufferSize);        if ((bufferLength % ' + this.channels + ') == 0) {            if (bufferLength > 0) {                var ratioWeight = this.ratioWeight;                var weight = 0;', n = 0; n < this.channels; ++n) t += 'var output' + n + ' = 0;';
        t += 'var actualPosition = 0;                var amountToNext = 0;                var alreadyProcessedTail = !this.tailExists;                this.tailExists = false;                var outputBuffer = this.outputBuffer;                var outputOffset = 0;                var currentPosition = 0;                do {                    if (alreadyProcessedTail) {                        weight = ratioWeight;';
        for (n = 0; n < this.channels; ++n) t += 'output' + n + ' = 0;';
        t += '}                    else {                        weight = this.lastWeight;';
        for (n = 0; n < this.channels; ++n) t += 'output' + n + ' = this.lastOutput[' + n + '];';
        t += 'alreadyProcessedTail = true;                    }                    while (weight > 0 && actualPosition < bufferLength) {                        amountToNext = 1 + actualPosition - currentPosition;                        if (weight >= amountToNext) {';
        for (n = 0; n < this.channels; ++n) t += 'output' + n + ' += buffer[actualPosition++] * amountToNext;';
        t += 'currentPosition = actualPosition;                            weight -= amountToNext;                        }                        else {';
        for (n = 0; n < this.channels; ++n) t += 'output' + n + ' += buffer[actualPosition' + (n > 0 ? ' + ' + n : '') + '] * weight;';
        t += 'currentPosition += weight;                            weight = 0;                            break;                        }                    }                    if (weight == 0) {';
        for (n = 0; n < this.channels; ++n) t += 'outputBuffer[outputOffset++] = output' + n + ' / ratioWeight;';
        t += '}                    else {                        this.lastWeight = weight;';
        for (n = 0; n < this.channels; ++n) t += 'this.lastOutput[' + n + '] = output' + n + ';';
        t += 'this.tailExists = true;                        break;                    }                } while (actualPosition < bufferLength);                return this.bufferSlice(outputOffset);            }            else {                return (this.noReturn) ? 0 : [];            }        }        else {            throw(new Error("Buffer was of incorrect sample length."));        }', 
        this.interpolate = Function('buffer', t);
    }, t.prototype.bypassResampler = function(t) {
        return this.noReturn ? (this.outputBuffer = t, t.length) : t;
    }, t.prototype.bufferSlice = function(t) {
        if (this.noReturn) return t;
        try {
            return this.outputBuffer.subarray(0, t);
        } catch (n) {
            try {
                return this.outputBuffer.length = t, this.outputBuffer;
            } catch (n) {
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
}(), AUDIO_MIN_SAMPLERATE = 22500, AmazonAudioPlayer = function(t) {
    function n(n) {
        var o = t.call(this, 'AmazonAudioPlayer') || this;
        return o.mAudioContext = null, o.mAudioCodec = null, o.mResampler = null, o.mOnAudioStartFunc = null, 
        o.mOnAudioStopFunc = null, o.mAudioSource = null, o.mAudioArray = [], o.mQueue = [], 
        o.mBeginSpeakFlag = !0, o.mAudioStopFlag = !1, o.mAudioContext = n, o.mAudioCodec = new AmazonAudioCodec(), 
        o;
    }
    return __extends(n, t), n.prototype._onAudioStart = function() {
        if (this.mOnAudioStartFunc) try {
            this.mOnAudioStartFunc();
        } catch (t) {
            this._exception('_onAudioStart', t);
        }
    }, n.prototype._onAudioStop = function() {
        if (this.mOnAudioStopFunc) try {
            this.mOnAudioStopFunc();
        } catch (t) {
            this._exception('_onAudioStop', t);
        }
    }, Object.defineProperty(n.prototype, "onAudioStart", {
        set: function(t) {
            this.mOnAudioStartFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(n.prototype, "onAudioStop", {
        set: function(t) {
            this.mOnAudioStopFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), n.prototype.start = function() {
        this.mAudioSource = null, this.mAudioArray = [], this.mQueue = [], this.mBeginSpeakFlag = !0, 
        this.mAudioStopFlag = !1;
    }, n.prototype._getAudioBufferFirst = function(t) {
        var n = null;
        try {
            var o = new Float32Array(t.length);
            o.set(t), (n = new AudioBuffer({
                length: o.length,
                numberOfChannels: 1,
                sampleRate: AMAZON_AUDIOSAMPLE_RATE
            })).getChannelData(0).set(o);
        } catch (t) {
            n = null, console.log('AmazonAudioPlayer._getAudioBufferFirst: Exception', t);
        }
        return n;
    }, n.prototype._getAudioBufferSecond = function(t) {
        var n = null;
        try {
            var o = new Float32Array(t.length);
            o.set(t), (n = this.mAudioContext.createBuffer(1, o.length, AMAZON_AUDIOSAMPLE_RATE)).getChannelData(0).set(o);
        } catch (t) {
            n = null, console.log('AmazonAudioPlayer._getAudioBufferSecond: Exception', t);
        }
        return n;
    }, n.prototype._getAudioBufferResample = function(t) {
        var n = null;
        try {
            var o = new Float32Array(1.4 * t.length);
            o.set(t), this.mResampler = new AmazonResampler(AMAZON_AUDIOSAMPLE_RATE, AUDIO_MIN_SAMPLERATE, 1, o.length, void 0);
            var e = this.mResampler.resampler(o);
            (n = this.mAudioContext.createBuffer(1, e.length, AUDIO_MIN_SAMPLERATE)).getChannelData(0).set(e);
        } catch (t) {
            n = null, console.log('AmazonAudioPlayer._getAudioBufferResample: Exception', t);
        }
        return n;
    }, n.prototype.playByStream = function(t) {
        var n = this;
        try {
            if (!this.mAudioContext) return void console.log('AmazonAudioPlayer.playByStream: kein AudioContext vorhanden');
            if (console.log('AmazonAudioPlayer.playByStream: start'), 0 === t.length || this.mAudioStopFlag) return this.mBeginSpeakFlag = !0, 
            this._onAudioStop(), void (this.mAudioSource = null);
            this.mAudioSource = this.mAudioContext.createBufferSource(), this.mAudioSource.onended = function() {
                return n.stop();
            };
            var o = t.shift(), e = this._getAudioBufferFirst(o);
            if (e || (e = this._getAudioBufferSecond(o)), e || (e = this._getAudioBufferResample(o)), 
            !e) return void this._error('playByStream', 'kein Audiobuffer erzeugt');
            this.mAudioSource.buffer = e, this.mAudioSource.connect(this.mAudioContext.destination), 
            this.mAudioSource.start ? this.mAudioSource.start(0) : this.mAudioSource.noteOn(0), 
            this._onAudioStart(), console.log('AmazonAudioPlayer.playByStream: end');
        } catch (t) {
            this.mBeginSpeakFlag = !0, this._onAudioStop(), this.mAudioSource = null, this._exception('playByStream', t);
        }
    }, n.prototype.decode = function(t, n) {
        try {
            if (console.log('AmazonAudioPlayer.decode: start'), this.mAudioCodec.findPcmCodec(t.codec)) {
                var o = this.mAudioCodec.decodePCM(n);
                this.mAudioArray.push(o), this.mQueue.push(o), console.log('AmazonAudioPlayer.decode: end'), 
                this.mBeginSpeakFlag && (this.mBeginSpeakFlag = !1, this.playByStream(this.mAudioArray));
            } else this._error('decode', 'Kein Decoder vorhanden fuer ' + t.codec);
        } catch (t) {
            this._exception('decode', t);
        }
    }, n.prototype.stop = function() {
        try {
            console.log('AmazonAudioPlayer.stop'), this.mAudioStopFlag = !0, this.mAudioSource && (this.mAudioSource.stop(0), 
            this.mAudioSource.disconnect(0), this._onAudioStop());
        } catch (t) {
            this._exception('stop', t);
        }
        this.mAudioSource = null;
    }, n;
}(ErrorBase), AmazonTTS = function(t) {
    function n(n, o, e) {
        var r = t.call(this, 'AmazonTTS', n, o) || this;
        return r.mAudioContext = null, r.mAudioPlayer = null, r.mAudioContext = e, r;
    }
    return __extends(n, t), n.prototype._start = function(t) {
        var n = this;
        if (!t || !t.text || 'string' != typeof t.text) return this._error('_start', 'kein Text uebergeben'), 
        -1;
        try {
            if (this.mAudioPlayer = new AmazonAudioPlayer(this.mAudioContext), !this.mAudioPlayer) return this._error('_start', 'AudioPlayer wurde nicht erzeugt'), 
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
                OutputFormat: AMAZON_AUDIO_FORMAT,
                SampleRate: '' + AMAZON_AUDIOSAMPLE_RATE,
                Text: t.text || '',
                TextType: 'text',
                VoiceId: t.voice || 'Vicki'
            };
            return o.synthesizeSpeech(e, function(t, o) {
                t ? (n._onError(t), n._onStop()) : o && n.mAudioPlayer.decode({
                    codec: AMAZON_PCM_CODEC
                }, o.AudioStream);
            }), this.mAudioPlayer.start(), 0;
        } catch (t) {
            return this._exception('_start', t), -1;
        }
    }, n.prototype._stop = function() {
        return this.mAudioPlayer && (this.mAudioPlayer.stop(), this.mAudioPlayer = null), 
        0;
    }, n;
}(AmazonDevice), AUDIO_UNLOCK_TIMEOUT = 2e3, AMAZON_ACTION_TIMEOUT = 6e4, AmazonPort = function(t) {
    function n(n, o) {
        void 0 === o && (o = !0);
        var e = t.call(this, n || AMAZON_PORT_NAME, o) || this;
        return e.mAudioContext = null, e.mGetUserMedia = null, e.mAmazonConfig = null, e.mAmazonNetwork = null, 
        e.mAmazonConnect = null, e.mAmazonTTS = null, e.mAmazonASR = null, e.mDynamicCredentialsFlag = !1, 
        e.mTransaction = null, e.mRunningFlag = !1, e.mDefaultOptions = null, e.mActionTimeoutId = 0, 
        e.mActionTimeout = AMAZON_ACTION_TIMEOUT, e;
    }
    return __extends(n, t), n.prototype.isMock = function() {
        return !1;
    }, n.prototype.getType = function() {
        return AMAZON_TYPE_NAME;
    }, n.prototype.getClass = function() {
        return 'AmazonPort';
    }, n.prototype.getVersion = function() {
        return AMAZON_API_VERSION;
    }, n.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.amazonRegion && (!!t.amazonRegion && ('string' == typeof t.amazonIdentityPoolId && !!t.amazonIdentityPoolId)));
    }, n.prototype._initAllObject = function(t) {
        var n = this, o = new FileHtml5Reader();
        o.init();
        var e = new AudioHtml5Reader();
        if (e.init({
            audioContext: this.mAudioContext
        }), this.mAmazonConfig = new AmazonConfig(o), 0 !== this.mAmazonConfig.init(t)) return -1;
        if (this.mAmazonNetwork = new AmazonNetwork(), this.mAmazonNetwork.onOnline = function() {
            return n._onOnline();
        }, this.mAmazonNetwork.onOffline = function() {
            return n._onOffline();
        }, this.mAmazonNetwork.onError = function(t) {
            return n._onError(t);
        }, 0 !== this.mAmazonNetwork.init(t)) return -1;
        if (this.mAmazonConnect = new AmazonConnect(this.mAmazonConfig), this.mAmazonConnect._setErrorOutputFunc(function(t) {
            return n._onError(new Error(t));
        }), this.mAudioContext) {
            this.mAmazonTTS = new AmazonTTS(this.mAmazonConfig, this.mAmazonConnect, this.mAudioContext), 
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
                this.mGetUserMedia && (this.mAmazonASR = new AmazonASR(this.mAmazonConfig, this.mAmazonConnect, this.mAudioContext, this.mGetUserMedia, e), 
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
    }, n.prototype.init = function(n) {
        if (this.mInitFlag) return this._error('init', 'Port ist bereits initialisiert'), 
        0;
        if (!window.AWS) return this._error('init', 'AWS-SDK ist nicht vorhanden'), -1;
        if (n && 'boolean' == typeof n.amazonDynamicCredentialsFlag && n.amazonDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0; else if (!this._checkCredentials(n)) return this._error('init', 'keine Region und/oder IdentityPoolId als Parameter uebergeben'), 
        -1;
        var o = FactoryManager.get(AUDIOCONTEXT_FACTORY_NAME, AudioContextFactory);
        if (o) {
            var e = o.create();
            e && (this.mAudioContext = new e());
        }
        var r = FactoryManager.get(USERMEDIA_FACTORY_NAME, UserMediaFactory);
        return r && (this.mGetUserMedia = r.create()), 0 !== this._initAllObject(n) ? -1 : 0 !== t.prototype.init.call(this, n) ? -1 : (this.isErrorOutput() && (this.mAmazonTTS ? console.log('AmazonPort: TTS ist vorhanden') : console.log('AmazonPort: TTS ist nicht vorhanden'), 
        this.mAmazonASR ? console.log('AmazonPort: ASR ist vorhanden') : console.log('AmazonPort: ASR ist nicht vorhanden')), 
        0);
    }, n.prototype.done = function() {
        return t.prototype.done.call(this), this._clearActionTimeout(), this.mAmazonNetwork && (this.mAmazonNetwork.done(), 
        this.mAmazonNetwork = null), this.mAmazonConnect && (this.mAmazonConnect.disconnect(), 
        this.mAmazonConnect = null), this.mAmazonConfig && (this.mAmazonConfig.done(), this.mAmazonConfig = null), 
        this.mAmazonTTS = null, this.mAmazonASR = null, this.mAudioContext && (this.mAudioContext.close(), 
        this.mAudioContext = null), this.mGetUserMedia = null, this.mDynamicCredentialsFlag = !1, 
        this.mTransaction = null, this.mRunningFlag = !1, this.mDefaultOptions = null, this.mActionTimeoutId = 0, 
        this.mActionTimeout = AMAZON_ACTION_TIMEOUT, 0;
    }, n.prototype.reset = function(n) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, n);
    }, n.prototype._setErrorOutput = function(n) {
        t.prototype._setErrorOutput.call(this, n), this.mAmazonConfig && this.mAmazonConfig._setErrorOutput(n), 
        this.mAmazonNetwork && this.mAmazonNetwork._setErrorOutput(n), this.mAmazonConnect && this.mAmazonConnect._setErrorOutput(n), 
        this.mAmazonTTS && this.mAmazonTTS._setErrorOutput(n), this.mAmazonASR && this.mAmazonASR._setErrorOutput(n);
    }, n.prototype._breakAction = function() {
        this.mActionTimeoutId = 0, this.mTransaction && (this._error('_breakAction', 'Timeout fuer Action erreicht'), 
        this._onStop(this.mTransaction.plugin, this.mTransaction.type));
    }, n.prototype._setActionTimeout = function() {
        var t = this;
        0 === this.mActionTimeoutId && this.mActionTimeout > 0 && (this.mActionTimeoutId = window.setTimeout(function() {
            return t._breakAction();
        }, this.mActionTimeout));
    }, n.prototype._clearActionTimeout = function() {
        this.mActionTimeoutId > 0 && (clearTimeout(this.mActionTimeoutId), this.mActionTimeoutId = 0);
    }, n.prototype._onOnline = function() {
        return 0;
    }, n.prototype._onOffline = function() {
        return 0;
    }, n.prototype._onStop = function(n, o) {
        return this._clearActionTimeout(), this.mTransaction = null, this.mRunningFlag = !1, 
        t.prototype._onStop.call(this, n, o);
    }, n.prototype._unlockAudio = function(t) {
        if (this.mAudioContext) {
            if ('running' === this.mAudioContext.state) return void t(!0);
            if ('suspended' === this.mAudioContext.state) {
                var n = setTimeout(function() {
                    return t(!1);
                }, AUDIO_UNLOCK_TIMEOUT);
                this.mAudioContext.resume().then(function() {
                    clearTimeout(n), t(!0);
                }, function(o) {
                    console.log('AmazonPort._unlockAudio:', o), clearTimeout(n), t(!1);
                });
            } else t(!1);
        } else t(!1);
    }, n.prototype.setConfig = function(t) {
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
    }, n.prototype.getConfig = function() {
        return {
            amazonRegion: this.mAmazonConfig.region,
            amazonIdentityPoolId: this.mAmazonConfig.identityPoolId
        };
    }, n.prototype.isOnline = function() {
        return !!this.mAmazonNetwork && this.mAmazonNetwork.isOnline();
    }, n.prototype.isOpen = function() {
        return !!this.mAmazonConnect && this.mAmazonConnect.isConnect();
    }, n.prototype._checkOpen = function(t) {
        if (!this.isOnline()) return this._error('_checkOpen', 'kein Netz vorhanden'), t(!1), 
        -1;
        var n = this.open();
        return t(0 === n), n;
    }, n.prototype.open = function(t) {
        if (!this.mAmazonConnect) return this._error('open', 'kein AmazonConnect vorhanden'), 
        -1;
        if (this.isOpen()) return 0;
        var n = this.mAmazonConnect.connect();
        return 0 === n && this._onOpen(), n;
    }, n.prototype.close = function() {
        return this.isOpen() && this.mAmazonConnect ? (this._onClose(), this.mAmazonConnect.disconnect()) : 0;
    }, n.prototype.getPluginName = function() {
        return this.mTransaction ? this.mTransaction.plugin : '';
    }, n.prototype.getActionName = function() {
        return this.mTransaction ? this.mTransaction.type : '';
    }, n.prototype.isRunning = function(t, n) {
        if (!t && !n) return this.mRunningFlag;
        if (t === this.getPluginName()) {
            if (!n) return this.mRunningFlag;
            if (n === this.getActionName()) return this.mRunningFlag;
        }
        return !1;
    }, n.prototype.isAction = function(t) {
        var n = !1;
        switch (t) {
          case AMAZON_ASR_ACTION:
            n = !!this.mAmazonASR;
            break;

          case AMAZON_TTS_ACTION:
            n = !!this.mAmazonTTS;
        }
        return n;
    }, n.prototype.setActionTimeout = function(t) {
        this.mActionTimeout = t;
    }, n.prototype.start = function(t, n, o) {
        var e = this;
        return this.isRunning() ? (this._error('start', 'Aktion laeuft bereits'), -1) : this.mAmazonConfig.isCredentials() ? this.mTransaction ? (this._error('start', 'andere Transaktion laeuft noch'), 
        -1) : this._checkOpen(function(r) {
            if (!r) return -1;
            e._setActionTimeout();
            var i = o || {};
            e.mPluginName = t, e.mRunningFlag = !0;
            var a = 0;
            switch (n) {
              case AMAZON_NLU_ACTION:
                e.mTransaction = new AmazonTransaction(t, AMAZON_NLU_ACTION), a = e._startNLU(e.mTransaction, i.text, i.language || AMAZON_DEFAULT_LANGUAGE);
                break;

              case AMAZON_ASRNLU_ACTION:
                e.mTransaction = new AmazonTransaction(t, AMAZON_ASRNLU_ACTION), a = e._startASR(e.mTransaction, i.language || AMAZON_DEFAULT_LANGUAGE, i.audioURL || '', !0, i.useProgressive || !1);
                break;

              case AMAZON_ASR_ACTION:
                e.mTransaction = new AmazonTransaction(t, AMAZON_ASR_ACTION), a = e._startASR(e.mTransaction, i.language || AMAZON_DEFAULT_LANGUAGE, i.audioURL || '', !1, i.useProgressive || !1);
                break;

              case AMAZON_TTS_ACTION:
                e.mTransaction = new AmazonTransaction(t, AMAZON_TTS_ACTION), a = e._startTTS(e.mTransaction, i.text, i.language || AMAZON_DEFAULT_LANGUAGE, i.voice || AMAZON_DEFAULT_VOICE);
                break;

              default:
                e._clearActionTimeout(), e._error('start', 'Keine gueltige Aktion uebergeben ' + n), 
                a = -1;
            }
            return a;
        }) : (this._error('start', 'Port hat keine Credentials'), -1);
    }, n.prototype.stop = function(t, n, o) {
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
          case AMAZON_NLU_ACTION:
            e = this._stopNLU(this.mTransaction);
            break;

          case AMAZON_ASR_ACTION:
            e = this._stopASR(this.mTransaction);
            break;

          case AMAZON_TTS_ACTION:
            e = this._stopTTS(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + n), e = -1;
        }
        return this.mRunningFlag = !1, e;
    }, n.prototype._initRecognition = function(t) {
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
    }, n.prototype._startNLU = function(t, n, o) {
        return this._error('_startNLU', 'nicht implementiert'), -1;
    }, n.prototype._stopNLU = function(t) {
        return this._error('_stopNLU', 'nicht implementiert'), -1;
    }, n.prototype._startASR = function(t, n, o, e, r) {
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
    }, n.prototype._stopASR = function(t) {
        if (!this.mAmazonASR) return this._error('_stopASR', 'keine Amazon ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this.mAmazonASR.stop(t);
        } catch (t) {
            return this._exception('_stopASR', t), -1;
        }
    }, n.prototype._startTTS = function(t, n, o, e) {
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
            return this._unlockAudio(function(n) {
                n ? r.mAmazonTTS.start(t, i) : (r._error('_startTTS', 'AudioContext ist nicht entsperrt'), 
                r._onStop(t.plugin, t.type));
            }), 0;
        } catch (t) {
            return this._exception('_startTTS', t), -1;
        }
    }, n.prototype._stopTTS = function(t) {
        if (!this.mAmazonTTS) return this._error('_stopTTS', 'keine Amazon TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this.mAmazonTTS.stop(t);
        } catch (t) {
            return this._exception('_stopTTS', t), -1;
        }
    }, n;
}(Port), AMAZONMOCK_CALLBACK_TIMEOUT = 100, AmazonMock = function(t) {
    function n(n, o) {
        void 0 === o && (o = !0);
        var e = t.call(this, n || AMAZON_MOCK_NAME, o) || this;
        return e.audioContextFlag = !0, e.getUserMediaFlag = !0, e.amazonNLUFlag = !0, e.amazonASRFlag = !0, 
        e.amazonTTSFlag = !0, e.disconnectFlag = !0, e.defaultOptions = null, e.codec = '', 
        e.intentName = 'TestIntent', e.intentConfidence = 1, e.mDynamicCredentialsFlag = !1, 
        e.mTransaction = null, e.mRunningFlag = !1, e.amazonRegion = '', e.amazonIdentityPoolId = '', 
        e.amazonNluTag = '', e;
    }
    return __extends(n, t), n.prototype.isMock = function() {
        return !0;
    }, n.prototype.getType = function() {
        return AMAZON_TYPE_NAME;
    }, n.prototype.getClass = function() {
        return 'AmazonMock';
    }, n.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.amazonRegion && (this.amazonRegion = t.amazonRegion), 
        'string' == typeof t.amazonIdentityPoolId && (this.amazonIdentityPoolId = t.amazonIdentityPoolId), 
        'string' == typeof t.amazonNluTag && (this.amazonNluTag = t.amazonNluTag), 'string' == typeof t.amazonRegion && (!!t.amazonRegion && ('string' == typeof t.amazonIdentityPoolId && !!t.amazonIdentityPoolId)));
    }, n.prototype.init = function(n) {
        if (this.mInitFlag) return this._error('init', 'Init bereits aufgerufen'), 0;
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
        return void 0 === n && (n = !1), t.prototype.done.call(this), this.audioContextFlag = !0, 
        this.getUserMediaFlag = !0, this.amazonNLUFlag = !1, this.amazonASRFlag = !1, this.amazonTTSFlag = !1, 
        this.disconnectFlag = !0, this.defaultOptions = null, this.codec = '', this.mTransaction = null, 
        this.mRunningFlag = !1, 0;
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
          case AMAZON_NLU_ACTION:
            n = this.amazonNLUFlag;
            break;

          case AMAZON_ASR_ACTION:
            n = this.amazonASRFlag;
            break;

          case AMAZON_TTS_ACTION:
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
        var r = 0;
        switch (n) {
          case AMAZON_NLU_ACTION:
            this.mTransaction = new AmazonTransaction(t, AMAZON_NLU_ACTION), r = this._startNLU(this.mTransaction, e.text, e.language || AMAZON_DEFAULT_LANGUAGE);
            break;

          case AMAZON_ASRNLU_ACTION:
            this.mTransaction = new AmazonTransaction(t, AMAZON_ASRNLU_ACTION), r = this._startASR(this.mTransaction, e.language || AMAZON_DEFAULT_LANGUAGE, e.audioURL || '', !0, e.useProgressive || !1);
            break;

          case AMAZON_ASR_ACTION:
            this.mTransaction = new AmazonTransaction(t, AMAZON_ASR_ACTION), r = this._startASR(this.mTransaction, e.language || AMAZON_DEFAULT_LANGUAGE, e.audioURL || '', !1, e.useProgressive || !1);
            break;

          case AMAZON_TTS_ACTION:
            this.mTransaction = new AmazonTransaction(t, AMAZON_TTS_ACTION), r = this._startTTS(this.mTransaction, e.text, e.language || AMAZON_DEFAULT_LANGUAGE, e.voice || AMAZON_DEFAULT_VOICE);
            break;

          default:
            this._error('start', 'Keine gueltige Aktion uebergeben ' + n), r = -1;
        }
        return r;
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
          case AMAZON_NLU_ACTION:
            e = this._stopNLU(this.mTransaction);
            break;

          case AMAZON_ASRNLU_ACTION:
          case AMAZON_ASR_ACTION:
            e = this._stopASR(this.mTransaction);
            break;

          case AMAZON_TTS_ACTION:
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
        if (void 0 === e && (e = !1), void 0 === r && (r = !1), !this.amazonASRFlag) return this._error('_startASR', 'keine Nuance ASR-Anbindung vorhanden'), 
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
            return this._onStart(t.plugin, t.type), setTimeout(function() {
                return r._onStop(t.plugin, t.type);
            }, AMAZONMOCK_CALLBACK_TIMEOUT), 0;
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
}(Port), Amazon = function() {
    function t() {}
    return t.setErrorOutputOn = function() {
        t.mErrorOutputFlag = !0, PortManager.setErrorOutputOn();
    }, t.setErrorOutputOff = function() {
        t.mErrorOutputFlag = !1, PortManager.setErrorOutputOff();
    }, t.setErrorOutputFunc = function(t) {
        PortManager._setErrorOutputFunc(t);
    }, t._initAmazonPort = function(n) {
        var o = PortManager.get(AMAZON_TYPE_NAME, AmazonPort);
        return o ? 0 !== o.init(n) ? (PortManager.remove(AMAZON_TYPE_NAME), -1) : (t.mCurrentPort = o, 
        0) : -1;
    }, t._initAmazonMock = function(n) {
        var o = PortManager.get(AMAZON_TYPE_NAME, AmazonMock);
        return o ? 0 !== o.init(n) ? (console.log('Amazon._initAmazonMock: Error AmazonMock wurde nicht initialisiert'), 
        PortManager.remove(AMAZON_TYPE_NAME), -1) : (t.mCurrentPort = o, 0) : (console.log('Amazon._initAmazonMock: Error AmazonMock wurde nicht erzeugt'), 
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
        var n = PortManager.find(AMAZON_TYPE_NAME);
        n || (n = t.mCurrentPort);
        var o = 0;
        return n && (o = n.done(), PortManager.remove(AMAZON_TYPE_NAME)), t.mCurrentPort = null, 
        t.mInitFlag = !1, o;
    }, t._onOpenEvent = function(n, o, e, r) {
        if ('function' == typeof r) try {
            return r(n, o, e), 0;
        } catch (n) {
            return t.mErrorOutputFlag && console.log('Amazon._onOpenEvent: Exception', n.message), 
            -1;
        }
        return 0;
    }, t._openAmazonPort = function(n) {
        var o = PortManager.find(AMAZON_TYPE_NAME);
        return o || (o = t.mCurrentPort), o ? (o.addOpenEvent(AMAZON_TYPE_NAME, function(e) {
            return o.removeErrorEvent(AMAZON_TYPE_NAME), o.removeOpenEvent(AMAZON_TYPE_NAME), 
            'function' == typeof n && t._onOpenEvent(null, AMAZON_TYPE_NAME, e.result, n), e.result;
        }), o.addErrorEvent(AMAZON_TYPE_NAME, function(e) {
            return o.removeOpenEvent(AMAZON_TYPE_NAME), o.removeErrorEvent(AMAZON_TYPE_NAME), 
            'function' == typeof n && t._onOpenEvent(e, AMAZON_TYPE_NAME, -1, n), 0;
        }), o.open()) : (t.mErrorOutputFlag && console.log('Amazon._openAmazonPort: kein Port vorhanden'), 
        t._onOpenEvent(new Error('Amazon._openAmazonPort: Kein Port vorhanden'), AMAZON_TYPE_NAME, -1, n), 
        -1);
    }, t.open = function(n) {
        return t.mInitFlag ? t._openAmazonPort(n) : (t.mErrorOutputFlag && console.log('Amazon.open: Init wurde nicht aufgerufen'), 
        t._onOpenEvent(new Error('Amazon.open: Init wurde nicht aufgerufen'), AMAZON_TYPE_NAME, -1, n), 
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

export { AMAZON_TYPE_NAME, AMAZON_TTS_ACTION, AMAZON_ASR_ACTION, AMAZON_ASRNLU_ACTION, AMAZON_NLU_ACTION, Amazon };
