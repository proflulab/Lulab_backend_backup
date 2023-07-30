const { passwordLogin } = require("./connector");

const resolvers = {
    Mutation: {
        PasswordLogin: async (_, { area, mobile, password }) => {
            // 在这里调用connector中的函数，模拟与后端的通信
            return await passwordLogin(area, mobile, password);
        },
    },
};

module.exports = resolvers;
