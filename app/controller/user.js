'use strict';
const jwt = require('jsonwebtoken')
const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const {ctx} = this;
    const corr = await ctx.model.User.findOne(userName, password)
    if(!corr){
      ctx.body = {
        msg: "error",
        token: null
      }
      return;
    }
    if(corr.password === password){
    const token = jwt.sign({ userName: 'Jay' }, 'aaabbbccc', { expiresIn: 60 * 60 })
    ctx.body = {
      msg: '登录成功',
      token
    }
  }
}
}

module.exports = UserController;


    
