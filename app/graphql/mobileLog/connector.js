'use strict';
const DataLoader = require('dataloader');
const BasicConnector = require('../common/basicConnector');
const moment = require('moment');
const MODEL_NAME = 'MobileLog';
class MobileLogConnector /*extends BasicConnector */{

  constructor(ctx, model){
    this.ctx = ctx;
    //this.model = model;
    this.loader = new DataLoader(
        ids => this.fetch(ids)
    );
  }

  async fetch(ids) {
    return await this.ctx.model.MobileLog.find(null,null,{limit:4},function(err,docs){
      //console.log(docs);
    });
  }

  async fetchById(ids) {
      return await this.ctx.model.MobileLog.find(null,null,{limit:4},function(err,docs){
       // console.log(docs);
      });
  }

  fetchByIds(id) {
      return this.loader.load(id);
  }
  async latestMobileLog(id, option){
    return await this.ctx.model.MobileLog.find(null,null,{limit:option.limit,skip:option.skip},function(err,docs){
      // console.log(docs);
    });
  }



  //add
  async mobileLogAdd(mobileLogInput) {
    if( !mobileLogInput.courseId ){
    //  return {"status": -1, "msg": "评论添加失败，课程不能为空"}
    }
    if(  !mobileLogInput.content ){
     // return {"status": -1, "msg": "评论添加失败，评论不能为空"}
    }
    if(  !mobileLogInput.authorId){
    //  return {"status": -1, "msg": "评论添加失败，作者不能为空"}
    }


    var mobileLog = await this.ctx.model.MobileLog.create(
        {
            name: mobileLogInput.name,
            class: mobileLogInput.class,
            action: mobileLogInput.action,
            userId: mobileLogInput.userId,
            entityId: mobileLogInput.entityId,
            addTime   : mobileLogInput.addTime,
            timestamp : '' + Date.now()
        }
    );
    await Promise.all([mobileLog]);
     mobileLog = await mobileLog;
    return {"status": 0, "msg": "插入成功"}
  }

  //delete
  async mobileLogDelete(id) {

    var model = await this.ctx.model.MobileLog.deleteOne(
        {
          _id:id
        }
    );
    
    await Promise.all([model]);
    model = await model;
    return {"status": 0, "msg": "删除成功"}
  }



}

module.exports = MobileLogConnector;
