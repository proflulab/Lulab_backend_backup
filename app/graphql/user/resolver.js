'use strict';

// const ResolverHelper = require("../common/resolverHelper");
const UserService = require("../../service/user")


module.exports = {
    
    Query: {
        userInfo(root, { }, ctx) {
          // return ctx.connector.user.userInfo();
            const userService = new UserService(ctx);
            return userService.userInfo(); 
          },

          accountCancellation(root, { mobile }, ctx) {
            return ctx.connector.user.accountCancellation(args);
          //   const accountCancellationService = new UserService(ctx);
          //   return accountCancellationService.accountCancellation(mobile);
          },
    },
    Mutation: {
        createAccount(root, {name, password, email, mobile }, ctx) {
          // console.log(name, password, email)
          // return ctx.body =  {name, password, email }
          // return ctx.connector.user.createAccount(name, password, email);
          const userService = new UserService(ctx);
          return userService.createAccount(name, password, email, mobile);
          },

        changeUserInfo(root, {name, sex, dsc, email }, ctx) {
            return ctx.connector.user.changeUserInfo(name, sex, dsc, email)
          //   const userService = new UserService(ctx);
          //   return userService.changeUserInfo(name, sex, dsc, email);
          },
    }
}
