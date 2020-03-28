/**
 * Hier wird die Google-Spracherkennung implementiert. Ist GooglePort nicht vorhanden, wird
 * die Komponente auf deaktiviert versetzt.
 *
 * Letzte Aenderung: 16.05.2019
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


// google

import { GOOGLE_TYPE_NAME, GOOGLE_ASR_ACTION } from './../../cloud/google/google-const';


// asr

import { ASR_GOOGLE_NAME } from './asr-const';
import { ASRPlugin} from './asr-plugin';


/**
 * Die ASRGoogle Klasse kapselt die Google-ASR
 */

export class ASRGoogle extends ASRPlugin {

    // externer Google-Port

    mGooglePort: PortInterface = null;

    /**
     * ASRNuance Objekt erzeugen.
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || ASR_GOOGLE_NAME, aRegisterFlag );
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'ASRGoogle';
    }


    // Plugin-Funktionen


    /**
     * Freigabe von TTS
     */

    done(): number {
        // pruefen auf Port
        if ( this.mGooglePort ) {
            this.mGooglePort.removeAllEvent( ASR_GOOGLE_NAME );
            this.mGooglePort = null;
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
        if ( this.mGooglePort ) {
            // console.log('TTSGoogle._setErrorOutput:', aErrorOutputFlag);
            if ( aErrorOutputFlag ) {
                this.mGooglePort.setErrorOutputOn();
            } else {
                this.mGooglePort.setErrorOutputOff();
            }
        }
    }


    // Recognition-Funktionen


    /**
     * Feststellen, ob Port vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn Port existiert, false sonst
     */

    _detectRecognition(): boolean {
        this.mGooglePort = PortManager.find( GOOGLE_TYPE_NAME );
        if ( !this.mGooglePort ) {
            this._error( '_detectRecognition', 'kein Google-Port vorhanden' );
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
        // console.log('ASRGoogle._initRecognition:', aOption);
        if ( !this.mGooglePort ) {
            this._error( '_initRecognition', 'kein Google-Port vorhanden' );
            return -1;
        }
        if ( !this.mGooglePort.isInit()) {
            this._error( '_initRecognition', 'Google-Port ist nicht initialisiert' );
            return -1;
        }
        if ( !this.mGooglePort.isOpen()) {
            this._error( '_initRecognition', 'Google-Port ist nicht geoeffnet' );
            return -1;
        }
        this.mGooglePort.addStartEvent( ASR_GOOGLE_NAME, (aEventData: EventDataInterface) => {
            // console.log('ASRGoogle._initRecognition: startEvent = ', aEventData);
            this._onRecognitionStart();
            return 0;
        });
        this.mGooglePort.addStopEvent( ASR_GOOGLE_NAME, (aEventData: EventDataInterface) => {
            // onsole.log('ASRGoogle._initRecognition: stopEvent = ', aEventData);
            this._onRecognitionEnd();
            return 0;
        });
        this.mGooglePort.addResultEvent( ASR_GOOGLE_NAME, (aEventData: EventDataInterface) => {
            // console.log('ASRGoogle._initRecognition: resultEvent = ', aEventData);
            this._onRecognitionResult( aEventData.data );
            return 0;
        });
        this.mGooglePort.addErrorEvent( ASR_GOOGLE_NAME, (aError: any) => {
            // console.log('ASRGoogle._initRecognition: errorEvent = ', aError.message);
            // pruefen auf Token-Fehler, dann kann die NLU nicht arbeiten !
            if ( aError.message === 'GoogleASR2.getAccessTokenFromServer: Failed to fetch' ) {
                this.setActiveOff();
            }
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
        if ( this.mGooglePort ) {
            return this.mGooglePort.isAction( GOOGLE_ASR_ACTION );
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
        // console.log('ARSGoogle._getRecognitionResult:', aEvent);
        return aEvent[0].transcript;
    }


    /**
     * startet die Recognition
     *
     * @protected
     * @returns {number} Fehlercode 0 oder -1
     */

    _startRecognition(): number {
        // console.log('ASRGoogle._startRecognition');
        if ( this.mGooglePort ) {
            // console.log('ASRGoogle._startRecognition:', this._getASRLanguage());
            return this.mGooglePort.start( ASR_GOOGLE_NAME, GOOGLE_ASR_ACTION, { language: this._getASRLanguage() });
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
        // console.log('ASRGoogle._stopRecognition');
        if ( this.mGooglePort ) {
            return this.mGooglePort.stop( ASR_GOOGLE_NAME, GOOGLE_ASR_ACTION );
        }
        return -1;
    }


    /**
     * bricht die Recognition ab
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _abortRecognition(): number {
        if ( this.mGooglePort ) {
            // TODO: Abort muss in Port noch eingebaut werden
            // return this.mGooglePort.abort( NUANCE_ASR_ACTION );
            return this._stopRecognition();
        }
        return -1;
    }


    /**
     * prueft, ob die Recognition im Port laeuft
     */

    _isRecognitionRunning(): boolean {
        // console.log('TTSGoogle._isRecognitionRunning');
        if ( this.mGooglePort ) {
            // console.log('ASRGoogle._isRecognitionRunning: ', this.mGooglePort.isRunning( ASR_GOOGLE_NAME, GOOGLE_ASR_ACTION ));
            return this.mGooglePort.isRunning( ASR_GOOGLE_NAME, GOOGLE_ASR_ACTION );
        }
        return false;
    }

}
