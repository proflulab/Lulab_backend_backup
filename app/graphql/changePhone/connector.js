'use strict';

const DataLoader = require('dataloader');

class LaunchConnector {
    constructor(ctx) {
        this.ctx = ctx;
        this.loader = new DataLoader(
            ids => this.fetch(ids)
        );
    }
 /**
     * 修改手机号
     * @param {String} mobile 新手机号
     * @param {*} area 地区
     * @param {*} code 验证码
     * @returns 
     */
 async mobileChange(mobile, area, code) {
    const { ctx } = this;
    const token = ctx.request.header.authorization;
    const secret = await ctx.service.jwt.getUserIdFromToken(token.split(" ")[1]);
    const getcode = await ctx.service.sms.verifyCheck(mobile, code, area);
    if (getcode) {
        const account = '' + area + '#' + mobile;
        return await this.ctx.service.user.mobileChange(secret.uid, account)
    }
    return {
        "status": "yes",
        "msg": "手机号更改成功",
        "mobile": "+86 12345678910"
    };
}

// 定义请求函数
// async function changePhone(mobile, area, code) {
//     return {
//         "status": "yes",
//         "msg": "手机号更改成功",
//         "mobile": "+86 12345678910"
//     };
// }

// module.exports = {
//     changePhone
// };



// try {
//     const response = await axios.post('mongodb://root:lulab1005@144.24.84.85:27017/lulab_backend', {
//         query: `
//     mutation MobileChange($mobile: String!, $area: Int!, $code: String!) {
//       mobileChange(mobile: $mobile, area: $area, code: $code) {
//         status
//         msg
//         mobile
//       }
//     }
//   `,
//         variables: {
//             mobile,
//             area,
//             code
//         }
//     });
//
//     return response.data.data.mobileChange;
// } catch (error) {
//     console.error('请求失败:', error);
//     return null;
// }
}

module.exports = LaunchConnector;