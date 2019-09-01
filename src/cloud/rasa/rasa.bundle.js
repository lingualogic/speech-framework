/**
 * Speech-Rasa
 * 
 * Version: 0.1.1
 * Build:   0002
 * TYPE:    ALPHA
 * Datum:   22.07.2019
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

import { Port } from '../../core/port/port.ts';

import { FileHtml5Reader } from '../../common/html5/file-html5-reader.ts';

import { ErrorBase } from '../../core/error/error-base.ts';

import { NetHtml5Connect } from '../../common/html5/net-html5-connect.ts';

var RASA_TYPE_NAME = 'Rasa', RASA_PORT_NAME = 'RasaPort', RASA_MOCK_NAME = 'RasaMock', RASA_SERVER_URL = 'http://localhost:5005', RASA_DEFAULT_URL = RASA_SERVER_URL, RASA_NLU_ACTION = 'NLU', RASA_CONFIG_PATH = 'assets/', RASA_CONFIG_FILE = 'rasa.json', RASA_CONFIG_LOAD = !1, RASA_DE_LANGUAGE = 'de-DE', RASA_DEFAULT_LANGUAGE = RASA_DE_LANGUAGE, extendStatics = function(t, n) {
    return (extendStatics = Object.setPrototypeOf || {
        __proto__: []
    } instanceof Array && function(t, n) {
        t.__proto__ = n;
    } || function(t, n) {
        for (var r in n) n.hasOwnProperty(r) && (t[r] = n[r]);
    })(t, n);
};

function __extends(t, n) {
    function r() {
        this.constructor = t;
    }
    extendStatics(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, 
    new r());
}

var RASA_VERSION_NUMBER = '0.1.1', RASA_VERSION_BUILD = '0002', RASA_VERSION_TYPE = 'ALPHA', RASA_VERSION_DATE = '22.07.2019', RASA_VERSION_STRING = RASA_VERSION_NUMBER + '.' + RASA_VERSION_BUILD + ' vom ' + RASA_VERSION_DATE + ' (' + RASA_VERSION_TYPE + ')', RASA_API_VERSION = RASA_VERSION_STRING, RasaTransaction = function() {
    function t(n, r) {
        void 0 === n && (n = ''), void 0 === r && (r = ''), this.transactionId = 0, this.plugin = '', 
        this.type = '', this.result = null, this.error = null, this.plugin = n, this.type = r, 
        t.mTransactionCounter += 1, this.transactionId = t.mTransactionCounter;
    }
    return t.mTransactionCounter = 0, t;
}(), RasaConfig = function(t) {
    function n(n) {
        var r = t.call(this, 'RasaConfig') || this;
        return r.mInitFlag = !1, r.mConfigPath = RASA_CONFIG_PATH, r.mConfigFile = RASA_CONFIG_FILE, 
        r.mConfigLoadFlag = RASA_CONFIG_LOAD, r.mConfigServerUrl = RASA_DEFAULT_URL, r.mConfigAppId = '', 
        r.mConfigAppKey = '', r.mConfigUserId = '', r.mConfigNluTag = '', r.mFileReader = null, 
        r.mOnInitFunc = null, r.mOnErrorFunc = null, r.mFileReader = n, r._setErrorOutputFunc(function(t) {
            return r._onError(new Error(t));
        }), r;
    }
    return __extends(n, t), n.prototype._setOption = function(t) {
        t && ('string' == typeof t.rasaConfigPath && (this.mConfigPath = t.rasaConfigPath), 
        'string' == typeof t.rasaConfigFile && (this.mConfigFile = t.rasaConfigFile), 'boolean' == typeof t.rasaConfigLoadFlag && (this.mConfigLoadFlag = t.rasaConfigLoadFlag), 
        'string' == typeof t.rasaServerUrl && (this.mConfigServerUrl = t.rasaServerUrl), 
        'string' == typeof t.rasaAppId && (this.mConfigAppId = t.rasaAppId), 'string' == typeof t.rasaAppKey && (this.mConfigAppKey = t.rasaAppKey), 
        'string' == typeof t.rasaUserId && (this.mConfigUserId = t.rasaUserId), 'string' == typeof t.rasaNluTag && (this.mConfigNluTag = t.rasaNluTag), 
        'string' == typeof t.rasaNluTag && (this.mConfigNluTag = t.rasaNluTag));
    }, n.prototype.init = function(t) {
        return this._setOption(t), this.mInitFlag = !0, 0;
    }, n.prototype.done = function() {
        return this.mInitFlag = !1, this.mConfigPath = RASA_CONFIG_PATH, this.mConfigFile = RASA_CONFIG_FILE, 
        this.mConfigLoadFlag = RASA_CONFIG_LOAD, this.mConfigServerUrl = RASA_DEFAULT_URL, 
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
}(ErrorBase), RasaNetwork = function(t) {
    function n() {
        return t.call(this, 'RasaNetwork') || this;
    }
    return __extends(n, t), n;
}(NetHtml5Connect), RasaConnect = function(t) {
    function n(n) {
        var r = t.call(this, 'RasaConnect') || this;
        return r.mConfig = null, r.mConnectFlag = !1, r.mConfig = n, r;
    }
    return __extends(n, t), n.prototype.isConnect = function() {
        return this.mConnectFlag;
    }, n.prototype.connect = function() {
        return this.isConnect() ? 0 : (this.mConnectFlag = !0, 0);
    }, n.prototype.disconnect = function() {
        return this.mConnectFlag = !1, 0;
    }, n;
}(ErrorBase), RasaDevice = function(t) {
    function n(n, r, e) {
        var i = t.call(this, n || 'RasaDevice') || this;
        return i.mConfig = null, i.mConnect = null, i.mTransaction = null, i.onStart = null, 
        i.onStop = null, i.onResult = null, i.onError = null, i.onClose = null, i.mConfig = r, 
        i.mConnect = e, i;
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
}(ErrorBase), RasaNLU = function(t) {
    function n(n, r) {
        return t.call(this, 'RasaNLU', n, r) || this;
    }
    return __extends(n, t), n.prototype._sendToNLU = function(t) {
        var n = this;
        console.log('_sendToNLU:', t);
        try {
            var r = this.mConfig.serverUrl + '/model/parse?token=' + this.mConfig.appKey;
            console.log('_sendToNLU.url:', r);
            var e = new XMLHttpRequest();
            e.open('POST', r), e.setRequestHeader('Accept', '*/*'), e.setRequestHeader('cache-control', 'no-cache'), 
            e.setRequestHeader('Content-Type', 'text/plain'), e.onload = function() {
                console.log('Response:', e.response);
                try {
                    n._onResult(JSON.parse(e.response));
                } catch (t) {
                    n._exception('_sendToNLU', t);
                }
                n._onStop();
            }, e.onerror = function(t) {
                console.log('_sendToNLU.error:', e), n._error('_sendToNLU', 'Fehler aufgetreten'), 
                n._onStop();
            };
            var i = "{ \"text\": \"" + t + "\" }";
            return e.send(i), 0;
        } catch (t) {
            return this._exception('_sendToNLU', t), -1;
        }
    }, n.prototype._start = function(t) {
        console.log('RasaNLU._startNLU:', t);
        try {
            if (!this.mConfig.appKey) return void this._error('_start', 'kein AppKey vorhanden');
            this._sendToNLU(t.text);
        } catch (t) {
            this._exception('_start', t);
        }
    }, n.prototype._stop = function() {
        console.log('RasaNLU._stop');
    }, n;
}(RasaDevice), RASA_ACTION_TIMEOUT = 6e4, RasaPort = function(t) {
    function n(n, r) {
        void 0 === r && (r = !0);
        var e = t.call(this, n || RASA_PORT_NAME, r) || this;
        return e.mRasaServerFlag = !1, e.mRasaConfig = null, e.mRasaNetwork = null, e.mRasaConnect = null, 
        e.mRasaNLU = null, e.mDynamicCredentialsFlag = !1, e.mTransaction = null, e.mRunningFlag = !1, 
        e.mDefaultOptions = null, e.mActionTimeoutId = 0, e.mActionTimeout = RASA_ACTION_TIMEOUT, 
        e;
    }
    return __extends(n, t), n.prototype.isServer = function() {
        return this.mRasaServerFlag;
    }, n.prototype.isMock = function() {
        return !1;
    }, n.prototype.getType = function() {
        return RASA_TYPE_NAME;
    }, n.prototype.getClass = function() {
        return 'RasaPort';
    }, n.prototype.getVersion = function() {
        return RASA_API_VERSION;
    }, n.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.rasaAppKey && !!t.rasaAppKey);
    }, n.prototype._initAllObject = function(t) {
        var n = this, r = new FileHtml5Reader();
        return r.init(), this.mRasaConfig = new RasaConfig(r), 0 !== this.mRasaConfig.init(t) ? -1 : (this.mRasaNetwork = new RasaNetwork(), 
        this.mRasaNetwork.onOnline = function() {
            return n._onOnline();
        }, this.mRasaNetwork.onOffline = function() {
            return n._onOffline();
        }, this.mRasaNetwork.onError = function(t) {
            return n._onError(t);
        }, 0 !== this.mRasaNetwork.init(t) ? -1 : (this.mRasaConnect = new RasaConnect(this.mRasaConfig), 
        this.mRasaNLU = new RasaNLU(this.mRasaConfig, this.mRasaConnect), this.mRasaNLU.onStart = function(t) {
            return n._onStart(t.plugin, t.type);
        }, this.mRasaNLU.onStop = function(t) {
            return n._onStop(t.plugin, t.type);
        }, this.mRasaNLU.onResult = function(t) {
            return n._onResult(t.result, t.plugin, t.type);
        }, this.mRasaNLU.onError = function(t) {
            return n._onError(t.error, t.plugin, t.type);
        }, this.mRasaNLU.onClose = function(t) {
            return n._onClose();
        }, 0));
    }, n.prototype.init = function(n) {
        if (this.mInitFlag) return this._error('init', 'Port ist bereits initialisiert'), 
        0;
        if (n && 'boolean' == typeof n.rasaDynamicCredentialsFlag && n.rasaDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0; else if (!this._checkCredentials(n)) return this._error('init', 'kein AppKey als Parameter uebergeben'), 
        -1;
        return n && 'boolean' == typeof n.rasaServerFlag && n.rasaServerFlag && (this.mRasaServerFlag = !0), 
        0 !== this._initAllObject(n) ? -1 : 0 !== t.prototype.init.call(this, n) ? -1 : (this.isErrorOutput() && (this.mRasaNLU ? console.log('RasaPort: NLU ist vorhanden') : console.log('RasaPort: NLU ist nicht vorhanden')), 
        0);
    }, n.prototype.done = function() {
        return t.prototype.done.call(this), this._clearActionTimeout(), this.mRasaConnect && (this.mRasaConnect.disconnect(), 
        this.mRasaConnect = null), this.mRasaNetwork && (this.mRasaNetwork.done(), this.mRasaNetwork = null), 
        this.mRasaConfig && (this.mRasaConfig.done(), this.mRasaConfig = null), this.mRasaNLU = null, 
        this.mRasaServerFlag = !1, this.mDynamicCredentialsFlag = !1, this.mTransaction = null, 
        this.mRunningFlag = !1, this.mDefaultOptions = null, this.mActionTimeoutId = 0, 
        this.mActionTimeout = RASA_ACTION_TIMEOUT, 0;
    }, n.prototype.reset = function(n) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, n);
    }, n.prototype._setErrorOutput = function(n) {
        t.prototype._setErrorOutput.call(this, n), this.mRasaConfig && this.mRasaConfig._setErrorOutput(n), 
        this.mRasaNetwork && this.mRasaNetwork._setErrorOutput(n), this.mRasaConnect && this.mRasaConnect._setErrorOutput(n), 
        this.mRasaNLU && this.mRasaNLU._setErrorOutput(n);
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
    }, n.prototype._onStop = function(n, r) {
        return this._clearActionTimeout(), this.mTransaction = null, this.mRunningFlag = !1, 
        this.mRasaConnect && this.mRasaConnect.disconnect(), t.prototype._onStop.call(this, n, r);
    }, n.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this._error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return 'string' == typeof t.rasaServerUrl && t.rasaServerUrl && (this.mRasaConfig.serverUrl = t.rasaServerUrl), 
            'string' == typeof t.rasaAppKey && t.rasaAppKey && (this.mRasaConfig.appKey = t.rasaAppKey), 
            0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, n.prototype.getConfig = function() {
        return {
            rasaServerUrl: this.mRasaConfig.serverUrl,
            rasaAppKey: this.mRasaConfig.appKey
        };
    }, n.prototype.isOnline = function() {
        return !!this.mRasaNetwork && this.mRasaNetwork.isOnline();
    }, n.prototype.isOpen = function() {
        return !!this.mRasaConnect && this.mRasaConnect.isConnect();
    }, n.prototype._checkOpen = function(t) {
        if (!this.isOnline()) return this._error('_checkOpen', 'kein Netz vorhanden'), t(!1), 
        -1;
        var n = this.open();
        return t(0 === n), n;
    }, n.prototype.open = function(t) {
        if (!this.mRasaConnect) return this._error('open', 'kein RasaConnect vorhanden'), 
        -1;
        if (this.isOpen()) return 0;
        var n = this.mRasaConnect.connect();
        return 0 === n && this._onOpen(), n;
    }, n.prototype.close = function() {
        return this.isOpen() && this.mRasaConnect ? (this._onClose(), this.mRasaConnect.disconnect()) : 0;
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
          case RASA_NLU_ACTION:
            n = !!this.mRasaNLU;
        }
        return n;
    }, n.prototype.setActionTimeout = function(t) {
        this.mActionTimeout = t;
    }, n.prototype.start = function(t, n, r) {
        var e = this;
        return this.isRunning() ? (this._error('start', 'Aktion laeuft bereits'), -1) : this.mRasaConfig.isCredentials() ? this.mTransaction ? (this._error('start', 'andere Transaktion laeuft noch'), 
        -1) : this._checkOpen(function(i) {
            if (!i) return -1;
            e._setActionTimeout();
            var o = r || {};
            e.mPluginName = t, e.mRunningFlag = !0;
            var s = 0;
            switch (n) {
              case RASA_NLU_ACTION:
                e.mTransaction = new RasaTransaction(t, RASA_NLU_ACTION), s = e._startNLU(e.mTransaction, o.text, o.language || RASA_DEFAULT_LANGUAGE);
                break;

              default:
                e._clearActionTimeout(), e._error('start', 'Keine gueltige Aktion uebergeben ' + n), 
                s = -1;
            }
            return s;
        }) : (this._error('start', 'Port hat keine Credentials'), -1);
    }, n.prototype.stop = function(t, n, r) {
        if (!this.isRunning()) return 0;
        if (!this.isOpen()) return this._error('stop', 'Port ist nicht geoeffnet'), -1;
        if (!this.mRasaConfig.isCredentials()) return this._error('stop', 'Port hat keine Credentials'), 
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
          case RASA_NLU_ACTION:
            e = this._stopNLU(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + n), e = -1;
        }
        return this.mRunningFlag = !1, e;
    }, n.prototype._startNLU = function(t, n, r) {
        if (!n) return this._error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!r) return this._error('_startNLU', 'keine Sprache uebergeben'), -1;
        if (!this.mRasaNLU) return this._error('_startNLU', 'keine Rasa NLU-Anbindung vorhanden'), 
        -1;
        try {
            var e = {
                text: n,
                language: r
            };
            return this.mRasaNLU.start(t, e);
        } catch (t) {
            return this._exception('_startNLU', t), -1;
        }
        return -1;
    }, n.prototype._stopNLU = function(t) {
        if (!this.mRasaNLU) return this._error('_stopNLU', 'keine Rasa NLU-Anbindung vorhanden'), 
        -1;
        try {
            return this.mRasaNLU.stop(t);
        } catch (t) {
            return this._exception('_stopNLU', t), -1;
        }
        return -1;
    }, n;
}(Port), RasaMock = function(t) {
    function n(n, r) {
        void 0 === r && (r = !0);
        var e = t.call(this, n || RASA_MOCK_NAME, r) || this;
        return e.rasaNLUFlag = !0, e.disconnectFlag = !0, e.defaultOptions = null, e.codec = '', 
        e.intentName = 'TestIntent', e.intentConfidence = 1, e.intentSpeech = 'TestSpeech', 
        e.mDynamicCredentialsFlag = !1, e.mTransaction = null, e.mRunningFlag = !1, e.rasaAppId = '', 
        e.rasaAppKey = '', e.rasaNluTag = '', e;
    }
    return __extends(n, t), n.prototype.isMock = function() {
        return !0;
    }, n.prototype.getType = function() {
        return RASA_TYPE_NAME;
    }, n.prototype.getClass = function() {
        return 'RasaMock';
    }, n.prototype._checkCredentials = function(t) {
        return !!t && ('string' == typeof t.rasaAppKey && (this.rasaAppKey = t.rasaAppKey), 
        'string' == typeof t.rasaAppKey && !!t.rasaAppKey);
    }, n.prototype.init = function(n) {
        if (this.mInitFlag) return this._error('init', 'Init bereits aufgerufen'), 0;
        if (n && 'boolean' == typeof n.rasaDynamicCredentialsFlag && n.rasaDynamicCredentialsFlag) this.mDynamicCredentialsFlag = !0, 
        this._checkCredentials(n); else if (!this._checkCredentials(n)) return (this.isErrorOutput() || n && n.errorOutputFlag) && this._error('init', 'keine AppId und/oder AppKey als Parameter uebergeben'), 
        -1;
        return this.rasaNLUFlag = !0, this.isErrorOutput() && (this.rasaNLUFlag ? console.log('RasaMock: NLU ist vorhanden') : console.log('RasaMock: NLU ist nicht vorhanden')), 
        this._onInit(0), t.prototype.init.call(this, n);
    }, n.prototype.done = function(n) {
        return t.prototype.done.call(this), this.rasaNLUFlag = !1, this.disconnectFlag = !0, 
        this.defaultOptions = null, this.codec = '', this.mTransaction = null, this.mRunningFlag = !1, 
        0;
    }, n.prototype.reset = function(n) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype.reset.call(this, n);
    }, n.prototype._onStop = function(n, r) {
        return this.mTransaction = null, this.mRunningFlag = !1, t.prototype._onStop.call(this, n, r);
    }, n.prototype.setConfig = function(t) {
        if (!this.mDynamicCredentialsFlag) return this._error('setConfig', 'Keine dynamischen Credentials erlaubt'), 
        -1;
        try {
            return this.rasaAppKey = t.rasaAppKey, 0;
        } catch (t) {
            return this._exception('setConfig', t), -1;
        }
    }, n.prototype.getConfig = function() {
        return {
            rasaAppKey: this.rasaAppKey
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
        return !!this.rasaAppKey;
    }, n.prototype.isAction = function(t) {
        var n = !1;
        switch (t) {
          case RASA_NLU_ACTION:
            n = this.rasaNLUFlag;
        }
        return n;
    }, n.prototype.start = function(t, n, r) {
        if (this.isRunning()) return this._error('start', 'Aktion laeuft bereits'), -1;
        if (!this.isOpen()) return this._error('start', 'Port ist nicht geoeffnet'), -1;
        if (!this._isCredentials()) return this._error('start', 'Port hat keine Credentials'), 
        -1;
        if (this.mTransaction) return this._error('start', 'andere Transaktion laeuft noch'), 
        -1;
        var e = r || {};
        this.mRunningFlag = !0;
        var i = 0;
        switch (n) {
          case RASA_NLU_ACTION:
            this.mTransaction = new RasaTransaction(t, RASA_NLU_ACTION), i = this._startNLU(this.mTransaction, e.text, e.language || RASA_DEFAULT_LANGUAGE);
            break;

          default:
            this._error('start', 'Keine gueltige Aktion uebergeben ' + n), i = -1;
        }
        return i;
    }, n.prototype.stop = function(t, n, r) {
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
          case RASA_NLU_ACTION:
            e = this._stopNLU(this.mTransaction);
            break;

          default:
            this._error('stop', 'Keine gueltige Aktion uebergeben ' + n), e = -1;
        }
        return this.mTransaction = null, this.mRunningFlag = !1, e;
    }, n.prototype._startNLU = function(t, n, r) {
        if (!n) return this._error('_startNLU', 'keinen Text uebergeben'), -1;
        if (!this.rasaNLUFlag) return this._error('_startNLU', 'keine Nuance NLU-Anbindung vorhanden'), 
        -1;
        try {
            this._onStart(t.plugin, t.type);
            var e = {
                intent: {
                    name: this.intentName,
                    confidence: this.intentConfidence
                },
                text: n
            };
            return t.result = e, console.log('RasaMock._startNLU: _onResult wird aufgerufen'), 
            this._onResult(t.result, t.plugin, t.type), this._onStop(t.plugin, t.type), 0;
        } catch (t) {
            return this._exception('_startNLU', t), -1;
        }
    }, n.prototype._stopNLU = function(t) {
        return this._onStop(t.plugin, t.type), 0;
    }, n;
}(Port), Rasa = function() {
    function t() {}
    return t.setErrorOutputOn = function() {
        t.mErrorOutputFlag = !0, PortManager.setErrorOutputOn();
    }, t.setErrorOutputOff = function() {
        t.mErrorOutputFlag = !1, PortManager.setErrorOutputOff();
    }, t.setErrorOutputFunc = function(t) {
        PortManager._setErrorOutputFunc(t);
    }, t._initRasaPort = function(n) {
        var r = PortManager.get(RASA_TYPE_NAME, RasaPort);
        return r ? 0 !== r.init(n) ? (PortManager.remove(RASA_TYPE_NAME), -1) : (t.mCurrentPort = r, 
        0) : -1;
    }, t._initRasaMock = function(n) {
        var r = PortManager.get(RASA_TYPE_NAME, RasaMock);
        return r ? 0 !== r.init(n) ? (console.log('Rasa._initRasaMock: Error RasaMock wurde nicht initialisiert'), 
        PortManager.remove(RASA_TYPE_NAME), -1) : (t.mCurrentPort = r, 0) : (console.log('Rasa._initRasaMock: Error RasaMock wurde nicht erzeugt'), 
        -1);
    }, t.init = function(n) {
        if (t.mInitFlag) return 0;
        if (!n) return t.mErrorOutputFlag && console.log('Rasa.init: Keine Rasa-Parameter uebergeben'), 
        -1;
        'boolean' == typeof n.errorOutputFlag && (n.errorOutputFlag ? t.setErrorOutputOn() : t.setErrorOutputOff());
        var r = 'RasaPort';
        if (n && 'string' == typeof n.rasaPortName && 'RasaMock' === n.rasaPortName && (r = 'RasaMock'), 
        'RasaPort' === r) {
            if (0 !== t._initRasaPort(n)) return -1;
        } else {
            if ('RasaMock' !== r) return t.mErrorOutputFlag && console.log('Rasa.init: Kein Rasa PortName vorhanden'), 
            -1;
            if (0 !== t._initRasaMock(n)) return -1;
        }
        return t.mInitFlag = !0, 0;
    }, t.isInit = function() {
        return t.mInitFlag;
    }, t.done = function() {
        var n = PortManager.find(RASA_TYPE_NAME);
        n || (n = t.mCurrentPort);
        var r = 0;
        return n && (r = n.done(), PortManager.remove(RASA_TYPE_NAME)), t.mCurrentPort = null, 
        t.mInitFlag = !1, r;
    }, t._onOpenEvent = function(n, r, e, i) {
        if ('function' == typeof i) try {
            return i(n, r, e), 0;
        } catch (n) {
            return t.mErrorOutputFlag && console.log('Rasa._onOpenEvent: Exception', n.message), 
            -1;
        }
        return 0;
    }, t._openRasaPort = function(n) {
        var r = PortManager.find(RASA_TYPE_NAME);
        return r || (r = t.mCurrentPort), r ? (r.addOpenEvent(RASA_TYPE_NAME, function(e) {
            return r.removeErrorEvent(RASA_TYPE_NAME), r.removeOpenEvent(RASA_TYPE_NAME), 'function' == typeof n && t._onOpenEvent(null, RASA_TYPE_NAME, e.result, n), 
            e.result;
        }), r.addErrorEvent(RASA_TYPE_NAME, function(e) {
            return r.removeOpenEvent(RASA_TYPE_NAME), r.removeErrorEvent(RASA_TYPE_NAME), 'function' == typeof n && t._onOpenEvent(e, RASA_TYPE_NAME, -1, n), 
            0;
        }), r.open()) : (t.mErrorOutputFlag && console.log('Rasa._openRasaPort: kein Port vorhanden'), 
        t._onOpenEvent(new Error('Rasa._openRasaPort: Kein Port vorhanden'), RASA_TYPE_NAME, -1, n), 
        -1);
    }, t.open = function(n) {
        return t.mInitFlag ? t._openRasaPort(n) : (t.mErrorOutputFlag && console.log('Rasa.open: Init wurde nicht aufgerufen'), 
        t._onOpenEvent(new Error('Rasa.open: Init wurde nicht aufgerufen'), RASA_TYPE_NAME, -1, n), 
        -1);
    }, t.setConfig = function(n) {
        return t.mCurrentPort ? t.mCurrentPort.setConfig(n) : -1;
    }, t.getConfig = function() {
        return t.mCurrentPort ? t.mCurrentPort.getConfig() : {
            rasaAppKey: ''
        };
    }, t.mInitFlag = !1, t.mErrorOutputFlag = !1, t.mCurrentPort = null, t;
}();

export { RASA_NLU_ACTION, RASA_TYPE_NAME, Rasa };
