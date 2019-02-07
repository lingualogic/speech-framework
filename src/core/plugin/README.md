# Plugin

Die Plugin-Klassen definieren die zu erbenden Basisklassen zur Programmierung von beliebigen Plugins von Komponenten.


Das Plugin-Subsystem besteht aus folgenden Dateien:

* **plugin-factory.interface.ts:** PluginFactory-Schnittstelle, erweitert die Factory-Scnittstelle für Plugin
* **plugin-factory.ts:** PluginFactory-Basisklasse, vererbt die PluginFactory-Funktionalität
* **plugin-group.interface.ts:** PluginGroup-Schnittstelle zur Verwaltung von inneren Plugins
* **plugin-group.ts:** PluginGroup-Basisklasse, verwaltet eine Gruppe von Plugins
* **plugin-list.ts:** verwaltet eine Liste von Plugins
* **plugin-manager.ts:** verwaltet alle Plugins des Frameworks (Singleton) 
* **plugin.interface.ts:** Plugin-Schnittstelle
* **plugin.ts:** Plugin-Basisklasse, vererbt die Plugin-Funktionalität
