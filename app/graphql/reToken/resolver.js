// resolver.js

// Import the reToken function from connector.js
const { reToken } = require("./connector");

const resolvers = {
    Query: {
        // Resolver function for the ReToken query
        reToken: async (_, { token }) => {
            // Call the reToken function with the provided token
            const response = await reToken(token);

            // Return the response
            return {
                token: response.token,
                refresh_token: response.refresh_token,
            };
        },
    },
};

module.exports = resolvers;
