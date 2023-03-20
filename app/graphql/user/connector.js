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


    // 用户密码登陆
    async loginPassword(mobile, area, password) {
        const { ctx } = this;
        return await ctx.service.user.loginPassword(mobile, area, password);
    }


    // 验证码登陆
    async loginCaptcha(mobile, code, area) {
        const getcode = await this.ctx.service.sms.verifyCheck(mobile, code, area);
        if (getcode) { return await this.ctx.service.user.loginVerify(mobile, area); }
        return {
            status: '200',
            msg: '验证码错误',
        };
    }


    // 退出登陆
    async logOut() {
        const { ctx } = this;
        const token = ctx.request.header.authorization.replace(/^Bearer\s/, '');
        return await ctx.service.user.logOut(token);
    }

    // 修改密码
    async passwordChange(mobile, area, password, code) {
        const { ctx } = this;
        const getcode = await ctx.service.sms.verifyCheck(mobile, code, area);
        const account = '' + area + '#' + mobile;
        if (getcode) { return await ctx.service.user.password(account, password); }
        return {
            status: '200',
            msg: '验证码错误',
        };

    }

    /**
     * 修改手机号
     * @param {String} mobile 新手机号
     * @param {*} area 地区
     * @param {*} code 验证码
     * @returns 
     */
    async mobileChange(mobile, area, code) {
        const { ctx } = this;
        const token = ctx.request.header.authorization;
        const secret = await ctx.service.jwt.getUserIdFromToken(token.split(" ")[1]);
        const getcode = await ctx.service.sms.verifyCheck(mobile, code, area);
        if (getcode) {
            const account = '' + area + '#' + mobile;
            return await this.ctx.service.user.mobileChange(secret.uid, account)
        }
        return {
            status: '200',
            msg: '验证码错误',
            mobile: secret.mobile
        };
    }

    /**
     * 获取用户信息
     * @returns 
     */
    async userInfo() {
        const { ctx } = this;
        const token = ctx.request.header.authorization;
        const secret = await ctx.service.jwt.getUserIdFromToken(token.split(" ")[1]);
        return ctx.model.User.findOne({ _id: secret.uid })
    }

    /**
     * 用户信息修改
     * @param {String} name 用户名
     * @param {Int} sex 性别
     * @param {String} wechat 微信号
     * @param {String} dsc 个人简介
     * @returns 
     */
    async changeUserInfo(username, sex, wechat, dsc) {
        const { ctx } = this;
        const token = ctx.request.header.authorization;
        const secret = await ctx.service.jwt.getUserIdFromToken(token.split(" ")[1]);
        await ctx.model.User.updateOne({ _id: secret.uid }, { username, sex, wechat, dsc })
        return await ctx.model.User.findOne({ _id: secret.uid })
    }

    //destroy 注销 - 黑名单机制 
    //黑名单机制注销登录时，缓存JWT至Redis，且【缓存有效时间设置为JWT的有效期】，请求资源时判断是否存在缓存的黑名单中，存在则拒绝访问。


}

module.exports = LaunchConnector;
