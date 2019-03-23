/**
 * Hier wird die Nuance-Sprachausgabe implementiert. Ist NuancePort nicht vorhanden, wird
 * die Komponente auf deaktiviert versetzt.
 *
 * Letzte Aenderung: 20.03.2019
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


// nuance

import { NUANCE_TYPE_NAME, NUANCE_TTS_ACTION } from './../../cloud/nuance/nuance-const';


// tts

import { TTS_NUANCE_NAME } from './tts-const';
import { TTSPlugin} from './tts-plugin';


/**
 * Die TTSNUance Klasse kapselt die Nuance-TTS
 */

export class TTSNuance extends TTSPlugin {

    // externes Nuance-Objekt

    mNuancePort: PortInterface = null;

    /**
     * TTSNuance Objekt erzeugen.
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || TTS_NUANCE_NAME, aRegisterFlag );
        // TODO: muss wegben unterschiedlicher Language-Kuerzel hier gesetzt werden
        this.mSpeakLanguage = 'deu-DEU';
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'TTSNuance';
    }


    // Plugin-Funktionen


    /**
     * Freigabe von TTS
     */

    done(): number {
        // pruefen auf Nuance-Port
        if ( this.mNuancePort ) {
            this.mNuancePort.removeAllEvent( TTS_NUANCE_NAME );
            this.mNuancePort = null;
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
        if ( this.mNuancePort ) {
            // console.log('TTSNuance._setErrorOutput:', aErrorOutputFlag);
            if ( aErrorOutputFlag ) {
                this.mNuancePort.setErrorOutputOn();
            } else {
                this.mNuancePort.setErrorOutputOff();
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
                this.mSpeakLanguage = 'deu-DEU';
                break;

            case 'en':
                this.mSpeakLanguage = 'eng-USA';
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
            case 'deu-DEU':
                language = 'de';
                break;

            case 'eng-USA':
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
            return [ 'Anna-ML', 'Petra-ML', 'Markus', 'Yannick' ];
        }
        // US-Englisch
        if ( this.getLanguage() === 'en' ) {
            return [ 'Allison', 'Ava', 'Samantha', 'Susan', 'Zoe', 'Tom' ];
        }
        return [];
    }


    // Synthese-Funktionen


    /**
     * Feststellen, ob Nuance-Port vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn Nuance-Port existiert, false sonst
     */

    _detectSynthesis(): boolean {
        this.mNuancePort = PortManager.find( NUANCE_TYPE_NAME );
        if ( !this.mNuancePort ) {
            this._error( '_detectSynthesis', 'kein Nuance-Port vorhanden' );
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
        // console.log('TTSNuance._initSynthesis:', aOption);
        if ( !this.mNuancePort ) {
            this._error( '_initSynthesis', 'kein Nuance-Port vorhanden' );
            return -1;
        }
        if ( !this.mNuancePort.isInit()) {
            this._error( '_initSynthesis', 'Nuance-Port ist nicht initialisiert' );
            return -1;
        }
        if ( !this.mNuancePort.isOpen()) {
            this._error( '_initSynthesis', 'Nuance-Port ist nicht geoeffnet' );
            return -1;
        }
        this.mNuancePort.addStartEvent( TTS_NUANCE_NAME, (aEventData: EventDataInterface) => {
            // console.log('TTSNuance._initSynthesis: startEvent = ', aEventData);
            this._onSynthesisStart();
            return 0;
        });
        this.mNuancePort.addStopEvent( TTS_NUANCE_NAME, (aEventData: EventDataInterface) => {
            // console.log('TTSNuance._initSynthesis: stopEvent = ', aEventData);
            this._onSynthesisEnd();
            return 0;
        });
        this.mNuancePort.addErrorEvent( TTS_NUANCE_NAME, (aError: any) => {
            // console.log('TTSNuance._initSynthesis: errorEvent = ', aError.message);
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
        if ( this.mNuancePort ) {
            return this.mNuancePort.isAction( NUANCE_TTS_ACTION );
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
        if ( this.mNuancePort ) {
            // console.log('TTSNuance._startSynthesis:', aText, this._getTTSLanguage(), this.getVoice());
            return this.mNuancePort.start( TTS_NUANCE_NAME, NUANCE_TTS_ACTION, { text: aText, language: this._getTTSLanguage(), voice: this.getVoice()});
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
        if ( this.mNuancePort ) {
            // console.log('TTSNuance._stopSynthesis:', this._getTTSLanguage(), this.getVoice());
            return this.mNuancePort.stop( TTS_NUANCE_NAME, NUANCE_TTS_ACTION );
        }
        return -1;
    }


    /**
     * prueft, ob die Synthese im NuancePort laeuft
     */

    _isSynthesisRunning(): boolean {
        // console.log('TTSNuance._isSynthesisRunning');
        if ( this.mNuancePort ) {
            return this.mNuancePort.isRunning( TTS_NUANCE_NAME, NUANCE_TTS_ACTION );
        }
        return false;
    }

}
