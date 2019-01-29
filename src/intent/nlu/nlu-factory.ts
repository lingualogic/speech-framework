/**
 * Globale Fabrik zur Erzeugung einer NLU
 *
 * Letzte Aenderung: 01.12.2018
 * Status: rot
 *
 * @module intent/nlu
 * @author SB
 */


// plugin

import { PluginFactory } from '../../core/plugin/plugin-factory';


// nlu

import {
    NLU_FACTORY_NAME,
    NLU_TYPE_NAME,
    NLU_DEFAULT_NAME,
    NLU_GROUP_NAME,
    NLU_PLUGIN_NAME,
    NLU_HTML5_NAME,
    NLU_NUANCE_NAME,
    NLU_MOCK_NAME
} from './nlu-const';
import { NLUInterface } from './nlu.interface';
import { NLUMock } from './nlu-mock';
import { NLUHtml5 } from './nlu-html5';
import { NLUNuance } from './nlu-nuance';
import { NLUGroup } from './nlu-group';


// Global API

export class NLUFactory extends PluginFactory {

    // Konstruktor

    constructor() {
        super( 'NLUFactory' );
    }


    /**
     * Typ der erzeugten Objekte der Fabrik zurueckgeben
     *
     * @return {string} gibt den Typ der Fabrik zurueck
     */

    getType(): string {
        return NLU_TYPE_NAME;
    }


    /**
     * Name der Fabrik
     *
     * @return {string} gibt den Namen der Fabrik zurueck
     */

    getName(): string {
        return NLU_FACTORY_NAME;
    }


    /**
     * Erzeugt eine NLU zum vorgegebenen NLU-Namen. Wird ein falscher NLU-Name uebergeben,
     * wird null zurueckgegeben
     *
     * @private
     * @param aPluginName - Name der zu erzeugenden NLU
     * @param aRegisterFlag - bestimmt, ob NLU im PluginManager registriert wird
     *
     * @return {NLUInterface} gibt NLU Instanz oder null zurueck
     */

    _newPlugin( aPluginName: string, aRegisterFlag: boolean ): NLUInterface {
        let nlu: NLUInterface = null;
        switch ( aPluginName ) {
            case NLU_GROUP_NAME:
                nlu = new NLUGroup( this, aPluginName, aRegisterFlag );
                break;
            // Default-NLU
            case NLU_PLUGIN_NAME:
                // durchfallen ist beabsichtigt, da NLUNuance als Default-Plugin
                // verwendet wird
            case NLU_NUANCE_NAME:
                nlu = new NLUNuance( aPluginName, aRegisterFlag );
                break;
            case NLU_HTML5_NAME:
                nlu = new NLUHtml5( aPluginName, aRegisterFlag );
                break;
            // Mock-NLU
            case NLU_MOCK_NAME:
                nlu = new NLUMock( NLU_MOCK_NAME, aRegisterFlag );
                break;
            // keine NLU erkannt
            default:
                this._error( '_newPlugin', 'keine NLU vorhanden' );
                break;
        }
        return nlu;
    }


    /**
     * Kann verschiedene Versionen der NLU
     * zurueckgeben, einschließlich eines NLU-Mocks.
     *
     * @param {string} aName - Name der zu erzeugenden NLU
     * @param {boolean} aRegisterFlag - wenn true, dann wird Plugin in PluginManager eingetragen
     *
     * @return {NLUInterface} gibt eine NLU Instanz oder null zurueck
     */

    create( aName?: string, aRegisterFlag = true ): NLUInterface {
        const asrName = aName || NLU_DEFAULT_NAME;

        // NLU erzeugen

        try {
            return this._newPlugin( asrName, aRegisterFlag );
        } catch ( aException ) {
            this._exception( 'create', aException );
            return null;
        }

    }

}
