/** @packageDocumentation
 * AudioPlayer fuer Abspielen von Sprachdaten
 *
 * Zur Zeit wird nur PCM-Codec unterstuetzt.
 *
 * Letzte Aenderung: 30.05.2020
 * Status: rot
 *
 * @module common/audio
 * @author SB
 */


// core

import { ErrorBase } from '@speech/core';


// common

import { AudioCodec } from './audio-codec';
import { AudioResampler } from './audio-resampler';


// Minimum-Samplerate fuer Safari

const AUDIO_MIN_SAMPLERATE = 22500;
const AUDIO_DEFAULT_SAMPLERATE = 16000;

/**
 * Klasse AudioPlayer zum Absielen des Audiostreams
 */

export class AudioPlayer extends ErrorBase {

    mAudioContext: any = null;
    mAudioCodec: AudioCodec = null;
    mResampler: AudioResampler = null;

    mOnAudioStartFunc = null;
    mOnAudioStopFunc = null;

    mOnAudioEndFunc = null;

    mAudioSource = null;
    mAudioArray = [];
    mQueue = [];
    mBeginSpeakFlag = true;
    mAudioStopFlag = false;

    mAudioBuffer = null;
    mSource = null;


    // mOpusDecoder = null;


    /**
     * Konstruktor
     *
     * @param aAudioContext - globaler AudioContext
     */

    constructor( aAudioContext: AudioContext ) {
        super( 'AudioPlayer' );
        this.mAudioContext = aAudioContext;
        // TODO: wird hier erst mal temporaer eingefuegt. Muss spaeter einmal uebergeben werden
        this.mAudioCodec = new AudioCodec();
    }


    /**
     * Start-Event fuer Audio
     */

    _onAudioStart(): void {
        if ( this.mOnAudioStartFunc ) {
            try {
                this.mOnAudioStartFunc();
            } catch ( aException ) {
                this._exception( '_onAudioStart', aException );
            }
        }
    }


    /**
     * 
     */

    _onAudioStop(): void {
        if ( this.mOnAudioStopFunc ) {
            try {
                this.mOnAudioStopFunc();
            } catch ( aException ) {
                this._exception( '_onAudioStop', aException );
            }
        }
    }


    set onAudioStart( aAudioStartFunc: () => void ) {
        this.mOnAudioStartFunc = aAudioStartFunc;
    }


    set onAudioStop( aAudioStopFunc: () => void ) {
        this.mOnAudioStopFunc = aAudioStopFunc;
    }


    /**
     * Start der Wiedergabe
     */

    start(): void {
        this.mOnAudioEndFunc = null;
        this.mAudioSource = null;
        this.mAudioArray = [];
        this.mQueue = [];
        this.mBeginSpeakFlag = true;
        this.mAudioStopFlag = false;
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
        let audioBuffer: AudioBuffer = null;
        // fuer die meisten aktuellen Browser mit AudioBuffer Constructor 
        try {
            const audioToPlay = new Float32Array( aData.length );
            audioToPlay.set( aData );
            // console.log('AudioPlayer.playByStream: buffer direkt erzeugen:', audioToPlay.length);
            audioBuffer = new AudioBuffer({ length: audioToPlay.length, numberOfChannels: 1, sampleRate: AUDIO_DEFAULT_SAMPLERATE });
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
            // console.log('AudioPlayer.playByStream: buffer erzeugen mit 16000 Samplerate:', audioToPlay.length);
            audioBuffer = this.mAudioContext.createBuffer( 1, audioToPlay.length, AUDIO_DEFAULT_SAMPLERATE );
            audioBuffer.getChannelData( 0 ).set( audioToPlay );
        } catch ( aException ) {
            audioBuffer = null;
            console.log('AudioPlayer._getAudioBufferSecond: Exception', aException);
        }
        return audioBuffer;
    }


    /**
     * Hier wird der Audiobuffer mit Resample erzeugt, um in Safari abgespielt zu werden
     * SampleRate wird von PCM 16000 Hz auf 22500 Hz angehoben, da createBuffer in Safari 
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

            this.mResampler = new AudioResampler( AUDIO_DEFAULT_SAMPLERATE, AUDIO_MIN_SAMPLERATE, 1, audioToPlay.length, undefined );
            const _audioToPlay = this.mResampler.resampler( audioToPlay );
            // console.log('AudioPlayer.playByStream: buffer erzeugen mit 22500 Samplerate:', _audioToPlay.length);
            audioBuffer = this.mAudioContext.createBuffer( 1, _audioToPlay.length, AUDIO_MIN_SAMPLERATE );
            audioBuffer.getChannelData( 0 ).set( _audioToPlay );
        } catch ( aException ) {
            audioBuffer = null;
            console.log('AudioPlayer._getAudioBufferResample: Exception', aException);
        }
        return audioBuffer;
    }


    // Player-Funktionen


    /** old Function
     * Abspielen des Audiostreams
     *
     * @param {*} aOptions - Optionen
     * @param {*} aAudioArray - Audiostream
     */

