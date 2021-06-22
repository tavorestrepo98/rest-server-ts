"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleUserValidator = void 0;
var roleUserValidator = function (req, res, next) {
    var user = req['user'];
    if (!user) {
        res.status(500).json({
            message: 'Se quiere verificar role sin validar el token primero'
        });
    }
    if (user['role'] !== 'admin') {
        res.status(401).json({
            message: user['name'] + " no es administrador - no puede hacer esto"
        });
    }
    next();
};
exports.roleUserValidator = roleUserValidator;
//# sourceMappingURL=validar-role.js.map