'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);


  // 解析XML的中间件
  const xmlParseMiddleware = app.middleware.xmlParse();

  // 调用支付_web
  router.get('/aliPay', controller.default.aliPay.pay);
  // 支付回调
  router.get('/aliPay/aliPayReturn', controller.default.aliPay.aliPayReturn);
  // 支付通知(关闭CSRF验证)
  router.post('/aliPay/aliPayNotify', xmlParseMiddleware, controller.default.aliPay.aliPayNotify);
};
