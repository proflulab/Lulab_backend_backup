'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'information';
const MODEL_NAME = 'Information';

module.exports = {
  Query: {
    latestInformation(root, {
      option
    }, ctx) {
      var temp =  ctx.connector[CONNECTOR_NAME].fetchLatestInformations(option, ctx, CONNECTOR_NAME, MODEL_NAME);
      return temp
    },
    latestGeekInformation(root, {
    }, ctx) {
      var temp = ctx.connector[CONNECTOR_NAME].fetchGeekLatestInformation(ctx, CONNECTOR_NAME, MODEL_NAME);
      return temp
    }

  },

};
