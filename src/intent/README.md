# Intent

Die Intent-Komponente dient der Verarbeitung von Spracheingaben und deren Intent-Analyse (NLU).
Hier ist der gesamte Quelltext von Intent untergebracht.


## Intent API

Das Intent API besteht aus folgenden Dateien:

* **intent-const.ts:** Globale Konstanten von Intent
* **intent-data.interface.ts:** Datentransferobjekt für Intent-Callbacks 
* **intent-factory.ts:** Fabrik zur Erzeugung einer Intent Instanz
* **intent-function.type.ts:** Intent Funktionstypen
* **intent-option.interface.ts:** Optionale Parameter zur Initialisierung von Intent
* **intent-version.ts:** Intent Version
* **intent.interface.ts:** Intent API 
* **intent.ts:** API Wrapper für die Intent-Komponente


## Intent Komponente

Die Intent Komponente ist im Unterordner component/ untergebracht und besteht aus folgenden Dateien:

* **intent-component-builder.ts:** Baut eine Intent-Komponente und alle inneren Plugins zusammen 
* **intent-component-factory.ts:** Erzeugt eine Intent-Komponenteninstanz
* **intent-component.interface.ts:** Komponentenschnittstelle
* **intent-component.ts:** Intent Komponente


## Intent Plugins

Intent beinhaltet folgende Plugins:

* **Intent-NLU:** Sprachanalyse für Intents


### Intent-NLU

Das Intent-NLU Plugin besteht aus folgenden Dateien:

* **nlu-const.ts:** interne Konstanten für das NLU-Plugin
* **nlu-factory.ts:** Erzeugt eine Instanz des NLU-Plugins
* **nlu-group.ts:** Gruppe der vorhandenen NLU-Plugins
* **nlu-html5.ts:** Html5 API NLU-Plugin
* **nlu-mock.ts:** Mock NLU-Plugin
* **nlu-nuance.ts:** Nuance NLU-Plugin
* **nlu-plugin.ts:** Basisklasse aller NLU-Plugins
* **nlu.interface.ts:** Schnittstelle des NLU-Plugins
