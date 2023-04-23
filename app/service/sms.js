'use strict';

const Service = require('egg').Service;
const Core = require('@alicloud/pop-core');

/**
 * 阿里云短信发送
 * @author 杨仕明，刘荣轩
 * @see https://juejin.cn/post/7082782762364567566
 */
class SmsService extends Service {

    /**
     * 通过阿里云发送短信
     * 国内短信：+/+86/0086/86或无任何前缀的11位手机号码，例如1390000****。
     * 国际/港澳台消息：国际区号+号码，例如852000012****。
     * @param {String} mobile 手机号码
     * @param {Int} code 随机生成准备发送给<mobile>的验证码
     * @param {Int} area 地区号（默认86）
     * @return 验证码发送状态RES -> {status, message}
     * @exception https://help.aliyun.com/document_detail/101347.html
     */
    async alisms(mobile, code, area = 86) {
        const client = new Core(this.config.ali);
        var templateCode = this.config.sms.nationalCode//国内
        if (area !== 86) {
            templateCode = this.config.sms.internationalCode //国际
            mobile = area + mobile
        }
        const params = {
            SignName: this.config.sms.aliSignName,//'阿里云短信测试', //短信签名名称
            TemplateCode: templateCode, //阿里云模板管理页面
            PhoneNumbers: mobile,
            TemplateParam: '{"code":"' + code + '"}',
        };
        const requestOption = {
            method: 'POST',
            formatParams: false,
        };
        try {
            const result = await client.request('SendSms', params, requestOption)
            console.log(JSON.stringify(result))
            return {
                status: '100',
                msg: '发送成功',
            };
        } catch (ex) {
            return {
                status: ex.code,
                msg: ex.message,
            };
        }
    }

    /**
     * 验证码发送
     * 验证码 5 分钟内有效
     * 待解决：area未测试
     * @param {String} mobile 
     * @param {Int} area 
     * @returns 验证码发送状态RES -> {status, message}
     */
    async verifySend(mobile, area) {
        const code = this.ctx.helper.rand(6);
        const result = await this.alisms(mobile, code, area);
        if (result.status === '100') {
            await this.ctx.service.cache.set('mobileVerify ' + area + ' ' + mobile, JSON.stringify(code), 600);
        }
        return result
    }

    /**
     * 验证码校验（已完成）
     * @param {String} mobile
     * @param {Int} code 
     * @param {Int} area
     * @returns 输入验证码是否正确
     */
    async verifyCheck(mobile, code, area) {
        const getcode = await this.ctx.service.cache.get('mobileVerify ' + area + ' ' + mobile);
        if (getcode && getcode === code) {
            return true;
        }
        return false;
    }

    // 发送邮件(待检验)
    async sendEmail() {
        const { app, ctx } = this;
        // 要发送的收件人地址
        const account = 'yangshiming@proflu.cn';
        // 生成6位验证码
        const code = ctx.helper.rand(6); // 该辅助方法在extend/helper.js中定义
        // 定义模版
        const email = {
            title: '某某网---邮箱验证码',
            body: `
                    <h1>尊敬的:${account}用户</h1>
                    <p style="font-size: 18px;color:#000;">
                    您的验证码为：
                    <span style="font-size: 20px;color:#f00;"> ${code}， </span>
                    您当前正在某某网站注册账号，验证码告知他人将会导致数据信息被盗，请勿泄露
                    </p>
                    <p style="font-size: 1.5rem;color:#999;">该验证码5分钟内有效，请勿泄漏于他人！</p>
                    `,
        };

        const emailCotent = {
            from: '1051447098@qq.com', // 发件人地址
            to: `${account}`, // 收件人地址，多个收件人可以使用逗号分隔
            subject: email.title, // 邮件标题
            html: email.body, // 邮件内容
        };

        return await ctx.helper.sendEmail(emailCotent);// 该辅助方法在extend/helper.js中定义

    }


}

module.exports = SmsService;



