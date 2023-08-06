const DataLoader= require('dataloader')


class LaunchConnector {
    constructor(ctx) {
        this.ctx = ctx;
        this.loader = new DataLoader(
            ids => this.fetch(ids)
        );
    }
	async passwordLogin(mobile, area, password) {
        const { ctx } = this;
        return await ctx.service.user.passwordLogin(mobile, area, password);
    }
    async sendResetPasswordCode(code) {
        const { ctx } = this;
        return await ctx.service.sendsms.sendResetPasswordCode(code);
    }
    async verifyResetPasswordCode(code) {
        const { ctx } = this;
        return await ctx.service.sendsms.verifyResetPasswordCode(code);
    }
    async  resetPassword(newpassword) {
        const { ctx } = this;
        return await ctx.service.user.resetPassword(newpassword);
    }
	}

module.exports = LaunchConnector;