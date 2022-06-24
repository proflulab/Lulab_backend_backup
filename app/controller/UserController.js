'use strict';

const Controller = require('egg').Controller;
/*
class UserController extends Controller {
    // 列表页
    async loginByMobile() {
        console.log('>>> index')
        this.ctx.body = {
            msg: 'ok',
            data: '列表页'
        };
    };

    // 账号登录
    async loginByAccount() {
        var user = await this.ctx.model.User.findOne(
            {"name": userInput.name}, function (err, docs) {
                console.log(docs);
            }
        );

        await Promise.all([user]);
        user = await user;
        if(user == null || !user){
            this.ctx.body = {
                status: '1',
                msg: '该用户不存在'
            };
        }

        if (userInput.password == user.password) {
            var signtoken =  await this.ctx.app.jwt.sign({ id: user._id}, this.ctx.app.config.jwt.secret, { expiresIn: "240h" });
            this.ctx.body = {
                status: '0',
                msg: 'success',
                token:signtoken,
                data:user
            };
           // return {"status": 0, "msg": "success",token:signtoken, data:user}
        } else {
            this.ctx.body = {
                status: '0',
                msg: 'success',
                token:signtoken,
                data:user
            };
            //return {"status": 1, "msg": "faile"}
        }

    };


    // 新增表单页
    async new() {
        console.log('>>> new')
        this.ctx.body = {
            msg: 'ok',
            data: '新增表单页'
        };
    };

    // 新增逻辑
    async create() {
        console.log('>>> create')
        this.ctx.body = {
            msg: 'ok',
            data: '新增逻辑'
        };
    };

    // 详情页
    async show() {
        console.log('>>> show')
        let id = this.ctx.params.id;
        this.ctx.body = {
            msg: 'ok',
            data: '详情页,id=' + id
        };
    };

    // 编辑表单页
    async edit() {
        console.log('>>> edit')
        let id = this.ctx.params.id;
        this.ctx.body = {
            msg: 'ok',
            data: '编辑表单页,id=' + id
        };
    };

    // 更新逻辑
    async update() {
        console.log('>>> update')
        let id = this.ctx.params.id;
        this.ctx.body = {
            msg: 'ok',
            data: '更新逻辑, id=' + id
        };
    };

    // 删除逻辑
    async destroy() {
        console.log('>>> destroy')
        let id = this.ctx.params.id;
        this.ctx.body = {
            msg: 'ok',
            data: '删除逻辑, id=' + id
        };
    };
}

module.exports = UserController;*/