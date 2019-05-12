/**
 * Speech-Google
 * 
 * Version: 0.1.0
 * Build:   0001
 * TYPE:    ALPHA
 * Datum:   11.05.2019
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

var GOOGLE_TYPE_NAME = 'Google', GOOGLE_PORT_NAME = 'GooglePort', GOOGLE_MOCK_NAME = 'GoogleMock', GOOGLE_SERVER_URL = '', GOOGLE_DEFAULT_URL = GOOGLE_SERVER_URL, GOOGLE_NLU_ACTION = 'NLU', GOOGLE_ASR_ACTION = 'ASR', GOOGLE_ASRNLU_ACTION = 'ASRNLU', GOOGLE_TTS_ACTION = 'TTS', GOOGLE_CONFIG_PATH = 'assets/', GOOGLE_CONFIG_FILE = 'google.json', GOOGLE_CONFIG_LOAD = !1, GOOGLE_DE_LANGUAGE = 'de-DE', GOOGLE_DEFAULT_LANGUAGE = GOOGLE_DE_LANGUAGE, GOOGLE_TTS_VOICE4 = 'Petra-ML', GOOGLE_TTS_VOICE = GOOGLE_TTS_VOICE4, GOOGLE_DEFAULT_VOICE = GOOGLE_TTS_VOICE, extendStatics = function(t, n) {
    return (extendStatics = Object.setPrototypeOf || {
        __proto__: []
    } instanceof Array && function(t, n) {
        t.__proto__ = n;
    } || function(t, n) {
        for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
    })(t, n);
};

function __extends(t, n) {
    function e() {
        this.constructor = t;
    }
    extendStatics(t, n), t.prototype = null === n ? Object.create(n) : (e.prototype = n.prototype, 
    new e());
}

var ApiAiConstants, Factory = function(t) {
    function n(n, e) {
        void 0 === e && (e = !0);
        var o = t.call(this, n || 'Factory') || this;
        if (e && 0 !== FactoryManager.insert(o.getName(), o)) throw new Error('Factory ' + o.getName() + ' existiert bereits im FactoryManager');
        return o;
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
    function n(n, e) {
        return void 0 === e && (e = !0), t.call(this, n || USERMEDIA_FACTORY_NAME, e) || this;
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
                var e = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || null;
                if (!e) return null;
                navigator.mediaDevices.getUserMedia = function(t) {
                    return new Promise(function(n, o) {
                        e.call(navigator, t, n, o);
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
}(Factory), GOOGLE_VERSION_NUMBER = '0.1.0', GOOGLE_VERSION_BUILD = '0001', GOOGLE_VERSION_TYPE = 'ALPHA', GOOGLE_VERSION_DATE = '11.05.2019', GOOGLE_VERSION_STRING = GOOGLE_VERSION_NUMBER + '.' + GOOGLE_VERSION_BUILD + ' vom ' + GOOGLE_VERSION_DATE + ' (' + GOOGLE_VERSION_TYPE + ')', GOOGLE_API_VERSION = GOOGLE_VERSION_STRING, GoogleTransaction = function() {
    function t(n, e) {
        void 0 === n && (n = ''), void 0 === e && (e = ''), this.transactionId = 0, this.plugin = '', 
        this.type = '', this.result = null, this.error = null, this.plugin = n, this.type = e, 
        t.mTransactionCounter += 1, this.transactionId = t.mTransactionCounter;
    }
    return t.mTransactionCounter = 0, t;
}(), GoogleConfig = function(t) {
    function n(n) {
        var e = t.call(this, 'GoogleConfig') || this;
        return e.mInitFlag = !1, e.mConfigPath = GOOGLE_CONFIG_PATH, e.mConfigFile = GOOGLE_CONFIG_FILE, 
        e.mConfigLoadFlag = GOOGLE_CONFIG_LOAD, e.mConfigServerUrl = GOOGLE_DEFAULT_URL, 
        e.mConfigAppId = '', e.mConfigAppKey = '', e.mConfigUserId = '', e.mConfigNluTag = '', 
        e.mFileReader = null, e.mOnInitFunc = null, e.mOnErrorFunc = null, e.mFileReader = n, 
        e._setErrorOutputFunc(function(t) {
            return e._onError(new Error(t));
        }), e;
    }
    return __extends(n, t), n.prototype._setOption = function(t) {
        t && ('string' == typeof t.googleConfigPath && (this.mConfigPath = t.googleConfigPath), 
        'string' == typeof t.googleConfigFile && (this.mConfigFile = t.googleConfigFile), 
        'boolean' == typeof t.googleConfigLoadFlag && (this.mConfigLoadFlag = t.googleConfigLoadFlag), 
        'string' == typeof t.googleServerUrl && (this.mConfigServerUrl = t.googleServerUrl), 
        'string' == typeof t.googleAppId && (this.mConfigAppId = t.googleAppId), 'string' == typeof t.googleAppKey && (this.mConfigAppKey = t.googleAppKey), 
        'string' == typeof t.googleUserId && (this.mConfigUserId = t.googleUserId), 'string' == typeof t.googleNluTag && (this.mConfigNluTag = t.googleNluTag), 
        'string' == typeof t.googleNluTag && (this.mConfigNluTag = t.googleNluTag));
    }, n.prototype.init = function(t) {
        return this._setOption(t), this.mInitFlag = !0, 0;
    }, n.prototype.done = function() {
        return this.mInitFlag = !1, this.mConfigPath = GOOGLE_CONFIG_PATH, this.mConfigFile = GOOGLE_CONFIG_FILE, 
        this.mConfigLoadFlag = GOOGLE_CONFIG_LOAD, this.mConfigServerUrl = GOOGLE_DEFAULT_URL, 
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
        return !!this.mConfigAppKey;
    }, n;
}(ErrorBase), NetHtml5Connect = function(t) {
    function n(n) {
        var e = t.call(this, n || 'NetHtml5Connect') || this;
        return e.mInitFlag = !1, e.mOnOnlineFunc = null, e.mOnOfflineFunc = null, e.mOnErrorFunc = null, 
        e._setErrorOutputFunc(function(t) {
            return e._onError(new Error(t));
        }), e;
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
}(ErrorBase), GoogleNetwork = function(t) {
    function n() {
        return t.call(this, 'GoogleNetwork') || this;
    }
    return __extends(n, t), n;
}(NetHtml5Connect), GoogleConnect = function(t) {
    function n(n) {
        var e = t.call(this, 'GoogleConnect') || this;
        return e.mConfig = null, e.mConnectFlag = !1, e.mConfig = n, e;
    }
    return __extends(n, t), n.prototype.isConnect = function() {
        return this.mConnectFlag;
    }, n.prototype.connect = function() {
        return this.isConnect(), 0;
    }, n.prototype.disconnect = function() {
        return 0;
    }, n;
}(ErrorBase);

!function(t) {
    var n;
    !function(t) {
        t[t.EN = "en"] = "EN", t[t.DE = "de"] = "DE", t[t.ES = "es"] = "ES", t[t.PT_BR = "pt-BR"] = "PT_BR", 
        t[t.ZH_HK = "zh-HK"] = "ZH_HK", t[t.ZH_CN = "zh-CN"] = "ZH_CN", t[t.ZH_TW = "zh-TW"] = "ZH_TW", 
        t[t.NL = "nl"] = "NL", t[t.FR = "fr"] = "FR", t[t.IT = "it"] = "IT", t[t.JA = "ja"] = "JA", 
        t[t.KO = "ko"] = "KO", t[t.PT = "pt"] = "PT", t[t.RU = "ru"] = "RU", t[t.UK = "uk"] = "UK";
    }(n = t.AVAILABLE_LANGUAGES || (t.AVAILABLE_LANGUAGES = {})), t.VERSION = "2.0.0-beta.20", 
    t.DEFAULT_BASE_URL = "https://api.api.ai/v1/", t.DEFAULT_API_VERSION = "20150910", 
    t.DEFAULT_CLIENT_LANG = n.EN, t.DEFAULT_TTS_HOST = "https://api.api.ai/api/tts";
}(ApiAiConstants || (ApiAiConstants = {}));

var ApiAiBaseError = function(t) {
    function n(n) {
        var e = t.call(this, n) || this;
        return e.message = n, e.stack = new Error().stack, e;
    }
    return __extends(n, t), n;
}(Error), ApiAiClientConfigurationError = function(t) {
    function n(n) {
        var e = t.call(this, n) || this;
        return e.name = "ApiAiClientConfigurationError", e;
    }
    return __extends(n, t), n;
}(ApiAiBaseError), ApiAiRequestError = function(t) {
    function n(n, e) {
        void 0 === e && (e = null);
        var o = t.call(this, n) || this;
        return o.message = n, o.code = e, o.name = "ApiAiRequestError", o;
    }
    return __extends(n, t), n;
}(ApiAiBaseError), XhrRequest = function() {
    function t() {}
    return t.ajax = function(n, e, o, r, i) {
        return void 0 === o && (o = null), void 0 === r && (r = null), void 0 === i && (i = {}), 
        new Promise(function(s, a) {
            var u = t.createXMLHTTPObject(), l = e, c = null;
            if (o && n === t.Method.GET) {
                l += "?";
                var p = 0;
                for (var g in o) o.hasOwnProperty(g) && (p++ && (l += "&"), l += encodeURIComponent(g) + "=" + encodeURIComponent(o[g]));
            } else o && (r || (r = {}), r["Content-Type"] = "application/json; charset=utf-8", 
            c = JSON.stringify(o));
            for (var g in i) g in u && (u[g] = i[g]);
            if (u.open(t.Method[n], l, !0), r) for (var g in r) r.hasOwnProperty(g) && u.setRequestHeader(g, r[g]);
            c ? u.send(c) : u.send(), u.onload = function() {
                u.status >= 200 && u.status < 300 ? s(u) : a(u);
            }, u.onerror = function() {
                a(u);
            };
        });
    }, t.get = function(n, e, o, r) {
        return void 0 === e && (e = null), void 0 === o && (o = null), void 0 === r && (r = {}), 
        t.ajax(t.Method.GET, n, e, o, r);
    }, t.post = function(n, e, o, r) {
        return void 0 === e && (e = null), void 0 === o && (o = null), void 0 === r && (r = {}), 
        t.ajax(t.Method.POST, n, e, o, r);
    }, t.put = function(n, e, o, r) {
        return void 0 === e && (e = null), void 0 === o && (o = null), void 0 === r && (r = {}), 
        t.ajax(t.Method.PUT, n, e, o, r);
    }, t.delete = function(n, e, o, r) {
        return void 0 === e && (e = null), void 0 === o && (o = null), void 0 === r && (r = {}), 
        t.ajax(t.Method.DELETE, n, e, o, r);
    }, t.createXMLHTTPObject = function() {
        for (var n = null, e = 0, o = t.XMLHttpFactories; e < o.length; e++) {
            var r = o[e];
            try {
                n = r();
            } catch (t) {
                continue;
            }
            break;
        }
        return n;
    }, t.XMLHttpFactories = [ function() {
        return new XMLHttpRequest();
    }, function() {
        return new window.ActiveXObject("Msxml2.XMLHTTP");
    }, function() {
        return new window.ActiveXObject("Msxml3.XMLHTTP");
    }, function() {
        return new window.ActiveXObject("Microsoft.XMLHTTP");
    } ], t;
}();

!function(t) {
    !function(t) {
        t[t.GET = "GET"] = "GET", t[t.POST = "POST"] = "POST", t[t.PUT = "PUT"] = "PUT", 
        t[t.DELETE = "DELETE"] = "DELETE";
    }(t.Method || (t.Method = {}));
}(XhrRequest || (XhrRequest = {}));

var IStreamClient, XhrRequest$1 = XhrRequest, Request = function() {
    function t(t, n) {
        this.apiAiClient = t, this.options = n, this.uri = this.apiAiClient.getApiBaseUrl() + "query?v=" + this.apiAiClient.getApiVersion(), 
        this.requestMethod = XhrRequest$1.Method.POST, this.headers = {
            Authorization: "Bearer " + this.apiAiClient.getAccessToken()
        }, this.options.lang = this.apiAiClient.getApiLang(), this.options.sessionId = this.apiAiClient.getSessionId();
    }
    return t.handleSuccess = function(t) {
        return Promise.resolve(JSON.parse(t.responseText));
    }, t.handleError = function(t) {
        var n = new ApiAiRequestError(null);
        try {
            var e = JSON.parse(t.responseText);
            n = e.status && e.status.errorDetails ? new ApiAiRequestError(e.status.errorDetails, e.status.code) : new ApiAiRequestError(t.statusText, t.status);
        } catch (e) {
            n = new ApiAiRequestError(t.statusText, t.status);
        }
        return Promise.reject(n);
    }, t.prototype.perform = function(n) {
        void 0 === n && (n = null);
        var e = n || this.options;
        return XhrRequest$1.ajax(this.requestMethod, this.uri, e, this.headers).then(t.handleSuccess.bind(this)).catch(t.handleError.bind(this));
    }, t;
}(), EventRequest = function(t) {
    function n() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return __extends(n, t), n;
}(Request), TextRequest = function(t) {
    function n() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return __extends(n, t), n;
}(Request);

!function(t) {
    !function(t) {
        t[t.ERR_NETWORK = 0] = "ERR_NETWORK", t[t.ERR_AUDIO = 1] = "ERR_AUDIO", t[t.ERR_SERVER = 2] = "ERR_SERVER", 
        t[t.ERR_CLIENT = 3] = "ERR_CLIENT";
    }(t.ERROR || (t.ERROR = {})), function(t) {
        t[t.MSG_WAITING_MICROPHONE = 0] = "MSG_WAITING_MICROPHONE", t[t.MSG_MEDIA_STREAM_CREATED = 1] = "MSG_MEDIA_STREAM_CREATED", 
        t[t.MSG_INIT_RECORDER = 2] = "MSG_INIT_RECORDER", t[t.MSG_RECORDING = 3] = "MSG_RECORDING", 
        t[t.MSG_SEND = 4] = "MSG_SEND", t[t.MSG_SEND_EMPTY = 5] = "MSG_SEND_EMPTY", t[t.MSG_SEND_EOS_OR_JSON = 6] = "MSG_SEND_EOS_OR_JSON", 
        t[t.MSG_WEB_SOCKET = 7] = "MSG_WEB_SOCKET", t[t.MSG_WEB_SOCKET_OPEN = 8] = "MSG_WEB_SOCKET_OPEN", 
        t[t.MSG_WEB_SOCKET_CLOSE = 9] = "MSG_WEB_SOCKET_CLOSE", t[t.MSG_STOP = 10] = "MSG_STOP", 
        t[t.MSG_CONFIG_CHANGED = 11] = "MSG_CONFIG_CHANGED";
    }(t.EVENT || (t.EVENT = {}));
}(IStreamClient || (IStreamClient = {}));

var ApiAiClient = function() {
    function t(t) {
        if (!t || !t.accessToken) throw new ApiAiClientConfigurationError("Access token is required for new ApiAi.Client instance");
        this.accessToken = t.accessToken, this.apiLang = t.lang || ApiAiConstants.DEFAULT_CLIENT_LANG, 
        this.apiVersion = t.version || ApiAiConstants.DEFAULT_API_VERSION, this.apiBaseUrl = t.baseUrl || ApiAiConstants.DEFAULT_BASE_URL, 
        this.sessionId = t.sessionId || this.guid();
    }
    return t.prototype.textRequest = function(t, n) {
        if (void 0 === n && (n = {}), !t) throw new ApiAiClientConfigurationError("Query should not be empty");
        return n.query = t, new TextRequest(this, n).perform();
    }, t.prototype.eventRequest = function(t, n, e) {
        if (void 0 === n && (n = {}), void 0 === e && (e = {}), !t) throw new ApiAiClientConfigurationError("Event name can not be empty");
        return e.event = {
            name: t,
            data: n
        }, new EventRequest(this, e).perform();
    }, t.prototype.getAccessToken = function() {
        return this.accessToken;
    }, t.prototype.getApiVersion = function() {
        return this.apiVersion ? this.apiVersion : ApiAiConstants.DEFAULT_API_VERSION;
    }, t.prototype.getApiLang = function() {
        return this.apiLang ? this.apiLang : ApiAiConstants.DEFAULT_CLIENT_LANG;
    }, t.prototype.getApiBaseUrl = function() {
        return this.apiBaseUrl ? this.apiBaseUrl : ApiAiConstants.DEFAULT_BASE_URL;
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
}(), GoogleDevice = function(t) {
    function n(n, e, o) {
        var r = t.call(this, n || 'GoogleDevice') || this;
        return r.mConfig = null, r.mConnect = null, r.mTransaction = null, r.onStart = null, 
        r.onStop = null, r.onResult = null, r.onError = null, r.onClose = null, r.mConfig = e, 
        r.mConnect = o, r;
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
}(ErrorBase), GoogleNLU = function(t) {
    function n(n, e) {
        return t.call(this, 'GoogleNLU', n, e) || this;
    }
    return __extends(n, t), n.prototype._start = function(t) {
        var n = this;
        console.log('GoogleNLU._startNLU:', t);
        try {
            if (!this.mConfig.appKey) return void this._error('_start', 'kein AppKey vorhanden');
            this.mDialogflowClient = new ApiAiClient({
                accessToken: this.mConfig.appKey
            }), this.mDialogflowClient.textRequest(t.text).then(function(t) {
                console.log('GoogleNlu._start: response = ', t.result);
                try {
                    n._onResult(t.result);
                } catch (t) {
                    n._onError(new Error('NLU-Exception: ' + t.message));
                }
                n._onStop();
            });
        } catch (t) {
            this._exception('_start', t);
        }
    }, n.prototype._stop = function() {
        console.log('GoogleNLU._stop');
    }, n;
}(GoogleDevice), AUDIO_UNLOCK_TIMEOUT = 2e3, GOOGLE_ACTION_TIMEOUT = 6e4, GooglePort = function(t) {
    function n(n, e) {
        void 0 === e && (e = !0);
        var o = t.call(this, n || GOOGLE_PORT_NAME, e) || this;
        return o.mAudioContext = null, o.mGetUserMedia = null, o.mGoogleConfig = null, o.mGoogleNetwork = null, 
        o.mGoogleConnect = null, o.mGoogleNLU = null, o.mDynamicCredentialsFlag = !1, o.mTransaction = null, 
        o.mConnectFlag = !1, o.mRunningFlag = !1, o.mDefaultOptions = null, o.mActionTimeoutId = 0, 
        o.mActionTimeout = GOOGLE_ACTION_TIMEOUT, o;
    }
    return __extends(n, t), n.prototype.isMock = function() {
        return !1;
    }, n.prototype.getType = function() {
        return GOOGLE_TYPE_NAME;
    }, n.prototype.getClass = function() {
        return 'GooglePort';
    }, n.prototype.getVersion = function() {
        return GOOGLE_API_VERSION;
    }, n.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.googleAppKey && !!t.googleAppKey);
    }, n.prototype._initAllObject = function(t) {
        var n = this, e = new FileHtml5Reader();
        return e.init(), new AudioHtml5Reader().init({
            audioContext: this.mAudioContext
        }), this.mGoogleConfig = new GoogleConfig(e), 0 !== this.mGoogleConfig.init(t) ? -1 : (this.mGoogleNetwork = new GoogleNetwork(), 
        this.mGoogleNetwork.onOnline = function() {
            return n._onOnline();
        }, this.mGoogleNetwork.onOffline = function() {
            return n._onOffline();
        }, this.mGoogleNetwork.onError = function(t) {
            return n._onError(t);
        }, 0 !== this.mGoogleNetwork.init(t) ? -1 : (this.mGoogleConnect = new GoogleConnect(this.mGoogleConfig), 
        this.mGoogleNLU = new GoogleNLU(this.mGoogleConfig, this.mGoogleConnect), this.mGoogleNLU.onStart = function(t) {
            return n._onStart(t.plugin, t.type);
        }, this.mGoogleNLU.onStop = function(t) {
            return n._onStop(t.plugin, t.type);
        }, this.mGoogleNLU.onResult = function(t) {
            return n._onResult(t.result, t.plugin, t.type);
        }, this.mGoogleNLU.onError = function(t) {
            return n._onError(t.error, t.plugin, t.type);
        }, this.mGoogleNLU.onClose = function(t) {
            return n._onClose();
        }, 0));
    }, n.prototype.init = function(n) {
        if (this.mInitFlag) return this._error('init', 'Port ist bereits initialisiert'), 
        0;
        if (n && 'boolean' == typeof n.googleDynamicCredentialsFlag && n.googleDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0; else if (!this._checkCredentials(n)) return this._error('init', 'kein AppKey als Parameter uebergeben'), 
        -1;
        var e = FactoryManager.get(AUDIOCONTEXT_FACTORY_NAME, AudioContextFactory);
        if (e) {
            var o = e.create();
            o && (this.mAudioContext = new o());
        }
        var r = FactoryManager.get(USERMEDIA_FACTORY_NAME, UserMediaFactory);
        return r && (this.mGetUserMedia = r.create()), 0 !== this._initAllObject(n) ? -1 : 0 !== t.prototype.init.call(this, n) ? -1 : (this.isErrorOutput() && (this.mGoogleNLU ? console.log('GooglePort: NLU ist vorhanden') : console.log('GooglePort: NLU ist nicht vorhanden')), 
        0);
    }, n.prototype.done = function() {
        return t.prototype.done.call(this), this._clearActionTimeout(), this.mAudioContext && this.mAudioContext.close(), 
        this.mAudioContext = null, this.mGetUserMedia = null, this.mGoogleConfig && (this.mGoogleConfig.done(), 
        this.mGoogleConfig = null), this.mGoogleNetwork && (this.mGoogleNetwork.done(), 
        this.mGoogleNetwork = null), this.mGoogleConnect = null, this.mGoogleNLU = null, 
        this.mDynamicCredentialsFlag = !1, this.mTransaction = null, this.mConnectFlag = !1, 
        this.mRunningFlag = !1, this.mDefaultOptions = null, this.mActionTimeoutId = 0, 
        this.mActionTimeout = GOOGLE_ACTION_TIMEOUT, 0;
    }, n.prototype.reset = function(n) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, n);
    }, n.prototype._setErrorOutput = function(n) {
        t.prototype._setErrorOutput.call(this, n), this.mGoogleConfig && this.mGoogleConfig._setErrorOutput(n), 
        this.mGoogleNLU && this.mGoogleNLU._setErrorOutput(n);
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
        return this.close(), 0;
    }, n.prototype._onStop = function(n, e) {
        return this._clearActionTimeout(), this.mTransaction = null, this.mRunningFlag = !1, 
        t.prototype._onStop.call(this, n, e);
    }, n.prototype._unlockAudio = function(t) {
        if (this.mAudioContext) {
            if ('running' === this.mAudioContext.state) return void t(!0);
            if ('suspended' === this.mAudioContext.state) {
                var n = setTimeout(function() {
                    return t(!1);
                }, AUDIO_UNLOCK_TIMEOUT);
                this.mAudioContext.resume().then(function() {
                    clearTimeout(n), t(!0);
                }, function(e) {
                    console.log('GooglePort._unlockAudio:', e), clearTimeout(n), t(!1);
                });
            } else t(!1);
        } else t(!1);
    }, n.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this._error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return 'string' == typeof t.googleAppKey && t.googleAppKey && (this.mGoogleConfig.appKey = t.googleAppKey), 
            0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, n.prototype.getConfig = function() {
        return {
            googleAppKey: this.mGoogleConfig.appKey
        };
    }, n.prototype.isOnline = function() {
        return !!this.mGoogleNetwork && this.mGoogleNetwork.isOnline();
    }, n.prototype.isOpen = function() {
        return this._isConnect();
    }, n.prototype._checkOpen = function(t) {
        return t(!0), 0;
    }, n.prototype.open = function(t) {
        return this._connect(t);
    }, n.prototype.close = function() {
        return this._disconnect();
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
          case GOOGLE_NLU_ACTION:
            n = !!this.mGoogleNLU;
        }
        return n;
    }, n.prototype.setActionTimeout = function(t) {
        this.mActionTimeout = t;
    }, n.prototype.start = function(t, n, e) {
        var o = this;
        return this.isRunning() ? (this._error('start', 'Aktion laeuft bereits'), -1) : this.mGoogleConfig.isCredentials() ? this.mTransaction ? (this._error('start', 'andere Transaktion laeuft noch'), 
        -1) : this._checkOpen(function(r) {
            if (!r) return -1;
            o._setActionTimeout();
            var i = e || {};
            o.mPluginName = t, o.mRunningFlag = !0;
            var s = 0;
            switch (n) {
              case GOOGLE_NLU_ACTION:
                o.mTransaction = new GoogleTransaction(t, GOOGLE_NLU_ACTION), s = o._startNLU(o.mTransaction, i.text, i.language || GOOGLE_DEFAULT_LANGUAGE);
                break;

              case GOOGLE_ASRNLU_ACTION:
                o.mTransaction = new GoogleTransaction(t, GOOGLE_ASRNLU_ACTION), s = o._startASR(o.mTransaction, i.language || GOOGLE_DEFAULT_LANGUAGE, i.audioURL || '', !0, i.useProgressive || !1);
                break;

              case GOOGLE_ASR_ACTION:
                o.mTransaction = new GoogleTransaction(t, GOOGLE_ASR_ACTION), s = o._startASR(o.mTransaction, i.language || GOOGLE_DEFAULT_LANGUAGE, i.audioURL || '', !1, i.useProgressive || !1);
                break;

              case GOOGLE_TTS_ACTION:
                o.mTransaction = new GoogleTransaction(t, GOOGLE_TTS_ACTION), s = o._startTTS(o.mTransaction, i.text, i.language || GOOGLE_DEFAULT_LANGUAGE, i.voice || GOOGLE_DEFAULT_VOICE);
                break;

              default:
                o._clearActionTimeout(), o._error('start', 'Keine gueltige Aktion uebergeben ' + n), 
                s = -1;
            }
            return s;
        }) : (this._error('start', 'Port hat keine Credentials'), -1);
    }, n.prototype.stop = function(t, n, e) {
        if (!this.isRunning()) return 0;
        if (!this.isOpen()) return this._error('stop', 'Port ist nicht geoeffnet'), -1;
        if (!this.mGoogleConfig.isCredentials()) return this._error('stop', 'Port hat keine Credentials'), 
        -1;
        if (!this.mTransaction) return this._error('stop', 'keine Transaktion vorhanden'), 
        -1;
        if (t !== this.mTransaction.plugin) return this._error('stop', 'PluginName der Transaktion stimmt nicht ueberein ' + t + ' != ' + this.mTransaction.plugin), 
        -1;
        if (n) {
            if (n !== this.mTransaction.type) return this._error('stop', 'Typ der Transaktion stimmt nicht ueberein ' + n + ' != ' + this.mTransaction.type), 
            -1;
        } else n = this.mTransaction.type;
        var o = 0;
        switch (n) {
          case GOOGLE_NLU_ACTION:
            o = this._stopNLU(this.mTransaction);
            break;

          case GOOGLE_ASRNLU_ACTION:
          case GOOGLE_ASR_ACTION:
            o = this._stopASR(this.mTransaction);
            break;

          case GOOGLE_TTS_ACTION:
            o = this._stopTTS(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + n), o = -1;
        }
        return this.mRunningFlag = !1, o;
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
    }, n.prototype._isConnect = function() {
        return this.mConnectFlag;
    }, n.prototype._connect = function(t) {
        return this.mConnectFlag = !0, this._onOpen(), 0;
    }, n.prototype._disconnect = function() {
        return this.mConnectFlag = !1, 0;
    }, n.prototype._startNLU = function(t, n, e) {
        if (!n) return this._error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!e) return this._error('_startNLU', 'keine Sprache uebergeben'), -1;
        if (!this.mGoogleNLU) return this._error('_startNLU', 'keine Google NLU-Anbindung vorhanden'), 
        -1;
        try {
            var o = {
                text: n,
                language: e
            };
            return this.mGoogleNLU.start(t, o);
        } catch (t) {
            return this._exception('_startNLU', t), -1;
        }
        return -1;
    }, n.prototype._stopNLU = function(t) {
        if (!this.mGoogleNLU) return this._error('_stopNLU', 'keine Google NLU-Anbindung vorhanden'), 
        -1;
        try {
            return this.mGoogleNLU.stop(t);
        } catch (t) {
            return this._exception('_stopNLU', t), -1;
        }
        return -1;
    }, n.prototype._startASR = function(t, n, e, o, r) {
        return void 0 === o && (o = !1), void 0 === r && (r = !1), this._error('_startASR', 'nicht implementiert'), 
        -1;
    }, n.prototype._stopASR = function(t) {
        return this._error('_stopASR', 'nicht implementiert'), -1;
    }, n.prototype._startTTS = function(t, n, e, o) {
        return this._error('_startTTS', 'nicht implementiert'), -1;
    }, n.prototype._stopTTS = function(t) {
        return this._error('_stopTTS', 'nicht implementiert'), -1;
    }, n;
}(Port), GOOGLEMOCK_CALLBACK_TIMEOUT = 100, GoogleMock = function(t) {
    function n(n, e) {
        void 0 === e && (e = !0);
        var o = t.call(this, n || GOOGLE_MOCK_NAME, e) || this;
        return o.webSocketFlag = !0, o.audioContextFlag = !0, o.getUserMediaFlag = !0, o.googleNLUFlag = !0, 
        o.googleASRFlag = !0, o.googleTTSFlag = !0, o.disconnectFlag = !0, o.defaultOptions = null, 
        o.codec = '', o.intentName = 'TestIntent', o.intentConfidence = 1, o.intentSpeech = 'TestSpeech', 
        o.mDynamicCredentialsFlag = !1, o.mTransaction = null, o.mRunningFlag = !1, o.googleAppId = '', 
        o.googleAppKey = '', o.googleNluTag = '', o;
    }
    return __extends(n, t), n.prototype.isMock = function() {
        return !0;
    }, n.prototype.getType = function() {
        return GOOGLE_TYPE_NAME;
    }, n.prototype.getClass = function() {
        return 'GoogleMock';
    }, n.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.googleAppKey && (this.googleAppKey = t.googleAppKey), 
        'string' == typeof t.googleAppKey && !!t.googleAppKey);
    }, n.prototype.init = function(n) {
        if (this.mInitFlag) return this._error('init', 'Init bereits aufgerufen'), 0;
        if (n && 'boolean' == typeof n.googleDynamicCredentialsFlag && n.googleDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0, 
        this._checkCredentials(n); else if (!this._checkCredentials(n)) return (this.isErrorOutput() || n && n.errorOutputFlag) && this._error('init', 'keine AppId und/oder AppKey als Parameter uebergeben'), 
        -1;
        return this.webSocketFlag ? (this.audioContextFlag || (this._error('init', 'kein Audiokontext vorhanden, TTS und ASR werden abgeschaltet'), 
        this._onInit(-1)), this.googleNLUFlag = !0, this.audioContextFlag && (this.googleASRFlag = !0, 
        this.getUserMediaFlag && (this.googleTTSFlag = !0)), this.isErrorOutput() && (this.googleNLUFlag ? console.log('GoogleMock: NLU ist vorhanden') : console.log('GoogleMock: NLU ist nicht vorhanden'), 
        this.googleTTSFlag ? console.log('GoogleMock: TTS ist vorhanden') : console.log('GoogleMock: TTS ist nicht vorhanden'), 
        this.googleASRFlag ? console.log('GoogleMock: ASR ist vorhanden') : console.log('GoogleMock: ASR ist nicht vorhanden')), 
        this._onInit(0), t.prototype.init.call(this, n)) : (this._error('init', 'keine WebSocket vorhanden'), 
        this._onInit(-1), -1);
    }, n.prototype.done = function(n) {
        return void 0 === n && (n = !1), t.prototype.done.call(this), this.webSocketFlag = !0, 
        this.audioContextFlag = !0, this.getUserMediaFlag = !0, this.googleNLUFlag = !1, 
        this.googleASRFlag = !1, this.googleTTSFlag = !1, this.disconnectFlag = !0, this.defaultOptions = null, 
        this.codec = '', this.mTransaction = null, this.mRunningFlag = !1, 0;
    }, n.prototype.reset = function(n) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, n);
    }, n.prototype._onStop = function(n, e) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype._onStop.call(this, n, e);
    }, n.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this._error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return this.googleAppKey = t.googleAppKey, 0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, n.prototype.getConfig = function() {
        return {
            googleAppKey: this.googleAppKey
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
        return !!this.googleAppKey;
    }, n.prototype.isAction = function(t) {
        var n = !1;
        switch (t) {
          case GOOGLE_NLU_ACTION:
            n = this.googleNLUFlag;
            break;

          case GOOGLE_ASRNLU_ACTION:
          case GOOGLE_ASR_ACTION:
            n = this.googleASRFlag;
            break;

          case GOOGLE_TTS_ACTION:
            n = this.googleTTSFlag;
        }
        return n;
    }, n.prototype.start = function(t, n, e) {
        if (this.isRunning()) return this._error('start', 'Aktion laeuft bereits'), -1;
        if (!this.isOpen()) return this._error('start', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this._error('start', 'Port hat keine Credentials'), 
        -1;
        if (this.mTransaction) return this._error('start', 'andere Transaktion laeuft noch'), 
        -1;
        var o = e || {};
        this.mRunningFlag = !0;
        var r = 0;
        switch (n) {
          case GOOGLE_NLU_ACTION:
            this.mTransaction = new GoogleTransaction(t, GOOGLE_NLU_ACTION), r = this._startNLU(this.mTransaction, o.text, o.language || GOOGLE_DEFAULT_LANGUAGE);
            break;

          case GOOGLE_ASRNLU_ACTION:
            this.mTransaction = new GoogleTransaction(t, GOOGLE_ASRNLU_ACTION), r = this._startASR(this.mTransaction, o.language || GOOGLE_DEFAULT_LANGUAGE, o.audioURL || '', !0, o.useProgressive || !1);
            break;

          case GOOGLE_ASR_ACTION:
            this.mTransaction = new GoogleTransaction(t, GOOGLE_ASR_ACTION), r = this._startASR(this.mTransaction, o.language || GOOGLE_DEFAULT_LANGUAGE, o.audioURL || '', !1, o.useProgressive || !1);
            break;

          case GOOGLE_TTS_ACTION:
            this.mTransaction = new GoogleTransaction(t, GOOGLE_TTS_ACTION), r = this._startTTS(this.mTransaction, o.text, o.language || GOOGLE_DEFAULT_LANGUAGE, o.voice || GOOGLE_DEFAULT_VOICE);
            break;

          default:
            this._error('start', 'Keine gueltige Aktion uebergeben ' + n), r = -1;
        }
        return r;
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
        var o = 0;
        switch (n) {
          case GOOGLE_NLU_ACTION:
            o = this._stopNLU(this.mTransaction);
            break;

          case GOOGLE_ASRNLU_ACTION:
          case GOOGLE_ASR_ACTION:
            o = this._stopASR(this.mTransaction);
            break;

          case GOOGLE_TTS_ACTION:
            o = this._stopTTS(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + n), o = -1;
        }
        return this.mTransaction = null, this.mRunningFlag = !1, o;
    }, n.prototype._startNLU = function(t, n, e) {
        if (!n) return this._error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!this.googleNLUFlag) return this._error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden'), 
        -1;
        try {
            this._onStart(t.plugin, t.type);
            var o = {
                metadata: {
                    intentName: this.intentName
                },
                fulfillment: {
                    speech: this.intentSpeech
                },
                resolvedQuery: n
            };
            return t.result = o, console.log('GoogleMock._startNLU: _onResult wird aufgerufen'), 
            this._onResult(t.result, t.plugin, t.type), this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_startNLU', t), -1;
        }
    }, n.prototype._stopNLU = function(t) {
        return this._onStop(t.plugin, t.type), 0;
    }, n.prototype._startASR = function(t, n, e, o, r) {
        if (void 0 === o && (o = !1), void 0 === r && (r = !1), !this.googleASRFlag) return this._error('_startASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), t.result = "Testtext", this._onResult(t.result, t.plugin, t.type), 
            this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_startASR', t), -1;
        }
    }, n.prototype._stopASR = function(t) {
        if (!this.googleASRFlag) return this._error('_stopASR', 'keine Nuance ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_stopASR', t), -1;
        }
    }, n.prototype._startTTS = function(t, n, e, o) {
        var r = this;
        if (!n) return this._error('_startTTS', 'keinen Text uebergeben'), -1;
        if (!this.googleTTSFlag) return this._error('_startTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStart(t.plugin, t.type), setTimeout(function() {
                return r._onStop(t.plugin, t.type);
            }, GOOGLEMOCK_CALLBACK_TIMEOUT), 0;
        } catch (t) {
            return this._exception('_startTTS', t), -1;
        }
    }, n.prototype._stopTTS = function(t) {
        if (!this.googleTTSFlag) return this._error('_stopTTS', 'keine Nuance TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_stopTTS', t), -1;
        }
    }, n;
}(Port), Google = function() {
    function t() {}
    return t.setErrorOutputOn = function() {
        t.mErrorOutputFlag = !0, PortManager.setErrorOutputOn();
    }, t.setErrorOutputOff = function() {
        t.mErrorOutputFlag = !1, PortManager.setErrorOutputOff();
    }, t.setErrorOutputFunc = function(t) {
        PortManager._setErrorOutputFunc(t);
    }, t._initGooglePort = function(n) {
        var e = PortManager.get(GOOGLE_TYPE_NAME, GooglePort);
        return e ? 0 !== e.init(n) ? (PortManager.remove(GOOGLE_TYPE_NAME), -1) : (t.mCurrentPort = e, 
        0) : -1;
    }, t._initGoogleMock = function(n) {
        var e = PortManager.get(GOOGLE_TYPE_NAME, GoogleMock);
        return e ? 0 !== e.init(n) ? (console.log('Google._initGoogleMock: Error GoogleMock wurde nicht initialisiert'), 
        PortManager.remove(GOOGLE_TYPE_NAME), -1) : (t.mCurrentPort = e, 0) : (console.log('Google._initGoogleMock: Error GoogleMock wurde nicht erzeugt'), 
        -1);
    }, t.init = function(n) {
        if (t.mInitFlag) return 0;
        if (!n) return t.mErrorOutputFlag && console.log('Google.init: Keine Google-Parameter uebergeben'), 
        -1;
        'boolean' == typeof n.errorOutputFlag && (n.errorOutputFlag ? t.setErrorOutputOn() : t.setErrorOutputOff());
        var e = 'GooglePort';
        if (n && 'string' == typeof n.googlePortName && 'GoogleMock' === n.googlePortName && (e = 'GoogleMock'), 
        'GooglePort' === e) {
            if (0 !== t._initGooglePort(n)) return -1;
        } else {
            if ('GoogleMock' !== e) return t.mErrorOutputFlag && console.log('Google.init: Kein Google PortName vorhanden'), 
            -1;
            if (0 !== t._initGoogleMock(n)) return -1;
        }
        return t.mInitFlag = !0, 0;
    }, t.isInit = function() {
        return t.mInitFlag;
    }, t.done = function() {
        var n = PortManager.find(GOOGLE_TYPE_NAME);
        n || (n = t.mCurrentPort);
        var e = 0;
        return n && (e = n.done(), PortManager.remove(GOOGLE_TYPE_NAME)), t.mCurrentPort = null, 
        t.mInitFlag = !1, e;
    }, t._onOpenEvent = function(n, e, o, r) {
        if ('function' == typeof r) try {
            return r(n, e, o), 0;
        } catch (n) {
            return t.mErrorOutputFlag && console.log('Google._onOpenEvent: Exception', n.message), 
            -1;
        }
        return 0;
    }, t._openGooglePort = function(n) {
        var e = PortManager.find(GOOGLE_TYPE_NAME);
        return e || (e = t.mCurrentPort), e ? (e.addOpenEvent(GOOGLE_TYPE_NAME, function(o) {
            return e.removeErrorEvent(GOOGLE_TYPE_NAME), e.removeOpenEvent(GOOGLE_TYPE_NAME), 
            'function' == typeof n && t._onOpenEvent(null, GOOGLE_TYPE_NAME, o.result, n), o.result;
        }), e.addErrorEvent(GOOGLE_TYPE_NAME, function(o) {
            return e.removeOpenEvent(GOOGLE_TYPE_NAME), e.removeErrorEvent(GOOGLE_TYPE_NAME), 
            'function' == typeof n && t._onOpenEvent(o, GOOGLE_TYPE_NAME, -1, n), 0;
        }), e.open()) : (t.mErrorOutputFlag && console.log('Google._openGooglePort: kein Port vorhanden'), 
        t._onOpenEvent(new Error('Google._openGooglePort: Kein Port vorhanden'), GOOGLE_TYPE_NAME, -1, n), 
        -1);
    }, t.open = function(n) {
        return t.mInitFlag ? t._openGooglePort(n) : (t.mErrorOutputFlag && console.log('Google.open: Init wurde nicht aufgerufen'), 
        t._onOpenEvent(new Error('Google.open: Init wurde nicht aufgerufen'), GOOGLE_TYPE_NAME, -1, n), 
        -1);
    }, t.setConfig = function(n) {
        return t.mCurrentPort ? t.mCurrentPort.setConfig(n) : -1;
    }, t.getConfig = function() {
        return t.mCurrentPort ? t.mCurrentPort.getConfig() : {
            googleAppKey: ''
        };
    }, t.mInitFlag = !1, t.mErrorOutputFlag = !1, t.mCurrentPort = null, t;
}();

export { GOOGLE_TYPE_NAME, GOOGLE_TTS_ACTION, GOOGLE_ASR_ACTION, GOOGLE_ASRNLU_ACTION, GOOGLE_NLU_ACTION, Google };
