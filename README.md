# Speech-Framework

Das Speech-Framework ist eine Typescript Browser-Bibliothek zur Integration von Sprachdiensten, wie Sprachausgabe (TTS), Spracherkennung (ASR), Sprachverstehen (NLU), Dialogverarbeitung (NLP) und Aktionsausführung in eine Web-Seite oder Web-App. Kern des Speech-Frameworks ist ein **Bot**, der Dialoge eines Dialogskripts ausführen kann.

Daneben git es einzeln verwendbare Dienste: 

* **Speak** für die Sprachausgabe (Html5 SpeechSynthesis, Nuance-TTS)
* **Listen** für die Spracherennung (Html5 SpeechRecognition, Nuance-ASR)
* **Intent** für das Sprachverstehen (Nuance-NLU)
* **Action** für die Aktionserzeugung

Im Speech-Framework kann für die Sprachausgabe (TTS), die Spracheingabe (ASR) und das Sprachverstehen (NLU) auch der Nuance-Clouddienst verwendet werden. Dazu wird ein eigener Nuance-Mix Account benötigt.


## Letzte Version

* 0.5.4.0043 Alpha vom 29.01.2019 [Release Notizen](./CHANGELOG.md)

Das Speech-Framework ist noch in einem frühen Entwicklungsstadium und sollte noch nicht für den produktiven Einsatz verwendet werden.


## Voraussetzungen

Wir haben das Speech-Framework auf Mac OS X 10.11, Mac OS X 10.13, Win 10 und Ubuntu 18.04 getestet. Als Plattformen können eingesetzt werden:

* Mac OS X >= 10.11
* Windows 10
* aktuelles Linux (z.B. Ubuntu 18.04)

Grundsätzlich ist das Speech-Framework in Chrome, Firefox, Opera, Safari und Edge nutzbar, allerdings hängt die Sprachausgabe unter diesen Browsern von der zugrunde liegenden Text-to-Speech Engine der jeweiligen Plattformen ab. Die Spracheingabe funktioniert bisher nur in Chrome ohne die Nutzung von Nuance. Mit Nuance kann die Spracheingabe in allen hier aufgeführten Browsern verwendet werden.

* Chrome >= 71   Windows/Linux/MacOS (Html5: TTS, ASR)(Nuance: TTS, ASR, NLU)
* Firefox >= 64  Windows/Linux/MacOS (Html5: TTS)(Nuance: TTS, ASR, NLU) 
* Opera >= 58    Windows/MacOS (Html5: TTS)(Nuance: TTS, ASR, NLU) Linux (kein Html5)
* Safari >= 12   MacOS/iOS (Html5: TTS)(Nuance: ASR, NLU) 
* Edge >= 42     Windows (Html5: TTS)(Nuance: TTS, ASR, NLU)

NodeJS muss installiert sein.

* NodeJS >= 10.X (LTS-Version)

Als weitere Plattformen können Android und iOS mit Cordova verwendet werden:

* Cordova >= 8 für Android ab 5.1 und iOS ab 10

Für Cordova müssen weitere Programme zur Entwicklung von Android- und iOS-Apps installiert werden.

Will man den Nuance-Clouddienst verwenden, muss ein eigener Nuance-Mix Account eingerichtet werden und die Nuance-Komponente des Speech-Frameworks separat in die eigene App eingebunden werden.


## Installation

Zuerst muss das Speech-Framework Github-Repsitory unter [https://github.com/lingualogic/speech-framework](https://github.com/lingualogic/speech-framework) mit folgendem Befehl geklont werden:

    $ git clone https://github.com/lingualogic/speech-framework
    $ cd speech-framework

danach werden alle NPM-Pakete für das Speech-Framework mit folgendem Befehl installiert:

    $ npm install

zum Schluß wird das NPM-Paket für das Speech-Framework in dist/ Ordner erzeugt:

    $ npm run build


Die API-Dokumentation kann mit folgenden Befehl in docs/api erzeugt werden:

    $ npm run docs


Das im dist/ Ordner erzeugte npm-Paket 'speech-framework-0.5.4.tgz' kann in den eigenen Web-Projektordner kopiert werden.
Die Installation des Speech-Framework npm-Paketes erfolgt im eigenen Web-Projektordner mit folgendem Befehl:

    $ npm install --save speech-framework-0.5.4.tgz

Danach kann das Speech-Framework in Web-Projekt mit Javascript oder Typescript verwendet werden. Es sind keine weiteren Bibliotheken einzubinden.


## Deinstallation

Das Speech-Framework kann mit folgendem Befehl wieder deinstalliert werden:

    $ npm uninstall speech-framework


## Bekannte Probleme

* Unter Safari MacOS/iOS funktioniert die Nuance-TTS in Speak zur Zeit nicht


## Dokumentation

Das Speech-Framework sollte noch nicht direkt in eigenen Projekten verwendet werden, da sich die API noch stark ändern kann. 
Für Angular-Projekte gibt es Speech-Angular als Wrapper für das Speech-Framework mit einer stabilen API.

Die Dokumentation des Speech-Frameworks folgt in Kürze.


## Projektverantwortliche (LinguaLogic Team)

Projektorganisation:  **Leo Füchsel** (leo@lingualogic.de)

Technische Umsetzung: **Stefan Brauer** (stefan@lingualogic.de)


## Mitwirkende


## Danksagung

Wir haben das Entstehen und die Entwicklung des Projektes vielen Personen zu danken, vor allem dem gesamten Team der [Nepos GmbH](https://nepos.de).

-------------------

## Lizenz

Das Speech-Framework wurde als Open Source unter der [MIT-Lizenz](./LICENSE) veröffentlicht.
