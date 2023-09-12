// resolver.js

const { verifyCheck } = require("./connector"); // 引入connector.js中的函数

module.exports = {
    Mutation: {
        verifyCheck: async (_, { email, code }) => {
            // 调用connector.js中的verifyCheck函数来模拟验证
            return await verifyCheck({ email, code});
        },
    },
};


// module.exports = {
//     Mutation: {
//         verifyCheck(root, {email, code}, ctx) {
//             // 调用connector.js中的verifyCheck函数来模拟验证
//             return ctx.connector.verifyCheck.verifyCheck({email, code});
//         },
//     },
// };

