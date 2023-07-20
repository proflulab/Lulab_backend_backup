'use strict';

module.exports = {
    // Query: {
      
    // },
    Mutation: {
        // adduser(root, {
        //   username,
        // }, ctx) {
        //   return ctx.connector.user.add(username);
        // },
        // changeUserInfo(root, { username, sex, wechat, dsc }, ctx) {
        //     return ctx.connector.user.changeUserInfo(username, sex, wechat, dsc)
        // },
        // passwordChange(root, { mobile, area, password, code }, ctx) {
        //     return ctx.connector.user.passwordChange(mobile, area, password, code);
        // },
        mobileChange(root, { mobile, area, code }, ctx) {
            return ctx.connector.user.mobileChange(mobile, area, code);
        }
    },
};

// const resolver = {
//     Mutation: {
//         mobileChange: async (_, { mobile, area, code }) => {
//             try {
//                 // 调用连接器函数来处理修改手机号的逻辑
//                 const result = await changePhone(mobile, area, code);

//                 if (result) {
//                     return {
//                         status: result.status,
//                         msg: result.msg,
//                         mobile: result.mobile
//                     };
//                 } else {
//                     return {
//                         status: 'no',
//                         msg: '请求失败',
//                         mobile: ''
//                     };
//                 }
//             } catch (error) {
//                 console.error('处理修改手机号逻辑时出错:', error);
//                 return {
//                     status: 'no',
//                     msg: '处理请求时发生错误',
//                     mobile: 'no data'
//                 };
//             }
//         }
//     }
// };

// module.exports = resolver;
