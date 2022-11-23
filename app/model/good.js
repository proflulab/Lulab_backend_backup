module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GoodSchema = new Schema({
    title: { type: String },
    goods_number: { type: Number },
    description: { type: String },
    price: { type: Number },
    original: { type: Number },
    tags: { type: String },
    status: { type: Number, default: 1 },
  }, {
    timestamps: true,
  });

  const Good = mongoose.model('Good', GoodSchema, 'good');
  initUserData(Good);
  return Good;
};


function initUserData(User) {
  // 查询数据库
  User.find({}, (err, doc) => {
    if (err) {
      console.log(err);
      console.log('创建用户失败');
    } else if (!doc.length) {
      new User({
        goods_number: 1000,
        title: '测试商品',
        password: '123456',
        price: 0.1,
        createdAt: Date.now(),
      }).save();
    } else {
      console.log('-------------创建商品成功--------------');
    }
  });
}
