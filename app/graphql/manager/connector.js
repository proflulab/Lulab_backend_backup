'use strict';
const DataLoader = require('dataloader');
const BasicConnector = require('../common/basicConnector');
const moment = require('moment');
const MODEL_NAME = 'Manager';
class ManagerConnector /*extends BasicConnector */{

  constructor(ctx, model){
    this.ctx = ctx;
    //this.model = model;
    this.loader = new DataLoader(
        ids => this.fetch(ids)
    );
  }

  async fetch(ids) {
    return await this.ctx.model.Manager.find(null,null,{limit:4},function(err,docs){
      //console.log(docs);
    });
  }

  async fetchById(ids) {
      return await this.ctx.model.Manager.find(null,null,{limit:4},function(err,docs){
       // console.log(docs);
      });
  }

  fetchByIds(id) {
      return this.loader.load(id);
  }
  async queryManager(option){
    return await this.ctx.model.Manager.find(null,null,{},function(err,docs){
        // console.log(docs);
    });
  }

}

module.exports = ManagerConnector;