    playByStreamOld( aOptions: any, aAudioArray: any ): void {
        try {
            if ( !this.mAudioContext ) {
                console.log('AudioPlayer.playByStream: kein AudioContext vorhanden');
                return;
            }
            // console.log('NuanceConnect.playByStream: start', this.mAudioStopFlag);
            this.mOnAudioEndFunc = aOptions.onaudioend;
            if ( aAudioArray.length === 0 || this.mAudioStopFlag ) {
                this.mBeginSpeakFlag = true;
                // console.log( 'NuanceConnect.connect: source.onended' );
                aOptions.onaudioend();
                this.mOnAudioEndFunc = null;
                this.mAudioSource = null;
                return;
            }
            // console.log('AudioPlayer.playByStream: AudioContext.state = ', this.mAudioContext.state);

            this.mAudioSource = this.mAudioContext.createBufferSource();
            // TODO: falls mehrere Stream-Abschnitte verwendet werden
            this.mAudioSource.onended = () => this.playByStreamOld( aOptions, aAudioArray );

            // AudioBuffer direkt erzeugen
            const data = aAudioArray.shift();
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

            this.mAudioSource.buffer = audioBuffer;
            this.mAudioSource.connect( this.mAudioContext.destination );

            // console.log('AudioPlayer.playByStream: audio start', this.mAudioSource);
            if ( this.mAudioSource.start ) {
                this.mAudioSource.start(0);
            } else {
                this.mAudioSource.noteOn(0);
            }
            aOptions.onaudiostart();
            // console.log('NuanceConnect.playByStream: end');
        } catch ( aException ) {
            this.mBeginSpeakFlag = true;
            // console.log( 'NuanceConnect.connect: source.onended' );
            aOptions.onaudioend();
            this.mOnAudioEndFunc = null;
            this.mAudioSource = null;
            console.log('AudioPlayer.playByStream: Exception', aException);
            this._exception( 'playByStream', aException );
        }
    }


    /**
     * Abspielen des Audiostreams
     *
     * @param {*} aAudioArray - Audiostream
     */

    playByStream( aAudioArray: any ): void {
        try {
            if ( !this.mAudioContext ) {
                console.log('AudioPlayer.playByStream: kein AudioContext vorhanden');
                return;
            }
            // console.log('AudioPlayer.playByStream: start');
            if ( aAudioArray.length === 0 || this.mAudioStopFlag ) {
                this.mBeginSpeakFlag = true;
                this._onAudioStop();
                this.mAudioSource = null;
                return;
            }
            // console.log('AudioPlayer.playByStream: AudioContext.state = ', this.mAudioContext.state);

            this.mAudioSource = this.mAudioContext.createBufferSource();
            // Ende-Funktion mit AudioStop-Event verbinden
            this.mAudioSource.onended = () => this.stop();

            // AudioBuffer direkt erzeugen
            const data = aAudioArray.shift();
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

            this.mAudioSource.buffer = audioBuffer;
            this.mAudioSource.connect( this.mAudioContext.destination );

            // console.log('AudioPlayer.playByStream: audio start', this.mAudioSource);
            if ( this.mAudioSource.start ) {
                this.mAudioSource.start(0);
            } else {
                this.mAudioSource.noteOn(0);
            }
            this._onAudioStart();
            // console.log('AudioPlayer.playByStream: end');
        } catch ( aException ) {
            this.mBeginSpeakFlag = true;
            this._onAudioStop();
            this.mAudioSource = null;
            // console.log('AudioPlayer.playByStream: Exception', aException);
            this._exception( 'playByStream', aException );
        }
    }


    /**
     * Audiodaten abspielen
     *
     * @param aOptions - optionale Parameter (codec, onaudiostart)
     * @param aAudioData - abzuspielende Audiodaten
     */

    decodeOld( aOptions: any, aAudioData: any ): void {
        try {
            // console.log('NuanceConnect.connect: object');
            if ( this.mAudioCodec.findPcmCodec( aOptions.codec )) {
                const decodePCM16KData = this.mAudioCodec.decodePCM( aAudioData );
                this.mAudioArray.push( decodePCM16KData );
                this.mQueue.push( decodePCM16KData );
                // console.log('NuanceConnect.connect: PCM AudioSink', this.mBeginSpeakFlag);
                if ( this.mBeginSpeakFlag ) {
                    this.mBeginSpeakFlag = false;
                    this.playByStreamOld( aOptions, this.mAudioArray );
                }
            } else if ( this.mAudioCodec.findOpusCodec( aOptions.codec )) {
                /* Opus-Codec
                audioOpusDecodeArray.push( aMessage.data );
                if ( beginOpusDecodeFlag ) {
                    beginOpusDecodeFlag = false;
                    decodeOpus( audioOpusDecodeArray.shift(), this.mAudioSink.mQueue );
                }
                */
            } else {
                this._error( 'decode', 'Kein Decoder vorhanden fuer ' + aOptions.codec );
            }
        } catch ( aException ) {
            this._exception( 'decode', aException );
        }
    }


