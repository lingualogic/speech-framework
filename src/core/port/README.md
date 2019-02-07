# Port

Hier werden alle Verbindungen für verschiedene externe Subsysteme eingebaut und verwaltet.
Ein Port baut genau eine Verbindung zu einem externen Service auf.
Ports koennen von vielen Plugins parallel verwendet werden. Sie sind geteilte Objekte.


Das Port-Subsystem besteht aus folgenden Dateien:

* **port-event-const.ts:** Ereignis-Konstanten für alle Ports
* **pport-factory.interface.ts:** PortFactory-Schnittstelle, erweitert die Factory-Scnittstelle für Port
* **port-factory.ts:** PortFactory-Basisklasse, vererbt die PortFactory-Funktionalität
* **port-list.ts:** verwaltet eine Liste von Ports
* **port-manager.ts:** verwaltet alle Ports des Frameworks (Singleton) 
* **port.interface.ts:** Port-Schnittstelle
* **port.ts:** Port-Basisklasse, vererbt die Port-Funktionalität



