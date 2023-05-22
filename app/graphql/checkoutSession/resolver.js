'use strict';

module.exports = {
    Query: {
        createCheckoutSession(root, { }, ctx) {
            return ctx.connector.checkoutSession.createCheckoutSession();
        },
    },
};
