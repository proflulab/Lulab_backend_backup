// connector.js

//const axios = require('axios');

const DataLoader= require('dataloader')


class LaunchConnector {
    constructor(ctx) {
        this.ctx = ctx;
        this.loader = new DataLoader(
            ids => this.fetch(ids)
        );
    }
    async fetch(ids) {
        return await this.ctx.model.User.find(null, null, { limit: 4 }, function (err, docs) {
            // console.log(docs);
        });
    }

    async fetchAll() {
        console.log(this.ctx.model.User.find({ username: 'admin' }));
        // await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();
        return await this.ctx.model.User.find();

    }


    async logOut() {
    const {ctx} = this
    const token = ctx.request.header.authorization.replace(/^Bearer\s/, '');
    return await ctx.service.user.logOut(token);
    // const users = await this.ctx.model.logOut.find({})
    // //try {
    //     // const response = await axios.get('mongodb://root:lulab1005@144.24.84.85:27017/lulab_backend');
    //     // // 根据返回的结果确定是否成功注销
    //     // if (response.data.success) {
    // return Object.assign({}, {
    //     pageNum: 1,
    //     pageSize: 10,
    //     list: users
    // })
    // return {
    //     status: 'yes',
    //     msg: '注销成功'
    // };
    //     } else {
    //         return {
    //             status: 'no',
    //             msg: '注销失败'
    //         };
    //     }
    // } catch (error) {
    //     return {
    //         status: 'no',
    //         msg: '请求失败'
    //     };
    // }
}

}
module.exports = LaunchConnector;