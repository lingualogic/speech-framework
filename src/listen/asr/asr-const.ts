/** @packageDocumentation
 * Globale Konstanten fuer ASR
 *
 * Letzte Aenderung: 17.06.2019
 * Status: gelb
 *
 * @module listen/asr
 * @author SB
 */


// Default-Konstanten

export const ASR_FACTORY_NAME = 'ASRFactory';
export const ASR_TYPE_NAME = 'ASR';
export const ASR_PLUGIN_NAME = 'ASR';
export const ASR_MOCK_NAME = 'ASRMock';

// konkrete ASRs

export const ASR_HTML5_NAME = 'ASRHtml5';
export const ASR_NUANCE_NAME = 'ASRNuance';
export const ASR_GOOGLE_NAME = 'ASRGoogle';
export const ASR_MICROSOFT_NAME = 'ASRMicrosoft';
export const ASR_GROUP_NAME = 'ASRGroup';
export const ASR_DEFAULT_NAME = ASR_GROUP_NAME;


// Zeit, in Millisekunden, bis Listen abgebrochen wird,
// wenn Mikrofon nicht freigegeben wird.

export const ASR_TIMEOUT_TIME = 30000;


// Sprach-Konstanten (fuer HTML5)

export const ASR_DE_LANGUAGE = 'de-DE';
export const ASR_EN_LANGUAGE = 'en-US';
export const ASR_DEFAULT_LANGUAGE = ASR_DE_LANGUAGE;


// Sprachmodi

export const ASR_COMMAND_MODE = 'Command';
export const ASR_DICTATE_MODE = 'Dictate';
export const ASR_DEFAULT_MODE = ASR_COMMAND_MODE;