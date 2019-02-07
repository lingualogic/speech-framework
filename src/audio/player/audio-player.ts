/**
 * Diese Komponente spielt die Audio-Dateien ab
 *
 * Letzte Aenderung: 30.01.2019
 * Status: rot
 *
 * @module audio/player
 * @author SB
 */


// TODO: AudioPlayer mit AudioHtml5Reader komplett umbauen

// core

import { FactoryManager } from './../../core/factory/factory-manager';
import { Plugin } from './../../core/plugin/plugin';


// common

import { AudioContextFactory, AUDIOCONTEXT_FACTORY_NAME } from './../../common/html5/audiocontext-factory';
import { XMLHttpRequestFactory, XMLHTTPREQUEST_FACTORY_NAME } from './../../common/html5/xmlhttprequest-factory';


// audio

import { AUDIOPLAYER_PLUGIN_NAME, AUDIO_MP3_FORMAT, AUDIO_WAV_FORMAT, AUDIO_DEFAULT_FORMAT } from '../audio-const';
import { AudioPlayerInterface, AudioPlayFunc, AudioStopFunc, OnAudioStartFunc, OnAudioStopFunc, OnAudioUnlockFunc } from './audio-player.interface';


/**
 * Die AudioPlayer Klasse kapselt das Audio Web-API von HTML5
 */

export class AudioPlayer extends Plugin implements AudioPlayerInterface {

    /**
     * AudioContext-Klasse aus HTML5-WebAPI
     * @member {Object} mAudioContextClass
     * @private
     */
    mAudioContextClass: typeof AudioContext = null;

    /**
     * AudioContext fuer die Verwaltung aller Audiodaten
     * @member {Object} mAudioContext
     * @private
     */
    mAudioContext: AudioContext = null;

    /**
     * AudioFormat MP3 oder WAV
     * @member {Object} mAudioFormat ('mp3', 'wav')
     * @private
     */
    mAudioFormat = AUDIO_DEFAULT_FORMAT;

    /**
     * Zwischenspeicher fuer die Audiodaten
     * @member {Object} mAudioBuffer
     * @private
     */
    // TODO: AudioBuffer existiert in den Tests nicht, deshalb any
    mAudioBuffer: any = null;

    /**
     * XMLHttpRequest fuer das einlesen der Audiodaten
     * @member {Object} mXMLHttpRequestClass
     * @private
     */
    mXMLHttpRequestClass: typeof XMLHttpRequest | null = null;

    /**
     * Request fuer das einlesen der Audiodaten
     * @member {Object} mRequest
     * @private
     */
    mRequest: any = null;

    /**
     * Zwischenspeicher fuer Audiobuffer
     * @member {Object} mSource
     * @private
     */
    mSource: any = null;

    /**
     * Flag fuer Audio laden, dass ein Ladevorgang eines Audiofiles laeuft
     * @member {boolean} mAudioLoadFlag
     * @private
     */
    mAudioLoadFlag = false;

    /**
     * Flag fuer Anzeige, dass eine Ausgabe laeuft
     * @member {boolean} mAudioPlayFlag
     * @private
     */
    mAudioPlayFlag = false;

    /**
     * Flag fuer Abbruch, dass eine Ausgabe laeuft.
     * @member {boolean} mAudioCancelFlag
     * @private
     */
    mAudioCancelFlag = false;

    // Events

    mOnAudioStartFunc: OnAudioStartFunc = null;
    mOnAudioStopFunc: OnAudioStopFunc = null;
    mOnAudioUnlockFunc: OnAudioUnlockFunc = null;


    /**
     * Audio Objekt erzeugen
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {boolean} aRegisterFlag - true, wenn Port in PortManager eingetragen werden soll
     */

    constructor( aPluginName?: string, aRegisterFlag = true ) {
        super( aPluginName || AUDIOPLAYER_PLUGIN_NAME, aRegisterFlag );
    }


    /**
     * Rueckgabe eines logischen Plugin-Typs
     *
     * @return {string} pluginType - logischer Typ des Plugins fuer unterschiedliche Anwendungsschnittstellen
     */

