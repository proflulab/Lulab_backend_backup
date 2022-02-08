'use strict';
const DataLoader = require('dataloader');
const BasicConnector = require('../common/basicConnector');
/*const {
  CLIENTS
} = require("../../constant/constants");
const errorCode = require("../../error/errorCode");
const {
  ONBOARDING_STATUS
} = require("../../constant/user");
const {
  MODEL_NAMES
} = require("../../constant/models");
const {
  NOTIFICATION_STATUS
} = require("../../constant/notification");*/
const moment = require('moment');
const MODEL_NAME = 'Model';
class ModelConnector /*extends BasicConnector */{

  constructor(ctx, model){
    this.ctx = ctx;
    //this.model = model;
    this.loader = new DataLoader(
        ids => this.fetch(ids)
    );
  }

  async fetch(ids) {
    return await this.ctx.model.Model.find(null,null,{limit:4},function(err,docs){
      //console.log(docs);
    });
  }

  async fetchById(ids) {
      return await this.ctx.model.Model.find(null,null,{limit:4},function(err,docs){
       // console.log(docs);
      });
  }

  fetchByIds(id) {
      return this.loader.load(id);
  }
  async latestModel(option){
    return await this.ctx.model.Model.find(null,null,{limit:option.limit,skip:option.skip},function(err,docs){
      // console.log(docs);
    });
  }



  //add
  async modelAdd(commentInput) {
    if( !commentInput.courseId ){
      return {"status": -1, "msg": "评论添加失败，课程不能为空"}
    }
    if(  !commentInput.content ){
      return {"status": -1, "msg": "评论添加失败，评论不能为空"}
    }
    if(  !commentInput.authorId){
      return {"status": -1, "msg": "评论添加失败，作者不能为空"}
    }
    
    var comment = await this.ctx.model.Model.create(
        {
          content: commentInput.content,
          courseId: commentInput.courseId,
          authorName: commentInput.authorName,
          authorId: commentInput.authorId,
          authorImg: commentInput.authorImg,
          addTime   : new Date().toLocaleString(),
          timestamp : '' + Date.now()
        }
    );
    await Promise.all([model]);
    model = await model;
    return {"status": 0, "msg": "插入成功"}
  }

  //delete
  async modelDelete(id) {

    var model = await this.ctx.model.Model.deleteOne(
        {
          _id:id
        }
    );
    await Promise.all([model]);
      model = await model;
    return {"status": 0, "msg": "删除成功"}
  }



}

module.exports = ModelConnector;
