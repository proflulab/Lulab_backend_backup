'use strict';

const Service = require('egg').Service;

// cnpm install alipay-mobile --save
// https://github.com/Luncher/alipay
const AliPay = require('alipay-mobile').default;

// var utils = require('alipay-mobile');


class AliPayService extends Service {

  // web执行支付
  async doPay(orderData) {
    return new Promise((resolve, reject) => {
      // 实例化支付宝支付
      const service = new AliPay(this.config.aliPayOptions);
      // 获取返回支付地址
      const result = service.createPageOrderURL(orderData, this.config.aliPayBasicParams);
      resolve(result.data);
    });
  }

  // app执行支付
  async doPay_app(orderData) {

    return new Promise((resolve, reject) => {
      // 实例化支付宝支付
      const service = new AliPay(this.config.aliPayOptions);
      // 获取返回支付地址
      const result = service.createOrder(orderData, this.config.aliPayBasicParams);
      resolve(result.data);
    });
  }

  // doPay_check
  // async doPay_check() {
  //   try {

  //     var params = { resultStatus: "9000", result: { "alipay_trade_app_pay_response": { "code": "10000", "msg": "Success", "app_id": "2021000121657681", "auth_app_id": "2021000121657681", "charset": "utf-8", "timestamp": "2022-10-24 01:46:37", "out_trade_no": "1666547152933", "total_amount": "0.10", "trade_no": "2022102422001441980503041365", "seller_id": "2088621993141990" }, "sign": "S5LrfqIWIs7uWAcFqJG8mjQ/QkAD2L9kBBUHsw+0iOx49mk2byD9r3VTMGfAf55zw8mcJDLb78HMGCUC9Ig134cmS0c5/NS6m9rnNBZ58j+7qBSTKH7X5QFJiirpH5fvP0/p7iBXjOFv9c6yRycGTsZT5zcIL866VomwA31nrFhiDC5pGmmcXNj/TE9//wNo4mJY/+14eEhVACTwyJW10o3n8iGpx5XTXdh+v+sFf+xj36Kxgn1tBasjv6XnYg+fbt6nLZNRT+j/oB/6Tn3iODWxpc0i5nyu9jk3JEU3afzDrMZP7ToRtoQ17RNB+HiHunA9kU+3bq6m654a6o15IQ==", "sign_type": "RSA2" }, memo: "2" };
  //     let result = utils.verifyPayment(params);
  //     console.log("-------------------------------------------------------34");
  //     console.log(result);

  //   } catch (error) {
  //     console.log("-------------------------------------------------------33");
  //     console.log(error);
  //   }
  // }


  // 异步通知
  aliPayNotify(params) {
    // 实例化支付宝支付
    const service = new AliPay(this.config.aliPayOptions);
    return service.makeNotifyResponse(params);
  }


}

module.exports = AliPayService;
