'use strict';

module.exports = {
    Query: {
        verifySend(root, { mobile, area }, ctx) {
            return ctx.connector.sms.verifySend(mobile, area);
        },
    },

};
