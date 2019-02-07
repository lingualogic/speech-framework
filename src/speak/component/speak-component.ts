/**
 * Speak Komponente, dient zur Sprachausgabe von Texten oder Audiodateien
 * ueber ein TTS-Plugin oder ein AudioPlayer-Plugin.
 *
 * Letzte Aenderung: 07.02.2019
 * Status: gelb
 *
 * @module speak/component
 * @author SB
 */


// base

import { BaseComponent } from '../../base/component/base-component';


// audio

import { AUDIOPLAYER_PLUGIN_NAME, AUDIO_DEFAULT_FORMAT } from '../../audio/audio-const';
import { AudioPlayerInterface } from '../../audio/player/audio-player.interface';


// tts

import { TTS_DEFAULT_NAME } from '../tts/tts-const';
import { TTSInterface } from '../tts/tts.interface';


// speak

import { SPEAK_API_VERSION } from '../speak-version';
import {
    SPEAK_TYPE_NAME,
    SPEAK_COMPONENT_NAME,
    SPEAK_AUDIOFILE_PATH,
    SPEAK_AUDIO_FLAG,
    SPEAK_DEFAULT_LANGUAGE,
    SPEAK_UNDEFINE_LANGUAGE,
    SPEAK_UNDEFINE_VOICE
} from '../speak-const';
import { SPEAK_AUDIO_STOPSELECTOR, SPEAK_TTS_STOPSELECTOR } from './speak-component-const';
import { SpeakOptionInterface } from '../speak-option.interface';
import { SpeakComponentInterface } from './speak-component.interface';


const SPEAK_COMPONENT_VERSION = SPEAK_API_VERSION;


/**
 * Speak Klasse
 */

export class SpeakComponent extends BaseComponent implements SpeakComponentInterface {

    // innere Plugins

    mTTSPlugin: TTSInterface = null;
    mAudioPlayer: AudioPlayerInterface = null;

    // Attribute der Komponente

    mTTSActiveFlag = false;
    mAudioPlayerActiveFlag = false;

    // Features des Servers

    mTTSFeatureFlag = false;
    mAudioFeatureFlag = false;

    // interne Attribute

    mAudioFilePath = SPEAK_AUDIOFILE_PATH;     // lokaler Pfad zu den Audio-Dateien
    mAudioFileName = '';                       // abzuspielender Dateiname
    mAudioFlag = SPEAK_AUDIO_FLAG;             // bestimmt, ob Text ueber Audio ausgegeben wird

    mSpeakText = '';                           // umzuwandelnder Text in Sprachausgabe
    mSpeakStopSelector = '';


    /**
     * Speak Objekt erzeugen
     *
     */

    constructor( aRegisterFlag = true ) {
        super( SPEAK_COMPONENT_NAME, aRegisterFlag );
    }


    /**
     * Rueckgabe des Komponententyps
     *
     * @returns {string}
     */

    getType(): string {
        return SPEAK_TYPE_NAME;
    }


    getClass(): string {
        return 'SpeakComponent';
    }


    getVersion(): string {
        return SPEAK_COMPONENT_VERSION;
    }


    getServerVersion(): string {
        return '';
    }


    // Komponenten-Funktionen


    /**
     * Eintragen der lokalen Optionen
     *
     * @protected
     * @param {SpeakOptionInterface} aOption - optionale Parameter
     */

    _setOption( aOption: SpeakOptionInterface ): number {
        // pruefen auf vorhandene Options
        if ( !aOption ) {
            return -1;
        }
        // Audio-Pfad eintragen
        if (typeof aOption.audioFilePath === 'string') {
            // console.log('SpeakComponent._setOption: AudioPath = ', aOption.audioFilePath);
            this.mAudioFilePath = aOption.audioFilePath;
        }
        // Audioflag eintragen
        if (typeof aOption.audioFlag === 'boolean') {
            if (aOption.audioFlag === true) {
                // console.log('SpeakService Audio: ein');
                this.mAudioFlag = true;
            } else {
                // console.log('SpeakService Audio: aus');
                this.mAudioFlag = false;
            }
        }
        // Sprache eintragen
        if ( aOption.speakLanguage ) {
            this.setLanguage( aOption.speakLanguage );
        }
        return super._setOption( aOption );
    }


    /**
     * Hier werden alle inneren Plugins der Komponente initialisiert
     *
     * @returns {number} Fehlercode 0 oder -1
     */

