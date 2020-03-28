/**
 * Speech-Google
 * 
 * Version: 0.1.4
 * Build:   0005
 * TYPE:    ALPHA
 * Datum:   12.02.2020
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

import { NetHtml5WebSocket } from '../../common/html5/net-html5-websocket.ts';

var GOOGLE_TYPE_NAME = 'Google', GOOGLE_PORT_NAME = 'GooglePort', GOOGLE_MOCK_NAME = 'GoogleMock', GOOGLE_SERVER_URL = 'ws://localhost:7050', GOOGLE_DEFAULT_URL = GOOGLE_SERVER_URL, GOOGLE_NLU_ACTION = 'NLU', GOOGLE_ASR_ACTION = 'ASR', GOOGLE_ASRNLU_ACTION = 'ASRNLU', GOOGLE_TTS_ACTION = 'TTS', GOOGLE_CONFIG_PATH = 'assets/', GOOGLE_CONFIG_FILE = 'google.json', GOOGLE_CONFIG_LOAD = !1, GOOGLE_DE_LANGUAGE = 'de-DE', GOOGLE_DEFAULT_LANGUAGE = GOOGLE_DE_LANGUAGE, GOOGLE_NLU2_FLAG = !0, GOOGLE_TTS_VOICE4 = 'Petra-ML', GOOGLE_TTS_VOICE = GOOGLE_TTS_VOICE4, GOOGLE_DEFAULT_VOICE = GOOGLE_TTS_VOICE, GOOGLE_PCM_CODEC = 'audio/L16;rate=16000', GOOGLE_DEFAULT_CODEC = GOOGLE_PCM_CODEC, GOOGLE_AUDIOBUFFER_SIZE = 2048, GOOGLE_AUDIOSAMPLE_RATE = 16e3, extendStatics = function(t, e) {
    return (extendStatics = Object.setPrototypeOf || {
        __proto__: []
    } instanceof Array && function(t, e) {
        t.__proto__ = e;
    } || function(t, e) {
        for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
    })(t, e);
};

function __extends(t, e) {
    function o() {
        this.constructor = t;
    }
    extendStatics(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, 
    new o());
}

function __awaiter(t, e, o, n) {
    return new (o || (o = Promise))(function(r, i) {
        function s(t) {
            try {
                a(n.next(t));
            } catch (t) {
                i(t);
            }
        }
        function u(t) {
            try {
                a(n.throw(t));
            } catch (t) {
                i(t);
            }
        }
        function a(t) {
            t.done ? r(t.value) : new o(function(e) {
                e(t.value);
            }).then(s, u);
        }
        a((n = n.apply(t, e || [])).next());
    });
}

function __generator(t, e) {
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
        next: u(0),
        throw: u(1),
        return: u(2)
    }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
        return this;
    }), i;
    function u(i) {
        return function(u) {
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
                        if (!(r = (r = s.trys).length > 0 && r[r.length - 1]) && (6 === i[0] || 2 === i[0])) {
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
            }([ i, u ]);
        };
    }
}

var ApiAiConstants, GOOGLE_VERSION_NUMBER = '0.1.4', GOOGLE_VERSION_BUILD = '0005', GOOGLE_VERSION_TYPE = 'ALPHA', GOOGLE_VERSION_DATE = '12.02.2020', GOOGLE_VERSION_STRING = GOOGLE_VERSION_NUMBER + '.' + GOOGLE_VERSION_BUILD + ' vom ' + GOOGLE_VERSION_DATE + ' (' + GOOGLE_VERSION_TYPE + ')', GOOGLE_API_VERSION = GOOGLE_VERSION_STRING, GoogleTransaction = function() {
    function t(e, o) {
        void 0 === e && (e = ''), void 0 === o && (o = ''), this.transactionId = 0, this.plugin = '', 
        this.type = '', this.result = null, this.error = null, this.plugin = e, this.type = o, 
        t.mTransactionCounter += 1, this.transactionId = t.mTransactionCounter;
    }
    return t.mTransactionCounter = 0, t;
}(), GoogleConfig = function(t) {
    function e(e) {
        var o = t.call(this, 'GoogleConfig') || this;
        return o.mInitFlag = !1, o.mConfigPath = GOOGLE_CONFIG_PATH, o.mConfigFile = GOOGLE_CONFIG_FILE, 
        o.mConfigLoadFlag = GOOGLE_CONFIG_LOAD, o.mConfigServerUrl = GOOGLE_DEFAULT_URL, 
        o.mConfigDialogflowTokenServerUrl = '', o.mConfigDialogflowProjectId = '', o.mConfigAppId = '', 
        o.mConfigAppKey = '', o.mConfigUserId = '', o.mConfigNluTag = '', o.mFileReader = null, 
        o.mOnInitFunc = null, o.mOnErrorFunc = null, o.mFileReader = e, o._setErrorOutputFunc(function(t) {
            return o._onError(new Error(t));
        }), o;
    }
    return __extends(e, t), e.prototype._setOption = function(t) {
        t && ('string' == typeof t.googleConfigPath && (this.mConfigPath = t.googleConfigPath), 
        'string' == typeof t.googleConfigFile && (this.mConfigFile = t.googleConfigFile), 
        'boolean' == typeof t.googleConfigLoadFlag && (this.mConfigLoadFlag = t.googleConfigLoadFlag), 
        'string' == typeof t.googleServerUrl && (this.mConfigServerUrl = t.googleServerUrl), 
        'string' == typeof t.dialogflowTokenServerUrl && (this.mConfigDialogflowTokenServerUrl = t.dialogflowTokenServerUrl), 
        'string' == typeof t.dialogflowProjectId && (this.mConfigDialogflowProjectId = t.dialogflowProjectId), 
        'string' == typeof t.googleAppId && (this.mConfigAppId = t.googleAppId), 'string' == typeof t.googleAppKey && (this.mConfigAppKey = t.googleAppKey), 
        'string' == typeof t.googleUserId && (this.mConfigUserId = t.googleUserId), 'string' == typeof t.googleNluTag && (this.mConfigNluTag = t.googleNluTag), 
        'string' == typeof t.googleNluTag && (this.mConfigNluTag = t.googleNluTag));
    }, e.prototype.init = function(t) {
        return this._setOption(t), this.mInitFlag = !0, 0;
    }, e.prototype.done = function() {
        return this.mInitFlag = !1, this.mConfigPath = GOOGLE_CONFIG_PATH, this.mConfigFile = GOOGLE_CONFIG_FILE, 
        this.mConfigLoadFlag = GOOGLE_CONFIG_LOAD, this.mConfigServerUrl = GOOGLE_DEFAULT_URL, 
        this.mConfigDialogflowTokenServerUrl = '', this.mConfigDialogflowProjectId = '', 
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
    }), Object.defineProperty(e.prototype, "dialogflowTokenServerUrl", {
        get: function() {
            return this.mConfigDialogflowTokenServerUrl;
        },
        set: function(t) {
            this.mConfigDialogflowTokenServerUrl = t;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(e.prototype, "dialogflowProjectId", {
        get: function() {
            return this.mConfigDialogflowProjectId;
        },
        set: function(t) {
            this.mConfigDialogflowProjectId = t;
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
        return !!(this.mConfigAppKey || this.mConfigDialogflowTokenServerUrl && this.mConfigDialogflowProjectId);
    }, e;
}(ErrorBase), GoogleNetwork = function(t) {
    function e() {
        return t.call(this, 'GoogleNetwork') || this;
    }
    return __extends(e, t), e;
}(NetHtml5Connect), GoogleWebSocket = function(t) {
    function e() {
        return t.call(this, 'GoogleWebSocket') || this;
    }
    return __extends(e, t), e.prototype.connect = function(t) {
        return t ? 0 !== this._connect(t) ? (this._error('open', 'keine Verbindung moeglich'), 
        -1) : 0 : (this._error('connect', 'keine URL vorhanden'), -1);
    }, e.prototype.disconnect = function() {
        this.onMessage = null, this.close();
    }, e.prototype.sendJSON = function(t) {
        this.sendMessage(t);
    }, e;
}(NetHtml5WebSocket), GoogleConnect = function(t) {
    function e(e, o) {
        var n = t.call(this, 'GoogleConnect') || this;
        return n.mConfig = null, n.mWebSocket = null, n.mConnectFlag = !1, n.mConfig = e, 
        n.mWebSocket = o, n;
    }
    return __extends(e, t), e.prototype.isConnect = function() {
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
        enumerable: !0,
        configurable: !0
    }), e;
}(ErrorBase);

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
}(ApiAiConstants || (ApiAiConstants = {}));

var ApiAiBaseError = function(t) {
    function e(e) {
        var o = t.call(this, e) || this;
        return o.message = e, o.stack = new Error().stack, o;
    }
    return __extends(e, t), e;
}(Error), ApiAiClientConfigurationError = function(t) {
    function e(e) {
        var o = t.call(this, e) || this;
        return o.name = "ApiAiClientConfigurationError", o;
    }
    return __extends(e, t), e;
}(ApiAiBaseError), ApiAiRequestError = function(t) {
    function e(e, o) {
        void 0 === o && (o = null);
        var n = t.call(this, e) || this;
        return n.message = e, n.code = o, n.name = "ApiAiRequestError", n;
    }
    return __extends(e, t), e;
}(ApiAiBaseError), XhrRequest = function() {
    function t() {}
    return t.ajax = function(e, o, n, r, i) {
        return void 0 === n && (n = null), void 0 === r && (r = null), void 0 === i && (i = {}), 
        new Promise(function(s, u) {
            var a = t.createXMLHTTPObject(), c = o, l = null;
            if (n && e === t.Method.GET) {
                c += "?";
                var h = 0;
                for (var g in n) n.hasOwnProperty(g) && (h++ && (c += "&"), c += encodeURIComponent(g) + "=" + encodeURIComponent(n[g]));
            } else n && (r || (r = {}), r["Content-Type"] = "application/json; charset=utf-8", 
            l = JSON.stringify(n));
            for (var g in i) g in a && (a[g] = i[g]);
            if (a.open(t.Method[e], c, !0), r) for (var g in console.log('Dialogflow.XhrRequest: Headers', r), 
            r) r.hasOwnProperty(g) && a.setRequestHeader(g, r[g]);
            l ? a.send(l) : a.send(), a.onload = function() {
                a.status >= 200 && a.status < 300 ? s(a) : (console.log('Dialogflow.XhrRequest: onLoad->reject ', a), 
                u(a));
            }, a.onerror = function() {
                console.log('Dialogflow.XhrRequest: onError ', a), u(a);
            };
        });
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
    function t(t, e) {
        this.apiAiClient = t, this.options = e, this.uri = this.apiAiClient.getApiBaseUrl() + "query?v=" + this.apiAiClient.getApiVersion(), 
        this.requestMethod = XhrRequest$1.Method.POST, this.headers = {
            Authorization: "Bearer " + this.apiAiClient.getAccessToken()
        }, this.options.lang = this.apiAiClient.getApiLang(), this.options.sessionId = this.apiAiClient.getSessionId();
    }
    return t.handleSuccess = function(t) {
        return Promise.resolve(JSON.parse(t.responseText));
    }, t.handleError = function(t) {
        var e = new ApiAiRequestError(null);
        try {
            var o = JSON.parse(t.responseText);
            e = o.status && o.status.errorDetails ? new ApiAiRequestError(o.status.errorDetails, o.status.code) : new ApiAiRequestError(t.statusText, t.status);
        } catch (o) {
            e = new ApiAiRequestError(t.statusText, t.status);
        }
        return Promise.reject(e);
    }, t.prototype.perform = function(e) {
        void 0 === e && (e = null);
        var o = e || this.options;
        return XhrRequest$1.ajax(this.requestMethod, this.uri, o, this.headers).then(t.handleSuccess.bind(this)).catch(t.handleError.bind(this));
    }, t;
}(), EventRequest = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return __extends(e, t), e;
}(Request), TextRequest = function(t) {
    function e() {
        return null !== t && t.apply(this, arguments) || this;
    }
    return __extends(e, t), e;
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
    return t.prototype.textRequest = function(t, e) {
        if (void 0 === e && (e = {}), !t) throw new ApiAiClientConfigurationError("Query should not be empty");
        return e.query = t, new TextRequest(this, e).perform();
    }, t.prototype.eventRequest = function(t, e, o) {
        if (void 0 === e && (e = {}), void 0 === o && (o = {}), !t) throw new ApiAiClientConfigurationError("Event name can not be empty");
        return o.event = {
            name: t,
            data: e
        }, new EventRequest(this, o).perform();
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
    function e(e, o, n) {
        var r = t.call(this, e || 'GoogleDevice') || this;
        return r.mInitFlag = !1, r.mConfig = null, r.mConnect = null, r.mTransaction = null, 
        r.onStart = null, r.onStop = null, r.onResult = null, r.onError = null, r.onClose = null, 
        r.mConfig = o, r.mConnect = n, r.mInitFlag = !0, r;
    }
    return __extends(e, t), e.prototype.isInit = function() {
        return this.mInitFlag;
    }, e.prototype._onStart = function() {
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
}(ErrorBase), GoogleNLU = function(t) {
    function e(e, o) {
        return t.call(this, 'GoogleNLU', e, o) || this;
    }
    return __extends(e, t), e.prototype._start = function(t) {
        var e = this;
        try {
            if (!this.mConfig.appKey) return void this._error('_start', 'kein AppKey vorhanden');
            this.mDialogflowClient = new ApiAiClient({
                accessToken: this.mConfig.appKey
            }), this.mDialogflowClient.textRequest(t.text).then(function(t) {
                try {
                    e._onResult(t.result);
                } catch (t) {
                    e._onError(new Error('NLU-Exception: ' + t.message));
                }
                e._onStop();
            }, function(t) {
                console.log('GoogleNlu._start: Promise-Error ', t), e._onError(new Error('NLU-Error: ' + t.message));
            });
        } catch (t) {
            this._exception('_start', t);
        }
    }, e.prototype._stop = function() {}, e;
}(GoogleDevice), PCM_L16CodecArray = [ 'audio/L16;rate=8000', 'audio/L16;rate=16000' ], OpusCodecArray = [ 'audio/opus;rate=8000', 'audio/opus;rate=16000' ], GoogleAudioCodec = function(t) {
    function e() {
        return t.call(this, 'GoogleAudioCodec') || this;
    }
    return __extends(e, t), e.prototype._findCodec = function(t, e) {
        for (var o = 0; o < e.length; o++) if (t === e[o]) return !0;
        return !1;
    }, e.prototype.findPcmCodec = function(t) {
        return this._findCodec(t, PCM_L16CodecArray);
    }, e.prototype.findOpusCodec = function(t) {
        return this._findCodec(t, OpusCodecArray);
    }, e.prototype._float32ToInt16 = function(t) {
        var e = t < 0 ? 32768 * t : 32767 * t;
        return Math.max(-32768, Math.min(32768, e));
    }, e.prototype._float32ArrayToInt16Array = function(t) {
        for (var e = new Int16Array(t.length), o = 0; o < t.length; ) e[o] = this._float32ToInt16(t[o++]);
        return e;
    }, e.prototype.encodePCM = function(t, e) {
        return this.findPcmCodec(e) ? [ this._float32ArrayToInt16Array(t) ] : [ t ];
    }, e.prototype.decodePCM = function(t) {
        try {
            for (var e = new Int16Array(t), o = e.length, n = new Float32Array(o), r = 0; r < o; ++r) n[r] = e[r] / 32768;
            return n;
        } catch (t) {
            return console.log('GoogleAudioCodec.decodePCM: Exception', t), this._exception('decodePCM', t), 
            [];
        }
    }, e;
}(ErrorBase), GoogleResampler = function() {
    function t(t, e, o, n, r) {
        this.fromSampleRate = 0, this.toSampleRate = 0, this.channels = 0, this.outputBufferSize = 0, 
        this.noReturn = !1, this.resampler = null, this.ratioWeight = 0, this.interpolate = null, 
        this.lastWeight = 0, this.outputBuffer = null, this.lastOutput = null, this.fromSampleRate = t, 
        this.toSampleRate = e, this.channels = o || 0, this.outputBufferSize = n, this.noReturn = !!r, 
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
}(), GoogleAudioRecorder2 = function(t) {
    function e(e, o) {
        var n = t.call(this, 'GoogleAudioRecorder2') || this;
        n.mAudioContext = null, n.mAudioCodec = null, n.mResampler = null, n.mBufferSize = GOOGLE_AUDIOBUFFER_SIZE, 
        n.mSampleRate = GOOGLE_AUDIOSAMPLE_RATE, n.mCodec = GOOGLE_DEFAULT_CODEC, n.mAudioInputNode = null, 
        n.mAnalyseNode = null, n.mRecordingNode = null, n.mUserMediaStream = null, n.mChannelDataList = [], 
        n.mBytesRecorded = 0, n.mRecordingFlag = !1, n.mOnVolumeFunc = null, n.mOnEndedFunc = null, 
        n.mAudioContext = e, n.mOnVolumeFunc = o, n.mAudioCodec = new GoogleAudioCodec();
        try {
            n.mResampler = new GoogleResampler(n.mAudioContext.sampleRate, n.mSampleRate, 1, n.mBufferSize, void 0);
        } catch (t) {
            throw n._exception('constructor', t), new Error('GoogleAudioRecorder2 nicht initialisiert');
        }
        return n;
    }
    return __extends(e, t), e.prototype._closeMediaStream = function() {
        try {
            if (this.mUserMediaStream && this.mUserMediaStream.getAudioTracks) for (var t = 0, e = this.mUserMediaStream.getAudioTracks(); t < e.length; t++) {
                var o = e[t];
                o.stop && o.stop();
            }
        } catch (t) {
            this._exception('_closeMediaStream', t);
        }
        this.mUserMediaStream = null;
    }, e.prototype.getAudioData = function(t) {
        for (var e = 0, o = 0, n = t; o < n.length; o++) {
            e += (a = n[o]).length;
        }
        for (var r = new Int16Array(e), i = 0, s = 0, u = t; s < u.length; s++) for (var a = u[s], c = 0; c < a.length; c++) r[i] = a[c], 
        i++;
        return r.buffer;
    }, e.prototype._onEnded = function() {
        var t = this.getAudioData(this.mChannelDataList);
        if ('function' == typeof this.mOnEndedFunc) try {
            this.mOnEndedFunc(t);
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
            var o = t.inputBuffer.getChannelData(0), n = this.mResampler.resampler(o);
            this.mBytesRecorded += n.length;
            var r = new Uint8Array(this.mAnalyseNode.frequencyBinCount);
            if (this.mAnalyseNode.getByteTimeDomainData(r), this.mAudioCodec.findPcmCodec(this.mCodec)) this.mAudioCodec.encodePCM(n, this.mCodec).forEach(function(t) {
                e.mChannelDataList.push(t);
            }); else this.mAudioCodec.findOpusCodec(this.mCodec);
            this._onVolume(r);
        } catch (t) {
            this._exception('_onAudioProcess', t);
        }
    }, e.prototype.start = function(t, e) {
        var o = this;
        this.mRecordingFlag = !0, this.mUserMediaStream = t, this.mCodec = e, this.mAudioContext.resume().then(function() {
            try {
                o.mAudioInputNode = o.mAudioContext.createMediaStreamSource(o.mUserMediaStream), 
                o.mAnalyseNode = o.mAudioContext.createAnalyser(), o.mRecordingNode = o.mAudioContext.createScriptProcessor(o.mBufferSize, 1, 2), 
                o.mRecordingNode.onaudioprocess = function(t) {
                    return o._onAudioProcess(t);
                }, o.mAudioInputNode.connect(o.mAnalyseNode), o.mAnalyseNode.connect(o.mRecordingNode), 
                o.mRecordingNode.connect(o.mAudioContext.destination);
            } catch (t) {
                console.log('GoogleAudioRecorder2.start: Exception', t), o._exception('start', t);
            }
        }, function(t) {
            t && t.message && o._error('start.resume', t.message);
        });
    }, e.prototype.startAudio = function(t, e) {}, e.prototype.stop = function(t) {
        this.mOnEndedFunc = t, this.mRecordingFlag = !1;
    }, e;
}(ErrorBase), AUDIO_MIN_SAMPLERATE = 22500, GoogleAudioPlayer = function(t) {
    function e(e) {
        var o = t.call(this, 'NuanceAudioPlayer') || this;
        return o.mAudioContext = null, o.mAudioCodec = null, o.mResampler = null, o.mOnAudioEndFunc = null, 
        o.mAudioSource = null, o.mAudioArray = [], o.mQueue = [], o.mBeginSpeakFlag = !0, 
        o.mAudioStopFlag = !1, o.mAudioBuffer = null, o.mSource = null, o.mAudioContext = e, 
        o.mAudioCodec = new GoogleAudioCodec(), o;
    }
    return __extends(e, t), e.prototype.start = function() {
        this.mOnAudioEndFunc = null, this.mAudioSource = null, this.mAudioArray = [], this.mQueue = [], 
        this.mBeginSpeakFlag = !0, this.mAudioStopFlag = !1;
    }, e.prototype._getAudioBufferFirst = function(t) {
        var e = null;
        try {
            var o = new Float32Array(t.length);
            o.set(t), (e = new AudioBuffer({
                length: o.length,
                numberOfChannels: 1,
                sampleRate: GOOGLE_AUDIOSAMPLE_RATE
            })).getChannelData(0).set(o);
        } catch (t) {
            e = null, console.log('NuanceAudioPlayer._getAudioBufferFirst: Exception', t);
        }
        return e;
    }, e.prototype._getAudioBufferSecond = function(t) {
        var e = null;
        try {
            var o = new Float32Array(t.length);
            o.set(t), (e = this.mAudioContext.createBuffer(1, o.length, GOOGLE_AUDIOSAMPLE_RATE)).getChannelData(0).set(o);
        } catch (t) {
            e = null, console.log('NuanceAudioPlayer._getAudioBufferSecond: Exception', t);
        }
        return e;
    }, e.prototype._getAudioBufferResample = function(t) {
        var e = null;
        try {
            var o = new Float32Array(1.4 * t.length);
            o.set(t), this.mResampler = new GoogleResampler(GOOGLE_AUDIOSAMPLE_RATE, AUDIO_MIN_SAMPLERATE, 1, o.length, void 0);
            var n = this.mResampler.resampler(o);
            (e = this.mAudioContext.createBuffer(1, n.length, AUDIO_MIN_SAMPLERATE)).getChannelData(0).set(n);
        } catch (t) {
            e = null, console.log('NuanceAudioPlayer._getAudioBufferResample: Exception', t);
        }
        return e;
    }, e.prototype.playByStream = function(t, e) {
        var o = this;
        try {
            if (this.mOnAudioEndFunc = t.onaudioend, 0 === e.length || this.mAudioStopFlag) return this.mBeginSpeakFlag = !0, 
            t.onaudioend(), this.mOnAudioEndFunc = null, void (this.mAudioSource = null);
            this.mAudioSource = this.mAudioContext.createBufferSource(), this.mAudioSource.onended = function() {
                return o.playByStream(t, e);
            };
            var n = e.shift(), r = this._getAudioBufferFirst(n);
            if (r || (r = this._getAudioBufferSecond(n)), r || (r = this._getAudioBufferResample(n)), 
            !r) return void this._error('playByStream', 'kein Audiobuffer erzeugt');
            this.mAudioSource.buffer = r, this.mAudioSource.connect(this.mAudioContext.destination), 
            this.mAudioSource.start ? this.mAudioSource.start(0) : this.mAudioSource.noteOn(0), 
            t.onaudiostart();
        } catch (e) {
            this.mBeginSpeakFlag = !0, t.onaudioend(), this.mOnAudioEndFunc = null, this.mAudioSource = null, 
            console.log('NuanceAudioPlayer.playByStream: Exception', e), this._exception('playByStream', e);
        }
    }, e.prototype.decodeStream = function(t, e) {
        try {
            if (this.mAudioCodec.findPcmCodec(t.codec)) {
                var o = this.mAudioCodec.decodePCM(e);
                this.mAudioArray.push(o), this.mQueue.push(o), this.mBeginSpeakFlag && (this.mBeginSpeakFlag = !1, 
                this.playByStream(t, this.mAudioArray));
            } else this.mAudioCodec.findOpusCodec(t.codec) || this._error('decode', 'Kein Decoder vorhanden fuer ' + t.codec);
        } catch (t) {
            this._exception('decode', t);
        }
    }, e.prototype.decodeAudio = function(t, e) {
        var o = this;
        if (!this.mAudioContext) return this._error('_decodeAudio', 'kein AudioContext vorhanden'), 
        -1;
        try {
            return this.mAudioContext.decodeAudioData(e, function(e) {
                o.mAudioBuffer = e, o._playStart(t);
            }, function(t) {
                o._error('_decodeAudio', 'DOMException');
            }), 0;
        } catch (t) {
            return this._exception('_decodeAudio', t), -1;
        }
    }, e.prototype._playStart = function(t) {
        if (!this.mAudioBuffer) return this._error('_playStart', 'kein AudioBuffer vorhanden'), 
        -1;
        if (!this.mAudioContext) return this._error('_playStart', 'kein AudioContext vorhanden'), 
        -1;
        try {
            return this.mSource = this.mAudioContext.createBufferSource(), this.mSource.onended = function() {
                t.onaudioend && t.onaudioend();
            }, this.mSource.buffer = this.mAudioBuffer, this.mSource.connect(this.mAudioContext.destination), 
            this.mSource.start ? this.mSource.start(0) : this.mSource.noteOn(0), t.onaudiostart && t.onaudiostart(), 
            0;
        } catch (t) {
            return this._exception('_playStart', t), -1;
        }
    }, e.prototype.stop = function() {
        try {
            this.mAudioStopFlag = !0, this.mAudioSource && (this.mAudioSource.stop(0), this.mAudioSource.disconnect(0), 
            'function' == typeof this.mOnAudioEndFunc && this.mOnAudioEndFunc());
        } catch (t) {
            this._exception('stop', t);
        }
        this.mAudioSource = null;
    }, e.prototype.stopAudio = function() {
        if (this.mSource) {
            try {
                this.mSource.stop ? this.mSource.stop(0) : this.mSource.noteOff(0), this.mSource.disconnect(0);
            } catch (t) {
                this._exception('stop', t);
            }
            this.mSource = null, this.mAudioBuffer = null;
        }
    }, e;
}(ErrorBase), DIALOGFLOW_SERVER_URL = 'https://dialogflow.googleapis.com/v2/projects', ASR_MAXVOLUME_COUNTER = 30, ASR_TIMEOUTVOLUME_COUNTER = 200, ASR_MINVOLUME_THRESHOLD = 127, ASR_MAXVOLUME_THRESHOLD = 128, GoogleNLU2 = function(t) {
    function e(e, o, n, r) {
        var i = t.call(this, 'GoogleNLU2', e, o) || this;
        return i.mAccessToken = '', i.mAccessTokenDate = new Date(), i.mAccessTokenDuration = 0, 
        i.mOptions = {}, i.mAudioContext = null, i.mAudioPlayer = null, i.mGetUserMedia = null, 
        i.mAudioRecorder = null, i.mUserMediaStream = null, i.mRecordingFlag = !1, i.mStopFlag = !1, 
        i.mVolumeCounter = 0, i.mTimeoutCounter = 0, i.mAudioContext = n, i.mGetUserMedia = r, 
        i.getAccessTokenFromServer(), i;
    }
    return __extends(e, t), e.prototype.getDiffTime = function(t, e) {
        return e.getTime() - t.getTime();
    }, e.prototype.getAccessTokenFromServer = function() {
        return __awaiter(this, void 0, void 0, function() {
            var t, e;
            return __generator(this, function(o) {
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
                    return t = o.sent(), this.mAccessTokenDate = new Date(), this.mAccessToken = t.token || '', 
                    this.mAccessTokenDuration = t.time || 0, [ 3, 4 ];

                  case 3:
                    return e = o.sent(), this.mInitFlag = !1, this._exception('getAccessTokenFromServer', e), 
                    [ 3, 4 ];

                  case 4:
                    return [ 2 ];
                }
            });
        });
    }, e.prototype.getAccessToken = function() {
        return __awaiter(this, void 0, void 0, function() {
            var t;
            return __generator(this, function(e) {
                switch (e.label) {
                  case 0:
                    return t = new Date(), Math.round(this.getDiffTime(this.mAccessTokenDate, t) / 1e3) > this.mAccessTokenDuration ? [ 4, this.getAccessTokenFromServer() ] : [ 3, 2 ];

                  case 1:
                    e.sent(), e.label = 2;

                  case 2:
                    return [ 2, this.mAccessToken ];
                }
            });
        });
    }, e.prototype.getDetectIntentText = function(t, e) {
        return __awaiter(this, void 0, void 0, function() {
            var o, n;
            return __generator(this, function(r) {
                switch (r.label) {
                  case 0:
                    return r.trys.push([ 0, 4, , 5 ]), [ 4, this.getAccessToken() ];

                  case 1:
                    return o = r.sent(), [ 4, fetch(DIALOGFLOW_SERVER_URL + "/" + this.mConfig.dialogflowProjectId + "/agent/sessions/123456789:detectIntent", {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            Authorization: "Bearer " + o,
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
                    return [ 4, r.sent().json() ];

                  case 3:
                    return [ 2, r.sent() ];

                  case 4:
                    return n = r.sent(), this._exception('getDetectIntentText', n), [ 2, new Promise(function(t, e) {
                        e(new Error('Exception in getDetectIntentText'));
                    }) ];

                  case 5:
                    return [ 2 ];
                }
            });
        });
    }, e.prototype.getDetectIntentAudio = function(t, e) {
        return __awaiter(this, void 0, void 0, function() {
            var e, o, n;
            return __generator(this, function(r) {
                switch (r.label) {
                  case 0:
                    return r.trys.push([ 0, 4, , 5 ]), [ 4, this.getAccessToken() ];

                  case 1:
                    return e = r.sent(), [ 4, fetch(DIALOGFLOW_SERVER_URL + "/" + this.mConfig.dialogflowProjectId + "/agent/sessions/123456789:detectIntent", {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            Authorization: "Bearer " + e,
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
                    return [ 4, r.sent().json() ];

                  case 3:
                    return o = r.sent(), console.log('GoogleNLU2.getDetectIntentAudio: ', o), [ 2, o ];

                  case 4:
                    return n = r.sent(), this._exception('getDetectIntentText', n), [ 2, new Promise(function(t, e) {
                        e(new Error('Exception in getDetectIntentAudio'));
                    }) ];

                  case 5:
                    return [ 2 ];
                }
            });
        });
    }, e.prototype._responseIntent = function(t, e) {
        var o = -1;
        try {
            this._onResult(e), this.mStopFlag || (e.outputAudioConfig && 'OUTPUT_AUDIO_ENCODING_MP3' === e.outputAudioConfig.audioEncoding ? o = this._startTTS(t, e.outputAudio) : this._onError(new Error('NLU-Error: no MP3-Format')));
        } catch (t) {
            this._onError(new Error('NLU-Exception: ' + t.message));
        }
        0 !== o && this._onStop();
    }, e.prototype._start = function(t) {
        var e = this;
        this.mStopFlag = !1;
        try {
            if (!this.mConfig.dialogflowTokenServerUrl) return void this._error('_start', 'kein Tokenserver vorhanden');
            if (!this.mConfig.dialogflowProjectId) return void this._error('_start', 'keine ProjektID vorhanden');
            t.text ? this.getDetectIntentText(t.text, t.language).then(function(o) {
                e._responseIntent(t, o);
            }, function(t) {
                e._onError(new Error('NLU-Error: ' + t.message)), e._onStop();
            }) : this._startASR(t);
        } catch (t) {
            this._exception('_start', t);
        }
    }, e.prototype._stop = function() {
        this.mStopFlag = !0, this._stopASR({}), this._stopTTS();
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
            (r < ASR_MINVOLUME_THRESHOLD || r > ASR_MAXVOLUME_THRESHOLD) && (this.mVolumeCounter = 0);
        } catch (t) {
            this._exception('isVolume', t);
        }
        return this.mVolumeCounter !== ASR_MAXVOLUME_COUNTER && this.mTimeoutCounter !== ASR_TIMEOUTVOLUME_COUNTER;
    }, e.prototype._startASRAudio = function(t) {}, e.prototype._startASRRecording = function(t) {
        var e = this;
        this.mVolumeCounter = 0, this.mTimeoutCounter = 0;
        try {
            if (this.mAudioRecorder = new GoogleAudioRecorder2(this.mAudioContext, function(o) {
                e.isVolume(o) || e._stopASR(t);
            }), t.userMediaStream) this.mAudioRecorder.start(t.userMediaStream, GOOGLE_PCM_CODEC); else {
                if (!t.audioData) return this._error('_startASRRecording', 'keine Audiodaten vorhanden'), 
                void this._stop();
                this.mAudioRecorder.startAudio(t.audioData, GOOGLE_PCM_CODEC);
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
                this._exception('_startASR', t);
            }
        } else {
            if (!this.mGetUserMedia) return this._error('_startASR', 'kein getUserMedia vorhanden'), 
            -1;
            try {
                return this.mGetUserMedia({
                    audio: !0,
                    video: !1
                }).then(function(o) {
                    e.mUserMediaStream = o;
                    var n = {
                        userMediaStream: e.mUserMediaStream,
                        language: t.language
                    };
                    e._startASRRecording(n);
                }, function(t) {
                    e._onError(new Error('ASR-Error: kein UserMedia erzeugt')), e._error('_startASR', 'keine UserMedia erzeugt: ' + t.message), 
                    e._onStop();
                }), 0;
            } catch (t) {
                return this._exception('_startASR', t), -1;
            }
        }
        return this._error('_startASR', 'ASR ist nicht implementiert'), -1;
    }, e.prototype._stopASR = function(t) {
        var e = this;
        if (this.mRecordingFlag = !1, !this.mAudioRecorder) return 0;
        try {
            return this.mAudioRecorder.stop(function(o) {
                e.mStopFlag || e.getDetectIntentAudio(e.encodeBase64(o), '').then(function(o) {
                    e._responseIntent(t, o);
                }, function(t) {
                    e._onError(new Error('NLU-Error: ' + t.message)), e._onStop();
                });
            }), this.mAudioRecorder = null, 0;
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
            this.mAudioPlayer = new GoogleAudioPlayer(this.mAudioContext), this.mAudioPlayer.start();
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
}(GoogleDevice), GOOGLE_ASRSERVER_URL = 'https://speech.googleapis.com/v1/speech:recognize', ASR_MAXVOLUME_COUNTER$1 = 30, ASR_TIMEOUTVOLUME_COUNTER$1 = 200, ASR_MINVOLUME_THRESHOLD$1 = 127, ASR_MAXVOLUME_THRESHOLD$1 = 128, GoogleASR2 = function(t) {
    function e(e, o, n, r, i) {
        var s = t.call(this, 'GoogleASR2', e, o) || this;
        return s.mAccessToken = '', s.mAccessTokenDate = new Date(), s.mAccessTokenDuration = 0, 
        s.mAudioContext = null, s.mGetUserMedia = null, s.mAudioReader = null, s.mAudioRecorder = null, 
        s.mUserMediaStream = null, s.mRecordingFlag = !1, s.mVolumeCounter = 0, s.mTimeoutCounter = 0, 
        s.mAudioContext = n, s.mGetUserMedia = r, s.mAudioReader = i, s.getAccessTokenFromServer(), 
        s;
    }
    return __extends(e, t), e.prototype.getDiffTime = function(t, e) {
        return e.getTime() - t.getTime();
    }, e.prototype.getAccessTokenFromServer = function() {
        return __awaiter(this, void 0, void 0, function() {
            var t, e;
            return __generator(this, function(o) {
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
                    return t = o.sent(), this.mAccessTokenDate = new Date(), this.mAccessToken = t.token || '', 
                    this.mAccessTokenDuration = t.time || 0, [ 3, 4 ];

                  case 3:
                    return e = o.sent(), this.mInitFlag = !1, this._exception('getAccessTokenFromServer', e), 
                    [ 3, 4 ];

                  case 4:
                    return [ 2 ];
                }
            });
        });
    }, e.prototype.getAccessToken = function() {
        return __awaiter(this, void 0, void 0, function() {
            var t;
            return __generator(this, function(e) {
                switch (e.label) {
                  case 0:
                    return t = new Date(), Math.round(this.getDiffTime(this.mAccessTokenDate, t) / 1e3) > this.mAccessTokenDuration ? [ 4, this.getAccessTokenFromServer() ] : [ 3, 2 ];

                  case 1:
                    e.sent(), e.label = 2;

                  case 2:
                    return [ 2, this.mAccessToken ];
                }
            });
        });
    }, e.prototype.getSpeechToText = function(t, e, o) {
        return __awaiter(this, void 0, void 0, function() {
            var t, e, n;
            return __generator(this, function(r) {
                switch (r.label) {
                  case 0:
                    return r.trys.push([ 0, 4, , 5 ]), [ 4, this.getAccessToken() ];

                  case 1:
                    return t = r.sent(), [ 4, fetch(GOOGLE_ASRSERVER_URL, {
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
            });
        });
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
        if (t && t.length > 0) {
            t[0].transcript, t[0].confidence;
            this._onResult(t);
        }
    }, e.prototype._onSpeechEnd = function() {}, e.prototype._onOptionMessage = function(t) {
        t.results && t.results.length > 0 && this._onSpeechResult(t.results[0].alternatives);
    }, e.prototype.isVolume = function(t) {
        if (this.mVolumeCounter += 1, this.mTimeoutCounter += 1, t) try {
            for (var e = t.length, o = 0, n = 0; n < e; n++) o += t[n] * t[n];
            var r = Math.sqrt(o / e);
            (r < ASR_MINVOLUME_THRESHOLD$1 || r > ASR_MAXVOLUME_THRESHOLD$1) && (this.mVolumeCounter = 0);
        } catch (t) {
            this._exception('isVolume', t);
        }
        return this.mVolumeCounter !== ASR_MAXVOLUME_COUNTER$1 && this.mTimeoutCounter !== ASR_TIMEOUTVOLUME_COUNTER$1;
    }, e.prototype._onEndedFunc = function(t) {
        this.getSpeechToText('de-DE', 'LINEAR16', this.encodeBase64(t));
    }, e.prototype._startAudio = function(t) {}, e.prototype._startASR = function(t) {
        var e = this;
        this.mVolumeCounter = 0, this.mTimeoutCounter = 0;
        try {
            if (this.mAudioRecorder = new GoogleAudioRecorder2(this.mAudioContext, function(t) {
                e.isVolume(t) || e._stop();
            }), t.userMediaStream) this.mAudioRecorder.start(t.userMediaStream, GOOGLE_PCM_CODEC); else {
                if (!t.audioData) return this._error('_startASR', 'keine Audiodaten vorhanden'), 
                void this._stop();
                this.mAudioRecorder.startAudio(t.audioData, GOOGLE_PCM_CODEC);
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
                }).then(function(o) {
                    e.mUserMediaStream = o;
                    var n = {
                        userMediaStream: e.mUserMediaStream,
                        language: t.language
                    };
                    e._startASR(n);
                }, function(t) {
                    e._onError(new Error('ASR-Error: kein UserMedia erzeugt')), e._error('_start', 'keine UserMedia erzeugt: ' + t.message), 
                    e._onStop();
                }), 0;
            } catch (t) {
                return this._exception('_start', t), -1;
            }
        }
        return this._error('_start', 'ASR ist nicht implementiert'), -1;
    }, e.prototype._stop = function() {
        var t = this;
        if (this.mRecordingFlag = !1, !this.mAudioRecorder) return 0;
        try {
            return this.mAudioRecorder.stop(function(e) {
                t._onEndedFunc(e);
            }), this.mAudioRecorder = null, 0;
        } catch (t) {
            return this._exception('_stop', t), -1;
        }
    }, e;
}(GoogleDevice), GOOGLE_TTSSERVER_URL = 'https://texttospeech.googleapis.com/v1/text:synthesize', GoogleTTS2 = function(t) {
    function e(e, o, n) {
        var r = t.call(this, 'GoogleTTS2', e, o) || this;
        return r.mAccessToken = '', r.mAccessTokenDate = new Date(), r.mAccessTokenDuration = 0, 
        r.mAudioContext = null, r.mAudioPlayer = null, r.mAudioContext = n, r.getAccessTokenFromServer(), 
        r;
    }
    return __extends(e, t), e.prototype.getDiffTime = function(t, e) {
        return e.getTime() - t.getTime();
    }, e.prototype.getAccessTokenFromServer = function() {
        return __awaiter(this, void 0, void 0, function() {
            var t, e;
            return __generator(this, function(o) {
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
                    return t = o.sent(), this.mAccessTokenDate = new Date(), this.mAccessToken = t.token || '', 
                    this.mAccessTokenDuration = t.time || 0, [ 3, 4 ];

                  case 3:
                    return e = o.sent(), this.mInitFlag = !1, this._exception('getAccessTokenFromServer', e), 
                    [ 3, 4 ];

                  case 4:
                    return [ 2 ];
                }
            });
        });
    }, e.prototype.getAccessToken = function() {
        return __awaiter(this, void 0, void 0, function() {
            var t;
            return __generator(this, function(e) {
                switch (e.label) {
                  case 0:
                    return t = new Date(), Math.round(this.getDiffTime(this.mAccessTokenDate, t) / 1e3) > this.mAccessTokenDuration ? [ 4, this.getAccessTokenFromServer() ] : [ 3, 2 ];

                  case 1:
                    e.sent(), e.label = 2;

                  case 2:
                    return [ 2, this.mAccessToken ];
                }
            });
        });
    }, e.prototype.getTextToSpeech = function(t, e, o, n) {
        return __awaiter(this, void 0, void 0, function() {
            var r;
            return __generator(this, function(i) {
                switch (i.label) {
                  case 0:
                    return [ 4, this.getAccessToken() ];

                  case 1:
                    return r = i.sent(), [ 4, fetch(GOOGLE_TTSSERVER_URL, {
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
            });
        });
    }, e.prototype.decodeBase64 = function(t) {
        if (window.atob) {
            for (var e = window.atob(t), o = e.length, n = new Uint8Array(o), r = 0; r < o; r++) n[r] = e.charCodeAt(r);
            return n.buffer;
        }
        return new ArrayBuffer(1);
    }, e.prototype._start = function(t) {
        var e = this;
        try {
            return this.mConfig.serverUrl ? (this.getTextToSpeech(t.text, t.language, t.voice, 'MP3').then(function(t) {
                try {
                    e.mAudioPlayer = new GoogleAudioPlayer(e.mAudioContext), e.mAudioPlayer.start();
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
            }, function(t) {
                e._onError(new Error('TTS2-Error: ' + t.message)), e._onStop();
            }), 0) : void this._error('_start', 'kein Tokenserver vorhanden');
        } catch (t) {
            return this._exception('_start', t), -1;
        }
    }, e.prototype._stop = function() {
        return this.mAudioPlayer && (this.mAudioPlayer.stopAudio(), this._onStop()), 0;
    }, e;
}(GoogleDevice), AUDIO_UNLOCK_TIMEOUT = 2e3, GOOGLE_ACTION_TIMEOUT = 6e4, GooglePort = function(t) {
    function e(e, o) {
        void 0 === o && (o = !0);
        var n = t.call(this, e || GOOGLE_PORT_NAME, o) || this;
        return n.mAudioContext = null, n.mGetUserMedia = null, n.mGoogleServerFlag = !1, 
        n.mGoogleConfig = null, n.mGoogleNetwork = null, n.mGoogleWebSocket = null, n.mGoogleConnect = null, 
        n.mGoogleTTS = null, n.mGoogleASR = null, n.mGoogleNLU = null, n.mGoogleNLU2 = null, 
        n.mGoogleNLU2Flag = GOOGLE_NLU2_FLAG, n.mDynamicCredentialsFlag = !1, n.mTransaction = null, 
        n.mRunningFlag = !1, n.mDefaultOptions = null, n.mActionTimeoutId = 0, n.mActionTimeout = GOOGLE_ACTION_TIMEOUT, 
        n;
    }
    return __extends(e, t), e.prototype.isServer = function() {
        return this.mGoogleServerFlag;
    }, e.prototype.isMock = function() {
        return !1;
    }, e.prototype.getType = function() {
        return GOOGLE_TYPE_NAME;
    }, e.prototype.getClass = function() {
        return 'GooglePort';
    }, e.prototype.getVersion = function() {
        return GOOGLE_API_VERSION;
    }, e.prototype._checkCredentials = function(t) {
        if (!t) return !1;
        var e = !0;
        if ('string' != typeof t.dialogflowTokenServerUrl && (e = !1), t.dialogflowTokenServerUrl || (e = !1), 
        'string' != typeof t.dialogflowProjectId && (e = !1), t.dialogflowProjectId || (e = !1), 
        !e) {
            if ('string' != typeof t.googleAppKey) return !1;
            if (!t.googleAppKey) return !1;
        }
        return this.mGoogleNLU2Flag = e, !0;
    }, e.prototype._initAllObject = function(t) {
        var e = this, o = new FileHtml5Reader();
        o.init();
        var n = new AudioHtml5Reader();
        if (n.init({
            audioContext: this.mAudioContext
        }), this.mGoogleConfig = new GoogleConfig(o), 0 !== this.mGoogleConfig.init(t)) return -1;
        if (this.mGoogleNetwork = new GoogleNetwork(), this.mGoogleNetwork.onOnline = function() {
            return e._onOnline();
        }, this.mGoogleNetwork.onOffline = function() {
            return e._onOffline();
        }, this.mGoogleNetwork.onError = function(t) {
            return e._onError(t);
        }, 0 !== this.mGoogleNetwork.init(t)) return -1;
        if (this.isServer() && (this.mGoogleWebSocket = new GoogleWebSocket(), this.mGoogleWebSocket.onOpen = function(t) {
            return e._onOpen();
        }, this.mGoogleWebSocket.onClose = function() {
            return e._onClose();
        }, this.mGoogleWebSocket.onError = function(t) {
            return e._onError(t);
        }, 0 !== this.mGoogleWebSocket.init(t))) return -1;
        if (this.mGoogleConnect = new GoogleConnect(this.mGoogleConfig, this.mGoogleWebSocket), 
        this.mGoogleNLU = new GoogleNLU(this.mGoogleConfig, this.mGoogleConnect), this.mGoogleNLU.onStart = function(t) {
            return e._onStart(t.plugin, t.type);
        }, this.mGoogleNLU.onStop = function(t) {
            return e._onStop(t.plugin, t.type);
        }, this.mGoogleNLU.onResult = function(t) {
            return e._onResult(t.result, t.plugin, t.type);
        }, this.mGoogleNLU.onError = function(t) {
            return e._onError(t.error, t.plugin, t.type);
        }, this.mGoogleNLU.onClose = function(t) {
            return e._onClose();
        }, this.mGoogleNLU2 = new GoogleNLU2(this.mGoogleConfig, this.mGoogleConnect, this.mAudioContext, this.mGetUserMedia), 
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
            this.mGoogleTTS = new GoogleTTS2(this.mGoogleConfig, this.mGoogleConnect, this.mAudioContext), 
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
                this.mGetUserMedia && (this.mGoogleASR = new GoogleASR2(this.mGoogleConfig, this.mGoogleConnect, this.mAudioContext, this.mGetUserMedia, n), 
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
    }, e.prototype.init = function(e) {
        if (this.mInitFlag) return this._error('init', 'Port ist bereits initialisiert'), 
        0;
        if (e && 'boolean' == typeof e.googleDynamicCredentialsFlag && e.googleDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0; else if (!this._checkCredentials(e)) return this._error('init', 'kein AppKey als Parameter uebergeben'), 
        -1;
        e && 'boolean' == typeof e.googleServerFlag && e.googleServerFlag && (this.mGoogleServerFlag = !0);
        var o = FactoryManager.get(AUDIOCONTEXT_FACTORY_NAME, AudioContextFactory);
        if (o) {
            var n = o.create();
            n && (this.mAudioContext = new n());
        }
        var r = FactoryManager.get(USERMEDIA_FACTORY_NAME, UserMediaFactory);
        return r && (this.mGetUserMedia = r.create()), 0 !== this._initAllObject(e) ? -1 : 0 !== t.prototype.init.call(this, e) ? -1 : (this.isErrorOutput() && (this.mGoogleNLU ? console.log('GooglePort: NLU ist vorhanden') : console.log('GooglePort: NLU ist nicht vorhanden'), 
        this.mGoogleNLU2 ? console.log('GooglePort: NLU2 ist vorhanden') : console.log('GooglePort: NLU2 ist nicht vorhanden'), 
        this.mGoogleTTS ? console.log('GooglePort: TTS ist vorhanden') : console.log('GooglePort: TTS ist nicht vorhanden'), 
        this.mGoogleASR ? console.log('GooglePort: ASR ist vorhanden') : console.log('GooglePort: ASR ist nicht vorhanden')), 
        0);
    }, e.prototype.done = function() {
        return t.prototype.done.call(this), this._clearActionTimeout(), this.mAudioContext && this.mAudioContext.close(), 
        this.mAudioContext = null, this.mGetUserMedia = null, this.mGoogleConnect && (this.mGoogleConnect.disconnect(), 
        this.mGoogleConnect = null), this.mGoogleWebSocket && (this.mGoogleWebSocket.done(), 
        this.mGoogleWebSocket = null), this.mGoogleNetwork && (this.mGoogleNetwork.done(), 
        this.mGoogleNetwork = null), this.mGoogleConfig && (this.mGoogleConfig.done(), this.mGoogleConfig = null), 
        this.mGoogleTTS = null, this.mGoogleASR = null, this.mGoogleNLU = null, this.mGoogleNLU2 = null, 
        this.mGoogleServerFlag = !1, this.mDynamicCredentialsFlag = !1, this.mTransaction = null, 
        this.mRunningFlag = !1, this.mDefaultOptions = null, this.mActionTimeoutId = 0, 
        this.mActionTimeout = GOOGLE_ACTION_TIMEOUT, 0;
    }, e.prototype.reset = function(e) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, e);
    }, e.prototype._setErrorOutput = function(e) {
        t.prototype._setErrorOutput.call(this, e), this.mGoogleConfig && this.mGoogleConfig._setErrorOutput(e), 
        this.mGoogleNetwork && this.mGoogleNetwork._setErrorOutput(e), this.mGoogleWebSocket && this.mGoogleWebSocket._setErrorOutput(e), 
        this.mGoogleConnect && this.mGoogleConnect._setErrorOutput(e), this.mGoogleTTS && this.mGoogleTTS._setErrorOutput(e), 
        this.mGoogleASR && this.mGoogleASR._setErrorOutput(e), this.mGoogleNLU && this.mGoogleNLU._setErrorOutput(e), 
        this.mGoogleNLU2 && this.mGoogleNLU2._setErrorOutput(e);
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
    }, e.prototype._onStop = function(e, o) {
        this._clearActionTimeout(), this.mGoogleConnect && this.mGoogleConnect.disconnect();
        var n = t.prototype._onStop.call(this, e, o);
        return this.mTransaction = null, this.mRunningFlag = !1, n;
    }, e.prototype._unlockAudio = function(t) {
        if (this.mAudioContext) {
            if ('running' === this.mAudioContext.state) return void t(!0);
            if ('suspended' === this.mAudioContext.state) {
                var e = setTimeout(function() {
                    return t(!1);
                }, AUDIO_UNLOCK_TIMEOUT);
                this.mAudioContext.resume().then(function() {
                    clearTimeout(e), t(!0);
                }, function(o) {
                    console.log('GooglePort._unlockAudio:', o), clearTimeout(e), t(!1);
                });
            } else t(!1);
        } else t(!1);
    }, e.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this._error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return 'string' == typeof t.googleAppKey && t.googleAppKey && (this.mGoogleConfig.appKey = t.googleAppKey), 
            'string' == typeof t.googleServerUrl && t.googleServerUrl && (this.mGoogleConfig.serverUrl = t.googleServerUrl), 
            'string' == typeof t.dialogflowTokenServerUrl && t.dialogflowTokenServerUrl && (this.mGoogleConfig.dialogflowTokenServerUrl = t.dialogflowTokenServerUrl), 
            'string' == typeof t.dialogflowProjectId && t.dialogflowProjectId && (this.mGoogleConfig.dialogflowProjectId = t.dialogflowProjectId), 
            0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, e.prototype.getConfig = function() {
        return {
            googleAppKey: this.mGoogleConfig.appKey,
            googleServerUrl: this.mGoogleConfig.serverUrl,
            dialogflowTokenServerUrl: this.mGoogleConfig.dialogflowTokenServerUrl,
            dialogflowProjectId: this.mGoogleConfig.dialogflowProjectId
        };
    }, e.prototype.isOnline = function() {
        return !!this.mGoogleNetwork && this.mGoogleNetwork.isOnline();
    }, e.prototype.isOpen = function() {
        return !this.isServer() || this._isConnect();
    }, e.prototype._checkOpen = function(t) {
        var e = this;
        return this.isServer() ? this.isOnline() ? this.isOpen() ? (t(!0), 0) : 'CLOSING' === this.mGoogleWebSocket.getState() ? (this._error('_checkOpen', 'Websocket wird geschlossen'), 
        t(!1), -1) : this.mGoogleWebSocket ? (this.mGoogleWebSocket.onOpen = function(o) {
            return e.mGoogleWebSocket.onOpen = function(t) {
                return e._onOpen();
            }, e.mGoogleWebSocket.onClose = function() {
                return e._onClose();
            }, e.mGoogleWebSocket.onError = function(t) {
                return e._onError(t);
            }, t(!0), 0;
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
        -1) : (this._error('_checkOpen', 'kein Netz vorhanden'), t(!1), -1) : (t(!0), 0);
    }, e.prototype.open = function(t) {
        return this.isServer() ? this._connect(t) : (this._onOpen(), 0);
    }, e.prototype.close = function() {
        return this.isServer() ? this._disconnect() : (this._onClose(), 0);
    }, e.prototype._isConnect = function() {
        return !!this.mGoogleWebSocket && this.mGoogleWebSocket.isConnect();
    }, e.prototype._connect = function(t) {
        if (this._isConnect()) return 0;
        if (!this.mGoogleWebSocket) return this._error('_connect', 'kein GoogleWebSocket vorhanden'), 
        -1;
        try {
            return this.mGoogleWebSocket.connect(this.mGoogleConfig.serverUrl || GOOGLE_DEFAULT_URL), 
            0;
        } catch (t) {
            return this._exception('_connect', t), -1;
        }
    }, e.prototype._disconnect = function() {
        if (!this._isConnect()) return 0;
        if (!this.mGoogleWebSocket) return this._error('_disconnect', 'kein GoogleWebSocket vorhanden'), 
        -1;
        try {
            return this.mGoogleWebSocket.disconnect(), 0;
        } catch (t) {
            return this._exception('_disconnect', t), -1;
        }
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
          case GOOGLE_NLU_ACTION:
            console.log('GooglePort.isAction: isInit = ', this.mGoogleNLU2.isInit()), e = !!(this.mGoogleNLU && this.mGoogleNLU2 && this.mGoogleNLU2.isInit());
            break;

          case GOOGLE_ASRNLU_ACTION:
            e = !(!this.mGoogleNLU2 || !this.mGoogleNLU2.isInit());
            break;

          case GOOGLE_ASR_ACTION:
            e = !(!this.mGoogleASR || !this.mGoogleASR.isInit());
            break;

          case GOOGLE_TTS_ACTION:
            e = !(!this.mGoogleTTS || !this.mGoogleTTS.isInit());
        }
        return e;
    }, e.prototype.setActionTimeout = function(t) {
        this.mActionTimeout = t;
    }, e.prototype.start = function(t, e, o) {
        var n = this;
        return this.isRunning() ? (this._error('start', 'Aktion laeuft bereits'), -1) : this.mGoogleConfig.isCredentials() ? this.mTransaction ? (this._error('start', 'andere Transaktion laeuft noch'), 
        -1) : this._checkOpen(function(r) {
            if (!r) return -1;
            n._setActionTimeout();
            var i = o || {};
            n.mPluginName = t, n.mRunningFlag = !0;
            var s = 0;
            switch (e) {
              case GOOGLE_NLU_ACTION:
                n.mTransaction = new GoogleTransaction(t, GOOGLE_NLU_ACTION), s = n._startNLU(n.mTransaction, i.text, i.language || GOOGLE_DEFAULT_LANGUAGE);
                break;

              case GOOGLE_ASRNLU_ACTION:
                n.mTransaction = new GoogleTransaction(t, GOOGLE_ASRNLU_ACTION), s = n._startASRNLU(n.mTransaction, i.language || GOOGLE_DEFAULT_LANGUAGE);
                break;

              case GOOGLE_ASR_ACTION:
                n.mTransaction = new GoogleTransaction(t, GOOGLE_ASR_ACTION), s = n._startASR(n.mTransaction, i.language || GOOGLE_DEFAULT_LANGUAGE, i.audioURL || '', !1, i.useProgressive || !1);
                break;

              case GOOGLE_TTS_ACTION:
                n.mTransaction = new GoogleTransaction(t, GOOGLE_TTS_ACTION), s = n._startTTS(n.mTransaction, i.text, i.language || GOOGLE_DEFAULT_LANGUAGE, i.voice || GOOGLE_DEFAULT_VOICE);
                break;

              default:
                n._clearActionTimeout(), n._error('start', 'Keine gueltige Aktion uebergeben ' + e), 
                s = -1;
            }
            return s;
        }) : (this._error('start', 'Port hat keine Credentials'), -1);
    }, e.prototype.stop = function(t, e, o) {
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
          case GOOGLE_NLU_ACTION:
          case GOOGLE_ASRNLU_ACTION:
            n = this._stopNLU(this.mTransaction);
            break;

          case GOOGLE_ASR_ACTION:
            n = this._stopASR(this.mTransaction);
            break;

          case GOOGLE_TTS_ACTION:
            n = this._stopTTS(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + e), n = -1;
        }
        return n;
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
    }, e.prototype._startNLU = function(t, e, o) {
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
    }, e.prototype._startASRNLU = function(t, e) {
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
    }, e.prototype._stopNLU = function(t) {
        if (!this.mGoogleNLU || !this.mGoogleNLU2) return this._error('_stopNLU', 'keine Google NLU-Anbindung vorhanden'), 
        -1;
        try {
            return this.mGoogleNLU2Flag ? this.mGoogleNLU2.stop(t) : this.mGoogleNLU.stop(t);
        } catch (t) {
            return this._exception('_stopNLU', t), -1;
        }
        return -1;
    }, e.prototype._startASR = function(t, e, o, n, r) {
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
    }, e.prototype._stopASR = function(t) {
        if (!this.mGoogleASR) return this._error('_stopASR', 'keine Google ASR-Anbindung vorhanden'), 
        -1;
        try {
            return this.mGoogleASR.stop(t);
        } catch (t) {
            return this._exception('_stopASR', t), -1;
        }
    }, e.prototype._startTTS = function(t, e, o, n) {
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
            return this._unlockAudio(function(e) {
                e ? r.mGoogleTTS.start(t, i) : (r._error('_startTTS', 'AudioContext ist nicht entsperrt'), 
                r._onStop(t.plugin, t.type));
            }), 0;
        } catch (t) {
            return this._exception('_startTTS', t), -1;
        }
    }, e.prototype._stopTTS = function(t) {
        if (!this.mGoogleTTS) return this._error('_stopTTS', 'keine Google TTS-Anbindung vorhanden'), 
        -1;
        try {
            return this.mGoogleTTS.stop(t);
        } catch (t) {
            return this._exception('_stopTTS', t), -1;
        }
    }, e;
}(Port), GOOGLEMOCK_CALLBACK_TIMEOUT = 100, GoogleMock = function(t) {
    function e(e, o) {
        void 0 === o && (o = !0);
        var n = t.call(this, e || GOOGLE_MOCK_NAME, o) || this;
        return n.webSocketFlag = !0, n.audioContextFlag = !0, n.getUserMediaFlag = !0, n.googleNLUFlag = !0, 
        n.googleASRFlag = !0, n.googleTTSFlag = !0, n.disconnectFlag = !0, n.defaultOptions = null, 
        n.codec = '', n.intentName = 'TestIntent', n.intentConfidence = 1, n.intentSpeech = 'TestSpeech', 
        n.mDynamicCredentialsFlag = !1, n.mTransaction = null, n.mRunningFlag = !1, n.googleAppId = '', 
        n.googleAppKey = '', n.googleNluTag = '', n.googleServerUrl = '', n.dialogflowTokenServerUrl = '', 
        n.dialogflowProjectId = '', n;
    }
    return __extends(e, t), e.prototype.isMock = function() {
        return !0;
    }, e.prototype.getType = function() {
        return GOOGLE_TYPE_NAME;
    }, e.prototype.getClass = function() {
        return 'GoogleMock';
    }, e.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.googleAppKey && (this.googleAppKey = t.googleAppKey), 
        'string' == typeof t.googleAppKey && !!t.googleAppKey);
    }, e.prototype.init = function(e) {
        if (this.mInitFlag) return this._error('init', 'Init bereits aufgerufen'), 0;
        if (e && 'boolean' == typeof e.googleDynamicCredentialsFlag && e.googleDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0, 
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
            0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, e.prototype.getConfig = function() {
        return {
            googleAppKey: this.googleAppKey,
            googleServerUrl: this.googleServerUrl,
            dialogflowTokenServerUrl: this.dialogflowTokenServerUrl,
            dialogflowProjectId: this.dialogflowProjectId
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
          case GOOGLE_NLU_ACTION:
            e = this.googleNLUFlag;
            break;

          case GOOGLE_ASRNLU_ACTION:
          case GOOGLE_ASR_ACTION:
            e = this.googleASRFlag;
            break;

          case GOOGLE_TTS_ACTION:
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
        var r = 0;
        switch (e) {
          case GOOGLE_NLU_ACTION:
            this.mTransaction = new GoogleTransaction(t, GOOGLE_NLU_ACTION), r = this._startNLU(this.mTransaction, n.text, n.language || GOOGLE_DEFAULT_LANGUAGE);
            break;

          case GOOGLE_ASRNLU_ACTION:
            this.mTransaction = new GoogleTransaction(t, GOOGLE_ASRNLU_ACTION), r = this._startASR(this.mTransaction, n.language || GOOGLE_DEFAULT_LANGUAGE, n.audioURL || '', !0, n.useProgressive || !1);
            break;

          case GOOGLE_ASR_ACTION:
            this.mTransaction = new GoogleTransaction(t, GOOGLE_ASR_ACTION), r = this._startASR(this.mTransaction, n.language || GOOGLE_DEFAULT_LANGUAGE, n.audioURL || '', !1, n.useProgressive || !1);
            break;

          case GOOGLE_TTS_ACTION:
            this.mTransaction = new GoogleTransaction(t, GOOGLE_TTS_ACTION), r = this._startTTS(this.mTransaction, n.text, n.language || GOOGLE_DEFAULT_LANGUAGE, n.voice || GOOGLE_DEFAULT_VOICE);
            break;

          default:
            this._error('start', 'Keine gueltige Aktion uebergeben ' + e), r = -1;
        }
        return r;
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
          case GOOGLE_NLU_ACTION:
            n = this._stopNLU(this.mTransaction);
            break;

          case GOOGLE_ASRNLU_ACTION:
          case GOOGLE_ASR_ACTION:
            n = this._stopASR(this.mTransaction);
            break;

          case GOOGLE_TTS_ACTION:
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
            return this._onStart(t.plugin, t.type), setTimeout(function() {
                return r._onStop(t.plugin, t.type);
            }, GOOGLEMOCK_CALLBACK_TIMEOUT), 0;
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
}(Port), Google = function() {
    function t() {}
    return t.setErrorOutputOn = function() {
        t.mErrorOutputFlag = !0, PortManager.setErrorOutputOn();
    }, t.setErrorOutputOff = function() {
        t.mErrorOutputFlag = !1, PortManager.setErrorOutputOff();
    }, t.setErrorOutputFunc = function(t) {
        PortManager._setErrorOutputFunc(t);
    }, t._initGooglePort = function(e) {
        var o = PortManager.get(GOOGLE_TYPE_NAME, GooglePort);
        return o ? 0 !== o.init(e) ? (PortManager.remove(GOOGLE_TYPE_NAME), -1) : (t.mCurrentPort = o, 
        0) : -1;
    }, t._initGoogleMock = function(e) {
        var o = PortManager.get(GOOGLE_TYPE_NAME, GoogleMock);
        return o ? 0 !== o.init(e) ? (console.log('Google._initGoogleMock: Error GoogleMock wurde nicht initialisiert'), 
        PortManager.remove(GOOGLE_TYPE_NAME), -1) : (t.mCurrentPort = o, 0) : (console.log('Google._initGoogleMock: Error GoogleMock wurde nicht erzeugt'), 
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
        var e = PortManager.find(GOOGLE_TYPE_NAME);
        e || (e = t.mCurrentPort);
        var o = 0;
        return e && (o = e.done(), PortManager.remove(GOOGLE_TYPE_NAME)), t.mCurrentPort = null, 
        t.mInitFlag = !1, o;
    }, t._onOpenEvent = function(e, o, n, r) {
        if ('function' == typeof r) try {
            return r(e, o, n), 0;
        } catch (e) {
            return t.mErrorOutputFlag && console.log('Google._onOpenEvent: Exception', e.message), 
            -1;
        }
        return 0;
    }, t._openGooglePort = function(e) {
        var o = PortManager.find(GOOGLE_TYPE_NAME);
        return o || (o = t.mCurrentPort), o ? (o.addOpenEvent(GOOGLE_TYPE_NAME, function(n) {
            return o.removeErrorEvent(GOOGLE_TYPE_NAME), o.removeOpenEvent(GOOGLE_TYPE_NAME), 
            'function' == typeof e && t._onOpenEvent(null, GOOGLE_TYPE_NAME, n.result, e), n.result;
        }), o.addErrorEvent(GOOGLE_TYPE_NAME, function(n) {
            return o.removeOpenEvent(GOOGLE_TYPE_NAME), o.removeErrorEvent(GOOGLE_TYPE_NAME), 
            'function' == typeof e && t._onOpenEvent(n, GOOGLE_TYPE_NAME, -1, e), 0;
        }), o.open()) : (t.mErrorOutputFlag && console.log('Google._openGooglePort: kein Port vorhanden'), 
        t._onOpenEvent(new Error('Google._openGooglePort: Kein Port vorhanden'), GOOGLE_TYPE_NAME, -1, e), 
        -1);
    }, t.open = function(e) {
        return t.mInitFlag ? t._openGooglePort(e) : (t.mErrorOutputFlag && console.log('Google.open: Init wurde nicht aufgerufen'), 
        t._onOpenEvent(new Error('Google.open: Init wurde nicht aufgerufen'), GOOGLE_TYPE_NAME, -1, e), 
        -1);
    }, t.setConfig = function(e) {
        return t.mCurrentPort ? t.mCurrentPort.setConfig(e) : -1;
    }, t.getConfig = function() {
        return t.mCurrentPort ? t.mCurrentPort.getConfig() : {
            googleAppKey: '',
            googleServerUrl: '',
            dialogflowTokenServerUrl: '',
            dialogflowProjectId: ''
        };
    }, t.mInitFlag = !1, t.mErrorOutputFlag = !1, t.mCurrentPort = null, t;
}();

export { GOOGLE_ASRNLU_ACTION, GOOGLE_ASR_ACTION, GOOGLE_NLU_ACTION, GOOGLE_TTS_ACTION, GOOGLE_TYPE_NAME, Google };
