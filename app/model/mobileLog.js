/*'use strict';
type MobileLog {
	_id: ID
	name: String
	class: String
	action: String
	userId: String
	entityId: String
	addTime   : Date!
	timestamp :String

}
* */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const moment = require('moment');
  const MobileLogSchema = new Schema({
    name: {
      type: String,
      unique: false,
      required: false,
    },
    class: {
      type: String,
      unique: false,
      required: false,
    },
    action: {
      type: String,
      unique: false,
      required: false,
    },
    userId: {
      type: String,
      unique: false,
      required: false,
    },
    entityId: {
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
  return mongoose.model('MobileLog', MobileLogSchema);
}
