//  'use strict';

// const ResolverHelper = require("../common/resolverHelper");

// const CONNECTOR_NAME = 'growth';
// const MODEL_NAME = 'Growth';

// module.exports = {
//   Query: {
//     latestUserGrowth(root, {
//       userId,
//       option
//     }, ctx) {
//       return ctx.connector[CONNECTOR_NAME].latestUserGrowth(userId, option);
//       //var temp =  ResolverHelper.fetchById("", ctx, CONNECTOR_NAME, MODEL_NAME);
//       // return temp
//     },
//   },

//   Mutation: {
//     growthAdd(root, {
//       mobileLogInput
//     }, ctx) {
//       return ctx.connector[CONNECTOR_NAME].growthAdd(mobileLogInput);
//     },
//     growthDelete(root, {
//       id
//     }, ctx) {
//       return ctx.connector[CONNECTOR_NAME].growthDelete(id);
//     },

//   }
// };
