'use strict';

import AddressComponent from '../../prototype/addressComponent';
import UserInfoModel from '../../models/v2/userInfo';

class User extends AddressComponent {
  constructor(){
    super();
  }
  async getUserList(req, res, next){
    const {
      limit = 20,
      offset = 0
    } = req.query;
    try{
      const users = await UserInfoModel.find({}, '-_id').sort({user_id: -1}).limit(Number(limit)).skip(Number(offset));
      res.send({
        status: 1,
        users
      });
    }catch(err){
      console.log('获取用户列表数据失败', err);
      res.send({
        status: 0,
        type: 'GET_DATA_ERROR',
        message: '获取用户列表数据失败'
      });
    }
  }
  async getUserCount(req, res, next){
    try{
      const count = await UserInfoModel.count();
      res.send({
        status: 1,
        count
      });
    }catch(err){
      console.log('获取用户数量失败', err);
      res.send({
        status: 0,
        type: 'ERROR_GET_USER_COUNT',
        message: '获取用户数量失败'
      });
    }
  }
  async getInfoById(req, res, next){
    const user_id = req.params.user_id;
    if(!user_id || !Number(user_id)){
      console.log('用户ID有误');
      res.send({
        status: 0,
        type: 'GET_USER_INFO_FAIELD',
        message: '用户ID有误'
      });
      return
    }
    try{
      const userinfo = UserInfoModel.findOne({user_id}, '-_id');
      res.send({
        status: 1,
        userinfo
      });
    }catch(err){
      console.log('获取用户信息失败', err);
      res.send({
        status: 0,
        type: 'GET_USER_INFO_FAIELD',
        message: err.message
      });
    }
  }
  async getUserCity(req, res, next){
    const cityArr = ['北京', '上海', '深圳', '杭州'];
    const filterArr = [];
    cityArr.forEach(item => {
      filterArr.push(UserInfoModel.find({city: item}).count());
    });
    filterArr.push(UserInfoModel.$where('!"北京上海深圳杭州".includes(this.city)').count());
    Promise.all(filterArr).then(result => {
      res.send({
        status: 1,
        user_city: {
          beijing: result[0],
          shanghai: result[1],
          shenzhen: result[2],
          hangzhou: result[3],
          qita: result[4]
        }
      });
    }).catch(err => {
      console.log('获取用户分布城市数据失败', err);
      res.send({
        status: 0,
        type: 'ERROR_GET_USER_CITY',
        message: err.message
      });
    })
  }
}

export default new User()