/**
 * Interne SpeakComponent Schnittstelle fuer alle Speak-Komponenten. Wird von der globalen Speak Schnittstelle abgeleitet
 *
 * Letzte Aenderung: 17.10.2018
 * Status: gelb
 *
 * @module speak/component
 * @author SB
 */


// base

import { BaseComponentInterface } from '../../base/component/base-component.interface';


// speak

import { SpeakInterface } from '../speak.interface';


/** @export
 * SpeakComponent Schnittstelle fuer alle Speak-Komponenten
 */

export interface SpeakComponentInterface extends BaseComponentInterface, SpeakInterface {

}
