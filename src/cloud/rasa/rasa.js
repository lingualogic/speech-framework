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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rasa = exports.RasaFactory = void 0;
// Global API
__exportStar(require("./rasa.bundle"), exports);
__exportStar(require("./rasa.bundle"), exports);
var rasa_factory_1 = require("./rasa.bundle");
Object.defineProperty(exports, "RasaFactory", { enumerable: true, get: function () { return rasa_factory_1.RasaFactory; } });
var rasa_1 = require("./rasa.bundle");
Object.defineProperty(exports, "Rasa", { enumerable: true, get: function () { return rasa_1.Rasa; } });
//# sourceMappingURL=index.js.map