    _initAllPlugin(): number {
        // console.log('SpeakComponent._initAllPlugin');

        // interne Plugins auslesen

        this.mTTSPlugin = this.findPlugin( TTS_DEFAULT_NAME ) as TTSInterface;
        this.mAudioPlayer = this.findPlugin( AUDIOPLAYER_PLUGIN_NAME ) as AudioPlayerInterface;

        // pruefen, ob TTS aktiv ist

        if ( this.mTTSPlugin ) {
            // console.log('SpeakComponent.init: TTSActiveFlag = ', this.mTTSPlugin.isActive());
            this.mTTSActiveFlag = this.mTTSPlugin.isActive();
        }

        // pruefen, ob AudioPlayer aktiv ist

        if ( this.mAudioPlayer ) {
            // console.log('SpeakComponent.init: AudioPlayerActiveFlag = ', this.mAudioPlayer.isActive());
            this.mAudioPlayerActiveFlag = this.mAudioPlayer.isActive();
            // pruefen, ob AudioPlayer aktiv ist
            if ( !this.mAudioPlayerActiveFlag ) {
                // AudioFlag dauerhaft abschalten
                this.mAudioFlag = false;
            }
        }
        return 0;
    }


    /**
     * Initialisierung der Speak-Komponente
     *
     * @param {Object} aOptions - optionale Parameter { audioContext: AudioContext,
     *                                                  audioFormat: string,
     *                                                  audioFlag: boolean,
     *                                                  externAudioFlag: boolean}
     *
     * @return {number} errorcode (0,-1)
     */

    init( aOption?: SpeakOptionInterface ): number {
        // console.log('SpeakComponent.init:', aOption);
        return super.init( aOption );
    }


    /**
     * Loeschen der inneren Plugins
     */

    _doneAllPlugin(): void {
        // interne Komponenten

        this.mTTSPlugin = null;
        this.mAudioPlayer = null;
    }


    /**
     * Loeschen der inneren Attribute
     */

    _doneAllAttribute(): void {
        // Attribute

        this.mTTSActiveFlag = false;
        this.mAudioPlayerActiveFlag = false;

        // Features des Servers

        this.mTTSFeatureFlag = false;
        this.mAudioFeatureFlag = false;

        // interne Attribute

        this.mAudioFilePath = SPEAK_AUDIOFILE_PATH;     // lokaler Pfad zu den Audio-Dateien
        this.mAudioFileName = '';                       // abzuspielender Dateiname
        this.mAudioFlag = SPEAK_AUDIO_FLAG;             // bestimmt, ob Text ueber Audio ausgegeben wird

        this.mSpeakText = '';                           // umzuwandelnder Text in Sprachausgabe
        this.mSpeakStopSelector = '';
    }


    /**
     * Defaultwerte setzen
     */

    _resetAllDefault(): void {
        // Default-Einstellungen

        this.setAudioFormat( AUDIO_DEFAULT_FORMAT );
        this.setLanguage( SPEAK_DEFAULT_LANGUAGE );

        // interne Attribute

        this.mSpeakStopSelector = '';
        this.mAudioFilePath = SPEAK_AUDIOFILE_PATH;
        this.mAudioFileName = '';
        this.mAudioFlag = SPEAK_AUDIO_FLAG;
        this.mSpeakText = '';
    }


    /**
     * Auf Defaultwerte zuruecksetzen
     *
     * @param {SpeakOptionInterface} aOption - optionale Parameter
     */

    reset( aOption?: SpeakOptionInterface ): number {
        return super.reset( aOption );
    }


    /**
     * pruefen auf aktive Komponente. Komponente ist nur aktiv, wenn ASR
     * vorhanden ist. Ansonsten ist die Komponente immer deaktiv.
     *
     * @return {boolean} Rueckgabe, ob Kompponente aktiv ist
     */

    isActive(): boolean {
        // pruefen auf vorhandene TTS und AudioPlayer

        if ( !this.mTTSActiveFlag && !this.mAudioPlayerActiveFlag ) {
            return false;
        }
        return super.isActive();
    }


    /**
     * Einschalten der Komponente, wenn ASR vorhanden ist.
     * Ansonsten ist die Komponente nicht einschaltbar.
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActiveOn(): number {
        // pruefen auf vorhandene TTS und AudioPlayer

        if ( !this.mTTSActiveFlag && !this.mAudioPlayerActiveFlag ) {
            return -1;
        }
        return super.setActiveOn();
    }


    /**
     * Hier werden die Features des Servers gesetzt
     *
     * @param {Object} aFeatureInfo {TTS: boolean, ASR: boolean, AUDIO: boolean}
     *
     * @return {number} errorcode (0,-1)
     */

