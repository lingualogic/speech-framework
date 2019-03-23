# Beispiel für die direkte Einbindung der Listen-API

Mit diesem einfachen Beispiel in Javascript wird die direkte Einbindung von speech.bundle.js in eine WebApp gezeigt.

In src/js/listen-app.js ist der Code für die Nutzung der Listen-API implementiert.

## Installation

Zuerst muss das Framework installiert und erzeugt werden.

Dann muss die ListenApp mit folgenden Befehl installiert werden:

    $ npm install

Auf einem Mac-Rechner können zusätzlich noch Cordova-iOS und Cordova-OSX installiert werden:

    $ npm install:ios
    $ npm install:osx

Danach kann die Web-App mit folgenden Befehl gestartet werden:

    $ npm start

Für die Erzeugung und den Start der Cordova-Versionen der ListenApp können folgende Befehle verwendet werden:

    $ npm run build:cordova
    $ npm run cordova:android
    $ npm run cordova:ios
    $ npm run cordova:osx

Für die Erzeugung und den Start der Electron-Version der ListenApp kann folgender Befehl verwendet werden:

    $ npm run build:electron


