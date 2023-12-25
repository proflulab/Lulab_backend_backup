/* eslint valid-jsdoc: "off" */

'use strict';
require('dotenv').config();
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1697535280270_986';

  // add your middleware config here
  config.middleware = [ 'graphql' ];

  config.graphql = {
    router: '/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
  };

    config.security = {
      csrf: {
        enable: false,
      }
    },

    config.jwt = {
      secret: "123456"
    };

    config.bcrypt = {
      saltRounds: 10 // default 10
    }

    config.cors = {
      origin: '*', // 跨任何域
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', // 被允许的请求方式
    };

    config.redis = {
      client: {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: '',
        db: 0,
      },
    }

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/admin',
      options: {},
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
