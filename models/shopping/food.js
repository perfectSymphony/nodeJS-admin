'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// 数据类型用于定义默认路径， 验证方式， 获取/设置方法，用于数据库查询的默认字段，以及其他针对字符串与数字的特性
// 混合型是一种“存啥都行”的数据类型，它的灵活性来自于对可维护性的妥协。
// Mixed类型用Schema.Types.Mixed 或者一个字面上的空对象{}来定义。下面的定义是等价的：
// var Any = new Schema({ any: {} });
// var Any = new Schema({ any: Schema.Types.Mixed });
// 因为它是一种无固定模式的类型，所以你可以想怎么改就怎么改，
// 但是Mongoose 没有能力去自动检测和保存这些改动。请通过调用doc.markModified 方法来告诉Mongoose某个混合类型的值被改变了。
// person.anything = { x: [3, 4, { y: "changed" }] };
// person.markModified('anything');
// person.save(); // anything will now get saved
const foodSchema = new Schema({
  rating: {
    type: Number,
    default: 0
  },
  is_featured: {
    type: Number,
    default: 0
  },
  restaurant_id: {
    type: Number,
    isRequired: true
  },
  category_id: {
    type: Number,
    default: 0
  },
  pinyin_name: {
    type: String,
    default: ''
  },
  display_time: {
    type: Array,
    default: []
  },
  attrs: {
    type: Array,
    default: []
  },
  description: {
    type: String,
    default: ''
  },
  month_sales: {
    type: Number,
    default: 0
  },
  rating_count: {
    type: Number,
    default: 0
  },
  tips: String,
  image_path: String,
  specifications: [Schema.Types.Mixed],
  server_utc: {
    type: Date,
    default: Date.now()
  },
  is_essential: {
    type: Boolean,
    default: false
  },
  attributes: {
    type: Array,
    default: []
  },
  item_id: {
    type: Number,
    isRequired: true
  },
  limitation: Schema.Types.Mixed,
  name: {
    type: String,
    isRequired: true
  },
  satisfy_count: {
    type: Number,
    default: 0
  },
  activity: Schema.Types.Mixed,
  satisfy_rate: {
    type: Number,
    default: 0
  },
  specfoods: [{
    original_price: {
      type: Number,
      default: 0
    },
    sku_id: {
      type: Number,
      isRequired: true
    },
    name: {
      type: String,
      isRequired: true
    },
    pinyin_name: {
      type: String,
      default: ''
    },
    restaurant_id: {
      type: Number,
      isRequired: true
    },
    food_id: {
      type: Number,
      isRequired: true
    },
    packing_fee: {
      type: Number,
      default: 0
    },
    recent_rating: {
      type: Number,
      default: 0
    },
    promotion_stock: {
      type: Number,
      default: -1
    },
    price: {
      type: Number,
      default: 0
    },
    sold_out: {
      type: Boolean,
      default: false
    },
    recent_popularity: {
      type: Number,
      default: 0
    },
    is_essential: {
      type: Boolean,
      default: false
    },
    item_id: {
      type: Number,
      isRequired: true
    },
    checkout_mode: {
      type: Number,
      default: 1
    },
    stock: {
      type: Number,
      default: 1000
    },
    specs_name: String,
    specs: [
      {
        name: String,
        value: String
      }
    ]
  }]
});

foodSchema.index({item_id: 1});

const menuSchema = new Schema({
  description: String,
  is_selected: {
    type: Boolean,
    default: true
  },
  icon_url: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    isRequired: true
  },
  id: {
    type: Number,
    isRequired: true
  },
  restaurant_id: {
    type: Number,
    isRequired: true
  },
  type: {
    type: Number,
    default: 1
  },
  foods: [foodSchema]
});

menuSchema.index({id: 1});

const Menu = mongoose.model('Menu', menuSchema);

export { Menu };