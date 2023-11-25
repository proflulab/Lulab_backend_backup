'use strict';

module.exports = {
    Query: {
        verifySend(root, { mobile, area }, ctx) {
            return ctx.connector.sms.verifySend(mobile, area);
        },
        verifyCheck(root, { mobile, area, code }, ctx) {
            return ctx.connector.sms.verifyCheck(mobile, area, code);
        }
    },
    Mutation: {
        sendEmail(root, {email}, ctx) {
            return ctx.connector.sms.sendEmail(email);
        },
        checkEmail(root, {email, code}, ctx) {
            return ctx.connector.sms.checkEmail(email, code);
        },
        resendCode(root, {email}, ctx) {
            return ctx.connector.sms.resendCode(email);
        }
    }

};
