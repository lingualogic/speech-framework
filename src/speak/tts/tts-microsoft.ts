/** @packageDocumentation
 * Hier wird die Microsoft-Sprachausgabe implementiert. Ist MicrosoftPort nicht vorhanden, wird
 * die Komponente auf deaktiviert versetzt.
 *
 * Letzte Aenderung: 09.06.2020
 * Status: rot
 *
 * @module speak/tts
 * @author SB
 */


// event

import { EventDataInterface, PortInterface } from '@speech/core';


// cloud

import { CLOUD_MICROSOFT_PORT, CLOUD_TTS_ACTION, CloudManager } from '@speech/cloud';


// tts

import { TTS_MICROSOFT_NAME } from './tts-const';
import { TTSPlugin} from './tts-plugin';


/**
 * Die TTSMicrosoft Klasse kapselt die Microsoft-TTS
 */

export class TTSMicrosoft extends TTSPlugin {

    // externes Microsoft-Objekt

    mPort: PortInterface = null;

    /**
     * TTSMicrosoft Objekt erzeugen.
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || TTS_MICROSOFT_NAME, aRegisterFlag );
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'TTSMicrosoft';
    }


    // Plugin-Funktionen


    /**
     * Freigabe von TTS
     */

    done(): number {
        // pruefen auf Nuance-Port
        if ( this.mPort ) {
            this.mPort.removeAllEvent( TTS_MICROSOFT_NAME );
            this.mPort = null;
        }
        return super.done();
    }


    // Fehler-Funktionen


    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */

    _setErrorOutput( aErrorOutputFlag: boolean ): void {
        super._setErrorOutput( aErrorOutputFlag );
        if ( this.mPort ) {
            // console.log('TTSMicrosoft._setErrorOutput:', aErrorOutputFlag);
            if ( aErrorOutputFlag ) {
                this.mPort.setErrorOutputOn();
            } else {
                this.mPort.setErrorOutputOff();
            }
        }
    }


    // Voice-Funktionen


    /**
     * Rueckgabe aller vorhandenen Voice-Namen
     *
     * @return {Array<string>} Liste der Voice-Namen
     */

    getVoiceList(): Array<string> {
        // Deutschland
        if ( this.getLanguage() === 'de' ) {
            return [ 'de-DE-Hedda', 'de-DE-HeddaRUS', 'de-DE-Stefan-Apollo' ];
        }
        // US-Englisch
        if ( this.getLanguage() === 'en' ) {
            return [ 'en-US-BenjaminRUS', 'en-US-JessaRUS', 'en-US-ZiraRUS' ];
        }
        return [];
    }


    // Synthese-Funktionen


    /**
     * Feststellen, ob Microsoft-Port vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn Microsoft-Port existiert, false sonst
     */

    _detectSynthesis(): boolean {
        this.mPort = CloudManager.findPort( CLOUD_MICROSOFT_PORT );
        if ( !this.mPort ) {
            this._error( '_detectSynthesis', 'kein Microsoft-Port vorhanden' );
            return false;
        }
        return true;
    }


    /**
     * Initialisierung der Synthese
     *
     * @protected
     * @param {*} aOption - optionale Parameter fuer die Synthese
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _initSynthesis( aOption?: any ): number {
        // console.log('TTSMicrosoft._initSynthesis:', aOption);
        if ( !this.mPort ) {
            this._error( '_initSynthesis', 'kein Microsoft-Port vorhanden' );
            return -1;
        }
        if ( !this.mPort.isInit()) {
            this._error( '_initSynthesis', 'Microsoft-Port ist nicht initialisiert' );
            return -1;
        }
        if ( !this.mPort.isOpen()) {
            this._error( '_initSynthesis', 'Microsoft-Port ist nicht geoeffnet' );
            return -1;
        }
        this.mPort.addStartEvent( TTS_MICROSOFT_NAME, (aEventData: EventDataInterface) => {
            // console.log('TTSMicrosoft._initSynthesis: startEvent = ', aEventData);
            this._onSynthesisStart();
            return 0;
        });
        this.mPort.addStopEvent( TTS_MICROSOFT_NAME, (aEventData: EventDataInterface) => {
            // console.log('TTSMicrosoft._initSynthesis: stopEvent = ', aEventData);
            this._onSynthesisEnd();
            return 0;
        });
        this.mPort.addErrorEvent( TTS_MICROSOFT_NAME, (aError: any) => {
            // console.log('TTSMicrosoft._initSynthesis: errorEvent = ', aError.message);
            this._onSynthesisError({ error: aError.message });
            return 0;
        });
        return 0;
    }


    /**
     * pruefen auf vorhandene Synthese
     *
     * @returns {boolean} True, wenn Synthese vorhanden ist, False sonst
     */

    _isSynthesis(): boolean {
        if ( this.mPort ) {
            return this.mPort.isAction( CLOUD_TTS_ACTION );
        }
        return false;
    }


    /**
     * Erzeugen der Synthese-Objekte
     *
     * @protected
     * @param {string} aText - zu synthethisiernder Text
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _createSynthesis( aText: string ): number {
        return 0;
    }


    /**
     * startet die Synthese
     *
     * @protected
     * @returns {number} Fehlercode 0 oder -1
     */

    _startSynthesis( aText: string ): number {
        if ( this.mPort ) {
            // console.log('TTSMicrosoft._startSynthesis:', aText, this._getTTSLanguage(), this.getVoice());
            return this.mPort.start( TTS_MICROSOFT_NAME, CLOUD_TTS_ACTION, { text: aText, language: this._getTTSLanguage(), voice: this.getVoice()});
        }
        return -1;
    }


    /**
     * stoppt die Synthese
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    _stopSynthesis(): number {
        if ( this.mPort ) {
            // console.log('TTSMicrosoft._stopSynthesis:', this._getTTSLanguage(), this.getVoice());
            return this.mPort.stop( TTS_MICROSOFT_NAME, CLOUD_TTS_ACTION );
        }
        return -1;
    }


    /**
     * prueft, ob die Synthese im NuancePort laeuft
     */

    _isSynthesisRunning(): boolean {
        // console.log('TTSMicrosoft._isSynthesisRunning');
        if ( this.mPort ) {
            return this.mPort.isRunning( TTS_MICROSOFT_NAME, CLOUD_TTS_ACTION );
        }
        return false;
    }

}
