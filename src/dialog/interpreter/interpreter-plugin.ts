/**
 * Interpreter Plugin interpretiert Dialogprogramme fuer die Dialogausgabe
 *
 * Letzte Aenderung: 07.09.2018
 * Status: gelb
 *
 * @module dialog/interpreter
 * @author SB
 */


// global

import {
    SPEECH_DIALOGACTION_EVENT,
    SPEECH_DIALOGSPEAK_EVENT
} from '../../const/speech-event-const';


// plugin

import { Plugin } from '../../core/plugin/plugin';


// dialog

import {
    DIALOG_MAIN_NAME,
    DIALOG_ROOTSTATE_NAME,
    DIALOG_GROUP_NODE,
    DIALOG_ACTION_NODE,
    DIALOG_SPEAK_NODE,
    DIALOG_WAIT_NODE
} from '../dialog-const';
import {
    OnDialogSetFunc,
    OnDialogStartFunc,
    OnDialogStopFunc,
    OnDialogStateSetFunc,
    OnDialogActionFunc,
    OnDialogSpeakFunc,
    OnDialogSpeakStartFunc,
    OnDialogSpeakStopFunc
} from '../dialog-function.type';
import { DialogActionInterface } from '../dialog-action.interface';
import { DialogSpeakInterface } from '../dialog-speak.interface';
import { DialogStateContextInterface } from '../dialog-state-context.interface';
import { DialogNodeInterface } from '../store/dialog-node.interface';
import { DialogNode } from '../store/dialog-node';
import { DialogStateInterface } from '../store/dialog-state.interface';
import { StoreGetDialogStateFunc } from '../store/store.interface';
import { InterpreterInterface } from './interpreter.interface';
import { INTERPRETER_PLUGIN_NAME } from './interpreter-const';


// TODO: eigene Promise mit cancel erzeugen, noch zu testen

class DialogPromise<T> extends Promise<T> {

    public cancelMethod: () => void;

    constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
        super(executor);
    }

    // cancel the operation

    public cancel() {
        if ( this.cancelMethod ) {
            this.cancelMethod();
        }
    }
}


/** @export
 * Interpreter Klasse
 */

export class InterpreterPlugin extends Plugin implements InterpreterInterface {

    mDialogName = DIALOG_MAIN_NAME;
    mStateName = DIALOG_ROOTSTATE_NAME;
    mStateContext: DialogStateContextInterface = null;
    // TODO: Typensichere Promise mit cancel() als Erweiterung funktioniert noch nicht
    mNodePromise: any = null;
    mDialogRunFlag = false;
    mSpeakRunFlag = false;
    // Gruppen-Attribute
    private mGroupId = 0;
    private mGroupProperty = '';
    private mGroupActionFlag = false;
    private mNoWaitNodeFlag = false;
    // Funktionen
    mGetDialogStateFunc: StoreGetDialogStateFunc = null;
    // TODO: Idee, hier schon die Dialog-Ereignisfunktionen einzutragen
    private mDialogSetFunc: OnDialogSetFunc = null;
    private mDialogStartFunc: OnDialogStartFunc = null;
    private mDialogStopFunc: OnDialogStopFunc = null;
    private mDialogStateSetFunc: OnDialogStateSetFunc = null;
    private mDialogActionFunc: OnDialogActionFunc = null;
    private mDialogSpeakFunc: OnDialogSpeakFunc = null;
    private mDialogSpeakStartFunc: OnDialogSpeakStartFunc = null;
    private mDialogSpeakStopFunc: OnDialogSpeakStopFunc = null;


    /**
     * Creates an instance of DialogInterpreter.
     *
     * @param {DialogStoreInterface} aDialogStore - Dialog Speicherobjekt
     */

    constructor( aRegisterFlag = true ) {
        super( INTERPRETER_PLUGIN_NAME, aRegisterFlag );
        this._setErrorClassName( 'InterpreterPlugin' );
    }


