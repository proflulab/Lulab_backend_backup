'use strict';

const Service = require('egg').Service;
const AWS = require('aws-sdk');


class S3Service extends Service {
    async s3Down(name, mins) {
        const s3 = new AWS.S3(this.config.s3);
        var params = {
            Bucket: 'proflubucket',
            Key: name,
            Expires: mins * 60,
        }
        const signedUrl = await s3.getSignedUrlPromise('getObject', params);
        console.log("url is:", signedUrl)
        return signedUrl;
    }
}

module.exports = S3Service;