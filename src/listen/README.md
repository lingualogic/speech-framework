# Listen

Die Listen-Komponente dient der Verarbeitung von Spracheingaben.
Hier ist der gesamte Quelltext von Listen untergebracht.


## Listen API

Das Listen API besteht aus folgenden Dateien:

* **listen-const.ts:** Globale Konstanten von Listen
* **listen-factory.ts:** Fabrik zur Erzeugung einer Listen Instanz
* **listen-function.type.ts:** Listen Funktionstypen
* **listen-option.interface.ts:** Optionale Parameter zur Initialisierung von Listen
* **listen-version.ts:** Listen Version
* **listen.interface.ts:** Listen API 
* **listen.ts:** API Wrapper für die Listen-Komponente


## Listen Komponente

Die Listen Komponente ist im Unterordner component/ untergebracht und besteht aus folgenden Dateien:

* **listen-component-builder.ts:** Baut eine Listen-Komponente und alle inneren Plugins zusammen 
* **listen-component-factory.ts:** Erzeugt eine Listen-Komponenteninstanz
* **listen-component.interface.ts:** Komponentenschnittstelle
* **listen-component.ts:** Listen Komponente


## Listen Plugins

Listen beinhaltet folgende Plugins:

* **Listen-ASR:** Spracherkennung


### Listen-ASR

Das Listen-ASR Plugin besteht aus folgenden Dateien:

* **asr-const.ts:** interne Konstanten für das ASR-Plugin
* **asr-factory.ts:** Erzeugt eine Instanz des ASR-Plugins
* **asr-google.ts:** Google ASR-Plugin
* **asr-group.ts:** Gruppe der vorhandenen ASR-Plugins
* **asr-html5.ts:** Html5 API ASR-Plugin
* **asr-mock.ts:** Mock ASR-Plugin
* **asr-nuance.ts:** Nuance ASR-Plugin
* **asr-plugin.ts:** Basisklasse aller ASR-Plugins
* **asr.interface.ts:** Schnittstelle des ASR-Plugins
