'use strict';

import express from 'express';
import CityHandle from '../controller/v1/cities';
import SearchPlace from  '../controller/v1/search';
import User from '../controller/v2/user';

const router = express.Router();

//获取城市列表
router.get('/cities', CityHandle.getCity);
//获取搜索地址
router.get('/pois', SearchPlace.search);
// 获取用户列表
router.get('/users/list', User.getUserList);
//获取用户数量
router.get('/users/count', User.getUserCount);
//获取用户信息
router.get('/users/:user_id', User.getInfoById);
//获取用户分布信息
router.get('/user/city/count', User.getUserCity);

export default router;