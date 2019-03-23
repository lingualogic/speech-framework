# Cordova Android Hinweise

Cordova ermöglicht es Angular Apps für mobile Android-Geräte zu erzeugen. Durch Einbindung zusätzlicher Plugins wird auch die Funktionalität von Sprachdiensten sichergestellt.

## Voraussetzungen

Mac mit OS X >= 10.11

Das Java JDK 8 muss zuerst installiert werden. Unter [Oracle](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) kann das JDK 8 für die passende Plattform heruntergeladen werden.

Danach muss für Android [Android Studio](https://developer.android.com/studio/#downloads) (empfohlen) oder Android Tools installiert werden. Unter [Cordova-Android](https://cordova.apache.org/docs/en/8.x/guide/platforms/android/index.html) findet man detailliertere Informationen zur Installation von Cordova für Android.

Für Cordova muss NodeJS und die Cordova-CLI installiert sein, wie unter [Cordova.md](./Cordova.md) beschrieben.

Auf dem Tablet oder Smartphone muss eine Android-Version ab 5.1 vorhanden sein.


## Installation

Um die Cordova-Android Version einer Angular-App erzeugen zu können, muss zuerst die Cordova-Android Plattform einmal installiert werden. Dies wird mit folgendem Befehl durchgeführt:

	$ npm run install:cordova

Nach der Installation steht die Cordova-Android Plattform für die Erzeugung einer Angular-App für Android zur Verfügung.


**Installation von externen Cordova-Plugins**

Die für das Speech-Framework notwendigen externen Cordova-Plugins für die Sprachein- und ausgabe werden beim Installationsprozess von Cordova automatisch mitinstalliert.

Man kann die Plugins aber auch manuell über folgende Cordova-Befehle installieren:

    $ cordova plugin add https://github.com/macdonst/SpeechRecognitionPlugin
    $ cordova plugin add https://github.com/macdonst/SpeechSynthesisPlugin

  
## App erzeugen

Danach kann dann die Angular-App mit Hilfe folgenden Befehls erzeugt werden:

	$ npm run build

Dies erzeugt eine neue Angular-App Version im dist-Ordner des Projektes.


## App auf Android-Gerät ausführen

Auf dem Android-Gerät muss der Entwickler-Modus aktiviert sein. Dazu wird unter Einstellungen auf 'Über das Tablet' angetippt und dann auf 'Build-Nummer' 5 mal hintereinander getippt, um den Entwicklermodus einzuschalten.
Um die Angular-App auf dem Android-Gerät ausführen zu können, wird das Android-Gerät mittels eines USB-Kabels an den Computer angeschlossen.
 
Jetzt wird mit Hilfe folgenden Befehls die Angular-App für Cordova-Android erzeugt und auf dem Android-Gerät gestartet:

	$ npm run cordova:android


## Bekannte Fehler


### Pfad für Android nicht vorhanden

	Failed to find 'ANDROID_HOME' environment variable. Try setting it manually.
	Failed to find 'android' command in your 'PATH'. Try update your 'PATH' to include path to valid SDK directory.

**Lösung:** Installation von [Android Studio](https://developer.android.com/studio/#downloads).


### Gradle nicht vorhanden

	Could not find an installed version of Gradle either in Android Studio,
	or on your system to install the gradle wrapper. Please include gradle
	in your path, or install Android Studio

**Lösung:** Installation von [gradle](https://gradle.org)

Beispiel-Befehl für Mac via [homebrew](https://brew.sh/index_de):
	
	$ brew install gradle



### Android Zugriffsrechte

Im AndroidManifest müssen folgende Rechte eingetragen sein:

    <uses-permission android:name="android.permission.RECORD_AUDIO" />
	<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>
    <uses-permission android:name="android.permission.INTERNET" />


### NDK Problem

Tritt nur auf, wenn das NDK installiert ist. Dies kann im Android Studio unter Preferences | System Settings —> Android SDK —> SDK Tools geprüft werden.

Fehlermeldung lautet: 

	FAILURE: Build failed with an exception.

	* What went wrong:
	A problem occurred configuring project ':CordovaLib'.
	> No toolchains found in the NDK toolchains folder for ABI with prefix: mips64el-linux-android

**Lösung:** NDK deinstallieren oder [bekannten Workaround](https://github.com/apache/cordova-android/issues/504) durchführen

Ab der NDK Version 18 fehlen die Toolchains von MIPS. Diese können aus der vorigen NDK-Version 17 kopiert werden. 
Dazu wird das NDK 17c unter [developer.android.com](https://developer.android.com/ndk/downloads/older_releases) zuerst heruntergeladen und entpackt.

Nach dem Entpacken können die Toolchains-Unterverzeichnisse:
 
* entpacktes android-ndk-r17c/toolchains/**mips64el-linux-android-4.9**
* entpacktes android-ndk-r17c/toolchains/**mipsel-linux-android-4.9**

in den Android-SDK Ordner von Android-Studio in das Unterverzeichnis **/ndk-bundle/toolchains** kopiert werden.


### fehlender Emulator

	No target specified and no devices found, deploying to emulator
	No emulator specified, defaulting to Nexus_7_API_27
	Waiting for emulator to start...
	PANIC: Missing emulator engine program for 'x86' CPU.

**Lösung:** Android-Emulator in Android-Studio installieren und x86-Version einrichten.