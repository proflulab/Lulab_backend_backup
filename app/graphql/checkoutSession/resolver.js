'use strict';

module.exports = {
    Mutation: {
        createCheckoutSession(root, { }, ctx) {
            return ctx.connector.checkoutSession.createCheckoutSession();
        },
    },
};
