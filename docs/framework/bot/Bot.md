# Bot Komponente

Die Bot-Komponente definiert eine Kontroller-Komponente, die die Dialog-Komponente mit der Action-, Speak- und Listen-Komponente verbindet, um Dialoge nicht nur textuell, sondern auch über Sprachein- und -ausgabe zu führen und Aktionen auszuführen.


## Bot API

Die Hauptaufgabe eines Bots ist es, einen Dialog mit dem Nutzer führen zu können. Zusätzlich soll der Bot in der Lage sein, in Abhägigkeit vom Dialog auch die App komplett zu steuern. damit wird erreicht, dass ein Nutzer dem Bot eine Aufgabe stellen kann, die dieser über die App-Steuerung von der App ausführen lässt. 
Damit wird eine sprachliche Äußerung vom Bot in eine Handlungsanweisung an die App übersetzt.

Dazu werden Aktionen vom Bot generiert und an die App zur Ausführung übergeben.
Die Bot-API erlaubt ihrerseits Zugriff auf die Action-, Speak und Listen-API. Diese drei inneren
Komponenten von Bot können auch abgeschaltet werden, so dass Bot als reiner ChatBot ohne Aktionen und Sprachein/ausgabe verwendet werden kann.

Die Ereignis-Schnittstelle erlaubt es, die entsprechenden Ereignisse aus dem Dialogmanager zu empfangen und selbständig zu verarbeiten. Die Speak-Komponente kann in Bot abgeschaltet werden,
ist aber immer noch global nutzbar. Das gleiche gilt für die Action- und die Listen-Komponente.