    setFeatureList( aFeatureInfo: any ): number {
        // console.log('SpeechApi.setFeatureList:', aFeatureInfo);
        if ( !aFeatureInfo.features ) {
            this._error( 'setFeatureList', 'keine FeatureInfos uebergeben' );
            return -1;
        }
        // Eintragen des TTS-Features
        if (aFeatureInfo.features.TTS && typeof(aFeatureInfo.features.TTS) === 'boolean') {
            this.mTTSFeatureFlag = aFeatureInfo.features.TTS;
        }
        // Eintragen des Audio-Features
        if (aFeatureInfo.features.AUDIO && typeof(aFeatureInfo.features.AUDIO) === 'boolean') {
            this.mAudioFeatureFlag = aFeatureInfo.features.AUDIO;
        }
        return 0;
    }


    // Audio-Funktionen



    /**
     * AudioContext entsperren
     */

    unlockAudio(): number {
        if ( !this.mAudioPlayer ) {
            this.mAudioPlayer.unlockAudio();
            return 0;
        }
        return -1;
    }


    /**
     * pruefen, ob AudioContext entsperrt ist
     */

    isUnlockAudio(): boolean {
        if ( !this.mAudioPlayer ) {
            return false;
        }
        return this.mAudioPlayer.isUnlockAudio();
    }


    /**
     * Abfrage auf eingeschaltete Audioausgabe
     */

    isAudio(): boolean {
        if ( this.mAudioPlayerActiveFlag ) {
            return this.mAudioFlag;
        }
        return false;
    }


    /**
     * Audioausgabe einschalten
     */

    setAudioOn(): number {
        if ( this.mAudioPlayerActiveFlag ) {
            this.mAudioFlag = true;
            return 0;
        }
        return -1;
    }


    /**
     * Audioausgabe ausschalten
     */

    setAudioOff(): number {
        this.mAudioFlag = false;
        return 0;
    }


    /**
     * Rueckgabe des globalen Audiokontext der App.
     *
     * @return {AudioContext} Gibt den globalen HTML5-Audiokontext zurueck
     */

    getAudioContext(): AudioContext {
        if ( !this.mAudioPlayer ) {
            return null;
        }
        return this.mAudioPlayer.getAudioContext();
    }


    /**
     * Eintragen des Audioformats.
     *
     * @param {string} aAudioFormat - Eintragen eines Formatnamens
     */

    setAudioFormat( aAudioFormat: string ): number {
        if ( !this.mAudioPlayer ) {
            return -1;
        }
        return this.mAudioPlayer.setAudioFormat( aAudioFormat );
    }


    /**
     * Rueckgabe des aktuell eingestellten Audioformats.
     *
     * @return {string} gibt MP3 oder WAV zurueck
     */

    getAudioFormat(): string {
        if ( !this.mAudioPlayer ) {
            return '';
        }
        return this.mAudioPlayer.getAudioFormat();
    }


    /**
     * lokalen Audiodateipfad eintragen
     *
     * @param {string} aAudioFilePath
     */

    setAudioFilePath( aAudioFilePath: string ): number {
        this.mAudioFilePath = aAudioFilePath;
        return 0;
    }


    /**
     * lokalen Audiodateipfad zurueckgeben
     *
     * @return {string} audioFilePath
     */

    getAudioFilePath(): string {
        return this.mAudioFilePath;
    }


    /**
     * Audiodateinamen eintragen
     *
     * @param {string} aAudioFileName - Name der aktuell abzuspielenden Audiodatei
     */

    setAudioFileName( aAudioFileName: string ): number {
        this.mAudioFileName = aAudioFileName;
        return 0;
    }


    /**
     * Audiodateiname zurueckgeben
     *
     * @return {string} audioFileName
     */

    getAudioFileName(): string {
        return this.mAudioFileName;
    }


    // TTS-Funktionen


    /**
     * pruefen auf vorhandene TTS
     * 
     * @return {boolean} True, wenn TTS vorhanden ist, False sonst
     */

    isTTS(): boolean {
        if ( this.mTTSPlugin && this.mTTSPlugin.isTTS()) {
            return true;
        }
        return false;
    }


