const UserService = require('../../service/user');

module.exports = {
    Mutation: {
        passwordLogin(root, { mobile, area, password }, ctx) {
            return ctx.connector.passwordLogin.passwordLogin(mobile, area, password);
            // const passwordLoginService = new UserService(ctx);
            // return passwordLoginService.passwordLogin(input);
        },   
        sendResetPasswordCode(root, { code }, ctx){
            return ctx.connector.passwordLogin.sendResetPasswordCode(code)
            // const SendResetPasswordCode = new UserService(ctx);
            // return SendResetPasswordCode.sendResetPasswordCode(code);
        },
        verifyResetPasswordCode: async (_, { code }, ctx) => {
            return ctx.connector.passwordLogin.verifyResetPasswordCode(code);
            // const VerifyResetPasswordCode = new UserService(ctx);
            // return VerifyResetPasswordCode.verifyResetPasswordCode(code);
        },
        resetPassword(_, { newPassword }, ctx) {
            return ctx.connector.passwordLogin.resetPassword(newPassword);
            // const resetPasswordService = new UserService(ctx);
            // return resetPasswordService.resetPassword(newPassword);
        },
    }
}