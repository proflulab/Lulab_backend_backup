const SendsmsService = require('../../service/sendsms');
const UserService = require('../../service/user');

module.exports = {
    Mutation: {
        passwordLogin(_, {mobile, area, password}, ctx) {
            const passwordLoginService = new UserService(ctx);
            return passwordLoginService.passwordLogin(mobile, area, password);
        },
        // passwordLogin(root, { mobile, area, password }, ctx) {
        //     return ctx.connector.passwordLogin.passwordLogin(mobile, area, password);
            // const passwordLoginService = new UserService(ctx);
            // return passwordLoginService.passwordLogin(input);
        // },   
        sendResetPasswordCode: async (_, { code }, ctx) => {
            const SendResetPasswordCode = new SendsmsService(ctx);
            return SendResetPasswordCode.sendResetPasswordCode(code);
        },
        // sendResetPasswordCode(root, { code }, ctx){
        //     return ctx.connector.passwordLogin.sendResetPasswordCode(code)
            // const SendResetPasswordCode = new UserService(ctx);
            // return SendResetPasswordCode.sendResetPasswordCode(code);
        // },
        verifyResetPasswordCode: async (_, { code }, ctx) => {
            const VerifyResetPasswordCode = new SendsmsService(ctx);
            return VerifyResetPasswordCode.verifyResetPasswordCode(code);
        },
        // verifyResetPasswordCode: async (_, { code }, ctx) => {
        //     return ctx.connector.passwordLogin.verifyResetPasswordCode(code);
            // const VerifyResetPasswordCode = new UserService(ctx);
            // return VerifyResetPasswordCode.verifyResetPasswordCode(code);
        // },
        resetPassword: async (_, { newPassword }, ctx) => {
            const resetPasswordService = new UserService(ctx);
            return resetPasswordService.resetPassword(newPassword);
        },
        // resetPassword(_, { newPassword }, ctx) {
        //     return ctx.connector.passwordLogin.resetPassword(newPassword);
            // const resetPasswordService = new UserService(ctx);
            // return resetPasswordService.resetPassword(newPassword);
        // },
    }
}