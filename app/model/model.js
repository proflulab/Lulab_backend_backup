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
  const ModelSchema = new Schema({
    name: {
      type: String,
      unique: false,
      required: false,
    },
    description: {
      type: String,
      unique: false,
      required: true,
    },
    identity: {
      type: String,
      unique: false,
      required: false,
    },
    imgUrl: {
      type: String,
      unique: false,
      required: false,
    },
    videoUrl: {
      type: String,
      unique: false,
      required: false,
    },
    growthDescription: {
      type: String,
      unique: false,
      required: false,
    },
    addTime: {
      type: String,
      unique: false,
      required: false,
    },
    timestamp: {
      type: String,
      unique: false,
      required: false,
    },

  });
  return mongoose.model('Model', ModelSchema);
}
