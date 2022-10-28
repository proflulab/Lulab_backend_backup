// app/extend/helper.js
'use strict';


const nodemailer = require('nodemailer');
const crypto = require("crypto");


module.exports = {
    /**
       * 发邮件
       * @param {Object} 
       */

    sendEmail(mailOptions) {
        const transporter = nodemailer.createTransport(this.app.config.qqEmail);

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return { code: 1, msg: "验证码发送失败，请稍后重试", error }
            }
            // console.log('1--------------------------------------------------------');
            // console.log('Message sent: ' + info);
            return { code: 0, msg: "验证码发送成功", info }
        });
    },





    /**
     *生成*位随机数 默认为6位
     * @param {number} length
     */

    rand(length = 6) {
        let Num = '';
        for (let i = 0; i < length; i++) {
            Num += Math.floor(Math.random() * 10);
        }

        return Num;
    },


    //https://www.jianshu.com/p/694e8e3a1dcb
    /**
     * generates random string of characters i.e salt
     * @function
     * @param {number} length - Length of the random string.
     */


    genRandomString(len) {
        return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
    },





    cryptPwd(password, salt) {
        // 密码“加盐”
        var saltPassword = password + ':' + salt;
        console.log('原始密码:%s', password);
        console.log('加盐后的密码:%s', saltPassword);

        // 密码“加盐”的md5
        var md5 = crypto.createHash("md5");
        var result = md5.update(saltPassword).digest("hex");
        console.log('加盐密码的md5值：%s', result);
        return result;
    }

}
