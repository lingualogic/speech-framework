/** @packageDocumentation
 * Plugin Basiskomponente, von der alle Plungins abgeleitet sind
 *
 * Letzte Aenderung: 19.10.2018
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */


// global

import { OnSpeechInitFunc, OnSpeechErrorFunc, SpeechErrorFunc } from '../interface/speech-function.type';
import { SpeechMessageInterface } from '../interface/speech-message.interface';


// error

import { ErrorBase } from '../error/error-base';


// plugin

import { PluginInterface, PluginHandleMessageFunc } from './plugin.interface';
import { PluginManager } from './plugin-manager';


/**
 * Definiert die Basisklasse aller Plugins
 *
 * @export
 * @class AudioPlugin
 * @implements {PluginInterface}
 */

export class Plugin extends ErrorBase implements PluginInterface {

    mPluginName = '';

    // Events

    mOnInitFunc: OnSpeechInitFunc = null;
    mOnErrorFunc: OnSpeechErrorFunc = null;

    // interne Attribute

    mInitFlag = false;
    mActiveFlag = false;


    /**
     * Creates an instance of Plugin.
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {boolean} aRegisterFlag - true, wenn Plugin in PluginManager eingetragen werden soll
     */

    constructor( aPluginName: string, aRegisterFlag = true ) {
        super( 'Plugin' );
        this._setErrorClassName( this.getClass());
        this.mPluginName = aPluginName;
        // console.log('Plugin.constructor:', aPluginName, aRegisterFlag);
        if ( aRegisterFlag && PluginManager.insert( aPluginName, this ) !== 0 ) {
            throw new Error('Plugin ' + this.getName() + ' ist bereits im PluginManager vorhanden');
        }
        // verbinden der Errorfunktion mit dem ErrorEvent
        this._setErrorOutputFunc( this._getErrorOutputFunc());
    }


    // Plugin-Funktionen


    /**
     * pruefen auf Mock-Plugin zum Testen
     *
     * @return {boolean} mockFlag - true, wenn Plugin ein Mock zum Testen ist
     */

    isMock(): boolean {
        return false;
    }


    /**
     * Rueckgabe eines logischen Plugin-Typs
     *
     * @return {string} pluginType - logischer Typ des Plugins fuer unterschiedliche Anwendungsschnittstellen
     * @memberof PluginInterface
     */

    getType(): string {
        return 'Plugin';
    }


    /**
     * Rueckgabe der Plugin-Klasse
     *
     * @return {string} pluginClass - konkrete Klasse des Plugins
     */

    getClass(): string {
        return 'Plugin';
    }


    /**
     * Rueckgabe des Plugin-Namens
     *
     * @return {string} pluginName - Rueckgabe des Plugin-Namens
     */

    getName(): string {
        return this.mPluginName;
    }


    /**
     * initialisert das Plugin
     *
     * erlaubte optionale Parameter:
     *
     *      activeFlag      - legt fest, ob das Plugin zum Start aktiviert ist oder nicht
     *      errorOutputFlag - legt fest, ob die Fehlerausgabe auf der Konsole erfolgt
     *
     *
     * @param {any} aOption - optionale Parameter fuer die Konfiguration des Plugins
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    init( aOption?: any ): number {
        this.mActiveFlag = true;
        if ( aOption ) {
            // traegt das activeFlag ein
            if ( typeof aOption.activeFlag === 'boolean' ) {
                // console.log('Plugin.init: activeFlag =', aOption.activeFlag, this.getName());
                this.mActiveFlag = aOption.activeFlag;
            }
            // traegt das errorOutputFlag ein
            if ( typeof aOption.errorOutputFlag === 'boolean' ) {
                // console.log('Plugin.init: errorOutputFlag =', aOption.errorOutputFlag, this.getName());
                this._setErrorOutput( aOption.errorOutputFlag );
            }
        }
        this.mInitFlag = true;
        return 0;
    }


    /**
     * gibt das Plugin frei
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     * @memberof PluginInterface
     */

    done(): number {
        // console.log('Plugin.done:', this.getName());
        this.mInitFlag = false;
        this.mActiveFlag = false;
        this.mOnInitFunc = null;
        this.mOnErrorFunc = null;
        super._setErrorOutputDefault();
        return 0;
    }


    /**
     * setzt das Plugin wieder auf Defaultwerte und uebergebene optionale Parameter.
     * Die Fehlerausgabe wird nicht zurueckgesetzt.
     *
     * @param {any} aOption - optionale Parameter
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    reset( aOption?: any ): number {
        this.mActiveFlag = this.isInit();
        return 0;
    }


    /**
     * pruefen auf initialisertes Plugin
     *
     * @return {boolean} initFlag - true, Plugin ist initialisiert, false sonst
     * @memberof PluginInterface
     */

    isInit(): boolean {
        return this.mInitFlag;
    }


    /**
     * internes loeschen des Init-Flags, falls Init abgebrochen werden muss
     *
     * @protected
     */

