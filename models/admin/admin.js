'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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