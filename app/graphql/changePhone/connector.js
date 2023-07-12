// connector.js

// 导入所需的库和模块
const axios = require('axios');

// 定义请求函数
async function changePhone(mobile, area, code) {
    return {
        "status": "yes",
        "msg": "手机号更改成功",
        "mobile": "+86 12345678910"
    };
}

module.exports = {
    changePhone
};



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
