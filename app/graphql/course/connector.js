'use strict';
const DataLoader = require('dataloader');
const BasicConnector = require('../common/basicConnector');
/*const {
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
} = require("../../constant/notification");*/
const moment = require('moment');
const MODEL_NAME = 'Course';
class CourseConnector /*extends BasicConnector */{

  constructor(ctx, model){
    this.ctx = ctx;
    //this.model = model;
    this.loader = new DataLoader(
        ids => this.fetch(ids)
    );
  }

  async fetch(ids) {
    //this.ctx.model["User"] = [{"id":1},{"id":2}]
    // console.log("what is the now model" + this.model)
    //console.log(this.ctx.model + "1111======" + JSON.stringify(this.ctx.model))
    // console.log(this.ctx.model + "1111======" + JSON.stringify(this.ctx.model))
    for (var key in this.ctx.model) {
       console.log(key)
      var val = this.ctx[key]
      for(var key2 in val){
        // console.log(key2 +"===" + val[key2])
        // var val2 = val[key2]
        /* for(var key3 in val2){
            console.log(key3 +"===" + val2[key3])*/
      }
    }

    //}

    /* return await this.ctx.model.User.create({
       name:"testone"
     });*/
    console.log()
    return await this.ctx.model.Course.find(null,null,{limit:4},function(err,docs){
      console.log(docs);
    });
  }

  async fetchById(ids) {
      return await this.ctx.model.Course.find(null,null,{limit:4},function(err,docs){
       // console.log(docs);
      });
    }

    fetchByIds(id) {
      return this.loader.load(id);
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


}

module.exports = CourseConnector;
