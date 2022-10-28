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

  async fetchAll() {
    let res = await this.ctx.service.qiniu.qiniu_upload();
    var result = { v: res }
    return result;
  }

  async fetchDown() {

    var accessKey = this.config.qiniu.AccessKey;
    var secretKey = this.config.qiniu.SecretKey;
    console.log("-------------------------------------------------------1");
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    //自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
    console.log(mac);
    var options = {
      scope: "shimingy",
      expires: 7200
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);

    var a = { v: uploadToken }
    return a;

  }

}

module.exports = LaunchConnector;