    getType(): string {
        return 'AudioPlayer';
    }


    getClass(): string {
        return 'AudioPlayer';
    }


    // Plugin-Funktionen


    /**
     * Feststellen, ob HTML5 AudioContext WebAPI vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn AudioContext existiert, false sonst
     */

    _detectAudioContext(): boolean {
        // pruefen auf Fabrik

        const audioContextFactory = FactoryManager.get( AUDIOCONTEXT_FACTORY_NAME, AudioContextFactory );
        if ( !audioContextFactory ) {
            this._error( '_detectAudioContext', 'keine AudioContext-Fabrik vorhanden' );
            return false;
        }

        // Audiokontext auslesen

        this.mAudioContextClass = audioContextFactory.create();
        if ( this.mAudioContextClass === null ) {
            this._error( '_detectAudioContext', 'kein AudioContext vorhanden' );
            return false;
        }

        return true;
    }


    /**
     * Feststellen, ob HTML5 XMLHttpRequest vorhanden ist
     *
     * @private
     * @return {boolean} true, wenn XMLHttpContext existiert, false sonst
     */

    _detectXMLHttpRequest(): boolean {
        // console.log('Audio._detectXMLHttpRequest:', window.XMLHttpRequest);
        // pruefen auf Fabrik

        const xmlHttpRequestFactory = FactoryManager.get( XMLHTTPREQUEST_FACTORY_NAME, XMLHttpRequestFactory );
        if ( !xmlHttpRequestFactory ) {
            this._error( '_detectXMLHttpRequest', 'keine XMLHttpRequest-Fabrik vorhanden' );
            return false;
        }

        // XMLHttpRequest auslesen

        this.mXMLHttpRequestClass = xmlHttpRequestFactory.create();
        if ( this.mXMLHttpRequestClass === null ) {
            this._error( '_detectXMLHttpRequest', 'kein XMLHttpRequest vorhanden' );
            return false;
        }

        return true;
    }


    /**
     * Initialisierung von SpeechAudio. Wird der globale AudioContext uebergeben,
     * wird kein interner AudioContext erzeugt.
     *
     * @param {any} [aOption] - optionale parameter { audioContext: AudioContext, audioFormat: string }
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        // pruefen auf doppelte Initialisierung

        if ( this.isInit()) {
            this._error( 'init', 'init doppelt aufgerufen' );
            return -1;
        }

        // console.log('TTSPlugin.init: erfolgreich');
        if ( super.init( aOption ) !== 0 ) {
            return -1;
        }

        // pruefen auf vorhandenen XMLHttpRequest in HTML5

        if ( !this._detectXMLHttpRequest()) {
            // TODO: Anstelle eines Fehlers wird hier 0 zurueckgegeben,
            //       die Komponente aber auf Active Off gesetzt
            this.setActiveOff();
            return 0;
        }

        // pruefen auf Audio-Format

        if ( aOption && aOption.audioFormat ) {
            // hier wird das AudioFormat von aussen eingetragen
            this.setAudioFormat( aOption.audioFormat );
        }

        // pruefen auf globalen AudioContext in den Optionen

        if ( aOption && aOption.audioContext ) {
            // hier wird der globale AudioContext von aussen eingefuegt,
            // es wird kein eigerner AudioContext erzeugt.
            this.mAudioContext = aOption.audioContext;
        } else {
            // pruefen auf vorhandenen AudioContext in HTML5

            if ( !this._detectAudioContext()) {
                // TODO: Anstelle eines Fehlers wird hier 0 zurueckgegeben,
                //       die Komponente aber auf Active Off gesetzt
                this.setActiveOff();
                return 0;
            }

            // AudioContext dauerhaft erzeugen

            try {
                if ( !this.mAudioContextClass ) {
                    super._clearInit();
                    return -1;
                }
                this.mAudioContext = new this.mAudioContextClass();
                this.mAudioContext.onstatechange = () => {
                    if ( this.mAudioContext ) {
                        // console.log('AudioPlayer.init: onstatechange', this.mAudioContext.state);
                    }
                };
            } catch ( aException ) {
                this._closeAudioContext();
                this._exception( 'init', aException );
                super._clearInit();
                return -1;
            }
        }

        // AudioContext Aenderungsevent eintragen

        try {
            if ( this.mAudioContext ) {
                this.mAudioContext.onstatechange = () => {
                    this._onAudioUnlock();
                }
            }
        } catch ( aException ) {
            this._exception( 'init', aException );
        }

        // Audio initialisiert

        return 0;
    }


    /**
     * Freigabe der Komponente
     */

