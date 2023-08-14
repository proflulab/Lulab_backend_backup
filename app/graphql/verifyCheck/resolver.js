// resolver.js

const { verifyCode } = require("./connector"); // 引入connector.js中的函数

const resolvers = {
    Mutation: {
        verifyCode: async (_, { mobile, code, area }) => {
            // 调用connector.js中的verifyCheck函数来模拟验证
            return await verifyCode({ mobile, code, area });
        },
    },
};

module.exports = resolvers;
// module.exports = {
    // Mutation: {
        // verifyCheck(root, {email, code}, ctx) {
        //     // 调用connector.js中的verifyCheck函数来模拟验证
        //     return ctx.connector.verifyCheck.verifyCheck({email, code});
        // },
    // },
// };

