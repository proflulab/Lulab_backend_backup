'use strict';

module.exports = {
  Query: {
    goodInfo(root, { number }, ctx) {
      return ctx.connector.good.goodInfo(number);
    },
    // login(root, { mobile, password }, ctx) {
    //   return ctx.connector.user.login(mobile, password);
    // },
    // logOut(root, { }, ctx) {
    //   return ctx.connector.user.logOut();
    // },
  },
  // Mutation: {
  //   adduser(root, {
  //     username
  //   }, ctx) {
  //     return ctx.connector.user.add(username);
  //   },
  // }
};
