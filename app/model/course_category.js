module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const CourseCategorySchema = new Schema({
        title: { type: String },
        sort: { type: Number },
        status: { type: Number, default: 1 },
    }, {
        timestamps: true,
    });


    const CourseCategory = mongoose.model( 'CourseCategory',CourseCategorySchema, 'coursecategory');

    initUserData(CourseCategory);
    return CourseCategory;
};

async function initUserData(User) {
    try {
        // 查询数据库
        const doc = User.find({});

        if (!doc.length) {
            new User({
                title: '理论课程',
                sort: 1,
            }).save();
            console.log('-------------创建分类成功--------------');
            if (!doc.length) {
                new User({
                    title: '大咖会谈',
                    sort: 2,
                }).save();
            }
            if (!doc.length) {
                new User({
                    title: '创业经历',
                    sort: 3,
                }).save();
            }
            if (!doc.length) {
                new User({
                    title: '名师讲课',
                    sort: 4,
                }).save();
            }
            if (!doc.length) {
                new User({
                    title: 'Ai课程',
                    sort: 5,
                }).save();
            }
            if (!doc.length) {
                new User({
                    title: '领导力课程',
                    sort: 6,
                }).save();
            }
        } else {
            console.log('创建用户失败');
        }
    } catch (err) {
        console.log(err);
        console.log('创建用户失败');
    }
}