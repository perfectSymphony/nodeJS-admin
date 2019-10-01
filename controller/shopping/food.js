'use strict';

import BaseComponent from "../../prototype/BaseComponent";
import { Menu as MenuModel } from '../../models/shopping/food';

class Food extends BaseComponent {
  constructor(){
    super();
    this.defaultData = [{
      name: '热销榜',
      description: '大家喜欢吃才是真的好吃',
      icon_url: '5da3872d782f707b4c82ce4607c73d1ajpeg',
      is_selected: true,
      type: 1,
      foods: []
    },{
      name: '优惠',
      description: '美味又实惠, 大家快来抢!',
      icon_url: '4735c4342691749b8e1a531149a46117jpeg',
      type: 1,
      foods: []
    }],
    this.initData = this.initData.bind(this);
  }
  async initData(restaurant_id){
    for(let i = 0; i < this.defaultData.length; i++){
      let category_id;
      try{
        category_id = await this.getId('category_id');
      }catch(err){
        console.log('获取category_id失败');
        throw new Error(err);
      }
      const defaultData = this.defaultData[i];
      const Category = {
        ...defaultData,
        id: category_id,
        restaurant_id
      };
      const newFood = new MenuModel(Category);
      try{
        await newFood.save();
        console.log('初始化食品数据成功！');
      }catch(err){
        console.log('初始化食品数据失败！', err);
        throw new Error(err);
      }
    }
  }
  async getCategory(req, res, next){
    const restaurant_id = req.param.restaurant_id;
    try{
      console.log(MenuModel)
      const category_list = await MenuModel.find({restaurant_id});
      res.send({
        status: 1,
        category_list
      });
    }catch(err){
      console.log('获取餐馆食品的种类', err);
      res.send({
        status: 0,
        type: 'ERROR_GET_DATA',
        message: '获取数据失败'
      });
    }
  }
}

export default new Food()