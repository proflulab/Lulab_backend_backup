'use strict';

const BasicConnector = require('../common/basicConnector');
const {
  CLIENTS
} = require("../../constant/constants");
const errorCode = require("../../error/errorCode");
const {
  ONBOARDING_STATUS
} = require("../../constant/user");
const {
  MODEL_NAMES
} = require("../../constant/models");
const {
  NOTIFICATION_STATUS
} = require("../../constant/notification");
const moment = require('moment');
const MODEL_NAME = 'User';
class UserConnector extends BasicConnector {

  constructor(ctx) {
    super(ctx, MODEL_NAME);
  }

  async userRich(id) {
    let user = this.ctx.model[this.model].findOne({
      _id: id
    }).exec();

    const basicQuery = {
      user: id,
      isDeleted: false,
      isBlocked: false
    };

    const getCount = (model, query) => {
      return this.ctx.model[model].countDocuments(query).exec();
    }

    let postCount = getCount(MODEL_NAMES.POST, basicQuery);
    let commentCount = getCount(MODEL_NAMES.COMMENT, basicQuery);
    let postCommentCount = getCount(MODEL_NAMES.POST_COMMENT, basicQuery);
    let collectCount = getCount(MODEL_NAMES.COLLECT, {
      actor: id,
      value: true
    });
    let notificationCount = getCount(MODEL_NAMES.NOTIFICATION, {
      ...basicQuery,
      status: NOTIFICATION_STATUS.INIT
    });

    await Promise.all([user, postCount, commentCount, postCommentCount, collectCount, notificationCount]);

    // 将promise转化成值，mongoose配合promise.all所需的特殊操作
    user = await user;
    postCount = await postCount;
    commentCount = await commentCount;
    postCommentCount = await postCommentCount;
    collectCount = await collectCount;
    notificationCount = await notificationCount;

    if (user) {
      return {
        ...user._doc,
        postCount,
        commentCount,
        postCommentCount,
        collectCount,
        notificationCount
      };
    }
  }

  async userLogin(userLoginPayload) {
    const clientType = await this.ctx.service.util.getClientType();
    switch (clientType) {
      case CLIENTS.GUGU_WECHAT_MINI:
        return await this.userWechatMiniLogin(clientType, userLoginPayload);

      default:
        return;
    }
  }

