# Factory

Die Factory-Klassen dienen als zu erbende Basisklassen für die Programmierung von Komponenten- und Plugin-Factories, die Instanzen von Komponenten und Plugins erzeugen.


Das Factory-Subsystem besteht aus folgenden Dateien:

* **factory-list.ts:** verwaltet eine Liste von Factory-Objekten
* **factory-manager.ts:** verwaltet alle Factories des Frameworks (Singleton) 
* **factory.interface.ts:** Factory-Schnittstelle
* **factory.ts:** Factory-Basisklasse, vererbt die Factory-Funktionalität
