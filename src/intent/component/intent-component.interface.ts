/**
 * IntentComponent Interface
 *
 * Letzte Aenderung: 28.11.2018
 * Status: rot
 *
 * @module intent/component
 * @author SB
 */


// nlu

import { OnNLUListenResultFunc, OnNLUIntentResultFunc } from '../nlu/nlu.interface';


// base

import { BaseComponentInterface } from '../../base/component/base-component.interface';


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
