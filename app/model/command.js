module.exports = app => {
const mongoose = app.mongoose;
const Schema = mongoose.Schema;

//文章评论文档对象
const CommentSchema = new Schema({
    username: String,
    author: String,
    articleTitle: String,
    artileId: Number,
    content: String,
    createTime: String
})

const model = mongoose.model('comments', CommentSchema)

return model;
}