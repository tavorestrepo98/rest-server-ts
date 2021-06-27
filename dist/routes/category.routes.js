"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var express_1 = require("express");
var categories_controller_1 = require("../controllers/categories.controller");
var middlewares_1 = require("../middlewares");
var db_validators_helper_1 = require("../helpers/db-validators.helper");
var router = express_1.Router();
router.get('/', categories_controller_1.getCategories);
router.get('/:id', [
    express_validator_1.check('id', 'El id es obligatorio').notEmpty(),
    express_validator_1.check('id', 'El id debe tener formato mongoId').isMongoId(),
    express_validator_1.check('id').custom(db_validators_helper_1.existCategory),
    middlewares_1.validarCampos
], categories_controller_1.getCategory);
router.post('/', [
    middlewares_1.validarJWT,
    express_validator_1.check('name', 'El nombre es Obligatorio').notEmpty(),
    middlewares_1.validarCampos
], categories_controller_1.createCategory);
router.put('/:id', [
    middlewares_1.validarJWT,
    express_validator_1.check('id', 'El id es obligatorio').notEmpty(),
    express_validator_1.check('id', 'El id debe tener formato mongoId').isMongoId(),
    express_validator_1.check('id').custom(db_validators_helper_1.existCategory),
    express_validator_1.check('name', 'El nombre es Obligatorio').notEmpty(),
    middlewares_1.validarCampos
], categories_controller_1.putCategory);
router.delete('/:id', [
    express_validator_1.check('id', 'El id es obligatorio').notEmpty(),
    express_validator_1.check('id', 'El id debe tener formato mongoId').isMongoId(),
    express_validator_1.check('id').custom(db_validators_helper_1.existCategory),
    middlewares_1.validarCampos
], categories_controller_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=category.routes.js.map