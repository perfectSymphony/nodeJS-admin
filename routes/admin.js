'use strict';

import express from 'express'
import Admin from '../controller/admin/admin'

const router = express.Router();

router.post('/login', Admin.login);
router.get('/singout', Admin.singout);

// 获取用户信息
router.get('/info', Admin.getAdminInfo);

export default router