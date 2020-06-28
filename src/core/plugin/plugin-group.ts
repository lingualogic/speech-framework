/** @packageDocumentation
 * PluginGroup als Manager fuer Plugins.
 *
 * Letzte Aenderung: 05.11.2018
 * Status: gruen
 *
 * @module core/plugin
 * @author SB
 */


// global

import { SpeechMessageInterface, SpeechSendMessageFunc } from '../interface/speech-message.interface';


// plugin

import { PluginList } from './plugin-list';
import { PluginInterface } from './plugin.interface';
import { Plugin } from './plugin';
import { PluginGroupInterface } from './plugin-group.interface';


/**
 * Definiert die Basisklasse aller PluginGroup
 */

export class PluginGroup extends Plugin implements PluginGroupInterface {


    mSendMessageFunc: SpeechSendMessageFunc = null;


    /**
     * Liste aller eingefuegten Plugins
     *
     * @type {PluginList}
     */

    mPluginList = new PluginList();


    /**
     * Aktuell ausgewaehltes Plugin
     *
     * @type {Plugin}
     */

    mCurrentPlugin: PluginInterface = null;


    /**
     * Erzeugt eine Instanz von PluginGroup
     *
     * @param {string} aPluginGroupName - Name der PluginGroup
     * @param {boolean} aRegisterFlag - wenn true, dann wird PluginGroup in PluginManager eingetragen
     */

    constructor( aPluginGroupName: string, aRegisterFlag = true ) {
        super( aPluginGroupName, aRegisterFlag );
        this.mPluginList._setErrorOutputFunc(this._getErrorOutputFunc());
    }


    // PluginGroup-Funktionen


    getType(): string {
        return 'PluginGroup';
    }


    getClass(): string {
        return 'PluginGroup';
    }


    /**
     * Initalisiert die PluginGroup
     *
     * @param {any} aOption - optionale Parameter
     * @return {number} Fehlercode 0 oder -1
     */

    init( aOption?: any ): number {
        if ( super.init( aOption ) !== 0 ) {
            return -1;
        }

        // Initialisierung aller eingetragenen Plugins

        if ( this.startAllPlugin( aOption ) !== 0 ) {
            this._clearInit();
            return -1;
        }

        return 0;
    }


    /**
     * Gibt die PluginGroup frei
     *
     * @return {number} Fehlercode 0 oder -1
     */

    done(): number {
        this.mCurrentPlugin = null;
        // TODO: Problem der shared Plugins, muss mit Referenzzaehler geloest werden
        this.stopAllPlugin();
        // this.removeAllPlugin();
        return super.done();
    }


    /**
     * Konfiguration der PluginGroup eintragen
     *
     * @param {*} aFeatureInfo - Informationen zu den Features der PluginGroup
     *
     * @return {number} errorCode(0,-1)
     */

    setFeatureList( aFeatureInfo: any ): number {
        // console.log('PluginGroup.setFeatureList:', aFeatureInfo);
        // Funktion zum testen eines leeren Objekts
        const isEmpty = (obj: any) => {
            for ( const key in obj ) {
                if ( obj.hasOwnProperty( key )) {
                    // console.log('PluginGroup.setFeatureList: key = ', key);
                    return false;
                }
            }
            return true;
        };
        // pruefen auf gueltiges Objekt
        if ( typeof aFeatureInfo !== 'object' ) {
            this._error('setFeatureList', 'keine gueltige Feature Liste');
            return -1;
        }
        // pruefen auf leeres Objekt
        if ( isEmpty( aFeatureInfo )) {
            // console.log('PluginGroup.setFeatureList: isEmpty = true');
            // kein Fehler, es muss nichts getan werden!
            return 0;
        }
        // console.log('PluginGroup.setFeatureList: isEmpty = false');
        try {
            // Plugin-Basisklasse aufrufen
            let result = super.setFeatureList( aFeatureInfo );
            let plugin = this.mPluginList.first();
            // Schleife fuer alle Plugins
            while ( plugin ) {
                if ( plugin.setFeatureList( aFeatureInfo ) !== 0 ) {
                    result = -1;
                }
                plugin = this.mPluginList.next();
            }
            return result;
        } catch ( aException ) {
            this._exception( 'setFeatureList', aException );
            return -1;
        }
    }


    /**
     * Fehlerausgabe ueber die Konsole ein/ausschalten
     *
     * @protected
     * @param {boolean} aErrorOutputFlag - True, wenn Konsolenausgabe ein
     */

    _setErrorOutput( aErrorOutputFlag: boolean ): void {
        super._setErrorOutput( aErrorOutputFlag );
        this.mPluginList._setErrorOutput( aErrorOutputFlag );
        this._setErrorOutputAllPlugin( aErrorOutputFlag );
    }


    // Plugin-Funktionen


    /**
     * Einfuegen eines Plugins in die Komponente
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {PluginInterface} aPlugin - Plugin
     *
     * @return {number} errorCode(0,-1) - Fehlercode
     */

    insertPlugin( aPluginName: string, aPlugin: PluginInterface ): number {
        // console.log('Component.insertPlugin:', aPluginName);
        return this.mPluginList.insert( aPluginName, aPlugin );
    }


    /**
     * Entfernt das Plugin aus der Komponente
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    removePlugin( aPluginName: string ): number {
        return this.mPluginList.remove( aPluginName );
    }


    /**
     * Entfernt alle Plugins aus der Komponente
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    removeAllPlugin(): number {
        return this.mPluginList.clear();
    }


    /**
     * Rueckgabe eines Plugins oder null, wenn das Plugin nicht gefunden wurde
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {PluginInterface} - Rueckgabe des Plugins oder null
     */

