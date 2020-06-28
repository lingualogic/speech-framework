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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Global API
__export(require("./amazon.bundle"));
__export(require("./amazon.bundle"));
var amazon_factory_1 = require("./amazon.bundle");
exports.AmazonFactory = amazon_factory_1.AmazonFactory;
var amazon_1 = require("./amazon.bundle");
exports.Amazon = amazon_1.Amazon;
//# sourceMappingURL=index.js.map