'use strict';

const DataLoader = require('dataloader');

class LaunchConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(
      ids => this.fetch(ids)
    );
  }

  async fetch(ids) {
    return await this.ctx.model.User.find(null, null, { limit: 4 }, function(err, docs) {
      // console.log(docs);
    });
  }

  async fetchAll() {
    // console.log(this.ctx.model.User.find({ username: 'admin' }));
    // //await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();
    // return await this.ctx.model.User.find();

  }



}

module.exports = LaunchConnector;
