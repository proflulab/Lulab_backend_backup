const DataLoader= require('dataloader')


class LaunchConnector {
    constructor(ctx) {
        this.ctx = ctx;
        this.loader = new DataLoader(
            ids => this.fetch(ids)
        );
    }
	async loginPassword(mobile, area, password) {
        const { ctx } = this;
        return await ctx.service.user.loginPassword(mobile, area, password);
    }
	}

module.exports = LaunchConnector;