const { getOrderDetail } = require('./connector');

const resolvers = {
    Query: {
        orderDrtail: (_, { orderID }) => {
            return getOrderDetail(orderID);
        }
    },
};

module.exports = resolvers;
