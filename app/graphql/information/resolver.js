'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'information';
const MODEL_NAME = 'Information';

module.exports = {
  Query: {
    latestInformation(root, {
      option
    }, ctx) {
      var temp =  ctx.connector[CONNECTOR_NAME].fetchLatestInformations("", ctx, CONNECTOR_NAME, MODEL_NAME);
      return temp
    },

  },

};
