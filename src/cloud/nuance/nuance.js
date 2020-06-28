"use strict";
/** @packageDocumentation
 * Globale Export-Datei fuer Speech-Nuance
 *
 * Version: 1.2
 * Datum:   01.06.2020
 *
 * Definiert das gesamte Speech-Nuance-API:
 *
 *      nuance - Nuance API fuer CloudService
 *
 * @module cloud/nuance
 * @author SB
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Global API
__export(require("./nuance.bundle"));
__export(require("./nuance.bundle"));
var nuance_factory_1 = require("./nuance.bundle");
exports.NuanceFactory = nuance_factory_1.NuanceFactory;
var nuance_1 = require("./nuance.bundle");
exports.Nuance = nuance_1.Nuance;
//# sourceMappingURL=index.js.map