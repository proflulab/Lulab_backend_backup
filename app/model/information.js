'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const moment = require('moment');
  const InformationSchema = new Schema({
    tag: {
      type: String,
      unique: false,
      required: true,
    },
    title: {
      type: String,
      unique: false,
      required: true,
    },
    img: {
      type: String,
      unique: false,
      required: false,
    },
    content: {
      type: String,
      unique: false,
      required: false,
    },
    author: {
      type: String,
      unique: false,
      required: false,
    },
    authorAccount: {
      type: String,
      unique: false,
      required: false,
    },
    releaseDate: {
      type: Date,
      get: v => moment(v).format('YYYY-MM-DD HH:mm:ss'),
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
  return mongoose.model('Information', InformationSchema);
}
