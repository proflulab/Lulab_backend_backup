'use strict';
const moment = require('moment');
const {
  ONBOARDING_STATUS
} = require("../constant/user");
const uresolver = require('../graphql/user/resolver');

module.exports = (app) => {
  class UserController extends app.Controller {
    async create() {
      const {
        ctx
      } = this;
      const createRule = {
        name: {
          type: 'string'
        },
        password: {
          type: 'string'
        },
      };
      // 校验参数
      ctx.validate(createRule);

      await ctx.model.User.create(ctx.request.body);
      ctx.body = {
        code: 0,
        message: 'success',
      };
    }

    async emailCode() {
      const {
        ctx
      } = this;
      var body = await ctx.request.body;
      var user = await uresolver.Query.userByEmail(this, {
        email: body.email
      }, ctx);
      if (user) {
        if (user.onboardingStatus == ONBOARDING_STATUS.ONBOARDED) {
          return ctx.body = {
            code: 1,
            message: '该邮箱已注册，请直接登录',
          }
        }
      } else {
        user = await ctx.model.User.create({
          email: body.email,
          onboardingStatus: ONBOARDING_STATUS.DEFAULT
        });
      }
      console.log('user', user._id.toString());
      //  var token = sign(user._id.toString(),'wsd',{expiresIn: 24 * 60 * 60  /* 1 days */});
      const activeKey = Array.from(Array(6), () => parseInt((Math.random() * 10))).join('')
      ctx.service.user.sendEmail(activeKey, body.email);
      const result = await ctx.model.User.findByIdAndUpdate(
        user._id, {
          emailVerificationCode: activeKey,
          emailVerificationCodeExpiredAt: moment().add(5, 'minutes').toDate()
        }, {
          new: true
        }
      );
      // console.log(result)
      ctx.body = {
        code: 0,
        // token:token,
        message: '发送成功',
        data: {
          user: {
            email: user.email,
          },
        },
      };
    }

    async emailRegister() {
      const {
        ctx
      } = this;
      var body = await ctx.request.body;
      var user = await uresolver.Query.userByEmail(this, {
        email: body.email
      }, ctx);
      if (user) {
        if (user.onboardingStatus == ONBOARDING_STATUS.ONBOARDED) {
          return ctx.body = {
            code: 1,
            message: '该邮箱已注册，请直接登录',
          }
        } else {
          if (body.activeKey == user.emailVerificationCode) {
            if (moment().toDate() > user.emailVerificationCodeExpiredAt) {
              return ctx.body = {
                code: 1,
                message: '验证码已过期，请重新发送验证码',
              };
            } else {
              const result = await ctx.model.User.findByIdAndUpdate(
                user._id, {
                  onboardingStatus: ONBOARDING_STATUS.VERIFIED
                }, {
                  new: true
                }
              );
              return ctx.body = {
                code: 0,
                message: '验证码正常，可以跳转到输入密码界面',
              };
            }
          } else {
            return ctx.body = {
              code: 1,
              message: '验证码错误',
            };
          }
        }
      } else {
        return ctx.body = {
          code: 1,
          message: '验证码错误',
        };
      }
    }

    async setPassword() {
      const {
        ctx
      } = this;
      var body = await ctx.request.body;
      var user = await uresolver.Query.userByEmail(this, {
        email: body.email
      }, ctx); //这里不应该是按email查，而是应该按前面注册后储存的东西来查，但我不知咋写
      if (user.onboardingStatus == ONBOARDING_STATUS.VERIFIED) {
        const result = await ctx.model.User.findByIdAndUpdate(
          user._id, {
            onboardingStatus: ONBOARDING_STATUS.ONBOARDED,
            password: body.password
          }, {
            new: true
          }
        );
        return ctx.body = {
          code: 0,
          message: '注册成功',
        };
      } else {
        return ctx.body = {
          code: 1,
          message: '注册失败',
        };
      }
    }
  }
  return UserController;
};