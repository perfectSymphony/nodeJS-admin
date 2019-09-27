'use strict';

import express from 'express';
import Statis from '../controller/statis/statis';
const router = express.Router();

//统计某日API的请求量
router.get('/api/:date/count', Statis.apiCount);
// 统计api所有的请求量
router.get('/api/count', Statis.apiAllCount);
// 获取某天用户的注册量
router.get('/user/:date/count', Statis.userCount);
// 获取某一天的用户数量
router.get('/order/:date/count', Statis.orderCount);
// 获取某天管理员的注册量
router.get('/admin/:date/count', Statis.adminCount);
// 获取所有api的请求记录
router.get('/api/all', Statis.allApiRecord);

export default router