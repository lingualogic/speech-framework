/**
 * Speech-Microsoft
 * 
 * Version: 0.1.1
 * Build:   0002
 * TYPE:    ALPHA
 * Datum:   28.08.2019
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

import { PortManager } from '../../core/port/port-manager.ts';

import { FactoryManager } from '../../core/factory/factory-manager.ts';

import { Port } from '../../core/port/port.ts';

import { FileHtml5Reader } from '../../common/html5/file-html5-reader.ts';

import { AudioHtml5Reader } from '../../common/html5/audio-html5-reader.ts';

import { AUDIOCONTEXT_FACTORY_NAME, AudioContextFactory } from '../../common/html5/audiocontext-factory.ts';

import { USERMEDIA_FACTORY_NAME, UserMediaFactory } from '../../common/html5/usermedia-factory.ts';

import { ErrorBase } from '../../core/error/error-base.ts';

import { NetHtml5Connect } from '../../common/html5/net-html5-connect.ts';

var MICROSOFT_TYPE_NAME = 'Microsoft', MICROSOFT_PORT_NAME = 'MicrosoftPort', MICROSOFT_MOCK_NAME = 'MicrosoftMock', MICROSOFT_SERVER_URL = '', MICROSOFT_DEFAULT_URL = MICROSOFT_SERVER_URL, MICROSOFT_NLU_ACTION = 'NLU', MICROSOFT_ASR_ACTION = 'ASR', MICROSOFT_ASRNLU_ACTION = 'ASRNLU', MICROSOFT_TTS_ACTION = 'TTS', MICROSOFT_CONFIG_PATH = 'assets/', MICROSOFT_CONFIG_FILE = 'microsoft.json', MICROSOFT_CONFIG_LOAD = !1, MICROSOFT_DE_LANGUAGE = 'de-DE', MICROSOFT_DEFAULT_LANGUAGE = MICROSOFT_DE_LANGUAGE, MICROSOFT_TTS_VOICE1 = 'de-DE-Hedda', MICROSOFT_TTS_VOICE = MICROSOFT_TTS_VOICE1, MICROSOFT_DEFAULT_VOICE = MICROSOFT_TTS_VOICE, MICROSOFT_PCM_CODEC = 'audio/L16;rate=16000', MICROSOFT_AUDIOSAMPLE_RATE = 16e3, MICROSOFT_AUDIO_FORMAT = 'raw-16khz-16bit-mono-pcm', extendStatics = function(t, o) {
    return (extendStatics = Object.setPrototypeOf || {
        __proto__: []
    } instanceof Array && function(t, o) {
        t.__proto__ = o;
    } || function(t, o) {
        for (var r in o) o.hasOwnProperty(r) && (t[r] = o[r]);
    })(t, o);
};

function __extends(t, o) {
    function r() {
        this.constructor = t;
    }
    extendStatics(t, o), t.prototype = null === o ? Object.create(o) : (r.prototype = o.prototype, 
    new r());
}

var MICROSOFT_VERSION_NUMBER = '0.1.1', MICROSOFT_VERSION_BUILD = '0002', MICROSOFT_VERSION_TYPE = 'ALPHA', MICROSOFT_VERSION_DATE = '28.08.2019', MICROSOFT_VERSION_STRING = MICROSOFT_VERSION_NUMBER + '.' + MICROSOFT_VERSION_BUILD + ' vom ' + MICROSOFT_VERSION_DATE + ' (' + MICROSOFT_VERSION_TYPE + ')', MICROSOFT_API_VERSION = MICROSOFT_VERSION_STRING, MicrosoftTransaction = function() {
    function t(o, r) {
        void 0 === o && (o = ''), void 0 === r && (r = ''), this.transactionId = 0, this.plugin = '', 
        this.type = '', this.result = null, this.error = null, this.plugin = o, this.type = r, 
        t.mTransactionCounter += 1, this.transactionId = t.mTransactionCounter;
    }
    return t.mTransactionCounter = 0, t;
}(), MicrosoftConfig = function(t) {
    function o(o) {
        var r = t.call(this, 'MicrosoftConfig') || this;
        return r.mInitFlag = !1, r.mConfigPath = MICROSOFT_CONFIG_PATH, r.mConfigFile = MICROSOFT_CONFIG_FILE, 
        r.mConfigLoadFlag = MICROSOFT_CONFIG_LOAD, r.mConfigServerUrl = MICROSOFT_DEFAULT_URL, 
        r.mConfigRegion = '', r.mConfigSubscriptionKey = '', r.mConfigLuisEndpoint = '', 
        r.mConfigUserId = '', r.mConfigNluTag = '', r.mFileReader = null, r.mOnInitFunc = null, 
        r.mOnErrorFunc = null, r.mFileReader = o, r._setErrorOutputFunc(function(t) {
            return r._onError(new Error(t));
        }), r;
    }
    return __extends(o, t), o.prototype._setOption = function(t) {
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
        return this.mInitFlag = !1, this.mConfigPath = MICROSOFT_CONFIG_PATH, this.mConfigFile = MICROSOFT_CONFIG_FILE, 
        this.mConfigLoadFlag = MICROSOFT_CONFIG_LOAD, this.mConfigServerUrl = MICROSOFT_DEFAULT_URL, 
        this.mConfigRegion = '', this.mConfigSubscriptionKey = '', this.mConfigLuisEndpoint = '', 
        this.mConfigUserId = '', this.mConfigNluTag = '', this.mFileReader = null, this.mOnInitFunc = null, 
        0;
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
}(ErrorBase), MicrosoftNetwork = function(t) {
    function o() {
        return t.call(this, 'MicrosoftNetwork') || this;
    }
    return __extends(o, t), o;
}(NetHtml5Connect), MicrosoftConnect = function(t) {
    function o(o) {
        var r = t.call(this, 'MicrosoftConnect') || this;
        return r.mConfig = null, r.mConnectFlag = !1, r.mSpeechConfig = null, r.mConfig = o, 
        r;
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
    function o(o, r, n) {
        var i = t.call(this, o || 'MicrosoftDevice') || this;
        return i.mConfig = null, i.mConnect = null, i.mTransaction = null, i.onStart = null, 
        i.onStop = null, i.onResult = null, i.onError = null, i.onClose = null, i.mConfig = r, 
        i.mConnect = n, i;
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
}(ErrorBase), MicrosoftNLU = function(t) {
    function o(o, r) {
        return t.call(this, 'MicrosoftNLU', o, r) || this;
    }
    return __extends(o, t), o.prototype._start = function(t) {
        var o = this;
        console.log('MicrosoftNLU._start: ', t);
        try {
            var r = this.mConfig.luisEndpoint;
            if (!r) return this._onError(new Error('NLU-Error: kein Luis-Endpunkt vorhanden')), 
            void this._onStop();
            var n = new XMLHttpRequest(), i = r + t.text;
            n.responseType = 'json', n.onload = function(t) {
                try {
                    console.log('MicrosoftNLU._start: onload ', n.response), o._onResult(n.response);
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
}(MicrosoftDevice), MicrosoftASR = function(t) {
    function o(o, r, n, i, e) {
        var s = t.call(this, 'MicrosoftASR', o, r) || this;
        return s.mAudioContext = null, s.mGetUserMedia = null, s.mAudioReader = null, s.mAudioRecorder = null, 
        s.mUserMediaStream = null, s.mRequestId = 0, s.mVolumeCounter = 0, s.mTimeoutCounter = 0, 
        s.mRecordingFlag = !1, s.mRecognizer = null, s.mAudioContext = n, s.mGetUserMedia = i, 
        s.mAudioReader = e, s;
    }
    return __extends(o, t), o.prototype._startAudio = function(t) {}, o.prototype._startASR = function(t) {
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
        for (var r = 0; r < o.length; r++) if (t === o[r]) return !0;
        return !1;
    }, o.prototype.findPcmCodec = function(t) {
        return this._findCodec(t, PCM_L16CodecArray);
    }, o.prototype._float32ToInt16 = function(t) {
        var o = t < 0 ? 32768 * t : 32767 * t;
        return Math.max(-32768, Math.min(32768, o));
    }, o.prototype._float32ArrayToInt16Array = function(t) {
        for (var o = new Int16Array(t.length), r = 0; r < t.length; ) o[r] = this._float32ToInt16(t[r++]);
        return o;
    }, o.prototype.encodePCM = function(t, o) {
        return this.findPcmCodec(o) ? [ this._float32ArrayToInt16Array(t) ] : [ t ];
    }, o.prototype.decodePCM = function(t) {
        try {
            for (var o = new Uint8Array(t), r = o.length, n = new Float32Array(r / 2), i = new Int16Array(1), e = 0, s = 0; s < r; s += 2) i[0] = (o[s + 1] << 8) + o[s], 
            n[e] = i[0] / 32768, e++;
            return n;
        } catch (t) {
            return this._exception('decodePCM', t), [];
        }
    }, o;
}(ErrorBase), MicrosoftResampler = function() {
    function t(t, o, r, n, i) {
        this.fromSampleRate = 0, this.toSampleRate = 0, this.channels = 0, this.outputBufferSize = 0, 
        this.noReturn = !1, this.resampler = null, this.ratioWeight = 0, this.interpolate = null, 
        this.lastWeight = 0, this.outputBuffer = null, this.lastOutput = null, this.fromSampleRate = t, 
        this.toSampleRate = o, this.channels = r || 0, this.outputBufferSize = n, this.noReturn = !!i, 
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
        var r = t.call(this, 'MicrosoftAudioPlayer') || this;
        return r.mAudioContext = null, r.mAudioCodec = null, r.mResampler = null, r.mOnAudioStartFunc = null, 
        r.mOnAudioStopFunc = null, r.mAudioSource = null, r.mAudioArray = [], r.mQueue = [], 
        r.mBeginSpeakFlag = !0, r.mAudioStopFlag = !1, r.mAudioContext = o, r.mAudioCodec = new MicrosoftAudioCodec(), 
        r;
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
            var r = new Float32Array(t.length);
            r.set(t), (o = new AudioBuffer({
                length: r.length,
                numberOfChannels: 1,
                sampleRate: MICROSOFT_AUDIOSAMPLE_RATE
            })).getChannelData(0).set(r);
        } catch (t) {
            o = null, console.log('MicrosoftAudioPlayer._getAudioBufferFirst: Exception', t);
        }
        return o;
    }, o.prototype._getAudioBufferSecond = function(t) {
        var o = null;
        try {
            var r = new Float32Array(t.length);
            r.set(t), (o = this.mAudioContext.createBuffer(1, r.length, MICROSOFT_AUDIOSAMPLE_RATE)).getChannelData(0).set(r);
        } catch (t) {
            o = null, console.log('MicrosoftAudioPlayer._getAudioBufferSecond: Exception', t);
        }
        return o;
    }, o.prototype._getAudioBufferResample = function(t) {
        var o = null;
        try {
            var r = new Float32Array(1.4 * t.length);
            r.set(t), this.mResampler = new MicrosoftResampler(MICROSOFT_AUDIOSAMPLE_RATE, AUDIO_MIN_SAMPLERATE, 1, r.length, void 0);
            var n = this.mResampler.resampler(r);
            (o = this.mAudioContext.createBuffer(1, n.length, AUDIO_MIN_SAMPLERATE)).getChannelData(0).set(n);
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
            var r = t.shift(), n = this._getAudioBufferFirst(r);
            if (n || (n = this._getAudioBufferSecond(r)), n || (n = this._getAudioBufferResample(r)), 
            !n) return void this._error('playByStream', 'kein Audiobuffer erzeugt');
            this.mAudioSource.buffer = n, this.mAudioSource.connect(this.mAudioContext.destination), 
            this.mAudioSource.start ? this.mAudioSource.start(0) : this.mAudioSource.noteOn(0), 
            this._onAudioStart(), console.log('MicrosoftAudioPlayer.playByStream: end');
        } catch (t) {
            this.mBeginSpeakFlag = !0, this._onAudioStop(), this.mAudioSource = null, this._exception('playByStream', t);
        }
    }, o.prototype.decode = function(t, o) {
        try {
            if (console.log('MicrosoftAudioPlayer.decode: start'), this.mAudioCodec.findPcmCodec(t.codec)) {
                var r = this.mAudioCodec.decodePCM(o);
                this.mAudioArray.push(r), this.mQueue.push(r), console.log('MicrosoftAudioPlayer.decode: end'), 
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
    function o(o, r, n) {
        var i = t.call(this, 'MicrosoftTTS', o, r) || this;
        return i.mAudioContext = null, i.mAudioPlayer = null, i.mAccessToken = '', i.mAudioContext = n, 
        i;
    }
    return __extends(o, t), o.prototype._getAccessToken = function(t, o) {
        var r = this;
        return new Promise(function(n, i) {
            try {
                var e = 'https://' + t + MICROSOFT_ACCESSTOKEN_URL, s = new XMLHttpRequest();
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
        });
    }, o.prototype._getSSMLBody = function(t, o, r) {
        return t ? o ? r ? "<?xml version=\"1.0\"?><speak version=\"1.0\" xml:lang=\"" + o + "\"><voice xml:lang=\"" + o + "\" name=\"" + r + "\">" + t + "</voice></speak>" : (this._error('getSSMLBody', 'keine Stimme uebergeben'), 
        '') : (this._error('getSSMLBody', 'keine Sprache uebergeben'), '') : (this._error('getSSMLBody', 'kein Text uebergeben'), 
        '');
    }, o.prototype._sendToTTS = function(t, o, r, n) {
        var i = this;
        try {
            var e = 'https://' + o + MICROSOFT_TTS_URL, s = new XMLHttpRequest();
            return s.open('POST', e), s.setRequestHeader('Authorization', 'Bearer ' + r), s.setRequestHeader('cache-control', 'no-cache'), 
            s.setRequestHeader('X-Microsoft-OutputFormat', MICROSOFT_AUDIO_FORMAT), s.setRequestHeader('Content-Type', 'application/ssml+xml'), 
            s.responseType = 'arraybuffer', s.onload = function() {
                console.log('Response:', s), i.mAudioPlayer.decode(t, s.response);
            }, s.onerror = function(t) {
                i._error('_sentToTTS', t.message);
            }, s.send(n), 0;
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
            var r = this._getSSMLBody(t.text, t.language, t.voice);
            if (!r) return -1;
            var n = {
                codec: MICROSOFT_PCM_CODEC
            };
            return this._getAccessToken(this.mConfig.region, this.mConfig.subscriptionKey).then(function(t) {
                o._sendToTTS(n, o.mConfig.region, t, r);
            }).catch(function() {}), this.mAudioPlayer.start(), 0;
        } catch (t) {
            return this._exception('_start', t), -1;
        }
    }, o.prototype._stop = function() {
        return this.mAudioPlayer && (this.mAudioPlayer.stop(), this.mAudioPlayer = null), 
        0;
    }, o;
}(MicrosoftDevice), AUDIO_UNLOCK_TIMEOUT = 2e3, MICROSOFT_ACTION_TIMEOUT = 6e4, MicrosoftPort = function(t) {
    function o(o, r) {
        void 0 === r && (r = !0);
        var n = t.call(this, o || MICROSOFT_PORT_NAME, r) || this;
        return n.mAudioContext = null, n.mGetUserMedia = null, n.mMicrosoftConfig = null, 
        n.mMicrosoftNetwork = null, n.mMicrosoftConnect = null, n.mMicrosoftTTS = null, 
        n.mMicrosoftASR = null, n.mMicrosoftNLU = null, n.mDynamicCredentialsFlag = !1, 
        n.mTransaction = null, n.mRunningFlag = !1, n.mDefaultOptions = null, n.mActionTimeoutId = 0, 
        n.mActionTimeout = MICROSOFT_ACTION_TIMEOUT, n;
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
        var o = this, r = new FileHtml5Reader();
        r.init();
        var n = new AudioHtml5Reader();
        if (n.init({
            audioContext: this.mAudioContext
        }), this.mMicrosoftConfig = new MicrosoftConfig(r), 0 !== this.mMicrosoftConfig.init(t)) return -1;
        if (this.mMicrosoftNetwork = new MicrosoftNetwork(), this.mMicrosoftNetwork.onOnline = function() {
            return o._onOnline();
        }, this.mMicrosoftNetwork.onOffline = function() {
            return o._onOffline();
        }, this.mMicrosoftNetwork.onError = function(t) {
            return o._onError(t);
        }, 0 !== this.mMicrosoftNetwork.init(t)) return -1;
        if (this.mMicrosoftConnect = new MicrosoftConnect(this.mMicrosoftConfig), this.mMicrosoftConnect._setErrorOutputFunc(function(t) {
            return o._onError(new Error(t));
        }), this.mMicrosoftNLU = new MicrosoftNLU(this.mMicrosoftConfig, this.mMicrosoftConnect), 
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
                this.mGetUserMedia && (this.mMicrosoftASR = new MicrosoftASR(this.mMicrosoftConfig, this.mMicrosoftConnect, this.mAudioContext, this.mGetUserMedia, n), 
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
        var r = FactoryManager.get(AUDIOCONTEXT_FACTORY_NAME, AudioContextFactory);
        if (r) {
            var n = r.create();
            n && (this.mAudioContext = new n());
        }
        var i = FactoryManager.get(USERMEDIA_FACTORY_NAME, UserMediaFactory);
        return i && (this.mGetUserMedia = i.create()), 0 !== this._initAllObject(o) ? -1 : 0 !== t.prototype.init.call(this, o) ? -1 : (this.isErrorOutput() && (this.mMicrosoftNLU ? console.log('MicrosoftPort: NLU ist vorhanden') : console.log('MicrosoftPort: NLU ist nicht vorhanden'), 
        this.mMicrosoftTTS ? console.log('MicrosoftPort: TTS ist vorhanden') : console.log('MicrosoftPort: TTS ist nicht vorhanden'), 
        this.mMicrosoftASR ? console.log('MicrosoftPort: ASR ist vorhanden') : console.log('MicrosoftPort: ASR ist nicht vorhanden')), 
        0);
    }, o.prototype.done = function() {
        return t.prototype.done.call(this), this._clearActionTimeout(), this.mMicrosoftNetwork && (this.mMicrosoftNetwork.done(), 
        this.mMicrosoftNetwork = null), this.mMicrosoftConnect && (this.mMicrosoftConnect.disconnect(), 
        this.mMicrosoftConnect = null), this.mMicrosoftConfig && (this.mMicrosoftConfig.done(), 
        this.mMicrosoftConfig = null), this.mMicrosoftTTS = null, this.mMicrosoftASR = null, 
        this.mMicrosoftNLU = null, this.mAudioContext && (this.mAudioContext.close(), this.mAudioContext = null), 
        this.mGetUserMedia = null, this.mDynamicCredentialsFlag = !1, this.mTransaction = null, 
        this.mRunningFlag = !1, this.mDefaultOptions = null, this.mActionTimeoutId = 0, 
        this.mActionTimeout = MICROSOFT_ACTION_TIMEOUT, 0;
    }, o.prototype.reset = function(o) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, o);
    }, o.prototype._setErrorOutput = function(o) {
        t.prototype._setErrorOutput.call(this, o), this.mMicrosoftConfig && this.mMicrosoftConfig._setErrorOutput(o), 
        this.mMicrosoftNetwork && this.mMicrosoftNetwork._setErrorOutput(o), this.mMicrosoftConnect && this.mMicrosoftConnect._setErrorOutput(o), 
        this.mMicrosoftTTS && this.mMicrosoftTTS._setErrorOutput(o), this.mMicrosoftASR && this.mMicrosoftASR._setErrorOutput(o), 
        this.mMicrosoftNLU && this.mMicrosoftNLU._setErrorOutput(o);
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
    }, o.prototype._onStop = function(o, r) {
        return this._clearActionTimeout(), this.mTransaction = null, this.mRunningFlag = !1, 
        t.prototype._onStop.call(this, o, r);
    }, o.prototype._unlockAudio = function(t) {
        if (this.mAudioContext) {
            if ('running' === this.mAudioContext.state) return void t(!0);
            if ('suspended' === this.mAudioContext.state) {
                var o = setTimeout(function() {
                    return t(!1);
                }, AUDIO_UNLOCK_TIMEOUT);
                this.mAudioContext.resume().then(function() {
                    clearTimeout(o), t(!0);
                }, function(r) {
                    console.log('MicrosoftPort._unlockAudio:', r), clearTimeout(o), t(!1);
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
            this.mMicrosoftConnect.disconnect(), this.mMicrosoftConnect.connect()), 'string' == typeof t.microsoftLuisEndpoint && t.microsoftLuisEndpoint && (this.mMicrosoftConfig.luisEndpoint = t.microsoftLuisEndpoint), 
            0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, o.prototype.getConfig = function() {
        return {
            microsoftRegion: this.mMicrosoftConfig.region,
            microsoftSubscriptionKey: this.mMicrosoftConfig.subscriptionKey,
            microsoftLuisEndpoint: this.mMicrosoftConfig.luisEndpoint
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
          case MICROSOFT_NLU_ACTION:
            o = !!this.mMicrosoftNLU;
            break;

          case MICROSOFT_ASR_ACTION:
            o = !!this.mMicrosoftASR;
            break;

          case MICROSOFT_TTS_ACTION:
            o = !!this.mMicrosoftTTS;
        }
        return o;
    }, o.prototype.setActionTimeout = function(t) {
        this.mActionTimeout = t;
    }, o.prototype.start = function(t, o, r) {
        var n = this;
        return this.isRunning() ? (this._error('start', 'Aktion laeuft bereits'), -1) : this.mMicrosoftConfig.isCredentials() ? this.mTransaction ? (this._error('start', 'andere Transaktion laeuft noch'), 
        -1) : this._checkOpen(function(i) {
            if (!i) return -1;
            n._setActionTimeout();
            var e = r || {};
            n.mPluginName = t, n.mRunningFlag = !0;
            var s = 0;
            switch (o) {
              case MICROSOFT_NLU_ACTION:
                n.mTransaction = new MicrosoftTransaction(t, MICROSOFT_NLU_ACTION), s = n._startNLU(n.mTransaction, e.text, e.language || MICROSOFT_DEFAULT_LANGUAGE);
                break;

              case MICROSOFT_ASRNLU_ACTION:
                n.mTransaction = new MicrosoftTransaction(t, MICROSOFT_ASRNLU_ACTION), s = n._startASR(n.mTransaction, e.language || MICROSOFT_DEFAULT_LANGUAGE, e.audioURL || '', !0, e.useProgressive || !1);
                break;

              case MICROSOFT_ASR_ACTION:
                n.mTransaction = new MicrosoftTransaction(t, MICROSOFT_ASR_ACTION), s = n._startASR(n.mTransaction, e.language || MICROSOFT_DEFAULT_LANGUAGE, e.audioURL || '', !1, e.useProgressive || !1);
                break;

              case MICROSOFT_TTS_ACTION:
                n.mTransaction = new MicrosoftTransaction(t, MICROSOFT_TTS_ACTION), s = n._startTTS(n.mTransaction, e.text, e.language || MICROSOFT_DEFAULT_LANGUAGE, e.voice || MICROSOFT_DEFAULT_VOICE);
                break;

              default:
                n._clearActionTimeout(), n._error('start', 'Keine gueltige Aktion uebergeben ' + o), 
                s = -1;
            }
            return s;
        }) : (this._error('start', 'Port hat keine Credentials'), -1);
    }, o.prototype.stop = function(t, o, r) {
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
          case MICROSOFT_NLU_ACTION:
            n = this._stopNLU(this.mTransaction);
            break;

          case MICROSOFT_ASR_ACTION:
            n = this._stopASR(this.mTransaction);
            break;

          case MICROSOFT_TTS_ACTION:
            n = this._stopTTS(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + o), n = -1;
        }
        return this.mRunningFlag = !1, n;
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
    }, o.prototype._startNLU = function(t, o, r) {
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
    }, o.prototype._stopNLU = function(t) {
        if (!this.mMicrosoftNLU) return this._error('_stopNLU', 'keine Microsoft NLU-Anbindung vorhanden'), 
        -1;
        try {
            return this.mMicrosoftNLU.stop(t);
        } catch (t) {
            return this._exception('_stopNLU', t), -1;
        }
    }, o.prototype._startASR = function(t, o, r, n, i) {
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
    }, o.prototype._stopASR = function(t) {
        if (!this.mMicrosoftASR) return this._error('_stopASR', 'keine Microsoft ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this.mMicrosoftASR.stop(t);
        } catch (t) {
            return this._exception('_stopASR', t), -1;
        }
    }, o.prototype._startTTS = function(t, o, r, n) {
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
            return this._unlockAudio(function(o) {
                o ? i.mMicrosoftTTS.start(t, e) : (i._error('_startTTS', 'AudioContext ist nicht entsperrt'), 
                i._onStop(t.plugin, t.type));
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
    function o(o, r) {
        void 0 === r && (r = !0);
        var n = t.call(this, o || MICROSOFT_MOCK_NAME, r) || this;
        return n.audioContextFlag = !0, n.getUserMediaFlag = !0, n.microsoftNLUFlag = !0, 
        n.microsoftASRFlag = !0, n.microsoftTTSFlag = !0, n.disconnectFlag = !0, n.defaultOptions = null, 
        n.codec = '', n.intentName = 'TestIntent', n.intentConfidence = 1, n.mDynamicCredentialsFlag = !1, 
        n.mTransaction = null, n.mRunningFlag = !1, n.microsoftRegion = '', n.microsoftSubscriptionKey = '', 
        n.microsoftLuisEndpoint = '', n.microsoftNluTag = '', n;
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
        'string' == typeof t.microsoftLuisEndpoint && (this.microsoftLuisEndpoint = t.microsoftLuisEndpoint), 
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
    }, o.prototype.start = function(t, o, r) {
        if (this.isRunning()) return this._error('start', 'Aktion laeuft bereits'), -1;
        if (!this.isOpen()) return this._error('start', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this._error('start', 'Port hat keine Credentials'), 
        -1;
        if (this.mTransaction) return this._error('start', 'andere Transaktion laeuft noch'), 
        -1;
        var n = r || {};
        this.mRunningFlag = !0;
        var i = 0;
        switch (o) {
          case MICROSOFT_NLU_ACTION:
            this.mTransaction = new MicrosoftTransaction(t, MICROSOFT_NLU_ACTION), i = this._startNLU(this.mTransaction, n.text, n.language || MICROSOFT_DEFAULT_LANGUAGE);
            break;

          case MICROSOFT_ASRNLU_ACTION:
            this.mTransaction = new MicrosoftTransaction(t, MICROSOFT_ASRNLU_ACTION), i = this._startASR(this.mTransaction, n.language || MICROSOFT_DEFAULT_LANGUAGE, n.audioURL || '', !0, n.useProgressive || !1);
            break;

          case MICROSOFT_ASR_ACTION:
            this.mTransaction = new MicrosoftTransaction(t, MICROSOFT_ASR_ACTION), i = this._startASR(this.mTransaction, n.language || MICROSOFT_DEFAULT_LANGUAGE, n.audioURL || '', !1, n.useProgressive || !1);
            break;

          case MICROSOFT_TTS_ACTION:
            this.mTransaction = new MicrosoftTransaction(t, MICROSOFT_TTS_ACTION), i = this._startTTS(this.mTransaction, n.text, n.language || MICROSOFT_DEFAULT_LANGUAGE, n.voice || MICROSOFT_DEFAULT_VOICE);
            break;

          default:
            this._error('start', 'Keine gueltige Aktion uebergeben ' + o), i = -1;
        }
        return i;
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
          case MICROSOFT_NLU_ACTION:
            n = this._stopNLU(this.mTransaction);
            break;

          case MICROSOFT_ASRNLU_ACTION:
          case MICROSOFT_ASR_ACTION:
            n = this._stopASR(this.mTransaction);
            break;

          case MICROSOFT_TTS_ACTION:
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
            return this._onStart(t.plugin, t.type), setTimeout(function() {
                return i._onStop(t.plugin, t.type);
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
        var r = PortManager.get(MICROSOFT_TYPE_NAME, MicrosoftPort);
        return r ? 0 !== r.init(o) ? (PortManager.remove(MICROSOFT_TYPE_NAME), -1) : (t.mCurrentPort = r, 
        0) : -1;
    }, t._initMicrosoftMock = function(o) {
        var r = PortManager.get(MICROSOFT_TYPE_NAME, MicrosoftMock);
        return r ? 0 !== r.init(o) ? (console.log('Microsoft._initMicrosoftMock: Error MicrosoftMock wurde nicht initialisiert'), 
        PortManager.remove(MICROSOFT_TYPE_NAME), -1) : (t.mCurrentPort = r, 0) : (console.log('Microsoft._initMicrosoftMock: Error MicrosoftMock wurde nicht erzeugt'), 
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
        var o = PortManager.find(MICROSOFT_TYPE_NAME);
        o || (o = t.mCurrentPort);
        var r = 0;
        return o && (r = o.done(), PortManager.remove(MICROSOFT_TYPE_NAME)), t.mCurrentPort = null, 
        t.mInitFlag = !1, r;
    }, t._onOpenEvent = function(o, r, n, i) {
        if ('function' == typeof i) try {
            return i(o, r, n), 0;
        } catch (o) {
            return t.mErrorOutputFlag && console.log('Microsoft._onOpenEvent: Exception', o.message), 
            -1;
        }
        return 0;
    }, t._openMicrosoftPort = function(o) {
        var r = PortManager.find(MICROSOFT_TYPE_NAME);
        return r || (r = t.mCurrentPort), r ? (r.addOpenEvent(MICROSOFT_TYPE_NAME, function(n) {
            return r.removeErrorEvent(MICROSOFT_TYPE_NAME), r.removeOpenEvent(MICROSOFT_TYPE_NAME), 
            'function' == typeof o && t._onOpenEvent(null, MICROSOFT_TYPE_NAME, n.result, o), 
            n.result;
        }), r.addErrorEvent(MICROSOFT_TYPE_NAME, function(n) {
            return r.removeOpenEvent(MICROSOFT_TYPE_NAME), r.removeErrorEvent(MICROSOFT_TYPE_NAME), 
            'function' == typeof o && t._onOpenEvent(n, MICROSOFT_TYPE_NAME, -1, o), 0;
        }), r.open()) : (t.mErrorOutputFlag && console.log('Microsoft._openMicrosoftPort: kein Port vorhanden'), 
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
            microsoftSubscriptionKey: '',
            microsoftLuisEndpoint: ''
        };
    }, t.mInitFlag = !1, t.mErrorOutputFlag = !1, t.mCurrentPort = null, t;
}();

export { MICROSOFT_ASRNLU_ACTION, MICROSOFT_ASR_ACTION, MICROSOFT_NLU_ACTION, MICROSOFT_TTS_ACTION, MICROSOFT_TYPE_NAME, Microsoft };
