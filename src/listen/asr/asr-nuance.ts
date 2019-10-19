/**
 * Hier wird die Nuance-Spracherkennung implementiert. Ist NuancePort nicht vorhanden, wird
 * die Komponente auf deaktiviert versetzt.
 *
 * Letzte Aenderung: 21.03.2019
 * Status: rot
 *
 * @module listen/asr
 * @author SB
 */


// event

import { EventDataInterface } from './../../core/event/event-data.interface';


// port

import { PortManager } from './../../core/port/port-manager';
import { PortInterface } from './../../core/port/port.interface';


// nuance

import { NUANCE_TYPE_NAME, NUANCE_ASR_ACTION } from './../../cloud/nuance/nuance-const';


// asr

import { ASR_NUANCE_NAME } from './asr-const';
import { ASRPlugin} from './asr-plugin';


/**
 * Die ASRNUance Klasse kapselt die Nuance-ASR
 */

export class ASRNuance extends ASRPlugin {

    // externes Nuance-Objekt

    mNuancePort: PortInterface = null;

    /**
     * ASRNuance Objekt erzeugen.
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || ASR_NUANCE_NAME, aRegisterFlag );
        // TODO: muss wegben unterschiedlicher Language-Kuerzel hier gesetzt werden
        this.mListenLanguage = 'deu-DEU';
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'ASRNuance';
    }


    // Plugin-Funktionen


    /**
     * Freigabe von TTS
     */

    done(): number {
        // pruefen auf Nuance-Port
        if ( this.mNuancePort ) {
            this.mNuancePort.removeAllEvent( ASR_NUANCE_NAME );
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
                this.mListenLanguage = 'deu-DEU';
                break;

            case 'en':
                this.mListenLanguage = 'eng-USA';
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
     * @return {string} Rueckgabe des Sprachcodes (de, en)
     */

    getLanguage(): string {
        let language = '';
        switch ( this.mListenLanguage ) {
            case 'deu-DEU':
                language = 'de';
                break;

            case 'eng-USA':
                language = 'en';
                break;

            default:
                // TODO: Eventuell muss hier language='' wegen Rollup-Problem hin
                language = '';
                break;
        }
        return language;
    }


    // Recognition-Funktionen


    /**
     * Feststellen, ob Nuance-Port vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn Nuance-Port existiert, false sonst
     */

    _detectRecognition(): boolean {
        this.mNuancePort = PortManager.find( NUANCE_TYPE_NAME );
        if ( !this.mNuancePort ) {
            this._error( '_detectRecognition', 'kein Nuance-Port vorhanden' );
            return false;
        }
        return true;
    }


    /**
     * Initialisierung der Recognition
     *
     * @protected
     * @param {*} aOption - optionale Parameter fuer die Synthese
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _initRecognition( aOption?: any ): number {
        // console.log('ASRNuance._initRecognition:', aOption);
        if ( !this.mNuancePort ) {
            this._error( '_initRecognition', 'kein Nuance-Port vorhanden' );
            return -1;
        }
        if ( !this.mNuancePort.isInit()) {
            this._error( '_initRecognition', 'Nuance-Port ist nicht initialisiert' );
            return -1;
        }
        if ( !this.mNuancePort.isOpen()) {
            this._error( '_initRecognition', 'Nuance-Port ist nicht geoeffnet' );
            return -1;
        }
        this.mNuancePort.addStartEvent( ASR_NUANCE_NAME, (aEventData: EventDataInterface) => {
            // console.log('ASRNuance._initRecognition: startEvent = ', aEventData);
            this._onRecognitionStart();
            return 0;
        });
        this.mNuancePort.addStopEvent( ASR_NUANCE_NAME, (aEventData: EventDataInterface) => {
            // console.log('ASRNuance._initRecognition: stopEvent = ', aEventData);
            this._onRecognitionEnd();
            return 0;
        });
        this.mNuancePort.addResultEvent( ASR_NUANCE_NAME, (aEventData: EventDataInterface) => {
            // console.log('NLUNuance._initRecognition: resultEvent = ', aEventData);
            this._onRecognitionResult( aEventData.data );
            return 0;
        });
        this.mNuancePort.addErrorEvent( ASR_NUANCE_NAME, (aError: any) => {
            // console.log('ASRNuance._initRecognition: errorEvent = ', aError.message);
            this._onRecognitionError( aError );
            return 0;
        });
        return 0;
    }


    /**
     * pruefen auf vorhandene Recognition
     *
     * @returns {boolean} True, wenn Recognition vorhanden ist, False sonst
     */

    _isRecognition(): boolean {
        if ( this.mNuancePort ) {
            return this.mNuancePort.isAction( NUANCE_ASR_ACTION );
        }
        return false;
    }


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     */

    _getRecognitionResult( aEvent: any ): any {
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        // console.log('ARSNuance._getRecognitionResult:', aEvent);
        return aEvent[0];
    }


    /**
     * startet die Recognition
     *
     * @protected
     * @returns {number} Fehlercode 0 oder -1
     */

    _startRecognition(): number {
        // console.log('ASRNuance._startRecognition');
        if ( this.mNuancePort ) {
            // console.log('ASRNuance._startRecognition:', this._getASRLanguage());
            return this.mNuancePort.start( ASR_NUANCE_NAME, NUANCE_ASR_ACTION, { language: this._getASRLanguage() });
        }
        return -1;
    }


    /**
     * stoppt die Recognition
     *
     * @protected
     * @return {number} Fehlercode 0 oder -1
     */

    _stopRecognition(): number {
        if ( this.mNuancePort ) {
            return this.mNuancePort.stop( ASR_NUANCE_NAME, NUANCE_ASR_ACTION );
        }
        return -1;
    }


    /**
     * bricht die Recognition ab
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _abortRecognition(): number {
        if ( this.mNuancePort ) {
            // TODO: Abort muss in Port noch eingebaut werden
            // return this.mNuancePort.abort( NUANCE_ASR_ACTION );
            return this._stopRecognition();
        }
        return -1;
    }


    /**
     * prueft, ob die Synthese im NuancePort laeuft
     */

    _isRecognitionRunning(): boolean {
        // console.log('TTSNuance._isSynthesisRunning');
        if ( this.mNuancePort ) {
            return this.mNuancePort.isRunning( ASR_NUANCE_NAME, NUANCE_ASR_ACTION );
        }
        return false;
    }

}
