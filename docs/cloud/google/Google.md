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
	    /** legt den konkreten Port fest, der geladen werden soll, wird hier GoogleMock angegeben, wird der Mock geladen */
	    googlePortName?: string;
	    /** legt die URL fuer die Verbindung zum Server fest */
	    googleServerUrl?: string;
	    /** legt dynamische Konfigurierbarkeit fest */
	    googleDynamicCredentialsFlag?: boolean;
	    /** legt den App Key fuer die Verbindung zum Server fest */
	    googleAppKey?: string;
	    /** legt die Fehlerausgabe fest */
	    errorOutputFlag?: boolean;
	}

Die wichtigsten Parameter werden hier nochmal aufgeführt:

* **googlePortName:** hier kann man "GooglePort" oder "GoogleMock" als Portname angeben. GoogleMock verbindet sich nicht mit dem Google Cloud-Dienst kann für die Unit-Tests verwendet werden.
* **googleDynamicCredentialsFlag:** wird hier true angegeben, können die Google-Credentials für den AppKey auch später über Google.setConfig( aConfigData ) übergeben werden. Wird hier false angegeben oder der Parameter nicht eingetragen, muss der folgende Parameter googleAppKey eingetragen sein.
* **amazonAppKey:** hier wird der AppKey der Google Cloud oder von Dialogflow angegeben. Muss vorhanden sein, wenn amazonDynamicCredentialsFlag false ist oder nicht eingetragen wurde.


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
 
Die openEventCallback-Funktion gibt drei Werte zurück, der erste Wert ist ein Fehler oder null, der zweite Wert beinhaltet den Portnamen und der dritte Wert das Ergebnis 0 oder -1 für erfolgreiches Öffnen des AmazonPort oder nicht. Bei -1 wurde auch ein Fehler übergeben. Die Definition der openEnventCallback-Funktion sieht folgendermaßen aus:
 
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
