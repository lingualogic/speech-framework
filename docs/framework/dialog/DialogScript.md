## Dialog-Skriptsprache

Die Definiton eines Dialogs legt die Art und Weise fest, wie der Dialog ausgeführt wird. In der aktuellen Version des Speech-Frameworks werden nur Ausgabedialoge unterstuetzt. Spracheingaben werden noch nicht unterstuetzt. Jeder Dialog wird in Dialogzustaende und Dialogaktionen unterteilt. Pro
eigener App-Seitenansicht wird ein eigener Dialogzustand definiert. Die App definiert die Dialogzustaende und ihre Namen, die in der Dialogdefinition benutzt werden. Gleiches gilt fuer die Aktionsnamen, Objekttypen und Objektnamen. Die Aktionen werden an die App durchgereicht. Die Sprachausgaben werden im Plugin ausgefuehrt.

Der GROUP-Befehl erlaubt das optionale Ausführen von Aktionen, je nach Zustandskontext, der vorher in
StateContext eingetragen und mit setState(StateName, StateContext) übergeben wurde.
Der GROUP-Befehl korrespondiert mit dem StateContext in setState(). Hier wird der Name der in Gruppe 
gesetzten Eigenschaft zusammen mit den zugehörigen Objektnamen eingetragen. Die Gruppe wird mit GROUPEND
abgeschlossen. Die Eigenschaftsnamen hinter dem GROUP-Befehl können frei gewählt werden, müssen aber mit
dem Property-Namen im StateContext übereinstimmen. Es werden nur die Aktionen ausgeführt, deren Objektnamen in der zugehörigen Gruppen-Eigenschaft in StateContext eingetragen wurden.

Beispiel:
 	
	stateName = home/communication/inbox
	stateContext = { property: { "optional": ["arrow"]}}
		
	setState( stateName, stateContext )


Die speech.def Datei wird im assets/speech Ordner der App abgelegt.


Definition der Skriptsprache:

	# Zeilen-Kommentar
	DIALOG <DialogName>
		STATE <StateName>
			ACTION <ActionName>,<ObjectType>,<ObjectName>
			SPEAK <Time in Sec>, <Text>
			WAIT <Time in Sec>
            GROUP <PropertyName>
            	ACTION <ActionName>,<ObjectType>,<ObjectName>
            	SPEAK <Time in Sec>, <Text>
            GROUPEND
			...	


Beispiel:

	# Kurzhilfe gefuehrt
	DIALOG ShortHelpNoWait
		STATE home
			ACTION setFocus, button, Communication
			SPEAK 10, Hier koennen sie Nachrichten lesen, schreiben und Videoanrufe vereinbaren
			SPEAK 10, Tippen Sie ein Auswahlfeld an oder das Hilfefeld, um die Hilfe wieder abzuschalten
			WAIT 10

		STATE home/communication
			ACTION setFocus, button, Inbox
			SPEAK 7, Hier koennen sie ihre Nachrichten lesen
			ACTION setFocus, button, Mail
			SPEAK 7, Hier koennen sie Nachrichten schreiben
			ACTION setFocus, button, Videocall
			SPEAK 10, Hier koennen sie einen Videoanruf vereinbaren
			SPEAK 10, Tippen Sie ein Auswahlfeld an oder das Hilfefeld, um die Hilfe wieder abzuschalten
			WAIT 10

		STATE home/communication/inbox
			SPEAK 7, Hier koennen sie ihre Nachrichten lesen
			GROUP optional
				ACTION setFocus, button, arrow
				SPEAK 7, Hier können sie einen Kontakt auswählen, indem sie auf einen der Pfeile drücken
			GROUPEND


usw.
