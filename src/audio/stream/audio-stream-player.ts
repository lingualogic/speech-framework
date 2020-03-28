/**
 * AudioPlayer fuer Abspielen von Sprachdaten
 *
 * Zur Zeit wird nur PCM-Codec unterstuetzt.
 *
 * Letzte Aenderung: 24.03.2020
 * Status: rot
 *
 * @module audio/stream
 * @author SB
 */

// core

import { ErrorBase } from './../../core/error/error-base';


// audio

import { AUDIO_AUDIOSAMPLE_RATE } from './../audio-const';
import { AudioCodec } from './audio-codec';
import { AudioResampler } from './audio-resampler';


// Minimum-Samplerate fuer Safari

const AUDIO_MIN_SAMPLERATE = 22500;

/**
 * Klasse AudioPlayer zum Absielen eines Audiostreams
 */

export class AudioStreamPlayer extends ErrorBase {

    mAudioContext: any = null;
    mAudioCodec: AudioCodec = null;
    mResampler: AudioResampler = null;

    mOnAudioEndFunc = null;

    mAudioSource = null;
    mAudioArray = [];
    mQueue = [];
    mBeginSpeakFlag = true;
    mAudioStopFlag = false;

    /**
     * Konstruktor
     *
     * @param aAudioContext - globaler AudioContext
     */

    constructor( aAudioContext: AudioContext ) {
        super( 'AudioStreamPlayer' );
        this.mAudioContext = aAudioContext;
        // TODO: wird hier erst mal temporaer eingefuegt. Muss spaeter einmal uebergeben werden
        this.mAudioCodec = new AudioCodec();
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
            // console.log('NuanceAudioPlayer.playByStream: buffer direkt erzeugen:', audioToPlay.length);
            audioBuffer = new AudioBuffer({ length: audioToPlay.length, numberOfChannels: 1, sampleRate: AUDIO_AUDIOSAMPLE_RATE });
            audioBuffer.getChannelData( 0 ).set( audioToPlay );
        } catch ( aException ) {
            audioBuffer = null;
            console.log('AudioStreamPlayer._getAudioBufferFirst: Exception', aException);
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
            console.log('AudioStreamPlayer._getAudioBufferSecond: Exception', aException);
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

            this.mResampler = new AudioResampler( AUDIO_AUDIOSAMPLE_RATE, AUDIO_MIN_SAMPLERATE, 1, audioToPlay.length, undefined );
            const _audioToPlay = this.mResampler.resampler( audioToPlay );
            // console.log('NuanceAudioPlayer.playByStream: buffer erzeugen mit 22500 Samplerate:', _audioToPlay.length);
            audioBuffer = this.mAudioContext.createBuffer( 1, _audioToPlay.length, AUDIO_MIN_SAMPLERATE );
            audioBuffer.getChannelData( 0 ).set( _audioToPlay );
        } catch ( aException ) {
            audioBuffer = null;
            console.log('AudioStreamPlayer._getAudioBufferResample: Exception', aException);
        }
        return audioBuffer;
    }

    // Player-Funktionen

    /**
     * Abspielen des Audiostreams
     *
     * @param {*} aOptions - Optionen
     * @param {*} aAudioArray - Audiostream
     */

    playByStream( aOptions: any, aAudioArray: any ): void {
        try {
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
            // console.log('NuanceAudioPlayer.playByStream: AudioContext.state = ', this.mAudioContext.state);

            this.mAudioSource = this.mAudioContext.createBufferSource();
            // TODO: falls mehrere Stream-Abschnitte verwendet werden
            this.mAudioSource.onended = () => this.playByStream( aOptions, aAudioArray );
            /*
            source.onended = () => {
                console.log( 'NuanceConnect.connect: source.onended' );
                aOptions.onaudioend();
            };
            */
            const desiredSampleRate = AUDIO_AUDIOSAMPLE_RATE;
            /*
            if ($("#selectCodec").val() === "audio/L16;rate=8000" || $("#selectCodec").val() === "audio/opus;rate=8000") {
                desiredSampleRate = 8000;
            }
            */
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
            // console.log('NuanceAudioPlayer.playByStream: audio start', this.mAudioSource);
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
            console.log('NavigationAudioPlayer.playByStream: Exception', aException);
            this._exception( 'playByStream', aException );
        }
    }

    /**
     * Audiodaten abspielen
     *
     * @param aOptions - optionale Parameter (codec, onaudiostart)
     * @param aAudioData - abzuspielende Audiodaten
     */

    decode( aOptions: any, aAudioData: any ): void {
        try {
            // console.log('NuanceConnect.connect: object');
            if ( this.mAudioCodec.findPcmCodec( aOptions.codec )) {
                const decodePCM16KData = this.mAudioCodec.decodePCM( aAudioData );
                this.mAudioArray.push( decodePCM16KData );
                this.mQueue.push( decodePCM16KData );
                // console.log('NuanceConnect.connect: PCM AudioSink', this.mBeginSpeakFlag);
                if ( this.mBeginSpeakFlag ) {
                    this.mBeginSpeakFlag = false;
                    this.playByStream( aOptions, this.mAudioArray );
                }
            } else {
                this._error( 'decode', 'Kein Decoder vorhanden fuer ' + aOptions.codec );
            }
        } catch ( aException ) {
            this._exception( 'decode', aException );
        }
    }

    /**
     * Audioausgabe stoppen
     */

    stop(): void {
        try {
            // console.log('NuanceAudioSink.stop');
            this.mAudioStopFlag = true;
            if ( this.mAudioSource ) {
                this.mAudioSource.stop(0);
                this.mAudioSource.disconnect(0);
                if ( typeof this.mOnAudioEndFunc === 'function' ) {
                    // console.log( 'NuanceAudioPlayer.stop: send onended event' );
                    this.mOnAudioEndFunc();
                }
            }
        } catch ( aException ) {
            this._exception( 'stop', aException );
        }
        this.mAudioSource = null;
    }

}
