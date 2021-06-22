import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-JWT';
import { roleUserValidator } from '../middlewares/validar-role';
import { existeUsuarioAutenticado } from '../middlewares/validar-token';

import { roleValidator,
        emailValidator, 
        existUserValidator, 
        existUserValidatorByIdAndState } from '../helpers/db-validators.helper';

import { getUsers, getUser, postUsers, putUsers, deleteUsers } from '../controllers/user.controller';

const router = Router();

router.get('/', getUsers);

router.get('/:id', [
    check('id', 'El id debe tener formato mongoId').isMongoId(),
    check('id').custom(existUserValidator),
    validarCampos
], getUser);

router.post('/', [
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailValidator),
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

router.delete('/:id', [
    validarJWT,
    existeUsuarioAutenticado,
    roleUserValidator,
    check('id', 'El id debe tener formato mongoId').isMongoId(),
    check('id').custom(existUserValidatorByIdAndState),
    validarCampos
], deleteUsers);

export default router;