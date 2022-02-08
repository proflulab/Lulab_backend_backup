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
    
  }
};
