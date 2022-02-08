'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'comment';
const MODEL_NAME = 'Comment';

module.exports = {
  Query: {
    latestComment(root, {
      courseId,
      option
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].latestComment(courseId, option);
      //var temp =  ResolverHelper.fetchById("", ctx, CONNECTOR_NAME, MODEL_NAME);
      // return temp
    },
  },
  Mutation: {
    commentAdd(root, {
      commentInput
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].commentAdd(commentInput);
    },
    commentDelete(root, {
      id
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].commentDelete(id);
    },

  }
};
