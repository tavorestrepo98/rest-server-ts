"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cargarArchivo = void 0;
var path_1 = __importDefault(require("path"));
var cargarArchivo = function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({
            error: true,
            message: 'No vienen archivos'
        });
        return;
    }
    if (!req.files.archivo) {
        res.status(400).json({
            error: true,
            message: 'No viene el archivo'
        });
        return;
    }
    console.log('req.files >>>', req.files); // eslint-disable-line
    var archivo = req.files.archivo;
    var uploadPath = path_1.default.join(__dirname, '../uploads/' + archivo.name);
    archivo.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).json({
                error: true,
                message: err
            });
        }
        res.json({
            message: 'El archivo se subió al path ',
            uploadPath: uploadPath
        });
    });
};
exports.cargarArchivo = cargarArchivo;
//# sourceMappingURL=uploads.controller.js.map