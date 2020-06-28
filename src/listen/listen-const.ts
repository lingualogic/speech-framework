/** @packageDocumentation
 * Globale Konstanten fuer Listen
 *
 * API-Version: 1.0
 * Datum: 08.10.2018
 *
 * Letzte Aenderung: 08.10.2018
 * Status: gelb
 *
 * @module listen
 * @author SB
 */


// Konstanten

export const LISTEN_TYPE_NAME = 'Listen';
export const LISTEN_BUILDER_NAME = 'ListenBuilder';
export const LISTEN_FACTORY_NAME = 'ListenFactory';
export const LISTEN_COMPONENTBUILDER_NAME = 'ListenComponentBuilder';
export const LISTEN_COMPONENTFACTORY_NAME = 'ListenComponentFactory';

export const LISTEN_COMPONENT_NAME = 'ListenComponent';
// TODO: deprecated
export const LISTEN_PLUGIN_NAME = LISTEN_COMPONENT_NAME;
export const LISTEN_MOCK_NAME = 'ListenMock';


// ASR-Konstanten (muessen mit den Konstenten in ASR synchron gehalten werden!)

export const LISTEN_HTML5_ASR = 'ASRHtml5';
export const LISTEN_NUANCE_ASR = 'ASRNuance';
export const LISTEN_GOOGLE_ASR = 'ASRGoogle';
export const LISTEN_MICROSOFT_ASR = 'ASRMicrosoft';


// Sprach-Konstanten

/** Deutsch */
export const LISTEN_DE_LANGUAGE = 'de';
/** Englisch */
export const LISTEN_EN_LANGUAGE = 'en';
/** Default Sprache eingestellt */
export const LISTEN_DEFAULT_LANGUAGE = LISTEN_DE_LANGUAGE;
/** Undefiniert */
export const LISTEN_UNDEFINE_LANGUAGE = '';


// Sprachmodi

export const LISTEN_COMMAND_MODE = 'Command';
export const LISTEN_DICTATE_MODE = 'Dictate';
export const LISTEN_DEFAULT_MODE = LISTEN_COMMAND_MODE;
export const LISTEN_UNDEFINE_MODE = '';