  async userWechatMiniLogin(clientType, userLoginPayload) {

    try {

      const {
        jscode,
        grantType
      } = userLoginPayload;

      let result = await this.ctx.service.wechat.jsCode2Session(jscode, grantType);

      if (!result) return;
      result = JSON.parse(result);
      const sessionKey = result['session_key'];
      const openId = result['openid'];
      // const unionId = result['unionid'];
      if (!sessionKey || !openId) return;

      const user = await this.ctx.model[this.model].findOneAndUpdate({
        "credential": {
          $elemMatch: {
            clientType,
            openId
          }
        }
      }, {
        loginedAt: Date.now(),
        credential: {
          sessionKey,
          clientType,
          openId
        }
        // unionId
      }, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      });

      const accessToken = await this.ctx.service.token.signJwt({
        openId,
        sessionKey,
        clientType
      });

      this.ctx.cookies.set('accessToken', accessToken, {
        signed: false,
        encrypt: true
      });

      return user;
    } catch (e) {
      console.error(e);
      this.ctx.response.body = {
        error: "Fail to login WeChat mini program user: " + e,
        code: errorCode.USER_FAILED_TO_USER_WECHAT_MINI_LOGIN
      };
    }
  }

  async onboardSelf(id, input) {
    const result = await this.ctx.model[this.model].findByIdAndUpdate({
      _id: id
    }, {
      ...input,
      onboardingStatus: ONBOARDING_STATUS.ONBOARDED,
      loginedAt: Date.now(),
      updatedAt: Date.now(),
    }, {
      upsert: false,
      new: true,
      setDefaultsOnInsert: true
    });
    return result;
  }

  // async userByToken(token) {
  //   const user = await this.ctx.model[this.model].find(
  //     {
  //       isDeleted: false,
  //       isBlocked: false,
  //       token,
  //     },
  //   );
  //   if (!user) throw new Error("User not found")
  //   return user
  // }

  async sendEmailCode(userInput) {
    const {
      ctx
    } = this;
    var tempEmail = userInput.email
    var email = ctx.service.secret.reversibleEncrypt(tempEmail, true);
    var user = await ctx.service.user.userByEmail(email);
    if (user) {
      if (user.onboardingStatus == ONBOARDING_STATUS.ONBOARDED) {
        return null;
      }
    } else {
      user = await ctx.model.User.create({
        email: email,
        onboardingStatus: ONBOARDING_STATUS.DEFAULT
      });
    }
    console.log('user', user._id.toString());
    //  var token = sign(user._id.toString(),'wsd',{expiresIn: 24 * 60 * 60  /* 1 days */});
    const activeKey = Array.from(Array(6), () => parseInt((Math.random() * 10))).join('')
    ctx.service.user.sendEmail(activeKey, tempEmail);
    const result = await ctx.model.User.findByIdAndUpdate(
      user._id, {
        emailVerificationCode: activeKey,
        emailVerificationCodeExpiredAt: moment().add(5, 'minutes').toDate()
      }, {
        new: true
      }
    );
    // console.log(result)
    return result;
  }

  async verifyEmailCode(userInput) {
    const {
      ctx
    } = this;
    var {
      email,
      emailVerificationCode
    } = userInput
    email = ctx.service.secret.reversibleEncrypt(email, true);
    var user = await ctx.service.user.userByEmail(email);
    if (!user) return null; //这里返回前端的消息还是不太一样的，比如用户不存在、已注册等等，null可能不能够表示清楚
    if (user.onboardingStatus == ONBOARDING_STATUS.ONBOARDED) return null;
    if (emailVerificationCode != user.emailVerificationCode) return null;
    if (moment().toDate() > user.emailVerificationCodeExpiredAt) return null;
    const result = await ctx.model.User.findByIdAndUpdate(
      user._id, {
        onboardingStatus: ONBOARDING_STATUS.EMAIL_VERIFIED
      }, {
        new: true
      }
    );
    return result;
  }

  async onboardSelfByEmail(userInput) {
    const {
      ctx
    } = this;
    var {
      email,
      password
    } = userInput
    email = ctx.service.secret.reversibleEncrypt(email, true);
    var user = await ctx.service.user.userByEmail(email); //这里不应该是按email查，而是应该按前面注册后储存的东西来查，但我不知咋写
    if (user.onboardingStatus == ONBOARDING_STATUS.EMAIL_VERIFIED) {
      var [salt1, salt2] = ctx.service.secret.generateSalt(11, 23);
      password = ctx.service.secret.saltHash(password, salt1, salt2);
      const result = await ctx.model.User.findByIdAndUpdate(
        user._id, {
          onboardingStatus: ONBOARDING_STATUS.ONBOARDED,
          password: password,
          salt1: salt1,
          salt2: salt2
        }, {
          new: true
        }
      );
      return result;
    } else {
      return null;
    }
  }

  async userLoginByEmail(userInput) {
    const {
      ctx
    } = this;
    var {
      email,
      password
    } = userInput
    email = ctx.service.secret.reversibleEncrypt(email, true);
    var user = await ctx.service.user.userByEmail(email);
    if (!user) return null;
    if (user.onboardingStatus != ONBOARDING_STATUS.ONBOARDED) return null;
    if (!ctx.service.secret.safeEqualForString(user.password, ctx.service.secret.saltHash(password, user.salt1, user.salt2))) return null; //TODO 需要加密后再比较
    const result = await this.ctx.model[this.model].findByIdAndUpdate({
      _id: user.id
    }, {
      loginedAt: Date.now(),
      updatedAt: Date.now()
    }, {
      upsert: false,
      new: true,
      setDefaultsOnInsert: true
    });
    return result;
  }
}

module.exports = UserConnector;