'use strict';

const Controller = require('egg').Controller;

class WebhookController extends Controller {

    async webhook() {
        // 接收阿里服务器POST提交的XML数据
        const params = this.ctx.request.body;
        const result = await this.service.stripe.webhook(params);
        console.log('-------------------------------------------------------webhook');
        this.ctx.response.body = { type: this.ctx.request.body.type };
    }

}

module.exports = WebhookController;
