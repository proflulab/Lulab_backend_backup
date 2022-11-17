// app/controller/default/aliPay.js
'use strict';

const Controller = require('egg').Controller;

class AliPayController extends Controller {

  // web调用支付
  // 参数参考https://opendocs.alipay.com/open/204/105465/
  async pay() {
    const date = (new Date()).getTime();
    // 此处为模拟数据
    const data = {
      body: '实验室课程会员',
      subject: '杨俊杰的电脑',
      out_trade_no: date.toString(),
      total_amount: '0.1',
      timeout_express: '30m',
      goods_type: '0',
      // goods_detail:{
      //     // goods_id:'123',
      //     // goods_name:'ipad',
      //     // quantity:1,
      //     // price: "2",
      // }
    };
    const url = await this.service.pay.doPay(data);
    console.log(url);
    this.ctx.redirect(url);
  }

  // app调用支付
  async pay_app() {
    const date = (new Date()).getTime();
    // 此处为模拟数据
    const data = {
      body: '实验室课程会员',
      subject: '杨俊杰的电脑',
      out_trade_no: date.toString(),
      total_amount: '1',
      timeout_express: '30m',
      goods_type: '0',
    };
    const result = await this.service.pay.doPay_app(data);
    console.log('-------------------------------------------------------');
    console.log(result);
    // assert(result.code == 0, result.message)
    return result;
  }


  // app调用支付
  async pay_check() {

    const result = await this.service.pay.doPay_check();
    console.log('-------------------------------------------------------pay_check');
    console.log(result);
    return result;
  }


  // 支付回调
  async aliPayReturn() {
    this.ctx.body = '回调：支付成功';
    // 提示支付状态
    // 跳转订单页面
  }

  // 支付通知(必须正式上线)
  async aliPayNotify() {
    // 接收阿里服务器POST提交的XML数据
    const params = this.ctx.request.body;
    const result = await this.service.pay.aliPayNotify(params);
    console.log('-------------------------------------------------------pay_check');
    console.log(result);
    if (result.code === 0) {
      if (params.trade_status === 'TRADE_SUCCESS') {
        // 更新订单信息
        await this.service.order.orderState(result.data.out_trade_no, 2, 543);
      }
    }
  }

}

module.exports = AliPayController;
