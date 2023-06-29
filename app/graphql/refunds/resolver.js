'use strict';

module.exports = {
    Mutation: {
        createRefunds(root, { id }, ctx) {
            return ctx.connector.refunds.createRefunds(id);
        },
    },
};
