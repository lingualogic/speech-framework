/**
 * Factory-Interface fuer die Erzeugung von Objekten
 *
 * Letzte Aenderung: 04.10.2018
 * Status: gruen
 *
 * @module core/factory
 * @author SB
 */


/**
 * Erzeugt ein neues Objekt
 *
 * @export
 * @interface FactoryInterface
 */

export interface FactoryInterface {


    isMock(): boolean;


    /**
     * gibt den Namen des Objekttyps zurueck, den die Fabrik erzeugt
     *
     * @return {string} name - Name des Objekttyps
     */

    getType(): string;


    /**
     * gibt den Namen der Fabrik zurueck, unter dem sie verwaltet wird
     *
     * @return {string} name - Name der Fabrik
     */

    getName(): string;


    /**
     * Erzeugt ein neues Objekt zum uebergebenen ObjektNamen
     *
     * @param {string} aObjectName - Name des zu erzeugenden Objektes
     * @param {boolean} aRegisterFlag - true, wenn Objekt global in einen Manager eingetragen werden soll
     *
     * @return {any} - Objekt Instanz oder null
     */

    create( aPluginName?: string, aRegisterFlag?: boolean ): any;
}