    done(): number {
        if ( this.isInit()) {
            this.stop();
        }
        // Freigabe des AudioContext
        this._closeAudioContext();
        this.mAudioContext = null;
        this.mAudioContextClass = null;
        this.mAudioFormat = AUDIO_DEFAULT_FORMAT;
        this.mXMLHttpRequestClass = null;
        this.mRequest = null;
        this.mSource = null;
        this.mAudioBuffer = null;
        this.mAudioContext = null;
        this.mAudioLoadFlag = false;
        this.mAudioPlayFlag = false;
        this.mAudioCancelFlag = false;
        this.mOnAudioStartFunc = null;
        this.mOnAudioStopFunc = null;
        this.mOnAudioUnlockFunc = null;
        return super.done();
    }


    /**
     * pruefen auf aktive Komponente. Komponente ist nur aktiv, wenn HTML5 AudioContext
     * vorhanden ist. Ansonsten ist die Komponente immer deaktiv.
     *
     * @return {boolean} Rueckgabe, ob Kompponente aktiv ist
     */

    isActive(): boolean {
        // pruefen auf vorhandenen AudioContext
        if ( !this.mAudioContext ) {
            return false;
        }
        return super.isActive();
    }


    /**
     * Einschalten der Komponente, wenn AudioContext vorhanden ist.
     * Ansonsten ist die Komponente nicht einschaltbar.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActiveOn(): number {
        // pruefen auf vorhandenen AudioContext
        if ( !this.mAudioContext ) {
            return -1;
        }
        return super.setActiveOn();
    }


    /**
     * Freigabe des Audio-Kontextes
     *
     * @private
     */

    _closeAudioContext(): void {
        // Kommentar: nur wenn der AudioContext SpeechAudio gehoert,
        //      darf er auch freigegeben werden. Dies wird durch die Initialsierung
        //      von AudioContext angezeigt.

        if ( this.mAudioContext ) {
            this.mAudioContext.onstatechange = undefined;
        }
        // pruefen auf eigenen Audiokontext
        if ( this.mAudioContextClass ) {
            // Audio-Kontext muss freigegeben werden
            if ( this.mAudioContext ) {
                try {
                    this.mAudioContext.close();
                } catch ( aException ) {
                    this._exception( '_closeAudioContext', aException );
                }
            }
            this.mAudioContext = null;
        } 
    }


    // Event-Funktionen


    _onAudioStart(): number {
        // console.log('AudioPlayer._onAudioStart');
        if ( typeof this.mOnAudioStartFunc === 'function' ) {
            try {
                // console.log('AudioPlayer._onAudioStart: funktion ausfuehren', this.mOnAudioStartFunc);
                return this.mOnAudioStartFunc();
            } catch ( aException ) {
                this._exception( '_onAudioStart', aException );
                return -1;
            }
        }
        return 0;
    }


    _onAudioStop(): number {
        // console.log('AudioPlayer._onAudioStop');
        if ( typeof this.mOnAudioStopFunc === 'function' ) {
            try {
                // console.log('AudioPlayer._onAudioStop: funktion ausfuehren', this.mOnAudioStopFunc);
                return this.mOnAudioStopFunc();
            } catch ( aException ) {
                this._exception( '_onAudioStop', aException );
                return -1;
            }
        }
        return 0;
    }


