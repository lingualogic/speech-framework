/**
 * Diese Komponente dient der Spracherkennung mit Hilfe von SpeechRecognition aus HTML5
 * Funktioniert zur Zeit nur in Chrome. Ist Speech-Recognition nicht vorhanden, wird
 * die Komponente in Active Off versetzt.
 *
 * Letzte Aenderung: 01.12.2018
 * Status: rot
 *
 * @module intent/nlu
 * @author SB
 */


// core

import { FactoryManager } from './../../core/factory/factory-manager';


// common

import { SPEECHRECOGNITION_FACTORY_NAME, SpeechRecognitionFactory } from './../../common/html5/speechrecognition-factory';


// nlu

import { NLU_HTML5_NAME } from './nlu-const';
import { NLUPlugin} from './nlu-plugin';


// TODO: Eine Grammatik ist im Moment noch nicht implementiert

// Grammatik-Werte

const colors = ['rot', 'blau', 'grün', 'gelb', 'schwarz', 'weiss', 'braun'];
const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;';


/**
 * Diese Klasse kapselt die HTML5-Spracheingabe
 */

export class NLUHtml5 extends NLUPlugin {

    /**
     * Fabrik zur Erzeugung der Spracheingabeobjekte
     * @member {SpeechRecognitionFactory} mRecognitionFactory
     * @private
     */
    mRecognitionFactory: SpeechRecognitionFactory = null;


    /**
     * SpeechRecognition-Klasse
     * @member {SpeechRecognition} mRecognitionClass
     * @private
     */
    mRecognitionClass: any = null;


    /**
     * SpeechGrammarList-Klasse (optional)
     * @member {SpeechGrammarList} mGrammarListClass
     * @private
     */
    mGrammarListClass: any = null;


    // Recognition-Attribute


    /**
     * Spracherkennung Grammatikliste
     * @member {SpeechGrammarList} mGrammarList
     * @private
     */
    mGrammarList: any = null;


    /**
     * Spracherkennung HTML5
     * @member {SpeechRecognition} mRecognition
     * @private
     */
    mRecognition: any = null;


    /**
     * NLUHtml5 Objekt erzeugen
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || NLU_HTML5_NAME, aRegisterFlag );
        // console.log('NLUHtml5:', aSpeechRecognitionFactory, aPluginName, aRegisterFlag);
        // TODO: muss eventuell nach init verschoben werden
        this.mRecognitionFactory = FactoryManager.get( SPEECHRECOGNITION_FACTORY_NAME, SpeechRecognitionFactory ) as SpeechRecognitionFactory;
        this.mRecognitionFactory._setErrorOutputFunc( this._getErrorOutputFunc());
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'NLUHtml5';
    }


    // Plugin-Funktionen


    /**
     * Freigabe der Komponente
     */

    done(): number {
        // pruefen auf laufende Spracheingabe

        if ( this.isListenRunning() && this.mRecognition ) {
            try {
                // Spracheingabe abbrechen
                this.mRecognition.abort();
            } catch ( aException ) {
                this._exception( 'done', aException );
            }
        }
        this.mRecognitionClass = null;
        this.mGrammarListClass = null;
        this.mGrammarList = null;
        this.mRecognition = null;
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
        if ( this.mRecognitionFactory ) {
            this.mRecognitionFactory._setErrorOutput( aErrorOutputFlag );
        }
        super._setErrorOutput( aErrorOutputFlag );
    }


    // Recognition-Funktionen


    /**
     * Feststellen, ob HTML5 SpeechRecognition API vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn SpeechRecognition existiert, false sonst
     */

