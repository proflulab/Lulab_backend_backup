'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  // 定义数据库的结构
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    salt: { type: String },
    sex: { type: Number, default: 0 }, // '性别[0:未知;1:男;2:女]'
    mobile: {
      type: String,
      unique: true, // 创建唯一索引
    },
    email: { type: String },
    wechat: { type: String },
    birth: { type: Number, default: 1 },
    profile: { type: String },
    video: { type: String },
    status: { type: Number, default: 1 },
    dsc: { type: String },
    token: {
      type: String,
    },
  }, {
    timestamps: true,
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
        // createdAt: Date.now(),
        mobile: '18184502522',
      }).save();
    } else {
      console.log('-------------创建用户成功--------------');
    }
  });
}
