/** @packageDocumentation
 * IntentComponent Interface
 *
 * Letzte Aenderung: 01.06.2020
 * Status: rot
 *
 * @module intent/component
 * @author SB
 */


// base

import { BaseComponentInterface } from '@speech/base';


// nlu

import { OnNLUListenResultFunc, OnNLUIntentResultFunc } from '../nlu/nlu.interface';


// intent

import { IntentInterface } from '../intent.interface';


// Funktionen


/** @export
 * IntentComponent Schnittstelle
 */

export interface IntentComponentInterface extends BaseComponentInterface, IntentInterface {

  // Listen-Events

  onListenResult: OnNLUListenResultFunc;

  // Intent-Events

  onIntentResult: OnNLUIntentResultFunc;

}
