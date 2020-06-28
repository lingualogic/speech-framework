"use strict";
/** @packageDocumentation
 * Globale Export-Datei fuer Speech-Rasa
 *
 * Version: 1.0
 * Datum:   01.06.2020
 *
 * Definiert das gesamte Speech-Rasa-API:
 *
 *      rasa - Rasa API fuer CloudService
 *
 * @module cloud/rasa
 * @author SB
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Global API
__export(require("./rasa.bundle"));
__export(require("./rasa.bundle"));
var rasa_factory_1 = require("./rasa.bundle");
exports.RasaFactory = rasa_factory_1.RasaFactory;
var rasa_1 = require("./rasa.bundle");
exports.Rasa = rasa_1.Rasa;
//# sourceMappingURL=index.js.map