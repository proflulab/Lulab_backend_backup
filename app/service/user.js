'use strict';

const Service = require('egg').Service;
const Helper = require('../extend/helper');

class UserService extends Service {

    /**
     * 登陆校验
     * 待解决：refresh token存哪里？
     * @param {String} mobile 
     * @param {Int} area 
     * @returns 
     */
    async loginVerify(mobile, area) {
        const { ctx, app } = this;
        // 注册判断是否存在
        const account = '' + area + '#' + mobile;
        const corr = await ctx.model.User.findOne({ mobile: account });
        console.log("我创建了：", account)
        if (!corr) {
            console.log("我进来了")
            const course = new ctx.model.User({
                mobile: account,
                password: Helper.encrypt(Helper.genRandomPwd()),
                imageUrl: 'http://qn3.proflu.cn/default.jpg',
            });
            const result = await course.save();
            console.log(result);

            ctx.body = '注册成功';
            const Token = await ctx.service.jwt.awardToken(result._id); //前端存本地
            // token 存储至Redis
            await ctx.service.cache.set(result._id, Token.token, 7200);
            // 将生成的Token返回给前端
            return { status: '100', msg: '登陆成功', token: Token.token, refresh_token: Token.refresh_token, data: result };
        }
        console.log("该用户名已注册")
        ctx.body = '该用户名已注册';
        // 生成Token
        const Token = await ctx.service.jwt.awardToken(corr._id);
        // token 存储至Redis
        await ctx.service.cache.set(corr._id, Token.token, 7200);
        // 将生成的Token返回给前端
        return { status: '100', msg: '登陆成功', token: Token.token, refresh_token: Token.refresh_token, data: corr };
    }

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

    /**
     * 用户密码登陆
     * @param {String} mobile 手机号
     * @param {Int} area 区号 
     * @param {String} password 密码
     * @return {*} 
     */
    async loginPassword(mobile, area, password) {
        const { ctx } = this;
        const account = '' + area + '#' + mobile;
        const corr = await ctx.model.User.findOne({ mobile: account });
        // 用户是否存在
        if (!corr) {
            ctx.body = '用户名错误';
            return { status: '200', msg: '用户名错误' };
        } else {
            if (Helper.compare(password, corr.password)) {
                // 生成Token
                const Token = await ctx.service.jwt.awardToken(corr._id);
                // token 存储至Redis
                await ctx.service.cache.set(corr._id, Token.token, 7200);
                // const user = await ctx.model.User.findOne({ account });
                // 将生成的Token返回给前端
                console.log(corr);
                return { status: '100', msg: '登陆成功', token: Token.token, refresh_token: Token.refresh_token, data: corr };
            }
            ctx.body = '密码错误,请重新输入!';
            return { status: '200', msg: '密码错误,请重新输入' };
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
