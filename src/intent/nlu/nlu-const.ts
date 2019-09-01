/**
 * Globale Konstanten fuer NLU
 *
 * Letzte Aenderung: 28.08.2019
 * Status: rot
 *
 * @module intent/nlu
 * @author SB
 */


// Default-Konstanten

export const NLU_FACTORY_NAME = 'NLUFactory';
export const NLU_TYPE_NAME = 'NLU';
export const NLU_PLUGIN_NAME = 'NLU';
export const NLU_MOCK_NAME = 'NLUMock';

// konkrete NLUs

export const NLU_HTML5_NAME = 'NLUHtml5';
export const NLU_NUANCE_NAME = 'NLUNuance';
export const NLU_GOOGLE_NAME = 'NLUGoogle';
export const NLU_MICROSOFT_NAME = 'NLUMicrosoft';
export const NLU_RASA_NAME = 'NLURasa';
export const NLU_GROUP_NAME = 'NLUGroup';
export const NLU_DEFAULT_NAME = NLU_GROUP_NAME;



// Zeit, in Millisekunden, bis Listen abgebrochen wird,
// wenn Mikrofon nicht freigegeben wird.

export const NLU_TIMEOUT_TIME = 30000;


// Sprach-Konstanten (fuer HTML5)

export const NLU_DE_LANGUAGE = 'de-DE';
export const NLU_EN_LANGUAGE = 'en-US';
export const NLU_DEFAULT_LANGUAGE = NLU_DE_LANGUAGE;
