module.exports = app => {
const mongoose = app.mongoose;
const Schema = mongoose.Schema;

//用户对象
const UserSchema = new Schema({
    username: String,
    pwd: {
        type: String,
        select: false
    },
    avatar: {
        type: String,
        default: ''
    },
    sex: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    }
})

const model = mongoose.model('users', UserSchema)

return model;
}