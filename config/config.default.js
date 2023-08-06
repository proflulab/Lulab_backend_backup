'use strict'

module.exports = appInfo => {
  const config = {
    security: {
      csrf: {
        ignore: () => true
      }
    },
    jwt: {
      secret: "123456"
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    },
    proxyworker: {
      port: 10086
    },
    bcrypt: {
      saltRounds: 10 // default 10
    },
    // redis: {
    //   client: {
    //     port: 6379,          // Redis port
    //     host: '144.24.84.85',   // Redis host
    //     password: '',
    //     db: 0,
    //   },
    // },

  //   //  阿里云配置
  //    ali: {
  //     accessKeyId: process.env.ALI_ACCESS_KEY_ID,
  //     accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET,
  //     endpoint: 'https://dysmsapi.aliyuncs.com',
  //     apiVersion: '2017-05-25',
  // },

  //   sms: {
  //     aliSignName: process.env.ALI_SIGN_NAME,
  //     nationalCode: process.env.ALI_NATIONAL_CODE,
  //     internationalCode: process.env.ALI_INTERNATIONAL_CODE,
  // },
    middleware: ['graphql']
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546846389359_709'
  config.cluster = {
    listen: {
      path: '',
      port: 8000,
      hostname: '127.0.0.1',
    }
  };
  // add your config here
  config.mongoose = {
    //本地环境
    // client: {
    //   url: 'mongodb://localhost:27017/test_mongodb',
    //   options: {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    //   },
    //}
    //服务器环境
    client: {
      url: 'mongodb://127.0.0.1:27017/',
      options: {
        // user: 'opsAdmin',
        // pass: 'newpassword',
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      },
    },

  }
  return config
}


//mongodb://fiona_shen0225:lulab123456.@34.31.185.148:27017
//docker stop mongodb-container;docker rm mongodb-container;docker run -d --name mongodb-container -p 27017:27017 mongo;

