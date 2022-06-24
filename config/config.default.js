'use strict'

module.exports = appInfo => {
  const config = {

    security: {
      csrf: {
        ignore: () => true
      }
    },
    cors: {
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
    client: {
      //url: 'mongodb://127.0.0.1:27017/test',
        url: 'mongodb://test:123456@192.168.101.14:27017/test',
      options: {
        useNewUrlParser: true,
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

  config.jwt = {
        secret: "lulablll"//这个是加密秘钥，自行添加
      //  enable:  true
  };

  return config
}
