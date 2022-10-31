'use strict';

module.exports = {
  Query: {
    user(root, { }, ctx) {
      return ctx.connector.user.fetchAll();
    },
    loginPassword(root, { mobile, password }, ctx) {
      return ctx.connector.user.login(mobile, password);
    },
    loginOne_click(root, { mobile, accessCode, outId }, ctx) {
      return ctx.connector.user.login(mobile, accessCode, outId);
    },
    logOut(root, { }, ctx) {
      return ctx.connector.user.logOut();
    },
  },
  Mutation: {
    adduser(root, {
      username,
    }, ctx) {
      return ctx.connector.user.add(username);
    },
  },
};
