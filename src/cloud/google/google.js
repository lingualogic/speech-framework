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
exports.Google = exports.GoogleFactory = void 0;
// Global API
__exportStar(require("./google.bundle"), exports);
__exportStar(require("./google.bundle"), exports);
var google_factory_1 = require("./google.bundle");
Object.defineProperty(exports, "GoogleFactory", { enumerable: true, get: function () { return google_factory_1.GoogleFactory; } });
var google_1 = require("./google.bundle");
Object.defineProperty(exports, "Google", { enumerable: true, get: function () { return google_1.Google; } });
//# sourceMappingURL=index.js.map