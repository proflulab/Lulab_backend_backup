// resolver.js
// This file contains the implementation of the GraphQL resolvers.

const { getAboutUsData } = require('./connector');

const resolvers = {
    Query: {
        about_us: () => {
            return getAboutUsData();
        },
    },
};

module.exports = resolvers;
