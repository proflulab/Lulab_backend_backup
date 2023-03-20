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
        url: process.env.MONGOOSE_URL, // 端口号27021数据库名VietNamVisa
        options: { useNewUrlParser: true, useUnifiedTopology: true }, // 其他配置警告解除方法
    };


    config.redis = {
        client: {
            port: 6379, // Redis port
            host: '192.168.101.3', // Redis host
            password: '',
            db: 0,
        },
    };


    config.cors = {
        origin: '*', // 跨任何域
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', // 被允许的请求方式
    };

    config.jwt = {
        expire: 7200, // 2小时
        secret: process.env.JWT_SECRET,
        refresh_expire: 259200, // 3天
        refresh_secret: process.env.REFRESH_SECRET,
        ignore: ['/api/registered', '/api/login'], // 哪些请求不需要认证
        // expiresIn: '24h',
    };


    exports.security = {
        csrf: {
            // 当支付宝异步通知当前服务器时忽略csrf验证
            ignore: ctx => {
                // console.log("____________________________________________________");
                // console.log(ctx.request.url);
                if (ctx.request.url === '/aliPay/aliPayNotify' || ctx.request.url === '/graphql' || ctx.request.url === '/graphql?' || ctx.request.url === '/api/registered' || ctx.request.url === '/api/login') {
                    return true;
                }
                return false;
            },
        },
    };

    // 阿里云配置
    config.ali = {
        accessKeyId: process.env.ALI_ACCESS_KEY_ID,
        accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET,
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25',
    };

    // 支付宝支付配置
    exports.aliPayOptions = {
        app_id: '2021000121657681',
        appPrivKeyFile: 'MIIEowIBAAKCAQEAjvt+IIkyyaQMA+gucXL8BBW8rKtcjt8hsQ4ECKSd7ehnqoODnjobSUVPjXvUfEJFy0YnEaNvM6C+AvuVPWZVhgcJ8XJMFv2k/nirLn9+YraU8dsCouklFROVJdV54tunhkK9x5ZVF5ExEabfqMUe3BOT2zbAJS5HBQPNT594S++MsKpaaLc+0YAjMt7WmzflzRWYHO+xP2cDe7LwlWonU8chNy/QsTToO7AKuoOZJdBzQuhiP7kuvKK1ZgByCRKCLA/00wOxzJt0G2d2bYeD8Mtd2NG/iNxHJrNUh6TNRR5Eac/5UpN7t5XjeJHjCDLMj3NbQz6XFVCn3EtA6LO+fwIDAQABAoIBAHgcAZa5SeWjHcjGaQU6T0PrMqRmCwmlnPrLyE2uY1Bv822ErrLjIvrI84vpotSDI3gfxUAG56oZ9KQyzOpYJa3CCfM+TXbeuZRer4YO6Y9oyvPkQ3GwokrzOU4f5xTP6glZ1Wxs96wldm/am3V9qW+8Lm9urbhOCLDIwdaKIpa+L3glL49QJIj8wJTwbRMzXUX0K5elr0EZ1tv+lW4EWtE8tN/wXDGPIJKvQrx6RUp2SJBo3biJdwVGK1gpHiiAtTovrBN4Lh8owPX4/ErkXRMjb9vgBjv/flm1/gdq/YjgoCDwthfUTDsYnNNBF+IgYFEVXnF0uRKSaHIykgE0G8kCgYEA2aZ7wRIjv1qeJCAu+ZX+8340moLBYNHEXP8kLyLS7S/26a3Z5lZPsky6u/Ueni8hrDCU6/dsYq8FZxeopHyJeH9ogMxJtcP1hgDZ6Q+KE7z+A/2NCGpK5f6RUCPl94zdOWGEjKnvsGzIuhyk8uYhxzI+nbry+JsF0E4W1PEFs7UCgYEAqCz5tLOVX2ILZd02EGyH6DTqXgWvOUWd0IArLo3O/c/V3JGjuD8QL5sGfNvsikLgQkM0m7asTVqlhQknC6b/24S0tGavHVOgWqbFb3ojcFNYhwaaWIJTtXAwTaimZ1PsbQQT6DyBYiNxqaCIcLAPRT1pC+aX4K3ms+ohvwOY8eMCgYEAsMIsLxh0P6twUxZwD/JpI4aTYghe1CqHtp7e3AkEE+yoMg8mr5HZF4yI+qyPORg92IF78Eb4lwxc7uSf6TXazylpzXAbTKrgcvut/UDJek46XTNFnlf0i+S6TsNYuDqGT1uLMlGwfy9ZtQweScXsGMINaDuzp4L+rbU9haJYZyECgYAhOom4F4ebCg9AeD3XbupHijUIkMz3Xvb4nGprz18nrSoPY8NagzNahKH6h6WsB9yxmv/JCIXw3sk3iQBq//srz4O45VUSUVSstKjsBtD7v6wNOdPDSzTo85rHrVv7rIxZWeXpDBNwZZpurqZmxZKu1pxr2osFvLaJs+gpCrfsiwKBgB/41GBnFzgCmQKM8f3B/A5nuiPMppkynBlZXteZEc5H1NqRuN0B/Qtghp/D/UTbKAF4rQmist/GyBO4s16vyiT6nmLEMGx/4dlKytge/FCZw9JRa4+/THtT/kXX7Z+RLIlUuNYrs7RZFRl91NVxBHS6yQzmW+Am0RQ0pbyy6pDn',
        alipayPubKeyFile: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqR3/W1QsEQR3RZrvk1AvpUFIhW/kJWdollDFMGXWXwSp1ViAv3N/0ceyuahDneTMF2s3oQHiZRZO2xUj9/AEiGvC0yFsBqvDfn1YiJCO3TXZUwRT3knjs1meX9i2FAk//cwlEkIV9aQK1DM5yOa++eVgtL/YYpYQTv32dhuokx97aqU/GAERuO1DFx+oWMYOONMJxgRplxH8Qe52M06flLbPTe/UZ4MgBLd2zjlnBxURdMVfwhU9z3q8LZGJ78FBzzalfURMVlfvpPpTHSgWBhBpOF3x9w/WaZfXi6rWfymsv73kILwUFbc+IcKgCoTPWtADCF5QK4RLURr51NmHfwIDAQAB',
    };


    // 支付宝支付回调地址
    exports.aliPayBasicParams = {
        // 支付成功返回地址
        return_url: process.env.ALIPAY_RETURN_URL,
        // 支付成功异步通知地址
        notify_url: process.env.ALIPAY_NOTIFY_URL,
    };


    // 七牛云配置
    config.qiniu = {
        AccessKey: process.env.QINIU_ACCESS_KEY, // 七牛云Access_Key
        SecretKey: process.env.QINIU_SECRET_KEY, // 七牛云SecretKey
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
