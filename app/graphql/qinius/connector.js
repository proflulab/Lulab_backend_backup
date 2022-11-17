'use strict';

const DataLoader = require('dataloader');

const qiniu = require('qiniu');

class LaunchConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(ids => this.fetch(ids));
  }

  async fetch(ids) {
    // return await this.ctx.model.User.find(null, null, { limit: 4 }, function (err, docs) {
    //   //console.log(docs);
    // });
  }

  async fetchAll() {
    const res = await this.ctx.service.qiniu.qiniu_upload();
    const result = { v: res };
    return result;
  }

  async fetchDown() {
    const accessKey = this.config.qiniu.AccessKey;
    const secretKey = this.config.qiniu.SecretKey;
    console.log('-------------------------------------------------------1');
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    // 自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
    console.log(mac);
    const options = {
      scope: 'shimingy',
      expires: 7200,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);

    const a = { v: uploadToken };
    return a;
  }
}

module.exports = LaunchConnector;
