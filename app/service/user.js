'use strict';
const Service = require('egg').Service;

class UserService extends Service {


  // 用户注册
  // async registered(mobile) {
  //   const { ctx, app } = this;
  //   // 注册判断是否存在
  //   const corr = await ctx.model.User.findOne({ mobile: mobile });
  //   if (!corr) {
  //     await ctx.model.User.insertMany([mobile]);
  //     ctx.body = '注册成功';
  //     return true
  //   } else {
  //     ctx.body = '该用户名已注册';
  //     return false
  //   }
  // }

  // 登录校验
  async loginVerify(mobile) {
    const { ctx, app } = this;
    // 注册判断是否存在
    const corr = await ctx.model.User.findOne({ mobile });
    if (!corr) {
      await ctx.model.User.insertMany([mobile]);
      ctx.body = '注册成功';
      return true;
    }
    ctx.body = '该用户名已注册';
    return false;

  }


  // 用户密码登陆
  async login(account, password) {
    const { ctx, app } = this;
    const corr = await ctx.model.User.findOne({ mobile: account });
    // 用户是否存在
    if (!corr) {
      ctx.body = '用户名错误';
    } else {
      if (password === corr.password) {
        // 生成Token
        const Token = await ctx.service.jwt.awardToken(corr._id);
        console.log(corr._id);
        // token 存储至Redis
        await ctx.service.cache.set(corr._id, Token.token, 1000);
        // const user = await ctx.model.User.findOne({ account });
        // 将生成的Token返回给前端
        console.log(corr);
        return { status: '100', msg: '登陆成功', token: Token.token, refresh_token: Token.refresh_token, data: corr };
      }
      ctx.body = '密码错误,请重新输入!';
      return { status: '100', msg: '密码错误,请重新输入' };
    }
  }

  // 退出登陆
  async logOut(token) {
    const { ctx } = this;
    // const oldUser = await ctx.model.User.findOne({ _id: id });

    const res = await ctx.service.jwt.getUserIdFromToken(token);

    const leavedAt = res.exp -
      Date.parse(new Date()) / 1000;
    // console.log(Date.now());
    await this.ctx.service.cache.set(res.uid, res.jti, leavedAt);
    return {
      status: '100',
      msg: '退出登陆成功',
    };
  }


  // 修改密码
  async password(mobile, password) {
    const { ctx } = this;
    const corr = await ctx.model.User.findOne({ mobile });
    if (!corr) {
      return {
        msg: '用户不存在',
      };
    }
    await ctx.model.User.updateOne({ mobile }, { $set: { password } });
    return {
      msg: '修改密码成功',
    };
  }


  // 删除用户
  async destroy(id) {
    const { ctx } = this;
    const oldUser = await ctx.model.User.findOne({ _id: id });
    if (!oldUser) {
      return {
        msg: '用户不存在',
      };
    }
    await ctx.model.User.deleteOne({ _id: id });
    return {
      msg: '用户删除成功',
    };
  }

}

module.exports = UserService;
