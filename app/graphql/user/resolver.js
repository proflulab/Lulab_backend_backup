module.exports = {
    Query: {
        userInfo(root, { }, ctx) {
            return ctx.connector.user.userInfo();
        },
        logOut(root, { }, ctx) {
            return ctx.connector.user.logOut();
        },
        accountCancellation(root ,{mobile, area}, ctx) {
            return ctx.connector.user.accountCancellation(mobile, area);
        }
    },

    Mutation: {
        createAccount(root, {mobile , area ,password, email}, ctx) {
            return ctx.connector.passwordLogin.createAccount(mobile, area, password, email);
        },
        passwordLogin(root, {area ,mobile ,password}, ctx) {
            return ctx.connector.user.passwordLogin(area ,mobile ,password)
        },
        sendResetPasswordCode(root, { mobile, area }, ctx) {
            return ctx.connector.user.sendResetPasswordCode(mobile, area);
        },
        verifyResetPasswordCode(root, {mobile, area ,code}, ctx) {
            return ctx.connector.user.verifyResetPasswordCode(mobile ,area ,code);
        },
        resetPassword(root, {mobile, area, password}, ctx) {
            return ctx.connector.user.resetPassword(mobile, area, password);
        },
        changeUserInfo(root, { name, sex, dsc, email }, ctx) {
            return ctx.connector.user.changeUserInfo(name, sex, dsc, email)
        },
        
    }
}