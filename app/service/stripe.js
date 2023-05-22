'use strict';

const Service = require('egg').Service;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);


class WebhookService extends Service {

    // 异步通知
    async webhook(event) {
        // 实例化支付宝支付
        const { ctx } = this;
        console.log("receive webhook");
        let paymentIntent, customerid, customer, user, date, now, expTime, vipValidTime;
        vipValidTime = 1000 * 60 * 60 * 24 * 365 * 2;
        switch (event.type) {
            case 'payment_intent.succeeded':
                console.log(event);
                paymentIntent = event.data.object;
                customerid = paymentIntent.customer;
                now = Date.now();
                user = await ctx.model.User.findOne(
                    { cusId: customerid }
                );
                console.log(user);
                console.log(user.role);
                console.log(user.vipExpTime);
                await ctx.model.User.updateOne(
                    { cusId: customerid },
                    { $set: { role: 'vip' } }
                );
                if (user.vipExpTime === undefined || user.vipExpTime.getTime() < now) {
                    console.log('会员过期时间')
                    console.log(user.vipExpTime)
                    console.log('现在时间')
                    console.log(new Date(now))
                    await ctx.model.User.updateOne(
                        { cusId: customerid },
                        { $set: { vipExpTime: new Date(now + vipValidTime) } }
                    );
                }
                else if (user.vipExpTime.getTime() >= now) {
                    console.log('会员过期时间')
                    console.log(user.vipExpTime)
                    console.log('现在时间')
                    console.log(new Date(now))
                    await ctx.model.User.updateOne(
                        { cusId: customerid },
                        { $set: { vipExpTime: new Date(user.vipExpTime.getTime() + vipValidTime) } }
                    );
                }
                user = await ctx.model.User.findOne(
                    { cusId: customerid }
                );
                console.log(user.role);
                console.log(user.vipExpTime);
                console.log('PaymentIntent was successful!');
                break;
            case 'payment_method.attached':
                const paymentMethod = event.data.object;
                console.log('PaymentMethod was attached to a Customer!');
                break;
            // ... handle other event types
            case 'payment_intent.created':
                //const paymentMethod = event.data.object;
                console.log('PaymentMethod was precreated!');
                break;
            case 'charge.refunded':
                console.log(event);
                paymentIntent = event.data.object;
                customerid = paymentIntent.customer;
                now = Date.now();
                user = await ctx.model.User.findOne(
                    { cusId: customerid }
                );
                console.log(user.role);
                console.log(user.vipExpTime);
                if (user.vipExpTime.getTime() - vipValidTime < now) {
                    console.log('会员过期时间')
                    console.log(user.vipExpTime)
                    console.log('现在时间')
                    console.log(new Date(now))
                    await ctx.model.User.updateOne(
                        { cusId: customerid },
                        { $set: { role: 'user', vipExpTime: new Date(now) } }
                    );
                }
                else if (user.vipExpTime.getTime() - vipValidTime >= now) {
                    console.log('会员过期时间')
                    console.log(user.vipExpTime)
                    console.log('现在时间')
                    console.log(new Date(now))
                    await ctx.model.User.updateOne(
                        { cusId: customerid },
                        { $set: { vipExpTime: new Date(user.vipExpTime.getTime() - vipValidTime) } }
                    );
                }
                user = await ctx.model.User.findOne(
                    { cusId: customerid }
                );
                console.log(user.role);
                console.log(user.vipExpTime);
                console.log('PaymentMethod was precreated!');
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    }


}

module.exports = WebhookService;
