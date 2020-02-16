# Speech-Framework Quellcode

**Version:** **0.5.17**

Der Quellcode von Speech-Framework ist vollständig im Verzeichnis src untergebracht, und besteht aus drei großen Teilen. Der erste Teil ist das Core-Framework im Verzeichnis core, welches den gesamten Code für alle Basisklassen des Speech-Frameworks beinhaltet. Der zweite Teil sind die Komponenten des Speech-Frameworks, die einzeln verwendet werden können. Der dritte Teil sind die Cloud-Dienste im Verzeichnis cloud, die die Verbindung zu externen Dienstanbietern aufbauen.

## Hauptverzeichnisse im src-Ordner

* **action:** Action Speech-Komponente zur Ausführung von beliebigen Aktionen in der Web-App

* **audio:** Audio Basiskomponente zum Abspielen von Audiodateien

* **base:** Base Speech-Komponente als Grundlage für alle anderen Speech-Komponenten

* **bot:**  Bot Speech-Komponente zur Steuerung von Speak und Action mit Hilfe von Dialog

* **cloud:** Cloud Subsystem mit den verschiedenen Ports für die Anbindung von Cloud-Diensten

* **common:** Commen Klassen für einzelne allgemeine Aufgaben wie die Html5-Wrapperklassen

* **const:** globale Konstanten des Frameworks

* **core:** Core Basis-Framework mit allen Basisklassen des Speech-Frameworks

* **dialog:** Dialog Speech-Komponente zur Ausführung von Dialogskripten (NLG) als Sprach- und Aktionsausgaben

* **file:** File Basiskomponente zum Laden von Dateien

* **inference:** Inference Speech-Komponente zur Ausführung von Inference-Skripten (NLP) zur Interpretation von Intents

* **intent:** Intent Speech-Komponente zur Sprachanalyse (NLU) von einzenen Sätzen und Rückgabe eines Intents

* **interface:** globale Schnittstellen des Frameworks

* **listen:** Listen Speech-Kompnente zur Spracherkennung (ASR) und Rückgabe des Textes

* **net:** Net Basiskomponente zur Verbindung mit WebSockets und WebWorker

* **speak:** Speak Speech-Komponente zur Sprachausgabe (TTS) von Texten
