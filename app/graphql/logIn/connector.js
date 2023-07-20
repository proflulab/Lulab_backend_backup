const DataLoader= require('dataloader')


class LaunchConnector {
    constructor(ctx) {
        this.ctx = ctx;
        this.loader = new DataLoader(
            ids => this.fetch(ids)
        );
    }
	async logInpassword() {
		//获取用户通过post请求传过来的参数
		const {ctx} = this
		const data = ctx.request.body
		return await ctx.service.user.logInpassword(data);
	  }
	}

module.exports = LaunchConnector;