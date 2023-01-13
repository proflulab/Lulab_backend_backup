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
    async login(account, password) {
        const { ctx } = this;
        return await ctx.service.user.login(account, password);
    }


    // 验证码登陆
    async loginCaptcha(mobile, code, area) {
        const getcode = await this.ctx.service.sms.verifyCheck(mobile, code, area);
        if (getcode) { return await this.ctx.service.user.loginVerify(mobile); }
        return {
            status: '200',
            msg: '验证码错误',
        };
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
        if (getcode) { return await ctx.service.user.password(mobile, password); }
        return {
            status: '200',
            msg: '验证码错误',
        };

    }


    // 修改用户信息
    async userEdit() {
        const { ctx, app } = this;

    }


}

module.exports = LaunchConnector;
