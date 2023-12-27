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

async function initUserData(User) {
    try {
        // 查询数据库
        const doc = User.find({});

        if (!doc.length) {
            new User({
                title: '人工智能讨论会.mp4',
                course_id: '63c4dbd53baf2e0dc871e426',
                duration: 20,
                free: true,
                sort: 1,
            }).save();

            console.log('-------------创建主课成功--------------');
        } else {
            console.log('创建用户失败');
        }
    } catch (err) {
        console.log(err);
        console.log('创建用户失败', err.message);
    }
}