/** @packageDocumentation
 * ListenComponent Interface
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gruen
 *
 * @module listen/component
 * @author SB
 */


// base

import { BaseComponentInterface } from '@speech/base';


// asr

import { OnASRListenStartFunc, OnASRListenStopFunc, OnASRListenResultFunc, OnASRListenNoMatchFunc } from '../asr/asr.interface';


// listen

import { ListenInterface } from '../listen.interface';


// Funktionen


/** @export
 * ListenComponent Schnittstelle
 */

export interface ListenComponentInterface extends BaseComponentInterface, ListenInterface {

  // Listen-Events

  onListenResult: OnASRListenResultFunc;
  onListenInterimResult: OnASRListenResultFunc;
  onListenNoMatch: OnASRListenNoMatchFunc;

  onListenRecognitionStart: OnASRListenStartFunc;
  onListenRecognitionStop: OnASRListenStopFunc;

  onListenAudioStart: OnASRListenStartFunc;
  onListenAudioStop: OnASRListenStopFunc;

  onListenSoundStart: OnASRListenStartFunc;
  onListenSoundStop: OnASRListenStopFunc;

  onListenSpeechStart: OnASRListenStartFunc;
  onListenSpeechStop: OnASRListenStopFunc;

}