    _detectRecognition(): boolean {
        // pruefen auf Fabrik

        if ( !this.mRecognitionFactory ) {
            this._error( '_detectRecognition', 'keine Recognition-Fabrik vorhanden' );
            return false;
        }

        // auslesen der SpeechRecognition-Klassen, wenn vorhanden

        try {
            this.mRecognitionClass = this.mRecognitionFactory.getSpeechRecognitionClass();
            // this.mGrammarListClass = this.mRecognitionFactory.getSpeechGrammarListClass();
        } catch (aException) {
            this._exception( '_detectRecognition', aException );
            return false;
        }

        // pruefen auf vorhandene Spracherkennung in HTML5

        if ( this.mRecognitionClass === null ) {
            this._error( '_detectRecognition', 'Kein HTML5 SpeechRecognition API vorhanden' );
            return false;
        }

        /****
        if ( this.mGrammarListClass === null ) {
            this._error( '_detectRecognition', 'Kein HTML5 SpeechGrammarList API vorhanden' );
            return false;
        }
        ****/

        return true;
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
        // Grammatik eintragen

        // TODO: Grammatik ist noch nicht eingebaut
        /****
        try {
            this.mGrammarList = new this.mGrammarListClass();
            this.mGrammarList.addFromString( grammar, 1 );
        } catch ( aException ) {
            // TODO: Anstelle eines Fehlers wird hier 0 zurueckgegeben,
            //       die Komponente aber auf Active Off gesetzt
            this.setActiveOff();
            this._exception( 'init', aException );
            return -1;
        }
        ****/

        // Recognition eintragen

        try {
            this.mRecognition = new this.mRecognitionClass();
            // Hier erfolgen die Einstellungen fuer die Recognition
            this.mRecognition.lang = this._getNLULanguage();
            this.mRecognition.continuous = false;             // kein kontinuierliches sprechen
            this.mRecognition.interimResults = false;         // keine Zwischenergebnisse
            this.mRecognition.maxAlternatives = 1;            // nur eine Alternative zurueckgeben
            // TODO: Eine Grammatik ist im Moment nicht implementiert
            // this.mRecognition.grammar = this.mGrammarList;
        } catch ( aException ) {
            this._exception( '_initRecognition', aException );
            return -1;
        }

        // Recognition-Ereignisfunktionen eintragen

        this.mRecognition.onstart = () => this._onRecognitionStart();
        this.mRecognition.onend = () => this._onRecognitionEnd();
        this.mRecognition.onspeechstart = () => this._onRecognitionSpeechStart();
        this.mRecognition.onspeechend = () => this._onRecognitionSpeechEnd();
        this.mRecognition.onresult = (aEvent: any) => this._onRecognitionResult( aEvent );
        this.mRecognition.onnomatch = (aEvent: any) => this._onRecognitionNoMatch( aEvent );
        this.mRecognition.onerror = (aEvent: any) => this._onRecognitionError( aEvent );

        return 0;
    }


    /**
     * pruefen auf vorhandene Recognition
     *
     * @returns {boolean}
     * @memberof ASRPlugin
     */

    _isRecognition(): boolean {
        if ( this.mRecognition ) {
            return true;
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
        return aEvent.results[0][0].transcript;
    }


    /**
     * statet die Recognition
     *
     * @protected
     * @returns {number}
     */

    _startRecognition(): number {
        if ( this.mRecognition ) {
            this.mRecognition.lang = this._getNLULanguage();
            this.mRecognition.abort();
            this.mRecognition.start();
            return 0;
        }
        return -1;
    }


    /**
     * stoppt die Recognition
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _stopRecognition(): number {
        if ( this.mRecognition ) {
            this.mRecognition.stop();
            return 0;
        }
        return -1;
    }


    /**
     * bricht die Recognition ab
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _abortRecognition(): number {
        if ( this.mRecognition ) {
            this.mRecognition.abort();
            return 0;
        }
        return -1;
    }


    // Test-Funktionen


    /**
     * Fuehrt Testkommandos aus, um interne Tests ablaufen lassen zu koennen
     *
     * Kommandos:       'say', { sayText: 'zurueckzugebender Text fuer ListenResult' }
     *
     * @param {string} aTestCommand - Testkommando
     * @param {*} aTestData - optionale Testdaten
     *
     * @return {*} Rueckgabe der Testergebnisse { result: 0 }
     */

    test( aTestCommand: string, aTestData?: any ): any {
        let sayText = '';
        let result = -1;
        let errorText = '';
        switch ( aTestCommand ) {
            /*
             * say-Kommando dient zum Ausfuehren von say() auf dem Corti-Mock, um SpeechRecognition zu simulieren
             */
            case 'say':
                // Text fuer Test auslesen
                if ( aTestData && aTestData.sayText ) {
                    sayText = aTestData.sayText;
                }
                // Kommando nur im Corti-Mock ausfuehren
                if ( this.mRecognition && typeof this.mRecognition.say === 'function' ) {
                    // console.log('ASRHtml5.test: say = ', sayText);
                    this.mRecognition.say( sayText );
                    result = 0;
                } else {
                    errorText = 'Kein Corti-Mock von SpeechRecognition vorhanden';
                }
                break;

            default:
                errorText = 'kein gueltiges Testkommando uebergeben';
                break;
        }
        return { result, errorText };
    }

}
