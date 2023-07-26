// resolver.js

const { verifyCheck } = require("./connector"); // 引入connector.js中的函数

const resolvers = {
    Query: {
        verifyCheck: async (_, { mobile, code, area }) => {
            // 调用connector.js中的verifyCheck函数来模拟验证
            return await verifyCheck({ mobile, code, area });
        },
    },
};

module.exports = resolvers;
