'use strict';

const DataLoader = require('dataloader');


const GenId = require('../../extend/IdGenerator.js');

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

    //   async fetchAll(number) {

    //     const genid = new GenId({ WorkerId: 1 });
    //     const out_trade_no = genid.NextId();
    //     const corrs = await this.ctx.model.Good.findOne({ goods_number: number });
    //     if (!corrs) {
    //       return { v: '找不到该商品' };
    //     }
    //     const data = {
    //       body: '实验室课程会员',
    //       subject: corrs.title,
    //       out_trade_no: out_trade_no.toString(),
    //       total_amount: corrs.price.toString(),
    //       timeout_express: '30m',
    //       // goods_type: '0',
    //     };


    //     const order = this.ctx.model.Order({
    //       title: corrs.title,
    //       goods_id: corrs._id,
    //       price: corrs.price,
    //       orderNumber: out_trade_no,
    //     });

    //     await order.save();

    //     const res = await this.ctx.service.pay.doPay_app(data);

    //     return { v: res };
    //   }

}

module.exports = LaunchConnector;
