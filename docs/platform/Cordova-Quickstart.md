# Schnelleinstieg für Cordova

Grundsätzlich lässt sich eine bestehende Web-App auch ohne Skripte schnell in eine Cordova-App überführen.
Zunächst muss Cordova installiert sein.

Dann erzeugt man in seinem Projekt-Hauptverzeichnis ein Cordova-Verzeichnis mit folgendem Befehl: 

	$ cordova create cordova

Nun erzeugt man seine Web-App in das Cordova-Verzeichnis mit forlgenden Befehlen, je nachdem ob man eine Entwickerversion oder eine Produktionsversion erzeugen möchte:

	$ ng build  --output-path cordova/www/

oder 

	$ ng build --target=production --environment=prod --output-path cordova/www/

Danach muss man noch die index.html Datei in cordova/www anpassen, indem man folgende Zeilen im Html-Code ändert:

	index.html: 	<base href="./„>


Jetzt kann man in das Cordova-Verzeichnis gehen:

	$ cd cordova

Optional muss eventuell die JAVA_HOME Environment-Variable gesetzt werden, falls Java nicht gefunden wird:

	$	echo $JAVA_HOME
	$	export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_151.jdk/Contents/Home


Dann  installiert man die Plattformen in Cordova, für die eine App erzeugt werden sollen:

	$	cordova platform add android
	$	cordova platform add ios
	$	cordova platform add browser

Nun kann man die Cordova-App für die jeweilige Plattform erzeugen. Für den Browser:

	$	cordova run browser	

oder für Android (vorher sollte ein Android-Gerät an den Computer angeschlossen werden)

	$	cordova run android

oder für iOS (vorher sollte ein iOS-Gerät an den Computer angeschlossen wereden)

	$	cordova run ios



