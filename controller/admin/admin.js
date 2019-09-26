'use strict';

import AdminModel from '../../models/admin/admin';
import AddressComponent from '../../prototype/addressComponent';
import crypto from 'crypto';
import dtime from 'time-formater';

// A Node.js module for parsing form data, especially file uploads.
import formidable from 'formidable';

class Admin extends AddressComponent {
    constructor(){
      super()
      this.login = this.login.bind(this)
      this.encryption = this.encryption.bind(this)
    }
    async login(req, res, next) {
      // 创建一个incoming form实例 
      const form = new formidable.IncomingForm();
      // 以post方式提交的表单域数据都放在fields这个对象当中
      // 以post方式上传的文件、 图片等文件域数据都放在files这个对象当中。
      form.parse(req, async (err, fields, files) => {
        if(err){
          res.send({
            status: 0,
            type: 'FORM_DATA_ERROR',
            message: '表单信息错误'
          });
          return
        }
        const { user_name, password, status = 1 } = fields;
        try {
          if(!user_name){
            throw new Error('用户名参数错误'); 
          } else if(!password){
            throw new Error('密码参数错误');
          }
        } catch (err){
          console.log(err.message, err);
          res.send({
            status: 0,
            type: 'GET_ERROR_PARAM',
            message: err.message
          })
          return
        }
        const newpassword = this.encryption(password);
        try {
          const admin = await AdminModel.findOne({user_name});
          if(!admin){
            const adminTip = status == 1 ? '管理员' : '超级管理员'
            const admin_id = await this.getId('admin_id');
            const cityInfo = await this.guessPosition(req);
            const newAdmin = {
              user_name,
              password: newpassword,
              id: admin_id,
              create_time: dtime().format('YYYY-MM-DD HH:mm'),
              admin: adminTip,
              status,
              city: cityInfo.city
            }
            await AdminModel.create(newAdmin);
            req.session.admin_id = admin_id;
            res.send({
              status: 1,
              success: '注册管理员成功'
            });
          } else if(newpassword.toString() != admin.password.toString()){
            console.log('管理员登录密码错误');
            res.send({
              status: 0,
              type: 'ERROR_PASSWORD',
              message: '该用户已存在，且密码输入错误'
            });
          } else {
            req.session.admin_id = admin.id;
            res.send({
              status: 1,
              success: '登录成功'
            });
          }
        } catch(err){
          console.log('登录管理员失败', err);
          res.send({
            status: 0,
            type: 'LOGIN_ADMIN_FAILED',
            message: '登录管理员失败'
          });
        }
      })
    }
    encryption(password){
      const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
      return newpassword;
    }
    Md5(password){
      // https: //www.cnblogs.com/tugenhua0707/p/9128690.html
      const md5 = crypto.createHash('md5');
      // console.log(crypto.getCiphers());
      return md5.update(password).digest('base64');
    }
    async singout(req, res, next){
      
      try {
        delete req.session.admin_id;
        res.send({
          status: 1,
          success: '退出成功'
        });
      } catch(err){
        console.log('退出失败', err);
        res.send({
          status: 0,
          message: '退出失败'
        })
      }
    }
    async getAdminInfo(req, res, next){
      const admin_id = req.session.admin_id;
      // Number() 函数把对象的值转换为数字。
      if(!admin_id || !Number(admin_id)){
        res.send({
          status: 0,
          type: 'ERROR_SESSION',
          message: '获取管理员信息失败'
        })
        return
      }
      try {
        // https://blog.csdn.net/qq_36743013/article/details/69480842
        // 以下划线"_"开头的键是保留的(不是严格要求的)。
        const info = await AdminModel.findOne({id: admin_id}, '-_id -__v -password');
        if(!info){
          throw new Error('未找到当前管理员');
        } else {
          res.send({
            status: 1,
            data: info
          })
        }

      } catch(err){
        console.log('获取管理员信息失败');
        res.send({
          status: 0,
          type: 'GET_ADMIN_INFO_FAILED',
          message: '获取管理员信息失败'
        });
      }
    }
    async getAllAdmin(req, res, next){
      console.log(req.query)
      const { limit = 20, offset = 0 } = req.query;
      try {
        // https://www.cnblogs.com/michellexiaoqi/p/7472490.html
        //  sort() 方法对数据进行排序,使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而 -1 是用于降序排列
        const allAdmin = await AdminModel.find({}, '-_id -password').sort({id: -1}).skip(Number(offset)).limit(Number(limit));
        res.send({
          status: 1,
          data: allAdmin
        })

      }catch(err){
        console.log('获取超级管理列表失败', err);
        res.send({
          status: 0,
          type: 'ERROR_GET_ADMIN_LIST',
          message: '获取超级管理列表失败'
        });
      }
    }
    async getAdminCount(req, res, next){
      try {
        const count = await AdminModel.count();
        res.send({
          status: 1,
          count
        })
      } catch(err){
        console.log('获取管理员数量失败', err);
        res.send({
          status: 0,
          type: 'ERROR_GET_ADMIN_COUNT',
          message: '获取管理员数量失败'
        });
      }
    }
}

export default new Admin()