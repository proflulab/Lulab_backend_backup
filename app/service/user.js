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
                await this.ctx.service.cache.set(corr._id, Token.token, 10);
                const user = await ctx.model.User.findOne({ mobile: mobile });
                // 将生成的Token返回给前端
                return { status: "100", msg: "登陆成功", token: Token.token, refresh_token: Token.refresh_token, data: user };
            } else {
                this.ctx.body = '密码错误,请重新输入!';
            }
        }
    }

    //退出登陆
    async logOut(token) {
        const { ctx } = this;
        //const oldUser = await ctx.model.User.findOne({ _id: id });

        const res = await ctx.service.jwt.getUserIdFromToken(token);

        const leavedAt = res.exp -
            Date.parse(new Date()) / 1000;;
        // console.log(Date.now());
        await this.ctx.service.cache.set(res.uid, res.jti, leavedAt);
        return {
            status: "100",
            msg: "退出登陆成功",
        }
    }



    //修改密码
    async password(id, password) {
        const { ctx } = this;
        const oldUser = await ctx.model.User.findOne({ _id: id });
        if (!oldUser) {
            return {
                msg: "用户不存在",
            };
        }
        await ctx.model.User.updateOne({ _id: id }, { $set: { password: password } });
        return {
            msg: "修改密码成功",
        };
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

}

module.exports = UserService;
