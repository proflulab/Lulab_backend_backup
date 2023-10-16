'use strict';

const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');



module.exports = {
//     /**
//      * 发邮件
//      * @param {Object}
//      * @param mailOptions
//      */
//     // sendEmail(mailOptions) {
//     //     const transporter = nodemailer.createTransport(this.app.config.qqEmail);

//     //     transporter.sendMail(mailOptions, function (error, info) {
//     //         if (error) {
//     //             return { code: 1, msg: '验证码发送失败，请稍后重试', error };
//     //         }
//     //         // console.log('1--------------------------------------------------------');
//     //         // console.log('Message sent: ' + info);
//     //         return { code: 0, msg: '验证码发送成功', info };
//     //     });
//     // },

//     /**
//      * 生成*位随机数 默认为6位
//      * @param {Int} length //随机数长度
//      * @return
//      */
    rand(length = 6) {
        let Num = '';
        for (let i = 0; i < length; i++) {
            Num += Math.floor(Math.random() * 10);
        }
        return Num;
    },

    /**
     * generates random string of characters i.e salt // https://www.jianshu.com/p/694e8e3a1dcb
     * @param {number} len - Length of the random string.
     */
    genRandomString(len) {
        return crypto
            .randomBytes(Math.ceil(len / 2))
            .toString('hex')
            .slice(0, len);
    },

    /**
     * 密码加盐
     * @param {String} password //密码
     * @param {String} salt //盐值
     */
    cryptPwd(password, salt) {
        // 密码“加盐”
        const saltPassword = password + ':' + salt;
        console.log('原始密码:%s', password);
        console.log('加盐后的密码:%s', saltPassword);
        // 密码“加盐”的md5
        const md5 = crypto.createHash('md5');
        const result = md5.update(saltPassword).digest('hex');
        console.log('加盐密码的md5值：%s', result);
        return result;
    },

    genRandomPwd() {
        return Math.random().toString(36).substring(2, 10);
    },

    encrypt(password) {
        const salt = bcrypt.genSaltSync(10);	//加盐
        const hash = bcrypt.hashSync(password, salt);	//哈希（同步调用）
        return hash;
    },
    compare(password, hash) {
        return bcrypt.compareSync(password, hash);	//比对
    }
};