
'use strict';

const Service = require('egg').Service;


class OrderService extends Service {

  // 创建订单
  async orderCreate(data) {

    const order = this.ctx.model.Order(data);

    await order.save();

    // return corr
  }

  // 修改订单状态
  async orderState(orderNumber, status, PaymentdAt) {
    const time = new Date().getTime();

    const corr = await this.ctx.model.Order.updateOne({ orderNumber }, { PaymentdAt, status, updatedAt: time });
    if (!corr) {
      return corr;
    }

    console.log(corr);
    return corr;

  }

}

module.exports = OrderService;

