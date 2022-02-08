/*'use strict';
input CommentInput {
  _id: String
  content: String
  courseId: String
  authorName: String
  authorId: String
  authorImg: String
}
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
    },
    courseId: {
      type: String,
      unique: false,
      required: true,
    },
    authorName: {
      type: String,
      unique: false,
      required: false,
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
