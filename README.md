# Speech-Framework

Das Speech-Framework ist eine Typescript Browser-Bibliothek zur Integration von Sprachdiensten, wie Sprachausgabe (TTS), Spracherkennung (ASR), Sprachverstehen (NLU), Dialogverarbeitung (NLP) und Aktionsausführung in eine Web-Seite oder Web-App. Kern des Speech-Frameworks ist ein **Bot**, der Dialoge eines Dialogskripts ausführen kann.

Daneben git es einzeln verwendbare Dienste:

* **Speak** für die Sprachausgabe (Html5 SpeechSynthesis, Nuance-TTS, Amazon-TTS, Microsoft-TTS)
* **Listen** für die Spracherennung (Html5 SpeechRecognition, Nuance-ASR, Microsoft-ASR)
* **Intent** für das Sprachverstehen (Nuance-NLU, Google-NLU)
* **Action** für die Aktionserzeugung
* **Dialog** für die Ausführung von Dialogskripten

Im Speech-Framework kann für die Sprachausgabe (TTS), die Spracheingabe (ASR) und das Sprachverstehen (NLU) auch ein Cloud-Dienst verwendet werden. Dazu wird ein eigener Account des Cloud-Dienstes benötigt. Es gibt den Amazon Cloud-Dienst für die Sprachausgabe (TTS), den Microsoft Cloud-Dienst für die Sprachausgabe (TTS) und die Speacheingabe (ASR), sowie den Google Cloud-Dienst für Sprachausgabe(TTS), Spracheingabe( ASR) und Sprachverstehen (NLU). Hinzugekommen ist der Rasa-Server als selbst zu betreibenden Cloud-Dienst für das Sprachverstehen (NLU).
Für die Google Cloud-Dienste wird zusätzlich der Speech-Tokenserver benötigt.


## Letzte Version

* 0.5.20.0064 Release vom 17.05.2020 [Release Notizen](./CHANGELOG.md)

Für Angular-Projekte gibt es Speech-Angular als Wrapper für das Speech-Framework mit einer stabilen API. Für React-Projekte gibt es Speech-React als Wrapper und für Vue gibt es Speech-Vue als Wrapper.


## Voraussetzungen

Wir haben das Speech-Framework auf Mac OS X 10.14, Win 10 und Ubuntu 18.04 getestet. Als Plattformen können eingesetzt werden:

* Mac OS X >= 10.11
* Windows 10
* aktuelles Linux (z.B. Ubuntu 18.04)

Grundsätzlich ist das Speech-Framework in Chrome, Firefox, Opera, Safari und Edge nutzbar, allerdings hängt die Sprachausgabe unter diesen Browsern von der zugrunde liegenden Text-to-Speech Engine der jeweiligen Plattformen ab. Die Spracheingabe funktioniert bisher nur in Chrome ohne die Nutzung von Cloud-Diensten. Mit der Einbindung von Cloud-Diensten kann die Spracheingabe in allen hier aufgeführten Browsern verwendet werden.

* Chrome >= 71   Windows/Linux/MacOS (Html5: TTS, ASR)(Nuance: TTS, ASR, NLU)
* Firefox >= 64  Windows/Linux/MacOS (Html5: TTS)(Nuance: TTS, ASR, NLU) 
* Opera >= 58    Windows/MacOS (Html5: TTS)(Nuance: TTS, ASR, NLU) Linux (kein Html5)
* Safari >= 12   MacOS/iOS (Html5: TTS)(Nuance: ASR, NLU) 
* Edge >= 42     Windows (Html5: TTS)(Nuance: TTS, ASR, NLU)

NodeJS muss installiert sein.

* NodeJS >= 10.X und <= 12.x

Als weitere Plattformen können Android und iOS mit Cordova verwendet werden:

* Cordova >= 8 für Android ab 5.1 und iOS ab 10

Für Cordova müssen weitere Programme zur Entwicklung von Android- und iOS-Apps installiert werden.


## Installation

