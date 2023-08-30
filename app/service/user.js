'use strict';

const Service = require('egg').Service;
// const Helper = require('../extend/helper');

class UserService extends Service {

  /**
   * 登陆校验
   * 待解决：refresh token存哪里？
   * @param {String} mobile 
   * @param {Int} area 
   * @returns 
   */
  // async loginVerify(mobile, area) {
  //   const { ctx, app } = this;
  //   // 注册判断是否存在
  //   const account = '' + area + '#' + mobile;
  //   const corr = await ctx.model.User.findOne({ mobile: account });
  //   console.log("我创建了：", account)
  //   if (!corr) {
  //     console.log("我进来了")
  //     const course = new ctx.model.User({
  //       mobile: account,
  //       password: Helper.encrypt(Helper.genRandomPwd()),
  //       imageUrl: 'http://qn3.proflu.cn/default.jpg',
  //     });
  //     const result = await course.save();
  //     console.log(result);

  //     ctx.body = '注册成功';
  //     const Token = await ctx.service.jwt.awardToken(result._id); //前端存本地
  //     // token 存储至Redis
  //     await ctx.service.cache.set(result._id, Token.token, 7200);
  //     // 将生成的Token返回给前端
  //     return { status: '100', msg: '登陆成功', token: Token.token, refresh_token: Token.refresh_token, data: result };
  //   }
  //   console.log("该用户名已注册")
  //   ctx.body = '该用户名已注册';
  //   // 生成Token
  //   const Token = await ctx.service.jwt.awardToken(corr._id);
  //   // token 存储至Redis
  //   await ctx.service.cache.set(corr._id, Token.token, 7200);
  //   // 将生成的Token返回给前端
  //   return { status: '100', msg: '登陆成功', token: Token.token, refresh_token: Token.refresh_token, data: corr };
  // }

  async logOut(token) {
    // const { ctx } = this;
    // const res = await ctx.service.jwt.getUserIdFromToken(token);
    // const leavedAt = res.exp - Date.parse(new Date()) / 1000;
    // await this.ctx.service.cache.set(res.uid, res.jti, leavedAt);
    // if (!res) {
      return {
        status: '100',
        msg: '退出登陆成功',
      };
    // }
  }

  /**
   * 用户密码登陆
   * @param {String} mobile 手机号
   * @param {Int} area 区号 
   * @param {String} password 密码
   * @return {*} 
   * 
   */
  async passwordLogin(mobile, area, password) {
  //   const { ctx } = this;
  //   const account = '' + area + '#' + mobile;
  //   const corr = await ctx.model.User.findOne({ mobile: account });
  //   // 用户是否存在
  //   if (!corr) {
  //     ctx.body = '用户名错误';
  //     return { status: '200', msg: '用户名错误' };
  //   } else {
  //     if (Helper.compare(password, corr.password)) {
  //       // 生成Token
  //       const Token = await ctx.service.jwt.awardToken(corr._id);
  //       // token 存储至Redis
  //       await ctx.service.cache.set(corr._id, Token.token, 7200);
  //       // const user = await ctx.model.User.findOne({ account });
  //       // 将生成的Token返回给前端
  //       console.log(corr);
  //       return { success: true, message: '登陆成功', token: Token.token, refresh_token: Token.refresh_token, data: corr };
  //     }
  //     ctx.body = '密码错误,请重新输入!';
  //     return { success: false, message: '密码错误,请重新输入' };
  //   }
  // }
    const user = {
      name: 'John Doe',
      imageUrl: 'https://example.com/john-doe.jpg',
      sex: 'Male',
      mobile: '12340761995',
      email: 'john.doe@example.com',
      description: 'A user from the demo.',
    };
        return {
          success: true,
          message: 'Login successful',
          token: 'generated-token',
          reToken: 'refresh-token',
          data: user,
        }
      }
  // 重置密码
  async resetPassword(args) {
  //   const { ctx } = this;
  //   const { newPassword, phoneNumber } = args; // 从参数中获取手机号
  
  //   try {
  //     const user = await ctx.model.User.findOne({ username: phoneNumber });
  
  //     if (!user) {
  //       return {
  //         success: false,
  //         message: '用户不存在',
  //       };
  //     }
  
  //     // 假设 updatePassword 方法返回一个布尔值来指示更新是否成功
  //     const updateResult = await user.updatePassword(newPassword);
  
  //     if (updateResult) {
  //       // 清除验证码（假设你在发送验证码时使用了 Redis 缓存来存储验证码）
  //       await ctx.app.redis.del(phoneNumber); // 使用 del 方法清除缓存
  
  //       return {
  //         success: true,
  //         message: '密码重置成功',
  //       };
  //     } else {
  //       return {
  //         success: false,
  //         message: '密码重置失败',
  //       };
  //     }
  //   } catch (error) {
  //     // 在这里处理可能的异常
  //     console.error('密码重置出错:', error);
  //     return {
  //       success: false,
  //       message: '密码重置过程中出现错误',
  //     };
  //   }
  // }
  
  // Implement the logic to reset the user's password with the new password.
  // For demonstration purposes, we assume the password reset was successful.
  // Replace this with your actual logic to handle the password reset process.
  return {
    success: true,
    message: 'Password reset successful.',
  };
  }

