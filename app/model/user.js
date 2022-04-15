/*'use strict';
};*/

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        name: {
            type: String,
            unique: true,
            required: false,
            get: v => v==null ? "" : v,
        },
        sex: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        birth: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        schoolRecord: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        position: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        location: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        country: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        phone: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        email: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        wechat: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        workCondition: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        industry: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        description: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v,
        },
        identity: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        detailMsg: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        duration: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        address: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        company: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },


        password: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        category: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },

        userType: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },

        imgUrl: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        iconUrl: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        bigCoverUrl: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        profileImgUrl: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        videoUrl: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        homeTown: [{
            type: String,
            unique: false,
            required: false,
        }],
        location:[{
            type:String,
            unique:false,
            required:false,
        }],
        imgs: [{
            type: String,
            unique: false,
            required: false,
        }],
        tags: [{
            type: String,
            unique: false,
            required: false,
        }],
        addTime: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
        timestamp: {
            type: String,
            unique: false,
            required: false,
            get: v => v==null ? "" : v
        },
    });

    return mongoose.model('User', UserSchema);
}
