/**
 * Diese Komponente dient der Spracherkennung mit Hilfe von Microsoft-NLU
 *
 * Letzte Aenderung: 28.08.2019
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


// microsoft

import { MICROSOFT_TYPE_NAME, MICROSOFT_NLU_ACTION } from './../../cloud/microsoft/microsoft-const';


// nlu

import { NLU_MICROSOFT_NAME } from './nlu-const';
import { NLUPlugin } from './nlu-plugin';


/**
 * Diese Klasse kapselt die Microsoft Texteingabe
 */

export class NLUMicrosoft extends NLUPlugin {

    // externes Microsoft-Objekt

    mMicrosoftPort: PortInterface = null;


    /**
     * NLUMicrosoft Objekt erzeugen
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || NLU_MICROSOFT_NAME, aRegisterFlag );
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'NLUMicrosoft';
    }


    // Plugin-Funktionen


    /**
     * Freigabe der Komponente
     */

    done(): number {
        // pruefen auf Microsoft-Port
        if ( this.mMicrosoftPort ) {
            this.mMicrosoftPort.removeAllEvent( NLU_MICROSOFT_NAME );
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
            // console.log('NLUMicrosoft._setErrorOutput:', aErrorOutputFlag);
            if ( aErrorOutputFlag ) {
                this.mMicrosoftPort.setErrorOutputOn();
            } else {
                this.mMicrosoftPort.setErrorOutputOff();
            }
        }
    }


    // Recognition-Funktionen


    /**
     * Feststellen, ob Microsoft SpeechRecognition API vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn SpeechRecognition existiert, false sonst
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
     * Interne Ergebnis-Verarbeitung
     *
     * @param {*} aResult - beliebiges Ergebnis
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _onInternResult( aResult: any ): number {
        // console.log('NLUGoogle._onInternResult:', aResult);
        if ( aResult.type === MICROSOFT_NLU_ACTION ) {
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
        this.mMicrosoftPort.addStartEvent( NLU_MICROSOFT_NAME, (aEventData: EventDataInterface) => {
            // console.log('NLUGoogle._initRecognition: startEvent = ', aEventData);
            this._onRecognitionStart();
            return 0;
        });
        this.mMicrosoftPort.addStopEvent( NLU_MICROSOFT_NAME, (aEventData: EventDataInterface) => {
            // console.log('NLUGoogle._initRecognition: stopEvent = ', aEventData);
            this._onRecognitionEnd();
            return 0;
        });
        this.mMicrosoftPort.addResultEvent( NLU_MICROSOFT_NAME, (aEventData: EventDataInterface) => {
            // console.log('NLUGoogle._initRecognition: resultEvent = ', aEventData);
            this._onInternResult( aEventData );
            return 0;
        });
        this.mMicrosoftPort.addErrorEvent( NLU_MICROSOFT_NAME, (aError: any) => {
            // console.log('NLUGoogle._initRecognition: errorEvent = ', aError.message);
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
        if ( this.mMicrosoftPort ) {
            return this.mMicrosoftPort.isAction( MICROSOFT_NLU_ACTION );
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
        if ( this.mMicrosoftPort ) {
            return this.mMicrosoftPort.isAction( MICROSOFT_NLU_ACTION );
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
        console.log('NLUMicrosoft._getRecognitionIntentResult:', aEvent);
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
            intentData.intent = aEvent.topScoringIntent.intent;
            intentData.confidence = aEvent.topScoringIntent.score;
            // Konzepte kopieren, wenn vorhanden
            if ( aEvent.entities ) {
                console.log('NluMicrosoft._getRecognitionIntentResult:', aEvent.entities);
                for ( let entity of aEvent.entities ) {
                    let concept = { concept: entity.type, value: entity.entity, literal: entity.entity, confidence: entity.score };
                    console.log('NluMicrosoft._getRecognitionIntentResult: concept = ', concept);
                    intentData.conceptList.push( concept );
                }
            }
            intentData.literal = aEvent.query;
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
        if ( !this.mMicrosoftPort ) {
            return -1;
        }
        return this.mMicrosoftPort.start( NLU_MICROSOFT_NAME, MICROSOFT_NLU_ACTION, { text: aText, language: this._getNLULanguage()});
    }


    /**
     * stoppt die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _stopRecognition(): number {
        if ( !this.mMicrosoftPort ) {
            return -1;
        }
        return this.mMicrosoftPort.stop( NLU_MICROSOFT_NAME );
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
        if ( this.mMicrosoftPort ) {
            // TODO: solange mehrere Actions verwendet werden in der NLU, wird die Action nicht uebergeben
            // return this.mMicrosoftPort.isRunning( NLU_NUANCE_NAME, NUANCE_NLU_ACTION );
            return this.mMicrosoftPort.isRunning( NLU_MICROSOFT_NAME );
        }
        return false;
    }

}
