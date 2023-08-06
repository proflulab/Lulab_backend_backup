'use strict';

module.exports = {
    Mutation: {
        verifySend(root, { mobile, area }, ctx) {
            return ctx.connector.sms.verifySend(mobile, area);
        },
        verifyCheck(root, { mobile, area, code }, ctx) {
            return ctx.connector.sms.verifyCheck(mobile, area, code);
        }
    },

};
