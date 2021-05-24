'use strict';

module.exports = (app) => {
  app.get('/', 'home.index');
  app.resources('users', '/api/users', app.controller.user);
  app.post('/emailCode', app.controller.user.emailCode);
  app.post('/emailRegister', app.controller.user.emailRegister);
  app.post('/setPassword', app.controller.user.setPassword);
};
