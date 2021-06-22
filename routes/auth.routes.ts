import { Router } from 'express';

import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos';
import { existUserValidatorByEmail } from '../helpers/db-validators.helper';

import { login } from '../controllers/auth.controller';

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').notEmpty(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(existUserValidatorByEmail),
    validarCampos
], login);



export default router;