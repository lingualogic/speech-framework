/** @packageDocumentation
 * Globale Export-Datei fuer Plort
 *
 * Version: 1.0
 * Datum:   01.12.2018
 *
 * Definiert das gesamte Port-API:
 *
 *      PortManager     - Manager fuer alle Ports
 *      Port            - Port fuer eine bestimmte Verbindung
 *
 * @module core/port
 * @author SB
 */


// Global API


export {
    PORT_INIT_EVENT,
    PORT_OPEN_EVENT,
    PORT_CLOSE_EVENT,
    PORT_START_EVENT,
    PORT_STOP_EVENT,
    PORT_RESULT_EVENT,
    PORT_ERROR_EVENT
} from './port-event-const';
export { PortManager } from './port-manager';
export { Port } from './port';
export { PortTransaction } from './port-transaction';
export { PortInterface } from './port.interface';

