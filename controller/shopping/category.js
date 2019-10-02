'use strict';

import BaseComponent from '../../prototype/BaseComponent';
import CategoryModel from '../../models/shopping/category'

class Category extends BaseComponent {
  constructor(){
    super();
  }
  async addCategory(type){
    try {
      await CategoryModel.addCategory(type);
    }catch(err){
      console.log('增加category数量失败', err);
      resizeBy.send({
        status: 0,
        type: 'ERROR_ADD',
        message: '增加category数量失败'
      });
    }
  }
  //获取所有餐馆的分类和数量
  async getCategories(req, res, next){
    try{
      const categories = await CategoryModel.find({}, '-_id');
      res.send({
        status: 1,
        categories
      });      
    }catch(err){
      console.log('获取所有分类失败', err.message);
      res.send({
        status: 0,
        type: 'ERROR_DATA',
        message: err.message
      });
    }
  }
}

export default new Category()