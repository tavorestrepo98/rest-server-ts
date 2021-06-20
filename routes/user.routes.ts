import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos';
import { roleValidator, emailValidator, existUserValidator } from '../helpers/db-validators.helper';

import { getUsers, postUsers, putUsers, deleteUsers } from '../controllers/user.controller';

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    check('email').custom(emailValidator),
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligarotio').not().isEmpty(),
    check('password', 'La contraseña debe de tener mínimo 6 letras').isLength({ min: 6 }),
    check('role').custom(roleValidator),
    // check('role', 'No es un role válido').isIn(['admin', 'user']),
    validarCampos
], postUsers);

router.put('/:id', [
    check('id', 'El id debe tener formato mongoId').isMongoId(),
    check('id').custom(existUserValidator),
    check('email').custom(emailValidator),
    check('role').custom(roleValidator),
    validarCampos
],putUsers);

router.delete('/', deleteUsers);

export default router;