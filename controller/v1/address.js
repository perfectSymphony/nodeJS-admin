'use strict';

import BaseComponent from "../../prototype/BaseComponent";
import AddressModel from '../../models/v1/address';

class Address extends BaseComponent {
  constructor(){
    super(); 
  }
  async getAddAddressById(req, res, next){
    console.log(11)
    const address_id = req.params.address_id;
    if(!address_id || !Number(address_id)){
      res.send({
        type: 'ERROR_PARAMS',
        message: '参数错误'
      });
      return
    }
    try{
      const address = await AddressModel.findOne({id: address_id});
      res.send({
        status: 1,
        address
      });
    }catch(err){
      console.log('获取地址信息失败', err);
      res.send({
        status: 0,
        type: 'ERROR_GET_ADDRESS',
        message: err.message
      });
    }
  }
}

export default new Address()