module.exports = app => {
const mongoose = app.mongoose;
const Schema = mongoose.Schema;

//粉丝文档对象
const FansSchema = new Schema({
    username: String,
    author: String,
    createTime: String
})

const model = mongoose.model('fans', FansSchema)

return model;
}