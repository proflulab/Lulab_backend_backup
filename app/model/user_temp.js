module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserTempSchema = new Schema({
    phone: {
      type: Number,
    },
    send_count: {
      type: Number,
    },
    sign: {
      type: String,
    },
    ip: {
      type: String,
    },
  }, {
    timestamps: true,
  });

  return mongoose.model('UserTemp', UserTempSchema, 'user_temp');
};
