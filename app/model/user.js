'use strict';

const Helper = require('../extend/helper.js');

module.exports = app => {
  const mongoose = app.mongoose;
  // 定义数据库的结构
  const Schema = mongoose.Schema;

  const UserSchema = new Schema(
    {
      username: {
        type: String,
        default: '',
        unique: true, // 创建唯一索引
      },
      salt: { type: String, default: '' },
      password: { type: String },
      /**
       * 性别
       * 0:未知
       * 1:男
       * 2:女
       */
      sex: { type: Number, default: 0 },
      mobile: {
        type: String,
        unique: true,
      },
      email: { type: String, default: '' },
      wechat: { type: String, default: '' },
      birth: { type: Number, default: 0 },
      profile: { type: String },
      video: { type: String },
      activated: {
        type: String,
        enum: ['0', '1'], // 0待激活 1已激活
        default: '1',
      },
      status: { type: Number, default: 1 },
      dsc: { type: String, default: '' },
      token: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

  // 映射到egg-mongo db 库的user表中（不区分大小写）
  const User = mongoose.model('Users', UserSchema);
  // 方法放到这里
  initUserData(User);
  return User;
};

// Entity 可以绑定具体数据对Model实例化
function initUserData(User) {
  // 查询数据库
  User.find({}, (err, doc) => {
    if (err) {
      console.log(err);
      console.log('创建用户失败');
    } else if (!doc.length) {
      const passwordInit = 'admin';
      const salt = Helper.genRandomString(15);
      const password = Helper.cryptPwd(passwordInit, salt);
      new User({
        username: 'admin',
        password,
        salt,
        dsc: '该用户拥有系统内所有菜单和路由权限',
        mobile: '18184502522',
        profile: 'http://qn3.proflu.cn/default.jpg',
      }).save();
    } else {
      console.log('-------------创建超级管理员成功--------------');
    }
  });
}
