import { Router } from 'express';
import { check } from 'express-validator';

import { getProducts,
        getProduct,
        createProduct,
        updateProducts,
        deleteProducts } from '../controllers/product.controller';

import { validarCampos, validarJWT } from '../middlewares'

import { existProduct } from '../helpers/db-validators.helper';

const router = Router();

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'El id del producto es obligatorio').notEmpty(),
    check('id', 'El id debe tener formato mongoId').isMongoId(),
    check('id').custom(existProduct),
    validarCampos
], getProduct);

router.post('/', [
    validarJWT,
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('category', 'La categoría es obligatorio').notEmpty(),
    check('category', 'categoría debe tener formato mongoId').isMongoId(),
    validarCampos
],createProduct);

router.put('/:id', [
    validarJWT,
    check('id', 'El id del producto es obligatorio').notEmpty(),
    check('id', 'El id debe tener formato mongoId').isMongoId(),
    check('id').custom(existProduct),
    validarCampos
],updateProducts);

router.delete('/:id', [
    validarJWT,
    check('id', 'El id del producto es obligatorio').notEmpty(),
    check('id', 'El id debe tener formato mongoId').isMongoId(),
    check('id').custom(existProduct),
    validarCampos
], deleteProducts);


export default router;