'use strict';

module.exports = {
    Query: {
        createPaymentIntent(root, { items }, ctx) {
            return ctx.connector.paymentIntent.createPaymentIntent(items);
        },
        retrievePaymentIntent(root, { id }, ctx) {
            return ctx.connector.paymentIntent.retrievePaymentIntent(id);
        },
    },
};
