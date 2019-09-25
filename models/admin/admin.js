'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 MongoDB collection ，并定义这个collection里的文档的构成。
const adminSchema = new Schema({
  user_name: String,
  password: String,
  id: Number,
  create_time: String,
  admin: {
    type: String,
    default: '管理员'
  },
  status: Number,   //1:普通管理员，2: 超级管理员
  avatar: {
    type: String,
    default: 'default.jpg'
  },
  city: String
})
adminSchema.index({id: 1});

// 我们要把 schema 转换为一个 Model，
const Admin = mongoose.model('Admin', adminSchema);

export default Admin