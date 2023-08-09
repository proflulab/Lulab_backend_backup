// resolver.js

// Import the reToken function from connector.js
const { reToken } = require("./connector");

const resolvers = {
    Query: {
        // Resolver function for the ReToken query
        reToken (root, { token }, ctx) {
            // Call the reToken function with the provided token
            return ctx.connector.reToken.reToken(token)
            // Return the response
        },
    },
};

module.exports = resolvers;
