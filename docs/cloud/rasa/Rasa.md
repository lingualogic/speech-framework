# Rasa Cloud-Dienst

Der Rasa Cloud-Dienst verbindet das Speech-Framework über die generische Port-Schnittstelle mit dem Rasa-Server. Der Rasa Cloud-Dienst dient zur Sprachanalyse und später auch als Bot.
Um ihn verwenden zu können, ist ein eigener Rasa-Server lokal oder im Internet einzurichten. Für die Sprachanalyse müssen entsprechende Sprachmodelle in Rasa erstellt und trainiert werden. Diese erlauben die Zuordnung zwischen einer Spracheingabe und einem Intent. Der Intent kann in der Web-App weiterverarbeitet werden.

![Rasa-Architektur](./Rasa-1.gif)

In der oberen Grafik wird die Architektur des Rasa Cloud-Dienstes als Wrapper für den Rasa Server dargestellt. Über die statische Rasa-Verwaltungsklasse kann auf RasaPort mit Hilfe des generischen Port-APIs zugegriffen werden. Die RasaFactory erzeugt einen RasaPort, der seinerseits die Wrapper-Klassen für die RasaNLU und den RasaBot beinhaltet. Diese greifen direkt auf den Rasa-Server zu.


## Rasa API

Die Rasa-API besteht aus der statischen Klasse Rasa und ihrer statischen Klassenfunktionen. In der folgenden Abbildung sind alle öffentlichen Klassenfunktionen aufgeführt.

![Rasa-API](./Rasa-2.gif)


### Rasa.init( optionList: RasaOptionInterface ): number

Mit dem Aufruf:

	const result = Rasa.init( optionList );

wird das Rasa Subsystem als Anbindung an den Rasa Cloud-Dienst initialisiert. Als result wird 0 für erfolgreich und -1 für einen aufgetretenen Fehler zurückgegeben. 

Das RasaOptionInterface defniert folgende optionale Parameter:

	export interface RasaOptionInterface {
	    /** legt den konkreten Port fest, der geladen werden soll, wird hier RasaMock angegeben, wird der Mock geladen */
	    rasaPortName?: string;
	    /** legt die URL fuer die Verbindung zum Server fest */
	    rasaServerUrl?: string;
	    /** legt dynamische Konfigurierbarkeit fest */
	    rasaDynamicCredentialsFlag?: boolean;
	    /** legt den App Key (Token) fuer die Verbindung zum Server fest, das gleiche Token muss beim Start des Servers angegeben werden */
	    rasaAppKey?: string;
	    /** legt die Fehlerausgabe fest */
	    errorOutputFlag?: boolean;
	}

Die wichtigsten Parameter werden hier nochmal aufgeführt:

* **RasaPortName:** hier kann man "RasaPort" oder "RasaMock" als Portname angeben. RasaMock verbindet sich nicht mit dem Rasa Cloud-Dienst kann für die Unit-Tests verwendet werden.
* **RasaServerUrl:** hier kann man "http://localhost:5005" für einen lokalen Rasa-Server angeben, oder eine andere URL für einen Remote Rasa-Server.
* **RasaDynamicCredentialsFlag:** wird hier true angegeben, können die Rasa-Credentials für den AppKey auch später über Rasa.setConfig( aConfigData ) übergeben werden. Wird hier false angegeben oder der Parameter nicht eingetragen, muss der folgende Parameter RasaAppKey eingetragen sein.
* **rasaAppKey:** hier wird der AppKey (Token) des eigenen Rasa-Servers angegeben. Muss vorhanden sein, wenn rasaDynamicCredentialsFlag false ist oder nicht eingetragen wurde. Der gleiche Token wird beim Start des Rasa-Servers übergeben.


### Rasa.isInit(): boolean

Mit dem Aufruf:

	if ( Rasa.isInit()) {...}
	
kann geprüft werden, ob das Rasa Subsystem bereits initialisiert wurde. Es wird true oder false zurückgegeben.


### Rasa.done(): number

Mit dem Aufruf:

	const result = Rasa.done();
	
wird das Rasa Subsystem wieder freigegeben. Die Verbindung zum externen Rasa-Server wird beendet. Danach kann das Rasa Subsystem erneut mit neuen optionalen Parametern initialisiert werden. 


### Rasa.open( openEventCallback: any): number

Mit dem Aufruf:

	const result = Rasa.open((error, portName, portResult) => {...}); 

wird der RasaPort mit dem externen Rasa-Server verbunden. In result wird 0 für erfolgreich und -1 für einen aufgetretenen Fehler zurückgegeben.
 
Die openEventCallback-Funktion gibt drei Werte zurück, der erste Wert ist ein Fehler oder null, der zweite Wert beinhaltet den Portnamen und der dritte Wert das Ergebnis 0 oder -1 für erfolgreiches Öffnen des RasaPort oder nicht. Bei -1 wurde auch ein Fehler übergeben. Die Definition der openEnventCallback-Funktion sieht folgendermaßen aus:
 
	const openEventCallback = ( error: Error, portName: string, portResult: number ) => {
		// hier kann auf das OpenEvent entsprechend den Rückgabewerten reagiert werden
	}
	
	
### Rasa.setConfig( configData: RasaConfigDataInterface ): number

Mit dem Aufruf:

	const result = Rasa.setConfig( configData );
	
können die Rasa-Credentials nach der Initialisierung des Rasa Subsystems eingetragen werden, wenn beim Aufruf von Rasa.init( optionList ) als optionaler Parameter RasaDynamicCredentialsFlag: true übergeben worden ist. Ansonsten wird hier -1 zurückgegeben und die Rasa-Credentials nicht eingetragen.

Das RasaConfigDataInterface beinhaltet folgende Parameter:

	export interface RasaConfigDataInterface {
	    /** legt die URL fuer die Verbindung zum Server fest */
	    rasaServerUrl?: string;
	    /** legt den AppKey (Token) fuer die Verbindung zum Server fest */
	    RasaAppKey: string;
	}


### Rasa.getConfig(): RasaConfigDataInterface

Mit dem Aufruf:

	const configData = Rasa.getConfig();
	
kann man die aktuell eingetragenen Rasa-Credentials auslesen.