Zuerst muss das Speech-Framework Github-Repsitory unter [https://github.com/lingualogic/speech-framework](https://github.com/lingualogic/speech-framework) mit folgendem Befehl geklont werden:

    $ git clone https://github.com/lingualogic/speech-framework
    $ cd speech-framework

danach werden alle NPM-Pakete für das Speech-Framework mit folgendem Befehl installiert:

    $ npm install

anschließend wird das NPM-Paket für das Speech-Framework im dist Ordner erzeugt und die E2E-Tests ausgeführt:

    $ npm run build


### E2E-Tests

Die E2E-Tests können mit folgenden Befehl separat ausgeführt werden:

    $ npm test

Zusätzlich können in der Datei karma.conf.js der Browser zum Testen gewechselt und SingleRun=false gesetzt werden.
Beim Chrome werden nicht alle Tests durchgeführt, da Audio- und Sprachausgabe gesperrt sind. Man kann die Sperrung durch drücken
in den Browser aufheben und die Tests inklusive Audio- und Sprachausgabe ausführen.

Alle E2E-Tests sind unter test/e2e zu finden.


### API-Dokumentation

Die API-Dokumentation kann mit folgenden Befehl in docs/api erzeugt werden:

    $ npm run docs


Das im dist Ordner erzeugte npm-Paket 'speech-framework-0.5.20.tgz' kann in den eigenen Web-Projektordner kopiert werden.
Die Installation des Speech-Framework npm-Paketes erfolgt im eigenen Web-Projektordner mit folgendem Befehl:

    $ npm install speech-framework-0.5.20.tgz

Danach kann das Speech-Framework in Web-Projekt mit Javascript oder Typescript verwendet werden. Es sind keine weiteren Bibliotheken einzubinden.

Alternativ kann das Speech-Framework auch über das offizielle globale NPM-Repository installiert werden:

    $ npm install speech-framework


## Deinstallation

Das Speech-Framework kann mit folgendem Befehl wieder deinstalliert werden:

    $ npm uninstall speech-framework


## Dokumentation


[**Architektur**](./docs/design/Design.md)

[**Framework**](./docs/framework/Framework.md)

[**Cloud-Dienste**](./docs/cloud/Cloud.md)

[**Plattformen**](./docs/platform/README.md)

[**API-Referenz**](https://lingualogic.de/speech-framework/docs/latest/api)

[**Roadmap**](./docs/roadmap/README.md)

[**Release Notizen**](./CHANGELOG.md)


## Beispiel-Apps

Im examples Ordner sind mehrere kleine Beispiel-Apps in Javascript für die einzelnen Komponenten von Speech-Framework zu finden.
Zum Ausführen der Beispiele muss nicht in den Beispielordner gewechselt werden.

Folgender Befehl ist für das Speak-Beispiel einzugeben:

    $ npm run speak

Für das Listen-Beispiel ist folgender Befehl einzugeben:

    $ npm run listen

Für das Intent-Beispiel ist folgender Befehl einzugeben:

    $ npm run intent


## Bekannte Probleme

* Googles Dialogflow schaltet seine Version 1 Ende März 2020 ab.
* Nuance hat seine Sprachdienste abgeschaltet und steht als Cloud-Dienst nicht mehr zur Verfügung
* die verschiedenen Browser verhalten sich unterschiedlich, so dass nicht in jedem Browser alle Funktionen des Speech-Frameworks zur Verfügung stehen.
* unter iOS funktioniert die Cordova-Version von Listen mit Amazon Cloud-Dienst nicht, da die Apple WebView die getUserMedia-API nicht unterstützt.


## Projektverantwortliche (LinguaLogic Team)

Projektorganisation:  **Leo Füchsel** (leo@lingualogic.de)

Technische Umsetzung: **Stefan Brauer** (stefan@lingualogic.de)


## Mitwirkende


## In Projekten verwendet

* [**Nepos-App**](https://nepos.app) - Beispiel für den SpeakService und Dialog von [nepos.de](https://nepos.de)
* [**whoelse-Prototyp**](https://app.whoelse.ai) - Beispiel für den IntentService von [uns.ai](https://uns.ai)


## Danksagung

Wir haben das Entstehen und die Entwicklung des Projektes vielen Personen zu danken, vor allem dem gesamten Team der [Nepos GmbH](https://nepos.de).

-------------------

## Lizenz

Das Speech-Framework wurde als Open Source unter der [MIT-Lizenz](./docs/LICENSE.md) veröffentlicht.
