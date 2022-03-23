/*'use strict';
type Model {
	_id: ID
	name: String
	description: String
	identity: String
	imgUrl: String
	videoUrl: String
    growthDescription: String
	addTime   : Date!
	timestamp :String
}
* */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const moment = require('moment');
  const CourseClassificationSchema = new Schema({
    mode: {
      type: String,
      unique: false,
      required: true,
    },
    title: {
      type: String,
      unique: false,
      required: true,
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
  return mongoose.model('CourseClassification', CourseClassificationSchema);
}
