'use strict';

module.exports = {
    Query: {
        createRefunds(root, { id }, ctx) {
            return ctx.connector.refunds.createRefunds(id);
        },
    },
};
