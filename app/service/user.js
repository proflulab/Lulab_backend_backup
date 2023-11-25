'use strict';

const Service = require('egg').Service;
const Helper = require('../extend/helper.js');

class UserService extends Service {

//登入校验+注册（手机号）
  async createAccount(mobile , area ,password, email) {
    const { ctx } = this;
    // 注册判断是否存在
    const corr = await ctx.model.User.findOne({
      $or: [
        { area: area },
        { mobile: mobile },
    ],
    });
    console.log(corr)
    if(!corr) {
      console.log("用户注册成功")
      console.log("用户信息：", corr)
      const course = await ctx.model.User.create({
        mobile: mobile,
        area: area,
        password: Helper.encrypt(Helper.genRandomPwd()),
        email: email,
      });
      const result = await course.save();
      console.log(result);
      console.log(result._id)
      const Token = await ctx.service.jwt.generateToken(result._id);
      // 将生成的Token返回给前端
      ctx.body = '注册成功';
      console.log('注册成功')
      return { status: '100', msg: '注册成功',token: Token.token ,retoken: Token.refresh_token, data: result };
    } 
    ctx.body = '该用户已注册'
    console.log("该用户已注册,可选择登入")
    const Token = await ctx.service.jwt.generateToken(corr._id);
      // 将生成的Token返回给前端
    return { status: '200', msg: '此账号已注册!', token: Token.token,retoken: Token.refresh_token, data: corr};
  }

//登入校验（邮箱）
  async loginVerify(email, password, mobile, area) {
    const {ctx} =this;
    const corr = await ctx.model.User.findOne({
      $or: [
        { email: email },
    ],
    });
    console.log(corr)
    if(!corr) {
      console.log("用户注册成功")
      console.log("用户信息：", corr)
      const course = await ctx.model.User.create({
        email: email,
        password: Helper.encrypt(Helper.genRandomPwd()),
      });
      const result = await course.save();
      console.log(result);
      console.log(result._id)
      const Token = await ctx.service.jwt.generateToken(result._id);
      // 将生成的Token返回给前端
      ctx.body = '注册成功';
      console.log('注册成功')
      return {  success: true, message: '注册成功',token: Token.token ,retoken: Token.refresh_token, data: result };
    } 
    ctx.body = '该用户已注册'
    console.log("该用户已注册,可选择登入")
    const Token = await ctx.service.jwt.generateToken(corr._id);
      // 将生成的Token返回给前端
    return {  success: false, message: '此账号已注册!', token: Token.token,retoken: Token.refresh_token, data: corr};

  }

//密码登入
    async passwordLogin(area, mobile, password) {
        const {ctx} =this;
            const corr = await ctx.model.User.findOne({
              $or: [
                { area: area },
                { mobile: mobile },
            ],
            })
            if(!corr){
              console.log("用户信息错误")
              return {success: false ,message: '用户信息错误！请重新输入'}
            }
            if(Helper.compare(password, corr.password)){
                const token = await ctx.service.jwt.generateToken(corr._id);
                console.log(corr._id)
            console.log(corr);
            return { success: true, message: '登陆成功',token: token.token, retoken: token.refresh_token, data: corr }
          } 
          ctx.body = '密码错误,请重新输入!';
          console.log('密码错误,请重新输入!')
          return { success: false, message: '密码错误,请重新输入', token: null, data: null};
        }

        // 退出登陆
    async logOut(token) {
      const { ctx } = this;
      // const oldUser = await ctx.model.User.findOne({ _id: id });

      const res = await ctx.service.jwt.getUserIdFromToken(token);

      const leavedAt = res.exp - Date.parse(new Date()) / 1000;
      // console.log(Date.now());
      await this.ctx.service.cache.set(res.uid, res.jti, leavedAt);
      return {
          status: '100',
          msg: '退出登陆成功',
      };
  }

//注销账户
  async accountCancellation(mobile, area) {
    const {ctx} = this;
    const info = await ctx.model.User.findOne({
      $or: [
        { area: area },
        { mobile: mobile },
    ],
    })
    if(!info) {
      return {
        status: '400', 
        msg: '用户不存在'
      }
    }
    console.log(info._id)
    await ctx.model.User.deleteOne({ _id: info._id });
    return {
      status: '100',
      msg: '用户注销成功'
    }
  }
}

module.exports = UserService;
