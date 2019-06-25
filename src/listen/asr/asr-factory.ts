/**
 * Globale Fabrik zur Erzeugung einer ASR
 *
 * Letzte Aenderung: 17.06.2019
 * Status: rot
 *
 * @module listen/asr
 * @author SB
 */


// plugin

import { PluginFactory } from '../../core/plugin/plugin-factory';


// asr

import { 
    ASR_FACTORY_NAME,
    ASR_TYPE_NAME,
    ASR_DEFAULT_NAME,
    ASR_PLUGIN_NAME,
    ASR_HTML5_NAME,
    ASR_NUANCE_NAME,
    ASR_GOOGLE_NAME,
    ASR_MICROSOFT_NAME,
    ASR_MOCK_NAME,
    ASR_GROUP_NAME } from './asr-const';
import { ASRInterface } from './asr.interface';
import { ASRMock } from './asr-mock';
import { ASRHtml5 } from './asr-html5';
import { ASRNuance } from './asr-nuance';
import { ASRGoogle } from './asr-google';
import { ASRMicrosoft } from './asr-microsoft';
import { ASRGroup } from './asr-group';


// Global API

export class ASRFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'ASRFactory' );
    }


    /**
     * Typ der erzeugten Objekte der Fabrik zurueckgeben
     *
     * @return {string} gibt den Typ der ASR-Fabrik zurueck
     */

    getType(): string {
        return ASR_TYPE_NAME;
    }


    /**
     * Name der Fabrik
     *
     * @return {string} gibt den Namen der Fabrik zurueck
     */

    getName(): string {
        return ASR_FACTORY_NAME;
    }


    /**
     * Erzeugt eine ASR zum vorgegebenen ASR-Namen. Wird ein falscher ASR-Name uebergeben,
     * wird null zurueckgegeben
     *
     * @private
     * @param aPluginName - Name der zu erzeugenden ASR
     * @param aRegisterFlag - bestimmt, ob ASR im PluginManager registriert wird
     *
     * @return {ASRInterface} gibt ASR Instanz oder null zurueck
     */

    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): ASRInterface {
        let asr: ASRInterface = null;
        switch ( aPluginName ) {
            case ASR_GROUP_NAME:
                asr = new ASRGroup( this, aPluginName, aRegisterFlag );
                break;
            // Default-ASR
            case ASR_PLUGIN_NAME:
                // durchfallen ist beabsichtigt, da ASRHtml5 als Default-Plugin
                // verwendet wird
            case ASR_HTML5_NAME:
                asr = new ASRHtml5( aPluginName, aRegisterFlag );
                break;
            // Nuance-ASR
            case ASR_NUANCE_NAME:
                asr = new ASRNuance( aPluginName, aRegisterFlag );
                break;
            // Google-ASR
            case ASR_GOOGLE_NAME:
                asr = new ASRGoogle( aPluginName, aRegisterFlag );
                break;
            // Microsoft-ASR
            case ASR_MICROSOFT_NAME:
                asr = new ASRMicrosoft( aPluginName, aRegisterFlag );
                break;
            // Mock-ASR
            case ASR_MOCK_NAME:
                asr = new ASRMock( ASR_MOCK_NAME, aRegisterFlag );
                break;
            // keine ASR erkannt
            default:
                this._error( '_newPlugin', 'keine ASR vorhanden' );
                break;
        }
        return asr;
    }


    /**
     * Kann verschiedene Versionen der ASR
     * zurueckgeben, einschließlich eines ASR-Mocks.
     *
     * @param {string} aName - Name der zu erzeugenden ASR
     * @param {boolean} aRegisterFlag - wenn true, dann wird Plugin in PluginManager eingetragen
     *
     * @return {ASRInterface} gibt eine ASR Instanz oder null zurueck
     */

    create( aName?: string, aRegisterFlag = true ): ASRInterface {
        const asrName = aName || ASR_DEFAULT_NAME;

        // ASR erzeugen

        try {
            return this._newPlugin( asrName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }

    }

}
