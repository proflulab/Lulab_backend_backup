'use strict';

const Service = require('egg').Service;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);


class WebhookService extends Service {

    // 异步通知
    webhook(event) {
        // 实例化支付宝支付
        console.log("receive webhook");
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
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
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    }


}

module.exports = WebhookService;
