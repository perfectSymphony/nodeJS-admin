'use strict';

import express from 'express';
import Shop from '../controller/shopping/shop';
import Check from '../middlewares/check';
import Food from '../controller/shopping/food';
import Category from '../controller/shopping/category';

const router = express.Router();

// 添加店铺
router.post('/addshop', Check.checkAdmin, Shop.addShop);
// 获取当前店铺食品种类
router.get('/getcategory/:restaurant_id', Food.getCategory);
// 添加食品种类
router.post('/addcategory', Check.checkAdmin, Food.addCategory);
// 添加食品
router.post('/addfood', Check.checkAdmin, Food.addFood);
// 获取所有商铺分类列表
router.get('/v2/restaurant/category', Category.getCategories);

export default router