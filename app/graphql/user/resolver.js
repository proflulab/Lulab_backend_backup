'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'user';
const MODEL_NAME = 'User';

const GeekParkSpider = require("../../spider/geekParkSpider")

module.exports = {  
    
    Query: {
        async userAdmin(root, {
            id
        }, ctx) {
            return await ResolverHelper.fetchById(id, ctx, CONNECTOR_NAME, MODEL_NAME);
        },
        userLogin(root, {
            userInput
        }, ctx) {
            return ctx.connector[CONNECTOR_NAME].fetchByName(userInput);
        },
        usersAdmin(root, {
            option,
            condition
        }, ctx) {

            return ResolverHelper.fetchByIds(option, condition, ctx, CONNECTOR_NAME, MODEL_NAME);
        },
        latestClassificationUser(root, {
            category,
            option
        }, ctx) {

            return ctx.connector[CONNECTOR_NAME].latestClassificationUser(category , option);
        }

    },
    Mutation: {
        userUpdate(root, {
            userInput
        }, ctx) {
            return ctx.connector[CONNECTOR_NAME].userUpdate(userInput);
        },
        userRigister(root, {
            userInput
        }, ctx) {
            return ctx.connector[CONNECTOR_NAME].userRigister(userInput);
        },
      
    }
};
