/*'use strict';
* */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const moment = require('moment');
  const GrowthSchema = new Schema({
    userId: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    category:{
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    type:{
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    company: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    beginTime: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    endTime: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    position: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    positionDetail: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    desc: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    industry: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    companySize: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    properties: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    logoUrl: {
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    imgUrl:{
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    detailUrl:{
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    httpUrls:{
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    },
    videos:[{
      type: String,
      unique: false,
      required: false,
      get: v => v==null ? "" : v
    }],
    accquirePosition:{
      type: String,
      unique: false,
      required: false,
    },
    extraOne:{
      type: String,
      unique: false,
      required: false,
    },
    extraTwo:{
      type: String,
      unique: false,
      required: false,
    },
    extraThree:{
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
  return mongoose.model('Growth', GrowthSchema);
}
