'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async logOut(token) {
        const { ctx } = this;
        const res = await ctx.service.jwt.getUserIdFromToken(token);
        const leavedAt = res.exp - Date.parse(new Date()) / 1000;
        console.log(Date.now());
        await this.ctx.service.cache.set(res.uid, res.jti, leavedAt);
        return {
            status: '100',
            msg: '退出登陆成功',
        };
    }

}

module.exports = UserService;
