'use strict';

const DataLoader = require('dataloader');

const qiniu = require('qiniu');

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


  async refreshToken(token) {
    const { ctx, app } = this;
    const secret = await ctx.service.jwt.refreshToken(token);
    if (!secret) {
      return { token: "String", refresh_token: "String," }
    }
    return secret;
  }

}

module.exports = LaunchConnector;