    /**
     * Initialisierung des Interpreters
     *
     * @param {any} aOption - optionale Parameter
     *
     * @return {number} Fehlercode 0 oder -1
     */

    init( aOption?: any ): number {
        return super.init( aOption );
    }


    /**
     * Freigabe des Interpreters
     *
     * @return {number} Fehlercode 0 oder -1
     */

    done(): number {
        this.mDialogName = DIALOG_MAIN_NAME;
        this.mStateName = DIALOG_ROOTSTATE_NAME;
        this.mStateContext = null;
        // TODO: Typensichere Promise mit cancel() als Erweiterung funktioniert noch nicht
        this.mNodePromise = null;
        this.mDialogRunFlag = false;
        this.mSpeakRunFlag = false;
        // Gruppen-Attribute
        this.mGroupId = 0;
        this.mGroupProperty = '';
        this.mGroupActionFlag = false;
        this.mNoWaitNodeFlag = false;
        // Funktionen
        this.mGetDialogStateFunc = null;
        // TODO: Idee, hier schon die Dialog-Ereignisfunktionen einzutragen
        this.mDialogSetFunc = null;
        this.mDialogStartFunc = null;
        this.mDialogStopFunc = null;
        this.mDialogStateSetFunc = null;
        this.mDialogActionFunc = null;
        this.mDialogSpeakFunc = null;
        this.mDialogSpeakStartFunc = null;
        this.mDialogSpeakStopFunc = null;
        return super.done();
    }


    // Event-Funktionen


    /**
     * DialogSet Ereignis senden
     *
     * @private
     * @param {string} aDialogName - Dialogname, der eingestellt worden ist
     *
     * @return {number} errorcode (0,-1)
     */

