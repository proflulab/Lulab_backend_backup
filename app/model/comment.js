/*'use strict';

*/

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const moment = require('moment');
  const CommentSchema = new Schema({
    content: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    entityId: {
      type: String,
      unique: false,
      required: true,
      get: v => v==null ? "" : v
    },
    category: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    authorName: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    parentCommontId: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    authorId: {
      type: String,
      unique: false,
      required: false,
    },
    authorImg: {
      type: String,
      unique: false,
      required: false,
    },
    timestamp: {
      type: String,
      unique: false,
      required: false,
    },
    addTime: {
      type: String,
      unique: false,
      required: false,
    },

  });
  return mongoose.model('Comment', CommentSchema);
}
