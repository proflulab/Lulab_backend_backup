
'use strict';

const Service = require('egg').Service;
var qiniu = require("qiniu");

class QiniuService extends Service {


    async qiniu_upload() {
        var qn=this.config.qiniu;
        var mac = new qiniu.auth.digest.Mac(qn.AccessKey, qn.SecretKey);
        //自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
        console.log(mac);
        var options = {
            scope: "shimingy",
            expires: 7200
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken = putPolicy.uploadToken(mac);
        return uploadToken;
    }

    async qiniu_Down() {
        var qn=this.config.qiniu;
        var mac = new qiniu.auth.digest.Mac(qn.AccessKey, qn.SecretKey);
        var config = new qiniu.conf.Config();
        var bucketManager = new qiniu.rs.BucketManager(mac, config);
        var privateBucketDomain = 'https://qn.proflu.cn';
        var deadline = parseInt(Date.now() / 1000) + 100; // 1小时过期
        var privateDownloadUrl = bucketManager.privateDownloadUrl(privateBucketDomain, "2022-09-13 03:38:21.439054", deadline);
        return privateDownloadUrl;
    }
}

module.exports = QiniuService;