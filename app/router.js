'use strict';

module.exports = (app) => {
  app.get('/', 'home.index');
  app.resources('users', '/api/users', app.controller.user);
  app.post('/emailCode', app.controller.mail.emailCode);
  app.post('/emailRegister', app.controller.mail.emailRegister);
  app.post('/setPassword', app.controller.mail.setPassword);
};
