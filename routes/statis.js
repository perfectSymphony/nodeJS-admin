'use strict';

import express from 'express';
import Statis from '../controller/statis/statis';
const router = express.Router();

//统计某日API的请求量
router.get('/api/:date/count', Statis.apiCount);
router.get('/api/count', Statis.apiAllCount);

export default router