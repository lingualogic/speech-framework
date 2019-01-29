/**
 * Globale Export-Datei fuer Core
 *
 * Version: 1.0
 * Datum:   13.12.2018
 *
 * Definiert das gesamte Core-API:
 *
 *      Builder             - Manager fuer Builder und Builder-Klasse
 *      Component           - Basisklasse fuer alle Komponenten
 *      Error               - Basisklasse fuer alle Klassen mit Fehlerbehandlung
 *      Event               - Liste von Observern fuer den gleichen Event
 *      Factory             - Manager aller Factories und Factory-Klasse
 *      Plugin              - Manager aller Plugins und Plugin-Klassen
 *      Port                - Manager aller Portss und Port-Klassen
 *      System              - Manager fuer BuilderManager, FactoryManager und PluginManager
 * 
 * @module core
 * @author SB
 */


// Global API


// builder

export { BuilderManager } from './builder/builder-manager';
export { BuilderInterface } from './builder/builder.interface';
export { Builder } from './builder/builder';


// component

export { ComponentInterface } from './component/component.interface';
export { Component } from './component/component';


// error

export { ErrorBase } from './error/error-base';


// event

export { EventDataInterface } from './event/event-data.interface';
export { EventFunctionList } from './event/event-function-list';


// factory

export { FactoryManager } from './factory/factory-manager';
export { FactoryInterface } from './factory/factory.interface';
export { Factory } from './factory/factory';


// plugin

export { PluginManager } from './plugin/plugin-manager';
export { PluginFactory } from './plugin/plugin-factory';
export { PluginFactoryInterface } from './plugin/plugin-factory.interface';
export { PluginGroupInterface } from './plugin/plugin-group.interface';
export { PluginInterface } from './plugin/plugin.interface';
export { PluginGroup } from './plugin/plugin-group';
export { Plugin } from './plugin/plugin';


// port

export {
    PORT_INIT_EVENT,
    PORT_OPEN_EVENT,
    PORT_CLOSE_EVENT,
    PORT_START_EVENT,
    PORT_STOP_EVENT,
    PORT_RESULT_EVENT,
    PORT_ERROR_EVENT
} from './port/port-event-const';
export { PortManager } from './port/port-manager';
export { PortInterface } from './port/port.interface';
export { Port } from './port/port';


// system

export { SystemManager } from './system/system-manager';
