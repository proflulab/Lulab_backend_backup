'use strict';
const DataLoader = require('dataloader');
const BasicConnector = require('../common/basicConnector');
/*const {
  CLIENTS
} = require("../../constant/constants");
const errorCode = require("../../error/errorCode");
const {
  ONBOARDING_STATUS
} = require("../../constant/user");
const {
  MODEL_NAMES
} = require("../../constant/models");
const {
  NOTIFICATION_STATUS
} = require("../../constant/notification");*/
const moment = require('moment');
const MODEL_NAME = 'Speech';

//dialog flow
// Construct request
//   text to text
// The path to identify the agent that owns the intents.
const dialogflow = require('@google-cloud/dialogflow');
const intentsClient = new dialogflow.IntentsClient();
// Instantiates a session client
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
    //console.log(responses[0]);
    //console.log(responses[0].queryResult.fulfillmentText+"=======");
    console.log('Detected intent');
    console.log('response len:' + responses.length)

    if(responses && responses.length && responses[0] && responses[0].queryResult
         &&  responses[0].queryResult.fulfillmentMessages
         &&  responses[0].queryResult.fulfillmentMessages[0]
         &&  responses[0].queryResult.fulfillmentMessages[0]['text']
         &&  responses[0].queryResult.fulfillmentMessages[0]['text']['text']
         &&  responses[0].queryResult.fulfillmentMessages[0]['text']['text'][0]){
       // console.log("coming 1 ===== " + responses[0].queryResult.fulfillmentMessages[0]['text']['text'][0])
        return {"status": 0, "msg": responses[0].queryResult.fulfillmentMessages[0]['text']['text'][0]}
        //return {"status": 0, "msg": responses[0].queryResult.fulfillmentMessages[0]['text']['text']}
    }else if(responses && responses.length && responses[0]
             && responses[0].queryResult
             && responses[0].queryResult.fulfillmentText
           ){
        //console.log("coming 2 ===== " + responses[0].queryResult.fulfillmentText)

        return {"status": 0, "msg": responses[0].queryResult.fulfillmentText}
    }else {
        //console.log("coming 3 ===== " + responses[0].queryResult.fulfillmentText)

        return {"status": 0, "msg": "请再试一次"}
    }
    //return {"status": 0, "msg": responses[0].queryResult.fulfillmentText}
  }

  fetchByIds(id) {
      return this.loader.load(id);
  }

}

module.exports = SpeechConnector;
