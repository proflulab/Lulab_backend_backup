/*'use strict';

* */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const moment = require('moment');
  const ManagerSchema = new Schema({
    name: {
      type: String,
      unique: false,
      required: false,
    },
    tags: {
      type: String,
      unique: false,
      required: false,
    },
    imgUrl: {
      type: String,
      unique: false,
      required: false,
    },
    description: {
      type: String,
      unique: false,
      required: false,
    },
    addTime: {
      type: Date,
      get: v => moment(v).format('YYYY-MM-DD HH:mm:ss'),
    },
    timestamp: {
      type: String,
      unique: false,
      required: false,
    },

  });
  return mongoose.model('Manager', ManagerSchema);
}
