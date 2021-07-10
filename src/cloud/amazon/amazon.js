"use strict";
/** @packageDocumentation
 * Globale Export-Datei fuer Speech-Amazon
 *
 * Version: 1.0
 * Datum:   01.04.2019
 *
 * Definiert das gesamte Speech-Amazon-API:
 *
 *      amazon - Amazon API fuer CloudService
 *
 * @module cloud/amazon
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
exports.Amazon = exports.AmazonFactory = void 0;
// Global API
__exportStar(require("./amazon.bundle"), exports);
__exportStar(require("./amazon.bundle"), exports);
var amazon_factory_1 = require("./amazon.bundle");
Object.defineProperty(exports, "AmazonFactory", { enumerable: true, get: function () { return amazon_factory_1.AmazonFactory; } });
var amazon_1 = require("./amazon.bundle");
Object.defineProperty(exports, "Amazon", { enumerable: true, get: function () { return amazon_1.Amazon; } });
//# sourceMappingURL=index.js.map