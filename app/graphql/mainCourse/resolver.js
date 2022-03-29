'use strict';

const ResolverHelper = require("../common/resolverHelper");

const CONNECTOR_NAME = 'mainCourse';
const MODEL_NAME = 'MainCourse';

module.exports = {
  Query: {
    latestMainCourse(root, {
      option
    }, ctx) {
      
      return ctx.connector[CONNECTOR_NAME].latestMainCourse(option);
    },
    detailMainCourse(root, {
      courseId
    }, ctx) {
      
      return ctx.connector[CONNECTOR_NAME].detailMainCourse(courseId);
    },
    latestDirectCourse(root, {
      mode,
      authorId,
      option
    }, ctx) {

      return ctx.connector[CONNECTOR_NAME].latestDirectCourse(mode, authorId, option);
    },
    
  }
};
