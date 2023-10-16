// 'use strict';
// const DataLoader = require('dataloader');
// const BasicConnector = require('../common/basicConnector');
// const moment = require('moment');
// const MODEL_NAME = 'Speech';

// const dialogflow = require('@google-cloud/dialogflow');
// const intentsClient = new dialogflow.IntentsClient();
// const sessionClient = new dialogflow.SessionsClient();
// class SpeechConnector /*extends BasicConnector */{

//   constructor(ctx, model){
//     this.ctx = ctx;
//     //this.model = model;
//     this.loader = new DataLoader(
//         ids => this.fetch(ids)
//     );
//   }

//   async fetch(ids) {
//     return await this.ctx.model.Course.find(null,null,{limit:4},function(err,docs){
//       //console.log(docs);
//     });
//   }

//   async speech(speechRequest, ctx, CONNECTOR_NAME, MODEL_NAME) {
//     const projectAgentPath = intentsClient.projectAgentPath("newagent-npvt");
//     // The path to identify the agent that owns the created intent.
//     const sessionPath = sessionClient.projectAgentSessionPath(
//         "newagent-npvt",
//         speechRequest.userId
//     );

//     var userName = '';
//     /*var user = await this.ctx.model.User.findOne(
//           {"_id": speechRequest.userId}, function (err, docs) {
//               // console.log(docs);
//               //return {"status": 1, "name": "hehe"}
//           });
//     await Promise.all([user]);
//     user = await user;

//       if(user){
//         userName = user.name;
//     }*/


//     // The text query request.
//     const request = {
//         session: sessionPath,
//         queryInput: {
//             text: {
//                 text: speechRequest.queryText,
//                 languageCode: "zh-CN",
//             },
//         },
//     };

//     var result ={status:"-1","msg":"程序错误",code:"0","detail":"",subBreak:[],fields:[],category:"0"};
//     const responses = await sessionClient.detectIntent(request);
//     await Promise.all([responses]);
//     console.log('Detected intent');
//     console.log('response len:' + responses.length)


//       if(responses && responses.length && responses[0] && responses[0].queryResult
//          && responses[0].queryResult.intent) {


//           //预约课程
//           if (responses[0].queryResult.intent.displayName == 'Order zhibo Course') {
//               console.log("the zhibo course======= coming")

//               var course = await this.ctx.model.MainCourse.find({
//                   mode: "2",
//                   onlineTime: {$gte: new Date(new Date().getTime() + 1000 * 60 * 60 * 8)}
//               }, null, {sort: {_id: -1}, limit: 1, skip: 0}, function (err, docs) {
//                   /* console.log(docs)
//                    console.log(err)*/
//               })
//               await Promise.all([course]);
//               course = await course;
//               // console.log(course.length + "====")
//               if (!course.length || course.length == 0) {
//                   result.status=0;
//                   result.msg = "暂时没有直播课";
//                   return result;
//               }

//               var recordHistory = await this.ctx.model.OrderRecord.findOne(
//                   {"courseId": course[0]._id,"authorId":speechRequest.userId}, function (err, docs) {
//                       // console.log(docs);
//                   }
//               );
//               await Promise.all([recordHistory]);
//               recordHistory = await recordHistory;
//               if(recordHistory != null || recordHistory){
//                   result.status=0;
//                   result.code = "1";
//                   result.msg = /*userName + "你好，professorLu*/"已为您预约最近直播课,主题为：" + course[0].title + "，时间为"+ moment(parseInt(course[0].onlineTime)).format('MM月DD日 HH时mm分') + ",请及时关注陆向谦实验室微信视频号";
//                   return result;
//               }

//               var record = await this.ctx.model.OrderRecord.create(
//                   {
//                       courseId: course[0]._id,
//                       authorId: speechRequest.userId,
//                       status: 1,
//                       onlineTime: course[0].onlineTime,
//                       addTime: new Date().toLocaleString(),
//                       timestamp: '' + Date.now()
//                   }
//               );
//               await Promise.all([record]);
//               record = await record;