    _clearInit(): void {
        this.mInitFlag = false;
        this.mActiveFlag = false;
    }


    /**
     * Dynamische Konfiguration des Plugins
     *
     * @param {any} aFeatureInfo - Konfigurationsdaten
     */

    setFeatureList( aFeatureInfo: any ): number {
        return 0;
    }


    /**
     * pruefen, ob Plugin aktiv ist
     *
     * @return {boolean} Aktiv ein oder aus
     */

    isActive(): boolean {
        return this.mActiveFlag;
    }


    /**
     * Plugin aktiv setzen (Default)
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setActiveOn(): number {
        this.mActiveFlag = true;
        return 0;
    }


    /**
     * Plugin deaktivieren
     *
     * @return {number}
     */

    setActiveOff(): number {
        this.mActiveFlag = false;
        return 0;
    }


    /**
     * Rueckgabe der internen Fehlerfunktion fuer innere Klassen
     *
     * @private
     * @return {SpeechErrorFunc} Rueckgabe der Fehlerfunktion fuer ErrorBase
     * @memberof Plugin
     */

    _getErrorOutputFunc(): SpeechErrorFunc {
        // Uebersetzt ErrorBase Fehlerfunktion mit Fehlertext in Fehlerevent mit erzeugtem Fehlerobjekt
        return (aErrorText: string) => this._onError( new Error( aErrorText));
    }


    // Nachrichten-Funktionen


    /**
     * Nachrichten verarbeiten
     *
     * @param {SpeechMessageInterface} aMessage - zu verarbeitende Nachricht
     * @return {number} errorCode(0,-1)
     */

    handleMessage( aMessage: SpeechMessageInterface ): number {
        return 0;
    }


    /**
     * Rueckgabe der Nachrichtenverarbeitungsfunktion
     *
     * @return {PluginHandleMessageFunc} handleMessageFunc
     */

    getHandleMessageFunc(): PluginHandleMessageFunc {
        return (aMessage: SpeechMessageInterface) => this.handleMessage( aMessage );
    }


    // Event-Funktionen


    /**
     * Ereignisfunktion fuer Init aufrufen
     *
     * @private
     * @param {string} aPluginName - Name des initialiserten Plugins
     *
     * @return {number} errorCode(0,-1)
     */

    _onInit(): number {
        // console.log('Plugin._onInit:', this.getName(), this.mOnInitFunc);
        if (typeof this.mOnInitFunc === 'function') {
            try {
                return this.mOnInitFunc( this.getName());
            } catch ( aException ) {
                this._exception( 'Plugin._onInit', aException );
                return -1;
            }
        }
        return 0;
    }


    /**
     * Ereignisfunktion fuer Fehler aufrufen
     *
     * @private
     * @param {any} aError - Error Datentransferobjekt
     * @return {number} errorCode(0,-1)
     */

    _onError( aError: any ): number {
        // console.log('Plugin._onError:', this.getName(), aError);
        if (typeof this.mOnErrorFunc === 'function') {
            try {
                // console.log('Plugin._onError: call', this.mOnErrorFunc);
                return this.mOnErrorFunc( aError );
            } catch ( aException ) {
                if ( this.isErrorOutput()) {
                    // hier darf nicht this._exception() verwendet werden, da sonst eine Endlosschleife entstehen kann!
                    console.log( '===> EXCEPTION Plugin._onError: ', aException.message );
                }
                return -1;
            }
        }
        return 0;
    }


    /**
     * Init-Event Funktion eintragen
     *
     * @param {OnSpeechInitFunc} aOnInitFunc
     */

    set onInit( aOnInitFunc: OnSpeechInitFunc ) {
        // console.log('Plugin.onInit:', this.getName(), aOnInitFunc);
        this.mOnInitFunc = aOnInitFunc;
    }


    /**
     * Init-Event Funktion zurueckgeben
     *
     * @readonly
     * @type {OnSpeechInitFunc}
     */

    get onInit(): OnSpeechInitFunc {
        return () => this._onInit();
    }


    /**
     * Error-Event Funktion eintragen
     *
     * @param {OnSpeechErrorFunc} aOnErrorFunc
     */

    set onError( aOnErrorFunc: OnSpeechErrorFunc ) {
        // console.log('Plugin.onError:', aOnErrorFunc);
        this.mOnErrorFunc = aOnErrorFunc;
    }


    /**
     * Error-Event Funktion zurueckgeben
     *
     * @readonly
     * @type {OnSpeechErrorFunc}
     */

    get onError(): OnSpeechErrorFunc {
        return (aError: any) => this._onError( aError );
    }


    // Test-Funktionen


    /**
     * Fuehrt Testkommandos aus, um interne Tests ablaufen lassen zu koennen
     * @param {string} aTestCommand - Testkommando
     * @param {*} aTestData - optionale Testdaten
     *
     * @return {*} Rueckgabe der Testergebnisse
     */

    test( aTestCommand: string, aTestData?: any ): any {
        return { result: 0 };
    }

}
