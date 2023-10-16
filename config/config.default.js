'use strict'

module.exports = appInfo => {
  const config = {

    graphql: {
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

    security: {
      csrf: {
        enable: false,
      }
    },
    jwt: {
      secret: "123456"
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    },
    // proxyworker: {
    //   port: 10086
    // },
    validate: {
      // convert: false,
      // validateRoot: false,
    },
    middleware: ['graphql', 'auth']
  }

   config.bcrypt = {
      saltRounds: 10 // default 10
    },
    // config.redis = {
    //   client: {
    //     port: 6379,          // Redis port
    //     host: '127.0.0.1',   // Redis host
    //     password: '',
    //     db: 0,
    //   },
    // },
    // config.twilio = {
    //   accountSid: '',
    //   authToken: '',
    // }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546846389359_709'

  // add your config here
  config.mongoose = {
    //本地环境
    client: {
      url: 'mongodb://localhost:27017/test_mongodb',
      options: {
        useUnifiedTopology: true
      },
    }
    //服务器环境
    /*client: {
      url: 'mongodb://127.0.0.1:27017/admin',
      options: {
        user: 'opsAdmin',
        pass: 'newpassword',
        useUnifiedTopology: true
      },
    }*/

  }
  return config
}
