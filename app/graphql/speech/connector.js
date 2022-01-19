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
    console.log('response len' + responses.length)
    for(var j = 0; j < responses.length; j++) {
        if (responses[j] && responses[j].queryResult) {
            if( responses[j].queryResult &&  responses[j].queryResult.fulfillmentMessages){
                for (var test = 0 ; test < responses[j].queryResult.fulfillmentMessages.length ;test ++ ){
                     var temp = responses[j].queryResult.fulfillmentMessages[test]
                     for(var test2 in responses[j].queryResult.fulfillmentMessages[test]){
                         console.log(test2 + "======test2===" + responses[j].queryResult.fulfillmentMessages[test][test2])
                         for(var test3 in responses[j].queryResult.fulfillmentMessages[test][test2]){
                            console.log(test3 + "======test3=====" + responses[j].queryResult.fulfillmentMessages[test][test2][test3])

                         }
                     }
                   // console.log(test + "the test" + "==========" + responses[j].queryResult.fulfillmentMessages[test])
                }
            }
            for (var i in responses[j].queryResult) {
               // console.log(i + "===the val" + responses[j].queryResult[i])
                /*if(i == 'content'){
                    for(var jj in responses[j][i]){
                        console.log(jj +" the jj val =====" + responses[j][i][jj])
                    }
                }*/
            }
            console.log("==============================================")
            //return {"status": 0, "msg": responses[j].queryResult.fulfillmentText}
        }
        }

    return {"status": 0, "msg": responses[0].queryResult.fulfillmentText}
    
  }

  fetchByIds(id) {
      return this.loader.load(id);
  }

}

module.exports = SpeechConnector;
