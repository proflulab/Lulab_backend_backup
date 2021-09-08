module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const ArticleSchema = new Schema({
        id: Number,
        title: String,
        createTime: String,
        content: String,
        stemfrom: String,
        read: {
            type: Number,
            default: 0
        },
        star: {
            type: Number,
            default: 0
        },
        comment: {
            type: Number,
            default: 0
        },
        author: String
    })

    const model = mongoose.model('articles',ArticleSchema)

    return model;
}