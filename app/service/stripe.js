'use strict';

const Service = require('egg').Service;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);


class WebhookService extends Service {
    /**
         * 处理stripe相关信息通知，修改用户状态为vip或者普通用户
         * @param {Project} event stripe主体信息包
         */
    // 异步通知
    async webhook(event) {
        // 实例化支付宝支付
        const { ctx } = this;
        console.log("receive webhook");
        let paymentIntent, customerid, customer, user, date, now, expTime, vipValidTime;
        vipValidTime = 1000 * 60 * 60 * 24 * 365 * 2;//vip有效时间，目前设定暂时为2年，从收到支付通知的一刻开始计算，需要与/app/graphql/refunds/connector.js下的vipValidTime保持一致，修改此处也要修改那里的vipValidTime
        switch (event.type) {
            case 'payment_intent.succeeded'://支付成功
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
                if (user.vipExpTime === undefined || user.vipExpTime.getTime() < now) {//以前不是会员或者之前的会员已退款或已过期
                    console.log('会员过期时间')
                    console.log(user.vipExpTime)
                    console.log('现在时间')
                    console.log(new Date(now))
                    await ctx.model.User.updateOne(
                        { cusId: customerid },
                        { $set: { vipExpTime: new Date(now + vipValidTime) } }
                    );
                }
                else if (user.vipExpTime.getTime() >= now) {//已经是会员，仍然要充会员
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
            case 'charge.refunded'://退款成功
                console.log(event);
                paymentIntent = event.data.object;
                customerid = paymentIntent.customer;
                now = Date.now();
                user = await ctx.model.User.findOne(
                    { cusId: customerid }
                );
                console.log(user.role);
                console.log(user.vipExpTime);
                if (user.vipExpTime.getTime() - vipValidTime < now) {//退款后没有剩余的会员时间
                    console.log('会员过期时间')
                    console.log(user.vipExpTime)
                    console.log('现在时间')
                    console.log(new Date(now))
                    await ctx.model.User.updateOne(
                        { cusId: customerid },
                        { $set: { role: 'user', vipExpTime: new Date(now) } }
                    );
                }
                else if (user.vipExpTime.getTime() - vipValidTime >= now) {//退款后仍然有剩余的会员时间（因为允许充值多次会员，存在退掉一次会员后，仍然剩余会员时间）
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
