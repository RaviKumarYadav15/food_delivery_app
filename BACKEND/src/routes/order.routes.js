import express from 'express';
import { listOrders, placeOrder, updateStatus, userOrder, verifyOrder } from '../controllers/order.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = new express.Router();

router.post('/placeOrder',verifyJWT,placeOrder);
router.post('/verify',verifyOrder);
router.post('/userOrders',verifyJWT,userOrder);
router.get('/list',listOrders);
router.post('/status',updateStatus);


export default router;