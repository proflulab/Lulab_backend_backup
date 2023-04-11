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
        let paymentIntent;
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
