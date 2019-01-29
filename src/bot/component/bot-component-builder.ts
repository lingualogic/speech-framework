/**
 * BotBuilder fuer die Erzeugung der BotComponent
 *
 * Letzte Aenderung: 08.11.2018
 * Status: gruen
 *
 * @module bot/component
 * @author SB
 */


// builder

import { Builder } from '../../core/builder/builder';


// audio

import { AUDIOPLAYER_FACTORY_NAME, AUDIOPLAYER_PLUGIN_NAME } from '../../audio/audio-const';
import { AudioPlayerFactory } from '../../audio/player/audio-player-factory';
import { AudioPlayerInterface } from '../../audio/player/audio-player.interface';


// speak

import { SPEAK_TYPE_NAME, SPEAK_COMPONENT_NAME } from '../../speak/speak-const';
import { SpeakComponentInterface } from '../../speak/component/speak-component.interface';


// listen

import { LISTEN_TYPE_NAME, LISTEN_COMPONENT_NAME } from '../../listen/listen-const';
import { ListenComponentInterface } from '../../listen/component/listen-component.interface';


// action

import { ACTION_TYPE_NAME, ACTION_COMPONENT_NAME } from '../../action/action-const';
import { ActionComponentInterface } from '../../action/component/action-component.interface';


// dialog

import { DIALOG_TYPE_NAME, DIALOG_COMPONENT_NAME } from '../../dialog/dialog-const';
import { DialogComponentInterface } from '../../dialog/component/dialog-component.interface';


// bot

import { BOT_TYPE_NAME, BOT_COMPONENTBUILDER_NAME, BOT_COMPONENTFACTORY_NAME, BOT_COMPONENT_NAME } from '../bot-const';
import { BotComponentFactory } from './bot-component-factory';
import { BotComponentInterface } from './bot-component.interface';


/** @export
 * Klasse BotComponentBuilder zum Erzeugen der Bot-Komponente
 */

export class BotComponentBuilder extends Builder {


    /**
     * Singleton der Bot-Komponente
     */

    mBotComponent: BotComponentInterface = null;


    constructor( aBuilderName?: string, aRegisterFlag = true ) {
        super( aBuilderName || 'BotComponentBuilder', aRegisterFlag );
    }


    getClass(): string {
        return 'BotComponentBuilder';
    }


    /**
     * Type der erzeugten Komponente des Builders zurueckgeben
     *
     * @return {string} componentType
     */

    getType(): string {
        return BOT_TYPE_NAME;
    }


    /**
     * Name des Builders zurueckgeben
     *
     * @return {string} builderName
     */

    getName(): string {
        return BOT_COMPONENTBUILDER_NAME;
    }


    // Builder-Funktionen


    /**
     * Hauptfunktion des Builders.
     *
     * @return {BotComponentInterface} component - Rueckgabe der erzeugten Komponente oder null
     */

    build(): BotComponentInterface {
        // console.log('BotComponentBuilder.build: start');
        // pruefen auf vorhandene Komponente
        if ( this.mBotComponent ) {
            // console.log('BotComponentBuilder.build: Komponente ist bereits erzeugt');
            return this.mBotComponent;
        }
        try {
            const bot = this._buildComponent();
            const dialog = this._getComponent( DIALOG_COMPONENT_NAME, DIALOG_TYPE_NAME ) as DialogComponentInterface;
            const action = this._getComponent( ACTION_COMPONENT_NAME, ACTION_TYPE_NAME ) as ActionComponentInterface;
            const listen = this._getComponent( LISTEN_COMPONENT_NAME, LISTEN_TYPE_NAME ) as ListenComponentInterface;
            const speak = this._getComponent( SPEAK_COMPONENT_NAME, SPEAK_TYPE_NAME ) as SpeakComponentInterface;
            const audioPlayer = this._getPlugin( AUDIOPLAYER_PLUGIN_NAME, AUDIOPLAYER_FACTORY_NAME, AudioPlayerFactory ) as AudioPlayerInterface;
            if ( this._binder( bot, dialog, action, listen, speak, audioPlayer ) !== 0 ) {
                this._error( 'build', 'Komponenten nicht verbunden' );
                return null;
            }
            // console.log('BotComponentBuilder.build: ende');
            return bot;
        } catch ( aException ) {
            this._exception( 'build', aException );
            return null;
        }
    }


