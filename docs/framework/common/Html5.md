# Html5 Klassen

Die Html5-Klasse kapseln verschiedene Standard-APIs für Html5. Diese Klassen werden intern im Speech-Framework verwendet.


## Basisklassen

Die Basisklassen dienen dem Zugriff auf eine Html5-Ressource.

* **FileHtml5Reader**	 - Einlesen einer Datei
* **AudioHtml5Reader**  - Einlesen einer Audiodatei
* **NetHtml5WebSocket**	 - Verbindungsaufbau zu einer WebSocket 


## Fabrikklassen

Die Fabrikklassen stellen die Verbindung zu den Standard Html5 Web APIs her. Je nach Browser werden diese unterschiedlich unterstützt. Fehlt eine Standart API, wird von der Factory einfach null zurückgegeben und jede Exception abgefangen.

* **AudioContextFactory** - Erzeugt AudioContext
* **SpeechRecognitionFactory** - Erzeugt SpeechRecognition
* **SpeechSynthesisFactory** - Erzeugt SpeechSynthesis
* **WebSocketFactory** - Erzeugt WebSocket
* **WebWorkerFactory** - Erzeugt WebWorker
* **XMLHttpRequestFactory** - Erzeugt XMLHttpRequest