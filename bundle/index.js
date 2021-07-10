"use strict";
/**
 * Automatisch erzeugte globale index.ts Datei fuer Speech-Framework
 *
 * Konfiguration: stable
 * Version: 0.5.23.0067 (release) vom 10.09.2021
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Microsoft = exports.Google = exports.Amazon = exports.Nuance = exports.BotFactory = exports.BOT_COMPONENT_NAME = exports.BOT_TYPE_NAME = exports.DialogFactory = exports.DIALOG_ROOTSTATE_NAME = exports.DIALOG_MAIN_NAME = exports.DIALOG_COMPONENT_NAME = exports.DIALOG_TYPE_NAME = exports.IntentFactory = exports.INTENT_RASA_NLU = exports.INTENT_MICROSOFT_NLU = exports.INTENT_GOOGLE_NLU = exports.INTENT_NUANCE_NLU = exports.INTENT_EN_LANGUAGE = exports.INTENT_DE_LANGUAGE = exports.INTENT_COMPONENT_NAME = exports.INTENT_TYPE_NAME = exports.ListenFactory = exports.LISTEN_MICROSOFT_ASR = exports.LISTEN_NUANCE_ASR = exports.LISTEN_HTML5_ASR = exports.LISTEN_DICTATE_MODE = exports.LISTEN_COMMAND_MODE = exports.LISTEN_EN_LANGUAGE = exports.LISTEN_DE_LANGUAGE = exports.LISTEN_COMPONENT_NAME = exports.LISTEN_TYPE_NAME = exports.SpeakFactory = exports.SPEAK_MICROSOFT_TTS = exports.SPEAK_AMAZON_TTS = exports.SPEAK_NUANCE_TTS = exports.SPEAK_HTML5_TTS = exports.SPEAK_EN_LANGUAGE = exports.SPEAK_DE_LANGUAGE = exports.SPEAK_COMPONENT_NAME = exports.SPEAK_TYPE_NAME = exports.AudioFactory = exports.AUDIO_WAV_FORMAT = exports.AUDIO_MP3_FORMAT = exports.AUDIO_PLUGIN_NAME = exports.ActionFactory = exports.ACTION_COMPONENT_NAME = exports.ACTION_TYPE_NAME = exports.BASE_COMPONENT_NAME = exports.BASE_TYPE_NAME = exports.SPEECH_API_VERSION = void 0;
exports.SpeechMain = exports.Rasa = void 0;
// const
var speech_version_1 = require("./speech-framework");
Object.defineProperty(exports, "SPEECH_API_VERSION", { enumerable: true, get: function () { return speech_version_1.SPEECH_API_VERSION; } });
// base
var base_const_1 = require("./speech-framework");
Object.defineProperty(exports, "BASE_TYPE_NAME", { enumerable: true, get: function () { return base_const_1.BASE_TYPE_NAME; } });
Object.defineProperty(exports, "BASE_COMPONENT_NAME", { enumerable: true, get: function () { return base_const_1.BASE_COMPONENT_NAME; } });
// action
var action_const_1 = require("./speech-framework");
Object.defineProperty(exports, "ACTION_TYPE_NAME", { enumerable: true, get: function () { return action_const_1.ACTION_TYPE_NAME; } });
Object.defineProperty(exports, "ACTION_COMPONENT_NAME", { enumerable: true, get: function () { return action_const_1.ACTION_COMPONENT_NAME; } });
var action_factory_1 = require("./speech-framework");
Object.defineProperty(exports, "ActionFactory", { enumerable: true, get: function () { return action_factory_1.ActionFactory; } });
// audio
var audio_const_1 = require("./speech-framework");
Object.defineProperty(exports, "AUDIO_PLUGIN_NAME", { enumerable: true, get: function () { return audio_const_1.AUDIO_PLUGIN_NAME; } });
Object.defineProperty(exports, "AUDIO_MP3_FORMAT", { enumerable: true, get: function () { return audio_const_1.AUDIO_MP3_FORMAT; } });
Object.defineProperty(exports, "AUDIO_WAV_FORMAT", { enumerable: true, get: function () { return audio_const_1.AUDIO_WAV_FORMAT; } });
var audio_factory_1 = require("./speech-framework");
Object.defineProperty(exports, "AudioFactory", { enumerable: true, get: function () { return audio_factory_1.AudioFactory; } });
// speak
var speak_const_1 = require("./speech-framework");
Object.defineProperty(exports, "SPEAK_TYPE_NAME", { enumerable: true, get: function () { return speak_const_1.SPEAK_TYPE_NAME; } });
Object.defineProperty(exports, "SPEAK_COMPONENT_NAME", { enumerable: true, get: function () { return speak_const_1.SPEAK_COMPONENT_NAME; } });
Object.defineProperty(exports, "SPEAK_DE_LANGUAGE", { enumerable: true, get: function () { return speak_const_1.SPEAK_DE_LANGUAGE; } });
Object.defineProperty(exports, "SPEAK_EN_LANGUAGE", { enumerable: true, get: function () { return speak_const_1.SPEAK_EN_LANGUAGE; } });
Object.defineProperty(exports, "SPEAK_HTML5_TTS", { enumerable: true, get: function () { return speak_const_1.SPEAK_HTML5_TTS; } });
Object.defineProperty(exports, "SPEAK_NUANCE_TTS", { enumerable: true, get: function () { return speak_const_1.SPEAK_NUANCE_TTS; } });
Object.defineProperty(exports, "SPEAK_AMAZON_TTS", { enumerable: true, get: function () { return speak_const_1.SPEAK_AMAZON_TTS; } });
Object.defineProperty(exports, "SPEAK_MICROSOFT_TTS", { enumerable: true, get: function () { return speak_const_1.SPEAK_MICROSOFT_TTS; } });
var speak_factory_1 = require("./speech-framework");
Object.defineProperty(exports, "SpeakFactory", { enumerable: true, get: function () { return speak_factory_1.SpeakFactory; } });
// listen
var listen_const_1 = require("./speech-framework");
Object.defineProperty(exports, "LISTEN_TYPE_NAME", { enumerable: true, get: function () { return listen_const_1.LISTEN_TYPE_NAME; } });
Object.defineProperty(exports, "LISTEN_COMPONENT_NAME", { enumerable: true, get: function () { return listen_const_1.LISTEN_COMPONENT_NAME; } });
Object.defineProperty(exports, "LISTEN_DE_LANGUAGE", { enumerable: true, get: function () { return listen_const_1.LISTEN_DE_LANGUAGE; } });
Object.defineProperty(exports, "LISTEN_EN_LANGUAGE", { enumerable: true, get: function () { return listen_const_1.LISTEN_EN_LANGUAGE; } });
Object.defineProperty(exports, "LISTEN_COMMAND_MODE", { enumerable: true, get: function () { return listen_const_1.LISTEN_COMMAND_MODE; } });
Object.defineProperty(exports, "LISTEN_DICTATE_MODE", { enumerable: true, get: function () { return listen_const_1.LISTEN_DICTATE_MODE; } });
Object.defineProperty(exports, "LISTEN_HTML5_ASR", { enumerable: true, get: function () { return listen_const_1.LISTEN_HTML5_ASR; } });
Object.defineProperty(exports, "LISTEN_NUANCE_ASR", { enumerable: true, get: function () { return listen_const_1.LISTEN_NUANCE_ASR; } });
Object.defineProperty(exports, "LISTEN_MICROSOFT_ASR", { enumerable: true, get: function () { return listen_const_1.LISTEN_MICROSOFT_ASR; } });
var listen_factory_1 = require("./speech-framework");
Object.defineProperty(exports, "ListenFactory", { enumerable: true, get: function () { return listen_factory_1.ListenFactory; } });
// intent
var intent_const_1 = require("./speech-framework");
Object.defineProperty(exports, "INTENT_TYPE_NAME", { enumerable: true, get: function () { return intent_const_1.INTENT_TYPE_NAME; } });
Object.defineProperty(exports, "INTENT_COMPONENT_NAME", { enumerable: true, get: function () { return intent_const_1.INTENT_COMPONENT_NAME; } });
Object.defineProperty(exports, "INTENT_DE_LANGUAGE", { enumerable: true, get: function () { return intent_const_1.INTENT_DE_LANGUAGE; } });
Object.defineProperty(exports, "INTENT_EN_LANGUAGE", { enumerable: true, get: function () { return intent_const_1.INTENT_EN_LANGUAGE; } });
Object.defineProperty(exports, "INTENT_NUANCE_NLU", { enumerable: true, get: function () { return intent_const_1.INTENT_NUANCE_NLU; } });
Object.defineProperty(exports, "INTENT_GOOGLE_NLU", { enumerable: true, get: function () { return intent_const_1.INTENT_GOOGLE_NLU; } });
Object.defineProperty(exports, "INTENT_MICROSOFT_NLU", { enumerable: true, get: function () { return intent_const_1.INTENT_MICROSOFT_NLU; } });
Object.defineProperty(exports, "INTENT_RASA_NLU", { enumerable: true, get: function () { return intent_const_1.INTENT_RASA_NLU; } });
var intent_factory_1 = require("./speech-framework");
Object.defineProperty(exports, "IntentFactory", { enumerable: true, get: function () { return intent_factory_1.IntentFactory; } });
// dialog
var dialog_const_1 = require("./speech-framework");
Object.defineProperty(exports, "DIALOG_TYPE_NAME", { enumerable: true, get: function () { return dialog_const_1.DIALOG_TYPE_NAME; } });
Object.defineProperty(exports, "DIALOG_COMPONENT_NAME", { enumerable: true, get: function () { return dialog_const_1.DIALOG_COMPONENT_NAME; } });
Object.defineProperty(exports, "DIALOG_MAIN_NAME", { enumerable: true, get: function () { return dialog_const_1.DIALOG_MAIN_NAME; } });
Object.defineProperty(exports, "DIALOG_ROOTSTATE_NAME", { enumerable: true, get: function () { return dialog_const_1.DIALOG_ROOTSTATE_NAME; } });
var dialog_factory_1 = require("./speech-framework");
Object.defineProperty(exports, "DialogFactory", { enumerable: true, get: function () { return dialog_factory_1.DialogFactory; } });
// bot
var bot_const_1 = require("./speech-framework");
Object.defineProperty(exports, "BOT_TYPE_NAME", { enumerable: true, get: function () { return bot_const_1.BOT_TYPE_NAME; } });
Object.defineProperty(exports, "BOT_COMPONENT_NAME", { enumerable: true, get: function () { return bot_const_1.BOT_COMPONENT_NAME; } });
var bot_factory_1 = require("./speech-framework");
Object.defineProperty(exports, "BotFactory", { enumerable: true, get: function () { return bot_factory_1.BotFactory; } });
var nuance_1 = require("./speech-framework");
Object.defineProperty(exports, "Nuance", { enumerable: true, get: function () { return nuance_1.Nuance; } });
var amazon_1 = require("./speech-framework");
Object.defineProperty(exports, "Amazon", { enumerable: true, get: function () { return amazon_1.Amazon; } });
var google_1 = require("./speech-framework");
Object.defineProperty(exports, "Google", { enumerable: true, get: function () { return google_1.Google; } });
var microsoft_1 = require("./speech-framework");
Object.defineProperty(exports, "Microsoft", { enumerable: true, get: function () { return microsoft_1.Microsoft; } });
var rasa_1 = require("./speech-framework");
Object.defineProperty(exports, "Rasa", { enumerable: true, get: function () { return rasa_1.Rasa; } });
// speech
var speech_main_1 = require("./speech-framework");
Object.defineProperty(exports, "SpeechMain", { enumerable: true, get: function () { return speech_main_1.SpeechMain; } });
var awssdk = require("./aws-sdk-speech.min");
var azuresdk = require("./microsoft.cognitiveservices.speech.sdk.bundle-min");
//# sourceMappingURL=index.js.map