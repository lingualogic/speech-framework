/** @packageDocumentation
 * AudioCodec fuer Encode/Decode PCM
 *
 * Zur Zeit wird nur PCM-Codec unterstuetzt.
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module audio/stream
 * @author SB
 */

// core

import { ErrorBase } from '@speech/core';


// Konstanten

export const PCM_L16CodecArray = [ 'audio/L16;rate=8000', 'audio/L16;rate=16000' ];


/**
 * Klasse AudioCodec zur Codierung/Decodierung von Audiodaten
 */

export class AudioCodec extends ErrorBase {

    constructor() {
        super( 'NavigationAudioCodec' );
    }

    // Codec-Funktionen

    /**
     * Codec pruefen
     *
     * @private
     * @param {string} aCodec - zu pruefender Codec
     * @param {string[]} aCodecArray - Codec-Array
     */

    _findCodec( aCodec: string, aCodecArray: string[]): boolean {
        for ( let i = 0; i < aCodecArray.length; i++ ) {
            if ( aCodec === aCodecArray[ i ]) {
                return true;
            }
        }
        return false;
    }

    /**
     * Pruefen auf PCM-Codec
     *
     * @param {string} aCodec - zu pruefender codec
     */

    findPcmCodec( aCodec: string ): boolean {
        return this._findCodec( aCodec, PCM_L16CodecArray );
    }

    // Encode-Funktionen

    /**
     * Umwandlung von Float32 nach Int16
     *
     * @private
     * @param {*} aFloat32 - umzuwandelnder Wert
     *
     * @return {*} Rueckgabe des passenden Int-Wertes
     */

    _float32ToInt16( aFloat32: any ): any {
        const int16 = aFloat32 < 0 ? aFloat32 * 32768 : aFloat32 * 32767;
        return Math.max( -32768, Math.min( 32768, int16 ));
    }

    /**
     * Umwandlung des Float32Arrays nach Int16Array
     *
     * @private
     * @param {*} aFloat32Array - umzuwandelndes Float32-Array
     *
     * @return {*} Rueckgabe des Int16-Arrays
     */

    _float32ArrayToInt16Array( aFloat32Array: any ): any {
        const int16Array = new Int16Array( aFloat32Array.length );
        let i = 0;
        while ( i < aFloat32Array.length ) {
            int16Array[ i ] = this._float32ToInt16( aFloat32Array[ i++ ]);
        }
        return int16Array;
    }

    /**
     * Umwandlung von FloatArray nach Int16Array
     *
     * @private
     * @param {*} aFrame - umzuwandelnde Daten
     * @param {string} aCodec - Codec fuer Umwandlung
     */

    encodePCM( aFrame: any, aCodec: string ): any {
        if ( this.findPcmCodec( aCodec )) {
            return [ this._float32ArrayToInt16Array( aFrame )];
        }
        return [ aFrame ];
    }

    // Decode-Funktionen

    /**
     * Umwandlung von Int16-Array nach Float32-Array
     *
     * @param {*} aAudioData - umzuwandelnde Audiodaten
     */

    decodePCM( aAudioData: any ): any {
        try {
            const pcm16Buffer = new Int16Array( aAudioData );
            const pcm16BufferLength = pcm16Buffer.length;
            const outputArray = new Float32Array( pcm16BufferLength );
            // console.log( 'AmazonAudioCodec.decodePCM: puffer = ', pcm16Buffer);
            // console.log( 'AmazonAudioCodec.decodePCM: laenge = ', pcm16BufferLength);
            let i = 0;
            for (; i < pcm16BufferLength; ++i) {
                outputArray[i] = pcm16Buffer[i] / 32768;
            }
            // console.log('NuanceAudioCodec.decodePCM: Float32 = ', outputArray);
            return outputArray;
        } catch ( aException ) {
            // console.log('NavigationAudioCodec.decodePCM: Exception', aException);
            this._exception( 'decodePCM', aException );
            return [];
        }
    }

}
