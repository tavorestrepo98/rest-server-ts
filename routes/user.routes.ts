import { Router } from 'express';

import { getUsers, postUsers, putUsers, deleteUsers } from '../controllers/user.controller';

const router = Router();

router.get('', getUsers);
router.post('', postUsers);
router.put('', putUsers);
router.delete('', deleteUsers);

export default router;