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
exports.Nuance = exports.NuanceFactory = void 0;
// Global API
__exportStar(require("./nuance.bundle"), exports);
__exportStar(require("./nuance.bundle"), exports);
var nuance_factory_1 = require("./nuance.bundle");
Object.defineProperty(exports, "NuanceFactory", { enumerable: true, get: function () { return nuance_factory_1.NuanceFactory; } });
var nuance_1 = require("./nuance.bundle");
Object.defineProperty(exports, "Nuance", { enumerable: true, get: function () { return nuance_1.Nuance; } });
//# sourceMappingURL=index.js.map