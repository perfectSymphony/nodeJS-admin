'use strict';

import RatingModel from '../../models/ugc/rating';

class Rating {
  constructor(){
    
  }
  async initData(restaurant_id){
    try{
      const status = await RatingModel.initData(restaurant_id);
      if(status){
        console.log('初始化评论数据成功！');
      }
    }catch(err){
      console.log('初始化评论数据失败！', err);
      throw new Error(err);
    }
  }
}

export default new Rating()