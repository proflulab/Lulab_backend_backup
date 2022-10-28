'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    //await ctx.service.sms.alisms();
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
