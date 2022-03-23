'use strict';
const DataLoader = require('dataloader');
const BasicConnector = require('../common/basicConnector');
const moment = require('moment');
const MODEL_NAME = 'Speech';

const dialogflow = require('@google-cloud/dialogflow');
const intentsClient = new dialogflow.IntentsClient();
const sessionClient = new dialogflow.SessionsClient();
class SpeechConnector /*extends BasicConnector */{

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

  async speech(speechRequest, ctx, CONNECTOR_NAME, MODEL_NAME) {
    const projectAgentPath = intentsClient.projectAgentPath("newagent-npvt");
    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.projectAgentSessionPath(
        "newagent-npvt",
        speechRequest.userId
    );
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: speechRequest.queryText,
                languageCode: "zh-CN",
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    await Promise.all([responses]);
    console.log('Detected intent');
    console.log('response len:' + responses.length)

    //预约课程
      if(responses && responses.length && responses[0] && responses[0].queryResult
         && responses[0].queryResult.intent) {

          if (responses[0].queryResult.intent.displayName == 'Order zhibo Course') {
              console.log("the zhibo course======= coming")


              var course = await this.ctx.model.MainCourse.find({
                  mode: "2",
                  onlineTime: {$gte: new Date(new Date().getTime() + 1000 * 60 * 60 * 8)}
              }, null, {sort: {_id: -1}, limit: 1, skip: 0}, function (err, docs) {
                  /* console.log(docs)
                   console.log(err)*/
              })
              await Promise.all([course]);
              course = await course;
              console.log(course.length + "====")
              if (!course.length || course.length == 0) {
                  return {"status": -1, "msg": "暂时没有直播课"}
              }
              var record = await this.ctx.model.OrderRecord.create(
                  {
                      courseId: course[0]._id,
                      authorId: speechRequest.userId,
                      status: 1,
                      onlineTime: course[0].onlineTime,
                      addTime: new Date().toLocaleString(),
                      timestamp: '' + Date.now()
                  }
              );
              await Promise.all([record]);
              record = await record;
              return {"status": 0, "msg": "预约成功，时间为" + moment(parseInt(orderRecordInput.onlineTime)).format('YYYY年MM月DD日 HH时mm分') + ",主题为：" + course[0].title +",地点为陆向谦创新创业实验室"}

          }
      }


    if(responses && responses.length && responses[0] && responses[0].queryResult
         &&  responses[0].queryResult.fulfillmentMessages
         &&  responses[0].queryResult.fulfillmentMessages[0]
         &&  responses[0].queryResult.fulfillmentMessages[0]['text']
         &&  responses[0].queryResult.fulfillmentMessages[0]['text']['text']
         &&  responses[0].queryResult.fulfillmentMessages[0]['text']['text'][0]){
        
        return {"status": 0, "msg": responses[0].queryResult.fulfillmentMessages[0]['text']['text'][0]}
    }else if(responses && responses.length && responses[0]
             && responses[0].queryResult
             && responses[0].queryResult.fulfillmentText
           ){
        return {"status": 0, "msg": responses[0].queryResult.fulfillmentText}
    }else {
        return {"status": 0, "msg": "请再试一次"}
    }
  }

  fetchByIds(id) {
      return this.loader.load(id);
  }

}

module.exports = SpeechConnector;
