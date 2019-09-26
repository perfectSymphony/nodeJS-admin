'use strict';

import StatisModel from '../../models/statis/statis';

class Statis {
    constructor(){
        
    }
    async apiCount(req, res, next){
        const date = req.params.date;
        if(!date){
            console.log('参数错误');
            res.send({
                status: 0,
                type: 'ERROR_PARAMS',
                message: '参数错误'
            });
            return
        }
        try {
            const count = await StatisModel.find({date}).count();
            res.send({
                status: 1,
                count
            });
        }catch(err){
            console.log('获取当天API请求次数失败');
            res.send({
                status: 0,
                type: 'ERROR_GET_TODAY_API_COUNT',
                message: '获取当天API请求次数失败'
            });
        }
    }
}
export default new Statis()