/*'use strict';*/
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const moment = require('moment');
  const AiSpeechStatiscsSchema = new Schema({
    code: {
      type: String,
      unique: false,
      required: false,
    },
    authorId: {
      type: String,
      unique: false,
      required: true,
    },
    tips:{
      type: String,
      unique: false,
      required: false,
    },
    tags:{
      type: String,
      unique: false,
      required: false,
    },
    emoj: {
      type: String,
      unique: false,
      required: false,
    },
    question: {
      type: String,
      unique: false,
      required: false,
    },
    answor: {
      type: String,
      unique: false,
      required: false,
    },
    params: {
      type: String,
      unique: false,
      required: false,
    },
    addTime: {
      type: Date,
      unique: false,
      required: false,
    },
    onlineTime: {
      type: Date,
      get: v => moment(v.getTime()).valueOf(),
    },

  });
  return mongoose.model('AiSpeechStatiscs', AiSpeechStatiscsSchema);
}
