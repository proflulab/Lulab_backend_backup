'use strict';

const Subscription = require('egg').Subscription;

class VipCheck extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '1m', // 1 s间隔
      // cron: '*/15 * * * * *', // 也可以通过 cron 表达式来构建时间间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {

    console.log(Date.now());
    // const res = await this.ctx.curl('http://www.api.com/cache', {
    //   dataType: 'json',
    // });
    // this.ctx.app.cache = res.data;
  }
}

// export default UpdateCache;

module.exports = VipCheck;
