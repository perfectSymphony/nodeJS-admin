'use strict';

import BaseComponent from '../../prototype/BaseComponent';

class Category extends BaseComponent {
  constructor(){
    super();
  }
  async addCategory(type){
    try {

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