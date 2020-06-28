/** @packageDocumentation
 * DialogState speichert einen Zustand eines Dialogs
 *
 * Letzte Aenderung: 07.09.2018
 * Status: gelb
 *
 * @module dialog/store
 * @author SB
 */

// extern

// TODO: import debug syntax muss noch ermittelt werden
// const debug = require('debug')('speech:dialog:store:state');

// dialog

import { DialogNodeInterface } from './dialog-node.interface';
import { DialogNode } from './dialog-node';
import { DialogStateInterface } from './dialog-state.interface';


/**
 * DialogState Klasse
 */

export class DialogState implements DialogStateInterface {

    private mDialogName = '';
    private mStateName = '';
    private mStateId = 0;
    private mNodeList = new Map<number, DialogNodeInterface>();
    private mNodeKeys = null;

    /**
     * Creates an instance of DialogState
     *
     * @param {string} aDialogName
     * @param {string} aStateName
     * @param {number} aStateId
     */

    constructor( aDialogName: string, aStateName: string, aStateId: number ) {
        // debug('constructor:', aStateName, aStateId);
        this.mDialogName = aDialogName;
        this.mStateName = aStateName;
        this.mStateId = aStateId;
    }

    getDialogName(): string {
        return this.mDialogName;
    }

    getName(): string {
        return this.mStateName;
    }

    getId(): number {
        return this.mStateId;
    }


    /**
     * neuen Dialogknoten erzeugen
     *
     * @param {string} aNodeType
     * @param {number} aNodeId
     * @param {number} aParentId
     * @param {number} aNextId
     *
     * @return {DialogNodeInterface} dialogNode - Dialogknotenobjekt
     */

    newDialogNode(aNodeType: string, aNodeId: number, aParentId: number, aNextId: number): DialogNodeInterface {
        // debug('newDialogNode:', aNodeType, aNodeId, aParentId, aNextId);
        const dialogNode = new DialogNode( aNodeType, aNodeId, this.mStateId, aParentId, aNextId );
        this.mNodeList.set( dialogNode.getNodeId(), dialogNode );
        return dialogNode;
    }


    /**
     * Dialogknoten zur Knotennummer zurueckgeben
     *
     * @param {number} aNodeId - eindeutige Knotennummer
     * @return {DialogNodeInterface} node - Knoten zur Knotennummer zurueckgeben
     */

    getDialogNode( aNodeId: number ): DialogNodeInterface {
        return this.mNodeList.get(aNodeId);
    }


    /**
     * Nummer des ersten Knotens der Liste zurueckgeben
     *
     * @return {number} nodeId - erste Knotennummer oder -1 zurueckgeben
     */

    getFirstDialogNodeId(): number {
        this.mNodeKeys = this.mNodeList.keys();
        const key = this.mNodeKeys.next();
        // console.log('DialogState.getFirstDialogNodeId: key=', key);
        if ( !key.value ) {
            return -1;
        }
        return key.value;
    }


    /**
     * Naechste Knotennummer der Liste zurueckgeben, vorher sollte getFirstDialogNodeId
     * einmal aufgerufen werden, um den Iterator zu initialsieren
     *
     * @return
     * @memberof DialogState
     */

    getNextDialogNodeId(): number {
        if ( this.mNodeKeys === null ) {
            return this.getFirstDialogNodeId();
        }
        const key = this.mNodeKeys.next();
        if ( !key.value || key.done ) {
            return -1;
        }
        return key.value;
    }


    /**** Funktionen werden zur Zeit nicht benutzt
    setStateData(aState) {
        this.mDialogName = aState.dialogName;
        this.mStateName = aState.stateName;
        this.mStateId = aState.stateId;
    }

    getStateData() {
        return {
            dialogName: this.mDialogName,
            stateName: this.mStateName,
            stateId: this.mStateId
        };
    }

    setNodeListData(aNodeList) {
        for (const node in aNodeList) {
            let dialogNode = new DialogNode(node.nodeType, node.nodeId, node.stateId, node.parentId, node.nextId);
            dialogNode.setName(node.name);
            dialogNode.setObjectType(node.objectType);
            dialogNode.setObjectName(node.objectName);
            dialogNode.setText(node.text);
            dialogNode.setTimeout(node.timeout);
            dialogNode.setProperty(node.property);
            this.mNodeList.set(dialogNode.mNodeId, dialogNode);
        }
    }

    getNodeListData() {
        let nodeList = [];
        let entries = this.mNodeList.entries();
        //console.log('getNodeListData: entries=', entries);
        for (const entry of entries) {
            //console.log('getNodeListData: entry=', entry);
            let node = {
                nodeType: entry[1].mNodeType,
                stateId: entry[1].mStateId,
                parentId: entry[1].mParentId,
                nodeId: entry[1].mNodeId,
                nextId: entry[1].mNextId,
                name: entry[1].mName,
                objectType: entry[1].mObjectType,
                objectName: entry[1].mObjectName,
                text: entry[1].mText,
                timeout: entry[1].mTimeout,
                property: entry[1].mProperty
            };
            nodeList.push(node);
        }
        return nodeList;
    }

    setData(aStateData) {
        this.setStateData(aStateData.state);
        this.setNodeListData(aStateData.nodeList);
    }

    getData() {
        let state = this.getStateData();
        let nodeList = this.getNodeListData();
        return {
            state: state,
            nodeList: nodeList
        };
    }
    ****/
}
