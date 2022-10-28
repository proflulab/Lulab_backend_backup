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

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1666719296467_4527';

  // add your middleware config here
  config.middleware = ['auth', 'graphql'];



  // graphql
  config.graphql = {
    // 默认访问路由
    // http://127.0.0.1:7001/graphql
    router: '/graphql',
    //   是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    // graphQL 路由前的拦截器
    // onPreGraphQL: function* (ctx) {
    // },
    // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    // onPreGraphiQL: function* (ctx) {
    // },
  };


  config.mongoose = {
    url: 'mongodb://shiming:123456@192.168.101.5:27017/egg_lulabbackend_shiming',//端口号27021数据库名VietNamVisa
    options: { useNewUrlParser: true, useUnifiedTopology: true },//其他配置警告解除方法
  }


  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '192.168.101.3',   // Redis host
      password: '',
      db: 0
    }
  };



  config.cors = {
    origin: "*", // 跨任何域
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS", // 被允许的请求方式
  };

  config.jwt = {
    expire: 7200,
    secret: "123456",
    refresh_expire: 259200,
    refresh_secret: 'b2ce49e4a541068c',
    ignore: ['/api/registered', '/api/login'], // 哪些请求不需要认证
    //expiresIn: '24h',
  };



  exports.security = {
    csrf: {
      // 当支付宝异步通知当前服务器时忽略csrf验证
      ignore: ctx => {
        // console.log("____________________________________________________");
        //console.log(ctx.request.url);
        if (ctx.request.url == "/aliPay/aliPayNotify" || ctx.request.url == "/graphql" || ctx.request.url == "/graphql?" || ctx.request.url == "/api/registered" || ctx.request.url == "/api/login") {
          return true;
        }
        return false;
      },
    }
  }

  // 阿里云配置
  config.ali = {
    accessKeyId: 'LTAI5tDykLsugqAXbrHahVdh',
    accessKeySecret: 'fqcBmMY6pNkyeb8sTVZYax2RRMRBzA',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
  };


  // 七牛云配置
  config.qiniu = {
    AccessKey: 'KFqF5HyG8JWMqjam7WpeMBHgO2247c6G1RLdVYFC',// 七牛云Access_Key
    SecretKey: '8tA-YoXCJIeuIahlceuTLfQno9VkkpAZuzwlvmTB',// 七牛云SecretKey
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
