/**
 * Diese Komponente spielt die Audio-Dateien ab
 *
 * Letzte Aenderung: 24.03.2020
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

import { AUDIOPLAYER_PLUGIN_NAME, AUDIO_MP3_FORMAT, AUDIO_WAV_FORMAT, AUDIO_DEFAULT_FORMAT, AUDIO_AUDIOSAMPLE_RATE, AUDIO_MIN_SAMPLERATE } from '../audio-const';
import { AudioPlayerInterface, AudioPlayFunc, AudioStopFunc, OnAudioStartFunc, OnAudioStopFunc, OnAudioUnlockFunc } from './audio-player.interface';
import { AudioCodec } from './../stream/audio-codec';
import { AudioResampler } from './../stream/audio-resampler';


// Konstanten


// Zeit die im Unlock-Event auf RESUME gewartet wird

const AUDIO_UNLOCK_TIMEOUT = 2000;


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
                // TODO: experimentelle Version fuer Audio-Unlock mit Abfangen von User-Ereignissen
                
                /* 
                 * Kommentar:
                 *
                 * Hier wurde mit document.body eine Verbindung zum DOM geschlagen, was eine schlechte Idee ist
                 * Dies ist erst mal ein Work-Around, um in Safari die Audio-Ausgabe zu ermoeglichen. Muss
                 * spaeter durch eine bessere Loesung ersetzt werden.
                 */
            
                const events = ['touchstart','touchend', 'mousedown','keydown'];
                const body = document.body;
                const unlock = () => { 
                    if ( this.mAudioContext.state === 'suspended' ) {
                        this.mAudioContext.resume().then( clean ); 
                    } else {
                        clean();
                    }
                }
                const clean = () => { events.forEach( event => body.removeEventListener( event, unlock )); }                
                events.forEach( event => body.addEventListener( event, unlock, false ));
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
                let state = 'undefined';
                if ( this.mAudioContext ) {
                    state = this.mAudioContext.state;
                }                
                // console.log('AudioPlayer._onAudioUnlock: funktion ausfuehren', state, this.mOnAudioUnlockFunc);
                return this.mOnAudioUnlockFunc( state );
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
     * 
     * @private
     */

    _unlockAudio( aCallbackFunc: (aUnlockFlag: boolean) => void): void {
        // console.log('AudioPlayer._unlockAudio: start', this.mAudioContext);
        // Timeout einstellen, um garantiert ein UnlockEvent zu erhalten
        if ( this.mAudioContext ) {
            if ( this.mAudioContext.state === 'running' ) {
                // console.log('AudioPlayer._unlockAudio: running');
                aCallbackFunc( true );
                return;
            }
            if ( this.mAudioContext.state === 'suspended' ) {
                // console.log('AudioPlayer._unlockAudio: suspended state = ', this.mAudioContext.state);
                let timeoutId = setTimeout( () => { console.log('AudioPlayer._unlockAudio: timeout'); aCallbackFunc( false ); }, AUDIO_UNLOCK_TIMEOUT );
                // Resume aufrufen
                console.log('AudioPlayer._unlockAudio: call resume state = ', this.mAudioContext.state);
                this.mAudioContext.resume().then(() => {
                    // console.log('AudioPlayer._unlockAudio: resume state = ', this.mAudioContext.state);
                    clearTimeout( timeoutId );
                    aCallbackFunc( true );
                }, (aError: any) => {
                    console.log('AudioPlayer._unlockAudio:', aError)
                    clearTimeout( timeoutId );
                    aCallbackFunc( false );
                });
            } else {
                aCallbackFunc( false );
            }
        } else {
            aCallbackFunc( false );
        }
    }


    /**
     * Versuch, AudioContext zu entsperren
     * 
     * @deprecated
     */

    unlockAudio(): void {
        this._unlockAudio((aUnlockFlag: boolean) => {
            this._onAudioUnlock();
        })
        /**** alte Version, wird ersetzt
        // console.log('AudioPlayer.unlockAudio: start');
        // Timeout einstellen, um garantiert ein UnlockEvent zu erhalten
        if ( this.mAudioContext ) {
            if ( this.mAudioContext.state === 'suspended' ) {
                let timeoutId = setTimeout( () => this._onAudioUnlock(), AUDIO_UNLOCK_TIMEOUT );
                this.mAudioContext.resume().then(() => {
                    // console.log('AudioPlayer.unlockAudio: end');
                    clearTimeout( timeoutId );
                    this._onAudioUnlock();
                }, (aError: any) => {
                    console.log('AudioPlayer.unlockAudioContext:', aError)
                    clearTimeout( timeoutId );
                    this._onAudioUnlock();
                });
            } else {
                this._onAudioUnlock();
            }
        } else {
            this._onAudioUnlock();
        }
        *****/
    }


    /**
     * Pruefen, ob AudioContext entsperrt ist
     */

    isUnlockAudio(): boolean {
        // console.log('AudioPlayer.isUnlockAudio:', this.mAudioContext);
        if ( this.mAudioContext ) {
            // console.log('AudioPlayer.isUnlockAudio: state = ', this.mAudioContext.state);
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
        // console.log('AudioPlayer.setAudioFormat:', aAudioFormat);
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
        // console.log('AudioPlayer._loadAudioFile:', aUrl);
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
        // console.log('AudioPlayer._decodeAudio');
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
                // console.log('AudioPlayer._decodeAudio: decodeAudioData start', aBuffer);
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
        // console.log('AudioPlayer._playStart');
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
                // console.log('AudioPlayer._playStart: onended');
                if ( this.isPlay()) {
                    this.mAudioPlayFlag = false;
                    this._onAudioStop();
                }
            };
            this.mSource.buffer = this.mAudioBuffer;
            this.mSource.connect( this.mAudioContext.destination );
            // console.log('AudioPlayer._playStart: ', this.mSource, this.mAudioContext.state);
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
     * PCM-Audiodaten abspielen
     *
     * @param {any} aAudioPcmData - PCM-Audiodaten als String
     */

    playPcmData( aAudioData: any ): number {
        // console.log('AudioPlayer.playPcmData: start');
        if ( !this.isActive()) {
            // kein Fehler
            if ( this.isErrorOutput()) {
                console.log('AudioPlayer.playPcmData: AudioPlayer ist nicht aktiv');
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
        // console.log('AudioPlayer.play: AudioContext.state = ', this.mAudioContext.state);
        try {
            this.mSource = null;
            this.mAudioBuffer = null;
            // AudioContext entsperren
            this._unlockAudio((aUnlockFlag: boolean) => {
                if ( aUnlockFlag ) {
                    // TODO: Insert Decoding PCM
                    const audioCodec = new AudioCodec();
                    const audioArray = [];
                    const decodePCM16KData = audioCodec.decodePCM( aAudioData );
                    audioArray.push( decodePCM16KData );
                    // AudioBuffer direkt erzeugen
                    // const data = audioArray; // audioArray.shift();
                    const data = decodePCM16KData;
                    let audioBuffer = this._getAudioBufferFirst( data );
                    // fuer die Browser ohne AudioBuffer Constructor
                    if ( !audioBuffer ) {
                        audioBuffer = this._getAudioBufferSecond( data );
                    }
                    // Fuer Safari wird eine hoehere SampleRate als 16000 benoetigt, da createBuffer sonst nicht funktioniert
                    // hier wird der Resampler eingesetzt
                    if ( !audioBuffer ) {
                        audioBuffer = this._getAudioBufferResample( data );
                    }
                    if ( !audioBuffer ) {
                        this._error( 'playByStream', 'kein Audiobuffer erzeugt');
                        return;
                    }
                    this.mAudioBuffer = audioBuffer;
                    this._playStart();
                } else {
                    this._error( 'play', 'AudioContext ist nicht entsperrt' );
                    this._onAudioStop();
                }
            });
            return 0;
        } catch (aException) {
            this._exception( 'play', aException );
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
        // console.log('AudioPlayer.play: AudioContext.state = ', this.mAudioContext.state);
        try {
            let filePath = './';
            if ( aAudioFilePath ) {
                filePath = aAudioFilePath;
            }
            const fileName = filePath + aAudioId + '.' + this.mAudioFormat;
            this.mSource = null;
            this.mAudioBuffer = null;
            // AudioContext entsperren
            this._unlockAudio((aUnlockFlag: boolean) => {
                if ( aUnlockFlag ) {
                    this._loadAudioFile( fileName );
                } else {
                    this._error( 'play', 'AudioContext ist nicht entsperrt' );
                    this._onAudioStop();
                }
            });
            return 0;
        } catch (aException) {
            this._exception( 'play', aException );
            return -1;
        }

        /**** alter Code, wird ersetzt
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
        ****/
    }


    /**
     * Audiodatei abspielen
     *
     * @param {string} aFileName - abzuspieldende Audiodatei
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    playFile( aFileName: string ): number {
        // console.log('AudioPlayer.playFile:', aFileName);
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
        // pruefen auf uebergebenen Dateinamen
        if ( !aFileName ) {
            this._error( 'playFile', 'kein Dateiname uebergeben' );
            return -1;
        }
        // console.log('AudioPlayer.playFile: Context.state = ', this.mAudioContext.state);
        try {
            this.mSource = null;
            this.mAudioBuffer = null;
            // AudioContext entsperren
            this._unlockAudio((aUnlockFlag: boolean) => {
                if ( aUnlockFlag ) {
                    this._loadAudioFile( aFileName );
                } else {
                    this._error( 'playFile', 'AudioContext ist nicht entsperrt' );
                    this._onAudioStop();
                }
            });
            return 0;
        } catch (aException) {
            this._exception( 'playFile', aException );
            return -1;
        }

        /**** alter Code, wird ersetzt
        try {
            this.mSource = null;
            this.mAudioBuffer = null;
            // console.log('AudioPlayer.playFile: Context.state = ', this.mAudioContext.state);
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
        ****/
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

    // AudioBuffer-Funktionen

    /**
     * Hier wird der AudioBuffer direkt ueber seinen Constructor erzeugt
     *
     * @private
     * @param aData - Audiodaten
     *
     * @return {AudioBuffer} Rueckgabe des erzeugten Audiobuffers oder null bei einem Fehler
     */

    _getAudioBufferFirst( aData: any ): AudioBuffer {
        console.log('AudioPlayer._getAudioBufferFirst:', aData.length);
        let audioBuffer: AudioBuffer = null;
        // fuer die meisten aktuellen Browser mit AudioBuffer Constructor 
        try {
            const audioToPlay = new Float32Array( aData.length );
            audioToPlay.set( aData );
            // console.log('NuanceAudioPlayer.playByStream: buffer direkt erzeugen:', audioToPlay.length);
            audioBuffer = new AudioBuffer({ length: audioToPlay.length, numberOfChannels: 1, sampleRate: AUDIO_AUDIOSAMPLE_RATE });
            audioBuffer.getChannelData( 0 ).set( audioToPlay );
        } catch ( aException ) {
            audioBuffer = null;
            console.log('AudioPlayer._getAudioBufferFirst: Exception', aException);
        }
        return audioBuffer;
    }

    /**
     * Hier wird der AudioBuffer ueber AudioContext.createBuffer() erzeugt
     *
     * @private
     * @param aData  - Audiodaten
     *
     * @return {AudioBuffer} Rueckgabe des erzeugten Audiobuffers oder null bei einem Fehler
     */

    _getAudioBufferSecond( aData: any ): AudioBuffer {
        let audioBuffer: AudioBuffer = null;
        // fuer die Browser ohne AudioBuffer Constructor
        try {
            const audioToPlay = new Float32Array( aData.length );
            audioToPlay.set( aData );
            // console.log('NuanceAudioPlayer.playByStream: buffer erzeugen mit 16000 Samplerate:', audioToPlay.length);
            audioBuffer = this.mAudioContext.createBuffer( 1, audioToPlay.length, AUDIO_AUDIOSAMPLE_RATE );
            audioBuffer.getChannelData( 0 ).set( audioToPlay );
        } catch ( aException ) {
            audioBuffer = null;
            console.log('AudioPlayer._getAudioBufferSecond: Exception', aException);
        }
        return audioBuffer;
    }

    /**
     * Hier wird der Audiobuffer mit Resample erzeugt, um in Safari abgespielt zu werden
     * SapmpleRate wird von PCM 16000 Hz auf 22500 Hz angehoben, da createBuffer in Safari 
     * erst ab dieser Frequenz arbeitet.
     *
     * @private
     * @param aData - Audiodaten
     *
     * @return {AudioBuffer} Rueckgabe des erzeugten Audiobuffers oder null bei einem Fehler
     */

    _getAudioBufferResample( aData: any ): AudioBuffer {
        let audioBuffer: AudioBuffer = null;
        // Fuer Safari wird eine hoehere SampleRate als 16000 benoetigt, da createBuffer sonst nicht funktioniert
        // hier wird der Resampler eingesetzt
        try {
            // notwendig ist ein groesseres FloatArray 22500/16000 = 1.4 
            const audioToPlay = new Float32Array( aData.length * 1.4 );
            audioToPlay.set( aData );

            // Resampler, um die Frequenz des AudioBuffers anzuheben auf 22500 Hz fuer Safari

            const resampler = new AudioResampler( AUDIO_AUDIOSAMPLE_RATE, AUDIO_MIN_SAMPLERATE, 1, audioToPlay.length, undefined );
            const _audioToPlay = resampler.resampler( audioToPlay );
            // console.log('NuanceAudioPlayer.playByStream: buffer erzeugen mit 22500 Samplerate:', _audioToPlay.length);
            audioBuffer = this.mAudioContext.createBuffer( 1, _audioToPlay.length, AUDIO_MIN_SAMPLERATE );
            audioBuffer.getChannelData( 0 ).set( _audioToPlay );
        } catch ( aException ) {
            audioBuffer = null;
            console.log('AudioPlayer._getAudioBufferResample: Exception', aException);
        }
        return audioBuffer;
    }

}
