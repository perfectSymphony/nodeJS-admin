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
}

export default new Category()