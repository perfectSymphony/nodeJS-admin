'use strict';

import BaseComponent from "../../prototype/BaseComponent";
import { Food as FoodModel, Menu as MenuModel } from '../../models/shopping/food';
import formidable from 'formidable';

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
    this.addFood = this.addFood.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.getSpecfoods = this.getSpecfoods.bind(this);
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
  async addCategory(req, res, next){
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      try{
        if(!fields.name){
          throw new Error('必须填写食品类型名称');
        }else if(!fields.restaurant_id){
          throw new Error('餐馆ID错误');
        }
      }catch(err){
        console.log(err.message, err);
        res.send({
          status: 0,
          type: 'ERROR_PARAM',
          message: err.message
        });
        return
      }
      let category_id;
      try{
        category_id = await this.getId('category_id');
      }catch(err){
        console.log('获取category_id失败');
        res.send({
          status: 0,
          type: 'ERROR_DATA',
          message: err.message
        });
        return
      }
      const foodObj = {
        name: fields.name,
        description: fields.description,
        restaurant_id: fields.restaurant_id,
        id: category_id,
        foods: []
      }
      const newFood = new MenuModel(foodObj);
      try{
        await newFood.save();
        res.send({
          status: 1,
          success: '添加食品种类成功',
          newFood
        });
      }catch(err){
        console.log('保存数据失败', err);
        res.send({
          status: 0,
          type: 'ERROR_DATA',
          message: err.message
        });
      }
    });
  }
  async addFood(req, res, next){
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      try{
        if(!fields.name){
          throw new Error('必须填写食品的名称');
        }else if(!fields.image_path){
          throw new Error('必须上传食品种类');
        }else if(!fields.specs.length){
          throw new Error('至少填写哪一种规格');
        }else if(!fields.category_id){
          throw new Error('食品类型ID错误');
        }else if(!fields.restaurant_id){
          throw new Error('餐馆ID错误');
        }
      }catch(err){
        console.log('前台参数错误', err.message);
        res.send({
          status: 0,
          type: 'ERROR_PARAMS',
          message: err.message
        });
        return
      }
      let category;
      let restaurant;
      try{
        category = await MenuModel.findOne({id: fields.category_id});
        restaurant = await MenuModel.findOne({id: fields.restaurant_id});
      }catch(err){
        console.log('获取餐馆信息和食品类型失败', err.message);
        res.send({
          status: 0,
          type: 'ERROR_PARAMS',
          message: err.message
        });
        return
      }
      let item_id;
      try{
        item_id = await this.getId('item_id');
      }catch(err){
        console.log('获取item_id失败', err);
        res.send({
          status: 0,
          type: 'ERROR_DATA',
          message: '添加食品失败'
        });
        return
      }
      const rating_count = Math.ceil(Math.random()*10);
      const month_sales = Math.ceil(Math.random()*1000);
      const tips = rating_count + '评价 售' + month_sales + '份';
      const newFood = {
        name: fields.name,
        description: fields.description,
        image_path: fields.image_path,
        activity: null,
        attributes: [],
        restaurant_id: fields.restaurant_id,
        category_id: fields.category_id,
        satisfy_rate: Math.ceil(Math.random()*100),
        satisfy_count: Math.ceil(Math.random()*1000),
        item_id,
        rating: (4 + Math.random()).toFixed(1),
        rating_count,
        month_sales,
        tips,
        specfoods: [],
        specifications: []
      }
      if(fields.activity){
        newFood.activity = {
          image_text_color: 'f1884f',
          icon_color: 'f07373',
          image_text: fields.activity
        }
      }
      if(fields.attributes.length){
        fields.attributes.forEach(item => {
          let attr;
          switch(item){
            case '新': 
              attr = {
                icon_color: '5ec452',
                icon_name: '新'
              }
              break;
            case '招牌':
              attr = {
                icon_color: 'f07373',
                icon_name: '招牌'
              }
              break;
          }
          newFood.attributes.push(attr);
          console.log(newFood.attributes)
        });
      }
      try{
        const [specfoods, specifications] = await this.getSpecfoods(fields, item_id);
        newFood.specfoods = specfoods;
        newFood.specifications = specifications;
      }catch(err){
        console.log('添加specs失败', err.message);
        res.send({
          status: 0,
          type: 'ERROR_DATA',
          message: '添加食品失败'
        });
        return
      }
      try{
        const foodEntity = await FoodModel.create(newFood);
        category.foods.push(foodEntity);
        // 更新一个文档的字段的时候，如果该字段的类型是数组类型，则必须在更新
        // 保存前声明一下这个数组字段要被修改，否则这个数组字段的值不会被修改。如：
        // article.markModified('categorys');
        // article.save(function(err,article){
        //   if(err) return console.log(err)
        // });
        category.markmidified('foods');
        await category.save();
        res.send({
          status: 1,
          success: '添加食品成功'
        });
      }catch(err){
        console.log('保存食品到数据库失败', err.message);
        res.send({
          status: 0,
          type: 'ERROR_DATA',
          message: err.message
        });
      }
    })
  }
  async getSpecfoods(fields, item_id){
    const specfoods = [],
        specifications = [];
    if(fields.specs.length < 2){
      let food_id, sku_id;
      try{
        sku_id = await this.getId('sku_id');
        food_id = await this.getId('food_id');
      }catch(err){
        throw new Error('获取sku_id、food_id失败');
      }
      specfoods.push({
        packing_fee: fields.specs[0].packing_fee,
        price: fields.specs[0].price,
        specs: [],
        specs_name: fields.specs[0].specs,
        name: fields.name,
        item_id,
        sku_id,
        food_id,
        restaurant_id: fields.restaurant_id,
        recent_rating: (Math.random()*5).toFixed(1),
        recent_popularity: Math.ceil(Math.random()*1000)
      });
    }else{
      specifications.push({
        values: [],
        name: '规格'
      });
      for(let i = 0; i < fields.specs.length; i++){
        let food_id, sku_id;
        try{
          sku_id = await this.getId('sku_id');
          food_id = await this.getId('food_id');
        }catch(err){
          throw new Error('获取sku_id,food_id失败');
        }
        specfoods.push({
          packing_fee: fields.specs[i].packing_fee,
          price: fields.specs[i].price,
          specs: [{
            name: '规格',
            value: fields.specs[i].specs
          }],
          specs_name: fields.specs[i].specs,
          name: fields.name,
          item_id,
          sku_id,
          food_id,
          restaurant_id: fields.restaurant_id,
          recent_rating: (Math.random()*5).toFixed(1),
          recent_popularity: Math.ceil(Math.random()*1000)
        });
        specifications[0].values.push(fields.specs[i].specs);
      }
    }
    return [specfoods, specifications]
  }
  async getFoods(req,res, next){
    const {
      restaurant_id,
      limit = 20,
      offset = 0
    } = req.query;
    try{
      let filter = {};
      if(!restaurant_id && Number(restaurant_id)){
        // const restaurant_id = 1;
        // {restaurant_id}
        // {restaurant_id: 1}restaurant_id: 1__proto__: Object
        filter = {restaurant_id}
      }
      const foods = await FoodModel.find(filter, '-_id').sort({item_id: -1}).limit(Number(limit)).skip(Number(offset));
      res.send({
        status: 1,
        foods
      });
    }catch(err){
      console.log('获取食品数据失败', err);
      res.send({
        status: 0,
        type: 'GET_DATA_ERROR',
        message: err.message
      })
      return
    }
  }
}

export default new Food()