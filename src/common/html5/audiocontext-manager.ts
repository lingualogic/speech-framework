/** @packageDocumentation
 * Diese Komponente dient als Manager der einzigen AudioContext-Instanz im gesamten Framework
 *
 * Letzte Aenderung: 14.08.2020
 * Status: rot
 *
 * @module common/html5
 * @author SB
 */


// core

import { FactoryManager, ErrorBase, SpeechErrorFunc } from '@speech/core';


// common

import { AudioContextFactory, AUDIOCONTEXT_FACTORY_NAME } from './audiocontext-factory';


/**
 * Diese Klasse kapselt die Pruefung und Erzeugung der HTML5-AudioContext Klasse
 */

export class AudioContextManager {

    /**
     * statische ErrorBase fuer die Fehlerbehandlung
     */

    private static mErrorBase = new ErrorBase( 'AudioContextManager' );


    /**
     * AudioContext Singleton fuer die Verwaltung aller Audiodaten
     */

    private static mAudioContext: AudioContext = null;


    // statische Klasse, keine Instanz erzeugbar !

    private constructor() {}


    /**
     * AudioContextManager Elemente loeschen
     */

    static clear(): void {
        AudioContextManager.mAudioContext = null;
    }


    // Fehler-Funktionen


    static setErrorOutputOn(): void {
        AudioContextManager.mErrorBase.setErrorOutputOn();
    }


    static setErrorOutputOff(): void {
        AudioContextManager.mErrorBase.setErrorOutputOff();
    }

    /**
     * Eintragen einer Fehlerbehandlungsfunktion
     *
     * @param {SpeechErrorFunc} aErrorFunc - Fehlerbehandlungsfunktion
     */

    static _setErrorOutputFunc( aErrorFunc: SpeechErrorFunc ): void {
        AudioContextManager.mErrorBase._setErrorOutputFunc( aErrorFunc );
    }


    // AudioContext-Funktionen


    /**
     * neuen Audiocontext erzeugen
     */

    private static _createAudioContext(): AudioContext {
        try {
            // pruefen auf Fabrik

            const audioContextFactory = FactoryManager.get( AUDIOCONTEXT_FACTORY_NAME, AudioContextFactory );
            if ( !audioContextFactory ) {
                AudioContextManager.mErrorBase._error( '_createAudioContext', 'keine AudioContext-Fabrik vorhanden' );
                return null;
            }

            // Audiokontext auslesen

            const audioContextClass = audioContextFactory.create();
            if ( audioContextClass === null ) {
                AudioContextManager.mErrorBase._error( '_createAudioContext', 'kein AudioContext vorhanden' );
                return null;
            }

            return new audioContextClass;
        } catch ( aException ) {
            AudioContextManager.mErrorBase._exception( '_createAudioContext', aException );
            return null;
        }
    }    


    /**
     * AudioKontext eintragen, nur wenn noch kein AudioContext vorhanden ist.
     * 
     * @param aAudioContext - neuer AudioContext, der eingetragen werden soll
     */
    
    static setAudioContext( aAudioContext: AudioContext ): number {
        if ( !aAudioContext ) {
            AudioContextManager.mErrorBase._error( 'setudioContext', 'Kein AudioContext uebergeben' );
            return -1;
        }
        if ( !AudioContextManager.mAudioContext ) {
            AudioContextManager.mAudioContext = aAudioContext;
            return 0;
        }
        AudioContextManager.mErrorBase._error( 'setudioContext', 'AudioContext ist bereits vorhanden' );
        return -1;
    }

    /**
     * AudioContext Singleton zurueckgeben
     */

    static getAudioContext(): AudioContext {
        if ( AudioContextManager.mAudioContext ) {
            return AudioContextManager.mAudioContext;
        }
        // neuen Audiocontext erzeugen und eintragen als Singelton
        // console.log('audioContextManager.getAudioCotext: neuen Audiocontext erzeugen', AudioContextManager.mAudioContext);
        AudioContextManager.mAudioContext = AudioContextManager._createAudioContext();
        return AudioContextManager.mAudioContext;
    }

}
