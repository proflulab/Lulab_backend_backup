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
      // console.log(docs);
    });
  }

  async fetchAll() {
    console.log(this.ctx.model.User.find({ username: 'admin' }));
    // await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();
    return await this.ctx.model.User.find();

  }

  // async add(username) {
  //   const tag = await this.ctx.model.User.create({ username }, function (error, doc) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log(doc);
  //     }
  //   });
  //   return tag;
  // }

  // 用户密码登陆
  async login(account, password) {
    const { ctx, app } = this;
    return await ctx.service.user.login(account, password);
  }



  // 验证码登陆
  async loginCaptcha(mobile, code, area) {
    const { ctx, app } = this;
    const getcode = await ctx.service.sms.verifyCheck(mobile, code);
    if (getcode) { return await ctx.service.user.loginVerify(mobile); } else {
      return {
        status: "200",
        msg: "验证码错误",
      }
    }
  }



  // 退出登陆
  async logOut() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization.replace(/^Bearer\s/, '');
    return await ctx.service.user.logOut(token);

  }

  // 修改密码
  async passwordChange(mobile, password, code) {
    const { ctx, app } = this;
    const getcode = await ctx.service.sms.verifyCheck(mobile, code);
    if (getcode) { return await ctx.service.user.password(mobile, password); } else {
      return {
        status: "200",
        msg: "验证码错误",
      }
    }

  }


}

module.exports = LaunchConnector;
