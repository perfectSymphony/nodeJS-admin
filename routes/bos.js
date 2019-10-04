'use strict';

import express from 'express';
import Order from '../controller/v1/order';

const router = express.Router();
router.get('/orders', Order.getAllOrders);
router.get('/orders/count', Order.getOrdersCount);

export default router