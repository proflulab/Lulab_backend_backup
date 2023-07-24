// module.exports = {
//     Query: {
//         logOut(root, {}, ctx) {
//             return ctx.connector.logOut.logOut();
//         },
//     }
// }
// resolver.js

const { logOut } = require("./connector");

const resolvers = {
    Query: {
        logOut: async () => {
            return logOut();
        },
    },
};

module.exports = resolvers;