    /**
     * Setzen der aktuellen TTS ueber ihren Namen
     *
     * @param {string} aTTSName - Name der TTS
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setTTS( aTTSName: string ): number {
        if ( !this.mTTSPlugin ) {
            return -1;
        }
        return this.mTTSPlugin.setTTS( aTTSName );
    }


    /**
     * Rueckgabe des eingestellten TTS-Namens
     *
     * @returns {string} Name der aktuellen TTS
     */

    getTTS(): string {
        if ( !this.mTTSPlugin ) {
            return '';
        }
        return this.mTTSPlugin.getTTS();
    }


    /**
     * Rueckgabe aller vorhandenen TTS-Namen
     *
     * @return {Array<string>} Liste der TTS-Namen
     */

    getTTSList(): Array<string> {
        if ( !this.mTTSPlugin ) {
            return [];
        }
        return this.mTTSPlugin.getTTSList();
    }


    // Language-Funktionen


    /**
     * Aendern der Sprache
     *
     * @param {string} aLanguage - Kurzbezeichnung der Sprache (de, en)
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setLanguage( aLanguage: string ): number {
        if ( !this.mTTSPlugin ) {
            return -1;
        }
        return this.mTTSPlugin.setLanguage( aLanguage );
    }


    /**
     * aktuell eingestellte Sprache zurueckgeben
     *
     * @return {string} language - Kurzbezeichnung der Sprache (de, en)
     */

    getLanguage(): string {
        if ( !this.mTTSPlugin ) {
            return SPEAK_UNDEFINE_LANGUAGE;
        }
        return this.mTTSPlugin.getLanguage();
    }


    /**
     * Rueckgabe aller vorhandenen Language-Namen
     *
     * @return {Array<string>} Liste der Language-Namen
     */

    getLanguageList(): Array<string> {
        if ( !this.mTTSPlugin ) {
            return [];
        }
        return this.mTTSPlugin.getLanguageList();
    }


    // Voice-Funktionen


    /**
     * Aendern der Stimme
     *
     * @param {string} aVoice - Name der Stimme
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setVoice( aVoice: string ): number {
        if ( !this.mTTSPlugin ) {
            return -1;
        }
        return this.mTTSPlugin.setVoice( aVoice );
    }


    /**
     * aktuell eingestellte Stimme zurueckgeben
     *
     * @return {string} Name der Stimme
     */

    getVoice(): string {
        if ( !this.mTTSPlugin ) {
            return SPEAK_UNDEFINE_VOICE;
        }
        return this.mTTSPlugin.getVoice();
    }


    /**
     * Rueckgabe aller vorhandenen Voice-Namen
     *
     * @return {Array<string>} Liste der Voice-Namen
     */

    getVoiceList(): Array<string> {
        if ( !this.mTTSPlugin ) {
            return [];
        }
        return this.mTTSPlugin.getVoiceList();
    }


    // Speak-Funktionen


    /**
     * Eintragen des aktuell zu sprechenden Textes
     *
     * @param aText - Text fuer die Sprachausgabe
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setSpeakText( aText: string ): number {
        this.mSpeakText = aText;
        return 0;
    }


    /**
     * Rueckgabe des aktuell zu sprechenden Textes
     *
     * @return {string} speakText
     */

    getSpeakText(): string {
        return this.mSpeakText;
    }


    /**
     * pruefen, ob Sprachausgabe gerade laeuft
     *
     * @return {boolean} True, Sprachausgabe aktiv, False sonst
     */

    isRunning(): boolean {
        if ( !this.isActive()) {
            return false;
        }
        // pruefen auf Audio oder TTS
        if ( this.mAudioFlag ) {
            if ( this.mAudioPlayer ) {
                return this.mAudioPlayer.isPlay() || this.mAudioPlayer.isLoad();
            }
            return false;
        }
        if ( this.mTTSPlugin ) {
            return this.mTTSPlugin.isSpeakRunning();
        }
        return false;
    }


    /**
     * Sprachausgabe
     *
     * @return {number} errorcode (0,-1)
     */