    _onAudioUnlock(): number {
        // console.log('AudioPlayer._onAudioUnlock');
        if ( typeof this.mOnAudioUnlockFunc === 'function' ) {
            try {
                // console.log('AudioPlayer._onAudioUnlock: funktion ausfuehren', this.mOnAudioUnlockFunc);
                return this.mOnAudioUnlockFunc( this.mAudioContext.state );
            } catch ( aException ) {
                this._exception( '_onAudioUnlock', aException );
                return -1;
            }
        }
        return 0;
    }


    set onAudioStart( aOnAudioStartFunc: OnAudioStartFunc ) {
        this.mOnAudioStartFunc = aOnAudioStartFunc;
    }


    set onAudioStop( aOnAudioStopFunc: OnAudioStopFunc ) {
        this.mOnAudioStopFunc = aOnAudioStopFunc;
    }


    set onAudioUnlock( aOnAudioUnlockFunc: OnAudioUnlockFunc ) {
        this.mOnAudioUnlockFunc = aOnAudioUnlockFunc;
    }


    // Audio-Funktionen


    /**
     * Rueckgabe des globalen AudioContext
     *
     * @return {AudioContext} - audioContext - globaler AudioContext
     */

    getAudioContext(): AudioContext {
        return this.mAudioContext;
    }


    /**
     * Versuch, AudioContext zu entsperren
     */

    unlockAudio(): void {
        if ( this.mAudioContext ) {
            if ( this.mAudioContext.state === 'suspended' ) {
                this.mAudioContext.resume().then(() => {
                    this._onAudioUnlock();
                }, (aError: any) => {
                    console.log('AudioPlayer.unlockAudioContext:', aError)
                    this._onAudioUnlock();
                });
            }
        }
    }


    /**
     * Pruefen, ob AudioContext entsperrt ist
     */

    isUnlockAudio(): boolean {
        console.log('AudioPlayer.isUnlockAudio:', this.mAudioContext);
        if ( this.mAudioContext ) {
            console.log('AudioPlayer.isUnlockAudio: state = ', this.mAudioContext.state);
            if ( this.mAudioContext.state === 'running' ) {
                return true;
            } 
        }
        return false;
    }


    /**
     * Eintragen des AudioFormats
     *
     * @param {string} aAudioFormat -audioFormat 'mp3' oder 'wav'
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setAudioFormat( aAudioFormat: string ): number {
        if ( aAudioFormat !== AUDIO_MP3_FORMAT && aAudioFormat !== AUDIO_WAV_FORMAT ) {
            this._error('setAudioFormat', 'kein gueltiges Audioformat uebergeben: ' + aAudioFormat);
            return -1;
        }
        this.mAudioFormat = aAudioFormat;
        return 0;
    }


    /**
     * Rueckgabe des eingestellten AudioFormats
     *
     * @return {string} -audioFormat 'mp3' oder 'wav'
     */

    getAudioFormat(): string {
        return this.mAudioFormat;
    }


    /**
     * Wenn ein Audiofile geladen wird
     *
     * @return {boolean} true, wenn Audiofile gerade geladen wird.
     */

    isLoad(): boolean {
        return this.mAudioLoadFlag;
    }


    /**
     * Wenn ein Audiofile abgespielt wird
     *
     * @return {boolean} true, wenn Audio gerade abgespielt wird.
     */

    isPlay(): boolean {
        return this.mAudioPlayFlag;
    }


    /**
     * Wenn ein Audio abgebrochen wird
     *
     * @return {boolean} true, wenn Audio gerade abgebrochen wird.
     */

    isCancel(): boolean {
        const cancelFlag = this.mAudioCancelFlag;
        this.mAudioCancelFlag = false;
        return cancelFlag;
    }


    /**
     * Abbruch des Ladevorgangs setzen
     */

    _cancel(): void {
        if ( this.isLoad()) {
            this.mAudioCancelFlag = true;
        }
    }


