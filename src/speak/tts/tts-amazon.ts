/**
 * Hier wird die Amazon-Sprachausgabe implementiert. Ist AmazonPort nicht vorhanden, wird
 * die Komponente auf deaktiviert versetzt.
 *
 * Letzte Aenderung: 03.04.2019
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


// amazon

import { AMAZON_TYPE_NAME, AMAZON_TTS_ACTION } from './../../cloud/amazon/amazon-const';


// tts

import { TTS_AMAZON_NAME } from './tts-const';
import { TTSPlugin} from './tts-plugin';


/**
 * Die TTSAmazon Klasse kapselt die Amazon-TTS
 */

export class TTSAmazon extends TTSPlugin {

    // externes Amazon-Objekt

    mPort: PortInterface = null;

    /**
     * TTSAmazon Objekt erzeugen.
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || TTS_AMAZON_NAME, aRegisterFlag );
        // TODO: muss wegen unterschiedlicher Language-Kuerzel hier gesetzt werden
        this.mSpeakLanguage = 'de-DE';
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'TTSAmazon';
    }


    // Plugin-Funktionen


    /**
     * Freigabe von TTS
     */

    done(): number {
        // pruefen auf Nuance-Port
        if ( this.mPort ) {
            this.mPort.removeAllEvent( TTS_AMAZON_NAME );
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


    // Language-Funktionen


    /**
     * Traegt eine neue Sprache ein
     *
     * @param {string} aLanguage - de oder en
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setLanguage( aLanguage: string ): number {
        let result = 0;
        switch ( aLanguage ) {
            case 'de':
                this.mSpeakLanguage = 'de-DE';
                break;

            case 'en':
                this.mSpeakLanguage = 'en-US';
                break;

            default:
                this._error( 'setLanguage', 'keine gueltige Sprache uebergeben' );            
                result = -1;
                break;
        }
        return result;
    }


    /**
     * Gibt die aktuell einstestellte Sprache zurueck
     *
     * @return {string}
     */

    getLanguage(): string {
        let language = '';
        switch ( this.mSpeakLanguage ) {
            case 'de-DE':
                language = 'de';
                break;

            case 'en-US':
                language = 'en';
                break;

            default:
                break;
        }
        return language;
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
            return [ 'Marlene', 'Hans', 'Vicki' ];
        }
        // US-Englisch
        if ( this.getLanguage() === 'en' ) {
            return [ 'Ivy', 'Joey', 'Joanna', 'Justin', 'Kendra', 'Matthew', 'Kimberly', 'Salli' ];
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
        this.mPort = PortManager.find( AMAZON_TYPE_NAME );
        if ( !this.mPort ) {
            this._error( '_detectSynthesis', 'kein Amazon-Port vorhanden' );
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
        // console.log('TTSAmazon._initSynthesis:', aOption);
        if ( !this.mPort ) {
            this._error( '_initSynthesis', 'kein Amazon-Port vorhanden' );
            return -1;
        }
        if ( !this.mPort.isInit()) {
            this._error( '_initSynthesis', 'Amazon-Port ist nicht initialisiert' );
            return -1;
        }
        if ( !this.mPort.isOpen()) {
            this._error( '_initSynthesis', 'Amazon-Port ist nicht geoeffnet' );
            return -1;
        }
        this.mPort.addStartEvent( TTS_AMAZON_NAME, (aEventData: EventDataInterface) => {
            // console.log('TTSAmazon._initSynthesis: startEvent = ', aEventData);
            this._onSynthesisStart();
            return 0;
        });
        this.mPort.addStopEvent( TTS_AMAZON_NAME, (aEventData: EventDataInterface) => {
            // console.log('TTSAmazon._initSynthesis: stopEvent = ', aEventData);
            this._onSynthesisEnd();
            return 0;
        });
        this.mPort.addErrorEvent( TTS_AMAZON_NAME, (aError: any) => {
            // console.log('TTSAmazon._initSynthesis: errorEvent = ', aError.message);
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
            return this.mPort.isAction( AMAZON_TTS_ACTION );
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
            // console.log('TTSAmazon._startSynthesis:', aText, this._getTTSLanguage(), this.getVoice());
            return this.mPort.start( TTS_AMAZON_NAME, AMAZON_TTS_ACTION, { text: aText, language: this._getTTSLanguage(), voice: this.getVoice()});
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
            // console.log('TTSAmazon._stopSynthesis:', this._getTTSLanguage(), this.getVoice());
            return this.mPort.stop( TTS_AMAZON_NAME, AMAZON_TTS_ACTION );
        }
        return -1;
    }


    /**
     * prueft, ob die Synthese im NuancePort laeuft
     */

    _isSynthesisRunning(): boolean {
        // console.log('TTSAmazon._isSynthesisRunning');
        if ( this.mPort ) {
            return this.mPort.isRunning( TTS_AMAZON_NAME, AMAZON_TTS_ACTION );
        }
        return false;
    }

}
