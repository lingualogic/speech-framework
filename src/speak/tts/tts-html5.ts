/** @packageDocumentation
 * Hier wird die HTML5-Sprachausgabe implementiert. Ist Speech-Synthesis nicht vorhanden, wird
 * die Komponente in Active Off versetzt.
 *
 * Letzte Aenderung: 21.08.2020
 * Status: gelb
 *
 * @module speak/tts
 * @author SB
 */


// core

import { FactoryManager } from '@speech/core';


// common

import { SpeechSynthesisFactory, SPEECHSYNTHESIS_FACTORY_NAME } from '@speech/common';


// tts

import { TTS_HTML5_NAME, TTS_DEFAULT_LANGUAGE } from './tts-const';
import { TTSPlugin} from './tts-plugin';


// Konstanten

const TTS_BREAK_TIMEOUT = 5000;     // eine Sekunde warten auf Synthesis-Start


/**
 * Die TTSHtml5 Klasse kapselt die HTML5-SpeechSynthese
 */

export class TTSHtml5 extends TTSPlugin {

    /**
     * Fabrik zur Erzeugung der Sprachausgabeobjekte
     * @member {SpeechSynthesisFactory} mSynthesisFactory
     * @private
     */
    mSynthesisFactory: SpeechSynthesisFactory;


    /**
     * Sprachsysnthese Web API
     * @member {SpeechSynthesis} mSynthesis
     * @private
     */
    mSynthesis: any = null;


    /**
     * SpeechSynthesisUtterance-Klasse
     * @member {SpeechSynthesisUtterance} mUtteranceClass
     * @private
     */
    mUtteranceClass: any = null;


    /**
     * SpeechUtteranceObjekt zwischenspeichern, um falscher Garbage Collection
     * vorzubeugen. Sonst gibt es Probleme mit dem speechSynthesis.onend Event.
     */
    mUtterance: any = null;


    /**
     * Timeout fuer fehlende Spracherkennung
     */

    mBreakTimeout = 0;


    /**
     * TTSHtml5 Objekt erzeugen.
     *
     * @param {string} aPluginName - Name des Plugins, fuer den PluginManager
     * @param {boolean} aRegisterFlag - bestimmt, ob Plugin in PluginManager eingetragen wird
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || TTS_HTML5_NAME, aRegisterFlag );
        // console.log('TTSHtml5:', aSynthesisFactory, aPluginName, aRegisterFlag);
        // TODO: muss eventuell nach init verschoben werden
        this.mSynthesisFactory = FactoryManager.get( SPEECHSYNTHESIS_FACTORY_NAME, SpeechSynthesisFactory ) as SpeechSynthesisFactory;
        this.mSynthesisFactory._setErrorOutputFunc( this._getErrorOutputFunc());
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'TTSHtml5';
    }


    // Plugin-Funktionen


    /**
     * Freigabe von TTS
     */

    done(): number {
        // loeschen des Timers
        this._clearBreakTimeout();
        // pruefen auf laufende Spracheingabe
        if ( this.isSpeakRunning() && this.mSynthesis ) {
            try {
                // Sprachausgabe abbrechen
                this.mSynthesis.cancel();
            } catch ( aException ) {
                this._exception( 'done', aException );
            }
        }
        this.mSynthesis = null;
        this.mUtteranceClass = null;
        this.mUtterance = null;
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
        if ( this.mSynthesisFactory ) {
            this.mSynthesisFactory._setErrorOutput( aErrorOutputFlag );
        }
        super._setErrorOutput( aErrorOutputFlag );
    }


    // Timeout-Funktionen


    _breakSynthesis(): void {
        // console.log('TTSHtml5._beakSynthesis: Start Timeout');
        this.mBreakTimeout = 0;
        this._error( '_breakSynthesis', 'Kein SpeechSynthesis-Service vorhanden' );
        this.stopSpeak();
    }


