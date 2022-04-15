module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const moment = require('moment');
    const TrainingSchema = new Schema({
      name: {
        type: String,
        unique: false,
        required: false,
        get: v => v==null ? "" : v
      },
      description: {
        type: String,
        unique: false,
        required: true,
        get: v => v==null ? "" : v
      },
      imgUrl: {
        type: String,
        unique: false,
        required: false,
        get: v => v==null ? "" : v
      },
      detailUrl: {
        type: String,
        unique: false,
        required: false,
        get: v => v==null ? "" : v
      },
      applyUrl: {
        type: String,
        unique: false,
        required: false,
        get: v => v==null ? "" : v
      },
      trait: {
        type: String,
        unique: false,
        required: false,
        get: v => v==null ? "" : v
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
    return mongoose.model('Training', TrainingSchema);
  }
  