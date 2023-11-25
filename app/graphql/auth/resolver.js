'use strict';

module.exports = {
  Query: {
    reToken(root, { token }, ctx) {
      return ctx.connector.auth.refreshToken(token);
    },
  },
};
