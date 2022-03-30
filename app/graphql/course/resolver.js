'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'course';
const MODEL_NAME = 'Course';

module.exports = {
  Query: {
    latestCourse(root, {
      option
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].latestCourse(option);
      //var temp =  ResolverHelper.fetchById("", ctx, CONNECTOR_NAME, MODEL_NAME);
      // return temp
    },
    detailCourse(root, {
        dirId
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].detailCourse(dirId);
      //var temp =  ResolverHelper.fetchById("", ctx, CONNECTOR_NAME, MODEL_NAME);
      // return temp
    }

  }
};
