"use strict";
/** @packageDocumentation
 * Globale Export-Datei fuer Speech-Google
 *
 * Version: 1.0
 * Datum:   02.04.2019
 *
 * Definiert das gesamte Speech-Google-API:
 *
 *      google - Google API fuer CloudService
 *
 * @module cloud/google
 * @author SB
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Global API
__export(require("./google.bundle"));
__export(require("./google.bundle"));
var google_factory_1 = require("./google.bundle");
exports.GoogleFactory = google_factory_1.GoogleFactory;
var google_1 = require("./google.bundle");
exports.Google = google_1.Google;
//# sourceMappingURL=index.js.map