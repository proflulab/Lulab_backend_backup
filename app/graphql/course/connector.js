'use strict';
const DataLoader = require('dataloader');
const BasicConnector = require('../common/basicConnector');
const moment = require('moment');
const MODEL_NAME = 'Course';

class CourseConnector /*extends BasicConnector */ {

    constructor(ctx, model) {
        this.ctx = ctx;
        //this.model = model;
        this.loader = new DataLoader(
            ids => this.fetch(ids)
        );
    }

    async fetch(ids) {
        return await this.ctx.model.Course.find(null, null, {limit: 4}, function (err, docs) {
            //console.log(docs);
        });
    }

    async fetchById(ids) {
        return await this.ctx.model.Course.find(null, null, {limit: 4}, function (err, docs) {
            // console.log(docs);
        });
    }

    fetchByIds(id) {
        return this.loader.load(id);
    }

    async latestCourse(option) {
        return await this.ctx.model.Course.find(null, null, {
            limit: option.limit,
            skip: option.skip,
            sort:{'sort': 1}
        }, function (err, docs) {
            // console.log(docs);
        });
    }

    async detailCourse(dirId) {
       /* let token = this.ctx.header.authorization
        token = token.replace('Bearer ', '')
        console.log("coning =====46detailcourse========" + token);
        var uid = token.id;
        var userType = 0;
        try {
            let result = await this.ctx.app.jwt.verify(token, "lulablll");
            var id = result.id;
            console.log("coning =====177===" + id)
            if(userType == 1) {
                var user = await this.ctx.model.User.findOne(
                    {"_id": id}, function (err, docs) {
                        console.log(docs);
                    }
                );

                await Promise.all([user]);
                user = await user;
                //多少天降级
                if (user.userType == 1 &&  new Date().getTime() - moment(user.addTime).getTime() > 3600 * 24 ) {
                    user.userType == 0;
                }
                userType = user.userType;
            }else {
                userType = user.userType;
            }

        }catch (e){
            return  {"status":"-1","权限错误"};
        }
*/

        var brotherCourse =  await this.ctx.model.Course.find({mainCourseId: dirId}, null, { sort:{'sort': 1}}, function (err, docs) {
           //  console.log(docs+"====2");
        });
        await Promise.all([brotherCourse]);
        //var course = await  course;

        var brotherCourse = await  brotherCourse;
        /*for(var i=0;i<brotherCourse.length;i++){
            if(userType== 0){
                brotherCourse[i].videoUrl="";
            }else if(userType == 1){
                //多少节课免费
                if(i > 1){
                    brotherCourse[i].videoUrl="";
                }
            }
        }*/
        return brotherCourse;
    }

    async detailLitterCourse(id) {
        return await this.ctx.model.Course.findOne({_id: id}, null, {}, function (err, docs) {
            //  console.log(docs+"====2");
        });
    }


}

module.exports = CourseConnector;
