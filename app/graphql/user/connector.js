'use strict';
const DataLoader = require('dataloader');
const BasicConnector = require('../common/basicConnector');

const dialogflow = require('@google-cloud/dialogflow');

// Instantiates a session client

const moment = require('moment');
const MODEL_NAME = 'User';

class UserConnector /*extends BasicConnector */ {

    constructor(ctx, model) {
        this.ctx = ctx;
        //this.model = model;
        ids => this.fetch(ids)
        ;
    }

    async fetch(ids) {
        /* return await this.ctx.model.User.create({
           name:"testone"
         });*/
        console.log("what is the ids" + ids)
        return await this.ctx.model.User.find({
            name: ids
        });
    }

    fetchByIds(ids) {
        return this.loader.loadMany(ids);
    }

    async fetchById(id) {
        return this.loader.load(id);
    }

    //login
    async fetchByName(userInput) {
        var user = await this.ctx.model.User.findOne(
            {"name": userInput.name}, function (err, docs) {
                console.log(docs);
            }
        );

        await Promise.all([user]);
        user = await user;
        if(user == null || !user){
            return {"status": 1, "msg": "该用户不存在"}
        }
        if (userInput.password == user.password) {
            return {"status": 0, "msg": "success", data: user}
        } else {
            return {"status": 1, "msg": "faile"}
        }

    }


    //rigister
    async userRigister(userInput) {
        if(userInput.password != userInput.ensurePassword){
            return {"status": 1, "msg": "注册失败,两次密码不一致"}
        }
        var user = await this.ctx.model.User.findOne(
            {"name": userInput.name}, function (err, docs) {
                console.log(docs);
                return {"status": 1, "name": "hehe"}
            }
        );

        await Promise.all([user]);
        user = await user;
        if (user && user.name != null) {
            return {"status": 1, "msg": "注册失败,已存在一样的用户名"}
        }
        var imgs = ["https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F10.png",
                    "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F8.png",
                    "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F9.png",
                    "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F5.png",
                    "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F5.png",
                    "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F6.png"];
        var random = Math.floor(Math.random()*10 / 5);
        var test = await this.ctx.model.User.create(
            {
                password: userInput.password,
                name: userInput.name,
                imgUrl: imgs[random],
                addTime   : new Date().toLocaleString(),
                timestamp : '' + Date.now()
            }
        );
        await Promise.all([test]);
        test = await test;
        return {"status": 0, "msg": "插入成功"}
    }

