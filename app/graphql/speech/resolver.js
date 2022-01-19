'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'speech';
const MODEL_NAME = 'Speech';

module.exports = {
  Query: {
    speechGoogle(root, {
      speechRequest
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].speech(speechRequest, ctx, CONNECTOR_NAME, MODEL_NAME);
    },
  }

};
