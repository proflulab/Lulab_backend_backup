/*'use strict';
};*/

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Helper = require('../extend/helper.js');


module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        name: {
            type: String,
            // unique: true,
            // required: false,
            // get: v => v==null ? "" : v,
        },
        sex: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        wechat: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        description: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        password: {
            type: String,
            // unique: false,
            // required: false,
            // get: v => v==null ? "" : v,
        },
        email: {
            type: String,
            // unique: false,
            // required: false,
            // get: v => v==null ? "" : v,
        },
        mobile: {
            type: String,
            // unique: false,
            // required: false,
            // get: v => v==null ? "" : v,
        },
        token: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        imageUrl: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
    });

    // 在保存用户前对密码进行哈希处理
// UserSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//       return next();
//     }
  
//     try {
//       const salt = await bcrypt.genSalt(10);
//       this.password = await bcrypt.hash(this.password, salt);
//       return next();
//     } catch (err) {
//       return next(err);
//     }
//   });

    return mongoose.model('User', UserSchema);
    // initUserData(User);
    // return User;
}

// Entity 可以绑定具体数据对Model实例化
// function initUserData(User) {
//   // 查询数据库
//   User.find({}, (err, doc) => {
//       if (err) {
//           console.log(err);
//           console.log('创建用户失败');
//       } else if (!doc.length) {
//           new User({
//               name: "admin",
//               password: "adminpwd",
//               email: "acjjagag@163.com",
//               mobile: '18184502522',
//           }).save();
//       } else {
//           console.log('-------------创建超级管理员成功--------------');
//       }
//   });
// }
