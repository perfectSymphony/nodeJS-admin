'use strict';

import express from 'express';
import Shop from '../controller/shopping/shop';
import Check from '../middlewares/check'

const router = express.Router();

router.post('/addshop', Check.checkAdmin, Shop.addShop);

export default router