
'use strict';

const Service = require('egg').Service;


class GoodService extends Service {

  // 获取商品信息
  async goodInfo(number) {
    const corr = await this.ctx.model.Good.findOne({ goods_number: number }, { title: 1, price: 1, _id: 0 });
    console.log(corr);
    return corr;
  }


}

module.exports = GoodService;

