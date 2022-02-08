'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'model';
const MODEL_NAME = 'Model';

module.exports = {
  Query: {
    latestModel(root, {
      option
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].latestModel(option);
      //var temp =  ResolverHelper.fetchById("", ctx, CONNECTOR_NAME, MODEL_NAME);
      // return temp
    },
  }
};
