const router = require('express').Router();

import { getUsers, getSingleUser, createUser, deleteUser } from '../../controllers/userController';

router.route('/').get(getUsers).post(createUser);
   
router.route('/').get(getUsers).delete(deleteUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser);


export default router;