# Speech-Framework Release Notizen


## 0.5.17.0061 Release (16.02.2020)

### Features

* **Google:** Erweiterung der Google-Komponente um ASR mit Anbindung an den Google Token-Server.


## 0.5.16.0060 Beta (17.12.2019)

### Features

* **Google:** Erweiterung der Google-Komponente um TTS mit Anbindung an den Google Token-Server.



## 0.5.15.0059 Beta (19.10.2019)

### Features

* **Dialog:** Erweiterung der Dialog-Komponente um das Einlesen von JSON-Daten anstelle einer Def-Datei.
* **Google:** Erweiterung der Google-Komponente um Dialogflow Version 2.


### Fix

* **Dialog:** Der Kontext in Dialog wurde geloescht, wenn ein neuer State gesetzt wurde. Jetzt wird der Kontext nicht mehr geloescht.
 


## 0.5.14.0058 Beta (31.08.2019)

### Features

* **Microsoft:** der Microsoft Cloud-Dienst (LUIS) für die NLU wurde eingebaut, um Microsofts NLU für die Sprachanalyse verwenden zu können



## 0.5.13.0057 Alpha (10.08.2019)

### Features

* **Vue:** Anpassung für Speech-Vue SDK



## 0.5.13.0056 Alpha (23.07.2019)

### Features

* **Rasa:** die URL des Rasa-Servers wird jetzt in den rasa-credentials mit eingetragen



## 0.5.13.0055 Alpha (18.07.2019)

### Features

* **Rasa:** der Rasa Cloud-Dienst für die NLU wurde eingebaut, um einen eigenen Rasa-Server nutzen zu können



## 0.5.12.0054 Alpha (08.07.2019)

### Features

* **Microsoft:** der Microsoft Cloud-Dienst für die TTS wurde eingebaut, um Microsofts TTS für die Sprachsynthese verwenden zu können



## 0.5.11.0053 Alpha (25.06.2019)

### Features

* **Microsoft:** der Microsoft Cloud-Dienst für die ASR wurde eingebaut, um Microsofts ASR für die Spracherkennung verwenden zu können



## 0.5.10.0052 Alpha (07.06.2019)

### Fixes

* **Google:** wurde nicht korrekt initialisiert


## 0.5.10.0051 Alpha (02.06.2019)

### Fixes

* **Nuance:** wurde als Deprecated markiert, fällt ab Version 0.6 weg


## 0.5.9.0050 Alpha (12.05.2019)

### Features

* **Google:** der Google Cloud-Dienst für die NLU wurde eingebaut, um Googles NLU für die Sprachverarbeitung verwenden zu können


## 0.5.8.0049 Alpha (07.04.2019)

### Features

* **Amazon:** der Amazon Cloud-Dienst für Polly (TTS) wurde eingebaut, um Amazons Stimmen fuer die Sprachausgabe verwenden zu können


## 0.5.7.0048 Alpha (31.03.2019)

### Features

* **Nuance:** der IntentResultEvent gibt jetzt auch eine Liste der Konzepte (Entities) zurück


## 0.5.6.0047 Alpha (22.03.2019)

### Features

* **Nuance:** es wurden dynamische Credentials eingebaut, um nachträglich Credentials zu ändern

### Fixes

* **Nuance:** die WebSocket verbindet sich auch nach einer Netzunterbrechung wieder mit dem Nuance-Server


## 0.5.5.0046 Alpha (22.02.2019)

### Fixes

* **Nuance:** es wurden kleinere Fixes durchgeführt


## 0.5.5.0045 Alpha (15.02.2019)

### Features

* **Doku:** es wurde die Dokumentation zum Framework ergänzt


## 0.5.5.0045 Alpha (14.02.2019)

### Features

* **Examples:** es wurden Examples für Speak, Listen und Intent hinzugefügt
* **Tests:** es wurden E2E-Tests für Speak, Listen, Intent, Bot, Dialog, Action und Audiohinzugefügt


## 0.5.5.0044 Alpha (07.02.2019)

### Bugs

* **Audio:** der Safari Desktop/iOS spielt jetzt Audiodateien ab
* **Speak:** der Safari Desktop/iOS arbeitet jetzt mit Nuance-TTS und spielt auch Sprachaudiodateien ab


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