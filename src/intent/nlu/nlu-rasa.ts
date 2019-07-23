/**
 * Diese Komponente dient der Spracherkennung mit Hilfe von Rasa-NLU
 *
 * Letzte Aenderung: 09.07.2019
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


// rasa

import { RASA_TYPE_NAME, RASA_NLU_ACTION } from './../../cloud/rasa/rasa-const';


// nlu

import { NLU_RASA_NAME } from './nlu-const';
import { NLUPlugin } from './nlu-plugin';


/**
 * Diese Klasse kapselt die Rasa Texteingabe
 */

export class NLURasa extends NLUPlugin {

    // externes Rasa-Objekt

    mRasaPort: PortInterface = null;


    /**
     * NLURasa Objekt erzeugen
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || NLU_RASA_NAME, aRegisterFlag );
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'NLURasa';
    }


    // Plugin-Funktionen


    /**
     * Freigabe der Komponente
     */

    done(): number {
        // pruefen auf Rasa-Port
        if ( this.mRasaPort ) {
            this.mRasaPort.removeAllEvent( NLU_RASA_NAME );
            this.mRasaPort = null;
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
        if ( this.mRasaPort ) {
            // console.log('TTSNuance._setErrorOutput:', aErrorOutputFlag);
            if ( aErrorOutputFlag ) {
                this.mRasaPort.setErrorOutputOn();
            } else {
                this.mRasaPort.setErrorOutputOff();
            }
        }
    }


    // Recognition-Funktionen


    /**
     * Feststellen, ob Rasa SpeechRecognition API vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn SpeechRecognition existiert, false sonst
     */

    _detectRecognition(): boolean {
        this.mRasaPort = PortManager.find( RASA_TYPE_NAME );
        if ( !this.mRasaPort ) {
            this._error( '_detectRecognition', 'kein Rasa-Port vorhanden' );
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
        // console.log('NLURasa._onInternResult:', aResult);
        if ( aResult.type === RASA_NLU_ACTION ) {
            return this._onRecognitionIntentResult( aResult.data );
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
        if ( !this.mRasaPort ) {
            this._error( '_initRecognition', 'kein Rasa-Port vorhanden' );
            return -1;
        }
        if ( !this.mRasaPort.isInit()) {
            this._error( '_initRecognition', 'Rasa-Port ist nicht initialisiert' );
            return -1;
        }
        if ( !this.mRasaPort.isOpen()) {
            this._error( '_initRecognition', 'Rasa-Port ist nicht geoeffnet' );
            return -1;
        }
        this.mRasaPort.addStartEvent( NLU_RASA_NAME, (aEventData: EventDataInterface) => {
            // console.log('NLURasa._initRecognition: startEvent = ', aEventData);
            this._onRecognitionStart();
            return 0;
        });
        this.mRasaPort.addStopEvent( NLU_RASA_NAME, (aEventData: EventDataInterface) => {
            // console.log('NLURasa._initRecognition: stopEvent = ', aEventData);
            this._onRecognitionEnd();
            return 0;
        });
        this.mRasaPort.addResultEvent( NLU_RASA_NAME, (aEventData: EventDataInterface) => {
            // console.log('NLURasa._initRecognition: resultEvent = ', aEventData);
            this._onInternResult( aEventData );
            return 0;
        });
        this.mRasaPort.addErrorEvent( NLU_RASA_NAME, (aError: any) => {
            // console.log('NLURasa._initRecognition: errorEvent = ', aError.message);
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
        if ( this.mRasaPort ) {
            return this.mRasaPort.isAction( RASA_NLU_ACTION );
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
        if ( this.mRasaPort ) {
            return this.mRasaPort.isAction( RASA_NLU_ACTION );
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
        return false;
    }


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     */

    _getRecognitionResult( aEvent: any ): any {
        // console.log('NLUNuance._getRecognitionResult:', aEvent);
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
        console.log('NLURasa._getRecognitionIntentResult:', aEvent);
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        // es sollte der Intent und die Confidence uebergeben werden!
        const intentData = {
            intent: '',
            confidence: 0.0,
            conceptList: [],
            literal: '',
            speech: '',
            error: ''
        };
        try {
            // Mapping der Daten auf IntentData
            intentData.intent = aEvent.intent.name;
            intentData.confidence = aEvent.intent.confidence;
            // intentData.confidence = 1.0;
            // Konzepte kopieren, wenn vorhanden
            if ( aEvent.entities ) {
                console.log('NluRasa._getRecognitionIntentResult:', aEvent.entities);
                for ( let entity of aEvent.entities ) {
                    let concept = { concept: entity.entity, value: entity.value, literal: entity.text, confidence: entity.confidence };
                    console.log('NluRasa._getRecognitionIntentResult: concept = ', concept);
                    intentData.conceptList.push( concept );
                }
            }
            /****
            if ( aEvent.parameters ) {
                for ( var property in aEvent.parameters ) {
                    if ( aEvent.parameters.hasOwnProperty( property )) {
                        intentData.conceptList.push({ concept: property, value: aEvent.parameters[property], literal: aEvent.parameters[property]});
                    }
                }
            }    
            ****/        
            intentData.literal = aEvent.text;
            // intentData.speech = aEvent.fulfillment.speech;
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
        return -1;
    }


    /**
     * statet die Recognition
     *
     * @protected
     * @returns {number}
     */

    _startRecognitionIntent( aText: string ): number {
        if ( !this.mRasaPort ) {
            return -1;
        }
        return this.mRasaPort.start( NLU_RASA_NAME, RASA_NLU_ACTION, { text: aText, language: this._getNLULanguage()});
    }


    /**
     * stoppt die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _stopRecognition(): number {
        if ( !this.mRasaPort ) {
            return -1;
        }
        return this.mRasaPort.stop( NLU_RASA_NAME );
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
        if ( this.mRasaPort ) {
            // TODO: solange mehrere Actions verwendet werden in der NLU, wird die Action nicht uebergeben
            // return this.mRasaPort.isRunning( NLU_NUANCE_NAME, NUANCE_NLU_ACTION );
            return this.mRasaPort.isRunning( NLU_RASA_NAME );
        }
        return false;
    }

}
