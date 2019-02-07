# Beispiel für die direkte Einbindung der Intent-API

Mit diesem einfachen Beispiel in Javascript wird die direkte Einbindung von speech.bundle.js in eine WebApp gezeigt.

In src/js/intent-app.js ist der Code für die Nutzung der Intent-API implementiert.

## Installation

Zuerst muss das Framework installiert und erzeugt werden.

Dann muss die IntentApp mit folgenden Befehl installiert werden:

    $ npm install

Auf einem Mac-Rechner können zusätzlich noch Cordova-iOS und Cordova-OSX installiert werden:

    $ npm install:ios
    $ npm install:osx

Danach kann die IntentApp mit folgenden Befehl gestartet werden:

    $ npm start

Für die Erzeugung und den Start der Cordova-Versionen der IntentApp können folgende Befehle verwendet werden:

    $ npm run cordova
    $ npm run cordova:android
    $ npm run cordova:ios
    $ npm run cordova:osx

Für die Erzeugung und den Start Electron-Version der IntentApp kann folgender Befehl verwendet werden:

    $ npm run build:electron
