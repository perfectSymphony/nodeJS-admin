'use strict';

import express from 'express';
import Shop from '../controller/shopping/shop';
import Check from '../middlewares/check';
import Food from '../controller/shopping/food';

const router = express.Router();

router.post('/addshop', Check.checkAdmin, Shop.addShop);
router.get('/getcategory/:restaurant_id', Food.getCategory);

export default router