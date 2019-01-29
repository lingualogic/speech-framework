# Bot

Bot definiert die Funktionalität zur Ausführung von Dialogen in einer WebSite oder WebApp.
Hier ist der gesamte Quelltext von Bot untergebracht. Bot verwendet seinerseits die
Komponenten Action und Speak.


## Bot API

Das Bot API besteht aus folgenden Dateien:

* **bot-const.ts:** Globale Konstanten von Bot
* **bot-factory.ts:** Fabrik zur Erzeugung einer Bot Instanz
* **bot-option.interface.ts:** Optionale Parameter zur Initialisierung von Bot
* **bot-version.ts:** Bot Version
* **bot.interface.ts:** Bot API 
* **bot.ts:** API Wrapper für die Bot-Komponente


## Bot Komponente

Die Bot Komponente ist im Unterordner component/ untergebracht und besteht aus folgenden Dateien:

* **bot-component-builder.ts:** Baut eine Bot-Komponente und alle inneren Plugins zusammen 
* **bot-component-factory.ts:** Erzeugt eine Bot-Komponenteninstanz
* **bot-component.interface.ts:** Komponentenschnittstelle
* **bot-component.ts:** Bot Komponente