    //update user
    async userUpdate(userInput) {
        var user = await this.ctx.model.User.update(
            {name:userInput.name},{$set:{"imgUrl":userInput.imgUrl,"sex":userInput.sex,
                               "description":userInput.description,"tags":userInput.tags,
                               "wechat":userInput.wechat,phone:userInput.phone,"position":userInput.position,
                               "industry":userInput.industry,"country":userInput.country,"phone":userInput.phone,
                               "email":userInput.email,"schoolRecord":userInput.schoolRecord,"detailMsg":userInput.detailMsg,
                                "workCondition":userInput.workCondition, "category":userInput.category, "userType":userInput.userType,
                    "identity":userInput.identity, "iconUrl":userInput.iconUrl, "bigCoverUrl":userInput.bigCoverUrl, "password":userInput.password,
                    "videos":userInput.videos,"imgs":userInput.imgs,"docs":userInput.docs,"growthDescriptions":userInput.growthDescriptions}

          }, function (err, docs) {
                   console.log(docs+"err" +"====="+err)
                   return {"status": 1, "msg": "更新失败"+err}
            }
        );
        await Promise.all([user]);
        user = await user;
        return {"status": 0, "msg": "更新成功"}
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

    async latestClassificationUser(category, option){
        return await this.ctx.model.User.find({category:category},null,{limit:option.limit,skip:option.skip},function(err,docs){
             //console.log(docs +"cassuser ");
        });
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
        var tempEmail = userInput.email; // TODO: 前端传递的email应当也为salt加密过的
        var email = ctx.service.secret.reversibleEncrypt(tempEmail, true);
        // TODO: 这里是不是可以用findByIdAndUpdate, upsert true，直接就插入了？
        var user = await ctx.service.user.userByEmail(email);
        if (user) {
            if (user.onboardingStatus === ONBOARDING_STATUS.ONBOARDED) {
                return null;
            }
        } else {
            user = await ctx.model.User.create({
                email: email,
                onboardingStatus: ONBOARDING_STATUS.DEFAULT
            });
        }
        //  var token = sign(user._id.toString(),'wsd',{expiresIn: 24 * 60 * 60  /* 1 days */});
        // TODO: 以后这行逻辑可以放进service里
        const activeKey = Array.from(Array(6), () => parseInt((Math.random() * 10))).join('');
        // TODO: 这里需要await确认发送成功，如果没有法功成功也要返回状态给前端
        ctx.service.user.sendEmail(activeKey, tempEmail);
        const result = await ctx.model.User.findByIdAndUpdate(
            user._id, {
                emailVerificationCode: activeKey,
                emailVerificationCodeExpiredAt: moment().add(15, 'minutes').toDate() // TODO: 这里不用存可读的时间戳，用Date.now() + 600就行，表示600秒之后
            }, {
                new: true
            }
        );
        return result;
    }

    async verifyEmailCode(userInput) {
        const {
            ctx
        } = this;
        // TODO: 这些以后都应当是加密的
        var {
            email,
            emailVerificationCode
        } = userInput;
        email = ctx.service.secret.reversibleEncrypt(email, true);
        var user = await ctx.service.user.userByEmail(email);
        if (!user) return null; //这里返回前端的消息还是不太一样的，比如用户不存在、已注册等等，null可能不能够表示清楚
        if (user.onboardingStatus === ONBOARDING_STATUS.ONBOARDED) return null;
        if (emailVerificationCode !== user.emailVerificationCode) return null;
        if (moment().toDate() > user.emailVerificationCodeExpiredAt) return null; // TODO: 根据上面的修改所存的时间戳，这里直接跟data.now()比大小就行
        const result = await ctx.model.User.findByIdAndUpdate(
            user._id, {
                onboardingStatus: ONBOARDING_STATUS.EMAIL_VERIFIED,
                updatedAt: Date.now()
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
        // TODO: 这些以后都应当是加密的
        var {
            email,
            password
        } = userInput;
        // salt加密email
        // 加密email
        email = ctx.service.secret.reversibleEncrypt(email, true);
        //这里不应该是按email查，而是应该按前面注册后储存的东西来查，但我不知咋写
        var user = await ctx.service.user.userByEmail(email);
        if (user.onboardingStatus !== ONBOARDING_STATUS.EMAIL_VERIFIED) return null;

        //TODO: 这个salt需要存进数据库吗？salt1和salt2每次生成的结果如果都一样那就没必要存进数据库，还是说它这个随时间或随机变化吗？
        // 如果这样，是不是generateSalt应该直接合并进saltHash?
        var [salt1, salt2] = ctx.service.secret.generateSalt(11, 23);
        password = ctx.service.secret.saltHash(password, salt1, salt2);
        const result = await ctx.model.User.findByIdAndUpdate(
            user._id, {
                onboardingStatus: ONBOARDING_STATUS.ONBOARDED,
                password: password,
                updatedAt: Date.now(),
                salt1: salt1,
                salt2: salt2
            }, {
                new: true
            }
        );
        return result;
    }

    async userLoginByEmail(userInput) {
        const {
            ctx
        } = this;
        // TODO: 此处前端传来的密码和邮箱都应当是salt加密过的
        var {
            email,
            password
        } = userInput;
        // salt加密email
        email = ctx.service.secret.reversibleEncrypt(email, true);
        // 通过解码的email在数据库中查找用户
        var user = await ctx.service.user.userByEmail(email);
        if (!user) return null;
        // 如果用户尚未注册过
        if (user.onboardingStatus != ONBOARDING_STATUS.ONBOARDED) return null;
        var passwordSalt = ctx.service.secret.saltHash(password, user.salt1, user.salt2);
        if (!ctx.service.secret.safeEqualForString(user.password, passwordSalt)) return null; //TODO 需要加密后再比较
        const result = await this.ctx.model[this.model].findByIdAndUpdate({
            _id: user.id
        }, {
            loginedAt: Date.now(),
        }, {
            upsert: false,
            new: true,
            setDefaultsOnInsert: true
        });
        return result;
    }
}

module.exports = UserConnector;
