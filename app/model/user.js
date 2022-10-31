'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  // 定义数据库的结构
  const Schema = mongoose.Schema;
  // 按照mock的数据，字段：name/password id自动生成
  const d = new Date();
  const UserSchema = new Schema({
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    salt: {
      type: String,
    },
    mobile: { type: String },
    email: { type: String },
    status: { type: Number, default: 1 },
    createdAt: {
      type: Number,
      default: d.getTime(),
    },
    updatedAt: {
      type: Number,
    },
    token: {
      type: String,
    },
    dsc: {
      type: String,
    },
  });
    // 映射到egg-mongo db 库的user表中（不区分大小写）
  const User = mongoose.model('users', UserSchema);
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
      new User({
        username: 'admin',
        password: '123456',
        dsc: '拥有系统内所有菜单和路由权限',
        createdAt: Date.now(),
        mobile: '1234567890',
      }).save();
    } else {
      console.log('-------------创建用户成功--------------');
    }
  });
}
