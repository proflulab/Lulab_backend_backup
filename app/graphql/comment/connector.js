'use strict';
const DataLoader = require('dataloader');
const BasicConnector = require('../common/basicConnector');

const moment = require('moment');
const MODEL_NAME = 'Comment';
class CommentConnector /*extends BasicConnector */{

  constructor(ctx, model){
    this.ctx = ctx;
    //this.model = model;
    this.loader = new DataLoader(
        ids => this.fetch(ids)
    );
  }

  async fetch(ids) {
    return await this.ctx.model.Comment.find(null,null,{limit:4},function(err,docs){
      //console.log(docs);
    });
  }

  async fetchById(ids) {
      return await this.ctx.model.Comment.find(null,null,{limit:4},function(err,docs){
       // console.log(docs);
      });
  }

  fetchByIds(id) {
      return this.loader.load(id);
  }
  async latestComment(entityId, category, option){
    return await this.ctx.model.Comment.find({entityId:entityId,category:category},null,{sort:{'_id': -1},limit:option.limit,skip:option.skip},function(err,docs){
      // console.log(docs);
    });
  }


  //login
  async fetchByComment(userInput) {
    var user = await this.ctx.model.User.findOne(
        {"name": userInput.name}, function (err, docs) {
          console.log(docs);
        }
    );

    await Promise.all([user]);
    user = await user;
    if (userInput.password == user.password) {
      return {"status": 0, "msg": "success", data: user}
    } else {
      return {"status": 1, "msg": "faile"}
    }

  }


  //add
  async commentAdd(commentInput) {
    if( !commentInput.entityId ){
        return {"status": -1, "msg": "评论添加失败，评论主体不能为空"}
    }
    if(  !commentInput.content ){
      return {"status": -1, "msg": "评论添加失败，评论不能为空"}
    }
    if(  !commentInput.authorId){
      return {"status": -1, "msg": "评论添加失败，作者不能为空"}
    }
    if(  !commentInput.category){
          return {"status": -1, "msg": "评论添加失败，类别不能为空"}
    }

    var comment = await this.ctx.model.Comment.create(
        {
          content: commentInput.content,
          entityId: commentInput.entityId,
          category:  commentInput.category,
          authorName: commentInput.authorName,
          authorId: commentInput.authorId,
          authorImg: commentInput.authorImg,
          addTime   : new Date().toLocaleString(),
          timestamp : '' + Date.now()
        }
    );
    await Promise.all([comment]);
    comment = await comment;
    return {"status": 0, "msg": "插入成功"}
  }

  //delete
  async commentDelete(id) {

    var comment = await this.ctx.model.Comment.deleteOne(
        {
          _id:id
        }
    );
    await Promise.all([comment]);
    comment = await comment;
    return {"status": 0, "msg": "删除成功"}
  }
}

module.exports = CommentConnector;
