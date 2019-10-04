'use strict';

import AddressComponent from '../../prototype/addressComponent';
import UserInfoModel from '../../models/v2/userInfo'

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
}

export default new User()