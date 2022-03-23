'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'user';
const MODEL_NAME = 'User';

const GeekParkSpider = require("../../spider/geekParkSpider")

module.exports = {  
    
    Query: {
        async userAdmin(root, {
            id
        }, ctx) {
            var AipSpeechClient = require("baidu-aip-sdk").speech;

            // 设置APPID/AK/SK
            var APP_ID = "25252661";
            var API_KEY = "SSNgxCnwPtBlufAcElrztQyY";
            var SECRET_KEY = "u0R1S4zLXQnpqpCHxfNpLv040DgoN5UT";

            // 新建一个对象，建议只保存一个对象调用服务接口
            var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);
            

            /* var fs = require('fs');

            client.text2audio('百度语音合成测试').then(function(result) {
                if (result.data) {
                    fs.writeFileSync('tts.mpVoice.pcm', result.data);
                } else {
                    // 服务发生错误
                    console.log(result)
                }
            }, function(e) {
                // 发生网络错误
                console.log(e)
            });*/

         /*   let fs = require('fs');

            let voice = fs.readFileSync('/Users/dazeng/IdeaProjects/lulab_backend/16k.pcm');

            let voiceBuffer = new Buffer(voice);
            // 识别本地文件
            client.recognize(voiceBuffer, 'pcm', 16000).then(function (result) {
                console.log('<recognize>: ' + JSON.stringify(result));
            }, function(err) {
                console.log(err);
            });*/
            //GeekParkSpider.getUrl();


            //console.log("what is the ctx" + Object.prototype.toString.call(ctx))
            //console.log("what is id" + id)
            for (const key in ctx) {
                // if(key=="model")
                //console.log(key + ": value:" + ctx[key] )
            }
            console.log("what is the model:" + ctx.hasOwnProperty("model"))
            /*  console.log(arr.find({
                _id: {
                  $in: 'n'
                }) + "what is the find")*/
            //ctx.model = {};
            //ctx.model["User"] = [{"id":1},{"id":2}]
            return await ResolverHelper.fetchById(id, ctx, CONNECTOR_NAME, MODEL_NAME);
        },
        userLogin(root, {
            userInput
        }, ctx) {
            return ctx.connector[CONNECTOR_NAME].fetchByName(userInput);
        },
        usersAdmin(root, {
            option,
            condition
        }, ctx) {
            return ResolverHelper.fetchByIds(option, condition, ctx, CONNECTOR_NAME, MODEL_NAME);
        },
    },
    Mutation: {
        userUpdate(root, {
            userInput
        }, ctx) {
            return ctx.connector[CONNECTOR_NAME].userUpdate(userInput);
        },
        userRigister(root, {
            userInput
        }, ctx) {
            return ctx.connector[CONNECTOR_NAME].userRigister(userInput);
        },
      
    }
};
