exports.mongoose = {
    url: process.env.MONGOOSE_URL, // 端口号27021数据库名VietNamVisa
    options: {
        auth: { authSource: "admin" },
        user: "root",
        pass: process.env.MONGOOSE_PASS
    }
}

//url of eggjs app
exports.baseUrl = 'mongodb://127.0.0.1:7001';