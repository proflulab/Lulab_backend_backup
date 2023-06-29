'use strict';

const DataLoader = require('dataloader');
const { cors } = require('../../../config/plugin');
const ObjectId = require('mongodb').ObjectID;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

class refundsConnector {
    constructor(ctx) {
        this.ctx = ctx;
    }

    /**
     * 创建退款
     * @param {String} id 订单的payment_intent的id 
     * @returns paymentIntentStatus 退款状态
     */

    async createRefunds(id) {
        const { ctx } = this;
        const token = ctx.request.header.authorization;
        if (!token) {
            return { link: "" }
        }
        let paymentIntent, now, vipValidTime;
        vipValidTime = 1000 * 60 * 60 * 24 * 365 * 2;//vip有效时间，目前设定暂时为2年，从收到支付通知的一刻开始计算，需要与/app/service/stripe.js下的vipValidTime保持一致，修改此处也要修改那里的vipValidTime
        now = Date.now();
        try {
            const secret = await ctx.service.jwt.getUserIdFromToken(token.split(" ")[1]);
            const user = await ctx.model.User.findOne({ _id: secret.uid });
            if (user.role == 'vip' && user.vipExpTime.getTime() - vipValidTime + 1000 * 60 * 60 * 24 * 7 < now) {
                /*这里的数字是试看时间之内，目前试看时间是7天，后续如果增加条件也在这里修改即可，比如用户是否观看时间超过半小时*/
                console.log('会员过期时间')
                console.log(user.vipExpTime)
                console.log('现在时间')
                console.log(new Date(now))
                return { paymentIntentStatus: '会员时间已用一天，无法退款' };
            }
            else if (user.vipExpTime.getTime() < now) {
                console.log('会员过期时间')
                console.log(user.vipExpTime)
                console.log('现在时间')
                console.log(new Date(now))
                return { paymentIntentStatus: '会员时间已用完，无法退款' };
            }
            await stripe.refunds.create({
                payment_intent: id,
            }).then(result => {
                paymentIntent = result;
            });
        } catch (ex) {
            return {
                status: ex.code,
                msg: ex.message,
            };
        }
        console.log('---------------------');
        console.log(paymentIntent);
        console.log('---------------------');
        return { status: 100, msg: '成功创建退款', paymentIntentStatus: paymentIntent.status };
    }

}

module.exports = refundsConnector;
