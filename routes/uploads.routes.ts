import { Router } from 'express';

import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos';

import { cargarArchivo } from './../controllers/uploads.controller';

const router = Router();

router.post('/', cargarArchivo);

export default router;