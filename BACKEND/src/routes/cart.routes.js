import express from 'express';
import { addToCart,removeFromCart,listCart } from '../controllers/cartController.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const router = express.Router();


router.post('/add',verifyJWT,addToCart);
router.post('/remove',verifyJWT,removeFromCart);
router.get('/list',verifyJWT,listCart);

export default router;
