# Speak

Die Speak-Komponente dient zur Ausgabe von Sprache. Dazu verwendet sie intern verschiedene TTS (Text to Speech) oder die Audioausgabe, wenn Audiodateien verwendet werden.
Hier ist der gesamte Quelltext von Speak untergebracht.


## Speak API

Das Speak API besteht aus folgenden Dateien:

* **speak-const.ts:** Globale Konstanten von Speak
* **speak-factory.ts:** Fabrik zur Erzeugung einer Speak Instanz
* **speak-function.type.ts:** Speak Funktionstypen
* **speak-option.interface.ts:** Optionale Parameter zur Initialisierung von Speak
* **speak-version.ts:** Speak Version
* **speak.interface.ts:** Speak API 
* **speak.ts:** API Wrapper für die Speak-Komponente


## Speak Komponente

Die Speak Komponente ist im Unterordner component/ untergebracht und besteht aus folgenden Dateien:

* **speak-component-builder.ts:** Baut eine Speak-Komponente und alle inneren Plugins zusammen 
* **speak-component-factory.ts:** Erzeugt eine Speak-Komponenteninstanz
* **speak-component.interface.ts:** Komponentenschnittstelle
* **speak-component.ts:** Speak Komponente


## Speak Plugins

Speak beinhaltet folgende Plugins:

* **Speak-TTS:** Sprachausgabe


### Speak-TTS

Das Speak-TTS Plugin besteht aus folgenden Dateien:

* **tts-amazon.ts:** Amazon TTS-Plugin
* **tts-const.ts:** interne Konstanten für das TTS-Plugin
* **tts-factory.ts:** Erzeugt eine Instanz des TTS-Plugins
* **tts-google.ts:** Google TTS-Plugin
* **tts-group.ts:** Gruppe der vorhandenen TTS-Plugins
* **tts-html5.ts:** Html5 API TTS-Plugin
* **tts-mock.ts:** Mock TTS-Plugin
* **tts-nuance.ts:** Nuance TTS-Plugin
* **tts-plugin.ts:** Basisklasse aller TTS-Plugins
* **tts.interface.ts:** Schnittstelle des TTS-Plugins
