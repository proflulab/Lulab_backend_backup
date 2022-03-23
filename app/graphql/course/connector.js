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
            skip: option.skip
        }, function (err, docs) {
            // console.log(docs);
        });
    }

    async detailCourse(dirId, detailCourseId) {


        var course = await this.ctx.model.Course.findOne({_id: detailCourseId}, null, {}, function (err, docs) {
          //  console.log(docs+"====1");
        });
        var brotherCourse = await this.ctx.model.Course.find({mainCourseId: dirId}, null, {}, function (err, docs) {
           //  console.log(docs+"====2");
        });
        await Promise.all([course, brotherCourse]);
        var course = await  course;
        //var brotherCourse = await  brotherCourse;

        class subCourse {
            constructor(subTitle, courseId, mainCourseId){
                this.subTitle = subTitle;
                this.courseId = courseId;
                this.mainCourseId = mainCourseId;
            }
        }
        console.log("the brotherCourse length:" + brotherCourse.length)
        var subCourses= [];
        for (var i = 0; i < brotherCourse.length; i++) {
            var temp = brotherCourse[i];
            var bro = new subCourse(temp.dirTitle, temp._id, temp.mainCourseId)
            subCourses.push(bro);
        }
        //console.log("test course=====" + course.toString()+"===="+course["_id"])
        course.subCourses = subCourses ;
        //return {"dirTitle":"test"}
        return course;
    }


}

module.exports = CourseConnector;
