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
//获取餐馆的列表列表
router.get('/restaurants', Shop.getRestaurants);
//获取餐馆的详细信息
router.get('/restaurant/:restaurant_id', Shop.getRestaurantDetail);
// 更新餐馆信息
router.post('/updateshop', Check.checkAdmin, Shop.updateshop);
//获取餐馆的数量
router.get('/restaurants/count', Shop.getShopCount);
//删除餐馆信息
router.delete('/restaurant/:restaurant_id', Check.checkAdmin, Shop.deleteResturant);
//获取食品列表
router.get('/v2/foods', Food.getFoods);

export default router