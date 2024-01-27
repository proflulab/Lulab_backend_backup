'use strict'

class LaunchConnector {
    constructor(ctx) {
        this.ctx = ctx;
    }

    /**
     * 发送验证码
     * @param {String} mobile
     * @param {Int} area
     * @returns 验证码发送状态RES -> {status, message}
     */
    async verifySend(mobile, area) {
        return await this.ctx.service.sms.verifySend(mobile, area);
    }

    async verifyCheck(mobile, area, code) {
        return await this.ctx.service.sms.verifyCheck(mobile, code, area);
    }

    //Email
    async sendEmail(email) {
        return await this.ctx.service.sms.sendEmail(email);
    }

    async checkEmail(email, code) {
        return await this.ctx.service.sms.checkEmail(email, code);
    }
    async resendCode(email) {
        return await this.ctx.service.sms.sendEmail(email);
    }
}

module.exports = LaunchConnector;
