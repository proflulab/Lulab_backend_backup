'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'manager';
const MODEL_NAME = 'Manager';

module.exports = {
  Query: {
    queryManager(root, {
      option
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].queryManager(option);
      //var temp =  ResolverHelper.fetchById("", ctx, CONNECTOR_NAME, MODEL_NAME);
      // return temp
    },
  }
};
