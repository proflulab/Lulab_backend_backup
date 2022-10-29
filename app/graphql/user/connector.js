'use strict';

const DataLoader = require('dataloader');

class LaunchConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(
      ids => this.fetch(ids)
    );
  }

  async fetch(ids) {
    return await this.ctx.model.User.find(null, null, { limit: 4 }, function (err, docs) {
      //console.log(docs);
    });
  }

  async fetchAll() {
    console.log(this.ctx.model.User.find({ username: 'admin' }));
    //await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();
    return await this.ctx.model.User.find();

  }

  async add(username) {
    const tag = await this.ctx.model.User.create({ username: username }, function (error, doc) {
      if (error) {
        console.log(error);
      } else {
        console.log(doc);
      }
    });
    return tag
  }

  //用户登陆
  async login(mobile, password) {
    const { ctx, app } = this;
    return await ctx.service.user.login(mobile, password);
  }

  //退出登陆
  async logOut() {
    const { ctx, app } = this;
    const token = ctx.request.header['authorization'].replace(/^Bearer\s/, '');
    
     //const res = await ctx.service.jwt.getUserIdFromToken(token);
    
     return await ctx.service.user.logOut(token);
     

    // return {
    //   status: "100",
    //   msg: "退出登陆成功",
    // }
  }

}

module.exports = LaunchConnector;
