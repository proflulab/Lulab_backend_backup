/*'use strict';
};*/

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    name: {
      type: String,
      unique: false,
      required: true,
    },
    password: {
      type: String,
      unique: false,
      required: false,
    },
    img: {
      type: String,
      unique: false,
      required: false,
    },
    phone: {
      type: String,
      unique: false,
      required: false,
    },
    sex: {
      type: String,
      unique: false,
      required: false,
    },
    description: {
      type: String,
      unique: false,
      required: false,
    },
    wechat: {
      type: String,
      unique: false,
      required: false,
    },
  });

  return mongoose.model('User', UserSchema);
}
