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
       
     /*   if (contexts && contexts.length > 0) {
            request.queryParams = {
                contexts: contexts,
            };
        }*

        const responses = await sessionClient.detectIntent(request);
        console.log("========")

        await Promise.all([responses]);
        //responses = await responses
        console.log("========")
        console.log(responses[0])
        //console.log(responses[0].queryResult.fulfillmentText+"=======")
        //for(var i in responses[0]){

            //console.log("i+====="+i+"====="+responses[0][i])
        //}

        console.log('Detected intent');

        */
        /*
        const dialogflow2 = require('@google-cloud/dialogflow').v2;
        const sessionClient = new dialogflow2.SessionsClient();
        const sessionPath = sessionClient.projectAgentSessionPath(
            "newagent-npvt",
            "112233"
        );
        const fs = require('fs');
        const util = require('util');
        // The audio query request
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: "是什么",
                    languageCode: "zh-CN",
                },
            },
            outputAudioConfig: {
                audioEncoding: 'OUTPUT_AUDIO_ENCODING_LINEAR_16',
            },
        };
        sessionClient.detectIntent(request).then(responses => {
            console.log('Detected intent:');
            const audioFile = responses[0].outputAudio;
            util.promisify(fs.writeFile)("./t1.mp3", audioFile, 'binary');
            console.log(`Audio content written to file: ${"./t1.mp3"}`);
        });*/

        /*
        const fs = require('fs');
        const util = require('util');
        //const {struct} = require('pb-util');
// Imports the Dialogflow library
        const dialogflow = require('@google-cloud/dialogflow');

// Instantiates a session client
        const sessionClient = new dialogflow.SessionsClient();

// The path to identify the agent that owns the created intent.
        const sessionPath = sessionClient.projectAgentSessionPath(
            "newagent-npvt",
            "112233"
        );

// Read the content of the audio file and send it as part of the request.
        const readFile = util.promisify(fs.readFile);
        const inputAudio = await readFile("/Users/dazeng/IdeaProjects/lulab_backend/t1.mp3");
        const request = {
            session: sessionPath,
            queryInput: {
                audioConfig: {
                    audioEncoding: "ENCODING_UNSPECIFIED",
                    sampleRateHertz: "24000",
                    languageCode: "zh-CN",
                },
            },
            inputAudio: inputAudio,
            //add
            outputAudioConfig: {
                audioEncoding: 'OUTPUT_AUDIO_ENCODING_LINEAR_16',
            },
        };

        console.log('coming Detected intent:');
        sessionClient.detectIntent(request).then(responses => {
            console.log('Detected intent:');
            const audioFile = responses[0].outputAudio;
            util.promisify(fs.writeFile)("./t3.mp3", audioFile, 'binary');
            console.log(`Audio content written to file: ${"./t3.mp3"}`);
        });*/

        /*Ω
// Recognizes the speech in the audio and detects its intent.
        const [response] = await sessionClient.detectIntent(request);

        console.log('Detected intent:');
        const result = response.queryResult;
// Instantiates a context client
        const contextClient = new dialogflow.ContextsClient();

        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        if (result.intent) {
            console.log(`  Intent: ${result.intent.displayName}`);
        } else {
            console.log('  No intent matched.');
        }
        /*const parameters = JSON.stringify(struct.decode(result.parameters));
        console.log(`  Parameters: ${parameters}`);
        if (result.outputContexts && result.outputContexts.length) {
            console.log('  Output contexts:');
            result.outputContexts.forEach(context => {
                const contextId =
                    contextClient.matchContextFromProjectAgentSessionContextName(
                        context.name
                    );
                const contextParameters = JSON.stringify(
                    struct.decode(context.parameters)
                );
                console.log(`    ${contextId}`);
                console.log(`      lifespan: ${context.lifespanCount}`);
                console.log(`      parameters: ${contextParameters}`);
            });
        }*/
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

        var test = await this.ctx.model.User.create(
            {
                password: userInput.password,
                name: userInput.name,
            }
        );
        await Promise.all([test]);
        test = await test;
        return {"status": 0, "msg": "插入成功"}
    }

    //update user
    async userUpdate(userInput) {
        console.log(userInput.wechat + "===" + userInput.phone +"=====" + userInput.sex + "====" + userInput.phone +"=====" + userInput.img)
        var user = await this.ctx.model.User.updateMany(
            {name:userInput.name},{$set:{"img":userInput.img,"sex":userInput.sex,
                               "password":userInput.password,"description":userInput.description,
                               "wechat":userInput.wechat,phone:userInput.phone}

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
