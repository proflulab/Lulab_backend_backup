
// app/model/logOut.js

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const LogOutSchema = new Schema(
        {
            status: {
                type: String,
                required: true
            },
            msg: {
                type: String,
                required: true
            }
        },
        {
            toJSON: { getters: true } // 使得获取数据时可以调用 getters
        }
    );

    return mongoose.model('LogOut', LogOutSchema);
};
