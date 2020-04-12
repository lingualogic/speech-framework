/**
 * Diese Komponente dient der Spracherkennung mit Hilfe von Google Dialogflow-NLU
 *
 * Letzte Aenderung: 26.03.2030
 * Status: rot
 *
 * @module intent/nlu
 * @author SB
 */


// event

import { EventDataInterface } from './../../core/event/event-data.interface';


// port

import { PortManager } from './../../core/port/port-manager';
import { PortInterface } from './../../core/port/port.interface';


// google

import { GOOGLE_TYPE_NAME, GOOGLE_NLU_ACTION, GOOGLE_ASRNLU_ACTION } from './../../cloud/google/google-const';


// nlu

import { NLU_GOOGLE_NAME } from './nlu-const';
import { NLUPlugin } from './nlu-plugin';


/**
 * Diese Klasse kapselt die Google Texteingabe
 */

export class NLUGoogle extends NLUPlugin {

    // externes Google-Objekt

    mGooglePort: PortInterface = null;


    /**
     * NLUGoogle Objekt erzeugen
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || NLU_GOOGLE_NAME, aRegisterFlag );
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'NLUGoogle';
    }


    // Plugin-Funktionen


    /**
     * Freigabe der Komponente
     */

    done(): number {
        // pruefen auf Google-Port
        if ( this.mGooglePort ) {
            this.mGooglePort.removeAllEvent( NLU_GOOGLE_NAME );
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
            // console.log('TTSNuance._setErrorOutput:', aErrorOutputFlag);
            if ( aErrorOutputFlag ) {
                this.mGooglePort.setErrorOutputOn();
            } else {
                this.mGooglePort.setErrorOutputOff();
            }
        }
    }


    // Recognition-Funktionen


    /**
     * Feststellen, ob Google SpeechRecognition API vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn SpeechRecognition existiert, false sonst
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
     * Interne Ergebnis-Verarbeitung
     *
     * @param {*} aResult - beliebiges Ergebnis
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _onInternResult( aResult: any ): number {
        // console.log('NLUGoogle._onInternResult:', aResult);
        if ( aResult.type === GOOGLE_NLU_ACTION ) {
            return this._onRecognitionIntentResult( aResult.data );
        }
        if ( aResult.type === GOOGLE_ASRNLU_ACTION ) {
            // Unterscheiden von Transkription als String und Intent als Objekt
            if ( typeof aResult.data[ 0 ] === 'string' ) {
                return this._onRecognitionResult( aResult.data );
            } else {
                return this._onRecognitionIntentResult( aResult.data );
            }
        }
        return 0;
    }


    /**
     * Initialisierung der Recognition
     *
     * @protected
     * @param {*} aOption - optionale Parameter fuer die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _initRecognition( aOption?: any ): number {
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
        this.mGooglePort.addStartEvent( NLU_GOOGLE_NAME, (aEventData: EventDataInterface) => {
            // console.log('NLUGoogle._initRecognition: startEvent = ', aEventData);
            this._onRecognitionStart();
            return 0;
        });
        this.mGooglePort.addStopEvent( NLU_GOOGLE_NAME, (aEventData: EventDataInterface) => {
            // console.log('NLUGoogle._initRecognition: stopEvent = ', aEventData);
            this._onRecognitionEnd();
            return 0;
        });
        this.mGooglePort.addResultEvent( NLU_GOOGLE_NAME, (aEventData: EventDataInterface) => {
            // console.log('NLUGoogle._initRecognition: resultEvent = ', aEventData);
            this._onInternResult( aEventData );
            return 0;
        });
        this.mGooglePort.addErrorEvent( NLU_GOOGLE_NAME, (aError: any) => {
            // console.log('NLUGoogle._initRecognition: errorEvent = ', aError.message);
            // pruefen auf Token-Fehler, dann kann die NLU nicht arbeiten !
            if ( aError.message === 'GoogleNLU2.getAccessTokenFromServer: Failed to fetch' ) {
                this.setActiveOff();
            }
            this._onRecognitionError( aError );
            return 0;
        });
        return 0;
    }


    // Text-Funktionen


    /**
     * pruefen auf vorhandene Recognition
     *
     * @returns {boolean}
     * @memberof ASRPlugin
     */

    _isRecognition(): boolean {
        if ( this.mGooglePort ) {
            // console.log('NLUGoogle._isRecognition:', this.mGooglePort.isAction( GOOGLE_NLU_ACTION ));
            return this.mGooglePort.isAction( GOOGLE_NLU_ACTION );
        }
        return false;
    }


    /**
     * pruefen auf vorhandene Recognition
     *
     * @returns {boolean}
     * @memberof ASRPlugin
     */

    isIntent(): boolean {
        if ( this.mGooglePort ) {
            return this.mGooglePort.isAction( GOOGLE_NLU_ACTION );
        }
        return false;
    }


    /**
     * pruefen auf vorhandene Recognition
     *
     * @returns {boolean}
     * @memberof ASRPlugin
     */

