/**
 * ListenComponentBuilder fuer lokale ListenComponent
 *
 * Letzte Aenderung: 07.04.2020
 * Status: gruen
 *
 * @module listen/component
 * @author SB
 */


// builder

import { Builder } from '../../core/builder/builder';


// asr

import { ASR_FACTORY_NAME, ASR_DEFAULT_NAME } from '../asr/asr-const';
import { ASRFactory } from '../asr/asr-factory';
import { ASRInterface } from '../asr/asr.interface';


// listen

import { LISTEN_TYPE_NAME, LISTEN_COMPONENTBUILDER_NAME, LISTEN_COMPONENTFACTORY_NAME, LISTEN_COMPONENT_NAME } from '../listen-const';
import { ListenComponentInterface } from './listen-component.interface';
import { ListenComponentFactory } from './listen-component-factory';


/**
 * Klasse DialogBuilder zum Erzeugen der Dialog-Komponente
 */

export class ListenComponentBuilder extends Builder {


    /**
     * Singleton der Listen-Komponente
     */

    mListenComponent: ListenComponentInterface = null;


    constructor( aBuilderName?: string, aRegisterFlag = true ) {
        super( aBuilderName || 'ListenComponentBuilder', aRegisterFlag );
    }


    /**
     * Typ des Builders zurueckgeben
     *
     * @return {string} builderType
     */

    getType(): string {
        return LISTEN_TYPE_NAME;
    }


    getClass(): string {
        return 'ListenComponentBuilder';
    }

    /**
     * Name des Builders zurueckgeben
     *
     * @return {string} builderName
     */

    getName(): string {
        return LISTEN_COMPONENTBUILDER_NAME;
    }


    // Builder-Funktionen


    /**
     * Hauptfunktion des Builders.
     *
     * @return {ListenComponentInterface} component - Rueckgabe der erzeugten Komponente oder null
     */

    build(): ListenComponentInterface {
        // console.log('ListenComponentBuilder.build: start');
        // pruefen auf vorhandene Komponente
        if ( this.mListenComponent ) {
            // console.log('ListenComponentBuilder.build: Komponente ist bereits erzeugt');
            return this.mListenComponent;
        }
        try {
            const listen = this._buildComponent();
            const asr = this._getPlugin( ASR_DEFAULT_NAME, ASR_FACTORY_NAME, ASRFactory ) as ASRInterface;
            if ( this._binder( listen, asr ) !== 0 ) {
                this._error( 'build', 'Komponenten nicht verbunden' );
                return null;
            }
            return listen;
        } catch ( aException ) {
            this._exception( 'build', aException );
            return null;
        }
    }


    /**
     * Hier wird die Komponente als Singelton erzeugt
     *
     * @private
     * @return {ListenComponentInterface} listenComponent - Rueckgabe des Component-Singletons
     */

    _buildComponent(): ListenComponentInterface {
        if ( !this.mListenComponent ) {
            this.mListenComponent = this._getPlugin( LISTEN_COMPONENT_NAME, LISTEN_COMPONENTFACTORY_NAME, ListenComponentFactory ) as ListenComponentInterface;
        }
        return this.mListenComponent;
    }


    /**
     * Verbindert die Komponenten und Plugins miteinander
     *
     * @private
     * @param {ListenInterface} aListen - Listen Komponente
     * @param {ASRInterface} aASR - ASR Plugin
     *
     * @return {number} errorCode(0,-1)
     */

    _binder( aListen: ListenComponentInterface, aASR: ASRInterface ): number {
        // console.log('ListenComponentBuilder._binder');
        if ( !aListen ) {
            this._error( '_binder', 'Keine Listen-Komponente vorhanden' );
            return -1;
        }
        if ( !aASR ) {
            this._error( '_binder', 'Kein ASR-Plugin vorhanden' );
            return -1;
        }
        // Einfuegen des ASR-Plugins
        if ( aListen.insertPlugin( aASR.getName(), aASR ) !== 0 ) {
            this._error( '_binder', 'ASR-Plugin wurde nicht eingefuegt' );
            return -1;
        }
        // binden der ASR-Funktionen
        aASR.onInit = aListen.onInit;
        aASR.onListenStart = aListen.onStart;
        aASR.onListenStop = aListen.onStop;
        aASR.onListenRecognitionStart = aListen.onListenRecognitionStart;
        aASR.onListenRecognitionStop = aListen.onListenRecognitionStop;
        aASR.onListenAudioStart = aListen.onListenAudioStart;
        aASR.onListenAudioStop = aListen.onListenAudioStop;
        aASR.onListenSoundStart = aListen.onListenSoundStart;
        aASR.onListenSoundStop = aListen.onListenSoundStop;
        aASR.onListenSpeechStart = aListen.onListenSpeechStart;
        aASR.onListenSpeechStop = aListen.onListenSpeechStop;
        aASR.onListenResult = aListen.onListenResult;
        aASR.onListenInterimResult = aListen.onListenInterimResult;
        aASR.onListenNoMatch = aListen.onListenNoMatch;
        aASR.onError = aListen.onError;
        return 0;
    }

}
