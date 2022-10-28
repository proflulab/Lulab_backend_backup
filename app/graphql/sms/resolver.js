'use strict';

module.exports = {
  Query: {
    sendcode(root, { mobile }, ctx) {
      return ctx.connector.sms.sendcode(mobile);
    },
    checkcode(root, { mobile, code }, ctx) {
      return ctx.connector.sms.checkcode(mobile, code);
    },
  },

}
