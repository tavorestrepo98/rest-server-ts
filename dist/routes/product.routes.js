"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var product_controller_1 = require("../controllers/product.controller");
var middlewares_1 = require("../middlewares");
var db_validators_helper_1 = require("../helpers/db-validators.helper");
var router = express_1.Router();
router.get('/', product_controller_1.getProducts);
router.get('/:id', [
    express_validator_1.check('id', 'El id del producto es obligatorio').notEmpty(),
    express_validator_1.check('id', 'El id debe tener formato mongoId').isMongoId(),
    express_validator_1.check('id').custom(db_validators_helper_1.existProduct),
    middlewares_1.validarCampos
], product_controller_1.getProduct);
router.post('/', [
    middlewares_1.validarJWT,
    express_validator_1.check('name', 'El nombre es obligatorio').notEmpty(),
    express_validator_1.check('category', 'La categoría es obligatorio').notEmpty(),
    express_validator_1.check('category', 'categoría debe tener formato mongoId').isMongoId(),
    middlewares_1.validarCampos
], product_controller_1.createProduct);
router.put('/:id', [
    middlewares_1.validarJWT,
    express_validator_1.check('id', 'El id del producto es obligatorio').notEmpty(),
    express_validator_1.check('id', 'El id debe tener formato mongoId').isMongoId(),
    express_validator_1.check('id').custom(db_validators_helper_1.existProduct),
    middlewares_1.validarCampos
], product_controller_1.updateProducts);
router.delete('/:id', [
    middlewares_1.validarJWT,
    express_validator_1.check('id', 'El id del producto es obligatorio').notEmpty(),
    express_validator_1.check('id', 'El id debe tener formato mongoId').isMongoId(),
    express_validator_1.check('id').custom(db_validators_helper_1.existProduct),
    middlewares_1.validarCampos
], product_controller_1.deleteProducts);
exports.default = router;
//# sourceMappingURL=product.routes.js.map