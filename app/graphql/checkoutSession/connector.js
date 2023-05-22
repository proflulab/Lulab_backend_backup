'use strict';

const DataLoader = require('dataloader');
const { cors } = require('../../../config/plugin');
const ObjectId = require('mongodb').ObjectID;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY, {
    apiVersion: '2022-08-01',
});

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

class checkoutSessionConnector {
    constructor(ctx) {
        this.ctx = ctx;
    }

    /**
     * 创建stripe订单
     * @returns sessionid
     */

    async createCheckoutSession() {
        const { ctx } = this;
        const token = ctx.request.header.authorization;
        if (!token) {
            return { link: "" }
        }
        const secret = await ctx.service.jwt.getUserIdFromToken(token.split(" ")[1]);
        // if (await ctx.model.User.find({ mobile: '86#15910203613' }) == false) {
        //     await ctx.model.User.create({
        //         username: 'x',
        //         password: 'xxxxxxxx',
        //         mobile: '86#15910203613'
        //     })
        // }
        const user = await ctx.model.User.findOne({ _id: secret.uid });
        // const user = await ctx.model.User.findOne({ mobile: '86#15910203613' });

        const mobile = '+' + user.mobile.split("#")[0] + user.mobile.split("#")[1];
        const customers = await stripe.customers.search({
            query: 'phone:\'' + mobile + '\'',
        });
        let customer;
        if (customers.data == false) {
            customer = await stripe.customers.create({
                description: '陆向谦实验室会员',
                phone: mobile,
            });
            console.log(customer);
            const user = await ctx.model.User.updateOne(
                // { mobile: '86#15910203613' },
                { mobile: user.mobile },
                { $set: { cusId: customer.id } }
            );
            console.log(customer.id);
            console.log('create new customer');
        }
        else {
            customer = customers.data[0];
            console.log('use old customer');
        }
        console.log(customer);
        let session;
        session = await stripe.checkout.sessions.create({
            customer: customer.id,
            phone_number_collection: {
                enabled: true,
            },
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Stubborn Attachments',
                            images: ['https://i.imgur.com/EHyR2nP.png'],
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            payment_intent_data: {
                description: '陆向谦实验室会员'
            },
            success_url: `https://checkout.stripe.dev/success`,
            cancel_url: `https://checkout.stripe.dev/cancel`,
        });
        console.log(session);
        return ({ id: session.id });
    }
}

module.exports = checkoutSessionConnector;
