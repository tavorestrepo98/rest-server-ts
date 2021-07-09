"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subirArchivo = void 0;
var path_1 = __importDefault(require("path"));
var uuid_1 = require("uuid");
var subirArchivo = function (files, extensionesValidas, carpeta) {
    if (extensionesValidas === void 0) { extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']; }
    if (carpeta === void 0) { carpeta = ''; }
    return new Promise(function (resolve, reject) {
        var archivo = files.archivo;
        var nombreCortado = archivo.name.split('.');
        var extension = nombreCortado[nombreCortado.length - 1];
        if (!extensionesValidas.includes(extension)) {
            return reject("La extensi\u00F3n " + extension + " es inv\u00E1lida");
        }
        var nombreTemporal = uuid_1.v4() + '.' + extension;
        var uploadPath = path_1.default.join(__dirname, '../uploads/' + carpeta + nombreTemporal);
        archivo.mv(uploadPath, function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(uploadPath);
        });
    });
};
exports.subirArchivo = subirArchivo;
//# sourceMappingURL=subir-archivo.helper.js.map