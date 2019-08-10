/**
 * Speech-Microsoft
 * 
 * Version: 0.1.0
 * Build:   0001
 * TYPE:    ALPHA
 * Datum:   17.06.2019
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

var MICROSOFT_TYPE_NAME = 'Microsoft', MICROSOFT_PORT_NAME = 'MicrosoftPort', MICROSOFT_MOCK_NAME = 'MicrosoftMock', MICROSOFT_SERVER_URL = '', MICROSOFT_DEFAULT_URL = MICROSOFT_SERVER_URL, MICROSOFT_NLU_ACTION = 'NLU', MICROSOFT_ASR_ACTION = 'ASR', MICROSOFT_ASRNLU_ACTION = 'ASRNLU', MICROSOFT_TTS_ACTION = 'TTS', MICROSOFT_CONFIG_PATH = 'assets/', MICROSOFT_CONFIG_FILE = 'microsoft.json', MICROSOFT_CONFIG_LOAD = !1, MICROSOFT_DE_LANGUAGE = 'de-DE', MICROSOFT_DEFAULT_LANGUAGE = MICROSOFT_DE_LANGUAGE, MICROSOFT_TTS_VOICE1 = 'de-DE-Hedda', MICROSOFT_TTS_VOICE = MICROSOFT_TTS_VOICE1, MICROSOFT_DEFAULT_VOICE = MICROSOFT_TTS_VOICE, MICROSOFT_PCM_CODEC = 'audio/L16;rate=16000', MICROSOFT_AUDIOSAMPLE_RATE = 16e3, MICROSOFT_AUDIO_FORMAT = 'raw-16khz-16bit-mono-pcm', extendStatics = function(t, o) {
    return (extendStatics = Object.setPrototypeOf || {
        __proto__: []
    } instanceof Array && function(t, o) {
        t.__proto__ = o;
    } || function(t, o) {
        for (var n in o) o.hasOwnProperty(n) && (t[n] = o[n]);
    })(t, o);
};

function __extends(t, o) {
    function n() {
        this.constructor = t;
    }
    extendStatics(t, o), t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, 
    new n());
}

var Factory = function(t) {
    function o(o, n) {
        void 0 === n && (n = !0);
        var r = t.call(this, o || 'Factory') || this;
        if (n && 0 !== FactoryManager.insert(r.getName(), r)) throw new Error('Factory ' + r.getName() + ' existiert bereits im FactoryManager');
        return r;
    }
    return __extends(o, t), o.prototype.isMock = function() {
        return !1;
    }, o.prototype.getType = function() {
        return 'any';
    }, o.prototype.getName = function() {
        return 'Factory';
    }, o.prototype.create = function(t, o) {
        return void 0 === o && (o = !0), null;
    }, o;
}(ErrorBase), USERMEDIA_FACTORY_NAME = 'UserMediaFactory', USERMEDIA_TYPE_NAME = 'UserMedia', UserMediaFactory = function(t) {
    function o(o, n) {
        return void 0 === n && (n = !0), t.call(this, o || USERMEDIA_FACTORY_NAME, n) || this;
    }
    return __extends(o, t), o.prototype.isMock = function() {
        return !1;
    }, o.prototype.getType = function() {
        return USERMEDIA_TYPE_NAME;
    }, o.prototype.getName = function() {
        return USERMEDIA_FACTORY_NAME;
    }, o.prototype.create = function(t, o) {
        void 0 === o && (o = !0);
        try {
            if (void 0 === navigator.mediaDevices && (console.log('UserMediaFactory: no mediaDevices'), 
            navigator.mediaDevices = {}), void 0 === navigator.mediaDevices.getUserMedia) {
                console.log('UserMediaFactory: no getUserMedia');
                var n = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || null;
                if (!n) return null;
                navigator.mediaDevices.getUserMedia = function(t) {
                    return new Promise(function(o, r) {
                        n.call(navigator, t, o, r);
                    });
                };
            }
            return function(t) {
                return navigator.mediaDevices.getUserMedia(t);
            };
        } catch (t) {
            return this._exception('create', t), null;
        }
    }, o;
}(Factory), MICROSOFT_VERSION_NUMBER = '0.1.0', MICROSOFT_VERSION_BUILD = '0001', MICROSOFT_VERSION_TYPE = 'ALPHA', MICROSOFT_VERSION_DATE = '17.06.2019', MICROSOFT_VERSION_STRING = MICROSOFT_VERSION_NUMBER + '.' + MICROSOFT_VERSION_BUILD + ' vom ' + MICROSOFT_VERSION_DATE + ' (' + MICROSOFT_VERSION_TYPE + ')', MICROSOFT_API_VERSION = MICROSOFT_VERSION_STRING, MicrosoftTransaction = function() {
    function t(o, n) {
        void 0 === o && (o = ''), void 0 === n && (n = ''), this.transactionId = 0, this.plugin = '', 
        this.type = '', this.result = null, this.error = null, this.plugin = o, this.type = n, 
        t.mTransactionCounter += 1, this.transactionId = t.mTransactionCounter;
    }
    return t.mTransactionCounter = 0, t;
}(), MicrosoftConfig = function(t) {
    function o(o) {
        var n = t.call(this, 'MicrosoftConfig') || this;
        return n.mInitFlag = !1, n.mConfigPath = MICROSOFT_CONFIG_PATH, n.mConfigFile = MICROSOFT_CONFIG_FILE, 
        n.mConfigLoadFlag = MICROSOFT_CONFIG_LOAD, n.mConfigServerUrl = MICROSOFT_DEFAULT_URL, 
        n.mConfigRegion = '', n.mConfigSubscriptionKey = '', n.mConfigUserId = '', n.mConfigNluTag = '', 
        n.mFileReader = null, n.mOnInitFunc = null, n.mOnErrorFunc = null, n.mFileReader = o, 
        n._setErrorOutputFunc(function(t) {
            return n._onError(new Error(t));
        }), n;
    }
    return __extends(o, t), o.prototype._setOption = function(t) {
        t && ('string' == typeof t.microsoftConfigPath && (this.mConfigPath = t.microsoftConfigPath), 
        'string' == typeof t.microsoftConfigFile && (this.mConfigFile = t.microsoftConfigFile), 
        'boolean' == typeof t.microsoftConfigLoadFlag && (this.mConfigLoadFlag = t.microsoftConfigLoadFlag), 
        'string' == typeof t.microsoftServerUrl && (this.mConfigServerUrl = t.microsoftServerUrl), 
        'string' == typeof t.microsoftRegion && (this.mConfigRegion = t.microsoftRegion), 
        'string' == typeof t.microsoftSubscriptionKey && (this.mConfigSubscriptionKey = t.microsoftSubscriptionKey), 
        'string' == typeof t.microsoftUserId && (this.mConfigUserId = t.microsoftUserId), 
        'string' == typeof t.microsoftNluTag && (this.mConfigNluTag = t.microsoftNluTag));
    }, o.prototype.init = function(t) {
        return this._setOption(t), this.mInitFlag = !0, 0;
    }, o.prototype.done = function() {
        return this.mInitFlag = !1, this.mConfigPath = MICROSOFT_CONFIG_PATH, this.mConfigFile = MICROSOFT_CONFIG_FILE, 
        this.mConfigLoadFlag = MICROSOFT_CONFIG_LOAD, this.mConfigServerUrl = MICROSOFT_DEFAULT_URL, 
        this.mConfigRegion = '', this.mConfigSubscriptionKey = '', this.mConfigUserId = '', 
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
            o.SUBSCRIPTION_KEY && (this.subscriptionKey = o.SUBSCRIPTION_KEY), o.USER_ID && (this.userId = o.USER_ID), 
            o.NLU_TAG && (this.nluTag = o.NLU_TAG), this._onInit(0), 0;
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
}(ErrorBase), NetHtml5Connect = function(t) {
    function o(o) {
        var n = t.call(this, o || 'NetHtml5Connect') || this;
        return n.mInitFlag = !1, n.mOnOnlineFunc = null, n.mOnOfflineFunc = null, n.mOnErrorFunc = null, 
        n._setErrorOutputFunc(function(t) {
            return n._onError(new Error(t));
        }), n;
    }
    return __extends(o, t), o.prototype.init = function(t) {
        var o = this;
        try {
            window && (window.ononline = function() {
                return o._onOnline();
            }, window.onoffline = function() {
                return o._onOffline();
            });
        } catch (t) {
            return this._exception('init', t), -1;
        }
        return this.mInitFlag = !0, 0;
    }, o.prototype.isInit = function() {
        return this.mInitFlag;
    }, o.prototype.done = function() {
        return window.ononline = null, window.onoffline = null, this.mOnOnlineFunc = null, 
        this.mOnOfflineFunc = null, this.mOnErrorFunc = null, this.mInitFlag = !1, 0;
    }, o.prototype.isOnline = function() {
        return !!navigator && navigator.onLine;
    }, Object.defineProperty(o.prototype, "onOnline", {
        set: function(t) {
            this.mOnOnlineFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "onOffline", {
        set: function(t) {
            this.mOnOfflineFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "onError", {
        set: function(t) {
            this.mOnErrorFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), o.prototype._onOnline = function() {
        if ('function' == typeof this.mOnOnlineFunc) try {
            return this.mOnOnlineFunc();
        } catch (t) {
            return this._exception('_onOnline', t), -1;
        }
        return 0;
    }, o.prototype._onOffline = function() {
        if ('function' == typeof this.mOnOfflineFunc) try {
            return this.mOnOfflineFunc();
        } catch (t) {
            return this._exception('_onOffline', t), -1;
        }
        return 0;
    }, o.prototype._onError = function(t) {
        if ('function' == typeof this.mOnErrorFunc) try {
            return this.mOnErrorFunc(t);
        } catch (t) {
            return this.isErrorOutput() && console.log('===> EXCEPTION NetHtml5Connect._onError: ', t.message), 
            -1;
        }
        return 0;
    }, o;
}(ErrorBase), MicrosoftNetwork = function(t) {
    function o() {
        return t.call(this, 'MicrosoftNetwork') || this;
    }
    return __extends(o, t), o;
}(NetHtml5Connect), MicrosoftConnect = function(t) {
    function o(o) {
        var n = t.call(this, 'MicrosoftConnect') || this;
        return n.mConfig = null, n.mConnectFlag = !1, n.mSpeechConfig = null, n.mConfig = o, 
        n;
    }
    return __extends(o, t), Object.defineProperty(o.prototype, "speechConfig", {
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
}(ErrorBase), MicrosoftDevice = function(t) {
    function o(o, n, r) {
        var e = t.call(this, o || 'MicrosoftDevice') || this;
        return e.mConfig = null, e.mConnect = null, e.mTransaction = null, e.onStart = null, 
        e.onStop = null, e.onResult = null, e.onError = null, e.onClose = null, e.mConfig = n, 
        e.mConnect = r, e;
    }
    return __extends(o, t), o.prototype._onStart = function() {
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
            return this._stop(), this._onStop(), 0;
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
}(ErrorBase), MicrosoftASR = function(t) {
    function o(o, n, r, e, i) {
        var s = t.call(this, 'MicrosoftASR', o, n) || this;
        return s.mAudioContext = null, s.mGetUserMedia = null, s.mAudioReader = null, s.mAudioRecorder = null, 
        s.mUserMediaStream = null, s.mRequestId = 0, s.mVolumeCounter = 0, s.mTimeoutCounter = 0, 
        s.mRecordingFlag = !1, s.mRecognizer = null, s.mAudioContext = r, s.mGetUserMedia = e, 
        s.mAudioReader = i, s;
    }
    return __extends(o, t), o.prototype._startAudio = function(t) {}, o.prototype._startASR = function(t) {
        var o = this;
        try {
            if (!window.SpeechSDK) return this._error('_startASR', 'kein Microsoft SpeechSDK vorhanden'), 
            -1;
            var n = this.mConnect.speechConfig;
            if (!n) return this._error('_startASR', 'kein Microsoft SpeechConfig vorhanden'), 
            -1;
            n.speechRecognitionLanguage = 'de-DE', t.language && (n.speechRecognitionLanguage = t.language);
            var r = window.SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
            return this.mRecordingFlag = !0, this.mRecognizer = new window.SpeechSDK.SpeechRecognizer(n, r), 
            this.mRecognizer.recognizeOnceAsync(function(t) {
                t.privErrorDetails || (o._onResult(t), o._stop());
            }, function(t) {
                o._onError(new Error('ASR-Error: ' + t)), o._stop();
            }), 0;
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
}(MicrosoftDevice), PCM_L16CodecArray = [ 'audio/L16;rate=8000', 'audio/L16;rate=16000' ], MicrosoftAudioCodec = function(t) {
    function o() {
        return t.call(this, 'MicrosoftAudioCodec') || this;
    }
    return __extends(o, t), o.prototype._findCodec = function(t, o) {
        for (var n = 0; n < o.length; n++) if (t === o[n]) return !0;
        return !1;
    }, o.prototype.findPcmCodec = function(t) {
        return this._findCodec(t, PCM_L16CodecArray);
    }, o.prototype._float32ToInt16 = function(t) {
        var o = t < 0 ? 32768 * t : 32767 * t;
        return Math.max(-32768, Math.min(32768, o));
    }, o.prototype._float32ArrayToInt16Array = function(t) {
        for (var o = new Int16Array(t.length), n = 0; n < t.length; ) o[n] = this._float32ToInt16(t[n++]);
        return o;
    }, o.prototype.encodePCM = function(t, o) {
        return this.findPcmCodec(o) ? [ this._float32ArrayToInt16Array(t) ] : [ t ];
    }, o.prototype.decodePCM = function(t) {
        try {
            for (var o = new Uint8Array(t), n = o.length, r = new Float32Array(n / 2), e = new Int16Array(1), i = 0, s = 0; s < n; s += 2) e[0] = (o[s + 1] << 8) + o[s], 
            r[i] = e[0] / 32768, i++;
            return r;
        } catch (t) {
            return this._exception('decodePCM', t), [];
        }
    }, o;
}(ErrorBase), MicrosoftResampler = function() {
    function t(t, o, n, r, e) {
        this.fromSampleRate = 0, this.toSampleRate = 0, this.channels = 0, this.outputBufferSize = 0, 
        this.noReturn = !1, this.resampler = null, this.ratioWeight = 0, this.interpolate = null, 
        this.lastWeight = 0, this.outputBuffer = null, this.lastOutput = null, this.fromSampleRate = t, 
        this.toSampleRate = o, this.channels = n || 0, this.outputBufferSize = r, this.noReturn = !!e, 
        this.initialize();
    }
    return t.prototype.initialize = function() {
        if (!(this.fromSampleRate > 0 && this.toSampleRate > 0 && this.channels > 0)) throw new Error('Invalid settings specified for the resampler.');
        this.fromSampleRate === this.toSampleRate ? (this.resampler = this.bypassResampler, 
        this.ratioWeight = 1) : (this.compileInterpolationFunction(), this.resampler = this.interpolate, 
        this.ratioWeight = this.fromSampleRate / this.toSampleRate, this.tailExists = !1, 
        this.lastWeight = 0, this.initializeBuffers());
    }, t.prototype.compileInterpolationFunction = function() {
        for (var t = 'var bufferLength = Math.min(buffer.length, this.outputBufferSize);        if ((bufferLength % ' + this.channels + ') == 0) {            if (bufferLength > 0) {                var ratioWeight = this.ratioWeight;                var weight = 0;', o = 0; o < this.channels; ++o) t += 'var output' + o + ' = 0;';
        t += 'var actualPosition = 0;                var amountToNext = 0;                var alreadyProcessedTail = !this.tailExists;                this.tailExists = false;                var outputBuffer = this.outputBuffer;                var outputOffset = 0;                var currentPosition = 0;                do {                    if (alreadyProcessedTail) {                        weight = ratioWeight;';
        for (o = 0; o < this.channels; ++o) t += 'output' + o + ' = 0;';
        t += '}                    else {                        weight = this.lastWeight;';
        for (o = 0; o < this.channels; ++o) t += 'output' + o + ' = this.lastOutput[' + o + '];';
        t += 'alreadyProcessedTail = true;                    }                    while (weight > 0 && actualPosition < bufferLength) {                        amountToNext = 1 + actualPosition - currentPosition;                        if (weight >= amountToNext) {';
        for (o = 0; o < this.channels; ++o) t += 'output' + o + ' += buffer[actualPosition++] * amountToNext;';
        t += 'currentPosition = actualPosition;                            weight -= amountToNext;                        }                        else {';
        for (o = 0; o < this.channels; ++o) t += 'output' + o + ' += buffer[actualPosition' + (o > 0 ? ' + ' + o : '') + '] * weight;';
        t += 'currentPosition += weight;                            weight = 0;                            break;                        }                    }                    if (weight == 0) {';
        for (o = 0; o < this.channels; ++o) t += 'outputBuffer[outputOffset++] = output' + o + ' / ratioWeight;';
        t += '}                    else {                        this.lastWeight = weight;';
        for (o = 0; o < this.channels; ++o) t += 'this.lastOutput[' + o + '] = output' + o + ';';
        t += 'this.tailExists = true;                        break;                    }                } while (actualPosition < bufferLength);                return this.bufferSlice(outputOffset);            }            else {                return (this.noReturn) ? 0 : [];            }        }        else {            throw(new Error("Buffer was of incorrect sample length."));        }', 
        this.interpolate = Function('buffer', t);
    }, t.prototype.bypassResampler = function(t) {
        return this.noReturn ? (this.outputBuffer = t, t.length) : t;
    }, t.prototype.bufferSlice = function(t) {
        if (this.noReturn) return t;
        try {
            return this.outputBuffer.subarray(0, t);
        } catch (o) {
            try {
                return this.outputBuffer.length = t, this.outputBuffer;
            } catch (o) {
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
}(), AUDIO_MIN_SAMPLERATE = 22500, MicrosoftAudioPlayer = function(t) {
    function o(o) {
        var n = t.call(this, 'MicrosoftAudioPlayer') || this;
        return n.mAudioContext = null, n.mAudioCodec = null, n.mResampler = null, n.mOnAudioStartFunc = null, 
        n.mOnAudioStopFunc = null, n.mAudioSource = null, n.mAudioArray = [], n.mQueue = [], 
        n.mBeginSpeakFlag = !0, n.mAudioStopFlag = !1, n.mAudioContext = o, n.mAudioCodec = new MicrosoftAudioCodec(), 
        n;
    }
    return __extends(o, t), o.prototype._onAudioStart = function() {
        if (this.mOnAudioStartFunc) try {
            this.mOnAudioStartFunc();
        } catch (t) {
            this._exception('_onAudioStart', t);
        }
    }, o.prototype._onAudioStop = function() {
        if (this.mOnAudioStopFunc) try {
            this.mOnAudioStopFunc();
        } catch (t) {
            this._exception('_onAudioStop', t);
        }
    }, Object.defineProperty(o.prototype, "onAudioStart", {
        set: function(t) {
            this.mOnAudioStartFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "onAudioStop", {
        set: function(t) {
            this.mOnAudioStopFunc = t;
        },
        enumerable: !0,
        configurable: !0
    }), o.prototype.start = function() {
        this.mAudioSource = null, this.mAudioArray = [], this.mQueue = [], this.mBeginSpeakFlag = !0, 
        this.mAudioStopFlag = !1;
    }, o.prototype._getAudioBufferFirst = function(t) {
        var o = null;
        try {
            var n = new Float32Array(t.length);
            n.set(t), (o = new AudioBuffer({
                length: n.length,
                numberOfChannels: 1,
                sampleRate: MICROSOFT_AUDIOSAMPLE_RATE
            })).getChannelData(0).set(n);
        } catch (t) {
            o = null, console.log('MicrosoftAudioPlayer._getAudioBufferFirst: Exception', t);
        }
        return o;
    }, o.prototype._getAudioBufferSecond = function(t) {
        var o = null;
        try {
            var n = new Float32Array(t.length);
            n.set(t), (o = this.mAudioContext.createBuffer(1, n.length, MICROSOFT_AUDIOSAMPLE_RATE)).getChannelData(0).set(n);
        } catch (t) {
            o = null, console.log('MicrosoftAudioPlayer._getAudioBufferSecond: Exception', t);
        }
        return o;
    }, o.prototype._getAudioBufferResample = function(t) {
        var o = null;
        try {
            var n = new Float32Array(1.4 * t.length);
            n.set(t), this.mResampler = new MicrosoftResampler(MICROSOFT_AUDIOSAMPLE_RATE, AUDIO_MIN_SAMPLERATE, 1, n.length, void 0);
            var r = this.mResampler.resampler(n);
            (o = this.mAudioContext.createBuffer(1, r.length, AUDIO_MIN_SAMPLERATE)).getChannelData(0).set(r);
        } catch (t) {
            o = null, console.log('MicrosoftAudioPlayer._getAudioBufferResample: Exception', t);
        }
        return o;
    }, o.prototype.playByStream = function(t) {
        var o = this;
        try {
            if (!this.mAudioContext) return void console.log('MicrosoftAudioPlayer.playByStream: kein AudioContext vorhanden');
            if (console.log('MicrosoftAudioPlayer.playByStream: start'), 0 === t.length || this.mAudioStopFlag) return this.mBeginSpeakFlag = !0, 
            this._onAudioStop(), void (this.mAudioSource = null);
            this.mAudioSource = this.mAudioContext.createBufferSource(), this.mAudioSource.onended = function() {
                return o.stop();
            };
            var n = t.shift(), r = this._getAudioBufferFirst(n);
            if (r || (r = this._getAudioBufferSecond(n)), r || (r = this._getAudioBufferResample(n)), 
            !r) return void this._error('playByStream', 'kein Audiobuffer erzeugt');
            this.mAudioSource.buffer = r, this.mAudioSource.connect(this.mAudioContext.destination), 
            this.mAudioSource.start ? this.mAudioSource.start(0) : this.mAudioSource.noteOn(0), 
            this._onAudioStart(), console.log('MicrosoftAudioPlayer.playByStream: end');
        } catch (t) {
            this.mBeginSpeakFlag = !0, this._onAudioStop(), this.mAudioSource = null, this._exception('playByStream', t);
        }
    }, o.prototype.decode = function(t, o) {
        try {
            if (console.log('MicrosoftAudioPlayer.decode: start'), this.mAudioCodec.findPcmCodec(t.codec)) {
                var n = this.mAudioCodec.decodePCM(o);
                this.mAudioArray.push(n), this.mQueue.push(n), console.log('MicrosoftAudioPlayer.decode: end'), 
                this.mBeginSpeakFlag && (this.mBeginSpeakFlag = !1, this.playByStream(this.mAudioArray));
            } else this._error('decode', 'Kein Decoder vorhanden fuer ' + t.codec);
        } catch (t) {
            this._exception('decode', t);
        }
    }, o.prototype.stop = function() {
        try {
            console.log('MicrosoftAudioPlayer.stop'), this.mAudioStopFlag = !0, this.mAudioSource && (this.mAudioSource.stop(0), 
            this.mAudioSource.disconnect(0), this._onAudioStop());
        } catch (t) {
            this._exception('stop', t);
        }
        this.mAudioSource = null;
    }, o;
}(ErrorBase), MICROSOFT_ACCESSTOKEN_URL = '.api.cognitive.microsoft.com/sts/v1.0/issueToken', MICROSOFT_TTS_URL = '.tts.speech.microsoft.com/cognitiveservices/v1', MicrosoftTTS = function(t) {
    function o(o, n, r) {
        var e = t.call(this, 'MicrosoftTTS', o, n) || this;
        return e.mAudioContext = null, e.mAudioPlayer = null, e.mAccessToken = '', e.mAudioContext = r, 
        e;
    }
    return __extends(o, t), o.prototype._getAccessToken = function(t, o) {
        var n = this;
        return new Promise(function(r, e) {
            try {
                var i = 'https://' + t + MICROSOFT_ACCESSTOKEN_URL, s = new XMLHttpRequest();
                n.mAccessToken = '', s.open('POST', i), s.setRequestHeader('Ocp-Apim-Subscription-Key', o), 
                s.onload = function() {
                    try {
                        n.mAccessToken = s.responseText, r(n.mAccessToken);
                    } catch (t) {
                        n._exception('getAccessToken', t), e();
                    }
                }, s.onerror = function(t) {
                    n._error('getAccessToken', t.message), e();
                }, s.send('');
            } catch (t) {
                n._exception('_getAccessToken', t), e();
            }
        });
    }, o.prototype._getSSMLBody = function(t, o, n) {
        return t ? o ? n ? "<?xml version=\"1.0\"?><speak version=\"1.0\" xml:lang=\"" + o + "\"><voice xml:lang=\"" + o + "\" name=\"" + n + "\">" + t + "</voice></speak>" : (this._error('getSSMLBody', 'keine Stimme uebergeben'), 
        '') : (this._error('getSSMLBody', 'keine Sprache uebergeben'), '') : (this._error('getSSMLBody', 'kein Text uebergeben'), 
        '');
    }, o.prototype._sendToTTS = function(t, o, n, r) {
        var e = this;
        try {
            var i = 'https://' + o + MICROSOFT_TTS_URL, s = new XMLHttpRequest();
            return s.open('POST', i), s.setRequestHeader('Authorization', 'Bearer ' + n), s.setRequestHeader('cache-control', 'no-cache'), 
            s.setRequestHeader('X-Microsoft-OutputFormat', MICROSOFT_AUDIO_FORMAT), s.setRequestHeader('Content-Type', 'application/ssml+xml'), 
            s.responseType = 'arraybuffer', s.onload = function() {
                console.log('Response:', s), e.mAudioPlayer.decode(t, s.response);
            }, s.onerror = function(t) {
                e._error('_sentToTTS', t.message);
            }, s.send(r), 0;
        } catch (t) {
            return this._exception('_sendToTTS', t), -1;
        }
    }, o.prototype._start = function(t) {
        var o = this;
        if (console.log('MicrosoftTTS._start: Start', t), !t || !t.text || 'string' != typeof t.text) return this._error('_start', 'kein Text uebergeben'), 
        -1;
        try {
            if (this.mAudioPlayer = new MicrosoftAudioPlayer(this.mAudioContext), !this.mAudioPlayer) return this._error('_start', 'AudioPlayer wurde nicht erzeugt'), 
            -1;
            this.mAudioPlayer.onAudioStart = function() {
                o._onStart();
            }, this.mAudioPlayer.onAudioStop = function() {
                o._onStop();
            };
            var n = this._getSSMLBody(t.text, t.language, t.voice);
            if (!n) return -1;
            var r = {
                codec: MICROSOFT_PCM_CODEC
            };
            return this._getAccessToken(this.mConfig.region, this.mConfig.subscriptionKey).then(function(t) {
                o._sendToTTS(r, o.mConfig.region, t, n);
            }).catch(function() {}), this.mAudioPlayer.start(), 0;
        } catch (t) {
            return this._exception('_start', t), -1;
        }
    }, o.prototype._stop = function() {
        return this.mAudioPlayer && (this.mAudioPlayer.stop(), this.mAudioPlayer = null), 
        0;
    }, o;
}(MicrosoftDevice), AUDIO_UNLOCK_TIMEOUT = 2e3, MICROSOFT_ACTION_TIMEOUT = 6e4, MicrosoftPort = function(t) {
    function o(o, n) {
        void 0 === n && (n = !0);
        var r = t.call(this, o || MICROSOFT_PORT_NAME, n) || this;
        return r.mAudioContext = null, r.mGetUserMedia = null, r.mMicrosoftConfig = null, 
        r.mMicrosoftNetwork = null, r.mMicrosoftConnect = null, r.mMicrosoftTTS = null, 
        r.mMicrosoftASR = null, r.mDynamicCredentialsFlag = !1, r.mTransaction = null, r.mRunningFlag = !1, 
        r.mDefaultOptions = null, r.mActionTimeoutId = 0, r.mActionTimeout = MICROSOFT_ACTION_TIMEOUT, 
        r;
    }
    return __extends(o, t), o.prototype.isMock = function() {
        return !1;
    }, o.prototype.getType = function() {
        return MICROSOFT_TYPE_NAME;
    }, o.prototype.getClass = function() {
        return 'MicrosoftPort';
    }, o.prototype.getVersion = function() {
        return MICROSOFT_API_VERSION;
    }, o.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.microsoftRegion && (!!t.microsoftRegion && ('string' == typeof t.microsoftSubscriptionKey && !!t.microsoftSubscriptionKey)));
    }, o.prototype._initAllObject = function(t) {
        var o = this, n = new FileHtml5Reader();
        n.init();
        var r = new AudioHtml5Reader();
        if (r.init({
            audioContext: this.mAudioContext
        }), this.mMicrosoftConfig = new MicrosoftConfig(n), 0 !== this.mMicrosoftConfig.init(t)) return -1;
        if (this.mMicrosoftNetwork = new MicrosoftNetwork(), this.mMicrosoftNetwork.onOnline = function() {
            return o._onOnline();
        }, this.mMicrosoftNetwork.onOffline = function() {
            return o._onOffline();
        }, this.mMicrosoftNetwork.onError = function(t) {
            return o._onError(t);
        }, 0 !== this.mMicrosoftNetwork.init(t)) return -1;
        if (this.mMicrosoftConnect = new MicrosoftConnect(this.mMicrosoftConfig), this.mMicrosoftConnect._setErrorOutputFunc(function(t) {
            return o._onError(new Error(t));
        }), this.mAudioContext) {
            this.mMicrosoftTTS = new MicrosoftTTS(this.mMicrosoftConfig, this.mMicrosoftConnect, this.mAudioContext), 
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
                this.mGetUserMedia && (this.mMicrosoftASR = new MicrosoftASR(this.mMicrosoftConfig, this.mMicrosoftConnect, this.mAudioContext, this.mGetUserMedia, r), 
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
    }, o.prototype.init = function(o) {
        if (this.mInitFlag) return this._error('init', 'Port ist bereits initialisiert'), 
        0;
        if (!window.SpeechSDK) return this._error('init', 'Microsoft SpeechSDK ist nicht vorhanden'), 
        -1;
        if (o && 'boolean' == typeof o.microsoftDynamicCredentialsFlag && o.microsoftDynamicCredentialsFlag) console.log('MicrosoftPort.init: dynamic credentials eingeschaltet'), 
        this.mDynamicCredentialsFlag = !0; else if (!this._checkCredentials(o)) return this._error('init', 'keine Region und/oder SubscriptionKey als Parameter uebergeben'), 
        -1;
        var n = FactoryManager.get(AUDIOCONTEXT_FACTORY_NAME, AudioContextFactory);
        if (n) {
            var r = n.create();
            r && (this.mAudioContext = new r());
        }
        var e = FactoryManager.get(USERMEDIA_FACTORY_NAME, UserMediaFactory);
        return e && (this.mGetUserMedia = e.create()), 0 !== this._initAllObject(o) ? -1 : 0 !== t.prototype.init.call(this, o) ? -1 : (this.isErrorOutput() && (this.mMicrosoftTTS ? console.log('MicrosoftPort: TTS ist vorhanden') : console.log('MicrosoftPort: TTS ist nicht vorhanden'), 
        this.mMicrosoftASR ? console.log('MicrosoftPort: ASR ist vorhanden') : console.log('MicrosoftPort: ASR ist nicht vorhanden')), 
        0);
    }, o.prototype.done = function() {
        return t.prototype.done.call(this), this._clearActionTimeout(), this.mMicrosoftNetwork && (this.mMicrosoftNetwork.done(), 
        this.mMicrosoftNetwork = null), this.mMicrosoftConnect && (this.mMicrosoftConnect.disconnect(), 
        this.mMicrosoftConnect = null), this.mMicrosoftConfig && (this.mMicrosoftConfig.done(), 
        this.mMicrosoftConfig = null), this.mMicrosoftTTS = null, this.mMicrosoftASR = null, 
        this.mAudioContext && (this.mAudioContext.close(), this.mAudioContext = null), this.mGetUserMedia = null, 
        this.mDynamicCredentialsFlag = !1, this.mTransaction = null, this.mRunningFlag = !1, 
        this.mDefaultOptions = null, this.mActionTimeoutId = 0, this.mActionTimeout = MICROSOFT_ACTION_TIMEOUT, 
        0;
    }, o.prototype.reset = function(o) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, o);
    }, o.prototype._setErrorOutput = function(o) {
        t.prototype._setErrorOutput.call(this, o), this.mMicrosoftConfig && this.mMicrosoftConfig._setErrorOutput(o), 
        this.mMicrosoftNetwork && this.mMicrosoftNetwork._setErrorOutput(o), this.mMicrosoftConnect && this.mMicrosoftConnect._setErrorOutput(o), 
        this.mMicrosoftTTS && this.mMicrosoftTTS._setErrorOutput(o), this.mMicrosoftASR && this.mMicrosoftASR._setErrorOutput(o);
    }, o.prototype._breakAction = function() {
        this.mActionTimeoutId = 0, this.mTransaction && (this._error('_breakAction', 'Timeout fuer Action erreicht'), 
        this._onStop(this.mTransaction.plugin, this.mTransaction.type));
    }, o.prototype._setActionTimeout = function() {
        var t = this;
        0 === this.mActionTimeoutId && this.mActionTimeout > 0 && (this.mActionTimeoutId = window.setTimeout(function() {
            return t._breakAction();
        }, this.mActionTimeout));
    }, o.prototype._clearActionTimeout = function() {
        this.mActionTimeoutId > 0 && (clearTimeout(this.mActionTimeoutId), this.mActionTimeoutId = 0);
    }, o.prototype._onOnline = function() {
        return 0;
    }, o.prototype._onOffline = function() {
        return 0;
    }, o.prototype._onStop = function(o, n) {
        return this._clearActionTimeout(), this.mTransaction = null, this.mRunningFlag = !1, 
        t.prototype._onStop.call(this, o, n);
    }, o.prototype._unlockAudio = function(t) {
        if (this.mAudioContext) {
            if ('running' === this.mAudioContext.state) return void t(!0);
            if ('suspended' === this.mAudioContext.state) {
                var o = setTimeout(function() {
                    return t(!1);
                }, AUDIO_UNLOCK_TIMEOUT);
                this.mAudioContext.resume().then(function() {
                    clearTimeout(o), t(!0);
                }, function(n) {
                    console.log('MicrosoftPort._unlockAudio:', n), clearTimeout(o), t(!1);
                });
            } else t(!1);
        } else t(!1);
    }, o.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this._error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return 'string' == typeof t.microsoftRegion && t.microsoftRegion && (this.mMicrosoftConfig.region = t.microsoftRegion), 
            'string' == typeof t.microsoftSubscriptionKey && t.microsoftSubscriptionKey && (this.mMicrosoftConfig.subscriptionKey = t.microsoftSubscriptionKey, 
            console.log('MicrosoftPort.setConfig: neue Credentials eintragen ', t.microsoftSubscriptionKey), 
            this.mMicrosoftConnect.disconnect(), this.mMicrosoftConnect.connect()), 0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, o.prototype.getConfig = function() {
        return {
            microsoftRegion: this.mMicrosoftConfig.region,
            microsoftSubscriptionKey: this.mMicrosoftConfig.subscriptionKey
        };
    }, o.prototype.isOnline = function() {
        return !!this.mMicrosoftNetwork && this.mMicrosoftNetwork.isOnline();
    }, o.prototype.isOpen = function() {
        return !!this.mMicrosoftConnect && this.mMicrosoftConnect.isConnect();
    }, o.prototype._checkOpen = function(t) {
        if (!this.isOnline()) return this._error('_checkOpen', 'kein Netz vorhanden'), t(!1), 
        -1;
        var o = this.open();
        return t(0 === o), o;
    }, o.prototype.open = function(t) {
        if (!this.mMicrosoftConnect) return this._error('open', 'kein MicrosoftConnect vorhanden'), 
        -1;
        if (this.isOpen()) return 0;
        var o = this.mMicrosoftConnect.connect();
        return 0 === o && this._onOpen(), o;
    }, o.prototype.close = function() {
        return this.isOpen() && this.mMicrosoftConnect ? (this._onClose(), this.mMicrosoftConnect.disconnect()) : 0;
    }, o.prototype.getPluginName = function() {
        return this.mTransaction ? this.mTransaction.plugin : '';
    }, o.prototype.getActionName = function() {
        return this.mTransaction ? this.mTransaction.type : '';
    }, o.prototype.isRunning = function(t, o) {
        if (!t && !o) return this.mRunningFlag;
        if (t === this.getPluginName()) {
            if (!o) return this.mRunningFlag;
            if (o === this.getActionName()) return this.mRunningFlag;
        }
        return !1;
    }, o.prototype.isAction = function(t) {
        var o = !1;
        switch (t) {
          case MICROSOFT_ASR_ACTION:
            o = !!this.mMicrosoftASR;
            break;

          case MICROSOFT_TTS_ACTION:
            o = !!this.mMicrosoftTTS;
        }
        return o;
    }, o.prototype.setActionTimeout = function(t) {
        this.mActionTimeout = t;
    }, o.prototype.start = function(t, o, n) {
        var r = this;
        return this.isRunning() ? (this._error('start', 'Aktion laeuft bereits'), -1) : this.mMicrosoftConfig.isCredentials() ? this.mTransaction ? (this._error('start', 'andere Transaktion laeuft noch'), 
        -1) : this._checkOpen(function(e) {
            if (!e) return -1;
            r._setActionTimeout();
            var i = n || {};
            r.mPluginName = t, r.mRunningFlag = !0;
            var s = 0;
            switch (o) {
              case MICROSOFT_NLU_ACTION:
                r.mTransaction = new MicrosoftTransaction(t, MICROSOFT_NLU_ACTION), s = r._startNLU(r.mTransaction, i.text, i.language || MICROSOFT_DEFAULT_LANGUAGE);
                break;

              case MICROSOFT_ASRNLU_ACTION:
                r.mTransaction = new MicrosoftTransaction(t, MICROSOFT_ASRNLU_ACTION), s = r._startASR(r.mTransaction, i.language || MICROSOFT_DEFAULT_LANGUAGE, i.audioURL || '', !0, i.useProgressive || !1);
                break;

              case MICROSOFT_ASR_ACTION:
                r.mTransaction = new MicrosoftTransaction(t, MICROSOFT_ASR_ACTION), s = r._startASR(r.mTransaction, i.language || MICROSOFT_DEFAULT_LANGUAGE, i.audioURL || '', !1, i.useProgressive || !1);
                break;

              case MICROSOFT_TTS_ACTION:
                r.mTransaction = new MicrosoftTransaction(t, MICROSOFT_TTS_ACTION), s = r._startTTS(r.mTransaction, i.text, i.language || MICROSOFT_DEFAULT_LANGUAGE, i.voice || MICROSOFT_DEFAULT_VOICE);
                break;

              default:
                r._clearActionTimeout(), r._error('start', 'Keine gueltige Aktion uebergeben ' + o), 
                s = -1;
            }
            return s;
        }) : (this._error('start', 'Port hat keine Credentials'), -1);
    }, o.prototype.stop = function(t, o, n) {
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
        var r = 0;
        switch (o) {
          case MICROSOFT_NLU_ACTION:
            r = this._stopNLU(this.mTransaction);
            break;

          case MICROSOFT_ASR_ACTION:
            r = this._stopASR(this.mTransaction);
            break;

          case MICROSOFT_TTS_ACTION:
            r = this._stopTTS(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + o), r = -1;
        }
        return this.mRunningFlag = !1, r;
    }, o.prototype._initRecognition = function(t) {
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
    }, o.prototype._startNLU = function(t, o, n) {
        return this._error('_startNLU', 'nicht implementiert'), -1;
    }, o.prototype._stopNLU = function(t) {
        return this._error('_stopNLU', 'nicht implementiert'), -1;
    }, o.prototype._startASR = function(t, o, n, r, e) {
        if (void 0 === r && (r = !1), void 0 === e && (e = !1), !o) return this._error('_startASR', 'keine Sprache uebergeben'), 
        -1;
        if (!this.mMicrosoftASR) return this._error('_startASR', 'keine Microsoft ASR-Anbindung vorhanden'), 
        -1;
        try {
            var i = {
                language: o,
                nlu: r,
                progressive: e
            };
            return n && (i.audioURL = n), this.mMicrosoftASR.start(t, i);
        } catch (t) {
            return this._exception('_startASR', t), -1;
        }
    }, o.prototype._stopASR = function(t) {
        if (!this.mMicrosoftASR) return this._error('_stopASR', 'keine Microsoft ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this.mMicrosoftASR.stop(t);
        } catch (t) {
            return this._exception('_stopASR', t), -1;
        }
    }, o.prototype._startTTS = function(t, o, n, r) {
        var e = this;
        if (!o) return this._error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.mMicrosoftTTS) return this._error('_startTTS', 'keine Microsoft TTS-Anbindung vorhanden'), 
        -1;
        try {
            var i = {
                text: o,
                language: n,
                voice: r
            };
            return this._unlockAudio(function(o) {
                o ? e.mMicrosoftTTS.start(t, i) : (e._error('_startTTS', 'AudioContext ist nicht entsperrt'), 
                e._onStop(t.plugin, t.type));
            }), 0;
        } catch (t) {
            return this._exception('_startTTS', t), -1;
        }
    }, o.prototype._stopTTS = function(t) {
        if (!this.mMicrosoftTTS) return this._error('_stopTTS', 'keine Microsoft TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this.mMicrosoftTTS.stop(t);
        } catch (t) {
            return this._exception('_stopTTS', t), -1;
        }
    }, o;
}(Port), MICROSOFTMOCK_CALLBACK_TIMEOUT = 100, MicrosoftMock = function(t) {
    function o(o, n) {
        void 0 === n && (n = !0);
        var r = t.call(this, o || MICROSOFT_MOCK_NAME, n) || this;
        return r.audioContextFlag = !0, r.getUserMediaFlag = !0, r.microsoftNLUFlag = !0, 
        r.microsoftASRFlag = !0, r.microsoftTTSFlag = !0, r.disconnectFlag = !0, r.defaultOptions = null, 
        r.codec = '', r.intentName = 'TestIntent', r.intentConfidence = 1, r.mDynamicCredentialsFlag = !1, 
        r.mTransaction = null, r.mRunningFlag = !1, r.microsoftRegion = '', r.microsoftSubscriptionKey = '', 
        r.microsoftNluTag = '', r;
    }
    return __extends(o, t), o.prototype.isMock = function() {
        return !0;
    }, o.prototype.getType = function() {
        return MICROSOFT_TYPE_NAME;
    }, o.prototype.getClass = function() {
        return 'MicrosoftMock';
    }, o.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.microsoftRegion && (this.microsoftRegion = t.microsoftRegion), 
        'string' == typeof t.microsoftSubscriptionKey && (this.microsoftSubscriptionKey = t.microsoftSubscriptionKey), 
        'string' == typeof t.microsoftNluTag && (this.microsoftNluTag = t.microsoftNluTag), 
        'string' == typeof t.microsoftRegion && (!!t.microsoftRegion && ('string' == typeof t.microsoftSubscriptionKey && !!t.microsoftSubscriptionKey)));
    }, o.prototype.init = function(o) {
        if (this.mInitFlag) return this._error('init', 'Init bereits aufgerufen'), 0;
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
        return void 0 === o && (o = !1), t.prototype.done.call(this), this.audioContextFlag = !0, 
        this.getUserMediaFlag = !0, this.microsoftNLUFlag = !1, this.microsoftASRFlag = !1, 
        this.microsoftTTSFlag = !1, this.disconnectFlag = !0, this.defaultOptions = null, 
        this.codec = '', this.mTransaction = null, this.mRunningFlag = !1, 0;
    }, o.prototype.reset = function(o) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, o);
    }, o.prototype._onStop = function(o, n) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype._onStop.call(this, o, n);
    }, o.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this._error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return this.microsoftRegion = t.microsoftRegion, this.microsoftSubscriptionKey = t.microsoftSubscriptionKey, 
            0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, o.prototype.getConfig = function() {
        return {
            microsoftRegion: this.microsoftRegion,
            microsoftSubscriptionKey: this.microsoftSubscriptionKey
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
          case MICROSOFT_NLU_ACTION:
            o = this.microsoftNLUFlag;
            break;

          case MICROSOFT_ASR_ACTION:
            o = this.microsoftASRFlag;
            break;

          case MICROSOFT_TTS_ACTION:
            o = this.microsoftTTSFlag;
        }
        return o;
    }, o.prototype.start = function(t, o, n) {
        if (this.isRunning()) return this._error('start', 'Aktion laeuft bereits'), -1;
        if (!this.isOpen()) return this._error('start', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this._error('start', 'Port hat keine Credentials'), 
        -1;
        if (this.mTransaction) return this._error('start', 'andere Transaktion laeuft noch'), 
        -1;
        var r = n || {};
        this.mRunningFlag = !0;
        var e = 0;
        switch (o) {
          case MICROSOFT_NLU_ACTION:
            this.mTransaction = new MicrosoftTransaction(t, MICROSOFT_NLU_ACTION), e = this._startNLU(this.mTransaction, r.text, r.language || MICROSOFT_DEFAULT_LANGUAGE);
            break;

          case MICROSOFT_ASRNLU_ACTION:
            this.mTransaction = new MicrosoftTransaction(t, MICROSOFT_ASRNLU_ACTION), e = this._startASR(this.mTransaction, r.language || MICROSOFT_DEFAULT_LANGUAGE, r.audioURL || '', !0, r.useProgressive || !1);
            break;

          case MICROSOFT_ASR_ACTION:
            this.mTransaction = new MicrosoftTransaction(t, MICROSOFT_ASR_ACTION), e = this._startASR(this.mTransaction, r.language || MICROSOFT_DEFAULT_LANGUAGE, r.audioURL || '', !1, r.useProgressive || !1);
            break;

          case MICROSOFT_TTS_ACTION:
            this.mTransaction = new MicrosoftTransaction(t, MICROSOFT_TTS_ACTION), e = this._startTTS(this.mTransaction, r.text, r.language || MICROSOFT_DEFAULT_LANGUAGE, r.voice || MICROSOFT_DEFAULT_VOICE);
            break;

          default:
            this._error('start', 'Keine gueltige Aktion uebergeben ' + o), e = -1;
        }
        return e;
    }, o.prototype.stop = function(t, o, n) {
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
        var r = 0;
        switch (o) {
          case MICROSOFT_NLU_ACTION:
            r = this._stopNLU(this.mTransaction);
            break;

          case MICROSOFT_ASRNLU_ACTION:
          case MICROSOFT_ASR_ACTION:
            r = this._stopASR(this.mTransaction);
            break;

          case MICROSOFT_TTS_ACTION:
            r = this._stopTTS(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + o), r = -1;
        }
        return this.mTransaction = null, this.mRunningFlag = !1, r;
    }, o.prototype._startNLU = function(t, o, n) {
        if (!o) return this._error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!this.microsoftNLUFlag) return this._error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden'), 
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
                literal: o
            } ];
            return t.result = r, this._onResult(t.result, t.plugin, t.type), this._onStop(t.plugin, t.type), 
            0;
        } catch (t) {
            return this._exception('_startNLU', t), -1;
        }
    }, o.prototype._stopNLU = function(t) {
        return this._onStop(t.plugin, t.type), 0;
    }, o.prototype._startASR = function(t, o, n, r, e) {
        if (void 0 === r && (r = !1), void 0 === e && (e = !1), !this.microsoftASRFlag) return this._error('_startASR', 'keine Nuance ASR-Anbindung vorhanden'), 
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
    }, o.prototype._startTTS = function(t, o, n, r) {
        var e = this;
        if (!o) return this._error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.microsoftTTSFlag) return this._error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), setTimeout(function() {
                return e._onStop(t.plugin, t.type);
            }, MICROSOFTMOCK_CALLBACK_TIMEOUT), 0;
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
}(Port), Microsoft = function() {
    function t() {}
    return t.setErrorOutputOn = function() {
        t.mErrorOutputFlag = !0, PortManager.setErrorOutputOn();
    }, t.setErrorOutputOff = function() {
        t.mErrorOutputFlag = !1, PortManager.setErrorOutputOff();
    }, t.setErrorOutputFunc = function(t) {
        PortManager._setErrorOutputFunc(t);
    }, t._initMicrosoftPort = function(o) {
        var n = PortManager.get(MICROSOFT_TYPE_NAME, MicrosoftPort);
        return n ? 0 !== n.init(o) ? (PortManager.remove(MICROSOFT_TYPE_NAME), -1) : (t.mCurrentPort = n, 
        0) : -1;
    }, t._initMicrosoftMock = function(o) {
        var n = PortManager.get(MICROSOFT_TYPE_NAME, MicrosoftMock);
        return n ? 0 !== n.init(o) ? (console.log('Microsoft._initMicrosoftMock: Error MicrosoftMock wurde nicht initialisiert'), 
        PortManager.remove(MICROSOFT_TYPE_NAME), -1) : (t.mCurrentPort = n, 0) : (console.log('Microsoft._initMicrosoftMock: Error MicrosoftMock wurde nicht erzeugt'), 
        -1);
    }, t.init = function(o) {
        if (t.mInitFlag) return 0;
        if (!o) return t.mErrorOutputFlag && console.log('Microsoft.init: Keine Microsoft-Parameter uebergeben'), 
        -1;
        'boolean' == typeof o.errorOutputFlag && (o.errorOutputFlag ? t.setErrorOutputOn() : t.setErrorOutputOff());
        var n = 'MicrosoftPort';
        if (o && 'string' == typeof o.microsoftPortName && 'MicrosoftMock' === o.microsoftPortName && (n = 'MicrosoftMock'), 
        'MicrosoftPort' === n) {
            if (0 !== t._initMicrosoftPort(o)) return -1;
        } else {
            if ('MicrosoftMock' !== n) return t.mErrorOutputFlag && console.log('Microsoft.init: Kein Microsoft PortName vorhanden'), 
            -1;
            if (0 !== t._initMicrosoftMock(o)) return -1;
        }
        return t.mInitFlag = !0, 0;
    }, t.isInit = function() {
        return t.mInitFlag;
    }, t.done = function() {
        var o = PortManager.find(MICROSOFT_TYPE_NAME);
        o || (o = t.mCurrentPort);
        var n = 0;
        return o && (n = o.done(), PortManager.remove(MICROSOFT_TYPE_NAME)), t.mCurrentPort = null, 
        t.mInitFlag = !1, n;
    }, t._onOpenEvent = function(o, n, r, e) {
        if ('function' == typeof e) try {
            return e(o, n, r), 0;
        } catch (o) {
            return t.mErrorOutputFlag && console.log('Microsoft._onOpenEvent: Exception', o.message), 
            -1;
        }
        return 0;
    }, t._openMicrosoftPort = function(o) {
        var n = PortManager.find(MICROSOFT_TYPE_NAME);
        return n || (n = t.mCurrentPort), n ? (n.addOpenEvent(MICROSOFT_TYPE_NAME, function(r) {
            return n.removeErrorEvent(MICROSOFT_TYPE_NAME), n.removeOpenEvent(MICROSOFT_TYPE_NAME), 
            'function' == typeof o && t._onOpenEvent(null, MICROSOFT_TYPE_NAME, r.result, o), 
            r.result;
        }), n.addErrorEvent(MICROSOFT_TYPE_NAME, function(r) {
            return n.removeOpenEvent(MICROSOFT_TYPE_NAME), n.removeErrorEvent(MICROSOFT_TYPE_NAME), 
            'function' == typeof o && t._onOpenEvent(r, MICROSOFT_TYPE_NAME, -1, o), 0;
        }), n.open()) : (t.mErrorOutputFlag && console.log('Microsoft._openMicrosoftPort: kein Port vorhanden'), 
        t._onOpenEvent(new Error('Microsoft._openMicrosoftPort: Kein Port vorhanden'), MICROSOFT_TYPE_NAME, -1, o), 
        -1);
    }, t.open = function(o) {
        return t.mInitFlag ? t._openMicrosoftPort(o) : (t.mErrorOutputFlag && console.log('Microsoft.open: Init wurde nicht aufgerufen'), 
        t._onOpenEvent(new Error('Microsoft.open: Init wurde nicht aufgerufen'), MICROSOFT_TYPE_NAME, -1, o), 
        -1);
    }, t.setConfig = function(o) {
        return t.mCurrentPort ? t.mCurrentPort.setConfig(o) : -1;
    }, t.getConfig = function() {
        return t.mCurrentPort ? t.mCurrentPort.getConfig() : {
            microsoftRegion: '',
            microsoftSubscriptionKey: ''
        };
    }, t.mInitFlag = !1, t.mErrorOutputFlag = !1, t.mCurrentPort = null, t;
}();

export { MICROSOFT_TYPE_NAME, MICROSOFT_TTS_ACTION, MICROSOFT_ASR_ACTION, MICROSOFT_ASRNLU_ACTION, MICROSOFT_NLU_ACTION, Microsoft };
