"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var validar_campos_1 = require("../middlewares/validar-campos");
var db_validators_helper_1 = require("../helpers/db-validators.helper");
var auth_controller_1 = require("../controllers/auth.controller");
var router = express_1.Router();
router.post('/login', [
    express_validator_1.check('email', 'El email es obligatorio').notEmpty(),
    express_validator_1.check('password', 'La contraseña es obligatoria').notEmpty(),
    express_validator_1.check('email', 'El email no es válido').isEmail(),
    express_validator_1.check('email').custom(db_validators_helper_1.existUserValidatorByEmail),
    validar_campos_1.validarCampos
], auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map