/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  //为了解决安全跨站请求伪造 默认是开启的，为了掩饰对应的项目 需要将此属性关掉
  config.security = {
    csrf:{
      enable:false
    }
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1628699176723_1538';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  //配置mongoose
  config.mongoose = {
    url:'mongodb://127.0.0.1:27017/egg-test-1',
    options:{
      useUnifiedTopology: true,
      useCreateIndex:true
    }
  }

  //配置redis
  config.redis = {
    client:{
      port:6379,
      host:'127.0.0.1',
      password:'',
      db:0,
    }
  }

  //配置graphql
  config.graphql = {
    // graphiql: true,
    // // graphQL 路由前的拦截器
    // onPreGraphQL: async function (ctx) {
    // },
    // // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    // onPreGraphiQL: function (ctx) {
    // },
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
