/** @packageDocumentation
 * SpeakComponentBuilder erzeugt die lokale Speak-Komponente
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gelb
 *
 * @module speak/component
 * @author SB
 */


// core

import { Builder } from '@speech/core';


// Audio

import { AUDIOPLAYER_FACTORY_NAME, AUDIOPLAYER_PLUGIN_NAME, AudioPlayerFactory, AudioPlayerInterface } from '@speech/audio';


// tts

import { TTS_FACTORY_NAME, TTS_DEFAULT_NAME } from '../tts/tts-const';
import { TTSFactory } from '../tts/tts-factory';
import { TTSInterface } from '../tts/tts.interface';


// speak

import { SPEAK_COMPONENTBUILDER_NAME, SPEAK_COMPONENTFACTORY_NAME, SPEAK_COMPONENT_NAME, SPEAK_TYPE_NAME } from '../speak-const';
import { SpeakComponentInterface } from './speak-component.interface';
import { SpeakComponentFactory } from './speak-component-factory';


/**
 * Klasse SpeakComponentBuilder zum Erzeugen der Speak-Komponente
 */

export class SpeakComponentBuilder extends Builder {


    /**
     * Singleton der Speak-Komponente
     */

    mSpeakComponent: SpeakComponentInterface = null;


    /**
     * SpeakBuilder erzeugen
     */

    constructor( aBuilderName?: string, aRegisterFlag = true ) {
        super( aBuilderName || 'SpeakComponentBuilder', aRegisterFlag );
    }


    getType(): string {
        return SPEAK_TYPE_NAME;
    }

    getClass(): string {
        return 'SpeakComponentBuilder';
    }

    getName(): string {
        return SPEAK_COMPONENTBUILDER_NAME;
    }


    /**
     * Erzeugt Speak-Komponente
     *
     * @return {SpeakComponentInterface} speak - Rueckgabe der Speak-Komponente
     */

    build(): SpeakComponentInterface {
        // console.log('SpeakComponentBuilder.build: start');
        // pruefen auf vorhandene Komponente
        if ( this.mSpeakComponent ) {
            // console.log('SpeakComponentBuilder.build: Komponente ist bereits erzeugt');
            return this.mSpeakComponent;
        }
        // neue Komponente erzeugen
        try {
            const speak = this._buildComponent();
            const tts = this._getPlugin( TTS_DEFAULT_NAME, TTS_FACTORY_NAME, TTSFactory ) as TTSInterface;
            const audioPlayer = this._getPlugin( AUDIOPLAYER_PLUGIN_NAME, AUDIOPLAYER_FACTORY_NAME, AudioPlayerFactory ) as AudioPlayerInterface;
            if ( this._binder( speak, tts, audioPlayer ) !== 0 ) {
                this._error( 'build', 'Komponenten nicht verbunden' );
                return null;
            }
            return speak;
        } catch ( aException ) {
            this._exception( 'build', aException );
            return null;
        }
    }


    /**
     * Hier wird die Speak-Komponente als Singelton erzeugt
     *
     * @return {SpeakInterface} speakComponent - Rueckgabe des SpeakComponent-Singletons
     */

    _buildComponent(): SpeakComponentInterface {
        if ( !this.mSpeakComponent ) {
            this.mSpeakComponent = this._getPlugin( SPEAK_COMPONENT_NAME, SPEAK_COMPONENTFACTORY_NAME, SpeakComponentFactory ) as SpeakComponentInterface;
        }
        return this.mSpeakComponent;
    }


    /**
     * Binden der Komponente mit den Plugins
     *
     * @param aSpeak - Speak-Komponente
     * @param aTTS  - TTS-Plugin
     * @param aAudioPlayer - AudioPlayer-Plugin
     * @param aNet - Net-Plugin
     *
     * @return {number} errorCode(0,-1)
     */

    _binder( aSpeak: SpeakComponentInterface, aTTS: TTSInterface, aAudioPlayer: AudioPlayerInterface ): number {
        if ( !aSpeak ) {
            this._error( '_binder', 'Keine Speak-Komponente vorhanden' );
            return -1;
        }
        if ( !aTTS ) {
            this._error( '_binder', 'Kein TTS-Plugin vorhanden' );
            return -1;
        }
        if ( !aAudioPlayer ) {
            this._error( '_binder', 'Kein AudioPlayer-Plugin vorhanden' );
            return -1;
        }
        // Einfuegen der Plugins
        if ( aSpeak.insertPlugin( aTTS.getName(), aTTS ) !== 0 ) {
            this._error( '_binder', 'TTS-Plugin wurde nicht eingefuegt' );
            return -1;
        }
        if ( aSpeak.insertPlugin( aAudioPlayer.getName(), aAudioPlayer ) !== 0 ) {
            this._error( '_binder', 'AudioPlayer-Plugin wurde nicht eingefuegt' );
            return -1;
        }
        // Event-Verbindungen zwischen TTS und Speak
        aTTS.onInit = aSpeak.onInit;
        aTTS.onSpeakStart = aSpeak.onStart;
        aTTS.onSpeakStop = aSpeak.onStop;
        aTTS.onError = aSpeak.onError;
        // TODO: Umstellung auf Audio-Komponente, diese kann dann mehrere Instanzen des
        //       AudioPlayers verwalten (analog zu Audio-Kanaelen)
        // Event-Verbindung zwischen Audio und Speak (Problem mit mehrfacher Einbindung!)
        aAudioPlayer.onAudioStart = aSpeak.onStart;
        aAudioPlayer.onAudioStop = aSpeak.onStop;
        aAudioPlayer.onAudioUnlock = aSpeak.onAudioUnlock;
        aAudioPlayer.onError = aSpeak.onError;
        return 0;
    }

}
