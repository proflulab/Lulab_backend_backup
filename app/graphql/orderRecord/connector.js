'use strict';
const DataLoader = require('dataloader');
const BasicConnector = require('../common/basicConnector');
const moment = require('moment');
const MODEL_NAME = 'OrderRecord';

class OrderRecordConnector /*extends BasicConnector */ {

    constructor(ctx, model) {
        this.ctx = ctx;
        //this.model = model;
        this.loader = new DataLoader(
            ids => this.fetch(ids)
        );
    }

    async fetch(ids) {
        return await this.ctx.model.OrderRecord.find(null, null, {limit: 1}, function (err, docs) {
            //console.log(docs);
        });
    }

    async fetchById(ids) {
        return await this.ctx.model.OrderRecord.find(null, null, {limit: 1}, function (err, docs) {
            // console.log(docs);
        });
    }

    fetchByIds(id) {
        return this.loader.load(id);
    }

    async latestRecord(id, option) {
        var record = await this.ctx.model.OrderRecord.find({authorId: id}, null, {
            limit: option.limit,
            skip: option.skip
        }, function (err, docs) {
            console.log(docs);
        });
        await Promise.all([record]);
        var res = [];
        record = await record;
        if(record && record.length) {
            for (var i = 0; i < record.length; i++) {
                var temp = record[i];
                var course = await this.ctx.model.MainCourse.findOne({_id: temp.courseId})
                await Promise.all([course]);
                course = await course;
                temp.imgUrl =  "https://qn2.proflu.cn/%E5%9B%BE%E6%A0%87/%E5%9C%86%E8%A7%92%E6%9C%B1%E6%96%87.png";///course.imgUrl;
                temp.onlineTime = course.onlineTime;
                temp.title = course.title;
                temp.author = course.author;
                temp.description = course.notification;
                res.push(temp);
            }
        }
        return res;

    }

    //
    async latestUserCourseRecord(id, courseId) {
        var record = await this.ctx.model.OrderRecord.findOne({authorId: id, courseId : courseId}, null, null , function (err, docs) {
            console.log(docs);
        });
        await Promise.all([record]);
        var res = [];
        record = await record;
        if(record && record.status && record.status == "1") {
            return {"status": 0, "msg": "该用户已经预约该课程"}
        }else {
            return {"status": -1, "msg": "该用户没有预约该课程"}
        }

    }


    //add
    async recordAdd(orderRecordInput) {
        if (!orderRecordInput.courseId) {
            return {"status": -1, "msg": "评论添加失败，课程不能为空"}
        }
        if (!orderRecordInput.authorId) {
            return {"status": -1, "msg": "评论添加失败，用户不能为空"}
        }
        if (!orderRecordInput.status) {
            return {"status": -1, "msg": "评论添加失败，状态不能为空"}
        }
        if (!orderRecordInput.onlineTime) {
            return {"status": -1, "msg": "评论添加失败，直播时间不能为空"}
        }

        var record = await this.ctx.model.OrderRecord.create(
            {
                courseId: orderRecordInput.courseId,
                authorId: orderRecordInput.authorId,
                status: orderRecordInput.status,
                onlineTime:moment(parseInt(orderRecordInput.onlineTime)).format('YYYY-MM-DD HH:mm:ss'),
                addTime: new Date().toLocaleString(),
                timestamp: '' +  new Date().valueOf()
            }
        );
        await Promise.all([record]);
        record = await record;
        return {"status": 0, "msg": "插入成功"}
    }


    //add
    async recordIntelligentAdd(orderRecordInput) {
        if (!orderRecordInput.authorId) {
            return {"status": -1, "msg": "评论添加失败，用户不能为空"}
        }
        //(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'))
        var course =  await this.ctx.model.MainCourse.find({mode: "2", onlineTime: {$gte: new Date(new Date().getTime()+1000*60*60*8)}}, null, {sort:{_id: -1},limit:1,skip :0},function(err,docs){
            console.log(docs)
            console.log(err)
        })
        await Promise.all([course]);
        course = await course;
        console.log(course.length+"====")
        if(!course.length || course.length== 0){
            return {"status": -1, "msg": "课程不存在"}
        }
        var record = await this.ctx.model.OrderRecord.create(
            {
                courseId: course[0]._id,
                authorId: orderRecordInput.authorId,
                status: 1,
                onlineTime: course[0].onlineTime,
                addTime: new Date().toLocaleString(),
                timestamp: '' + Date.now()
            }
        );
        await Promise.all([record]);
        record = await record;
        return {"status": 0, "msg": "插入成功"}
    }


}

module.exports = OrderRecordConnector;
