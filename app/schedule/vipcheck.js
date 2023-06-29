'use strict';

const Subscription = require('egg').Subscription;

class VipCheck extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            //interval: '1m', // 1 s间隔
            cron: '0 */30 * * * ?', // 也可以通过 cron 表达式来构建时间间隔
            //这里的间隔时间是半个小时
            type: 'all', // 指定所有的 worker 都需要执行
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        const user = await this.ctx.model.User.find();
        let i;
        const now = Date.now();
        console.log(now);
        for (i = 0; i < user.length; i++) {
            if (user[i].role === 'vip' && user[i].vipExpTime.getTime() < now) {
                await this.ctx.model.User.updateOne({ _id: user[i]._id }, { $set: { role: "user" } });
            }
        }
        // const res = await this.ctx.curl('http://www.api.com/cache', {
        //   dataType: 'json',
        // });
        // this.ctx.app.cache = res.data;
    }
}

// export default UpdateCache;

module.exports = VipCheck;
