/*'use strict';
};*/

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        name: {
            type: String,
            unique: true,
            required: false,
            get: v => v==null ? "" : v,
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
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        email: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        mobile: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        imageUrl: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
    });

    // 在保存用户前对密码进行哈希处理
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });

  // 添加更新密码方法
  UserSchema.methods.updatePassword = async function (newPassword) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(newPassword, salt);
      await this.save();
      return true;
    } catch (err) {
      return false;
    }
  };

    return mongoose.model('User', UserSchema);
}
