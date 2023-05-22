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
        const { ctx } = this;
        const user = await ctx.model.User.updateOne({ mobile: '86#15910203613' }, { $unset: { vipExpTime: 1 } });
        // console.log(user);
        // console.log(user.vipExpTime.getTime())
        // let paymentIntent;
        // await stripe.paymentIntents.retrieve(
        //     id
        // ).then(result => {
        //     //console.log(result);
        //     paymentIntent = result;
        //     console.log(paymentIntent);
        // });
        return { paymentIntentStatus: 'test' };
    }

    /**
     * 查询stripe订单
     * @param {Strin} id 订单id 
     * @returns paymentIntentStatus 订单状态
     */

    async searchPaymentIntent() {
        const { ctx } = this;
        const token = ctx.request.header.authorization;
        if (!token) {
            return { link: "" }
        }
        const secret = await ctx.service.jwt.getUserIdFromToken(token.split(" ")[1]);
        const user = await ctx.model.User.findOne({ _id: secret.uid });

        // const user = await ctx.model.User.findOne({ mobile: '86#15910203613' });
        console.log(user);
        if (user.cusId === undefined) {
            return [];
        }
        console.log(user.cusId);
        console.log(user);
        const paymentIntents = await stripe.paymentIntents.search({
            query: 'customer: \'' + user.cusId + '\'',
        });
        console.log(paymentIntents);
        let i;
        for (i = 0; i < paymentIntents.data.length; i++) {
            delete paymentIntents.data[i].object;
            delete paymentIntents.data[i].amount_capturable;
            delete paymentIntents.data[i].amount_details;
            delete paymentIntents.data[i].application;
            delete paymentIntents.data[i].application_fee_amount;
            delete paymentIntents.data[i].automatic_payment_methods;
            delete paymentIntents.data[i].canceled_at;
            delete paymentIntents.data[i].cancellation_reason;
            delete paymentIntents.data[i].capture_method;
            delete paymentIntents.data[i].client_secret;
            delete paymentIntents.data[i].confirmation_method;
            delete paymentIntents.data[i].created;
            delete paymentIntents.data[i].application;
            delete paymentIntents.data[i].invoice;
            delete paymentIntents.data[i].last_payment_error;
            delete paymentIntents.data[i].metadata;
            delete paymentIntents.data[i].next_action;
            delete paymentIntents.data[i].on_behalf_of;
            delete paymentIntents.data[i].payment_method_options;
            delete paymentIntents.data[i].payment_method_types;
            delete paymentIntents.data[i].processing;
            delete paymentIntents.data[i].review;
            delete paymentIntents.data[i].setup_future_usage;
            delete paymentIntents.data[i].shipping;
            delete paymentIntents.data[i].source;
            delete paymentIntents.data[i].statement_descriptor;
            delete paymentIntents.data[i].statement_descriptor_suffix;
            delete paymentIntents.data[i].transfer_data;
            delete paymentIntents.data[i].transfer_group;


        }
        console.log(paymentIntents.data);
        console.log(typeof paymentIntents.data);
        const x = paymentIntents.data[0];
        return paymentIntents.data;
    }
}

module.exports = paymentIntentConnector;
