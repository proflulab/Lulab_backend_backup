'use strict';
const Service = require("egg").Service;

class UserService extends Service {


    //用户注册
    async registered(params) {
        // 注册判断是否存在
        const corr = await this.ctx.model.User.findOne({ username: params.username });
        params.role = 'user';
        if (!corr) {
            await this.ctx.model.User.insertMany([params]);
            this.ctx.body = '注册成功';
        } else {
            this.ctx.body = '该用户名已注册';
        }
    }



    //用户登陆
    async login(mobile, password) {
    const { ctx, app } = this;
    const corr = await ctx.model.User.findOne({ mobile: mobile });
    // 用户是否存在
    if (!corr) {
        this.ctx.body = '用户名错误';
    } else {
        if (password === corr.password) {
            // 生成Token
            let Token = await this.ctx.service.jwt.awardToken(corr._id);
            console.log(corr._id);
            // token 存储至数据库中
            await this.ctx.service.cache.set(corr._id, Token.token, 1000);
            const user = await ctx.model.User.findOne({ mobile: mobile });
            // 将生成的Token返回给前端
            return { status: "100", msg: "登陆成功", token: Token.token, refresh_token: Token.refresh_token, data: user };
        } else {
            this.ctx.body = '密码错误,请重新输入!';
        }
    }
}

    //删除用户
    async destroy(id) {
    const { ctx } = this;
    const oldUser = await ctx.model.User.findOne({ _id: id });
    if (!oldUser) {
        return {
            msg: "用户不存在",
        };
    }
    await ctx.model.User.deleteOne({ _id: id });
    return {
        msg: "用户删除成功",
    };
}


    // async index(params) {
    //     const { ctx } = this;
    //     const page = params.page * 1;
    //     const pageSize = params.pageSize * 1;

    //     params = ctx.helper.filterEmptyField(params);
    //     console.log("params", params);

    //     // nickName 是模糊匹配
    //     const queryCon = params.nickName
    //         ? {
    //             nickName: {
    //                 $regex: new RegExp(params.nickName, "i"),
    //             },
    //         }
    //         : {};

    //     const totalCount = await ctx.model.User.find(queryCon).countDocuments();

    //     const data = await ctx.model.User.find(queryCon)
    //         .sort({
    //             loginTime: -1,
    //         })
    //         .skip((page - 1) * pageSize)
    //         .limit(pageSize);
    //     return {
    //         data: {
    //             page,
    //             pageSize,
    //             totalCount,
    //             list: data,
    //         },
    //     };
    // }
}

module.exports = UserService;
