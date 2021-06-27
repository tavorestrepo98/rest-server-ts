import { check } from 'express-validator';
import { Router } from 'express';

import { getCategories, 
        getCategory,
        createCategory, 
        putCategory, 
        deleteCategory} from '../controllers/categories.controller';
        
import { validarJWT, validarCampos } from '../middlewares';
import { existCategory } from '../helpers/db-validators.helper';

const router = Router();

router.get('/', getCategories);

router.get('/:id', [
        check('id', 'El id es obligatorio').notEmpty(),
        check('id', 'El id debe tener formato mongoId').isMongoId(),
        check('id').custom(existCategory),
        validarCampos  
], getCategory);

router.post('/', [
        validarJWT,
        check('name', 'El nombre es Obligatorio').notEmpty(),
        validarCampos
], createCategory);

router.put('/:id', [
        validarJWT,
        check('id', 'El id es obligatorio').notEmpty(),
        check('id', 'El id debe tener formato mongoId').isMongoId(),
        check('id').custom(existCategory),
        check('name', 'El nombre es Obligatorio').notEmpty(),
        validarCampos 
], putCategory);

router.delete('/:id', [
        check('id', 'El id es obligatorio').notEmpty(),
        check('id', 'El id debe tener formato mongoId').isMongoId(),
        check('id').custom(existCategory),
        validarCampos 
], deleteCategory);

export default router;