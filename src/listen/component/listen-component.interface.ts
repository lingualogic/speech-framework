/**
 * ListenComponent Interface
 *
 * Letzte Aenderung: 08.10.2018
 * Status: gruen
 *
 * @module listen/component
 * @author SB
 */


// component



// asr

import { OnASRListenResultFunc } from '../asr/asr.interface';


// base

import { BaseComponentInterface } from '../../base/component/base-component.interface';


// listen

import { ListenInterface } from '../listen.interface';


// Funktionen


/** @export
 * ListenComponent Schnittstelle
 */

export interface ListenComponentInterface extends BaseComponentInterface, ListenInterface {

  // Listen-Events

  onListenResult: OnASRListenResultFunc;

}