    start(): number {
        // console.log('SpeakComponent.start');

        // fehlende TTS wird zuerst abgefrage, um Fehler zu erzeugen
    
        if ( !this.isTTS()) {
            this._error( 'start', 'keine TTS vorhanden' );
            return -1;
        }

        // pruefen auf externe Audiokomponente
        if ( !this.isActive()) {
            return 0;
        }
        // pruefen auf bereits gestarteten Speak
        if ( this.isRunning()) {
            this._error( 'start', 'Sprachausgabe laeuft bereits' );
            return -1;
        }
        // pruefen auf Audio oder TTS
        if ( this.mAudioFlag ) {
            // Entsperren von Audio
            this.unlockAudio();
            return this._startSpeakAudio();
        }
        // console.log('SpeakComponent.start: _startSpeakTTS');
        return this._startSpeakTTS();
    }


    /**
     * Ausgabe einer Audio-Datei zur Audio-ID
     *
     * @return {number} errorcode (0,-1)
     */

    _startSpeakAudio(): number {
        // console.log('SpeakComponent._startSpeakAudio');
        this.mSpeakStopSelector = '';
        // pruefen auf Server-Konponente
        if ( this.mAudioFeatureFlag ) {
            // Audio wird vom Server abgespielt
            return 0;
        }
        if ( !this.mAudioPlayer ) {
            this._error( '_startSpeakAudio', 'kein AudioPlayer vorhanden' );
            return -1;
        }
        if ( !this.mAudioFileName ) {
            this._error( '_startSpeakAudio', 'kein Audiodateiname fuer die Sprachausgabe vorhanden' );
            return -1;
        }
        // Audio wird lokal im Client abgespielt
        this.mSpeakStopSelector = SPEAK_AUDIO_STOPSELECTOR;
        // TODO: hier muss die Audiodateinamenserzeugung eingebaut werden, dass darf nicht in AudioPlayer stattfinden
        // console.log('SpeakComponents._startSpeakAudio: mAudioFilePath = ', this.mAudioFilePath);
        return this.mAudioPlayer.play( this.mAudioFilePath, this.mAudioFileName );
        // return this.mAudioPlayer.playFile( this.mAudioFilePath + this.mAudioFileName );
    }


    /**
     * Ausgabe des Textes ueber die Sprachsynthese
     *
     * @return {number} errorcode (0,-1)
     */

    _startSpeakTTS(): number {
        // console.log('SpeakComponent._startSpeakTTS');
        this.mSpeakStopSelector = '';
        // pruefen auf Server-Konponente
        if ( this.mTTSFeatureFlag ) {
            // TTS wird vom Server abgespielt
            return 0;
        }
        if ( !this.mTTSPlugin ) {
            this._error( '_startSpeakTTS', 'kein TTSPlugin vorhanden' );
            return -1;
        }
        if ( !this.mSpeakText ) {
            this._error( '_startSpeakTTS', 'kein Text fuer die Sprachausgabe vorhanden' );
            return -1;
        }
        // Text wird im Client ausgegeben
        this.mSpeakStopSelector = SPEAK_TTS_STOPSELECTOR;
        return this.mTTSPlugin.startSpeak( this.mSpeakText );
    }


    /**
     * Sprachausgabe stoppen
     *
     * @return {number} errorcode (0,-1)
     */

    stop(): number {
        // console.log('SpeakComponent.stop:', this.mSpeakStopSelector);
        // pruefen auf laufende Sprachausgabe
        if ( !this.isRunning()) {
            this.mSpeakStopSelector = '';
            return 0;
        }
        // TODO: sollte eigentlich 0 zurueckgeben, da stop immer aufgerufen werden darf,
        //       auch wenn kein start vorher aufgerufen worden ist
        if ( !this.mSpeakStopSelector ) {
            this._error( 'stop', 'kein StopSelector vorhanden' );
            return -1;
        }
        if ( this.mSpeakStopSelector === SPEAK_AUDIO_STOPSELECTOR ) {
            this.mSpeakStopSelector = '';
            if ( this.mAudioPlayer ) {
                return this.mAudioPlayer.stop();
            } else {
                this._error( 'stop', 'kein AudioPlayer vorhanden' );
                return -1;
            }
        } else if ( this.mSpeakStopSelector === SPEAK_TTS_STOPSELECTOR ) {
            this.mSpeakStopSelector = '';
            if ( this.mTTSPlugin ) {
                return this.mTTSPlugin.stopSpeak();
            } else {
                this._error( 'stop', 'kein TTSPlugin vorhanden' );
                return -1;
            }
        }
        this._error( 'stop', 'kein gueltiger StopSelector vorhanden' );
        return -1;
    }

}
