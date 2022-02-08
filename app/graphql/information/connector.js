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
const MODEL_NAME = 'Information';


let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
let dbname1 = 'datab1';
let dbname2 = 'crawl';


const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  reconnectTries: Number.MAX_VALUE,
  useUnifiedTopology: true
};
//let uri_2 = 'mongodb://username:pwd@192.168.1.1:27017/'+dbname1;
let uri_1 = 'mongodb://127.0.0.1:27017/'+dbname2;
let db1  = mongoose.createConnection(uri_1, options);
db1.on('error', () => {
  console.log(uri_1+"\r\n数据库[" + dbname1 + "]连接错误!" + error);
}).on('connected', () => {
  console.log(uri_1+"\r\n数据库[" + dbname1 + "]连接成功!");
});

let Article_Schema = new mongoose.Schema({
  aid: String,
  content: String,
  title: String,
  img: String,
  author: String,
  publishTime: String,
  time: String

  //createdate: {type:Date, default: Date.now}
}, {
  versionKey: false,
  collection: "article"
});
let Articles = db1.model("Article", Article_Schema);



class InformationConnector /*extends BasicConnector */{

  constructor(ctx, model){
    this.ctx = ctx;
    //this.model = model;
    this.loader = new DataLoader(
        ids => this.fetch(ids)
    );
  }

  async fetch(ids) {
    return await this.ctx.model.Information.find(null,null,{limit:1},function(err,docs){
      //console.log(docs);
    });
  }

  async fetchLatestInformations(option, ctx, CONNECTOR_NAME, MODEL_NAME) {

    class Information {
      constructor(title,content){
        this.title = title;
        this.content = content;
      }
    }
    var res = [];
    var article = await Articles.find(null, null, {limit:option.limit,skip:option.skip}, function(err, list){
      console.log("db1.>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + err);
    //  console.log(list);
    });
   

    await Promise.all([article]);
    var article = await  article
    console.log("the content lenth:" + article.length)
    for (var i = 0; i < article.length; i++) {
      var info = new Information(article[i].title,article[i].content)
      res.push(info);
    }
    //console.log(res.length)
   
    return res;



    /* var dataGeek = await this.ctx.curl('http://8.140.177.49:3000/crawl/api?user=zzz&cid=98b2a6ec-83b0-4dc0-a313-ecafd774d86e',{
       method: 'GET',
       dataType: 'json',
       timeout: 10000
     });
     var dataTiger =await  this.ctx.curl('http://8.140.177.49:3000/crawl/api?user=zzz&cid=e31139fb-ceb6-464d-9d46-e70aa559466a',{
       method: 'GET',
       dataType: 'json',
       timeout: 10000
     });
     var dataEntry =await  this.ctx.curl('http://8.140.177.49:3000/crawl/api?user=zzz&cid=86891c2d-988e-4554-8026-795162564d95',{
       method: 'GET',
       dataType: 'json',
       timeout: 10000
     });
     var dataBlack =await  this.ctx.curl('http://8.140.177.49:3000/crawl/api?user=zzz&cid=25b001d7-b37c-4882-9d48-bd6c8585c758',{
       method: 'GET',
       dataType: 'json',
       timeout: 10000
     });
     await Promise.all([dataGeek,dataTiger,dataEntry,dataBlack]);
     dataGeek = await   dataGeek;
     dataTiger = await  dataTiger;
     dataEntry = await  dataEntry;
     dataBlack = await  dataBlack;
 
     var lenthF = dataTiger.data.data.length;
     var lenthS = dataEntry.data.data.length;
     var lenthT = dataBlack.data.data.length;
     var lessL = 0;
     if(lenthF > lenthS){
       lessL = lenthS
     }else {
       lessL = lenthF
     }
 
     if(lessL > lenthT){
       lessL =lenthT
     }
 
     var res = [];
 
 
 
     if(dataGeek.data.data && dataGeek.data.data.length) {
       for (var i = 0; i < 1; i++) {
         var info = new Information(dataGeek.data.data[i].title, dataGeek.data.data[i].content)
         res.push(info);
       }
     }
     console.log("the lenthL is:" + lessL)
 
     for(var i=0 ;i < lessL; i++){
       var infoF = new Information(dataTiger.data.data[i].title,dataTiger.data.data[i].content)
       var infoS = new Information(dataEntry.data.data[i].title,dataEntry.data.data[i].content)
       var infoT = new Information(dataBlack.data.data[i].title,dataBlack.data.data[i].content)
       res.push(infoF);
       res.push(infoS);
       res.push(infoT);
     }
 
     for(var i =0 ;i< lenthF-lessL;  i++){
       var info = new Information(dataTiger.data.data[i].title,dataTiger.data.data[i].content)
       res.push(info);
     }
 
     for(var i =0 ;i< lenthS-lessL;  i++){
       var info = new Information(dataEntry.data.data[i].title,dataEntry.data.data[i].content)
       res.push(info);
     }
 
     for(var i =0 ;i< lenthT-lessL;  i++){
       var info = new Information(dataBlack.data.data[i].title,dataBlack.data.data[i].content)
       res.push(info);
     }*/




    /* console.log("the lenth" + lenth)
     const res = JSON.stringify(dataGeek.data)*/
   // return res;

    /* var dataGeek = await this.ctx.curl('http:xxx.com/api');
     var dataGeek = await this.ctx.curl('http:xxx.com/api');
     var dataGeek = await this.ctx.curl('http:xxx.com/api');*/

  /*  return await this.ctx.model.Information.find(null,null,{limit:4},function(err,docs){
       // console.log(docs);
    });*/
  }

  fetchByIds(id) {
      return this.loader.load(id);
  }

}

module.exports = InformationConnector;
