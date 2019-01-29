/**
 * Builder Schnittstelle
 *
 * Letzte Aenderung: 24.08.2018
 * Status: gruen
 *
 * @module core/builder
 * @author SB
 */


// component

import { ComponentInterface } from '../component/component.interface';


/**
 * Builder Interface fuer die Erzeugung von Komponenten
 */

export interface BuilderInterface {


    // Builder-Funktionen

    getType(): string;
    getClass(): string;
    getName(): string;

    build(): ComponentInterface;
}