    _setBreakTimeout(): void {
        this.mBreakTimeout = window.setTimeout(() => this._breakSynthesis(), TTS_BREAK_TIMEOUT );
        // console.log('TTSHtml5._setBreakTimeout:', this.mBreakTimeout);
    }


    _clearBreakTimeout(): void {
        // console.log('TTSHtml5._clearBreakTimeout:', this.mBreakTimeout);
        if ( this.mBreakTimeout > 0 ) {
            clearTimeout( this.mBreakTimeout );
            this.mBreakTimeout = 0;
        }
    }


    // Voice-Funktionen


    /**
     * Rueckgabe aller vorhandenen Voice-Namen
     *
     * @return {Array<string>} Liste der Voice-Namen
     */

    getVoiceList(): Array<string> {
        if ( !this.mSynthesis ) {
            this._error( 'getVoiceList', 'keine SpeechSynthesis vorhanden' );
            return [];
        }
        // pruefen auf vorhandene Sprache
        const language = this._getTTSLanguage();
        if ( !language ) {
            this._error( 'getVoiceList', 'keine Sprache vorhanden' );
            return [];
        }
        // console.log('TTSHtml5.getVoiceList: language = ', language);
        // alle Stimmen zur eingestellten Sprache auslesen
        const nameList = [];
        try {
            const voiceList = this.mSynthesis.getVoices();
            // console.log('TTSHtml5.getVoiceList: voiceList = ', voiceList instanceof Array, Array.isArray( voiceList), voiceList);
            // TODO: Workaround
            // nicht alle Implementierungen von SpeechSynthesis liefern ein Array von SpeechSynthesisVoice Objekten
            if ( !Array.isArray( voiceList )) {
                this._error( 'getVoiceList', 'keine Voice-Liste als Array vorhanden' );
                return [];
            }
            // Voice-Filterschleife fuer Language
            for ( let i = 0; i < voiceList.length; i++ ) {
                // console.log('TTSHtml5.getVoiceList: voice = ', voiceList[ i ]);
                if ( voiceList[ i ].lang === language ) {
                    nameList.push( voiceList[ i ].name );
                }
            }
            // console.log('TTSHtml5.getVoiceList: nameList = ', nameList);
            return nameList;
        } catch ( aException ) {
            this._exception( 'getVoiceList', aException );
            return [];
        }
    }


    /**
     * TTS-Stimmobjekt zurueckgeben
     *
     * @param {boolean} aLocalServiceFlag - true, dann soll moeglichst eine lokale Stimme ausgewaehlt werden
     *
     * @return {*} Voice Instanz oder undefined
     */

    _getTTSVoice( aLocalServiceFlag = true ): any {
        if ( !this.mSynthesis ) {
            this._error( '_getTTSVoice', 'keine SpeechSynthesis vorhanden' );
            return undefined;
        }
        // pruefen auf vorhandene Sprache
        const language = this._getTTSLanguage();
        if ( !language ) {
            this._error( '_getTTSVoice', 'keine Sprache vorhanden' );
            return undefined;
        }
        // Stimme auswaehlen
        const voice = this.getVoice();
        try {
            const voiceList = this.mSynthesis.getVoices();
            // console.log('TTSHtml5._getTTSVoice: voiceList = ', voiceList instanceof Array, Array.isArray( voiceList), voiceList);
            // TODO: Workaround
            // nicht alle Implementierungen von SpeechSynthesis liefern ein Array von SpeechSynthesisVoice Objekten
            if ( !Array.isArray( voiceList )) {
                this._error( '_getTTSVoice', 'keine Voice-Liste als Array vorhanden' );
                return undefined;
            }
            if ( voice ) {
                // festgelegte Stimme auslesen
                for ( let i = 0; i < voiceList.length; i++ ) {
                    // console.log('TTSHtml5._getTTSVoice: voice = ', voiceList[ i ]);
                    if ( voiceList[ i ].name === voice ) {
                        return voiceList[ i ];
                    }
                }
            }
            // Defaultstimme zur eingestellten Sprache auslesen
            let firstVoice;
            let defaultVoice;
            for ( let i = 0; i < voiceList.length; i++ ) {
                // console.log('TTSHtml5._getTTSVoice: voice = ', voiceList[ i ]);
                if ( voiceList[ i ].lang === language ) {
                    // pruefen auf erste gefundene Stimme
                    if ( !firstVoice && voiceList[ i ].localService === aLocalServiceFlag ) {
                        firstVoice = voiceList[ i ];
                    }
                    // pruefen auf Defaultstimme
                    if ( voiceList[ i ].default ) {
                        defaultVoice = voiceList[ i ];
                        if ( voiceList[ i ].localService === aLocalServiceFlag ) {
                            return defaultVoice;
                        }
                    }
                }
            }
            // erste Stimme zurueckgeben, wenn vorhanden
            if ( firstVoice ) {
                return firstVoice;
            }
            // sonst Defaultstimme zurueckgeben
            return defaultVoice;
        } catch ( aException ) {
            this._exception( '_getTTSVoice', aException );
            return undefined;
        }
    }


