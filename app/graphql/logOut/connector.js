// connector.js

//const axios = require('axios');

async function logOut() {
    // const users = await this.ctx.model.logOut.find({})
    // //try {
    //     // const response = await axios.get('mongodb://root:lulab1005@144.24.84.85:27017/lulab_backend');
    //     // // 根据返回的结果确定是否成功注销
    //     // if (response.data.success) {
    // return Object.assign({}, {
    //     pageNum: 1,
    //     pageSize: 10,
    //     list: users
    // })
    return {
        status: 'yes',
        msg: '注销成功'
    };
    //     } else {
    //         return {
    //             status: 'no',
    //             msg: '注销失败'
    //         };
    //     }
    // } catch (error) {
    //     return {
    //         status: 'no',
    //         msg: '请求失败'
    //     };
    // }
}

module.exports = {
    logOut,
};