    /**
     * interne Ladefunktion fuer Audiodateien
     *
     * @private
     * @param {string} aUrl - URL der Audiodatei
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    _loadAudioFile( aUrl: string ): number {
        console.log('AudioPlayer._loadAudioFile:', aUrl);
        if ( !this.mXMLHttpRequestClass ) {
            this._error( '_loadAudioFile', 'keine XMLHttpRequest Klasse' );
            return -1;
        }
        try {
            this.mAudioLoadFlag = true;
            this.mRequest = new this.mXMLHttpRequestClass();
            // TODO: Welches Protokoll muss hier eingetragen werden ?
            // request.open('GET', 'file://' + aUrl, true);
            this.mRequest.open('GET', aUrl, true);
            this.mRequest.responseType = 'arraybuffer';

            const request = this.mRequest;

            // Decode asynchronously

            this.mRequest.onload = () => {
                this._decodeAudio();
                // TODO: Hier muss ein onLoad Event hin
            };

            this.mRequest.onloadend = () => {
                if ( request.status === 404 ) {
                    this._error( '_requestDialogFile', 'Error 404' );
                }
            };

            this.mRequest.onerror = ( aError: any ) => {
                // TODOE: muss in Fehlerbehandlung uebertragen werden
                // console.log('AudioPlayer._loadAudioFile: onerror', aError);
                this.mAudioLoadFlag = false;
                this._onError(aError);
            };

            this.mRequest.onabord = ( aEvent: any ) => {
                // TODOE: muss in Fehlerbehandlung uebertragen werden
                console.log('AudioPlayer._loadAudioFile: onabord', aEvent);
                this.mAudioLoadFlag = false;
            };

            this.mRequest.send();
            return 0;
        } catch (aException) {
            this._exception( '_loadAudioFile', aException );
            this.mAudioLoadFlag = false;
            return -1;
        }
    }


    /**
     * Dekodieren der Audiodaten
     *
     * @private
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    _decodeAudio(): number {
        console.log('AudioPlayer._decodeAudio');
        if ( !this.isInit()) {
            this._error( '_decodeAudio', 'nicht initialisiert' );
            return -1;
        }
        // pruefen auf Abbruch
        if ( this.isCancel()) {
            this.mAudioLoadFlag = false;
            return 0;
        }
        if ( !this.mAudioContext ) {
            this._error( '_decodeAudio', 'kein AudioContext vorhanden' );
            return -1;
        }
        try {
            this.mAudioContext.decodeAudioData( this.mRequest.response, (aBuffer: AudioBuffer) => {
                console.log('AudioPlayer._decodeAudio: decodeAudioData start', aBuffer);
                this.mAudioBuffer = aBuffer;
                this._playStart();
                // console.log('AudioPlayer._decodeAudio: decodeAudioData end');
            }, (aError: any) => {
                // TODO: muss in Fehlerbehandlung uebertragen werden
                // console.log('AudioPlayer._decodeAudio:', aError);
                this._error('_decodeAudio', 'DOMException');
                this.mAudioLoadFlag = false;
            });
            return 0;
        } catch (aException) {
            this._exception( '_decodeAudio', aException );
            this.mAudioLoadFlag = false;
            return -1;
        }
    }


    /**
     * Start der Audioausgabe
     *
     * @private
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    _playStart(): number {
        console.log('AudioPlayer._playStart');
        if ( !this.mAudioBuffer ) {
            return -1;
        }
        // pruefen auf Abbruch
        if ( this.isCancel()) {
            this.mAudioLoadFlag = false;
            return 0;
        }
        if ( !this.mAudioContext ) {
            this._error( '_playStart', 'kein AudioContext vorhanden' );
            return -1;
        }
        // Create two sources and play them both together.
        try {
            this.mAudioPlayFlag = true;
            this.mAudioLoadFlag = false;
            this.mAudioCancelFlag = false;
            this.mSource = this.mAudioContext.createBufferSource();
            // Ende-Event
            this.mSource.onended = () => {
                // TODO: hier muss ein Ende-Event fuer Audio-Ende eingebaut werden
                console.log('AudioPlayer._playStart: onended');
                if ( this.isPlay()) {
                    this.mAudioPlayFlag = false;
                    this._onAudioStop();
                }
            };
            this.mSource.buffer = this.mAudioBuffer;
            this.mSource.connect( this.mAudioContext.destination );
            console.log('AudioPlayer._playStart: ', this.mSource, this.mAudioContext.state);
            if ( this.mSource.start ) {
                this.mSource.start( 0 );
            } else {
                this.mSource.noteOn( 0 );
            }
            this._onAudioStart();
            return 0;
        } catch (aException) {
            this._exception( '_playStart', aException );
            this.mAudioPlayFlag = false;
            return -1;
        }
    }


    /**
     * Audiodatei abspielen
     *
     * @param {string} aAudioFilePath - Pfad fuer die Audiodatei
     * @param {number} aAudioId       - Identifer des zugehoerigen Satzes
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    play( aAudioFilePath: string, aAudioId: string ): number {
        this.unlockAudio();
        // console.log('AudioPlayer.play:', aAudioFilePath, aAudioId);
        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('AudioPlayer.play: AudioPlayer ist nicht aktiv');
            }
            return 0;
        }
        // pruefen ob ein anderes Audio abgespielt wird
        if ( this.isLoad() || this.isPlay()) {
            // console.log('AudioPlayer.play: laden abbrechen');
            // laden abbrechen
            this._cancel();
            // Audioausgabe stoppen
            this.stop();
        }
        try {
            let filePath = './';
            if ( aAudioFilePath ) {
                filePath = aAudioFilePath;
            }
            const fileName = filePath + aAudioId + '.' + this.mAudioFormat;
            this.mSource = null;
            this.mAudioBuffer = null;
            // pruefen, ob AudioContext nicht gespeert ist
            if ( this.mAudioContext.state === 'suspended' ) {
                this._error( 'playFile', 'AudioContext ist nicht entsperrt' );
                this._onAudioStop();
                return -1;
            }
            return this._loadAudioFile( fileName );
        } catch (aException) {
            this._exception( 'play', aException );
            return -1;
        }
    }


    /**
     * Audiodatei abspielen
     *
     * @param {string} aFileName - abzuspieldende Audiodatei
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    playFile( aFileName: string ): number {
        console.log('AudioPlayer.playFile:', aFileName);
        this.unlockAudio();
        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('AudioPlayer.playFile: AudioPlayer ist nicht aktiv');
            }
            return 0;
        }

        // pruefen ob ein anderes Audio abgespielt wird
        if ( this.isLoad() || this.isPlay()) {
            // laden abbrechen
            this._cancel();
            // Audioausgabe stoppen
            this.stop();
        }
        try {
            this.mSource = null;
            this.mAudioBuffer = null;
            console.log('AudioPlayer.playFile: Context.state = ', this.mAudioContext.state);
            // pruefen, ob AudioContext nicht gespeert ist
            if ( this.mAudioContext.state === 'suspended' ) {
                this._error( 'playFile', 'AudioContext ist nicht entsperrt' );
                this._onAudioStop();
                return -1;
            }
            return this._loadAudioFile( aFileName );
        } catch (aException) {
            this._exception( 'playFile', aException );
            return -1;
        }
    }


    getPlayFunc(): AudioPlayFunc {
        return (aAudioFilePath: string, aAudioId: string) => {
            return this.play( aAudioFilePath, aAudioId );
        };
    }


    /**
     * Audioausgabe stoppen
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    stop(): number {
        // console.log('AudioPlayer.stop');
        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('AudioPlayer.stop: AudioPlayer ist nicht aktiv');
            }
            return 0;
        }
        // console.log('SpeechAudio.stop');
        this._cancel();
        if ( this.mSource ) {
            try {
                this.mAudioPlayFlag = false;
                if ( this.mSource.stop ) {
                    this.mSource.stop( 0 );
                } else {
                    this.mSource.noteOff( 0 );
                }
                this.mSource.disconnect( 0 );
            } catch (aException) {
                this._exception( 'stop', aException );
            }
            this.mSource = null;
            this.mAudioBuffer = null;
            this.mAudioCancelFlag = false;
            this._onAudioStop();
        }
        this.mAudioLoadFlag = false;
        return 0;
    }


    getStopFunc(): AudioStopFunc {
        return () => {
            return this.stop();
        };
    }

}