    // Synthese-Funktionen


    /**
     * Feststellen, ob HTML5 SpeechSynthesis API vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn SpeechSynthesis existiert, false sonst
     */

    _detectSynthesis(): boolean {
        // console.log('TTSHtml5._detectSynthesis: window.Utterance=', window.SpeechSynthesisUtterance);
        // console.log('TTSHtml5._detectSynthesis: window.Synthese=', window.speechSynthesis);

        // pruefen auf Fabrik

        if ( !this.mSynthesisFactory ) {
            this._error( '_detectSynthesis', 'keine SpeechSynthesis-Fabrik vorhanden' );
            return false;
        }

        try {
            this.mSynthesis = this.mSynthesisFactory.getSpeechSynthesis();
            this.mUtteranceClass = this.mSynthesisFactory.getSpeechSynthesisUtteranceClass();
        } catch (aException) {
            this._exception( '_detectSynthesis', aException );
            return false;
        }

        // console.log('TTSHtml5._detectSynthesis: Synthese=', this.speechSynthesis);
        if ( this.mSynthesis === null ) {
            this._error( '_detectSynthesis', 'Kein HTML5 SpeechSynthesis API vorhanden' );
            return false;
        }

        // console.log('TTSHtml5._detectSynthesis: Utterance=', this.SpeechSynthesisUtterance);
        if ( this.mUtteranceClass === null ) {
            this._error( '_detectSynthesis', 'Kein HTML5 SpeechSynthesisUtterance API vorhanden' );
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
        return this._onInit();
    }


    /**
     * Erzeugen der Synthese
     *
     * @protected
     * @param {string} aText - zu synthetisiernder Text
     *
     * @return {number} Fehlercode 0 oder -1
     */

    _createSynthesis( aText: string ): number {
        try {
            // console.log('TTSHtml5._createSynthesis: UtteranceClass = ', this.mUtteranceClass);
            this.mUtterance = new this.mUtteranceClass( aText );
            // console.log('TTSHtml5._createSynthesis: Utterance = ', this.mUtterance);
            this.mUtterance.lang = this._getTTSLanguage();
            this.mUtterance.voice = this._getTTSVoice();

            // Synthese-Ereignisfunktionen eintragen

            this.mUtterance.onstart = () => { 
                // console.log('TTSHtml5.onstart');
                this._clearBreakTimeout();
                this._onSynthesisStart();
            }

            this.mUtterance.onend = () => { 
                // console.log('TTSHtml5.onend');
                this._onSynthesisEnd();
            }

            this.mUtterance.onerror = (aEvent: any) => {
                // console.log('TTSHtml5.onerror:', aEvent);
                this._clearBreakTimeout();
                // TODO: besimmte Fehler ausfiltern fuer macOS-Safari
                if ( aEvent.type && aEvent.type === 'error' && ( !aEvent.error || aEvent.error === 'canceled' || aEvent.error === 'interrupted' )) {
                    // keine Fehlerausgabe
                    return;
                } 
                this._onSynthesisError( aEvent );
            }
            
            return 0;
        } catch ( aException ) {
            // console.log('TTSHtml5._createSynthesis: Exception ', aException);
            this._exception( '_createSynthesis', aException );
            return -1;
        }
    }


    /**
     * pruefen auf vorhandene Synthese
     *
     * @returns {boolean} True, wenn Synthese vorhanden ist, False sonst
     */

    _isSynthesis(): boolean {
        if ( this.mSynthesis ) {
            return true;
        }
        return false;
    }


    /**
     * startet die Synthese
     *
     * @protected
     * @returns {number} Fehlercode 0 oder -1
     */

    _startSynthesis( aText: string ): number {
        // console.log('TTSHtml5._startSynthesis: Synthesis = ', this.mSynthesis, this.mUtterance);
        if ( this.mSynthesis && this.mUtterance ) {
            this._setBreakTimeout();
            try {
                this.mSynthesis.cancel();
                // console.log('TTSHtml5._startSynthesis: speak');
                this.mSynthesis.speak( this.mUtterance );
            } catch ( aException ) {
                // nichts zu tun
            }
            return 0;
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
        // console.log('TTSHtml5._stopSynthesis');
        if ( this.mSynthesis ) {
            this._clearBreakTimeout();
            try {
                this.mSynthesis.cancel();
            } catch ( aException ) {
                // nichts zu tun
            }
            return 0;
        }
        return -1;
    }


    /**
     * Leere Sprachausgabe zum Testen und Aktivieren
     * Wird fuer iOS Safari benoetigt, um die Sprachausgabe zu aktivieren.
     */

    _probeSynthesis(): number {
        // console.log('TTSHtml5._probeSynthesis: start', this.mUtteranceClass, this.mSynthesis);
        try {
            if ( !this.mUtteranceClass ) {
                this._error( '_probeSynthesis', 'Kein HTML5 SpeechSynthesisUtterance API vorhanden' );
                return -1;
            }

            const utterance = new this.mUtteranceClass( '' );
            if ( !utterance ) {
                this._error( '_probeSynthesis', 'Kein Utterance erzeugt' );
                return -1;
            }

            utterance.lang = this._getTTSLanguage();
            utterance.voice = this._getTTSVoice();

            // Synthese-Ereignisfunktionen eintragen

            utterance.onstart = () => { 
                // console.log('TTSHtml5._probeSynthesis: onstart');
                this._clearBreakTimeout();
            }

            utterance.onend = () => { 
                // console.log('TTSHtml5._probeSynthesis: onend');
                this._clearBreakTimeout();
            }

            utterance.onerror = (aEvent: any) => {
                // console.log('TTSHtml5._probeSynthesis: onerror:', aEvent);
                this._clearBreakTimeout();
                if ( aEvent.error === 'synthesis-failed') {
                    // keine Fehlermeldung, tritt in Chrome auf, wegen leerem String
                    return;
                }
                // TODO: die Frage ist, ob der Fehler generell nicht zurueckgegeben wird
                // this._onSynthesisError( aEvent );
            }

            if ( this.mSynthesis ) {
                this._setBreakTimeout();
                try {
                    this.mSynthesis.cancel();
                    // console.log('TTSHtml5._probeSynthesis: start Synthesis');
                    this.mSynthesis.speak( utterance );
                } catch ( aException ) {
                    // nichts zu tun
                }
            }

            return 0;
        } catch ( aException ) {
            // console.log('TTSHtml5._probeSynthesis: Exception ', aException);
            this._exception( '_probeSynthesis', aException );
            return -1;
        }
    }

}
