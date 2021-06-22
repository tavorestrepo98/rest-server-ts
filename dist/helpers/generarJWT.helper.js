"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generarJWT = function (uid) {
    if (uid === void 0) { uid = ''; }
    return new Promise(function (res, rej) {
        var payload = { uid: uid };
        jsonwebtoken_1.default.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, function (err, token) {
            if (err) {
                console.log(err);
                rej('No se pudo generar el token');
            }
            else {
                res(token);
            }
        });
    });
};
exports.generarJWT = generarJWT;
//# sourceMappingURL=generarJWT.helper.js.map