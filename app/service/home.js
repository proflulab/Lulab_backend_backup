'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async index() {
    return{ok:1}
  }
}

module.exports = HomeService;