  // async sendResetPasswordCode(code){

  //   return{
  //     success: true,
  //     message: "验证码发送成功",
  //   }
  // }

  // async verifyResetPasswordCode(code){
  //   const {ctx} = this;
  //   if(!code){

  //   }
  //   return{
  //     success: true,
  //     message: "验证成功"
  //   }
  // }
  async userInfo() {
    // 实现从数据源获取用户信息的逻辑。
    // 出于演示目的，我们假设一个预定义的用户对象。
    // 在实际情况中，你需要替换这里的逻辑，从数据库或外部 API 获取用户信息。
    const user = {
      name: 'John Doe',
      imageUrl: 'https://example.com/john-doe.jpg',
      sex: 'Male',
      dsc: '来自演示的用户。',
      email: 'john.doe@example.com',
    };

    return user;
  }

  async changeUserInfo({ name, sex, dsc, email }) {
    // Implement the logic to change user information in your data source.
    // For demonstration purposes, we assume a predefined user object.
    // Replace this with your actual logic to update user information.
    const updatedUser = {
      name: name || 'John Doe', // Use provided name if available, otherwise keep the current name.
      imageUrl: 'https://example.com/john-doe.jpg',
      sex: sex || 'Male', // Use provided sex if available, otherwise keep the current sex.
      dsc: dsc || 'A user from the demo.', // Use provided description if available, otherwise keep the current description.
      email: email || 'john.doe@example.com', // Use provided email if available, otherwise keep the current email.
    };

    return updatedUser;
  }

  // async accountCancellation(args) {
  //   const { ctx } = this;
  //   const { mobile } = args;

  //   try {
  //     // 假设你已经验证了用户身份并获得了用户的信息，例如通过手机号等方式找到了用户
  //     const user = await ctx.model.User.findOne({ username: mobile });

  //     if (!user) {
  //       return {
  //         status: 'error',
  //         msg: '用户不存在',
  //       };
  //     }

  //     // 删除用户账户
  //     await user.remove();

  //     return {
  //       status: 'success',
  //       msg: '账户注销成功',
  //     };
  //   } catch (error) {
  //     return {
  //       status: 'error',
  //       msg: '账户注销失败',
  //     };
  //   }
  // }
  async accountCancellation(mobile) {


  // Implement the logic to perform the account cancellation.
  // For demonstration purposes, we assume the account cancellation was successful.
  // Replace this with your actual logic to handle the account cancellation process.
  return {
    status: 'Success',
    msg: `Account with number ${accountNumber} has been successfully cancelled.`,
  };
  }
  /**
   * 
   * @param {String} uid 
   * @param {*} account 
   * @returns 
   */
  // async mobileChange(uid, account) {
  //     const { ctx } = this;
  //     const corr = await ctx.model.User.findOne({ mobile: uid });
  //     if (!corr) {
  //         return {
  //             status: '200',
  //             msg: '用户不存在',
  //             mobile: corr.mobile,
  //         };
  //     } else if (account === corr.mobile) {
  //         return {
  //             status: '200',
  //             msg: '新手机号与旧手机号相同',
  //             mobile: corr.mobile,
  //         }
  //     }
  //     const ismodified = await (await ctx.model.User.updateOne({ mobile: uid }, { mobile: account })).nModified;
  //     if (ismodified) {
  //         return {
  //             status: '100',
  //             msg: '修改手机号成功',
  //             mobile: account
  //         };
  //     } else {
  //         return {
  //             status: '200',
  //             msg: '修改手机号失败',
  //             mobile: corr.mobile
  //         };
  //     }
  // }

  /**
      * 生成token
      * @param {String} _id //用户id
      * @returns {*} //543
      */
  async userInit(_id) {
    const { ctx } = this;
    // 生成Token
    const Token = await ctx.service.jwt.awardToken(_id);
    // token 存储至Redis
    await ctx.service.cache.set(_id, Token.token, 1000);
    // 将生成的Token返回给前端
    return Token;
  }

}

module.exports = UserService;
