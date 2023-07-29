const UserService = require('../../service/user');

module.exports = {
    Mutation: {
        passwordLogin: async (_, { input }, ctx) => {
            const passwordLoginService = new UserService(ctx);
            return passwordLoginService.passwordLogin(input);
          },   
    }
}