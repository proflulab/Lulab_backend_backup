
'use strict';

const Service = require('egg').Service;


class GoodService extends Service {

    /**
     * 查看商品信息
     * @param {Int} area
     * @returns 货物信息
     */
    async goodInfo(number) {
        let status = '100';
        let msg = '查询过程正常';
        let good;
        try {
            good = await this.ctx.model.Good.findOne({ goods_number: number }, { poster: 1, title: 1, price: 1, _id: 0 });
            console.log(good);
        }
        catch (ex) {
            return {
                status: ex.code,
                msg: ex.message,
            }
        }
        return { status, msg, poster: good.poster, goodsName: good.title, goodsPrice: good.price };
    }
}

module.exports = GoodService;

