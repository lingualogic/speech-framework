/**
 * Diese Komponente dient der Spracherkennung mit Hilfe von Nuance NLU
 * sowohl mit Audio wie auch Text.
 *
 * Letzte Aenderung: 13.02.2019
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


// nuance

import { NUANCE_TYPE_NAME, NUANCE_NLU_ACTION, NUANCE_ASR_ACTION, NUANCE_ASRNLU_ACTION } from './../../cloud/nuance/nuance-const';


// nlu

import { NLU_NUANCE_NAME } from './nlu-const';
import { NLUPlugin } from './nlu-plugin';


/**
 * Diese Klasse kapselt die Nuance-Sprach oder -Texteingabe
 */

export class NLUNuance extends NLUPlugin {

    // externes Nuance-Objekt

    mNuancePort: PortInterface = null;


    /**
     * NLUNuance Objekt erzeugen
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || NLU_NUANCE_NAME, aRegisterFlag );
        // TODO: muss wegben unterschiedlicher Language-Kuerzel hier gesetzt werden
        this.mListenLanguage = 'deu-DEU';
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'NLUNuance';
    }


    // Plugin-Funktionen


    /**
     * Freigabe der Komponente
     */

    done(): number {
        // pruefen auf Nuance-Port
        if ( this.mNuancePort ) {
            this.mNuancePort.removeAllEvent( NLU_NUANCE_NAME );
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
                break;
        }
        return language;
    }


    // Recognition-Funktionen


    /**
     * Feststellen, ob HTML5 SpeechRecognition API vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn SpeechRecognition existiert, false sonst
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
     * Interne Ergebnis-Verarbeitung
     *
     * @param {*} aResult - beliebiges Ergebnis
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _onInternResult( aResult: any ): number {
        // console.log('NLUNuance._onInternResult:', aResult);
        if ( aResult.type === NUANCE_NLU_ACTION ) {
            return this._onRecognitionIntentResult( aResult.data );
        }
        if ( aResult.type === NUANCE_ASRNLU_ACTION ) {
            // Unterscheiden von Transkription als String und Intent als Objekt
            if ( typeof aResult.data[ 0 ] === 'string' ) {
                return this._onRecognitionResult( aResult.data );
            } else {
                return this._onRecognitionIntentResult( aResult.data );
            }
        }
        if ( aResult.type === NUANCE_ASR_ACTION ) {
            return this._onRecognitionResult( aResult.data );
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
        this.mNuancePort.addStartEvent( NLU_NUANCE_NAME, (aEventData: EventDataInterface) => {
            // console.log('NLUNuance._initRecognition: startEvent = ', aEventData);
            this._onRecognitionStart();
            return 0;
        });
        this.mNuancePort.addStopEvent( NLU_NUANCE_NAME, (aEventData: EventDataInterface) => {
            // console.log('NLUNuance._initRecognition: stopEvent = ', aEventData);
            this._onRecognitionEnd();
            return 0;
        });
        this.mNuancePort.addResultEvent( NLU_NUANCE_NAME, (aEventData: EventDataInterface) => {
            // console.log('NLUNuance._initRecognition: resultEvent = ', aEventData);
            this._onInternResult( aEventData );
            return 0;
        });
        this.mNuancePort.addErrorEvent( NLU_NUANCE_NAME, (aError: any) => {
            // console.log('NLUNuance._initRecognition: errorEvent = ', aError.message);
            this._onError( aError );
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
        if ( this.mNuancePort ) {
            return this.mNuancePort.isAction( NUANCE_NLU_ACTION );
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
        if ( this.mNuancePort ) {
            return this.mNuancePort.isAction( NUANCE_NLU_ACTION );
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
        if ( this.mNuancePort ) {
            return this.mNuancePort.isAction( NUANCE_ASRNLU_ACTION );
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
        // console.log('NLUNuance._getRecognitionResult:', aEvent);
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        return aEvent[0];
    }


    /**
     * Wandelt rohes Spracherkennungsresultat in definierte Rueckgabe um.
     *
     * @protected
     * @param {any} aEvent - rohes Ergebnis der Spracherkennung
     */

    _getRecognitionIntentResult( aEvent: any ): any {
        // console.log('NLUNuance._getRecognitionIntentResult:', aEvent);
        // hier wird das Ergebnis in ein definiertes Result-DatentransferObjekt umgewandelt
        // es sollte der Intent und die Confidence uebergeben werden!
        const intentData = {
            intent: '',
            confidence: 0.0,
            literal: '',
            error: ''
        };
        try {
            // Mapping der Daten auf IntentData
            intentData.intent = aEvent[0].action.intent.value;
            intentData.confidence = aEvent[0].action.intent.confidence;
            intentData.literal = aEvent[0].literal;
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
        if ( !this.mNuancePort ) {
            return -1;
        }
        return this.mNuancePort.start( NLU_NUANCE_NAME, NUANCE_ASRNLU_ACTION, { language: this._getNLULanguage()});
    }


    /**
     * statet die Recognition
     *
     * @protected
     * @returns {number}
     */

    _startRecognitionIntent( aText: string ): number {
        if ( !this.mNuancePort ) {
            return -1;
        }
        return this.mNuancePort.start( NLU_NUANCE_NAME, NUANCE_NLU_ACTION, { text: aText, language: this._getNLULanguage()});
    }


    /**
     * stoppt die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _stopRecognition(): number {
        if ( !this.mNuancePort ) {
            return -1;
        }
        return this.mNuancePort.stop( NLU_NUANCE_NAME );
    }


    /**
     * bricht die Recognition ab
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _abortRecognition(): number {
        return this._stopRecognition();
    }

}
