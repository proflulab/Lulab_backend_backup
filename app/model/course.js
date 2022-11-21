module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CourseSchema = new Schema({
    title: { type: String },
    mode: { type: Number },
    sort: { type: Number },
    author: { type: String },
    description: { type: String },
    status: { type: Number, default: 1 },
    category_id: { type: Schema.Types.ObjectId },
  }, {
    timestamps: true,
  });

  const Course = mongoose.model('Course', CourseSchema, 'course');

  initUserData(Course);
  return Course;
};

function initUserData(User) {
  // 查询数据库
  User.find({}, (err, doc) => {
    if (err) {
      console.log(err);
      console.log('创建用户失败');
    } else if (!doc.length) {
      new User({
        title: '测试课程',
        mode: 1,
        sort: 1,
        author: '陆向谦',
        description: '课程描述',
        category_id: '6362d1e02bbfd16b331657ca',
        createdAt: Date.now(),
      }).save();
    } else {
      console.log('-------------创建主课成功--------------');
    }
  });
}
