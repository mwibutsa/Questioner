import express from 'express';
import registerUser from '../controllers/users';
// import authenticateUser from '../controllers/users';

const router = express.Router();

// router.post('/login',authenticateUser);
router.post('/new-account',registerUser);
export default router;