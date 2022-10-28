'use strict';

const DataLoader = require('dataloader');

class LaunchConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(
      ids => this.fetch(ids)
    );
  }

  async fetch(ids) {
    // return await this.ctx.model.User.find(null, null, { limit: 4 }, function (err, docs) {
    //   //console.log(docs);
    // });
  }

  async fetchAll() {
    //return await this.ctx.controller.default.aliPay.pay_app();
    let date = (new Date()).getTime();
    // 此处为模拟数据
    let data = {
      body: '实验室课程会员',
      subject: '实验室课程会员',
      out_trade_no: date.toString(),
      total_amount: '0.1',
      timeout_express: '30m',
      // goods_type: '0',
    }
    let res = await this.ctx.service.pay.doPay_app(data);
    console.log("-------------------------------------------------------");
    console.log(res);
    //assert(result.code == 0, result.message)
    var a = { v: res }
    return a;



  }

}

module.exports = LaunchConnector;
