# Google Cloud-Dienst

Der Google Cloud-Dienst verbindet das Speech-Framework über die generische Port-Schnittstelle mit dem Google-Server. Der Google Cloud-Dienst dient zur Spracheingabe, Sprachausgabe und zur Sprachanalyse.
Um ihn verwenden zu können, ist ein Account bei Google Cloud notwendig. Für die Sprachanalyse müssen entsprechende Sprachmodelle in Dialogflow erstellt werden. Diese erlauben die Zuordnung zwischen einer Spracheingabe und einem Intent. Der Intent kann in der Web-App weiterverarbeitet werden.

![Google-Architektur](./Google-1.gif)

In der oberen Grafik wird die Architektur des Google Cloud-Dienstes als Wrapper für den Google Server dargestellt. Über die statische Google-Verwaltungsklasse kann auf GooglePort mit Hilfe des generischen Port-APIs zugegriffen werden. Die GoogleFactory erzeugt einen GooglePort, der seinerseits die Wrapper-Klassen für die GoogleTTS, GoogleASR und die GoogleNLU beinhaltet. Diese greifen direkt auf den Google Server zu. Der GoogleAudioPlayer dient dazu, einen vom Google Server empfangenen Audiostream lokal im Browser abzuspielen. Der GoogleAudioRecorder dient dazu, über das lokale Mikrofon einen Audiostream aufzunehmen und zum Google Server zu senden.


## Google API

Die Google-API besteht aus der statischen Klasse Google und ihrer statischen Klassenfunktionen. In der folgenden Abbildung sind alle öffentlichen Klassenfunktionen aufgeführt.

![Google-API](./Google-2.gif)


### Google.init( optionList: GoogleOptionInterface ): number

Mit dem Aufruf:

	const result =Google.init( optionList );
	
wird das Google Subsystem als Anbindung an den Google Cloud-Dienst initialisiert. Als result wird 0 für erfolgreich und -1 für einen aufgetretenen Fehler zurückgegeben. 

Das GoogleOptionInterface defniert folgende optionale Parameter:

	export interface GoogleOptionInterface {
	    /** legt den konkreten Port fest, der geladen werden soll, wird hier AmazonMock angegeben, wird der Mock geladen */
	    googlePortName?: string;
	    /** legt fest, ob Verbindung zum Server aufgebaut wird */
	    googleServerFlag?: boolean;
	    /** legt die URL fuer die Verbindung zum Server fest */
	    googleServerUrl?: string;
	    /** legt die URL fuer die Verbindung zum Dialogflow-TokenServer fest */
	    dialogflowTokenServerUrl?: string;
	    /** legt die Projekt-ID von Dialogflow fest */
	    dialogflowProjectId?: string;
	    /** legt dynamische Konfigurierbarkeit fest */
	    googleDynamicCredentialsFlag?: boolean;
	    /** legt die App-ID fuer die Verbindung zum Server fest */
	    googleAppId?: string;
	    /** legt den App-Key fuer die Verbindung zum Server fest */
	    googleAppKey?: string;
	    /** legt die User-ID fuer die Verbindung zum Server fest */
	    googleUserId?: string;
	    /** legt den NLU-TAG fuer die Verbindung zum Server fest */
	    googleNluTag?: string;
	    /** legt den Pfad fuer die nuance.json Datei fest. Muss immer mit / abgeschlossen werden */
	    googleConfigPath?: string;
	    /** legt den Dateinamen fuer die nuance.json Datei fest */
	    googleConfigFile?: string;
	    /** legt fest, ob die Config-Datei geladen wird */
	    googleConfigLoadFlag?: boolean;
	    /** legt die Fehlerausgabe fest */
	    errorOutputFlag?: boolean;
	}
	
Die wichtigsten Parameter werden hier nochmal aufgeführt:

* **googlePortName:** hier kann man "GooglePort" oder "GoogleMock" als Portname angeben. GoogleMock verbindet sich nicht mit dem Google Cloud-Dienst kann für die Unit-Tests verwendet werden.
* **googleDynamicCredentialsFlag:** wird hier true angegeben, können die Google-Credentials für den AppKey auch später über Google.setConfig( aConfigData ) übergeben werden. Wird hier false angegeben oder der Parameter nicht eingetragen, muss der folgende Parameter googleAppKey eingetragen sein.
* **googleAppKey:** hier wird der AppKey der Google Cloud oder von Dialogflow angegeben. Muss vorhanden sein, wenn googeDynamicCredentialsFlag false ist oder nicht eingetragen wurde.
* **googleServerUrl:** Hier wird die Tokenserver-URL fuer das Holen des Google-Tokens angegeben.

Wird die NLU von Dialogflow verwendet, müssen folgende Parameter zusätzlich eingegeben werden:

* **dialogflowTokenServerUrl:** Hier wird die Tokenserver-URL fuer das Holen des Dialogflow-Tokens angegeben.
* **dialogflowProjectId:** Hier wird die Projekt-ID des Dialogflow-Assistenten eingegeben.


### Google.isInit(): boolean

Mit dem Aufruf:

	if ( Google.isInit()) {...}
	
kann geprüft werden, ob das Google Subsystem bereits initialisiert wurde. Es wird true oder false zurückgegeben.


### Google.done(): number

Mit dem Aufruf:

	const result = Google.done();
	
wird das Google Subsystem wieder freigegeben. Die Verbindung zum externen Google-Server wird beendet. Danach kann das Google Subsystem erneut mit neuen optionalen Parametern initialisiert werden. 


### Google.open( openEventCallback: any): number

Mit dem Aufruf:

	const result = Google.open((error, portName, portResult) => {...}); 

wird der GooglePort mit dem externen Google-Server verbunden. In result wird 0 für erfolgreich und -1 für einen aufgetretenen Fehler zurückgegeben.
 
Die openEventCallback-Funktion gibt drei Werte zurück, der erste Wert ist ein Fehler oder null, der zweite Wert beinhaltet den Portnamen und der dritte Wert das Ergebnis 0 oder -1 für erfolgreiches Öffnen des GooglePort oder nicht. Bei -1 wurde auch ein Fehler übergeben. Die Definition der openEnventCallback-Funktion sieht folgendermaßen aus:
 
	const openEventCallback = ( error: Error, portName: string, portResult: number ) => {
		// hier kann auf das OpenEvent entsprechend den Rückgabewerten reagiert werden
	}
	
	
### Google.setConfig( configData: GoogleConfigDataInterface ): number

Mit dem Aufruf:

	const result = Google.setConfig( configData );
	
können die Google-Credentials nach der Initialisierung des Google Subsystems eingetragen werden, wenn beim Aufruf von Google.init( optionList ) als optionaler Parameter googleDynamicCredentialsFlag: true übergeben worden ist. Ansonsten wird hier -1 zurückgegeben und die Google-Credentials nicht eingetragen.

Das GoogleConfigDataInterface beinhaltet folgende Parameter:

	export interface GoogleConfigDataInterface {
	    /** legt den AppKey fuer die Verbindung zum Server fest */
	    googleAppKey: string;
	}


### Google.getConfig(): GoogleConfigDataInterface

Mit dem Aufruf:

	const configData = Google.getConfig();
	
kann man die aktuell eingetragenen Google-Credentials auslesen.
