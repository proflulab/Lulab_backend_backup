// 'use strict';
// const DataLoader = require('dataloader');
// const BasicConnector = require('../common/basicConnector');
// const moment = require('moment');
// const MODEL_NAME = 'Course';

// class CourseConnector /*extends BasicConnector */ {

//     constructor(ctx, model) {
//         this.ctx = ctx;
//         //this.model = model;
//         this.loader = new DataLoader(
//             ids => this.fetch(ids)
//         );
//     }

//     async fetch(ids) {
//         return await this.ctx.model.Course.find(null, null, {limit: 4}, function (err, docs) {
//             //console.log(docs);
//         });
//     }

//     async fetchById(ids) {
//         return await this.ctx.model.Course.find(null, null, {limit: 4}, function (err, docs) {
//             // console.log(docs);
//         });
//     }

//     fetchByIds(id) {
//         return this.loader.load(id);
//     }

//     async latestCourse(option) {
//         return await this.ctx.model.Course.find(null, null, {
//             limit: option.limit,
//             skip: option.skip
//         }, function (err, docs) {
//             // console.log(docs);
//         });
//     }

//     async detailCourse(dirId) {
//         return await this.ctx.model.Course.find({mainCourseId: dirId}, null, {}, function (err, docs) {
//            //  console.log(docs+"====2");
//         });
//         await Promise.all([brotherCourse]);
//         //var course = await  course;
//         var brotherCourse = await  brotherCourse;
//         return brotherCourse;
//     }


// }

// module.exports = CourseConnector;
