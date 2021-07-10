"use strict";
/** @packageDocumentation
 * Globale Export-Datei fuer Speech-Microsoft
 *
 * Version: 1.0
 * Datum:   01.06.2020
 *
 * Definiert das gesamte Speech-Microsoft-API:
 *
 *      microsoft - Microsoft API fuer CloudService
 *
 * @module cloud/microsoft
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
exports.Microsoft = exports.MicrosoftFactory = void 0;
// Global API
__exportStar(require("./microsoft.bundle"), exports);
__exportStar(require("./microsoft.bundle"), exports);
var microsoft_factory_1 = require("./microsoft.bundle");
Object.defineProperty(exports, "MicrosoftFactory", { enumerable: true, get: function () { return microsoft_factory_1.MicrosoftFactory; } });
var microsoft_1 = require("./microsoft.bundle");
Object.defineProperty(exports, "Microsoft", { enumerable: true, get: function () { return microsoft_1.Microsoft; } });
//# sourceMappingURL=index.js.map