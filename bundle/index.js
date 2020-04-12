"use strict";
/**
 * Automatisch erzeugte globale index.ts Datei fuer Speech-Framework
 *
 * Konfiguration: stable
 * Version: 0.5.19.0063 (release) vom 11.04.2020
 */
Object.defineProperty(exports, "__esModule", { value: true });
// const
var speech_version_1 = require("./speech-framework");
exports.SPEECH_API_VERSION = speech_version_1.SPEECH_API_VERSION;
// base
var base_const_1 = require("./speech-framework");
exports.BASE_TYPE_NAME = base_const_1.BASE_TYPE_NAME;
exports.BASE_COMPONENT_NAME = base_const_1.BASE_COMPONENT_NAME;
// action
var action_const_1 = require("./speech-framework");
exports.ACTION_TYPE_NAME = action_const_1.ACTION_TYPE_NAME;
exports.ACTION_COMPONENT_NAME = action_const_1.ACTION_COMPONENT_NAME;
var action_factory_1 = require("./speech-framework");
exports.ActionFactory = action_factory_1.ActionFactory;
// audio
var audio_const_1 = require("./speech-framework");
exports.AUDIO_PLUGIN_NAME = audio_const_1.AUDIO_PLUGIN_NAME;
exports.AUDIO_MP3_FORMAT = audio_const_1.AUDIO_MP3_FORMAT;
exports.AUDIO_WAV_FORMAT = audio_const_1.AUDIO_WAV_FORMAT;
var audio_factory_1 = require("./speech-framework");
exports.AudioFactory = audio_factory_1.AudioFactory;
// speak
var speak_const_1 = require("./speech-framework");
exports.SPEAK_TYPE_NAME = speak_const_1.SPEAK_TYPE_NAME;
exports.SPEAK_COMPONENT_NAME = speak_const_1.SPEAK_COMPONENT_NAME;
exports.SPEAK_DE_LANGUAGE = speak_const_1.SPEAK_DE_LANGUAGE;
exports.SPEAK_EN_LANGUAGE = speak_const_1.SPEAK_EN_LANGUAGE;
exports.SPEAK_HTML5_TTS = speak_const_1.SPEAK_HTML5_TTS;
exports.SPEAK_NUANCE_TTS = speak_const_1.SPEAK_NUANCE_TTS;
exports.SPEAK_AMAZON_TTS = speak_const_1.SPEAK_AMAZON_TTS;
exports.SPEAK_MICROSOFT_TTS = speak_const_1.SPEAK_MICROSOFT_TTS;
var speak_factory_1 = require("./speech-framework");
exports.SpeakFactory = speak_factory_1.SpeakFactory;
// listen
var listen_const_1 = require("./speech-framework");
exports.LISTEN_TYPE_NAME = listen_const_1.LISTEN_TYPE_NAME;
exports.LISTEN_COMPONENT_NAME = listen_const_1.LISTEN_COMPONENT_NAME;
exports.LISTEN_DE_LANGUAGE = listen_const_1.LISTEN_DE_LANGUAGE;
exports.LISTEN_EN_LANGUAGE = listen_const_1.LISTEN_EN_LANGUAGE;
exports.LISTEN_COMMAND_MODE = listen_const_1.LISTEN_COMMAND_MODE;
exports.LISTEN_DICTATE_MODE = listen_const_1.LISTEN_DICTATE_MODE;
exports.LISTEN_HTML5_ASR = listen_const_1.LISTEN_HTML5_ASR;
exports.LISTEN_NUANCE_ASR = listen_const_1.LISTEN_NUANCE_ASR;
exports.LISTEN_MICROSOFT_ASR = listen_const_1.LISTEN_MICROSOFT_ASR;
var listen_factory_1 = require("./speech-framework");
exports.ListenFactory = listen_factory_1.ListenFactory;
// intent
var intent_const_1 = require("./speech-framework");
exports.INTENT_TYPE_NAME = intent_const_1.INTENT_TYPE_NAME;
exports.INTENT_COMPONENT_NAME = intent_const_1.INTENT_COMPONENT_NAME;
exports.INTENT_DE_LANGUAGE = intent_const_1.INTENT_DE_LANGUAGE;
exports.INTENT_EN_LANGUAGE = intent_const_1.INTENT_EN_LANGUAGE;
exports.INTENT_NUANCE_NLU = intent_const_1.INTENT_NUANCE_NLU;
exports.INTENT_GOOGLE_NLU = intent_const_1.INTENT_GOOGLE_NLU;
exports.INTENT_MICROSOFT_NLU = intent_const_1.INTENT_MICROSOFT_NLU;
exports.INTENT_RASA_NLU = intent_const_1.INTENT_RASA_NLU;
var intent_factory_1 = require("./speech-framework");
exports.IntentFactory = intent_factory_1.IntentFactory;
// dialog
var dialog_const_1 = require("./speech-framework");
exports.DIALOG_TYPE_NAME = dialog_const_1.DIALOG_TYPE_NAME;
exports.DIALOG_COMPONENT_NAME = dialog_const_1.DIALOG_COMPONENT_NAME;
exports.DIALOG_MAIN_NAME = dialog_const_1.DIALOG_MAIN_NAME;
exports.DIALOG_ROOTSTATE_NAME = dialog_const_1.DIALOG_ROOTSTATE_NAME;
var dialog_factory_1 = require("./speech-framework");
exports.DialogFactory = dialog_factory_1.DialogFactory;
// bot
var bot_const_1 = require("./speech-framework");
exports.BOT_TYPE_NAME = bot_const_1.BOT_TYPE_NAME;
exports.BOT_COMPONENT_NAME = bot_const_1.BOT_COMPONENT_NAME;
var bot_factory_1 = require("./speech-framework");
exports.BotFactory = bot_factory_1.BotFactory;
var nuance_1 = require("./speech-framework");
exports.Nuance = nuance_1.Nuance;
var amazon_1 = require("./speech-framework");
exports.Amazon = amazon_1.Amazon;
var google_1 = require("./speech-framework");
exports.Google = google_1.Google;
var microsoft_1 = require("./speech-framework");
exports.Microsoft = microsoft_1.Microsoft;
var rasa_1 = require("./speech-framework");
exports.Rasa = rasa_1.Rasa;
// speech
var speech_main_1 = require("./speech-framework");
exports.SpeechMain = speech_main_1.SpeechMain;
var awssdk = require("./aws-sdk-speech.min");
var azuresdk = require("./microsoft.cognitiveservices.speech.sdk.bundle-min");
//# sourceMappingURL=index.js.map