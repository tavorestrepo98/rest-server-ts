"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var validar_campos_1 = require("../middlewares/validar-campos");
var db_validators_helper_1 = require("../helpers/db-validators.helper");
var user_controller_1 = require("../controllers/user.controller");
var router = express_1.Router();
router.get('/', user_controller_1.getUsers);
router.get('/:id', [
    express_validator_1.check('id', 'El id debe tener formato mongoId').isMongoId(),
    express_validator_1.check('id').custom(db_validators_helper_1.existUserValidator),
    validar_campos_1.validarCampos
], user_controller_1.getUser);
router.post('/', [
    express_validator_1.check('name', 'El nombre es obligarotio').not().isEmpty(),
    express_validator_1.check('email').custom(db_validators_helper_1.emailValidator),
    express_validator_1.check('email', 'El correo no es válido').isEmail(),
    express_validator_1.check('password', 'La contraseña es obligarotio').not().isEmpty(),
    express_validator_1.check('password', 'La contraseña debe de tener mínimo 6 letras').isLength({ min: 6 }),
    express_validator_1.check('role').custom(db_validators_helper_1.roleValidator),
    // check('role', 'No es un role válido').isIn(['admin', 'user']),
    validar_campos_1.validarCampos
], user_controller_1.postUsers);
router.put('/:id', [
    express_validator_1.check('id', 'El id debe tener formato mongoId').isMongoId(),
    express_validator_1.check('id').custom(db_validators_helper_1.existUserValidator),
    express_validator_1.check('email').custom(db_validators_helper_1.emailValidator),
    express_validator_1.check('role').custom(db_validators_helper_1.roleValidator),
    validar_campos_1.validarCampos
], user_controller_1.putUsers);
router.delete('/:id', [
    express_validator_1.check('id', 'El id debe tener formato mongoId').isMongoId(),
    express_validator_1.check('id').custom(db_validators_helper_1.existUserValidator),
    validar_campos_1.validarCampos
], user_controller_1.deleteUsers);
exports.default = router;
//# sourceMappingURL=user.routes.js.map