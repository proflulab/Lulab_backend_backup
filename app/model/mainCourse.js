/*'use strict';*/
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const moment = require('moment');
  const MainCourseSchema = new Schema({
    name: {
      type: String,
      unique: false,
      required: true,
      get: v => v==null ? "" : v
    },
    title: {
      type: String,
      unique: false,
      required: true,
      get: v => v==null ? "" : v
    },
    classTags: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    description: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    notification: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    author: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    authorTags: {
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
    mode : {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v

    },
    videoUrl : {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v

    },
    imgUrl : {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v

    },
    coverUrl : {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v

    },
    detailUrl:{
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v

    },
    firstCourseId : {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v

    },
    duration : {
      type: Number,
      unique: false,
      required: false,
      get: v => v==null ? 0 : v

    },
    onlineTime: {
      type: Date,
      get: v => moment(v.getTime()).valueOf(),
    },
    addTime: {
      type: Date,
      get: v => moment(v).format('YYYY-MM-DD HH:mm:ss'),
    },
    updateTime: {
      type: Date,
      get: v => moment(v).format('YYYY-MM-DD HH:mm:ss'),
    },

  });
  return mongoose.model('MainCourse', MainCourseSchema);
}
