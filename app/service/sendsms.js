// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
// 引入 Twilio 模块
const twilio = require('twilio');

// 创建 Twilio 客户端实例
// const { accountSid, authToken } = app.config.twilio; // 这里直接解构出 accountSid 和 authToken
      const accountSid = 'AC21a5756a1b9963c1f79a1a0cd9855f3d'
      const authToken = '9e18df2c8b3ddfa26d16224dd46b1b38'
const client = twilio(accountSid, authToken);


const Service = require('egg').Service;

class SendsmsService extends Service {
    // 定义发送短信的函数
async sendSMS(mobile, code, area) {
    try {
        const code = this.ctx.helper.rand(6);
        const message = `您的验证码是：${code}`;
        // 使用 Twilio 客户端发送短信
        const sendmessage = await client.messages.create({
            body: message,
            from: '+12192718197',
            to: mobile,
        });

        console.log('短信发送成功：', sendmessage.sid);
        return sendmessage;
    } catch (error) {
        console.error('短信发送失败：', error);
        throw error;
    }
}

//验证发送过来的验证码
async verifyCode(inputCode, storedCode) {
    try {
      // 在这里编写验证逻辑，比如与数据库中存储的验证码进行比对
      return inputCode === storedCode;
    } catch (error) {
      throw new Error('验证码验证失败');
    }
  }

    async sendResetPasswordCode(mobile) {
        try {
            const result = await this.sendSMS(mobile);
            if (result.sid) {
                const code = this.ctx.helper.rand(6);
              // 将验证码存储到 Redis 缓存中，设置过期时间为 5 分钟（单位为秒）
                await this.app.redis.setex(code, 300, result.sid);
              return {
                success: true,
                message: '验证码发送成功'
              };
            } else {
              return {
                success: false,
                message: '验证码发送失败'
              };
            }
          } catch (err) {
            return {
              success: false,
              message: '验证码发送失败'
            };
            // 在实际应用中，你可能还需要处理其他错误情况
          }
        }
        
        async verifyResetPasswordCode(inputCode) {
            try {
              const storedSid = await this.app.redis.get(inputCode, storedSid); // 获取存储的 Twilio 发送消息的 sid
              if (storedSid) {
                const isValidCode = await this.verifyCode(inputCode, storedSid);
                if (isValidCode) {
                  return {
                    success: true,
                    message: '验证码验证成功'
                  };
                } else {
                  return {
                    success: false,
                    message: '验证码验证失败'
                  };
                }
              } else {
                return {
                  success: false,
                  message: '验证码不存在'
                };
              }
            } catch (error) {
              return {
                success: false,
                message: '无法验证验证码'
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
      const result = await this.sendSMS(mobile, code, area);
      if (result.status === '100') {
          await this.app.redis.set('mobileVerify ' + area + ' ' + mobile, JSON.stringify(code), 600);
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
      const getcode = await this.app.redis.get('mobileVerify ' + area + ' ' + mobile);
      if (getcode && getcode === code) {
          const Token = await this.service.jwt.awardToken(mobile)
          return {status: '100 ',msg: '验证码正确',token: Token.token,  refresh_token: Token.refresh_token }
      }
      return {status: '400', msg: '验证码输入错误'};
  }
}

module.exports = SendsmsService;




