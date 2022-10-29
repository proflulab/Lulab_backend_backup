'use strict';

module.exports = {
  Query: {
    user(root, { }, ctx) {
      return ctx.connector.user.fetchAll();
    },
    login(root, { mobile, password }, ctx) {
      return ctx.connector.user.login(mobile, password);
    },
    logOut(root, { }, ctx) {
      return ctx.connector.user.logOut();
    },
  },
  Mutation: {
    adduser(root, {
      username
    }, ctx) {
      return ctx.connector.user.add(username);
    },
  }
}
