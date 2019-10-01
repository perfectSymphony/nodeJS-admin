'use strict';

import express from 'express';
import CityHandle from '../controller/v1/cities';
import SearchPlace from  '../controller/v1/search';
const router = express.Router();

//获取城市列表
router.get('/cities', CityHandle.getCity);
//获取搜索地址
router.get('/pois', SearchPlace.search);

export default router;