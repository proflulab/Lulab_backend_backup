'use strict';

const DataLoader = require('dataloader');
const { cors } = require('../../../config/plugin');
const ObjectId = require('mongodb').ObjectID;
const Helper = require('../../extend/helper.js');
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
     * @param {String} userId 用户id 
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
     * @param {String} id 订单id 
     * @returns paymentIntentStatus 订单状态
     */

    async retrievePaymentIntent(id) {
        const { ctx } = this;
        try {
            let paymentIntent;
            await stripe.paymentIntents.retrieve(
                id
            ).then(result => {
                paymentIntent = result;
                console.log(paymentIntent);
            });
        }
        catch (ex) {
            return {
                status: ex.code,
                msg: ex.message,
            };
        }
        return { status: 100, msg: '成功创建退款', paymentIntentStatus: paymentIntent.status };
    }

    /**
     * 查询某位用户所欲stripe订单
     * @returns paymentIntentStatus 订单状态
     */

    async searchPaymentIntent() {
        const { ctx } = this;
        const token = ctx.request.header.authorization;
        if (!token) {
            return { link: "" }
        }
        try {
            const secret = await ctx.service.jwt.getUserIdFromToken(token.split(" ")[1]);
            const user = await ctx.model.User.findOne({ _id: secret.uid });

            //const user = await ctx.model.User.findOne({ mobile: '86#15910203613' });
            console.log(user);
            if (user.cusId === undefined) {
                return { status: 200, msg: '该用户还未创建过订单' };
            }
            console.log(user.cusId);
            console.log(user);
            const paymentIntents = await stripe.paymentIntents.search({
                query: 'customer: \'' + user.cusId + '\'',
            });//搜索所有与该用户相关的订单
            console.log(paymentIntents.data);
            let i, refunds;
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
                refunds = await stripe.refunds.list({
                    payment_intent: paymentIntents.data[i].id,
                    limit: 3,
                });
                paymentIntents.data[i].refunds = refunds.data;
                console.log(paymentIntents.data[i].refunds);
            }
            console.log(paymentIntents.data);
            console.log(typeof paymentIntents.data);
            const x = paymentIntents.data[0];
            return { status: 100, status: '已搜索到全部该用户订单', role: user.role, vipExpTime: user.vipExpTime, now: new Date(), paymentIntentInfo: paymentIntents.data };
        }
        catch (ex) {
            return {
                status: ex.code,
                msg: ex.message,
            };
        }
    }
}

module.exports = paymentIntentConnector;
