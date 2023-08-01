// resolver.js
// This file contains the resolver functions for the GraphQL schema.

const { getAccountCancellation } = require('./connector');

const resolvers = {
    Query: {
        accountCancellation: (parent, { number }) => {
            return getAccountCancellation(number);
        },
    },
};

module.exports = resolvers;
