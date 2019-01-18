import express from 'express';
import registerUser from '../controllers/new-account';
import authenticateUser from '../controllers/login';
import getUsers from '../controllers/get-users';

const router = express.Router();

router.get('/', getUsers);
router.post('/login', authenticateUser);
router.post('/new-account', registerUser);
export default router;
