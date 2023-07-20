'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async logOut(token) {
        const { ctx } = this;
        const res = await ctx.service.jwt.getUserIdFromToken(token);
        const leavedAt = res.exp - Date.parse(new Date()) / 1000;
        await this.ctx.service.cache.set(res.uid, res.jti, leavedAt);
        if(!res) {
            return {
                status: '100',
                msg: '退出登陆成功',
            };
        }
    }

    async logIn(data) {
        const {ctx,app} = this;
        if (data.userName == 'woshigezhu' && data.password == '123456') {
            // 通过jwt生产token
            const token = app.jwt.sign({
              userName: data.userName,     //需要存储的Token数据
            }, app.config.jwt.secret, {   //app.config.jwt.secret是在配置里配置的密钥'123456'
              expiresIn: 60 * 60 * 24    //expiresIn是token过期时间
            });      
            // 返回token
            ctx.body = {
              code: 0,
              token,
            }
          } else {
            ctx.body = {
              code: -200,
              message: "账号或密码错误"
            }
          }
    }

    /**
     * 
     * @param {String} uid 
     * @param {*} account 
     * @returns 
     */
    async mobileChange(uid, account) {
        const { ctx } = this;
        const corr = await ctx.model.User.findOne({ mobile: uid });
        if (!corr) {
            return {
                status: '200',
                msg: '用户不存在',
                mobile: corr.mobile,
            };
        } else if (account === corr.mobile) {
            return {
                status: '200',
                msg: '新手机号与旧手机号相同',
                mobile: corr.mobile,
            }
        }
        const ismodified = await (await ctx.model.User.updateOne({ mobile: uid }, { mobile: account })).nModified;
        if (ismodified) {
            return {
                status: '100',
                msg: '修改手机号成功',
                mobile: account
            };
        } else {
            return {
                status: '200',
                msg: '修改手机号失败',
                mobile: corr.mobile
            };
        }
    }

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
