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


    return mongoose.model( 'CourseCategory',CourseCategorySchema);

    // initUserData(CourseCategory);
    // return CourseCategory;
};


// function initUserData(User) {
//     // 查询数据库
//     User.find({}, (err, doc) => {
//         if (err) {
//             console.log(err);
//             console.log('创建用户失败');
//         } else if (!doc.length) {
//             new User({
//                 title: '理论课程',
//                 sort: 1,
//             }).save();
//         } else {
//             console.log('-------------创建分类成功--------------');
//         }
//     });
// }
