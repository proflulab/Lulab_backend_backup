'use strict';

const ResolverHelper = require("../common/resolverHelper");
const UserService = require("../../service/user")
const CONNECTOR_NAME = 'user';
const MODEL_NAME = 'User';

const GeekParkSpider = require("../../spider/geekParkSpider")

module.exports = {  
    
    Query: {
        userInfo(root, { }, ctx) {
          // return ctx.connector.user.userInfo();
            const userService = new UserService(ctx);
            return userService.userInfo(); 
          },
          accountCancellation(root, { mobile }, ctx) {
            // return ctx.connector.user.accountCancellation(args);
            const accountCancellationService = new UserService(ctx);
            return accountCancellationService.accountCancellation(mobile);
          },
    //     async userAdmin(root, {
    //         id
    //     }, ctx) {
    //         return await ResolverHelper.fetchById(id, ctx, CONNECTOR_NAME, MODEL_NAME);
    //     },
    //     userLogin(root, {
    //         userInput
    //     }, ctx) {
    //         return ctx.connector[CONNECTOR_NAME].fetchByName(userInput);
    //     },
    //     usersAdmin(root, {
    //         option,
    //         condition
    //     }, ctx) {

    //         return ResolverHelper.fetchByIds(option, condition, ctx, CONNECTOR_NAME, MODEL_NAME);
    //     },
    //     latestClassificationUser(root, {
    //         category,
    //         option
    //     }, ctx) {

    //         return ctx.connector[CONNECTOR_NAME].latestClassificationUser(category , option);
    //     }

    },
    Mutation: {
        changeUserInfo(root, {name, sex, dsc, email }, ctx) {
            // return ctx.connector.user.changeUserInfo(name, sex, dsc, email)
            const userService = new UserService(ctx);
            return userService.changeUserInfo(name, sex, dsc, email);
          },
    //     userUpdate(root, {
    //         userInput
    //     }, ctx) {
    //         return ctx.connector[CONNECTOR_NAME].userUpdate(userInput);
    //     },
    //     userRigister(root, {
    //         userInput
    //     }, ctx) {
    //         return ctx.connector[CONNECTOR_NAME].userRigister(userInput);
    //     },
      
    }
}
