/** @packageDocumentation
 * DialogNode speichert einen Knoten eines Dialog-Zustands
 *
 * Letzte Aenderung: 07.09.2018
 * Status: gelb
 *
 * @module dialog/store
 * @author SB
 */

export interface DialogNodeInterface {

    getNodeType(): string;
    getStateId(): number;
    getParentId(): number;
    getNodeId(): number;
    getNextId(): number;

    setName( aName: string ): void;
    getName(): string;

    setObjectType( aObjectType: string ): void;
    getObjectType(): string;

    setObjectName( aObjectName: string ): void;
    getObjectName(): string;

    setText( aText: string ): void;
    getText(): string;

    setTimeout( aTimeout: number ): void;
    getTimeout(): number;

    setProperty( aProperty: string ): void;
    getProperty(): string;

}