    isListen(): boolean {
        if ( this.mGooglePort ) {
            return this.mGooglePort.isAction( GOOGLE_ASRNLU_ACTION );
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
        // console.log('NLUGoogle._getRecognitionResult:', aEvent);
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        return aEvent;
    }


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     */

    _getRecognitionIntentResult( aEvent: any ): any {
        // console.log('NLUGoogle._getRecognitionIntentResult:', aEvent);
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        // es sollte der Intent und die Confidence uebergeben werden!
        const intentData = {
            intent: '',
            confidence: 0.0,
            conceptList: [],
            literal: '',
            speech: '',
            audioFormat: '',
            audio: '',
            error: ''
        };
        try {
            // pruefen auf Dialogflow-V2
            if ( aEvent.queryResult ) {
                // console.log('NLUGoogle._getRecognitionIntentResult:', aEvent);
                if ( aEvent.queryResult.intent ) {
                    intentData.intent = aEvent.queryResult.intent.displayName;
                }
                intentData.confidence = aEvent.queryResult.intentDetectionConfidence;
                intentData.literal = aEvent.queryResult.queryText;
                intentData.speech = aEvent.queryResult.fulfillmentText;
                if ( aEvent.queryResult.parameters ) {
                    for ( var property in aEvent.queryResult.parameters ) {
                        if ( aEvent.queryResult.parameters.hasOwnProperty( property )) {
                            intentData.conceptList.push({ concept: property, value: aEvent.queryResult.parameters[property], literal: aEvent.queryResult.parameters[property], confidence: 1 });
                        }
                    }
                }
                if ( aEvent.outputAudio ) {
                    intentData.audio = aEvent.outputAudio;
                    intentData.audioFormat = aEvent.outputAudioConfig.audioEncoding;
                }
            } else {
                // Mapping der Daten auf IntentData
                intentData.intent = aEvent.metadata.intentName;
                intentData.confidence = aEvent.score;
                // intentData.confidence = 1.0;
                // Konzepte kopieren, wenn vorhanden
                /**** TODO: Konzepte muessen in Google erst noch ausprobiert werden
                if ( aEvent[0].concepts ) {
                    console.log('NluNuance._getRecognitionIntentResult:', aEvent[0].concepts);
                    for ( let conceptName in aEvent[0].concepts ) {
                        let concept = { concept: conceptName, value: '', literal: ''}
                        console.log('NluNuance._getRecognitionIntentResult: concept = ', conceptName);
                        concept.value = aEvent[0].concepts[conceptName][0].value;
                        concept.literal = aEvent[0].concepts[conceptName][0].literal;
                        intentData.conceptList.push( concept );
                    }
                }
                ****/
                if ( aEvent.parameters ) {
                    for ( var property in aEvent.parameters ) {
                        if ( aEvent.parameters.hasOwnProperty( property )) {
                            intentData.conceptList.push({ concept: property, value: aEvent.parameters[property], literal: aEvent.parameters[property], confidence: 1 });
                        }
                    }
                }            
                intentData.literal = aEvent.resolvedQuery;
                intentData.speech = aEvent.fulfillment.speech;
            }
        } catch ( aException ) {
            this._exception( '_getRecognitionIntentResult', aException );
            intentData.error = 'Exception:' + aException.message;
        }
        return intentData;
    }


    /**
     * statet die Recognition
     *
     * @protected
     * @returns {number}
     */

    _startRecognition(): number {
        if ( !this.mGooglePort ) {
            return -1;
        }
        return this.mGooglePort.start( NLU_GOOGLE_NAME, GOOGLE_ASRNLU_ACTION, { language: this._getNLULanguage()});
    }


    /**
     * statet die Recognition
     *
     * @protected
     * @returns {number}
     */

    _startRecognitionIntent( aText: string ): number {
        if ( !this.mGooglePort ) {
            return -1;
        }
        return this.mGooglePort.start( NLU_GOOGLE_NAME, GOOGLE_NLU_ACTION, { text: aText, language: this._getNLULanguage()});
    }


    /**
     * stoppt die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _stopRecognition(): number {
        if ( !this.mGooglePort ) {
            return -1;
        }
        return this.mGooglePort.stop( NLU_GOOGLE_NAME );
    }


    /**
     * bricht die Recognition ab
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _abortRecognition(): number {
        return this._stopRecognition();
    }


    /**
     * prueft, ob die Synthese im NuancePort laeuft
     */

    _isRecognitionRunning(): boolean {
        // console.log('TTSNuance._isSynthesisRunning');
        if ( this.mGooglePort ) {
            // TODO: solange mehrere Actions verwendet werden in der NLU, wird die Action nicht uebergeben
            // return this.mGooglePort.isRunning( NLU_NUANCE_NAME, NUANCE_NLU_ACTION );
            return this.mGooglePort.isRunning( NLU_GOOGLE_NAME );
        }
        return false;
    }

}
