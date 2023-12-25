'use strict';

const DataLoader = require('dataloader');

class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(
      ids => this.fetch(ids)
    )
  }

  async passwordLogin(area, mobile, password) {
    const {ctx} = this;
      return await ctx.service.user.passwordLogin(area, mobile ,password)
    }

    async createAccount(mobile , area ,password, email) {
      const {ctx} = this;
      return await ctx.service.user.createAccount(mobile , area ,password, email);
  }

  // 退出登陆
  async logOut() {
    const { ctx } = this;
    const token = ctx.request.header.authorization.replace(/^Bearer\s/, '');
    return await ctx.service.user.logOut(token);
}

  async sendResetPasswordCode(mobile, area) {
    const {ctx} = this;
    return await ctx.service.sms.sendResetPasswordCode(mobile, area);
  }

  async verifyResetPasswordCode(mobile, area, code) {
    const {ctx} = this;
     return await ctx.service.sms.verifyResetPasswordCode(mobile, area, code);
  }

  async resetPassword(mobile, area, password) {
    const {ctx} = this;
    // const getcode = await ctx.service.sms.verifyResetPasswordCode(mobile, area, code, password)
    return await ctx.service.sms.resetPassword(mobile ,area ,password)
  }

  async accountCancellation(mobile, area) {
    const {ctx} = this;
    return ctx.service.user.accountCancellation(mobile, area);
  }

  /**
     * 用户信息修改
     * @param {String} name 用户名
     * @param {Int} sex 性别
     * @param {String} wechat 微信号
     * @param {String} dsc 个人简介
     * @returns 
     */
  async changeUserInfo(name, sex, dsc, email) {
    const { ctx } = this;
    const token = ctx.request.header.authorization;
    const secret = await ctx.service.jwt.getUserIdFromToken(token);
    await ctx.model.User.updateOne({ _id: secret._id }, { name, sex, dsc, email })
    return await ctx.model.User.findOne({ _id: secret._id })
}

    /**
     * 获取用户信息
     * @returns 
     */
    async userInfo() {
      const { ctx } = this;
      const token = ctx.request.header.authorization;
      const secret = await ctx.service.jwt.getUserIdFromToken(token);
      console.log(token)
      console.log(secret)
      return ctx.model.User.findOne({ _id: secret })
  }
}
module.exports = UserConnector;