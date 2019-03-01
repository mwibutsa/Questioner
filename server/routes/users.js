import express from 'express';
import registerUser from '../controllers/new-account';
import authenticateUser from '../controllers/login';
import getUsers from '../controllers/get-users';
import getUserById from '../controllers/user-by-id';
import { verifyToken, isAdmin } from '../middleware/authenticate';
const router = express.Router();

router.get('/:id', verifyToken, getUserById);
router.get('/',verifyToken, getUsers);
router.post('/login', authenticateUser);
router.post('/new-account', registerUser);
export default router;
