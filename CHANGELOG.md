# Speech-Framework Release Notizen


## 0.5.4.0043 Alpha (29.01.2019)

### Features

* **Listen:** Erweiterung der Spracherkennung um die Nuance-ASR
* **Browser:** Erweiterung auf Firefox, Opera, Safari und Edge
* **Plattform:** Erweiterung auf Windows und Linux


## 0.5.3.0042 Alpha (17.12.2018)

### Features

* **Speak:** Erweiterung der Sprachausgabe um die Nuance-TTS
* **Intent:** Einbau des Sprachverstehens mit der Nuance-NLU
* **Nuance:** Einbau des Nuance-CloudService


## 0.5.2.0041 Alpha (11.11.2018)

### Features

* **Speak:** Ausbau der Language- und Voice-Funktionen
* **Core:** Base als zu erbende Basisklasse für alle anderen Komponente
* **Plattform:** Cordova-Plattform für Android und iOS hinzugefügt


## 0.5.1.0040 Alpha (11.10.2018)

### Features

* **Listen:** Listen-Komponente für die Spracheingabe ausgebaut


## 0.5.0.0039 Alpha (14.09.18)

### Features

* **Service:** Aufteilung in einzelne Komponenten Speak, Listen, Dialog und Bot
* **Common:** kompletter Umbau auf Typescript


## 0.4.5 (25.06.2018)

* Ueberarbeitung von SpeechAudio im Client
* Einbau von AudioContext als optionaler Parameter in SpeechOptionInterface
* Einbau von getAudioContext() zur Rueckgabe des AudioContext in SpeechAPI
* Einbau von AudioFormat als optionaler Parameter in SpeechOptionInterface
* Einbau von getAudioFormat() zur Rueckgabe des Audioformats in SpeechAPI


## 0.4.4 (31.05.2018)

* Einbau von SkipNextSpeak zum Ueberspringen von Sprachausgaben (gesperrt wegen Fehler)
* Einbau von Fehlernachrichten (deutsch/englisch)


## 0.4.3 (27.05.2018)

* Umstellung auf DEBUG Logging
* Ausbau der Fehlerbehandlung und Fehlerereignisse


## 0.4.2 (18.05.2018)

* StopDialog bei WebSocket-Unterbrechung eingebaut
* Umstellung auf lesbaren Code
* Umstellung auf ws 5.1.1 im SpeechJS-Server


## 0.4.1 (04.05.2018)

* komplette Testabdeckung
* Autoplay-Sperrung korrigiert


## 0.4.0 (12.04.2018)

* Gruppen-Bug entfernt


## 0.3.0 (17.03.2018)

* Ausbau der Unit-Tests


## 0.2.8 (05.03.2018)

* Einbau der Konfiguration in Speech-Client fuer WebSocket-Verbindungsaufbau


## 0.2.7 (01.03.2018)

* Fehler bei Gruppenverarbeitung korrigiert


## 0.2.6 (20.02.2018)

* Speech-Client Bibliothek alle Testkonsolenausgaben entfernt
* isInit() Funktion eingebaut, um erfolgreiche Initialisierung des Speech-Client zu testen


## 0.2.5 (08.02.2018)

* Dialogabbruch bei Übergabe eines fehlenden Dialogzustandsnamens eingebaut
* neues Angular 5 NPM-Package im Unterverzeichnis client eingefügt
* Speech-API als speech.min.js im Unterverzeichnis client eingefügt


## 0.2.4 (29.01.2018)

* erste offizielle SpeechJS-Server Version
* Minifizierung auf eine Datei