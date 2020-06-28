/** @packageDocumentation
 * Globale Konstanten fuer Rasa
 *
 * Letzte Aenderung: 09.07.2019
 * Status: rot
 *
 * @module cloud/rasa
 * @author SB
 */


// Default-Konstanten

export const RASA_TYPE_NAME = 'Rasa';
export const RASA_FACTORY_NAME = 'RasaFactory';
export const RASA_PORT_NAME = 'RasaPort';
export const RASA_MOCK_NAME = 'RasaMock';
export const RASA_DEFAULT_NAME = RASA_PORT_NAME;


// Default URL des Rasa-Service

export const RASA_SERVER_URL = 'http://localhost:5005';
export const RASA_DEFAULT_URL = RASA_SERVER_URL;


// Aktionen

export const RASA_NLU_ACTION = 'NLU';


// Konfigurationsdaten

export const RASA_CONFIG_PATH = 'assets/';
export const RASA_CONFIG_FILE = 'rasa.json';
export const RASA_CONFIG_LOAD = false;


// Sprachen


export const RASA_DE_LANGUAGE = 'de-DE';
export const RASA_EN_LANGUAGE = 'en-US';
export const RASA_DEFAULT_LANGUAGE = RASA_DE_LANGUAGE;


// Wenn der Action-Timeout in NuancePort abgeschaltet werden soll

const RASA_NOACTION_TIMEOUT = 0;
