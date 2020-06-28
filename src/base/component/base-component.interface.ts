/** @packageDocumentation
 * BaseComponent Schnittstelle
 *
 * Letzte Aenderung: 01.06.2020
 * Status: gruen
 *
 * @module base/component
 * @author SB
 */


// core

import { ComponentInterface } from '@speech/core';


// base

import { BaseStartFunc, BaseStopFunc, OnBaseStartFunc, OnBaseStopFunc } from './../base-function.type';
import { BaseInterface } from '../base.interface';


/** @export
 * BaseComponent Schnittstelle
 *
 * @extends {ComponentInterface, BaseInterface}
 */

export interface BaseComponentInterface extends ComponentInterface, BaseInterface {


    // Event-Funktionen


    /** Startereignis, wenn start() aufgerufen wurde */
    onStart: OnBaseStartFunc;
    /** Stopereignis, wenn stop() aufgerufen wurde */
    onStop: OnBaseStopFunc;


    // Bind-Functionen


    /**
     * Dient zum Verbinden der Start Funktion mit einer anderen Komponente, die diese Funktion aufruft
     *
     * @returns {BaseStartFunc} Rueckgabe der StartAction Funktion
     */

    getStartFunc(): BaseStartFunc;


    /**
     * Dient zum Verbinden der Stop Funktion mit einer anderen Komponente, die diese Funktion aufruft
     *
     * @returns {BaseStopFunc} Rueckgabe der StartAction Funktion
     */

    getStopFunc(): BaseStopFunc;

}
