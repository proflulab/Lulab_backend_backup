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
      //var temp =  ResolverHelper.fetchById("", ctx, CONNECTOR_NAME, MODEL_NAME);
      // return temp
    },
    detailMainCourse(root, {
      courseId
    }, ctx) {
      var temp =  ctx.connector[CONNECTOR_NAME].detailMainCourse(courseId);
      temp.status = "1";
      return temp
    },
    latestDirectCourse(root, {
      mode,
      authorId,
      option
    }, ctx) {
      return ctx.connector[CONNECTOR_NAME].latestDirectCourse(mode, authorId, option);
      //var temp =  ResolverHelper.fetchById("", ctx, CONNECTOR_NAME, MODEL_NAME);
      // return temp
    },
    
  }
};
