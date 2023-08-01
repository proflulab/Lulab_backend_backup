const UserService = require('../../service/user');

module.exports = {
    Mutation: {
        passwordLogin: async (_, { input }, ctx) => {
            const passwordLoginService = new UserService(ctx);
            return passwordLoginService.passwordLogin(input);
        },   
        sendResetPasswordCode: async (_, { code }, ctx) => {
            const SendResetPasswordCode = new UserService(ctx);
            return SendResetPasswordCode.sendResetPasswordCode(code);
        },
        verifyResetPasswordCode: async (_, { code }, ctx) => {
            const VerifyResetPasswordCode = new UserService(ctx);
            return VerifyResetPasswordCode.verifyResetPasswordCode(code);
        },
        resetPassword: async (_, { newPassword }, ctx) => {
            const resetPasswordService = new UserService(ctx);
            return resetPasswordService.resetPassword(newPassword);
        },
    }
}