    _onDialogSet( aDialogName: string ): number {
        if ( typeof this.mDialogSetFunc === 'function' ) {
            try {
                // console.log('InterpreterPlugin._onDialogSet: Funktionsaufruf:', aDialogName);
                return this.mDialogSetFunc( aDialogName );
            } catch ( aException ) {
                this._exception( '_onDialogSet', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * DialogStart Ereignis senden
     *
     * @private
     * @return {number} errorcode (0,-1)
     */

    _onDialogStart(): number {
        if ( typeof this.mDialogStartFunc === 'function' ) {
            try {
                return this.mDialogStartFunc( 0 );
            } catch ( aException ) {
                this._exception( '_onDialogStart', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * DialogStop Ereignis senden
     *
     * @private
     * @return {number} errorcode (0,-1)
     */

    _onDialogStop(): number {
        if ( typeof this.mDialogStopFunc === 'function' ) {
            try {
                return this.mDialogStopFunc();
            } catch ( aException ) {
                this._exception( '_onDialogStop', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * DialogState Ereignis senden
     *
     * @private
     * @param {string} aStateName - Zustandsname, der eingestellt worden ist
     *
     * @return {number} errorcode (0,-1)
     */

    _onDialogStateSet( aStateName: string ): number {
        if ( typeof this.mDialogStateSetFunc === 'function' ) {
            try {
                return this.mDialogStateSetFunc( aStateName );
            } catch ( aException ) {
                this._exception( '_onDialogStateSet', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * DialogAction Ereignis senden
     *
     * @private
     * @param {DialogNodeInterface} aNode - Actionknoten
     *
     * @return {number} errorcode (0,-1)
     */

    _onDialogAction( aNode: DialogNodeInterface ): number {
        if ( typeof this.mDialogActionFunc === 'function' ) {
            try {
                const action: DialogActionInterface = {
                    event: SPEECH_DIALOGACTION_EVENT,
                    state: this.mStateName,
                    action: aNode.getName(),
                    type: aNode.getObjectType(),
                    id: aNode.getObjectName(),
                };
                return this.mDialogActionFunc( action );
            } catch ( aException ) {
                this._exception( '_onDialogAction', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Speak Ereignis senden
     *
     * @private
     * @param {DialogNodeInterface} aNode - Actionknoten
     *
     * @return {number} errorcode (0,-1)
     */

    _onDialogSpeak( aNode: DialogNodeInterface ): number {
        if ( typeof this.mDialogSpeakFunc === 'function' ) {
            try {
                const speak: DialogSpeakInterface = {
                    event: SPEECH_DIALOGSPEAK_EVENT,
                    state: this.mStateName,
                    id: aNode.getNodeId().toString(),
                    text: aNode.getText(),
                    timeout: aNode.getTimeout()
                };
                return this.mDialogSpeakFunc( speak );
            } catch ( aException ) {
                this._exception( '_onDialogSpeak', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * SpeakStart Ereignis senden
     *
     * @private
     * @return {number} errorcode (0,-1)
     */

    _onDialogSpeakStart(): number {
        if ( typeof this.mDialogSpeakStartFunc === 'function' ) {
            try {
                return this.mDialogSpeakStartFunc();
            } catch ( aException ) {
                this._exception( '_onDialogSpeakStart', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * SpeakStop Ereignis senden
     *
     * @private
     * @return {number} errorcode (0,-1)
     */

    _onDialogSpeakStop(): number {
        if ( typeof this.mDialogSpeakStopFunc === 'function' ) {
            try {
                return this.mDialogSpeakStopFunc();
            } catch ( aException ) {
                this._exception( '_onDialogSpeakStop', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Event-Funktion fuer Dialog eintragen
     *
     * @param {OnDialogSetFunc} aOnDialogSetFunction - Event Funktion fuer DialogSet
     */

    set onDialogSet( aDialogSetFunc: OnDialogSetFunc ) {
        this.mDialogSetFunc = aDialogSetFunc;
    }


    /**
     * Event-Funktion fuer Start des Dialogs
     *
     * @param {OnDialogStartFunc} aOnDialogStartFunction - Event Funktion fuer DialogStart
     */

    set onDialogStart( aDialogStartFunc: OnDialogStartFunc ) {
        this.mDialogStartFunc = aDialogStartFunc;
    }


    /**
     * Event-Funktion fuer Stop des Dialogs
     *
     * @param {OnDialogStopFunc} aOnDialogStopFunction - Event Funktion fuer DialogStop
     */

    set onDialogStop( aDialogStopFunc: OnDialogStopFunc ) {
        this.mDialogStopFunc = aDialogStopFunc;
    }


    /**
     * Event-Funktion fuer setzen des Dialogszustands
     *
     * @param {OnDialogStateFunc} aOnDialogStateFunction - Event Funktion fuer DialogState
     */

    set onDialogStateSet( aDialogStateSetFunc: OnDialogStateSetFunc ) {
        this.mDialogStateSetFunc = aDialogStateSetFunc;
    }


    /**
     * Event-Funktion fuer Dialogaktionen
     *
     * @param {OnDialogActionFunc} aOnDialogActionFunction - Event Funktion fuer DialogAction
     */

    set onDialogAction( aDialogActionFunc: OnDialogActionFunc ) {
        this.mDialogActionFunc = aDialogActionFunc;
    }


    /**
     * Event-Funktion fuer Sprachausgabe
     *
     * @param {OnDialogSpeakFunc} aOnDialogSpeakFunction - Event Funktion fuer Speak
     */

    set onDialogSpeak( aDialogSpeakFunc: OnDialogSpeakFunc ) {
        this.mDialogSpeakFunc = aDialogSpeakFunc;
    }


    /**
     * Event-Funktion fuer Start der Sprachausgabe
     *
     * @param {OnDialogSpeakStartFunc} aOnDialogSpeakStartFunction - Event Funktion fuer SpeakStart
     */

    set onDialogSpeakStart( aDialogSpeakStartFunc: OnDialogSpeakStartFunc ) {
        this.mDialogSpeakStartFunc = aDialogSpeakStartFunc;
    }


    /**
     * Event-Funktion fuer Stop der Sprachausgabe
     *
     * @param {OnDialogSpeakStopFunc} aOnDialogSpeakStopFunction - Event Funktion fuer SpeakStop
     */

    set onDialogSpeakStop( aDialogSpeakStopFunc: OnDialogSpeakStopFunc ) {
        this.mDialogSpeakStopFunc = aDialogSpeakStopFunc;
    }


    // API-Funktionen


    /**
     * Aufruf der Store-Funktion, um das aktuelle Dialogzustandsobjekt zu holen
     *
     * @param aDialogName - Name des aktuellen Dialogs
     * @param aStateName - Name des aktuellen Dialogzustands
     *
     * @return {DialogStateInterface}
     */

    _getDialogState( aDialogName: string, aStateName: string ): DialogStateInterface {
        if (typeof this.mGetDialogStateFunc === 'function' ) {
            return this.mGetDialogStateFunc( aDialogName, aStateName );
        }
        return null;
    }


    /**
     * Dialogname setzen fuer gesamten Dialog mit allen Dialog-Zustaenden
     *
     * @param {string} aDialogName - Name des Dialogs
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    setDialog( aDialogName: string ): number {
        // console.log('InterpreterPlugin.setDialog:', aDialogName);
        if ( !aDialogName ) {
            this._error( 'setDialog', 'kein Dialogname uebergeben' );
            return -1;
        }
        if ( aDialogName === this.mDialogName ) {
            return 0;
        }
        this.stopDialog();
        this.mDialogName = aDialogName;
        // Event fuer geaenderten Dialognamen erzeugen
        return this._onDialogSet( aDialogName );
    }


    /**
     * Hier wird der aktuelle Dialogname zurueckgegeben
     *
     * @returns {string} dialogName - Name des Dialogs
     */

    getDialog(): string {
        return this.mDialogName;
    }


    /**
     * Dialog starten
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    startDialog(): number {
        try {
            console.log('InterpreterPlugin.startDialog:', this.mDialogName, this.mStateName);
            if ( this.isDialogRunning()) {
                this._error( 'startDialog', 'Dialog laeuft bereits' );
                return -1;
            }
            const dialogState = this._getDialogState( this.mDialogName, this.mStateName );
            if ( !dialogState ) {
                this._error( 'startDialog', 'kein DialogState vorhanden' );
                return -1;
            }
            // asynchroner Start des Dialogs
            this._runState( dialogState );
            return 0;
        } catch ( aException ) {
            this._exception( 'startDialog', aException );
            return -1;
        }
    }


    /**
     * Dialog sofort beenden
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    stopDialog(): number {
        // console.log('InterpreterPlugin.stopDialog');
        try {
            this._clearGroup();
            this._clearNodePromise();
            this._clearSpeakRunFlag();
            this._clearDialogRunFlag();
            return 0;
        } catch ( aException ) {
            this._exception( 'stopDialog', aException );
            return -1;
        }
    }


    /**
     * pruefen auf laufenden Dialog
     *
     * @return {boolean} runningFlag - true, wenn Dialog gerade laeuft
     */

    isDialogRunning(): boolean {
        return this.mDialogRunFlag;
    }


    /**
     * Dialog-Zustand und Kontext setzen
     *
     * @param {string} aStateName - Name des Dialogzustands
     * @param {DialogStateContextInterface} aStateContext - Zustandskontextobjekt
     *
     * @return {number} errorcode(0,-1) - Fehlercode
     */

    setState( aStateName: string, aStateContext: DialogStateContextInterface ): number {
        // console.log('InterpreterPlugin.setState:', aStateName, aStateContext);
        if ( !aStateName ) {
            this._error( 'setState', 'kein StateName uebergeben' );
            return -1;
        }
        if ( aStateName === this.mStateName ) {
            return 0;
        }
        // pruefen auf laufenden Dialog
        this.stopDialog();
        this.mStateName = aStateName;
        this.mStateContext = aStateContext;
        // Event fuer geaenderten State nur erzeugen, wenn Dialog aktiv war
        return this._onDialogStateSet( aStateName );
    }


    getState(): string {
        return this.mStateName;
    }


    /**
     * Dialog-Zustandskontext eintragen
     *
     * @param {DialogStateContextInterface} aStateContext - Dialog Zustandskontxtobjekt
     *
     * @return {number} errorcode(0,-1)
     */

    setStateContext( aStateContext: DialogStateContextInterface): number {
        // debug('setStateContext:', aStateContext);
        if ( !this.isDialogRunning()) {
            this.mStateContext = aStateContext;
            return 0;
        }
        return -1;
    }


    // lokale Methoden


    /**
     * setzen des Dialog run flags
     *
     * @private
     * @returns {number} errorcode(0,-1)
     */

    _setDialogRunFlag(): number {
        const runFlag = this.mDialogRunFlag;
        this.mDialogRunFlag = true;
        if ( !runFlag ) {
            // debug('_setDialogRunFlag: Dialog gestartet');
            // Event Dialog gestartet erzeugen
            return this._onDialogStart();
        }
        return 0;
    }


    /**
     * Loeschen des Dialog Run Flags
     *
     * @private
     * @return {number} errorcode(0,-1)
     */

    _clearDialogRunFlag() {
        const runFlag = this.mDialogRunFlag;
        this.mDialogRunFlag = false;
        if ( runFlag ) {
            // debug('_clearDialogRunFlag: Dialog beendet');
            // Ereignis Dialog beendet erzeugen
            return this._onDialogStop();
        }
        return 0;
    }


    /**
     * pruefen, ob Sprachausgabe gerade laeuft
     *
     * @return {boolean} speakRunFlag - true, wenn Sprachausgabe gerade laeuft
     */

    isSpeakRunning(): boolean {
        return this.mSpeakRunFlag;
    }


    /**
     * Setzen des Sprach Run Flags
     *
     * @private
     * @return {number} errorcode(0,-1)
     */

    _setSpeakRunFlag() {
        const runFlag = this.mSpeakRunFlag;
        this.mSpeakRunFlag = true;
        if ( !runFlag ) {
            // debug('_setSpeakRunFlag: Speak gestartet');
            // Event Speak gestartet erzeugen
            return this._onDialogSpeakStart();
        }
        return 0;
    }


    /**
     * Loeschen des Sprach Run Flags
     *
     * @private
     * @returns {number} errorcode(0,-1)
     */

    _clearSpeakRunFlag() {
        const runFlag = this.mSpeakRunFlag;
        this.mSpeakRunFlag = false;
        if ( runFlag ) {
            // debug('_clearSpeakRunFlag: Speak beendet');
            // Event Speak beendet erzeugen
            return this._onDialogSpeakStop();
        }
        return 0;
    }


    /**
     * internen Warteknoten erzeugen
     *
     * @private
     * @return {DialogNodeInterface} waitNode
     */

    _getWaitNode(): DialogNodeInterface {
        return new DialogNode( DIALOG_WAIT_NODE, 0, 0, 0, 0 );
    }


    /**
     * Eintragen der globalen Promise
     *
     * @private
     * @param {Promise} aNodePromise
     */

    _setNodePromise( aNodePromise: Promise<any> ): void {
        this.mNodePromise = aNodePromise;
    }


    /**
     * Loeschen der globalen Promise
     *
     * @private
     */

    _clearNodePromise(): void {
        if ( this.mNodePromise && this.mNodePromise.cancel ) {
            this.mNodePromise.cancel();
            this.mNodePromise = null;
        }
    }


    /**
     * Ueberspringen des naechsten Speak-Knotens, wenn er laeuft, wird er sofort abgebrochen
     * und mit dem folgenden Knoten weitergemacht.
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    skipNextSpeakNode(): number {
        // debug('skipNextSpeakNode: start');
        // pruefen auf Dialog
        if ( !this.isDialogRunning()) {
            // debug('skipNextSpeakNode: kein Dialog');
            return 0;
        }
        // pruefen auf Sprachknoten
        if ( !this.isSpeakRunning()) {
            // debug('skipNextSpeakNode: kein Speak-Knoten');
            return 0;
        }
        // pruefen auf Promise
        if ( !this.mNodePromise ) {
            this._error( 'skipNextSpeakNode', 'keine Knoten-Promise vorhanden' );
            return -1;
        }
        // Promise abbrechen
        try {
            // debug('skipNextSpeakNode: Speak-Knoten stoppen');
            this.mNodePromise.cancel();
            this.mSpeakRunFlag = false;
            return 0;
        } catch ( aException ) {
            this._exception( 'skipNextSpeakNode', aException );
            return -1;
        }
    }


    /**
     * startet den Dialog-Zustand, verarbeitet alle Knoten asynchron
     *
     * @private
     * @param {DialogStateInterface} aDialogState - Dialog Zustandsobjekt
     */

    async _runState( aDialogState: DialogStateInterface ) {
        // console.log('_runState: start ', aDialogState);
        const nodeId = aDialogState.getFirstDialogNodeId();
        if ( !nodeId ) {
            this._error( 'runState', 'kein Knoten vorhanden' );
            return;
        }
        // debug('_runState: nodeId=', nodeId);
        // Schleife wird asynchron ausgefuehrt
        this._setDialogRunFlag();
        let node = aDialogState.getDialogNode( nodeId );
        let nextId = 0;
        let nextTimeout = 0;
        this.mNoWaitNodeFlag = false;
        while ( node && this.mDialogRunFlag ) {
            // console.log('DialogInterpreter.runState: node=', node);
            // Knoten mit Timeout ausfuehren
            // console.log('_runState: begin', node.getNodeId());
            try {
                await this._runAsyncNode( node, nextTimeout );
            } catch (aException) {
                this._exception( '_runState', aException );
            }
            // console.log('_runState: end', node.getNodeId());
            nextId = node.getNextId();
            nextTimeout = node.getTimeout();
            // pruefen auf naechsten Knoten
            if ( !nextId ) {
                // pruefen auf vorhandenen Timeout
                // console.log('_runState: lastTimeout=', nextTimeout, this.mNoWaitNodeFlag);
                if ( nextTimeout > 0 && this.mNoWaitNodeFlag === false ) {
                    // temporaerer Wait-Knoten hinfuegen, um den Timeout
                    // abzuwarten.
                    node = this._getWaitNode();
                } else {
                    break;
                }
            } else {
                // pruefen auf nicht ausgegebenen Text, dann Timeout loeschen !
                if ( this.mNoWaitNodeFlag ) {
                    nextTimeout = 0;
                }
                node = aDialogState.getDialogNode( nextId );
                if ( !node ) {
                    this._error( '_runState', 'kein Knoten zur Knoten-ID vorhanden' );
                }
            }
        }
        this._clearSpeakRunFlag();
        this._clearDialogRunFlag();
    }


    /**
     * Einzelnen Knoten asynchron ausfuehren
     *
     * @private
     * @param {DialogNodeInterface} aNode - Dialog Knoten
     * @param {number} aTimeout  - Timeout fuer Ausfuehrung des Knotens
     *
     * @return {Promise} dialogPromise - Promise fuer Knoten zurueckgeben
     */

    _runAsyncNode( aNode: DialogNodeInterface, aTimeout: number ): Promise<any> {
        // debug('_runAsyncNode:', aNode.getNodeId(), aTimeout);
        let promiseCancel = null;
        const promise = new Promise(( resolve, reject ) => {
            // debug('DialogInterpreter._runAsyncNode: promise.start');
            if ( !this.isDialogRunning()) {
                this._clearNodePromise();
                resolve();
                return;
            }
            // Knoten mit Timeout ausfuehren
            const timeoutId = setTimeout(() => {
                // debug('_runAsyncNode:', aNode.getNodeId());
                try {
                    this._runNode( aNode );
                    this._clearNodePromise();
                    resolve();
                } catch ( aException ) {
                    this._exception( '_runAsyncNode', aException );
                    this._clearNodePromise();
                    reject( aException );
                }
            }, aTimeout );
            // Timeout abbrechen
            promiseCancel = () => {
                clearTimeout( timeoutId );
                resolve();
            };
            // debug('DialogInterpreter._runAsyncNode: promise.end');
        });
        // TODO: Untersuchen, wie Eigenschaft der Promis eingetragen werden kann
        // Abbruchfunktion fuer Promise
        const cancelName = 'cancel';
        promise[ cancelName ] = () => {
            // debug('_runAsyncNode: promise.cancel');
            promiseCancel();
        };
        this._setNodePromise( promise );
        return promise;
    }


    /**
     * Knoten einzeln ausfuehren
     *
     * @private
     * @param {DialogNodeInterface} aNode - Knoten Datenobjekt
     */

    _runNode( aNode: DialogNodeInterface ): void {
        // debug('_runNode: start');
        // pruefen, ob Knoten ausgefuert werden darf
        if ( !this.isDialogRunning()) {
            return;
        }
        // Sprachausgabe ist beendet
        this._clearSpeakRunFlag();
        // Auswahl des auszufuehrenden Knotens
        switch ( aNode.getNodeType()) {
            case DIALOG_GROUP_NODE:
                this._runGroup( aNode );
                break;
            case DIALOG_ACTION_NODE:
                this._runAction( aNode );
                break;
            case DIALOG_SPEAK_NODE:
                this._runSpeak( aNode );
                break;
            case DIALOG_WAIT_NODE:
                this._runWait( aNode );
                break;
            default:
                this._error( '_runNode', 'kein gueltiger Knoten ' + aNode.getNodeId());
                break;
        }
    }


    /**
     * Gruppenknoten ausfuehren
     *
     * @private
     * @param {DialogNodeInterface} aNode - Knoten Datenobjekt
     */

    _runGroup( aNode: DialogNodeInterface ): void {
        // console.log('_runGroup:', aNode.getNodeId());
        // einstellen des Gruppenmodus
        this.mGroupId = aNode.getNodeId();
        this.mGroupProperty = aNode.getProperty();
        this.mGroupActionFlag = false;
        this.mNoWaitNodeFlag = false;
    }


    /**
     * Gruppendaten loeschen
     *
     * @private
     */

    _clearGroup(): void {
        // console.log('_clearGroup');
        this.mGroupId = 0;
        this.mGroupProperty = '';
        this.mGroupActionFlag = false;
        this.mNoWaitNodeFlag = false;
    }


    /**
     * pruefen auf vorhandene Gruppeneigenschaft
     *
     * @private
     * @param {any} aNodeProperty - Knoteneigenschaft
     * @param {string} aNodeObjectName - Objektname
     *
     * @return {boolean} isGroupProperty - true, wenn Gruppe vorhanden ist
     */

    _isGroupProperty( aNodeProperty: any, aNodeObjectName: string ): boolean {
        // console.log('_isGroupProperty:', aNodeProperty, aNodeObjectName, this.mStateContext);
        if ( !this.mStateContext ) {
            // console.log('isGroupProperty: kein StateContext');
            return false;
        }
        const property = this.mStateContext.property;
        // console.log('_isGroupProperty: property=', property);
        if ( !property ) {
            // console.log('_isGroupProperty: keine Eigenschaft vorhanden');
            return false;
        }
        const nodeProperty = property[ aNodeProperty ];
        // console.log('_isGroupProperty: nodeProperty=', nodeProperty);
        if ( !nodeProperty ) {
            // console.log('_isGroupProperty: keine Knoteneigenschaft vorhanden');
            return false;
        }
        // Schleife fuer alle IDs der Knoten-Eigenschaft
        for ( const propertyItem of nodeProperty ) {
            // console.log('_isGroupProperty: propertyItem=', propertyItem, ' NodeName=', aNodeObjectName);
            if ( propertyItem === aNodeObjectName ) {
                // console.log('_isGroupProperty: Knoten gefunden');
                return true;
            }
        }
        // console.log('_isGroupProperty: Knoten nicht gefunden');
        return false;
    }


    /**
     * pruefen, ob ein Knoten ausgefuehrt werden soll
     *
     * @private
     * @param {DialogNodeInterface} aNode - Knotenobjekt
     *
     * @return {boolean} nodeRunFlag - true, wenn Knoten ausgefuehrt werden kann
     */

    _checkRunNode( aNode: DialogNodeInterface ): boolean {
        // console.log('InterpreterPlugin._checkRunNode:', this.mGroupId);
        // pruefen auf vorhandenen Gruppenknoten
        if ( this.mGroupId === 0 ) {
            return true;
        }
        // pruefen auf optionalen Knoten
        if ( aNode.getParentId() === this.mGroupId ) {
            // pruefen auf vorhandene Eigenschaft
            // console.log('_checkRunNode: GroupPropery=', this.mGroupProperty, ' NodeProperty=', aNode.getProperty());
            if ( this.mGroupProperty.length > 0 && this.mGroupProperty === aNode.getProperty()) {
                // pruefen auf vorhandene Eigenschaft zum Knoten im Zustand
                return this._isGroupProperty( aNode.getProperty(), aNode.getObjectName());
            }
            // ist eigentlich ein Fehler, da im Knoten zur Gruppe die gleiche Eigenschaft enthalten sein muesste!
            return false;
        } else {
            if ( aNode.getParentId() === 0 ) {
                this._clearGroup();
            }
        }
        return true;
    }


    /**
     * Aktion ausfuehren
     *
     * @private
     * @param {DialogNodeInterface} aNode - Knoten Datenobjekt
     */

    _runAction( aNode: DialogNodeInterface ): void {
        // console.log('InterpreterPlugin._runAction:', aNode.getName(), aNode.getObjectType(), aNode.getObjectName());
        // pruefen auf auszugebenden Knoten
        if ( this._checkRunNode(aNode)) {
            // Action-Event erzeugen
            // console.log('_runAction: wird ausgefuehrt');
            this._onDialogAction( aNode );
            this.mGroupActionFlag = true;
        }
    }


    /**
     * Sprachausgabe ausfuehren
     *
     * @private
     * @param {DialogNodeInterface} aNode - Sprachknoten Datenobjekt
     */

    _runSpeak( aNode: DialogNodeInterface ): void {
        // console.log('InterpreterPlugin._runSpeak:', aNode.getTimeout(), aNode.getText());
        if ( this.isSpeakRunning()) {
            this._error( '_runSpeak', 'Speak laeuft bereits' );
            return;
        }
        // pruefen auf ausfuehrbaren Knoten
        // console.log('_runSpeak:', aNode.getParentId(), this.mGroupId, this.mGroupActionFlag);
        if ( this.mGroupId !== 0 && aNode.getParentId() === this.mGroupId ) {
            if ( this.mGroupActionFlag === false ) {
                this.mNoWaitNodeFlag = true;
                return;
            }
        } else {
            this._clearGroup();
        }
        // Speak-Event erzeugen
        // console.log('_runSpeak: wird ausgefuehrt');
        this._onDialogSpeak( aNode );
        this._setSpeakRunFlag();
    }


    /**
     * Warten ausfuehren
     *
     * @private
     * @param {DialogNodeInterface} aNode - Knotenobjekt
     */

    _runWait( aNode: DialogNodeInterface ): void {
        // console.log('InterpreterPlugin._runWait', aNode.getTimeout());
    }


    // Bind-Funktionen


    setGetDialogStateFunc( aGetDialogStateFunc: StoreGetDialogStateFunc ): number {
        this.mGetDialogStateFunc = aGetDialogStateFunc;
        return 0;
    }

}
