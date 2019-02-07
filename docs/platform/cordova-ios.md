# Cordova iOS Hinweise

Cordova ermöglicht es Angular Apps für mobile iOS-Geräte zu erzeugen. Durch Einbindung zusätzlicher Plugins wird auch die Funktionalität von Sprachdiensten sichergestellt.


## Voraussetzungen

Mac mit OS X >= 10.11

Zunächst müssen auf dem Mac die [XCode-Entwicklungsumgebung](https://developer.apple.com/xcode/) und die Command Line Tools installiert sein.

Um iOS-Apps mit der Command-Line erzeugen zu können, muss das NPM-Paket [ios-deploy](https://www.npmjs.com/package/ios-deploy) installiert werden:

	$ npm install -g ios-deploy --unsafe-perm=true --allow-root

Auf dem iPad oder iPhone muss eine iOS-Version ab 10 vorhanden sein.

Für Cordova muss NodeJS und die Cordova-CLI installiert sein, wie unter [Cordova.md](./Cordova.md) beschrieben.


## Installation

Die Erzeugung der Cordova-Plattformen für Browser und Android muss mit folgendem Befehl vor der Installation der Cordova-iOS Plattform durchgeführt werden:

	$ npm run install:cordova

Um die Cordova-iOS Version einer Angular-App erzeugen zu können, muss zuerst die Cordova-iOS Plattform einmal installiert werden. Dies wird mit folgendem Befehl durchgeführt:

	$ npm run install:cordova:ios

Nach der Installation steht die Cordova-iOS Plattform für die Erzeugung einer Angular-App für iOS zur Verfügung.


**Installation von externen Cordova-Plugins**

Die für das Speech-Framework notwendigen externen Cordova-Plugins für die Sprachein- und ausgabe werden beim Installationsprozess von Cordova automatisch mitinstalliert.

Man kann die Plugins aber auch manuell über folgende Cordova-Befehle installieren:

    $ cordova plugin add https://github.com/macdonst/SpeechRecognitionPlugin
    $ cordova plugin add https://github.com/macdonst/SpeechSynthesisPlugin


## App erzeugen

Danach kann dann die Angular-App mit Hilfe folgenden Befehls erzeugt werden:

	$ npm run build

Dies erzeugt eine neue Angular-App Version im dist-Ordner des Projektes.


## App auf iOS-Gerät ausführen

Um die Angular-App auf dem iOS-Gerät ausführen zu können, wird das iOS-Gerät mittels eines Kabels an den Computer angeschlossen.
 
Jetzt wird mit Hilfe folgenden Befehls die Angular-App für Cordova-iOS erzeugt und auf dem iOS-Gerät gestartet:

	$ npm run cordova:ios


## Bekannte Fehler

### Fehlendes ios-deploy NPM-Paket

	Error: Command failed: cd /Users/leo/lingualogic/git/web/sample/cordova/app && cordova run ios --debug
	CordovaError: Promise rejected with non-error: 'ios-deploy was not found. Please download, build and install version 1.9.2 or greater from https://github.com/phonegap/ios-deploy into your path, or do \'npm install -g ios-deploy\''

**Lösung:** Installation von ios-deploy, siehe oben
