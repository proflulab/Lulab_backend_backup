'use strict';

const uresolver = require('../graphql/user/resolver');
const nodemailer = require('nodemailer');
const moment = require('moment');
//  import { sign } from 'koa-jwt';


function sendEmail(key,email){
  var stmpTransport = nodemailer.createTransport({
    host:"smtp.163.com",//主机 qq邮箱，可修改
    secureConnection:true,//使用SSL
    port:465,
    auth:{
      user:"notmaimai@163.com", //你的邮箱帐号,
      pass:"ACRPOVNZJLCQXHZO"//你的邮箱授权码
    }
  });

  var mailOptions = {
    from:"notmaimai@163.com",
    to: email,//收件人
    subject: "请激活您在不是脉脉填写的邮箱", // 标题
    html: `<head>
    <base target="_blank" />
    <style type="text/css">::-webkit-scrollbar{ display: none; }</style>
    <style id="cloudAttachStyle" type="text/css">#divNeteaseBigAttach, #divNeteaseBigAttach_bak{display:none;}</style>
    <style id="blockquoteStyle" type="text/css">blockquote{display:none;}</style>
    <style type="text/css">
        body{font-size:14px;font-family:arial,verdana,sans-serif;line-height:1.666;padding:0;margin:0;overflow:auto;white-space:normal;word-wrap:break-word;min-height:100px}
        td, input, button, select, body{font-family:Helvetica, 'Microsoft Yahei', verdana}
        pre {white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;width:95%}
        th,td{font-family:arial,verdana,sans-serif;line-height:1.666}
        img{ border:0}
        header,footer,section,aside,article,nav,hgroup,figure,figcaption{display:block}
        blockquote{margin-right:0px}
    </style>
</head>
<body tabindex="0" role="listitem">
<table width="700" border="0" align="center" cellspacing="0" style="width:700px;">
    <tbody>
    <tr>
        <td>
            <div style="width:700px;margin:0 auto;border-bottom:1px solid #ccc;margin-bottom:30px;">
                <table border="0" cellpadding="0" cellspacing="0" width="700" height="39" style="font:12px Tahoma, Arial, 宋体;">
                    <tbody><tr><td width="210"></td></tr></tbody>
                </table>
            </div>
            <div style="width:680px;padding:0 10px;margin:0 auto;">
                <div style="line-height:1.5;font-size:14px;margin-bottom:25px;color:#4d4d4d;">
                    <strong style="display:block;margin-bottom:15px;">尊敬的用户：<span style="color:#f60;font-size: 16px;"></span>您好！</strong>
                    <strong style="display:block;margin-bottom:15px;">
                        您正在进行<span style="color: red">注销账号</span>操作，请在验证码输入框中输入：<span style="color:#f60;font-size: 24px">`+ key +`</span>，以完成操作。
                    </strong>
                </div>
                <div style="margin-bottom:30px;">
                    <small style="display:block;margin-bottom:20px;font-size:12px;">
                        <p style="color:#747474;">
                            注意：此操作可能会修改您的密码、登录邮箱或绑定手机。如非本人操作，请及时登录并修改密码以保证帐户安全
                            <br>（工作人员不会向你索取此验证码，请勿泄漏！)
                        </p>
                    </small>
                </div>
            </div>
            <div style="width:700px;margin:0 auto;">
                <div style="padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;">
                    <p>此为系统邮件，请勿回复<br>
                        请保管好您的邮箱，避免账号被他人盗用
                    </p>
                    <p>院主网络科技团队</p>
                </div>
            </div>
        </td>
    </tr>
    </tbody>
</table>
</body>`
  };

  stmpTransport.sendMail(mailOptions,function(error,response){
    if(error){
      console.log('error',error);
    }else{
      console.log("Message sent:"+response.message);
    }
    stmpTransport.close();
  });
}


module.exports = (app) => {
  class MailController extends app.Controller {
    async emailCode() {
      const { ctx } = this;
      var body = await ctx.request.body;
      var user = await uresolver.Query.userByEmail(body.email, ctx);
      if(user){
        if(user.isActive){
          return ctx.body = {
            code:1,
            message:'该邮箱已注册，请直接登录',
          }
        }
      }else{
        user = await ctx.model.User.create({email:body.email,isActive:false});
      }
       console.log('user',user._id.toString());
      //  var token = sign(user._id.toString(),'wsd',{expiresIn: 24 * 60 * 60  /* 1 days */});
      const activeKey = Array.from(Array(6), () => parseInt((Math.random() * 10))).join('')
      sendEmail(activeKey,body.email);
      const result = await ctx.model.User.findByIdAndUpdate(
        user._id,
        { emailCode:activeKey,expireAt: moment().add(5,'minutes').toDate()},
        {new:true}
      );
      // console.log(result)
      ctx.body = {
        code:0,
        // token:token,
        message:'发送成功',
        data: {
          user: {
            email: user.email,
        },
      },
    };
    }

    async emailRegister() {
      const { ctx } = this;
      var body = await ctx.request.body;
      var user = await uresolver.Query.userByEmail(body.email, ctx);
      if(user){
        if(user.isActive){
          return ctx.body = {
            code:1,
            message:'该邮箱已注册，请直接登录',
          }
        }else{
          if(body.activeKey == user.emailCode){
            if(moment().toDate() > user.expireAt){
              return ctx.body = {
                code:1,
                message:'验证码已过期，请重新发送验证码',
              };
            }else{
              return ctx.body = {
                code:0,
                message:'验证码正常，可以跳转到输入密码界面',
              };
            }
          }else{
            return ctx.body = {
              code:1,
              message:'验证码错误',
            };
          }
        }
      }else{
        return ctx.body = {
          code:1,
          message:'验证码错误',
        };
      }
    }

    async setPassword() {
      const { ctx } = this;
      var body = await ctx.request.body;
      var user = await uresolver.Query.userByEmail(body.email, ctx);//这里不应该是按email查，而是应该按前面注册后储存的东西来查，但我不知咋写
      const result = await ctx.model.User.findByIdAndUpdate(
        user._id,
        { isActive:true, password:body.password},
        {new:true}
      );
      return ctx.body = {
        code:0,
        message:'注册成功',
      };
    }
  }
  return MailController;
};
