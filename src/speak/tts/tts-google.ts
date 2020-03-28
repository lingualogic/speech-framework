/**
 * Hier wird die Google-Sprachausgabe implementiert. Ist GooglePort nicht vorhanden, wird
 * die Komponente auf deaktiviert versetzt.
 *
 * Letzte Aenderung: 27.03.2020
 * Status: rot
 *
 * @module speak/tts
 * @author SB
 */


// event

import { EventDataInterface } from './../../core/event/event-data.interface';


// port

import { PortManager } from './../../core/port/port-manager';
import { PortInterface } from './../../core/port/port.interface';


// google

import { GOOGLE_TYPE_NAME, GOOGLE_TTS_ACTION } from './../../cloud/google/google-const';


// tts

import { TTS_GOOGLE_NAME } from './tts-const';
import { TTSPlugin} from './tts-plugin';


/**
 * Die TTSGoogle Klasse kapselt die Google-TTS
 */

export class TTSGoogle extends TTSPlugin {

    // externes Google-Objekt

    mPort: PortInterface = null;

    /**
     * TTSGoogle Objekt erzeugen.
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || TTS_GOOGLE_NAME, aRegisterFlag );
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'TTSGoogle';
    }


    // Plugin-Funktionen


    /**
     * Freigabe von TTS
     */

    done(): number {
        // pruefen auf Nuance-Port
        if ( this.mPort ) {
            this.mPort.removeAllEvent( TTS_GOOGLE_NAME );
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
            // console.log('TTSAmazon._setErrorOutput:', aErrorOutputFlag);
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
            return [ 'de-DE-Standard-A', 'de-DE-Standard-B', 'de-DE-Wavenet-A', 'de-DE-Wavenet-B', 'de-DE-Wavenet-C', 'de-DE-Wavenet-D' ];
        }
        // US-Englisch
        if ( this.getLanguage() === 'en' ) {
            return [ 'en-US-Standard-B', 'en-US-Standard-C', 'en-US-Standard-D', 'en-US-Standard-E', 'en-US-Wavenet-A', 'en-US-Wavenet-B', 'en-US-Wavenet-C', 'en-US-Wavenet-D' ];
        }
        return [];
    }


    // Synthese-Funktionen


    /**
     * Feststellen, ob Amazon-Port vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn Amazon-Port existiert, false sonst
     */

    _detectSynthesis(): boolean {
        this.mPort = PortManager.find( GOOGLE_TYPE_NAME );
        if ( !this.mPort ) {
            this._error( '_detectSynthesis', 'kein Google-Port vorhanden' );
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
        // console.log('TTSGoogle._initSynthesis:', aOption);
        if ( !this.mPort ) {
            this._error( '_initSynthesis', 'kein Google-Port vorhanden' );
            return -1;
        }
        if ( !this.mPort.isInit()) {
            this._error( '_initSynthesis', 'Google-Port ist nicht initialisiert' );
            return -1;
        }
        if ( !this.mPort.isOpen()) {
            this._error( '_initSynthesis', 'Google-Port ist nicht geoeffnet' );
            return -1;
        }
        this.mPort.addStartEvent( TTS_GOOGLE_NAME, (aEventData: EventDataInterface) => {
            // console.log('TTSGoogle._initSynthesis: startEvent = ', aEventData);
            this._onSynthesisStart();
            return 0;
        });
        this.mPort.addStopEvent( TTS_GOOGLE_NAME, (aEventData: EventDataInterface) => {
            // console.log('TTSGoogle._initSynthesis: stopEvent = ', aEventData);
            this._onSynthesisEnd();
            return 0;
        });
        this.mPort.addErrorEvent( TTS_GOOGLE_NAME, (aError: any) => {
            // console.log('TTSGoogle._initSynthesis: errorEvent = ', aError.message);
            // pruefen auf Token-Fehler, dann kann die NLU nicht arbeiten !
            if ( aError.message === 'GoogleTTS2.getAccessTokenFromServer: Failed to fetch' ) {
                this.setActiveOff();
            }
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
            return this.mPort.isAction( GOOGLE_TTS_ACTION );
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
            // console.log('TTSGoogle._startSynthesis:', aText, this._getTTSLanguage(), this.getVoice());
            return this.mPort.start( TTS_GOOGLE_NAME, GOOGLE_TTS_ACTION, { text: aText, language: this._getTTSLanguage(), voice: this.getVoice()});
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
            // console.log('TTSGoogle._stopSynthesis:', this._getTTSLanguage(), this.getVoice());
            return this.mPort.stop( TTS_GOOGLE_NAME, GOOGLE_TTS_ACTION );
        }
        return -1;
    }


    /**
     * prueft, ob die Synthese im NuancePort laeuft
     */

    _isSynthesisRunning(): boolean {
        // console.log('TTSGoogle._isSynthesisRunning');
        if ( this.mPort ) {
            return this.mPort.isRunning( TTS_GOOGLE_NAME, GOOGLE_TTS_ACTION );
        }
        return false;
    }

}
