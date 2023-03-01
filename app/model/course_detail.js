/**
 * 小课 
 */

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const CourseDetailSchema = new Schema({
        title: { type: String },
        course_id: { type: Schema.Types.ObjectId },
        duration: { type: Number },
        free: { type: Boolean },
        sort: { type: Number },
        description: { type: String },
    }, {
        timestamps: true,
    });


    const Good = mongoose.model('CourseDetail', CourseDetailSchema, 'coursedetail');
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
                title: '人工智能讨论会.mp4',
                course_id: '63c4dbd53baf2e0dc871e426',
                duration: 20,
                free: true,
                sort: 1,
            }).save();
        } else {
            console.log('-------------创建主课成功--------------');
        }
    });
}
