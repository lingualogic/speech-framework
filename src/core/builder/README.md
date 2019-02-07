# Builder

Die Builder-Klassen dienen zur Programmierung der Komponenten-Builder, um Komponenteninstanzen aus verschiedenen Objekten zu erzeugen.


Das Builder-Subsystem besteht aus folgenden Dateien:

* **builder-list.ts:** verwaltet eine Liste von Builder-Objekten
* **builder-manager.ts:** verwaltet alle Builder des Frameworks (Singleton) 
* **builder.interface.ts:** Builder-Schnittstelle
* **builder.ts:** Builder-Basisklasse, vererbt die Builder-Funktionalität
