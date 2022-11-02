module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const d = new Date();

    const CourseSchema = new Schema({
        title: { type: String },
        mode: { type: Number },
        author: { type: String },
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


    const Good =mongoose.model('Course', CourseSchema, 'course');

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
                title: '测试课程',
                mode: 1,
                author: '陆向谦',
                description: '课程描述',
                createdAt: Date.now(),
            }).save();
        } else {
            console.log('-------------创建主课成功--------------');
        }
    });
}
