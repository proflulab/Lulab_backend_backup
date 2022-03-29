'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'training';
const MODEL_NAME = 'Training';

module.exports = {
  Query: {
    latestTraining(root, {
      option
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].latestTraining(option);
      //var temp =  ResolverHelper.fetchById("", ctx, CONNECTOR_NAME, MODEL_NAME);
      // return temp
    },
  }
};