//               var titleIndex = course[0].title != null ?  course[0].title.length : 0;
//               var desIndex = 0;
//               if(course[0].description ){
//                    desIndex = course[0].description.length
//               }else {
//                   course[0].description=""
//               }
//               var timeIndex= 0;
//               if(course[0].onlineTime){
//                   timeIndex = (course[0].onlineTime+ "").length;
//               }else {
//                   course[0].onlineTime=""
//               }
//               console.log(timeIndex+"==iiiii="+desIndex)
//               var subBreak = [titleIndex,titleIndex+timeIndex,titleIndex+timeIndex+desIndex];
//               var detail = course[0].title+course[0].onlineTime+course[0].description;
//               var fields = ["title","onlineTime","description"]
//               var code = "1";
//               return {code:code,"status": 0,"detail":detail,"fields":fields,"subBreak":subBreak, "msg": /*userName + "你好，professorLu已为您*/"预约最近直播课成功，主题为：" + course[0].title + "，时间为"+ moment(parseInt(course[0].onlineTime)).format('MM月DD日 HH时mm分') + ",请及时关注陆向谦实验室视频号",category:"0"}

//          }
//          if(responses[0].queryResult.intent.displayName == 'Query zhibo Course'){
//              var course = await this.ctx.model.MainCourse.find({
//                  mode: "2",
//                  onlineTime: {$gte: new Date(new Date().getTime() + 1000 * 60 * 60 * 8)}
//              }, null, {sort: {_id: -1}, limit: 1, skip: 0}, function (err, docs) {
//                  /* console.log(docs)
//                   console.log(err)*/
//              })
//              await Promise.all([course]);
//              course = await course;
//              // console.log(course.length + "====")
//              if (!course.length || course.length == 0) {
//                  result.status=0;
//                  result.msg = "暂时没有直播课";
//                  return result;
//              }
//              else {
//                  result.status=0;
//                  result.msg = /*userName + "你好，professorLu*/"已为您查询最近直播课，主题为：" + course[0].title + "，时间为"+ moment(parseInt(course[0].onlineTime)).format('MM月DD日 HH时mm分') + ",您可以和我说预约直播课进行预约";
//                  return result;
//                  //return {"status": 0, "msg": speechRequest.userId+"你好，professorLu已为您查询最近直播课成功，主题为：" + course[0].title + "，时间为"+ moment(parseInt(course[0].onlineTime)).format('YYYY年MM月DD日 HH时mm分') + ",请及时关注陆向谦实验室微信视频号"}
//              }
//          }
//          if(responses[0].queryResult.intent.displayName == 'Query order record'){
//              var recordHistory = await this.ctx.model.OrderRecord.findOne(
//                  {   "authorId":speechRequest.userId,
//                      onlineTime: {$gte: new Date(new Date().getTime() + 1000 * 60 * 60 * 8)}
//                  }, function (err, docs) {
//                      // console.log(docs);
//                  }
//              );
//              await Promise.all([recordHistory]);
//              recordHistory = await recordHistory;
//              if(recordHistory != null || recordHistory){
//                  result.status = 0;
//                  result.msg = "已为您查询最近的预约记录，" + "，时间为"+ moment(parseInt(recordHistory.onlineTime)).format('YYYY年MM月DD日 HH时mm分') + ",您可以前往陆向谦实验室app查看课程通知详情";
//                  return result;
//              }else {
//                  result.status = 0;
//                  result.msg = "您最近没有预约直播课";
//                  return result;
//              }
//          }
//       }


//     if(responses && responses.length && responses[0] && responses[0].queryResult
//          &&  responses[0].queryResult.fulfillmentMessages
//          &&  responses[0].queryResult.fulfillmentMessages[0]
//          &&  responses[0].queryResult.fulfillmentMessages[0]['text']
//          &&  responses[0].queryResult.fulfillmentMessages[0]['text']['text']
//          &&  responses[0].queryResult.fulfillmentMessages[0]['text']['text'][0]){
//         result.status=0;
//         result.msg = responses[0].queryResult.fulfillmentMessages[0]['text']['text'][0];
//         return result;
//     }else if(responses && responses.length && responses[0]
//              && responses[0].queryResult
//              && responses[0].queryResult.fulfillmentText
//            ){
//         result.status=0;
//         result.msg = responses[0].queryResult.fulfillmentText;
//         return result;
//     }else {
//         result.status = 0;
//         result.msg = "请再试一次";
//         return result;
//     }
//   }

//   fetchByIds(id) {
//       return this.loader.load(id);
//   }

// }

// module.exports = SpeechConnector;
