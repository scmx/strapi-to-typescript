"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const ts_exporter_1 = require("./ts-exporter");
const importer_1 = require("./importer");
const log = console.log;
const logError = console.error;
const exec = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // find *.settings.json
        let strapiModels = yield importer_1.importFiles(yield importer_1.findFilesFromMultipleDirectories(...options.input));
        if (options.inputGroup)
            console.log("option '--inputGroup' is deprecated use '--components'.");
        if (options.components || options.inputGroup)
            strapiModels = yield importer_1.importFiles(yield importer_1.findFiles(options.components || options.inputGroup, /.json/), strapiModels, { _isComponent: true });
        // build and write .ts
        const count = yield ts_exporter_1.convert(strapiModels, options);
        log(`Generated ${count} interfaces.`);
    }
    catch (e) {
        logError(e);
    }
});
exports.exec = exec;
//# sourceMappingURL=processor.js.map