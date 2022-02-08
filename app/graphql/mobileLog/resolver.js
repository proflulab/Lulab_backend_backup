'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'mobileLog';
const MODEL_NAME = 'MobileLog';

module.exports = {
  Query: {
    latestMobileLog(root, {
      userId,
      option
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].latestMobileLog(userId, option);
      //var temp =  ResolverHelper.fetchById("", ctx, CONNECTOR_NAME, MODEL_NAME);
      // return temp
    },
  },
  
  Mutation: {
    mobileLogAdd(root, {
      mobileLogInput
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].mobileLogAdd(mobileLogInput);
    },
    mobileLogDelete(root, {
      id
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].mobileLogDelete(id);
    },

  }
};
