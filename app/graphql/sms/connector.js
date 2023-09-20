'use strict';
const DataLoader= require('dataloader')


class LaunchConnector {
    constructor(ctx) {
        this.ctx = ctx;
        this.loader = new DataLoader(
            ids => this.fetch(ids)
        );
    }

    /**
     * 发送验证码
     * @param {String} mobile 
     * @param {Int} area 
     * @returns 验证码发送状态RES -> {status, message}
     */
    async verifySend(mobile, area) {
        return await this.ctx.service.sendsms.verifySend(mobile, area);
    }
    async verifyCheck(mobile, area, code) {
        const isright = await this.ctx.service.sendsms.verifyCheck(mobile, code, area);
        if (isright) {
            return {
                status: '100',
                msg: '验证成功',
            };
        }
        return {
            status: '200',
            msg: '验证失败',
        };
    }
}

module.exports = LaunchConnector;
