module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    var d = new Date();
    const UserTempSchema = new Schema({
        phone: {
            type: Number
        },
        send_count: {
            type: Number
        },
        sign: {
            type: String
        },
        ip: {
            type: String,
        },
        add_time: {
            type: Number,
            default: d.getTime()
        },
    });

    return mongoose.model('UserTemp', UserTempSchema, 'user_temp');
}