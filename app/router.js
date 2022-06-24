'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  //const { router, controller } = app; middleware.jwtVerify(app.config.jwt),
  //router.get('/', controller.home.index);
  const { router, controller, middleware } = app;
  router.get('/', middleware.jwtVerify(app.config.jwt), controller.home.index);
  router.post('/loginByMobilePhone',controller.home.loginByMobilePhone);
  router.post('/updatePwd',controller.home.updatePwd);
  router.post('/verifyLogin',controller.home.verifyLogin);
  router.post('/sendMobileCode',controller.home.sendMobileCode);
  router.post('/verifyMobileCode',controller.home.verifyMobileCode);
  router.post('/loginByAccount', controller.home.loginByAccount);
  router.post('/rigisterAccount', controller.home.rigisterAccount);



};
