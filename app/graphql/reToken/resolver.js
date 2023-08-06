// resolver.js

// Import the reToken function from connector.js
const { reToken } = require("./connector");

const resolvers = {
    Query: {
        // Resolver function for the ReToken query
        reToken: async (_, { ctx }) => {
            // Call the reToken function with the provided token
            return await reToken(ctx)
            // Return the response
        },
    },
};

module.exports = resolvers;
