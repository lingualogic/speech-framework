# Speak Komponente

Die Speak-Komponente ist eine exportierbare Hauptkomponente und erlaubt die Sprachausgabe zu einem übergebenen Text. Sie erbt die generische Komponenten-API von der [Base-Komponente](./../base/Base.md), so dass hier nur noch die Funktionen beschrieben werden, die gegenüber der Base-Komponente hinzukommen.

Die Speak-Komponente liefert die Sprachausgabe zu einem übergebenen Text. In der Speak-Komponente sind zur Zeit zwei TTS implementiert, einmal die Html5-TTS mit Web Speech-Synthesis API, und die andere TTS ist von Nuance. Dazu benutzt die Speak-Komponente den Nuance Cloud-Port, der eine TTS als Nuance-Service beinhaltet.


## Speak Architektur

In der folgenden Grafik ist die Architektur der Speak-Komponente dargestellt. Entsprechend dem Komponentenmodell gibt es eine API-Schicht und eine Implementierung-Schicht. Es gibt die SpeakFactory als Singleton in der API-Schicht, um ein Objekt der Klasse Speak (API-Wrapper), die das SpeakInterface implementiert, zu erzeugen. Die Speak-Klasse kümmert sich um die Erzeugung des SpeakComponent-Objektes mit der TTS als Plugin. Der SpeakComponentBuilder erzeugt nicht nur das SpeakComponent-Objekt, sondern auch alle inneren Objekte und ihre Verbindungen untereinander.

![Speak Architektur](./Speak-1.gif)


## Speak Vererbungsstruktur

In der nächsten Grafik wird die Vererbungsstruktur der Speak-Komponente dargestellt. Speak erbt von Base und Base erbt von Core. Die Speak-Komponente wird in Speak-API und Speak-Implementierung aufgeteilt. Zu sehen ist, von welcher Basisklasse die einzelnen Speak-Klassen erben.

![Speak Vererbungsstruktur](./Speak-2.gif)


## Speak API

Die Speak-API erweitert die Base-API um die Audio-, TTS-, Language-, Voice- und Speak-Funktionen.


![Speak API](./Speak-3.gif)


### Audio-Funktionen

Die Audio-Funktionen dienen der Umschaltung der Sprachausgabe auf das Abspielen von Audiodateien.


### TTS-Funktionen

Die TTS-Funktionen erlauben den Wechsel der TTS. Im Moment sind die Html5-TTS und die Nuance-TTS implementiert.


### Language-Funktionen

Die Language-Funktionen erlauben den Wechsel der Sprache. Im Moment sind Deutsch und Englisch implementiert.


### Voice-Funktionen

Die Voice-Funktionen erlauben das einstellen einer anderen Stimme für die Sprachausgabe. Die Stimmen wechseln mit der Änderung der Sprache.


### Speak-Funktionen

Die Speak-Funktionen erlauben die Übergabe eines Textes für die Speachausgabe. 

