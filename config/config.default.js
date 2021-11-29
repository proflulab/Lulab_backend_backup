'use strict'

module.exports = appInfo => {
  const config = {

    security: {
      csrf: {
        ignore: () => true
      }
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    },
    proxyworker: {
      port: 10086
    },
    middleware: ['graphql']
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546846389359_709'

  // add your config here
  config.mongoose = {
    //本地环境
   /* client: {
      url: 'mongodb://127.0.0.1:27017/test',
      options: {
        useNewUrlParser: true,
      },
    }*/
    //服务器环境
    client: {
      url: 'mongodb://127.0.0.1:27017/admin',
      options: {
        user: 'opsAdmin',
        pass: 'O3$ty2@a]O8$pGnw>',
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      },
    }

  }
  return config
}
