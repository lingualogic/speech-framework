/**
 * Globale Fabrik zur Erzeugung einer TTS Version
 *
 * Letzte Aenderung: 04.07.2019
 * Status: rot
 *
 * @module speak/tts
 * @author SB
 */


// plugin

import { PluginFactory } from '../../core/plugin/plugin-factory';


// tts

import { TTS_TYPE_NAME, TTS_FACTORY_NAME, TTS_DEFAULT_NAME, TTS_GROUP_NAME, TTS_PLUGIN_NAME, TTS_MOCK_NAME, TTS_HTML5_NAME, TTS_AMAZON_NAME, TTS_GOOGLE_NAME, TTS_MICROSOFT_NAME, TTS_NUANCE_NAME } from './tts-const';
import { TTSInterface } from './tts.interface';
import { TTSMock } from './tts-mock';
import { TTSHtml5 } from './tts-html5';
import { TTSAmazon } from './tts-amazon';
import { TTSGoogle } from './tts-google';
import { TTSMicrosoft } from './tts-microsoft';
import { TTSNuance } from './tts-nuance';
import { TTSGroup } from './tts-group';


// Global API

export class TTSFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'TTSFactory' );
    }


    /**
     * Typ der erzeugten Objekte der Fabrik zurueckgeben
     *
     * @return {string} gibt den Typ der Fabrik zurueck
     */

    getType(): string {
        return TTS_TYPE_NAME;
    }


    /**
     * Name der Fabrik
     *
     * @return {string} gibt den Namen der Fabrik zurueck
     */

    getName(): string {
        return TTS_FACTORY_NAME;
    }


    /**
     * Erzeugt eine TTS zum vorgegebenen TTS-Namen. Wird ein falscher TTS-Name uebergeben,
     * wird null zurueckgegeben
     *
     * @private
     * @param aPluginName - Name der zu erzeugenden TTS
     * @param aRegisterFlag - bestimmt, ob TTS im PluginManager registriert wird
     *
     * @return {TTSInterface} gibt TTS Instanz oder null zurueck
     */

    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): TTSInterface {
        let tts: TTSInterface = null;
        switch ( aPluginName ) {
            case TTS_GROUP_NAME:
                tts = new TTSGroup( this, aPluginName, aRegisterFlag );
                break;
            // Default-TTS
            case TTS_PLUGIN_NAME:
                // durchfallen ist beabsichtigt, da TTSHtml5 als Default-Plugin
                // verwendet wird
            case TTS_HTML5_NAME:
                tts = new TTSHtml5( aPluginName, aRegisterFlag );
                break;
            // Amazon-TTS
            case TTS_AMAZON_NAME:
                tts = new TTSAmazon( aPluginName, aRegisterFlag );
                break;
            // Google-TTS
            case TTS_GOOGLE_NAME:
                tts = new TTSGoogle( aPluginName, aRegisterFlag );
                break;
            // Microsoft-TTS
            case TTS_MICROSOFT_NAME:
                tts = new TTSMicrosoft( aPluginName, aRegisterFlag );
                break;
            // Nuance-TTS
            case TTS_NUANCE_NAME:
                tts = new TTSNuance( aPluginName, aRegisterFlag );
                break;
            // Mock-TTS
            case TTS_MOCK_NAME:
                tts = new TTSMock( TTS_MOCK_NAME, aRegisterFlag );
                break;
            // keine TTS erkannt
            default:
                this._error( '_newPlugin', 'keine TTS vorhanden' );
                break;
        }
        return tts;
    }


    /**
     * Kann verschiedene Versionen der TTS
     * zurueckgeben, einschließlich eines TTS-Mocks.
     *
     * @param {string} aName - Name der zu erzeugenden TTS-Komponente
     * @param {boolean} aRegisterFlag - wenn true, wird Plugin in PluginManager eingetragen
     *
     * @return {TTSInterface} tts wird zurueckgegeben
     */

    create( aName?: string, aRegisterFlag = true ): TTSInterface {
        const ttsName = aName || TTS_DEFAULT_NAME;

        // TTS erzeugen

        try {
            return this._newPlugin( ttsName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }

    }

}
