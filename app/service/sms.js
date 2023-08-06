'use strict';

const Service = require('egg').Service;
const Core = require('@alicloud/pop-core');
const AWS = require('aws-sdk');

// 配置阿里云短信服务的 AccessKeyID 和 AccessKeySecret
// const accessKeyId = 'LTAI5tG46VRtTvGofPiX7v8Z';
// const accessKeySecret = 'TA1WZLu2RxfhzE8CIqiQ9TjBojrE1p';

// 创建一个阿里云短信服务客户端
// const client = new Core({
//   accessKeyId: accessKeyId,
//   accessKeySecret: accessKeySecret,
//   endpoint: 'https://dysmsapi.aliyuncs.com',
//   apiVersion: '2017-05-25'
// });

class SmsService extends Service {

    //发送验证码
    // async sendResetPasswordCode() {
    //     const { ctx } = this;
    //     const phoneNumber = '13159217419'; // 替换为接收验证码的手机号
    //     const verificationCode = generateRandomCode(); // 生成验证码，可以自行实现一个生成随机验证码的函数

    //     // 配置阿里云短信模板和签名
    //     const templateCode = '您的验证码为 ${code} ，该验证码5分钟内有效，请勿泄露于他人'; // 需要替换为你在阿里云短信服务中创建的模板CODE
    //     const signName = 'lulad'; // 需要替换为你在阿里云短信服务中的签名名称

    //     // 配置短信参数
    //     const params = {
    //       RegionId: 'cn-hangzhou',
    //       PhoneNumbers: phoneNumber,
    //       SignName: signName,
    //       TemplateCode: templateCode,
    //       TemplateParam: JSON.stringify({
    //         code: verificationCode // 这里根据模板要求传入相应的参数
    //       })
    //     };
    
    //     try {
    //       // 调用阿里云短信发送接口发送验证码
    //       const result = await client.request('SendSms', params, {
    //         method: 'POST'
    //       });
    //       // 根据短信发送结果，返回相应的响应给客户端
    //       if (result.Code === 'OK') {
    //         // 将验证码存储到 Redis 缓存中，设置过期时间为 5 分钟（单位为秒）
    //         await this.app.redis.setex(phoneNumber, 300, verificationCode);
    //         return {
    //           success: true,
    //           message: '验证码发送成功'
    //         };
    //       } else {
    //         return {
    //           success: false,
    //           message: '验证码发送失败'
    //         };
    //       }
    //     } catch (err) {
    //       return {
    //         success: false,
    //         message: '验证码发送失败'
    //       };
    //       // 在实际应用中，你可能还需要处理其他错误情况
    //     }
    //   }

    //   //校验验证码
    //   async verifyResetPasswordCode(args) {
    //     const { phoneNumber, code } = args;
    
    //     // 从 Redis 缓存中获取之前发送的验证码
    //     const sentVerificationCode = await this.app.redis.get(phoneNumber);
    
    //     // 校验验证码是否匹配
    //     if (sentVerificationCode && sentVerificationCode === code) {
    //       return {
    //         success: true,
    //         message: '验证码正确'
    //       };
    //     } else {
    //       return {
    //         success: false,
    //         message: '验证码错误，请重试'
    //       };
    //     }
    //   }
    

      //发送验证码(邮箱)
    async verifySend(email) {
      const code = this.ctx.helper.rand(6);
      const result = await ctx.service.sendsms.sendSMS(email, code);
      if (result.status === '100') {
        await this.app.redis.set( email, JSON.stringify(code), 600);
    }
    return result
}

    async verifyCheck(email, code) {
      const getcode = await this.app.redis.get('mobileVerify ' + email);
      if (getcode && getcode === code) {
          return true;
      }
      return false;
    }
    
    async resendCode(email) {
      const {ctx} = this;
      try {
        const user = await ctx.model.User.findOne({ email });

        if (!user) {
          return {
            success: false,
            message: '用户不存在',
          };
        }

        // 调用发送验证码的逻辑，这里假设你有一个 sendVerificationCode 函数
        await sendVerificationCode(user.email);

        return {
          success: true,
          message: '验证码已重新发送',
        };
      } catch (error) {
        return {
          success: false,
          message: '无法重新发送验证码',
        };
      }
    }
  }
    
    // 生成随机验证码的函数示例
    // function generateRandomCode() {
    //   return Math.floor(100000 + Math.random() * 900000).toString();
    // }
    


module.exports = SmsService;