    findPlugin( aPluginName: string, aPluginType?: string ): PluginInterface {
        const plugin = this.mPluginList.find( aPluginName );
        if ( !plugin ) {
            return null;
        }
        return plugin;
    }


    firstPlugin(): PluginInterface {
        return this.mPluginList.first();
    }


    nextPlugin(): PluginInterface {
        return this.mPluginList.next();
    }


    /**
     * Rueckgabe aller Plugin-Namen
     *
     * @return {Array<string>} Liste aller Plugin-Namen
     */

    getPluginNameList(): Array<string> {
        return this.mPluginList.getNameList();
    }


    /**
     * Aktuelles Plugins pruefen
     *
     * @return {boolean} True, aktuelles Plugin vorhanden, False sonst
     */

    isCurrentPlugin(): boolean {
        return this.mCurrentPlugin ? true : false;
    }


    /**
     * Existierendes Plugin zum ausgewaehlten Plugin machen.
     *
     * @param {string} aPluginName - Name des Plugins, welches zum aktuellen Plugin werden soll
     *
     * @return {number} Fehlercode 0 oder -1
     */

    setCurrentPlugin( aPluginName: string ): number {
        const currentPlugin = this.findPlugin( aPluginName );
        if ( !currentPlugin ) {
            this._error( 'setCurrentPlugin', 'Kein Plugin vorhanden' );
            return 0;
        }
        this.mCurrentPlugin = currentPlugin;
        return 0;
    }


    /**
     * Aktuelles Plugin zurueckgeben
     *
     * @return {PluginInterface} Rueckgabe des aktuellen Plugins oder null
     */

    getCurrentPlugin(): PluginInterface {
        return this.mCurrentPlugin;
    }


    /**
     * Rueckgabe des aktuellen Plugin-Namens
     *
     * @return {string} Name des Plugins oder ''
     */

    getCurrentPluginName(): string {
        if ( !this.mCurrentPlugin ) {
            return '';
        }
        return this.mCurrentPlugin.getName();
    }


    /**
     * pruefen, ob Plugin bereits eingefuegt wurde
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {boolean} pluginFlag - true, Plugin ist vorhanden
     */

    isPlugin( aPluginName: string): boolean {
        return this.mPluginList.find( aPluginName ) ? true : false;
    }


    /**
     * Anzahl der enthaltenen Plugins zurueckgeben
     *
     * @return {number} size
     */

    getPluginSize(): number {
        return this.mPluginList.getSize();
    }


    /**
     * startet ein registriertes Plugin
     *
     * @param {string} aPluginName - Name des Plugins
     * @param {any} [aOption] - Optionale Parameter fuer das Plugin
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    startPlugin( aPluginName: string, aOption?: any ): number {
        // console.log('Component.startPlugin:', aPluginName, aOption);
        const plugin = this.mPluginList.find( aPluginName );
        if ( !plugin ) {
            this._error( 'startPlugin', 'Plugin nicht vorhanden' );
            return -1;
        }
        if ( plugin.isInit()) {
            return 0;
        }
        return plugin.init( aOption );
    }


    /**
     * stoppt ein registriertes Plugin
     *
     * @param {string} aPluginName - Name des Plugins
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     * @memberof PluginManager
     */

    stopPlugin( aPluginName: string ): number {
        // console.log('Component.stopPlugin:', aPluginName);
        const plugin = this.mPluginList.find( aPluginName );
        if ( !plugin ) {
            this._error( 'stopPlugin', 'Plugin nicht vorhanden' );
            return -1;
        }
        return plugin.done();
    }


    /**
     * Startet alle registrierten Plugins
     *
     * @param {any} [aOption] - optionale Parameter fuer alle Plugins
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     * @memberof PluginManager
     */

    startAllPlugin( aOption?: any ): number {
        // console.log('Component.startAllPlugin:', this.getName(), aOption);
        try {
            let result = 0;
            let plugin = this.mPluginList.first();
            while ( plugin ) {
                // console.log('Component.startAllPlugin:', this.getName(), plugin.getName());
                if ( !plugin.isInit() && plugin.init( aOption ) !== 0 ) {
                    result = -1;
                }
                plugin = this.mPluginList.next();
            }
            return result;
        } catch ( aException ) {
            this._exception( 'startAllPlugin', aException );
            return -1;
        }
    }


    /**
     * stoppt alle registrierten Plugins
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     * @memberof PluginManager
     */

    stopAllPlugin(): number {
        // console.log('Component.stopAllPlugin');
        try {
            let result = 0;
            let plugin = this.mPluginList.first();
            while ( plugin ) {
                if ( plugin.done() !== 0 ) {
                    result = -1;
                }
                plugin = this.mPluginList.next();
            }
            return result;
        } catch ( aException ) {
            this._exception( 'stopAllPlugin', aException );
            return -1;
        }
    }


    /**
     * setzt Errorausgabe ein/aus fuer alle Plugins
     *
     * @private
     * @param {boolean} aErrorOutputFlag - bestimmt die Ausgabe von Fehlern
     *
     * @return {number} errorCode (0,-1) - Fehlercode
     */

    _setErrorOutputAllPlugin( aErrorOutputFlag: boolean ): number {
        // console.log('Component.setErrorOutputAllPlugin:', this.getName(), aErrorOutputFlag);
        try {
            let plugin = this.mPluginList.first();
            while ( plugin ) {
                if ( aErrorOutputFlag ) {
                    plugin.setErrorOutputOn();
                } else {
                    plugin.setErrorOutputOff();
                }
                plugin = this.mPluginList.next();
            }
            return 0;
        } catch ( aException ) {
            this._exception( '_setErrorOutputAllPlugin', aException );
            return -1;
        }
    }

}
