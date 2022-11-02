
'use strict';

const Service = require('egg').Service;
const Core = require('@alicloud/pop-core');


class SmsService extends Service {

  // 阿里云短信
  async alisms(mobile, code) {

    const client = new Core(this.config.ali);

    const params = {
      SignName: '阿里云短信测试',
      TemplateCode: 'SMS_154950909',
      PhoneNumbers: mobile,
      TemplateParam: '{"code":"' + code + '"}',
    };

    const requestOption = {
      method: 'POST',
      formatParams: false,
    };

    client.request('SendSms', params, requestOption).then(result => {
      console.log(JSON.stringify(result));
    }, ex => {
      console.log(ex);
    });
  }


  //发送验证码
  async verifySend(mobile, area) {
    const { ctx, app } = this;
    const code = ctx.helper.rand(6);
    await this.alisms(mobile, code);
    await ctx.service.cache.set('mobileVerify' + mobile, code, 60);
    return {
      status: '100',
      msg: '发送成功',
    };
  }

  //校验验证码
  async verifyCheck(mobile, code) {
    const { ctx, app } = this;
    const getcode = await ctx.service.cache.get('mobileVerify' + mobile);
    if (getcode == code) {
      return true
    }
    return false
  }


  // 发送邮件
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


// 参考材料https://juejin.cn/post/7082782762364567566
