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
                temp.imgUrl = course.imgUrl;
                temp.onlineTime = course.onlineTime;
                temp.title = course.title;
                temp.author = course.author;
                temp.description = course.description;
                res.push(temp);
            }
        }
        return res;

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
                onlineTime: orderRecordInput.onlineTime,
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
