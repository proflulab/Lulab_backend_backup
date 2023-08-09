'use strict';

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
    async verifySend(email) {
        const {ctx} = this;
       return ctx.service.sms.verifySend(email)
    }
    async resendCode(email) {
        const {ctx} = this;
        return ctx.service.sms.resendCode(email)

    }
}

module.exports = LaunchConnector;
