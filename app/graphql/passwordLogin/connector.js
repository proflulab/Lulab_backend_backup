
async function passwordLogin(area, mobile, password) {
    // 在实际应用中，这里将会有与后端的通信逻辑
    // 我们假设密码为整数类型，但实际中可能为字符串或其他格式
    // 在这个模拟中，我们简单地返回一些固定的模拟数据
    return {
        success: true,
        message: "Login successful",
        token: "some_token_here",
        reToken: "some_refresh_token_here",
        data: {
            name: "TestUserName",
            imageUrl: "https://img.51miz.com/Element/00/77/26/85/d95632ea_E772685_5dc0faf3.png",
            sex: "test",
            mobile: "1234567890",
            email: "something@example.com",
            description: "balabalabalabalabalabalabalabala",
        },
    };
}

module.exports = { passwordLogin };
