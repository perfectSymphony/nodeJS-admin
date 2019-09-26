'use strict';

import express from 'express'
import Admin from '../controller/admin/admin'

const router = express.Router();

router.post('/login', Admin.login);
router.get('/singout', Admin.singout);
// 获取用户信息
router.get('/info', Admin.getAdminInfo);
// 获取管理员列表
router.get('/all', Admin.getAllAdmin);
// 获取管理员数量
router.get('/count', Admin.getAdminCount);

export default router