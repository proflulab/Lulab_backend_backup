'use strict';

const uresolver = require('../graphql/user/resolver');
const nodemailer = require('nodemailer');
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
    subject: "请激活邮箱2", // 标题
    html: "你的验证码为" + key // html 内容
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
    async register() {
      const { ctx } = this;
      var body = await ctx.request.body;
      var user = await uresolver.Query.userByEmail(body.email, ctx);
      if(user){
        return ctx.body = {
          code:10000,
          message:'该邮箱已注册'
        }
      }
      const user22 = await ctx.model.User.create({email:body.email,isActive:false});
      //  var user = uresolver.Query.addUser(user);
       console.log('user',user._id.toString());
      //  var token = sign(user._id.toString(),'wsd',{expiresIn: 24 * 60 * 60  /* 1 days */});
      sendEmail(body.activeKey,body.email);
      ctx.body = {
        code:0,
        // token:token,
        message:'注册成功',
        data: {
          user: {
            email: user.email,
        },
      },
    };
    }
  }
  return MailController;
};
