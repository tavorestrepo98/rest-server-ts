"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.existeUsuarioAutenticado = void 0;
var existeUsuarioAutenticado = function (req, res, next) {
    var user = req['user'];
    if (!user) {
        res.status(401).json({
            message: 'Token no válido - usuario no existe'
        });
    }
    if (!user['state']) {
        res.status(401).json({
            message: 'Token no válido - usuario con state false'
        });
    }
    next();
};
exports.existeUsuarioAutenticado = existeUsuarioAutenticado;
//# sourceMappingURL=validar-token.js.map