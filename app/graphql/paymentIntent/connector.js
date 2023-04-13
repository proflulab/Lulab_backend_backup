'use strict';

const DataLoader = require('dataloader');
const { cors } = require('../../../config/plugin');
const ObjectId = require('mongodb').ObjectID;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

class paymentIntentConnector {
    constructor(ctx) {
        this.ctx = ctx;
    }

    /**
     * 创建stripe订单
     * @param {{String}} items 商品对象，包含字符串元素 
     * @param {Strin} userId 用户id 
     * @returns clientSecret
     */

    async createPaymentIntent(items, userId) {
        let paymentIntent;
        await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        }).then(result => {
            console.log(result);
            paymentIntent = result;
            // const user = this.ctx.model.User.findOne({ _id: userId });
            // this.ctx.model.PaymentIntent.create({

            // })

        });
        return { clientSecret: paymentIntent.client_secret };
    }

    /**
     * 查询stripe订单
     * @param {Strin} id 订单id 
     * @returns paymentIntentStatus 订单状态
     */

    async retrievePaymentIntent(id) {
        let paymentIntent;
        await stripe.paymentIntents.retrieve(
            id
        ).then(result => {
            //console.log(result);
            paymentIntent = result;
            console.log(paymentIntent);
        });
        return { paymentIntentStatus: paymentIntent.status };
    }
}

module.exports = paymentIntentConnector;
