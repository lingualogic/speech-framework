# Action

Action definiert die Funktionalität zur Ausführung von Aktionen in einer WebSite oder WebApp.
Hier ist der gesamte Quelltext von Action untergebracht.


## Action API

Das Action API besteht aus folgenden Dateien:

* **action-const.ts:** Globale Konstanten von Action
* **action-data.interface.ts:** Datentransferobjekt für Action-Callbacks 
* **action-factory.ts:** Fabrik zur Erzeugung einer Action Instanz
* **action-function.type.ts:** Action Funktionstypen
* **action-option.interface.ts:** Optionale Parameter zur Initialisierung von Action
* **action-version.ts:** Action Version
* **action.interface.ts:** Action API 
* **action.ts:** API Wrapper für die Action-Komponente


## Action Komponente

Die Action Komponente ist im Unterordner component/ untergebracht und besteht aus folgenden Dateien:

* **action-component-builder.ts:** Baut eine Action-Komponente und alle inneren Plugins zusammen 
* **action-component-factory.ts:** Erzeugt eine Action-Komponenteninstanz
* **action-component.interface.ts:** Komponentenschnittstelle
* **action-component.ts:** Action Komponente


## Action Plugins

Action beinhaltet folgende Plugins:

* **Action-Element:** Elementeverwaltung für Aktionen
* **Action-Function:** Funktionsverwaltung für Aktionen


### Action-Element (Ordner element)

Das Action-Element Plugin besteht aus folgenden Dateien:

* **action-element-const.ts:** interne Konstanten für das Element-Plugin
* **action-element-factory.ts:** Erzeugt eine Instanz des Element-Plugins
* **action-element-list.ts:** Liste aller Aktionselemente
* **action-element.interface.ts:** Schnittstelle des Element-Plugins
* **action-element.ts:** Element-Plugin


### Action-Function (Ordner function)

Das Action-Function Plugin besteht aus folgenden Dateien:

* **action-function-const.ts:** interne Konstanten für das Funktionen-Plugin
* **action-function-factory.ts:** Erzeugt eine Instanz des Funktionen-Plugins
* **action-function-list.ts:** Liste aller Aktionsfunktionen
* **action-funtion.interface.ts:** Schnittstelle des Funktionen-Plugins
* **action-function.ts:** Funktionen-Plugin
