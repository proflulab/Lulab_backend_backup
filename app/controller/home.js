'use strict'

const Controller = require('egg').Controller
var utils = require('../graphql/common/utils');
var crypto = require('crypto');

class HomeController extends Controller {
    async index() {
        this.ctx.body = 'hi,egg'
    }


    async sendMobileCode() {
        let {mobile} = this.ctx.request.body;
        if (!mobile) {
            return this.ctx.body = {
                status: '-1',
                msg: '手机号有误'
            };
        }

        var nonce = utils.noncer();
        var curTime = new Date().getTime();

        //请求参数
        var post_data = {
            appKey: "6bed15e8542e9ef8045f5148b53efa3f",
            nonce: nonce,
            curTime: curTime
        };

        var appSecret = 'cafe82e6989b';
        // 2.设置私有属性
        var signature = crypto.createHash("sha1").update(appSecret + nonce + curTime, "utf-8").digest("hex");

        var options = {
            method: 'POST',
            data: {"mobile": mobile, "codeLen": 6},
            dataType: 'json',
            headers: {
                "AppKey": "e0cae30227045456ecc8363b9fbc6554",
                "Nonce": nonce,
                "CurTime": curTime,
                "CheckSum": signature,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            timeout: 10 * 1000,
            nestedQuerystring: false
        }


        var dataW = await this.ctx.curl('https://api.netease.im/sms/sendcode.action', options);
        await Promise.all([dataW]);
        dataW = await dataW;

        console.log("the code and msg==" + dataW['data']['code'] + "===msg===" + dataW['data']['msg'] + "==verifycode==" + dataW['data']['obj'])
        if (dataW && dataW['data'] && dataW['data']['code'] && dataW['data']['code'] == 200) {
            return this.ctx.body = {
                status: '0',
                msg: '发送成功'
            };
        } else {
            return this.ctx.body = {
                status: '-1',
                msg: '发送失败'
            };
        }

    }


    async verifyMobileCode() {
        let {mobile, code} = this.ctx.request.body;
        console.log("waht is the phone" + mobile + "what is the code==" + code)
        if (!mobile || !code) {
            return this.ctx.body = {"status": "-1", "msg": "数据有误"}
        }
        var nonce = utils.noncer();
        var curTime = new Date().getTime();

        //请求参数
        var post_data = {
            appKey: "e0cae30227045456ecc8363b9fbc6554",
            nonce: nonce,
            curTime: curTime
        };

        var appSecret = 'cafe82e6989b';
        // 2.设置私有属性
        var signature = crypto.createHash("sha1").update(appSecret + nonce + curTime, "utf-8").digest("hex");

        var options = {
            //host = 'https://api.netease.im/sms/sendcode.action', // 配置请求地址域名
            method: 'POST',
            data: {"mobile": mobile, "code": code},
            dataType: 'json',
            headers: {
                "AppKey": "e6cfc69abd735a46d10307d9d3af6437",
                "Nonce": nonce,
                "CurTime": curTime,
                "CheckSum": signature,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            timeout: 10 * 1000,
            nestedQuerystring: false
            // 此处只列了常见属性，有需要新增参数的，在此处添加
            // 更多配置，查看 https://www.npmjs.com/package/urllib
        }


        var dataW = await this.ctx.curl('https://api.netease.im/sms/verifycode.action', options);
        await Promise.all([dataW]);
        dataW = await dataW;

         if (dataW && dataW['data'] && dataW['data']['code'] && dataW['data']['code'] == 200) {

        //注册

        console.log("the phone" + mobile)
        var user = await this.ctx.model.User.findOne(
            {"account": mobile}, function (err, docs) {
                console.log(docs);
            }
        );
        await Promise.all([user]);
        user = await user;
        if (user != null) {
            var signtoken = await this.ctx.app.jwt.sign({id: user._id}, this.ctx.app.config.jwt.secret, {expiresIn: 3600 * 24 * 15});
            return this.ctx.body = {"msg": "success", "status": "0", token: signtoken}
        } else {

            var imgs = ["https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F10.png",
                "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F8.png",
                "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F9.png",
                "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F5.png",
                "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F5.png",
                "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F6.png"];
            var random = Math.floor(Math.random() * 10 / 5);
            var user = await this.ctx.model.User.create(
                {
                    password: utils.noncer().substring(0, 8),
                    name: mobile,
                    account: mobile,
                    imgUrl: imgs[random],
                    addTime: new Date().toLocaleString(),
                    timestamp: '' + Date.now()
                }
            );
            await Promise.all([user]);
            user = await user;
            var signtoken = await this.ctx.app.jwt.sign({id: user._id}, "lulablll", {expiresIn: 3600 * 24 * 15});

            return this.ctx.body = {"status": "0", "msg": "注册成功", token: signtoken}
        }

        } else {
            return this.ctx.body = {
                status: '-1',
                msg: '校验失败',
                token: '',
                data: null
            };
        }


    }

    /* dataGeek = await   dataGeek;


 }

 /**
  * 修改用户密码
  */
    async updatePwd() {
        let {pwd} = this.ctx.request.body;
        let token = this.ctx.header.authorization
        token = token.replace('Bearer ', '')
        console.log("coning =====174========" + token)
        try {
            let result = await this.ctx.app.jwt.verify(token, "lulablll");
            var id = result.id;
            console.log("coning =====177===" + id)

            var user = await this.ctx.model.User.findOne(
                {"_id": id}, function (err, docs) {
                    console.log(docs);
                }
            );

            await Promise.all([user]);
            user = await user;
            user.password = pwd;
            console.log("coning =====188===" + pwd)

            var userUpdate = await this.ctx.model.User.updateOne(
                {_id: id}, {
                    $set: {
                        "imgUrl": user.imgUrl,
                        "sex": user.sex,
                        "imgs": user.imgs,
                        "description": user.description,
                        "addTime": user.addTime,
                        "timestamp": user.timestamp,
                        "wechat": user.wechat,
                        "password": user.password,
                        "position": user.position,
                        "videoUrl": user.videoUrl,
                        "industry": user.industry,
                        "country": user.country,
                        "phone": user.phone,
                        "profileImgUrl": user.profileImgUrl,
                        "email": user.email,
                        "schoolRecord": user.schoolRecord,
                        "detailMsg": user.detailMsg,
                        "identity": user.identity,
                        "iconUrl": user.iconUrl,
                        "bigCoverUrl": user.bigCoverUrl,
                        "password": user.password,
                        "location": user.location,
                        "duration": user.duration,
                        "address": user.address,
                        "name": user.name,
                        "company": user.company,
                        "tags": user.tags,
                        "homeTown": user.homeTown
                    }

                }, function (err, docs) {
                    console.log(JSON.stringify(docs) + "err" + "=====" + err)
                    //return {"status": 1, "msg": "更新失败"+err}
                }
            );
            await Promise.all([userUpdate]);
            userUpdate = await userUpdate;
            if (!userUpdate) {
                return this.ctx.body = {
                    status: '-1',
                    msg: '更新失败'
                };
            }
            console.log("coning =====236======" + pwd)

            return this.ctx.body = {
                status: '0',
                msg: '更新成功'
            }
        } catch (e) {
            this.ctx.body = {
                code: 500,
                msg: '用户认证失败'
            }
        }
    }


    /**
     * 修改用户信息
     */
    async updateInfo() {
        let {pwd} = this.ctx.request.body;
        let token = this.ctx.header.authorization
        token = token.replace('Bearer ', '')
        console.log("coning =====174========" + token)
        try {
            let result = await this.ctx.app.jwt.verify(token, "lulablll");
            var id = result.id;
            console.log("coning =====177===" + id)

            var user = await this.ctx.model.User.findOne(
                {"_id": id}, function (err, docs) {
                    console.log(docs);
                }
            );

            await Promise.all([user]);
            user = await user;
            user.password = pwd;
            console.log("coning =====188===" + pwd)

            var userUpdate = await this.ctx.model.User.updateOne(
                {_id: id}, {
                    $set: {
                        "imgUrl": user.imgUrl,
                        "sex": user.sex,
                        "imgs": user.imgs,
                        "description": user.description,
                        "addTime": user.addTime,
                        "timestamp": user.timestamp,
                        "wechat": user.wechat,
                        "password": user.password,
                        "position": user.position,
                        "videoUrl": user.videoUrl,
                        "industry": user.industry,
                        "country": user.country,
                        "phone": user.phone,
                        "profileImgUrl": user.profileImgUrl,
                        "email": user.email,
                        "schoolRecord": user.schoolRecord,
                        "detailMsg": user.detailMsg,
                        "identity": user.identity,
                        "iconUrl": user.iconUrl,
                        "bigCoverUrl": user.bigCoverUrl,
                        "password": user.password,
                        "location": user.location,
                        "duration": user.duration,
                        "address": user.address,
                        "name": user.name,
                        "company": user.company,
                        "homeTown": user.homeTown
                    }

                }, function (err, docs) {
                    console.log(JSON.stringify(docs) + "err" + "=====" + err)
                    //return {"status": 1, "msg": "更新失败"+err}
                }
            );
            await Promise.all([userUpdate]);
            userUpdate = await userUpdate;
            if (!userUpdate) {
                return this.ctx.body = {
                    status: '-1',
                    msg: '更新失败'
                };
            }
            console.log("coning =====236======" + pwd)

            return this.ctx.body = {
                status: '0',
                msg: '更新成功'
            }
        } catch (e) {
            this.ctx.body = {
                code: 500,
                msg: '用户认证失败'
            }
        }
    }


    /**
     * jwt登录
     */
    async verifyLogin() {
     //   let token = this.ctx.header.authorization
       // token = token.replace('Bearer ', '')
        let token = this.ctx.header.token
        try {
            var result = await this.ctx.app.jwt.verify(token, "lulablll");
            if (!result || !result.id) {
                return this.ctx.body = {
                    status: '-1',
                    msg: '登录失败'
                }
            }

            var user = await this.ctx.model.User.findOne(
                {"_id": result.id}, function (err, docs) {
                    console.log(docs);
                }
            );
            await Promise.all([user]);
            user = await user;

            if (user != null) {
                var signtoken = await this.ctx.app.jwt.sign({id: user._id}, this.ctx.app.config.jwt.secret, {expiresIn: 3600 * 24 * 15});
                return this.ctx.body = {"msg": "success", "status": "0", "data": {"user": user}, token: signtoken}
            } else {
                return this.ctx.body = {
                    status: '-1',
                    msg: '登录失败'
                };
            }
        } catch (e) {
            return this.ctx.body = {
                code: 500,
                msg: '用户认证失败'
            }
        }

    }


    /**
     * 账号登录
     */
    async loginByAccount() {
        let {pwd, account} = this.ctx.request.body;
        var user = await this.ctx.model.User.findOne(
            {"account": account}, function (err, docs) {
                console.log(docs);
            }
        );

        var userTemp ;
        await Promise.all([user]);
        user = await user;
        if (!user || !(user.password == pwd)) {

                return this.ctx.body = {
                    status: '-1',
                    msg: '登录失败'
                };

        }
        var signtoken = await this.ctx.app.jwt.sign({id: user._id}, this.ctx.app.config.jwt.secret, {expiresIn: 3600 * 24 * 15});
        return this.ctx.body = {
            status: '0',
            msg: '登录成功',
            token: signtoken,
            data:user
        };


    }


    /**
     * 注册账号
     */
    async rigisterAccount() {
        let {pwd, account} = this.ctx.request.body;
        if (!pwd || !account) {
            return this.ctx.body = {
                status: '-1',
                msg: '账号或者密码错误'
            };
        }
        var user = await this.ctx.model.User.findOne(
            {"account": account}, function (err, docs) {
                console.log(docs);
            }
        );


        await Promise.all([user]);
        user = await user;
        if (user) {
            return this.ctx.body = {
                status: '-1',
                msg: '已经存在相同账号，请使用其它账号'
            };
        } else {

            var imgs = ["https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F10.png",
                "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F8.png",
                "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F9.png",
                "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F5.png",
                "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F5.png",
                "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F6.png"];
            var random = Math.floor(Math.random() * 10 / 5);
            var user = await this.ctx.model.User.create(
                {
                    password: pwd,
                    name: account,
                    account: account,
                    imgUrl: imgs[random],
                    addTime: new Date().toLocaleString(),
                    timestamp: '' + Date.now()
                }
            );
            await Promise.all([user]);
            user = await user;
            var signtoken = await this.ctx.app.jwt.sign({id: user._id}, "lulablll", {expiresIn: "720h"});

            return this.ctx.body = {"status": "0", "msg": "注册成功", token: signtoken}

        }


    }


    /**
     * 一键登录
     * */
    async loginByMobilePhone() {
        let {accessToken, token} = this.ctx.request.body;
        console.log("what is the token" + token + "======accesstoken====" + accessToken);

        var utils = require('../graphql/common/utils');
//产品密钥ID，产品标识
        var secretId = "*****************************";
// 产品私有密钥，服务端生成签名信息使用，请严格保管，避免泄露
        var secretKey = "*****************************";
// 业务ID，易盾根据产品业务特点分配
        var businessId = "*****************************";
// 一键登录服务端check接口
        var apiurl = "*****************************";

        var resMsg = "";
        var resCode = "TT";

        //请求参数
        var post_data = {
            // 1.设置公有有参数
            secretId: secretId,
            businessId: businessId,
            version: "v1",
            timestamp: new Date().getTime(),
            nonce: utils.noncer()
        };
        // 2.设置私有属性
        post_data.accessToken = accessToken;
        post_data.token = token;

        var signature = utils.genSignature(secretKey, post_data);
        post_data.signature = signature;

        var checkRes = await utils.sendHttpRequestSync(apiurl, "POST", post_data);

        console.log("the data" + checkRes['data'])
        var jonsRes = JSON.parse(checkRes['data']);
        console.log("the rescode" + jonsRes.code)
        if (!jonsRes || !jonsRes.code || jonsRes.code != 200) {
            console.log("waht is this----")
            return this.ctx.body = {
                status: '-1',
                msg: '手机无效',
                token: '',
                data: null
            };
        }
        var phoneRes = jonsRes['data']['phone'];
        console.log("the pohone" + phoneRes)
        var user = await this.ctx.model.User.findOne(
            {"account": phoneRes}, function (err, docs) {
                console.log(docs);
            }
        );
        await Promise.all([user]);
        user = await user;
        if (user != null) {
            var signtoken = await this.ctx.app.jwt.sign({id: user._id}, this.ctx.app.config.jwt.secret, {expiresIn: 3600 * 24 * 15});
            return this.ctx.body = {"msg": "success", "status": "0", "data":  user, token: signtoken}
        } else {

            var imgs = ["https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F10.png",
                "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F8.png",
                "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F9.png",
                "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F5.png",
                "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F5.png",
                "https://qn2.proflu.cn/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F6.png"];
            var random = Math.floor(Math.random() * 10 / 5);
            var user = await this.ctx.model.User.create(
                {
                    password: utils.noncer().substring(0, 8),
                    name: phoneRes,
                    account: phoneRes,
                    imgUrl: imgs[random],
                    addTime: new Date().toLocaleString(),
                    timestamp: '' + Date.now()
                }
            );
            await Promise.all([user]);
            user = await user;
            var signtoken = await this.ctx.app.jwt.sign({id: user._id}, "lulablll", {expiresIn: "720h"});

            return this.ctx.body = {"status": "0", "msg": "注册成功", token: signtoken, "data":  user}
        }

    }


}

module.exports = HomeController
