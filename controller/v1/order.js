'use strict';

import BaseComponent from "../../prototype/BaseComponent";
import OrderModel from '../../models/bos/order';

class Order extends BaseComponent {
  constructor(){
    super();
  }
  async getAllOrders(req, res, next){
    const {
      restaurant_id,
      limit = 20,
      offset = 0
    } = req.query;
    try{
      let filter = {};
      if(restaurant_id && Number(restaurant_id)){
        filter = {restaurant_id}
      }
      const orders = await OrderModel.find(filter).sort({id: -1}).limit(Number(limit)).skip(Number(offset));
      const timeNow = new Date().getTime();
      orders.map(item => {
        if(timeNow - item.order_time < 900000){
          item.status_bar.title = '等待支付';
        } else {
          item.status_bar.title = '支付超时';
        }
        item.time_pass = Math.ceil((timeNow - item.order_time) / 1000);
        item.save();
        return item
      });
      res.send({
        status: 1,
        orders
      });
    }catch(err){
      console.log('获取订单数据失败', err);
      res.send({
        status: 0,
        type: 'GET_ORDER_DATA_ERROR',
        message: '获取订单数据失败'
      });
    }
  }
  async getOrdersCount(req, res, next){
    // const restaurant_id = req.query.restaurant_id;
    try{
      // let filter = {};
      // if(restaurant_id && Number(restaurant_id)){
      //   filter = {restaurant_id}
      // }
      // const count = await OrderModel.find(filter).count();

      const count = await OrderModel.count();
      res.send({
        status: 1,
        count
      });
    }catch(err){
      console.log('获取订单数量失败', err);
      res.send({
        status: 0,
        type: 'ERROR_TO_GET_COUNT',
        message: err.message
      });
    }
  }
}

export default new Order()