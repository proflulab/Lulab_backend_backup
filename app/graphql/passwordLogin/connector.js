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
    async sendResetPasswordCode() {
        const { ctx } = this;
        return await ctx.service.user.sendResetPasswordCode();
    }
    async verifyResetPasswordCode(code) {
        const { ctx } = this;
        return await ctx.service.user.verifyResetPasswordCode(code);
    }
    async  resetPassword(mobile, area, password) {
        const { ctx } = this;
        return await ctx.service.user.resetPassword(mobile, area, password);
    }
	}

module.exports = LaunchConnector;