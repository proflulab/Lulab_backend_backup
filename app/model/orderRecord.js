/*'use strict';*/
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const moment = require('moment');
  const OrderRecordSchema = new Schema({
    courseId: {
      type: String,
      unique: false,
      required: true,
    },
    authorId: {
      type: String,
      unique: false,
      required: true,
    },
    status:{
      type: String,
      unique: false,
      required: true,
    },
    addTime: {
      type: String,
      unique: false,
      required: true,
    },
    timestamp: {
      type: String,
      required: false,
    },
    onlineTime: {
      type: Date,
      get: v => moment(v.getTime()).valueOf(),
    },

  });
  return mongoose.model('OrderRecord', OrderRecordSchema);
}
