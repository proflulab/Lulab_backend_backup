
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
    config.keys = appInfo.name + '_1546846389359_709'

    config.middleware = ['graphql']

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
    },
    config.security = {
      csrf: {
        ignore: () => true
      }
    },
    config.jwt = {
      secret: "123456"
    },
    config.cors = {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    },
    // proxyworker: {
    //   port: 10086
    // },
    // bcrypt: {
    //   saltRounds: 10 // default 10
    // },
    config.redis = {
      client: {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: '',
        db: 0,
      },
    },
    // config.twilio = {
    //   accountSid: '',
    //   authToken: '',
    // }

    //  阿里云配置
  //    config.ali = {
  //     accessKeyId: process.env.ALI_ACCESS_KEY_ID,
  //     accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET,
  //     endpoint: 'https://dysmsapi.aliyuncs.com',
  //     apiVersion: '2017-05-25',
  // },

  //   config.sms = {
  //     aliSignName: process.env.ALI_SIGN_NAME,
  //     nationalCode: process.env.ALI_NATIONAL_CODE,
  //     internationalCode: process.env.ALI_INTERNATIONAL_CODE,
  // },
  
  /*
  config.cluster = {
    listen: {
      path: '',
      port: 8002,
      hostname: '0.0.0.0',
    }
  };*/

  // add your config here
  config.mongoose = {
    //本地环境
    client: {
      url: 'mongodb://localhost:27017/test_mongodb',
      options: {
        useNewUrlParser: true,
        // useCreateIndex: false,
        // reconnecttries:false,
        useUnifiedTopology: true
      },
    }
    //服务器环境
    /*client: {
      url: 'mongodb://127.0.0.1:27017/admin',
      options: {
        user: 'opsAdmin',
        pass: 'newpassword',
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      },
    }*/
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
};

return {
    ...config,
    ...userConfig,
};
}