    /**
     * Audiodaten abspielen
     *
     * @param aOptions - optionale Parameter (codec)
     * @param aAudioData - abzuspielende Audiodaten
     */

    decode( aOptions: any, aAudioData: any ): void {
        try {
            // console.log('AudioPlayer.decode: start');
            if ( this.mAudioCodec.findPcmCodec( aOptions.codec )) {
                const decodePCM16KData = this.mAudioCodec.decodePCM( aAudioData );
                this.mAudioArray.push( decodePCM16KData );
                this.mQueue.push( decodePCM16KData );
                // console.log('AudioPlayer.decode: end');
                // console.log('AudioPlayer.decode: PCM AudioSink', this.mBeginSpeakFlag);
                if ( this.mBeginSpeakFlag ) {
                    this.mBeginSpeakFlag = false;
                    this.playByStream( this.mAudioArray );
                }
            } else {
                this._error( 'decode', 'Kein Decoder vorhanden fuer ' + aOptions.codec );
            }
        } catch ( aException ) {
            this._exception( 'decode', aException );
        }
    }


    /**
     * Dekodieren der Audiodaten (MP3)
     *
     * @private
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    decodeAudio( aOptions: any, aData: any ): number {
        if ( !this.mAudioContext ) {
            this._error( '_decodeAudio', 'kein AudioContext vorhanden' );
            return -1;
        }
        try {
            this.mAudioContext.decodeAudioData( aData, (aBuffer: AudioBuffer) => {
                // console.log('AudioPlayer._decodeAudio: decodeAudioData start', aBuffer);
                this.mAudioBuffer = aBuffer;
                this._playStart( aOptions );
                // console.log('AudioPlayer._decodeAudio: decodeAudioData end');
            }, (aError: any) => {
                // TODO: muss in Fehlerbehandlung uebertragen werden
                // console.log('AudioPlayer._decodeAudio:', aError);
                this._error('_decodeAudio', 'DOMException');
            });
            return 0;
        } catch (aException) {
            this._exception( '_decodeAudio', aException );
            return -1;
        }
    }


    /**
     * Start der Audioausgabe
     *
     * @private
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    _playStart( aOptions: any ): number {
        // console.log('AudioPlayer._playStart:', aOptions);
        if ( !this.mAudioBuffer ) {
            this._error( '_playStart', 'kein AudioBuffer vorhanden' );
            return -1;
        }
        if ( !this.mAudioContext ) {
            this._error( '_playStart', 'kein AudioContext vorhanden' );
            return -1;
        }
        // Create two sources and play them both together.
        try {
            this.mSource = this.mAudioContext.createBufferSource();
            // Ende-Event
            this.mSource.onended = () => {
                // TODO: hier muss ein Ende-Event fuer Audio-Ende eingebaut werden
                // console.log('AudioPlayer._playStart: onended');
                // Audio Stop-Ereignis senden
                if ( aOptions.onaudioend ) {
                    aOptions.onaudioend();
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
            // Audio Start-Ereignis senden
            if ( aOptions.onaudiostart ) {
                aOptions.onaudiostart();
            }
            return 0;
        } catch (aException) {
            this._exception( '_playStart', aException );
            return -1;
        }
    }


    /**
     * Audioausgabe stoppen
     */

    stopOld(): void {
        try {
            // console.log('NuanceAudioSink.stop');
            this.mAudioStopFlag = true;
            if ( this.mAudioSource ) {
                this.mAudioSource.stop(0);
                this.mAudioSource.disconnect(0);
                if ( typeof this.mOnAudioEndFunc === 'function' ) {
                    // console.log( 'AudioPlayer.stop: send onended event' );
                    this.mOnAudioEndFunc();
                }
            }
        } catch ( aException ) {
            this._exception( 'stop', aException );
        }
        this.mAudioSource = null;
    }


    /**
     * Audioausgabe stoppen
     */

    stop(): void {
        try {
            // console.log('AudioPlayer.stop');
            this.mAudioStopFlag = true;
            if ( this.mAudioSource ) {
                this.mAudioSource.stop(0);
                this.mAudioSource.disconnect(0);
                this._onAudioStop();
            }
        } catch ( aException ) {
            this._exception( 'stop', aException );
        }
        this.mAudioSource = null;
    }


    stopAudio(): void {
        // console.log('AudioPlayer.stopAudio');
        if ( this.mSource ) {
            try {
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
        }
    }
}
