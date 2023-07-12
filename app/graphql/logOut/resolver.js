// resolver.js

// 导入所需的库和模块
const { logOut } = require('./connector');

// 定义解析器函数，用于处理 logOut 请求
const resolver = {
    Query: {
        logOut: async () => {
            return await logOut();
        }
    }
};

module.exports = resolver;
