"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieneRole = exports.roleAdminValidator = void 0;
var roleAdminValidator = function (req, res, next) {
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
exports.roleAdminValidator = roleAdminValidator;
var tieneRole = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    console.log(roles);
    return function (req, res, next) {
        var user = req['user'];
        if (!user) {
            res.status(500).json({
                message: 'Se quiere verificar role sin validar el token primero'
            });
        }
        if (!roles.includes(user.role)) {
            res.status(401).json({
                message: "El servicio requiere uno de estos roles: " + roles
            });
        }
        next();
    };
};
exports.tieneRole = tieneRole;
//# sourceMappingURL=validar-roles.js.map