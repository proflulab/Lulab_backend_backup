
'use strict';

const Service = require('egg').Service;
const qiniu = require('qiniu');

class QiniuService extends Service {


  async qiniu_upload() {
    const qn = this.config.qiniu;
    const mac = new qiniu.auth.digest.Mac(qn.AccessKey, qn.SecretKey);
    // 自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
    console.log(mac);
    const options = {
      scope: 'shimingy',
      expires: 7200,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
  }

  async qiniu_Down() {
    const qn = this.config.qiniu;
    const mac = new qiniu.auth.digest.Mac(qn.AccessKey, qn.SecretKey);
    const config = new qiniu.conf.Config();
    const bucketManager = new qiniu.rs.BucketManager(mac, config);
    const privateBucketDomain = 'https://qn.proflu.cn';
    const deadline = parseInt(Date.now() / 1000) + 100; // 1小时过期
    const privateDownloadUrl = bucketManager.privateDownloadUrl(privateBucketDomain, '2022-09-13 03:38:21.439054', deadline);
    return privateDownloadUrl;
  }
}

module.exports = QiniuService;
