/**
 * Hier wird die Microsoft-Spracherkennung implementiert. Ist MicrosoftPort nicht vorhanden, wird
 * die Komponente auf deaktiviert versetzt.
 *
 * Letzte Aenderung: 17.06.2019
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


// microsoft

import { MICROSOFT_TYPE_NAME, MICROSOFT_ASR_ACTION } from './../../cloud/microsoft/microsoft-const';


// asr

import { ASR_MICROSOFT_NAME } from './asr-const';
import { ASRPlugin} from './asr-plugin';


/**
 * Die ASRMicrosoft Klasse kapselt die Microsoft-ASR
 */

export class ASRMicrosoft extends ASRPlugin {

    // externer Microsoft-Port

    mMicrosoftPort: PortInterface = null;

    /**
     * ASRNuance Objekt erzeugen.
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || ASR_MICROSOFT_NAME, aRegisterFlag );
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'ASRMicrosoft';
    }


    // Plugin-Funktionen


    /**
     * Freigabe von TTS
     */

    done(): number {
        // pruefen auf Port
        if ( this.mMicrosoftPort ) {
            this.mMicrosoftPort.removeAllEvent( ASR_MICROSOFT_NAME );
            this.mMicrosoftPort = null;
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
        if ( this.mMicrosoftPort ) {
            // console.log('TTSMicrosoft._setErrorOutput:', aErrorOutputFlag);
            if ( aErrorOutputFlag ) {
                this.mMicrosoftPort.setErrorOutputOn();
            } else {
                this.mMicrosoftPort.setErrorOutputOff();
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
        this.mMicrosoftPort = PortManager.find( MICROSOFT_TYPE_NAME );
        if ( !this.mMicrosoftPort ) {
            this._error( '_detectRecognition', 'kein Microsoft-Port vorhanden' );
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
        // console.log('ASRMicrosoft._initRecognition:', aOption);
        if ( !this.mMicrosoftPort ) {
            this._error( '_initRecognition', 'kein Microsoft-Port vorhanden' );
            return -1;
        }
        if ( !this.mMicrosoftPort.isInit()) {
            this._error( '_initRecognition', 'Microsoft-Port ist nicht initialisiert' );
            return -1;
        }
        if ( !this.mMicrosoftPort.isOpen()) {
            this._error( '_initRecognition', 'Microsoft-Port ist nicht geoeffnet' );
            return -1;
        }
        this.mMicrosoftPort.addStartEvent( ASR_MICROSOFT_NAME, (aEventData: EventDataInterface) => {
            // console.log('ASRMicrosoft._initRecognition: startEvent = ', aEventData);
            this._onRecognitionStart();
            return 0;
        });
        this.mMicrosoftPort.addStopEvent( ASR_MICROSOFT_NAME, (aEventData: EventDataInterface) => {
            // console.log('ASRMicrosoft._initRecognition: stopEvent = ', aEventData);
            this._onRecognitionEnd();
            return 0;
        });
        this.mMicrosoftPort.addResultEvent( ASR_MICROSOFT_NAME, (aEventData: EventDataInterface) => {
            // console.log('NLUMicrosoft._initRecognition: resultEvent = ', aEventData);
            this._onRecognitionResult( aEventData.data );
            return 0;
        });
        this.mMicrosoftPort.addErrorEvent( ASR_MICROSOFT_NAME, (aError: any) => {
            // console.log('ASRMicrosoft._initRecognition: errorEvent = ', aError.message);
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
        if ( this.mMicrosoftPort ) {
            return this.mMicrosoftPort.isAction( MICROSOFT_ASR_ACTION );
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
        // console.log('ARSMicrosoft._getRecognitionResult:', aEvent);
        return aEvent.text;
    }


    /**
     * startet die Recognition
     *
     * @protected
     * @returns {number} Fehlercode 0 oder -1
     */

    _startRecognition(): number {
        // console.log('ASRMicrosoft._startRecognition');
        if ( this.mMicrosoftPort ) {
            // console.log('ASRMicrosoft._startRecognition:', this._getASRLanguage());
            return this.mMicrosoftPort.start( ASR_MICROSOFT_NAME, MICROSOFT_ASR_ACTION, { language: this._getASRLanguage() });
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
        if ( this.mMicrosoftPort ) {
            return this.mMicrosoftPort.stop( ASR_MICROSOFT_NAME, MICROSOFT_ASR_ACTION );
        }
        return -1;
    }


    /**
     * bricht die Recognition ab
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _abortRecognition(): number {
        if ( this.mMicrosoftPort ) {
            // TODO: Abort muss in Port noch eingebaut werden
            // return this.mMicrosoftPort.abort( NUANCE_ASR_ACTION );
            return this._stopRecognition();
        }
        return -1;
    }


    /**
     * prueft, ob die Recognition im Port laeuft
     */

    _isRecognitionRunning(): boolean {
        // console.log('TTSMicrosoft._isRecognitionRunning');
        if ( this.mMicrosoftPort ) {
            return this.mMicrosoftPort.isRunning( ASR_MICROSOFT_NAME, MICROSOFT_ASR_ACTION );
        }
        return false;
    }

}
