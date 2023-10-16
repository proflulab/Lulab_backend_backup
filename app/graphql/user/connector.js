'use strict';
const DataLoader = require('dataloader');

  class UserConnector {
    constructor(ctx) {
        this.ctx = ctx;
        this.loader = new DataLoader(
            ids => this.fetch(ids)
        );
    }

    async userInfo() {
        const { ctx } = this;
        const token = ctx.request.header.authorization;
        const secret = await ctx.service.jwt.getUserIdFromToken(token.split(" ")[1]);
        return ctx.model.User.findOne({ _id: secret.uid })
    }

    async changeUserInfo(name, sex, dsc, email) {
        const { ctx } = this;
        const token = ctx.request.header.authorization;
        const secret = await ctx.service.jwt.getUserIdFromToken(token.split(" ")[1]);
        await ctx.model.User.updateOne({ _id: secret.uid }, { name, sex, dsc, email})
        return await ctx.model.User.findOne({ _id: secret.uid })
    }

    async accountCancellation(args) {
        const {ctx} = this;
        return await ctx.service.user.accountCancellation(args);
    }
 
    // async createAccount(name, password, email) {
    //     const {ctx} = this;
    //     return await ctx.service.user.createAccount(name, password, email);
    // }

}

module.exports = UserConnector
