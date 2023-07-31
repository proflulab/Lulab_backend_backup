// resolver.js

const { mockRefund } = require('./connector');

const resolvers = {
    Query: {
        refund: (_, { orderid, reason, description }) => {
            // Call the mockRefund function from the connector with the provided arguments
            return mockRefund(orderid, reason, description);
        },
    },
};

module.exports = resolvers;
