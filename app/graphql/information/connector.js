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

  async fetchLatestInformations(id, ctx, CONNECTOR_NAME, MODEL_NAME) {
    var dataGeek = await this.ctx.curl('http://8.140.177.49:3000/crawl/api?user=zzz&cid=98b2a6ec-83b0-4dc0-a313-ecafd774d86e',{
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

    class Information {
      constructor(title,content){
        this.title = title;
        this.content = content;
      }
    }

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
    }




    /* console.log("the lenth" + lenth)
     const res = JSON.stringify(dataGeek.data)*/
    return res;

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
