// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
// 引入 Twilio 模块
const twilio = require('twilio');
const nodemailer = require('nodemailer');
const Helper = require('../extend/helper.js');
require('dotenv').config();
// console.log(process.env)
// 创建 Twilio 客户端实例
// const { accountSid, authToken } = app.config.twilio; // 这里直接解构出 accountSid 和 authToken
      const ACcountSid = process.env.TWILIO_ACCOUNT_SID;
      const AuthToken = process.env.TWILIO_AUTH_TOKEN;
      // console.log('TWILIO_ACCOUNT_SID:', ACcountSid);
      // console.log('TWILIO_AUTH_TOKEN:', AuthToken);
const client = twilio(ACcountSid, AuthToken);

const Service = require('egg').Service;

class smsService extends Service {
    // 定义发送短信的函数
async  sendSMS(mobile, code, area) {
    try {
        const message = `您的验证码是：${code}`;
        // 使用 Twilio 客户端发送短信
        const result = await client.messages.create({
            body: message,
            from: '+12568575054',
            to: area+mobile,
        });

        console.log('短信发送成功：', result.sid);
        console.log(JSON.stringify(result))
        return {
          status: '100',
          msg: '发送成功',
        } 
    
 } catch (ex) {
        console.log('短信发送失败：', ex.message);
        return {
          status: ex.code,
          msg: ex.message,
      };
    }
}

 //发送验证码（修改密码）
    async sendResetPasswordCode(mobile, area) {
            const code = this.ctx.helper.rand(6);
            const result = await this.sendSMS(mobile, code, area);
            if (result.status === '100') {
              // 将验证码存储到 Redis 缓存中，设置过期时间为 5 分钟（单位为秒）
              await this.ctx.service.cache.set('mobileVerify ' + area + ' ' + mobile, JSON.stringify(code), 300);
              return {success: true, message: '验证码发送成功'}
            } 
              return {success: false, message: '验证码发送失败'}
          }   
          
          //验证验证码（修改密码）
        async verifyResetPasswordCode(mobile, area, code) {
              const getcode = await this.ctx.service.cache.get('mobileVerify ' + area + ' ' + mobile);
                if (getcode && getcode === code) {
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
            } 

            //修改密码
            async resetPassword(mobile ,area ,password) {
              const { ctx } = this;
              const corr = await ctx.model.User.findOne({
                 mobile,
                 area,
                });
                console.log(corr)
                if (!corr) {
                  return {
                      status: '200',
                      msg: '用户不存在',
                  };
              } else if (Helper.compare(password, corr.password)) {
                  return {
                      status: '200',
                      msg: '新密码不能与旧密码相同'
                  }
              }
                const encrypt = Helper.encrypt(password)
                const ismodified = await ctx.model.User.updateOne({ mobile, area }, { password: encrypt });
                  if(ismodified){
                    return {success: true, message: '修改密码成功'};
                  }
                  return {success: true, message: '修改密码失败'};
               
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
    const {ctx} = this;
    const getcode = await ctx.service.cache.get('mobileVerify ' + area + ' ' + mobile);
      if (getcode && getcode === code) {
        const result = await ctx.service.user.createAccount(mobile, area)
        if(result && result.status === '100'){
        const Token = await ctx.service.jwt.generateToken(result._id)
          return {status: '100 ',msg: '验证码正确,注册成功',token: Token.token, reToken: Token.refresh_token, data: result.data}
        }
        return result
      }
      return {status: '400', msg: '验证码输入错误', token: null ,reToken: null ,data: null};
  }

 // 发送邮件
    async verifySendEmail(email, code) {
        const { ctx } = this;
        const transporter = nodemailer.createTransport({
          host: "smtp.163.com",
          port: 465,
          // secure:false,
          auth: {user: "13159217419@163.com", pass: "BRKRMIHQLYJZZHJI"},
      });
        // 定义模版
          const mailOptions = {
            from: "13159217419@163.com",
            to: `${email}`,
            subject: "Lulab Website Email",
            text: `您好尊敬的用户${email}
              您的验证码为: 
                    ${code}
              您当前正在某某网站注册账号，验证码告知他人将会导致数据信息被盗，请勿泄露
            `,
          }
          try {
            const info = await transporter.sendMail(mailOptions);
            return { success: true, message: '验证码发送成功'};
          } catch (error) {
            console.error(error);
            return { success: false, message: '验证码发送失败，请稍后重试' };
          }
        }
 
    //发送邮件//重新发送验证码
    async sendEmail(email) {
      const { ctx } = this;
      const code = ctx.helper.rand(6); // 该辅助方法在extend/helper.js中定义
      const result = await this.verifySendEmail(email, code);
      if(result.success === true){
        await this.ctx.service.cache.set('mobileVerify ' +' '+ email, JSON.stringify(code), 600);
      }
     return result
  }

  //验证邮件
    async checkEmail (email, code) {
      const {ctx} = this;
      const getcode = await this.ctx.service.cache.get('mobileVerify ' + ' ' + email);
      if(getcode && getcode === code){
        const corr = await ctx.service.user.loginVerify(email)
        if(corr && corr.success === true){
        const Token = await ctx.service.jwt.generateToken(corr._id)
          return {success: true ,message: '验证码正确' ,token: Token.token, reToken: Token.refresh_token, data: corr.data}
      }
      return corr
    }
      return {success: false ,message: '验证码错误', token: null , reToken: null, data: null}
    }
}

module.exports = smsService;




