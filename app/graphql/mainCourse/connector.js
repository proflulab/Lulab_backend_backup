'use strict';
const DataLoader = require('dataloader');
const BasicConnector = require('../common/basicConnector');
const moment = require('moment');
const MODEL_NAME = 'MainCourse';
class MainCourseConnector /*extends BasicConnector */{

  constructor(ctx, model){
    this.ctx = ctx;
    //this.model = model;
    this.loader = new DataLoader(
        ids => this.fetch(ids)
    );
  }

  async fetch(ids) {
    return await this.ctx.model.Course.find(null,null,{limit:4},function(err,docs){
      //console.log(docs);
    });
  }

  async fetchById(ids) {
      return await this.ctx.model.Course.find(null,null,{limit:4},function(err,docs){
       // console.log(docs);
      });
  }

  fetchByIds(id) {
      return this.loader.load(id);
  }

  async latestMainCourse(option){
    return await this.ctx.model.MainCourse.find({mode: { $ne : "2"}},null,{sort:{'_id': -1},limit:option.limit,skip:option.skip},function(err,docs){
      // console.log(docs);
    });
  }
  async detailMainCourse(courseId){
      var mainCourses =  await this.ctx.model.MainCourse.findOne({_id:courseId},null,{},function(err,docs){
          // console.log(docs);
      });
      await Promise.all([mainCourses]);
      var mainCourses = await  mainCourses;
      for(var i=0; i< mainCourses.length;i++){
          if(mainCourses.status == "" || mainCourses.status== null || !mainCourses.status){
              mainCourses.status = "0"
          }
      }
      return mainCourses;
  }

  async latestDirectCourse(mode, authorId , option){
    if(mode == 2) {
      //直播课
      var courses =  await this.ctx.model.MainCourse.find({
        mode: mode,
        onlineTime: {$gte: new Date(new Date().getTime() + 1000 * 60 * 60 * 8)}
      }, null, {limit: option.limit, skip: option.skip}, function (err, docs) {
        //console.log(docs)
      });
      
      //预约记录
      var records = await this.ctx.model.OrderRecord.find({authorId: authorId}, null, {}, function (err, docs) {
         console.log(docs);
      });

      await Promise.all([courses,records]);
      var courses = await  courses;
      var records = await records;
      
      //zhibo 
      if(courses && courses.length){
         for(var i=0; i<courses.length; i++){
              var cid = courses[i]._id;
                   if(records && records.length && records.length > 0){
                       for (var j =0 ; j<  records.length; j++){
                            if(records[j].courseId == cid){
                               courses[i].status = records[j].status;
                            }
                       }
                   }
                   if(courses[i].status == null){
                       courses[i].status = "0";
                   }
         }
      }
      return courses;
    }else {
        var courses = await this.ctx.model.MainCourse.find({mode : mode},null,{limit:option.limit,skip:option.skip},function(err,docs){
        // console.log(docs);
        });
        await Promise.all([courses]);
        var courses = await  courses;
        for(var i=0; i<courses.length; i++){
            if(courses[i].status == null || !courses[i].status ){
                courses[i].status = "0";
            }
        }
        return courses;
    }
  }
  

}

module.exports = MainCourseConnector;
