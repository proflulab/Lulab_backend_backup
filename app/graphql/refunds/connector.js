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
        const secret = await ctx.service.jwt.getUserIdFromToken(token.split(" ")[1]);
        const user = await ctx.model.User.findOne({ _id: secret.uid });

        let paymentIntent, now, vipValidTime;
        vipValidTime = 1000 * 60 * 60 * 24 * 365 * 2;
        // user = await ctx.model.User.findOne(
        //     { mobile: '86#15910203613' }
        // );
        now = Date.now();
        if (user.vipExpTime.getTime() - vipValidTime - 1000 * 60 * 60 * 24 < now) {
            console.log('会员过期时间')
            console.log(user.vipExpTime)
            console.log('现在时间')
            console.log(new Date(now))
            return { paymentIntentStatus: '会员时间已用一天，无法退款' };
        }
        await stripe.refunds.create({
            payment_intent: id,
        }).then(result => {
            //console.log(result);
            paymentIntent = result;
        });
        console.log('---------------------');
        console.log(paymentIntent);
        console.log('---------------------');
        return { paymentIntentStatus: paymentIntent.status };
    }

}

module.exports = refundsConnector;
