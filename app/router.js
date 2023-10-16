'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const authMiddleware = app.middleware.auth(); // 导入 Token 验证中间件

  router.post('/protected', authMiddleware, controller.home.getTokenInfo); // 受保护的路由，需要 Token 验证
  router.get('/', controller.home.index);
  router.get('/api/token', controller.home.getTokenInfo);
};
