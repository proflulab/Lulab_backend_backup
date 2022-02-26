'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'orderRecord';
const MODEL_NAME = 'OrderRecord';

module.exports = {
  Query: {
    latestRecord(root, {
      authorId,
      option
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].latestRecord(authorId, option);
      //var temp =  ResolverHelper.fetchById("", ctx, CONNECTOR_NAME, MODEL_NAME);
      // return temp
    },
  },
  Mutation: {
    recordAdd(root, {
      orderRecordInput
    }, ctx) {
      return  ctx.connector[CONNECTOR_NAME].recordAdd(orderRecordInput);
    }

  }
};
