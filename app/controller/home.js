'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi,egg'
  }

  async getTokenInfo() {
    const { ctx, app } = this;
    // 1. 获取请求头 authorization 属性，值为 token
    const token = ctx.request.header.authorization;
    // 2. 用 app.jwt.verify(token， app.config.jwt.secret)，解析出 token 的值
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    // 返回 token
    console.log("请求成功")
    return {
      status: 200,
      desc: '获取成功',
      data: { ...decode }
    };
  }
}

module.exports = HomeController
