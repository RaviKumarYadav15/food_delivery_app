import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { loginUser,registerUser,logout,verifyUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/logout',verifyJWT, logout);
router.get('/verify',verifyJWT,verifyUser)

export default router;
