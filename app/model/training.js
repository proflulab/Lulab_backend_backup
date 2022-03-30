module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const moment = require('moment');
    const TrainingSchema = new Schema({
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
      imgUrl: {
        type: String,
        unique: false,
        required: false,
      },
      detailUrl: {
        type: String,
        unique: false,
        required: false,
      },
      applyUrl: {
        type: String,
        unique: false,
        required: false,
      },
      trait: {
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
    return mongoose.model('Training', TrainingSchema);
  }
  