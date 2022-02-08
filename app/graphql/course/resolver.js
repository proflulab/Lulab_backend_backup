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
      dirId,
      courseId
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].detailCourse(dirId, courseId);
      //var temp =  ResolverHelper.fetchById("", ctx, CONNECTOR_NAME, MODEL_NAME);
      // return temp
    },
  }
};
