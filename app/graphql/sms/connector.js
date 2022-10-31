'use strict';

const { info } = require('console');
const DataLoader = require('dataloader');

class LaunchConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(
      ids => this.fetch(ids)
    );
  }

  async fetch(ids) {
    // return await this.ctx.model.User.find(null, null, { limit: 4 }, function (err, docs) {
    //   //console.log(docs);
    // });
  }

  async fetchAll() {

  }


  async verifySend(mobile, area) {
    const { ctx, app } = this;
    const code = ctx.helper.rand(6);
    await ctx.service.sms.alisms(mobile, code);
    await ctx.service.cache.set('mobileVerify' + mobile, code, 60);

    return {
      status: 'String',
      msg: 'String',
    };
  }

  async verifyCheck(mobile, code) {
    const { ctx, app } = this;
    const getcode = await ctx.service.cache.get('mobileVerify' + mobile);
    console.log(getcode);
    if (getcode != code || getcode == undefined) {
      return {
        status: '101',
        msg: '登陆失败',
      };
    }

    const corr = await ctx.model.User.findOne({ mobile });
    if (!corr) {
      await this.ctx.model.User.insertMany([{ mobile }]);
      this.ctx.body = '注册成功';
    } else {
      this.ctx.body = '该用户名已注册';
      return {
        status: '101',
        msg: '登陆成功',
      };
    }

  }


}

module.exports = LaunchConnector;
