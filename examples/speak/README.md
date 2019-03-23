# Beispiel für die direkte Einbindung der Speak-API

Mit diesem einfachen Beispiel in Javascript wird die direkte Einbindung von speech.bundle.js in eine WebApp gezeigt.

In src/js/speak-app.js ist der Code für die Nutzung der Speak-API implementiert.

## Installation

Zuerst muss das Framework installiert und erzeugt werden.

Dann muss die SpeakApp mit folgenden Befehl installiert werden:

    $ npm install

Auf einem Mac-Rechner können zusätzlich noch Cordova-iOS und Cordova-OSX installiert werden:

    $ npm install:ios
    $ npm install:osx

Danach kann die SpeakApp mit folgenden Befehl gestartet werden:

    $ npm start

Für die Erzeugung und den Start der Cordova-Versionen der SpeakApp können folgende Befehle verwendet werden:

    $ npm run cordova
    $ npm run cordova:android
    $ npm run cordova:ios
    $ npm run cordova:osx

Für die Erzeugung und den Start der Electron-Version der SpeakApp kann folgender Befehl verwendet werden:

    $ npm run build:electron