    /**
     * Hier wird die Komponente als Singelton erzeugt
     *
     * @private
     * @return {BotComponentInterface} botComponent - Rueckgabe des Component-Singletons
     */

    _buildComponent(): BotComponentInterface {
        if ( !this.mBotComponent ) {
            this.mBotComponent = this._getPlugin( BOT_COMPONENT_NAME, BOT_COMPONENTFACTORY_NAME, BotComponentFactory ) as BotComponentInterface;
        }
        return this.mBotComponent;
    }


    /**
     * Verbindert die Komponenten und Plugins miteinander
     *
     * @private
     * @param {BotComponentInterface} aBot - Bot Komponente
     * @param {DialogComponentInterface} aDialog - Dialog Komponente
     * @param {ListenComponentInterface} aListen - Listen Komponente
     * @param {SpeakComponentInterface} aSpeak - Speak Komponente
     * @param {AudioPlayerInterface} aAudioPlayer - AudioPlayer Plugin
     *
     * @return {number} errorCode(0,-1)
     */

    _binder( aBot: BotComponentInterface,
             aDialog: DialogComponentInterface,
             aAction: ActionComponentInterface,
             aListen: ListenComponentInterface,
             aSpeak: SpeakComponentInterface,
             aAudioPlayer: AudioPlayerInterface ): number {
        // console.log('BotComponentBuilder._binder: start');
        if ( !aBot ) {
            this._error( '_binder', 'Keine Bot-Komponente vorhanden' );
            return -1;
        }
        if ( !aDialog ) {
            this._error( '_binder', 'Keine Dialog-Komponente vorhanden' );
            return -1;
        }
        if ( !aAction ) {
            this._error( '_binder', 'Keine Action-Komponente vorhanden' );
            return -1;
        }
        if ( !aListen ) {
            this._error( '_binder', 'Keine Listen-Komponente vorhanden' );
            return -1;
        }
        if ( !aSpeak ) {
            this._error( '_binder', 'Keine Speak-Komponente vorhanden' );
            return -1;
        }
        if ( !aAudioPlayer ) {
            this._error( '_binder', 'Kein AudioPlayer-Plugin vorhanden' );
            return -1;
        }
        // Einfuegen aller Komponenten und Plugins in Initialisierungreihenfolge
        if ( aBot.insertPlugin( aAudioPlayer.getName(), aAudioPlayer ) !== 0 ) {
            this._error( '_binder', 'AudioPlayer-Plugin wurde nicht eingefuegt' );
            return -1;
        }
        if ( aBot.insertPlugin( aSpeak.getName(), aSpeak ) !== 0 ) {
            this._error( '_binder', 'Speak-Komponente wurde nicht eingefuegt' );
            return -1;
        }
        if ( aBot.insertPlugin( aListen.getName(), aListen ) !== 0 ) {
            this._error( '_binder', 'Listen-Komponente wurde nicht eingefuegt' );
            return -1;
        }
        if ( aBot.insertPlugin( aAction.getName(), aAction ) !== 0 ) {
            this._error( '_binder', 'Action-Komponente wurde nicht eingefuegt' );
            return -1;
        }
        if ( aBot.insertPlugin( aDialog.getName(), aDialog ) !== 0 ) {
            this._error( '_binder', 'Dialog-Komponente wurde nicht eingefuegt' );
            return -1;
        }
        // verbinden von Dialog-ActionEvent mit Bot Action-Funktionen (DialogActionStart fehlt, da DialogAction diese Funktion miterfuellt)
        if ( aDialog.addDialogActionEvent( BOT_COMPONENT_NAME, aBot.getDialogActionFunc()) !== 0 ) { return -1; }
        if ( aDialog.addDialogActionStopEvent( BOT_COMPONENT_NAME, aBot.getDialogActionStopFunc()) !== 0 ) { return -1; }
        // verbinden von Dialog-SpeakEvent mit Bot Speak-Funktion (DialogSpeakStart fehlt, da DialogSpeak diese Funktion miterfuellt)
        if ( aDialog.addDialogSpeakEvent( BOT_COMPONENT_NAME, aBot.getDialogSpeakFunc()) !== 0 ) { return -1; }
        if ( aDialog.addDialogSpeakStopEvent( BOT_COMPONENT_NAME, aBot.getDialogSpeakStopFunc()) !== 0 ) { return -1; }
        // console.log('BotComponentBuilder._binder: ende');
        return 0;
    }

}

