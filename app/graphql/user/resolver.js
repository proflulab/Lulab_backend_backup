'use strict';

module.exports = {
    Query: {
        user(root, { }, ctx) {
            return ctx.connector.user.fetchAll();
        },
        loginPassword(root, { mobile, password }, ctx) {
            return ctx.connector.user.login(mobile, password);
        },
        loginCaptcha(root, { mobile, code, area }, ctx) {
            return ctx.connector.user.loginCaptcha(mobile, code, area);
        },
        loginOne_click(root, { mobile, accessCode, outId }, ctx) {
            return ctx.connector.user.login(mobile, accessCode, outId);
        },
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
        passwordChange(root, { mobile, area, password, code }, ctx) {
            return ctx.connector.user.passwordChange(mobile, area, password, code);
        },
    },
};
