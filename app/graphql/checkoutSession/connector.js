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
     * 创建stripe checkoutSession
     * @returns id Sessionid
     */

    async createCheckoutSession() {
        const { ctx } = this;
        const token = ctx.request.header.authorization;
        let customers;
        let session = {
            id: '未接收到sessionId'
        };
        let status = 100, msg = '成功创建stripe checkout session';
        try {
            const secret = await ctx.service.jwt.getUserIdFromToken(token.split(" ")[1]);
            let user = await ctx.model.User.findOne({ _id: secret.uid });
            console.log(user);
            console.log(secret);
            //const mobile = '+' + user.mobile.split("#")[0] + user.mobile.split("#")[1];//这里的手机号是用于填写stripe.customers.create中的phone选项
            let customer;
            if (user.cusId === undefined) {
                customer = await stripe.customers.create({
                    description: '陆向谦实验室会员',
                    //phone: mobile,
                    /*取消注释这里会上传用户手机的信息到stripe，在使用stripe checkout支付的时候会自动填写
                    在支付表格的手机号处，用户在提交前可以修改手机号，无论如何修改不改变获得vip的对象。以后
                    可以根据需要取消注释*/
                    //email: user.email,
                    /*如果以后有开发者在用户user的表中的mongodb表中加入了email属性，且填写了邮箱信息，
                        那么取消注释这里会上传用户邮箱的信息，在使用stripe checkout支付的时候会自动填写在
                        支付表格的邮箱处，用户在提交支付表格前无法修改。以后可以根据需要取消注释。
                      如果没有有开发者在用户user的表中的mongodb表中加入了email属性，或者未填写邮箱信息，
                        那么禁止取消注释
                    */
                });
                console.log(customer);
                await ctx.model.User.updateOne(
                    { _id: secret.uid },
                    { $set: { cusId: customer.id } }
                );
                user = await ctx.model.User.findOne({ _id: secret.uid });
                console.log(user.cusId);
                console.log('create new customer');
            }
            else {
                console.log('use old customer');
            }
            console.log(user.cusId);
            session = await stripe.checkout.sessions.create({
                customer: user.cusId,
                // phone_number_collection: {
                //     enabled: true,
                // },//可根据需要取消注释，此处注释和上面与手机相关的两处注释同时取消即可使用
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
        }
        catch (ex) {
            status = ex.code;
            msg = ex.message;
        }
        return ({ status, msg, id: session.id });
    }
}

module.exports = checkoutSessionConnector;
