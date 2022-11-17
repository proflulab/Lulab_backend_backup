module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const d = new Date();

  const CourseDetailSchema = new Schema({
    title: { type: String },
    course_id: { type: Schema.Types.ObjectId },
    author: { type: String },
    link: { type: String },
    sort: { type: Number },
    description: { type: String },
    status: { type: Number, default: 1 },
    createdAt: {
      type: Number,
      default: d.getTime(),
    },
    updatedAt: {
      type: Number,
    },

  });


  const Good = mongoose.model('CourseDetail', CourseDetailSchema, 'doursedetail');
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
        title: '测试小课1',
        course_id: '63618230c1e06925ae885665',
        author: '陆向谦',
        sort: 1,
        link: 'http://+++++',
        createdAt: Date.now(),
      }).save();
    } else {
      console.log('-------------创建主课成功--------------');
    }
  });
}
