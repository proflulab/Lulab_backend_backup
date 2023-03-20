'use strict';

module.exports = {
    Query: {
        userInfo(root, { }, ctx) {
            return ctx.connector.user.userInfo();
        },
        loginPassword(root, { mobile, area, password }, ctx) {
            return ctx.connector.user.loginPassword(mobile, area, password);
        },
        loginCaptcha(root, { mobile, code, area }, ctx) {
            return ctx.connector.user.loginCaptcha(mobile, code, area);
        },
        // loginOne_click(root, { mobile, accessCode, outId }, ctx) {
        //     return ctx.connector.user.login(mobile, accessCode, outId);
        // },
        logOut(root, { }, ctx) {
            return ctx.connector.user.logOut();
        },
        // userEdit(root, { }, ctx) {
        //   return ctx.connector.user.userEdit();
        // },
    },
    Mutation: {
        // adduser(root, {
        //   username,
        // }, ctx) {
        //   return ctx.connector.user.add(username);
        // },
        changeUserInfo(root, { username, sex, wechat, dsc }, ctx) {
            return ctx.connector.user.changeUserInfo(username, sex, wechat, dsc)
        },
        passwordChange(root, { mobile, area, password, code }, ctx) {
            return ctx.connector.user.passwordChange(mobile, area, password, code);
        },
        mobileChange(root, { mobile, area, code }, ctx) {
            return ctx.connector.user.mobileChange(mobile, area, code);
        }
    },
};
